import React from 'react';
import { render, screen } from '@testing-library/react';
import Favorites from '../Favorites';
import { useFavorites } from '../../FavoritesContext';

// Mock the useFavorites context
jest.mock('../FavoritesContext', () => ({
  useFavorites: jest.fn()
}));

describe('Favorites Component', () => {
  it('renders favorite items correctly', () => {
    // Provide test data for the context
    useFavorites.mockReturnValue({
      favorites: [
        {
          id: 1,
          name: 'Spider-Man',
          thumbnail: { path: 'http://example.com/spiderman', extension: 'jpg' }
        },
        {
          id: 2,
          name: 'Iron Man',
          thumbnail: { path: 'http://example.com/ironman', extension: 'jpg' }
        }
      ]
    });

    render(<Favorites />);

    // Check for the presence of items
    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(2);
  });

  it('displays message when there are no favorites', () => {
    useFavorites.mockReturnValue({ favorites: [] });

    render(<Favorites />);

    // You might want to add a conditional rendering for this case in your component
    // Example: {favorites.length === 0 ? <p>No favorites yet.</p> : ... }
    expect(screen.queryByText('No favorites yet.')).toBeInTheDocument();
  });
});
