"use client";

import Header from "@/componets/header";
import Slider from "@/componets/detail/slider";
import Info from "@/componets/detail/info";
import styled from 'styled-components';

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

export default function Home() {
  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Slider />
        <Info />
      </ContentWrapper>
    </Container>
  );
}
