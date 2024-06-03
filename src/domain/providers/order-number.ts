import axios from 'axios';

const { ORDER_ID_URL, ORDER_ID_API_KEY } = process.env;

export default class OrderNumber {
  async getOrderNumber(): Promise<string> {
    try {
      const response = await axios.post(
        String(ORDER_ID_URL),
        {},
        {
          headers: { 'x-api-key': ORDER_ID_API_KEY },
        },
      );

      return response.data.orderId;
    } catch (err: any) {
      throw new Error(`Error getting orderId: ${err.message}`);
    }
  }
}
