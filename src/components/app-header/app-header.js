import React from 'react';
import styled from 'styled-components';

// создаем компонент
const Header = styled.div ` 
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 26px;
        :hover {
            color: blue;
        }
    }
    h2 {
        font-size: 1.2rem;
        color: grey;
    }
`

const AppHeader = ({liked, allPosts, importanted}) => {
    return (
        <Header>
            <h1>My posts</h1>
            <h2>{allPosts} posts, liked {liked}, important {importanted}</h2>
        </Header>
    )
}

export default AppHeader;