import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { formatPriceVN } from "@/lib/utils";
import { getAllOrders } from "@/lib/actions/order.actions";
import { OrderCollectionProps } from "@/types/props.type";

const OrderCollection = async ({ _roomId }: OrderCollectionProps) => {
  const orders: any[] = await getAllOrders({ _roomId: _roomId });
  const subtotal = orders.reduce((total, order) => total + order.totalPrice, 0);

  // const getUserName = async (userId: string) => {
  //   return await getUserById(userId);
  // };

  return (
    <>
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order: any, index: number) => (
            <>
              <TableRow key={index}>
                <TableCell key={index} className="font-medium">
                  {order.orderBy}
                </TableCell>
                <TableCell key={index}>
                  <div className="flex gap-1 mb-1">
                    <Badge variant="destructive">{order.dish.name}</Badge>
                    <Badge variant="outline">
                      {formatPriceVN(order.dish.price.value)}
                    </Badge>
                    <Badge variant="outline">x {order.quantity}</Badge>
                  </div>
                  <div className="flex flex-col ml-5 gap-1">
                    {order.toppings.map((topping: any, index: number) => (
                      <span key={index} className="text-xs">
                        {topping.name} (+{formatPriceVN(topping.price)})
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell key={index}>{order.note}</TableCell>
                <TableCell key={index} className="text-right">
                  {formatPriceVN(order.totalPrice)}
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Subtotal ({orders.length} items)</TableCell>
            <TableCell className="text-right">
              {formatPriceVN(subtotal)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default OrderCollection;
