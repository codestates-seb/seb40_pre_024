import React, { useState } from 'react';
import styled from 'styled-components';

import RightSidebar from '../components/RightSidebar';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import DetailsComponent from '../components/DetailComponent/DetailsComponent';

const MainContainer = styled.div`
  * {
    box-sizing: border-box;
  }
  height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SidebarWrapper = styled.div`
  /* position: fixed;
  top: 53px; */
  /* min-width: 165px; */
  /* padding-top: 10px; */
  /* position: sticky; */

  padding-top: 53px;
  height: 450px; // sticky 적용을 위한 height 설정 필수
  padding-bottom: 8px;
  width: 300px;
  /* height: 1500px; */
`;

const NavContainer = styled.div`
  z-index: 300;
`;

const Details = styled.div`
  padding-right: 165px;
  padding-left: 150px;
  display: flex;
  width: 100%;

  .head {
    margin: 70px 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .right {
    margin-top: 60px;
    margin-left: 10px;
  }
  .askbutton {
    background: #0a95ff;
    border: 1px solid #dbdee2;
    color: #ffffff;
    width: 130px;
    height: 45px;
    border-radius: 5px;
    font-size: 9pt;
    margin-top: 30px;
    margin-right: 20px;
  }
  .title {
    // 창 크기 조절에 따라 서치바 사이즈 자동 조정
    width: 80%;
    font-weight: normal;

    font-size: 27px;
    color: #3b4045;
  }
  .current {
    margin-bottom: 8px;
    margin-right: 16px;
    font-size: 13px;
    margin-right: 2px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  .current div {
    margin-bottom: 8px;
    margin-right: 16px;
    color: #babfc3;
  }

  .contents {
    display: flex;
    justify-content: space-between;
  }
  .contentspost {
    width: 100%;

    word-break: break-all;
    margin-bottom: 16.5px;
    font-size: 15px;
  }
  .contents div {
    padding-right: 16px;
  }
  svg {
    fill: #babfc3;
  }
  .count {
    color: #babfc3;
    padding-left: 16px;
  }
  .vote {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .vote * {
    margin-bottom: 10px;
  }
  .current .currentcontents {
    color: black;
    margin-left: 5px;
  }
  .contentsmain {
    width: 700px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;

  & .container {
    width: 100%;
  }
`;
const Comments = styled.div`
  display: flex;
  flex-direction: column;
`;
const Smallcomments = styled.div`
  display: flex;
`;
const QuestionDetails = () => {
  let id = 'abc1';
  const dummyData = [
    {
      id: 'abc1',
      title: '이게 안되요1',
      question:
        '내용 1  내용 1  내용 1  내용 1  내용 1  내용 1  내용 1  내용 1  내용 1  내용 1  내용 1  내용 1  ',
      athor: '김코딩',
    },
    {
      comment: [
        {
          id: 'abc2',
          title: '이게 안되요2',
          question:
            '내용 2  내용 2  내용 2  내용 2  내용 2  내용 2  내용 2  내용 2  내용 2  내용 2  내용 2  내용 2  ',
          athor: '김코딩2',
        },
        {
          id: 'abc3',
          title: '이게 안되요3',
          question:
            '내용 3  내용 3  내용 3  내용 3  내용 3  내용 3  내용 3  내용 3  내용 3  내용 3  내용 3  내용 3  ',
          athor: '김코딩3',
        },
        {
          id: 'abc4',
          title: '이게 안되요4',
          question:
            '내용 4  내용 4  내용 4  내용 4  내용 4  내용 4  내용 4  내용 4  내용 4  내용 4  내용 4  내용 4  ',
          athor: '김코딩4',
        },
      ],
    },
  ];
  return (
    <MainContainer>
      <NavContainer>
        <Nav />
      </NavContainer>
      <Details>
        <div style={{ display: 'flex' }}>
          <SidebarWrapper>
            <Sidebar />
          </SidebarWrapper>
          <ContentWrapper>
            {/* 여기엔 API에서 질문의 제목을 입력해주세요 */}
            <header className="head">
              <h1 className="title">
                title, 타이틀 제목 내용 Using less (2.2.1) raises an error
                requiring therubyracer cant install therubyracer on
              </h1>
              {/* 유저가 로그인 되있으면 아래에 onClick 이벤트를 줘서 댓글창으로 이동해주세요 */}
              <button className="askbutton">Ask Question</button>
            </header>

            <div className="container">
              <div className="current">
                <div>
                  Asked
                  <span className="currentcontents asked">today</span>
                </div>
                <div>
                  Modified
                  <span className="currentcontents Modified">today</span>
                </div>
                <div>
                  Viewed
                  <span className="currentcontents Viewed">1 times</span>
                </div>
              </div>
              <div className="contents">
                <Comments>
                  {' '}
                  {/* question 안에다가 댓글 넣을 것 */}
                  {/* <Smallcomments>
                  <div className="vote">
                    <svg
                      aria-hidden="true"
                      className="svg-icon iconArrowUpLg"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                    >
                      <path d="M2 25h32L18 9 2 25Z"></path>
                    </svg>
                    <div className="count">0</div>
                    <svg
                      aria-hidden="true"
                      className="iconArrowDownLg"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                    >
                      <path d="M2 11h32L18 27 2 11Z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="iconBookmarkAlt"
                      width="23"
                      height="23"
                      viewBox="0 0 18 18"
                      preserveAspectRatio="none"
                    >
                      <path d="m9 10.6 4 2.66V3H5v10.26l4-2.66ZM3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="iconHistory"
                      width="23"
                      height="23"
                      viewBox="0 0 19 18"
                      preserveAspectRatio="none"
                    >
                      <path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path>
                    </svg>
                  </div>
                  <div className="contentsmain">
                    <div>
                      <div className="contentspost" key={dummyData[0].id}>
                        {dummyData[0].question}
                      </div>
                    </div>
                  </div>
                </Smallcomments> */}
                </Comments>
              </div>
            </div>
          </ContentWrapper>
          <div className="right">
            <RightSidebar />
          </div>
        </div>
      </Details>
      <Footer />
    </MainContainer>
  );
};

export default QuestionDetails;
