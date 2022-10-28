import React, { useState } from 'react';
import styled from 'styled-components';

import RightSidebar from '../components/RightSidebar';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Details = styled.div`
  padding-right: 165px;
  padding-left: 150px;
  .leftSidebar {
    position: fixed;
    // top: 0;
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
    padding-top: 10px;
    padding-left: 10px;

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
  .container {
    margin-left: 200px;
  }
  .contents {
    display: flex;
  }
  //메인컨텐츠 내용
  .contentspost {
    width: 100%;
    height: 100%;
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
  .contentmain {
    width: 700px;
  }
`;

const QuestionDetails = () => {
  return (
    <>
      <Nav />
      <Details>
        <div className="left">
          <Sidebar className="leftSidebar" />
        </div>
        <header className="head">
          <h1 className="title">
            title, 타이틀 제목 내용 Using less (2.2.1) raises an error requiring
            therubyracer cant install therubyracer on
          </h1>
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
            <div className="contentmain">
              <div className="contentspost">
                메인내용 Im getting the video Trailer data but it doesnt play
                until I manually click the Play button (twice). But when I
                switch to different routes and come back to the same, it plays
                automatically. Again when I reload the page it doesnt.
              </div>
            </div>

            {/* <div className="contentspost">
              dddddddddddddddddddddddddddddddddddddd
            </div> */}
            <RightSidebar />
          </div>
        </div>
      </Details>
      <Footer />
    </>
  );
};

export default QuestionDetails;
