"use client";

import LoginForm from "@/componets/form/login/loginForm";
import styled from "styled-components";

export default function Login() {
    return (
        <Container>
            <Logo src="/Moa_logo.svg" alt="moa logo" />
            <LoginForm />
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffe5e5;
`;

const Logo = styled.img`
  height: 100px;
  margin-bottom: 48px;
`;
