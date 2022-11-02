import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-left: 18px;
`;
const Title = styled.h1`
  margin: 24px 0 0 0;
  font-size: 27px;
`;

// 버튼은 유저가 있을 때만 가능
// 유저 정보가 없으면 리다이렉트
const AddBtn = styled.button`
  background: #379fef;
  color: #ffffff;
  font-size: 13.6px;
  border: 0;
  border-radius: 3px;
  width: 98px;
  height: 32px;
  align-self: flex-end;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #0074cc;
    transition: 0.5s;
  }
`;
export default function QuestionAdd() {
  const navigate = useNavigate();
  const windowChange = () => {
    // if(){ // 유저가 있으면 질문 작성 창으로 이동
    // }else{
    //   navigate('/login')
    // }
    //
  };

  return (
    <Container>
      <Title>All Questions</Title>
      <AddBtn
        onClick={() => {
          windowChange();
        }}
      >
        Ask Question
      </AddBtn>
    </Container>
  );
}
