import React from 'react';
import styled from 'styled-components';

const HighlightSection = ({ title, users }) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <HighlightList>
        {users.map((user) => (
          <UserCard key={user.id}>
            <UserName>{user.name}</UserName>
            <UserFollowers>{user.followers} seguidores</UserFollowers>
          </UserCard>
        ))}
      </HighlightList>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: #f9f9f9;
`;

const SectionTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
`;

const HighlightList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const UserCard = styled.div`
  padding: 10px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1 1 150px;
`;

const UserName = styled.p`
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
`;

const UserFollowers = styled.p`
  font-size: 1em;
  margin: 5px 0 0;
  color: #555;
`;

export default HighlightSection;
