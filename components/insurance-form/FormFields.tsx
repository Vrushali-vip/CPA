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
//             errorMessage ? "border-red-500" : "border-input",
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
//     const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
//     const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";

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
//                                 "rounded-none",
//                                 "border",
//                                 "bg-white",
//                                 error
//                                   ? `border-red-500 ${triggerTextColorClassOnError}`
//                                   : `border-input ${triggerTextColorClassNormal}`
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none border border-input">
//                             {options.map(option => (
//                                 <SelectItem
//                                     key={option.value}
//                                     value={option.value}
//                                     className={cn(
//                                         "data-[highlighted]:bg-[#00BBD3] data-[highlighted]:text-white",
//                                         "focus:bg-[#00BBD3] focus:text-white"
//                                     )}
//                                 >
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


// import React from "react";
// import { UseFormRegister, FieldError, Control, Controller, Path } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

// interface InputWithLabelProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   register: UseFormRegister<InsuranceFormValues>;
//   type?: string;
//   error?: FieldError | { root?: { message?: string } };
// }

// export function InputWithLabel({ label, name, register, type = "text", error }: InputWithLabelProps) {
//   const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name, {
//           setValueAs: (value) => (type === "number" && value !== "" ? Number(value) : value)
//       })} type={type}
//          className={cn(
//             errorMessage ? "border-red-500" : "border-input",
//             type !== "date" && type !== "checkbox" ? "rounded-none" : ""
//          )}
//       />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// }

// interface TextareaWithLabelProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   register: UseFormRegister<InsuranceFormValues>;
//   error?: FieldError;
// }

// export function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)}
//         className={cn(
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
//     name: Path<InsuranceFormValues>;
//     label: string;
//     options: { value: string; label: string }[];
//     placeholder?: string;
//     error?: FieldError;
// }

// export function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
//     const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
//     const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";

//     return (
//         <div className="space-y-1">
//             <Label htmlFor={name}>{label}</Label>
//             <Controller
//                 name={name}
//                 control={control}
//                 render={({ field }) => (
//                     <Select
//                         onValueChange={field.onChange}
//                         value={field.value as string || ""}
//                     >
//                         <SelectTrigger
//                             id={name}
//                             className={cn(
//                                 "rounded-none",
//                                 "border",
//                                 "bg-white",
//                                 error
//                                   ? `border-red-500 ${triggerTextColorClassOnError}`
//                                   : `border-input ${triggerTextColorClassNormal}`
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none border border-input">
//                             {options.map(option => (
//                                 <SelectItem
//                                     key={option.value}
//                                     value={option.value}
//                                     className={cn(
//                                         "data-[highlighted]:bg-[#00BBD3] data-[highlighted]:text-white",
//                                         "focus:bg-[#00BBD3] focus:text-white"
//                                     )}
//                                 >
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

// import React from "react";
// import { UseFormRegister, FieldError, Control, Controller, Path, FieldValues } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

// // Updated InputWithLabelProps to handle optional register and generic FieldValues
// interface InputWithLabelProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//   label: string;
//   name: Path<TFieldValues> | string; // Allow string for non-schema/display names
//   register?: UseFormRegister<TFieldValues>; // Make register optional
//   type?: string;
//   error?: FieldError | { root?: { message?: string } };
//   readOnly?: boolean;
//   value?: string | number; // For controlled or display-only readOnly inputs
// }

// export function InputWithLabel<TFieldValues extends FieldValues = InsuranceFormValues>({
//   label,
//   name,
//   register,
//   type = "text",
//   error,
//   readOnly,
//   value,
// }: InputWithLabelProps<TFieldValues>) {
//   const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));

//   // Prepare props for the Input component
//   const inputBaseProps: React.InputHTMLAttributes<HTMLInputElement> & { id: string; name: string } = {
//     id: name as string,
//     name: name as string,
//     type: type,
//     className: cn(
//         errorMessage ? "border-red-500" : "border-input", // Reverted to border-input for normal state
//         // Removed explicit "h-12" to keep original size
//         type !== "date" && type !== "checkbox" ? "rounded-none" : "",
//         readOnly ? "bg-slate-100 text-slate-700 cursor-not-allowed focus:ring-0 focus:ring-offset-0 focus:border-input" : ""
//     ),
//   };

//   let registrationProps = {};
//   if (readOnly) {
//     inputBaseProps.value = value !== undefined ? value : "";
//     inputBaseProps.readOnly = true;
//   } else if (register) {
//     // Only apply register if not readOnly and register is provided
//     registrationProps = register(name as Path<TFieldValues>, {
//       setValueAs: (val: any) => (type === "number" && val !== "" && !isNaN(Number(val)) ? Number(val) : (val === "" && type === "number" ? null : val)) // Handle empty string for numbers better
//     });
//   } else {
//     // For non-registered, non-readonly (should be rare for this component's typical use)
//     inputBaseProps.value = value !== undefined ? value : "";
//   }

//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name as string}>{label}</Label>
//       <Input {...inputBaseProps} {...registrationProps} />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// }

// // --- TextareaWithLabel, ControlledTextareaArray, SelectWithLabel ---
// // --- These components remain IDENTICAL to the versions in your provided code ---
// // --- No size changes were requested for them, and they were not the source of the error ---

// interface TextareaWithLabelProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   register: UseFormRegister<InsuranceFormValues>;
//   error?: FieldError;
// }

// export function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   // This is the original version from your code
//   const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)}
//         className={cn(
//             error ? "border-red-500" : "border-input", // Using border-input as per your original
//             "rounded-none"
//         )}
//       />
//       {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
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
//     // This is the original version from your code
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
//                 errorMessage ? "border-red-500" : "border-input", // Using border-input
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
//     name: Path<InsuranceFormValues>;
//     label: string;
//     options: { value: string; label: string }[];
//     placeholder?: string;
//     error?: FieldError;
// }

// export function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
//     // This is the original version from your code for SelectTrigger styling (no custom BG or explicit height)
//     const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
//     const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";

