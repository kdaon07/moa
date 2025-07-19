'use client';

import styled from 'styled-components';
import { useState } from 'react';

export default function SignUpForm2() {
  const [school, setSchool] = useState('');
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSignUp = async (e:any) => {
    e.preventDefault();
    const data = {
      userid: id,
      username: username,
      password,
      email,
      school,
      role: 'COMMUNITY',
    };
    try {
      const res = await fetch(`${API_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('회원가입 성공!');
        window.location.href = '/login';
      } else {
        alert('회원가입 실패');
      }
    } catch (err) {
      alert('회원가입 중 오류 발생');
    }
  };

  return (
    <FormContainer onSubmit={handleSignUp}>
      <RowBox>
        <Input
          type="text"
          placeholder="학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </RowBox>

      <Input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        type="text"
        placeholder="이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="email"
        placeholder="이메일 주소"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <SignUpButton type="submit">회원가입</SignUpButton>
      <OptionBox>
        <Option onClick={() => window.location.href = '/login'}>로그인으로 이동</Option>
      </OptionBox>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowBox = styled.div`
  display: flex;
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

  &::placeholder {
    color: #b0b0b0;
  }
`;

const SmallInput = styled(Input)`
  width: 145px;
`;

const SignUpButton = styled.button`
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