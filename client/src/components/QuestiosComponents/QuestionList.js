import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Description = styled.div`
  color: #3b4045;
  font-size: 14px;
`;

const StyledTitle = styled(Link)`
  color: #0074cc;
  font-size: 17px;
  text-decoration: none;
`;

const Profile = styled.div`
  text-align: end;
  margin-right: 37px;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const Time = styled.div`
  margin-left: 5px;
`;
export default function QuestionList({ QuestionData }) {
  return (
    <Container>
      <StyledTitle to="/">
        {/* 질문 화면으로 이동해야함 */}
        {QuestionData.id}
      </StyledTitle>
      <Description>
        {/* 등록된 질문 */}
        {QuestionData.question}
      </Description>
      <Profile>
        <CgProfile />
        {QuestionData.athor}
        <Time>작성 시간</Time>
      </Profile>
    </Container>
  );
}