//     return (
//         <div className="space-y-1">
//             <Label htmlFor={name}>{label}</Label>
//             <Controller
//                 name={name}
//                 control={control}
//                 render={({ field }) => (
//                     <Select
//                         onValueChange={field.onChange}
//                         value={field.value as string || ""}
//                     >
//                         <SelectTrigger
//                             id={name}
//                             className={cn( // Reverted to your original className logic for SelectTrigger
//                                 "rounded-none",
//                                 "border", // This was present in your working select
//                                 "bg-white", // This was present in your working select
//                                 error
//                                   ? `border-red-500 ${triggerTextColorClassOnError}`
//                                   : `border-input ${triggerTextColorClassNormal}`
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none border border-input">
//                             {options.map(option => (
//                                 <SelectItem
//                                     key={option.value}
//                                     value={option.value}
//                                     className={cn(
//                                         "data-[highlighted]:bg-[#00BBD3] data-[highlighted]:text-white",
//                                         "focus:bg-[#00BBD3] focus:text-white"
//                                     )}
//                                 >
//                                     {option.label}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 )}
//             />
//             {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
//         </div>
//     );
// }

// import React from "react";
// import { UseFormRegister, FieldError, Control, Controller, Path, FieldValues } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

// interface InputWithLabelProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//   label: string;
//   name: Path<TFieldValues> | string;
//   register?: UseFormRegister<TFieldValues>;
//   type?: string;
//   error?: FieldError | { root?: { message?: string } }; // Keep this flexible error type
//   readOnly?: boolean;
//   value?: string | number;
// }

// export function InputWithLabel<TFieldValues extends FieldValues = InsuranceFormValues>({
//   label,
//   name,
//   register,
//   type = "text",
//   error,
//   readOnly,
//   value,
// }: InputWithLabelProps<TFieldValues>) {
//   // This helper is fine for InputWithLabel as it handles root messages too
//   const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));

//   const inputBaseProps: React.InputHTMLAttributes<HTMLInputElement> & { id: string; name: string } = {
//     id: name as string,
//     name: name as string,
//     type: type,
//     className: cn(
//         errorMessage ? "border-red-500" : "border-input",
//         type !== "date" && type !== "checkbox" ? "rounded-none" : "",
//         readOnly ? "bg-slate-100 text-slate-700 cursor-not-allowed focus:ring-0 focus:ring-offset-0 focus:border-input" : ""
//     ),
//   };

//   let registrationProps = {};
//   if (readOnly) {
//     inputBaseProps.value = value !== undefined ? value : "";
//     inputBaseProps.readOnly = true;
//   } else if (register) {
//     registrationProps = register(name as Path<TFieldValues>, {
//       setValueAs: (val: any) => (type === "number" && val !== "" && !isNaN(Number(val)) ? Number(val) : (val === "" && type === "number" ? null : val))
//     });
//   } else {
//     inputBaseProps.value = value !== undefined ? value : "";
//   }

//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name as string}>{label}</Label>
//       <Input {...inputBaseProps} {...registrationProps} />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// }

// interface TextareaWithLabelProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   register: UseFormRegister<InsuranceFormValues>;
//   error?: FieldError; 
// }

// export function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)}
//         className={cn(
//             error ? "border-red-500" : "border-input",
//             "rounded-none"
//         )}
//       />
//       {/* Directly use error.message as TextareaWithLabel usually gets a direct FieldError */}
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </div>
//   );
// }

// interface ControlledTextareaArrayProps {
//   control: Control<InsuranceFormValues>;
//   name: "medical_conditions" | "current_medications" | "allergies";
//   label: string;
//   // Error for array fields might be on the array itself (root) or specific items.
//   // For simplicity, if it's a direct message for the whole array input:
//   error?: FieldError | { message?: string } | { root?: { message?: string }};
// }

// export function ControlledTextareaArray({ control, name, label, error }: ControlledTextareaArrayProps) {
//     // For ControlledTextareaArray, the error might be structured differently if it's an array error.
//     // Let's use the same flexible errorMessage helper as InputWithLabel.
//     const errorMessage = error && ('message' in error ? error.message : (typeof error === 'object' && error !== null && 'root' in error && (error as any).root?.message));

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
//     name: Path<InsuranceFormValues>;
//     label: string;
//     options: { value: string; label: string }[];
//     placeholder?: string;
//     error?: FieldError; // SelectWithLabel typically gets FieldError directly for its path
// }

// export function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
//     const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
//     const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";

//     return (
//         <div className="space-y-1">
//             <Label htmlFor={name}>{label}</Label>
//             <Controller
//                 name={name}
//                 control={control}
//                 render={({ field }) => (
//                     <Select
//                         onValueChange={field.onChange}
//                         value={field.value as string || ""}
//                     >
//                         <SelectTrigger
//                             id={name}
//                             className={cn(
//                                 "rounded-none",
//                                 "border",
//                                 "bg-white",
//                                 error
//                                   ? `border-red-500 ${triggerTextColorClassOnError}`
//                                   : `border-input ${triggerTextColorClassNormal}`
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none border border-input">
//                             {options.map(option => (
//                                 <SelectItem
//                                     key={option.value}
//                                     value={option.value}
//                                     className={cn(
//                                         "data-[highlighted]:bg-[#00BBD3] data-[highlighted]:text-white",
//                                         "focus:bg-[#00BBD3] focus:text-white"
//                                     )}
//                                 >
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

// src/components/insurance-form/FormFields.tsx
// import React from "react";
// import { UseFormRegister, FieldError, Control, Controller, Path, FieldValues } from "react-hook-form";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";

// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar"; // Shadcn Calendar
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// import { cn } from "@/lib/utils";
// import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

