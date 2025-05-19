

// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   purchaseWithoutLoginSchema,
//   type InsuranceFormValues,
//   steps,
//   tripPurposes,
//   fieldsByStep,
//   emergencyMedicalCoverageOptions,
//   personalAccidentCoverageOptions,
//   nationalityOptions,
//   countryOptions,
// } from "@/lib/insuranceFormSchema"; 
// import {
//   InputWithLabel,
//   TextareaWithLabel,
//   ControlledTextareaArray,
//   SelectWithLabel
// } from "./FormFields"; 

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);
//   const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);

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
//       travellers: [{ name: "", birthdate: "" }],
//       is_company_arranged: false,
//       trip_cities: [],
//     },
//     mode: "onChange",
//   });

//   const { watch, setValue, getValues, trigger, formState, control } = form;

//   const watchedStartDate = watch("trip_start_date");
//   const watchedEndDate = watch("trip_end_date");
//   const watchedGreenDaysForDisplay = watch("green_zone_days");

//   useEffect(() => {
//     if (watchedStartDate && watchedEndDate) {
//       const start = new Date(watchedStartDate);
//       const end = new Date(watchedEndDate);
//       if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
//         const diffTime = end.getTime() - start.getTime();
//         const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)) + 1;
//         setCalculatedTotalRiskZoneDays(diffDays);
//         setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("amber_zone_days")) !== 0) setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("red_zone_days")) !== 0) setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       } else {
//         setCalculatedTotalRiskZoneDays(null);
//         if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       }
//     } else {
//       setCalculatedTotalRiskZoneDays(null);
//       if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [watchedStartDate, watchedEndDate, setValue, getValues]);

//   useEffect(() => {
//     const subscription = watch((currentValues, { name, type }) => {
//       if (
//         (name === "amber_zone_days" || name === "red_zone_days") &&
//         type === "change" &&
//         calculatedTotalRiskZoneDays !== null
//       ) {
//         let amber = Number(currentValues.amber_zone_days || 0);
//         let red = Number(currentValues.red_zone_days || 0);

//         if (amber + red > calculatedTotalRiskZoneDays) {
//           if (name === "amber_zone_days") {
//             amber = calculatedTotalRiskZoneDays - red;
//             setValue("amber_zone_days", Math.max(0, amber), { shouldValidate: true, shouldDirty: true });
//           } else if (name === "red_zone_days") {
//             red = calculatedTotalRiskZoneDays - amber;
//             setValue("red_zone_days", Math.max(0, red), { shouldValidate: true, shouldDirty: true });
//           }
//         }
//         const newGreenDays = calculatedTotalRiskZoneDays - amber - red;
//         if (Number(getValues("green_zone_days")) !== Math.max(0, newGreenDays)) {
//           setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
//         }
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setValue, getValues, calculatedTotalRiskZoneDays]);


//   const cNameValue = watch("c_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     if (getValues("travellers")?.length > 0) {
//       if (getValues("travellers.0.name") !== cNameValue) setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_name });
//       if (getValues("travellers.0.birthdate") !== cBirthdateValue) setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_birthdate });
//     } else if (cNameValue || cBirthdateValue) {
//       setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || "" }]);
//     }
//   }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);


//   const onSubmitForm = (data: InsuranceFormValues) => {
//     // This function is called ONLY when the "Confirm & Purchase" button (type="submit") is clicked.
//     const finalData = {
//       ...data,
//       travellers: [{ name: data.c_name, birthdate: data.c_birthdate }],
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     alert("Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });

//     if (!currentStepValidationResult) {
//       const firstErrorKeyOnCurrentStep = currentStepFields.find(
//         (fieldName) => getError(fieldName as string) !== undefined
//       );
//       if (firstErrorKeyOnCurrentStep) {
//         const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
//         element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }

//     if (step === 0) {
//       const fieldsForCustomRuleCheck: Array<Path<InsuranceFormValues>> = [
//         "trip_start_date", "trip_end_date",
//         "green_zone_days", "amber_zone_days", "red_zone_days"
//       ];
//       await trigger(fieldsForCustomRuleCheck, { shouldFocus: false });

//       if (formState.errors.root?.message) {
//         alert(formState.errors.root.message);
//         const zoneDayElement = document.querySelector(`[name='amber_zone_days']`) || document.querySelector(`[name='red_zone_days']`);
//         zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         return;
//       }
//     }

//     // Only advance if not already on the second to last step (i.e., if there's a next step before the final summary)
//     // or if on any step before the last. The "Continue" button itself won't show on the last step.
//     if (step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error: FieldErrors | FieldError | undefined = formState.errors;
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
//       return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//     } catch {
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
//       age--;
//     }
//     return age >= 0 ? age.toString() : "";
//   };

//   const watchedValuesForSummary = watch([
//     "trip_start_date", "trip_end_date",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
//     "c_name", "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_name", "emergency_contact_phone"
//   ]);
//   const watchedAmberZoneDaysForDisplay = watch("amber_zone_days");
//   const watchedRedZoneDaysForDisplay = watch("red_zone_days");


//   const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
//   const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;


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

//         <div className="bg-white p-6 md:p-8 shadow-lg rounded-md">
//           <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
//             {step === 0 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Where and When Are You Travelling?</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel label="Travel Start Date" name="trip_start_date" type="date" register={form.register} error={getError("trip_start_date")} />
//                   <InputWithLabel label="Travel End Date" name="trip_end_date" type="date" register={form.register} error={getError("trip_end_date")} />
//                 </div>

//                 <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel
//                     label="Total Days"
//                     name="displayTotalDays"
//                     type="number"
//                     value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays : ""}
//                     readOnly={true}
//                   />
//                   <InputWithLabel
//                     label="Green Zone Days"
//                     name="green_zone_days"
//                     type="number"
//                     value={watchedGreenDaysForDisplay}
//                     readOnly={true}
//                     register={form.register}
//                     error={getError("green_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Amber Zone Days"
//                     name="amber_zone_days"
//                     type="number"
//                     register={form.register}
//                     error={getError("amber_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Red Zone Days"
//                     name="red_zone_days"
//                     type="number"
//                     register={form.register}
//                     error={getError("red_zone_days")}
//                   />
//                 </div>

//                 {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}
//                 <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel
//                     label="Emergency Medical"
//                     name="emergency_medical_coverage"
//                     control={control}
//                     options={emergencyMedicalCoverageOptions}
//                     placeholder="Select Medical Coverage"
//                     error={getError("emergency_medical_coverage")}
//                   />
//                   <SelectWithLabel
//                     label="PA (Personal Accident)"
//                     name="personal_accident_coverage_level"
//                     control={control}
//                     options={personalAccidentCoverageOptions}
//                     placeholder="Select PA Coverage"
//                     error={getError("personal_accident_coverage_level")}
//                   />
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_transit_coverage" control={control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
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
//                   <SelectWithLabel label="Nationality" name="c_nationality" control={control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
//                   <InputWithLabel label="City of Residence" name="city_of_residence" register={form.register} error={getError("city_of_residence")} />
//                   <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
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
//                 <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={form.register} error={getError("company_name")} /></div>
//                 <p className="mt-6 text-sm text-orange-600"><span className="font-bold">⚠ Ensure your zone-day breakdown matches Trip Details page</span></p>
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
//                   <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
//                   {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label="List Conditions" error={getError("medical_conditions")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
//                   {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label="List Allergies" error={getError("allergies")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
//                   {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications")} />)}
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                   <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
//                 <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Travel Dates:</strong> {watchedValuesForSummary[0] || "N/A"} to {watchedValuesForSummary[1] || "N/A"}</div>
//                   <div><strong>Total Days:</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
//                   <div><strong>Risk Zone Breakdown:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Green: {watch("green_zone_days") || 0} days</li>
//                     <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
//                     <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
//                   </ul>
//                   <div><strong>Coverage Selected:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Medical: {getEmergencyMedicalLabel(watchedValuesForSummary[2] as string) || "N/A"}</li>
//                     <li>PA: {getPALabel(watchedValuesForSummary[3] as string) || "N/A"}</li>
//                     <li>Transit: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
//                   </ul>
//                   <div className="mt-4 pt-3 border-t">
//                     <strong className="text-xl">Total Quote:</strong>
//                     <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[5] || "N/A"}</div>
//                   <div><strong>Age:</strong> {calculateAge(watchedValuesForSummary[6] as string) || "N/A"}</div>
//                   <div><strong>Nationality:</strong> {getNationalityLabel(watchedValuesForSummary[7] as string) || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedValuesForSummary[8] as string) || "N/A"}</div>
//                   <div><strong>Primary Regions:</strong> {watchedValuesForSummary[9] || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
//                   <div><strong>Number:</strong> {watchedValuesForSummary[11] || "N/A"}</div>
//                 </div>

//                 <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={form.register} error={getError("affiliate_code")} /></div>

//                 <div className="flex items-start space-x-3">
//                   <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">I consent to sharing medical info in an emergency</Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Navigation Buttons - Corrected Logic */}
//             <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Back
//                 </Button>
//               )}
//               {/* "Modify Choices" button for Step 0 */}
//               {step === 0 && ! (step > 0) && ( // Ensure it only shows if no "Back" button is present
//                  <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Modify Choices
//                 </Button>
//               )}
//               {/* Spacer to push the right button to the edge if only one button is on the left */}
//               {step > 0 && step === 0 && <div className="w-full sm:w-auto"></div>}


//               {step < steps.length - 1 && (
//                 <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                   Continue
//                 </Button>
//               )}

//               {step === steps.length - 1 && (
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

// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   purchaseWithoutLoginSchema,
//   type InsuranceFormValues,
//   steps,
//   tripPurposes,
//   fieldsByStep,
//   emergencyMedicalCoverageOptions,
//   personalAccidentCoverageOptions,
//   nationalityOptions,
//   countryOptions,
// } from "@/lib/insuranceFormSchema"; // Ensure this path is correct
// import {
//   InputWithLabel,
//   TextareaWithLabel,
//   ControlledTextareaArray,
//   SelectWithLabel
// } from "./FormFields"; // Ensure this path is correct

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);
//   const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);

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
//       travellers: [{ name: "", birthdate: "" }],
//       is_company_arranged: false,
//       trip_cities: [],
//     },
//     mode: "onChange",
//   });

//   const { watch, setValue, getValues, trigger, formState, control } = form;

//   const watchedStartDate = watch("trip_start_date");
//   const watchedEndDate = watch("trip_end_date");
//   const watchedGreenDaysForDisplay = watch("green_zone_days");

//   useEffect(() => {
//     if (watchedStartDate && watchedEndDate) {
//       const start = new Date(watchedStartDate);
//       const end = new Date(watchedEndDate);
//       if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
//         const diffTime = end.getTime() - start.getTime();
//         const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)) + 1;
//         setCalculatedTotalRiskZoneDays(diffDays);
//         setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("amber_zone_days")) !== 0) setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("red_zone_days")) !== 0) setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       } else {
//         setCalculatedTotalRiskZoneDays(null);
//         if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       }
//     } else {
//       setCalculatedTotalRiskZoneDays(null);
//       if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [watchedStartDate, watchedEndDate, setValue, getValues]);

//   useEffect(() => {
//     const subscription = watch((currentValues, { name, type }) => {
//       if (
//         (name === "amber_zone_days" || name === "red_zone_days") &&
//         type === "change" &&
//         calculatedTotalRiskZoneDays !== null
//       ) {
//         let amber = Number(currentValues.amber_zone_days || 0);
//         let red = Number(currentValues.red_zone_days || 0);

//         if (amber + red > calculatedTotalRiskZoneDays) {
//           if (name === "amber_zone_days") {
//             amber = calculatedTotalRiskZoneDays - red;
//             setValue("amber_zone_days", Math.max(0, amber), { shouldValidate: true, shouldDirty: true });
//           } else if (name === "red_zone_days") {
//             red = calculatedTotalRiskZoneDays - amber;
//             setValue("red_zone_days", Math.max(0, red), { shouldValidate: true, shouldDirty: true });
//           }
//         }
//         const newGreenDays = calculatedTotalRiskZoneDays - amber - red;
//         if (Number(getValues("green_zone_days")) !== Math.max(0, newGreenDays)) {
//           setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
//         }
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setValue, getValues, calculatedTotalRiskZoneDays]);


//   const cNameValue = watch("c_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     if (getValues("travellers")?.length > 0) {
//       if (getValues("travellers.0.name") !== cNameValue) setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_name });
//       if (getValues("travellers.0.birthdate") !== cBirthdateValue) setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_birthdate });
//     } else if (cNameValue || cBirthdateValue) {
//       setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || "" }]);
//     }
//   }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);


//   const onSubmitForm = (data: InsuranceFormValues) => {
//     // This function is called ONLY when the "Confirm & Purchase" button (type="submit") is clicked.
//     const finalData = {
//       ...data,
//       travellers: [{ name: data.c_name, birthdate: data.c_birthdate }],
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     alert("Confirm & Purchase clicked! Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     // This function is for the "Continue" button on steps 0 through steps.length - 2
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });

//     if (!currentStepValidationResult) {
//       const firstErrorKeyOnCurrentStep = currentStepFields.find(
//         (fieldName) => getError(fieldName as string) !== undefined
//       );
//       if (firstErrorKeyOnCurrentStep) {
//         const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
//         element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }

