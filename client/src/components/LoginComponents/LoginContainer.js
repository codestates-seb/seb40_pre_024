import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Logo from '../../assets/img/Logo.png';
import { useNavigate } from 'react-router-dom';
import { BiLinkExternal } from 'react-icons/bi';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions/user_actions';

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px,
    rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
  border-radius: 10px;
`;

const MentDiv = styled.div`
  font-size: 13px;
  margin-bottom: 10px;
`;

const MentSpan = styled.span`
  font-size: 13px;
  color: #0074cc;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const InputContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const Errormsg = styled.p`
  color: #bf1650;
  margin: 3px;
  font-size: 13px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3px;
`;

const Input = styled.input`
  width: 260px;
  height: 35px;
  padding: 0;
`;

const SubmitBtn = styled.input`
  width: 260px;
  height: 35px;
  font-size: 13.6px;
  font-weight: 600;
  color: white;
  background-color: #379fef;
  border: 0;
  border-radius: 3px;
  padding: 0;
  margin-bottom: 5px;
  &:hover {
    background-color: #0074cc;
  }
`;

const LogoPng = styled.img`
  height: 37px;
  width: 32px;
  margin-bottom: 20px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default function LoginContainer() {
  let user = useSelector((state) => state.user.currentUser);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: onchange });
  const dispatch = useDispatch();
  const onLogin = async (data) => {
    try {
      let res = await axios.post('api/members/login', {
        username: data.email,
        password: data.password,
      });
      if (res.status === 200) {
        sessionStorage.setItem('jwt-token', res.headers.authorization);
        sessionStorage.setItem('user', data.email);
        dispatch(
          setUser({
            userEmail: data.email,
          })
        );
        navigate('/');
      }
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  if (!user) {
    return (
      <MainContainer>
        <LogoPng src={Logo} />
        <Container>
          <Form onSubmit={handleSubmit(onLogin)}>
            <InputContainer>
              <Label htmlFor={'Email'}>Email</Label>
              <Input
                type={'email'}
                id="Email"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                  maxLength: 50,
                })}
              />
              {errors.email && errors.email.type === 'required' && (
                <Errormsg>⚠ 이메일을 입력해주세요.</Errormsg>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <Errormsg>⚠ 이메일 형식이여야 합니다.</Errormsg>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <Errormsg>⚠ 최대 길이는 50자 이하여야 합니다</Errormsg>
              )}
            </InputContainer>
            <InputContainer>
              <Label htmlFor={'password'}>Password</Label>
              <Input
                type={'password'}
                id="password"
                {...register('password', {
                  required: true,
                  minLength: 8,
                })}
              />
              {errors.password && errors.password.type === 'required' && (
                <Errormsg>⚠ 패스워드를 입력해주세요</Errormsg>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <Errormsg>⚠ 최소 길이는 8자 이상이여야 합니다</Errormsg>
              )}
            </InputContainer>
            <SubmitBtn type="submit" value={'Login'}></SubmitBtn>
            {error && <Errormsg>⚠ {error}</Errormsg>}
          </Form>
        </Container>
        <MentDiv>
          Don{"'"}t have an account?{' '}
          <MentSpan onClick={() => navigate('/register')}>Sign up</MentSpan>
        </MentDiv>
        <MentDiv>
          Are you an employer?{' '}
          <MentSpan onClick={() => navigate('/register')}>
            Sign up on Talent <BiLinkExternal />
          </MentSpan>
        </MentDiv>
      </MainContainer>
    );
  } else {
    return navigate('/');
  }
}
