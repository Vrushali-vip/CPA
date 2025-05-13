import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

type TextareaFieldProps = {
  label: string;
  name: string;
};

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, name, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <Label htmlFor={name}>{label}</Label>
        <Textarea id={name} name={name} ref={ref} {...props} />
      </div>
    );
  }
);
TextareaField.displayName = "TextareaField";
