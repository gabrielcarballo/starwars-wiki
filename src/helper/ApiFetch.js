const apiFetch = async () => {
  const api = await fetch('https://swapi.dev/api/planets');
  const { results } = await api.json();
  results.forEach((i) => {
    delete i.residents;
  });
  console.log(results);
  return results;
};

export default apiFetch;
