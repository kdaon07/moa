"use client";

import LoginForm from "@/componets/form/login/loginForm";
import styled from "styled-components";

export default function Login() {
    return (
        <Container>
            <LoginForm />
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
