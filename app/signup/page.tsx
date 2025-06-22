'use client';

import SignUpForm from '@/componets/form/sign up/signUpForm';
import styled from 'styled-components';

export default function SignUp() {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffe5e5;
`;
