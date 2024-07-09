import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 1rem;
`;

const FooterTop = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem; //Chapcha space 

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  font-size: 1.5rem;
  max-width: 80%;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Logo = styled.img`
  height: 50px;
  max-width: 100%; /* Ensure logo adjusts to container width */
  margin-right: 0.5rem;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  color: gray;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: black;
  }
`;

const FooterText = styled.p`
  margin-top: 1rem;
  color: gray;
  font-size: 0.875rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CopyrightText = styled.span`
  color: black;
  margin-left: 0.5rem;
`;


const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <Brand href="/">
            
        </Brand>
        <NavList>
            <NavItem>
            <NavLink href="https://jobswish.com/policy"> Privacy Policy </NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="https://jobswish.com/contact"> Contact Us </NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="https://jobswish.com/policy#ca"> CA - Do Not Sell My Personal Information </NavLink>
            </NavItem>
        </NavList>
      </FooterTop>
      <FooterText>
        © 2024 Jobs Wish. <CopyrightText>All rights reserved.</CopyrightText>
        </FooterText>
    </FooterContainer>
  );
};

export default Footer;
