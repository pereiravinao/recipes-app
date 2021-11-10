import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { apiNome, filtroBtnCategorias } from '../services/RequestApi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import CardsComidas from '../components/CardsComidas';
import Context from '../context/Context';
import BtnFilter from '../components/BtnFilter';

export default function Comidas() {
  const {
    requestApi,
    setRequestApi,
    btnCategory,
    setBtnCategory,
    redirectDisable,
    loadFirstTime,
  } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (loadFirstTime) {
      apiNome('', '/comidas')
        .then((results) => setRequestApi(results));
      filtroBtnCategorias('themealdb')
        .then((results) => setBtnCategory(results.meals));
    }
  }, []);

  if (typeof requestApi === 'object') {
    if (requestApi.meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return (
        <div>
          <Header title="Comidas" search />
        </div>
      );
    }
    if (requestApi.meals.length === 1 && !redirectDisable) {
      return (
        <div>
          <Header title="Comidas" search />
          {history.push(`/comidas/${requestApi.meals[0].idMeal}`)}
        </div>

      );
    }
    if (requestApi.meals.length > 1) {
      return (
        <div>
          <Header title="Comidas" search />
          {btnCategory ? <BtnFilter page={ history } /> : ''}
          <CardsComidas />
        </div>
      );
    }
  }
  return (

    <div>
      <Header title="Comidas" search />
      {btnCategory ? <BtnFilter page={ history } /> : ''}
      {requestApi ? <CardsComidas /> : <Loading />}
      <Footer />
    </div>

  );
}
