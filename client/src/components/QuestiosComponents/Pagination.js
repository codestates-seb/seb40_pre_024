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

export const sliceArrayBylimit = (total, limit) => {
  // 먼저 필요한 페이지 개수 만들어 배열에 담기
  const totalPageArray = Array(total)
    .fill()
    .map((_el, i) => i);
  // limit 기준으로 잘라서 필요한 페이지 수만큼 이중 배열 만들기
  return Array(Math.ceil(total / limit))
    .fill()
    .map(() => totalPageArray.splice(0, limit));
};

const Pagination = ({ total, limit, page, setPage }) => {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);
  // 필요한 페이지수
  const numPages = Math.ceil(total / limit);

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayBylimit(total, limit);
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
