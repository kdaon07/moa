import styled from 'styled-components';

interface InfoProps {
    title: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    accountNumber: string;
    deadline: string;
    username: string;
    school: string;
}

export default function Info({ title, description, targetAmount, currentAmount, accountNumber, deadline, username, school }: InfoProps) {
    const percent = Math.floor((currentAmount / targetAmount) * 100);
    const remain = Math.max(targetAmount - currentAmount, 0);
    return (
        <Container>
            <Title>{title}</Title>
            <Container2>
                <SubTitle>모인금액</SubTitle>
                <AmountRow>
                    <Num>{currentAmount.toLocaleString()}</Num><Text>원</Text>
                </AmountRow>
                <Bar>
                    <Gauge style={{ width: `${percent}%` }} />
                </Bar>
            </Container2>
            <Container2>
                <SubTitle>목표금액</SubTitle>
                <AmountRow>
                    <Num>{targetAmount.toLocaleString()}</Num><Text>원</Text>
                </AmountRow>
            </Container2>

            <DescriptionSection>
                <DescriptionTitle>프로젝트 소개</DescriptionTitle>
                <DescriptionText>{description}</DescriptionText>
            </DescriptionSection>
            <Footer>
                <Target>
                    <span style={{ fontWeight: 'bold' }}>마감일</span>
                    <span>{deadline}</span>
                </Target>
                <Target>
                    <span style={{ fontWeight: 'bold' }}>작성자</span>
                    <span>{username} ({school})</span>
                </Target>
            </Footer>
            <FundingButton
                onClick={() => {
                    const isLoggedIn = !!localStorage.getItem('token');
                    if (!isLoggedIn) {
                        window.location.href = '/login';
                        return;
                    }
                    const path = window.location.pathname;
                    const idMatch = path.match(/(\d+)/);
                    const id = idMatch ? idMatch[1] : null;
                    if (id) {
                        window.location.href = `/fund/${id}`;
                    } else {
                        alert("잘못된 접근입니다.");
                    }
                }}
            >
                펀딩 참여하기
            </FundingButton>
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

const DescriptionSection = styled.div`
    margin: 24px 0;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    border-left: 4px solid #ff6b6b;
`;

const DescriptionTitle = styled.h3`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 12px;
`;

const DescriptionText = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #666;
    margin: 0;
`;