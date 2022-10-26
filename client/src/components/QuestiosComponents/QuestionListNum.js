import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.header`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 9px;
  margin-left: 16px;
`;

export default function QuestionListNum({ resultLength }) {
  return <Container>{resultLength} results</Container>;
}
