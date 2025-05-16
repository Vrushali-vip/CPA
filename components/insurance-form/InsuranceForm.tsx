

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
} from "@/lib/insuranceFormSchema";
import {
  InputWithLabel,
  TextareaWithLabel,
  ControlledTextareaArray,
  SelectWithLabel,
  DatePickerField // Ensure this is imported
} from "./FormFields";

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
      travellers: [{ name: "", birthdate: "" }],
      is_company_arranged: false,
      trip_cities: [],
    },
    mode: "onChange",
  });

  const { watch, setValue, getValues, trigger, formState, control } = form; // register is form.register now

  const watchedStartDate = watch("trip_start_date");
  const watchedEndDate = watch("trip_end_date");
  const watchedGreenDaysForDisplay = watch("green_zone_days");

  useEffect(() => {
    if (watchedStartDate && watchedEndDate) {
      const start = new Date(watchedStartDate);
      const end = new Date(watchedEndDate);
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

  const cNameValue = watch("c_name");
  const cBirthdateValue = watch("c_birthdate");

  useEffect(() => {
    if (getValues("travellers")?.length > 0) {
      if (getValues("travellers.0.name") !== cNameValue) setValue("travellers.0.name", cNameValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_name });
      if (getValues("travellers.0.birthdate") !== cBirthdateValue) setValue("travellers.0.birthdate", cBirthdateValue || "", { shouldValidate: step === 1 && formState.dirtyFields.c_birthdate });
    } else if (cNameValue || cBirthdateValue) {
      setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || "" }]);
    }
  }, [cNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);

  const onSubmitForm = (data: InsuranceFormValues) => {
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
    console.log("Form Data Submitted for Purchase:", finalData);
    alert("Confirm & Purchase clicked! Form submitted. Check console.");
  };

  const handleNextOrContinue = async () => {
    const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
    const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });
    if (!currentStepValidationResult) {
      const firstErrorKeyOnCurrentStep = currentStepFields.find(
        (fieldName) => getError(fieldName as string) !== undefined
      );
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
    const keys = fieldName.split('.');
    let error: FieldErrors | FieldError | undefined = formState.errors;
    try {
      for (const key of keys) {
        const k = key.match(/^\d+$/) ? parseInt(key, 10) : key;
        if (error && typeof error === 'object' && error !== null) {
          const typedError = error as Record<string | number, unknown>;
          if (k in typedError) {
            error = typedError[k] as FieldErrors | FieldError;
          } else { return undefined; }
        } else { return undefined; }
      }
      return (error && typeof error === 'object' && 'message' in error) ? error as FieldError : undefined;
    } catch { return undefined; }
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

  const watchedValuesForSummary = watch([
    "trip_start_date", "trip_end_date",
    "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
    "c_name", "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
    "emergency_contact_name", "emergency_contact_phone"
  ]);
  const watchedAmberZoneDaysForDisplay = watch("amber_zone_days");
  const watchedRedZoneDaysForDisplay = watch("red_zone_days");

  const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
  const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
  const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
  const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;

  return (
    <div className="flex justify-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-4xl">
        {/* Stepper */}
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
            {/* Page 0: Trip & Coverage */}
            {step === 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Where and When Are You Travelling?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <DatePickerField label="Travel Start Date" name="trip_start_date" control={control} error={getError("trip_start_date")} placeholder="Select start date"/>
                  <DatePickerField label="Travel End Date" name="trip_end_date" control={control} error={getError("trip_end_date")} placeholder="Select end date"/>
                </div>

                <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">Risk Zone Days:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <InputWithLabel
                    label="Total Days"
                    name="displayTotalDays" // Not a real form field name for RHF schema
                    type="number"
                    value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays : ""}
                    readOnly={true}
                    // No register prop for display-only
                  />
                  <InputWithLabel
                    label="Green Zone Days"
                    name="green_zone_days"
                    type="number"
                    value={watchedGreenDaysForDisplay}
                    readOnly={true}
                    register={form.register} // Registered for validation
                    error={getError("green_zone_days")}
                  />
                  <InputWithLabel
                    label="Amber Zone Days"
                    name="amber_zone_days"
                    type="number"
                    register={form.register}
                    error={getError("amber_zone_days")}
                  />
                  <InputWithLabel
                    label="Red Zone Days"
                    name="red_zone_days"
                    type="number"
                    register={form.register}
                    error={getError("red_zone_days")}
                  />
                </div>

                {formState.errors.root && <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>}
                <p className="text-sm text-gray-500 mb-6">Note: Black Zone not selectable – for reference only (Value: {watch("black_zone_days") || 0})</p>

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

            {/* Step 1: Your Details */}
            {step === 1 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Your Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWithLabel label="Full Name" name="c_name" register={form.register} error={getError("c_name")} />
                  <div>
                    <DatePickerField label="Date of Birth" name="c_birthdate" control={control} error={getError("c_birthdate")} placeholder="Select date of birth"/>
                    {watch("c_birthdate") && <p className="text-sm text-gray-600 mt-1">Age: {calculateAge(watch("c_birthdate"))}</p>}
                  </div>
                  <InputWithLabel label="Phone Number" name="c_phone" type="tel" register={form.register} error={getError("c_phone")} />
                  <InputWithLabel label="WhatsApp (optional)" name="c_whats_app" type="tel" register={form.register} error={getError("c_whats_app")} />
                  <InputWithLabel label="Email Address" name="c_email" type="email" register={form.register} error={getError("c_email")} />
                  <SelectWithLabel label="Nationality" name="c_nationality" control={control} options={nationalityOptions} placeholder="Select Nationality" error={getError("c_nationality")} />
                  <InputWithLabel label="City of Residence" name="city_of_residence" register={form.register} error={getError("city_of_residence")} />
                  <SelectWithLabel label="Country Travelling To" name="trip_countries.0" control={control} options={countryOptions} placeholder="Select Country" error={getError("trip_countries.0") || getError("trip_countries")} />
                </div>
              </>
            )}

            {/* Step 2: Trip Information */}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Tell Us About Your Trip</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DatePickerField label="Arrival in Ukraine (Optional)" name="arrival_in_ukraine" control={control} error={getError("arrival_in_ukraine")} placeholder="Select arrival date"/>
                  <DatePickerField label="Departure from Ukraine (Optional)" name="departure_from_ukraine" control={control} error={getError("departure_from_ukraine")} placeholder="Select departure date"/>
                </div>
                <div className="mt-6"><InputWithLabel label="Primary Cities/Regions (in Ukraine, Optional)" name="primary_cities_regions_ukraine" register={form.register} error={getError("primary_cities_regions_ukraine")} /></div>
                <div className="mt-6"><SelectWithLabel label="Purpose of Travel" name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder="Select Purpose" error={getError("trip_purpose")} /></div>
                <div className="mt-6"><InputWithLabel label="Hotel/Accommodation Name (Optional)" name="stay_name" register={form.register} error={getError("stay_name")} /></div>
                <div className="mt-6"><InputWithLabel label="Company Arranging Travel (Optional)" name="company_name" register={form.register} error={getError("company_name")} /></div>
                <p className="mt-6 text-sm text-orange-600"><span className="font-bold">⚠ Ensure your zone-day breakdown matches Trip Details page</span></p>
              </>
            )}

            {/* Step 3: Medical & Emergency Contact */}
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
                  <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">Pre-existing Medical Conditions</Label></div>
                  {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label="List Conditions" error={getError("medical_conditions")} />)}
                  <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">Allergies</Label></div>
                  {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label="List Allergies" error={getError("allergies")} />)}
                  <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">Current Medications</Label></div>
                  {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications")} />)}
                  <InputWithLabel label="Blood Type (Optional)" name="blood_type" register={form.register} error={getError("blood_type")} />
                  <TextareaWithLabel label="Special Assistance Requirements (Optional)" name="special_assistance" register={form.register} error={getError("special_assistance")} />
                </div>
              </>
            )}

            {/* Step 4: Final Summary + Purchase */}
            {step === 4 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">Summary of Coverage</h2>
                <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
                  <div><strong>Travel Dates:</strong> {watchedValuesForSummary[0] || "N/A"} to {watchedValuesForSummary[1] || "N/A"}</div>
                  <div><strong>Total Risk Zone Days:</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
                  <div><strong>Risk Zone Breakdown:</strong></div>
                  <ul className="list-disc list-inside pl-4">
                    <li>Green: {watch("green_zone_days") || 0} days</li>
                    <li>Amber: {watchedAmberZoneDaysForDisplay || 0} days</li>
                    <li>Red: {watchedRedZoneDaysForDisplay || 0} days</li>
                  </ul>
                  <div><strong>Coverage Selected:</strong></div>
                  <ul className="list-disc list-inside pl-4">
                    <li>Medical: {getEmergencyMedicalLabel(watchedValuesForSummary[2] as string) || "N/A"}</li>
                    <li>PA: {getPALabel(watchedValuesForSummary[3] as string) || "N/A"}</li>
                    <li>Transit: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
                  </ul>
                  <div className="mt-4 pt-3 border-t">
                    <strong className="text-xl">Total Quote:</strong>
                    <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Insured Details:</h3>
                <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                  <div><strong>Name:</strong> {watchedValuesForSummary[5] || "N/A"}</div>
                  <div><strong>Age:</strong> {calculateAge(watchedValuesForSummary[6] as string) || "N/A"}</div>
                  <div><strong>Nationality:</strong> {getNationalityLabel(watchedValuesForSummary[7] as string) || "N/A"}</div>
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Trip Information:</h3>
                <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                  <div><strong>Purpose:</strong> {getTripPurposeLabel(watchedValuesForSummary[8] as string) || "N/A"}</div>
                  <div><strong>Primary Regions:</strong> {watchedValuesForSummary[9] || "N/A"}</div>
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">Emergency Contact:</h3>
                <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                  <div><strong>Name:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
                  <div><strong>Number:</strong> {watchedValuesForSummary[11] || "N/A"}</div>
                </div>

                <div className="mb-6"><InputWithLabel label="Affiliate Code (Optional)" name="affiliate_code" register={form.register} error={getError("affiliate_code")} /></div>

                <div className="flex items-start space-x-3">
                  <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="consent" className="font-medium leading-snug">I consent to sharing medical info in an emergency</Label>
                    {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
                  Back
                </Button>
              )}
              {step === 0 && !(step > 0) && (
                <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
                  Modify Choices
                </Button>
              )}
              {step > 0 && step === 0 && <div className="w-full sm:w-auto"></div>}
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