import React, { useState } from 'react';
import styled from 'styled-components';
import { BiLinkExternal } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Description from './Description';

const Container = styled.div`
  width: 300px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px,
    rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
  border-radius: 10px;
`;

const MentDiv = styled.div`
  font-size: ${({ fontSize }) => fontSize || '13px'};
  margin-bottom: 10px;
  padding: ${({ padding }) => padding || 0};
  margin-top: ${({ mt }) => mt || 0};
  text-align: center;
`;

const MentSpan = styled.span`
  font-size: 13px;
  color: #0074cc;
  cursor: pointer;
  & a {
    text-decoration: none;
    color: #0074cc;
  }
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
  margin: 0 0 5px 0;
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

const RegisterMent = styled.div`
  padding: 0 18px;
  margin-bottom: 16px;
  color: #6a737c;
  font-size: 12px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Checkbox = styled.div`
  padding: 0 18px;
  margin-bottom: 14px;
  display: flex;
  align-items: flex-start;
  & input {
    margin-right: 4px;
  }
  & div {
    margin: 2px 0 0 0;
    font-size: 12px;
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

export default function RegisterContainer() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: onchange });
  const onLogin = async (data) => {
    // console.log(data);
    // 회원가입 api 자리
    try {
      console.log(data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <MainContainer>
      <Description />
      <div>
        <Container>
          <Form onSubmit={handleSubmit(onLogin)}>
            <InputContainer>
              <Label htmlFor={'displayName'}>Display name</Label>
              <Input
                type={'text'}
                id="displayName"
                {...register('displayName', {
                  required: true,
                  minLength: 2,
                  maxLength: 16,
                })}
              />
              {errors.displayName && errors.displayName.type === 'required' && (
                <Errormsg>⚠ 닉네임을 입력해주세요.</Errormsg>
              )}
              {errors.displayName &&
                errors.displayName.type === 'minLength' && (
                  <Errormsg>⚠ 최소 길이는 2자 이상여야 합니다</Errormsg>
                )}
              {errors.displayName &&
                errors.displayName.type === 'maxLength' && (
                  <Errormsg>⚠ 최대 길이는 16자 이하여야 합니다</Errormsg>
                )}
            </InputContainer>
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
            <RegisterMent>
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </RegisterMent>
            <Checkbox>
              <input type={'checkbox'} />
              <div>
                Opt-in to receive occasional product updates, user research
                invitations, company announcements, and digests.
              </div>
            </Checkbox>
            <SubmitBtn type="submit" value={'Sign up'}></SubmitBtn>
            {error && <Errormsg>⚠ {error}</Errormsg>}
            <MentDiv padding={'0 18px'} fontSize={'12px'} mt={'30px'}>
              By clicking “Sign up”, you agree to our{' '}
              <MentSpan>
                <a href="https://stackoverflow.com/legal/terms-of-service/public">
                  terms of service, privacy policy{' '}
                </a>
              </MentSpan>
              and{' '}
              <MentSpan>
                <a href="https://stackoverflow.com/legal/cookie-policy">
                  {' '}
                  cookie policy{' '}
                </a>
              </MentSpan>
            </MentDiv>
          </Form>
        </Container>
        <MentDiv>
          Already have an account?
          <MentSpan onClick={() => navigate('/login')}> Log in</MentSpan>
        </MentDiv>
        <MentDiv>
          Are you an employer?{' '}
          <MentSpan onClick={() => navigate('/login')}>
            Sign up on Talent <BiLinkExternal />
          </MentSpan>
        </MentDiv>
      </div>
    </MainContainer>
  );
}