// // --- InputWithLabel (Keep as is from your last version) ---
// interface InputWithLabelProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//   label: string;
//   name: Path<TFieldValues> | string;
//   register?: UseFormRegister<TFieldValues>;
//   type?: string;
//   error?: FieldError | { root?: { message?: string } };
//   readOnly?: boolean;
//   value?: string | number;
// }
// export function InputWithLabel<TFieldValues extends FieldValues = InsuranceFormValues>({
//   label,
//   name,
//   register,
//   type = "text",
//   error,
//   readOnly,
//   value,
// }: InputWithLabelProps<TFieldValues>) {
//   const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
//   const inputBaseProps: React.InputHTMLAttributes<HTMLInputElement> & { id: string; name: string } = {
//     id: name as string,
//     name: name as string,
//     type: type,
//     className: cn(
//         errorMessage ? "border-red-500" : "border-input",
//         type !== "date" && type !== "checkbox" ? "rounded-none" : "",
//         readOnly ? "bg-slate-100 text-slate-700 cursor-not-allowed focus:ring-0 focus:ring-offset-0 focus:border-input" : ""
//     ),
//   };
//   let registrationProps = {};
//   if (readOnly) {
//     inputBaseProps.value = value !== undefined ? value : "";
//     inputBaseProps.readOnly = true;
//   } else if (register) {
//     registrationProps = register(name as Path<TFieldValues>, {
//       setValueAs: (val: any) => (type === "number" && val !== "" && !isNaN(Number(val)) ? Number(val) : (val === "" && type === "number" ? null : val))
//     });
//   } else {
//     inputBaseProps.value = value !== undefined ? value : "";
//   }
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name as string}>{label}</Label>
//       <Input {...inputBaseProps} {...registrationProps} />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// }


// // --- DatePickerField (Revised for Shadcn Demo Look & Feel) ---
// interface DatePickerFieldProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   control: Control<InsuranceFormValues>;
//   error?: FieldError;
//   placeholder?: string;
// }
// export function DatePickerField({ label, name, control, error, placeholder = "Pick a date" }: DatePickerFieldProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant={"outline"} // Standard variant for DatePicker trigger
//                 id={name}
//                 className={cn(
//                   "w-full justify-start text-left font-normal", // Standard Shadcn DatePicker trigger style
//                   !field.value && "text-muted-foreground",      // Placeholder text color
//                   "rounded-none",                               // Your custom: non-rounded TRIGGER button
//                   error ? "border-red-500 ring-red-500" : "border-input" // Error state for TRIGGER
//                   // Note: Default button height applies. If different from Input, adjust here or make Input default height match Button.
//                 )}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {field.value ? format(new Date(field.value as string | number | Date), "PPP") : <span>{placeholder}</span>}
//               </Button>
//             </PopoverTrigger>
//             {/* PopoverContent and Calendar will use their default Shadcn rounding and padding */}
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="single"
//                 selected={field.value ? new Date(field.value as string | number | Date) : undefined}
//                 onSelect={(date) => {
//                   field.onChange(date ? format(date, "yyyy-MM-dd") : "");
//                 }}
//                 initialFocus
//                 // classNames prop to style the selected day and today's date
//                 classNames={{
//                   day_selected: cn(
//                     "!bg-[#00BBD3] !text-white", // Use ! to ensure override if needed
//                     "hover:!bg-[#00BBD3] hover:!text-white",
//                     "focus:!bg-[#00BBD3] focus:!text-white"
//                   ),
//                   day_today: cn(
//                     "aria-selected:!text-white", // If today is selected, text is white
//                     "!text-[#00BBD3]"            // If today is not selected, text is your color
//                   ),
//                   // To ensure corners of selected day are rounded like default:
//                   // These are default react-day-picker classes that Shadcn might use/pass through.
//                   // If the selection itself is too rounded, it might be due to these.
//                   // However, `day_selected` above should primarily control the selected day cell.
//                   // day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
//                   // head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
//                   // cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//                 }}
//               />
//             </PopoverContent>
//           </Popover>
//         )}
//       />
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </div>
//   );
// }


// // --- TextareaWithLabel, ControlledTextareaArray, SelectWithLabel (Keep as is from your last version) ---
// interface TextareaWithLabelProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   register: UseFormRegister<InsuranceFormValues>;
//   error?: FieldError;
// }
// export function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)}
//         className={cn(
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
//     const errorMessage = error && ('message' in error ? error.message : (typeof error === 'object' && error !== null && 'root' in error && (error as any).root?.message));
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
//     name: Path<InsuranceFormValues>;
//     label: string;
//     options: { value: string; label: string }[];
//     placeholder?: string;
//     error?: FieldError;
// }
// export function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
//     const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
//     const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";
//     return (
//         <div className="space-y-1">
//             <Label htmlFor={name}>{label}</Label>
//             <Controller
//                 name={name}
//                 control={control}
//                 render={({ field }) => (
//                     <Select
//                         onValueChange={field.onChange}
//                         value={field.value as string || ""}
//                     >
//                         <SelectTrigger
//                             id={name}
//                             className={cn(
//                                 "rounded-none", // Your non-rounded trigger
//                                 "border",
//                                 "bg-white",
//                                 error
//                                   ? `border-red-500 ${triggerTextColorClassOnError}`
//                                   : `border-input ${triggerTextColorClassNormal}`
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none border border-input"> {/* Non-rounded dropdown panel */}
//                             {options.map(option => (
//                                 <SelectItem
//                                     key={option.value}
//                                     value={option.value}
//                                     className={cn(
//                                         "data-[highlighted]:bg-[#00BBD3] data-[highlighted]:text-white",
//                                         "focus:bg-[#00BBD3] focus:text-white"
//                                     )}
//                                 >
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


// import React from "react";
// import { UseFormRegister, FieldError, Control, Controller, Path, FieldValues } from "react-hook-form";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";

// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar"; 
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// import { cn } from "@/lib/utils";
// import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

// interface InputWithLabelProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//   label: string;
//   name: Path<TFieldValues> | string;
//   register?: UseFormRegister<TFieldValues>;
//   type?: string;
//   error?: FieldError | { root?: { message?: string } };
//   readOnly?: boolean;
//   value?: string | number;
// }
// export function InputWithLabel<TFieldValues extends FieldValues = InsuranceFormValues>({
//   label,
//   name,
//   register,
//   type = "text",
//   error,
//   readOnly,
//   value,
// }: InputWithLabelProps<TFieldValues>) {
//   const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
//   const inputBaseProps: React.InputHTMLAttributes<HTMLInputElement> & { id: string; name: string } = {
//     id: name as string,
//     name: name as string,
//     type: type,
//     className: cn(
//         errorMessage ? "border-red-500" : "border-input",
//         type !== "date" && type !== "checkbox" ? "rounded-none" : "",
//         readOnly ? "bg-slate-100 text-slate-700 cursor-not-allowed focus:ring-0 focus:ring-offset-0 focus:border-input" : ""
//     ),
//   };
//   let registrationProps = {};
//   if (readOnly) {
//     inputBaseProps.value = value !== undefined ? value : "";
//     inputBaseProps.readOnly = true;
//   } else if (register) {
//     registrationProps = register(name as Path<TFieldValues>, {
//       setValueAs: (val: unknown) => {
//         if (type === "number" && val !== "" && !isNaN(Number(val))) {
//           return Number(val);
//         } else if (val === "" && type === "number") {
//           return null;
//         }
//         return val;
//       }
//     });
//   } else {
//     inputBaseProps.value = value !== undefined ? value : "";
//   }
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name as string}>{label}</Label>
//       <Input {...inputBaseProps} {...registrationProps} />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage as string}</p>}
//     </div>
//   );
// }


