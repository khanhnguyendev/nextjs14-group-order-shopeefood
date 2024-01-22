import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const RadioButtonGroup = () => {
  return (
    <>
      <Separator className="my-1" />
      <span>Choose 1</span>
      <Separator className="my-1" />
      <span className="my-2">
        <RadioGroup defaultValue="comfortable">
          <span className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Topping 1</Label>
          </span>
          <span className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Topping 2</Label>
          </span>
          <span className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Topping 3</Label>
          </span>
        </RadioGroup>
      </span>
    </>
  );
};

export default RadioButtonGroup;
