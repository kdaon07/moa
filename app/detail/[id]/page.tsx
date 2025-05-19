"use client";

import CardList from "@/componets/main/cardList";
import Header from "@/componets/header";
export default function Home() {
  return (
    <div>
        <Header />
        <CardList title={"지금 인기있어요"} />
        <CardList title={"모아가 추천해요"}/>
    </div>
  );
}
