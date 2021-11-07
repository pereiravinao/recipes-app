import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Context from '../context/Context';
import { apiIngrediente,
  apiNome, apiPrimeiraLetra } from '../services/RequestApi';

export default function HeaderSearchBar() {
  const history = useHistory();
  const [radioClick, setRadioClick] = useState('');
  const [changeInput, setChangeInput] = useState('');
  const pageLocation = history.location.pathname;
  const { setRequestApi } = useContext(Context);

  const searchApi = () => {
    switch (radioClick) {
    case 'ingrediente':
      apiIngrediente(changeInput, pageLocation)
        .then((results) => setRequestApi(results));
      break;
    case 'nome':
      apiNome(changeInput, pageLocation)
        .then((results) => setRequestApi(results));
      break;
    case 'primeiraLetra':
      if (changeInput.length > 1) {
        global
          .alert('Sua busca deve conter somente 1 (um) caracter');
      }
      apiPrimeiraLetra(changeInput, pageLocation)
        .then((results) => setRequestApi(results));
      break;
    default:
      break;
    }
  };

  return (
    <form>
      <input
        data-testid="search-input"
        value={ changeInput }
        type="text"
        placeholder="Buscar"
        onChange={ ({ target }) => setChangeInput(target.value) }
      />
      <label htmlFor="ingredient">
        <input
          id="ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          name="filterSearchBar"
          onClick={ () => setRadioClick('ingrediente') }
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
          onClick={ () => setRadioClick('nome') }
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
          onClick={ () => setRadioClick('primeiraLetra') }
        />
        Primeira Letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchApi }
      >
        Buscar

      </button>
    </form>
  );
}
