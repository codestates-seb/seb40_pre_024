import React, { useState } from 'react';
import styled from 'styled-components';

function Modal({ functionHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>Discard draft</ModalBtn>
        {isOpen === true ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <h3>Discard question</h3>
              <span>
                Are you sure you want to discard this question? This cannot be
                undone.
              </span>
              <div>
                <button onClick={functionHandler}>Discard</button>
                <button onClick={openModalHandler}>Cancel</button>
              </div>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
}

export default Modal;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(20, 0, 0, 0.4);
`;

const ModalContainer = styled.div``;

const ModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  color: #c22f32;
  background-color: transparent;
  border-radius: 30px;
  cursor: pointer;
`;

const ModalView = styled.div`
  position: fixed;
  top: 50%;
  bottom: 50%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 600px;
  height: 140px;
  border-radius: 10px;
  padding: 20px;
  gap: 15px;
  position: absolute;
  background-color: #ffffff;
  h3 {
    margin: 0;
  }
  button {
    cursor: pointer;
    color: white;
    background-color: #c22f32;
    border: rgba(10, 0, 0, 0.4);
    padding: 10px 20px;
    border-radius: 8px;
  }
  button:last-child {
    margin-left: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    color: black;
  }
`;
