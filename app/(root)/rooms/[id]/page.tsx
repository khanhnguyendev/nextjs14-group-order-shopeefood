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

const DetailRoom = async ({ params: { id } }: SearchParamProps) => {
  const room: IRoom = await getRoomById(id);

  // Fetch the restaurant details
  const restaurant: Restaurant = await getRestaurantDetail(
    room.restaurantId.toString()
  );

  // Fetch the menu list
  const menuList: MenuInfo[] = await getDishesWeb(room.deliveryId.toString());

  return (
    <>
      {/* RESTAURANT INFO */}
      <RestaurantDetail room={room} restaurant={restaurant} />
      {/* MENU & ORDER */}
      <MenuOrder restaurantId={room.restaurantId} menuList={menuList} />
    </>
  );
};

export default DetailRoom;
