// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import * as z from "zod";

// const insuranceSchema = z.object({
//   fullName: z.string().min(1),
//   country: z.string(),
//   nationality: z.string(),
//   address: z.string(),
//   phone: z.string(),
//   whatsapp: z.string(),
//   email: z.string().email(),
//   organisation: z.string(),
//   location: z.string(),

//   arrival: z.string(),
//   departure: z.string(),
//   cities: z.string(),
//   purpose: z.string(),
//   company: z.string(),
//   hotel: z.string(),

//   emergencyContact: z.string(),
//   emergencyNumber: z.string(),
//   relationship: z.string(),

//   conditions: z.string().optional(),
//   medications: z.string().optional(),
//   allergies: z.string().optional(),
//   blood: z.string().optional(),
//   assistance: z.string().optional(),

//   consent: z.literal(true, {
//     errorMap: () => ({ message: "You must give consent" }),
//   }),
// });

// type InsuranceFormValues = z.infer<typeof insuranceSchema>;

// export default function InsuranceForm() {
//   const form = useForm<InsuranceFormValues>({
//     resolver: zodResolver(insuranceSchema),
//     defaultValues: {
//       consent: undefined,
//     },
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     console.log("Form Data:", data);
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//       {/* Step 1: Personal Info */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputWithLabel label="Full Name" name="fullName" register={form.register} />
//         <InputWithLabel label="Country of Residence" name="country" register={form.register} />
//         <InputWithLabel label="Nationality" name="nationality" register={form.register} />
//         <InputWithLabel label="Address" name="address" register={form.register} />
//         <InputWithLabel label="Phone Number" name="phone" register={form.register} />
//         <InputWithLabel label="WhatsApp Number" name="whatsapp" register={form.register} />
//         <InputWithLabel label="Email" name="email" type="email" register={form.register} />
//         <InputWithLabel label="Organisation/Company" name="organisation" register={form.register} />
//         <InputWithLabel label="Location in Ukraine" name="location" register={form.register} />
//       </div>

//       {/* Step 2: Travel Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputWithLabel label="Arrival Date" name="arrival" type="date" register={form.register} />
//         <InputWithLabel label="Departure Date" name="departure" type="date" register={form.register} />
//         <InputWithLabel label="Primary Cities/Regions" name="cities" register={form.register} />
//         <InputWithLabel label="Purpose of Stay" name="purpose" register={form.register} />
//         <InputWithLabel label="Travel/Employment Company" name="company" register={form.register} />
//         <InputWithLabel label="Hotel/Accommodation" name="hotel" register={form.register} />
//       </div>

//       {/* Step 3: Emergency + Health */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputWithLabel label="Emergency Contact Person" name="emergencyContact" register={form.register} />
//         <InputWithLabel label="Emergency Contact Number" name="emergencyNumber" register={form.register} />
//         <InputWithLabel label="Relationship" name="relationship" register={form.register} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <TextareaWithLabel label="Pre-existing Medical Conditions" name="conditions" register={form.register} />
//         <TextareaWithLabel label="Current Medications" name="medications" register={form.register} />
//         <TextareaWithLabel label="Allergies" name="allergies" register={form.register} />
//         <TextareaWithLabel label="Special Assistance Needs" name="assistance" register={form.register} />
//         <InputWithLabel label="Blood Type" name="blood" register={form.register} />
//       </div>

//       {/* Consent */}
//       <div className="space-y-2">
//         <div className="flex items-start space-x-2">
//           <Checkbox
//             id="consent"
//             {...form.register("consent")}
//             checked={form.watch("consent")}
//             onCheckedChange={(checked) => {
//                 if (checked === true) {
//                   form.setValue("consent", true); 
//                 } else {
//                   form.setValue("consent", undefined as any); 
//                 }
//               }}
//                         />
//           <Label htmlFor="consent" className="text-sm leading-snug">
//             I consent to the use of my medical information by Compass Point Assist in emergencies.
//           </Label>
//         </div>
//         {form.formState.errors.consent && (
//           <p className="text-red-500 text-sm mt-1">
//             {form.formState.errors.consent.message}
//           </p>
//         )}
//       </div>

//       <Button type="submit" className="w-full">
//         Submit Form
//       </Button>
//     </form>
//   );
// }

// function InputWithLabel({
//   label,
//   name,
//   register,
//   type = "text",
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
//   type?: string;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name)} type={type} />
//     </div>
//   );
// }

// function TextareaWithLabel({
//   label,
//   name,
//   register,
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)} />
//     </div>
//   );
// }

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// const insuranceSchema = z.object({
//   c_name: z.string().min(1, "Required"),
//   c_email: z.string().email(),
//   c_phone: z.string(),
//   c_whats_app: z.string(),
//   c_birthdate: z.string(),
//   c_address: z.string(),
//   c_country: z.string(),
//   c_nationality: z.string(),
//   c_organization: z.string().optional(),

//   trip_start_date: z.string(),
//   trip_end_date: z.string(),
//   stay_name: z.string().optional(),
//   is_company_arranged: z.boolean(),
//   company_name: z.string().optional(),
//   destinations: z.string(),
//   trip_purpose: z.string(),

//   emergency_contact_name: z.string(),
//   emergency_contact_phone: z.string(),
//   emergency_contact_relation: z.string(),

//   consent: z.literal(true, {
//     errorMap: () => ({ message: "You must give consent" }),
//   }),

//   medical_conditions: z.string().optional(),
//   current_medications: z.string().optional(),
//   allergies: z.string().optional(),
//   blood_type: z.string().optional(),
//   special_assistance: z.string().optional(),

//   green_zone_days: z.coerce.number().min(0),
//   amber_zone_days: z.coerce.number().min(0),
//   red_zone_days: z.coerce.number().min(0),
//   black_zone_days: z.coerce.number().min(0).optional(),
// });

// type InsuranceFormValues = z.infer<typeof insuranceSchema>;

// export default function InsuranceForm() {
//   const form = useForm<InsuranceFormValues>({
//     resolver: zodResolver(insuranceSchema),
//     defaultValues: {
//       consent: undefined,
//       is_company_arranged: false,
//     },
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputWithLabel label="Full Name" name="c_name" register={form.register} />
//         <InputWithLabel label="Email" name="c_email" register={form.register} type="email" />
//         <InputWithLabel label="Phone" name="c_phone" register={form.register} />
//         <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} />
//         <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" />
//         <InputWithLabel label="Address" name="c_address" register={form.register} />
//         <InputWithLabel label="Country" name="c_country" register={form.register} />
//         <InputWithLabel label="Nationality" name="c_nationality" register={form.register} />
//         <InputWithLabel label="Organization" name="c_organization" register={form.register} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputWithLabel label="Trip Start" name="trip_start_date" register={form.register} type="date" />
//         <InputWithLabel label="Trip End" name="trip_end_date" register={form.register} type="date" />
//         <InputWithLabel label="Stay Name" name="stay_name" register={form.register} />
//         <InputWithLabel label="Company Name" name="company_name" register={form.register} />
//         <InputWithLabel label="Destinations" name="destinations" register={form.register} />
//         <InputWithLabel label="Trip Purpose" name="trip_purpose" register={form.register} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} />
//         <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} />
//         <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <TextareaWithLabel label="Medical Conditions" name="medical_conditions" register={form.register} />
//         <TextareaWithLabel label="Current Medications" name="current_medications" register={form.register} />
//         <TextareaWithLabel label="Allergies" name="allergies" register={form.register} />
//         <TextareaWithLabel label="Special Assistance" name="special_assistance" register={form.register} />
//         <InputWithLabel label="Blood Type" name="blood_type" register={form.register} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" />
//         <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" />
//         <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" />
//         <InputWithLabel label="Black Zone Days" name="black_zone_days" register={form.register} type="number" />
//       </div>

//       <div className="flex items-start space-x-2">
//         <Checkbox
//           id="consent"
//           checked={form.watch("consent")}
//           onCheckedChange={(checked) =>
//             form.setValue("consent", checked === true ? true : undefined as any)
//           }
//         />
//         <Label htmlFor="consent">I consent to the use of my medical information in an emergency.</Label>
//       </div>
//       {form.formState.errors.consent && (
//         <p className="text-red-500 text-sm">{form.formState.errors.consent.message}</p>
//       )}

//       <Button type="submit" className="w-full">
//         Submit
//       </Button>
//     </form>
//   );
// }

// function InputWithLabel({
//   label,
//   name,
//   register,
//   type = "text",
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
//   type?: string;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name)} type={type} />
//     </div>
//   );
// }

// function TextareaWithLabel({
//   label,
//   name,
//   register,
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)} />
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// const insuranceSchema = z.object({
//   c_name: z.string().min(1, "Required"),
//   c_email: z.string().email(),
//   c_phone: z.string(),
//   c_whats_app: z.string(),
//   c_birthdate: z.string(),
//   c_address: z.string(),
//   c_country: z.string(),
//   c_nationality: z.string(),
//   c_organization: z.string().optional(),

//   trip_start_date: z.string(),
//   trip_end_date: z.string(),
//   stay_name: z.string().optional(),
//   is_company_arranged: z.boolean(),
//   company_name: z.string().optional(),
//   destinations: z.string(),
//   trip_purpose: z.string(),

//   emergency_contact_name: z.string(),
//   emergency_contact_phone: z.string(),
//   emergency_contact_relation: z.string(),

//   consent: z.literal(true, {
//     errorMap: () => ({ message: "You must give consent" }),
//   }),

//   medical_conditions: z.string().optional(),
//   current_medications: z.string().optional(),
//   allergies: z.string().optional(),
//   blood_type: z.string().optional(),
//   special_assistance: z.string().optional(),

//   green_zone_days: z.coerce.number().min(0),
//   amber_zone_days: z.coerce.number().min(0),
//   red_zone_days: z.coerce.number().min(0),
//   black_zone_days: z.coerce.number().min(0).optional(),
// });

// type InsuranceFormValues = z.infer<typeof insuranceSchema>;

// const steps = [
//   "Personal Info",
//   "Trip Details",
//   "Emergency Contact",
//   "Medical Info",
//   "Risk Zones & Consent",
// ];

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: zodResolver(insuranceSchema),
//     defaultValues: {
//       consent: undefined,
//       is_company_arranged: false,
//     },
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     console.log(data);
//   };

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   return (
//     <div className="flex justify-center px-4 py-10">
//       <div className="w-full max-w-4xl">
//         {/* Stepper */}
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
//                     step === index
//                       ? "bg-primary text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>

//           <div className="h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-2 bg-primary rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {step === 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputWithLabel label="Full Name" name="c_name" register={form.register} />
//               <InputWithLabel label="Email" name="c_email" register={form.register} type="email" />
//               <InputWithLabel label="Phone" name="c_phone" register={form.register} />
//               <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} />
//               <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" />
//               <InputWithLabel label="Address" name="c_address" register={form.register} />
//               <InputWithLabel label="Country" name="c_country" register={form.register} />
//               <InputWithLabel label="Nationality" name="c_nationality" register={form.register} />
//               <InputWithLabel label="Organization" name="c_organization" register={form.register} />
//             </div>
//           )}

//           {step === 1 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputWithLabel label="Trip Start" name="trip_start_date" register={form.register} type="date" />
//               <InputWithLabel label="Trip End" name="trip_end_date" register={form.register} type="date" />
//               <InputWithLabel label="Stay Name" name="stay_name" register={form.register} />
//               <InputWithLabel label="Company Name" name="company_name" register={form.register} />
//               <InputWithLabel label="Destinations" name="destinations" register={form.register} />
//               <InputWithLabel label="Trip Purpose" name="trip_purpose" register={form.register} />
//             </div>
//           )}

//           {step === 2 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} />
//               <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} />
//               <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} />
//             </div>
//           )}

//           {step === 3 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <TextareaWithLabel label="Medical Conditions" name="medical_conditions" register={form.register} />
//               <TextareaWithLabel label="Current Medications" name="current_medications" register={form.register} />
//               <TextareaWithLabel label="Allergies" name="allergies" register={form.register} />
//               <TextareaWithLabel label="Special Assistance" name="special_assistance" register={form.register} />
//               <InputWithLabel label="Blood Type" name="blood_type" register={form.register} />
//             </div>
//           )}

//           {step === 4 && (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" />
//                 <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" />
//                 <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" />
//                 <InputWithLabel label="Black Zone Days" name="black_zone_days" register={form.register} type="number" />
//               </div>

//               <div className="flex items-start space-x-2">
//                 <Checkbox
//                   id="consent"
//                   checked={form.watch("consent")}
//                   onCheckedChange={(checked) =>
//                     form.setValue("consent", checked === true ? true : undefined as any)
//                   }
//                 />
//                 <Label htmlFor="consent">I consent to the use of my medical information in an emergency.</Label>
//               </div>
//               {form.formState.errors.consent && (
//                 <p className="text-red-500 text-sm">{form.formState.errors.consent.message}</p>
//               )}
//             </>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between pt-6">
//             {step > 0 && (
//               <Button type="button" variant="outline" onClick={prevStep}>
//                 Back
//               </Button>
//             )}
//             {step < steps.length - 1 ? (
//               <Button type="button" onClick={nextStep}>
//                 Next
//               </Button>
//             ) : (
//               <Button type="submit" className="w-full">
//                 Submit
//               </Button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function InputWithLabel({
//   label,
//   name,
//   register,
//   type = "text",
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
//   type?: string;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name)} type={type} />
//     </div>
//   );
// }

// function TextareaWithLabel({
//   label,
//   name,
//   register,
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)} />
//     </div>
//   );
// }

// "use client";

// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useMemo } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { format, parseISO, differenceInYears } from "date-fns";

// const insuranceSchema = z.object({
//   c_name: z.string().min(1, "Required"),
//   c_email: z.string().email(),
//   c_phone: z.string(),
//   c_whats_app: z.string(),
//   c_birthdate: z.string(),
//   c_address: z.string(),
//   c_country: z.string(),
//   c_nationality: z.string(),
//   c_organization: z.string().optional(),

//   trip_start_date: z.string(),
//   trip_end_date: z.string(),
//   stay_name: z.string().optional(),
//   is_company_arranged: z.boolean(),
//   company_name: z.string().optional(),
//   destinations: z.string(),
//   trip_purpose: z.string(),

//   emergency_contact_name: z.string(),
//   emergency_contact_phone: z.string(),
//   emergency_contact_relation: z.string(),

//   consent: z.literal(true, {
//     errorMap: () => ({ message: "You must give consent" }),
//   }),

//   medical_conditions: z.string().optional(),
//   current_medications: z.string().optional(),
//   allergies: z.string().optional(),
//   blood_type: z.string().optional(),
//   special_assistance: z.string().optional(),

//   green_zone_days: z.coerce.number().min(0),
//   amber_zone_days: z.coerce.number().min(0),
//   red_zone_days: z.coerce.number().min(0),
//   black_zone_days: z.coerce.number().min(0).optional(),
// });

// type InsuranceFormValues = z.infer<typeof insuranceSchema>;

// export default function InsuranceForm() {
//   const form = useForm<InsuranceFormValues>({
//     resolver: zodResolver(insuranceSchema),
//     defaultValues: {
//       consent: undefined,
//       is_company_arranged: false,
//     },
//   });

//   const { watch, handleSubmit, register, formState, setValue } = form;

//   const onSubmit = (data: InsuranceFormValues) => {
//     console.log(data);
//   };

//   const age = useMemo(() => {
//     const birthdate = watch("c_birthdate");
//     if (!birthdate) return null;
//     try {
//       return differenceInYears(new Date(), parseISO(birthdate));
//     } catch {
//       return null;
//     }
//   }, [watch("c_birthdate")]);

//   const quote = {
//     destinations: watch("destinations"),
//     tripStart: watch("trip_start_date"),
//     tripEnd: watch("trip_end_date"),
//     age,
//     basePrice: 120, // static example
//     totalPrice: 120 + (age ? age * 2 : 0),
//   };

//   return (
//     <FormProvider {...form}>
//       <div className="max-w-7xl mx-auto px-4 py-10">
//         <div className="flex flex-col lg:flex-row gap-10">
//           <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-6">
//             {/* Personal Info */}
//             <Section title="Personal Information">
//               <Grid2>
//                 <InputWithLabel label="Full Name" name="c_name" register={register} />
//                 <InputWithLabel label="Email" name="c_email" register={register} type="email" />
//                 <InputWithLabel label="Phone" name="c_phone" register={register} />
//                 <InputWithLabel label="WhatsApp" name="c_whats_app" register={register} />
//                 <InputWithLabel label="Birthdate" name="c_birthdate" register={register} type="date" />
//                 <InputWithLabel label="Address" name="c_address" register={register} />
//                 <InputWithLabel label="Country" name="c_country" register={register} />
//                 <InputWithLabel label="Nationality" name="c_nationality" register={register} />
//                 <InputWithLabel label="Organization" name="c_organization" register={register} />
//               </Grid2>
//             </Section>

//             {/* Travel Info */}
//             <Section title="Trip Details">
//               <Grid2>
//                 <InputWithLabel label="Trip Start" name="trip_start_date" register={register} type="date" />
//                 <InputWithLabel label="Trip End" name="trip_end_date" register={register} type="date" />
//                 <InputWithLabel label="Stay Name" name="stay_name" register={register} />
//                 <InputWithLabel label="Company Name" name="company_name" register={register} />
//                 <InputWithLabel label="Destinations" name="destinations" register={register} />
//                 <InputWithLabel label="Trip Purpose" name="trip_purpose" register={register} />
//               </Grid2>
//             </Section>

//             {/* Emergency */}
//             <Section title="Emergency Contact">
//               <Grid2>
//                 <InputWithLabel label="Name" name="emergency_contact_name" register={register} />
//                 <InputWithLabel label="Phone" name="emergency_contact_phone" register={register} />
//                 <InputWithLabel label="Relation" name="emergency_contact_relation" register={register} />
//               </Grid2>
//             </Section>

//             {/* Medical */}
//             <Section title="Medical Info">
//               <Grid2>
//                 <TextareaWithLabel label="Medical Conditions" name="medical_conditions" register={register} />
//                 <TextareaWithLabel label="Current Medications" name="current_medications" register={register} />
//                 <TextareaWithLabel label="Allergies" name="allergies" register={register} />
//                 <TextareaWithLabel label="Special Assistance" name="special_assistance" register={register} />
//                 <InputWithLabel label="Blood Type" name="blood_type" register={register} />
//               </Grid2>
//             </Section>

//             {/* Zones */}
//             <Section title="Zone Travel Days">
//               <Grid2>
//                 <InputWithLabel label="Green Zone Days" name="green_zone_days" register={register} type="number" />
//                 <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={register} type="number" />
//                 <InputWithLabel label="Red Zone Days" name="red_zone_days" register={register} type="number" />
//                 <InputWithLabel label="Black Zone Days" name="black_zone_days" register={register} type="number" />
//               </Grid2>
//             </Section>

//             {/* Consent */}
//             <div className="flex items-start space-x-2">
//               <Checkbox
//                 id="consent"
//                 checked={watch("consent")}
//                 onCheckedChange={(checked) =>
//                   setValue("consent", checked === true ? true : undefined as any)
//                 }
//               />
//               <Label htmlFor="consent">
//                 I consent to the use of my medical information in an emergency.
//               </Label>
//             </div>
//             {formState.errors.consent && (
//               <p className="text-red-500 text-sm">{formState.errors.consent.message}</p>
//             )}

//             <Button type="submit" className="w-full">Submit</Button>
//           </form>

//           {/* Quote Summary */}
//           <div className="w-full lg:w-80 bg-gray-100 p-6 rounded-2xl shadow-md space-y-4">
//             <h2 className="text-xl font-bold">Quote Summary</h2>
//             <p><span className="font-medium">Traveling to:</span> {quote.destinations || '—'}</p>
//             <p><span className="font-medium">Travelers:</span> 1</p>
//             <p>
//               <span className="font-medium">Dates:</span>{" "}
//               {quote.tripStart ? format(new Date(quote.tripStart), "MMM dd, yyyy") : "—"} to{" "}
//               {quote.tripEnd ? format(new Date(quote.tripEnd), "MMM dd, yyyy") : "—"}
//             </p>
//             <p><span className="font-medium">Age:</span> {quote.age ?? "—"}</p>
//             <p><span className="font-medium">Base Price:</span> ${quote.basePrice}</p>
//             <p className="text-lg font-semibold border-t pt-2">
//               Total Price: ${quote.totalPrice}
//             </p>
//           </div>
//         </div>
//       </div>
//     </FormProvider>
//   );
// }

// function Section({ title, children }: { title: string; children: React.ReactNode }) {
//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       {children}
//     </div>
//   );
// }

// function Grid2({ children }: { children: React.ReactNode }) {
//   return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
// }

// function InputWithLabel({
//   label,
//   name,
//   register,
//   type = "text",
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
//   type?: string;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name)} type={type} />
//     </div>
//   );
// }

// function TextareaWithLabel({
//   label,
//   name,
//   register,
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)} />
//     </div>
//   );
// }


// "use client";

// import { useForm, FormProvider, useFormContext } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// const insuranceSchema = z.object({
//   c_name: z.string().min(1, "Required"),
//   c_email: z.string().email(),
//   c_phone: z.string(),
//   c_whats_app: z.string(),
//   c_birthdate: z.string(),
//   c_address: z.string(),
//   c_country: z.string(),
//   c_nationality: z.string(),
//   c_organization: z.string().optional(),

//   trip_start_date: z.string(),
//   trip_end_date: z.string(),
//   stay_name: z.string().optional(),
//   is_company_arranged: z.boolean(),
//   company_name: z.string().optional(),
//   destinations: z.string(),
//   trip_purpose: z.string(),

//   emergency_contact_name: z.string(),
//   emergency_contact_phone: z.string(),
//   emergency_contact_relation: z.string(),

//   consent: z.literal(true, {
//     errorMap: () => ({ message: "You must give consent" }),
//   }),

//   medical_conditions: z.string().optional(),
//   current_medications: z.string().optional(),
//   allergies: z.string().optional(),
//   blood_type: z.string().optional(),
//   special_assistance: z.string().optional(),

//   green_zone_days: z.coerce.number().min(0),
//   amber_zone_days: z.coerce.number().min(0),
//   red_zone_days: z.coerce.number().min(0),
//   black_zone_days: z.coerce.number().min(0).optional(),
// });

// type InsuranceFormValues = z.infer<typeof insuranceSchema>;

// export default function MultistepInsuranceForm() {
//   const form = useForm<InsuranceFormValues>({
//     resolver: zodResolver(insuranceSchema),
//     defaultValues: {
//       consent: undefined,
//       is_company_arranged: false,
//     },
//     mode: "onChange",
//   });

//   const [step, setStep] = useState(1);

//   const next = () => setStep((s) => s + 1);
//   const prev = () => setStep((s) => s - 1);
//   const isLastStep = step === 4;

//   const onSubmit = (data: InsuranceFormValues) => {
//     console.log("Final Submit", data);
//   };

