import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { apiNome } from '../services/RequestApi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import CardsComidas from '../components/CardsComidas';
import Context from '../context/Context';

export default function Comidas() {
  const { requestApi, setRequestApi } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    apiNome('', '/comidas')
      .then((results) => setRequestApi(results));
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
    if (requestApi.meals.length === 1) {
      return (
        <div>
          <Header title="Comidas" search />
          { history.push(`/comidas/${requestApi.meals[0].idMeal}`) }
        </div>

      );
    }
    if (requestApi.meals.length > 1) {
      return (
        <div>
          <Header title="Comidas" search />
          <CardsComidas />
        </div>
      );
    }
  }
  return (

    <div>
      <Header title="Comidas" search />
      {requestApi ? <CardsComidas /> : <Loading />}
      <Footer />
    </div>

  );
}
