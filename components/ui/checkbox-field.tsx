import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CheckboxFieldProps = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
};

export const CheckboxField = ({ id, label, checked, onCheckedChange, error }: CheckboxFieldProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-start space-x-2">
        <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
        <Label htmlFor={id} className="text-sm leading-snug">
          {label}
        </Label>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
