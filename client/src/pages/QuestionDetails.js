import React, { useState } from 'react';
import styled from 'styled-components';

import RightSidebar from '../components/RightSidebar';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Details = styled.div`
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
            <div className="contentsmain">메인내용</div>
            <RightSidebar />
          </div>
        </div>
      </Details>
      <Footer />
    </>
  );
};

export default QuestionDetails;
