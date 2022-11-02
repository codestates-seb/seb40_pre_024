import React, { useState } from 'react';
import styled from 'styled-components';

function AnswerTipModal({ margin }) {
  // 부모 컴포넌트에 값 입력 e.g. margin={'0px 0px 50px 0px'}
  const [open, setOpen] = useState(false);
  const menuText = [
    {
      title: 'Thanks for contributing an answer to Stack Overflow!',
      content: [
        'Please be sure to answer the question. Provide details and share your research!',
      ],
    },
    {
      title: 'But avoid …',
      content: [
        'Asking for help, clarification, or responding to other answers.',
        'Making statements based on opinion; back them up with references or personal experience.',
      ],
    },
    {
      title: 'To learn more, see our tips on writing great answers.',
      content: [],
    },
  ];

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Container open={open !== true ? 'open' : null}>
      <TextContainer margin={margin}>
        <Text>
          {menuText.map((el, index) => {
            return (
              <div key={index}>
                <span>
                  <strong>{el.title}</strong>
                </span>
                <ul>
                  {el.content !== undefined
                    ? el.content.map((el, index) => {
                        return (
                          <ul key={index}>
                            <li>{el}</li>
                          </ul>
                        );
                      })
                    : null}
                </ul>
              </div>
            );
          })}
        </Text>
        <Close
          onClick={() => {
            handleClick();
          }}
        >
          X
        </Close>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
`;

const TextContainer = styled.div`
  background-color: #fdf7e2;
  border: 1px solid orange;
  width: 100%;
  padding: 20px 25px;
  position: relative;
  margin: ${(props) => props.margin};
`;

const Text = styled.div``;

const Close = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 25%;
  text-decoration: none;
  border: none;
  background-color: transparent;
  color: black;
  cursor: grab;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default AnswerTipModal;
