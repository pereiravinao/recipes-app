import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';

export default function Compartilhar({ idReceita }) {
  const [copied, setCopied] = useState(false);

  function handleClick(id) {
    navigator.clipboard.writeText(`http://localhost:3000${id}`);
    setCopied(true);
  }

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => { handleClick(idReceita); } }
      >
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
      { copied ? 'Link copiado!' : ''}
    </>
  );
}

Compartilhar.propTypes = {
  idReceita: PropTypes.string.isRequired,
};
