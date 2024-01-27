import { useEffect, useState } from "react";

import { getAllOrders } from "@/lib/actions/order.actions";
import { OrderCollectionProps } from "@/types/props.type";
import { OrderTable } from "./common/OrderTable";
import { IOrder } from "@/lib/database/models/order.model";
import { toast } from "sonner";
import Pusher from "pusher-js";

const OrderCollection = ({ _roomId }: OrderCollectionProps) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
    cluster: "ap1",
  });
  var channel = pusher.subscribe(_roomId);
  channel.bind(
    "new-order",
    async function (data: any) {
      const order: IOrder = JSON.parse(data.message);
      const newestOrders: IOrder[] = await getAllOrders({ _roomId: _roomId });
      setOrders(newestOrders);
      toast.success(order.orderBy + " ordered " + order.dish.name);
    },
    channel.unbind() // fix duplicate event callback
  );

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData: IOrder[] = await getAllOrders({ _roomId: _roomId });
      setOrders(ordersData);
    };

    fetchOrders();
  }, [_roomId]);

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