//   return (
//     <FormProvider {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10"
//       >
//         <div className="md:col-span-2 space-y-6">
//           {step === 1 && (
//             <>
//               <Section title="Personal Details">
//                 <Grid>
//                   <InputWithLabel label="Full Name" name="c_name" />
//                   <InputWithLabel label="Email" name="c_email" type="email" />
//                   <InputWithLabel label="Phone" name="c_phone" />
//                   <InputWithLabel label="WhatsApp" name="c_whats_app" />
//                   <InputWithLabel label="Birthdate" name="c_birthdate" type="date" />
//                   <InputWithLabel label="Address" name="c_address" />
//                   <InputWithLabel label="Country" name="c_country" />
//                   <InputWithLabel label="Nationality" name="c_nationality" />
//                   <InputWithLabel label="Organization" name="c_organization" />
//                 </Grid>
//               </Section>
//               <Button onClick={next} type="button">Next</Button>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <Section title="Trip Details">
//                 <Grid>
//                   <InputWithLabel label="Trip Start" name="trip_start_date" type="date" />
//                   <InputWithLabel label="Trip End" name="trip_end_date" type="date" />
//                   <InputWithLabel label="Stay Name" name="stay_name" />
//                   <InputWithLabel label="Company Name" name="company_name" />
//                   <InputWithLabel label="Destinations" name="destinations" />
//                   <InputWithLabel label="Trip Purpose" name="trip_purpose" />
//                 </Grid>
//               </Section>
//               <div className="flex gap-4">
//                 <Button onClick={prev} type="button" variant="secondary">Back</Button>
//                 <Button onClick={next} type="button">Next</Button>
//               </div>
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <Section title="Medical & Emergency Info">
//                 <Grid>
//                   <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" />
//                   <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" />
//                   <InputWithLabel label="Relation" name="emergency_contact_relation" />
//                   <TextareaWithLabel label="Medical Conditions" name="medical_conditions" />
//                   <TextareaWithLabel label="Current Medications" name="current_medications" />
//                   <TextareaWithLabel label="Allergies" name="allergies" />
//                   <TextareaWithLabel label="Special Assistance" name="special_assistance" />
//                   <InputWithLabel label="Blood Type" name="blood_type" />
//                 </Grid>
//               </Section>
//               <div className="flex gap-4">
//                 <Button onClick={prev} type="button" variant="secondary">Back</Button>
//                 <Button onClick={next} type="button">Next</Button>
//               </div>
//             </>
//           )}

//           {step === 4 && (
//             <>
//               <Section title="Zone Info & Consent">
//                 <Grid>
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" type="number" />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" type="number" />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" type="number" />
//                   <InputWithLabel label="Black Zone Days" name="black_zone_days" type="number" />
//                 </Grid>
//                 <div className="flex items-start space-x-2 mt-4">
//                   <Checkbox
//                     id="consent"
//                     checked={form.watch("consent")}
//                     onCheckedChange={(checked) =>
//                       form.setValue("consent", checked === true ? true : undefined as any)
//                     }
//                   />
//                   <Label htmlFor="consent">I consent to the use of my medical information in an emergency.</Label>
//                 </div>
//                 {form.formState.errors.consent && (
//                   <p className="text-red-500 text-sm">{form.formState.errors.consent.message}</p>
//                 )}
//               </Section>
//               <div className="flex gap-4">
//                 <Button onClick={prev} type="button" variant="secondary">Back</Button>
//                 <Button type="submit">Submit</Button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Quote Summary */}
//         <div className="bg-gray-100 p-6 rounded-xl shadow-md h-fit sticky top-10">
//           <h2 className="text-lg font-semibold mb-4">Quote Summary</h2>
//           <SummaryItem label="Traveling to" value={form.watch("destinations")} />
//           <SummaryItem label="Travelers" value={"1"} />
//           <SummaryItem label="Travel Date" value={form.watch("trip_start_date")} />
//           <SummaryItem label="Age" value={form.watch("c_birthdate") ? getAge(form.watch("c_birthdate")) : ""} />
//           <SummaryItem label="Base Price" value="$200" />
//           <SummaryItem label="Total Price" value="$200" />
//         </div>
//       </form>
//     </FormProvider>
//   );
// }

// function Section({ title, children }: { title: string; children: React.ReactNode }) {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">{title}</h2>
//       {children}
//     </div>
//   );
// }

// function Grid({ children }: { children: React.ReactNode }) {
//   return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
// }

// function InputWithLabel({
//   label,
//   name,
//   type = "text",
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   type?: string;
// }) {
//   const { register } = useFormContext();
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name)} type={type} />
//     </div>
//   );
// }

// function TextareaWithLabel({
//   label,
//   name,
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
// }) {
//   const { register } = useFormContext();
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)} />
//     </div>
//   );
// }

// function SummaryItem({ label, value }: { label: string; value?: string | number }) {
//   return (
//     <div className="flex justify-between py-1">
//       <span className="text-sm text-gray-700">{label}</span>
//       <span className="text-sm font-medium">{value || "-"}</span>
//     </div>
//   );
// }

// function getAge(dateString: string) {
//   const birthDate = new Date(dateString);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// }


// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// const insuranceSchema = z.object({
//   c_name: z.string().min(1, "Required"),
//   c_email: z.string().email(),
//   c_phone: z.string(),
//   c_whats_app: z.string(),
//   c_birthdate: z.string(),
//   c_address: z.string(),
//   c_country: z.string(),
//   c_nationality: z.string(),
//   c_organization: z.string().optional(),

//   trip_start_date: z.string(),
//   trip_end_date: z.string(),
//   stay_name: z.string().optional(),
//   is_company_arranged: z.boolean().optional(),
//   company_name: z.string().optional(),
//   destinations: z.string(),
//   trip_purpose: z.string(),

//   emergency_contact_name: z.string(),
//   emergency_contact_phone: z.string(),
//   emergency_contact_relation: z.string(),

//   consent: z.literal(true, {
//     errorMap: () => ({ message: "You must give consent" }),
//   }),

//   medical_conditions: z.string().optional(),
//   current_medications: z.string().optional(),
//   allergies: z.string().optional(),
//   blood_type: z.string().optional(),
//   special_assistance: z.string().optional(),

//   green_zone_days: z.coerce.number().min(0),
//   amber_zone_days: z.coerce.number().min(0),
//   red_zone_days: z.coerce.number().min(0),
//   black_zone_days: z.coerce.number().min(0).optional(),
// });

// type InsuranceFormValues = z.infer<typeof insuranceSchema>;

// export default function InsuranceForm() {
//   const [step, setStep] = useState(1);
//   const [sameAsWhatsApp, setSameAsWhatsApp] = useState(false);

//   const form = useForm<InsuranceFormValues>({
//     resolver: zodResolver(insuranceSchema),
//     defaultValues: {
//       consent: undefined,
//       is_company_arranged: false,
//     },
//   });

//   useEffect(() => {
//     if (sameAsWhatsApp) {
//       form.setValue("c_whats_app", form.watch("c_phone"));
//     }
//   }, [sameAsWhatsApp, form.watch("c_phone")]);

//   const onSubmit = (data: InsuranceFormValues) => {
//     if (step < 4) {
//       setStep((prev) => prev + 1);
//     } else {
//       console.log("Final Data:", data);
//     }
//   };

//   const handleBack = () => {
//     if (step > 1) setStep((prev) => prev - 1);
//   };

//   const quote = {
//     travelingTo: form.watch("destinations"),
//     travelers: 1,
//     travelDate: form.watch("trip_start_date"),
//     age: form.watch("c_birthdate") ? new Date().getFullYear() - new Date(form.watch("c_birthdate")).getFullYear() : "",
//     basePrice: 250,
//   };
//   const totalPrice = quote.basePrice * quote.travelers;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
//       <div className="lg:col-span-2">
//         <StepIndicator currentStep={step} />
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {step === 1 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputWithLabel label="Full Name" name="c_name" register={form.register} />
//               <InputWithLabel label="Email" name="c_email" register={form.register} type="email" />
//               <InputWithLabel label="Phone" name="c_phone" register={form.register} />
//               <div className="space-y-1">
//                 <Label htmlFor="c_whats_app">WhatsApp</Label>
//                 <Input id="c_whats_app" {...form.register("c_whats_app")} />
//                 <div className="flex items-center space-x-2 mt-1">
//                   <Checkbox id="same" checked={sameAsWhatsApp} onCheckedChange={(val) => setSameAsWhatsApp(!!val)} />
//                   <Label htmlFor="same">Same as phone number</Label>
//                 </div>
//               </div>
//               <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" />
//               <InputWithLabel label="Address" name="c_address" register={form.register} />
//               <InputWithLabel label="Country" name="c_country" register={form.register} />
//               <InputWithLabel label="Nationality" name="c_nationality" register={form.register} />
//               <InputWithLabel label="Organization" name="c_organization" register={form.register} />
//             </div>
//           )}

//           {step === 2 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputWithLabel label="Trip Start" name="trip_start_date" register={form.register} type="date" />
//               <InputWithLabel label="Trip End" name="trip_end_date" register={form.register} type="date" />
//               <InputWithLabel label="Stay Name" name="stay_name" register={form.register} />
//               <InputWithLabel label="Company Name" name="company_name" register={form.register} />
//               <InputWithLabel label="Destinations" name="destinations" register={form.register} />
//               <InputWithLabel label="Trip Purpose" name="trip_purpose" register={form.register} />
//               <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} />
//               <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} />
//               <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} />
//             </div>
//           )}

//           {step === 3 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <TextareaWithLabel label="Medical Conditions" name="medical_conditions" register={form.register} />
//               <TextareaWithLabel label="Current Medications" name="current_medications" register={form.register} />
//               <TextareaWithLabel label="Allergies" name="allergies" register={form.register} />
//               <TextareaWithLabel label="Special Assistance" name="special_assistance" register={form.register} />
//               <InputWithLabel label="Blood Type" name="blood_type" register={form.register} />
//             </div>
//           )}

//           {step === 4 && (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" />
//                 <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" />
//                 <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" />
//                 <InputWithLabel label="Black Zone Days" name="black_zone_days" register={form.register} type="number" />
//               </div>
//               <div className="flex items-start space-x-2">
//                 <Checkbox
//                   id="consent"
//                   checked={form.watch("consent")}
//                   onCheckedChange={(checked) =>
//                     form.setValue("consent", checked === true ? true : undefined as any)
//                   }
//                 />
//                 <Label htmlFor="consent">I consent to the use of my medical information in an emergency.</Label>
//               </div>
//               {form.formState.errors.consent && (
//                 <p className="text-red-500 text-sm">{form.formState.errors.consent.message}</p>
//               )}
//             </>
//           )}

//           <div className="flex justify-between">
//             {step > 1 && <Button type="button" onClick={handleBack}>Back</Button>}
//             <Button type="submit">{step === 4 ? "Submit" : "Next"}</Button>
//           </div>
//         </form>
//       </div>

//       {/* Quote Summary */}
//       <div className="bg-gray-100 p-6 rounded-xl shadow-md h-fit">
//         <h2 className="text-xl font-semibold mb-4">Quote Summary</h2>
//         <ul className="space-y-2 text-sm">
//           <li><strong>Traveling To:</strong> {quote.travelingTo || "-"}</li>
//           <li><strong>Travelers:</strong> {quote.travelers}</li>
//           <li><strong>Travel Date:</strong> {quote.travelDate || "-"}</li>
//           <li><strong>Age:</strong> {quote.age || "-"}</li>
//           <li><strong>Base Price:</strong> ${quote.basePrice}</li>
//           <li><strong>Total Price:</strong> ${totalPrice}</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// function StepIndicator({ currentStep }: { currentStep: number }) {
//   const steps = ["Personal", "Trip", "Medical", "Zones"];
//   return (
//     <div className="flex justify-center gap-4 mb-10">
//       {steps.map((label, idx) => {
//         const stepNum = idx + 1;
//         const isActive = stepNum === currentStep;
//         const isCompleted = stepNum < currentStep;
//         return (
//           <div key={label} className="flex items-center gap-2">
//             <div
//               className={`
//                 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
//                 ${isActive ? "bg-blue-600 text-white" : isCompleted ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}
//               `}
//             >
//               {stepNum}
//             </div>
//             <span className={`text-sm ${isActive ? "font-semibold" : "text-gray-500"}`}>{label}</span>
//             {idx < steps.length - 1 && <div className="w-6 h-0.5 bg-gray-300" />}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function InputWithLabel({ label, name, register, type = "text" }: { label: string, name: keyof InsuranceFormValues, register: any, type?: string }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name)} type={type} />
//     </div>
//   );
// }

// function TextareaWithLabel({ label, name, register }: { label: string, name: keyof InsuranceFormValues, register: any }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)} />
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// const insuranceSchema = z.object({
//   c_name: z.string().min(1, "Required"),
//   c_email: z.string().email(),
//   c_phone: z.string(),
//   c_whats_app: z.string(),
//   c_birthdate: z.string(),
//   c_address: z.string(),
//   c_country: z.string(),
//   c_nationality: z.string(),
//   c_organization: z.string().optional(),

//   trip_start_date: z.string(),
//   trip_end_date: z.string(),
//   stay_name: z.string().optional(),
//   is_company_arranged: z.boolean(),
//   company_name: z.string().optional(),
//   destinations: z.string(),
//   trip_purpose: z.string(),

//   emergency_contact_name: z.string(),
//   emergency_contact_phone: z.string(),
//   emergency_contact_relation: z.string(),

//   consent: z.literal(true, {
//     errorMap: () => ({ message: "You must give consent" }),
//   }),

//   medical_conditions: z.string().optional(),
//   current_medications: z.string().optional(),
//   allergies: z.string().optional(),
//   blood_type: z.string().optional(),
//   special_assistance: z.string().optional(),

//   green_zone_days: z.coerce.number().min(0),
//   amber_zone_days: z.coerce.number().min(0),
//   red_zone_days: z.coerce.number().min(0),
//   black_zone_days: z.coerce.number().min(0).optional(),
// });

// type InsuranceFormValues = z.infer<typeof insuranceSchema>;

// const steps = [
//   "Personal Info",
//   "Trip Details",
//   "Emergency Contact",
//   "Medical Info",
//   "Risk Zones & Consent",
// ];

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: zodResolver(insuranceSchema),
//     defaultValues: {
//       consent: undefined,
//       is_company_arranged: false,
//     },
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     console.log(data);
//   };

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   return (
//     <div className="flex justify-center px-4 py-10">
//       <div className="w-full max-w-7xl">
//         {/* Stepper */}
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
//                     step === index
//                       ? "bg-primary text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>

//           <div className="h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-2 bg-primary rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {step === 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputWithLabel label="Full Name" name="c_name" register={form.register} />
//               <InputWithLabel label="Email" name="c_email" register={form.register} type="email" />
//               <InputWithLabel label="Phone" name="c_phone" register={form.register} />
//               <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} />
//               <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" />
//               <InputWithLabel label="Address" name="c_address" register={form.register} />
//               <InputWithLabel label="Country" name="c_country" register={form.register} />
//               <InputWithLabel label="Nationality" name="c_nationality" register={form.register} />
//               <InputWithLabel label="Organization" name="c_organization" register={form.register} />
//             </div>
//           )}

//           {step === 1 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputWithLabel label="Trip Start" name="trip_start_date" register={form.register} type="date" />
//               <InputWithLabel label="Trip End" name="trip_end_date" register={form.register} type="date" />
//               <InputWithLabel label="Stay Name" name="stay_name" register={form.register} />
//               <InputWithLabel label="Company Name" name="company_name" register={form.register} />
//               <InputWithLabel label="Destinations" name="destinations" register={form.register} />
//               <InputWithLabel label="Trip Purpose" name="trip_purpose" register={form.register} />
//             </div>
//           )}

//           {step === 2 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} />
//               <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} />
//               <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} />
//             </div>
//           )}

//           {step === 3 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <TextareaWithLabel label="Medical Conditions" name="medical_conditions" register={form.register} />
//               <TextareaWithLabel label="Current Medications" name="current_medications" register={form.register} />
//               <TextareaWithLabel label="Allergies" name="allergies" register={form.register} />
//               <TextareaWithLabel label="Special Assistance" name="special_assistance" register={form.register} />
//               <InputWithLabel label="Blood Type" name="blood_type" register={form.register} />
//             </div>
//           )}

//           {step === 4 && (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" />
//                 <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" />
//                 <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" />
//                 <InputWithLabel label="Black Zone Days" name="black_zone_days" register={form.register} type="number" />
//               </div>

//               <div className="flex items-start space-x-2">
//                 <Checkbox
//                   id="consent"
//                   checked={form.watch("consent")}
//                   onCheckedChange={(checked) =>
//                     form.setValue("consent", checked === true ? true : undefined as any)
//                   }
//                 />
//                 <Label htmlFor="consent">I consent to the use of my medical information in an emergency.</Label>
//               </div>
//               {form.formState.errors.consent && (
//                 <p className="text-red-500 text-sm">{form.formState.errors.consent.message}</p>
//               )}
//             </>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between pt-6">
//             {step > 0 && (
//               <Button type="button" variant="outline" onClick={prevStep}>
//                 Back
//               </Button>
//             )}
//             {step < steps.length - 1 ? (
//               <Button type="button" onClick={nextStep}>
//                 Next
//               </Button>
//             ) : (
//               <Button type="submit" className="w-full">
//                 Submit
//               </Button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function InputWithLabel({
//   label,
//   name,
//   register,
//   type = "text",
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
//   type?: string;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name)} type={type} />
//     </div>
//   );
// }

// function TextareaWithLabel({
//   label,
//   name,
//   register,
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)} />
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// const insuranceSchema = z.object({
//   c_name: z.string().min(1, "Required"),
//   c_email: z.string().email(),
//   c_phone: z.string(),
//   c_whats_app: z.string(),
//   c_birthdate: z.string(),
//   c_address: z.string(),
//   c_country: z.string(),
//   c_nationality: z.string(),
//   c_organization: z.string().optional(),

//   trip_start_date: z.string(),
//   trip_end_date: z.string(),
//   stay_name: z.string().optional(),
//   is_company_arranged: z.boolean(),
//   company_name: z.string().optional(),
//   destinations: z.string(),
//   trip_purpose: z.string(),

//   emergency_contact_name: z.string(),
//   emergency_contact_phone: z.string(),
//   emergency_contact_relation: z.string(),

//   consent: z.literal(true, {
//     errorMap: () => ({ message: "You must give consent" }),
//   }),

//   medical_conditions: z.string().optional(),
//   current_medications: z.string().optional(),
//   allergies: z.string().optional(),
//   blood_type: z.string().optional(),
//   special_assistance: z.string().optional(),

//   green_zone_days: z.coerce.number().min(0),
//   amber_zone_days: z.coerce.number().min(0),
//   red_zone_days: z.coerce.number().min(0),
//   black_zone_days: z.coerce.number().min(0).optional(),
// });

// type InsuranceFormValues = z.infer<typeof insuranceSchema>;

// const steps = [
//   "Personal Info",
//   "Trip Details",
//   "Emergency Contact",
//   "Medical Info",
//   "Risk Zones & Consent",
// ];

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: zodResolver(insuranceSchema),
//     defaultValues: {
//       consent: undefined,
//       is_company_arranged: false,
//     },
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     console.log(data);
//   };

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   return (
//     <div className="flex justify-center px-4 py-10">
//       <div className="w-full max-w-7xl">
//         {/* Stepper */}
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
//                     step === index
//                       ? "bg-primary text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>

//           <div className="h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-2 bg-primary rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {step === 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputWithLabel label="Full Name" name="c_name" register={form.register} />
//                 <InputWithLabel label="Email" name="c_email" register={form.register} type="email" />
//                 <InputWithLabel label="Phone" name="c_phone" register={form.register} />
//                 <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} />
//                 <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" />
//                 <InputWithLabel label="Address" name="c_address" register={form.register} />
//                 <InputWithLabel label="Country" name="c_country" register={form.register} />
//                 <InputWithLabel label="Nationality" name="c_nationality" register={form.register} />
//                 <InputWithLabel label="Organization" name="c_organization" register={form.register} />
//               </div>
//             )}

//             {step === 1 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputWithLabel label="Trip Start" name="trip_start_date" register={form.register} type="date" />
//                 <InputWithLabel label="Trip End" name="trip_end_date" register={form.register} type="date" />
//                 <InputWithLabel label="Stay Name" name="stay_name" register={form.register} />
//                 <InputWithLabel label="Company Name" name="company_name" register={form.register} />
//                 <InputWithLabel label="Destinations" name="destinations" register={form.register} />
//                 <InputWithLabel label="Trip Purpose" name="trip_purpose" register={form.register} />
//               </div>
//             )}

//             {step === 2 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} />
//                 <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} />
//                 <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} />
//               </div>
//             )}

//             {step === 3 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <TextareaWithLabel label="Medical Conditions" name="medical_conditions" register={form.register} />
//                 <TextareaWithLabel label="Current Medications" name="current_medications" register={form.register} />
//                 <TextareaWithLabel label="Allergies" name="allergies" register={form.register} />
//                 <TextareaWithLabel label="Special Assistance" name="special_assistance" register={form.register} />
//                 <InputWithLabel label="Blood Type" name="blood_type" register={form.register} />
//               </div>
//             )}

//             {step === 4 && (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" />
//                   <InputWithLabel label="Black Zone Days" name="black_zone_days" register={form.register} type="number" />
//                 </div>

//                 <div className="flex items-start space-x-2">
//                   <Checkbox
//                     id="consent"
//                     checked={form.watch("consent")}
//                     onCheckedChange={(checked) =>
//                       form.setValue("consent", checked === true ? true : undefined as any)
//                     }
//                   />
//                   <Label htmlFor="consent">I consent to the use of my medical information in an emergency.</Label>
//                 </div>
//                 {form.formState.errors.consent && (
//                   <p className="text-red-500 text-sm">{form.formState.errors.consent.message}</p>
//                 )}
//               </>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between pt-6">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep}>
//                   Back
//                 </Button>
//               )}
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep}>
//                   Next
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full">
//                   Submit
//                 </Button>
//               )}
//             </div>
//           </form>

//           {/* Quote Summary Section */}
//           <div className="hidden md:block space-y-4 pl-4">
//             <div className="bg-white shadow p-6 rounded-lg">
//               <h3 className="text-xl font-semibold">Quote Summary</h3>
//               <div className="space-y-4">
//                 <div>
//                   <p><strong>Traveling To:</strong> {form.watch("destinations")}</p>
//                   <p><strong>Travelers:</strong> 1</p>
//                   <p><strong>Travel Date:</strong> {form.watch("trip_start_date")} to {form.watch("trip_end_date")}</p>
//                   <p><strong>Age:</strong> {new Date().getFullYear() - new Date(form.watch("c_birthdate")).getFullYear()}</p>
//                   <p><strong>Base Price:</strong> $100</p>
//                   <p><strong>Total Price:</strong> $200</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InputWithLabel({
//   label,
//   name,
//   register,
//   type = "text",
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
//   type?: string;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name)} type={type} />
//     </div>
//   );
// }

// function TextareaWithLabel({
//   label,
//   name,
//   register,
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)} />
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// const insuranceSchema = z.object({
//   c_name: z.string().min(1, "Required"),
//   c_email: z.string().email(),
//   c_phone: z.string(),
//   c_whats_app: z.string(),
//   c_birthdate: z.string(),
//   c_address: z.string(),
//   c_country: z.string(),
//   c_nationality: z.string(),
//   c_organization: z.string().optional(),

//   trip_start_date: z.string(),
//   trip_end_date: z.string(),
//   stay_name: z.string().optional(),
//   is_company_arranged: z.boolean(),
//   company_name: z.string().optional(),
//   destinations: z.string(),
//   trip_purpose: z.string(),

//   emergency_contact_name: z.string(),
//   emergency_contact_phone: z.string(),
//   emergency_contact_relation: z.string(),

//   consent: z.literal(true, {
//     errorMap: () => ({ message: "You must give consent" }),
//   }),

//   medical_conditions: z.string().optional(),
//   current_medications: z.string().optional(),
//   allergies: z.string().optional(),
//   blood_type: z.string().optional(),
//   special_assistance: z.string().optional(),

//   green_zone_days: z.coerce.number().min(0),
//   amber_zone_days: z.coerce.number().min(0),
//   red_zone_days: z.coerce.number().min(0),
//   black_zone_days: z.coerce.number().min(0).optional(),
// });

// type InsuranceFormValues = z.infer<typeof insuranceSchema>;

