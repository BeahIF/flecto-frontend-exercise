import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  const onSearchMock = jest.fn();

  beforeEach(() => {
    onSearchMock.mockClear();
    render(<SearchBar onSearch={onSearchMock} />);
  });

  it('renders input field and search button', () => {
    expect(screen.getByPlaceholderText('Search for a planet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    const input = screen.getByPlaceholderText('Search for a planet');

    fireEvent.change(input, { target: { value: 'Mars' } });
    
    expect(input).toHaveValue('Mars');
  });

  it('calls onSearch with the input value when the form is submitted', () => {
    const input = screen.getByPlaceholderText('Search for a planet');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'Earth' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('Earth');
  });

  it('does not call onSearch with empty input value', () => {
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('');
  });
});