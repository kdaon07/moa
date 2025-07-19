'use client';

import SignUpForm2 from '@/componets/form/sign up/signUpForm2';
import styled from 'styled-components';

export default function SignUp() {
  return (
    <Container>
      <SignUpForm2 />
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