//     if (step === 0) {
//       const fieldsForCustomRuleCheck: Array<Path<InsuranceFormValues>> = [
//         "trip_start_date", "trip_end_date",
//         "green_zone_days", "amber_zone_days", "red_zone_days"
//       ];
//       await trigger(fieldsForCustomRuleCheck, { shouldFocus: false });

//       if (formState.errors.root?.message) {
//         alert(formState.errors.root.message);
//         const zoneDayElement = document.querySelector(`[name='amber_zone_days']`) || document.querySelector(`[name='red_zone_days']`);
//         zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         return;
//       }
//     }

//     // Only advance if not already on the second to last step (i.e., if there's a next step before the final summary)
//     // or if on any step before the last. The "Continue" button itself won't show on the last step.
//     if (step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error: FieldErrors | FieldError | undefined = formState.errors;
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
//       return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//     } catch (e) {
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
//       age--;
//     }
//     return age >= 0 ? age.toString() : "";
//   };

//   const watchedValuesForSummary = watch([
//     "trip_start_date", "trip_end_date",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
//     "c_name", "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_name", "emergency_contact_phone"
//   ]);
//   const watchedAmberZoneDaysForDisplay = watch("amber_zone_days");
//   const watchedRedZoneDaysForDisplay = watch("red_zone_days");


//   const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
//   const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;


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

//         <div className="bg-white p-6 md:p-8 shadow-lg rounded-md">
//           <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
//             {step === 0 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Where and When Are You Travelling?</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel label="Travel Start Date" name="trip_start_date" type="date" register={form.register} error={getError("trip_start_date")} />
//                   <InputWithLabel label="Travel End Date" name="trip_end_date" type="date" register={form.register} error={getError("trip_end_date")} />
//                 </div>

//                 <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel
//                     label="Total Days"
//                     name="displayTotalDays"
//                     type="number"
//                     value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays : ""}
//                     readOnly={true}
//                   />
//                   <InputWithLabel
//                     label="Green Zone Days"
//                     name="green_zone_days"
//                     type="number"
//                     value={watchedGreenDaysForDisplay}
//                     readOnly={true}
//                     register={form.register}
//                     error={getError("green_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Amber Zone Days"
//                     name="amber_zone_days"
//                     type="number"
//                     register={form.register}
//                     error={getError("amber_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Red Zone Days"
//                     name="red_zone_days"
//                     type="number"
//                     register={form.register}
//                     error={getError("red_zone_days")}
//                   />
//                 </div>

//                 {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}
//                 <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel
//                     label="Emergency Medical"
//                     name="emergency_medical_coverage"
//                     control={control}
//                     options={emergencyMedicalCoverageOptions}
//                     placeholder="Select Medical Coverage"
//                     error={getError("emergency_medical_coverage")}
//                   />
//                   <SelectWithLabel
//                     label="PA (Personal Accident)"
//                     name="personal_accident_coverage_level"
//                     control={control}
//                     options={personalAccidentCoverageOptions}
//                     placeholder="Select PA Coverage"
//                     error={getError("personal_accident_coverage_level")}
//                   />
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_transit_coverage" control={control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
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
//                   <SelectWithLabel label="Nationality" name="c_nationality" control={control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
//                   <InputWithLabel label="City of Residence" name="city_of_residence" register={form.register} error={getError("city_of_residence")} />
//                   <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
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
//                 <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={form.register} error={getError("company_name")} /></div>
//                 <p className="mt-6 text-sm text-orange-600"><span className="font-bold">⚠ Ensure your zone-day breakdown matches Trip Details page</span></p>
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
//                   <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
//                   {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label="List Conditions" error={getError("medical_conditions")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
//                   {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label="List Allergies" error={getError("allergies")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
//                   {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications")} />)}
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                   <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
//                 <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Travel Dates:</strong> {watchedValuesForSummary[0] || "N/A"} to {watchedValuesForSummary[1] || "N/A"}</div>
//                   <div><strong>Total Risk Zone Days:</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
//                   <div><strong>Risk Zone Breakdown:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Green: {watch("green_zone_days") || 0} days</li>
//                     <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
//                     <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
//                   </ul>
//                   <div><strong>Coverage Selected:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Medical: {getEmergencyMedicalLabel(watchedValuesForSummary[2] as string) || "N/A"}</li>
//                     <li>PA: {getPALabel(watchedValuesForSummary[3] as string) || "N/A"}</li>
//                     <li>Transit: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
//                   </ul>
//                   <div className="mt-4 pt-3 border-t">
//                     <strong className="text-xl">Total Quote:</strong>
//                     <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[5] || "N/A"}</div>
//                   <div><strong>Age:</strong> {calculateAge(watchedValuesForSummary[6] as string) || "N/A"}</div>
//                   <div><strong>Nationality:</strong> {getNationalityLabel(watchedValuesForSummary[7] as string) || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedValuesForSummary[8] as string) || "N/A"}</div>
//                   <div><strong>Primary Regions:</strong> {watchedValuesForSummary[9] || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
//                   <div><strong>Number:</strong> {watchedValuesForSummary[11] || "N/A"}</div>
//                 </div>

//                 <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={form.register} error={getError("affiliate_code")} /></div>

//                 <div className="flex items-start space-x-3">
//                   <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">I consent to sharing medical info in an emergency</Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Navigation Buttons - Corrected Logic */}
//             <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Back
//                 </Button>
//               )}
//               {/* "Modify Choices" button for Step 0 */}
//               {step === 0 && ! (step > 0) && ( // Ensure it only shows if no "Back" button is present
//                  <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Modify Choices
//                 </Button>
//               )}
//               {/* Spacer to push the right button to the edge if only one button is on the left */}
//               {step > 0 && step === 0 && <div className="w-full sm:w-auto"></div>}


//               {/* "Continue" Button: Show if NOT on the last step */}
//               {step < steps.length - 1 && (
//                 <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                   Continue
//                 </Button>
//               )}

//               {/* "Confirm & Purchase" Button: Show ONLY on the last step */}
//               {step === steps.length - 1 && (
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

// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   purchaseWithoutLoginSchema,
//   type InsuranceFormValues,
//   steps,
//   tripPurposes,
//   fieldsByStep,
//   emergencyMedicalCoverageOptions,
//   personalAccidentCoverageOptions,
//   nationalityOptions,
//   countryOptions,
// } from "@/lib/insuranceFormSchema";
// import {
//   InputWithLabel,
//   TextareaWithLabel,
//   ControlledTextareaArray,
//   SelectWithLabel,
//   DatePickerField // Ensure this is imported
// } from "./FormFields";

// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);
//   const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);

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
//       travellers: [{ name: "", birthdate: "" }],
//       is_company_arranged: false,
//       trip_cities: [],
//     },
//     mode: "onChange",
//   });

//   const { watch, setValue, getValues, trigger, formState, control } = form; // register is form.register now

//   const watchedStartDate = watch("trip_start_date");
//   const watchedEndDate = watch("trip_end_date");
//   const watchedGreenDaysForDisplay = watch("green_zone_days");

//   useEffect(() => {
//     if (watchedStartDate && watchedEndDate) {
//       const start = new Date(watchedStartDate);
//       const end = new Date(watchedEndDate);
//       if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
//         const diffTime = end.getTime() - start.getTime();
//         const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)) + 1;
//         setCalculatedTotalRiskZoneDays(diffDays);
//         setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("amber_zone_days")) !== 0) setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("red_zone_days")) !== 0) setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       } else {
//         setCalculatedTotalRiskZoneDays(null);
//         if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       }
//     } else {
//       setCalculatedTotalRiskZoneDays(null);
//       if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [watchedStartDate, watchedEndDate, setValue, getValues]);

//   useEffect(() => {
//     const subscription = watch((currentValues, { name, type }) => {
//       if (
//         (name === "amber_zone_days" || name === "red_zone_days") &&
//         type === "change" &&
//         calculatedTotalRiskZoneDays !== null
//       ) {
//         let amber = Number(currentValues.amber_zone_days || 0);
//         let red = Number(currentValues.red_zone_days || 0);
//         if (amber + red > calculatedTotalRiskZoneDays) {
//           if (name === "amber_zone_days") {
//             amber = calculatedTotalRiskZoneDays - red;
//             setValue("amber_zone_days", Math.max(0, amber), { shouldValidate: true, shouldDirty: true });
//           } else if (name === "red_zone_days") {
//             red = calculatedTotalRiskZoneDays - amber;
//             setValue("red_zone_days", Math.max(0, red), { shouldValidate: true, shouldDirty: true });
//           }
//         }
//         const newGreenDays = calculatedTotalRiskZoneDays - amber - red;
//         if (Number(getValues("green_zone_days")) !== Math.max(0, newGreenDays)) {
//           setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
//         }
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setValue, getValues, calculatedTotalRiskZoneDays]);

//   const cNameValue = watch("c_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     if (getValues("travellers")?.length > 0) {
//       if (getValues("travellers.0.name") !== cNameValue) setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_name });
//       if (getValues("travellers.0.birthdate") !== cBirthdateValue) setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_birthdate });
//     } else if (cNameValue || cBirthdateValue) {
//       setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || "" }]);
//     }
//   }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);

//   const onSubmitForm = (data: InsuranceFormValues) => {
//     const finalData = {
//       ...data,
//       travellers: [{ name: data.c_name, birthdate: data.c_birthdate }],
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     alert("Confirm & Purchase clicked! Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });
//     if (!currentStepValidationResult) {
//       const firstErrorKeyOnCurrentStep = currentStepFields.find(
//         (fieldName) => getError(fieldName as string) !== undefined
//       );
//       if (firstErrorKeyOnCurrentStep) {
//         const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
//         element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }
//     if (step === 0) {
//       const fieldsForCustomRuleCheck: Array<Path<InsuranceFormValues>> = [
//         "trip_start_date", "trip_end_date",
//         "green_zone_days", "amber_zone_days", "red_zone_days"
//       ];
//       await trigger(fieldsForCustomRuleCheck, { shouldFocus: false });
//       if (formState.errors.root?.message) {
//         alert(formState.errors.root.message);
//         const zoneDayElement = document.querySelector(`[name='amber_zone_days']`) || document.querySelector(`[name='red_zone_days']`);
//         zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         return;
//       }
//     }
//     if (step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let error: FieldErrors | FieldError | undefined = formState.errors;
//     try {
//       for (const key of keys) {
//         const k = key.match(/^\d+$/) ? parseInt(key, 10) : key;
//         if (error && typeof error === 'object' && error !== null) {
//           const typedError = error as Record<string | number, unknown>;
//           if (k in typedError) {
//             error = typedError[k] as FieldErrors | FieldError;
//           } else { return undefined; }
//         } else { return undefined; }
//       }
//       return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
//     } catch { return undefined; }
//   };

//   const calculateAge = (birthdate: string) => {
//     if (!birthdate) return "";
//     const birthDate = new Date(birthdate);
//     if (isNaN(birthDate.getTime())) return "";
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age >= 0 ? age.toString() : "";
//   };

//   const watchedValuesForSummary = watch([
//     "trip_start_date", "trip_end_date",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
//     "c_name", "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_name", "emergency_contact_phone"
//   ]);
//   const watchedAmberZoneDaysForDisplay = watch("amber_zone_days");
//   const watchedRedZoneDaysForDisplay = watch("red_zone_days");

//   const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
//   const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;

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

//         <div className="bg-white p-6 md:p-8 shadow-lg rounded-md">
//           <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
//             {/* Page 0: Trip & Coverage */}
//             {step === 0 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Where and When Are You Travelling?</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <DatePickerField label="Travel Start Date" name="trip_start_date" control={control} error={getError("trip_start_date")} placeholder="Select start date"/>
//                   <DatePickerField label="Travel End Date" name="trip_end_date" control={control} error={getError("trip_end_date")} placeholder="Select end date"/>
//                 </div>

//                 <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel
//                     label="Total Days"
//                     name="displayTotalDays" // Not a real form field name for RHF schema
//                     type="number"
//                     value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays : ""}
//                     readOnly={true}
//                     // No register prop for display-only
//                   />
//                   <InputWithLabel
//                     label="Green Zone Days"
//                     name="green_zone_days"
//                     type="number"
//                     value={watchedGreenDaysForDisplay}
//                     readOnly={true}
//                     register={form.register} // Registered for validation
//                     error={getError("green_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Amber Zone Days"
//                     name="amber_zone_days"
//                     type="number"
//                     register={form.register}
//                     error={getError("amber_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Red Zone Days"
//                     name="red_zone_days"
//                     type="number"
//                     register={form.register}
//                     error={getError("red_zone_days")}
//                   />
//                 </div>

//                 {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}
//                 <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel label="Emergency Medical" name="emergency_medical_coverage" control={control} options={emergencyMedicalCoverageOptions} placeholder="Select Medical Coverage" error={getError("emergency_medical_coverage")} />
//                   <SelectWithLabel label="PA (Personal Accident)" name="personal_accident_coverage_level" control={control} options={personalAccidentCoverageOptions} placeholder="Select PA Coverage" error={getError("personal_accident_coverage_level")} />
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_transit_coverage" control={control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
//                   <div className="text-sm mt-2">
//                     <p>Medical: {getEmergencyMedicalLabel(watch("emergency_medical_coverage"))}</p>
//                     <p>PA: {getPALabel(watch("personal_accident_coverage_level"))}</p>
//                     <p>Transit: {watch("add_transit_coverage") ? "Yes (250k)" : "No"}</p>
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Step 1: Your Details */}
//             {step === 1 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Your Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
//                   <div>
//                     <DatePickerField label="Date of Birth" name="c_birthdate" control={control} error={getError("c_birthdate")} placeholder="Select date of birth"/>
//                     {watch("c_birthdate") && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch("c_birthdate"))}</p>}
//                   </div>
//                   <InputWithLabel label="Phone Number" name="c_phone" type="tel" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp (optional)" name="c_whats_app" type="tel" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Email Address" name="c_email" type="email" register={form.register} error={getError("c_email")} />
//                   <SelectWithLabel label="Nationality" name="c_nationality" control={control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
//                   <InputWithLabel label="City of Residence" name="city_of_residence" register={form.register} error={getError("city_of_residence")} />
//                   <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
//                 </div>
//               </>
//             )}

