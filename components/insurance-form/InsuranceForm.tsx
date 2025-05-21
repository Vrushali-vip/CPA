// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller, FieldError, Path, useFieldArray, get } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   purchaseWithoutLoginSchema,
//   type InsuranceFormValues,
//   tripPurposes,
//   fieldsByStep,
//   emergencyMedicalCoverageOptions,
//   personalAccidentCoverageOptions,
//   nationalityOptions,
//   countryOptions,
//   countryCodeOptions,
// } from "@/lib/insuranceFormSchema";
// import {
//   InputWithLabel,
//   TextareaWithLabel,
//   ControlledTextareaArray,
//   SelectWithLabel,
//   DatePickerField
// } from "./FormFields";
// import { format as formatDateFn } from "date-fns";
// import BirthDateField from "../form/BirthDateField";
// import { useTranslation } from "@/hooks/useTranslation";


// export default function InsuranceForm() {
//   const { t } = useTranslation();
//   const steps = t("insuranceForm.steps", { returnObjects: true }) as string[];
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
//       c_phone_code: "",
//       c_phone_number: "",
//       c_whats_app: "",
//       c_whats_app_code: "",
//       c_whats_app_number: "",
//       c_email: "",
//       c_nationality: "",
//       city_of_residence: "",
//       trip_countries: [],
//       travellers: [{ name: "", birthdate: "" }],
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_cities: [],
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

//   const { fields: travellerFields, append: appendTraveller, remove: removeTraveller } = useFieldArray<InsuranceFormValues, "travellers", "id">({
//     control,
//     name: "travellers"
//   });

//   const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray<InsuranceFormValues, "trip_cities", "id">({
//     control,
//     name: "trip_cities"
//   });


//   const watchedStartDate = watch("trip_start_date");
//   const watchedEndDate = watch("trip_end_date");
//   const watchedGreenDaysForDisplay = watch("green_zone_days");

//   const cNameValue = watch("c_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     const currentTravellers = getValues("travellers");
//     if (!currentTravellers || currentTravellers.length === 0) {
//       setValue("travellers", [{ name: cNameValue || "", birthdate: cBirthdateValue || "" }], {
//         shouldValidate: false,
//         shouldDirty: false
//       });
//     } else {
//       let changed = false;
//       const newTraveller0 = { ...currentTravellers[0] };

//       if (newTraveller0.name !== cNameValue) {
//         newTraveller0.name = cNameValue || "";
//         changed = true;
//       }
//       if (newTraveller0.birthdate !== cBirthdateValue) {
//         newTraveller0.birthdate = cBirthdateValue || "";
//         changed = true;
//       }

//       if (changed) {
//         const updatedTravellers = [...currentTravellers];
//         updatedTravellers[0] = newTraveller0;
//         setValue("travellers", updatedTravellers, {
//           shouldValidate: step === 1 && (!!formState.dirtyFields.c_name || !!formState.dirtyFields.c_birthdate),
//           shouldDirty: true
//         });
//       }
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


//   const cPhoneCode = watch("c_phone_code");
//   const cPhoneNumber = watch("c_phone_number");
//   useEffect(() => {
//     const fullNumber = `${cPhoneCode || ''}${cPhoneNumber || ''}`;
//     if (getValues("c_phone") !== fullNumber) {
//       setValue("c_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cPhoneCode, cPhoneNumber, setValue, getValues]);

//   const cWhatsAppCode = watch("c_whats_app_code");
//   const cWhatsAppNumber = watch("c_whats_app_number");
//   useEffect(() => {
//     const fullNumber = `${cWhatsAppCode || ''}${cWhatsAppNumber || ''}`;
//     if (getValues("c_whats_app") !== fullNumber) {
//       setValue("c_whats_app", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cWhatsAppCode, cWhatsAppNumber, setValue, getValues]);

//   const emergencyContactPhoneCode = watch("emergency_contact_phone_code");
//   const emergencyContactPhoneNumber = watch("emergency_contact_phone_number");
//   useEffect(() => {
//     const fullNumber = `${emergencyContactPhoneCode || ''}${emergencyContactPhoneNumber || ''}`;
//     if (getValues("emergency_contact_phone") !== fullNumber) {
//       setValue("emergency_contact_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [emergencyContactPhoneCode, emergencyContactPhoneNumber, setValue, getValues]);


//   const onSubmitForm = (data: InsuranceFormValues) => {
//     const finalTravellers = [...data.travellers];
//     if (finalTravellers.length > 0) {
//       finalTravellers[0] = {
//         ...finalTravellers[0],
//         name: getValues("c_name") || "",
//         birthdate: getValues("c_birthdate") || ""
//       };
//     } else {
//       finalTravellers.push({
//         name: getValues("c_name") || "",
//         birthdate: getValues("c_birthdate") || ""
//       });
//     }