// interface DatePickerFieldProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   control: Control<InsuranceFormValues>;
//   error?: FieldError;
//   placeholder?: string;
// }
// export function DatePickerField({ label, name, control, error, placeholder = "Pick a date" }: DatePickerFieldProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant={"outline"} 
//                 id={name}
//                 className={cn(
//                   "w-full justify-start text-left font-normal", 
//                   !field.value && "text-muted-foreground",      
//                   "rounded-none",                               
//                   error ? "border-red-500 ring-red-500" : "border-input" 
//                 )}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {field.value ? format(new Date(field.value as string | number | Date), "PPP") : <span>{placeholder}</span>}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="single"
//                 selected={field.value ? new Date(field.value as string | number | Date) : undefined}
//                 onSelect={(date) => {
//                   field.onChange(date ? format(date, "yyyy-MM-dd") : "");
//                 }}
//                 initialFocus
//                 classNames={{
//                   day_selected: cn(
//                     "!bg-[#00BBD3] !text-white", 
//                     "hover:!bg-[#00BBD3] hover:!text-white",
//                     "focus:!bg-[#00BBD3] focus:!text-white"
//                   ),
//                   day_today: cn(
//                     "aria-selected:!text-white", 
//                     "!text-[#00BBD3]"            
//                   ),
//                 }}
//               />
//             </PopoverContent>
//           </Popover>
//         )}
//       />
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </div>
//   );
// }


// // --- TextareaWithLabel, ControlledTextareaArray, SelectWithLabel (Keep as is from your last version) ---
// interface TextareaWithLabelProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   register: UseFormRegister<InsuranceFormValues>;
//   error?: FieldError;
// }
// export function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)}
//         className={cn(
//             error ? "border-red-500" : "border-input",
//             "rounded-none"
//         )}
//       />
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </div>
//   );
// }

// // Define a more specific error type for ControlledTextareaArray
// type ExtendedFieldError = FieldError | {
//   message?: string;
//   root?: { message?: string };
// };

// interface ControlledTextareaArrayProps {
//   control: Control<InsuranceFormValues>;
//   name: "medical_conditions" | "current_medications" | "allergies";
//   label: string;
//   error?: ExtendedFieldError;
// }
// export function ControlledTextareaArray({ control, name, label, error }: ControlledTextareaArrayProps) {
//     // Properly type check the error object
//     const errorMessage = error && (
//       'message' in error 
//         ? error.message 
//         : ('root' in error && error.root?.message)
//     );
    
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
//     name: Path<InsuranceFormValues>;
//     label: string;
//     options: { value: string; label: string }[];
//     placeholder?: string;
//     error?: FieldError;
// }
// export function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
//     const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
//     const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";
//     return (
//         <div className="space-y-1">
//             <Label htmlFor={name}>{label}</Label>
//             <Controller
//                 name={name}
//                 control={control}
//                 render={({ field }) => (
//                     <Select
//                         onValueChange={field.onChange}
//                         value={field.value as string || ""}
//                     >
//                         <SelectTrigger
//                             id={name}
//                             className={cn(
//                                 "rounded-none", // Your non-rounded trigger
//                                 "border",
//                                 "bg-white",
//                                 error
//                                   ? `border-red-500 ${triggerTextColorClassOnError}`
//                                   : `border-input ${triggerTextColorClassNormal}`
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none border border-input"> {/* Non-rounded dropdown panel */}
//                             {options.map(option => (
//                                 <SelectItem
//                                     key={option.value}
//                                     value={option.value}
//                                     className={cn(
//                                         "data-[highlighted]:bg-[#00BBD3] data-[highlighted]:text-white",
//                                         "focus:bg-[#00BBD3] focus:text-white"
//                                     )}
//                                 >
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

// "use client";

// import React from "react";
// import { UseFormRegister, FieldError, Control, Controller, Path, FieldValues } from "react-hook-form";
// import { format } from "date-fns";
// import { Calendar as CalendarIconLucide } from "lucide-react"; // Aliased to avoid name clash

// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// import { cn } from "@/lib/utils";
// import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

// interface InputWithLabelProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//   label: string;
//   name: Path<TFieldValues> | string;
//   register?: UseFormRegister<TFieldValues>;
//   type?: string;
//   error?: FieldError | { root?: { message?: string } };
//   readOnly?: boolean;
//   value?: string | number;
// }
// export function InputWithLabel<TFieldValues extends FieldValues = InsuranceFormValues>({
//   label,
//   name,
//   register,
//   type = "text",
//   error,
//   readOnly,
//   value,
// }: InputWithLabelProps<TFieldValues>) {
//   const errorMessage = error && ('message' in error ? error.message : (typeof error === 'object' && error !== null && 'root' in error && (error as { root?: { message?: string } })?.root?.message));
//   const inputBaseProps: React.InputHTMLAttributes<HTMLInputElement> & { id: string; name: string } = {
//     id: name as string,
//     name: name as string,
//     type: type,
//     className: cn(
//         errorMessage ? "border-red-500 focus-visible:ring-red-500" : "border-input",
//         type !== "date" && type !== "checkbox" ? "rounded-none" : "",
//         readOnly ? "bg-slate-100 text-slate-700 cursor-not-allowed focus:ring-0 focus:ring-offset-0 focus:border-input" : ""
//     ),
//   };
//   let registrationProps = {};
//   if (readOnly) {
//     inputBaseProps.value = value !== undefined ? String(value) : "";
//     inputBaseProps.readOnly = true;
//   } else if (register) {
//     registrationProps = register(name as Path<TFieldValues>, {
//       setValueAs: (val: unknown) => {
//         if (type === "number" && val !== "" && !isNaN(Number(val))) {
//           return Number(val);
//         } else if (val === "" && type === "number") {
//           return null;
//         }
//         return val;
//       }
//     });
//   } else {
//     inputBaseProps.value = value !== undefined ? String(value) : "";
//   }
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name as string}>{label}</Label>
//       <Input {...inputBaseProps} {...registrationProps} />
//       {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage as string}</p>}
//     </div>
//   );
// }


