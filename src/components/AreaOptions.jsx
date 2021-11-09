import React from 'react';
import PropTypes from 'prop-types';

export default function AreaOptions({ list }) {
  return (
    <>
      <option value="All" data-testid="All-option">All</option>
      { list.map(({ strArea }, key) => (
        <option
          key={ key }
          data-testid={ `${strArea}-option` }
          value={ strArea }
        >
          { strArea }
        </option>
      )) }
    </>
  );
}

AreaOptions.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    strArea: PropTypes.string,
  })).isRequired,
};
