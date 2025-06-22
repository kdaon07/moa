'use client';

import styled from 'styled-components';
import { useState } from 'react';

export default function SignUpForm() {
  const [school, setSchool] = useState('');
  const [studentId, setStudentId] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e:any) => {
    e.preventDefault();
    console.log({ school, studentId, id, email, password, confirmPassword });
  };

  return (
    <FormContainer onSubmit={handleSignUp}>
      <RowBox>
        <SmallInput
          type="text"
          placeholder="학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <SmallInput
          type="number"
          placeholder="학번"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </RowBox>

      <Input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
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