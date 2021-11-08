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

export const filtroBtnCategorias = async (type) => {
  const response = await fetch(`https://www.${type}.com/api/json/v1/1/list.php?c=list`);
  const jsonObj = await response.json();
  return jsonObj;
};

export const filtraPorCategoria = async (type, categoria) => {
  const response = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?c=${categoria}`);
  const jsonObj = await response.json();
  console.log(jsonObj);
  return jsonObj;

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

export const apiReceitaID = async (id, page) => {
  if (page.includes('/comidas')) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const resultsApiID = await response.json();
    return resultsApiID;
  }
  if (page.includes('/bebidas')) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const resultsApiID = await response.json();
    return resultsApiID;
  }
};
