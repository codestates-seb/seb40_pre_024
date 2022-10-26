import React from 'react';
import styled from 'styled-components';
import QuestionAdd from './QuestiosComponents/QuestionAdd';
import QuestionListNum from './QuestiosComponents/QuestionListNum';
import QuestionsContainer from './QuestiosComponents/QuestionsContainer';

const ListContainer = styled.div`
  border-left: 1px solid gray;
  display: flex;
  flex-direction: column;
`;

export default function Questions() {
  // api로 전체 데이터 받아오기([{질문 아이디, 질문 제목, 질문 내용, 멤버 닉네임, 작성 날짜},...] 형식)
  const dummyData = [
    {
      id: 'kuu',
      title: '이게 안되요1',
      question: '이렇게 했는 데 이게 안되요1',
      athor: '김코딩',
    },
    {
      id: 'kuu5',
      title: '이게 안되요2',
      question: '이렇게 했는 데 이게 안되요2',
      athor: '김코딩2',
    },
    {
      id: 'kuu6',
      title: '이게 안되요3',
      question: '이렇게 했는 데 이게 안되요3',
      athor: '김코딩3',
    },
    {
      id: 'kuu8',
      title: '이게 안되요4',
      question: '이렇게 했는 데 이게 안되요4',
      athor: '김코딩4',
    },
  ];
  return (
    <ListContainer>
      <QuestionAdd />
      {/* API 데이터를 전달(질문의 총개수를 전달) */}
      <QuestionListNum resultLength={dummyData.length} />
      {dummyData.map((question) => (
        <QuestionsContainer key={question.id} QuestionData={question} />
      ))}
    </ListContainer>
  );
}
