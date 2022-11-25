import { OrderData } from 'types/data/orders';

export const getNftPrice = (orders: OrderData[]) => {
  let orderData = null;
  orders?.forEach((order) => {
    if (order?.status === 'active') {
      orderData = order;
    }
  });
  let availablePrice: any;
  orderData?.prices.forEach((price: any) => {
    if (price?.status === 'active') {
      availablePrice = price;
    }
  });

  return availablePrice;
};
