"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuCollection from "@/components/MenuCollection";
import OrderCollection from "@/components/OrderCollection";
import { MenuOrderProps } from "@/types/props.type";

const MenuOrder = ({
  _roomId,
  _restaurantId,
  _userId,
  _menus,
}: MenuOrderProps) => {
  return (
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <Tabs defaultValue="tab-menu">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tab-menu" className="bg-slate-400">
            <span className="text-white">Menu</span>
          </TabsTrigger>
          <TabsTrigger value="tab-order">Order</TabsTrigger>
        </TabsList>
        <div className="mt-5 bg-slate-100 p-5 bg-contain rounded-2xl">
          {/* MENU */}
          <TabsContent value="tab-menu">
            <MenuCollection
              _roomId={_roomId}
              _restaurantId={_restaurantId}
              _userId={_userId}
              _menuList={_menus}
            />
          </TabsContent>
          {/* ORDER */}
          <TabsContent value="tab-order">
            <OrderCollection _roomId={_roomId} />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export default MenuOrder;