// const steps = [
//   "Personal Info",
//   "Trip Details",
//   "Emergency Contact",
//   "Medical Info",
//   "Risk Zones & Consent",
// ];

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: zodResolver(insuranceSchema),
//     defaultValues: {
//       consent: undefined,
//       is_company_arranged: false,
//     },
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     console.log(data);
//   };

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   return (
//     <div className="flex justify-center px-4 py-10">
//       <div className="w-full max-w-4xl">
//         {/* Stepper */}
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
//                     ? "bg-[#1A2C50] text-white" // current and previous steps
//                     : "bg-[#00BBD3] text-white" // upcoming steps
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>

//           <div className="h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {step === 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputWithLabel label="Full Name" name="c_name" register={form.register} />
//                 <InputWithLabel label="Email" name="c_email" register={form.register} type="email" />
//                 <InputWithLabel label="Phone" name="c_phone" register={form.register} />
//                 <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} />
//                 <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" />
//                 <InputWithLabel label="Address" name="c_address" register={form.register} />
//                 <InputWithLabel label="Country" name="c_country" register={form.register} />
//                 <InputWithLabel label="Nationality" name="c_nationality" register={form.register} />
//                 <InputWithLabel label="Organization" name="c_organization" register={form.register} />
//               </div>
//             )}

//             {step === 1 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputWithLabel label="Trip Start" name="trip_start_date" register={form.register} type="date" />
//                 <InputWithLabel label="Trip End" name="trip_end_date" register={form.register} type="date" />
//                 <InputWithLabel label="Stay Name" name="stay_name" register={form.register} />
//                 <InputWithLabel label="Company Name" name="company_name" register={form.register} />
//                 <InputWithLabel label="Destinations" name="destinations" register={form.register} />
//                 <InputWithLabel label="Trip Purpose" name="trip_purpose" register={form.register} />
//               </div>
//             )}

//             {step === 2 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} />
//                 <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} />
//                 <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} />
//               </div>
//             )}

//             {step === 3 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <TextareaWithLabel label="Medical Conditions" name="medical_conditions" register={form.register} />
//                 <TextareaWithLabel label="Current Medications" name="current_medications" register={form.register} />
//                 <TextareaWithLabel label="Allergies" name="allergies" register={form.register} />
//                 <TextareaWithLabel label="Special Assistance" name="special_assistance" register={form.register} />
//                 <InputWithLabel label="Blood Type" name="blood_type" register={form.register} />
//               </div>
//             )}

//             {step === 4 && (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" />
//                   <InputWithLabel label="Black Zone Days" name="black_zone_days" register={form.register} type="number" />
//                 </div>

//                 <div className="flex items-start space-x-2">
//                   <Checkbox
//                     id="consent"
//                     checked={form.watch("consent")}
//                     onCheckedChange={(checked) =>
//                       form.setValue("consent", checked === true ? true : undefined as any)
//                     }
//                   />
//                   <Label htmlFor="consent">I consent to the use of my medical information in an emergency.</Label>
//                 </div>
//                 {form.formState.errors.consent && (
//                   <p className="text-red-500 text-md">{form.formState.errors.consent.message}</p>
//                 )}
//               </>
//             )}
//             <div className="flex justify-between pt-6">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep} className="w-76">
//                   Back
//                 </Button>
//               )}
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep} className="w-76">
//                   Next
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-76">
//                   Submit
//                 </Button>
//               )}
//             </div>

//           </form>
//           <div className="hidden md:block mt-6">
//             <div className="bg-white border border-input p-6 min-h-[400px] flex flex-col">
//               <h3 className="text-2xl font-semibold mb-6">Quote Summary</h3>

//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className=" font-medium font-semibold">Traveling To</p>
//                   <p className="text-gray-500">{form.watch("destinations")}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium font-semibold">Travelers</p>
//                   <p className="text-gray-500">1</p>
//                 </div>

//                 <div className="col-span-2 mt-6">
//                   <p className="font-semibold font-medium">Travel Dates</p>
//                   <p className="text-gray-500">
//                     {form.watch("trip_start_date")} - {form.watch("trip_end_date")}
//                   </p>
//                 </div>

//                 <div className="col-span-2 mt-6">
//                   <p className="font-semibold font-medium">Age</p>
//                   <p className="text-gray-500">
//                     {new Date().getFullYear() - new Date(form.watch("c_birthdate")).getFullYear()}
//                   </p>
//                 </div>
//               </div>

//               <hr className="my-6 border-t-2 border-[#00BBD3]" />

//               <div className="text-sm space-y-2">
//                 <p className="font-medium font-semibold">Base Price</p>
//                 <p className="text-gray-500">$100</p>
//               </div>

//               <hr className="my-6 border-t-2 border-[#00BBD3]" />

//               <div className="text-sm space-y-2">
//                 <p className="font-semibold font-medium">Total Price</p>
//                 <p className="text-gray-500">$200</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InputWithLabel({
//   label,
//   name,
//   register,
//   type = "text",
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
//   type?: string;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name)} type={type} />
//     </div>
//   );
// }

// function TextareaWithLabel({
//   label,
//   name,
//   register,
// }: {
//   label: string;
//   name: keyof InsuranceFormValues;
//   register: any;
// }) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name)} />
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { useForm, useFieldArray, Controller, UseFormRegister, FieldError, Control } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import Joi from "joi";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 

// // --- Joi Schema Definition ---
// const purchaseWithoutLoginSchema = Joi.object({
//     c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
//     c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email is required.", "string.email": "Email must be a valid email." }),
//     c_phone: Joi.string().required().messages({ "string.empty": "Phone is required." }),
//     c_whats_app: Joi.string().required().messages({ "string.empty": "WhatsApp is required." }),
//     c_birthdate: Joi.date().required().messages({ "any.required": "Birthdate is required.", "date.base": "Birthdate must be a valid date." }),
//     c_address: Joi.string().required().messages({ "string.empty": "Address is required." }),
//     c_country: Joi.string().required().messages({ "string.empty": "Residence Country is required." }),
//     c_nationality: Joi.string().required().messages({ "string.empty": "Nationality is required." }),
//     c_organization: Joi.string().optional().allow(""),
//     trip_start_date: Joi.date().required().messages({ "any.required": "Trip Start Date is required.", "date.base": "Trip Start Date must be a valid date." }),
//     trip_end_date: Joi.date().required().greater(Joi.ref('trip_start_date')).messages({
//         "any.required": "Trip End Date is required.",
//         "date.base": "Trip End Date must be a valid date.",
//         "date.greater": "Trip End Date must be after Trip Start Date."
//     }),
//     stay_name: Joi.string().optional().allow(""),
//     is_company_arranged: Joi.boolean().default(false),
//     company_name: Joi.alternatives().conditional('is_company_arranged', {
//         is: true,
//         then: Joi.string().required().trim().messages({ "string.empty": "Company Name is required when trip is company arranged." }),
//         otherwise: Joi.string().optional().allow("")
//     }),
//     trip_countries: Joi.array().items(Joi.string().required().messages({"string.empty": "Trip country cannot be empty."})).required().min(1).max(1).messages({
//         "array.base": "Trip country is required.",
//         "array.min": "At least one trip country is required.",
//         "array.max": "Only one trip country can be specified here."
//     }),
//     trip_cities: Joi.array().items(Joi.object().keys({
//         id: Joi.string().optional().allow(""),
//         name: Joi.string().required().messages({ "string.empty": "City name is required." }),
//         stay_name: Joi.string().optional().allow(""),
//         zoneType: Joi.string().valid(
//             "GREEN", "AMBER", "RED", "BLACK"
//         ).required().messages({ "any.required": "Zone type is required.", "any.only": "Invalid zone type."})
//     })).required().min(1).messages({ "array.min": "At least one trip city is required.", "array.base": "Trip cities are required." }),
//     trip_purpose: Joi.string().valid(
//         "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//         "EDUCATION", "PERSONAL", "OTHER"
//     ).required().messages({ "any.required": "Trip purpose is required.", "any.only": "Invalid trip purpose." }),
//     emergency_contact_name: Joi.string().required().messages({ "string.empty": "Emergency contact name is required." }),
//     emergency_contact_phone: Joi.string().required().messages({ "string.empty": "Emergency contact phone is required." }),
//     emergency_contact_relation: Joi.string().required().messages({ "string.empty": "Emergency contact relation is required." }),
//     consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent.", "any.required": "Consent is required." }),
//     travellers: Joi.array().items(Joi.object().keys({
//         name: Joi.string().required().trim().messages({ "string.empty": "Traveller name is required." }),
//         birthdate: Joi.date().required().messages({ "any.required": "Traveller birthdate is required.", "date.base": "Birthdate must be valid." }),
//     })).required().min(1).messages({ "array.min": "At least one traveller is required.", "array.base": "Travellers are required." }),
//     medical_conditions: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
//     current_medications: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
//     allergies: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
//     blood_type: Joi.string().optional().allow(""),
//     special_assistance: Joi.string().optional().allow(""),
//     green_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
//     amber_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
//     red_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
//     black_zone_days: Joi.number().integer().optional().min(0).default(0).messages({ "number.min": "Black zone days must be at least 0." })
// });


// // --- TypeScript Type Definition ---
// interface TripCity {
//   id?: string;
//   name: string;
//   stay_name?: string;
//   zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
// }

// interface Traveller {
//   name: string;
//   birthdate: string; // Date inputs give string "YYYY-MM-DD"
// }

// type InsuranceFormValues = {
//   c_name: string;
//   c_email: string;
//   c_phone: string;
//   c_whats_app: string;
//   c_birthdate: string;
//   c_address: string;
//   c_country: string;
//   c_nationality: string;
//   c_organization?: string;
//   trip_start_date: string;
//   trip_end_date: string;
//   stay_name?: string;
//   is_company_arranged: boolean;
//   company_name?: string;
//   trip_countries: string[]; // Will hold a single country in an array: ["India"]
//   trip_cities: TripCity[];
//   trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
//   emergency_contact_name: string;
//   emergency_contact_phone: string;
//   emergency_contact_relation: string;
//   consent: boolean | undefined; // Checkbox can be undefined initially
//   travellers: Traveller[];
//   medical_conditions?: string[];
//   current_medications?: string[];
//   allergies?: string[];
//   blood_type?: string;
//   special_assistance?: string;
//   green_zone_days: number | string; // Input type="number" can give string
//   amber_zone_days: number | string;
//   red_zone_days: number | string;
//   black_zone_days?: number | string;
// };

// const steps = [
//   "Personal Info & Travellers", // Combined for new fields
//   "Trip Details",
//   "Emergency Contact",
//   "Medical Info",
//   "Risk Zones & Consent",
// ];

// const tripPurposes = [
//     "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL", 
//     "EDUCATION", "PERSONAL", "OTHER"
// ];
// const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"];


// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: joiResolver(purchaseWithoutLoginSchema, {
//       abortEarly: false, // Show all errors
//     }),
//     defaultValues: {
//       c_name: "",
//       c_email: "",
//       c_phone: "",
//       c_whats_app: "",
//       c_birthdate: "",
//       c_address: "",
//       c_country: "",
//       c_nationality: "",
//       c_organization: "",
//       trip_start_date: "",
//       trip_end_date: "",
//       stay_name: "",
//       is_company_arranged: false,
//       company_name: "",
//       trip_countries: [], // Initialize as empty array, input will target trip_countries.0
//       trip_cities: [{ name: "", stay_name: "", zoneType: "GREEN" }],
//       trip_purpose: "",
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_relation: "",
//       consent: undefined,
//       travellers: [{ name: "", birthdate: "" }],
//       medical_conditions: [],
//       current_medications: [],
//       allergies: [],
//       blood_type: "",
//       special_assistance: "",
//       green_zone_days: 0,
//       amber_zone_days: 0,
//       red_zone_days: 0,
//       black_zone_days: 0,
//     },
//   });

//   const { fields: travellerFields, append: appendTraveller, remove: removeTraveller } = useFieldArray({
//     control: form.control,
//     name: "travellers",
//   });

//   const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray({
//     control: form.control,
//     name: "trip_cities",
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     // Joi resolver should handle type coercion for dates and numbers.
//     // Ensure arrays from ControlledTextareaArray are correctly formatted if needed.
//     const parsedData = {
//         ...data,
//         // Ensure number fields are numbers
//         green_zone_days: Number(data.green_zone_days),
//         amber_zone_days: Number(data.amber_zone_days),
//         red_zone_days: Number(data.red_zone_days),
//         black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//         // Ensure arrays from Textarea are clean (filter out empty strings if any)
//         medical_conditions: data.medical_conditions?.filter(item => item && item.trim() !== ""),
//         current_medications: data.current_medications?.filter(item => item && item.trim() !== ""),
//         allergies: data.allergies?.filter(item => item && item.trim() !== ""),
//     };
//     console.log("Form Data Submitted:", parsedData);
//     // alert("Form submitted! Check console for data.");
//   };

//   const nextStep = async () => {
//     const result = await form.trigger(); // Validate current step fields
//     // A more granular validation would be to list fields for the current step:
//     // await form.trigger([...fieldsForCurrentStep]);
//     if (result) {
//       setStep((prev) => Math.min(prev + 1, steps.length - 1));
//     }
//   };
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: keyof InsuranceFormValues | string) => {
//     const keys = fieldName.split('.');
//     let error = form.formState.errors as any;
//     for (const key of keys) {
//         if (error && key in error) {
//             error = error[key];
//         } else {
//             return undefined;
//         }
//     }
//     return error as FieldError | undefined;
//   };


//   return (
//     <div className="flex justify-center px-4 py-10">
//       <div className="w-full max-w-4xl">
//         {/* Stepper */}
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
//                     ? "bg-[#1A2C50] text-white"
//                     : "bg-[#00BBD3] text-white"
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* Step 0: Personal Info & Travellers */}
//             {step === 0 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
//                   <InputWithLabel label="Email" name="c_email" register={form.register} type="email" error={getError("c_email")} />
//                   <InputWithLabel label="Phone" name="c_phone" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" error={getError("c_birthdate")} />
//                   <InputWithLabel label="Address" name="c_address" register={form.register} error={getError("c_address")} />
//                   <InputWithLabel label="Residence Country" name="c_country" register={form.register} error={getError("c_country")} />
//                   <InputWithLabel label="Nationality" name="c_nationality" register={form.register} error={getError("c_nationality")} />
//                   <InputWithLabel label="Organization (Optional)" name="c_organization" register={form.register} error={getError("c_organization")} />
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Travellers</h2>
//                 {travellerFields.map((field, index) => (
//                   <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border p-4 rounded-md mb-2">
//                     <InputWithLabel label={`Traveller ${index + 1} Name`} name={`travellers.${index}.name`} register={form.register} error={getError(`travellers.${index}.name`)} />
//                     <InputWithLabel label="Birthdate" name={`travellers.${index}.birthdate`} register={form.register} type="date" error={getError(`travellers.${index}.birthdate`)} />
//                     {travellerFields.length > 1 && (
//                       <Button type="button" variant="destructive" onClick={() => removeTraveller(index)} >Remove</Button>
//                     )}
//                   </div>
//                 ))}
//                 <Button type="button" variant="outline" onClick={() => appendTraveller({ name: "", birthdate: "" })}>Add Traveller</Button>
//                 {getError("travellers") && <p className="text-red-500 text-sm">{getError("travellers")?.message}</p>}
//               </>
//             )}

//             {/* Step 1: Trip Details */}
//             {step === 1 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Trip Start Date" name="trip_start_date" register={form.register} type="date" error={getError("trip_start_date")} />
//                   <InputWithLabel label="Trip End Date" name="trip_end_date" register={form.register} type="date" error={getError("trip_end_date")} />
//                   <InputWithLabel label="Primary Destination Country" name="trip_countries.0" register={form.register} error={getError("trip_countries.0") || getError("trip_countries")} />
//                   {/* <InputWithLabel label="Trip Purpose" name="trip_purpose" register={form.register} error={getError("trip_purpose")} /> */}
//                   <SelectWithLabel
//                     control={form.control}
//                     name="trip_purpose"
//                     label="Trip Purpose"
//                     options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace("_", " ") }))}
//                     error={getError("trip_purpose")}
//                     placeholder="Select trip purpose"
//                   />
//                   <InputWithLabel label="Stay Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} />
//                   <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
//                      <Checkbox
//                         id="is_company_arranged"
//                         {...form.register("is_company_arranged")}
//                         checked={form.watch("is_company_arranged")}
//                         onCheckedChange={(checked) => form.setValue("is_company_arranged", !!checked)}
//                       />
//                     <Label htmlFor="is_company_arranged">This trip is company arranged</Label>
//                   </div>
//                   {form.watch("is_company_arranged") && (
//                     <InputWithLabel label="Company Name" name="company_name" register={form.register} error={getError("company_name")} />
//                   )}
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Trip Cities / Stops</h2>
//                 {cityFields.map((field, index) => (
//                   <div key={field.id} className="space-y-4 border p-4 rounded-md mb-2">
//                     <h3 className="font-medium">City / Stop {index + 1}</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <InputWithLabel label="City Name" name={`trip_cities.${index}.name`} register={form.register} error={getError(`trip_cities.${index}.name`)} />
//                         <InputWithLabel label="Stay Name (Optional)" name={`trip_cities.${index}.stay_name`} register={form.register} error={getError(`trip_cities.${index}.stay_name`)} />
//                          <SelectWithLabel
//                             control={form.control}
//                             name={`trip_cities.${index}.zoneType`}
//                             label="Zone Type"
//                             options={zoneTypes.map(z => ({ value: z, label: z }))}
//                             error={getError(`trip_cities.${index}.zoneType`)}
//                             placeholder="Select zone type"
//                         />
//                     </div>
//                     {cityFields.length > 1 && (
//                       <Button type="button" variant="destructive" size="sm" onClick={() => removeCity(index)}>Remove City</Button>
//                     )}
//                   </div>
//                 ))}
//                 <Button type="button" variant="outline" onClick={() => appendCity({ name: "", stay_name: "", zoneType: "GREEN" })}>Add City/Stop</Button>
//                 {getError("trip_cities") && <p className="text-red-500 text-sm">{getError("trip_cities")?.message}</p>}
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} error={getError("emergency_contact_name")} />
//                   <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} error={getError("emergency_contact_phone")} />
//                   <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} error={getError("emergency_contact_relation")} />
//                 </div>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="medical_conditions"
//                     label="Medical Conditions (comma-separated)"
//                     error={getError("medical_conditions")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="current_medications"
//                     label="Current Medications (comma-separated)"
//                     error={getError("current_medications")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="allergies"
//                     label="Allergies (comma-separated)"
//                     error={getError("allergies")}
//                   />
//                   <TextareaWithLabel label="Special Assistance (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Risk Zone Exposure (Days)</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" error={getError("green_zone_days")} />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" error={getError("amber_zone_days")} />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" error={getError("red_zone_days")} />
//                   <InputWithLabel label="Black Zone Days (Optional)" name="black_zone_days" register={form.register} type="number" error={getError("black_zone_days")} />
//                 </div>

//                 <div className="flex items-start space-x-2 pt-4">
//                   <Checkbox
//                     id="consent"
//                     {...form.register("consent")}
//                     checked={form.watch("consent")}
//                     onCheckedChange={(checked) => form.setValue("consent", checked === true ? true : undefined, {shouldValidate: true})}
//                   />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium">
//                       I consent to the use of my medical information in an emergency.
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       You must agree to this to proceed.
//                     </p>
//                   </div>
//                 </div>
//                 {getError("consent") && (
//                   <p className="text-red-500 text-sm">{getError("consent")?.message}</p>
//                 )}
//               </>
//             )}

//             <div className="flex justify-between pt-6">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep} className="w-70 px-6">
//                   Back
//                 </Button>
//               )}
//               {step === 0 && <div />} 
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep} className="w-70 px-6">
//                   Next
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-70 px-6" disabled={form.formState.isSubmitting}>
//                   {form.formState.isSubmitting ? "Submitting..." : "Submit"}
//                 </Button>
//               )}
//             </div>
//           </form>

//           <div className="hidden md:block mt-6">
//             <div className="bg-white border border-input p-6 min-h-[400px] flex flex-col rounded-md shadow-sm">
//               <h3 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Quote Summary</h3>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="font-semibold">Traveling To</p>
//                   <p className="text-gray-500">{form.watch("trip_countries.0") || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Travelers</p>
//                   <p className="text-gray-500">{form.watch("travellers")?.length || 1}</p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Travel Dates</p>
//                   <p className="text-gray-500">
//                     {form.watch("trip_start_date") || "N/A"} - {form.watch("trip_end_date") || "N/A"}
//                   </p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Primary Applicant Age</p>
//                   <p className="text-gray-500">
//                     {form.watch("c_birthdate") && !isNaN(new Date(form.watch("c_birthdate")).getFullYear())
//                       ? new Date().getFullYear() - new Date(form.watch("c_birthdate")).getFullYear()
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Base Price</p>
//                 <p className="text-gray-500">$100 (Example)</p>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Total Price</p>
//                 <p className="text-lg font-bold text-[#1A2C50]">$200 (Example)</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface InputWithLabelProps {
//   label: string;
//   name: string; // Changed to string for flexibility with array fields
//   register: UseFormRegister<InsuranceFormValues>;
//   type?: string;
//   error?: FieldError;
// }

// function InputWithLabel({ label, name, register, type = "text", error }: InputWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name as any, { 
//           setValueAs: (value) => (type === "number" && value !== "" ? Number(value) : value) 
//       })} type={type} className={error ? "border-red-500" : ""} />
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </div>
//   );
// }

// interface TextareaWithLabelProps {
//   label: string;
//   name: string; // Changed to string
//   register: UseFormRegister<InsuranceFormValues>;
//   error?: FieldError;
// }

// function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name as any)} className={error ? "border-red-500" : ""} />
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </div>
//   );
// }

// interface ControlledTextareaArrayProps {
//   control: Control<InsuranceFormValues>;
//   name: "medical_conditions" | "current_medications" | "allergies"; // Ensure specific names
//   label: string;
//   error?: FieldError | { message?: string }; // FieldError for array itself, or error obj with message
// }

// function ControlledTextareaArray({ control, name, label, error }: ControlledTextareaArrayProps) {
//   return (
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
//             className={error ? "border-red-500" : ""}
//           />
//         )}
//       />
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
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

// function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
//     return (
//         <div className="space-y-1">
//             <Label htmlFor={name}>{label}</Label>
//             <Controller
//                 name={name as any}
//                 control={control}
//                 render={({ field }) => (
//                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
//                         <SelectTrigger id={name} className={error ? "border-red-500" : ""}>
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent>
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


// "use client";

