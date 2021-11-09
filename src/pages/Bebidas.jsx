import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { apiNome, filtroBtnCategorias } from '../services/RequestApi';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardsBebidas from '../components/CardsBebidas';
import BtnFilter from '../components/BtnFilter';
import Context from '../context/Context';

export default function Comidas() {
  const { requestApi,
    setRequestApi,
    setBtnCategory,
    btnCategory,
    redirectDisable,
  } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    apiNome('', '/bebidas')
      .then((results) => setRequestApi(results));
    filtroBtnCategorias('thecocktaildb')
      .then((results) => setBtnCategory(results.drinks));
  }, []);

  if (typeof requestApi === 'object') {
    if (requestApi.drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return (
        <div>
          <Header title="Bebidas" search />
        </div>
      );
    }
    if (requestApi.drinks.length === 1 && !redirectDisable) {
      return (
        <div>
          <Header title="Bebidas" search />
          {history.push(`/bebidas/${requestApi.drinks[0].idDrink}`)}
        </div>

      );
    }
    if (requestApi.drinks.length > 1) {
      return (
        <div>
          <Header title="Bebidas" search />
          {btnCategory ? <BtnFilter page={ history } /> : ''}
          <CardsBebidas />
        </div>
      );
    }
  }
  return (
    <div>
      <Header title="Bebidas" search />
      {requestApi ? <CardsBebidas /> : <Loading />}
      <Footer />
    </div>

  );
}
