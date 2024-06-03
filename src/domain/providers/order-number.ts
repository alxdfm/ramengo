import axios from 'axios';
import { ApiError } from '../../errors/api-errors';

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
      throw new ApiError('error getting orderId', 500);
    }
  }
}
