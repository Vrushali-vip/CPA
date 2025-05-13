import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, type = "text", ...props }, ref) => {
    return (
      <div className="space-y-1">
        <Label htmlFor={name}>{label}</Label>
        <Input id={name} name={name} type={type} ref={ref} {...props} />
      </div>
    );
  }
);
InputField.displayName = "InputField";
