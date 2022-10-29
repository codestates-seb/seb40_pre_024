import React, { useState } from 'react';
import styled from 'styled-components';
import { ImEarth } from 'react-icons/im';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (index) => {
    setIsActive(index);
  };
  const menuItems = [
    { name: 'Questions', link: '#' },
    { name: 'Tags', link: '#' },
    { name: 'Users', link: '#' },
  ];

  return (
    <>
      <Container>
        <Menu>
          <li>
            <p>Public</p>
            {menuItems.map((el, index) => {
              return (
                <MenuLink
                  key={index}
                  to={el.link}
                  className={isActive === index ? 'isActive' : null}
                  onClick={() => handleClick(index)}
                >
                  {index === 0 ? <EarthIcon /> : null}
                  {el.name}
                </MenuLink>
              );
            })}
          </li>
        </Menu>
        <MenuTeams>
          <p>
            <strong>Stack Overflow for Teams</strong> - Start Collaborating and
            sharing organizational knowledge.
          </p>
          <img alt="teamlogo" src={require('../assets/img/teams.png')} />
          <Button
            href="https://github.com/orgs/codestates-seb/projects/211/"
            target="_blank"
          >
            Create a free Team
          </Button>
          <WhiteButton>Why Teams?</WhiteButton>
        </MenuTeams>
      </Container>
    </>
  );
}

export default Sidebar;

// 사이드바 전체
const Container = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: 400;
  width: 165px;
  z-index: 100;
  /* height: 150vh; */
  height: 100%; // (수정) 메인페이지 게시물 리스트 길이 변화에 따른 스크롤시 footer 하단 고정 관련 이슈로 수정
  /* border-right: 1px solid rgba(0, 0, 0, 0.1); // (삭제) 줄이겹쳐서 줄이 긴쪽에서 반영하고 삭제 */
`;

// 메뉴 리스트
const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 0.8;
  li > p {
    font-size: 11px;
    text-transform: uppercase;
    margin: 16px 0px 0px 8px;
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  position: relative;
  height: 35px;
  padding-left: 30px;
  &.isActive {
    background-color: #eee;
    border-right: 5px #f48025 solid;
    opacity: 1;
    font-weight: bold;
    transition: 0.2s ease-in-out;
  }
`;

// 팀즈
const MenuTeams = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 20px 15px;
  /* border-top: 1px solid rgba(0, 0, 0, 0.1); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  p {
    opacity: 0.8;
  }
`;

const Button = styled.a`
  color: white;
  background-color: #f48025;
  text-align: center;
  width: 80%;
  padding: 7px 10px;
  border-radius: 5px;
  border: none;
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 600;
  &:hover {
    background-color: orange;
    scale: 1.05;
    font-weight: bold;
    transition: 0.1s ease-in-out;
  }
`;

const WhiteButton = styled(Button)`
  color: grey;
  background-color: white;
  &:hover {
    background-color: #eee;
  }
`;

const EarthIcon = styled(ImEarth)`
  font-size: 15px;
  margin-right: 5px;
  position: absolute;
  left: 8px;
  border: 0.1px solid #eee;
`;
