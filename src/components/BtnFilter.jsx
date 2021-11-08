import React, { useContext } from 'react';
import Context from '../context/Context';

export default function BtnFilter() {
  const { btnCategory } = useContext(Context);
  const CINCO = 5;
  return (
    <div>
      {btnCategory
        ? btnCategory.filter((_e, i) => i < CINCO)
          .map(({ strCategory }, i) => (
            <button
              type="button"
              key={ i }
              data-testid={ `${strCategory}-category-filter` }
            >
              {strCategory}
            </button>
          )) : ''}
    </div>
  );
}
