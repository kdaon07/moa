import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CardProps {
    project: {
        id: number;
        title: string;
        imagePaths: string[];
        currentAmount: number;
        targetAmount: number;
    }
}

const Container = styled.div`
    width: 280px;
    background: none;
    border-radius: 30px;
    overflow: hidden;
    padding-bottom: 20px;
    cursor: pointer;
`

const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; 
`

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: fill;
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

export default function Card({ project }: CardProps) {
    const percent = Math.floor((project.currentAmount / project.targetAmount) * 100);
    return (
        <Container onClick={() => window.location.href = `/detail/${project.id}`}>
            <ImgContainer>
                <Image src={project.imagePaths[0] ? `${API_URL}${project.imagePaths[0]}` : '/test.png'} alt="썸네일" />
            </ImgContainer>
            <TextWrapper>
                <Title>{project.title}</Title>
                <Percent>{percent}% 달성</Percent>
            </TextWrapper>  
        </Container>
    );
}
