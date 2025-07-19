"use client";

import Header from "@/componets/header";
import Slider from "@/componets/detail/slider";
import Info from "@/componets/detail/info";
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;


export default function DetailPage() {
  const params = useParams();
  const id = params?.id;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_URL}/api/project/detail/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setProject(data);
        setLoading(false);
      });
  }, [id]);

  if (loading || !project) return <div>로딩중...</div>;

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Slider images={project.imagePaths} />
        <Info
          title={project.title}
          description={project.description}
          targetAmount={project.targetAmount}
          currentAmount={project.currentAmount}
          accountNumber={project.accountNumber}
          deadline={project.deadline}
          username={project.username}
          school={project.school}
        />
      </ContentWrapper>
    </Container>
  );
}
