import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
// import image from '../props/AmericanPicture1.webp'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 13rem); /* Adjust based on your navbar and footer height */
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
  /* padding: 2rem; */
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
  padding: 3rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 2rem; */

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
  margin-top: 0px;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.1rem;
  line-height: 1.2;
  text-align: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  color: #666;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  text-align: center;
  padding: 10px;

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
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')}; /* Red border if invalid */
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  background-color: ${({ readOnly }) => (readOnly ? '#e0e0e0' : '#fff')};

  @media (max-width: 768px) {
    max-width: 100%;
  }

  &:read-only {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;
const LineContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:disabled {
    background-color: #2962ff;
    cursor: not-allowed;
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
  /* padding: 0.75rem; */
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
const InputDown = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  /* border: 1px solid #ccc; */
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
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
  margin-bottom: 1rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box; /* Ensure padding and border are included in the width */

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4caf50; /* Green */
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const API_ENDPOINT_ROOT_URL = 'http://localhost:5000/api/';
// const API_ENDPOINT_ROOT_URL = 'https://hi.jobswish.com/api/';
const API_ENDPOINT_ONGAGE_URL = API_ENDPOINT_ROOT_URL + 'ongage/';
const API_ENDPOINT_CAMPAIGNER_URL = API_ENDPOINT_ROOT_URL + 'campaigner/';
const API_ENDPOINT_EMAIL_URL = API_ENDPOINT_ROOT_URL + 'email/';
const API_ENDPOINT_TEMPLATE = API_ENDPOINT_ROOT_URL + 'template/';
const API_ENDPOINT_VERIFY_RECAPTCHA = API_ENDPOINT_ROOT_URL+'verify-recaptcha';
const API_ENDPOINT_VERIFY_ZIPCODE= 'https://api.zippopotam.us/us/';
const API_ENDPOINT_GOOGLE_AUTH='https://www.googleapis.com/oauth2/v1/userinfo?access_token='

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [emailToSendFirstEmail,setEmailToSendFirstEmail]=useState('');
  const [profile, setProfile] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [emailValid,setEmailValid]= useState(true)
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    zipcode: '',
    email: ''
  });
  const [locationData, setLocationData] = useState({ city: '', state: '' });
  const [isZipValid, setIsZipValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_ENDPOINT_GOOGLE_AUTH}${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          setEmailToSendFirstEmail(res.data.email)
          setFormData({
            ...formData,
            name: res.data.name,
            email: res.data.email
          });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  useEffect(() => {
    const loadRecaptcha = async () => {
      try {
        const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
        if (siteKey && window.grecaptcha) {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute(siteKey, { action: 'submit' }).then((token) => {
              setRecaptchaToken(token);
            });
          });
        }
        console.log("ok chapcha")
      } catch (error) {
        console.error('Error loading reCAPTCHA:', error);
      }
    };

    loadRecaptcha();
  }, []);

  useEffect(() => {
    const sendData = async () => {
      if (!emailToSendFirstEmail) return;

      const ongageData = {
        email: formData.email,
        overwrite: true,
        fields: {
        }
      };

      const campaignerData = {
        EmailAddress: emailToSendFirstEmail,
      };

      try {
        const ongageResponse = await fetch(API_ENDPOINT_ONGAGE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ongageData),
        });

        if (!ongageResponse.ok) {
          throw new Error('Failed to create Ongage user');
        }

        const ongageResult = await ongageResponse.json();
        console.log('Ongage User created:', ongageResult);
      } catch (error) {
        console.error('Error creating user:', error);
      }

      try {
        const campaignerResponse = await fetch(API_ENDPOINT_CAMPAIGNER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(campaignerData),
        });

        if (!campaignerResponse.ok) {
          throw new Error('Failed to create Campaigner user');
        }

        const campaignerResult = await campaignerResponse.json();
        console.log('Campaigner User created:', campaignerResult);
      } catch (error) {
        console.log('Error creating Campaigner user:', error);
      }
    };

    sendData();
  }, [emailToSendFirstEmail]);



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



  const handleContinue = (e) => {
    e.preventDefault();
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(formData.email)
    if (!emailPattern.test(formData.email)) {
      console.log('Invalid email format');
      setEmailValid(false)
      return;
    }
    
    setProfile(formData.email);
    setEmailToSendFirstEmail(formData.email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const recaptchaResponse = await fetch(`${API_ENDPOINT_VERIFY_RECAPTCHA}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ gRecaptchaToken: recaptchaToken })
      });

      const recaptchaResult = await recaptchaResponse.json();
      console.log(recaptchaResult)
      if (!recaptchaResult.success) {
          console.error('reCAPTCHA verification failed.');
          setIsLoading(false);
          return;
      }
  } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      setIsLoading(false);
      return;
  }

    let responseLocation= null
    const zip=formData.zipcode
    console.log(zip)
    if (/^\d{5}$/.test(zip)) {
      try {
        const response = await axios.get(`${API_ENDPOINT_VERIFY_ZIPCODE}${zip}`);
        responseLocation=response
        if (response.data) {
          await setLocationData({
            city: response.data.places[0]['place name'],
            state: response.data.places[0]['state abbreviation']
          });
          console.log(locationData)
          await setIsZipValid(true);
        }
      } catch (error) {
        await setIsZipValid(false);
        setIsLoading(false);
        setLocationData({ city: '', state: '' });
        return
      }
    } else {
      await setIsZipValid(false);
      setIsLoading(false)
      setLocationData({ city: '', state: '' });
      return
    }
    console.log(isZipValid); 
    console.log(responseLocation)
    if (responseLocation===null) {
      console.log('Invalid ZIP code, cannot submit form.');
      setIsLoading(false)
      return;
    }


    let ongageData = {
      email: formData.email,
      overwrite: true,
      fields: {
        first_name: formData.name,
        zip: formData.zipcode,
        keyword: formData.jobTitle,
        state: '',
        city: ''
      }
    };
    let campaignerData = {
      EmailAddress: formData.email,
      CustomFields: [
        { FieldName: 'keyword', Value: formData.jobTitle },
        { FieldName: 'city', Value: '' },
        { FieldName: 'state', Value: '' },
        { FieldName: 'zip', Value: zip }
      ]
    };

    let emailData= {
      FromName:"Jobs Wish",
      FromEmail: "info@hi.jobswish.com",
      ReplyTo: "info@hi.jobswish.com",
      ToEmail:formData.email,
      Subject:"Welcome to Jobs Wish",
      HTML:""
    };
    if (responseLocation!==null)
    {
      const state = responseLocation.data.places[0]['state abbreviation'];
      const city = responseLocation.data.places[0]['place name'];

      ongageData.fields.state = state;
      ongageData.fields.city = city;

      campaignerData.CustomFields.forEach(field => {
        if (field.FieldName === 'state') {
          field.Value = state;
        } else if (field.FieldName === 'city') {
          field.Value = city;
        }
      });
    }

    let locationWithSpaces 
    if(responseLocation){
      locationWithSpaces = `${responseLocation.data.places[0]['place name']},${responseLocation.data.places[0]['state abbreviation']}`.replace(/ /g, '%');
    }else{
      locationWithSpaces=formData.zipcode
    }

    const queryParams = new URLSearchParams({
        keyword: formData.jobTitle,
        location: locationWithSpaces,
        name: formData.name
    }).toString();

    try {
      console.log(queryParams)
        const templateResponse = await fetch(`${API_ENDPOINT_TEMPLATE}?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!templateResponse.ok) {
            throw new Error('Failed to fetch template');
        }

        const templateResult = await templateResponse.text();
        emailData.HTML =templateResult;
    } catch (error) {
        console.error('Error fetching template:', error);
    }


    try {
      // Call the Ongage API through your server endpoint
      const ongageResponse = await fetch(API_ENDPOINT_ONGAGE_URL, {
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
    } catch (error) {
      console.error('Error creating user:', error);
    }

    try {
      // Call the Campaigner API through your server endpoint
      const campaignerResponse = await fetch(API_ENDPOINT_CAMPAIGNER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(campaignerData)
      });

      if (!campaignerResponse.ok) {
        throw new Error('Failed to create Campaigner user');
      }

      const campaignerResult = await campaignerResponse.json();
      console.log('Campaigner User created:', campaignerResult);

      
      const createdAt = new Date(campaignerResult.Created);
      createdAt.setHours(createdAt.getHours() + 3);
      console.log('Adjusted Created At:', createdAt);

      const now = new Date();
      console.log(now)
      const timeDiff = (now - createdAt) / 1000; // time difference in seconds
      console.log(timeDiff)


      // if (timeDiff <= 300) {

        // Send the email
        try {
          const emailResponse = await fetch(API_ENDPOINT_EMAIL_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
          });

          if (!emailResponse.ok) {
            console.log(emailResponse)
            throw new Error('Failed to send email' );
          }

          const emailResult = await emailResponse.json();
          console.log('Email sent:', emailResult);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      // } else {
      //   console.log('User not created within the last minute, email not sent');
      // }
    } catch (error) {
      console.error('Error creating Campaigner user:', error);
    }
    setIsLoading(false);
    // window.location.href = `https://jobswish.com/search?q=${formData.jobTitle}&l=${formData.zipcode}`;
    
    console.log('New User:', ongageData, campaignerData, emailData);
  };

  
  useEffect(() => {
    const loadRecaptcha = async () => {
      try {
        const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
        if (siteKey && window.grecaptcha) {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute(siteKey, { action: 'submit' }).then((token) => {
              setRecaptchaToken(token);
            });
          });
        }
      } catch (error) {
        console.error('Error loading reCAPTCHA:', error);
      }
    };

    loadRecaptcha();
  }, []);



  return (
    <Container>
      <Wrapper>
        <LeftSection>
        <Title>
          Get Daily Job Alerts straight to your inbox! 
        </Title>

        <Subtitle style={{color:'#2962ff'}}>
          Get Access to Over 3M Job Openings Now 
        </Subtitle>

          {profile ? (
            <>
              <Form onSubmit={handleSubmit}>
                
                <Input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  type="text"
                  name="jobTitle"
                  placeholder="Job Title*"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  type="text"
                  name="zipcode"
                  placeholder="Zipcode*"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  required
                  invalid={isZipValid ? undefined: "true"}
                />
                
                <Input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
                <SubmitButton type="submit" disabled={isLoading}>
                  {isLoading ? <Loader /> : 'Submit'}
                </SubmitButton>
                {!isZipValid && <span style={{ color: 'red' , marginTop:'10px'}}>Invalid ZIP code</span>}
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
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleInputEmail}
                  required
                  invalid={emailValid ? undefined: "true"}
                />
                <SubmitButtonDown type="submit" >Continue</SubmitButtonDown>
                {!emailValid && <span style={{ color: 'red' , marginTop:'10px'}}>Invalid Emai</span>}
              </Form2>
              
            </>
          )}
          <Subtitle>
            Search for job openings based on your preferred role and location.
          </Subtitle>
        </LeftSection>
        <RightSection>
          <Logo src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/aa/d4/a8/caption.jpg" alt="Logo" />
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default LandingPage;

