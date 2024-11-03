import React from 'react';
import styled from 'styled-components';
import HighlightSection from './HighlightSection';

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
        <HighlightSection title="Primeiros" users={firstStars} />
      </div>
      <div>
        <HighlightSection title="Últimos" users={recentStars} />
      </div>
      <div>
        <HighlightSection title="Populares" users={mostPopular} />
      </div>
    </HighlightContainer>
  );
}

export default UserHighlights;
