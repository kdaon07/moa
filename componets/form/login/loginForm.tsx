'use client';

import styled from 'styled-components';
import { useState } from 'react';

export default function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e:any) => {
    e.preventDefault();
    const data = {
      userid: id,
      password,
    };
    
    console.log('API_URL:', API_URL);
    console.log('요청 데이터:', data);
    
    try {
      const res = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      console.log('응답 상태:', res.status);
      console.log('응답 헤더:', res.headers);
      
      if (res.ok) {
        const token = await res.text(); // 응답이 토큰 문자열
        console.log('받은 토큰:', token);
        localStorage.setItem('token', token);
        alert('로그인 성공!');
        window.location.href = '/'; // 메인 페이지로 이동
      } else {
        const errorText = await res.text();
        console.log('로그인 실패 응답:', errorText);
        alert(`로그인 실패: ${res.status} - ${errorText}`);
      }
    } catch (err) {
      console.error('로그인 에러:', err);
      alert(`로그인 중 오류 발생: ${err}`);
    }
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
