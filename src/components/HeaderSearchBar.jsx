import React from 'react';

export default function Comidas() {
  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Buscar"
      />
      <label htmlFor="ingredient">
        <input
          id="ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          name="filterSearchBar"
        />
        Ingredientes
      </label>
      <label htmlFor="name">
        <input
          id="name"
          data-testid="name-search-radio"
          type="radio"
          name="filterSearchBar"
          value="nome"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          id="first-letter"
          data-testid="first-letter-search-radio"
          name="filterSearchBar"
          type="radio"
          value="first-letter"
        />
        Primeira Letra
      </label>

      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </form>
  );
}
