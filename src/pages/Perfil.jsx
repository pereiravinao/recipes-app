import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Perfil() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('user'));
    if (storage) setEmail(storage.email);
  }, []);
  const cssButton = {
    border: 'none',
    backgroundColor: 'lightgrey',
    padding: '20px 30px',
    width: '200px',
    marginBottom: '20px',
  };
  const cssMain = {
    display: 'flex',
    flexDirection: 'column',
  };

  // Código abaixo para remover chaves de localstorage visualizado em:
  // https://blog.logrocket.com/localstorage-javascript-complete-guide/
  function deleteAllKeysFromLocalStorage() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Perfil" />
      <main style={ cssMain }>
        <h1 data-testid="profile-email">
          {email}
        </h1>
        <button
          type="button"
          data-testid="profile-done-btn"
          style={ cssButton }
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas

        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          style={ cssButton }
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas

        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          style={ cssButton }
          onClick={ () => deleteAllKeysFromLocalStorage() }
        >
          Sair

        </button>
      </main>
      <Footer />
    </div>
  );
}
