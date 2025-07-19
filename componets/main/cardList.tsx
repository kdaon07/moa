import styled from "styled-components";
import Card from "./card";

interface CardListProps {
    title: string;
    projects: any[];
}

export default function CardList({ title, projects }: CardListProps) {
    return (
        <Container>
            <Title>{title}</Title>
            <ScrollArea>
                <List>
                    {projects.map((project) => (
                        <Card key={project.id} project={project} />
                    ))}
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
