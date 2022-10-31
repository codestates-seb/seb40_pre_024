import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Nav from '../components/Nav';
import TextEditor from '../components/TextEditor';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';

export default function Ask() {
  const [title, setTitle] = useState('');
  const [lengthTitle, setLengthTitle] = useState('');
  const [content, setContent] = useState('');
  const [lengthContent, setLengthContent] = useState('');

  const MIN_LENGTH_TITLE = 20;
  const MIN_LENGTH_CONTENT = 50;

  const navigate = useNavigate();
  const backNavigate = () => {
    navigate(-1);
  };

  const editorRef = useRef();

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setContent(data);
    const dataWithoutTag = data.replace(
      /<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi,
      ''
    );
    setLengthContent(dataWithoutTag.length);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newData = {
      memberId: null,
      questionTitle: title,
      questionContent: content,
    };

    await axios
      .post('http://localhost:3000/data', JSON.stringify(newData), {
        headers: { 'Content-Type': `application/json` },
      })
      .then((res) => {
        console.log(console.log(res.data));
      })
      .catch((err) => console.log(err));

    setTitle('');
    setContent('');
  };

  return (
    <>
      <Nav />
      <ContainerWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <Container>
          <h2>Ask a public question</h2>
          <SectionContainer>
            <Section>
              <SectionTitle>Title</SectionTitle>
              <span>
                {`Be specific and imagine you are asking a question to another
              person. Minimum ${MIN_LENGTH_TITLE} characters.`}
              </span>
              <Input
                type="text"
                placeholder="type here.."
                maxLength="70"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setLengthTitle(event.target.value.length);
                }}
                required
              />
              <LengthCounter
                qualified={lengthTitle >= MIN_LENGTH_TITLE ? 'qualified' : null}
              >
                {lengthTitle} / {MIN_LENGTH_TITLE}
              </LengthCounter>
            </Section>
            <Section>
              <SectionTitle>Body</SectionTitle>
              <span>
                {`Introduce the problem and expand on what you put in the title.
              Minimum ${MIN_LENGTH_CONTENT} characters.`}
              </span>
              <TextEditor ref={editorRef} onChange={onChange} value={' '} />
              <LengthCounter
                qualified={
                  lengthContent >= MIN_LENGTH_CONTENT ? 'qualified' : null
                }
              >
                {lengthContent} / {MIN_LENGTH_CONTENT}
              </LengthCounter>
            </Section>
            <Section>
              <SectionTitle>Tags</SectionTitle>
              <span>
                Add up to 5 tags to describe what your question is about.
              </span>
              <InputTag disabled placeholder="Temporarily disabled"></InputTag>
            </Section>
          </SectionContainer>
          <ButtonContainer>
            <form>
              <Button
                disabled={
                  title.length <= MIN_LENGTH_TITLE ||
                  content.length <= MIN_LENGTH_CONTENT
                    ? true
                    : null
                }
                typed="submit"
                onClick={handleSubmit}
                submit
              >
                Review your question
              </Button>
            </form>
            <Modal functionHandler={backNavigate} />
          </ButtonContainer>
        </Container>
      </ContainerWrapper>
      <Footer />
    </>
  );
}

const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1300px;
  padding-top: 30px;
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 auto; // (이슈) 계속 중앙정렬 안되다가 이걸로 시도하니 해결
`;

const SidebarWrapper = styled.div`
  position: sticky;
  top: 53px;
  height: 450px; // sticky 적용을 위한 height 설정 필수
  margin-bottom: 8px;
`;

const Container = styled.main`
  padding: 4vh 5vw;
  background-color: transparent;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 5vh;
    align-self: flex-start;
  }
  align-self: start;
`;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  background-color: white;
  padding: 1.5vw 2vw;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  span {
    font-size: 12px;
  }
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin: 0;
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const InputTag = styled(Input)`
  width: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: ${(props) => (props.submit ? '#0074CC' : null)};
  border-radius: 5px;
  border: none;
  color: ${(props) => (props.submit ? 'white' : '#B13235')};
  font-size: 13px;
  padding: 10px;
  width: 150px;
  height: 40px;
  cursor: pointer;
  align-self: start;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  margin-right: 25px;
`;

const LengthCounter = styled.div`
  font-size: 10px;
  font-weight: ${(props) => (props.qualified ? 'bold' : 'normal')};
  color: ${(props) => (props.qualified ? 'green' : 'red')};
  padding-left: 5px;
`;
