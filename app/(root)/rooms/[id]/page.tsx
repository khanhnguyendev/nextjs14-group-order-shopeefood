import React from "react";
import { getRoomById } from "@/lib/actions/room.actions";
import { SearchParamProps } from "@/types";
import {
  getDishesWeb,
  getRestaurantDetail,
} from "@/lib/fetcher/shopeefood/web.api";
import { MenuInfo, Restaurant } from "@/types/shopeefood.type";
import { IRoom } from "@/lib/database/models/room.model";
import RestaurantDetail from "@/components/common/RestaurantDetail";
import MenuOrder from "@/components/common/MenuOrder";
import { getAllOrders } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";

const DetailRoom = async ({ params: { id } }: SearchParamProps) => {
  const room: IRoom = await getRoomById(id);

  // Fetch the restaurant details
  const restaurant: Restaurant = await getRestaurantDetail(
    room.restaurantId.toString()
  );

  // Fetch the menu list
  const menus: MenuInfo[] = await getDishesWeb(room.deliveryId.toString());

  return (
    <>
      {/* RESTAURANT INFO */}
      <RestaurantDetail room={room} restaurant={restaurant} />
      {/* MENU & ORDER */}
      <MenuOrder
        _roomId={room._id}
        _restaurantId={room.restaurantId}
        _menus={menus}
      />
    </>
  );
};

export default DetailRoom;
