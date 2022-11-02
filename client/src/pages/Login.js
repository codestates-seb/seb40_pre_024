import React from 'react';
import styled from 'styled-components';
import LoginContainer from '../components/LoginComponents/LoginContainer';
import Nav from '../components/Nav';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f2f3;
`;

export default function Login() {
  //
  return (
    <>
      <Nav />
      <Container>
        <LoginContainer />
      </Container>
    </>
  );
}
