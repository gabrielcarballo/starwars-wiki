import React, { useContext, useState } from 'react';
import ApiContext from '../context/ApiContext';

// Trocar nome de filtros das linhas 53 a 57

export default function TableInfo() {
  const [textFilter, setTextFilter] = useState('');
  const [filtersSelected, setFilterSelected] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });
  const [appliedFilters, setAppliedFilters] = useState([]);
  const { data } = useContext(ApiContext);

  const userFilter = () => {
    const masterFilter = data.filter((e) => (
      e.name.toLowerCase().includes(textFilter.toLocaleLowerCase())));

    const result = masterFilter.filter((e) => {
      const selectFilters = appliedFilters.map((
        { valueFilter, comparisonFilter, columnFilter },
      ) => {
        switch (comparisonFilter) {
        case 'maior que':
          return Number(e[columnFilter]) > Number(valueFilter);
        case 'menor que':
          return Number(e[columnFilter]) < Number(valueFilter);
        case 'igual a':
          return Number(e[columnFilter]) === Number(valueFilter);
        default:
          return true;
        }
      });
      return selectFilters.every((element) => element);
    });
    return result;
  };

  return (
    <>
      Busca
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => { setTextFilter(value); } }
      />
      Filter by:
      <select
        onChange={ ({ target: { value } }) => {
          setFilterSelected({ ...filtersSelected, columnFilter: value });
        } }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      Comparison:
      <select
        onChange={ ({ target: { value } }) => {
          setFilterSelected({ ...filtersSelected, comparisonFilter: value });
        } }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        placeholder="value"
        type="number"
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => {
          setFilterSelected({ ...filtersSelected, valueFilter: value });
        } }
        value={ filtersSelected.valueFilter }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => setAppliedFilters(appliedFilters.concat(filtersSelected)) }
      >
        Aplicar
      </button>
      <tbody>
        {userFilter()
          .map((e, i) => (
            <tr key={ i }>
              <td key={ e.name }>{e.name}</td>
              <td key={ e.rotation_period }>{e.rotation_period}</td>
              <td key={ e.orbital_period }>{e.orbital_period}</td>
              <td key={ e.diameter }>{e.diameter}</td>
              <td key={ e.climate }>{e.climate}</td>
              <td key={ e.gravity }>{e.gravity}</td>
              <td key={ e.terrain }>{e.terrain}</td>
              <td key={ e.surface_water }>{e.surface_water}</td>
              <td key={ e.population }>{e.population}</td>
              {e.films.map((j) => <td key={ j }>{j}</td>)}
              <td key={ e.created }>{e.created}</td>
              <td key={ e.edited }>{e.edited}</td>
              <td key={ e.url }>{e.url}</td>
            </tr>
          ))}
      </tbody>
    </>
  );
}
