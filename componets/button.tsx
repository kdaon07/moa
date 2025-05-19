import styled from "styled-components";

interface ButtonProps {
    color?: string;
}

export default function Button({ color }: ButtonProps) {
    return (
        <Btn color={color}>+ 만들기</Btn>
    )
}

const Btn = styled.button<{ color?: string }>`
    width: 108px;
    height: 50px;
    border: 1px solid black;
    border-radius: 40px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    background-color: ${props => props.color || 'transparent'};
    cursor: pointer;
`