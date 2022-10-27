import React from 'react';
import styled from 'styled-components';
import QuestionList from './QuestionList';

const ListContainer = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 14px;
  border-top: 1px solid gray;
  height: 90px;
`;
const LeftMenu = styled.div`
  width: 20%;
  height: 100%;
  padding-right: 16px;
`;

export default function QuestionsContainer({ QuestionData }) {
  return (
    <ListContainer>
      <LeftMenu></LeftMenu>
      <QuestionList QuestionData={QuestionData} />
    </ListContainer>
  );
}
