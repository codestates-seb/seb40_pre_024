import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Nav from '../components/Nav';
import TextEditor from '../components/TextEditor';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

export default function Ask() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lengthTitle, setLengthTitle] = useState('');
  const [lengthContent, setLengthContent] = useState('');

  const editorRef = useRef();
  const navigate = useNavigate();

  const token = sessionStorage.getItem('jwt-token');
  const loginState = useSelector((state) => state.user.currentUser);

  const MIN_LENGTH_TITLE = 5;
  const MIN_LENGTH_CONTENT = 15;

  const countCharacter = () => {
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

    if (!token) {
      alert('Token expired');
      navigate('/login');
      location.reload();
    }

    const formData = {
      memberId: loginState.memberId,
      questionTitle: title,
      questionContent: content,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };

    await axios
      .post('/api/questions', JSON.stringify(formData), {
        headers: headers,
      })
      .then((response) => {
        alert('Your question has been posted successfully.');
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    setTitle('');
    setContent('');
  };

  return (
    <>
      <Nav />
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
              qualified={lengthTitle >= MIN_LENGTH_TITLE && 'qualified'}
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
            <TextEditor ref={editorRef} onChange={countCharacter} value={' '} />
            <LengthCounter
              qualified={lengthContent >= MIN_LENGTH_CONTENT && 'qualified'}
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
                lengthTitle >= MIN_LENGTH_TITLE &&
                lengthContent >= MIN_LENGTH_CONTENT
                  ? false
                  : true
              }
              type="submit"
              onClick={handleSubmit}
              submit
            >
              Review your question
            </Button>
          </form>
          <Modal
            functionHandler={() => {
              navigate(-1);
            }}
          />
        </ButtonContainer>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.main`
  padding: 8vh 10vw;
  background-color: #f1f2f3;
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
