import React from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import Footer from '../components/Footer';
import Questions from '../components/Questions';
import styled from 'styled-components';

const MainContainer = styled.div`
  * {
    box-sizing: border-box;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NavContainer = styled.div`
  z-index: 100;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1300px;
  padding-top: 30px;
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 auto; // (이슈) 계속 중앙정렬 안되다가 이걸로 시도하니 해결
`;

const SidebarWrapper = styled.div`
  position: sticky;
  top: 53px;
  /* min-width: 165px; */
  /* padding-top: 10px; */
  height: 450px; // sticky 적용을 위한 height 설정 필수
  margin-bottom: 8px;
  /* height: 1500px; */
`;

const MainWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

const QuestionsWrapper = styled.div`
  flex: 2.5;
  width: 100%;
  height: fit-content;
`;

const RightSidebarWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
`;

const FooterWrapper = styled.footer`
  width: 100vw;
`;

const Home = () => {
  return (
    <>
      <MainContainer>
        <NavContainer>
          <Nav />
        </NavContainer>
        <Container>
          <SidebarWrapper>
            <Sidebar />
          </SidebarWrapper>
          <MainWrapper>
            <QuestionsWrapper>
              <Questions />
            </QuestionsWrapper>
            <RightSidebarWrapper>
              <RightSidebar />
            </RightSidebarWrapper>
          </MainWrapper>
        </Container>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </MainContainer>
    </>
  );
};

export default Home;
