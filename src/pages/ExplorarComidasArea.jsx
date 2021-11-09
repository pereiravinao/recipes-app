import React, { useContext, useEffect, useState } from 'react';
import AreaOptions from '../components/AreaOptions';
import CardsComidas from '../components/CardsComidas';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import {
  apiFiltraPorArea, apiListaAreas, apiNome, filtroBtnCategorias,
} from '../services/RequestApi';

export default function ExplorarComidasArea() {
  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [optionsList, setOptionsList] = useState();

  const {
    setRequestApi,
    setBtnCategory,
    loadFirstTime,
  } = useContext(Context);

  useEffect(() => {
    if (loadFirstTime) {
      apiNome('', '/comidas')
        .then((results) => {
          setRequestApi(results);
          setLoading(false);
        });
      apiListaAreas('comida')
        .then((results) => {
          setOptionsList(results.meals);
          setLoadingOptions(false);
        });
      filtroBtnCategorias('themealdb')
        .then((results) => setBtnCategory(results.meals));
    }
  }, []);

  function handleSelectChange({ target: { value } }) {
    if (value !== 'All') {
      apiFiltraPorArea(value)
        .then((results) => {
          setRequestApi(results);
        });
    }

    if (value === 'All') {
      apiNome('', '/comidas')
        .then((results) => {
          setRequestApi(results);
        });
    }
  }

  return (
    <div>
      <Header title="Explorar Origem" search />
      <div>
        <select
          onChange={ handleSelectChange }
          data-testid="explore-by-area-dropdown"
        >
          {
            loadingOptions ? 'Carregando...'
              : <AreaOptions list={ optionsList } />
          }
        </select>
      </div>
      <div>
        {
          loading ? 'Carregando...'
            : <CardsComidas />
        }
      </div>
      <Footer />
    </div>
  );
}
