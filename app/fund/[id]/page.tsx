"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Header from "@/componets/header";
import { loadTossPayments } from "@tosspayments/payment-sdk";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const clientKey = "test_ck_E92LAa5PVbNBY4Q4M2NPV7YmpXyJ";

export default function FundPage() {
    const params = useParams();
    const id = params?.id;
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [amount, setAmount] = useState("5000");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);

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

    const mainImage = project.imagePaths && project.imagePaths.length > 0 ? project.imagePaths[0] : "/test.png";

    // 결제하기 버튼 클릭 시 실행
    const handleDonate = async () => {
        if (!agree1 || !agree2) {
            alert("약관에 모두 동의해야 결제가 가능합니다.");
            return;
        }
        if (!name || !email) {
            alert("이름과 이메일을 입력해주세요.");
            return;
        }
        const successUrl = `${window.location.origin}/fund/success/${id}`;
        const failUrl = `${window.location.origin}/fund/fail`;
        const orderId = `moa_order_${id}_${Date.now()}`;
        const params = {
            amount: Number(amount),
            orderId,
            orderName: project.title,
            customerName: name,
            customerEmail: email,
            successUrl,
            failUrl,
        };
        console.log("토스 결제 요청 파라미터:", params);
        try {
            const tossPayments = await loadTossPayments(clientKey);
            await tossPayments.requestPayment("카드", params);
        } catch (error: any) {
            const msg = (typeof error === 'object' && error?.message) ? error.message : String(error);
            if (!msg.includes("취소되었습니다")) {
                console.error("토스 결제창 에러:", error);
                alert("결제창을 여는 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <>
            <Header />
            <Bg>
                <MainContainer>
                    <Left>
                        <ImageMetaRow>
                            <ImageWrapper>
                                <Img src={mainImage.startsWith("http") ? mainImage : `${API_URL}${mainImage}`} alt="펀딩 대표 이미지" />
                            </ImageWrapper>
                            <MetaBox>
                                <MetaText>{project.school} | {project.username}</MetaText>
                                <TitleText>{project.title}</TitleText>
                            </MetaBox>
                        </ImageMetaRow>
                        <SectionTitle>펀딩 정보</SectionTitle>
                        <FundingBox>
                            <Row>
                                <LabelCell>후원금</LabelCell>
                                <InputCell>
                                    <Input
                                        type="text"
                                        placeholder="원하는 후원금액을 입력해주세요"
                                        value={amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        onChange={e => {
                                            const raw = e.target.value.replace(/[^\d]/g, "");
                                            setAmount(raw);
                                        }}
                                    />
                                </InputCell>
                            </Row>
                        </FundingBox>
                        <SectionTitle>후원자 정보</SectionTitle>
                        <SupporterBox>
                            <Row>
                                <LabelCell>이름</LabelCell>
                                <InputCell>
                                    <Input
                                        type="text"
                                        placeholder="이름을 입력해주세요"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>이메일</LabelCell>
                                <InputCell>
                                    <Input
                                        type="email"
                                        placeholder="이메일 주소를 입력해주세요"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </InputCell>
                            </Row>
                        </SupporterBox>
                    </Left>
                    <Right>
                        <FinalBox>
                            <FinalLabel>최종 후원 금액</FinalLabel>
                            <FinalAmount>{amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</FinalAmount>
                        </FinalBox>
                        <Notice>
                            후원은 <span>결제 완료</span>와 동시에 즉시 진행됩니다.<br />
                            본 프로젝트는 순수한 창작 활동 지원을 위한 후원이며,<br />
                            리워드(보상)는 제공되지 않습니다.
                        </Notice>
                        <CheckBoxRow>
                            <input type="checkbox" id="agree1" checked={agree1} onChange={() => setAgree1(!agree1)} />
                            <label htmlFor="agree1">개인정보 제3자 제공 동의</label>
                        </CheckBoxRow>
                        <CheckBoxRow>
                            <input type="checkbox" id="agree2" checked={agree2} onChange={() => setAgree2(!agree2)} />
                            <label htmlFor="agree2">후원 유의사항 확인</label>
                        </CheckBoxRow>
                        <GuideDetail>
                            후원은 상품 구매가 아닌 창작자에게 자금을 지원하는 활동입니다.<br />
                            계획은 예고 없이 변경될 수 있으며, 프로젝트 결과물 제공은 보장되지 않습니다.<br />
                            전자상거래법상 청약철회 규정은 적용되지 않습니다.
                        </GuideDetail>
                        <DonateButton
                            disabled={!agree1 || !agree2 || !name || !email || !amount || Number(amount) < 1000}
                            onClick={handleDonate}
                        >
                            후원하기
                        </DonateButton>
                    </Right>
                </MainContainer>
            </Bg>
        </>
    );
}

const Bg = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
  overflow-x: hidden;
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 160px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px 0 0 0;
`;
const Left = styled.div`
  width: 520px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const ImageWrapper = styled.div`
  width: 280px;
  height: 280px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  background-color: #f8f8f8;
`;
const MetaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 0;
  max-width: 1000px;
`;
const MetaText = styled.div`
  font-size: 13px;
  color: #888;
  font-weight: 400;
`;
const TitleText = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #222;
  white-space: normal;
`;
const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 18px 0 8px 0;
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 16px;
  background-color: #fff;
  &::placeholder { color: #b0b0b0; }
`;
const Right = styled.div`
  width: 420px;
  background: #fff;
  border-radius: 5px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const FinalBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 5px;
  padding: 16px 20px;
  margin-bottom: 8px;
`;
const FinalLabel = styled.div`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 16px;
`;
const FinalAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #222;
`;
const Notice = styled.div`
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
  span {
    color: #ff6b6b;
    font-weight: bold;
    font-size: 14px;
  }
`;
const CheckBoxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  margin-bottom: 4px;
`;

const GuideDetail = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  line-height: 1.6;
`;
const SupporterBox = styled.div`
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 5px;
  padding: 16px 16px 10px 16px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const FundingBox = styled.div`
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 5px;
  padding: 16px 16px 10px 16px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
const LabelCell = styled.div`
  width: 80px;
  font-size: 16px;
  font-weight: 700;
  color: #222;
`;
const InputCell = styled.div`
  flex: 1;
`;
const ImageMetaRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  margin-bottom: 18px;
`;
const DonateButton = styled.button`
  width: 100%;
  margin-top: 18px;
  padding: 16px 0;
  background: #ff6b6b;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff5252;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
