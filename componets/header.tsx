import styled from "styled-components";
import Button from "./button";
import Search from "./search";
import { useEffect, useState } from 'react';

const Header = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const localName = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
        if (token) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/myinfo`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data.username) {
                    setUsername(data.username);
                    setUserRole(data.role);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('userRole', data.role);
                } else {
                    setUsername(null);
                    setUserRole(null);
                    localStorage.removeItem('username');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('token'); // 토큰도 삭제
                }
            })
            .catch(() => {
                setUsername(null);
                setUserRole(null);
                localStorage.removeItem('username');
                localStorage.removeItem('userRole');
                localStorage.removeItem('token'); // 토큰도 삭제
            });
        } else if (localName) {
            setUsername(localName);
            const role = localStorage.getItem('userRole');
            setUserRole(role);
        } else {
            setUsername(null);
            setUserRole(null);
        }
    }, []);

    const handleLogoClick = () => {
        window.location.href = '/';
    };

    const handleMakeClick = () => {
        if (!username) {
            // 로그인 상태가 아니면 로그인 페이지로
            window.location.href = '/login';
        } else if (userRole !== 'STUDENT') {
            // 학생이 아니면 알림
            alert('학생만 프로젝트를 생성할 수 있습니다.');
        } else {
            // 로그인 상태이고 학생이면 /make로 이동
            window.location.href = '/make';
        }
    };

    return (
        <Container>
            <Logo 
                src="/Moa_logo.svg" 
                alt="moa logo" 
                onClick={handleLogoClick}
            />
            <Spacer />
            <Search />
            <ButtonWrapper>
                <Button color="#FF6060" onClick={handleMakeClick} />
            </ButtonWrapper>
            <RightBox>
                {username ? (
                    <>
                        <UserName>{username}님</UserName>
                        <AuthButton onClick={() => {
                            localStorage.removeItem('username');
                            localStorage.removeItem('userRole');
                            localStorage.removeItem('token');
                            alert('로그아웃 되었습니다');
                            window.location.reload();
                        }}>로그아웃</AuthButton>
                    </>
                ) : (
                    <>
                        <AuthButton onClick={() => window.location.href = '/login'}>로그인</AuthButton>
                        <AuthButton onClick={() => window.location.href = '/signup'}>회원가입</AuthButton>
                    </>
                )}
            </RightBox>
        </Container>
    );
};                 

const Container = styled.header`    
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: 5%;
    gap: 10px;
`;

const Logo = styled.img`
    height: 48px;
    margin-left: 64px;
    cursor: pointer;
    transition: opacity 0.2s;
    
    &:hover {
        opacity: 0.8;
    }
`;

const Spacer = styled.div`
    flex: 1;
`;

const ButtonWrapper = styled.div`
    margin-left: 24px;
`;

const RightBox = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-left: 24px;
`;

const AuthButton = styled.button`
    background: none;
    border: none;
    color: #333;
    font-size: 18px; 
    font-weight: bold;
    cursor: pointer;
    padding: 0;
`;

const UserName = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: #ff6b6b;
`;

export default Header;