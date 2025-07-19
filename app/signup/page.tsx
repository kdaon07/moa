'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  return (
    <Wrapper>
      <Title>모아에 오신 걸 환영해요</Title>
      <CardContainer>
        <Card onClick={() => router.push('/signup/student')}>
          <CardLabel>
            <CardImg src="/student.svg" alt="학생" />
          </CardLabel>
          <CardButton>
            회원가입 <span> &gt; </span>
          </CardButton>
        </Card>
        <Card onClick={() => router.push('/signup/community')}>
          <CardLabel>
            <CardImg src="/community.svg" alt="교직원" />
          </CardLabel>
          <CardButton>
            회원가입 <span> &gt; </span>
          </CardButton>
        </Card>
      </CardContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 80px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 60px;
`;

const Card = styled.div`
  width: 340px;
  height: 320px;
  border: 2px solid #FF6060;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  &:hover {
    box-shadow: 0 4px 16px rgba(234,134,133,0.15);
    border-color: #FF60605;
  }
`;

const CardLabel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardImg = styled.img`
  height: 200px;
  width: auto;
  display: block;
  user-drag: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const CardButton = styled.div`
  width: 100%;
  background: #FF6060;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
  padding: 22px 0 18px 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
