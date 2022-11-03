import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuestionAdd from './QuestiosComponents/QuestionAdd';
import QuestionListNum from './QuestiosComponents/QuestionListNum';
import QuestionsContainer from './QuestiosComponents/QuestionsContainer';
import FilterModal from './QuestiosComponents/FilterModal';
import Pagination from './QuestiosComponents/Pagination';
import useScrollTop from '../util/useScrollTop';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';

const ListContainer = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

// 태그 랜덤 생성
// (옵션) 순서도 섞고 데이터마다 랜덤한 태그가 들어가도록 추가작업 해보기
const randomTag = () => {
  let tags = ['java', 'javascript', 'firefox', 'svg', 'springboot'];
  let randomNum = Math.floor(Math.random() * 3 + 2);
  let randomIndexArray = [];
  for (let i = 0; i < randomNum; i++) {
    randomIndexArray.push(tags[i]);
  }
  return randomIndexArray;
};

export default function Questions() {
  const [filterModal, setFilterModal] = useState(false);

  const [questions, setQuestions] = useState([]); // 총 게시물 데이터
  const [limit, setLimit] = useState(15); // 페이지당 게시물 수
  const [page, setPage] = useState(1); // 현재 페이지
  const [questionsInfo, setQuestionsInfo] = useState({}); // 게시물 전체 데이터 정보
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // api로 전체 데이터 받아오기([{질문 아이디, 질문 제목, 질문 내용, 멤버 닉네임, 작성 날짜},...] 형식)
  const getQuestions = async () => {
    return await axios
      .get(`/api/questions/${location.search || `?page=${page}&size=${limit}`}`)
      .then((res) => {
        let randomTags = randomTag();
        const tags = {
          tag: randomTags,
        };

        if ([...res.data.data].length > 0) {
          let addedData = res.data.data.map((el) => {
            return Object.assign({ ...el }, tags);
          });
          setQuestions([...addedData]);
        }
        setQuestionsInfo({ ...res.pageInfo });
        setLoading(false);
      })
      .catch((err) => console.log(err, 'Error'));
  };

  useEffect(() => {
    getQuestions();
  }, [location.search, page]);

  return (
    <ListContainer>
      <QuestionAdd />
      {/* API 데이터를 전달(질문의 총개수를 전달) */}
      <QuestionListNum
        resultLength={questionsInfo.totalElements}
        filterModal={filterModal}
        setFilterModal={setFilterModal}
      />
      {filterModal && <FilterModal setFilterModal={setFilterModal} />}
      {loading ? (
        <Loading />
      ) : (
        questions &&
        questions.map((question) => (
          <QuestionsContainer
            key={question.questionId}
            QuestionData={question}
          />
        ))
      )}
      {questionsInfo.totalElements && ( // totalElements까지 확인 필요. 없으면 undefined 인 상태에서 하므로 에러 발생
        <Pagination
          total={questionsInfo.totalElements} //
          limit={limit}
          page={page}
          setPage={setPage}
        />
      )}
    </ListContainer>
  );
}
