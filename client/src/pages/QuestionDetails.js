import React, { useState } from 'react';
import styled from 'styled-components';

import RightSidebar from '../components/RightSidebar';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Details = styled.div`
  padding-right: 24px;
  .leftSidebar {
    position: fixed;
    top: 0;
  }
  .left {
    margin-top: 55px;
    position: fixed;
  }
  .askbutton {
    background: #0a95ff;
    border: 1px solid #dbdee2;
    color: #ffffff;
    width: 140px;
    height: 50px;
    border-radius: 5px;
    font-size: 13;
  }
  .head {
    margin-left: 180px;
    padding-top: 30px;
    padding-left: 30px;

    display: flex;
    align-items: center;
  }
  .title {
    // 창 크기 조절에 따라 서치바 사이즈 자동 조정
    width: 100%;
    font-weight: normal;
    margin: 10px;
    padding-top: 50px;

    font-size: 27px;
  }
  .current {
    margin-bottom: 8px;
    margin-right: 16px;
    font-size: 13px;
    margin-right: 2px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  .current div {
    margin-bottom: 8px;
    margin-right: 16px;
  }
  .container {
    margin-left: 200px;
  }
  .contents {
    display: flex;
  }
  //메인컨텐츠 내용
  .contentsmain {
    width: 100%;
    height: 100%;
  }
  .contents div {
    padding-right: 16px;
  }
`;

const QuestionDetails = () => {
  return (
    <>
      <Nav className="nav" />
      <Details>
        <div className="left">
          <Sidebar className="leftSidebar" />
        </div>
        <header className="head">
          <h1 className="title">
            title, Using less (2.2.1) raises an error requiring therubyracer
            cant install therubyracer on
          </h1>
          <button className="askbutton">Ask Question</button>
        </header>
        <div className="container">
          <div className="current">
            <div>Asked</div>
            <div>Modified </div>
            <didv>Viewed </didv>
          </div>
          <div className="contents">
            <div className="vote">vote</div>
            {/* 위 세모 */}
            <svg
              // aria-hidden="true"
              className="svg-icon iconArrowUpLg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
            >
              <path d="M2 25h32L18 9 2 25Z"></path>
            </svg>
            {/* 좋아요 갯수 */}
            <div>0</div>
            {/* 아래 세모 */}
            <svg
              aria-hidden="true"
              className="svg-icon iconArrowDownLg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
            >
              <path d="M2 11h32L18 27 2 11Z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="js-saves-btn-unselected svg-icon iconBookmarkAlt"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="m9 10.6 4 2.66V3H5v10.26l4-2.66ZM3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="mln2 mr0 svg-icon iconHistory"
              width="19"
              height="18"
              viewBox="0 0 19 18"
            >
              <path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path>
            </svg>
            <div className="contentsmain">
              메인내용 메인내용메인 메인내용 메인내용메인메인내용
              메인내용메인메인내용 메인내용메인메인내용 메인내용메인메인내용
              메인내용메인 메인내용 메인내용메인메인내용 메인내용메인메인내용
              메인내용메인메인내용 메인내용메인 메인내용 메인내용메인
            </div>
            <RightSidebar />
          </div>
        </div>
      </Details>
      <Footer />
    </>
  );
};

export default QuestionDetails;
