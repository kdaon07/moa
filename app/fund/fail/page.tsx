"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FailPage() {
  const router = useRouter();
  useEffect(() => {
    alert("오류가 발생했습니다. 메인화면으로 이동합니다.");
    router.push("/");
  }, [router]);
  return null;
} 