// interface DatePickerFieldProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   control: Control<InsuranceFormValues>;
//   error?: FieldError;
//   placeholder?: string;
//   minDate?: Date;
//   maxDate?: Date;
//   disabledDate?: (date: Date) => boolean;
// }
// export function DatePickerField({
//   label,
//   name,
//   control,
//   error,
//   placeholder = "Pick a date",
//   minDate,
//   maxDate,
//   disabledDate
// }: DatePickerFieldProps) {
//   const [isPopoverOpen, setIsPopoverOpen] = React.useState(false); // Control open state for robust closing

//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState }) => {
//           const currentFieldError = fieldState.error || error;
//           let selectedDateForCalendar: Date | undefined = undefined;
//           let buttonDisplayText: React.ReactNode = <span>{placeholder}</span>;

//           if (field.value && typeof field.value === 'string') {
//             // RHF stores date as "yyyy-MM-dd". Parse as local time.
//             const dateObj = new Date(field.value + "T00:00:00");
//             if (!isNaN(dateObj.getTime())) {
//               selectedDateForCalendar = dateObj;
//               try {
//                 buttonDisplayText = format(dateObj, "PPP");
//               } catch (e) {
//                 console.error("DatePickerField: Error formatting date", name, field.value, e);
//                 buttonDisplayText = <span>Invalid Date</span>;
//               }
//             } else {
//                console.warn("DatePickerField: Invalid date string from RHF", name, field.value);
//             }
//           }

//           return (
//             <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant={"outline"}
//                   id={name} // ID for the label's htmlFor
//                   className={cn(
//                     "w-full justify-start text-left font-normal",
//                     !field.value && "text-muted-foreground",
//                     "rounded-none",
//                     currentFieldError ? "border-red-500 focus-visible:ring-red-500" : "border-input"
//                   )}
//                   onClick={() => setIsPopoverOpen(true)} // Explicitly open
//                 >
//                   <CalendarIconLucide className="mr-2 h-4 w-4" />
//                   {buttonDisplayText}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={selectedDateForCalendar}
//                   onSelect={(date) => {
//                     field.onChange(date ? format(date, "yyyy-MM-dd") : "");
//                     setIsPopoverOpen(false); // Close popover on select
//                   }}
//                   initialFocus
//                   fromDate={minDate}
//                   toDate={maxDate}
//                   disabled={disabledDate}
//                   classNames={{
//                     day_selected: cn(
//                       "!bg-[#00BBD3] !text-white",
//                       "hover:!bg-[#00BBD3] hover:!text-white",
//                       "focus:!bg-[#00BBD3] focus:!text-white"
//                     ),
//                     day_today: cn(
//                       "aria-selected:!text-white",
//                       "!text-[#00BBD3]"
//                     ),
//                   }}
//                 />
//               </PopoverContent>
//             </Popover>
//           );
//         }}
//       />
//       {(error || control.getFieldState(name).error) &&
//         <p className="text-red-500 text-sm mt-1">{(control.getFieldState(name).error?.message || error?.message )}</p>
//       }
//     </div>
//   );
// }


// interface TextareaWithLabelProps {
//   label: string;
//   name: Path<InsuranceFormValues>;
//   register: UseFormRegister<InsuranceFormValues>;
//   error?: FieldError;
// }
// export function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)}
//         className={cn(
//             error ? "border-red-500 focus-visible:ring-red-500" : "border-input",
//             "rounded-none"
//         )}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//     </div>
//   );
// }

// type ExtendedFieldError = FieldError | {
//   message?: string;
//   root?: { message?: string };
// };

// interface ControlledTextareaArrayProps {
//   control: Control<InsuranceFormValues>;
//   name: "medical_conditions" | "current_medications" | "allergies";
//   label: string;
//   error?: ExtendedFieldError;
// }
// export function ControlledTextareaArray({ control, name, label, error }: ControlledTextareaArrayProps) {
//     const errorMessage = error && (
//       'message' in error
//         ? error.message
//         : (typeof error === 'object' && error !== null && 'root' in error && (error as { root?: { message?: string } })?.root?.message)
//     );

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
//                 errorMessage ? "border-red-500 focus-visible:ring-red-500" : "border-input",
//                 "rounded-none"
//             )}
//           />
//         )}
//       />
//       {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage as string}</p>}
//     </div>
//   );
// }

// interface SelectWithLabelProps {
//     control: Control<InsuranceFormValues>;
//     name: Path<InsuranceFormValues>;
//     label: string;
//     options: { value: string; label: string }[];
//     placeholder?: string;
//     error?: FieldError;
// }
// export function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
//     const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
//     const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";
//     return (
//         <div className="space-y-1">
//             <Label htmlFor={name}>{label}</Label>
//             <Controller
//                 name={name}
//                 control={control}
//                 render={({ field, fieldState }) => (
//                     <Select
//                         onValueChange={field.onChange}
//                         value={field.value as string || ""}
//                         name={field.name}
//                     >
//                         <SelectTrigger
//                             id={name}
//                             className={cn(
//                                 "rounded-none",
//                                 "w-full",
//                                 "border",
//                                 "bg-white",
//                                 (fieldState.error || error)
//                                   ? `border-red-500 ${triggerTextColorClassOnError} focus-visible:ring-red-500`
//                                   : `border-input ${triggerTextColorClassNormal}`
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none border border-input">
//                             {options.map(option => (
//                                 <SelectItem
//                                     key={option.value}
//                                     value={option.value}
//                                     className={cn(
//                                         "data-[highlighted]:bg-[#00BBD3] data-[highlighted]:text-white",
//                                         "focus:bg-[#00BBD3] focus:text-white"
//                                     )}
//                                 >
//                                     {option.label}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 )}
//             />
//             {(control.getFieldState(name).error || error) &&
//               <p className="text-red-500 text-sm mt-1">{(control.getFieldState(name).error?.message || error?.message )}</p>
//             }
//         </div>
//     );
// }

