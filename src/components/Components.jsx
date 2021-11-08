import React from 'react';
import { Route, Switch } from 'react-router';
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';
import Login from '../pages/Login';
import Explorar from '../pages/Explorar';
import Perfil from '../pages/Perfil';
import ReceitasProntas from '../pages/ReceitasProntas';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';
import ExplorarComidas from '../pages/ExplorarComidas';
import ExplorarBebidas from '../pages/ExplorarBebidas';
import ReceitasEmProgresso from '../pages/ReceitasEmProgresso';
import DetalhesReceitas from '../pages/DetalhesReceitas';
import ExplorarComidasArea from '../pages/ExplorarComidasArea';
import ExplorarIngredientes from '../pages/ExplorarIngredientes';

export default function Components() {
  return (
    <Switch>

      <Route path="/comidas/:id" component={ DetalhesReceitas } />
      <Route path="/bebidas/:id" component={ DetalhesReceitas } />

      <Route
        path="/comidas/:id/in-progress"
        component={ ReceitasEmProgresso }
      />
      <Route
        path="/bebidas/:id/in-progress"
        component={ ReceitasEmProgresso }
      />

      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />

      <Route path="/explorar/comidas/ingredientes" component={ ExplorarIngredientes } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExplorarIngredientes } />

      <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />

      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ ReceitasProntas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
