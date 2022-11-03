import React from 'react';
import styled from 'styled-components';

const LoadContainer = styled.div`
  height: 100%;
  padding-top: 30px;
`;

const Load = styled.div`
  text-align: center;
  position: relative;
  width: 150px;
  height: 20px;

  top: 45%;
  top: -webkit-calc(50% - 10px);
  top: calc(50% - 10px);
  left: 25%;
  left: -webkit-calc(50% - 75px);
  left: calc(50% - 75px);

  &:after {
    content: 'LOADING ...';
    color: #fff;
    font-family: Lato, 'Helvetica Neue';
    font-weight: 200;
    font-size: 16px;
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    left: 0;
    top: 0;
    background-color: black;
    z-index: 1;
  }
  &::before {
    content: '';
    position: absolute;
    background-color: #fff;
    top: -5px;
    left: 0px;
    height: 30px;
    width: 0px;
    z-index: 0;
    opacity: 1;
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
    -webkit-animation: loader3 10s ease-in-out infinite;
    animation: loader3 10s ease-in-out infinite;
  }
`;

function Loading() {
  return (
    <LoadContainer>
      <Load></Load>
    </LoadContainer>
  );
}

export default Loading;
