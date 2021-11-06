import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import foodIcon from '../images/mealIcon.svg';

export default function Footer() {
  const cssStyle = {
    position: 'fixed',
    padding: '10px 10px 0px 10px',
    bottom: 0,
    width: '100%',
    height: '58px',
    background: '#C4C4C4',
  };
  return (
    <footer
      data-testid="footer"
      style={ cssStyle }
    >
      <nav>
        <Link to="/bebidas">
          <img
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
            alt="Perfil"
          />
        </Link>
        <Link to="/explorar">
          <img
            src={ exploreIcon }
            data-testid="explore-bottom-btn"
            alt="Perfil"
          />
        </Link>
        <Link to="/comidas">
          <img
            src={ foodIcon }
            data-testid="food-bottom-btn"
            alt="Perfil"
          />
        </Link>
      </nav>
    </footer>
  );
}
