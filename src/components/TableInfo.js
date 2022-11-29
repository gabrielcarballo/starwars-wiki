import React, { useContext, useState } from 'react';
import ApiContext from '../context/ApiContext';

export default function TableInfo() {
  const [textFilter, setTextFilter] = useState('');
  const { data } = useContext(ApiContext);

  return (
    <>
      Busca
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => { setTextFilter(value); } }
      />
      <tbody>
        {data
          .filter((e) => (e.name.toLowerCase().includes(textFilter.toLocaleLowerCase())))
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