//             {/* Step 2: Trip Information */}
//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <DatePickerField label="Arrival in Ukraine (Optional)" name="arrival_in_ukraine" control={control} error={getError("arrival_in_ukraine")} placeholder="Select arrival date"/>
//                   <DatePickerField label="Departure from Ukraine (Optional)" name="departure_from_ukraine" control={control} error={getError("departure_from_ukraine")} placeholder="Select departure date"/>
//                 </div>
//                 <div className="mt-6"><InputWithLabel label="Primary Cities/Regions (in Ukraine, Optional)" name="primary_cities_regions_ukraine" register={form.register} error={getError("primary_cities_regions_ukraine")} /></div>
//                 <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={form.register} error={getError("company_name")} /></div>
//                 <p className="mt-6 text-sm text-orange-600"><span className="font-bold">⚠ Ensure your zone-day breakdown matches Trip Details page</span></p>
//               </>
//             )}

//             {/* Step 3: Medical & Emergency Contact */}
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
//                   <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
//                   {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label="List Conditions" error={getError("medical_conditions")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
//                   {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label="List Allergies" error={getError("allergies")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
//                   {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications")} />)}
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                   <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {/* Step 4: Final Summary + Purchase */}
//             {step === 4 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
//                 <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Travel Dates:</strong> {watchedValuesForSummary[0] || "N/A"} to {watchedValuesForSummary[1] || "N/A"}</div>
//                   <div><strong>Total Risk Zone Days:</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
//                   <div><strong>Risk Zone Breakdown:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Green: {watch("green_zone_days") || 0} days</li>
//                     <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
//                     <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
//                   </ul>
//                   <div><strong>Coverage Selected:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Medical: {getEmergencyMedicalLabel(watchedValuesForSummary[2] as string) || "N/A"}</li>
//                     <li>PA: {getPALabel(watchedValuesForSummary[3] as string) || "N/A"}</li>
//                     <li>Transit: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
//                   </ul>
//                   <div className="mt-4 pt-3 border-t">
//                     <strong className="text-xl">Total Quote:</strong>
//                     <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[5] || "N/A"}</div>
//                   <div><strong>Age:</strong> {calculateAge(watchedValuesForSummary[6] as string) || "N/A"}</div>
//                   <div><strong>Nationality:</strong> {getNationalityLabel(watchedValuesForSummary[7] as string) || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedValuesForSummary[8] as string) || "N/A"}</div>
//                   <div><strong>Primary Regions:</strong> {watchedValuesForSummary[9] || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
//                   <div><strong>Number:</strong> {watchedValuesForSummary[11] || "N/A"}</div>
//                 </div>

//                 <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={form.register} error={getError("affiliate_code")} /></div>

//                 <div className="flex items-start space-x-3">
//                   <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">I consent to sharing medical info in an emergency</Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}

//             <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Back
//                 </Button>
//               )}
//               {step === 0 && !(step > 0) && (
//                 <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
//                   Modify Choices
//                 </Button>
//               )}
//               {step > 0 && step === 0 && <div className="w-full sm:w-auto"></div>}
//               {step < steps.length - 1 && (
//                 <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                   Continue
//                 </Button>
//               )}
//               {step === steps.length - 1 && (
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

// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button"; // This is your RHF Button, alias shadcn one if needed
// import {
//   purchaseWithoutLoginSchema,
//   type InsuranceFormValues,
//   steps,
//   tripPurposes,
//   fieldsByStep,
//   emergencyMedicalCoverageOptions,
//   personalAccidentCoverageOptions,
//   nationalityOptions,
//   countryOptions,
// } from "@/lib/insuranceFormSchema";
// import {
//   InputWithLabel,
//   TextareaWithLabel,
//   ControlledTextareaArray,
//   SelectWithLabel,
//   DatePickerField
// } from "./FormFields";
// import { format as formatDateFn } from "date-fns"; // For summary display

// // For Basic Popover Test (Remove after testing)
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Button as ShadButton } from "@/components/ui/button";
// import { Calendar as ShadCalendar } from "@/components/ui/calendar";
// import { CalendarIcon as ShadCalendarIcon } from "lucide-react";


// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);
//   const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);

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
//       travellers: [{ name: "", birthdate: "" }],
//       is_company_arranged: false,
//       trip_cities: [],
//     },
//     mode: "onChange",
//   });

//   const { watch, setValue, getValues, trigger, formState, control } = form;

//   const watchedStartDate = watch("trip_start_date");
//   const watchedEndDate = watch("trip_end_date");
//   const watchedArrivalUkraine = watch("arrival_in_ukraine");
//   const watchedDepartureUkraine = watch("departure_from_ukraine");
//   const watchedGreenDaysForDisplay = watch("green_zone_days");

//   useEffect(() => {
//     if (watchedStartDate && watchedEndDate) {
//       const start = new Date(watchedStartDate + "T00:00:00");
//       const end = new Date(watchedEndDate + "T00:00:00");
//       if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
//         const diffTime = end.getTime() - start.getTime();
//         const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)) + 1;
//         setCalculatedTotalRiskZoneDays(diffDays);
//         setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("amber_zone_days")) !== 0) setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("red_zone_days")) !== 0) setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       } else {
//         setCalculatedTotalRiskZoneDays(null);
//         if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       }
//     } else {
//       setCalculatedTotalRiskZoneDays(null);
//       if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [watchedStartDate, watchedEndDate, setValue, getValues]);

//   useEffect(() => {
//     const subscription = watch((currentValues, { name, type }) => {
//       if (
//         (name === "amber_zone_days" || name === "red_zone_days") &&
//         type === "change" &&
//         calculatedTotalRiskZoneDays !== null
//       ) {
//         let amber = Number(currentValues.amber_zone_days || 0);
//         let red = Number(currentValues.red_zone_days || 0);
//         if (amber + red > calculatedTotalRiskZoneDays) {
//           if (name === "amber_zone_days") {
//             amber = calculatedTotalRiskZoneDays - red;
//             setValue("amber_zone_days", Math.max(0, amber), { shouldValidate: true, shouldDirty: true });
//           } else if (name === "red_zone_days") {
//             red = calculatedTotalRiskZoneDays - amber;
//             setValue("red_zone_days", Math.max(0, red), { shouldValidate: true, shouldDirty: true });
//           }
//         }
//         const newGreenDays = calculatedTotalRiskZoneDays - amber - red;
//         if (Number(getValues("green_zone_days")) !== Math.max(0, newGreenDays)) {
//           setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
//         }
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setValue, getValues, calculatedTotalRiskZoneDays]);

//   const cNameValue = watch("c_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     if (getValues("travellers")?.length > 0) {
//       if (getValues("travellers.0.name") !== cNameValue) setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && !!formState.dirtyFields.c_name });
//       if (getValues("travellers.0.birthdate") !== cBirthdateValue) setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && !!formState.dirtyFields.c_birthdate });
//     } else if (cNameValue || cBirthdateValue) {
//       setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || "" }]);
//     }
//   }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);