//     const finalData = {
//       ...data,
//       travellers: finalTravellers.map(t => ({ name: t.name, birthdate: t.birthdate })),
//       c_phone: `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`,
//       c_whats_app: `${getValues("c_whats_app_code") || ''}${getValues("c_whats_app_number") || ''}`,
//       emergency_contact_phone: `${getValues("emergency_contact_phone_code") || ''}${getValues("emergency_contact_phone_number") || ''}`,
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//       trip_cities: data.trip_cities ? data.trip_cities.filter(city => city.name && city.name.trim() !== "") : [],
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     alert("Confirm & Purchase clicked! Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const partFieldsToValidate: Path<InsuranceFormValues>[] = [];
//     if (step === 1) {
//       partFieldsToValidate.push("c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number");
//     }
//     if (step === 3) {
//       partFieldsToValidate.push("emergency_contact_phone_code", "emergency_contact_phone_number");
//     }
//     if (partFieldsToValidate.length > 0) {
//       await trigger(partFieldsToValidate);
//     }

//     const currentStepValidationResult = await trigger(currentStepFields, { shouldFocus: true });

//     if (!currentStepValidationResult) {
//       let firstErrorKeyOnCurrentStep = currentStepFields.find(
//         (fieldName) => getError(fieldName) !== undefined
//       );

//       if (!firstErrorKeyOnCurrentStep && formState.errors.travellers && step === 1) {
//         const travellerErrors = formState.errors.travellers;
//         if (Array.isArray(travellerErrors)) {
//           for (let i = 0; i < travellerErrors.length; i++) {
//             const specificTravellerErrors = travellerErrors[i];
//             if (specificTravellerErrors) {
//               if (specificTravellerErrors.name) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.name` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.birthdate) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.birthdate` as Path<InsuranceFormValues>;
//                 break;
//               }
//             }
//           }
//         }
//       }
//       if (!firstErrorKeyOnCurrentStep && formState.errors.trip_cities && step === 2) {
//         const cityErrorsArray = formState.errors.trip_cities;
//         if (Array.isArray(cityErrorsArray)) {
//           for (let i = 0; i < cityErrorsArray.length; i++) {
//             const specificCityErrors = cityErrorsArray[i];
//             if (specificCityErrors?.name) {
//               firstErrorKeyOnCurrentStep = `trip_cities.${i}.name` as Path<InsuranceFormValues>;
//               break;
//             }
//           }
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

//   const getError = (fieldName: Path<InsuranceFormValues>): FieldError | undefined => {
//     const error = get(formState.errors, fieldName);
//     if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
//       return error as FieldError;
//     }
//     return undefined;
//   };

//   const calculateAge = (birthdate: string | undefined): string => {
//     if (!birthdate) return "";
//     const parts = birthdate.split('-');
//     if (parts.length !== 3) return "";

//     const year = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const day = parseInt(parts[2], 10);

//     const birthDateObj = new Date(year, month, day);
//     if (isNaN(birthDateObj.getTime()) ||
//       birthDateObj.getFullYear() !== year ||
//       birthDateObj.getMonth() !== month ||
//       birthDateObj.getDate() !== day) {
//       return "";
//     }

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
//       const parts = dateString.split('-');
//       if (parts.length !== 3) return "Invalid Date";
//       const year = parseInt(parts[0], 10);
//       const month = parseInt(parts[1], 10) - 1;
//       const day = parseInt(parts[2], 10);
//       const dateObj = new Date(year, month, day);

//       if (isNaN(dateObj.getTime()) ||
//         dateObj.getFullYear() !== year ||
//         dateObj.getMonth() !== month ||
//         dateObj.getDate() !== day) {
//         return "Invalid Date";
//       }
//       return formatDateFn(dateObj, "PPP");
//     } catch (e) {
//       console.error("Error formatting date for display:", dateString, e);
//       return "Invalid Date";
//     }
//   };

//   const watchedPathsForSummary = [
//     "trip_start_date", "trip_end_date",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
//     "c_name", "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_name", "emergency_contact_phone",
//   ] as const;

//   const watchedValuesForSummary = watch(watchedPathsForSummary);
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
//           <div className="flex items-center justify-between">
//             {steps.map((label, index) => (
//               <div key={index} className="flex-1 text-center text-sm">
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step ? "bg-[#1A2C50] text-white" : "bg-[#00BBD3] text-white"
//                     }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-1">{t(label)}</div>
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
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">
//                   {t("insuranceForm.travelDetails")}
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <DatePickerField
//                     label={t("insuranceForm.travelStartDate")}
//                     name="trip_start_date"
//                     control={control}
//                     error={getError("trip_start_date")}
//                     placeholder={t("insuranceForm.selectStartDate")}
//                     maxDate={watchedEndDate ? new Date(watchedEndDate + "T00:00:00") : undefined}
//                   />
//                   <DatePickerField
//                     label={t("insuranceForm.travelEndDate")}
//                     name="trip_end_date"
//                     control={control}
//                     error={getError("trip_end_date")}
//                     placeholder={t("insuranceForm.selectEndDate")}
//                     minDate={watchedStartDate ? new Date(watchedStartDate + "T00:00:00") : undefined}
//                   />
//                 </div>

//                 <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">
//                   {t("insuranceForm.riskZoneDays")}
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <InputWithLabel
//                     label={t("insuranceForm.totalDays")}
//                     name="displayTotalDays"
//                     type="number"
//                     value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays.toString() : ""}
//                     readOnly={true}
//                   />
//                   <InputWithLabel
//                     label={t("insuranceForm.greenZoneDays")}
//                     name="green_zone_days"
//                     type="number"
//                     value={watchedGreenDaysForDisplay?.toString()}
//                     readOnly={true}
//                     register={register}
//                     error={getError("green_zone_days")}
//                   />
//                   <InputWithLabel
//                     label={t("insuranceForm.amberZoneDays")}
//                     name="amber_zone_days"
//                     type="number"
//                     register={register}
//                     error={getError("amber_zone_days")}
//                   />
//                   <InputWithLabel
//                     label={t("insuranceForm.redZoneDays")}
//                     name="red_zone_days"
//                     type="number"
//                     register={register}
//                     error={getError("red_zone_days")}
//                   />
//                 </div>

//                 {formState.errors.root && (
//                   <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>
//                 )}

//                 <SelectWithLabel
//                     label={t('insuranceForm.step1.countryTravellingTo')}
//                     name="trip_countries.0"
//                     control={control}
//                     options={countryOptions}
//                     placeholder={t('insuranceForm.step1.selectCountry')}
//                     error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
//                   />

//                 <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">
//                   {t("insuranceForm.coverageOptions")}
//                 </h3>
//                 <div className="space-y-4 mb-6">
//                   <SelectWithLabel
//                     label={t("insuranceForm.emergencyMedical")}
//                     name="emergency_medical_coverage"
//                     control={control}
//                     options={emergencyMedicalCoverageOptions}
//                     placeholder={t("insuranceForm.selectMedicalCoverage")}
//                     error={getError("emergency_medical_coverage")}
//                   />
//                   <SelectWithLabel
//                     label={t("insuranceForm.personalAccident")}
//                     name="personal_accident_coverage_level"
//                     control={control}
//                     options={personalAccidentCoverageOptions}
//                     placeholder={t("insuranceForm.selectPACoverage")}
//                     error={getError("personal_accident_coverage_level")}
//                   />
//                   <div className="flex items-center space-x-2">
//                     <Controller
//                       name="add_transit_coverage"
//                       control={control}
//                       render={({ field }) => (
//                         <Checkbox
//                           id="add_transit_coverage"
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       )}
//                     />
//                     <Label htmlFor="add_transit_coverage">{t("insuranceForm.addTransitCover")}</Label>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-md border">
//                   <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">
//                     {t("insuranceForm.quoteSummary")}
//                   </h3>
//                   <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
//                   <div className="text-sm mt-2">
//                     <p>
//                       {t("insuranceForm.medical")}: {getEmergencyMedicalLabel(watch("emergency_medical_coverage"))}
//                     </p>
//                     <p>
//                       {t("insuranceForm.pa")}: {getPALabel(watch("personal_accident_coverage_level"))}
//                     </p>
//                     <p>
//                       {t("insuranceForm.transit")}:
//                       {watch("add_transit_coverage") ? t("insuranceForm.yes250k") : t("insuranceForm.no")}
//                     </p>
//                   </div>
//                 </div>
//               </>
//             )}


//             {step === 1 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t('insuranceForm.step1.yourDetails')}</h2>

//                 <h3 className="text-lg font-semibold mb-3 text-[#1A2C50]">{t('insuranceForm.step1.primaryTraveller')}</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel
//                     label={t('insuranceForm.step1.fullName')}
//                     name="c_name"
//                     register={register}
//                     error={getError("c_name") || getError("travellers.0.name" as Path<InsuranceFormValues>)}
//                   />
//                   <div className="mt-1.5">
//                     <BirthDateField
//                       label={t('insuranceForm.step1.dob')}
//                       name="c_birthdate"
//                       control={control}
//                       getError={getError}
//                       watch={watch}