// import { useState } from "react";
// import { useForm, useFieldArray, Controller, UseFormRegister, FieldError, Control } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import Joi from "joi";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const purchaseWithoutLoginSchema = Joi.object({
//     c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
//     c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email is required.", "string.email": "Email must be a valid email." }),
//     c_phone: Joi.string().required().messages({ "string.empty": "Phone is required." }),
//     c_whats_app: Joi.string().required().messages({ "string.empty": "WhatsApp is required." }),
//     c_birthdate: Joi.date().required().messages({ "any.required": "Birthdate is required.", "date.base": "Birthdate must be a valid date." }),
//     c_address: Joi.string().required().messages({ "string.empty": "Address is required." }),
//     c_country: Joi.string().required().messages({ "string.empty": "Residence Country is required." }),
//     c_nationality: Joi.string().required().messages({ "string.empty": "Nationality is required." }),
//     c_organization: Joi.string().optional().allow(""),
//     trip_start_date: Joi.date().required().messages({ "any.required": "Trip Start Date is required.", "date.base": "Trip Start Date must be a valid date." }),
//     trip_end_date: Joi.date().required().greater(Joi.ref('trip_start_date')).messages({
//         "any.required": "Trip End Date is required.",
//         "date.base": "Trip End Date must be a valid date.",
//         "date.greater": "Trip End Date must be after Trip Start Date."
//     }),
//     stay_name: Joi.string().optional().allow(""),
//     is_company_arranged: Joi.boolean().default(false),
//     company_name: Joi.alternatives().conditional('is_company_arranged', {
//         is: true,
//         then: Joi.string().required().trim().messages({ "string.empty": "Company Name is required when trip is company arranged." }),
//         otherwise: Joi.string().optional().allow("")
//     }),
//     trip_countries: Joi.array().items(Joi.string().required().messages({"string.empty": "Trip country cannot be empty."})).required().min(1).max(1).messages({
//         "array.base": "Trip country is required.",
//         "array.min": "At least one trip country is required.",
//         "array.max": "Only one trip country can be specified here."
//     }),
//     trip_cities: Joi.array().items(Joi.object().keys({
//         id: Joi.string().optional().allow(""),
//         name: Joi.string().required().messages({ "string.empty": "City name is required." }),
//         stay_name: Joi.string().optional().allow(""),
//         zoneType: Joi.string().valid(
//             "GREEN", "AMBER", "RED", "BLACK"
//         ).required().messages({ "any.required": "Zone type is required.", "any.only": "Invalid zone type."})
//     })).required().min(1).messages({ "array.min": "At least one trip city is required.", "array.base": "Trip cities are required." }),
//     trip_purpose: Joi.string().valid(
//         "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//         "EDUCATION", "PERSONAL", "OTHER"
//     ).required().messages({ "any.required": "Trip purpose is required.", "any.only": "Invalid trip purpose." }),
//     emergency_contact_name: Joi.string().required().messages({ "string.empty": "Emergency contact name is required." }),
//     emergency_contact_phone: Joi.string().required().messages({ "string.empty": "Emergency contact phone is required." }),
//     emergency_contact_relation: Joi.string().required().messages({ "string.empty": "Emergency contact relation is required." }),
//     consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent.", "any.required": "Consent is required." }),
//     travellers: Joi.array().items(Joi.object().keys({
//         name: Joi.string().required().trim().messages({ "string.empty": "Traveller name is required." }),
//         birthdate: Joi.date().required().messages({ "any.required": "Traveller birthdate is required.", "date.base": "Birthdate must be valid." }),
//     })).required().min(1).messages({ "array.min": "At least one traveller is required.", "array.base": "Travellers are required." }),
//     medical_conditions: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
//     current_medications: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
//     allergies: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
//     blood_type: Joi.string().optional().allow(""),
//     special_assistance: Joi.string().optional().allow(""),
//     green_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
//     amber_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
//     red_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
//     black_zone_days: Joi.number().integer().optional().min(0).default(0).messages({ "number.min": "Black zone days must be at least 0." })
// });

// interface TripCity {
//   id?: string;
//   name: string;
//   stay_name?: string;
//   zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
// }

// interface Traveller {
//   name: string;
//   birthdate: string;
// }

// type InsuranceFormValues = {
//   c_name: string;
//   c_email: string;
//   c_phone: string;
//   c_whats_app: string;
//   c_birthdate: string;
//   c_address: string;
//   c_country: string;
//   c_nationality: string;
//   c_organization?: string;
//   trip_start_date: string;
//   trip_end_date: string;
//   stay_name?: string;
//   is_company_arranged: boolean;
//   company_name?: string;
//   trip_countries: string[];
//   trip_cities: TripCity[];
//   trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
//   emergency_contact_name: string;
//   emergency_contact_phone: string;
//   emergency_contact_relation: string;
//   consent: boolean | undefined;
//   travellers: Traveller[];
//   medical_conditions?: string[];
//   current_medications?: string[];
//   allergies?: string[];
//   blood_type?: string;
//   special_assistance?: string;
//   green_zone_days: number | string;
//   amber_zone_days: number | string;
//   red_zone_days: number | string;
//   black_zone_days?: number | string;
// };

// const steps = [
//   "Personal Info & Travellers",
//   "Trip Details",
//   "Emergency Contact",
//   "Medical Info",
//   "Risk Zones & Consent",
// ];

// const tripPurposes = [
//     "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//     "EDUCATION", "PERSONAL", "OTHER"
// ];
// const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"];

