import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
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
    overflow: auto;
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
export default function MainProfileContainer({ detail }) {
  //여기에는 댓글을 작성한 사람의 고유 아이디를 넣을것
  // user 정보랑 댓글 정보가 같으면 Edit 버튼이 있어야함.
  const currentId = useSelector((state) => state.user.currentUser.memberEmail); // 여기에 상태로 관리되는 현재 유저아이디를 넣을것
  const navigate = useNavigate();

  const moveToEdit = (id) => {
    // 경로 수정해줄것.
    navigate(`/editanswer/${id}`);
  };

  const removeComment = async (id) => {
    let confirmData = confirm('정말로 삭제하시겠습니까?');
    let token = sessionStorage.getItem('jwt-token');

    if (confirmData && token) {
      try {
        await axios.delete(`/api/questions/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
          data: {},
        });
        window.location.reload();
      } catch (e) {
        alert('잘못된 요청입니다. 로그인을 다시 해주세요');
        console.log(e);
      }
    }
  };

  return (
    <MainContainer>
      <div>
        <DetailBtn>Share</DetailBtn>
        <DetailBtn>Follwing</DetailBtn>
        {/* 댓글을 제작한 유저의 데이터가 필요함 */}
        {currentId === detail.memberResponseDto.memberEmail && (
          <DetailBtn onClick={() => moveToEdit(detail.questionId)}>
            Edit
          </DetailBtn>
        )}
        {currentId === detail.memberResponseDto.memberEmail && (
          <DetailBtn onClick={() => removeComment(detail.questionId)}>
            Delete
          </DetailBtn>
        )}
      </div>
      <ProfileContain>
        <div>{detail && detail.createdAt.slice(0, 10)}</div>
        <Profile>
          <img src={ProfileImg} alt={'프로필 사진'} />
          <div>{detail && detail.memberResponseDto.memberName}</div>
          {/* 작성 유저 닉넥임을 여기에 넣습니다 */}
        </Profile>
      </ProfileContain>
    </MainContainer>
  );
}
