import React from 'react';
import styled from 'styled-components';
import QuestionList from './QuestionList';

const ListContainer = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.1); // 색상 수정
  /* height: 90px; // 본문 내용 길이에 따라 각 게시물 길이 변화가 필요하여 삭제 */
`;
const LeftMenu = styled.div`
  /* width: 20%; */
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