// "use client";

// import React from "react";
// import { UseFormRegister, FieldError, Control, Controller, Path, FieldValues } from "react-hook-form";
// import { format } from "date-fns";
// import { Calendar as CalendarIconLucide } from "lucide-react";

// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// import { cn } from "@/lib/utils";
// import type { InsuranceFormValues } from "@/lib/insuranceFormSchema";

// interface InputWithLabelProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//   label: string;
//   name: Path<TFieldValues> | string;
//   register?: UseFormRegister<TFieldValues>;
//   type?: string;
//   error?: FieldError | { root?: { message?: string } };
//   readOnly?: boolean;
//   value?: string | number;
//   placeholder?: string;
// }
// export function InputWithLabel<TFieldValues extends FieldValues = InsuranceFormValues>({
//   label,
//   name,
//   register,
//   type = "text",
//   error,
//   readOnly,
//   value,
//   placeholder,
// }: InputWithLabelProps<TFieldValues>) {
//   const errorMessage = error && ('message' in error ? error.message : (typeof error === 'object' && error !== null && 'root' in error && (error as { root?: { message?: string } })?.root?.message));
//   const inputBaseProps: React.InputHTMLAttributes<HTMLInputElement> & { id: string; name: string } = {
//     id: name as string,
//     name: name as string,
//     type: type,
//     placeholder: placeholder,
//     className: cn(
//         errorMessage ? "border-red-500 focus-visible:ring-red-500" : "border-input",
//         type !== "date" && type !== "checkbox" ? "rounded-none" : "",
//         readOnly ? "bg-slate-100 text-slate-700 cursor-not-allowed focus:ring-0 focus:ring-offset-0 focus:border-input" : ""
//     ),
//   };
//   let registrationProps = {};
//   if (readOnly) {
//     inputBaseProps.value = value !== undefined ? String(value) : "";
//     inputBaseProps.readOnly = true;
//   } else if (register) {
//     registrationProps = register(name as Path<TFieldValues>, { 
//       setValueAs: (val: unknown) => {
//         if (type === "number" && val !== "" && !isNaN(Number(val))) {
//           return Number(val);
//         } else if (val === "" && type === "number") {
//           return null; 
//         }
//         return val;
//       }
//     });
//   } else { 
//     inputBaseProps.value = value !== undefined ? String(value) : "";
//   }
//   return (
//     <div className="space-y-1">
//       {label && <Label htmlFor={name as string}>{label}</Label>}
//       <Input {...inputBaseProps} {...registrationProps} />
//       {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage as string}</p>}
//     </div>
//   );
// }


// interface DatePickerFieldProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//   label: string;
//   name: Path<TFieldValues> | string;
//   control: Control<TFieldValues>;
//   error?: FieldError;
//   placeholder?: string;
//   minDate?: Date;
//   maxDate?: Date;
//   disabledDate?: (date: Date) => boolean;
// }
// export function DatePickerField<TFieldValues extends FieldValues = InsuranceFormValues>({
//   label,
//   name,
//   control,
//   error,
//   placeholder = "Pick a date",
//   minDate,
//   maxDate,
//   disabledDate
// }: DatePickerFieldProps<TFieldValues>) {
//   const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name as string}>{label}</Label>
//       <Controller
//         name={name as Path<TFieldValues>}
//         control={control}
//         render={({ field, fieldState }) => {
//           const currentFieldError = fieldState.error || error;
//           let selectedDateForCalendar: Date | undefined = undefined;
//           let buttonDisplayText: React.ReactNode = <span>{placeholder}</span>;

//           if (field.value && typeof field.value === 'string') {
//             const dateObj = new Date(field.value + "T00:00:00");
//             if (!isNaN(dateObj.getTime())) {
//               selectedDateForCalendar = dateObj;
//               try {
//                 buttonDisplayText = format(dateObj, "PPP");
//               } catch (e) {
//                 console.error("DatePickerField: Error formatting date", name, field.value, e);
//                 buttonDisplayText = <span>Invalid Date</span>;
//               }
//             } else {
//                console.warn("DatePickerField: Invalid date string from RHF", name, field.value);
//             }
//           }

//           return (
//             <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant={"outline"}
//                   id={name as string}
//                   className={cn(
//                     "w-full justify-start text-left font-normal",
//                     !field.value && "text-muted-foreground",
//                     "rounded-none",
//                     currentFieldError ? "border-red-500 focus-visible:ring-red-500" : "border-input"
//                   )}
//                   onClick={() => setIsPopoverOpen(true)}
//                 >
//                   <CalendarIconLucide className="mr-2 h-4 w-4" />
//                   {buttonDisplayText}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={selectedDateForCalendar}
//                   onSelect={(date) => {
//                     field.onChange(date ? format(date, "yyyy-MM-dd") : "");
//                     setIsPopoverOpen(false);
//                   }}
//                   initialFocus
//                   fromDate={minDate}
//                   toDate={maxDate}
//                   disabled={disabledDate}
//                   classNames={{
//                     day_selected: cn(
//                       "!bg-[#00BBD3] !text-white",
//                       "hover:!bg-[#00BBD3] hover:!text-white",
//                       "focus:!bg-[#00BBD3] focus:!text-white"
//                     ),
//                     day_today: cn(
//                       "aria-selected:!text-white",
//                       "!text-[#00BBD3]"
//                     ),
//                   }}
//                 />
//               </PopoverContent>
//             </Popover>
//           );
//         }}
//       />
//       {(error || control.getFieldState(name as Path<TFieldValues>).error) &&
//         <p className="text-red-500 text-sm mt-1">{(control.getFieldState(name as Path<TFieldValues>).error?.message || error?.message )}</p>
//       }
//     </div>
//   );
// }


