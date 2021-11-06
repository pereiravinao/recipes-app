import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardsBebidas from '../components/CardsBebidas';
import Context from '../context/Context';

export default function Comidas() {
  const { requestApi } = useContext(Context);
  console.log(requestApi);
  const history = useHistory();
  if (typeof requestApi === 'object') {
    if (requestApi.drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return (
        <div>
          <Header title="Bebidas" search />
        </div>
      );
    }
    if (requestApi.drinks.length === 1) {
      return (
        <div>
          <Header title="Bebidas" search />
          { history.push(`/bebidas/${requestApi.drinks[0].idDrink}`) }
        </div>

      );
    }
    if (requestApi.drinks.length > 1) {
      return (
        <div>
          <Header title="Bebidas" search />
          <CardsBebidas />
        </div>
      );
    }
  }
  return (
    <div>
      <Header title="Bebidas" search />
      <div>
        <h1> Aqui estará o conteúdo da página</h1>
      </div>
      <Footer />
    </div>

  );
}
