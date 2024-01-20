import React from "react";
import { getRoomById } from "@/lib/actions/room.actions";
import { SearchParamProps } from "@/types";
import MenuCollection from "@/components/MenuCollection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCollection from "@/components/OrderCollection";
import {
  getDishesWeb,
  getRestaurantDetail,
} from "@/lib/fetcher/shopeefood/web.api";
import { MenuInfo, Restaurant } from "@/types/shopeefood.type";
import { IRoom } from "@/lib/database/models/room.model";
import RestaurantDetail from "@/components/common/RestaurantDetail";

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
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <Tabs defaultValue="tab-menu">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tab-menu">Menu</TabsTrigger>
            <TabsTrigger value="tab-order">Order</TabsTrigger>
          </TabsList>
          <div className="mt-5 bg-slate-100 p-5 bg-contain rounded-2xl">
            {/* MENU */}
            <TabsContent value="tab-menu">
              <MenuCollection
                restaurantId={room.restaurantId}
                menuList={menuList}
              />
            </TabsContent>
            {/* ORDER */}
            <TabsContent value="tab-order">
              <OrderCollection />
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </>
  );
};

export default DetailRoom;
