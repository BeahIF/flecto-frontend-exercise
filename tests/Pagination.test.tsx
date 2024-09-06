import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlanetDetails from '../pages/planetDetail';

const queryClient = new QueryClient();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const push = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { name: 'Tatooine' },
    push
  })
}));

describe('PlanetDetails Component', () => {
  it('renders planet details correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [{
          name: 'Tatooine',
          climate: 'arid',
          population: '200000',
          terrain: 'desert',
          residents: [],
          films: [],
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
          gravity: '1',
          surface_water: '20',
          created: '1979-01-01',
          edited: '2014-12-20',
        }]
      }
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PlanetDetails />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
      expect(screen.getByText(/arid/i)).toBeInTheDocument();
      expect(screen.getByText(/200000/i)).toBeInTheDocument();
      expect(screen.getByText(/desert/i)).toBeInTheDocument();
      expect(screen.getByText(/23/i)).toBeInTheDocument();
      expect(screen.getByText(/304/i)).toBeInTheDocument();
      expect(screen.getByText(/10465/i)).toBeInTheDocument();
      expect(screen.getByText(/1979-01-01/i)).toBeInTheDocument();
      expect(screen.getByText(/2014-12-20/i)).toBeInTheDocument();
    });
  });
});