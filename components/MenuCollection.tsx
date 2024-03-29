import React from "react";
import Card from "./common/Card";
import { Dish, MenuInfo } from "@/types/shopeefood.type";
import { MenuCollectionProps } from "@/types/props.type";

const MenuCollection = ({
  _roomId,
  _restaurantId,
  _userId,
  _menuList,
}: MenuCollectionProps) => {
  const renderDishes = () => {
    return _menuList.map((menu: MenuInfo) => {
      return menu.dishes.map((dish: Dish, index: number) => (
        <li key={index} className="flex justify-center">
          <Card
            key={index}
            _roomId={_roomId}
            _restaurantId={_restaurantId}
            _userId={_userId}
            _dish={dish}
          />
        </li>
      ));
    });
  };

  return (
    <>
      {_menuList.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {renderDishes()}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">There is no food</h3>
        </div>
      )}
    </>
  );
};

export default MenuCollection;
