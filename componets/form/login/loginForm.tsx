'use client';

import styled from 'styled-components';
import { useState } from 'react';

export default function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e:any) => {
    e.preventDefault();
    console.log('아이디:', id, '비밀번호:', password);
  };

  return (
    <FormContainer onSubmit={handleLogin}>
      <Input 
        type="text" 
        placeholder="아이디" 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
      />
      <Input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <LoginButton type="submit">로그인</LoginButton>
      <OptionBox>
        <Option>아이디 찾기</Option>
        <Divider>|</Divider>
        <Option>비밀번호 찾기</Option>
        <Divider>|</Divider>
        <Option onClick={() => window.location.href = '/signup'}>회원가입</Option>
      </OptionBox>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 16px;
  background-color: white;
`;

const LoginButton = styled.button`
  width: 300px;
  height: 50px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #ff5252;
  }
`;

const OptionBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 14px;
  color: #999;
`;

const Option = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  color: #ccc;
`;
