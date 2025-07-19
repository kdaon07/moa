import styled from "styled-components";

interface ButtonProps {
    color?: string;
    onClick?: () => void;
}

export default function Button({ color, onClick }: ButtonProps) {
    return (
        <Btn color={color} onClick={onClick}>+ 만들기</Btn>
    )
}

const Btn = styled.button<{ color?: string }>`
    width: 108px;
    height: 50px;
    border-radius: 40px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    background-color: ${props => props.color || 'transparent'};
    cursor: pointer;
`