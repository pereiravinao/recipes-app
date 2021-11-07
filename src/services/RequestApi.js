export const apiIngrediente = async (ingrediente, page) => {
  if (page === '/comidas') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const resultsApiIngrediente = await response.json();
    return resultsApiIngrediente;
  }
  if (page === '/bebidas') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const resultsApiIngrediente = await response.json();
    return resultsApiIngrediente;
  }
};

export const apiNome = async (nome, page) => {
  if (page === '/comidas') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const resultsApiNome = await response.json();
    return resultsApiNome;
  }
  if (page === '/bebidas') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
    const resultsApiNome = await response.json();
    return resultsApiNome;
  }
};

export const apiPrimeiraLetra = async (primeiraLetra, page) => {
  if (page === '/comidas') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
    const resultsApiPrimeiraLetra = await response.json();
    return resultsApiPrimeiraLetra;
  }
  if (page === '/bebidas') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
    const resultsApiPrimeiraLetra = await response.json();
    return resultsApiPrimeiraLetra;
  }
};
