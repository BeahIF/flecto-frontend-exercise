import { render, screen, fireEvent  } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

import PlanetCard from '../components/PlanetCard';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("PlanetCard tests", () => {
  it("should render planetCard correctly", () => {
    render(<PlanetCard planet={{
      name: 'Tatooine',
      terrain: 'Terra',
      climate: 'arid',
      population: '200000'
    }} />);

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Terrain: Terra')).toBeInTheDocument();
    expect(screen.getByText('Climate: arid')).toBeInTheDocument();
    expect(screen.getByText('Population: 200000')).toBeInTheDocument();
  });

  it("should navigate to the correct route on click", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<PlanetCard planet={{
      name: 'Tatooine',
      terrain: 'Terra',
      climate: 'arid',
      population: '200000'
    }} />);

    fireEvent.click(screen.getByText('Tatooine'));

    expect(mockPush).toHaveBeenCalledWith('/planetDetail?name=Tatooine');
  });
})