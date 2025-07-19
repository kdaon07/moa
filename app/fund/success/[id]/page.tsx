"use client";
import styled from "styled-components";
import Header from "@/componets/header";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SuccessPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = params;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/api/project/detail/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setProject(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    // 결제 승인 요청
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (paymentKey && orderId && amount) {
      fetch(`${API_URL}/api/payments/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ paymentKey, orderId, amount }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("결제 승인 결과:", data);
        });
    }
  }, [searchParams]);

  if (loading) return <div>로딩중...</div>;

  return (
    <>
      <Header />
      <Bg>
        <Container>
          <Title>🎉 결제가 성공적으로 완료되었습니다!</Title>
          <InfoBox>
            <InfoRow>
              <Label>후원한 프로젝트</Label>
              <Value>{project?.title || "-"}</Value>
            </InfoRow>
          </InfoBox>
          <Button onClick={() => router.push("/")}>메인으로 돌아가기</Button>
        </Container>
      </Bg>
    </>
  );
}

const Bg = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  padding-top: 80px;
  box-sizing: border-box;
`;

const Container = styled.div`
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 48px 36px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #222;
  margin-bottom: 32px;
  text-align: center;
`;

const InfoBox = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Label = styled.div`
  color: #888;
  font-size: 15px;
`;

const Value = styled.div`
  color: #222;
  font-size: 16px;
  font-weight: 500;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 0;
  background: #ff6b6b;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff5252;
  }
`;
