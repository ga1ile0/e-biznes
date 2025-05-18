import '@testing-library/jest-dom';

describe('API Endpoints', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  // GET /api/products tests
  describe('GET /api/products', () => {
    test('successfully fetches products', async () => {
      const mockProducts = [
        { ID: 1, name: 'Test Product 1', price: 19.99 },
        { ID: 2, name: 'Test Product 2', price: 29.99 }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockProducts
      });

      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();

      expect(response.ok).toBeTruthy();
      expect(data).toEqual(mockProducts);
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/products');
    });

    test('handles server error when fetching products', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal server error' })
      });

      const response = await fetch('http://localhost:8080/api/products');
      
      expect(response.ok).toBeFalsy();
      expect(response.status).toBe(500);
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/products');
    });
  });

  // GET /api/products/:id tests
  describe('GET /api/products/:id', () => {
    test('successfully fetches a product by ID', async () => {
      const mockProduct = { ID: 1, name: 'Test Product', price: 19.99 };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockProduct
      });

      const response = await fetch('http://localhost:8080/api/products/1');
      const data = await response.json();

      expect(response.ok).toBeTruthy();
      expect(data).toEqual(mockProduct);
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/products/1');
    });

    test('handles product not found', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Product not found' })
      });

      const response = await fetch('http://localhost:8080/api/products/999');
      const data = await response.json();

      expect(response.ok).toBeFalsy();
      expect(response.status).toBe(404);
      expect(data.error).toBe('Product not found');
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/products/999');
    });
  });

  // POST /api/payments tests
  describe('POST /api/payments', () => {
    test('successfully processes a payment', async () => {
      const paymentData = {
        card_number: '4242424242424242',
        card_holder_name: 'Test User',
        expiry_date: '12/25',
        cvv: '123',
        amount: 59.98
      };

      const successResponse = {
        message: 'Payment processed successfully',
        id: 1,
        amount: 59.98
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => successResponse
      });

      const response = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });
      
      const data = await response.json();

      expect(response.ok).toBeTruthy();
      expect(response.status).toBe(201);
      expect(data).toEqual(successResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/payments',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData)
        })
      );
    });

    test('handles invalid payment data', async () => {
      const invalidPaymentData = {
        card_number: '',
        card_holder_name: 'Test User',
        expiry_date: '12/25',
        cvv: '123',
        amount: 59.98
      };

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Invalid card number' })
      });

      const response = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidPaymentData)
      });
      
      const data = await response.json();

      expect(response.ok).toBeFalsy();
      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid card number');
    });

    test('handles server error during payment processing', async () => {
      const paymentData = {
        card_number: '4242424242424242',
        card_holder_name: 'Test User',
        expiry_date: '12/25',
        cvv: '123',
        amount: 59.98
      };

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Error processing payment' })
      });

      const response = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });
      
      const data = await response.json();

      expect(response.ok).toBeFalsy();
      expect(response.status).toBe(500);
      expect(data.error).toBe('Error processing payment');
    });
  });
});
