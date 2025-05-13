// // import React from "react";
// // import { UseFormRegister, FieldError, Control, Controller } from "react-hook-form";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Label } from "@/components/ui/label";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { cn } from "@/lib/utils";
// // import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

// // interface InputWithLabelProps {
// //   label: string;
// //   name: string;
// //   register: UseFormRegister<InsuranceFormValues>;
// //   type?: string;
// //   error?: FieldError | { root?: { message?: string } };
// // }

// // export function InputWithLabel({ label, name, register, type = "text", error }: InputWithLabelProps) {
// //   const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
// //   return (
// //     <div className="space-y-1">
// //       <Label htmlFor={name}>{label}</Label>
// //       <Input id={name} {...register(name as any, {
// //           setValueAs: (value) => (type === "number" && value !== "" ? Number(value) : value)
// //       })} type={type} className={cn(errorMessage ? "border-red-500" : "", type !== "date" && type !== "checkbox" ? "rounded-none" : "")} />
// //       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
// //     </div>
// //   );
// // }

// // interface TextareaWithLabelProps {
// //   label: string;
// //   name: string;
// //   register: UseFormRegister<InsuranceFormValues>;
// //   error?: FieldError;
// // }

// // export function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
// //   return (
// //     <div className="space-y-1">
// //       <Label htmlFor={name}>{label}</Label>
// //       <Textarea id={name} {...register(name as any)} className={cn(error ? "border-red-500" : "", "rounded-none")} />
// //       {error && <p className="text-red-500 text-sm">{error.message}</p>}
// //     </div>
// //   );
// // }

// // interface ControlledTextareaArrayProps {
// //   control: Control<InsuranceFormValues>;
// //   name: "medical_conditions" | "current_medications" | "allergies";
// //   label: string;
// //   error?: FieldError | { message?: string } | { root?: { message?: string }};
// // }

// // export function ControlledTextareaArray({ control, name, label, error }: ControlledTextareaArrayProps) {
// //     const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
// //     return (
// //     <div className="space-y-1">
// //       <Label htmlFor={name}>{label}</Label>
// //       <Controller
// //         name={name}
// //         control={control}
// //         render={({ field }) => (
// //           <Textarea
// //             id={name}
// //             value={Array.isArray(field.value) ? field.value.join(', ') : ''}
// //             onChange={(e) => {
// //               const val = e.target.value;
// //               const arr = val === "" ? [] : val.split(',').map(s => s.trim()).filter(s => s !== "");
// //               field.onChange(arr);
// //             }}
// //             onBlur={field.onBlur}
// //             className={cn(errorMessage ? "border-red-500" : "", "rounded-none")}
// //           />
// //         )}
// //       />
// //       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
// //     </div>
// //   );
// // }

// // interface SelectWithLabelProps {
// //     control: Control<InsuranceFormValues>;
// //     name: string;
// //     label: string;
// //     options: { value: string; label: string }[];
// //     placeholder?: string;
// //     error?: FieldError;
// // }

// // export function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
// //     return (
// //         <div className="space-y-1">
// //             <Label htmlFor={name}>{label}</Label>
// //             <Controller
// //                 name={name as any}
// //                 control={control}
// //                 render={({ field }) => (
// //                     <Select
// //                         onValueChange={field.onChange}
// //                         value={field.value || ""}
// //                     >
// //                         <SelectTrigger
// //                             id={name}
// //                             className={cn(
// //                                 error ? "border-red-500" : "",
// //                                 "rounded-none"
// //                             )}
// //                         >
// //                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
// //                         </SelectTrigger>
// //                         <SelectContent className="rounded-none">
// //                             {options.map(option => (
// //                                 <SelectItem key={option.value} value={option.value}>
// //                                     {option.label}
// //                                 </SelectItem>
// //                             ))}
// //                         </SelectContent>
// //                     </Select>
// //                 )}
// //             />
// //             {error && <p className="text-red-500 text-sm">{error.message}</p>}
// //         </div>
// //     );
// // }


// import React from "react";
// import { UseFormRegister, FieldError, Control, Controller } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

// interface InputWithLabelProps {
//   label: string;
//   name: string;
//   register: UseFormRegister<InsuranceFormValues>;
//   type?: string;
//   error?: FieldError | { root?: { message?: string } };
// }

// export function InputWithLabel({ label, name, register, type = "text", error }: InputWithLabelProps) {
//   const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name as any, {
//           setValueAs: (value) => (type === "number" && value !== "" ? Number(value) : value)
//       })} type={type}
//          className={cn(
//             // Apply border-input for normal state, border-red-500 for error
//             errorMessage ? "border-red-500" : "border-input",
//             // Apply rounded-none conditionally
//             type !== "date" && type !== "checkbox" ? "rounded-none" : ""
//          )}
//       />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// }

// interface TextareaWithLabelProps {
//   label: string;
//   name: string;
//   register: UseFormRegister<InsuranceFormValues>;
//   error?: FieldError;
// }

// export function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name as any)}
//         className={cn(
//             // Apply border-input for normal state, border-red-500 for error
//             error ? "border-red-500" : "border-input",
//             "rounded-none"
//         )}
//       />
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </div>
//   );
// }

