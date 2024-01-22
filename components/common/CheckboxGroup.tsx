import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const CheckboxGroup = () => {
  return (
    <>
      <Separator className="my-1" />
      <span>Opional (Max 10)</span>
      <Separator className="my-1" />
      <span className="flex flex-col gap-2 justify-center my-2">
        <span className="flex space-x-2">
          <Checkbox id="t1" />
          <label
            htmlFor="t1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Topping 1
          </label>
        </span>
        <span className="flex space-x-2">
          <Checkbox id="t2" />
          <label
            htmlFor="t2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Topping 2
          </label>
        </span>
      </span>
    </>
  );
};

export default CheckboxGroup;
