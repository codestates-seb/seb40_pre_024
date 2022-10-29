import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';

const Container = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 13px;
`;

const LeftContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  align-items: flex-end;
  margin-right: 15px;
  padding-top: 2px;
`;

const RightContainer = styled.div`
  flex: 5;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 22px;
`;
const Description = styled.div`
  color: #3b4045;
  font-size: 14px;
  line-height: 20px;
`;

const StyledTitle = styled(Link)`
  color: #0074cc;
  font-size: 17px;
  text-decoration: none;
  padding-bottom: 3px;
`;

const TagMockUp = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 7px;
  margin-top: 8px;
  button {
    padding: 5px 8px;
    border: none;
    border-radius: 3px;
    color: #2d5877;
    background-color: #e1ecf4;
  }
`;

const Profile = styled.div`
  text-align: end;
  margin-right: 37px;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  align-items: center;
  margin-top: 5px;
`;
const Time = styled.div`
  margin-left: 5px;
`;
export default function QuestionList({ QuestionData }) {
  return (
    <>
      <Container>
        <LeftContainer>
          <span>{QuestionData.votes}</span>
          <span>{QuestionData.answer}</span>
          <span>{QuestionData.views}</span>
        </LeftContainer>
        <RightContainer>
          <StyledTitle to="/">
            {/* 질문 화면으로 이동해야함 */}
            <h4>{QuestionData.title}</h4>
          </StyledTitle>
          <Description>
            {/* 등록된 질문 */}
            {/* (추가)내용이 길면 일부만 보여주는 로직 */}
            <p>
              {QuestionData.question && QuestionData.question.length > 150
                ? `${QuestionData.question.slice(0, 150)} ...`
                : QuestionData.question}
            </p>
          </Description>
          <TagMockUp>
            {QuestionData.tag &&
              QuestionData.tag.map((el, idx) => {
                return <button key={idx}>{el}</button>;
              })}
            {/* <button>{QuestionData.tag}</button> */}
          </TagMockUp>
          <Profile>
            <CgProfile />
            {QuestionData.author}
            <Time>작성 시간</Time>
          </Profile>
        </RightContainer>
      </Container>
    </>
  );
}