//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1">{t('insuranceForm.step1.phoneNumber')}</p>
//                     <div className="flex items-start gap-2">
//                       <div className="w-1/3 shrink-0">
//                         <SelectWithLabel control={control} name="c_phone_code" label="" options={countryCodeOptions} placeholder="Code" />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel label="" name="c_phone_number" type="tel" register={register} placeholder={t('insuranceForm.step1.enterNumber')} />
//                       </div>
//                     </div>
//                     {getError("c_phone") && <p className="text-sm text-red-500 mt-1">{getError("c_phone")?.message}</p>}
//                   </div>

//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1">{t('insuranceForm.step1.whatsapp')}</p>
//                     <div className="flex items-start gap-2">
//                       <div className="w-1/3 shrink-0">
//                         <SelectWithLabel control={control} name="c_whats_app_code" label="" options={countryCodeOptions} placeholder="Code" />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel label="" name="c_whats_app_number" type="tel" register={register} placeholder={t('insuranceForm.step1.enterNumber')} />
//                       </div>
//                     </div>
//                     {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
//                   </div>

//                   <InputWithLabel label={t('insuranceForm.step1.email')} name="c_email" type="email" register={register} error={getError("c_email")} />
//                   <SelectWithLabel label={t('insuranceForm.step1.nationality')} name="c_nationality" control={control} options={nationalityOptions} placeholder={t('insuranceForm.step1.selectNationality')} error={getError("c_nationality")} />
//                   <InputWithLabel label={t('insuranceForm.step1.cityOfResidence')} name="city_of_residence" register={register} error={getError("city_of_residence")} />
//                   <SelectWithLabel
//                     label={t('insuranceForm.step1.countryOfResidence')}
//                     name="trip_countries.0"
//                     control={control}
//                     options={countryOptions}
//                     placeholder={t('insuranceForm.step1.selectCountry')}
//                     error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
//                   />
//                 </div>

//                 {travellerFields.map((field, index) => {
//                   if (index === 0) return null;

//                   const namePath = `travellers.${index}.name` as Path<InsuranceFormValues>;
//                   const birthdatePath = `travellers.${index}.birthdate` as Path<InsuranceFormValues>;

//                   return (
//                     <div key={field.id} className="mt-6 pt-6 border-t">
//                       <div className="flex justify-between items-center mb-3">
//                         <h3 className="text-lg font-semibold text-[#1A2C50]">
//                           {t("insuranceForm.step1.additionalTraveller").replace("{{index}}", String(index))}
//                         </h3>
//                         <Button type="button" variant="destructive" size="sm" onClick={() => removeTraveller(index)}>
//                           {t("insuranceForm.step1.remove")}
//                         </Button>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.fullName")}
//                           name={namePath}
//                           register={register}
//                           error={getError(namePath)}
//                         />
//                         <div className="w-full mt-1.5">
//                           <BirthDateField
//                             label={t('insuranceForm.step1.dob')}
//                             name={birthdatePath}
//                             control={control}
//                             getError={getError}
//                             watch={watch}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//                 <Button type="button" variant="outline" onClick={() => appendTraveller({ name: "", birthdate: "" })} className="mt-6">
//                   {t("insuranceForm.step1.addAdditionalTraveller")}
//                 </Button>
//                 {getError("travellers" as Path<InsuranceFormValues>) && typeof getError("travellers" as Path<InsuranceFormValues>)?.message === 'string' &&
//                   <p className="text-sm text-red-500 mt-1">{getError("travellers" as Path<InsuranceFormValues>)?.message}</p>}
//               </>
//             )}
//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step2.title")}</h2>
//                 <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.primaryCities")} name="primary_cities_regions_ukraine" register={register} error={getError("primary_cities_regions_ukraine")} /></div>
//                 <div className="mt-6"><SelectWithLabel label={t("insuranceForm.step2.tripPurpose")} name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder={t("insuranceForm.step2.selectTripPurpose")} error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.stayName")} name="stay_name" register={register} error={getError("stay_name")} /></div>
//                 <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.companyName")} name="company_name" register={register} error={getError("company_name")} /></div>

//                 <div className="mt-8 pt-6 border-t">
//                   <h3 className="text-lg font-semibold mb-3 text-[#1A2C50]">{t("insuranceForm.step2.citiesVisitingTitle")}</h3>
//                   {cityFields.map((field, index) => {
//                     const cityNamePath = `trip_cities.${index}.name` as Path<InsuranceFormValues>;
//                     const cityZoneTypePath = `trip_cities.${index}.zoneType` as Path<InsuranceFormValues>;
//                     return (
//                       <div key={field.id} className="flex items-end gap-2 mb-3">
//                         <div className="flex-grow">
//                           <InputWithLabel
//                             label={t("insuranceForm.step2.cityName").replace("{{index}}", (index + 1).toString())}
//                             name={cityNamePath}
//                             register={register}
//                             error={getError(cityNamePath)}
//                             placeholder={t("insuranceForm.step2.enterCityName")}
//                           />
//                           <input type="hidden" {...register(cityZoneTypePath)} value="GREEN" />
//                         </div>
//                         <Button type="button" variant="destructive" size="sm" onClick={() => removeCity(index)}>
//                           {t("insuranceForm.step2.remove")}
//                         </Button>
//                       </div>
//                     );
//                   })}
//                   <Button type="button" variant="outline" onClick={() => appendCity({ name: "", zoneType: "GREEN" })}>
//                     {t("insuranceForm.step2.addCity")}
//                   </Button>
//                   {getError("trip_cities" as Path<InsuranceFormValues>) && typeof getError("trip_cities" as Path<InsuranceFormValues>)?.message === 'string' && <p className="text-sm text-red-500 mt-1">{getError("trip_cities" as Path<InsuranceFormValues>)?.message}</p>}
//                 </div>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step3.title")}</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <InputWithLabel label={t("insuranceForm.step3.contactName")} name="emergency_contact_name" register={register} error={getError("emergency_contact_name")} />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1">{t("insuranceForm.step3.contactNumber")}</p>
//                     <div className="flex items-start gap-2">
//                       <div className="w-1/3 shrink-0">
//                         <SelectWithLabel control={control} name="emergency_contact_phone_code" label="" options={countryCodeOptions} placeholder="Code" />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel label="" name="emergency_contact_phone_number" type="tel" register={register} placeholder={t("insuranceForm.step3.numberPlaceholder")} />
//                       </div>
//                     </div>
//                     {getError("emergency_contact_phone") && <p className="text-sm text-red-500 mt-1">{getError("emergency_contact_phone")?.message}</p>}
//                   </div>
//                   <InputWithLabel label={t("insuranceForm.step3.relationship")} name="emergency_contact_relation" register={register} error={getError("emergency_contact_relation")} />
//                 </div>
//                 <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">{t("insuranceForm.step3.optionalMedicalTitle")}</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">{t("insuranceForm.step3.preExistingConditions")}</Label></div>
//                   {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label={t("insuranceForm.step3.listConditions")} error={getError("medical_conditions" as Path<InsuranceFormValues>)} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">{t("insuranceForm.step3.allergies")}</Label></div>
//                   {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label={t("insuranceForm.step3.listAllergies")} error={getError("allergies" as Path<InsuranceFormValues>)} />)}
//                   <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">{t("insuranceForm.step3.currentMedications")}</Label></div>
//                   {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications" as Path<InsuranceFormValues>)} />)}
//                   <InputWithLabel label={t("insuranceForm.step3.bloodType")} name="blood_type" register={register} error={getError("blood_type")} />
//                   <TextareaWithLabel label={t("insuranceForm.step3.specialAssistance")} name="special_assistance" register={register} error={getError("special_assistance")} />
//                 </div>
//               </>
//             )}

