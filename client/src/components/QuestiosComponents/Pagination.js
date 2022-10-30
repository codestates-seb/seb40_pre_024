import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
`;

const SideButton = styled.button`
  /* width: 50px; */
  border: 1px solid rgb(200, 200, 200);
  border-radius: 3px;
  padding: 6px 10px;
  background-color: white;
  font-size: 0.8rem;
  cursor: pointer;

  &:disabled {
    display: none;
  }
`;

const Button = styled.button`
  /* width: 27px; */
  border: 1px solid rgb(200, 200, 200);
  border-radius: 3px;
  padding: 6px 9px;
  background-color: white;
  font-size: 0.8rem;

  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }

  &[aria-current] {
    border: 1px solid #f48225;
    background-color: #f48225;
    color: white;
    font-weight: bold;
    cursor: revert;
  }
`;

let PAGE_LIMIT = 5; // 페이지 리스트를 표시하고 넘길 단위

export const sliceArrayBylimit = (total, limit) => {
  // 먼저 필요한 페이지 개수 만들어 배열에 담기
  const numPages = Math.ceil(total / limit);

  // 필요한 페이지의 수를 배열로 만들기
  const totalPageArray = Array(numPages)
    .fill()
    .map((_el, i) => i);

  // 페이지를 pageLimite 단위로 끊어서 보여줄 배열의 수만큼 이중 배열 만들기
  return Array(Math.ceil(numPages / PAGE_LIMIT))
    .fill()
    .map(() => totalPageArray.splice(0, PAGE_LIMIT));
};

const Pagination = ({ total, limit, page, setPage }) => {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);
  // 필요한 페이지 수
  const numPages = Math.ceil(total / limit);
  // console.log(totalPageArray);
  // console.log(currentPageArray);

  useEffect(() => {
    // 현재 페이지가
    if (page % PAGE_LIMIT === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / PAGE_LIMIT)]);
    } else if (page % PAGE_LIMIT === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / PAGE_LIMIT) - 1]);
    }
  }, [page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayBylimit(total, limit);
    // console.log(slicedPageArray); // [[0~14], [15~29], [30~44], [45~49]]
    // console.log(slicedPageArray[numPages]); //undefined
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [total]);

  return (
    <>
      <Nav>
        <SideButton onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </SideButton>

        {currentPageArray.map((i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : null}
          >
            {i + 1}
          </Button>
        ))}

        {/* {page < 5 ? (
          currentPageArray.map((_el, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </Button>
          ))
        ) : (
          <>
            <Button onClick={() => setPage(1)}>1</Button>
            <BsThreeDots />
            {currentPageArray.map((_el, i) => (
              <Button
                key={i + 1}
                onClick={() => setPage(i + 3)}
                aria-current={page === i + 3 ? 'page' : null}
              >
                {i + 3}
              </Button>
            ))}
          </>
        )} */}
        {/* <BsThreeDots />
        <Button onClick={() => setPage(numPages)}>{total}</Button> */}

        <SideButton
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          Next
        </SideButton>
      </Nav>
    </>
  );
};

export default Pagination;
