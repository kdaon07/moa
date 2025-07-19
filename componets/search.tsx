import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (keyword.trim()) {
            router.push(`/?q=${encodeURIComponent(keyword)}`);
        } else {
            router.push(`/`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Container>
            <StyledInput
                placeholder="검색어를 입력해주세요"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <IconWrapper onClick={handleSearch}>
                <IoSearch size={24} color="#333" />
            </IconWrapper>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 368px;
    height: 50px;
    border: 1px solid black;
    border-radius: 40px;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 99;
`;

const StyledInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 20px;
    color: black;
    background: transparent;
    text-align: left;
    &::placeholder {
        color: #bdbdbd;
        font-weight: 20px;
        font-size: 18px;
        text-align: left;
    }                
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    cursor: pointer;
`;