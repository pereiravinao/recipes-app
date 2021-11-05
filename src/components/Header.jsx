import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, search }) {
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
        <span data-testid="page-title">{title}</span>
        { search ? (
          <Link to="/explorar">
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Buscar"
            />
          </Link>)
          : '' }
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
