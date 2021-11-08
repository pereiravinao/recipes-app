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

export const apiAleatoria = async (type) => {
  if (type === 'comida') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const resultsApiAleatoria = await response.json();
    return resultsApiAleatoria;
  }
  if (type === 'bebida') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const resultsApiAleatoria = await response.json();
    return resultsApiAleatoria;
  }
};

export const apiListaIngredientes = async (type) => {
  if (type === 'comida') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const resultsApiIngredientes = await response.json();
    return resultsApiIngredientes;
  }
  if (type === 'bebida') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const resultsApiIngredientes = await response.json();
    return resultsApiIngredientes;
  }
};
