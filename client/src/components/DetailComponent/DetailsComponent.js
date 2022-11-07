import React from 'react';
import styled from 'styled-components';
import PostView from '../PostView';
import IconContainer from './IconContainer';
import ProfileContainer from './ProfileContainer';

const Container = styled.main`
  display: flex;
  margin-top: 16px;
  padding-top: 16px;
  min-height: 186px;
  border-bottom: 1px solid #eee;
  & aside {
    padding-right: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    color: #6a737c;
  }
  & main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const TitleContainer = styled.div`
  margin: 0;
  margin-top: 16px;
`;

// 질문 데이터 하나하나를 여기에 담음
export default function DetailsComponent({ detail }) {
  return (
    <Container>
      <aside>
        <IconContainer />
      </aside>
      <main>
        {/* 질문 타이틀 넣어주기 */}
        <TitleContainer>
          {detail && (
            <PostView
              markdown={detail.answerContent}
              // dangerouslySetInnerHTML={{ __html: detail.answerContent }}
            ></PostView>
          )}
        </TitleContainer>
        {/* 태그 제외 , 작성자 정보 알려주기, 여기 현재 아이디와 다르다면 현재 유저는 edit버튼을 가질 수 없음*/}
        <ProfileContainer detail={detail} />
        {/* detail */}
      </main>
    </Container>
  );
}
