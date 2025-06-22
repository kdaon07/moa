"use client";

import CardList from "@/componets/main/cardList";
import Header from "@/componets/header";
export default function Home() {
  return (
    <div>
        <Header />
        <CardList title={"우리 학교에서 진행 중인 펀딩"} />
        <CardList title={"다른 학교의 펀딩도 둘러보기"}/>
    </div>
  );
}
