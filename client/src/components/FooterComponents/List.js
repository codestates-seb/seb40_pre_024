import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ListContainer = styled.ul`
  padding: 0;
  margin: 0 0.5rem 0 0.5rem;
`;

const Title = styled.h3`
  color: #a4a9ae;
  font-weight: 700;
  padding: 0;
  margin: 0 0 1rem 0;
  cursor: pointer;
`;

const SmallTitle = styled.li`
  color: #596067;
  list-style: none;
  margin-bottom: 0.5rem;
  font-weight: 500;
  padding: 0;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
export default function List({ title, dataList }) {
  const navigate = useNavigate();
  return (
    <ListContainer>
      {title && (
        <Title
          onClick={() => {
            navigate('/');
          }}
        >
          {title}
        </Title>
      )}
      {dataList.map((x, idx) => (
        <SmallTitle
          key={idx}
          onClick={() => {
            navigate('/');
          }}
        >
          {x}
        </SmallTitle>
      ))}
    </ListContainer>
  );
}
