import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ApiProvider from '../context/ApiProvider';
/* import mock from '../../mock/starWarsMock'; */
import testData from '../../cypress/mocks/testData';

beforeEach(() => {
  global.fetch = jest.fn(async () => ({
    json: async () => (testData),
  }));
  render(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
});
describe('Main Route tests', () => {
  it('Renders correctly all elements on page', async () => {
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
    const headersArray = [
      'Rotation Period', 'orbital period', 'Diameter', 'Climate', 'Gravity', 'Terrain',
      'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL'];
    headersArray.forEach((e) => {
      expect(screen.getByText(e)).toBeInTheDocument();
    });
    const input = screen.getByRole('textbox');
    const columnFilter = screen.getByTestId('column-filter');
    const valueFilter = screen.getByRole('spinbutton');
    const applyFilterBtn = screen.getByRole('button', {
      name: /aplicar/i,
    });
    const bespin = await screen.findByRole('cell', {
      name: /bespin/i,
    });
    userEvent.type(input, 'T');
    expect(await screen.findByRole('cell', {
      name: /tatooine/i,
    })).toBeInTheDocument();
    expect(bespin).not.toBeInTheDocument();
    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.type(valueFilter, '23');
    userEvent.click(applyFilterBtn);
    expect(await screen.findAllByTestId('filter')).toHaveLength(1);
  });
  it('Function as intended as comparison filter is applied', async () => {
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByRole('spinbutton');
    const applyFilterBtn = screen.getByRole('button', {
      name: /aplicar/i,
    });
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '10000');
    userEvent.click(applyFilterBtn);
    expect(await screen.findAllByTestId('filter')).toHaveLength(1);
  });
  it('', async () => {
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByRole('spinbutton');
    const applyFilterBtn = screen.getByRole('button', {
      name: /aplicar/i,
    });
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '1000');
    userEvent.click(applyFilterBtn);
    expect(await screen.findAllByTestId('filter')).toHaveLength(1);
  });
});
