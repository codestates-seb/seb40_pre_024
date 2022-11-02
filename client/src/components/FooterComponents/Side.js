import React from 'react';
import styled from 'styled-components';

const LinkA = styled.a`
  margin-right: 5px;
  text-decoration: none;
  color: #596067;
  width: 300px;
`;

const BottomDiv = styled.div`
  color: #596067;
  margin: 90% 0 0 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.6rem;
`;

export default function Side() {
  return (
    <Container>
      <div>
        <LinkA href="https://stackoverflow.blog/?blb=1">Blog</LinkA>
        <LinkA href="https://www.facebook.com/officialstackoverflow/">
          facebook
        </LinkA>
        <LinkA href="https://twitter.com/stackoverflow">Twitter</LinkA>
        <LinkA href="https://linkedin.com/company/stack-overflow">
          Linked in
        </LinkA>
        <LinkA href="https://www.instagram.com/thestackoverflow">
          Instagram
        </LinkA>
      </div>
      <BottomDiv>
        <div>Site design / logo © 2022 Stack Exchange Inc; user</div>
        <div>contributions licensed under CC BY-SA. rev 2022.8.23.42893</div>
      </BottomDiv>
    </Container>
  );
}