//             {step === 4 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step4.summaryOfCoverage.title")}</h2>
//                 <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>{t("insuranceForm.step4.summaryOfCoverage.travelDates")}</strong> {formatDateForDisplay(watchedValuesForSummary[0])} to {formatDateForDisplay(watchedValuesForSummary[1])}</div>
//                   <div><strong>{t("insuranceForm.step4.summaryOfCoverage.totalRiskZoneDays")}</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
//                   <div><strong>{t("insuranceForm.step4.summaryOfCoverage.riskZoneBreakdown")}</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.zone.green")}: {watch("green_zone_days") || 0} days</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.zone.amber")}: {watchedAmberZoneDaysForDisplay || 0} days</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.zone.red")}: {watchedRedZoneDaysForDisplay || 0} days</li>
//                   </ul>
//                   <div><strong>{t("insuranceForm.step4.summaryOfCoverage.coverageSelected")}</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.medical")}: {getEmergencyMedicalLabel(watchedValuesForSummary[2]) || "N/A"}</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.pa")}: {getPALabel(watchedValuesForSummary[3]) || "N/A"}</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.transit")}: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
//                   </ul>
//                   <div className="mt-4 pt-3 border-t">
//                     <strong className="text-xl">{t("insuranceForm.step4.summaryOfCoverage.totalQuote")}:</strong>
//                     <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.insuredDetails.title")}</h3>
//                 {watchedTravellersForSummary && watchedTravellersForSummary.map((traveller, index) => (
//                   <div key={`summary-traveller-${index}`} className="space-y-1 p-4 bg-gray-50 rounded-md border mb-3">
//                     <p className="font-semibold">
//                       {index === 0
//                         ? t("insuranceForm.step4.insuredDetails.primaryTraveller")
//                         : t("insuranceForm.step4.insuredDetails.additionalTraveller").replace("{{index}}", `${index + 1}`)}
//                     </p>

//                     <div><strong>{t("insuranceForm.step4.insuredDetails.name")}:</strong> {traveller.name || "N/A"}</div>
//                     <div><strong>{t("insuranceForm.step4.insuredDetails.age")}:</strong> {calculateAge(traveller.birthdate) || "N/A"}</div>
//                     {index === 0 && <div><strong>{t("insuranceForm.step4.insuredDetails.nationality")}:</strong> {getNationalityLabel(watchedValuesForSummary[7]) || "N/A"}</div>}
//                   </div>
//                 ))}

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.tripInformation.title")}:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>{t("insuranceForm.step4.tripInformation.purpose")}:</strong> {getTripPurposeLabel(watchedValuesForSummary[8]) || "N/A"}</div>
//                   <div><strong>{t("insuranceForm.step4.tripInformation.primaryRegions")}:</strong> {watchedValuesForSummary[9] || "N/A"}</div>
//                   {watchedTripCitiesForSummary && watchedTripCitiesForSummary.length > 0 && (
//                     <div>
//                       <strong>{t("insuranceForm.step4.tripInformation.citiesVisiting")}:</strong>
//                       <ul className="list-disc list-inside pl-4">
//                         {watchedTripCitiesForSummary.filter(city => city.name && city.name.trim() !== "").map((city, idx) => <li key={`summary-city-${idx}`}>{city.name}</li>)}
//                       </ul>
//                     </div>
//                   )}
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.emergencyContact.title")}:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.name")}:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.number")}:</strong> {watchedValuesForSummary[11] || "N/A"}</div>
//                 </div>

//                 <div className="mb-6"><InputWithLabel label={t("insuranceForm.step4.affiliateCode.label")} name="affiliate_code" register={register} error={getError("affiliate_code")} /></div>

//                 <div className="flex items-start space-x-3">
//                   <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
//                   <div className="grid gap-1.5 leading-none">
//                     <Label htmlFor="consent" className="font-medium leading-snug">{t("insuranceForm.step4.consent.label")}</Label>
//                     {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
//                   </div>
//                 </div>
//               </>
//             )}
//             <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
//               {step > 0 && (
//                 <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
//                   {t("insuranceForm.actions.back")}
//                 </Button>
//               )}
//               {step === 0 && (
//                 <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
//                   {t("insuranceForm.actions.modifyChoices")}
//                 </Button>
//               )}
//               {(step > 0 && step < steps.length - 1) && <div className="sm:flex-grow hidden sm:block"></div>} {/* Hide spacer on last step when only one button might be present if back is hidden */}
//               {step < steps.length - 1 && (
//                 <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                   {t("insuranceForm.actions.continue")}
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
  tripPurposes,
  fieldsByStep,
  emergencyMedicalCoverageOptions,
  personalAccidentCoverageOptions,
  nationalityOptions,
  countryOptions,
  countryCodeOptions,
} from "@/lib/insuranceFormSchema";
import {
  InputWithLabel,
  TextareaWithLabel,
  ControlledTextareaArray,
  SelectWithLabel,
  DatePickerField
} from "./FormFields";
import { format as formatDateFn } from "date-fns";
import BirthDateField from "../form/BirthDateField";
import { useTranslation } from "@/hooks/useTranslation";


