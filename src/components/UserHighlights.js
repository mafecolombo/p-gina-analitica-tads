import React from 'react';
import styled from 'styled-components';

const HighlightContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const HighlightList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 5px 0;
  font-size: 1.1em;
`;

function UserHighlights({ users }) {
  const firstStars = [...users].sort((a, b) => new Date(a.starred_at) - new Date(b.starred_at)).slice(0, 5);
  const recentStars = [...users].sort((a, b) => new Date(b.starred_at) - new Date(a.starred_at)).slice(0, 5);
  const mostPopular = [...users].sort((a, b) => b.followers - a.followers).slice(0, 5);

  return (
    <HighlightContainer>
      <div>
        <h3>Primeiros</h3>
        <HighlightList>
          {firstStars.map((user) => (
            <ListItem key={user.id}>{user.name} - {user.followers} seguidores</ListItem>
          ))}
        </HighlightList>
      </div>
      <div>
        <h3>Últimos</h3>
        <HighlightList>
          {recentStars.map((user) => (
            <ListItem key={user.id}>{user.name} - {user.followers} seguidores</ListItem>
          ))}
        </HighlightList>
      </div>
      <div>
        <h3>Populares</h3>
        <HighlightList>
          {mostPopular.map((user) => (
            <ListItem key={user.id}>{user.name} - {user.followers} seguidores</ListItem>
          ))}
        </HighlightList>
      </div>
    </HighlightContainer>
  );
}

export default UserHighlights;
