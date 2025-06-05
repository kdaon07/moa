import styled from "styled-components";
import Card from "./card";

export default function CardList(props: any) {
    return (
        <Container>
            <Title>{props.title}</Title>
            <ScrollArea>
                <List>
                    <Card /><Card /><Card /><Card /><Card />
                    <Card /><Card /><Card /><Card /><Card />
                </List>
            </ScrollArea>
        </Container>
    );
}

const Container = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    padding-bottom: 20px;   
    margin-top: 20px;
`;

const Title = styled.h2`
    font-size: 25px;
    font-weight: 600;
    color: #222;
    margin-bottom: 16px;
`;  

const ScrollArea = styled.div`
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const List = styled.div`
    width: max-content;
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    align-items: flex-start;
`;