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

// 특정시간으로부터 현재시간의 차이를 계산하는 함수
function elapsedTime(date) {
  const start = new Date(date);
  const end = new Date(); // 현재 날짜

  const diff = end - start; // 경과 시간
  // console.log('diff: ', diff);

  const times = [
    { time: 'min', milliSeconds: 1000 * 60 },
    { time: 'hour', milliSeconds: 1000 * 60 * 60 },
    { time: 'day', milliSeconds: 1000 * 60 * 60 * 24 },
    { time: 'month', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
    { time: 'year', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
  ].reverse();

  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime === 1) {
      return `${betweenTime} ${value.time} ago`;
    } else if (betweenTime > 0) {
      return `${betweenTime} ${value.time}s ago`;
    }
  }

  return 'just a few moments ago';
}

export default function QuestionList({ QuestionData }) {
  const {
    answer,
    questionViewed,
    questionTitle,
    questionContent,
    memberResponseDto,
    createdAt,
  } = QuestionData;

  // createdAt을 UTC기준시로부터 한국시간으로(9시간이후) 맞춰주는 작업
  let years = new Date(createdAt).getFullYear();
  let months = new Date(createdAt).getMonth() + 1;
  let dates = new Date(createdAt).getDate();
  let hours = new Date(createdAt).getHours() + 9;
  let minutes = new Date(createdAt).getMinutes();
  let seconds = new Date(createdAt).getSeconds();
  let newDate = new Date(
    `${years}-${months}-${dates} ${hours}:${minutes}:${seconds}`
  );
  // console.log('newDate: ', newDate);
  // console.log(Date(newDate));

  return (
    <>
      <Container>
        <LeftContainer>
          {/* 백과 데이터 작업 안하므로 로우데이터로 처리 */}
          {/* <span>{QuestionData.votes}34 votes</span>
          <span>{QuestionData.answer}0 answer</span> */}
          <span>34 votes</span>
          <span>0 answer</span>
          <span>{questionViewed} views</span>
        </LeftContainer>
        <RightContainer>
          <StyledTitle to={`detail/${QuestionData.questionId}`}>
            {/* 질문 화면으로 이동해야함 */}
            <h4>{questionTitle}</h4>
          </StyledTitle>
          <Description>
            {/* 등록된 질문 */}
            {/* (추가)내용이 길면 일부만 보여주는 로직 */}
            <p>
              {questionContent && questionContent.length > 150
                ? `${questionContent.slice(0, 150)} ...`
                : questionContent}
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
            {memberResponseDto.memberName}
            <Time>
              {/* 작성시간으로부터 얼마나 지났는지 표시 */}
              {elapsedTime(newDate)}

              {/* 작성시간을 표시하고 싶을 경우 */}
              {/* {new Date(newDate).toLocaleString('ko-KR')} */}
            </Time>
          </Profile>
        </RightContainer>
      </Container>
    </>
  );
}
