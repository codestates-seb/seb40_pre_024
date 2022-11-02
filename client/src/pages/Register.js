import React from 'react';
import styled from 'styled-components';
import Nav from '../components/Nav';
import RegisterContainer from '../components/RegisterComponents/RegisterContainer';

const MainContainer = styled.div`
  overflow: auto;
`;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f2f3;
  position: absolute;
  top: 50px;
  z-index: -1;
`;

export default function Register() {
  return (
    <MainContainer>
      <Nav />
      <Container>
        <RegisterContainer />
      </Container>
    </MainContainer>
  );
}