// interface TextareaWithLabelProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//   label: string;
//   name: Path<TFieldValues> | string;
//   register: UseFormRegister<TFieldValues>;
//   error?: FieldError;
// }
// export function TextareaWithLabel<TFieldValues extends FieldValues = InsuranceFormValues>({ 
//     label, name, register, error 
// }: TextareaWithLabelProps<TFieldValues>) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name as string}>{label}</Label>
//       <Textarea id={name as string} {...register(name as Path<TFieldValues>)}
//         className={cn(
//             error ? "border-red-500 focus-visible:ring-red-500" : "border-input",
//             "rounded-none"
//         )}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//     </div>
//   );
// }

// type ExtendedFieldError = FieldError | {
//   message?: string;
//   root?: { message?: string };
// };

// interface ControlledTextareaArrayProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//   control: Control<TFieldValues>;
//   name: Path<TFieldValues> | string;
//   label: string;
//   error?: ExtendedFieldError;
// }
// export function ControlledTextareaArray<TFieldValues extends FieldValues = InsuranceFormValues>({ 
//     control, name, label, error 
// }: ControlledTextareaArrayProps<TFieldValues>) {
//     const errorMessage = error && (
//       'message' in error
//         ? error.message
//         : (typeof error === 'object' && error !== null && 'root' in error && (error as { root?: { message?: string } })?.root?.message)
//     );

//     return (
//     <div className="space-y-1">
//       <Label htmlFor={name as string}>{label}</Label>
//       <Controller
//         name={name as Path<TFieldValues>}
//         control={control}
//         render={({ field }) => (
//           <Textarea
//             id={name as string}
//             value={Array.isArray(field.value) ? field.value.join(', ') : (field.value || '')}
//             onChange={(e) => {
//               const val = e.target.value;
//               const arr = val === "" ? [] : val.split(',').map(s => s.trim()).filter(s => s !== "");
//               field.onChange(arr);
//             }}
//             onBlur={field.onBlur}
//             className={cn(
//                 errorMessage ? "border-red-500 focus-visible:ring-red-500" : "border-input",
//                 "rounded-none"
//             )}
//           />
//         )}
//       />
//       {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage as string}</p>}
//     </div>
//   );
// }

// interface SelectWithLabelProps<TFieldValues extends FieldValues = InsuranceFormValues> {
//     control: Control<TFieldValues>;
//     name: Path<TFieldValues> | string;
//     label: string;
//     options: { value: string; label: string }[];
//     placeholder?: string;
//     error?: FieldError;
// }
// export function SelectWithLabel<TFieldValues extends FieldValues = InsuranceFormValues>({ 
//     control, name, label, options, placeholder, error 
// }: SelectWithLabelProps<TFieldValues>) {
//     const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
//     const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";
//     return (
//         <div className="space-y-1">
//             {label && <Label htmlFor={name as string}>{label}</Label>}
//             <Controller
//                 name={name as Path<TFieldValues>}
//                 control={control}
//                 render={({ field, fieldState }) => ( 
//                     <Select
//                         onValueChange={field.onChange}
//                         value={field.value as string || ""}
//                         name={field.name}
//                     >
//                         <SelectTrigger
//                             id={name as string}
//                             className={cn(
//                                 "rounded-none",
//                                 "w-full",
//                                 "border",
//                                 "bg-white",
//                                 (fieldState.error || error)
//                                   ? `border-red-500 ${triggerTextColorClassOnError} focus-visible:ring-red-500`
//                                   : `border-input ${triggerTextColorClassNormal}`
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label ? label.toLowerCase() : '...'}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none border border-input">
//                             {options.map(option => (
//                                 <SelectItem
//                                     key={option.value}
//                                     value={option.value} // Must not be an empty string here
//                                     className={cn(
//                                         "data-[highlighted]:bg-[#00BBD3] data-[highlighted]:text-white",
//                                         "focus:bg-[#00BBD3] focus:text-white"
//                                     )}
//                                 >
//                                     {option.label}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 )}
//             />
//             {(error || control.getFieldState(name as Path<TFieldValues>).error) &&
//               <p className="text-red-500 text-sm mt-1">{(error?.message || control.getFieldState(name as Path<TFieldValues>).error?.message )}</p>
//             }
//         </div>
//     );
// }

"use client";

import React from "react";
import { UseFormRegister, FieldError, Control, Controller, Path, FieldValues } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIconLucide } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";
// import type { InsuranceFormValues } from "@/lib/insuranceFormSchema"; // Not strictly needed if TFieldValues is generic

interface InputWithLabelProps<TFieldValues extends FieldValues = FieldValues> { // Default to FieldValues
  label: string;
  name: Path<TFieldValues> | string;
  register?: UseFormRegister<TFieldValues>;
  type?: string;
  error?: FieldError | { root?: { message?: string } };
  readOnly?: boolean;
  value?: string | number;
  placeholder?: string;
}
export function InputWithLabel<TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  register,
  type = "text",
  error,
  readOnly,
  value,
  placeholder,
}: InputWithLabelProps<TFieldValues>) {
  const errorMessage = error && ('message' in error ? error.message : (typeof error === 'object' && error !== null && 'root' in error && (error as { root?: { message?: string } })?.root?.message));
  const inputBaseProps: React.InputHTMLAttributes<HTMLInputElement> & { id: string; name: string } = {
    id: name as string,
    name: name as string,
    type: type,
    placeholder: placeholder,
    className: cn(
        errorMessage ? "border-red-500 focus-visible:ring-red-500" : "border-input",
        type !== "date" && type !== "checkbox" ? "rounded-none" : "",
        readOnly ? "bg-slate-100 text-slate-700 cursor-not-allowed focus:ring-0 focus:ring-offset-0 focus:border-input" : ""
    ),
  };
  let registrationProps = {};
  if (readOnly) {
    inputBaseProps.value = value !== undefined ? String(value) : "";
    inputBaseProps.readOnly = true;
  } else if (register) {
    registrationProps = register(name as Path<TFieldValues>, { 
      setValueAs: (val: unknown) => {
        if (type === "number" && val !== "" && !isNaN(Number(val))) {
          return Number(val);
        } else if (val === "" && type === "number") {
          return null; 
        }
        return val;
      }
    });
  } else { 
    inputBaseProps.value = value !== undefined ? String(value) : "";
  }
  return (
    <div className="space-y-1">
      {label && <Label htmlFor={name as string}>{label}</Label>}
      <Input {...inputBaseProps} {...registrationProps} />
      {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage as string}</p>}
    </div>
  );
}


