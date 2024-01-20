export type MenuInfo = {
  dish_type_id: number;
  dish_type_name: string;
  dishes: Dish[];
};

export type Dish = {
  is_deleted: boolean;
  description: string;
  name: string;
  price: {
    text: string;
    unit: string;
    value: number;
  };
  is_active: boolean;
  total_like: string;
  properties: any[];
  photos: Photo[];
  options: Option[];
  is_available: boolean;
  time: {
    available: any[];
    week_days: any[];
    not_available: any[];
  };
  id: number;
  display_order: number;
  is_group_discount_item: boolean;
  quantity: number;
};

export type Photo = {
  width: number;
  value: string;
  height: number;
};

export type Option = {
  ntop: string;
  mandatory: boolean;
  id: number;
  option_items: any[];
  name: string;
};
