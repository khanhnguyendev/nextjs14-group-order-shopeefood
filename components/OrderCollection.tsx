import { getAllOrders } from "@/lib/actions/order.actions";
import { OrderCollectionProps } from "@/types/props.type";
import { OrderTable } from "./common/OrderTable";
import { IOrder } from "@/lib/database/models/order.model";

const OrderCollection = async ({ _roomId }: OrderCollectionProps) => {
  const orders: IOrder[] = await getAllOrders({ _roomId: _roomId });
  const subtotal = orders.reduce((total, order) => total + order.totalPrice, 0);

  // const getUserName = async (userId: string) => {
  //   return await getUserById(userId);
  // };

  return (
    <>
      <OrderTable orders={orders} />
    </>
  );
};

export default OrderCollection;
