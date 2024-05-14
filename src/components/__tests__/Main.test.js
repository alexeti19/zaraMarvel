import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Main from '../Main';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking the axios library
jest.mock('axios');

describe('Main Component', () => {
  it('should fetch characters and render them on mount', async () => {
    // Mock axios response
    axios.get.mockResolvedValue({
      data: {
        data: {
          results: [
            { id: 1, name: 'Iron Man', thumbnail: { path: 'http://example.com', extension: 'jpg' } }
          ]
        }
      }
    });

    render(<Router><Main /></Router>);

    // Assert that axios.get was called
    expect(axios.get).toHaveBeenCalled();

    // Wait for the component to update based on the async data
    const items = await waitFor(() => screen.getByText('Iron Man'));
    expect(items).toBeInTheDocument();
  });

  it('should handle search input and trigger new search', async () => {
    // Initial mock return empty data
    axios.get.mockResolvedValue({ data: { data: { results: [] } } });

    render(<Router><Main /></Router>);

    // Simulate user typing into the input field
    fireEvent.change(screen.getByPlaceholderText('Search Here'), { target: { value: 'Hulk' } });
    
    // Simulate user pressing a key
    fireEvent.keyPress(screen.getByPlaceholderText('Search Here'), { key: 'Enter', code: 'Enter' });

    // Adjust the URL based on search
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('nameStartsWith=Hulk'));
  });

  it('renders no results when data is empty', async () => {
    // Ensure axios returns no results
    axios.get.mockResolvedValue({ data: { data: { results: [] } } });

    render(<Router><Main /></Router>);

    const noResults = await waitFor(() => screen.getByText('there are no results'));
    expect(noResults).toBeInTheDocument();
  });
});