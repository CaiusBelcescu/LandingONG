import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 16vh); /* Adjust based on your navbar and footer height */
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

  @media (max-width: 768px) {
    display: none;
  }
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

const LineContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px; /* Adjust height as needed */
`;

const HorizontalLine = styled.div`
    flex-grow: 1;
    height: 1px;
    background-color: #000;
    margin: 0 10px;
`;

const Text = styled.span`
    font-size: 16px; /* Adjust font size as needed */
    color: #333;
    white-space: nowrap; /* Prevent text from wrapping */
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #2962ff;
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
const Form2 = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  font-size: 1rem;
  padding: 0.75rem;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const Logo = styled.img`
  max-width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    max-width: 50%;
  }
`;
const WrapperButtonsDown = styled.div`
  width: 100%;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const InputDown = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SubmitButtonDown = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #2962ff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box; /* Ensure padding and border are included in the width */

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const API_ENDPOINT_ONGAGE = 'https://hi.jobswish.com/api/ongage/';
//const API_ENDPOINT_CAMPAIGNER = 'https://hi.jobswish.com/api/ongage/';

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    zipcode: '',
    email: ''
  });


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

  const handleInputEmail = (e) => {
    setFormData({
      ...formData,
      email: e.target.value
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleContinue = () => {
    setProfile(formData.email)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const ongageData = {
      email: formData.email,
      overwrite: true,
      fields: {
        first_name: formData.name,
        zip: formData.zipcode,
        keyword: formData.jobTitle
      }
    };
  
    const campaignerData = {
      EmailAddress: formData.email,
      CustomFields: [
        { FieldName: 'keyword', Value: formData.jobTitle }
      ]
    };

    const emailData= {
      ToEmail:"caius.belcescu@gmail.com",
      Subject:"Simple Email Example",
      HTML:"Hello Relay Send World"
    }
  
    try {
      // Call the Ongage API through your server endpoint
      const ongageResponse = await fetch(API_ENDPOINT_ONGAGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ongageData)
      });
      
      if (!ongageResponse.ok) {
        throw new Error('Failed to create Ongage user');
      }

      const ongageResult = await ongageResponse.json();
      console.log('Ongage User created:', ongageResult);
  
      // Call the Campaigner API through your server endpoint
      // const campaignerResponse = await fetch('http://34.249.201.161:5000/api/campaigner', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(campaignerData)
      // });
      //
      // if (!campaignerResponse.ok) {
      //   throw new Error('Failed to create Campaigner user');
      // }
      //
      // const campaignerResult = await campaignerResponse.json();
      // console.log('Campaigner User created:', campaignerResult);


      // const emailResponse = await fetch('http://34.249.201.161:5000/api/email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(emailData)
      // });

      // if (!emailResponse.ok) {
      //   throw new Error('Failed to create Campaigner user');
      // }
      
      // const emailResult = await emailResponse.json();
      // console.log('Email created:', emailResult);
      
      // Log out and redirect
      // logOut();
      window.location.href = `https://jobswish.com/search?q=${formData.jobTitle}&l=${formData.zipcode}`;
      // logOut();
    } catch (error) {
      console.error('Error creating user:', error);
    }
    
    console.log('New User:', ongageData, campaignerData,emailData);
  };


  

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setFormData({
      name: '',
      jobTitle: '',
      zipcode: '',
      email: ''
    });
  };

  return (
    <Container>
      <Wrapper>
        <LeftSection>
          <Title>Get job alerts straight to your inbox! Subscribe now!</Title>
          <Subtitle>
            Looking for your dream job? <p> Search for job openings based on your preferred role and location.</p>
          </Subtitle>
          {profile ? (
            <>
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
                  name="zipcode"
                  placeholder="Zipcode"
                  value={formData.zipcode}
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
                  readOnly
                />
                <SubmitButton type="submit">Register</SubmitButton>
              </Form>
            </>
          ) : (
            <>
              <GoogleButton onClick={login}>Sign in with Google 🚀</GoogleButton>
              <LineContainer>
                <HorizontalLine />
                <Text>OR</Text>
                <HorizontalLine />
              </LineContainer>
              
              <Form2 onSubmit={handleContinue}>
                <InputDown
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputEmail}
                  required
                />
                <SubmitButtonDown type="submit" >Continue</SubmitButtonDown>
              </Form2>
              
            </>
          )}
        </LeftSection>
        <RightSection>
          <Logo src="https://welcome.jobswish.com/img/pexels-alessio-cesario-1906879.5d688f25.jpg" alt="Logo" />
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default LandingPage;
