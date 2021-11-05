import React from 'react';
import { Route, Switch } from 'react-router';
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';
import Login from '../pages/Login';
import Explorar from '../pages/Explorar';
import Perfil from '../pages/Perfil';
import ReceitasProntas from '../pages/ReceitasProntas';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';

export default function Components() {
  return (
    <Switch>
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/explorar" component={ Explorar } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ ReceitasProntas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