//   const onSubmitForm = (data: InsuranceFormValues) => {
//     const finalData = {
//       ...data,
//       travellers: [{ name: data.c_name, birthdate: data.c_birthdate }],
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     alert("Confirm & Purchase clicked! Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });
//     if (!currentStepValidationResult) {
//       const firstErrorKeyOnCurrentStep = currentStepFields.find(
//         (fieldName) => getError(fieldName as string) !== undefined
//       );
//       if (firstErrorKeyOnCurrentStep) {
//         const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
//         element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }
//     if (step === 0) {
//       const fieldsForCustomRuleCheck: Array<Path<InsuranceFormValues>> = [
//         "trip_start_date", "trip_end_date",
//         "green_zone_days", "amber_zone_days", "red_zone_days"
//       ];
//       await trigger(fieldsForCustomRuleCheck, { shouldFocus: false });
//       if (formState.errors.root?.message) {
//         alert(formState.errors.root.message);
//         const zoneDayElement = document.querySelector(`[name='amber_zone_days']`) || document.querySelector(`[name='red_zone_days']`);
//         zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         return;
//       }
//     }
//     if (step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let errorObj: FieldErrors | FieldError | undefined = formState.errors;
//     try {
//       for (const key of keys) {
//         const k = key.match(/^\d+$/) ? parseInt(key, 10) : key;
//         if (errorObj && typeof errorObj === 'object' && errorObj !== null) {
//           const typedError = errorObj as Record<string | number, any>;
//           if (k in typedError) {
//             errorObj = typedError[k] as FieldErrors | FieldError;
//           } else { return undefined; }
//         } else { return undefined; }
//       }
//       return (errorObj && typeof errorObj === 'object' && 'message' in errorObj) ? errorObj as FieldError : undefined;
//     } catch { return undefined; }
//   };

//   const calculateAge = (birthdate: string) => {
//     if (!birthdate) return "";
//     const birthDateObj = new Date(birthdate + "T00:00:00");
//     if (isNaN(birthDateObj.getTime())) return "";
//     const today = new Date();
//     let age = today.getFullYear() - birthDateObj.getFullYear();
//     const m = today.getMonth() - birthDateObj.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
//       age--;
//     }
//     return age >= 0 ? age.toString() : "";
//   };

//   const formatDateForDisplay = (dateString: string | undefined): string => {
//     if (!dateString) return "N/A";
//     try {
//       const dateObj = new Date(dateString + "T00:00:00"); 
//       if (isNaN(dateObj.getTime())) return "Invalid Date";
//       return formatDateFn(dateObj, "PPP");
//     } catch (e) {
//       console.error("Error formatting date for display:", dateString, e);
//       return "Invalid Date";
//     }
//   };

//   const watchedValuesForSummary = watch([
//     "trip_start_date", "trip_end_date",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
//     "c_name", "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_name", "emergency_contact_phone"
//   ]);
//   const watchedAmberZoneDaysForDisplay = watch("amber_zone_days");
//   const watchedRedZoneDaysForDisplay = watch("red_zone_days");

//   const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
//   const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;

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

//         <div className="bg-white p-6 md:p-8 shadow-lg rounded-md">
//           <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
//             {step === 0 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Where and When Are You Travelling?</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <DatePickerField
//                     label="Travel Start Date"
//                     name="trip_start_date"
//                     control={control}
//                     error={getError("trip_start_date")}
//                     placeholder="Select start date"
//                     maxDate={watchedEndDate ? new Date(watchedEndDate + "T00:00:00") : undefined}
//                   />
//                   <DatePickerField
//                     label="Travel End Date"
//                     name="trip_end_date"
//                     control={control}
//                     error={getError("trip_end_date")}
//                     placeholder="Select end date"
//                     minDate={watchedStartDate ? new Date(watchedStartDate + "T00:00:00") : undefined}
//                   />
//                 </div>
//                 {/* ... rest of step 0 ... */}
//                 <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel
//                     label="Total Days"
//                     name="displayTotalDays"
//                     type="number"
//                     value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays : ""}
//                     readOnly={true}
//                   />
//                   <InputWithLabel
//                     label="Green Zone Days"
//                     name="green_zone_days"
//                     type="number"
//                     value={watchedGreenDaysForDisplay}
//                     readOnly={true}
//                     register={form.register}
//                     error={getError("green_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Amber Zone Days"
//                     name="amber_zone_days"
//                     type="number"
//                     register={form.register}
//                     error={getError("amber_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Red Zone Days"
//                     name="red_zone_days"
//                     type="number"
//                     register={form.register}
//                     error={getError("red_zone_days")}
//                   />
//                 </div>

//                 {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}
//                 <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel label="Emergency Medical" name="emergency_medical_coverage" control={control} options={emergencyMedicalCoverageOptions} placeholder="Select Medical Coverage" error={getError("emergency_medical_coverage")} />
//                   <SelectWithLabel label="PA (Personal Accident)" name="personal_accident_coverage_level" control={control} options={personalAccidentCoverageOptions} placeholder="Select PA Coverage" error={getError("personal_accident_coverage_level")} />
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_transit_coverage" control={control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
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
//                     <DatePickerField
//                         label="Date of Birth"
//                         name="c_birthdate"
//                         control={control}
//                         error={getError("c_birthdate")}
//                         placeholder="Select date of birth"
//                         maxDate={new Date()} 
//                     />
//                     {watch("c_birthdate") && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch("c_birthdate"))}</p>}
//                   </div>
//                   {/* ... rest of step 1 ... */}
//                   <InputWithLabel label="Phone Number" name="c_phone" type="tel" register={form.register} error={getError("c_phone")} />
//                   <InputWithLabel label="WhatsApp (optional)" name="c_whats_app" type="tel" register={form.register} error={getError("c_whats_app")} />
//                   <InputWithLabel label="Email Address" name="c_email" type="email" register={form.register} error={getError("c_email")} />
//                   <SelectWithLabel label="Nationality" name="c_nationality" control={control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
//                   <InputWithLabel label="City of Residence" name="city_of_residence" register={form.register} error={getError("city_of_residence")} />
//                   <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
//                 </div>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <DatePickerField
//                     label="Arrival in Ukraine (Optional)"
//                     name="arrival_in_ukraine"
//                     control={control}
//                     error={getError("arrival_in_ukraine")}
//                     placeholder="Select arrival date"
//                     maxDate={watchedDepartureUkraine ? new Date(watchedDepartureUkraine + "T00:00:00") : undefined}
//                   />
//                   <DatePickerField
//                     label="Departure from Ukraine (Optional)"
//                     name="departure_from_ukraine"
//                     control={control}
//                     error={getError("departure_from_ukraine")}
//                     placeholder="Select departure date"
//                     minDate={watchedArrivalUkraine ? new Date(watchedArrivalUkraine + "T00:00:00") : undefined}
//                   />
//                 </div>
//                 {/* ... rest of step 2 ... */}
//                 <div className="mt-6"><InputWithLabel label="Primary Cities/Regions (in Ukraine, Optional)" name="primary_cities_regions_ukraine" register={form.register} error={getError("primary_cities_regions_ukraine")} /></div>
//                 <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={form.register} error={getError("company_name")} /></div>
//                 <p className="mt-6 text-sm text-orange-600"><span className="font-bold">⚠ Ensure your zone-day breakdown matches Trip Details page</span></p>
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
//                   <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
//                   {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label="List Conditions" error={getError("medical_conditions")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
//                   {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label="List Allergies" error={getError("allergies")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
//                   {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications")} />)}
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
//                   <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
//                 <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Travel Dates:</strong> {formatDateForDisplay(watchedValuesForSummary[0] as string)} to {formatDateForDisplay(watchedValuesForSummary[1] as string)}</div>
//                   <div><strong>Total Risk Zone Days:</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
//                   <div><strong>Risk Zone Breakdown:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Green: {watch("green_zone_days") || 0} days</li>
//                     <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
//                     <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
//                   </ul>
//                   <div><strong>Coverage Selected:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Medical: {getEmergencyMedicalLabel(watchedValuesForSummary[2] as string) || "N/A"}</li>
//                     <li>PA: {getPALabel(watchedValuesForSummary[3] as string) || "N/A"}</li>
//                     <li>Transit: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
//                   </ul>
//                   <div className="mt-4 pt-3 border-t">
//                     <strong className="text-xl">Total Quote:</strong>
//                     <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[5] || "N/A"}</div>
//                   <div><strong>Age:</strong> {calculateAge(watchedValuesForSummary[6] as string) || "N/A"}</div>
//                   <div><strong>Nationality:</strong> {getNationalityLabel(watchedValuesForSummary[7] as string) || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedValuesForSummary[8] as string) || "N/A"}</div>
//                   <div><strong>Primary Regions:</strong> {watchedValuesForSummary[9] || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
//                   <div><strong>Number:</strong> {watchedValuesForSummary[11] || "N/A"}</div>
//                 </div>

//                 <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={form.register} error={getError("affiliate_code")} /></div>

//                 <div className="flex items-start space-x-3">
//                   <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">I consent to sharing medical info in an emergency</Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}

//             <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
//                 {step > 0 && (
//                     <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
//                     Back
//                     </Button>
//                 )}
//                 {step === 0 && (
//                     <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
//                     Modify Choices
//                     </Button>
//                 )}
//                 {(step > 0) && <div className="sm:flex-grow hidden sm:block"></div>} {/* Updated spacer logic */}
//                 {step < steps.length - 1 && (
//                     <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                     Continue
//                     </Button>
//                 )}
//                 {step === steps.length - 1 && (
//                     <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white" disabled={formState.isSubmitting}>
//                     {formState.isSubmitting ? "Processing..." : "Confirm & Purchase"}
//                     </Button>
//                 )}
//             </div>
//           </form>
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
//   purchaseWithoutLoginSchema,
//   type InsuranceFormValues,
//   steps,
//   tripPurposes,
//   fieldsByStep,
//   emergencyMedicalCoverageOptions,
//   personalAccidentCoverageOptions,
//   nationalityOptions, // Import the corrected version
//   countryOptions,     // Import the corrected version
// } from "@/lib/insuranceFormSchema";
// import {
//   InputWithLabel,
//   TextareaWithLabel,
//   ControlledTextareaArray,
//   SelectWithLabel,
//   DatePickerField
// } from "./FormFields";
// import { format as formatDateFn } from "date-fns";


// // REMOVE the problematic { value: "", label: "Code" }
// const countryCodeOptions = [
//   // { value: "", label: "Code" }, // REMOVED
//   { value: "+1", label: "+1 (USA/CAN)" },
//   { value: "+44", label: "+44 (UK)" },
//   { value: "+91", label: "+91 (India)" },
//   { value: "+61", label: "+61 (Australia)" },
//   { value: "+49", label: "+49 (Germany)" },
//   { value: "+33", label: "+33 (France)" },
//   { value: "+81", label: "+81 (Japan)" },
//   { value: "+86", label: "+86 (China)" },
//   { value: "+380", label: "+380 (Ukraine)" },
// ];


// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);
//   const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);

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
//       c_phone_code: "", // Default to empty string, placeholder will show
//       c_phone_number: "",
//       c_whats_app: "",
//       c_whats_app_code: "", // Default to empty string
//       c_whats_app_number: "",
//       c_email: "",
//       c_nationality: "", // Default to empty string
//       city_of_residence: "",
//       trip_countries: [], // Stays as array, select will handle first item with empty string value
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_purpose: "",
//       stay_name: "",
//       company_name: "",
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_phone_code: "", // Default to empty string
//       emergency_contact_phone_number: "",
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
//       travellers: [{ name: "", birthdate: "" }],
//       is_company_arranged: false,
//       trip_cities: [],
//     },
//     mode: "onChange",
//   });

//   const { watch, setValue, getValues, trigger, formState, control, register } = form;

//   const watchedStartDate = watch("trip_start_date");
//   const watchedEndDate = watch("trip_end_date");
//   const watchedGreenDaysForDisplay = watch("green_zone_days");

//   useEffect(() => {
//     if (watchedStartDate && watchedEndDate) {
//       const start = new Date(watchedStartDate + "T00:00:00");
//       const end = new Date(watchedEndDate + "T00:00:00");
//       if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
//         const diffTime = end.getTime() - start.getTime();
//         const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)) + 1;
//         setCalculatedTotalRiskZoneDays(diffDays);
//         setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("amber_zone_days")) !== 0) setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("red_zone_days")) !== 0) setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       } else {
//         setCalculatedTotalRiskZoneDays(null);
//         if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       }
//     } else {
//       setCalculatedTotalRiskZoneDays(null);
//       if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [watchedStartDate, watchedEndDate, setValue, getValues]);

//   useEffect(() => {
//     const subscription = watch((currentValues, { name, type }) => {
//       if (
//         (name === "amber_zone_days" || name === "red_zone_days") &&
//         type === "change" &&
//         calculatedTotalRiskZoneDays !== null
//       ) {
//         let amber = Number(currentValues.amber_zone_days || 0);
//         let red = Number(currentValues.red_zone_days || 0);
//         if (amber + red > calculatedTotalRiskZoneDays) {
//           if (name === "amber_zone_days") {
//             amber = calculatedTotalRiskZoneDays - red;
//             setValue("amber_zone_days", Math.max(0, amber), { shouldValidate: true, shouldDirty: true });
//           } else if (name === "red_zone_days") {
//             red = calculatedTotalRiskZoneDays - amber;
//             setValue("red_zone_days", Math.max(0, red), { shouldValidate: true, shouldDirty: true });
//           }
//         }
//         const newGreenDays = calculatedTotalRiskZoneDays - amber - red;
//         if (Number(getValues("green_zone_days")) !== Math.max(0, newGreenDays)) {
//           setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
//         }
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setValue, getValues, calculatedTotalRiskZoneDays]);

//   const cNameValue = watch("c_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     if (getValues("travellers")?.length > 0) {
//       if (getValues("travellers.0.name") !== cNameValue) setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && !!formState.dirtyFields.c_name });
//       if (getValues("travellers.0.birthdate") !== cBirthdateValue) setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && !!formState.dirtyFields.c_birthdate });
//     } else if (cNameValue || cBirthdateValue) {
//       setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || "" }]);
//     }
//   }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);

//   const cPhoneCode = watch("c_phone_code" as any);
//   const cPhoneNumber = watch("c_phone_number" as any);
//   useEffect(() => {
//     const fullNumber = `${cPhoneCode || ''}${cPhoneNumber || ''}`;
//     if (getValues("c_phone") !== fullNumber) {
//       setValue("c_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cPhoneCode, cPhoneNumber, setValue, getValues]);

//   const cWhatsAppCode = watch("c_whats_app_code" as any);
//   const cWhatsAppNumber = watch("c_whats_app_number" as any);
//   useEffect(() => {
//     const fullNumber = `${cWhatsAppCode || ''}${cWhatsAppNumber || ''}`;
//     if (getValues("c_whats_app") !== fullNumber) {
//         setValue("c_whats_app", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cWhatsAppCode, cWhatsAppNumber, setValue, getValues]);

//   const emergencyContactPhoneCode = watch("emergency_contact_phone_code" as any);
//   const emergencyContactPhoneNumber = watch("emergency_contact_phone_number" as any);
//   useEffect(() => {
//     const fullNumber = `${emergencyContactPhoneCode || ''}${emergencyContactPhoneNumber || ''}`;
//     if (getValues("emergency_contact_phone") !== fullNumber) {
//       setValue("emergency_contact_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [emergencyContactPhoneCode, emergencyContactPhoneNumber, setValue, getValues]);


