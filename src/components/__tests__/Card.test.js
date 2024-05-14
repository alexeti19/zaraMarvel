import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../FavoritesContext';
import { Card } from './Card';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

describe('Card Component', () => {
  const mockNavigate = jest.fn();
  const mockAddFavorite = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useFavorites.mockReturnValue({
      addFavorite: mockAddFavorite,
    });
  });

  const data = [
    {
      id: 1,
      name: 'Iron Man',
      thumbnail: { path: 'http://example.com/ironman', extension: 'jpg' }
    }
  ];

  it('renders correctly and responds to clicks', () => {
    render(<Card data={data} />);

    // Check for correct rendering
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getByAltText('img card')).toHaveAttribute('src', 'http://example.com/ironman.jpg');

    // Simulate clicks
    fireEvent.click(screen.getByAltText('img card'));
    expect(mockNavigate).toHaveBeenCalledWith('/1');

    fireEvent.click(screen.getByRole('button', { name: /heart/i }));
    expect(mockAddFavorite).toHaveBeenCalledWith(data[0]);
  });
});
