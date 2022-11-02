import React, { useState } from 'react';
import styled from 'styled-components';

function QuestionTipModal({ margin }) {
  // 부모 컴포넌트에 값 입력 e.g. margin={'0px 0px 50px 0px'}
  const [open, setOpen] = useState(false);
  const menuStep = [
    {
      title: 'Steps',
      content: [
        'Summarize your problem in a one-line title.',
        'Describe your problem in more detail.',
        'Describe what you tried and what you expected to happen.',
        'Add “tags” which help surface your question to members of the community.',
        'Review your question and post it to the site.',
      ],
    },
  ];
  //
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Container open={open !== true ? 'open' : null}>
      <TextContainer margin={margin}>
        <Text>
          <h2 style={{ marginBottom: '10px' }}>Writing a good question</h2>
          <p style={{ display: 'inline-block', fontSize: '15px' }}>
            You’re ready to ask a programming-related question and this form
            will help guide you through the process. Looking to ask a
            non-programming question? See the topics here to find a relevant
            site.
          </p>
          {menuStep.map((el, index) => {
            return (
              <div key={index} style={{ margin: '0' }}>
                <h4>{menuStep[index].title}</h4>
                <ul>
                  {el.content !== undefined
                    ? el.content.map((el, index) => {
                        return (
                          <ul key={index} style={{ marginLeft: '0' }}>
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
  background-color: #ebf4fb;
  border: 1px solid skyblue;
  width: 100%;
  padding: 20px 25px;
  position: relative;
  margin: ${(props) => props.margin};
`;

const Text = styled.div`
  p {
  }
`;

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

export default QuestionTipModal;
