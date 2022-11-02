import React from 'react';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import logostackoverflow from '../assets/img/logostackoverflow.svg';
import {
  BsSearch,
  BsFillTrophyFill,
  BsFillQuestionCircleFill,
} from 'react-icons/bs';
import { HiInbox } from 'react-icons/hi2';
import { TiThMenu } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import MenuModal from './MenuModal';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = styled.nav`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  z-index: 1; // navbar 상단 고정을 위한 코드 추가
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 4px solid #f38224;
  background-color: #f8f9f9;
  box-shadow: 0px 2px 2px 0px #e1ecf4;

  .nav-container {
    width: 100%; // 창 크기 조절에 따라 서치바 사이즈 자동 조정
    min-width: auto;
    /* max-width: 1300px; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 120px;
    /* background-color: #f8f9f9; // 구역 확인용 */

    .logo-box {
      flex: 1;
      width: 164px;
      height: 47px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 157px;
        height: 38px;
        padding: 5px;
        cursor: pointer;
      }
      &:hover {
        background-color: #e9e9e9;
      }
    }

    .menu-box {
      width: ${(props) => props.width || null};
      /* width: 270px; */
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 7px;
      padding-top: 3px;

      button {
        border: none;
        font-size: 13px;
        letter-spacing: 0.4px;
        padding: 7px 12px;
        border-radius: 50px;
        background-color: #f8f9f9;

        &:hover {
          background-color: #e9e9e9;
        }
      }

      button:last-child {
        width: 90px;
        margin-right: 5px;
      }
    }

    a {
      text-decoration: none;
      color: black;
    }

    .searchbar-box {
      flex: 7;
      margin-right: 8px;
      position: relative;

      input {
        width: 100%;
        height: 37px;
        border: 1px solid #b0b0b0;
        border-radius: 3px;
        padding-left: 33px;

        &:focus,
        :active {
          outline: none;
          border: 1px solid #7faac9;
          box-shadow: 0px 0px 5px 3px rgba(54, 138, 255, 0.32);
        }
      }

      span {
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 18px;
        color: #828c95;
      }
    }

    .button-box {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      button:first-child {
        width: 60px;
        height: 37px;
        border: 1px solid #7faac9;
        border-radius: 3px;
        color: #2d5877;
        background-color: #e1ecf4;
        font-weight: 500;
        cursor: pointer;
        &:hover {
          background-color: #c5dceb;
        }
      }

      button:last-child {
        width: 70px;
        height: 37px;
        margin-right: 5px;
        border: 1px solid #7faac9;
        border-radius: 3px;
        color: white;
        background-color: #2192e9;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          background-color: #0a6bb6;
        }
      }
    }

    .login-button-box {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      color: #5b5c5d;
      /* margin-left: 10px; */

      .userinfo-box {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 10px 10px;

        button {
          border: none;
          color: inherit;
          padding-top: 3px;
          cursor: pointer;
          background-color: inherit;
        }

        span {
          font-size: 13px;
          font-weight: bold;
          color: inherit;
        }

        &:hover {
          background-color: #e9e9e9;
        }
      }

      .userinfo-etc {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        position: relative;

        button {
          border: none;
          color: inherit;
          background-color: #f8f9f9;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px 12px;
          height: inherit;
          cursor: pointer;

          &:hover,
          :focus {
            background-color: #e9e9e9;
          }
        }
      }
    }
  }
`;

const SearchToggle = styled.div`
  width: 100%;
  min-width: 500px;
  height: 180px;
  position: absolute;
  border: 1px solid #b0b0b0;
  top: 45px;
  border-radius: 3px;
  box-shadow: 0px 0px 3px 2px #e1ecf4;
  display: flex;
  /* display: ${(props) => props.toggle || 'flex'}; */
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  padding: 10px 13px;
  background-color: white;

  .search-toggle-text {
    display: flex;
    flex-wrap: wrap;

    p {
      flex: 1 1 40%;
      font-size: 13px;
      margin-bottom: 12px;
      color: #828c95;
      strong {
        color: #646d75;
      }
    }
  }

  .search-toggle-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;

    button {
      padding: 8px;
      border: 1px solid #7faac9;
      border-radius: 3px;
      color: #2d5877;
      background-color: #e1ecf4;
      cursor: pointer;
    }

    a {
      font-size: 12px;
      margin-right: 5px;
      text-decoration: none;
      color: #0074cb;
    }
  }
`;

