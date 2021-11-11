import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import { apiReceitaID } from '../services/RequestApi';
import DetalhesComidas from '../components/DetalhesComidas';
import DetalhesBebidas from '../components/DetalhesBebidas';

export default function DetalhesReceitas({ match, history }) {
  const { setRequestApi } = useContext(Context);
  const changeInput = match.params.id;
  const pageLocation = history.location.pathname;

  useEffect(() => {
    apiReceitaID(changeInput, pageLocation)
      .then((results) => setRequestApi(results));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeInput, pageLocation, setRequestApi]);

  return (
    <div>
      { pageLocation.includes('/comidas')
        ? <DetalhesComidas />
        : <DetalhesBebidas /> }
    </div>
  );
}

DetalhesReceitas.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
