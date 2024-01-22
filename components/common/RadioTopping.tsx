import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ToppingGroup } from "@/types/shopeefood.type";

type RadioButtonGroupProps = {
  topping: ToppingGroup;
};

const RadioTopping = ({ topping }: RadioButtonGroupProps) => {
  return (
    <>
      <Separator className="my-1" />
      <h2 className="bold">
        {topping.partner_option_group_id} (Choose {topping.min_select})
      </h2>
      <Separator className="my-1" />
      <span className="my-2">
        <RadioGroup>
          {topping.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.name} id={option.id.toString()} />
              <Label htmlFor={option.id.toString()}>{option.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </span>
    </>
  );
};

export default RadioTopping;
