import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { useFavorites } from '../../FavoritesContext';
import { useNavigate } from 'react-router-dom';

jest.mock('../FavoritesContext', () => ({
  useFavorites: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('Navbar', () => {
  it('displays the correct favorite count', () => {
    useFavorites.mockReturnValue({ clickCount: 5 });
    useNavigate.mockReturnValue(jest.fn());
    
    render(<Navbar />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('navigates home when the logo is clicked', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useFavorites.mockReturnValue({ clickCount: 3 });

    render(<Navbar />);
    const logo = screen.getByAltText('Marvel Logo');
    fireEvent.click(logo);
    
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
