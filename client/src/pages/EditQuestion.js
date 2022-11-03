import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import TextEditor from '../components/TextEditor';
import Footer from '../components/Footer';
import QuestionTipModal from '../components/QuestionTipModal';
import Modal from '../components/Modal';

export default function EditQuestion() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lengthTitle, setLengthTitle] = useState('');
  const [lengthContent, setLengthContent] = useState('');

  const editorRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async () => {
    await axios
      .get('/api/questions')
      .then((response) => {
        let currentData = response.data.data;
        let originalTitle, originalContent;
        for (let i = 0; i < currentData.length; i++) {
          if (currentData[i].questionId == id) {
            originalTitle = currentData[i].questionTitle;
            originalContent = currentData[i].questionContent;
            setTitle(originalTitle);
            editorRef.current.getInstance().setHTML(originalContent);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    const formData = {
      questionId: id,
      questionTitle: title,
      questionContent: content,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };

    await axios
      .patch(`/api/questions/${id}`, JSON.stringify(formData), {
        headers: headers,
      })
      .then((response) => {
        alert('Your question has been edited successfully.');
        navigate(-1);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  return (
    <>
      <Nav />
      <ContainerWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <Container>
          <h2>Edit Your Question</h2>
          <QuestionTipModal margin={'0px 0px 30px 0px'} />
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
                qualified={
                  (lengthTitle >= MIN_LENGTH_TITLE ||
                    title.length >= MIN_LENGTH_TITLE) &&
                  'qualified'
                }
              >
                {title.length} / {MIN_LENGTH_TITLE}
              </LengthCounter>
            </Section>
            <Section>
              <SectionTitle>Body</SectionTitle>
              <span>
                {`Introduce the problem and expand on what you put in the title.
              Minimum ${MIN_LENGTH_CONTENT} characters.`}
              </span>
              <TextEditor
                ref={editorRef}
                onChange={countCharacter}
                value={' '}
              />
              <LengthCounter
                qualified={lengthContent >= MIN_LENGTH_CONTENT && 'qualified'}
              >
                {lengthContent} / {MIN_LENGTH_CONTENT}
              </LengthCounter>
            </Section>
          </SectionContainer>
          <ButtonContainer>
            <form>
              <Button type="submit" onClick={handleEdit} submit>
                Save Edits
              </Button>
            </form>
            <Modal
              functionHandler={() => {
                navigate(-1);
              }}
            />
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
  margin: 0 auto;
`;

const SidebarWrapper = styled.div`
  position: sticky;
  top: 53px;
  height: 450px;
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
  background-color: ${(props) => (props.submit ? '#0074CC' : 'white')};
  border-radius: 5px;
  border: none;
  color: ${(props) => (props.submit ? 'white' : 'red')};
  font-size: 13px;
  padding: 10px;
  width: 150px;
  height: 40px;
  cursor: pointer;
  align-self: start;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  margin-right: 25px;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => (props.submit ? '#0074cc' : 'C22F32')};
    opacity: 0.7;
    transition: 0.5s;
  }
`;

const LengthCounter = styled.div`
  font-size: 10px;
  font-weight: ${(props) => (props.qualified ? 'bold' : 'normal')};
  color: ${(props) => (props.qualified ? 'green' : 'red')};
  padding-left: 5px;
`;