//   const onSubmitForm = (data: InsuranceFormValues) => {
//     const finalData = {
//       ...data,
//       c_phone: `${getValues("c_phone_code" as any) || ''}${getValues("c_phone_number" as any) || ''}`,
//       c_whats_app: `${getValues("c_whats_app_code" as any) || ''}${getValues("c_whats_app_number" as any) || ''}`,
//       emergency_contact_phone: `${getValues("emergency_contact_phone_code" as any) || ''}${getValues("emergency_contact_phone_number" as any) || ''}`,
//       travellers: [{ name: data.c_name, birthdate: data.c_birthdate }],
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     alert("Confirm & Purchase clicked! Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const partFieldsToValidate: string[] = [];
//     if (step === 1) {
//         partFieldsToValidate.push("c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number");
//     }
//     if (step === 3) {
//         partFieldsToValidate.push("emergency_contact_phone_code", "emergency_contact_phone_number");
//     }
//     if (partFieldsToValidate.length > 0) { // Only trigger if there are part fields for the current step
//         await trigger(partFieldsToValidate as any);
//     }

//     const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });

//     if (!currentStepValidationResult) {
//       const firstErrorKeyOnCurrentStep = currentStepFields.find(
//         (fieldName) => getError(fieldName as string) !== undefined
//       );
//       if (firstErrorKeyOnCurrentStep) {
//         const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
//         element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }
//     if (step === 0) {
//       const fieldsForCustomRuleCheck: Array<Path<InsuranceFormValues>> = [
//         "trip_start_date", "trip_end_date",
//         "green_zone_days", "amber_zone_days", "red_zone_days"
//       ];
//       await trigger(fieldsForCustomRuleCheck, { shouldFocus: false });
//       if (formState.errors.root?.message) {
//         alert(formState.errors.root.message);
//         const zoneDayElement = document.querySelector(`[name='amber_zone_days']`) || document.querySelector(`[name='red_zone_days']`);
//         zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         return;
//       }
//     }
//     if (step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let errorObj: FieldErrors | FieldError | undefined = formState.errors;
//     try {
//       for (const key of keys) {
//         const k = key.match(/^\d+$/) ? parseInt(key, 10) : key;
//         if (errorObj && typeof errorObj === 'object' && errorObj !== null) {
//           const typedError = errorObj as Record<string | number, any>;
//           if (k in typedError) {
//             errorObj = typedError[k] as FieldErrors | FieldError;
//           } else { return undefined; }
//         } else { return undefined; }
//       }
//       return (errorObj && typeof errorObj === 'object' && 'message' in errorObj) ? errorObj as FieldError : undefined;
//     } catch { return undefined; }
//   };

//   const calculateAge = (birthdate: string) => {
//     if (!birthdate) return "";
//     const birthDateObj = new Date(birthdate + "T00:00:00");
//     if (isNaN(birthDateObj.getTime())) return "";
//     const today = new Date();
//     let age = today.getFullYear() - birthDateObj.getFullYear();
//     const m = today.getMonth() - birthDateObj.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
//       age--;
//     }
//     return age >= 0 ? age.toString() : "";
//   };

//   const formatDateForDisplay = (dateString: string | undefined): string => {
//     if (!dateString) return "N/A";
//     try {
//       const dateObj = new Date(dateString + "T00:00:00"); 
//       if (isNaN(dateObj.getTime())) return "Invalid Date";
//       return formatDateFn(dateObj, "PPP");
//     } catch (e) {
//       console.error("Error formatting date for display:", dateString, e);
//       return "Invalid Date";
//     }
//   };

//   const watchedValuesForSummary = watch([
//     "trip_start_date", "trip_end_date",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
//     "c_name", "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_name", "emergency_contact_phone"
//   ]);
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
//           <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
//             {step === 0 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Travel Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <DatePickerField
//                     label="Travel Start Date"
//                     name="trip_start_date"
//                     control={control}
//                     error={getError("trip_start_date")}
//                     placeholder="Select start date"
//                     maxDate={watchedEndDate ? new Date(watchedEndDate + "T00:00:00") : undefined}
//                   />
//                   <DatePickerField
//                     label="Travel End Date"
//                     name="trip_end_date"
//                     control={control}
//                     error={getError("trip_end_date")}
//                     placeholder="Select end date"
//                     minDate={watchedStartDate ? new Date(watchedStartDate + "T00:00:00") : undefined}
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel
//                     label="Total Days"
//                     name="displayTotalDays"
//                     type="number"
//                     value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays : ""}
//                     readOnly={true}
//                   />
//                   <InputWithLabel
//                     label="Green Zone Days"
//                     name="green_zone_days"
//                     type="number"
//                     value={watchedGreenDaysForDisplay}
//                     readOnly={true}
//                     register={register}
//                     error={getError("green_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Amber Zone Days"
//                     name="amber_zone_days"
//                     type="number"
//                     register={register}
//                     error={getError("amber_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Red Zone Days"
//                     name="red_zone_days"
//                     type="number"
//                     register={register}
//                     error={getError("red_zone_days")}
//                   />
//                 </div>

//                 {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}
//                 <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel label="Emergency Medical" name="emergency_medical_coverage" control={control} options={emergencyMedicalCoverageOptions} placeholder="Select Medical Coverage" error={getError("emergency_medical_coverage")} />
//                   <SelectWithLabel label="PA (Personal Accident)" name="personal_accident_coverage_level" control={control} options={personalAccidentCoverageOptions} placeholder="Select PA Coverage" error={getError("personal_accident_coverage_level")} />
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_transit_coverage" control={control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
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
//                   <InputWithLabel label="Full Name" name="c_name" register={register} error={getError("c_name")} />
//                   <div>
//                     <DatePickerField
//                         label="Date of Birth"
//                         name="c_birthdate"
//                         control={control}
//                         error={getError("c_birthdate")}
//                         placeholder="Select date of birth"
//                         maxDate={new Date()} 
//                     />
//                     {watch("c_birthdate") && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch("c_birthdate"))}</p>}
//                   </div>
                  
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1">Phone Number</p>
//                     <div className="flex items-start gap-2">
//                       <div className="w-1/3 shrink-0">
//                         <SelectWithLabel
//                           control={control}
//                           name={"c_phone_code" as any}
//                           label="" 
//                           options={countryCodeOptions}
//                           placeholder="Code" // This placeholder is for SelectValue
//                         />
//                       </div>
//                       <div className="flex-grow">
//                          <InputWithLabel
//                             label=""
//                             name={"c_phone_number" as any}
//                             type="tel"
//                             register={register}
//                             placeholder="Enter number"
//                           />
//                       </div>
//                     </div>
//                     {getError("c_phone") && <p className="text-sm text-red-500 mt-1">{getError("c_phone")?.message}</p>}
//                   </div>

//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1">WhatsApp (optional)</p>
//                     <div className="flex items-start gap-2">
//                       <div className="w-1/3 shrink-0">
//                          <SelectWithLabel
//                             control={control}
//                             name={"c_whats_app_code" as any}
//                             label=""
//                             options={countryCodeOptions}
//                             placeholder="Code" // This placeholder is for SelectValue
//                           />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label=""
//                           name={"c_whats_app_number" as any}
//                           type="tel"
//                           register={register}
//                           placeholder="Enter number"
//                         />
//                       </div>
//                     </div>
//                     {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
//                   </div>

//                   <InputWithLabel label="Email Address" name="c_email" type="email" register={register} error={getError("c_email")} />
//                   <SelectWithLabel label="Nationality" name="c_nationality" control={control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
//                   <InputWithLabel label="City of Residence" name="city_of_residence" register={register} error={getError("city_of_residence")} />
//                   <SelectWithLabel 
//                     label="Country Travelling To" 
//                     name="trip_countries.0" // RHF treats this as a string path
//                     control={control} 
//                     options={countryOptions} 
//                     placeholder="Select Country" 
//                     error={getError("trip_countries.0") || getError("trip_countries")} 
//                   />
//                 </div>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
//                 <div className="mt-6"><InputWithLabel label="Primary Cities/Regions (in Ukraine, Optional)" name="primary_cities_regions_ukraine" register={register} error={getError("primary_cities_regions_ukraine")} /></div>
//                 <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={register} error={getError("stay_name")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={register} error={getError("company_name")} /></div>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Emergency Contact Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Contact Name" name="emergency_contact_name" register={register} error={getError("emergency_contact_name")} />
                  
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1">Contact Number</p>
//                     <div className="flex items-start gap-2">
//                       <div className="w-1/3 shrink-0">
//                         <SelectWithLabel
//                             control={control}
//                             name={"emergency_contact_phone_code" as any}
//                             label=""
//                             options={countryCodeOptions}
//                             placeholder="Code" // This placeholder is for SelectValue
//                           />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                             label=""
//                             name={"emergency_contact_phone_number" as any}
//                             type="tel"
//                             register={register}
//                             placeholder="Enter number"
//                           />
//                       </div>
//                     </div>
//                     {getError("emergency_contact_phone") && <p className="text-sm text-red-500 mt-1">{getError("emergency_contact_phone")?.message}</p>}
//                   </div>

//                   <InputWithLabel label="Relationship" name="emergency_contact_relation" register={register} error={getError("emergency_contact_relation")} />
//                 </div>
//                 <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Optional Medical Info (Confidential):</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
//                   {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label="List Conditions" error={getError("medical_conditions")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
//                   {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label="List Allergies" error={getError("allergies")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
//                   {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications")} />)}
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={register} error={getError("blood_type")} />
//                   <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
//                 <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Travel Dates:</strong> {formatDateForDisplay(watchedValuesForSummary[0] as string)} to {formatDateForDisplay(watchedValuesForSummary[1] as string)}</div>
//                   <div><strong>Total Risk Zone Days:</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
//                   <div><strong>Risk Zone Breakdown:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Green: {watch("green_zone_days") || 0} days</li>
//                     <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
//                     <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
//                   </ul>
//                   <div><strong>Coverage Selected:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Medical: {getEmergencyMedicalLabel(watchedValuesForSummary[2] as string) || "N/A"}</li>
//                     <li>PA: {getPALabel(watchedValuesForSummary[3] as string) || "N/A"}</li>
//                     <li>Transit: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
//                   </ul>
//                   <div className="mt-4 pt-3 border-t">
//                     <strong className="text-xl">Total Quote:</strong>
//                     <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[5] || "N/A"}</div>
//                   <div><strong>Age:</strong> {calculateAge(watchedValuesForSummary[6] as string) || "N/A"}</div>
//                   <div><strong>Nationality:</strong> {getNationalityLabel(watchedValuesForSummary[7] as string) || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedValuesForSummary[8] as string) || "N/A"}</div>
//                   <div><strong>Primary Regions:</strong> {watchedValuesForSummary[9] || "N/A"}</div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
//                   <div><strong>Number:</strong> {watchedValuesForSummary[11] || "N/A"}</div>
//                 </div>

//                 <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={register} error={getError("affiliate_code")} /></div>

//                 <div className="flex items-start space-x-3">
//                   <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">I Consent to the Sharing of My Medical Information in an Emergency and Authorize the Collection, Storage, and Use of My Personal Information for That Purpose</Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}

//             <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
//                 {step > 0 && (
//                     <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
//                     Back
//                     </Button>
//                 )}
//                 {step === 0 && (
//                     <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
//                     Modify Choices
//                     </Button>
//                 )}
//                 {(step > 0) && <div className="sm:flex-grow hidden sm:block"></div>}
//                 {step < steps.length - 1 && (
//                     <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                     Continue
//                     </Button>
//                 )}
//                 {step === steps.length - 1 && (
//                     <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white" disabled={formState.isSubmitting}>
//                     {formState.isSubmitting ? "Processing..." : "Confirm & Purchase"}
//                     </Button>
//                 )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller, FieldError, FieldErrors, Path, useFieldArray } from "react-hook-form"; // Added useFieldArray
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   purchaseWithoutLoginSchema,
//   type InsuranceFormValues,
//   steps,
//   tripPurposes,
//   fieldsByStep,
//   emergencyMedicalCoverageOptions,
//   personalAccidentCoverageOptions,
//   nationalityOptions,
//   countryOptions,
// } from "@/lib/insuranceFormSchema";
// import {
//   InputWithLabel,
//   TextareaWithLabel,
//   ControlledTextareaArray,
//   SelectWithLabel,
//   DatePickerField
// } from "./FormFields";
// import { format as formatDateFn } from "date-fns";

// const countryCodeOptions = [
//   { value: "+1", label: "+1 (USA/CAN)" },
//   { value: "+44", label: "+44 (UK)" },
//   { value: "+91", label: "+91 (India)" },
//   { value: "+61", label: "+61 (Australia)" },
//   { value: "+49", label: "+49 (Germany)" },
//   { value: "+33", label: "+33 (France)" },
//   { value: "+81", label: "+81 (Japan)" },
//   { value: "+86", label: "+86 (China)" },
//   { value: "+380", label: "+380 (Ukraine)" },
// ];


// export default function InsuranceForm() {
//   const [step, setStep] = useState(0);
//   const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);

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
//       c_name: "", // For primary insured
//       c_birthdate: "", // For primary insured
//       c_phone: "",
//       c_phone_code: "",
//       c_phone_number: "",
//       c_whats_app: "",
//       c_whats_app_code: "",
//       c_whats_app_number: "",
//       c_email: "",
//       c_nationality: "",
//       city_of_residence: "",
//       trip_countries: [],
//       travellers: [{ name: "", birthdate: "" }], // Initialize with one traveller (primary)
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_cities: [], // Initialize empty for dynamic cities
//       trip_purpose: "",
//       stay_name: "",
//       company_name: "",
//       emergency_contact_name: "",
//       emergency_contact_phone: "",
//       emergency_contact_phone_code: "",
//       emergency_contact_phone_number: "",
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
//       is_company_arranged: false,
//     },
//     mode: "onChange",
//   });

//   const { watch, setValue, getValues, trigger, formState, control, register } = form;

//   // Field array for Travellers
//   const { fields: travellerFields, append: appendTraveller, remove: removeTraveller } = useFieldArray({
//     control,
//     name: "travellers"
//   });

//   // Field array for Trip Cities
//   const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray({
//     control,
//     name: "trip_cities"
//   });


//   const watchedStartDate = watch("trip_start_date");
//   const watchedEndDate = watch("trip_end_date");
//   const watchedGreenDaysForDisplay = watch("green_zone_days");

//   // Sync c_name and c_birthdate with travellers[0]
//   const cNameValue = watch("c_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     // Ensure travellers[0] exists, especially on initial load or if array is manipulated
//     if (!getValues("travellers") || getValues("travellers").length === 0) {
//         setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || "" }], { shouldValidate: false, shouldDirty: false });
//     } else {
//         const currentTraveller0Name = getValues("travellers.0.name");
//         const currentTraveller0Birthdate = getValues("travellers.0.birthdate");
//         if (currentTraveller0Name !== cNameValue) {
//             setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_name, shouldDirty: true });
//         }
//         if (currentTraveller0Birthdate !== cBirthdateValue) {
//             setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_birthdate, shouldDirty: true });
//         }
//     }
//   }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);


//   useEffect(() => {
//     if (watchedStartDate && watchedEndDate) {
//       const start = new Date(watchedStartDate + "T00:00:00");
//       const end = new Date(watchedEndDate + "T00:00:00");
//       if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
//         const diffTime = end.getTime() - start.getTime();
//         const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)) + 1;
//         setCalculatedTotalRiskZoneDays(diffDays);
//         setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("amber_zone_days")) !== 0) setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//         if (Number(getValues("red_zone_days")) !== 0) setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       } else {
//         setCalculatedTotalRiskZoneDays(null);
//         if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//       }
//     } else {
//       setCalculatedTotalRiskZoneDays(null);
//       if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [watchedStartDate, watchedEndDate, setValue, getValues]);

//   useEffect(() => {
//     const subscription = watch((currentValues, { name, type }) => {
//       if (
//         (name === "amber_zone_days" || name === "red_zone_days") &&
//         type === "change" &&
//         calculatedTotalRiskZoneDays !== null
//       ) {
//         let amber = Number(currentValues.amber_zone_days || 0);
//         let red = Number(currentValues.red_zone_days || 0);
//         if (amber + red > calculatedTotalRiskZoneDays) {
//           if (name === "amber_zone_days") {
//             amber = calculatedTotalRiskZoneDays - red;
//             setValue("amber_zone_days", Math.max(0, amber), { shouldValidate: true, shouldDirty: true });
//           } else if (name === "red_zone_days") {
//             red = calculatedTotalRiskZoneDays - amber;
//             setValue("red_zone_days", Math.max(0, red), { shouldValidate: true, shouldDirty: true });
//           }
//         }
//         const newGreenDays = calculatedTotalRiskZoneDays - amber - red;
//         if (Number(getValues("green_zone_days")) !== Math.max(0, newGreenDays)) {
//           setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
//         }
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setValue, getValues, calculatedTotalRiskZoneDays]);


//   const cPhoneCode = watch("c_phone_code" as any);
//   const cPhoneNumber = watch("c_phone_number" as any);
//   useEffect(() => {
//     const fullNumber = `${cPhoneCode || ''}${cPhoneNumber || ''}`;
//     if (getValues("c_phone") !== fullNumber) {
//       setValue("c_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cPhoneCode, cPhoneNumber, setValue, getValues]);

