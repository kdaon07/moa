import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`    width: 280px;
    background: none;
    border-radius: 30px;
    overflow: hidden;
    padding-bottom: 20px;
    cursor: pointer;
`

const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Image = styled.img`
    width: 90%;
    border-radius: 30px;
    object-fit: cover;
`
const FavList = styled.div<{ color?: string }>`
    position: absolute;
    bottom: 16px;
    right: 16px;
    font-size: 28px;
    color: ${props => props.color};
    background: none;
    border-radius: 50%;
    padding: 4px 8px;
`

const TextWrapper = styled.div`
    padding: 0px 0px 0 20px;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #222;
    margin-bottom: -5px;
`

const Percent = styled.div`
    font-size: 15px;
    font-weight: bolder;
    color: #ff6b57;
`


export default function Card() {
    const [fav, setFav] = useState(false)

    return (
        <Container onClick={() => window.location.href = '/detail/1'}>
            <ImgContainer>
                <Image src="../../test.png" alt="상품이미지" />
                {
                    fav ? <FavList color="#ff6b81" onClick={(e) => {
                        e.stopPropagation();
                        setFav(false);
                    }}><FaHeart /></FavList> :
                        <FavList color="#ffffff" onClick={(e) => {
                            e.stopPropagation();
                            setFav(true);
                        }}><FaRegHeart /></FavList>
                }
            </ImgContainer>
            <TextWrapper>
                <Title>다마고치 공구 펀딩 입금폼</Title>
                <Percent>80% 달성</Percent>
            </TextWrapper>  
        </Container>
    );
}