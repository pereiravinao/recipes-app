import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

export default function Header({ title, search }) {
  const [boolSearchBtn, setBoolSearchBtn] = useState(false);
  return (
    <header>
      <nav>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="Perfil"
          />
        </Link>
        <h4 data-testid="page-title">{title}</h4>
        { search ? (
          <button type="button" onClick={ () => setBoolSearchBtn(!boolSearchBtn) }>
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Buscar"
            />
          </button>)
          : '' }
        { boolSearchBtn ? <HeaderSearchBar /> : ''}
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
