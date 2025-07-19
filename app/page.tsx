"use client";

import { useEffect, useState } from "react";
import CardList from "@/componets/main/cardList";
import Header from "@/componets/header";
import { useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [mySchoolProjects, setMySchoolProjects] = useState<any[]>([]);
  const [otherSchoolProjects, setOtherSchoolProjects] = useState<any[]>([]);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";

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

  const filterProjects = (projects: any[]) => {
    if (!q) return projects;
    return projects.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.username && p.username.toLowerCase().includes(q)) ||
        (p.school && p.school.toLowerCase().includes(q))
    );
  };

  return (
    <div>
      <Header />
      {q ? (
        <>
          <div style={{margin: '24px 0 0 24px', fontWeight: 500, fontSize: 18}}>
            "{q}" 검색 결과
          </div>
          {token ? (
            <>
              <CardList title="우리 학교에서 진행 중인 펀딩" projects={filterProjects(mySchoolProjects)} />
              <CardList title="다른 학교의 펀딩도 둘러보기" projects={filterProjects(otherSchoolProjects)} />
            </>
          ) : (
            <CardList title="진행 중인 펀딩" projects={filterProjects(allProjects)} />
          )}
        </>
      ) : (
        token ? (
          <>
            <CardList title="우리 학교에서 진행 중인 펀딩" projects={mySchoolProjects} />
            <CardList title="다른 학교의 펀딩도 둘러보기" projects={otherSchoolProjects} />
          </>
        ) : (
          <CardList title="진행 중인 펀딩" projects={allProjects} />
        )
      )}
    </div>
  );
}
