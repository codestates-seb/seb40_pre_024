import React from 'react';
import styled from 'styled-components';

import RightSidebar from '../components/RightSidebar';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Details = styled.div`
  display: inline;
  .title {
    padding-top: 100px;
  }

  // .left {
  //   float: left;
  // }///

  .askbutton {
    background: #0a95ff;
    border: 1px solid #dbdee2;
    color: #ffffff;
    width: 140px;
    height: 50px;
    border-radius: 5px;
    font-size: 13;
  }
`;

const Right = styled.div`
  padding-top: 100px;
  padding-right: 50px;
`;

const QuestionDetails = () => {
  return (
    <>
      <Details>
        <Nav />
        <div>
          <h1 className="title">title</h1>
          <button className="askbutton" type="button">
            Ask Question
          </button>
        </div>
        {/* <Sidebar className="left" /> */}
        <Right>
          <RightSidebar className="right" />
        </Right>

        <Footer />
      </Details>
    </>
  );
};

export default QuestionDetails;