//   const cWhatsAppCode = watch("c_whats_app_code" as any);
//   const cWhatsAppNumber = watch("c_whats_app_number" as any);
//   useEffect(() => {
//     const fullNumber = `${cWhatsAppCode || ''}${cWhatsAppNumber || ''}`;
//     if (getValues("c_whats_app") !== fullNumber) {
//         setValue("c_whats_app", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cWhatsAppCode, cWhatsAppNumber, setValue, getValues]);

//   const emergencyContactPhoneCode = watch("emergency_contact_phone_code" as any);
//   const emergencyContactPhoneNumber = watch("emergency_contact_phone_number" as any);
//   useEffect(() => {
//     const fullNumber = `${emergencyContactPhoneCode || ''}${emergencyContactPhoneNumber || ''}`;
//     if (getValues("emergency_contact_phone") !== fullNumber) {
//       setValue("emergency_contact_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [emergencyContactPhoneCode, emergencyContactPhoneNumber, setValue, getValues]);


//   const onSubmitForm = (data: InsuranceFormValues) => {
//     const finalData = {
//       ...data,
//       c_phone: `${getValues("c_phone_code" as any) || ''}${getValues("c_phone_number" as any) || ''}`,
//       c_whats_app: `${getValues("c_whats_app_code" as any) || ''}${getValues("c_whats_app_number" as any) || ''}`,
//       emergency_contact_phone: `${getValues("emergency_contact_phone_code" as any) || ''}${getValues("emergency_contact_phone_number" as any) || ''}`,
//       // Travellers array is now directly from data.travellers, which includes the synced primary and any additional ones
//       travellers: data.travellers.map(t => ({ name: t.name, birthdate: t.birthdate })), // Ensure clean objects
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//       trip_cities: data.trip_cities ? data.trip_cities.filter(city => city.name && city.name.trim() !== "") : [], // Clean up empty cities
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     alert("Confirm & Purchase clicked! Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const partFieldsToValidate: string[] = [];
//     if (step === 1) {
//         partFieldsToValidate.push("c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number");
//     }
//     if (step === 3) {
//         partFieldsToValidate.push("emergency_contact_phone_code", "emergency_contact_phone_number");
//     }
//     if (partFieldsToValidate.length > 0) {
//         await trigger(partFieldsToValidate as any);
//     }

//     const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });

//     if (!currentStepValidationResult) {
//       let firstErrorKeyOnCurrentStep = currentStepFields.find(
//         (fieldName) => getError(fieldName as string) !== undefined
//       );
//       // Check array fields for errors too
//       if(!firstErrorKeyOnCurrentStep && formState.errors.travellers && step === 1) {
//         const travellerErrorIndex = (formState.errors.travellers as any[]).findIndex(err => err && (err.name || err.birthdate));
//         if(travellerErrorIndex !== -1) {
//             firstErrorKeyOnCurrentStep = `travellers.${travellerErrorIndex}.${formState.errors.travellers[travellerErrorIndex]?.name ? 'name' : 'birthdate'}` as Path<InsuranceFormValues>;
//         }
//       }
//       if(!firstErrorKeyOnCurrentStep && formState.errors.trip_cities && step === 2) {
//         const cityErrorIndex = (formState.errors.trip_cities as any[]).findIndex(err => err && err.name);
//          if(cityErrorIndex !== -1) {
//             firstErrorKeyOnCurrentStep = `trip_cities.${cityErrorIndex}.name` as Path<InsuranceFormValues>;
//         }
//       }

//       if (firstErrorKeyOnCurrentStep) {
//         const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
//         element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }
//     if (step === 0) {
//       const fieldsForCustomRuleCheck: Array<Path<InsuranceFormValues>> = [
//         "trip_start_date", "trip_end_date",
//         "green_zone_days", "amber_zone_days", "red_zone_days"
//       ];
//       await trigger(fieldsForCustomRuleCheck, { shouldFocus: false });
//       if (formState.errors.root?.message) {
//         alert(formState.errors.root.message);
//         const zoneDayElement = document.querySelector(`[name='amber_zone_days']`) || document.querySelector(`[name='red_zone_days']`);
//         zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         return;
//       }
//     }
//     if (step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const getError = (fieldName: string): FieldError | undefined => {
//     const keys = fieldName.split('.');
//     let errorObj: FieldErrors | FieldError | undefined = formState.errors;
//     try {
//       for (const key of keys) {
//         const k = key.match(/^\d+$/) ? parseInt(key, 10) : key; // Handle array indices
//         if (errorObj && typeof errorObj === 'object' && errorObj !== null) {
//           const typedError = errorObj as Record<string | number, any>;
//           if (k in typedError) {
//             errorObj = typedError[k] as FieldErrors | FieldError;
//           } else { return undefined; }
//         } else { return undefined; }
//       }
//       // Ensure it's a FieldError (has a message)
//       return (errorObj && typeof errorObj === 'object' && 'message' in errorObj) ? errorObj as FieldError : undefined;
//     } catch { return undefined; }
//   };

//   const calculateAge = (birthdate: string) => {
//     if (!birthdate) return "";
//     const birthDateObj = new Date(birthdate + "T00:00:00");
//     if (isNaN(birthDateObj.getTime())) return "";
//     const today = new Date();
//     let age = today.getFullYear() - birthDateObj.getFullYear();
//     const m = today.getMonth() - birthDateObj.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
//       age--;
//     }
//     return age >= 0 ? age.toString() : "";
//   };

//   const formatDateForDisplay = (dateString: string | undefined): string => {
//     if (!dateString) return "N/A";
//     try {
//       const dateObj = new Date(dateString + "T00:00:00"); 
//       if (isNaN(dateObj.getTime())) return "Invalid Date";
//       return formatDateFn(dateObj, "PPP");
//     } catch (e) {
//       console.error("Error formatting date for display:", dateString, e);
//       return "Invalid Date";
//     }
//   };

//   const watchedValuesForSummary = watch([
//     "trip_start_date", "trip_end_date",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
//     "c_name", "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine", // c_name, c_birthdate for primary
//     "emergency_contact_name", "emergency_contact_phone",
//     "travellers" // Watch all travellers for summary
//   ]);
//   const watchedTravellersForSummary = watch("travellers");
//   const watchedTripCitiesForSummary = watch("trip_cities");

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
//           {/* Stepper UI */}
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
//           <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
//             {step === 0 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Travel Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <DatePickerField
//                     label="Travel Start Date"
//                     name="trip_start_date"
//                     control={control}
//                     error={getError("trip_start_date")}
//                     placeholder="Select start date"
//                     maxDate={watchedEndDate ? new Date(watchedEndDate + "T00:00:00") : undefined}
//                   />
//                   <DatePickerField
//                     label="Travel End Date"
//                     name="trip_end_date"
//                     control={control}
//                     error={getError("trip_end_date")}
//                     placeholder="Select end date"
//                     minDate={watchedStartDate ? new Date(watchedStartDate + "T00:00:00") : undefined}
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel
//                     label="Total Days"
//                     name="displayTotalDays"
//                     type="number"
//                     value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays : ""}
//                     readOnly={true}
//                   />
//                   <InputWithLabel
//                     label="Green Zone Days"
//                     name="green_zone_days"
//                     type="number"
//                     value={watchedGreenDaysForDisplay}
//                     readOnly={true}
//                     register={register}
//                     error={getError("green_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Amber Zone Days"
//                     name="amber_zone_days"
//                     type="number"
//                     register={register}
//                     error={getError("amber_zone_days")}
//                   />
//                   <InputWithLabel
//                     label="Red Zone Days"
//                     name="red_zone_days"
//                     type="number"
//                     register={register}
//                     error={getError("red_zone_days")}
//                   />
//                 </div>

//                 {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}
//                 <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel label="Emergency Medical" name="emergency_medical_coverage" control={control} options={emergencyMedicalCoverageOptions} placeholder="Select Medical Coverage" error={getError("emergency_medical_coverage")} />
//                   <SelectWithLabel label="PA (Personal Accident)" name="personal_accident_coverage_level" control={control} options={personalAccidentCoverageOptions} placeholder="Select PA Coverage" error={getError("personal_accident_coverage_level")} />
//                   <div className="flex items-center space-x-2">
//                     <Controller name="add_transit_coverage" control={control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
//                     <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
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
//                 <h3 className="text-lg font-semibold mb-3 text-[#1A2C50]">Primary Traveller</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Primary Insured - controlled by c_name, c_birthdate which sync to travellers[0] */}
//                   <InputWithLabel label="Full Name" name="c_name" register={register} error={getError("c_name") || getError("travellers.0.name")} />
//                   <div>
//                     <DatePickerField
//                         label="Date of Birth"
//                         name="c_birthdate" 
//                         control={control}
//                         error={getError("c_birthdate") || getError("travellers.0.birthdate")}
//                         placeholder="Select date of birth"
//                         maxDate={new Date()} 
//                     />
//                     {watch("c_birthdate") && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch("c_birthdate"))}</p>}
//                   </div>
                  
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1">Phone Number</p>
//                     <div className="flex items-start gap-2">
//                       <div className="w-1/3 shrink-0">
//                         <SelectWithLabel control={control} name={"c_phone_code" as any} label="" options={countryCodeOptions} placeholder="Code" />
//                       </div>
//                       <div className="flex-grow">
//                          <InputWithLabel label="" name={"c_phone_number" as any} type="tel" register={register} placeholder="Enter number" />
//                       </div>
//                     </div>
//                     {getError("c_phone") && <p className="text-sm text-red-500 mt-1">{getError("c_phone")?.message}</p>}
//                   </div>

//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1">WhatsApp (optional)</p>
//                     <div className="flex items-start gap-2">
//                       <div className="w-1/3 shrink-0">
//                          <SelectWithLabel control={control} name={"c_whats_app_code" as any} label="" options={countryCodeOptions} placeholder="Code" />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel label="" name={"c_whats_app_number" as any} type="tel" register={register} placeholder="Enter number"/>
//                       </div>
//                     </div>
//                     {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
//                   </div>

//                   <InputWithLabel label="Email Address" name="c_email" type="email" register={register} error={getError("c_email")} />
//                   <SelectWithLabel label="Nationality" name="c_nationality" control={control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
//                   <InputWithLabel label="City of Residence" name="city_of_residence" register={register} error={getError("city_of_residence")} />
//                   <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
//                 </div>

//                 {/* Additional Travellers section */}
//                 {travellerFields.map((field, index) => {
//                     if (index === 0) return null; // Primary traveller is handled by c_name/c_birthdate fields
//                     return (
//                         <div key={field.id} className="mt-6 pt-6 border-t">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h3 className="text-lg font-semibold text-[#1A2C50]">Additional Traveller {index}</h3>
//                                 <Button type="button" variant="destructive" size="sm" onClick={() => removeTraveller(index)}>
//                                     Remove
//                                 </Button>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <InputWithLabel
//                                     label={`Full Name`}
//                                     name={`travellers.${index}.name`}
//                                     register={register}
//                                     error={getError(`travellers.${index}.name`)}
//                                 />
//                                 <div>
//                                     <DatePickerField
//                                         label={`Date of Birth`}
//                                         name={`travellers.${index}.birthdate`}
//                                         control={control}
//                                         error={getError(`travellers.${index}.birthdate`)}
//                                         placeholder="Select date of birth"
//                                         maxDate={new Date()}
//                                     />
//                                     {watch(`travellers.${index}.birthdate` as any) && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch(`travellers.${index}.birthdate` as any))}</p>}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//                 <Button type="button" variant="outline" onClick={() => appendTraveller({ name: "", birthdate: "" })} className="mt-6">
//                   + Add Additional Traveller
//                 </Button>
//                 {getError("travellers") && typeof getError("travellers")?.message === 'string' && <p className="text-sm text-red-500 mt-1">{getError("travellers")?.message}</p>}


//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
//                 <div className="mt-6"><InputWithLabel label="Primary Cities/Regions (in Ukraine, Optional)" name="primary_cities_regions_ukraine" register={register} error={getError("primary_cities_regions_ukraine")} /></div>
//                 <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={register} error={getError("stay_name")} /></div>
//                 <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={register} error={getError("company_name")} /></div>
                
//                 {/* Trip Cities Section */}
//                 <div className="mt-8 pt-6 border-t">
//                     <h3 className="text-lg font-semibold mb-3 text-[#1A2C50]">Cities Visiting (Optional)</h3>
//                     {cityFields.map((field, index) => (
//                         <div key={field.id} className="flex items-end gap-2 mb-3">
//                             <div className="flex-grow">
//                                 <InputWithLabel
//                                     label={`City ${index + 1} Name`}
//                                     name={`trip_cities.${index}.name`}
//                                     register={register}
//                                     error={getError(`trip_cities.${index}.name`)}
//                                     placeholder="Enter city name"
//                                 />
//                                 {/* Forcing zoneType as per schema, hidden for now as not requested in UI */}
//                                 <input type="hidden" {...register(`trip_cities.${index}.zoneType` as any)} value="GREEN" />
//                             </div>
//                             <Button type="button" variant="destructive" size="sm" onClick={() => removeCity(index)}>
//                                 Remove
//                             </Button>
//                         </div>
//                     ))}
//                     <Button type="button" variant="outline" onClick={() => appendCity({ name: "", zoneType: "GREEN" /* default, schema requires it */})}>
//                       + Add City
//                     </Button>
//                      {getError("trip_cities") && typeof getError("trip_cities")?.message === 'string' && <p className="text-sm text-red-500 mt-1">{getError("trip_cities")?.message}</p>}
//                 </div>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Emergency Contact Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label="Contact Name" name="emergency_contact_name" register={register} error={getError("emergency_contact_name")} />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1">Contact Number</p>
//                     <div className="flex items-start gap-2">
//                       <div className="w-1/3 shrink-0">
//                         <SelectWithLabel control={control} name={"emergency_contact_phone_code" as any} label="" options={countryCodeOptions} placeholder="Code"/>
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel label="" name={"emergency_contact_phone_number" as any} type="tel" register={register} placeholder="Enter number"/>
//                       </div>
//                     </div>
//                     {getError("emergency_contact_phone") && <p className="text-sm text-red-500 mt-1">{getError("emergency_contact_phone")?.message}</p>}
//                   </div>
//                   <InputWithLabel label="Relationship" name="emergency_contact_relation" register={register} error={getError("emergency_contact_relation")} />
//                 </div>
//                 <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Optional Medical Info (Confidential):</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
//                   {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label="List Conditions" error={getError("medical_conditions")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
//                   {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label="List Allergies" error={getError("allergies")} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
//                   {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications")} />)}
//                   <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={register} error={getError("blood_type")} />
//                   <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
//                 <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Travel Dates:</strong> {formatDateForDisplay(watchedValuesForSummary[0] as string)} to {formatDateForDisplay(watchedValuesForSummary[1] as string)}</div>
//                   <div><strong>Total Risk Zone Days:</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
//                   <div><strong>Risk Zone Breakdown:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Green: {watch("green_zone_days") || 0} days</li>
//                     <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
//                     <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
//                   </ul>
//                   <div><strong>Coverage Selected:</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>Medical: {getEmergencyMedicalLabel(watchedValuesForSummary[2] as string) || "N/A"}</li>
//                     <li>PA: {getPALabel(watchedValuesForSummary[3] as string) || "N/A"}</li>
//                     <li>Transit: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
//                   </ul>
//                   <div className="mt-4 pt-3 border-t">
//                     <strong className="text-xl">Total Quote:</strong>
//                     <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
//                 {watchedTravellersForSummary && watchedTravellersForSummary.map((traveller, index) => (
//                     <div key={`summary-traveller-${index}`} className="space-y-1 p-4 bg-gray-50 rounded-md border mb-3">
//                         <p className="font-semibold">{index === 0 ? "Primary Traveller:" : `Additional Traveller ${index}:`}</p>
//                         <div><strong>Name:</strong> {traveller.name || "N/A"}</div>
//                         <div><strong>Age:</strong> {calculateAge(traveller.birthdate) || "N/A"}</div>
//                         {index === 0 && <div><strong>Nationality:</strong> {getNationalityLabel(watch("c_nationality")) || "N/A"}</div>}
//                     </div>
//                 ))}
                

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedValuesForSummary[8] as string) || "N/A"}</div>
//                   <div><strong>Primary Regions:</strong> {watchedValuesForSummary[9] || "N/A"}</div>
//                   {watchedTripCitiesForSummary && watchedTripCitiesForSummary.length > 0 && (
//                     <div>
//                         <strong>Cities Visiting:</strong>
//                         <ul className="list-disc list-inside pl-4">
//                             {watchedTripCitiesForSummary.map((city, idx) => city.name && <li key={`summary-city-${idx}`}>{city.name}</li>)}
//                         </ul>
//                     </div>
//                   )}
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>Name:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
//                   <div><strong>Number:</strong> {watchedValuesForSummary[11] || "N/A"}</div>
//                 </div>

