import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
`;

function FilterControls({ onGroupByChange, onViewTypeChange, onFilterPeriodChange }) {
  return (
    <FilterContainer>
      <Label>
        Agrupar por:
        <select onChange={(e) => onGroupByChange(e.target.value)}>
          <option value="day">Dia</option>
          <option value="week">Semana</option>
          <option value="month">Mês</option>
          <option value="year">Ano</option>
        </select>
      </Label>
      <Label>
        Tipo de visualização:
        <select onChange={(e) => onViewTypeChange(e.target.value)}>
          <option value="absolute">Absoluto</option>
          <option value="cumulative">Cumulativo</option>
        </select>
      </Label>
      <Label>
        Período:
        <select onChange={(e) => onFilterPeriodChange(e.target.value)}>
          <option value="all">Todo o período</option>
          <option value="30">Últimos 30 dias</option>
          <option value="180">Últimos 6 meses</option>
          <option value="365">Último ano</option>
        </select>
      </Label>
    </FilterContainer>
  );
}

export default FilterControls;


