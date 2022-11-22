import { OrderData } from 'types/data/orders';

export const getNftPrice = (orders: OrderData[]) => {
  let hasOrder = false;
  let orderData = null;
  orders?.forEach((order) => {
    if (order?.status === 'active') {
      orderData = order;
      hasOrder = order?.id != null && Array.isArray(order?.prices) && order.prices.length > 0;
    }
  });
  if (orderData && hasOrder) {
    return orderData.prices[0];
  }

  return null;
};