//                 <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={register} error={getError("affiliate_code")} /></div>

//                 <div className="flex items-start space-x-3">
//                   <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">I Consent to the Sharing of My Medical Information in an Emergency and Authorize the Collection, Storage, and Use of My Personal Information for That Purpose</Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}

//             <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
//                 {step > 0 && (
//                     <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
//                     Back
//                     </Button>
//                 )}
//                 {step === 0 && (
//                     <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
//                     Modify Choices
//                     </Button>
//                 )}
//                 {(step > 0) && <div className="sm:flex-grow hidden sm:block"></div>}
//                 {step < steps.length - 1 && (
//                     <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                     Continue
//                     </Button>
//                 )}
//                 {step === steps.length - 1 && (
//                     <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white" disabled={formState.isSubmitting}>
//                     {formState.isSubmitting ? "Processing..." : "Confirm & Purchase"}
//                     </Button>
//                 )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, FieldError, Path, useFieldArray, get } from "react-hook-form";
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
} from "@/lib/insuranceFormSchema";
import {
  InputWithLabel,
  TextareaWithLabel,
  ControlledTextareaArray,
  SelectWithLabel,
  DatePickerField
} from "./FormFields"; 
import { format as formatDateFn } from "date-fns";

const countryCodeOptions = [
  { value: "+1", label: "+1 (USA/CAN)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+91", label: "+91 (India)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+49", label: "+49 (Germany)" },
  { value: "+33", label: "+33 (France)" },
  { value: "+81", label: "+81 (Japan)" },
  { value: "+86", label: "+86 (China)" },
  { value: "+380", label: "+380 (Ukraine)" },
];


