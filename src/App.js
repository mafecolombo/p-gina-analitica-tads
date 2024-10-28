import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarChart from './components/StarChart';
import UserHighlights from './components/UserHighlights';
import FilterControls from './components/FilterControls';
import starData from './data/thefuck-sample-full.json';

const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #4a4a4a;
`;

const Section = styled.section`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

function App() {
  const [groupBy, setGroupBy] = useState('day');
  const [viewType, setViewType] = useState('absolute');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const now = new Date();
    const periodLimit = filterPeriod === '30'
      ? 30 : filterPeriod === '180'
      ? 180 : filterPeriod === '365'
      ? 365 : null;

    let cumulativeStars = 0;
    const dateCounts = {};

    // Filtra os dados baseados no período selecionado
    starData.forEach(entry => {
      const date = new Date(entry.starred_at);
      if (periodLimit && (now - date) / (1000 * 60 * 60 * 24) > periodLimit) {
        return;
      }

      const dateStr = date.toISOString().split('T')[0];
      if (!dateCounts[dateStr]) {
        dateCounts[dateStr] = 0;
      }
      dateCounts[dateStr]++;
    });

    const newFilteredData = Object.keys(dateCounts)
      .sort()
      .map(dateStr => {
        cumulativeStars += dateCounts[dateStr];
        return {
          date: new Date(dateStr),
          stars: viewType === 'cumulative' ? cumulativeStars : dateCounts[dateStr],
        };
      });

    setFilteredData(newFilteredData);
    setUsers(starData.map((entry) => ({
      ...entry.user,
      starred_at: entry.starred_at,
      followers: entry.user.followers,
    })));
  }, [filterPeriod, viewType]);

  return (
    <Container>
      <Title>Estatísticas de Estrelas do Repositório</Title>
      <Section>
        <h2>Filtros de Visualização</h2>
        <FilterWrapper>
          <FilterControls
            onGroupByChange={setGroupBy}
            onViewTypeChange={setViewType}
            onFilterPeriodChange={setFilterPeriod}
          />
        </FilterWrapper>
      </Section>
      <Section>
        <h2>Gráfico de Crescimento de Estrelas</h2>
        <StarChart data={filteredData} groupBy={groupBy} viewType={viewType} />
      </Section>
      <Section>
        <h2>Usuários em Destaque</h2>
        <UserHighlights users={users} />
      </Section>
    </Container>
  );
}

export default App;
