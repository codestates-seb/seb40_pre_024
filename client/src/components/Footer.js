import React from 'react';
import styled from 'styled-components';
import List from './FooterComponents/List';
import Side from './FooterComponents/Side';
import Logo from '../../src/assets/img/Logo.png';
const MainContainer = styled.div`
  height: 40%;
  width: 100%;
  background-color: #202225;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  height: 60px;
  width: 50px;
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem;
  justify-content: center;
`;
const ListContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;

export default function Footer() {
  return (
    <MainContainer>
      <FooterContainer>
        <Image src={Logo} alt="logo" />
        <ListContainer>
          <List title={'STACK OVERFLOW'} dataList={['Questions', 'Help']} />
          <List
            title={'PRODUCTS'}
            dataList={['Teams', 'Advertising', 'Collectives', 'Talent']}
          />
          <List
            title={'COMPANY'}
            dataList={[
              'About',
              'Press',
              'Work Here',
              'Legal',
              'Privacy Policy',
              'Terms of Service',
              'Contact Us',
              'Cookie Settings',
              'Cookie Policy',
            ]}
          />
          <List
            title={'STACK EXCHANGE NETWORK'}
            dataList={[
              'Technology',
              'Culture & recreation',
              'Life & arts',
              'Science',
              'Professional',
              'Business',
              'API',
              'Data',
            ]}
          />
        </ListContainer>
        <Side />
      </FooterContainer>
    </MainContainer>
  );
}
