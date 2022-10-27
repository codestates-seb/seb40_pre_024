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
  .contents {
    margin-left: 180px;
    display: flex;
    align-items: center;
    width: 760px;
  }
  .title {
    margin: 0;
    padding-top: 50px;

    font-size: 27px;
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
        <div className="contents">
          <div className="title">
            title, Using less (2.2.1) raises an error requiring therubyracer
            cant install therubyracer on
            windowsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>
          <button className="askbutton">Ask Question</button>
          <div>
            <div>Asked</div>
            <div>Modified </div>
            <didv>Viewed </didv>
          </div>
        </div>

        <RightSidebar />
      </Details>
      <Footer />
    </>
  );
};

export default QuestionDetails;