export default function InsuranceForm() {
  const { t } = useTranslation();
  const steps = t("insuranceForm.steps", { returnObjects: true }) as string[];
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
      c_first_name: "",
      c_last_name: "",
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
      travellers: [{ first_name: "", last_name: "", birthdate: "" }],
      arrival_in_ukraine: "",
      departure_from_ukraine: "",
      primary_cities_regions_ukraine: "",
      trip_cities: [],
      trip_purpose: "",
      stay_name: "",
      company_name: "",
      emergency_contact_first_name: "",
      emergency_contact_last_name: "",
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

  const cFirstNameValue = watch("c_first_name");
  const cLastNameValue = watch("c_last_name");
  const cBirthdateValue = watch("c_birthdate");

  useEffect(() => {
    const currentTravellers = getValues("travellers");
    if (!currentTravellers || currentTravellers.length === 0) {
      setValue("travellers", [{
        first_name: cFirstNameValue || "",
        last_name: cLastNameValue || "",
        birthdate: cBirthdateValue || ""
      }], {
        shouldValidate: false,
        shouldDirty: false
      });
    } else {
      let changed = false;
      const newTraveller0 = { ...currentTravellers[0] };

      if (newTraveller0.first_name !== cFirstNameValue) {
        newTraveller0.first_name = cFirstNameValue || "";
        changed = true;
      }
      if (newTraveller0.last_name !== cLastNameValue) {
        newTraveller0.last_name = cLastNameValue || "";
        changed = true;
      }
      if (newTraveller0.birthdate !== cBirthdateValue) {
        newTraveller0.birthdate = cBirthdateValue || "";
        changed = true;
      }

      if (changed) {
        const updatedTravellers = [...currentTravellers];
        updatedTravellers[0] = newTraveller0;
        setValue("travellers", updatedTravellers, {
          shouldValidate: step === 1 && (!!formState.dirtyFields.c_first_name || !!formState.dirtyFields.c_last_name || !!formState.dirtyFields.c_birthdate),
          shouldDirty: true
        });
      }
    }
  }, [cFirstNameValue, cLastNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);


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
    const finalTravellers = [...data.travellers];
    if (finalTravellers.length > 0) {
      finalTravellers[0] = {
        ...finalTravellers[0],
        first_name: getValues("c_first_name") || "",
        last_name: getValues("c_last_name") || "",
        birthdate: getValues("c_birthdate") || ""
      };
    } else {
      finalTravellers.push({
        first_name: getValues("c_first_name") || "",
        last_name: getValues("c_last_name") || "",
        birthdate: getValues("c_birthdate") || ""
      });
    }

    const finalData = {
      ...data,
      travellers: finalTravellers.map(t => ({
        first_name: t.first_name,
        last_name: t.last_name,
        birthdate: t.birthdate
      })),
      c_phone: `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`,
      c_whats_app: `${getValues("c_whats_app_code") || ''}${getValues("c_whats_app_number") || ''}`,
      emergency_contact_phone: `${getValues("emergency_contact_phone_code") || ''}${getValues("emergency_contact_phone_number") || ''}`,
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
        (fieldName) => getError(fieldName) !== undefined
      );

      if (!firstErrorKeyOnCurrentStep && formState.errors.travellers && step === 1) {
        const travellerErrors = formState.errors.travellers;
        if (Array.isArray(travellerErrors)) {
          for (let i = 0; i < travellerErrors.length; i++) {
            const specificTravellerErrors = travellerErrors[i];
            if (specificTravellerErrors) {
              if (specificTravellerErrors.first_name) {
                firstErrorKeyOnCurrentStep = `travellers.${i}.first_name` as Path<InsuranceFormValues>;
                break;
              }
              if (specificTravellerErrors.last_name) {
                firstErrorKeyOnCurrentStep = `travellers.${i}.last_name` as Path<InsuranceFormValues>;
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
      if (!firstErrorKeyOnCurrentStep && formState.errors.trip_cities && step === 2) {
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

  const getError = (fieldName: Path<InsuranceFormValues>): FieldError | undefined => {
    const error = get(formState.errors, fieldName);
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      return error as FieldError;
    }
    return undefined;
  };

  const calculateAge = (birthdate: string | undefined): string => {
    if (!birthdate) return "";
    const parts = birthdate.split('-');
    if (parts.length !== 3) return "";

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const birthDateObj = new Date(year, month, day);
    if (isNaN(birthDateObj.getTime()) ||
      birthDateObj.getFullYear() !== year ||
      birthDateObj.getMonth() !== month ||
      birthDateObj.getDate() !== day) {
      return "";
    }

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
      const parts = dateString.split('-');
      if (parts.length !== 3) return "Invalid Date";
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const dateObj = new Date(year, month, day);

      if (isNaN(dateObj.getTime()) ||
        dateObj.getFullYear() !== year ||
        dateObj.getMonth() !== month ||
        dateObj.getDate() !== day) {
        return "Invalid Date";
      }
      return formatDateFn(dateObj, "PPP");
    } catch (e) {
      console.error("Error formatting date for display:", dateString, e);
      return "Invalid Date";
    }
  };

  const watchedPathsForSummary = [
    "trip_start_date", "trip_end_date",
    "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
    "c_first_name", "c_last_name",
    "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
    "emergency_contact_first_name", "emergency_contact_last_name",
    "emergency_contact_phone",
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

  const formatFullName = (firstName?: string, lastName?: string): string => {
    const first = firstName || "";
    const last = lastName || "";
    if (first && last) return `${first} ${last}`;
    return first || last || "N/A";
  };

  return (
    <div className="flex justify-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-4xl">
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            {steps.map((label, index) => (
              <div key={index} className="flex-1 text-center text-sm">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${index <= step ? "bg-[#1A2C50] text-white" : "bg-[#00BBD3] text-white"
                    }`}
                >
                  {index + 1}
                </div>
                <div className="mt-1">{t(label)}</div>
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
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">
                  {t("insuranceForm.travelDetails")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <DatePickerField
                    label={t("insuranceForm.travelStartDate")}
                    name="trip_start_date"
                    control={control}
                    error={getError("trip_start_date")}
                    placeholder={t("insuranceForm.selectStartDate")}
                    maxDate={watchedEndDate ? new Date(watchedEndDate + "T00:00:00") : undefined}
                  />
                  <DatePickerField
                    label={t("insuranceForm.travelEndDate")}
                    name="trip_end_date"
                    control={control}
                    error={getError("trip_end_date")}
                    placeholder={t("insuranceForm.selectEndDate")}
                    minDate={watchedStartDate ? new Date(watchedStartDate + "T00:00:00") : undefined}
                  />
                </div>

                <h3 className="text-xl font-semibold mb-1 text-[#1A2C50]">
                  {t("insuranceForm.riskZoneDays")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <InputWithLabel
                    label={t("insuranceForm.totalDays")}
                    name="displayTotalDays"
                    type="number"
                    value={calculatedTotalRiskZoneDays !== null ? calculatedTotalRiskZoneDays.toString() : ""}
                    readOnly={true}
                  />
                  <InputWithLabel
                    label={t("insuranceForm.greenZoneDays")}
                    name="green_zone_days"
                    type="number"
                    value={watchedGreenDaysForDisplay?.toString()}
                    readOnly={true}
                    register={register}
                    error={getError("green_zone_days")}
                  />
                  <InputWithLabel
                    label={t("insuranceForm.amberZoneDays")}
                    name="amber_zone_days"
                    type="number"
                    register={register}
                    error={getError("amber_zone_days")}
                  />
                  <InputWithLabel
                    label={t("insuranceForm.redZoneDays")}
                    name="red_zone_days"
                    type="number"
                    register={register}
                    error={getError("red_zone_days")}
                  />
                </div>

                {formState.errors.root && (
                  <p className="text-sm text-red-500 mb-4">{formState.errors.root.message}</p>
                )}

                <SelectWithLabel
                  label={t('insuranceForm.step1.countryTravellingTo')}
                  name="trip_countries.0"
                  control={control}
                  options={countryOptions}
                  placeholder={t('insuranceForm.step1.selectCountry')}
                  error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
                />

                <h3 className="text-xl font-semibold mb-4 text-[#1A2C50]">
                  {t("insuranceForm.coverageOptions")}
                </h3>
                <div className="space-y-4 mb-6">
                  <SelectWithLabel
                    label={t("insuranceForm.emergencyMedical")}
                    name="emergency_medical_coverage"
                    control={control}
                    options={emergencyMedicalCoverageOptions}
                    placeholder={t("insuranceForm.selectMedicalCoverage")}
                    error={getError("emergency_medical_coverage")}
                  />
                  <SelectWithLabel
                    label={t("insuranceForm.personalAccident")}
                    name="personal_accident_coverage_level"
                    control={control}
                    options={personalAccidentCoverageOptions}
                    placeholder={t("insuranceForm.selectPACoverage")}
                    error={getError("personal_accident_coverage_level")}
                  />
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="add_transit_coverage"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="add_transit_coverage"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="add_transit_coverage">{t("insuranceForm.addTransitCover")}</Label>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-md border">
                  <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">
                    {t("insuranceForm.quoteSummary")}
                  </h3>
                  <p className="text-2xl font-bold text-[#00BBD3]">$[Calculated Price Placeholder]</p>
                  <div className="text-sm mt-2">
                    <p>
                      {t("insuranceForm.medical")}: {getEmergencyMedicalLabel(watch("emergency_medical_coverage"))}
                    </p>
                    <p>
                      {t("insuranceForm.pa")}: {getPALabel(watch("personal_accident_coverage_level"))}
                    </p>
                    <p>
                      {t("insuranceForm.transit")}:
                      {watch("add_transit_coverage") ? t("insuranceForm.yes250k") : t("insuranceForm.no")}
                    </p>
                  </div>
                </div>
              </>
            )}


            {step === 1 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t('insuranceForm.step1.yourDetails')}</h2>

                <h3 className="text-lg font-semibold mb-3 text-[#1A2C50]">{t('insuranceForm.step1.primaryTraveller')}</h3>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div> 
                    <InputWithLabel
                      label={t("insuranceForm.step1.contactFirstName")}
                      name="c_first_name"
                      register={register}
                      error={getError("c_first_name") || getError("travellers.0.first_name" as Path<InsuranceFormValues>)}
                    />
                    <div className="mt-2"> 
                      <InputWithLabel
                        label={t("insuranceForm.step1.contactLastName")}
                        name="c_last_name"
                        register={register}
                        error={getError("c_last_name") || getError("travellers.0.last_name" as Path<InsuranceFormValues>)}
                      />
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <BirthDateField
                      label={t('insuranceForm.step1.dob')}
                      name="c_birthdate"
                      control={control}
                      getError={getError}
                      watch={watch}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{t('insuranceForm.step1.phoneNumber')}</p>
                    <div className="flex items-start gap-2">
                      <div className="w-1/3 shrink-0">
                        <SelectWithLabel control={control} name="c_phone_code" label="" options={countryCodeOptions} placeholder="Code" />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel label="" name="c_phone_number" type="tel" register={register} placeholder={t('insuranceForm.step1.enterNumber')} />
                      </div>
                    </div>
                    {getError("c_phone") && <p className="text-sm text-red-500 mt-1">{getError("c_phone")?.message}</p>}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{t('insuranceForm.step1.whatsapp')}</p>
                    <div className="flex items-start gap-2">
                      <div className="w-1/3 shrink-0">
                        <SelectWithLabel control={control} name="c_whats_app_code" label="" options={countryCodeOptions} placeholder="Code" />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel label="" name="c_whats_app_number" type="tel" register={register} placeholder={t('insuranceForm.step1.enterNumber')} />
                      </div>
                    </div>
                    {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
                  </div>

                  <InputWithLabel label={t('insuranceForm.step1.email')} name="c_email" type="email" register={register} error={getError("c_email")} />
                  <SelectWithLabel label={t('insuranceForm.step1.nationality')} name="c_nationality" control={control} options={nationalityOptions} placeholder={t('insuranceForm.step1.selectNationality')} error={getError("c_nationality")} />
                  <InputWithLabel label={t('insuranceForm.step1.cityOfResidence')} name="city_of_residence" register={register} error={getError("city_of_residence")} />
                  <SelectWithLabel
                    label={t('insuranceForm.step1.countryOfResidence')}
                    name="trip_countries.0" 
                    control={control}
                    options={countryOptions}
                    placeholder={t('insuranceForm.step1.selectCountry')}
                    error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
                  />
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start gap-2">
                      <div className="flex-grow">
                        <InputWithLabel
                          label={t("insuranceForm.step1.contactFirstName")}
                          name="c_first_name"
                          register={register}
                          placeholder={t("insuranceForm.step1.contactFirstName")}
                          error={getError("c_first_name") || getError("travellers.0.first_name" as Path<InsuranceFormValues>)}
                        />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel
                          label={t("insuranceForm.step1.contactLastName")}
                          name="c_last_name"
                          register={register}
                          placeholder={t("insuranceForm.step1.contactLastName")}
                          error={getError("c_last_name") || getError("travellers.0.last_name" as Path<InsuranceFormValues>)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Birthdate field remains as is */}
                  <div className="mt-1.5">
                    <BirthDateField
                      label={t('insuranceForm.step1.dob')}
                      name="c_birthdate"
                      control={control}
                      getError={getError}
                      watch={watch}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{t('insuranceForm.step1.phoneNumber')}</p>
                    <div className="flex items-start gap-2">
                      <div className="w-1/3 shrink-0">
                        <SelectWithLabel control={control} name="c_phone_code" label="" options={countryCodeOptions} placeholder="Code" />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel label="" name="c_phone_number" type="tel" register={register} placeholder={t('insuranceForm.step1.enterNumber')} />
                      </div>
                    </div>
                    {getError("c_phone") && <p className="text-sm text-red-500 mt-1">{getError("c_phone")?.message}</p>}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{t('insuranceForm.step1.whatsapp')}</p>
                    <div className="flex items-start gap-2">
                      <div className="w-1/3 shrink-0">
                        <SelectWithLabel control={control} name="c_whats_app_code" label="" options={countryCodeOptions} placeholder="Code" />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel label="" name="c_whats_app_number" type="tel" register={register} placeholder={t('insuranceForm.step1.enterNumber')} />
                      </div>
                    </div>
                    {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
                  </div>

                  <InputWithLabel label={t('insuranceForm.step1.email')} name="c_email" type="email" register={register} error={getError("c_email")} />
                  <SelectWithLabel label={t('insuranceForm.step1.nationality')} name="c_nationality" control={control} options={nationalityOptions} placeholder={t('insuranceForm.step1.selectNationality')} error={getError("c_nationality")} />
                  <InputWithLabel label={t('insuranceForm.step1.cityOfResidence')} name="city_of_residence" register={register} error={getError("city_of_residence")} />
                  <SelectWithLabel
                    label={t('insuranceForm.step1.countryOfResidence')}
                    name="trip_countries.0"
                    control={control}
                    options={countryOptions}
                    placeholder={t('insuranceForm.step1.selectCountry')}
                    error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
                  />
                </div>
                {travellerFields.map((field, index) => {
                  if (index === 0) return null;

                  const firstNamePath = `travellers.${index}.first_name` as Path<InsuranceFormValues>;
                  const lastNamePath = `travellers.${index}.last_name` as Path<InsuranceFormValues>;
                  const birthdatePath = `travellers.${index}.birthdate` as Path<InsuranceFormValues>;

                  return (
                    <div key={field.id} className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-[#1A2C50]">
                          {t("insuranceForm.step1.additionalTraveller").replace("{{index}}", String(index))}
                        </h3>
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeTraveller(index)}>
                          {t("insuranceForm.step1.remove")}
                        </Button>
                      </div>
                      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <InputWithLabel
                            label={t("insuranceForm.step1.contactFirstName")}
                            name={firstNamePath}
                            register={register}
                            error={getError(firstNamePath)}
                          />
                          <div className="mt-2">
                            <InputWithLabel
                              label={t("insuranceForm.step1.contactLastName")}
                              name={lastNamePath}
                              register={register}
                              error={getError(lastNamePath)}
                            />
                          </div>
                        </div>
                        <div className="w-full mt-1.5">
                          <BirthDateField
                            label={t('insuranceForm.step1.dob')}
                            name={birthdatePath}
                            control={control}
                            getError={getError}
                            watch={watch}
                          />
                        </div>
                      </div> */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-start gap-2">
                            <div className="flex-grow">
                              <InputWithLabel
                                label={t("insuranceForm.step1.contactFirstName")}
                                name={firstNamePath}
                                register={register}
                                placeholder={t("insuranceForm.step1.contactFirstName")}
                                error={getError(firstNamePath)}
                              />
                            </div>
                            <div className="flex-grow">
                              <InputWithLabel
                                label={t("insuranceForm.step1.contactLastName")}
                                name={lastNamePath}
                                register={register}
                                placeholder={t("insuranceForm.step1.contactLastName")}
                                error={getError(lastNamePath)}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Birthdate field remains as is */}
                        <div className="w-full mt-1.5">
                          <BirthDateField
                            label={t('insuranceForm.step1.dob')}
                            name={birthdatePath}
                            control={control}
                            getError={getError}
                            watch={watch}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Button type="button" variant="outline" onClick={() => appendTraveller({ first_name: "", last_name: "", birthdate: "" })} className="mt-6">
                  {t("insuranceForm.step1.addAdditionalTraveller")}
                </Button>
                {getError("travellers" as Path<InsuranceFormValues>) && typeof getError("travellers" as Path<InsuranceFormValues>)?.message === 'string' &&
                  <p className="text-sm text-red-500 mt-1">{getError("travellers" as Path<InsuranceFormValues>)?.message}</p>}
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step2.title")}</h2>
                <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.primaryCities")} name="primary_cities_regions_ukraine" register={register} error={getError("primary_cities_regions_ukraine")} /></div>
                <div className="mt-6"><SelectWithLabel label={t("insuranceForm.step2.tripPurpose")} name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder={t("insuranceForm.step2.selectTripPurpose")} error={getError("trip_purpose")} /></div>
                <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.stayName")} name="stay_name" register={register} error={getError("stay_name")} /></div>
                <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.companyName")} name="company_name" register={register} error={getError("company_name")} /></div>

                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-3 text-[#1A2C50]">{t("insuranceForm.step2.citiesVisitingTitle")}</h3>
                  {cityFields.map((field, index) => {
                    const cityNamePath = `trip_cities.${index}.name` as Path<InsuranceFormValues>;
                    const cityZoneTypePath = `trip_cities.${index}.zoneType` as Path<InsuranceFormValues>;
                    return (
                      <div key={field.id} className="flex items-end gap-2 mb-3">
                        <div className="flex-grow">
                          <InputWithLabel
                            label={t("insuranceForm.step2.cityName").replace("{{index}}", (index + 1).toString())}
                            name={cityNamePath}
                            register={register}
                            error={getError(cityNamePath)}
                            placeholder={t("insuranceForm.step2.enterCityName")}
                          />
                          <input type="hidden" {...register(cityZoneTypePath)} value="GREEN" />
                        </div>
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeCity(index)}>
                          {t("insuranceForm.step2.remove")}
                        </Button>
                      </div>
                    );
                  })}
                  <Button type="button" variant="outline" onClick={() => appendCity({ name: "", zoneType: "GREEN" })}>
                    {t("insuranceForm.step2.addCity")}
                  </Button>
                  {getError("trip_cities" as Path<InsuranceFormValues>) && typeof getError("trip_cities" as Path<InsuranceFormValues>)?.message === 'string' && <p className="text-sm text-red-500 mt-1">{getError("trip_cities" as Path<InsuranceFormValues>)?.message}</p>}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step3.title")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* <div>
                    <InputWithLabel
                      label={t("insuranceForm.step1.contactFirstName")}
                      name="emergency_contact_first_name"
                      register={register}
                      error={getError("emergency_contact_first_name")}
                    />
                    <div className="mt-2">
                      <InputWithLabel
                        label={t("insuranceForm.step1.contactLastName")}
                        name="emergency_contact_last_name"
                        register={register}
                        error={getError("emergency_contact_last_name")}
                      />
                    </div>
                  </div> */}
                  <div>
                    <div className="flex items-start gap-2">
                      <div className="flex-grow">
                        <InputWithLabel
                          label={t("insuranceForm.step1.contactFirstName")}
                          name="emergency_contact_first_name"
                          register={register}
                          placeholder={t("insuranceForm.step1.contactFirstName")}
                          error={getError("emergency_contact_first_name")}
                        />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel
                          label={t("insuranceForm.step1.contactLastName")}
                          name="emergency_contact_last_name"
                          register={register}
                          placeholder={t("insuranceForm.step1.contactLastName")}
                          error={getError("emergency_contact_last_name")}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1 mt-1">{t("insuranceForm.step3.contactNumber")}</p>
                    <div className="flex items-start gap-2">
                      <div className="w-1/3 shrink-0">
                        <SelectWithLabel control={control} name="emergency_contact_phone_code" label="" options={countryCodeOptions} placeholder="Code" />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel label="" name="emergency_contact_phone_number" type="tel" register={register} placeholder={t("insuranceForm.step3.numberPlaceholder")} />
                      </div>
                    </div>
                    {getError("emergency_contact_phone") && <p className="text-sm text-red-500 mt-1">{getError("emergency_contact_phone")?.message}</p>}
                  </div>
                  <InputWithLabel label={t("insuranceForm.step3.relationship")} name="emergency_contact_relation" register={register} error={getError("emergency_contact_relation")} />
                </div>
                <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1A2C50]">{t("insuranceForm.step3.optionalMedicalTitle")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2"><Controller name="has_medical_conditions" control={control} render={({ field }) => <Checkbox id="has_medical_conditions" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_medical_conditions">{t("insuranceForm.step3.preExistingConditions")}</Label></div>
                  {watch("has_medical_conditions") && (<ControlledTextareaArray name="medical_conditions" control={control} label={t("insuranceForm.step3.listConditions")} error={getError("medical_conditions" as Path<InsuranceFormValues>)} />)}
                  <div className="flex items-center space-x-2"><Controller name="has_allergies" control={control} render={({ field }) => <Checkbox id="has_allergies" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_allergies">{t("insuranceForm.step3.allergies")}</Label></div>
                  {watch("has_allergies") && (<ControlledTextareaArray name="allergies" control={control} label={t("insuranceForm.step3.listAllergies")} error={getError("allergies" as Path<InsuranceFormValues>)} />)}
                  <div className="flex items-center space-x-2"><Controller name="has_current_medications" control={control} render={({ field }) => <Checkbox id="has_current_medications" checked={!!field.value} onCheckedChange={field.onChange} />} /><Label htmlFor="has_current_medications">{t("insuranceForm.step3.currentMedications")}</Label></div>
                  {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label="List Medications" error={getError("current_medications" as Path<InsuranceFormValues>)} />)}
                  <InputWithLabel label={t("insuranceForm.step3.bloodType")} name="blood_type" register={register} error={getError("blood_type")} />
                  <TextareaWithLabel label={t("insuranceForm.step3.specialAssistance")} name="special_assistance" register={register} error={getError("special_assistance")} />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step4.summaryOfCoverage.title")}</h2>
                <div className="space-y-3 p-6 bg-gray-50 rounded-md border mb-6">
                  <div><strong>{t("insuranceForm.step4.summaryOfCoverage.travelDates")}</strong> {formatDateForDisplay(watchedValuesForSummary[0])} to {formatDateForDisplay(watchedValuesForSummary[1])}</div>
                  <div><strong>{t("insuranceForm.step4.summaryOfCoverage.totalRiskZoneDays")}</strong> {calculatedTotalRiskZoneDays ?? "N/A"}</div>
                  <div><strong>{t("insuranceForm.step4.summaryOfCoverage.riskZoneBreakdown")}</strong></div>
                  <ul className="list-disc list-inside pl-4">
                    <li>{t("insuranceForm.step4.summaryOfCoverage.zone.green")}: {watch("green_zone_days") || 0} days</li>
                    <li>{t("insuranceForm.step4.summaryOfCoverage.zone.amber")}: {watchedAmberZoneDaysForDisplay || 0} days</li>
                    <li>{t("insuranceForm.step4.summaryOfCoverage.zone.red")}: {watchedRedZoneDaysForDisplay || 0} days</li>
                  </ul>
                  <div><strong>{t("insuranceForm.step4.summaryOfCoverage.coverageSelected")}</strong></div>
                  <ul className="list-disc list-inside pl-4">
                    <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.medical")}: {getEmergencyMedicalLabel(watchedValuesForSummary[2]) || "N/A"}</li>
                    <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.pa")}: {getPALabel(watchedValuesForSummary[3]) || "N/A"}</li>
                    <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.transit")}: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
                  </ul>
                  <div className="mt-4 pt-3 border-t">
                    <strong className="text-xl">{t("insuranceForm.step4.summaryOfCoverage.totalQuote")}:</strong>
                    <span className="text-xl font-bold text-[#00BBD3] ml-2">$[Calculated Price Placeholder]</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.insuredDetails.title")}</h3>
                {watchedTravellersForSummary && watchedTravellersForSummary.map((traveller, index) => (
                  <div key={`summary-traveller-${index}`} className="space-y-1 p-4 bg-gray-50 rounded-md border mb-3">
                    <p className="font-semibold">
                      {index === 0
                        ? t("insuranceForm.step4.insuredDetails.primaryTraveller")
                        : t("insuranceForm.step4.insuredDetails.additionalTraveller").replace("{{index}}", `${index + 1}`)}
                    </p>
                    <div><strong>{t("insuranceForm.step4.insuredDetails.name")}:</strong> {formatFullName(traveller.first_name, traveller.last_name)}</div>
                    <div><strong>{t("insuranceForm.step4.insuredDetails.age")}:</strong> {calculateAge(traveller.birthdate) || "N/A"}</div>
                    {index === 0 && <div><strong>{t("insuranceForm.step4.insuredDetails.nationality")}:</strong> {getNationalityLabel(watchedValuesForSummary[8]) || "N/A"}</div>}
                  </div>
                ))}

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.tripInformation.title")}:</h3>
                <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                  <div><strong>{t("insuranceForm.step4.tripInformation.purpose")}:</strong> {getTripPurposeLabel(watchedValuesForSummary[9]) || "N/A"}</div>
                  <div><strong>{t("insuranceForm.step4.tripInformation.primaryRegions")}:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
                  {watchedTripCitiesForSummary && watchedTripCitiesForSummary.length > 0 && (
                    <div>
                      <strong>{t("insuranceForm.step4.tripInformation.citiesVisiting")}:</strong>
                      <ul className="list-disc list-inside pl-4">
                        {watchedTripCitiesForSummary.filter(city => city.name && city.name.trim() !== "").map((city, idx) => <li key={`summary-city-${idx}`}>{city.name}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.emergencyContact.title")}:</h3>
                <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                  <div><strong>{t("insuranceForm.step4.emergencyContact.name")}:</strong> {formatFullName(watchedValuesForSummary[11], watchedValuesForSummary[12])}</div>
                  <div><strong>{t("insuranceForm.step4.emergencyContact.number")}:</strong> {watchedValuesForSummary[13] || "N/A"}</div>
                </div>

                <div className="mb-6"><InputWithLabel label={t("insuranceForm.step4.affiliateCode.label")} name="affiliate_code" register={register} error={getError("affiliate_code")} /></div>

                <div className="flex items-start space-x-3">
                  <Controller name="consent" control={control} render={({ field }) => (<Checkbox id="consent" checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked === true ? true : undefined)} onBlur={field.onBlur} />)} />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="consent" className="font-medium leading-snug">{t("insuranceForm.step4.consent.label")}</Label>
                    {getError("consent") && <p className="text-sm text-red-500">{getError("consent")?.message}</p>}
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col sm:flex-row justify-between pt-8 mt-8 border-t gap-4">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-3 text-base">
                  {t("insuranceForm.actions.back")}
                </Button>
              )}
              {step === 0 && (
                <Button type="button" variant="outline" onClick={() => alert("Modify Choices: Implement logic if different from back.")} className="w-full sm:w-auto px-8 py-3 text-base">
                  {t("insuranceForm.actions.modifyChoices")}
                </Button>
              )}
              {(step > 0 && step < steps.length - 1) && <div className="sm:flex-grow hidden sm:block"></div>}
              {step < steps.length - 1 && (
                <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
                  {t("insuranceForm.actions.continue")}
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