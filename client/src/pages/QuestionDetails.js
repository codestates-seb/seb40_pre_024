import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DetailsComponent from '../components/DetailComponent/DetailsComponent';
import RightSidebar from '../components/RightSidebar';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TextEditor from '../components/TextEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProfileContainer from '../components/DetailComponent/ProfileContainer';
import MainProfileContainer from '../components/DetailComponent/MainProfileContainer';

const MainContainer = styled.div`
  * {
    box-sizing: border-box;
  }
  height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SidebarWrapper = styled.div`
  /* position: fixed;
  top: 53px; */
  /* min-width: 165px; */
  /* padding-top: 10px; */
  /* position: sticky; */
  padding-top: 53px;
  height: 100%; // sticky 적용을 위한 height 설정 필수
  padding-bottom: 8px;
  padding-left: 3px;
  border-right: 1px solid #eee;
  /* height: 1500px; */
`;

const NavContainer = styled.div`
  z-index: 300;
`;

const ContentWrappers = styled.div`
  display: flex;
  width: 90%;
`;

const Details = styled.div`
  /* padding-right: 165px;
  padding-left: 150px; */
  justify-content: center;
  display: flex;
  width: 100%;

  .head {
    margin: 70px 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .right {
    margin-top: 0px;
    margin-left: 10px;
  }
  .askbutton {
    background: #0a95ff;
    border: 1px solid #dbdee2;
    color: #ffffff;
    width: 130px;
    height: 45px;
    border-radius: 5px;
    font-size: 9pt;
    margin-top: 30px;
    margin-right: 20px;
  }
  .title {
    // 창 크기 조절에 따라 서치바 사이즈 자동 조정
    width: 80%;
    font-weight: normal;

    font-size: 27px;
    color: #3b4045;
  }
  .current {
    margin-bottom: 8px;
    margin-right: 16px;
    font-size: 13px;
    margin-right: 2px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  .current div {
    margin-bottom: 8px;
    margin-right: 16px;
    color: #babfc3;
  }

  .contents {
    display: flex;
    justify-content: space-between;
  }
  .contentspost {
    width: 100%;
    margin-top: 20px;
    word-break: break-all;
    margin-bottom: 16.5px;
    font-size: 15px;
  }
  .contents div {
    padding-right: 16px;
  }
  svg {
    fill: #babfc3;
  }
  .count {
    color: #babfc3;
    padding-left: 16px;
  }
  .vote {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .vote * {
    margin-bottom: 10px;
  }
  .current .currentcontents {
    color: black;
    margin-left: 5px;
  }
  .contentsmain {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media (max-width: 1000px) {
    .right {
      display: none;
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-left: 20px;
  & .container {
    width: 100%;
  }
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  & h3 {
    margin-top: 15px;
  }
`;

const Smallcomments = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;

  & h2 {
    margin-top: 17px;
  }

  & .disableBtn {
    background-color: rgb(183, 225, 247);
  }
  & .enableBtn {
    background-color: #379fef;
    transition: 0.5s;
    &:hover {
      background-color: #0074cc;
      transition: 0.5s;
    }
  }
  & .innerContain {
    display: flex;
    flex-direction: row;
    height: 120px;
    align-items: center;
  }
  &.LoginMessage {
    display: flex;
    flex-direction: row;
    width: 300px;
  }
  & #Btn {
    margin-right: 10px;
    width: 180px;
    height: 35px;
    color: white;
    border-radius: 3px;
    border: 0;
    font-weight: 600;
    cursor: pointer;
  }

  & .Link {
    display: inline-block;
    color: #379fef;
    margin: 0;
    cursor: pointer;
  }
`;

const QuestionDetails = () => {
  const { id } = useParams();
  const loginState = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const onNavigate = (e) => {
    navigate(`/${e}`);
  };
  const [value, setValue] = useState('');
  const onChange = () => {
    setValue(editRef.current.getInstance().getHTML());
  };
  const editRef = useRef(null);

  // 현재 페이지 메인 데이터
  const [mainData, setMaindata] = useState([]);
  // 댓글 목록
  const [coments, setComents] = useState([]);

  const serverData = async (id) => {
    try {
      let data = await axios.get(`/api/questions/${id}`);
      let settingData = data.data.data;
      setMaindata([{ ...settingData }]);
      if (settingData.answerResponseDto.data.length > 0) {
        setComents([...settingData.answerResponseDto.data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSumbit = async (e) => {
    const token = sessionStorage.getItem('jwt-token');

    try {
      let res = await axios.post(
        `/api/answers`,
        {
          questionId: id,
          answerContent: value,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setValue('');
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    serverData(id);
  }, []);

  return (
    <MainContainer>
      <NavContainer>
        <Nav />
      </NavContainer>
      <Details>
        <ContentWrappers>
          <SidebarWrapper>
            <Sidebar />
          </SidebarWrapper>
          <ContentWrapper>
            {/* 여기엔 API에서 질문의 제목을 입력해주세요 */}
            <header className="head">
              {mainData.length > 0 && (
                <h1 className="title">{mainData[0].questionTitle}</h1>
              )}
              {/* 유저가 로그인 되있으면 아래에 onClick 이벤트를 줘서 댓글창으로 이동해주세요 */}
              <button className="askbutton">Ask Question</button>
            </header>

            <div className="container">
              <div className="current">
                <div>
                  Asked
                  <span className="currentcontents asked">today</span>
                </div>
                <div>
                  Modified
                  <span className="currentcontents Modified">today</span>
                </div>
                <div>
                  Viewed
                  <span className="currentcontents Viewed">1 times</span>
                </div>
              </div>
              <div className="contents">
                <Comments>
                  {' '}
                  {/* question 안에다가 댓글 넣을 것 */}
                  <Smallcomments>
                    <div className="vote">
                      <svg
                        aria-hidden="true"
                        className="svg-icon iconArrowUpLg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                      >
                        <path d="M2 25h32L18 9 2 25Z"></path>
                      </svg>
                      <div className="count">0</div>
                      <svg
                        aria-hidden="true"
                        className="iconArrowDownLg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                      >
                        <path d="M2 11h32L18 27 2 11Z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="iconBookmarkAlt"
                        width="23"
                        height="23"
                        viewBox="0 0 18 18"
                        preserveAspectRatio="none"
                      >
                        <path d="m9 10.6 4 2.66V3H5v10.26l4-2.66ZM3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="iconHistory"
                        width="23"
                        height="23"
                        viewBox="0 0 19 18"
                        preserveAspectRatio="none"
                      >
                        <path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path>
                      </svg>
                    </div>
                    <div className="contentsmain">
                      <div>
                        <div className="contentspost">
                          {mainData.length > 0 && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: mainData[0].questionContent,
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                      {mainData.length > 0 && (
                        <MainProfileContainer detail={mainData[0]} />
                      )}
                    </div>
                  </Smallcomments>
                  {/* 질문에 대한 제목이 들어가야함 */}
                  {coments.length > 0 && <h3>Answers</h3>}
                  {coments.length > 0 &&
                    coments.map((coment) => {
                      if (coment !== undefined) {
                        return (
                          <DetailsComponent
                            key={coment.answerId}
                            detail={coment}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  {/* 텍스트 에디터 부분 */}
                  <EditorContainer>
                    <h2>Your Answer</h2>
                    <div className="AnswerContainer">
                      <TextEditor ref={editRef} onChange={onChange} />
                    </div>
                    <div className="innerContain">
                      <button
                        className={loginState ? 'enableBtn' : 'disableBtn'}
                        id="Btn"
                        disabled={!loginState}
                        onClick={() => {
                          onSumbit();
                        }}
                      >
                        Post Your Answer
                      </button>
                      {!loginState && (
                        <div className="LoginMessage">
                          You need to{' '}
                          <p
                            role="presentation"
                            className="Link"
                            onClick={() => {
                              onNavigate('login');
                            }}
                          >
                            login
                          </p>{' '}
                          or{' '}
                          <p
                            className="Link"
                            role="presentation"
                            onClick={() => {
                              onNavigate('register');
                            }}
                          >
                            signup
                          </p>{' '}
                          to add an answer.
                        </div>
                      )}
                    </div>
                  </EditorContainer>
                  {/*  */}
                </Comments>
                <div className="right">
                  <RightSidebar />
                </div>
              </div>
            </div>
          </ContentWrapper>
        </ContentWrappers>
      </Details>
      <Footer />
    </MainContainer>
  );
};

export default QuestionDetails;