export default function InsuranceForm() {
  const [step, setStep] = useState(0);
  const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);

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
      c_phone_code: "",
      c_phone_number: "",
      c_whats_app: "",
      c_whats_app_code: "",
      c_whats_app_number: "",
      c_email: "",
      c_nationality: "",
      city_of_residence: "",
      trip_countries: [],
      travellers: [{ name: "", birthdate: "" }], 
      arrival_in_ukraine: "",
      departure_from_ukraine: "",
      primary_cities_regions_ukraine: "",
      trip_cities: [], 
      trip_purpose: "",
      stay_name: "",
      company_name: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      emergency_contact_phone_code: "",
      emergency_contact_phone_number: "",
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
      is_company_arranged: false,
    },
    mode: "onChange",
  });

  const { watch, setValue, getValues, trigger, formState, control, register } = form;

  const { fields: travellerFields, append: appendTraveller, remove: removeTraveller } = useFieldArray<InsuranceFormValues, "travellers", "id">({
    control,
    name: "travellers"
  });

  const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray<InsuranceFormValues, "trip_cities", "id">({
    control,
    name: "trip_cities"
  });


  const watchedStartDate = watch("trip_start_date");
  const watchedEndDate = watch("trip_end_date");
  const watchedGreenDaysForDisplay = watch("green_zone_days");

  const cNameValue = watch("c_name");
  const cBirthdateValue = watch("c_birthdate");

  useEffect(() => {
    if (!getValues("travellers") || getValues("travellers").length === 0) {
        setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || "" }], { shouldValidate: false, shouldDirty: false });
    } else {
        const currentTraveller0Name = getValues("travellers.0.name");
        const currentTraveller0Birthdate = getValues("travellers.0.birthdate");
        if (currentTraveller0Name !== cNameValue) {
            setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && !!formState.dirtyFields.c_name, shouldDirty: true });
        }
        if (currentTraveller0Birthdate !== cBirthdateValue) {
            setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && !!formState.dirtyFields.c_birthdate, shouldDirty: true });
        }
    }
  }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);


  useEffect(() => {
    if (watchedStartDate && watchedEndDate) {
      const start = new Date(watchedStartDate + "T00:00:00");
      const end = new Date(watchedEndDate + "T00:00:00");
      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)) + 1;
        setCalculatedTotalRiskZoneDays(diffDays);
        setValue("green_zone_days", diffDays, { shouldValidate: true, shouldDirty: true });
        if (Number(getValues("amber_zone_days")) !== 0) setValue("amber_zone_days", 0, { shouldValidate: true, shouldDirty: true });
        if (Number(getValues("red_zone_days")) !== 0) setValue("red_zone_days", 0, { shouldValidate: true, shouldDirty: true });
      } else {
        setCalculatedTotalRiskZoneDays(null);
        if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
      }
    } else {
      setCalculatedTotalRiskZoneDays(null);
      if (Number(getValues("green_zone_days")) !== 0) setValue("green_zone_days", 0, { shouldValidate: true, shouldDirty: true });
    }
  }, [watchedStartDate, watchedEndDate, setValue, getValues]);

  useEffect(() => {
    const subscription = watch((currentValues, { name, type }) => {
      if (
        (name === "amber_zone_days" || name === "red_zone_days") &&
        type === "change" &&
        calculatedTotalRiskZoneDays !== null
      ) {
        let amber = Number(currentValues.amber_zone_days || 0);
        let red = Number(currentValues.red_zone_days || 0);
        if (amber + red > calculatedTotalRiskZoneDays) {
          if (name === "amber_zone_days") {
            amber = calculatedTotalRiskZoneDays - red;
            setValue("amber_zone_days", Math.max(0, amber), { shouldValidate: true, shouldDirty: true });
          } else if (name === "red_zone_days") {
            red = calculatedTotalRiskZoneDays - amber;
            setValue("red_zone_days", Math.max(0, red), { shouldValidate: true, shouldDirty: true });
          }
        }
        const newGreenDays = calculatedTotalRiskZoneDays - amber - red;
        if (Number(getValues("green_zone_days")) !== Math.max(0, newGreenDays)) {
          setValue("green_zone_days", Math.max(0, newGreenDays), { shouldValidate: true, shouldDirty: true });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, getValues, calculatedTotalRiskZoneDays]);


  const cPhoneCode = watch("c_phone_code");
  const cPhoneNumber = watch("c_phone_number");
  useEffect(() => {
    const fullNumber = `${cPhoneCode || ''}${cPhoneNumber || ''}`;
    if (getValues("c_phone") !== fullNumber) {
      setValue("c_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
    }
  }, [cPhoneCode, cPhoneNumber, setValue, getValues]);

  const cWhatsAppCode = watch("c_whats_app_code");
  const cWhatsAppNumber = watch("c_whats_app_number");
  useEffect(() => {
    const fullNumber = `${cWhatsAppCode || ''}${cWhatsAppNumber || ''}`;
    if (getValues("c_whats_app") !== fullNumber) {
        setValue("c_whats_app", fullNumber, { shouldValidate: true, shouldDirty: true });
    }
  }, [cWhatsAppCode, cWhatsAppNumber, setValue, getValues]);

  const emergencyContactPhoneCode = watch("emergency_contact_phone_code");
  const emergencyContactPhoneNumber = watch("emergency_contact_phone_number");
  useEffect(() => {
    const fullNumber = `${emergencyContactPhoneCode || ''}${emergencyContactPhoneNumber || ''}`;
    if (getValues("emergency_contact_phone") !== fullNumber) {
      setValue("emergency_contact_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
    }
  }, [emergencyContactPhoneCode, emergencyContactPhoneNumber, setValue, getValues]);


  const onSubmitForm = (data: InsuranceFormValues) => {
    const finalData = {
      ...data,
      c_phone: `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`,
      c_whats_app: `${getValues("c_whats_app_code") || ''}${getValues("c_whats_app_number") || ''}`,
      emergency_contact_phone: `${getValues("emergency_contact_phone_code") || ''}${getValues("emergency_contact_phone_number") || ''}`,
      travellers: data.travellers.map(t => ({ name: t.name, birthdate: t.birthdate })), 
      green_zone_days: Number(data.green_zone_days),
      amber_zone_days: Number(data.amber_zone_days),
      red_zone_days: Number(data.red_zone_days),
      black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
      medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
      allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
      current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
      trip_cities: data.trip_cities ? data.trip_cities.filter(city => city.name && city.name.trim() !== "") : [], 
    };
    console.log("Form Data Submitted for Purchase:", finalData);
    alert("Confirm & Purchase clicked! Form submitted. Check console.");
  };

  const handleNextOrContinue = async () => {
    const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
    const partFieldsToValidate: Path<InsuranceFormValues>[] = [];
    if (step === 1) {
        partFieldsToValidate.push("c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number");
    }
    if (step === 3) {
        partFieldsToValidate.push("emergency_contact_phone_code", "emergency_contact_phone_number");
    }
    if (partFieldsToValidate.length > 0) {
        await trigger(partFieldsToValidate);
    }

    const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });

    if (!currentStepValidationResult) {
      let firstErrorKeyOnCurrentStep = currentStepFields.find(
        (fieldName) => getError(fieldName as string) !== undefined // Path is assignable to string
      );
      
      if(!firstErrorKeyOnCurrentStep && formState.errors.travellers && step === 1) {
        const travellerErrors = formState.errors.travellers;
        if (Array.isArray(travellerErrors)) {
  for (let i = 0; i < travellerErrors.length; i++) {
                const specificTravellerErrors = travellerErrors[i];
                if (specificTravellerErrors) {
                    if (specificTravellerErrors.name) {
                        firstErrorKeyOnCurrentStep = `travellers.${i}.name` as Path<InsuranceFormValues>;
                        break;
                    }
                    if (specificTravellerErrors.birthdate) {
                        firstErrorKeyOnCurrentStep = `travellers.${i}.birthdate` as Path<InsuranceFormValues>;
                        break;
                    }
                }
            }
        }
      }
      if(!firstErrorKeyOnCurrentStep && formState.errors.trip_cities && step === 2) {
        const cityErrorsArray = formState.errors.trip_cities;
        if (Array.isArray(cityErrorsArray)) {
    for (let i = 0; i < cityErrorsArray.length; i++) {
                const specificCityErrors = cityErrorsArray[i];
                if (specificCityErrors?.name) { 
                    firstErrorKeyOnCurrentStep = `trip_cities.${i}.name` as Path<InsuranceFormValues>;
                    break;
                }
            }
        }
      }

      if (firstErrorKeyOnCurrentStep) {
        const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    if (step === 0) {
      const fieldsForCustomRuleCheck: Array<Path<InsuranceFormValues>> = [
        "trip_start_date", "trip_end_date",
        "green_zone_days", "amber_zone_days", "red_zone_days"
      ];
      await trigger(fieldsForCustomRuleCheck, { shouldFocus: false });
      if (formState.errors.root?.message) {
        alert(formState.errors.root.message);
        const zoneDayElement = document.querySelector(`[name='amber_zone_days']`) || document.querySelector(`[name='red_zone_days']`);
        zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const getError = (fieldName: string): FieldError | undefined => {
    const error = get(formState.errors, fieldName);
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      return error as FieldError;
    }
    return undefined;
  };

  const calculateAge = (birthdate: string) => {
    if (!birthdate) return "";
    const birthDateObj = new Date(birthdate + "T00:00:00");
    if (isNaN(birthDateObj.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age >= 0 ? age.toString() : "";
  };

  const formatDateForDisplay = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    try {
      const dateObj = new Date(dateString + "T00:00:00"); 
      if (isNaN(dateObj.getTime())) return "Invalid Date";
      return formatDateFn(dateObj, "PPP");
    } catch (e) {
      console.error("Error formatting date for display:", dateString, e);
      return "Invalid Date";
    }
  };

  const watchedPathsForSummary = [
    "trip_start_date", "trip_end_date",
    "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
    "c_name", "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine", 
    "emergency_contact_name", "emergency_contact_phone",
  ] as const; 

  const watchedValuesForSummary = watch(watchedPathsForSummary);
  const watchedTravellersForSummary = watch("travellers");
  const watchedTripCitiesForSummary = watch("trip_cities");

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
          <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
            {step === 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Travel Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <DatePickerField
                    label="Travel Start Date"
                    name="trip_start_date"
                    control={control}
                    error={getError("trip_start_date")}
                    placeholder="Select start date"
                    maxDate={watchedEndDate ? new Date(watchedEndDate + "T00:00:00") : undefined}
                  />
                  <DatePickerField
                    label="Travel End Date"
                    name="trip_end_date"
                    control={control}
                    error={getError("trip_end_date")}
                    placeholder="Select end date"
                    minDate={watchedStartDate ? new Date(watchedStartDate + "T00:00:00") : undefined}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <InputWithLabel
                    label="Total Days"
                    name="displayTotalDays" 
                    type="number"
                    value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays : ""}
                    readOnly={true}
                  />
                  <InputWithLabel
                    label="Green Zone Days"
                    name="green_zone_days"
                    type="number"
                    value={watchedGreenDaysForDisplay}
                    readOnly={true}
                    register={register}
                    error={getError("green_zone_days")}
                  />
                  <InputWithLabel
                    label="Amber Zone Days"
                    name="amber_zone_days"
                    type="number"
                    register={register}
                    error={getError("amber_zone_days")}
                  />
                  <InputWithLabel
                    label="Red Zone Days"
                    name="red_zone_days"
                    type="number"
                    register={register}
                    error={getError("red_zone_days")}
                  />
                </div>

                {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}

                <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">Coverage Options:</h3>
                <div className="space-y-4 mb-6">
                  <SelectWithLabel label="Emergency Medical" name="emergency_medical_coverage" control={control} options={emergencyMedicalCoverageOptions} placeholder="Select Medical Coverage" error={getError("emergency_medical_coverage")} />
                  <SelectWithLabel label="PA (Personal Accident)" name="personal_accident_coverage_level" control={control} options={personalAccidentCoverageOptions} placeholder="Select PA Coverage" error={getError("personal_accident_coverage_level")} />
                  <div className="flex items-center space-x-2">
                    <Controller name="add_transit_coverage" control={control} render={({ field }) => <Checkbox id="add_transit_coverage" checked={field.value} onCheckedChange={field.onChange} />} />
                    <Label htmlFor="add_transit_coverage">Add on transit cover 250k</Label>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-md border">
                  <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">Quote Summary:</h3>
                  <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
                  <div className="text-sm mt-2">
                    <p>Medical: {getEmergencyMedicalLabel(watch("emergency_medical_coverage"))}</p>
                    <p>PA: {getPALabel(watch("personal_accident_coverage_level"))}</p>
                    <p>Transit: {watch("add_transit_coverage") ? "Yes (250k)" : "No"}</p>
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Your Details</h2>
                <h3 className="text-lg font-semibold mb-3 text-[#1A2C50]">Primary Traveller</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWithLabel label="Full Name" name="c_name" register={register} error={getError("c_name") || getError("travellers.0.name")} />
                  <div>
                    <DatePickerField
                        label="Date of Birth"
                        name="c_birthdate" 
                        control={control}
                        error={getError("c_birthdate") || getError("travellers.0.birthdate")}
                        placeholder="Select date of birth"
                        maxDate={new Date()} 
                    />
                    {watch("c_birthdate") && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch("c_birthdate"))}</p>}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Phone Number</p>
                    <div className="flex items-start gap-2">
                      <div className="w-1/3 shrink-0">
                        <SelectWithLabel control={control} name="c_phone_code" label="" options={countryCodeOptions} placeholder="Code" />
                      </div>
                      <div className="flex-grow">
                         <InputWithLabel label="" name="c_phone_number" type="tel" register={register} placeholder="Enter number" />
                      </div>
                    </div>
                    {getError("c_phone") && <p className="text-sm text-red-500 mt-1">{getError("c_phone")?.message}</p>}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">WhatsApp (optional)</p>
                    <div className="flex items-start gap-2">
                      <div className="w-1/3 shrink-0">
                         <SelectWithLabel control={control} name="c_whats_app_code" label="" options={countryCodeOptions} placeholder="Code" />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel label="" name="c_whats_app_number" type="tel" register={register} placeholder="Enter number"/>
                      </div>
                    </div>
                    {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
                  </div>

                  <InputWithLabel label="Email Address" name="c_email" type="email" register={register} error={getError("c_email")} />
                  <SelectWithLabel label="Nationality" name="c_nationality" control={control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
                  <InputWithLabel label="City of Residence" name="city_of_residence" register={register} error={getError("city_of_residence")} />
                  <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
                </div>

                {travellerFields.map((field, index) => {
                    if (index === 0) return null; 
                    const namePath = `travellers.${index}.name` as Path<InsuranceFormValues>;
                    const birthdatePath = `travellers.${index}.birthdate` as Path<InsuranceFormValues>;
                    return (
                        <div key={field.id} className="mt-6 pt-6 border-t">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-[#1A2C50]">Additional Traveller {index}</h3>
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeTraveller(index)}>
                                    Remove
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputWithLabel
                                    label={`Full Name`}
                                    name={namePath}
                                    register={register}
                                    error={getError(namePath)}
                                />
                                <div>
                                    <DatePickerField
                                        label={`Date of Birth`}
                                        name={birthdatePath}
                                        control={control}
                                        error={getError(birthdatePath)}
                                        placeholder="Select date of birth"
                                        maxDate={new Date()}
                                    />
{watch(birthdatePath) && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch(birthdatePath)?.toString() ?? '')}</p>}                                </div>
                            </div>
                        </div>
                    );
                })}
                <Button type="button" variant="outline" onClick={() => appendTraveller({ name: "", birthdate: "" })} className="mt-6">
                  + Add Additional Traveller
                </Button>
                {getError("travellers") && typeof getError("travellers")?.message === 'string' && <p className="text-sm text-red-500 mt-1">{getError("travellers")?.message}</p>}


              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
                <div className="mt-6"><InputWithLabel label="Primary Cities/Regions (in Ukraine, Optional)" name="primary_cities_regions_ukraine" register={register} error={getError("primary_cities_regions_ukraine")} /></div>
                <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
                <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={register} error={getError("stay_name")} /></div>
                <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={register} error={getError("company_name")} /></div>
                
                <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-3 text-[#1A2C50]">Cities Visiting (Optional)</h3>
                    {cityFields.map((field, index) => {
                        const cityNamePath = `trip_cities.${index}.name` as Path<InsuranceFormValues>;
                        const cityZoneTypePath = `trip_cities.${index}.zoneType` as Path<InsuranceFormValues>;
                        return (
                            <div key={field.id} className="flex items-end gap-2 mb-3">
                                <div className="flex-grow">
                                    <InputWithLabel
                                        label={`City ${index + 1} Name`}
                                        name={cityNamePath}
                                        register={register}
                                        error={getError(cityNamePath)}
                                        placeholder="Enter city name"
                                    />
                                    <input type="hidden" {...register(cityZoneTypePath)} value="GREEN" />
                                </div>
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeCity(index)}>
                                    Remove
                                </Button>
                            </div>
                        );
                    })}
                    <Button type="button" variant="outline" onClick={() => appendCity({ name: "", zoneType: "GREEN" })}>
                      + Add City
                    </Button>
                     {getError("trip_cities") && typeof getError("trip_cities")?.message === 'string' && <p className="text-sm text-red-500 mt-1">{getError("trip_cities")?.message}</p>}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Emergency Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWithLabel label="Contact Name" name="emergency_contact_name" register={register} error={getError("emergency_contact_name")} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Contact Number</p>
                    <div className="flex items-start gap-2">
                      <div className="w-1/3 shrink-0">
                        <SelectWithLabel control={control} name="emergency_contact_phone_code" label="" options={countryCodeOptions} placeholder="Code"/>
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel label="" name="emergency_contact_phone_number" type="tel" register={register} placeholder="Enter number"/>
                      </div>
                    </div>
                    {getError("emergency_contact_phone") && <p className="text-sm text-red-500 mt-1">{getError("emergency_contact_phone")?.message}</p>}
                  </div>
                  <InputWithLabel label="Relationship" name="emergency_contact_relation" register={register} error={getError("emergency_contact_relation")} />
                </div>
                <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">Optional Medical Info (Confidential):</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
                  {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label="List Conditions" error={getError("medical_conditions")} />)}
                  <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
                  {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label="List Allergies" error={getError("allergies")} />)}
                  <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
                  {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications")} />)}
                  <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={register} error={getError("blood_type")} />
                  <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={register} error={getError("special_assistance")} />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
                <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
                  <div><strong>Travel Dates:</strong> {formatDateForDisplay(watchedValuesForSummary[0])} to {formatDateForDisplay(watchedValuesForSummary[1])}</div>
                  <div><strong>Total Risk Zone Days:</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
                  <div><strong>Risk Zone Breakdown:</strong></div>
                  <ul className="list-disc list-inside pl-4">
                    <li>Green: {watch("green_zone_days") || 0} days</li>
                    <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
                    <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
                  </ul>
                  <div><strong>Coverage Selected:</strong></div>
                  <ul className="list-disc list-inside pl-4">
                    <li>Medical: {getEmergencyMedicalLabel(watchedValuesForSummary[2]) || "N/A"}</li>
                    <li>PA: {getPALabel(watchedValuesForSummary[3]) || "N/A"}</li>
                    <li>Transit: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
                  </ul>
                  <div className="mt-4 pt-3 border-t">
                    <strong className="text-xl">Total Quote:</strong>
                    <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
                {watchedTravellersForSummary && watchedTravellersForSummary.map((traveller, index) => (
                    <div key={`summary-traveller-${index}`} className="space-y-1 p-4 bg-gray-50 rounded-md border mb-3">
                        <p className="font-semibold">{index === 0 ? "Primary Traveller:" : `Additional Traveller ${index}:`}</p>
                        <div><strong>Name:</strong> {traveller.name || "N/A"}</div>
                        <div><strong>Age:</strong> {calculateAge(traveller.birthdate) || "N/A"}</div>
                        {index === 0 && <div><strong>Nationality:</strong> {getNationalityLabel(watchedValuesForSummary[7]) || "N/A"}</div>}
                    </div>
                ))}
                
                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
                <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                  <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedValuesForSummary[8]) || "N/A"}</div>
                  <div><strong>Primary Regions:</strong> {watchedValuesForSummary[9] || "N/A"}</div>
                  {watchedTripCitiesForSummary && watchedTripCitiesForSummary.length > 0 && (
                    <div>
                        <strong>Cities Visiting:</strong>
                        <ul className="list-disc list-inside pl-4">
                            {watchedTripCitiesForSummary.map((city, idx) => city.name && <li key={`summary-city-${idx}`}>{city.name}</li>)}
                        </ul>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
                <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                  <div><strong>Name:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
                  <div><strong>Number:</strong> {watchedValuesForSummary[11] || "N/A"}</div>
                </div>

                <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={register} error={getError("affiliate_code")} /></div>

                <div className="flex items-start space-x-3">
                  <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="consent" className="font-medium leading-snug">I Consent to the Sharing of My Medical Information in an Emergency and Authorize the Collection, Storage, and Use of My Personal Information for That Purpose</Label>
                    {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
                {step > 0 && (
                    <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
                    Back
                    </Button>
                )}
                {step === 0 && (
                    <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
                    Modify Choices
                    </Button>
                )}
                {(step > 0) && <div className="sm:flex-grow hidden sm:block"></div>}
                {step < steps.length - 1 && (
                    <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
                    Continue
                    </Button>
                )}
                {step === steps.length - 1 && (
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