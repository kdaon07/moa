import styled from "styled-components";
import Button from "./button";
import Search from "./search";

const Header = () => {
    return (
        <Container>
            <Search />
            <ButtonWrapper>
                <Button color="#FF6060" />
            </ButtonWrapper>
            <RightBox>
                <AuthButton>로그인</AuthButton>
                <AuthButton>회원가입</AuthButton>
            </RightBox>
        </Container>
    );
};                 

const Container = styled.header`    
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5%;
    gap: 10px;
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

export default Header;