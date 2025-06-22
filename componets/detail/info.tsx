import styled from 'styled-components';

export default function Info() {
    return (
        <Container>
            <Title>다마고치 공구 선입금 펀딩</Title>
            <Container2>
                <SubTitle>모인금액</SubTitle>
                <AmountRow>
                    <Num>240,000</Num><Text>원</Text>
                </AmountRow>
                <Bar>
                    <Gauge style={{ width: '80%' }} />
                </Bar>
            </Container2>
            <Container2>
                <SubTitle>남은기간</SubTitle>
                <AmountRow>
                    <Num>7</Num><Text>일</Text>
                </AmountRow>
            </Container2>
            <Container2>
                <SubTitle>후원자</SubTitle>
                <AmountRow>
                    <Num>324</Num><Text>명</Text>
                </AmountRow>
            </Container2>
            <Footer>
                <Target>
                    <span>목표금액</span>
                    <span>300,000</span>
                </Target>
                <Target>
                    <span>예상 발송일</span>
                    <span>2025년 8월 19일</span>
                </Target>
                <Target>
                    <span>프리오더 기간</span>
                    <span>2025.04.25 ~ 2025.06.21</span>
                </Target>
            </Footer>
            <FundingButton>펀딩 참여하기</FundingButton>
        </Container>
    )
}

const Container = styled.div`
    width: 400px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
`;

const SubTitle = styled.div`
    font-size: 16px;
    color: #555;
`;

const Bar = styled.div`
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
`;

const Gauge = styled.div`
    height: 10px;
    background-color: #FF6060;
    border-radius: 5px;
`;

const Num = styled.div`
    font-size: 28px;
    font-weight: bold;
`;

const Text = styled.div`
    font-size: 18px;
    margin-left: 4px;
`;

const AmountRow = styled.div`
    display: flex;
    align-items: baseline;
`;

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
    color: #555;
`;

const Target = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FundingButton = styled.button`
    background-color: #FF6060;
    color: white;
    padding: 12px 0;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #e05555;
    }
`;