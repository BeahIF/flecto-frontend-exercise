// pages/planetDetail.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlanetDetail from './planetDetail';
import axios from 'axios';

// Mock do React Query
const queryClient = new QueryClient();

// Mock do Next.js Router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock do axios para simular respostas da API
jest.mock('axios');

const mockRouter = useRouter as jest.Mock;
const mockAxios = axios.get as jest.Mock;

describe('PlanetDetail', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { name: 'Tatooine' },
    });
  });

  it('renders planet details correctly', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        name: 'Tatooine',
        climate: 'arid',
        population: '200000',
        terrain: 'desert',
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PlanetDetail />
      </QueryClientProvider>
    );

    // Asserts for planet details
    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
      expect(screen.getByText('Climate: arid')).toBeInTheDocument();
      expect(screen.getByText('Population: 200000')).toBeInTheDocument();
      expect(screen.getByText('Terrain: desert')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PlanetDetail />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message if planet is not found', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Planet not found'));

    render(
      <QueryClientProvider client={queryClient}>
        <PlanetDetail />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Planet not found')).toBeInTheDocument();
    });
  });
});
