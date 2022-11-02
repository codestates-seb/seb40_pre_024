import React from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Modal = styled.div`
  position: absolute;
  width: 380px;
  height: 233px;
  border: 1px solid #b0b0b0;
  right: 2px;
  top: 50px;
  border-radius: 3px;
  box-shadow: 0px 0px 3px 2px #e1ecf4;
  display: flex;
  /* display: ${(props) => props.toggle || 'none'}; */
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  background-color: white; // 추가(뒷배경 보임 조치)
`;

const ModalMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* color: #0074cb; */

  .modal-menu-title {
    width: 378px;
    height: 30px;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #f3f3f3;
    padding-top: 8px;
    display: flex;
    justify-content: space-between;

    // 순서를 지켜줘야 적용됨 link, visited, hover, active순
    a:visited {
      text-decoration: none;
      color: #0074cb;
      &:hover {
        color: #3e9fea;
      }
    }

    > div {
      margin: 0 12px;
    }

    > div:nth-child(2) {
      text-transform: lowercase;
      font-weight: normal;
    }
  }

  .modal-menu-content {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 40px;
    padding-right: 20px;
    background-color: #e8eef2;
    a:visited {
      color: #0074cb;
      text-decoration: none;
    }
    &:hover {
      background-color: #d4e5f3;
    }
    > div {
      font-weight: bold;
    }
    > div > span {
      margin-left: 12px;
      font-weight: normal;
    }
    > span:first-child {
      font-weight: bold;
    }
  }

  .modal-menu-content:last-child {
    background-color: white;
    &:hover {
      background-color: #d4e5f3;
    }
  }

  .modal-menu-content-2nd {
    width: 100%;
    padding: 8px 65px;
    background-color: #e8eef2;
    padding-bottom: 8px;

    a:visited {
      text-decoration: none;
      color: #0074cb;
    }

    &:hover {
      background-color: #d4e5f3;
    }
  }

  .modal-menu-box {
    position: relative;
    padding-top: 10px;
    background-color: white; // 추가(뒷배경 보임 조치)

    input {
      width: 360px;
      height: 32px;
      border: 1px solid #b0b0b0;
      border-radius: 3px;
      padding-left: 32px;
      margin-left: 7px;

      &::placeholder {
        color: #b0b0b0;
      }

      &:focus,
      :active {
        outline: none;
        border: 1px solid #7faac9;
        box-shadow: 0px 0px 5px 3px rgba(54, 138, 255, 0.32);
      }
    }
    .mini-searchbar {
      position: absolute;
      top: 18px;
      left: 16px;
      color: #828c95;
    }
  }
`;

const MenuModal = ({ setMenuModal, menuRef }) => {
  const outsidemenuRef = useRef();

  useEffect(() => {
    const clickOutsideMenu = (e) => {
      if (
        outsidemenuRef.current &&
        !outsidemenuRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        // console.log(outsidemenuRef.current);
        // console.log(menuModal);
        setMenuModal(false);
        // console.log(menuRef);
      }
    };

    document.addEventListener('mousedown', clickOutsideMenu);

    return () => {
      document.removeEventListener('mousedown', clickOutsideMenu);
    };
  }, [outsidemenuRef]);

  return (
    <Modal>
      <div className="modal-box" ref={outsidemenuRef}>
        <ModalMenu>
          <div className="modal-menu-title">
            <div>
              <a href="/">current community</a>
            </div>
          </div>
          <div className="modal-menu-content">
            <div>
              <a href="/">Stack Overflow</a>
            </div>
            <div>
              <span>
                <a href="/">help</a>
              </span>
              <span>
                <a href="/">chat</a>
              </span>
              <span>
                <Link to="/logout">log out</Link>
              </span>
            </div>
          </div>
          <div className="modal-menu-content-2nd">
            <a href="/">Meta Stack Overflow</a>
          </div>
        </ModalMenu>
        <ModalMenu>
          <div className="modal-menu-title">
            <div>
              <a href="/">your communities</a>
            </div>
            <div>
              <a href="/">edit</a>
            </div>
          </div>
          <div className="modal-menu-content">
            <span>
              <a href="/">Stack Overflow</a>
            </span>
            <span>
              <a href="/">1</a>
            </span>
          </div>
        </ModalMenu>
        <ModalMenu>
          <div className="modal-menu-title">
            <div>
              <a href="/">more stack exchange communities</a>
            </div>
            <div>
              <a href="/">company blog</a>
            </div>
          </div>
          <div className="modal-menu-box">
            <input type="text" placeholder="Find a Stack Exchange community" />
            <span className="mini-searchbar">
              <BsSearch size={16} />
            </span>
          </div>
        </ModalMenu>
      </div>
    </Modal>
  );
};

export default MenuModal;
