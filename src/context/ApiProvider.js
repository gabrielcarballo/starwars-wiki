import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import apiFetch from '../helper/ApiFetch';

function ApiProvider({ children }) {
  const [apiInfo, setApiInfo] = useState([]);

  useEffect(() => {
    apiFetch().then((e) => setApiInfo(e));
  }, []);

  const memo = useMemo(() => ({
    apiInfo,
  }), [apiInfo]);

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
