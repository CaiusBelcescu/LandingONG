// src/LandingPage.js
import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  padding: 1rem;
  background-color: #f0f0f0;
  box-sizing: border-box;

  @media (max-height: 650px) {
    flex-direction: column;
    height: auto;
    padding-top: 80px;
    margin-top: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  color: #666;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// const GoogleButton = styled(GoogleLogin)`
//   padding: 0.75rem;
//   border: none;
//   border-radius: 4px;
//   background-color: #db4437;
//   color: #fff;
//   font-size: 1rem;
//   cursor: pointer;
//   width: 100%;
//   max-width: 300px;

//   @media (max-width: 768px) {
//     max-width: 100%;
//   }
// `;

const Logo = styled.img`
  max-width: 80%;
  height: auto;

  @media (max-width: 768px) {
    max-width: 50%;
  }
`;

const LandingPage = () => {
  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response);
    // Handle your logic here (e.g., send token to backend)
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
    <Container>
      <Wrapper>
        <LeftSection>
          <Title>Find your wish job with Jobs Wish!</Title>
          <Subtitle>
            Looking for your dream job? Search for job openings based on your preferred role and location with Jobs Wish, the go-to platform for finding the perfect career opportunity.
          </Subtitle>
          <Form>
            <Input type="text" placeholder="Name" required />
            <Input type="text" placeholder="Job Title" required />
            <Input type="text" placeholder="State" required />
            <Input type="text" placeholder="Zipcode" required />
            <Input type="email" placeholder="Email" required pattern="[a-zA-Z0-9._%+-]+@gmail\.com" />

            <SubmitButton type="submit">Register</SubmitButton>
          </Form>
          
        </LeftSection>
        <RightSection>
          <Logo src="https://via.placeholder.com/300" alt="Logo" />
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default LandingPage;
