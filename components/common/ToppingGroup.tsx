import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

export function ToppingGroup() {
  return (
    <>
      {/* RADIO GROUP */}
      <Separator className="my-1" />
      <h2>Choose 1</h2>
      <Separator className="my-1" />
      <div className="my-2">
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Topping 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Topping 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Topping 3</Label>
          </div>
        </RadioGroup>
      </div>
      {/* CHECKBOX */}
      <Separator className="my-1" />
      <h2>Opional (Max 10)</h2>
      <Separator className="my-1" />
      <div className="flex flex-col gap-2 justify-center my-2">
        <div className="flex space-x-2">
          <Checkbox id="t1" />
          <label
            htmlFor="t1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Topping 1
          </label>
        </div>
        <div className="flex space-x-2">
          <Checkbox id="t2" />
          <label
            htmlFor="t2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Topping 2
          </label>
        </div>
      </div>
    </>
  );
}
