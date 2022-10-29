import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  width: 97.5%;
  height: 260px;
  background-color: #e9e9e9;
  margin: 20px;
  padding: 30px 0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
`;

const Uppart = styled.div`
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
`;

const OptionContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;

  h3 {
    font-size: 18px;
  }

  label {
    font-size: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
`;

const TextInput = styled.input`
  width: 220px;
  height: 32px;
  border: 1px solid #b0b0b0;
  border-radius: 3px;
  padding-left: 10px;
  margin-left: 7px;
  vertical-align: middle;

  &::placeholder {
    color: #b0b0b0;
  }

  &:focus,
  :active {
    outline: none;
    border: 1px solid #7faac9;
    box-shadow: 0px 0px 5px 3px rgba(54, 138, 255, 0.32);
  }
`;

const Downpart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 0 18px;

  button {
    padding: 8px;
    border: 1px solid #7faac9;
    border-radius: 3px;
    color: #2d5877;
    background-color: #e1ecf4;
    cursor: pointer;
  }

  a {
    font-size: 13px;
    margin-right: 5px;
    text-decoration: none;
    color: #0074cb;
  }
`;

const FilterModal = ({ setFilterModal }) => {
  return (
    <>
      <Container>
        <Uppart>
          <Form>
            <OptionContainer>
              <h3>Filter By</h3>
              <label>
                <input type="checkbox" name="filter" value="No answers" />
                <span>No answers</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="filter"
                  value="No accepted answer"
                />
                <span>No accepted answer</span>
              </label>
              <label>
                <input type="checkbox" name="filter" value="Has bounty" />
                <span>Has bounty</span>
              </label>
            </OptionContainer>
            <OptionContainer>
              <h3>Sorted By</h3>
              <label>
                <input type="radio" name="sorted" value="Newest" />
                <span>Newest</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="sorted"
                  value="Recent activity"
                  checked
                />
                <span>Recent activity</span>
              </label>
              <label>
                <input type="radio" name="sorted" value="Highest score" />
                <span>Highest score</span>
              </label>
              <label>
                <input type="radio" name="sorted" value="Most frequent" />
                <span>Most frequent</span>
              </label>
              <label>
                <input type="radio" name="sorted" value="Bounty ending soon" />
                <span>Bounty ending soon</span>
              </label>
            </OptionContainer>
            <OptionContainer>
              <h3>Tagged with</h3>
              <label>
                <input type="radio" name="tagged" value="My watched tags" />
                <span>My watched tags</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="tagged"
                  value="The following tags"
                  checked
                />
                <span>The following tags:</span>
              </label>
              <TextInput type="text" placeholder="e.g.javascript or python" />
            </OptionContainer>
          </Form>
        </Uppart>
        <hr />
        <Downpart>
          <button>Ask a question</button>
          <button onClick={() => setFilterModal(false)}>cancel</button>
        </Downpart>
      </Container>
    </>
  );
};

export default FilterModal;