// const fieldsByStep: string[][] = [
//   [
//     'c_name', 'c_email', 'c_phone', 'c_whats_app', 'c_birthdate', 'c_address',
//     'c_country', 'c_nationality', 'c_organization',
//     'travellers'
//   ],
//   [
//     'trip_start_date', 'trip_end_date',
//     'trip_countries',
//     'trip_purpose', 'stay_name', 'is_company_arranged', 'company_name',
//     'trip_cities'
//   ],
//   [
//     'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relation'
//   ],
//   [
//     'medical_conditions', 'current_medications', 'allergies',
//     'special_assistance', 'blood_type'
//   ],
//   [
//     'green_zone_days', 'amber_zone_days', 'red_zone_days',
//     'black_zone_days', 'consent'
//   ]
// ];

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: joiResolver(purchaseWithoutLoginSchema, {
//       abortEarly: false,
//     }),
//     defaultValues: {
//       c_name: "",
//       c_email: "",
//       c_phone: "",
//       c_whats_app: "",
//       c_birthdate: "",
//       c_address: "",
//       c_country: "",
//       c_nationality: "",
//       c_organization: "",
//       trip_start_date: "",
//       trip_end_date: "",
//       stay_name: "",
//       is_company_arranged: false,
//       company_name: "",
//       trip_countries: [],
//       trip_cities: [{ name: "", stay_name: "", zoneType: "GREEN" }],
//       trip_purpose: "",
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_relation: "",
//       consent: undefined,
//       travellers: [{ name: "", birthdate: "" }],
//       medical_conditions: [],
//       current_medications: [],
//       allergies: [],
//       blood_type: "",
//       special_assistance: "",
//       green_zone_days: 0,
//       amber_zone_days: 0,
//       red_zone_days: 0,
//       black_zone_days: 0,
//     },
//   });

//   const { fields: travellerFields, append: appendTraveller, remove: removeTraveller } = useFieldArray({
//     control: form.control,
//     name: "travellers",
//   });

//   const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray({
//     control: form.control,
//     name: "trip_cities",
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     const parsedData = {
//         ...data,
//         green_zone_days: Number(data.green_zone_days),
//         amber_zone_days: Number(data.amber_zone_days),
//         red_zone_days: Number(data.red_zone_days),
//         black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//         medical_conditions: data.medical_conditions?.filter(item => item && item.trim() !== ""),
//         current_medications: data.current_medications?.filter(item => item && item.trim() !== ""),
//         allergies: data.allergies?.filter(item => item && item.trim() !== ""),
//     };
//     console.log("Form Data Submitted:", parsedData);
//   };

//   const nextStep = async () => {
//     const currentStepFields = fieldsByStep[step];
//     const result = await form.trigger(currentStepFields as any);

//     if (!result) {
//         const firstErrorField = currentStepFields.find(fieldName => {
//             const keys = fieldName.split('.');
//             let error = form.formState.errors as any;
//             for (const key of keys) {
//                 if (error && typeof error === 'object' && key in error) {
//                     error = error[key];
//                 } else if (error && Array.isArray(error) && !isNaN(Number(key)) && Number(key) < error.length) {
//                      error = error[Number(key)];
//                 }
//                 else {
//                     error = undefined;
//                     break;
//                 }
//             }
//             return !!error;
//         });

//         if (firstErrorField) {
//             const element = document.querySelector(`[name='${firstErrorField}']`) || document.getElementById(firstErrorField);
//             element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       return;
//     }

//     if (step < steps.length - 1) {
//        setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error = form.formState.errors as any;
//     try {
//         for (const key of keys) {
//             if (error && typeof error === 'object' && key in error) {
//                 error = error[key];
//             } else if (error && Array.isArray(error) && !isNaN(Number(key)) && Number(key) < error.length) {
//                  error = error[Number(key)];
//             }
//             else {
//                 return undefined;
//             }
//         }
//         return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//     } catch (e) {
//         console.warn(`Error accessing field error for ${fieldName}:`, e);
//         return undefined;
//     }
// };


//   return (
//     <div className="flex justify-center px-4 py-10">
//       <div className="w-full max-w-4xl">
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
//                     ? "bg-[#1A2C50] text-white"
//                     : "bg-[#00BBD3] text-white"
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {step === 0 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
//                   <InputWithLabel label="Email" name="c_email" register={form.register} type="email" error={getError("c_email")} />
//                   <InputWithLabel label="Phone" name="c_phone" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" error={getError("c_birthdate")} />
//                   <InputWithLabel label="Address" name="c_address" register={form.register} error={getError("c_address")} />
//                   <InputWithLabel label="Residence Country" name="c_country" register={form.register} error={getError("c_country")} />
//                   <InputWithLabel label="Nationality" name="c_nationality" register={form.register} error={getError("c_nationality")} />
//                   <InputWithLabel label="Organization (Optional)" name="c_organization" register={form.register} error={getError("c_organization")} />
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Travellers</h2>
//                 {travellerFields.map((field, index) => (
//                   <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border p-4 rounded-md mb-2">
//                     <InputWithLabel label={`Traveller ${index + 1} Name`} name={`travellers.${index}.name`} register={form.register} error={getError(`travellers.${index}.name`)} />
//                     <InputWithLabel label="Birthdate" name={`travellers.${index}.birthdate`} register={form.register} type="date" error={getError(`travellers.${index}.birthdate`)} />
//                     {travellerFields.length > 1 && (
//                       <Button type="button" variant="destructive" onClick={() => removeTraveller(index)} className="h-10">Remove</Button>
//                     )}
//                   </div>
//                 ))}
//                  <Button type="button" variant="outline" onClick={() => appendTraveller({ name: "", birthdate: "" })}>Add Traveller</Button>
//                  {getError("travellers") && <p className="text-red-500 text-sm">{getError("travellers")?.message || getError("travellers.root")?.message}</p>}
//               </>
//             )}

//             {step === 1 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Trip Start Date" name="trip_start_date" register={form.register} type="date" error={getError("trip_start_date")} />
//                   <InputWithLabel label="Trip End Date" name="trip_end_date" register={form.register} type="date" error={getError("trip_end_date")} />
//                   <InputWithLabel label="Primary Destination Country" name="trip_countries.0" register={form.register} error={getError("trip_countries.0") || getError("trip_countries")} />
//                   <SelectWithLabel
//                     control={form.control}
//                     name="trip_purpose"
//                     label="Trip Purpose"
//                     options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace("_", " ") }))}
//                     error={getError("trip_purpose")}
//                     placeholder="Select trip purpose"
//                   />
//                   <InputWithLabel label="Stay Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} />
//                   <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
//                      <Checkbox
//                         id="is_company_arranged"
//                         {...form.register("is_company_arranged")}
//                         checked={form.watch("is_company_arranged")}
//                         onCheckedChange={(checked) => form.setValue("is_company_arranged", !!checked)}
//                       />
//                     <Label htmlFor="is_company_arranged">This trip is company arranged</Label>
//                   </div>
//                   {form.watch("is_company_arranged") && (
//                     <InputWithLabel label="Company Name" name="company_name" register={form.register} error={getError("company_name")} />
//                   )}
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Trip Cities / Stops</h2>
//                 {cityFields.map((field, index) => (
//                   <div key={field.id} className="space-y-4 border p-4 rounded-md mb-2">
//                     <h3 className="font-medium">City / Stop {index + 1}</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <InputWithLabel label="City Name" name={`trip_cities.${index}.name`} register={form.register} error={getError(`trip_cities.${index}.name`)} />
//                         <InputWithLabel label="Stay Name (Optional)" name={`trip_cities.${index}.stay_name`} register={form.register} error={getError(`trip_cities.${index}.stay_name`)} />
//                          <SelectWithLabel
//                             control={form.control}
//                             name={`trip_cities.${index}.zoneType`}
//                             label="Zone Type"
//                             options={zoneTypes.map(z => ({ value: z, label: z }))}
//                             error={getError(`trip_cities.${index}.zoneType`)}
//                             placeholder="Select zone type"
//                         />
//                     </div>
//                     {cityFields.length > 1 && (
//                       <Button type="button" variant="destructive" size="sm" onClick={() => removeCity(index)}>Remove City</Button>
//                     )}
//                   </div>
//                 ))}
//                 <Button type="button" variant="outline" onClick={() => appendCity({ name: "", stay_name: "", zoneType: "GREEN" })}>Add City/Stop</Button>
//                 {getError("trip_cities") && <p className="text-red-500 text-sm">{getError("trip_cities")?.message || getError("trip_cities.root")?.message}</p>}
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} error={getError("emergency_contact_name")} />
//                   <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} error={getError("emergency_contact_phone")} />
//                   <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} error={getError("emergency_contact_relation")} />
//                 </div>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="medical_conditions"
//                     label="Medical Conditions (comma-separated)"
//                     error={getError("medical_conditions")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="current_medications"
//                     label="Current Medications (comma-separated)"
//                     error={getError("current_medications")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="allergies"
//                     label="Allergies (comma-separated)"
//                     error={getError("allergies")}
//                   />
//                   <TextareaWithLabel label="Special Assistance (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Risk Zone Exposure (Days)</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" error={getError("green_zone_days")} />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" error={getError("amber_zone_days")} />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" error={getError("red_zone_days")} />
//                   <InputWithLabel label="Black Zone Days (Optional)" name="black_zone_days" register={form.register} type="number" error={getError("black_zone_days")} />
//                 </div>

//                 <div className="flex items-start space-x-2 pt-4">
//                   <Checkbox
//                     id="consent"
//                     {...form.register("consent")}
//                     checked={form.watch("consent")}
//                     onCheckedChange={(checked) => form.setValue("consent", checked === true ? true : undefined, {shouldValidate: true})}
//                   />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium">
//                       I consent to the use of my medical information in an emergency.
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       You must agree to this to proceed.
//                     </p>
//                   </div>
//                 </div>
//                 {getError("consent") && (
//                   <p className="text-red-500 text-sm">{getError("consent")?.message}</p>
//                 )}
//               </>
//             )}

//             <div className="flex justify-between pt-6">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep} className="w-76 px-6">
//                   Back
//                 </Button>
//               )}
//               {step === 0 && <div />}
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep} className="w-76 px-6">
//                   Next
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-76 px-6" disabled={form.formState.isSubmitting}>
//                   {form.formState.isSubmitting ? "Submitting..." : "Submit"}
//                 </Button>
//               )}
//             </div>
//           </form>

//           <div className="hidden md:block mt-6">
//             <div className="bg-white border border-input p-6 min-h-[400px] flex flex-col rounded-md shadow-sm">
//               <h3 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Quote Summary</h3>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="font-semibold">Traveling To</p>
//                   <p className="text-gray-500">{form.watch("trip_countries.0") || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Travelers</p>
//                   <p className="text-gray-500">{form.watch("travellers")?.length || 1}</p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Travel Dates</p>
//                   <p className="text-gray-500">
//                     {form.watch("trip_start_date") || "N/A"} - {form.watch("trip_end_date") || "N/A"}
//                   </p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Primary Applicant Age</p>
//                   <p className="text-gray-500">
//                     {form.watch("c_birthdate") && !isNaN(new Date(form.watch("c_birthdate")).getFullYear())
//                       ? new Date().getFullYear() - new Date(form.watch("c_birthdate")).getFullYear()
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Base Price</p>
//                 <p className="text-gray-500">$100</p>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Total Price</p>
//                 <p className="text-lg font-bold text-[#1A2C50]">$200 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface InputWithLabelProps {
//   label: string;
//   name: string;
//   register: UseFormRegister<InsuranceFormValues>;
//   type?: string;
//   error?: FieldError;
// }

// function InputWithLabel({ label, name, register, type = "text", error }: InputWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name as any, {
//           setValueAs: (value) => (type === "number" && value !== "" ? Number(value) : value)
//       })} type={type} className={error ? "border-red-500" : ""} />
//       {error && <p className="text-red-500 text-sm">{error.message}</p>}
//     </div>
//   );
// }

// interface TextareaWithLabelProps {
//   label: string;
//   name: string;
//   register: UseFormRegister<InsuranceFormValues>;
//   error?: FieldError;
// }

// function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name as any)} className={error ? "border-red-500" : ""} />
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

// function ControlledTextareaArray({ control, name, label, error }: ControlledTextareaArrayProps) {
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
//             className={errorMessage ? "border-red-500" : ""}
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

// // function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
// //     return (
// //         <div className="space-y-1">
// //             <Label htmlFor={name}>{label}</Label>
// //             <Controller
// //                 name={name as any}
// //                 control={control}
// //                 render={({ field }) => (
// //                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ""}>
// //                         <SelectTrigger id={name} className={error ? "border-red-500" : ""}>
// //                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                              {placeholder && <SelectItem value="" disabled>{placeholder}</SelectItem>}
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

// function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
//   return (
//       <div className="space-y-1">
//           <Label htmlFor={name}>{label}</Label>
//           <Controller
//               name={name as any}
//               control={control}
//               render={({ field }) => (
//                   <Select
//                       onValueChange={field.onChange}
//                       value={field.value || ""} 
//                   >
//                       <SelectTrigger id={name} className={error ? "border-red-500" : ""}>
//                           <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                       </SelectTrigger>
//                       <SelectContent>
//                           {options.map(option => (
//                               <SelectItem key={option.value} value={option.value}>
//                                   {option.label}
//                               </SelectItem>
//                           ))}
//                       </SelectContent>
//                   </Select>
//               )}
//           />
//           {error && <p className="text-red-500 text-sm">{error.message}</p>}
//       </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useForm, useFieldArray, Controller, UseFormRegister, FieldError, Control } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import Joi from "joi";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/lib/utils"; // Import cn

// const purchaseWithoutLoginSchema = Joi.object({
//     c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
//     c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email is required.", "string.email": "Email must be a valid email." }),
//     c_phone: Joi.string().required().messages({ "string.empty": "Phone is required." }),
//     c_whats_app: Joi.string().required().messages({ "string.empty": "WhatsApp is required." }),
//     c_birthdate: Joi.date().required().messages({ "any.required": "Birthdate is required.", "date.base": "Birthdate must be a valid date." }),
//     c_address: Joi.string().required().messages({ "string.empty": "Address is required." }),
//     c_country: Joi.string().required().messages({ "string.empty": "Residence Country is required." }),
//     c_nationality: Joi.string().required().messages({ "string.empty": "Nationality is required." }),
//     c_organization: Joi.string().optional().allow(""),
//     trip_start_date: Joi.date().required().messages({ "any.required": "Trip Start Date is required.", "date.base": "Trip Start Date must be a valid date." }),
//     trip_end_date: Joi.date().required().greater(Joi.ref('trip_start_date')).messages({
//         "any.required": "Trip End Date is required.",
//         "date.base": "Trip End Date must be a valid date.",
//         "date.greater": "Trip End Date must be after Trip Start Date."
//     }),
//     stay_name: Joi.string().optional().allow(""),
//     is_company_arranged: Joi.boolean().default(false),
//     company_name: Joi.alternatives().conditional('is_company_arranged', {
//         is: true,
//         then: Joi.string().required().trim().messages({ "string.empty": "Company Name is required when trip is company arranged." }),
//         otherwise: Joi.string().optional().allow("")
//     }),
//     trip_countries: Joi.array().items(Joi.string().required().messages({"string.empty": "Trip country cannot be empty."})).required().min(1).max(1).messages({
//         "array.base": "Trip country is required.",
//         "array.min": "At least one trip country is required.",
//         "array.max": "Only one trip country can be specified here."
//     }),
//     trip_cities: Joi.array().items(Joi.object().keys({
//         id: Joi.string().optional().allow(""),
//         name: Joi.string().required().messages({ "string.empty": "City name is required." }),
//         stay_name: Joi.string().optional().allow(""),
//         zoneType: Joi.string().valid(
//             "GREEN", "AMBER", "RED", "BLACK"
//         ).required().messages({ "any.required": "Zone type is required.", "any.only": "Invalid zone type."})
//     })).required().min(1).messages({ "array.min": "At least one trip city is required.", "array.base": "Trip cities are required." }),
//     trip_purpose: Joi.string().valid(
//         "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//         "EDUCATION", "PERSONAL", "OTHER"
//     ).required().messages({ "any.required": "Trip purpose is required.", "any.only": "Invalid trip purpose." }),
//     emergency_contact_name: Joi.string().required().messages({ "string.empty": "Emergency contact name is required." }),
//     emergency_contact_phone: Joi.string().required().messages({ "string.empty": "Emergency contact phone is required." }),
//     emergency_contact_relation: Joi.string().required().messages({ "string.empty": "Emergency contact relation is required." }),
//     consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent.", "any.required": "Consent is required." }),
//     travellers: Joi.array().items(Joi.object().keys({
//         name: Joi.string().required().trim().messages({ "string.empty": "Traveller name is required." }),
//         birthdate: Joi.date().required().messages({ "any.required": "Traveller birthdate is required.", "date.base": "Birthdate must be valid." }),
//     })).required().min(1).messages({ "array.min": "At least one traveller is required.", "array.base": "Travellers are required." }),
//     medical_conditions: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
//     current_medications: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
//     allergies: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
//     blood_type: Joi.string().optional().allow(""),
//     special_assistance: Joi.string().optional().allow(""),
//     green_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
//     amber_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
//     red_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
//     black_zone_days: Joi.number().integer().optional().min(0).default(0).messages({ "number.min": "Black zone days must be at least 0." })
// });

// interface TripCity {
//   id?: string;
//   name: string;
//   stay_name?: string;
//   zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
// }

// interface Traveller {
//   name: string;
//   birthdate: string;
// }

// type InsuranceFormValues = {
//   c_name: string;
//   c_email: string;
//   c_phone: string;
//   c_whats_app: string;
//   c_birthdate: string;
//   c_address: string;
//   c_country: string;
//   c_nationality: string;
//   c_organization?: string;
//   trip_start_date: string;
//   trip_end_date: string;
//   stay_name?: string;
//   is_company_arranged: boolean;
//   company_name?: string;
//   trip_countries: string[];
//   trip_cities: TripCity[];
//   trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
//   emergency_contact_name: string;
//   emergency_contact_phone: string;
//   emergency_contact_relation: string;
//   consent: boolean | undefined;
//   travellers: Traveller[];
//   medical_conditions?: string[];
//   current_medications?: string[];
//   allergies?: string[];
//   blood_type?: string;
//   special_assistance?: string;
//   green_zone_days: number | string;
//   amber_zone_days: number | string;
//   red_zone_days: number | string;
//   black_zone_days?: number | string;
// };

// const steps = [
//   "Personal Info & Travellers",
//   "Trip Details",
//   "Emergency Contact",
//   "Medical Info",
//   "Risk Zones & Consent",
// ];

// const tripPurposes = [
//     "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//     "EDUCATION", "PERSONAL", "OTHER"
// ];
// const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"];

// const fieldsByStep: string[][] = [
//   [
//     'c_name', 'c_email', 'c_phone', 'c_whats_app', 'c_birthdate', 'c_address',
//     'c_country', 'c_nationality', 'c_organization',
//     'travellers'
//   ],
//   [
//     'trip_start_date', 'trip_end_date',
//     'trip_countries',
//     'trip_purpose', 'stay_name', 'is_company_arranged', 'company_name',
//     'trip_cities'
//   ],
//   [
//     'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relation'
//   ],
//   [
//     'medical_conditions', 'current_medications', 'allergies',
//     'special_assistance', 'blood_type'
//   ],
//   [
//     'green_zone_days', 'amber_zone_days', 'red_zone_days',
//     'black_zone_days', 'consent'
//   ]
// ];

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: joiResolver(purchaseWithoutLoginSchema, {
//       abortEarly: false,
//     }),
//     defaultValues: {
//       c_name: "",
//       c_email: "",
//       c_phone: "",
//       c_whats_app: "",
//       c_birthdate: "",
//       c_address: "",
//       c_country: "",
//       c_nationality: "",
//       c_organization: "",
//       trip_start_date: "",
//       trip_end_date: "",
//       stay_name: "",
//       is_company_arranged: false,
//       company_name: "",
//       trip_countries: [],
//       trip_cities: [{ name: "", stay_name: "", zoneType: "GREEN" }],
//       trip_purpose: "",
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_relation: "",
//       consent: undefined,
//       travellers: [{ name: "", birthdate: "" }],
//       medical_conditions: [],
//       current_medications: [],
//       allergies: [],
//       blood_type: "",
//       special_assistance: "",
//       green_zone_days: 0,
//       amber_zone_days: 0,
//       red_zone_days: 0,
//       black_zone_days: 0,
//     },
//   });

//   const { fields: travellerFields, append: appendTraveller, remove: removeTraveller } = useFieldArray({
//     control: form.control,
//     name: "travellers",
//   });

//   const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray({
//     control: form.control,
//     name: "trip_cities",
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     const parsedData = {
//         ...data,
//         green_zone_days: Number(data.green_zone_days),
//         amber_zone_days: Number(data.amber_zone_days),
//         red_zone_days: Number(data.red_zone_days),
//         black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//         medical_conditions: data.medical_conditions?.filter(item => item && item.trim() !== ""),
//         current_medications: data.current_medications?.filter(item => item && item.trim() !== ""),
//         allergies: data.allergies?.filter(item => item && item.trim() !== ""),
//     };
//     console.log("Form Data Submitted:", parsedData);
//   };

//   const nextStep = async () => {
//     const currentStepFields = fieldsByStep[step];
//     const result = await form.trigger(currentStepFields as any);

//     if (!result) {
//         const firstErrorField = currentStepFields.find(fieldName => {
//             const keys = fieldName.split('.');
//             let error = form.formState.errors as any;
//             for (const key of keys) {
//                 if (error && typeof error === 'object' && key in error) {
//                     error = error[key];
//                 } else if (error && Array.isArray(error) && !isNaN(Number(key)) && Number(key) < error.length) {
//                      error = error[Number(key)];
//                 }
//                 else {
//                     error = undefined;
//                     break;
//                 }
//             }
//             return !!error;
//         });

//         if (firstErrorField) {
//             const element = document.querySelector(`[name='${firstErrorField}']`) || document.getElementById(firstErrorField);
//             element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       return;
//     }

//     if (step < steps.length - 1) {
//        setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error = form.formState.errors as any;
//     try {
//         for (const key of keys) {
//             if (error && typeof error === 'object' && key in error) {
//                 error = error[key];
//             } else if (error && Array.isArray(error) && !isNaN(Number(key)) && Number(key) < error.length) {
//                  error = error[Number(key)];
//             }
//             else {
//                 return undefined;
//             }
//         }
//         return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//     } catch (e) {
//         console.warn(`Error accessing field error for ${fieldName}:`, e);
//         return undefined;
//     }
// };


//   return (
//     <div className="flex justify-center px-4 py-10">
//       <div className="w-full max-w-4xl">
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
//                     ? "bg-[#1A2C50] text-white"
//                     : "bg-[#00BBD3] text-white"
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {step === 0 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
//                   <InputWithLabel label="Email" name="c_email" register={form.register} type="email" error={getError("c_email")} />
//                   <InputWithLabel label="Phone" name="c_phone" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" error={getError("c_birthdate")} />
//                   <InputWithLabel label="Address" name="c_address" register={form.register} error={getError("c_address")} />
//                   <InputWithLabel label="Residence Country" name="c_country" register={form.register} error={getError("c_country")} />
//                   <InputWithLabel label="Nationality" name="c_nationality" register={form.register} error={getError("c_nationality")} />
//                   <InputWithLabel label="Organization (Optional)" name="c_organization" register={form.register} error={getError("c_organization")} />
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Travellers</h2>
//                 {travellerFields.map((field, index) => (
//                   <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border p-4 rounded-md mb-2">
//                     <InputWithLabel label={`Traveller ${index + 1} Name`} name={`travellers.${index}.name`} register={form.register} error={getError(`travellers.${index}.name`)} />
//                     <InputWithLabel label="Birthdate" name={`travellers.${index}.birthdate`} register={form.register} type="date" error={getError(`travellers.${index}.birthdate`)} />
//                     {travellerFields.length > 1 && (
//                       <Button type="button" variant="destructive" onClick={() => removeTraveller(index)} className="h-10">Remove</Button>
//                     )}
//                   </div>
//                 ))}
//                  <Button type="button" variant="outline" onClick={() => appendTraveller({ name: "", birthdate: "" })}>Add Traveller</Button>
//                  {getError("travellers") && <p className="text-red-500 text-sm">{getError("travellers")?.message || getError("travellers.root")?.message}</p>}
//               </>
//             )}

//             {step === 1 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Trip Start Date" name="trip_start_date" register={form.register} type="date" error={getError("trip_start_date")} />
//                   <InputWithLabel label="Trip End Date" name="trip_end_date" register={form.register} type="date" error={getError("trip_end_date")} />
//                   <InputWithLabel label="Primary Destination Country" name="trip_countries.0" register={form.register} error={getError("trip_countries.0") || getError("trip_countries") || getError("trip_countries.root")} />
//                   <SelectWithLabel
//                     control={form.control}
//                     name="trip_purpose"
//                     label="Trip Purpose"
//                     options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))}
//                     error={getError("trip_purpose")}
//                     placeholder="Select trip purpose"
//                   />
//                   <InputWithLabel label="Stay Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} />
//                   <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
//                      <Checkbox
//                         id="is_company_arranged"
//                         {...form.register("is_company_arranged")}
//                         checked={form.watch("is_company_arranged")}
//                         onCheckedChange={(checked) => form.setValue("is_company_arranged", !!checked)}
//                       />
//                     <Label htmlFor="is_company_arranged">This trip is company arranged</Label>
//                   </div>
//                   {form.watch("is_company_arranged") && (
//                     <InputWithLabel label="Company Name" name="company_name" register={form.register} error={getError("company_name")} />
//                   )}
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Trip Cities / Stops</h2>
//                 {cityFields.map((field, index) => (
//                   <div key={field.id} className="space-y-4 border p-4 rounded-md mb-2">
//                     <h3 className="font-medium">City / Stop {index + 1}</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <InputWithLabel label="City Name" name={`trip_cities.${index}.name`} register={form.register} error={getError(`trip_cities.${index}.name`)} />
//                         <InputWithLabel label="Stay Name (Optional)" name={`trip_cities.${index}.stay_name`} register={form.register} error={getError(`trip_cities.${index}.stay_name`)} />
//                          <SelectWithLabel
//                             control={form.control}
//                             name={`trip_cities.${index}.zoneType`}
//                             label="Zone Type"
//                             options={zoneTypes.map(z => ({ value: z, label: z }))}
//                             error={getError(`trip_cities.${index}.zoneType`)}
//                             placeholder="Select zone type"
//                         />
//                     </div>
//                     {cityFields.length > 1 && (
//                       <Button type="button" variant="destructive" size="sm" onClick={() => removeCity(index)}>Remove City</Button>
//                     )}
//                   </div>
//                 ))}
//                 <Button type="button" variant="outline" onClick={() => appendCity({ name: "", stay_name: "", zoneType: "GREEN" })}>Add City/Stop</Button>
//                 {getError("trip_cities") && <p className="text-red-500 text-sm">{getError("trip_cities")?.message || getError("trip_cities.root")?.message}</p>}
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} error={getError("emergency_contact_name")} />
//                   <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} error={getError("emergency_contact_phone")} />
//                   <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} error={getError("emergency_contact_relation")} />
//                 </div>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="medical_conditions"
//                     label="Medical Conditions (comma-separated)"
//                     error={getError("medical_conditions")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="current_medications"
//                     label="Current Medications (comma-separated)"
//                     error={getError("current_medications")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="allergies"
//                     label="Allergies (comma-separated)"
//                     error={getError("allergies")}
//                   />
//                   <TextareaWithLabel label="Special Assistance (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Risk Zone Exposure (Days)</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" error={getError("green_zone_days")} />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" error={getError("amber_zone_days")} />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" error={getError("red_zone_days")} />
//                   <InputWithLabel label="Black Zone Days (Optional)" name="black_zone_days" register={form.register} type="number" error={getError("black_zone_days")} />
//                 </div>

//                 <div className="flex items-start space-x-2 pt-4">
//                   <Checkbox
//                     id="consent"
//                     {...form.register("consent")}
//                     checked={form.watch("consent")}
//                     onCheckedChange={(checked) => form.setValue("consent", checked === true ? true : undefined, {shouldValidate: true})}
//                   />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium">
//                       I consent to the use of my medical information in an emergency.
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       You must agree to this to proceed.
//                     </p>
//                   </div>
//                 </div>
//                 {getError("consent") && (
//                   <p className="text-red-500 text-sm">{getError("consent")?.message}</p>
//                 )}
//               </>
//             )}

//             <div className="flex justify-between pt-6">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep} className="w-76 px-6">
//                   Back
//                 </Button>
//               )}
//               {step === 0 && <div />}
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep} className="w-76 px-6">
//                   Next
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-76 px-6" disabled={form.formState.isSubmitting}>
//                   {form.formState.isSubmitting ? "Submitting..." : "Submit"}
//                 </Button>
//               )}
//             </div>
//           </form>

//           <div className="hidden md:block mt-6">
//             <div className="bg-white border border-input p-6 min-h-[400px] flex flex-col rounded-md shadow-sm">
//               <h3 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Quote Summary</h3>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="font-semibold">Traveling To</p>
//                   <p className="text-gray-500">{form.watch("trip_countries.0") || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Travelers</p>
//                   <p className="text-gray-500">{form.watch("travellers")?.length || 1}</p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Travel Dates</p>
//                   <p className="text-gray-500">
//                     {form.watch("trip_start_date") || "N/A"} - {form.watch("trip_end_date") || "N/A"}
//                   </p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Primary Applicant Age</p>
//                   <p className="text-gray-500">
//                     {form.watch("c_birthdate") && !isNaN(new Date(form.watch("c_birthdate")).getFullYear())
//                       ? new Date().getFullYear() - new Date(form.watch("c_birthdate")).getFullYear()
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Base Price</p>
//                 <p className="text-gray-500">$100 (Example)</p>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Total Price</p>
//                 <p className="text-lg font-bold text-[#1A2C50]">$200 (Example)</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface InputWithLabelProps {
//   label: string;
//   name: string;
//   register: UseFormRegister<InsuranceFormValues>;
//   type?: string;
//   error?: FieldError | { root?: { message?: string } };
// }

// function InputWithLabel({ label, name, register, type = "text", error }: InputWithLabelProps) {
//   const errorMessage = error && ('message' in error ? error.message : ('root' in error && error.root?.message));
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Input id={name} {...register(name as any, {
//           setValueAs: (value) => (type === "number" && value !== "" ? Number(value) : value)
//       })} type={type} className={cn(errorMessage ? "border-red-500" : "", type !== "date" && type !== "checkbox" ? "rounded-none" : "")} />
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

// function TextareaWithLabel({ label, name, register, error }: TextareaWithLabelProps) {
//   return (
//     <div className="space-y-1">
//       <Label htmlFor={name}>{label}</Label>
//       <Textarea id={name} {...register(name as any)} className={cn(error ? "border-red-500" : "", "rounded-none")} />
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

// function ControlledTextareaArray({ control, name, label, error }: ControlledTextareaArrayProps) {
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
//             className={cn(errorMessage ? "border-red-500" : "", "rounded-none")}
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

// function SelectWithLabel({ control, name, label, options, placeholder, error }: SelectWithLabelProps) {
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
//                                 error ? "border-red-500" : "",
//                                 "rounded-none"
//                             )}
//                         >
//                             <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-none">
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

// "use client";

// import { useState } from "react";
// import { useForm, useFieldArray, Controller, FieldError } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//     purchaseWithoutLoginSchema,
//     type InsuranceFormValues,
//     steps,
//     tripPurposes,
//     zoneTypes,
//     fieldsByStep
// } from "@/lib/insuranceFormSchema";
// import {
//     InputWithLabel,
//     TextareaWithLabel,
//     ControlledTextareaArray,
//     SelectWithLabel
// } from "./FormFields"; // Assuming FormFields is in the same directory

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: joiResolver(purchaseWithoutLoginSchema, {
//       abortEarly: false,
//     }),
//     defaultValues: {
//       c_name: "",
//       c_email: "",
//       c_phone: "",
//       c_whats_app: "",
//       c_birthdate: "",
//       c_address: "",
//       c_country: "",
//       c_nationality: "",
//       c_organization: "",
//       trip_start_date: "",
//       trip_end_date: "",
//       stay_name: "",
//       is_company_arranged: false,
//       company_name: "",
//       trip_countries: [],
//       trip_cities: [{ name: "", stay_name: "", zoneType: "GREEN" }],
//       trip_purpose: "",
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_relation: "",
//       consent: undefined,
//       travellers: [{ name: "", birthdate: "" }],
//       medical_conditions: [],
//       current_medications: [],
//       allergies: [],
//       blood_type: "",
//       special_assistance: "",
//       green_zone_days: 0,
//       amber_zone_days: 0,
//       red_zone_days: 0,
//       black_zone_days: 0,
//     },
//   });

//   const { fields: travellerFields, append: appendTraveller, remove: removeTraveller } = useFieldArray({
//     control: form.control,
//     name: "travellers",
//   });

//   const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray({
//     control: form.control,
//     name: "trip_cities",
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     const parsedData = {
//         ...data,
//         green_zone_days: Number(data.green_zone_days),
//         amber_zone_days: Number(data.amber_zone_days),
//         red_zone_days: Number(data.red_zone_days),
//         black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//         medical_conditions: data.medical_conditions?.filter(item => item && item.trim() !== ""),
//         current_medications: data.current_medications?.filter(item => item && item.trim() !== ""),
//         allergies: data.allergies?.filter(item => item && item.trim() !== ""),
//     };
//     console.log("Form Data Submitted:", parsedData);
//   };

//   const nextStep = async () => {
//     const currentStepFields = fieldsByStep[step];
//     const result = await form.trigger(currentStepFields as any);

//     if (!result) {
//         const firstErrorField = currentStepFields.find(fieldName => {
//             const keys = fieldName.split('.');
//             let error = form.formState.errors as any;
//             for (const key of keys) {
//                 if (error && typeof error === 'object' && key in error) {
//                     error = error[key];
//                 } else if (error && Array.isArray(error) && !isNaN(Number(key)) && Number(key) < error.length) {
//                      error = error[Number(key)];
//                 }
//                 else {
//                     error = undefined;
//                     break;
//                 }
//             }
//             return !!error;
//         });

//         if (firstErrorField) {
//             const element = document.querySelector(`[name='${firstErrorField}']`) || document.getElementById(firstErrorField);
//             element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       return;
//     }

//     if (step < steps.length - 1) {
//        setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error = form.formState.errors as any;
//     try {
//         for (const key of keys) {
//             if (error && typeof error === 'object' && key in error) {
//                 error = error[key];
//             } else if (error && Array.isArray(error) && !isNaN(Number(key)) && Number(key) < error.length) {
//                  error = error[Number(key)];
//             }
//             else {
//                 return undefined;
//             }
//         }
//         return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//     } catch (e) {
//         console.warn(`Error accessing field error for ${fieldName}:`, e);
//         return undefined;
//     }
// };


//   return (
//     <div className="flex justify-center px-4 py-10 bg-gray-100">
//       <div className="w-full max-w-4xl">
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
//                     ? "bg-[#1A2C50] text-white"
//                     : "bg-[#00BBD3] text-white"
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="h-2 bg-[#00BBD3] rounded-full">
//             <div
//               className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {step === 0 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
//                   <InputWithLabel label="Email" name="c_email" register={form.register} type="email" error={getError("c_email")} />
//                   <InputWithLabel label="Phone" name="c_phone" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" error={getError("c_birthdate")} />
//                   <InputWithLabel label="Address" name="c_address" register={form.register} error={getError("c_address")} />
//                   <InputWithLabel label="Residence Country" name="c_country" register={form.register} error={getError("c_country")} />
//                   <InputWithLabel label="Nationality" name="c_nationality" register={form.register} error={getError("c_nationality")} />
//                   <InputWithLabel label="Organization (Optional)" name="c_organization" register={form.register} error={getError("c_organization")} />
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Travellers</h2>
//                 {travellerFields.map((field, index) => (
//                   <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border p-4 mb-2">
//                     <InputWithLabel label={`Traveller ${index + 1} Name`} name={`travellers.${index}.name`} register={form.register} error={getError(`travellers.${index}.name`)} />
//                     <InputWithLabel label="Birthdate" name={`travellers.${index}.birthdate`} register={form.register} type="date" error={getError(`travellers.${index}.birthdate`)} />
//                     {travellerFields.length > 1 && (
//                       <Button type="button" variant="destructive" onClick={() => removeTraveller(index)} className="h-10">Remove</Button>
//                     )}
//                   </div>
//                 ))}
//                  <Button type="button" variant="outline" onClick={() => appendTraveller({ name: "", birthdate: "" })}>Add Traveller</Button>
//                  {getError("travellers") && <p className="text-red-500 text-sm">{getError("travellers")?.message || getError("travellers.root")?.message}</p>}
//               </>
//             )}

//             {step === 1 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Trip Start Date" name="trip_start_date" register={form.register} type="date" error={getError("trip_start_date")} />
//                   <InputWithLabel label="Trip End Date" name="trip_end_date" register={form.register} type="date" error={getError("trip_end_date")} />
//                   <InputWithLabel label="Primary Destination Country" name="trip_countries.0" register={form.register} error={getError("trip_countries.0") || getError("trip_countries") || getError("trip_countries.root")} />
//                   <SelectWithLabel
//                     control={form.control}
//                     name="trip_purpose"
//                     label="Trip Purpose"
//                     options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))}
//                     error={getError("trip_purpose")}
//                     placeholder="Select trip purpose"
//                   />
//                   <InputWithLabel label="Stay Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} />
//                   <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
//                      <Checkbox
//                         id="is_company_arranged"
//                         {...form.register("is_company_arranged")}
//                         checked={form.watch("is_company_arranged")}
//                         onCheckedChange={(checked) => form.setValue("is_company_arranged", !!checked)}
//                       />
//                     <Label htmlFor="is_company_arranged">This trip is company arranged</Label>
//                   </div>
//                   {form.watch("is_company_arranged") && (
//                     <InputWithLabel label="Company Name" name="company_name" register={form.register} error={getError("company_name")} />
//                   )}
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Trip Cities / Stops</h2>
//                 {cityFields.map((field, index) => (
//                   <div key={field.id} className="space-y-4 border p-4 mb-2">
//                     <h3 className="font-medium">City / Stop {index + 1}</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <InputWithLabel label="City Name" name={`trip_cities.${index}.name`} register={form.register} error={getError(`trip_cities.${index}.name`)} />
//                         <InputWithLabel label="Stay Name (Optional)" name={`trip_cities.${index}.stay_name`} register={form.register} error={getError(`trip_cities.${index}.stay_name`)} />
//                          <SelectWithLabel
//                             control={form.control}
//                             name={`trip_cities.${index}.zoneType`}
//                             label="Zone Type"
//                             options={zoneTypes.map(z => ({ value: z, label: z }))}
//                             error={getError(`trip_cities.${index}.zoneType`)}
//                             placeholder="Select zone type"
//                         />
//                     </div>
//                     {cityFields.length > 1 && (
//                       <Button type="button" variant="destructive" size="sm" onClick={() => removeCity(index)}>Remove City</Button>
//                     )}
//                   </div>
//                 ))}
//                 <Button type="button" variant="outline" onClick={() => appendCity({ name: "", stay_name: "", zoneType: "GREEN" })}>Add City/Stop</Button>
//                 {getError("trip_cities") && <p className="text-red-500 text-sm">{getError("trip_cities")?.message || getError("trip_cities.root")?.message}</p>}
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} error={getError("emergency_contact_name")} />
//                   <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} error={getError("emergency_contact_phone")} />
//                   <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} error={getError("emergency_contact_relation")} />
//                 </div>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="medical_conditions"
//                     label="Medical Conditions (comma-separated)"
//                     error={getError("medical_conditions")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="current_medications"
//                     label="Current Medications (comma-separated)"
//                     error={getError("current_medications")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="allergies"
//                     label="Allergies (comma-separated)"
//                     error={getError("allergies")}
//                   />
//                   <TextareaWithLabel label="Special Assistance (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Risk Zone Exposure (Days)</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" error={getError("green_zone_days")} />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" error={getError("amber_zone_days")} />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" error={getError("red_zone_days")} />
//                   <InputWithLabel label="Black Zone Days (Optional)" name="black_zone_days" register={form.register} type="number" error={getError("black_zone_days")} />
//                 </div>

//                 <div className="flex items-start space-x-2 pt-4">
//                    <Controller
//                         name="consent"
//                         control={form.control}
//                         render={({ field }) => (
//                            <Checkbox
//                                 id="consent"
//                                 checked={field.value === true}
//                                 onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)}
//                                 onBlur={field.onBlur} // Important for touched state
//                            />
//                         )}
//                     />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium">
//                       I consent to the use of my medical information in an emergency.
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       You must agree to this to proceed.
//                     </p>
//                   </div>
//                 </div>
//                 {getError("consent") && (
//                   <p className="text-red-500 text-sm">{getError("consent")?.message}</p>
//                 )}
//               </>
//             )}

//             <div className="flex justify-between pt-6">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep} className="w-76 px-6">
//                   Back
//                 </Button>
//               )}
//               {step === 0 && <div />}
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep} className="w-76 px-6">
//                   Next
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-76 px-6" disabled={form.formState.isSubmitting}>
//                   {form.formState.isSubmitting ? "Submitting..." : "Submit"}
//                 </Button>
//               )}
//             </div>
//           </form>

//           <div className="hidden md:block mt-6">
//             <div className="bg-white border border-input p-6 min-h-[400px] flex flex-col rounded-md shadow-sm">
//               <h3 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Quote Summary</h3>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="font-semibold">Traveling To</p>
//                   <p className="text-gray-500">{form.watch("trip_countries.0") || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Travelers</p>
//                   <p className="text-gray-500">{form.watch("travellers")?.length || 1}</p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Travel Dates</p>
//                   <p className="text-gray-500">
//                     {form.watch("trip_start_date") || "N/A"} - {form.watch("trip_end_date") || "N/A"}
//                   </p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Applicant Age</p>
//                   <p className="text-gray-500">
//                     {form.watch("c_birthdate") && !isNaN(new Date(form.watch("c_birthdate")).getFullYear())
//                       ? new Date().getFullYear() - new Date(form.watch("c_birthdate")).getFullYear()
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Base Price</p>
//                 <p className="text-gray-500">$100</p>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Total Price</p>
//                 <p className="text-lg font-bold text-[#1A2C50]">$200</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useForm, useFieldArray, Controller, FieldError, FieldErrors } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//     purchaseWithoutLoginSchema,
//     type InsuranceFormValues,
//     steps,
//     tripPurposes,
//     zoneTypes,
//     fieldsByStep
// } from "@/lib/insuranceFormSchema";
// import {
//     InputWithLabel,
//     TextareaWithLabel,
//     ControlledTextareaArray,
//     SelectWithLabel
// } from "./FormFields"; // Assuming FormFields is in the same directory

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: joiResolver(purchaseWithoutLoginSchema, {
//       abortEarly: false,
//     }),
//     defaultValues: {
//       c_name: "",
//       c_email: "",
//       c_phone: "",
//       c_whats_app: "",
//       c_birthdate: "",
//       c_address: "",
//       c_country: "",
//       c_nationality: "",
//       c_organization: "",
//       trip_start_date: "",
//       trip_end_date: "",
//       stay_name: "",
//       is_company_arranged: false,
//       company_name: "",
//       trip_countries: [],
//       trip_cities: [{ name: "", stay_name: "", zoneType: "GREEN" }],
//       trip_purpose: "",
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_relation: "",
//       consent: undefined,
//       travellers: [{ name: "", birthdate: "" }],
//       medical_conditions: [],
//       current_medications: [],
//       allergies: [],
//       blood_type: "",
//       special_assistance: "",
//       green_zone_days: 0,
//       amber_zone_days: 0,
//       red_zone_days: 0,
//       black_zone_days: 0,
//     },
//   });

//   const { fields: travellerFields, append: appendTraveller, remove: removeTraveller } = useFieldArray({
//     control: form.control,
//     name: "travellers",
//   });

//   const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray({
//     control: form.control,
//     name: "trip_cities",
//   });

//   const onSubmit = (data: InsuranceFormValues) => {
//     const parsedData = {
//         ...data,
//         green_zone_days: Number(data.green_zone_days),
//         amber_zone_days: Number(data.amber_zone_days),
//         red_zone_days: Number(data.red_zone_days),
//         black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//         medical_conditions: data.medical_conditions?.filter(item => item && item.trim() !== ""),
//         current_medications: data.current_medications?.filter(item => item && item.trim() !== ""),
//         allergies: data.allergies?.filter(item => item && item.trim() !== ""),
//     };
//     console.log("Form Data Submitted:", parsedData);
//   };

//   const nextStep = async () => {
//     const currentStepFields = fieldsByStep[step];
//     const result = await form.trigger(currentStepFields as Array<keyof InsuranceFormValues>);

//     if (!result) {
//         const firstErrorField = currentStepFields.find(fieldName => {
//             const keys = fieldName.split('.');
//             let error: FieldErrors | FieldError | undefined = form.formState.errors;
//             for (const key of keys) {
//                 if (error && typeof error === 'object' && key in error) {
//                   error = (error as FieldErrors)[key];
//                 } else if (error && Array.isArray(error) && !isNaN(Number(key)) && Number(key) < error.length) {
//                      error = error[Number(key)];
//                 }
//                 else {
//                     error = undefined;
//                     break;
//                 }
//             }
//             return !!error;
//         });

//         if (firstErrorField) {
//             const element = document.querySelector(`[name='${firstErrorField}']`) || document.getElementById(firstErrorField);
//             element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       return;
//     }

//     if (step < steps.length - 1) {
//        setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error: FieldErrors | FieldError | undefined = form.formState.errors;
//     try {
//         for (const key of keys) {
//             if (error && typeof error === 'object' && key in error) {
//               error = (error as FieldErrors)[key];
//               } else if (error && Array.isArray(error) && !isNaN(Number(key)) && Number(key) < error.length) {
//                  error = error[Number(key)];
//             }
//             else {
//                 return undefined;
//             }
//         }
//         return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//     } catch (e) {
//         console.warn(`Error accessing field error for ${fieldName}:`, e);
//         return undefined;
//     }
// };


//   return (
//     <div className="flex justify-center px-4 py-10 bg-gray-100">
//       <div className="w-full max-w-4xl">
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
//                     ? "bg-[#1A2C50] text-white"
//                     : "bg-[#00BBD3] text-white"
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="h-2 bg-[#00BBD3] rounded-full">
//             <div
//               className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {step === 0 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
//                   <InputWithLabel label="Email" name="c_email" register={form.register} type="email" error={getError("c_email")} />
//                   <InputWithLabel label="Phone" name="c_phone" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp" name="c_whats_app" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Birthdate" name="c_birthdate" register={form.register} type="date" error={getError("c_birthdate")} />
//                   <InputWithLabel label="Address" name="c_address" register={form.register} error={getError("c_address")} />
//                   <InputWithLabel label="Residence Country" name="c_country" register={form.register} error={getError("c_country")} />
//                   <InputWithLabel label="Nationality" name="c_nationality" register={form.register} error={getError("c_nationality")} />
//                   <InputWithLabel label="Organization (Optional)" name="c_organization" register={form.register} error={getError("c_organization")} />
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Travellers</h2>
//                 {travellerFields.map((field, index) => (
//                   <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border p-4 mb-2">
//                     <InputWithLabel label={`Traveller ${index + 1} Name`} name={`travellers.${index}.name`} register={form.register} error={getError(`travellers.${index}.name`)} />
//                     <InputWithLabel label="Birthdate" name={`travellers.${index}.birthdate`} register={form.register} type="date" error={getError(`travellers.${index}.birthdate`)} />
//                     {travellerFields.length > 1 && (
//                       <Button type="button" variant="destructive" onClick={() => removeTraveller(index)} className="h-10">Remove</Button>
//                     )}
//                   </div>
//                 ))}
//                  <Button type="button" variant="outline" onClick={() => appendTraveller({ name: "", birthdate: "" })}>Add Traveller</Button>
//                  {getError("travellers") && <p className="text-red-500 text-sm">{getError("travellers")?.message || getError("travellers.root")?.message}</p>}
//               </>
//             )}

//             {step === 1 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Trip Start Date" name="trip_start_date" register={form.register} type="date" error={getError("trip_start_date")} />
//                   <InputWithLabel label="Trip End Date" name="trip_end_date" register={form.register} type="date" error={getError("trip_end_date")} />
//                   <InputWithLabel label="Primary Destination Country" name="trip_countries.0" register={form.register} error={getError("trip_countries.0") || getError("trip_countries") || getError("trip_countries.root")} />
//                   <SelectWithLabel
//                     control={form.control}
//                     name="trip_purpose"
//                     label="Trip Purpose"
//                     options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))}
//                     error={getError("trip_purpose")}
//                     placeholder="Select trip purpose"
//                   />
//                   <InputWithLabel label="Stay Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} />
//                   <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
//                      <Checkbox
//                         id="is_company_arranged"
//                         {...form.register("is_company_arranged")}
//                         checked={form.watch("is_company_arranged")}
//                         onCheckedChange={(checked) => form.setValue("is_company_arranged", !!checked)}
//                       />
//                     <Label htmlFor="is_company_arranged">This trip is company arranged</Label>
//                   </div>
//                   {form.watch("is_company_arranged") && (
//                     <InputWithLabel label="Company Name" name="company_name" register={form.register} error={getError("company_name")} />
//                   )}
//                 </div>

//                 <h2 className="text-xl font-semibold my-4 pt-4 border-t">Trip Cities / Stops</h2>
//                 {cityFields.map((field, index) => (
//                   <div key={field.id} className="space-y-4 border p-4 mb-2">
//                     <h3 className="font-medium">City / Stop {index + 1}</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <InputWithLabel label="City Name" name={`trip_cities.${index}.name`} register={form.register} error={getError(`trip_cities.${index}.name`)} />
//                         <InputWithLabel label="Stay Name (Optional)" name={`trip_cities.${index}.stay_name`} register={form.register} error={getError(`trip_cities.${index}.stay_name`)} />
//                          <SelectWithLabel
//                             control={form.control}
//                             name={`trip_cities.${index}.zoneType`}
//                             label="Zone Type"
//                             options={zoneTypes.map(z => ({ value: z, label: z }))}
//                             error={getError(`trip_cities.${index}.zoneType`)}
//                             placeholder="Select zone type"
//                         />
//                     </div>
//                     {cityFields.length > 1 && (
//                       <Button type="button" variant="destructive" size="sm" onClick={() => removeCity(index)}>Remove City</Button>
//                     )}
//                   </div>
//                 ))}
//                 <Button type="button" variant="outline" onClick={() => appendCity({ name: "", stay_name: "", zoneType: "GREEN" })}>Add City/Stop</Button>
//                 {getError("trip_cities") && <p className="text-red-500 text-sm">{getError("trip_cities")?.message || getError("trip_cities.root")?.message}</p>}
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Emergency Contact Name" name="emergency_contact_name" register={form.register} error={getError("emergency_contact_name")} />
//                   <InputWithLabel label="Emergency Phone" name="emergency_contact_phone" register={form.register} error={getError("emergency_contact_phone")} />
//                   <InputWithLabel label="Relation" name="emergency_contact_relation" register={form.register} error={getError("emergency_contact_relation")} />
//                 </div>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="medical_conditions"
//                     label="Medical Conditions (comma-separated)"
//                     error={getError("medical_conditions")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="current_medications"
//                     label="Current Medications (comma-separated)"
//                     error={getError("current_medications")}
//                   />
//                   <ControlledTextareaArray
//                     control={form.control}
//                     name="allergies"
//                     label="Allergies (comma-separated)"
//                     error={getError("allergies")}
//                   />
//                   <TextareaWithLabel label="Special Assistance (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Risk Zone Exposure (Days)</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" register={form.register} type="number" error={getError("green_zone_days")} />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" register={form.register} type="number" error={getError("amber_zone_days")} />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" register={form.register} type="number" error={getError("red_zone_days")} />
//                   <InputWithLabel label="Black Zone Days (Optional)" name="black_zone_days" register={form.register} type="number" error={getError("black_zone_days")} />
//                 </div>

//                 <div className="flex items-start space-x-2 pt-4">
//                    <Controller
//                         name="consent"
//                         control={form.control}
//                         render={({ field }) => (
//                            <Checkbox
//                                 id="consent"
//                                 checked={field.value === true}
//                                 onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)}
//                                 onBlur={field.onBlur} // Important for touched state
//                            />
//                         )}
//                     />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium">
//                       I consent to the use of my medical information in an emergency.
//                     </Label>
//                     <p className="text-sm text-muted-foreground">
//                       You must agree to this to proceed.
//                     </p>
//                   </div>
//                 </div>
//                 {getError("consent") && (
//                   <p className="text-red-500 text-sm">{getError("consent")?.message}</p>
//                 )}
//               </>
//             )}

//             <div className="flex justify-between pt-6">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep} className="w-76 px-6">
//                   Back
//                 </Button>
//               )}
//               {step === 0 && <div />}
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep} className="w-76 px-6">
//                   Next
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-76 px-6" disabled={form.formState.isSubmitting}>
//                   {form.formState.isSubmitting ? "Submitting..." : "Submit"}
//                 </Button>
//               )}
//             </div>
//           </form>

//           <div className="hidden md:block mt-6">
//             <div className="bg-white border border-input p-6 min-h-[400px] flex flex-col rounded-md shadow-sm">
//               <h3 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Quote Summary</h3>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="font-semibold">Traveling To</p>
//                   <p className="text-gray-500">{form.watch("trip_countries.0") || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Travelers</p>
//                   <p className="text-gray-500">{form.watch("travellers")?.length || 1}</p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Travel Dates</p>
//                   <p className="text-gray-500">
//                     {form.watch("trip_start_date") || "N/A"} - {form.watch("trip_end_date") || "N/A"}
//                   </p>
//                 </div>
//                 <div className="col-span-2 mt-4">
//                   <p className="font-semibold">Applicant Age</p>
//                   <p className="text-gray-500">
//                     {form.watch("c_birthdate") && !isNaN(new Date(form.watch("c_birthdate")).getFullYear())
//                       ? new Date().getFullYear() - new Date(form.watch("c_birthdate")).getFullYear()
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Base Price</p>
//                 <p className="text-gray-500">$100</p>
//               </div>
//               <hr className="my-6 border-t-2 border-[#00BBD3]" />
//               <div className="text-sm space-y-2">
//                 <p className="font-semibold">Total Price</p>
//                 <p className="text-lg font-bold text-[#1A2C50]">$200</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//     purchaseWithoutLoginSchema,
//     type InsuranceFormValues,
//     steps, // Updated step names
//     tripPurposes,
//     // zoneTypes, // Not directly used in UI inputs now for selection
//     fieldsByStep, // Updated field mapping
//     कवरेजस्तरOptions, // coverageLevelOptions
//     nationalityOptions,
//     countryOptions,
// } from "@/lib/insuranceFormSchema";
// import {
//     InputWithLabel,
//     TextareaWithLabel,
//     ControlledTextareaArray,
//     SelectWithLabel
// } from "./FormFields";

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);

//   const form = useForm<InsuranceFormValues>({
//     resolver: joiResolver(purchaseWithoutLoginSchema, {
//       abortEarly: false,
//     }),
//     defaultValues: {
//       // Page 1
//       trip_start_date: "",
//       trip_end_date: "",
//       green_zone_days: 0,
//       amber_zone_days: 0,
//       red_zone_days: 0,
//       black_zone_days: 0, // For reference
//       coverage_level: "",
//       add_transit_coverage: false,
//       add_personal_accident_coverage: false,
//       // Page 2
//       c_name: "",
//       c_birthdate: "",
//       c_phone: "",
//       c_whats_app: "",
//       c_email: "",
//       c_nationality: "",
//       city_of_residence: "",
//       trip_countries: [], // Will hold one country
//       // Page 3
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_purpose: "",
//       stay_name: "",
//       company_name: "",
//       // Page 4
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_relation: "",
//       has_medical_conditions: false,
//       has_allergies: false,
//       has_current_medications: false,
//       medical_conditions: [],
//       allergies: [],
//       current_medications: [],
//       blood_type: "",
//       special_assistance: "",
//       // Page 5
//       affiliate_code: "",
//       consent: undefined,
//       // Legacy/Internal (some defaults set in schema)
//       c_organization: "",
//       travellers: [{ name: "", birthdate: ""}], // Will be populated by c_name, c_birthdate
//       is_company_arranged: false,
//       trip_cities: [], // Not directly part of new UI input flow
//     },
//   });

//   // Update traveller name and birthdate when c_name or c_birthdate changes
//   // This assumes a single traveller based on the new UI ("Your Details")
//   const cNameValue = form.watch("c_name");
//   const cBirthdateValue = form.watch("c_birthdate");

//   useEffect(() => {
//     if (form.getValues("travellers").length > 0) {
//         form.setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 }); // Validate if on relevant step
//         form.setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 });
//     } else if (cNameValue || cBirthdateValue) { // Initialize if empty and values exist
//         form.setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || ""}]);
//     }
//   }, [cNameValue, cBirthdateValue, form, step]);


//   const onSubmit = (data: InsuranceFormValues) => {
//     // Ensure the single traveller data is correctly set from c_name and c_birthdate
//     const finalData = {
//         ...data,
//         travellers: [{ name: data.c_name, birthdate: data.c_birthdate }],
//         green_zone_days: Number(data.green_zone_days),
//         amber_zone_days: Number(data.amber_zone_days),
//         red_zone_days: Number(data.red_zone_days),
//         black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//         medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//         allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//         current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//     };
//     console.log("Form Data Submitted:", finalData);
//     alert("Form submitted! Check console.");
//   };

//   const nextStep = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const result = await form.trigger(currentStepFields);

//     if (!result) {
//         const firstErrorKey = currentStepFields.find(
//             (fieldName) => getError(fieldName as string)
//         );
//         if (firstErrorKey) {
//             const element = document.querySelector(`[name='${firstErrorKey}']`) || document.getElementById(firstErrorKey as string);
//             element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       return;
//     }

//     if (step < steps.length - 1) {
//        setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   // const getError = (fieldName: string): FieldError | undefined => {
//   //   const keys = fieldName.split('.');
//   //   let error: FieldErrors | FieldError | undefined = form.formState.errors;
//   //   try {
//   //       for (const key of keys) {
//   //            const k = key.match(/^\d+$/) ? parseInt(key, 10) : key; // Handle array indices
//   //           if (error && typeof error === 'object' && k in error) {
//   //               error = (error as any)[k];
//   //           } else {
//   //               return undefined;
//   //           }
//   //       }
//   //       return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//   //   } catch (e) {
//   //       console.warn(`Error accessing field error for ${fieldName}:`, e);
//   //       return undefined;
//   //   }
//   // };
//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error: FieldErrors | FieldError | undefined = form.formState.errors;
  
//     try {
//       for (const key of keys) {
//         const k = key.match(/^\d+$/) ? parseInt(key, 10) : key;
  
//         if (error && typeof error === 'object' && error !== null) {
//           const typedError = error as Record<string | number, unknown>;
//           if (k in typedError) {
//             error = typedError[k] as FieldErrors | FieldError;
//           } else {
//             return undefined;
//           }
//         } else {
//           return undefined;
//         }
//       }
  
//       return (error && typeof error === 'object' && 'message' in error)
//         ? error as FieldError
//         : undefined;
//     } catch (e) {
//       console.warn(`Error accessing field error for ${fieldName}:`, e);
//       return undefined;
//     }
//   };
  
//   const calculateAge = (birthdate: string) => {
//     if (!birthdate) return "";
//     const birthDate = new Date(birthdate);
//     if (isNaN(birthDate.getTime())) return "";
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age >= 0 ? age.toString() : "";
//   };

//   const watchedTripStartDate = form.watch("trip_start_date");
//   const watchedTripEndDate = form.watch("trip_end_date");
//   const watchedGreenDays = form.watch("green_zone_days");
//   const watchedAmberDays = form.watch("amber_zone_days");
//   const watchedRedDays = form.watch("red_zone_days");
//   const watchedCoverageLevel = form.watch("coverage_level");
//   const watchedTransit = form.watch("add_transit_coverage");
//   const watchedPA = form.watch("add_personal_accident_coverage");
//   const watchedFullName = form.watch("c_name");
//   const watchedBirthdate = form.watch("c_birthdate");
//   const watchedNationality = form.watch("c_nationality");
//   const watchedTripPurpose = form.watch("trip_purpose");
//   const watchedPrimaryCitiesRegions = form.watch("primary_cities_regions_ukraine");
//   const watchedEmergencyName = form.watch("emergency_contact_name");
//   const watchedEmergencyPhone = form.watch("emergency_contact_phone");


//   const getCoverageLabel = (value: string) => {
//     return कवरेजस्तरOptions.find(opt => opt.value === value)?.label || value;
//   };
//   const getTripPurposeLabel = (value: string) => {
//     const purpose = tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value);
//     return purpose?.label || value;
//   };
//    const getNationalityLabel = (value: string) => {
//     return nationalityOptions.find(opt => opt.value === value)?.label || value;
//   };


//   return (
//     <div className="flex justify-center px-4 py-10 bg-gray-100">
//       <div className="w-full max-w-4xl">
//         {/* Stepper */}
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
//                     ? "bg-[#1A2C50] text-white"
//                     : "bg-[#00BBD3] text-white"
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="h-2 bg-[#00BBD3] rounded-full">
//             <div
//               className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Form Content Area */}
//         <div className="bg-white p-6 md:p-8 shadow-lg rounded-md">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             {/* Page 1: Trip & Coverage */}
//             {step === 0 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Where and When Are You Travelling?</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel label="Travel Start Date" name="trip_start_date" type="date" register={form.register} error={getError("trip_start_date")} />
//                   <InputWithLabel label="Travel End Date" name="trip_end_date" type="date" register={form.register} error={getError("trip_end_date")} />
//                 </div>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Risk Zone Days:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" type="number" register={form.register} error={getError("green_zone_days")} />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" type="number" register={form.register} error={getError("amber_zone_days")} />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" type="number" register={form.register} error={getError("red_zone_days")} />
//                 </div>
//                 <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {form.watch("black_zone_days") || 0})</p>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel
//                     label="Coverage Level"
//                     name="coverage_level"
//                     control={form.control}
//                     options={कवरेजस्तरOptions}
//                     placeholder="Select Coverage Amount"
//                     error={getError("coverage_level")}
//                   />
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_transit_coverage" control={form.control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_transit_coverage">Add Transit Coverage (10-day Europe)</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_personal_accident_coverage" control={form.control} render={({ field }) => <Checkbox id="add_personal_accident_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_personal_accident_coverage">Add Personal Accident Coverage (PA)</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
//                 </div>
//               </>
//             )}

//             {/* Page 2: Your Details */}
//             {step === 1 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Your Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
//                   <InputWithLabel label="Date of Birth" name="c_birthdate" type="date" register={form.register} error={getError("c_birthdate")} />
//                   <InputWithLabel label="Phone Number" name="c_phone" type="tel" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp (optional)" name="c_whats_app" type="tel" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Email Address" name="c_email" type="email" register={form.register} error={getError("c_email")} />
//                   <SelectWithLabel
//                     label="Nationality"
//                     name="c_nationality"
//                     control={form.control}
//                     options={nationalityOptions} // Replace with your actual options
//                     placeholder="Select Nationality"
//                     error={getError("c_nationality")}
//                   />
//                    <InputWithLabel label="City of Residence" name="city_of_residence" register={form.register} error={getError("city_of_residence")} />
//                    <SelectWithLabel
//                     label="Country Travelling To"
//                     name="trip_countries.0" // Targets the first element of the array
//                     control={form.control}
//                     options={countryOptions} // Replace with your actual country options
//                     placeholder="Select Country"
//                     error={getError("trip_countries.0") || getError("trip_countries")}
//                   />
//                 </div>
//               </>
//             )}

//             {/* Page 3: Trip Information */}
//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Arrival in Ukraine" name="arrival_in_ukraine" type="date" register={form.register} error={getError("arrival_in_ukraine")} />
//                   <InputWithLabel label="Departure from Ukraine" name="departure_from_ukraine" type="date" register={form.register} error={getError("departure_from_ukraine")} />
//                 </div>
//                 <div className="mt-6">
//                   <InputWithLabel label="Primary Cities/Regions (in Ukraine)" name="primary_cities_regions_ukraine" register={form.register} error={getError("primary_cities_regions_ukraine")} />
//                 </div>
//                 <div className="mt-6">
//                   <SelectWithLabel
//                     label="Purpose of Travel"
//                     name="trip_purpose"
//                     control={form.control}
//                     options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))}
//                     placeholder="Select Purpose"
//                     error={getError("trip_purpose")}
//                   />
//                 </div>
//                 <div className="mt-6">
//                   <InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} />
//                 </div>
//                 <div className="mt-6">
//                   <InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={form.register} error={getError("company_name")} />
//                 </div>
//                 <p className="mt-6 text-sm text-orange-600"><span className="font-bold">⚠ Ensure your zone-day breakdown matches Page 1</span></p>
//               </>
//             )}

//             {/* Page 4: Medical & Emergency Contact */}
//             {step === 3 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Emergency Contact Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Contact Name" name="emergency_contact_name" register={form.register} error={getError("emergency_contact_name")} />
//                   <InputWithLabel label="Contact Number" name="emergency_contact_phone" type="tel" register={form.register} error={getError("emergency_contact_phone")} />
//                   <InputWithLabel label="Relationship" name="emergency_contact_relation" register={form.register} error={getError("emergency_contact_relation")} />
//                 </div>

//                 <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Optional Medical Info (Confidential):</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2">
//                     <Controller name="has_medical_conditions" control={form.control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label>
//                   </div>
//                   {form.watch("has_medical_conditions") && (
//                     <ControlledTextareaArray name="medical_conditions" control={form.control} label="List Conditions" error={getError("medical_conditions")} />
//                   )}
//                   <div className="flex items-center space-x-2">
//                      <Controller name="has_allergies" control={form.control} render={({ field }) => <Checkbox id="has_allergies" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="has_allergies">Allergies</Label>
//                   </div>
//                   {form.watch("has_allergies") && (
//                     <ControlledTextareaArray name="allergies" control={form.control} label="List Allergies" error={getError("allergies")} />
//                   )}
//                   <div className="flex items-center space-x-2">
//                     <Controller name="has_current_medications" control={form.control} render={({ field }) => <Checkbox id="has_current_medications" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="has_current_medications">Current Medications</Label>
//                   </div>
//                   {form.watch("has_current_medications") && (
//                     <ControlledTextareaArray name="current_medications" control={form.control} label="List Medications" error={getError("current_medications")} />
//                   )}
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                   <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {/* Page 5: Final Summary + Purchase */}
//             {step === 4 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
//                 <div className="space-y-4 p-6 bg-gray-50 rounded-md border">
//                     <div><strong>Travel Dates:</strong> {watchedTripStartDate || "N/A"} to {watchedTripEndDate || "N/A"}</div>
//                     <div><strong>Risk Zone Breakdown:</strong></div>
//                     <ul className="list-disc list-inside pl-4">
//                         <li>Green: {watchedGreenDays || 0} days</li>
//                         <li>Amber: {watchedAmberDays || 0} days</li>
//                         <li>Red: {watchedRedDays || 0} days</li>
//                     </ul>
//                     <div><strong>Coverage Selected:</strong></div>
//                     <ul className="list-disc list-inside pl-4">
//                         <li>Medical: {getCoverageLabel(watchedCoverageLevel) || "N/A"}</li>
//                         <li>PA: ${watchedPA ? "Amount_PA" : "0"} (Example)</li>
//                         <li>Transit: {watchedTransit ? "Yes" : "No"}</li>
//                     </ul>
//                     <div className="mt-4">
//                         <strong className="text-xl">Total Quote:</strong>
//                         <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                     </div>
//                 </div>

//                 <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Insured Details:</h3>
//                 <div className="space-y-2 p-6 bg-gray-50 rounded-md border">
//                     <div><strong>Name:</strong> {watchedFullName || "N/A"}</div>
//                     <div><strong>Age:</strong> {calculateAge(watchedBirthdate) || "N/A"}</div>
//                     <div><strong>Nationality:</strong> {getNationalityLabel(watchedNationality) || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Trip Information:</h3>
//                  <div className="space-y-2 p-6 bg-gray-50 rounded-md border">
//                     <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedTripPurpose) || "N/A"}</div>
//                     <div><strong>Primary Regions:</strong> {watchedPrimaryCitiesRegions || "N/A"}</div>
//                  </div>

//                 <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Emergency Contact:</h3>
//                  <div className="space-y-2 p-6 bg-gray-50 rounded-md border">
//                     <div><strong>Name:</strong> {watchedEmergencyName || "N/A"}</div>
//                     <div><strong>Number:</strong> {watchedEmergencyPhone || "N/A"}</div>
//                  </div>

//                 <div className="mt-8">
//                     <InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={form.register} error={getError("affiliate_code")} />
//                 </div>

//                 <div className="mt-8 flex items-start space-x-3">
//                    <Controller
//                         name="consent"
//                         control={form.control}
//                         render={({ field }) => (
//                            <Checkbox
//                                 id="consent"
//                                 checked={field.value === true}
//                                 onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)}
//                                 onBlur={field.onBlur}
//                            />
//                         )}
//                     />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">
//                       I consent to sharing medical info in an emergency
//                     </Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between pt-8 mt-8 border-t">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep} className="px-8 py-3 text-base">
//                   Back
//                 </Button>
//               )}
//               {step === 0 && ( // "Modify Choices" on Page 1 - acts like "Back" from a conceptual next step
//                  <Button type="button" variant="outline" onClick={() => console.log("Modify Choices clicked - implement action")} className="px-8 py-3 text-base">
//                   Modify Choices
//                 </Button>
//               )}
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep} className="px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                   Continue
//                 </Button>
//               ) : (
//                 <Button type="submit" className="px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white" disabled={form.formState.isSubmitting}>
//                   {form.formState.isSubmitting ? "Processing..." : "Confirm & Purchase"}
//                 </Button>
//               )}
//             </div>
//           </form>
//         </div> {/* End of white content bg */}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useForm, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//     purchaseWithoutLoginSchema,
//     type InsuranceFormValues,
//     steps,
//     tripPurposes,
//     fieldsByStep,
//     emergencyMedicalCoverageOptions,
//     personalAccidentCoverageOptions,
//     nationalityOptions,
//     countryOptions,
// } from "@/lib/insuranceFormSchema";
// import {
//     InputWithLabel,
//     TextareaWithLabel,
//     ControlledTextareaArray,
//     SelectWithLabel
// } from "./FormFields";

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);
//   const [totalRiskZoneDays, setTotalRiskZoneDays] = useState<number | null>(null);

//   const form = useForm<InsuranceFormValues>({
//     resolver: joiResolver(purchaseWithoutLoginSchema, {
//       abortEarly: false,
//     }),
//     defaultValues: {
//       trip_start_date: "",
//       trip_end_date: "",
//       green_zone_days: 0,
//       amber_zone_days: 0,
//       red_zone_days: 0,
//       black_zone_days: 0,
//       emergency_medical_coverage: "",
//       personal_accident_coverage_level: "0", // Default to "No PA Coverage"
//       add_transit_coverage: false,
//       c_name: "",
//       c_birthdate: "",
//       c_phone: "",
//       c_whats_app: "",
//       c_email: "",
//       c_nationality: "",
//       city_of_residence: "",
//       trip_countries: [],
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_purpose: "",
//       stay_name: "",
//       company_name: "",
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_relation: "",
//       has_medical_conditions: false,
//       has_allergies: false,
//       has_current_medications: false,
//       medical_conditions: [],
//       allergies: [],
//       current_medications: [],
//       blood_type: "",
//       special_assistance: "",
//       affiliate_code: "",
//       consent: undefined,
//       c_organization: "",
//       travellers: [{ name: "", birthdate: ""}],
//       is_company_arranged: false,
//       trip_cities: [],
//     },
//     mode: "onChange", // Important for immediate feedback on zone day changes
//   });

//   const { watch, setValue, getValues, trigger } = form;

//   // Watch relevant fields for dynamic calculations
//   const watchedStartDate = watch("trip_start_date");
//   const watchedEndDate = watch("trip_end_date");
//   const watchedAmberDays = watch("amber_zone_days");
//   const watchedRedDays = watch("red_zone_days");

//   // Calculate Total Risk Zone Days
//   useEffect(() => {
//     if (watchedStartDate && watchedEndDate) {
//       const start = new Date(watchedStartDate);
//       const end = new Date(watchedEndDate);
//       if (end >= start) {
//         const diffTime = Math.abs(end.getTime() - start.getTime());
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive of start and end day
//         setTotalRiskZoneDays(diffDays);
//         setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
//         setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//         setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       } else {
//         setTotalRiskZoneDays(null);
//         setValue("green_zone_days", 0); // Reset if dates are invalid
//       }
//     } else {
//       setTotalRiskZoneDays(null);
//       setValue("green_zone_days", 0);
//     }
//   }, [watchedStartDate, watchedEndDate, setValue]);

//   // Auto-adjust Green Zone Days
//   useEffect(() => {
//     if (totalRiskZoneDays !== null) {
//       const amber = Number(getValues("amber_zone_days") || 0);
//       const red = Number(getValues("red_zone_days") || 0);
//       const newGreenDays = totalRiskZoneDays - amber - red;
//       setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
//     }
//   }, [watchedAmberDays, watchedRedDays, totalRiskZoneDays, setValue, getValues]);


//   const cNameValue = watch("c_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     if (getValues("travellers")?.length > 0) {
//         setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && form.formState.dirtyFields.c_name });
//         setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && form.formState.dirtyFields.c_birthdate });
//     } else if (cNameValue || cBirthdateValue) {
//         setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || ""}]);
//     }
//   }, [cNameValue, cBirthdateValue, setValue, getValues, step, form.formState.dirtyFields]);


//   const onSubmit = (data: InsuranceFormValues) => {
//     const finalData = {
//         ...data,
//         travellers: [{ name: data.c_name, birthdate: data.c_birthdate }],
//         green_zone_days: Number(data.green_zone_days),
//         amber_zone_days: Number(data.amber_zone_days),
//         red_zone_days: Number(data.red_zone_days),
//         black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//         medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//         allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//         current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//     };
//     console.log("Form Data Submitted:", finalData);
//     alert("Form submitted! Check console.");
//   };

//   const nextStep = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     // Manually add the overall schema validation for zone days sum on step 0 if moving next
//     if (step === 0) {
//         const overallResult = await trigger(); // This will trigger the .custom validation for sum
//         if (!overallResult) {
//              const error = form.formState.errors.root?.message || "Please correct errors before proceeding.";
//              // Display this error. For simplicity, an alert.
//              alert(error);
//              const firstErrorKey = currentStepFields.find((fieldName) => getError(fieldName as string));
//              if (firstErrorKey) {
//                 const element = document.querySelector(`[name='${firstErrorKey}']`) || document.getElementById(firstErrorKey as string);
//                 element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//              }
//             return;
//         }
//     } else {
//         const result = await trigger(currentStepFields);
//         if (!result) {
//             const firstErrorKey = currentStepFields.find((fieldName) => getError(fieldName as string));
//             if (firstErrorKey) {
//                 const element = document.querySelector(`[name='${firstErrorKey}']`) || document.getElementById(firstErrorKey as string);
//                 element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             }
//             return;
//         }
//     }


//     if (step < steps.length - 1) {
//        setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error: FieldErrors | FieldError | undefined = form.formState.errors;
//     try {
//         for (const key of keys) {
//              const k = key.match(/^\d+$/) ? parseInt(key, 10) : key;
//             if (error && typeof error === 'object' && k in error) {
//                 error = (error as any)[k];
//             } else {
//                 return undefined;
//             }
//         }
//         return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//     } catch (e) {
//         return undefined;
//     }
//   };

//   const calculateAge = (birthdate: string) => {
//     if (!birthdate) return "";
//     const birthDate = new Date(birthdate);
//     if (isNaN(birthDate.getTime())) return "";
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age >= 0 ? age.toString() : "";
//   };

//   const watchedEmergencyMedical = watch("emergency_medical_coverage");
//   const watchedPACoverage = watch("personal_accident_coverage_level");
//   const watchedFullName = watch("c_name");
//   const watchedBirthdateForAge = watch("c_birthdate");
//   const watchedNationalityForDisplay = watch("c_nationality");
//   const watchedTripPurposeForDisplay = watch("trip_purpose");
//   const watchedPrimaryCitiesRegionsForDisplay = watch("primary_cities_regions_ukraine");
//   const watchedEmergencyNameForDisplay = watch("emergency_contact_name");
//   const watchedEmergencyPhoneForDisplay = watch("emergency_contact_phone");


//   const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
//   const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;

//   return (
//     <div className="flex justify-center px-4 py-10 bg-gray-100">
//       <div className="w-full max-w-4xl">
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
//                     ? "bg-[#1A2C50] text-white"
//                     : "bg-[#00BBD3] text-white"
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="h-2 bg-[#00BBD3] rounded-full">
//             <div
//               className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="bg-white p-6 md:p-8 shadow-lg rounded-md">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             {step === 0 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Where and When Are You Travelling?</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel label="Travel Start Date" name="trip_start_date" type="date" register={form.register} error={getError("trip_start_date")} />
//                   <InputWithLabel label="Travel End Date" name="trip_end_date" type="date" register={form.register} error={getError("trip_end_date")} />
//                 </div>

//                 <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
//                 <div className="mb-4 p-4 border rounded-md bg-slate-50">
//                     <div className="font-medium">Total Risk Zone Days:
//                         <span className="ml-2 font-bold text-lg text-blue-600">{totalRiskZoneDays !== null ? totalRiskZoneDays : "Select dates"}</span>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" type="number" register={form.register} error={getError("green_zone_days")} />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" type="number" register={form.register} error={getError("amber_zone_days")} />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" type="number" register={form.register} error={getError("red_zone_days")} />
//                 </div>
//                 {form.formState.errors.root && <p className="text-sm text-red-500 mb-4">{form.formState.errors.root.message}</p>}
//                 <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel
//                     label="Emergency Medical"
//                     name="emergency_medical_coverage"
//                     control={form.control}
//                     options={emergencyMedicalCoverageOptions}
//                     placeholder="Select Medical Coverage"
//                     error={getError("emergency_medical_coverage")}
//                   />
//                   <SelectWithLabel
//                     label="PA (Personal Accident)"
//                     name="personal_accident_coverage_level"
//                     control={form.control}
//                     options={personalAccidentCoverageOptions}
//                     placeholder="Select PA Coverage"
//                     error={getError("personal_accident_coverage_level")}
//                   />
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_transit_coverage" control={form.control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
//                   {/* Display selected coverages for clarity */}
//                   <div className="text-sm mt-2">
//                     <p>Medical: {getEmergencyMedicalLabel(watch("emergency_medical_coverage"))}</p>
//                     <p>PA: {getPALabel(watch("personal_accident_coverage_level"))}</p>
//                     <p>Transit: {watch("add_transit_coverage") ? "Yes (250k)" : "No"}</p>
//                   </div>
//                 </div>
//               </>
//             )}

//             {step === 1 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Your Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
//                   <div>
//                     <InputWithLabel label="Date of Birth" name="c_birthdate" type="date" register={form.register} error={getError("c_birthdate")} />
//                     {watch("c_birthdate") && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch("c_birthdate"))}</p>}
//                   </div>
//                   <InputWithLabel label="Phone Number" name="c_phone" type="tel" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp (optional)" name="c_whats_app" type="tel" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Email Address" name="c_email" type="email" register={form.register} error={getError("c_email")} />
//                   <SelectWithLabel label="Nationality" name="c_nationality" control={form.control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
//                   <InputWithLabel label="City of Residence" name="city_of_residence" register={form.register} error={getError("city_of_residence")} />
//                   <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={form.control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
//                 </div>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Arrival in Ukraine (Optional)" name="arrival_in_ukraine" type="date" register={form.register} error={getError("arrival_in_ukraine")} />
//                   <InputWithLabel label="Departure from Ukraine (Optional)" name="departure_from_ukraine" type="date" register={form.register} error={getError("departure_from_ukraine")} />
//                 </div>
//                 <div className="mt-6"><InputWithLabel label="Primary Cities/Regions (in Ukraine, Optional)" name="primary_cities_regions_ukraine" register={form.register} error={getError("primary_cities_regions_ukraine")} /></div>
//                 <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={form.control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={form.register} error={getError("company_name")} /></div>
//                 <p className="mt-6 text-sm text-orange-600"><span className="font-bold">⚠ Ensure your zone-day breakdown matches Page 1</span></p>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Emergency Contact Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Contact Name" name="emergency_contact_name" register={form.register} error={getError("emergency_contact_name")} />
//                   <InputWithLabel label="Contact Number" name="emergency_contact_phone" type="tel" register={form.register} error={getError("emergency_contact_phone")} />
//                   <InputWithLabel label="Relationship" name="emergency_contact_relation" register={form.register} error={getError("emergency_contact_relation")} />
//                 </div>
//                 <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Optional Medical Info (Confidential):</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={form.control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
//                   {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={form.control} label="List Conditions" error={getError("medical_conditions")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_allergies" control={form.control} render={({ field }) => <Checkbox id="has_allergies" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
//                   {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={form.control} label="List Allergies" error={getError("allergies")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={form.control} render={({ field }) => <Checkbox id="has_current_medications" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
//                   {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={form.control} label="List Medications" error={getError("current_medications")} />)}
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                   <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//                <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
//                 <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
//                     <div><strong>Travel Dates:</strong> {watch("trip_start_date") || "N/A"} to {watch("trip_end_date") || "N/A"}</div>
//                     <div><strong>Total Risk Zone Days:</strong> {totalRiskZoneDays ?? "N/A"}</div>
//                     <div><strong>Risk Zone Breakdown:</strong></div>
//                     <ul className="list-disc list-inside pl-4">
//                         <li>Green: {watch("green_zone_days") || 0} days</li>
//                         <li>Amber: {watch("amber_zone_days") || 0} days</li>
//                         <li>Red: {watch("red_zone_days") || 0} days</li>
//                     </ul>
//                     <div><strong>Coverage Selected:</strong></div>
//                     <ul className="list-disc list-inside pl-4">
//                         <li>Medical: {getEmergencyMedicalLabel(watchedEmergencyMedical) || "N/A"}</li>
//                         <li>PA: {getPALabel(watchedPACoverage) || "N/A"}</li>
//                         <li>Transit: {watch("add_transit_coverage") ? "Yes (250k Add-on)" : "No"}</li>
//                     </ul>
//                     <div className="mt-4 pt-3 border-t">
//                         <strong className="text-xl">Total Quote:</strong>
//                         <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                     </div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                     <div><strong>Name:</strong> {watchedFullName || "N/A"}</div>
//                     <div><strong>Age:</strong> {calculateAge(watchedBirthdateForAge) || "N/A"}</div>
//                     <div><strong>Nationality:</strong> {getNationalityLabel(watchedNationalityForDisplay) || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
//                  <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                     <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedTripPurposeForDisplay) || "N/A"}</div>
//                     <div><strong>Primary Regions:</strong> {watchedPrimaryCitiesRegionsForDisplay || "N/A"}</div>
//                  </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
//                  <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                     <div><strong>Name:</strong> {watchedEmergencyNameForDisplay || "N/A"}</div>
//                     <div><strong>Number:</strong> {watchedEmergencyPhoneForDisplay || "N/A"}</div>
//                  </div>

//                 <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={form.register} error={getError("affiliate_code")} /></div>

//                 <div className="flex items-start space-x-3">
//                    <Controller name="consent" control={form.control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} /> )} />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">I consent to sharing medical info in an emergency</Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}

//             <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Back
//                 </Button>
//               )}
//               {step === 0 && (
//                  <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic to go back or reset specific fields.")} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Modify Choices
//                 </Button>
//               )}
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                   Continue
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white" disabled={form.formState.isSubmitting}>
//                   {form.formState.isSubmitting ? "Processing..." : "Confirm & Purchase"}
//                 </Button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/insurance-form/InsuranceForm.tsx

// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//     purchaseWithoutLoginSchema,
//     type InsuranceFormValues,
//     steps,
//     tripPurposes,
//     fieldsByStep,
//     emergencyMedicalCoverageOptions,
//     personalAccidentCoverageOptions,
//     nationalityOptions,
//     countryOptions,
// } from "@/lib/insuranceFormSchema"; // Ensure this path is correct
// import {
//     InputWithLabel,
//     TextareaWithLabel,
//     ControlledTextareaArray,
//     SelectWithLabel
// } from "./FormFields"; // Ensure this path is correct

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);
//   const [totalRiskZoneDays, setTotalRiskZoneDays] = useState<number | null>(null);

//   const form = useForm<InsuranceFormValues>({
//     resolver: joiResolver(purchaseWithoutLoginSchema, {
//       abortEarly: false,
//     }),
//     defaultValues: {
//       trip_start_date: "",
//       trip_end_date: "",
//       green_zone_days: 0,
//       amber_zone_days: 0,
//       red_zone_days: 0,
//       black_zone_days: 0,
//       emergency_medical_coverage: "",
//       personal_accident_coverage_level: "0",
//       add_transit_coverage: false,
//       c_name: "",
//       c_birthdate: "",
//       c_phone: "",
//       c_whats_app: "",
//       c_email: "",
//       c_nationality: "",
//       city_of_residence: "",
//       trip_countries: [],
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_purpose: "",
//       stay_name: "",
//       company_name: "",
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_relation: "",
//       has_medical_conditions: false,
//       has_allergies: false,
//       has_current_medications: false,
//       medical_conditions: [],
//       allergies: [],
//       current_medications: [],
//       blood_type: "",
//       special_assistance: "",
//       affiliate_code: "",
//       consent: undefined,
//       c_organization: "",
//       travellers: [{ name: "", birthdate: ""}],
//       is_company_arranged: false,
//       trip_cities: [],
//     },
//     mode: "onChange",
//   });

//   const { watch, setValue, getValues, trigger, formState } = form;

//   const watchedStartDate = watch("trip_start_date");
//   const watchedEndDate = watch("trip_end_date");
//   // No need to watch amber_zone_days and red_zone_days here for the effect,
//   // as the effect itself will use getValues which is reactive enough within the effect.

//   useEffect(() => {
//     if (watchedStartDate && watchedEndDate) {
//       const start = new Date(watchedStartDate);
//       const end = new Date(watchedEndDate);
//       if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
//         const diffTime = end.getTime() - start.getTime(); // Difference in milliseconds
//         const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
//         setTotalRiskZoneDays(diffDays);
//         // Set green_zone_days to total, and reset amber/red.
//         // Let the next useEffect handle green_zone_days adjustment based on amber/red.
//         setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
//         if (getValues("amber_zone_days") !== 0) setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//         if (getValues("red_zone_days") !== 0) setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       } else {
//         setTotalRiskZoneDays(null);
//         if (getValues("green_zone_days") !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       }
//     } else {
//       setTotalRiskZoneDays(null);
//       if (getValues("green_zone_days") !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [watchedStartDate, watchedEndDate, setValue, getValues]);

//   useEffect(() => {
//     // This effect runs when totalRiskZoneDays, amber_zone_days, or red_zone_days changes.
//     // We use a callback from watch to get the latest values when one of them changes.
//     const subscription = watch((value, { name, type }) => {
//       if (
//         (name === "amber_zone_days" || name === "red_zone_days") &&
//         type === "change" &&
//         totalRiskZoneDays !== null
//       ) {
//         const amber = Number(value.amber_zone_days || 0);
//         const red = Number(value.red_zone_days || 0);
//         const newGreenDays = totalRiskZoneDays - amber - red;
//         if (getValues("green_zone_days") !== Math.max(0, newGreenDays)) {
//             setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
//         }
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setValue, getValues, totalRiskZoneDays]);


//   const cNameValue = watch("c_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     if (getValues("travellers")?.length > 0) {
//         if (getValues("travellers.0.name") !== cNameValue) setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_name });
//         if (getValues("travellers.0.birthdate") !== cBirthdateValue) setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_birthdate });
//     } else if (cNameValue || cBirthdateValue) {
//         setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || ""}]);
//     }
//   }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);


//   const onSubmit = (data: InsuranceFormValues) => {
//     const finalData = {
//         ...data,
//         travellers: [{ name: data.c_name, birthdate: data.c_birthdate }],
//         green_zone_days: Number(data.green_zone_days),
//         amber_zone_days: Number(data.amber_zone_days),
//         red_zone_days: Number(data.red_zone_days),
//         black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//         medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//         allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//         current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//     };
//     console.log("Form Data Submitted:", finalData);
//     alert("Form submitted! Check console.");
//   };

//   const nextStep = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });


//     if (!currentStepValidationResult) {
//       // Scroll to the first error on the current step if validation fails
//       const firstErrorKeyOnCurrentStep = currentStepFields.find(
//         (fieldName) => getError(fieldName as string) !== undefined
//       );
//       if (firstErrorKeyOnCurrentStep) {
//         const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
//         element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }

//     // If on Step 0, after current step fields are valid, check the Joi .custom() rule for sum.
//     if (step === 0) {
//       // Trigger validation for the whole form to specifically invoke Joi's .custom() rule
//       // We need to ensure this re-evaluates based on current values.
//       // Passing all field names might be more robust for Joi resolver with custom rule.
//       const allFieldNames = Object.keys(getValues()) as Array<Path<InsuranceFormValues>>;
//       const overallValidationResult = await trigger(allFieldNames, { shouldFocus: false });


//       if (formState.errors.root?.message) {
//         alert(formState.errors.root.message + "\nPlease check the sum of Green, Amber, and Red zone days against the Total Risk Zone Days.");
//         const zoneDayElement = document.querySelector(`[name='green_zone_days']`);
//         zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         return;
//       }
//       // If overallValidationResult is false here but no root error, it implies an error
//       // on a *future* step, which we don't want to block Step 0 progression for if current step is fine.
//     }

//     if (step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//     }
//   };


//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error: FieldErrors | FieldError | undefined = formState.errors;
//     try {
//         for (const key of keys) {
//              const k = key.match(/^\d+$/) ? parseInt(key, 10) : key;
//             if (error && typeof error === 'object' && k in error) {
//                 error = (error as any)[k];
//             } else {
//                 return undefined;
//             }
//         }
//         return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//     } catch (e) {
//         return undefined;
//     }
//   };

//   const calculateAge = (birthdate: string) => {
//     if (!birthdate) return "";
//     const birthDate = new Date(birthdate);
//     if (isNaN(birthDate.getTime())) return "";
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age >= 0 ? age.toString() : "";
//   };

//   const watchedEmergencyMedical = watch("emergency_medical_coverage");
//   const watchedPACoverage = watch("personal_accident_coverage_level");
//   const watchedTransit = watch("add_transit_coverage");
//   const watchedFullNameForDisplay = watch("c_name");
//   const watchedBirthdateForAge = watch("c_birthdate");
//   const watchedNationalityForDisplay = watch("c_nationality");
//   const watchedTripPurposeForDisplay = watch("trip_purpose");
//   const watchedPrimaryCitiesRegionsForDisplay = watch("primary_cities_regions_ukraine");
//   const watchedEmergencyNameForDisplay = watch("emergency_contact_name");
//   const watchedEmergencyPhoneForDisplay = watch("emergency_contact_phone");
//   const watchedGreenZoneDaysForDisplay = watch("green_zone_days");
//   const watchedAmberZoneDaysForDisplay = watch("amber_zone_days");
//   const watchedRedZoneDaysForDisplay = watch("red_zone_days");


//   const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
//   const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;

//   return (
//     <div className="flex justify-center px-4 py-10 bg-gray-100">
//       <div className="w-full max-w-4xl">
//         <div className="mb-8 space-y-4">
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
//                     ? "bg-[#1A2C50] text-white"
//                     : "bg-[#00BBD3] text-white"
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="h-2 bg-[#00BBD3] rounded-full">
//             <div
//               className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
//               style={{ width: `${((step + 1) / steps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="bg-white p-6 md:p-8 shadow-lg rounded-md">
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             {step === 0 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Where and When Are You Travelling?</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel label="Travel Start Date" name="trip_start_date" type="date" register={form.register} error={getError("trip_start_date")} />
//                   <InputWithLabel label="Travel End Date" name="trip_end_date" type="date" register={form.register} error={getError("trip_end_date")} />
//                 </div>

//                 <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
//                 <div className="mb-4 p-4 border rounded-md bg-slate-50">
//                     <div className="font-medium">Total Risk Zone Days:
//                         <span className="ml-2 font-bold text-lg text-blue-600">{totalRiskZoneDays !== null ? totalRiskZoneDays : "Select dates"}</span>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                   <InputWithLabel label="Green Zone Days" name="green_zone_days" type="number" register={form.register} error={getError("green_zone_days")} />
//                   <InputWithLabel label="Amber Zone Days" name="amber_zone_days" type="number" register={form.register} error={getError("amber_zone_days")} />
//                   <InputWithLabel label="Red Zone Days" name="red_zone_days" type="number" register={form.register} error={getError("red_zone_days")} />
//                 </div>
//                 {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}
//                 <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel
//                     label="Emergency Medical"
//                     name="emergency_medical_coverage"
//                     control={form.control}
//                     options={emergencyMedicalCoverageOptions}
//                     placeholder="Select Medical Coverage"
//                     error={getError("emergency_medical_coverage")}
//                   />
//                   <SelectWithLabel
//                     label="PA (Personal Accident)"
//                     name="personal_accident_coverage_level"
//                     control={form.control}
//                     options={personalAccidentCoverageOptions}
//                     placeholder="Select PA Coverage"
//                     error={getError("personal_accident_coverage_level")}
//                   />
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_transit_coverage" control={form.control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
//                   <div className="text-sm mt-2">
//                     <p>Medical: {getEmergencyMedicalLabel(watchedEmergencyMedical)}</p>
//                     <p>PA: {getPALabel(watchedPACoverage)}</p>
//                     <p>Transit: {watchedTransit ? "Yes (250k)" : "No"}</p>
//                   </div>
//                 </div>
//               </>
//             )}

//             {step === 1 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Your Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
//                   <div>
//                     <InputWithLabel label="Date of Birth" name="c_birthdate" type="date" register={form.register} error={getError("c_birthdate")} />
//                     {watch("c_birthdate") && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch("c_birthdate"))}</p>}
//                   </div>
//                   <InputWithLabel label="Phone Number" name="c_phone" type="tel" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp (optional)" name="c_whats_app" type="tel" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Email Address" name="c_email" type="email" register={form.register} error={getError("c_email")} />
//                   <SelectWithLabel label="Nationality" name="c_nationality" control={form.control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
//                   <InputWithLabel label="City of Residence" name="city_of_residence" register={form.register} error={getError("city_of_residence")} />
//                   <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={form.control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
//                 </div>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Arrival in Ukraine (Optional)" name="arrival_in_ukraine" type="date" register={form.register} error={getError("arrival_in_ukraine")} />
//                   <InputWithLabel label="Departure from Ukraine (Optional)" name="departure_from_ukraine" type="date" register={form.register} error={getError("departure_from_ukraine")} />
//                 </div>
//                 <div className="mt-6"><InputWithLabel label="Primary Cities/Regions (in Ukraine, Optional)" name="primary_cities_regions_ukraine" register={form.register} error={getError("primary_cities_regions_ukraine")} /></div>
//                 <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={form.control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={form.register} error={getError("company_name")} /></div>
//                 <p className="mt-6 text-sm text-orange-600"><span className="font-bold">⚠ Ensure your zone-day breakdown matches Page 1</span></p>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Emergency Contact Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Contact Name" name="emergency_contact_name" register={form.register} error={getError("emergency_contact_name")} />
//                   <InputWithLabel label="Contact Number" name="emergency_contact_phone" type="tel" register={form.register} error={getError("emergency_contact_phone")} />
//                   <InputWithLabel label="Relationship" name="emergency_contact_relation" register={form.register} error={getError("emergency_contact_relation")} />
//                 </div>
//                 <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Optional Medical Info (Confidential):</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={form.control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
//                   {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={form.control} label="List Conditions" error={getError("medical_conditions")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_allergies" control={form.control} render={({ field }) => <Checkbox id="has_allergies" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
//                   {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={form.control} label="List Allergies" error={getError("allergies")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={form.control} render={({ field }) => <Checkbox id="has_current_medications" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
//                   {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={form.control} label="List Medications" error={getError("current_medications")} />)}
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                   <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//                <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
//                 <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
//                     <div><strong>Travel Dates:</strong> {watch("trip_start_date") || "N/A"} to {watch("trip_end_date") || "N/A"}</div>
//                     <div><strong>Total Risk Zone Days:</strong> {totalRiskZoneDays ?? "N/A"}</div>
//                     <div><strong>Risk Zone Breakdown:</strong></div>
//                     <ul className="list-disc list-inside pl-4">
//                         <li>Green: {watchedGreenZoneDaysForDisplay || 0} days</li>
//                         <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
//                         <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
//                     </ul>
//                     <div><strong>Coverage Selected:</strong></div>
//                     <ul className="list-disc list-inside pl-4">
//                         <li>Medical: {getEmergencyMedicalLabel(watchedEmergencyMedical) || "N/A"}</li>
//                         <li>PA: {getPALabel(watchedPACoverage) || "N/A"}</li>
//                         <li>Transit: {watchedTransit ? "Yes (250k Add-on)" : "No"}</li>
//                     </ul>
//                     <div className="mt-4 pt-3 border-t">
//                         <strong className="text-xl">Total Quote:</strong>
//                         <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                     </div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                     <div><strong>Name:</strong> {watchedFullNameForDisplay || "N/A"}</div>
//                     <div><strong>Age:</strong> {calculateAge(watchedBirthdateForAge) || "N/A"}</div>
//                     <div><strong>Nationality:</strong> {getNationalityLabel(watchedNationalityForDisplay) || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
//                  <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                     <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedTripPurposeForDisplay) || "N/A"}</div>
//                     <div><strong>Primary Regions:</strong> {watchedPrimaryCitiesRegionsForDisplay || "N/A"}</div>
//                  </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
//                  <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                     <div><strong>Name:</strong> {watchedEmergencyNameForDisplay || "N/A"}</div>
//                     <div><strong>Number:</strong> {watchedEmergencyPhoneForDisplay || "N/A"}</div>
//                  </div>

//                 <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={form.register} error={getError("affiliate_code")} /></div>

//                 <div className="flex items-start space-x-3">
//                    <Controller name="consent" control={form.control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} /> )} />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">I consent to sharing medical info in an emergency</Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}

//             <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={prevStep} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Back
//                 </Button>
//               )}
//               {step === 0 && (
//                  <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic to go back or reset specific fields.")} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Modify Choices
//                 </Button>
//               )}
//               {step < steps.length - 1 ? (
//                 <Button type="button" onClick={nextStep} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                   Continue
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white" disabled={formState.isSubmitting}>
//                   {formState.isSubmitting ? "Processing..." : "Confirm & Purchase"}
//                 </Button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/insurance-form/InsuranceForm.tsx

"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    purchaseWithoutLoginSchema,
    type InsuranceFormValues,
    steps,
    tripPurposes,
    fieldsByStep,
    emergencyMedicalCoverageOptions,
    personalAccidentCoverageOptions,
    nationalityOptions,
    countryOptions,
} from "@/lib/insuranceFormSchema"; // Ensure this path is correct
import {
    InputWithLabel,
    TextareaWithLabel,
    ControlledTextareaArray,
    SelectWithLabel
} from "./FormFields"; // Ensure this path is correct

export default function InsuranceForm() {
  const [step, setStep] = useState(0);
  const [totalRiskZoneDays, setTotalRiskZoneDays] = useState<number | null>(null);

  const form = useForm<InsuranceFormValues>({
    resolver: joiResolver(purchaseWithoutLoginSchema, {
      abortEarly: false,
    }),
    defaultValues: {
      trip_start_date: "",
      trip_end_date: "",
      green_zone_days: 0,
      amber_zone_days: 0,
      red_zone_days: 0,
      black_zone_days: 0,
      emergency_medical_coverage: "",
      personal_accident_coverage_level: "0",
      add_transit_coverage: false,
      c_name: "",
      c_birthdate: "",
      c_phone: "",
      c_whats_app: "",
      c_email: "",
      c_nationality: "",
      city_of_residence: "",
      trip_countries: [],
      arrival_in_ukraine: "",
      departure_from_ukraine: "",
      primary_cities_regions_ukraine: "",
      trip_purpose: "",
      stay_name: "",
      company_name: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      emergency_contact_relation: "",
      has_medical_conditions: false,
      has_allergies: false,
      has_current_medications: false,
      medical_conditions: [],
      allergies: [],
      current_medications: [],
      blood_type: "",
      special_assistance: "",
      affiliate_code: "",
      consent: undefined,
      c_organization: "",
      travellers: [{ name: "", birthdate: ""}],
      is_company_arranged: false,
      trip_cities: [],
    },
    mode: "onChange",
  });

  const { watch, setValue, getValues, trigger, formState } = form;

  const watchedStartDate = watch("trip_start_date");
  const watchedEndDate = watch("trip_end_date");

  useEffect(() => {
    if (watchedStartDate && watchedEndDate) {
      const start = new Date(watchedStartDate);
      const end = new Date(watchedEndDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
        setTotalRiskZoneDays(diffDays);
        setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
        if (getValues("amber_zone_days") !== 0) setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
        if (getValues("red_zone_days") !== 0) setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
      } else {
        setTotalRiskZoneDays(null);
        if (getValues("green_zone_days") !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
      }
    } else {
      setTotalRiskZoneDays(null);
      if (getValues("green_zone_days") !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
    }
  }, [watchedStartDate, watchedEndDate, setValue, getValues]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        (name === "amber_zone_days" || name === "red_zone_days") &&
        type === "change" &&
        totalRiskZoneDays !== null
      ) {
        const amber = Number(value.amber_zone_days || 0);
        const red = Number(value.red_zone_days || 0);
        const newGreenDays = totalRiskZoneDays - amber - red;
        if (getValues("green_zone_days") !== Math.max(0, newGreenDays)) {
            setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, getValues, totalRiskZoneDays]);


  const cNameValue = watch("c_name");
  const cBirthdateValue = watch("c_birthdate");

  useEffect(() => {
    if (getValues("travellers")?.length > 0) {
        if (getValues("travellers.0.name") !== cNameValue) setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_name });
        if (getValues("travellers.0.birthdate") !== cBirthdateValue) setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_birthdate });
    } else if (cNameValue || cBirthdateValue) {
        setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || ""}]);
    }
  }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);


  const onSubmit = (data: InsuranceFormValues) => {
    const finalData = {
        ...data,
        travellers: [{ name: data.c_name, birthdate: data.c_birthdate }],
        green_zone_days: Number(data.green_zone_days),
        amber_zone_days: Number(data.amber_zone_days),
        red_zone_days: Number(data.red_zone_days),
        black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
        medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
        allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
        current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
    };
    console.log("Form Data Submitted:", finalData);
    alert("Form submitted! Check console.");
  };

  const nextStep = async () => {
    const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;

    // 1. Validate fields specific to the CURRENT step first
    const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });

    if (!currentStepValidationResult) {
      const firstErrorKeyOnCurrentStep = currentStepFields.find(
        (fieldName) => getError(fieldName as string) !== undefined
      );
      if (firstErrorKeyOnCurrentStep) {
        const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return; // Stop if current step fields have errors
    }

    // 2. If on Step 0, and current step fields are valid,
    //    NOW specifically check the Joi .custom() rule for the sum of zone days.
    if (step === 0) {
      const fieldsForCustomRuleCheck: Array<Path<InsuranceFormValues>> = [
        "trip_start_date", "trip_end_date",
        "green_zone_days", "amber_zone_days", "red_zone_days"
      ];
      // Triggering these again should make Joi re-evaluate the object with the custom rule
      await trigger(fieldsForCustomRuleCheck, { shouldFocus: false });

      if (formState.errors.root?.message) {
        alert(formState.errors.root.message + "\nPlease check the sum of Green, Amber, and Red zone days against the Total Risk Zone Days.");
        const zoneDayElement = document.querySelector(`[name='green_zone_days']`);
        zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return; // Stop if the custom sum validation fails
      }
    }

    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };


  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  // const getError = (fieldName: string): FieldError | undefined => {
  //   const keys = fieldName.split('.');
  //   let error: FieldErrors | FieldError | undefined = formState.errors;
  //   try {
  //       for (const key of keys) {
  //            const k = key.match(/^\d+$/) ? parseInt(key, 10) : key;
  //           if (error && typeof error === 'object' && k in error) {
  //               error = (error as any)[k];
  //           } else {
  //               return undefined;
  //           }
  //       }
  //       return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
  //   } catch {
  //       return undefined;
  //   }
  // };

  const getError = (fieldName: string): FieldError | undefined => {
    const keys = fieldName.split('.');
    let error: FieldErrors | FieldError | undefined = form.formState.errors;
  
    try {
      for (const key of keys) {
        const k = key.match(/^\d+$/) ? parseInt(key, 10) : key;
  
        if (error && typeof error === 'object' && error !== null) {
          const typedError = error as Record<string | number, unknown>;
          if (k in typedError) {
            error = typedError[k] as FieldErrors | FieldError;
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      }
  
      return (error && typeof error === 'object' && 'message' in error)
        ? error as FieldError
        : undefined;
    } catch (e) {
      console.warn(`Error accessing field error for ${fieldName}:`, e);
      return undefined;
    }
  };
  

  const calculateAge = (birthdate: string) => {
    if (!birthdate) return "";
    const birthDate = new Date(birthdate);
    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 0 ? age.toString() : "";
  };

  const watchedEmergencyMedical = watch("emergency_medical_coverage");
  const watchedPACoverage = watch("personal_accident_coverage_level");
  const watchedTransit = watch("add_transit_coverage");
  const watchedFullNameForDisplay = watch("c_name");
  const watchedBirthdateForAge = watch("c_birthdate");
  const watchedNationalityForDisplay = watch("c_nationality");
  const watchedTripPurposeForDisplay = watch("trip_purpose");
  const watchedPrimaryCitiesRegionsForDisplay = watch("primary_cities_regions_ukraine");
  const watchedEmergencyNameForDisplay = watch("emergency_contact_name");
  const watchedEmergencyPhoneForDisplay = watch("emergency_contact_phone");
  const watchedGreenZoneDaysForDisplay = watch("green_zone_days");
  const watchedAmberZoneDaysForDisplay = watch("amber_zone_days");
  const watchedRedZoneDaysForDisplay = watch("red_zone_days");


  const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
  const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
  const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
  const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;

  return (
    <div className="flex justify-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-4xl">
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            {steps.map((label, index) => (
              <div key={index} className="flex-1 text-center text-sm">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step
                    ? "bg-[#1A2C50] text-white"
                    : "bg-[#00BBD3] text-white"
                    }`}
                >
                  {index + 1}
                </div>
                <div className="mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="h-2 bg-[#00BBD3] rounded-full">
            <div
              className="h-2 bg-[#1A2C50] rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 shadow-lg rounded-md">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step === 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Where and When Are You Travelling?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <InputWithLabel label="Travel Start Date" name="trip_start_date" type="date" register={form.register} error={getError("trip_start_date")} />
                  <InputWithLabel label="Travel End Date" name="trip_end_date" type="date" register={form.register} error={getError("trip_end_date")} />
                </div>

                <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
                <div className="mb-4 p-4 border rounded-md bg-slate-50">
                    <div className="font-medium">Total Days:
                        <span className="ml-2 font-bold text-lg text-blue-600">{totalRiskZoneDays !== null ? totalRiskZoneDays : "Select dates"}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <InputWithLabel label="Green Zone Days" name="green_zone_days" type="number" register={form.register} error={getError("green_zone_days")} />
                  <InputWithLabel label="Amber Zone Days" name="amber_zone_days" type="number" register={form.register} error={getError("amber_zone_days")} />
                  <InputWithLabel label="Red Zone Days" name="red_zone_days" type="number" register={form.register} error={getError("red_zone_days")} />
                </div>
                {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}
                <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

                <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
                <div className="space-y-4 mb-6">
                  <SelectWithLabel
                    label="Emergency Medical"
                    name="emergency_medical_coverage"
                    control={form.control}
                    options={emergencyMedicalCoverageOptions}
                    placeholder="Select Medical Coverage"
                    error={getError("emergency_medical_coverage")}
                  />
                  <SelectWithLabel
                    label="PA (Personal Accident)"
                    name="personal_accident_coverage_level"
                    control={form.control}
                    options={personalAccidentCoverageOptions}
                    placeholder="Select PA Coverage"
                    error={getError("personal_accident_coverage_level")}
                  />
                  <div className="flex items-center space-x-2">
                    <Controller name="add_transit_coverage" control={form.control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
                    <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-md border">
                  <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
                  <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
                  <div className="text-sm mt-2">
                    <p>Medical: {getEmergencyMedicalLabel(watchedEmergencyMedical)}</p>
                    <p>PA: {getPALabel(watchedPACoverage)}</p>
                    <p>Transit: {watchedTransit ? "Yes (250k)" : "No"}</p>
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Your Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
                  <div>
                    <InputWithLabel label="Date of Birth" name="c_birthdate" type="date" register={form.register} error={getError("c_birthdate")} />
                    {watch("c_birthdate") && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch("c_birthdate"))}</p>}
                  </div>
                  <InputWithLabel label="Phone Number" name="c_phone" type="tel" register={form.register} error={getError("c_phone")} />
                  <InputWithLabel label="WhatsApp (optional)" name="c_whats_app" type="tel" register={form.register} error={getError("c_whats_app")} />
                  <InputWithLabel label="Email Address" name="c_email" type="email" register={form.register} error={getError("c_email")} />
                  <SelectWithLabel label="Nationality" name="c_nationality" control={form.control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
                  <InputWithLabel label="City of Residence" name="city_of_residence" register={form.register} error={getError("city_of_residence")} />
                  <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={form.control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWithLabel label="Arrival in Ukraine (Optional)" name="arrival_in_ukraine" type="date" register={form.register} error={getError("arrival_in_ukraine")} />
                  <InputWithLabel label="Departure from Ukraine (Optional)" name="departure_from_ukraine" type="date" register={form.register} error={getError("departure_from_ukraine")} />
                </div>
                <div className="mt-6"><InputWithLabel label="Primary Cities/Regions (in Ukraine, Optional)" name="primary_cities_regions_ukraine" register={form.register} error={getError("primary_cities_regions_ukraine")} /></div>
                <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={form.control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
                <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} /></div>
                <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={form.register} error={getError("company_name")} /></div>
                <p className="mt-6 text-sm text-orange-600"><span className="font-bold">⚠ Ensure your zone-day breakdown matches Page 1</span></p>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Emergency Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWithLabel label="Contact Name" name="emergency_contact_name" register={form.register} error={getError("emergency_contact_name")} />
                  <InputWithLabel label="Contact Number" name="emergency_contact_phone" type="tel" register={form.register} error={getError("emergency_contact_phone")} />
                  <InputWithLabel label="Relationship" name="emergency_contact_relation" register={form.register} error={getError("emergency_contact_relation")} />
                </div>
                <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Optional Medical Info (Confidential):</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={form.control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
                  {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={form.control} label="List Conditions" error={getError("medical_conditions")} />)}
                  <div className="flex items-center space-x-2"><Controller name="has_allergies" control={form.control} render={({ field }) => <Checkbox id="has_allergies" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
                  {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={form.control} label="List Allergies" error={getError("allergies")} />)}
                  <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={form.control} render={({ field }) => <Checkbox id="has_current_medications" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
                  {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={form.control} label="List Medications" error={getError("current_medications")} />)}
                  <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
                  <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
                </div>
              </>
            )}

            {step === 4 && (
               <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
                <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
                    <div><strong>Travel Dates:</strong> {watch("trip_start_date") || "N/A"} to {watch("trip_end_date") || "N/A"}</div>
                    <div><strong>Total Days:</strong> {totalRiskZoneDays ?? "N/A"}</div>
                    <div><strong>Risk Zone Breakdown:</strong></div>
                    <ul className="list-disc list-inside pl-4">
                        <li>Green: {watchedGreenZoneDaysForDisplay || 0} days</li>
                        <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
                        <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
                    </ul>
                    <div><strong>Coverage Selected:</strong></div>
                    <ul className="list-disc list-inside pl-4">
                        <li>Medical: {getEmergencyMedicalLabel(watchedEmergencyMedical) || "N/A"}</li>
                        <li>PA: {getPALabel(watchedPACoverage) || "N/A"}</li>
                        <li>Transit: {watchedTransit ? "Yes (250k Add-on)" : "No"}</li>
                    </ul>
                    <div className="mt-4 pt-3 border-t">
                        <strong className="text-xl">Total Quote:</strong>
                        <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
                <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                    <div><strong>Name:</strong> {watchedFullNameForDisplay || "N/A"}</div>
                    <div><strong>Age:</strong> {calculateAge(watchedBirthdateForAge) || "N/A"}</div>
                    <div><strong>Nationality:</strong> {getNationalityLabel(watchedNationalityForDisplay) || "N/A"}</div>
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                    <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedTripPurposeForDisplay) || "N/A"}</div>
                    <div><strong>Primary Regions:</strong> {watchedPrimaryCitiesRegionsForDisplay || "N/A"}</div>
                 </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                    <div><strong>Name:</strong> {watchedEmergencyNameForDisplay || "N/A"}</div>
                    <div><strong>Number:</strong> {watchedEmergencyPhoneForDisplay || "N/A"}</div>
                 </div>

                <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={form.register} error={getError("affiliate_code")} /></div>

                <div className="flex items-start space-x-3">
                   <Controller name="consent" control={form.control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} /> )} />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="consent" className="font-medium leading-snug">I consent to sharing medical info in an emergency</Label>
                    {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={prevStep} className="w-full sm:w-auto px-8 py-3 text-base">
                  Back
                </Button>
              )}
              {step === 0 && (
                 <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic to go back or reset specific fields.")} className="w-full sm:w-auto px-8 py-3 text-base">
                  Modify Choices
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button type="button" onClick={nextStep} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
                  Continue
                </Button>
              ) : (
                <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white" disabled={formState.isSubmitting}>
                  {formState.isSubmitting ? "Processing..." : "Confirm & Purchase"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}