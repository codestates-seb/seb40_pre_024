import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Nav from '../components/Nav';
import TextEditor from '../components/TextEditor';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import AnswerTipModal from '../components/AnswerTipModal';
import Modal from '../components/Modal';
import Loading from '../components/Loading';

export default function EditAnswer() {
  const [content, setContent] = useState('');
  const [answerId, setAnswerId] = useState('');
  const [lengthContent, setLengthContent] = useState('');
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem('jwt-token');
  const loginState = useSelector((state) => state.user.currentUser);

  const editorRef = useRef();
  const navigate = useNavigate();

  const MIN_LENGTH_CONTENT = 5;

  const countCharacter = () => {
    const data = editorRef.current.getInstance().getHTML();
    setContent(data);
    const dataWithoutTag = data.replace(
      /<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi,
      ''
    );
    setLengthContent(dataWithoutTag.length);
  };

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    loadInfo();
    setLoading(false);
  }, []);

  const loadInfo = async () => {
    await axios
      .get('/api/answers')
      .then((response) => {
        const PARAMS_VALUE = id;
        const currentData = response.data.data.filter(
          (el) => el.answerId == PARAMS_VALUE
        )[0];
        const loadContent = currentData.answerContent;
        editorRef.current.getInstance().setHTML(loadContent);
        setAnswerId(currentData.answerId);
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    const formData = {
      answerContent: content,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };

    await axios
      .patch(`/api/answers/${answerId}`, JSON.stringify(formData), {
        headers: headers,
      })
      .then((response) => {
        alert('Your answer has been edited successfully');
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
          <h2>Edit Your Answer</h2>
          <AnswerTipModal margin={'0px 0px 30px 0px'} />
          {loading ? (
            <Loading />
          ) : (
            <SectionContainer>
              <Section>
                <SectionTitle>Answer</SectionTitle>
                <span>
                  {`Introduce the problem and expand on what you put in the title.
              Minimum ${MIN_LENGTH_CONTENT} characters.`}
                </span>
                <TextEditor
                  ref={editorRef}
                  onChange={countCharacter}
                  value={'수정할 텍스트를 불러올 부분입니다.'}
                />
                <LengthCounter
                  qualified={lengthContent >= MIN_LENGTH_CONTENT && 'qualified'}
                >
                  {lengthContent} / {MIN_LENGTH_CONTENT}
                </LengthCounter>
              </Section>
              <Section>
                <SectionTitle>Edit Summary</SectionTitle>
                <Input disabled placeholder="Temporarily disabled" />
              </Section>
            </SectionContainer>
          )}
          <ButtonContainer>
            <form>
              <Button
                disabled={lengthContent >= MIN_LENGTH_CONTENT ? false : true}
                typed="submit"
                onClick={handleEdit}
                submit
              >
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