const Nav = () => {
  const [isFocus, setIsFocus] = useState(false);
  const isLogin = useSelector((state) => state.user.currentUser);

  const [menuModal, setMenuModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();
  const outsideRef = useRef();
  const menuRef = useRef(null);
  useEffect(() => {
    const clickOutside = (e) => {
      if (outsideRef.current && !outsideRef.current.contains(e.target)) {
        console.log(e.target);
        setIsFocus(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [outsideRef]);
  //
  const handleSubmit = () => {
    e.preventDefault();
    // 검색 요청 로직 작성 부분
    setInputText('');
  };

  return (
    <Navbar>
      <div className="nav-container">
        <div className="logo-box">
          <Link to="/">
            <img src={logostackoverflow} alt="stackoverflow-logo" />
          </Link>
        </div>
        {isLogin ? (
          <div className="menu-box">
            <button>
              <a href="/">Products</a>
            </button>
          </div>
        ) : (
          <div className="menu-box" width="270px">
            <button>
              <a href="/">About</a>
            </button>
            <button>
              <a href="/">Products</a>
            </button>
            <button>
              <a href="/">For Teams</a>
            </button>
          </div>
        )}
        <div className="searchbar-box">
          <form>
            <input
              type="text"
              value={inputText}
              placeholder="Search..."
              onChange={(e) => setInputText(e.target.value)}
              onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(!isFocus)}
            />
            <span>
              <BsSearch />
            </span>
            {isFocus && (
              <SearchToggle ref={outsideRef}>
                <div className="search-toggle-box">
                  <div className="search-toggle-text">
                    <p>
                      <strong>[tag]</strong> search within a tag
                    </p>
                    <p>
                      <strong>user:1234</strong> search by author
                    </p>
                    <p>
                      <strong>&quot;words here&quot;</strong> exact phrase
                    </p>
                    <p>
                      <strong>collective:&quot;Name&quot;</strong> collective
                      content
                    </p>
                    <p>
                      <strong>answers:0</strong> unanswered questions
                    </p>
                    <p>
                      <strong>score:3</strong> posts with a 3+ score
                    </p>
                    <p>
                      <strong>is:question</strong> type of post
                    </p>
                    <p>
                      <strong>isaccepted:yes</strong> search within status
                    </p>
                  </div>
                  <hr />
                  <div className="search-toggle-button">
                    <button onClick={handleSubmit}>Ask a question</button>
                    <a href="/">Search help</a>
                  </div>
                </div>
              </SearchToggle>
            )}
          </form>
        </div>
        {isLogin ? (
          <div className="login-button-box">
            <div className="userinfo-box">
              <button>
                <FaUserCircle size={22} />
              </button>
              <span>1</span>
            </div>
            <div className="userinfo-etc">
              <button>
                <HiInbox size={20} />
              </button>
              <button>
                <BsFillTrophyFill size={18} />
              </button>
              <button>
                <BsFillQuestionCircleFill size={18} />
              </button>
              <button
                onClick={(e) => {
                  // e.stopPropagation();
                  setMenuModal(!menuModal);
                }}
                ref={menuRef}
              >
                <TiThMenu size={20} />
              </button>
              {menuModal && (
                <MenuModal setMenuModal={setMenuModal} menuRef={menuRef} />
              )}
            </div>
          </div>
        ) : (
          <div className="button-box">
            {/* 수정(버튼 클릭시 임시 로그인 기능 조치) */}
            <button onClick={() => navigate('/login')}>Log in</button>
            <button onClick={() => navigate('/register')}>Sign up</button>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default Nav;
