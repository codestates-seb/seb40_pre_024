import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImg from '../../assets/img/Profile.png';
const MainContainer = styled.div`
  width: 100%;
  height: 65px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

const DetailBtn = styled.button`
  padding-right: 10px;
  border: 0;
  background-color: white;
  color: #6a737c;
`;

const ProfileContain = styled.div`
  width: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 7px;
  height: 100%;
  background-color: #d3ebf8;
  & div {
    color: #6a737c;
    font-weight: 500;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;

  & img {
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }
  & div {
    color: #0074cc;
  }
`;
export default function ProfileContainer({ detail }) {
  //여기에는 댓글을 작성한 사람의 고유 아이디를 넣을것
  // user 정보랑 댓글 정보가 같으면 Edit 버튼이 있어야함.
  const currentId = '1'; // 여기에 상태로 관리되는 현재 유저아이디를 넣을것
  const navigate = useNavigate();

  const moveToEdit = (id) => {
    navigate(`detail/edit/${id}`);
  };

  return (
    <MainContainer>
      <div>
        <DetailBtn>Share</DetailBtn>
        <DetailBtn>Follwing</DetailBtn>
        {currentId === detail.userId && (
          <DetailBtn onClick={() => moveToEdit(detail.userId)}>Edit</DetailBtn>
        )}
      </div>
      <ProfileContain>
        <div>4 hours ago</div>
        <Profile>
          <img src={ProfileImg} alt={'프로필 사진'} />
          <div>유저 닉네임</div>
          {/* 작성 유저 닉넥임을 여기에 넣습니다 */}
        </Profile>
      </ProfileContain>
    </MainContainer>
  );
}
