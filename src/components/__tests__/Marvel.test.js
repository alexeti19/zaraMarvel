import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Marvel } from '../Marvel';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Mocking axios and useParams
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('Marvel Component', () => {
  it('fetches and displays character and comics data', async () => {
    useParams.mockReturnValue({ id: '1' });
    axios.get.mockImplementation(url =>
      Promise.resolve({
        data: {
          data: {
            results: url.includes('characters') ? 
              [{
                name: 'Iron Man',
                thumbnail: { path: 'http://example.com', extension: 'jpg' },
                description: 'A wealthy industrialist and genius inventor.',
                comics: { items: [{ resourceURI: 'http://example.com/comic' }] }
              }] :
              [{
                data: { results: [{ title: 'Iron Man #1', thumbnail: { path: 'http://example.com', extension: 'jpg' } }] }
              }]
          }
        }
      })
    );

    render(<Marvel />);

    await waitFor(() => {
      expect(screen.getByText('Iron Man')).toBeInTheDocument();
      expect(screen.getByText('A wealthy industrialist and genius inventor.')).toBeInTheDocument();
      expect(screen.getByText('Iron Man #1')).toBeInTheDocument();
      expect(screen.getByAltText('comic img')).toHaveAttribute('src', 'http://example.com.jpg');
    });
  });

  it('displays not found message if no character data', async () => {
    useParams.mockReturnValue({ id: '1' });
    axios.get.mockResolvedValue({
      data: { data: { results: [] } }
    });

    render(<Marvel />);

    await waitFor(() => {
      expect(screen.getByText('Character not found.')).toBeInTheDocument();
    });
  });
});
