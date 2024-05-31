import axios from 'axios';

export class OrderNumber {
  async getOrderNumber(): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.tech.redventures.com.br/orders/generate-id',
        {},
        {
          headers: { 'x-api-key': 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf' },
        },
      );

      return response.data.orderId;
    } catch (err: any) {
      throw new Error(`Error getting orderId: ${err.message}`);
    }
  }
}
