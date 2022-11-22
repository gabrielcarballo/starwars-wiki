import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

function ApiProvider({ children }) {
  return (
    <ApiContext.Provider value={ {} }>
      { children }
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ApiProvider;