interface DatePickerFieldProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  name: Path<TFieldValues> | string;
  control: Control<TFieldValues>;
  error?: FieldError;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDate?: (date: Date) => boolean;
}
export function DatePickerField<TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  control,
  error,
  placeholder = "Pick a date",
  minDate,
  maxDate,
  disabledDate
}: DatePickerFieldProps<TFieldValues>) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  return (
    <div className="space-y-1">
      <Label htmlFor={name as string}>{label}</Label>
      <Controller
        name={name as Path<TFieldValues>}
        control={control}
        render={({ field, fieldState }) => {
          const currentFieldError = fieldState.error || error;
          let selectedDateForCalendar: Date | undefined = undefined;
          let buttonDisplayText: React.ReactNode = <span>{placeholder}</span>;

          if (field.value && typeof field.value === 'string') {
            const dateObj = new Date(field.value + "T00:00:00");
            if (!isNaN(dateObj.getTime())) {
              selectedDateForCalendar = dateObj;
              try {
                buttonDisplayText = format(dateObj, "PPP");
              } catch (e) {
                console.error("DatePickerField: Error formatting date", name, field.value, e);
                buttonDisplayText = <span>Invalid Date</span>;
              }
            } else {
               console.warn("DatePickerField: Invalid date string from RHF", name, field.value);
            }
          }

          return (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  id={name as string}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                    "rounded-none",
                    currentFieldError ? "border-red-500 focus-visible:ring-red-500" : "border-input"
                  )}
                  onClick={() => setIsPopoverOpen(true)}
                >
                  <CalendarIconLucide className="mr-2 h-4 w-4" />
                  {buttonDisplayText}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDateForCalendar}
                  onSelect={(date) => {
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                    setIsPopoverOpen(false);
                  }}
                  initialFocus
                  fromDate={minDate}
                  toDate={maxDate}
                  disabled={disabledDate}
                  classNames={{
                    day_selected: cn(
                      "!bg-[#00BBD3] !text-white",
                      "hover:!bg-[#00BBD3] hover:!text-white",
                      "focus:!bg-[#00BBD3] focus:!text-white"
                    ),
                    day_today: cn(
                      "aria-selected:!text-white",
                      "!text-[#00BBD3]"
                    ),
                  }}
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
      {(error || control.getFieldState(name as Path<TFieldValues>).error) &&
        <p className="text-red-500 text-sm mt-1">{(control.getFieldState(name as Path<TFieldValues>).error?.message || error?.message )}</p>
      }
    </div>
  );
}


interface TextareaWithLabelProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  name: Path<TFieldValues> | string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
}
export function TextareaWithLabel<TFieldValues extends FieldValues = FieldValues>({ 
    label, name, register, error 
}: TextareaWithLabelProps<TFieldValues>) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name as string}>{label}</Label>
      <Textarea id={name as string} {...register(name as Path<TFieldValues>)}
        className={cn(
            error ? "border-red-500 focus-visible:ring-red-500" : "border-input",
            "rounded-none"
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

type ExtendedFieldError = FieldError | {
  message?: string;
  root?: { message?: string };
};

interface ControlledTextareaArrayProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues> | string;
  label: string;
  error?: ExtendedFieldError;
}
export function ControlledTextareaArray<TFieldValues extends FieldValues = FieldValues>({ 
    control, name, label, error 
}: ControlledTextareaArrayProps<TFieldValues>) {
    const errorMessage = error && (
      'message' in error
        ? error.message
        : (typeof error === 'object' && error !== null && 'root' in error && (error as { root?: { message?: string } })?.root?.message)
    );

    return (
    <div className="space-y-1">
      <Label htmlFor={name as string}>{label}</Label>
      <Controller
        name={name as Path<TFieldValues>}
        control={control}
        render={({ field }) => (
          <Textarea
            id={name as string}
            value={Array.isArray(field.value) ? field.value.join(', ') : (field.value || '')}
            onChange={(e) => {
              const val = e.target.value;
              const arr = val === "" ? [] : val.split(',').map(s => s.trim()).filter(s => s !== "");
              field.onChange(arr);
            }}
            onBlur={field.onBlur}
            className={cn(
                errorMessage ? "border-red-500 focus-visible:ring-red-500" : "border-input",
                "rounded-none"
            )}
          />
        )}
      />
      {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage as string}</p>}
    </div>
  );
}

interface SelectWithLabelProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues> | string;
    label: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    error?: FieldError;
}
export function SelectWithLabel<TFieldValues extends FieldValues = FieldValues>({ 
    control, name, label, options, placeholder, error 
}: SelectWithLabelProps<TFieldValues>) {
    const triggerTextColorClassOnError = "text-slate-900 data-[placeholder]:text-slate-400";
    const triggerTextColorClassNormal = "text-slate-700 data-[placeholder]:text-slate-500";
    return (
        <div className="space-y-1">
            {label && <Label htmlFor={name as string}>{label}</Label>}
            <Controller
                name={name as Path<TFieldValues>}
                control={control}
                render={({ field, fieldState }) => ( 
                    <Select
                        onValueChange={field.onChange}
                        value={field.value as string || ""}
                        name={field.name}
                    >
                        <SelectTrigger
                            id={name as string}
                            className={cn(
                                "rounded-none",
                                "w-full",
                                "border",
                                "bg-white",
                                (fieldState.error || error)
                                  ? `border-red-500 ${triggerTextColorClassOnError} focus-visible:ring-red-500`
                                  : `border-input ${triggerTextColorClassNormal}`
                            )}
                        >
                            <SelectValue placeholder={placeholder || `Select ${label ? label.toLowerCase() : '...'}`} />
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
            {(error || control.getFieldState(name as Path<TFieldValues>).error) &&
              <p className="text-red-500 text-sm mt-1">{(error?.message || control.getFieldState(name as Path<TFieldValues>).error?.message )}</p>
            }
        </div>
    );
}