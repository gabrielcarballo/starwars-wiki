const apiFetch = async () => {
  const api = await fetch('https://swapi.dev/api/planets');
  const { results } = await api.json();
  results.forEach((i) => {
    delete i.residents;
  });
  return results;
};

export default apiFetch;
