import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Nav from '../components/Nav';
import TextEditor from '../components/TextEditor';
import Footer from '../components/Footer';

export default function Ask() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef();

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setContent(data);
  };

  console.log('title data 🚀', title);
  console.log('Content is 🚀', content);

  const handleSubmit = (event) => {
    event.preventDefault();

    const exampleData = {
      questionTitle: title,
      questionContent: content,
    };

    axios
      .post('http://localhost:4000/test', exampleData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

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
            <small>
              Be specific and imagine you are asking a question to another
              person.
            </small>
            <Input
              type="text"
              placeholder="type here.."
              maxLength="100"
              onChange={(event) => setTitle(event.target.value)}
              required
            ></Input>
          </Section>
          <Section>
            <SectionTitle>Body</SectionTitle>
            <small>
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </small>
            <TextEditor ref={editorRef} onChange={onChange} />
          </Section>
          <Section>
            <SectionTitle>Tags</SectionTitle>
            <small>
              Add up to 5 tags to describe what your question is about.
            </small>
            <InputTag></InputTag>
          </Section>
        </SectionContainer>
        <form>
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.main`
  padding: 8vh 10vw;
  background-color: #f1f2f3;
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
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const InputTag = styled(Input)`
  width: 50%;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin: 0;
`;

const Button = styled.button`
  background-color: #0074cc;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 13px;
  padding: 5px 10px;
  width: 100px;
  cursor: pointer;
  align-self: start;
`;
