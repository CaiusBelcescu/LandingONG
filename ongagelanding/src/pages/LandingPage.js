// src/pages/LandingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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

const GoogleButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #db4437;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  margin-top: 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Logo = styled.img`
  max-width: 80%;
  height: auto;

  @media (max-width: 768px) {
    max-width: 50%;
  }
`;

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const accountCode = process.env.REACT_APP_ACCOUNTCODE;
  const username = process.env.REACT_APP_USERNAME;
  const password =process.env.REACT_APP_PASSWORD;
  const apiKey= process.env.APIKEY
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    state: '',
    zipcode: '',
    email: '',
    country: ''
  });

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          setFormData({
            ...formData,
            name: res.data.name,
            email: res.data.email
          });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ongageData = {
      email: formData.email,
      overwrite: true,
      fields: {
        first_name: formData.name,
        country: formData.country,
        state: formData.state,
        zip: formData.zipcode,
        keyword: formData.jobTitle
      }
    };
    const campaignerData = {
      EmailAddress: formData.email,
      CustomFields: [
        { FieldName: 'city', Value: formData.country },
        { FieldName: 'state', Value: formData.state },
        { FieldName: 'keyword', Value: formData.jobTitle }
      ]
    };
    try {
      const ongageResponse = await axios.post('https://api.ongage.net/167360/api/v2/contacts/', ongageData, {
        headers: {
          'Content-Type': 'application/json',
          'x_account_code': accountCode,
          'x_username':username,
          'x_password': password
        }
      });
      console.log('Ongage User created:', ongageResponse.data);
  
      const campaignerResponse = await axios.post('http://localhost:5000/api/https://edapi.campaigner.com/v1/Subscribers', campaignerData, {
        headers: {
          'Content-Type': 'application/json',
          'ApiKey': apiKey
        }
      });
      console.log('Campaigner User created:', campaignerResponse.data);
  
      window.location.href = 'https://jobswish.com/';
    } catch (error) {
      console.error('Error creating user:', error);
    }
    console.log('New User:', ongageData, campaignerData);
  };
  

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setFormData({
      name: '',
      jobTitle: '',
      state: '',
      zipcode: '',
      email: '',
      country: ''
    });
  };

  return (
    <Container>
      <Wrapper>
        <LeftSection>
          <Title>Find your wish job with Jobs Wish!</Title>
          <Subtitle>
            Looking for your dream job? Search for job openings based on your preferred role and location with Jobs Wish, the go-to platform for finding the perfect career opportunity.
          </Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
            />
            <SubmitButton type="submit">Register</SubmitButton>
          </Form>
          {profile ? (
            <div>
              <img src={profile.picture} alt="user" style={{marginTop:"10px"}}/>
              <h3>User Logged in</h3>
              <p>Name: {profile.name}</p>
              <p>Email Address: {profile.email}</p>
              <br />
              <GoogleButton onClick={logOut}>Log out</GoogleButton>
            </div>
          ) : (
            <GoogleButton onClick={login}>Sign in with Google 🚀</GoogleButton>
          )}
        </LeftSection>
        <RightSection>
          <Logo src="https://via.placeholder.com/300" alt="Logo" />
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default LandingPage;
