"use client";

import { useEffect, useState, Suspense } from "react";
import CardList from "@/componets/main/cardList";
import Header from "@/componets/header";
import SearchResult from "../componets/main/SearchResult";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [mySchoolProjects, setMySchoolProjects] = useState<any[]>([]);
  const [otherSchoolProjects, setOtherSchoolProjects] = useState<any[]>([]);
  const [allProjects, setAllProjects] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const headers: Record<string, string> = {};
    if (storedToken) headers["Authorization"] = `Bearer ${storedToken}`;

    if (storedToken) {
      fetch(`${API_URL}/api/project/list/myschool`, { headers })
        .then(res => res.ok ? res.json() : [])
        .then(data => setMySchoolProjects(data));
      fetch(`${API_URL}/api/project/list/otherschool`, { headers })
        .then(res => res.ok ? res.json() : [])
        .then(data => setOtherSchoolProjects(data));
    } else {
      fetch(`${API_URL}/api/project/list`)
        .then(res => res.ok ? res.json() : [])
        .then(data => setAllProjects(data));
    }
  }, []);

  return (
    <div>
      <Header />
      <Suspense>
        <SearchResult mySchoolProjects={mySchoolProjects} otherSchoolProjects={otherSchoolProjects} allProjects={allProjects} token={token} />
      </Suspense>
      {token ? (
        <>
          <CardList title="우리 학교에서 진행 중인 펀딩" projects={mySchoolProjects} />
          <CardList title="다른 학교의 펀딩도 둘러보기" projects={otherSchoolProjects} />
        </>
      ) : (
        <CardList title="진행 중인 펀딩" projects={allProjects} />
      )}
    </div>
  );
}
