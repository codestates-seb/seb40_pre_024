import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import QuestionAdd from './QuestiosComponents/QuestionAdd';
import QuestionListNum from './QuestiosComponents/QuestionListNum';
import QuestionsContainer from './QuestiosComponents/QuestionsContainer';
import FilterModal from './QuestiosComponents/FilterModal';
import Pagination from './QuestiosComponents/Pagination';
import useScrollTop from '../util/useScrollTop';
import axios from 'axios';

const ListContainer = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export default function Questions() {
  // api로 전체 데이터 받아오기([{질문 아이디, 질문 제목, 질문 내용, 멤버 닉네임, 작성 날짜},...] 형식)
  const dummyData = [
    {
      id: 'kuu1',
      title: '이게 안되요1',
      question:
        '(길이 테스트) Lorem ipsum dolor sit amet consectetur adipisicing elit. commodi reprehenderit cupiditate animi molestias, facilis ratione, maxime odio voluptatum iste. Architecto doloremque sapiente reprehenderit laborum suscipit ut deserunt corrupti ad aperiam atque doloribus, voluptates, odit sed quod. Eaque expedita magni tenetur? Sapiente ipsam unde ab possimus quae. Officia magnam, saepe consequuntur in distinctio.',
      author: '김코딩',
      votes: '34 votes', // 데이터 내용 추가
      answer: '1 answer', // 데이터 내용 추가
      views: '604 views', // 데이터 내용 추가
      tag: ['java', 'javascript', 'firefox', 'svg', 'springboot'],
    },
    {
      id: 'kuu2',
      title: '이게 안되요2',
      question: '이번에는 될줄 알았는데 역시 안되네요',
      author: '말하는 감자',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu3',
      title: '이게 안되요3',
      question: '개발자란 이런 건가요',
      author: '말하는 감자',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu4',
      title: '이게 안되요4',
      question: '목으로라도 날아보고 싶어요 - 비둘기 개발자의 꿈',
      author: 'mock으로 날으는 비둘기',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu5',
      title: '제발 되게 해주세요',
      question: '왜 되는지 모르겠는데 되는게 더 신기...',
      author: '박해커',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu6',
      title: '이게 안되요4',
      question: '어 금지, 세명이상 모니터 앞에 모이기 금지',
      author: '최서버',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu7',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요4',
      author: '오디비',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu8',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요4',
      author: '박서버',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu9',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요4',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu10',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요4',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu11',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요4',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu12',
      title: '이게 안되요4',
      question: '이렇게 했는데이게 안되요12',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu13',
      title: '이게 안되요4',
      question: '이렇게 했는 데 이게 안되요13',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu14',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요14',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu15',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요15',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu16',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요16',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu17',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요17',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu18',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu19',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu20',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu21',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu22',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu23',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu24',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu25',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu26',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu27',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu28',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu29',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu30',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu31',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu32',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu33',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu34',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu35',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu36',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu37',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu38',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu39',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu40',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu41',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu42',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu43',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu44',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu45',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu46',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu47',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu48',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu49',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
    {
      id: 'kuu50',
      title: '이게 안되요4',
      question: '이렇게 했는데 이게 안되요18',
      author: '김코딩4',
      votes: '34 votes',
      answer: '1 answer',
      views: '604 views',
      tag: ['javascript', 'firefox', 'svg'],
    },
  ];

  const [filterModal, setFilterModal] = useState(false);

  let [questions, setQuestions] = useState([]); // 총 게시물 데이터
  const [limit, setLimit] = useState(5); // 페이지당 게시물 수
  const [page, setPage] = useState(1); // 현재 페이지

  questions = dummyData;

  const INDEX_OF_FIRSTPOST = (page - 1) * limit; // 페이지 첫 게시물의 인덱스

  // 게시물 데이터 fetching 준비
  // useEffect(() => {
  //   axios
  //     .get('')
  //     .then((data) => setQuestions(data))
  //     .catch((err) => console.log(err, 'Error'));
  // }, []);

  // console.log(questions) // 데이터 잘 불러오는지 확인

  // 한 페이지에 보여질 게시물수(slice는 끝 인덱스는 빼는 디테일 주의)
  const slicedQuestions = questions.slice(
    INDEX_OF_FIRSTPOST,
    INDEX_OF_FIRSTPOST + limit
  );
  // console.log(slicedQuestions);

  return (
    <ListContainer>
      <QuestionAdd />
      {/* API 데이터를 전달(질문의 총개수를 전달) */}
      <QuestionListNum
        resultLength={dummyData.length}
        filterModal={filterModal}
        setFilterModal={setFilterModal}
      />
      {filterModal && <FilterModal setFilterModal={setFilterModal} />}
      {slicedQuestions.map((question) => (
        <QuestionsContainer key={question.id} QuestionData={question} />
      ))}
      <Pagination
        total={questions.length} // questions 자체를 안넘기고 필요한 정보만 세팅해서 넘겨줌
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </ListContainer>
  );
}
