import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { VscListFilter } from 'react-icons/vsc';
import { BsCaretDownFill } from 'react-icons/bs';

const Container = styled.header`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 9px;
  margin-left: 18px;
  padding-right: 18px;
`;

const SearchResult = styled.div``;

const FilterNavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .button-box-first {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* gap: 0.01px; */
    position: relative;
  }
  .button-box-second {
    width: fit-content;
    height: fit-content;
    border-radius: 3px;
  }
`;

const Button = styled.button`
  padding: 10.5px 12px;
  border: 1px solid #b0b0b0;
  cursor: pointer;
  color: #646d75;
  background-color: white;
  font-size: 13px;
  width: fit-content;

  &:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &:hover {
    background-color: #f8f9f9;
  }

  &:focus {
    background-color: #e9e9e9;
  }

  &:active {
    box-shadow: 0px 0px 2px 3px rgba(157, 170, 189, 0.349);
  }
`;

const LastButton = styled.div`
  padding: 9.5px 12px;
  border: 1px solid #b0b0b0;
  cursor: pointer;
  color: #646d75;
  background-color: white;
  font-size: 13px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  width: 70px;

  &:hover {
    background-color: #f8f9f9;
  }

  &:focus {
    background-color: #e9e9e9;
  }

  &:active {
    box-shadow: 0px 0px 2px 3px rgba(157, 170, 189, 0.349);
  }

  > div {
    position: relative;
    /* display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px; */
    > span:last-child {
      position: absolute;
      top: 1px;
      left: 36px;
    }
  }
`;

const MoreModal = styled.div`
  width: 200px;
  position: absolute;
  border: 1px solid #b0b0b0;
  top: 48px;
  right: -75px;
  border-radius: 3px;
  box-shadow: 0px 0px 3px 2px #e1ecf4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  align-items: flex-start;
  padding: 10px 0;
  background-color: white;
  font-size: 14px;
  color: #646d75;

  > hr {
    width: 100%;
    border: 1px solid #e9e9e9;
  }
  > div:first-child > p {
    color: black;
  }
  > div > p {
    padding-left: 13px;
    line-height: 28px;
    font-size: 13px;
    color: #828c95;
    strong {
      color: #646d75;
    }
  }
`;

const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 8.5px 9px;
  border: 1px solid #7faac9;
  border-radius: 3px;
  color: #2d5877;
  background-color: #e1ecf4;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #c5dceb;
  }
  &:active {
    border: 1px solid #7faac9;
    box-shadow: 0px 0px 2px 3px rgba(54, 138, 255, 0.32);
    z-index: 10;
  }
  &:focus {
    background-color: #a0bacd;
  }
`;

export default function QuestionListNum({
  resultLength,
  filterModal,
  setFilterModal,
}) {
  const [moreModal, setMoreModal] = useState(false);

  const MoreRef = useRef();
  const MoreButtonRef = useRef();

  useEffect(() => {
    const clickOutsideMore = (e) => {
      if (
        MoreRef.current &&
        !MoreRef.current.contains(e.target) &&
        MoreButtonRef.current &&
        !MoreButtonRef.current.contains(e.target)
      ) {
        // console.log(outsidemenuRef.current);
        // console.log(menuModal);
        setMoreModal(false);
        // console.log(menuRef);
      }
    };

    document.addEventListener('mousedown', clickOutsideMore);

    return () => {
      document.removeEventListener('mousedown', clickOutsideMore);
    };
  }, [MoreRef, MoreButtonRef]);

  return (
    <>
      <Container>
        <SearchResult>{resultLength} results</SearchResult>
        <FilterNavContainer>
          <div className="button-box-first">
            <Button>Newest</Button>
            <Button>Active</Button>
            <Button>Bountied</Button>
            <Button>Unanswered</Button>
            <LastButton
              ref={MoreButtonRef}
              onClick={() => setMoreModal(!moreModal)}
            >
              <div>
                <span>More</span>
                <span>
                  <BsCaretDownFill size={10} />
                </span>
              </div>
            </LastButton>
            {moreModal && (
              <MoreModal ref={MoreRef}>
                <div>
                  <p>Frequent</p>
                  <p>Score</p>
                </div>
                <hr />
                <div>
                  <p>Unanswered (my tags)</p>
                </div>
              </MoreModal>
            )}
          </div>
          <div className="button-box-second">
            <FilterButton onClick={() => setFilterModal(!filterModal)}>
              <VscListFilter size={19} />
              <div>Filter</div>
            </FilterButton>
          </div>
        </FilterNavContainer>
      </Container>
    </>
  );
}
