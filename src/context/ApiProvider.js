import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import apiFetch from '../helper/ApiFetch';

function ApiProvider({ children }) {
  const [data, saveAPIinfo] = useState([]);

  useEffect(() => {
    apiFetch().then((e) => saveAPIinfo(e));
  }, []);

  const memo = useMemo(() => ({
    data,
  }), [data]);

  return (
    <ApiContext.Provider value={ memo }>
      { children }
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
