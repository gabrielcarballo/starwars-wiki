import React, { useContext, useState } from 'react';
import ApiContext from '../context/ApiContext';

// Trocar nome de filtros das linhas 53 a 57
// limpar os inputs após clicar no botão de filtro
// Terminar de implementar a lógica do sort, que é chamado pelo data da context e sempre sobrescreve o que foi filtrado

export default function TableInfo() {
  const [textFilter, setTextFilter] = useState('');
  const [filterOrder, setFilterOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });
  const [columnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filtersSelected, setFilterSelected] = useState({
    columnFilter: columnOptions[0],
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });
  const [appliedFilters, setAppliedFilters] = useState([]);
  const { data } = useContext(ApiContext);

  const filteringRepeatedFilters = (option) => (
    !appliedFilters.find((e) => option === e.columnFilter));

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

  const removeFilter = ({ target: { value } }) => {
    const filtering = appliedFilters.filter((e) => e.columnFilter !== value);
    setAppliedFilters(filtering);
  };

  const removeAllFilters = () => {
    setAppliedFilters([]);
  };

  const sortFilter = () => {
    const validPlanets = userFilter().filter((e) => (
      e[filterOrder.column] !== 'unknown'));

    const unknownPlanets = userFilter().filter((e) => (
      e[filterOrder.column] === 'unknown'
    ));

    if (filterOrder.sort === 'ASC') {
      validPlanets.sort((a, b) => (
        Number(a[filterOrder.column]) - Number(b[filterOrder.column])));
    } else if (filterOrder.sort === 'DESC') {
      validPlanets.sort((a, b) => (
        Number(b[filterOrder.column]) - Number(a[filterOrder.column])));
    }
    const test = ([...validPlanets, ...unknownPlanets]);
    return test;
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
        {columnOptions
          .filter(filteringRepeatedFilters)
          .map((e, i) => <option key={ i } value={ e }>{e}</option>)}
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
      {appliedFilters
        .map(({ columnFilter, comparisonFilter, valueFilter }, index) => (
          <div key={ index } data-testid="filter">
            <span>
              { `${columnFilter} ${comparisonFilter} ${valueFilter}` }
            </span>
            <button
              type="button"
              value={ columnFilter }
              name={ columnFilter }
              onClick={ removeFilter }
            >
              X
            </button>
          </div>
        ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todas filtragens
      </button>
      <label
        htmlFor="column"
      >
        <select
          data-testid="column-sort"
          name="column"
          onChange={ ({ target: { value } }) => {
            setFilterOrder({ ...filterOrder, column: value });
          } }
        >
          {columnOptions
            .map((e, i) => (
              <option
                key={ i }
                value={ e }
              >
                {e}
              </option>))}
        </select>
      </label>

      <label
        htmlFor="sort"
      >
        <input
          type="radio"
          value="ASC"
          name="sort"
          data-testid="column-sort-input-asc"
          onChange={ ({ target: { value } }) => {
            setFilterOrder({ ...filterOrder, sort: value });
          } }
        />
        Crescente
      </label>
      <label
        htmlFor="sort"
      >
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          value="DESC"
          name="sort"
          onChange={ ({ target: { value } }) => {
            setFilterOrder({ ...filterOrder, sort: value });
          } }
        />
        Decrescente
      </label>

      <button
        type="button"
        onClick={ sortFilter }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>

      <tbody>
        {userFilter()
          .map((e, i) => (
            <tr key={ i }>
              <td
                data-testid="planet-name"
                key={ e.name }
              >
                {e.name}
              </td>
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