// interface ControlledTextareaArrayProps {
//   control: Control<InsuranceFormValues>;
//   name: "medical_conditions" | "current_medications" | "allergies";
//   label: string;
//   error?: FieldError | { message?: string } | { root?: { message?: string }};
// }

// export function ControlledTextareaArray({ control, name, label, error }: ControlledTextareaArrayProps) {
//     const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
//     return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <Textarea
//             id={name}
//             value={Array.isArray(field.value) ? field.value.join(', ') : ''}
//             onChange={(e) => {
//               const val = e.target.value;
//               const arr = val === "" ? [] : val.split(',').map(s => s.trim()).filter(s => s !== "");
//               field.onChange(arr);
//             }}
//             onBlur={field.onBlur}
//             className={cn(
//                 // Apply border-input for normal state, border-red-500 for error
//                 errorMessage ? "border-red-500" : "border-input",
//                 "rounded-none"
//             )}
//           />
//         )}
//       />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// }

// interface SelectWithLabelProps {
//     control: Control<InsuranceFormValues>;
//     name: string;
//     label: string;
//     options: { value: string; label: string }[];
//     placeholder?: string;
//     error?: FieldError;
// }

// export function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
//     const textColorClass = "text-white";
//     // For placeholder on custom BG, ensure it's distinct if main text is also white
//     // The `data-[placeholder]:` variant targets the placeholder state specifically for Radix-based components
//     const placeholderStyleClasses = `data-[placeholder]:${textColorClass} data-[placeholder]:opacity-70`;


//     return (
//         <div className="space-y-1">
//             <Label htmlFor={name}>{label}</Label>
//             <Controller
//                 name={name as any}
//                 control={control}
//                 render={({ field }) => (
//                     <Select
//                         onValueChange={field.onChange}
//                         value={field.value || ""}
//                     >
//                         <SelectTrigger
//                             id={name}
//                             className={cn(
//                                 "rounded-none", // Base style: non-rounded
//                                 "border",       // Ensure border width is applied
//                                 error
//                                   ? "bg-white border-red-500 text-slate-900 data-[placeholder]:text-slate-400" // Error state: white bg, red border, dark text
//                                   : `bg-[#00BBD3] border-[#00BBD3] ${textColorClass} ${placeholderStyleClasses}` // Normal state: custom BG, matching border, white text
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none border border-input"> {/* Dropdown panel standard border */}
//                             {options.map(option => (
//                                 <SelectItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 )}
//             />
//             {error && <p className="text-red-500 text-sm">{error.message}</p>}
//         </div>
//     );
// }

import React from "react";
import { UseFormRegister, FieldError, Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

interface InputWithLabelProps {
  label: string;
  name: string;
  register: UseFormRegister<InsuranceFormValues>;
  type?: string;
  error?: FieldError | { root?: { message?: string } };
}

export function InputWithLabel({ label, name, register, type = "text", error }: InputWithLabelProps) {
  const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} {...register(name as any, {
          setValueAs: (value) => (type === "number" && value !== "" ? Number(value) : value)
      })} type={type}
         className={cn(
            errorMessage ? "border-red-500" : "border-input",
            type !== "date" && type !== "checkbox" ? "rounded-none" : ""
         )}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}

interface TextareaWithLabelProps {
  label: string;
  name: string;
  register: UseFormRegister<InsuranceFormValues>;
  error?: FieldError;
}

export function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} {...register(name as any)}
        className={cn(
            error ? "border-red-500" : "border-input",
            "rounded-none"
        )}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}

interface ControlledTextareaArrayProps {
  control: Control<InsuranceFormValues>;
  name: "medical_conditions" | "current_medications" | "allergies";
  label: string;
  error?: FieldError | { message?: string } | { root?: { message?: string }};
}

export function ControlledTextareaArray({ control, name, label, error }: ControlledTextareaArrayProps) {
    const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
    return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            id={name}
            value={Array.isArray(field.value) ? field.value.join(', ') : ''}
            onChange={(e) => {
              const val = e.target.value;
              const arr = val === "" ? [] : val.split(',').map(s => s.trim()).filter(s => s !== "");
              field.onChange(arr);
            }}
            onBlur={field.onBlur}
            className={cn(
                errorMessage ? "border-red-500" : "border-input",
                "rounded-none"
            )}
          />
        )}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}


interface SelectWithLabelProps {
    control: Control<InsuranceFormValues>;
    name: string;
    label: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    error?: FieldError;
}

export function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
    const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
    const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";

    return (
        <div className="space-y-1">
            <Label htmlFor={name}>{label}</Label>
            <Controller
                name={name as any}
                control={control}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                    >
                        <SelectTrigger
                            id={name}
                            className={cn(
                                "rounded-none",
                                "border",
                                "bg-white",
                                error
                                  ? `border-red-500 ${triggerTextColorClassOnError}`
                                  : `border-input ${triggerTextColorClassNormal}`
                            )}
                        >
                            <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border border-input">
                            {options.map(option => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className={cn(
                                        "data-[highlighted]:bg-[#00BBD3] data-[highlighted]:text-white",
                                        "focus:bg-[#00BBD3] focus:text-white"
                                    )}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}