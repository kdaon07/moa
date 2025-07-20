"use client";

import { useSearchParams } from "next/navigation";
import CardList from "./cardList";
import React from "react";

interface SearchResultProps {
  mySchoolProjects: any[];
  otherSchoolProjects: any[];
  allProjects: any[];
  token: string | null;
}

export default function SearchResult({ mySchoolProjects, otherSchoolProjects, allProjects, token }: SearchResultProps) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";

  const filterProjects = (projects: any[]) => {
    if (!q) return projects;
    return projects.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.username && p.username.toLowerCase().includes(q)) ||
        (p.school && p.school.toLowerCase().includes(q))
    );
  };

  if (!q) return null;
  return (
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
  );
} 