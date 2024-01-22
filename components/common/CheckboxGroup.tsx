import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ToppingGroup } from "@/types/shopeefood.type";
import { formatPriceVN } from "@/lib/utils";

type CheckboxGroupProps = {
  topping: ToppingGroup;
};

const CheckboxGroup = ({ topping }: CheckboxGroupProps) => {
  return (
    <>
      <Separator className="my-1" />
      <h2 className="bold">
        {topping.partner_option_group_id} (Optional, Max {topping.max_select})
      </h2>
      <Separator className="my-1" />
      <span className="flex flex-col gap-2 justify-center my-2">
        {topping.options.map((option) => (
          <span key={option.id} className="flex space-x-2">
            <Checkbox id={option.id.toString()} />
            <label
              htmlFor={option.id.toString()}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.name} (+{formatPriceVN(Number(option.price))})
            </label>
          </span>
        ))}
      </span>
    </>
  );
};

export default CheckboxGroup;
