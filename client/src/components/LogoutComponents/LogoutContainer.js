import React from 'react';

import styled from 'styled-components';
import Ask from '../../assets/img/ask.png';
import sf from '../../assets/img/sf-icon.png';
import Stackapp from '../../assets/img/Stackapp.jpeg';
import StackExchange from '../../assets/img/Stack_Exchange_icon.svg.png';
import superuser from '../../assets/img/superuser.svg';
import Mo from '../../assets/img/Mo.png';
import Logo from '../../assets/img/Logo.png';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../redux/actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Container = styled.div`
  width: 526px;
  height: 525px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 21px;
  width: 100%;
  text-align: center;
  margin: 0 0 24px 0;
`;
const Ment = styled.div`
  color: #6a737c;
  font-size: 12px;
`;

const LogoutContain = styled.div`
  width: 310px;
  height: 410px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px,
    rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
`;
const InputContain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  font-size: 12px;
  margin-bottom: 16px;
`;

const BtnContainer = styled.div`
  width: 100%;
  height: 37px;
  padding: 2px;
  margin-bottom: 30px;
`;

const LogoutBtn = styled.button`
  width: 68px;
  height: 100%;
  padding: 10px;
  color: white;
  background: #0a95ff;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
  font-weight: 600;
  border: 0;
  margin-right: 4px;
  border-radius: 3px;
  &:hover {
    background: #0074cc;
  }
`;

const CancleBtn = styled.button`
  width: 68px;
  height: 100%;
  padding: 10px;
  color: #0074cc;
  background: white;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
  font-weight: 600;
  border: 0;
  margin-right: 4px;
  border-radius: 3px;
  &:hover {
    background: #f0f8ff;
  }
`;

const IconUl = styled.ul`
  list-style: none;
  width: 100%;
  height: 189px;
  padding-left: 0;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid black;
`;

const IconLi = styled.li`
  margin-bottom: 7px;
  height: 20px;
  & a {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color: #0074cc;
    font-weight: 400;
  }
  & a:visited {
    text-decoration: none;
  }
  & a > img {
    height: 16px;
    width: 16px;
    margin-right: 3px;
  }
  & a > img {
    height: 16px;
    width: 16px;
    margin-right: 3px;
  }
  & a > div {
    font-weight: 500;
  }
`;

export default function LogoutContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const logoutHandler = () => {
    // 리덕스 현재 유저 정보 초기화 할것
    // api로 로그아웃 요청
    let token = sessionStorage.getItem('jwt-token');
    console.log(token);
    axios.post(
      '/api/members/logout',
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    sessionStorage.removeItem('jwt-token');
    sessionStorage.removeItem('user');
    dispatch(clearUser());
  };

  const cancleHandler = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };

  if (user) {
    return (
      <Container>
        <Title>
          Clicking “Log out” will log you out of the following domains on this
          device:
        </Title>
        <LogoutContain>
          <IconUl>
            <IconLi>
              <a href={'https://askubuntu.com'}>
                <img src={Ask} alt="ask" />
                {'  '}
                <div>askubuntu.com</div>
              </a>
            </IconLi>
            <IconLi>
              <a href={'https://mathoverflow.net'}>
                <img src={Mo} alt="Mo" />
                <div>mathoverflow.net</div>
              </a>
            </IconLi>
            <IconLi>
              <a href={'https://serverfault.com'}>
                {' '}
                <img src={sf} alt="sf" />
                <div>serverfault.com</div>
              </a>
            </IconLi>
            <IconLi>
              <a href={'https://stackapps.com'}>
                {' '}
                <img src={Stackapp} alt="sf" />
                <div>stackapps.com</div>
              </a>
            </IconLi>
            <IconLi>
              <a href={'https://stackexchange.com'}>
                {' '}
                <img src={StackExchange} alt="StackExchange" />
                <div>stackexchange.com</div>
              </a>
            </IconLi>
            <IconLi>
              <a href={'https://stackoverflow.com'}>
                <img src={Logo} alt="Logo" />
                <div>stackoverflow.com</div>
              </a>
            </IconLi>
            <IconLi>
              <a href={'https://superuser.com'}>
                <img src={superuser} alt="superuser" />
                <div>superuser.com</div>
              </a>
            </IconLi>
          </IconUl>
          <InputContain>
            <input type="checkbox" style={{ margin: '0 6px 0 0' }} />{' '}
            <div> Log out on all devices</div>
          </InputContain>
          <BtnContainer>
            <LogoutBtn onClick={logoutHandler}>Logout</LogoutBtn>
            <CancleBtn onClick={cancleHandler}>Cancle</CancleBtn>
          </BtnContainer>
          <Ment>
            If you’re on a shared computer, remember to log out of your Open ID
            provider (Facebook, Google, Stack Exchange, etc.) as well.
          </Ment>
        </LogoutContain>
      </Container>
    );
  } else {
    return navigate('/');
  }
}
