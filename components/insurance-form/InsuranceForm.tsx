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
//       c_first_name: "",
//       c_last_name: "",
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
//       travellers: [{ first_name: "", last_name: "", birthdate: "" }],
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_cities: [],
//       trip_purpose: "",
//       stay_name: "",
//       company_name: "",
//       emergency_contact_first_name: "",
//       emergency_contact_last_name: "",
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

//   const cFirstNameValue = watch("c_first_name");
//   const cLastNameValue = watch("c_last_name");
//   const cBirthdateValue = watch("c_birthdate");

//   useEffect(() => {
//     const currentTravellers = getValues("travellers");
//     if (!currentTravellers || currentTravellers.length === 0) {
//       setValue("travellers", [{
//         first_name: cFirstNameValue || "",
//         last_name: cLastNameValue || "",
//         birthdate: cBirthdateValue || ""
//       }], {
//         shouldValidate: false,
//         shouldDirty: false
//       });
//     } else {
//       let changed = false;
//       const newTraveller0 = { ...currentTravellers[0] };

//       if (newTraveller0.first_name !== cFirstNameValue) {
//         newTraveller0.first_name = cFirstNameValue || "";
//         changed = true;
//       }
//       if (newTraveller0.last_name !== cLastNameValue) {
//         newTraveller0.last_name = cLastNameValue || "";
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
//           shouldValidate: step === 1 && (!!formState.dirtyFields.c_first_name || !!formState.dirtyFields.c_last_name || !!formState.dirtyFields.c_birthdate),
//           shouldDirty: true
//         });
//       }
//     }
//   }, [cFirstNameValue, cLastNameValue, cBirthdateValue, setValue, getValues, step, formState.dirtyFields]);


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
//         first_name: getValues("c_first_name") || "",
//         last_name: getValues("c_last_name") || "",
//         birthdate: getValues("c_birthdate") || ""
//       };
//     } else {
//       finalTravellers.push({
//         first_name: getValues("c_first_name") || "",
//         last_name: getValues("c_last_name") || "",
//         birthdate: getValues("c_birthdate") || ""
//       });
//     }

//     const finalData = {
//       ...data,
//       travellers: finalTravellers.map(t => ({
//         first_name: t.first_name,
//         last_name: t.last_name,
//         birthdate: t.birthdate
//       })),
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
//               if (specificTravellerErrors.first_name) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.first_name` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.last_name) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.last_name` as Path<InsuranceFormValues>;
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
//     "c_first_name", "c_last_name",
//     "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_first_name", "emergency_contact_last_name",
//     "emergency_contact_phone",
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

//   const formatFullName = (firstName?: string, lastName?: string): string => {
//     const first = firstName || "";
//     const last = lastName || "";
//     if (first && last) return `${first} ${last}`;
//     return first || last || "N/A";
//   };

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
//                   label={t('insuranceForm.step1.countryTravellingTo')}
//                   name="trip_countries.0"
//                   control={control}
//                   options={countryOptions}
//                   placeholder={t('insuranceForm.step1.selectCountry')}
//                   error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
//                 />

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
//                 {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div> 
//                     <InputWithLabel
//                       label={t("insuranceForm.step1.contactFirstName")}
//                       name="c_first_name"
//                       register={register}
//                       error={getError("c_first_name") || getError("travellers.0.first_name" as Path<InsuranceFormValues>)}
//                     />
//                     <div className="mt-2"> 
//                       <InputWithLabel
//                         label={t("insuranceForm.step1.contactLastName")}
//                         name="c_last_name"
//                         register={register}
//                         error={getError("c_last_name") || getError("travellers.0.last_name" as Path<InsuranceFormValues>)}
//                       />
//                     </div>
//                   </div>
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
//                 </div> */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <div className="flex items-start gap-2">
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactFirstName")}
//                           name="c_first_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactFirstName")}
//                           error={getError("c_first_name") || getError("travellers.0.first_name" as Path<InsuranceFormValues>)}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactLastName")}
//                           name="c_last_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactLastName")}
//                           error={getError("c_last_name") || getError("travellers.0.last_name" as Path<InsuranceFormValues>)}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Birthdate field remains as is */}
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

//                   const firstNamePath = `travellers.${index}.first_name` as Path<InsuranceFormValues>;
//                   const lastNamePath = `travellers.${index}.last_name` as Path<InsuranceFormValues>;
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
//                       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <InputWithLabel
//                             label={t("insuranceForm.step1.contactFirstName")}
//                             name={firstNamePath}
//                             register={register}
//                             error={getError(firstNamePath)}
//                           />
//                           <div className="mt-2">
//                             <InputWithLabel
//                               label={t("insuranceForm.step1.contactLastName")}
//                               name={lastNamePath}
//                               register={register}
//                               error={getError(lastNamePath)}
//                             />
//                           </div>
//                         </div>
//                         <div className="w-full mt-1.5">
//                           <BirthDateField
//                             label={t('insuranceForm.step1.dob')}
//                             name={birthdatePath}
//                             control={control}
//                             getError={getError}
//                             watch={watch}
//                           />
//                         </div>
//                       </div> */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <div className="flex items-start gap-2">
//                             <div className="flex-grow">
//                               <InputWithLabel
//                                 label={t("insuranceForm.step1.contactFirstName")}
//                                 name={firstNamePath}
//                                 register={register}
//                                 placeholder={t("insuranceForm.step1.contactFirstName")}
//                                 error={getError(firstNamePath)}
//                               />
//                             </div>
//                             <div className="flex-grow">
//                               <InputWithLabel
//                                 label={t("insuranceForm.step1.contactLastName")}
//                                 name={lastNamePath}
//                                 register={register}
//                                 placeholder={t("insuranceForm.step1.contactLastName")}
//                                 error={getError(lastNamePath)}
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         {/* Birthdate field remains as is */}
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
//                 <Button type="button" variant="outline" onClick={() => appendTraveller({ first_name: "", last_name: "", birthdate: "" })} className="mt-6">
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
//                   {/* <div>
//                     <InputWithLabel
//                       label={t("insuranceForm.step1.contactFirstName")}
//                       name="emergency_contact_first_name"
//                       register={register}
//                       error={getError("emergency_contact_first_name")}
//                     />
//                     <div className="mt-2">
//                       <InputWithLabel
//                         label={t("insuranceForm.step1.contactLastName")}
//                         name="emergency_contact_last_name"
//                         register={register}
//                         error={getError("emergency_contact_last_name")}
//                       />
//                     </div>
//                   </div> */}
//                   <div>
//                     <div className="flex items-start gap-2">
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactFirstName")}
//                           name="emergency_contact_first_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactFirstName")}
//                           error={getError("emergency_contact_first_name")}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactLastName")}
//                           name="emergency_contact_last_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactLastName")}
//                           error={getError("emergency_contact_last_name")}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1 mt-1">{t("insuranceForm.step3.contactNumber")}</p>
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
//                     <div><strong>{t("insuranceForm.step4.insuredDetails.name")}:</strong> {formatFullName(traveller.first_name, traveller.last_name)}</div>
//                     <div><strong>{t("insuranceForm.step4.insuredDetails.age")}:</strong> {calculateAge(traveller.birthdate) || "N/A"}</div>
//                     {index === 0 && <div><strong>{t("insuranceForm.step4.insuredDetails.nationality")}:</strong> {getNationalityLabel(watchedValuesForSummary[8]) || "N/A"}</div>}
//                   </div>
//                 ))}

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.tripInformation.title")}:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>{t("insuranceForm.step4.tripInformation.purpose")}:</strong> {getTripPurposeLabel(watchedValuesForSummary[9]) || "N/A"}</div>
//                   <div><strong>{t("insuranceForm.step4.tripInformation.primaryRegions")}:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
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
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.name")}:</strong> {formatFullName(watchedValuesForSummary[11], watchedValuesForSummary[12])}</div>
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.number")}:</strong> {watchedValuesForSummary[13] || "N/A"}</div>
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
//               {(step > 0 && step < steps.length - 1) && <div className="sm:flex-grow hidden sm:block"></div>}
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
//   fieldsByStep,
//   tripPurposes,
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
// import PassportExpiryDateField from "../form/PassportExpiryDateField";


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
//       c_first_name: "",
//       c_last_name: "",
//       c_birthdate: "",
//       c_passport_number: "",
//       c_passport_expiry_date: "",
//       c_is_whatsapp_same_as_phone: false,
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
//       travellers: [{
//         first_name: "",
//         last_name: "",
//         birthdate: "",
//         passport_number: "",
//         passport_expiry_date: ""
//       }],
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_cities: [],
//       trip_purpose: "",
//       stay_name: "",
//       company_name: "",
//       emergency_contact_first_name: "",
//       emergency_contact_last_name: "",
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

//   const cFirstNameValue = watch("c_first_name");
//   const cLastNameValue = watch("c_last_name");
//   const cBirthdateValue = watch("c_birthdate");
//   const cPassportNumberValue = watch("c_passport_number");
//   const cPassportExpiryDateValue = watch("c_passport_expiry_date");


//   useEffect(() => {
//     const currentTravellers = getValues("travellers");
//     if (!currentTravellers || currentTravellers.length === 0) {
//       setValue("travellers", [{
//         first_name: cFirstNameValue || "",
//         last_name: cLastNameValue || "",
//         birthdate: cBirthdateValue || "",
//         passport_number: cPassportNumberValue || "",
//         passport_expiry_date: cPassportExpiryDateValue || "",
//       }], {
//         shouldValidate: false,
//         shouldDirty: false
//       });
//     } else {
//       let changed = false;
//       const newTraveller0 = { ...currentTravellers[0] };

//       if (newTraveller0.first_name !== cFirstNameValue) {
//         newTraveller0.first_name = cFirstNameValue || "";
//         changed = true;
//       }
//       if (newTraveller0.last_name !== cLastNameValue) {
//         newTraveller0.last_name = cLastNameValue || "";
//         changed = true;
//       }
//       if (newTraveller0.birthdate !== cBirthdateValue) {
//         newTraveller0.birthdate = cBirthdateValue || "";
//         changed = true;
//       }
//       if (newTraveller0.passport_number !== cPassportNumberValue) {
//         newTraveller0.passport_number = cPassportNumberValue || "";
//         changed = true;
//       }
//       if (newTraveller0.passport_expiry_date !== cPassportExpiryDateValue) {
//         newTraveller0.passport_expiry_date = cPassportExpiryDateValue || "";
//         changed = true;
//       }

//       if (changed) {
//         const updatedTravellers = [...currentTravellers];
//         updatedTravellers[0] = newTraveller0;
//         setValue("travellers", updatedTravellers, {
//           shouldValidate: step === 1 && (
//             !!formState.dirtyFields.c_first_name ||
//             !!formState.dirtyFields.c_last_name ||
//             !!formState.dirtyFields.c_birthdate ||
//             !!formState.dirtyFields.c_passport_number ||
//             !!formState.dirtyFields.c_passport_expiry_date
//           ),
//           shouldDirty: true
//         });
//       }
//     }
//   }, [
//     cFirstNameValue, cLastNameValue, cBirthdateValue,
//     cPassportNumberValue, cPassportExpiryDateValue,
//     setValue, getValues, step, formState.dirtyFields
//   ]);


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
//   const cIsWhatsAppSameAsPhone = watch("c_is_whatsapp_same_as_phone");

//   useEffect(() => {
//     const fullNumber = `${cPhoneCode || ''}${cPhoneNumber || ''}`;
//     if (getValues("c_phone") !== fullNumber) {
//       setValue("c_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cPhoneCode, cPhoneNumber, setValue, getValues]);

//   useEffect(() => {
//     if (cIsWhatsAppSameAsPhone) {
//       setValue("c_whats_app_code", cPhoneCode || "", { shouldValidate: true, shouldDirty: true });
//       setValue("c_whats_app_number", cPhoneNumber || "", { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cIsWhatsAppSameAsPhone, cPhoneCode, cPhoneNumber, setValue, getValues]);


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
//         first_name: getValues("c_first_name") || "",
//         last_name: getValues("c_last_name") || "",
//         birthdate: getValues("c_birthdate") || "",
//         passport_number: getValues("c_passport_number") || "",
//         passport_expiry_date: getValues("c_passport_expiry_date") || "",
//       };
//     } else {
//       finalTravellers.push({
//         first_name: getValues("c_first_name") || "",
//         last_name: getValues("c_last_name") || "",
//         birthdate: getValues("c_birthdate") || "",
//         passport_number: getValues("c_passport_number") || "",
//         passport_expiry_date: getValues("c_passport_expiry_date") || "",
//       });
//     }

//     const finalData = {
//       ...data,
//       travellers: finalTravellers.map(t => ({
//         first_name: t.first_name,
//         last_name: t.last_name,
//         birthdate: t.birthdate,
//         passport_number: t.passport_number,
//         passport_expiry_date: t.passport_expiry_date,
//       })),
//       c_phone: `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`,
//       c_whats_app: getValues("c_is_whatsapp_same_as_phone")
//         ? `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`
//         : `${getValues("c_whats_app_code") || ''}${getValues("c_whats_app_number") || ''}`,
//       emergency_contact_phone: `${getValues("emergency_contact_phone_code") || ''}${getValues("emergency_contact_phone_number") || ''}`,
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//       trip_cities: data.trip_cities ? data.trip_cities.filter(city => city.name && city.name.trim() !== "") : [],
//       c_passport_number: getValues("c_passport_number"),
//       c_passport_expiry_date: getValues("c_passport_expiry_date"),
//       c_is_whatsapp_same_as_phone: getValues("c_is_whatsapp_same_as_phone"),
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     alert("Confirm & Purchase clicked! Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const partFieldsToValidate: Path<InsuranceFormValues>[] = [];
//     if (step === 1) {
//       partFieldsToValidate.push(
//         "c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number",
//         "c_passport_number", "c_passport_expiry_date"
//       );
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
//             const specificTravellerErrors = travellerErrors[i] as undefined | Record<string, FieldError | undefined>;
//             if (specificTravellerErrors) {
//               if (specificTravellerErrors.first_name) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.first_name` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.last_name) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.last_name` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.birthdate) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.birthdate` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.passport_number) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.passport_number` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.passport_expiry_date) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.passport_expiry_date` as Path<InsuranceFormValues>;
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
//     "c_first_name", "c_last_name",
//     "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_first_name", "emergency_contact_last_name",
//     "emergency_contact_phone",
//     "c_passport_number", "c_passport_expiry_date",
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

//   const formatFullName = (firstName?: string, lastName?: string): string => {
//     const first = firstName || "";
//     const last = lastName || "";
//     if (first && last) return `${first} ${last}`;
//     return first || last || "N/A";
//   };

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
//                   label={t('insuranceForm.step1.countryTravellingTo')}
//                   name="trip_countries.0"
//                   control={control}
//                   options={countryOptions}
//                   placeholder={t('insuranceForm.step1.selectCountry')}
//                   error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
//                 />

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
//                   <div>
//                     <div className="flex items-start gap-2">
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactFirstName")}
//                           name="c_first_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactFirstName")}
//                           error={getError("c_first_name") || getError("travellers.0.first_name" as Path<InsuranceFormValues>)}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactLastName")}
//                           name="c_last_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactLastName")}
//                           error={getError("c_last_name") || getError("travellers.0.last_name" as Path<InsuranceFormValues>)}
//                         />
//                       </div>
//                     </div>
//                   </div>

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
//                         <SelectWithLabel
//                           control={control}
//                           name="c_whats_app_code"
//                           label=""
//                           options={countryCodeOptions}
//                           placeholder="Code"
//                           readOnly={cIsWhatsAppSameAsPhone}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label=""
//                           name="c_whats_app_number"
//                           type="tel"
//                           register={register}
//                           placeholder={t('insuranceForm.step1.enterNumber')}
//                           readOnly={cIsWhatsAppSameAsPhone}
//                         />
//                       </div>
//                     </div>
//                     {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
//                   </div>

//                   <div className="md:col-span-2 mt-2">
//                     <div className="flex items-center space-x-2">
//                       <Controller
//                         name="c_is_whatsapp_same_as_phone"
//                         control={control}
//                         render={({ field }) => (
//                           <Checkbox
//                             id="c_is_whatsapp_same_as_phone"
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                           />
//                         )}
//                       />
//                       <Label htmlFor="c_is_whatsapp_same_as_phone">
//                         {t("insuranceForm.step1.whatsappSameAsPhone")}
//                       </Label>
//                     </div>
//                   </div>
//                   <InputWithLabel label={t('insuranceForm.step1.email')} name="c_email" type="email" register={register} error={getError("c_email")} />
//                   <SelectWithLabel label={t('insuranceForm.step1.nationality')} name="c_nationality" control={control} options={nationalityOptions} placeholder={t('insuranceForm.step1.selectNationality')} error={getError("c_nationality")} />
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

//                   const firstNamePath = `travellers.${index}.first_name` as Path<InsuranceFormValues>;
//                   const lastNamePath = `travellers.${index}.last_name` as Path<InsuranceFormValues>;
//                   const birthdatePath = `travellers.${index}.birthdate` as Path<InsuranceFormValues>;
//                   const passportNumberPath = `travellers.${index}.passport_number` as Path<InsuranceFormValues>;
//                   const passportExpiryDatePath = `travellers.${index}.passport_expiry_date` as Path<InsuranceFormValues>;

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
//                         <div>
//                           <div className="flex items-start gap-2">
//                             <div className="flex-grow">
//                               <InputWithLabel
//                                 label={t("insuranceForm.step1.contactFirstName")}
//                                 name={firstNamePath}
//                                 register={register}
//                                 placeholder={t("insuranceForm.step1.contactFirstName")}
//                                 error={getError(firstNamePath)}
//                               />
//                             </div>
//                             <div className="flex-grow">
//                               <InputWithLabel
//                                 label={t("insuranceForm.step1.contactLastName")}
//                                 name={lastNamePath}
//                                 register={register}
//                                 placeholder={t("insuranceForm.step1.contactLastName")}
//                                 error={getError(lastNamePath)}
//                               />
//                             </div>
//                           </div>
//                         </div>

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
//                 <Button type="button" variant="outline" onClick={() => appendTraveller({
//                   first_name: "",
//                   last_name: "",
//                   birthdate: "",
//                   passport_number: "",
//                   passport_expiry_date: ""
//                 })} className="mt-6">
//                   {t("insuranceForm.step1.addAdditionalTraveller")}
//                 </Button>
//                 {getError("travellers" as Path<InsuranceFormValues>) && typeof getError("travellers" as Path<InsuranceFormValues>)?.message === 'string' &&
//                   <p className="text-sm text-red-500 mt-1">{getError("travellers" as Path<InsuranceFormValues>)?.message}</p>}
//               </>
//             )}
//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step2.title")}</h2>
//                 <div className="mt-6"><SelectWithLabel label={t("insuranceForm.step2.tripPurpose")} name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder={t("insuranceForm.step2.selectTripPurpose")} error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.primaryCities")} name="primary_cities_regions_ukraine" register={register} error={getError("primary_cities_regions_ukraine")} /></div>
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
//                   <div>
//                     <div className="flex items-start gap-2">
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactFirstName")}
//                           name="emergency_contact_first_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactFirstName")}
//                           error={getError("emergency_contact_first_name")}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactLastName")}
//                           name="emergency_contact_last_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactLastName")}
//                           error={getError("emergency_contact_last_name")}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1 mt-1">{t("insuranceForm.step3.contactNumber")}</p>
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
//                     <div><strong>{t("insuranceForm.step4.insuredDetails.name")}:</strong> {formatFullName(traveller.first_name, traveller.last_name)}</div>
//                     <div><strong>{t("insuranceForm.step4.insuredDetails.age")}:</strong> {calculateAge(traveller.birthdate) || "N/A"}</div>
//                     {index === 0 && <div><strong>{t("insuranceForm.step4.insuredDetails.nationality")}:</strong> {getNationalityLabel(watchedValuesForSummary[8]) || "N/A"}</div>}
//                   </div>
//                 ))}

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.tripInformation.title")}:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>{t("insuranceForm.step4.tripInformation.purpose")}:</strong> {getTripPurposeLabel(watchedValuesForSummary[9]) || "N/A"}</div>
//                   <div><strong>{t("insuranceForm.step4.tripInformation.primaryRegions")}:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
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
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.name")}:</strong> {formatFullName(watchedValuesForSummary[11], watchedValuesForSummary[12])}</div>
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.number")}:</strong> {watchedValuesForSummary[13] || "N/A"}</div>
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
//               {(step > 0 && step < steps.length - 1) && <div className="sm:flex-grow hidden sm:block"></div>}
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
//   fieldsByStep,
//   tripPurposes,
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
// import dayjs from 'dayjs'; 

// type Integer = number & { __brand: 'integer' };

// interface GenerateQuotePayload {
//     trip_start_date: Date;
//     trip_end_date: Date;
//     trip_country: String; 
//     travellers_count: Integer;
//     medical_coverage: "0" | "25000" | "50000" | "100000" | "150000" | "250000";
//     pa_coverage: "0" | "25000" | "50000" | "100000" | "150000" | "250000";
//     transit_coverage: Boolean;
//     green_zone_days: Integer;
//     amber_zone_days: Integer;
//     red_zone_days: Integer;
//     black_zone_days: Integer;
// }

// const pricing = {
//     matrix: {
//         "25000": {
//             "greenME": 19.00,
//             "amberME": 23.75,
//             "redME": 0.0,
//             "blackME": 0.0,
//             "greenPA": 12.38,
//             "amberPA": 13.61,
//             "redPA": 0.0,
//             "blackPA": 0.0
//         },
//         "50000": {
//             "greenME": 22.00,
//             "amberME": 27.50,
//             "redME": 30.25,
//             "blackME": 0.0,
//             "greenPA": 24.75,
//             "amberPA": 29.25,
//             "redPA": 31.73,
//             "blackPA": 0.0
//         },
//         "100000": {
//             "greenME": 26.00,
//             "amberME": 32.50,
//             "redME": 35.75,
//             "blackME": 0.0,
//             "greenPA": 49.50,
//             "amberPA": 54.00,
//             "redPA": 58.95,
//             "blackPA": 0.0
//         },
//         "150000": {
//             "greenME": 30.00,
//             "amberME": 37.50,
//             "redME": 40.25,
//             "blackME": 0.0,
//             "greenPA": 74.25,
//             "amberPA": 81.68,
//             "redPA": 89.84,
//             "blackPA": 0.0
//         },
//         "250000": {
//             "greenME": 36.00,
//             "amberME": 45.00,
//             "redME": 49.50,
//             "blackME": 0.0,
//             "greenPA": 123.75,
//             "amberPA": 136.13,
//             "redPA": 149.74,
//             "blackPA": 0.0
//         }
//     },
//     transitCost: 25.00
// };

// // Return type for generateQuote
// interface QuoteResult {
//     ok: boolean;
//     message: string;
//     warnings: string[];
//     data?: {
//         totalAmount: number;
//         medicalCoverAmount: number;
//         paCoverAmount: number;
//         travellersCount: Integer;
//         totalDays: number;
//     };
// }


// function generateQuote(data: GenerateQuotePayload): QuoteResult {
//     const startDate = dayjs(data.trip_start_date).startOf('day');
//     const endDate = dayjs(data.trip_end_date).endOf('day');
//     const totalDays = endDate.diff(startDate, 'day') + 1;
//     // const tripCountry = data.trip_country; // Not used in calculation logic below

//     if (totalDays <= 0) {
//         return {
//             ok: false,
//             message: "Trip end date should be after trip start date.",
//             warnings: []
//         };
//     }

//     if (totalDays !== (data.green_zone_days + data.amber_zone_days + data.red_zone_days + data.black_zone_days)) {
//         return {
//             ok: false,
//             message: "Total trip days should be equal to the sum of green, amber, red and black zone days.",
//             warnings: []
//         };
//     }

//     const medicalCoverage = data.medical_coverage;
//     const paCoverage = data.pa_coverage;

//     if (
//         (medicalCoverage !== "0" && !pricing.matrix[medicalCoverage]) ||
//         (paCoverage !== "0" && !pricing.matrix[paCoverage])
//     ) {
//         return {
//             ok: false,
//             message: "No pricing found for a selected non-zero coverage.",
//             warnings: []
//         };
//     }

//     const medicalPricing = medicalCoverage === "0" ? undefined : pricing.matrix[medicalCoverage];
//     const paPricing = paCoverage === "0" ? undefined : pricing.matrix[paCoverage];

//     let totalAmount = 0;
//     let medicalCoverAmount = 0;
//     let paCoverAmount = 0;
//     const warnings: string[] = []; // Use const

//     if (medicalPricing && parseInt(data.medical_coverage) > 0) {
//         medicalCoverAmount += medicalPricing["greenME"] * data.green_zone_days;
//         medicalCoverAmount += medicalPricing["amberME"] * data.amber_zone_days;
//         medicalCoverAmount += medicalPricing["redME"] * data.red_zone_days;
//         medicalCoverAmount += medicalPricing["blackME"] * data.black_zone_days;

//         if (data.green_zone_days > 0 && medicalPricing["greenME"] <= 0) {
//             warnings.push("Medical coverage for green zone is not available for this coverage amount.");
//         }
//         if (data.amber_zone_days > 0 && medicalPricing["amberME"] <= 0) {
//             warnings.push("Medical coverage for amber zone is not available for this coverage amount.");
//         }
//         if (data.red_zone_days > 0 && medicalPricing["redME"] <= 0) {
//             warnings.push("Medical coverage for red zone is not available for this coverage amount.");
//         }
//         if (data.black_zone_days > 0 && medicalPricing["blackME"] <= 0) {
//             warnings.push("Medical coverage for black zone is not available for this coverage amount.");
//         }
//     }

//     if (paPricing && parseInt(data.pa_coverage) > 0) {
//         paCoverAmount += paPricing["greenPA"] * data.green_zone_days;
//         paCoverAmount += paPricing["amberPA"] * data.amber_zone_days;
//         paCoverAmount += paPricing["redPA"] * data.red_zone_days;
//         paCoverAmount += paPricing["blackPA"] * data.black_zone_days;

//         if (data.green_zone_days > 0 && paPricing["greenPA"] <= 0) {
//             warnings.push("Personal Accident coverage for green zone is not available for this coverage amount.");
//         }
//         if (data.amber_zone_days > 0 && paPricing["amberPA"] <= 0) {
//             warnings.push("Personal Accident coverage for amber zone is not available for this coverage amount.");
//         }
//         if (data.red_zone_days > 0 && paPricing["redPA"] <= 0) {
//             warnings.push("Personal Accident coverage for red zone is not available for this coverage amount.");
//         }
//         if (data.black_zone_days > 0 && paPricing["blackPA"] <= 0) {
//             warnings.push("Personal Accident coverage for black zone is not available for this coverage amount.");
//         }
//     }

//     totalAmount += medicalCoverAmount + paCoverAmount; // add medical and pa coverage

//     if (data.travellers_count > 0) {
//         totalAmount *= data.travellers_count; // multiply by number of travellers
//     }

//     if (totalDays > 0) {
//         totalAmount *= totalDays; // multiply by total days (as per original logic)
//     }

//     if (data.transit_coverage) {
//         totalAmount += pricing.transitCost;
//     }

//     totalAmount = Math.round(totalAmount * 100) / 100; // round to 2 decimal places

//     return {
//         ok: true,
//         message: "Quote generated successfully",
//         warnings,
//         data: {
//             totalAmount,
//             medicalCoverAmount,
//             paCoverAmount,
//             travellersCount: data.travellers_count,
//             totalDays
//         }
//     };
// }


// export default function InsuranceForm() {
//   const { t } = useTranslation();
//   const steps = t("insuranceForm.steps", { returnObjects: true }) as string[];
//   const [step, setStep] = useState(0);
//   const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);
//   const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null); // State for quote result

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
//       c_first_name: "",
//       c_last_name: "",
//       c_birthdate: "",
//       c_passport_number: "",
//       c_passport_expiry_date: "",
//       c_is_whatsapp_same_as_phone: false,
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
//       travellers: [{
//         first_name: "",
//         last_name: "",
//         birthdate: "",
//         passport_number: "",
//         passport_expiry_date: ""
//       }],
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_cities: [],
//       trip_purpose: "",
//       stay_name: "",
//       company_name: "",
//       emergency_contact_first_name: "",
//       emergency_contact_last_name: "",
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

//   const cFirstNameValue = watch("c_first_name");
//   const cLastNameValue = watch("c_last_name");
//   const cBirthdateValue = watch("c_birthdate");
//   const cPassportNumberValue = watch("c_passport_number");
//   const cPassportExpiryDateValue = watch("c_passport_expiry_date");


//   useEffect(() => {
//     const currentTravellers = getValues("travellers");
//     if (!currentTravellers || currentTravellers.length === 0) {
//       setValue("travellers", [{
//         first_name: cFirstNameValue || "",
//         last_name: cLastNameValue || "",
//         birthdate: cBirthdateValue || "",
//         passport_number: cPassportNumberValue || "",
//         passport_expiry_date: cPassportExpiryDateValue || "",
//       }], {
//         shouldValidate: false,
//         shouldDirty: false
//       });
//     } else {
//       let changed = false;
//       const newTraveller0 = { ...currentTravellers[0] };

//       if (newTraveller0.first_name !== cFirstNameValue) {
//         newTraveller0.first_name = cFirstNameValue || "";
//         changed = true;
//       }
//       if (newTraveller0.last_name !== cLastNameValue) {
//         newTraveller0.last_name = cLastNameValue || "";
//         changed = true;
//       }
//       if (newTraveller0.birthdate !== cBirthdateValue) {
//         newTraveller0.birthdate = cBirthdateValue || "";
//         changed = true;
//       }
//       if (newTraveller0.passport_number !== cPassportNumberValue) {
//         newTraveller0.passport_number = cPassportNumberValue || "";
//         changed = true;
//       }
//       if (newTraveller0.passport_expiry_date !== cPassportExpiryDateValue) {
//         newTraveller0.passport_expiry_date = cPassportExpiryDateValue || "";
//         changed = true;
//       }

//       if (changed) {
//         const updatedTravellers = [...currentTravellers];
//         updatedTravellers[0] = newTraveller0;
//         setValue("travellers", updatedTravellers, {
//           shouldValidate: step === 1 && (
//             !!formState.dirtyFields.c_first_name ||
//             !!formState.dirtyFields.c_last_name ||
//             !!formState.dirtyFields.c_birthdate ||
//             !!formState.dirtyFields.c_passport_number ||
//             !!formState.dirtyFields.c_passport_expiry_date
//           ),
//           shouldDirty: true
//         });
//       }
//     }
//   }, [
//     cFirstNameValue, cLastNameValue, cBirthdateValue,
//     cPassportNumberValue, cPassportExpiryDateValue,
//     setValue, getValues, step, formState.dirtyFields
//   ]);


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
//   const cIsWhatsAppSameAsPhone = watch("c_is_whatsapp_same_as_phone");

//   useEffect(() => {
//     const fullNumber = `${cPhoneCode || ''}${cPhoneNumber || ''}`;
//     if (getValues("c_phone") !== fullNumber) {
//       setValue("c_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cPhoneCode, cPhoneNumber, setValue, getValues]);

//   useEffect(() => {
//     if (cIsWhatsAppSameAsPhone) {
//       setValue("c_whats_app_code", cPhoneCode || "", { shouldValidate: true, shouldDirty: true });
//       setValue("c_whats_app_number", cPhoneNumber || "", { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cIsWhatsAppSameAsPhone, cPhoneCode, cPhoneNumber, setValue, getValues]);


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

//   const watchedTripCountriesForQuote = watch("trip_countries");
//   const watchedTravellersForQuote = watch("travellers");
//   const watchedMedicalCoverageForQuote = watch("emergency_medical_coverage");
//   const watchedPaCoverageForQuote = watch("personal_accident_coverage_level");
//   const watchedTransitCoverageForQuote = watch("add_transit_coverage");
//   const watchedGreenZoneDaysForQuote = watch("green_zone_days");
//   const watchedAmberZoneDaysForQuote = watch("amber_zone_days");
//   const watchedRedZoneDaysForQuote = watch("red_zone_days");
//   const watchedBlackZoneDaysForQuote = watch("black_zone_days");

//     useEffect(() => {
//     const formValues = getValues();

//     const hasRequiredFieldsForQuote =
//       formValues.trip_start_date &&
//       formValues.trip_end_date &&
//       formValues.trip_countries && formValues.trip_countries.length > 0 && formValues.trip_countries[0] &&
//       formValues.emergency_medical_coverage && 
//       formValues.personal_accident_coverage_level !== undefined && 
//       formValues.travellers && formValues.travellers.length > 0;

//     if (!hasRequiredFieldsForQuote) {
//       setQuoteResult(null);
//       return;
//     }

//     const startDate = dayjs(formValues.trip_start_date + "T00:00:00");
//     const endDate = dayjs(formValues.trip_end_date + "T00:00:00");

//     if (!startDate.isValid() || !endDate.isValid() || endDate.isBefore(startDate)) {
//       setQuoteResult({ ok: false, message: "Invalid trip dates for quote calculation.", warnings: [] });
//       return;
//     }
//     const criticalErrorFields: (Path<InsuranceFormValues>)[] = [
//         "trip_start_date", "trip_end_date",
//         "green_zone_days", "amber_zone_days", "red_zone_days",
//         "trip_countries", "emergency_medical_coverage", "personal_accident_coverage_level"
//     ];
//     const hasCriticalErrors = criticalErrorFields.some(field => get(formState.errors, field)) || 
//                               formState.errors.root?.message?.includes("must equal the Total Travel Days") ||
//                               formState.errors.root?.message?.includes("Please select either Emergency Medical Coverage or Personal Accident");


//     if (hasCriticalErrors) {
//         setQuoteResult({ ok: false, message: "Please correct form errors to see a quote.", warnings: [] });
//         return;
//     }

//     const payload: GenerateQuotePayload = {
//       trip_start_date: startDate.toDate(),
//       trip_end_date: endDate.toDate(),
//       trip_country: formValues.trip_countries[0] as String, 
//       travellers_count: formValues.travellers.length as Integer,
//       medical_coverage: formValues.emergency_medical_coverage as GenerateQuotePayload['medical_coverage'],
//       pa_coverage: formValues.personal_accident_coverage_level as GenerateQuotePayload['pa_coverage'],
//       transit_coverage: formValues.add_transit_coverage,
//       green_zone_days: Number(formValues.green_zone_days || 0) as Integer,
//       amber_zone_days: Number(formValues.amber_zone_days || 0) as Integer,
//       red_zone_days: Number(formValues.red_zone_days || 0) as Integer,
//       black_zone_days: Number(formValues.black_zone_days || 0) as Integer,
//     };

//     const result = generateQuote(payload);
//     setQuoteResult(result);

//   }, [
//     watchedStartDate, 
//     watchedEndDate,   
//     watchedTripCountriesForQuote,
//     watchedTravellersForQuote, 
//     watchedMedicalCoverageForQuote,
//     watchedPaCoverageForQuote,
//     watchedTransitCoverageForQuote,
//     watchedGreenZoneDaysForQuote,
//     watchedAmberZoneDaysForQuote,
//     watchedRedZoneDaysForQuote,
//     watchedBlackZoneDaysForQuote,
//     getValues, 
//     formState.errors 
//   ]);


//   const onSubmitForm = (data: InsuranceFormValues) => {
//     const finalTravellers = [...data.travellers];
//     if (finalTravellers.length > 0) {
//       finalTravellers[0] = {
//         ...finalTravellers[0],
//         first_name: getValues("c_first_name") || "",
//         last_name: getValues("c_last_name") || "",
//         birthdate: getValues("c_birthdate") || "",
//         passport_number: getValues("c_passport_number") || "",
//         passport_expiry_date: getValues("c_passport_expiry_date") || "",
//       };
//     } else {
//       finalTravellers.push({
//         first_name: getValues("c_first_name") || "",
//         last_name: getValues("c_last_name") || "",
//         birthdate: getValues("c_birthdate") || "",
//         passport_number: getValues("c_passport_number") || "",
//         passport_expiry_date: getValues("c_passport_expiry_date") || "",
//       });
//     }

//     const finalData = {
//       ...data,
//       travellers: finalTravellers.map(t => ({
//         first_name: t.first_name,
//         last_name: t.last_name,
//         birthdate: t.birthdate,
//         passport_number: t.passport_number,
//         passport_expiry_date: t.passport_expiry_date,
//       })),
//       c_phone: `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`,
//       c_whats_app: getValues("c_is_whatsapp_same_as_phone")
//         ? `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`
//         : `${getValues("c_whats_app_code") || ''}${getValues("c_whats_app_number") || ''}`,
//       emergency_contact_phone: `${getValues("emergency_contact_phone_code") || ''}${getValues("emergency_contact_phone_number") || ''}`,
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//       trip_cities: data.trip_cities ? data.trip_cities.filter(city => city.name && city.name.trim() !== "") : [],
//       c_passport_number: getValues("c_passport_number"),
//       c_passport_expiry_date: getValues("c_passport_expiry_date"),
//       c_is_whatsapp_same_as_phone: getValues("c_is_whatsapp_same_as_phone"),
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     console.log("Calculated Quote at submission:", quoteResult); // Log quote too
//     alert("Confirm & Purchase clicked! Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const partFieldsToValidate: Path<InsuranceFormValues>[] = [];
//     if (step === 1) {
//       partFieldsToValidate.push(
//         "c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number",
//         "c_passport_number", "c_passport_expiry_date"
//       );
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
//             const specificTravellerErrors = travellerErrors[i] as undefined | Record<string, FieldError | undefined>;
//             if (specificTravellerErrors) {
//               if (specificTravellerErrors.first_name) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.first_name` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.last_name) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.last_name` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.birthdate) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.birthdate` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.passport_number) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.passport_number` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.passport_expiry_date) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.passport_expiry_date` as Path<InsuranceFormValues>;
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
//         alert(formState.errors.root.message); // This alert might be redundant if quoteResult shows error
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
//     "c_first_name", "c_last_name",
//     "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_first_name", "emergency_contact_last_name",
//     "emergency_contact_phone",
//     "c_passport_number", "c_passport_expiry_date",
//   ] as const;

//   const watchedValuesForSummary = watch(watchedPathsForSummary);
//   const watchedTravellersForSummary = watch("travellers");
//   const watchedTripCitiesForSummary = watch("trip_cities");

//   // const watchedAmberZoneDaysForDisplay = watch("amber_zone_days"); // Already watched by watchedAmberZoneDaysForQuote
//   // const watchedRedZoneDaysForDisplay = watch("red_zone_days"); // Already watched by watchedRedZoneDaysForQuote

//   const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
//   const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;

//   const formatFullName = (firstName?: string, lastName?: string): string => {
//     const first = firstName || "";
//     const last = lastName || "";
//     if (first && last) return `${first} ${last}`;
//     return first || last || "N/A";
//   };

//   const renderQuoteDisplay = () => {
//     if (!quoteResult) return "$0.00 (Calculating...)";
//     if (!quoteResult.ok) return `$0.00 (${quoteResult.message || "Error"})`;
//     if (quoteResult.data) return `$${quoteResult.data.totalAmount.toFixed(2)}`;
//     return "$0.00 (Unavailable)";
//   };

//   const renderQuoteWarnings = () => {
//     if (quoteResult && quoteResult.ok && quoteResult.warnings && quoteResult.warnings.length > 0) {
//       return (
//         <div className="mt-1 text-xs text-orange-600">
//           <strong>{t("insuranceForm.warnings")}:</strong>
//           <ul className="list-disc list-inside pl-4">
//             {quoteResult.warnings.map((warning, idx) => <li key={idx}>{warning}</li>)}
//           </ul>
//         </div>
//       );
//     }
//     if (quoteResult && !quoteResult.ok && quoteResult.message) {
//          // Only show this if it's a quote-specific error not already handled by main form validation display
//         if (quoteResult.message !== "Please correct form errors to see a quote.") {
//             return (
//                  <div className="mt-1 text-xs text-red-600">
//                     <strong>{t("insuranceForm.quoteError")}:</strong> {quoteResult.message}
//                 </div>
//             );
//         }
//     }
//     return null;
//   };


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
//                   label={t('insuranceForm.step1.countryTravellingTo')}
//                   name="trip_countries.0" // Assuming single country selection for quote logic
//                   control={control}
//                   options={countryOptions}
//                   placeholder={t('insuranceForm.step1.selectCountry')}
//                   error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
//                 />

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
//                   <p className="text-2xl font-bold text-[#00BBD3]">{renderQuoteDisplay()}</p>
//                   {renderQuoteWarnings()}
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
//                   <div>
//                     <div className="flex items-start gap-2">
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactFirstName")}
//                           name="c_first_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactFirstName")}
//                           error={getError("c_first_name") || getError("travellers.0.first_name" as Path<InsuranceFormValues>)}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactLastName")}
//                           name="c_last_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactLastName")}
//                           error={getError("c_last_name") || getError("travellers.0.last_name" as Path<InsuranceFormValues>)}
//                         />
//                       </div>
//                     </div>
//                   </div>

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
//                         <SelectWithLabel
//                           control={control}
//                           name="c_whats_app_code"
//                           label=""
//                           options={countryCodeOptions}
//                           placeholder="Code"
//                           readOnly={cIsWhatsAppSameAsPhone}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label=""
//                           name="c_whats_app_number"
//                           type="tel"
//                           register={register}
//                           placeholder={t('insuranceForm.step1.enterNumber')}
//                           readOnly={cIsWhatsAppSameAsPhone}
//                         />
//                       </div>
//                     </div>
//                     {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
//                   </div>

//                   <div className="md:col-span-2 mt-2">
//                     <div className="flex items-center space-x-2">
//                       <Controller
//                         name="c_is_whatsapp_same_as_phone"
//                         control={control}
//                         render={({ field }) => (
//                           <Checkbox
//                             id="c_is_whatsapp_same_as_phone"
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                           />
//                         )}
//                       />
//                       <Label htmlFor="c_is_whatsapp_same_as_phone">
//                         {t("insuranceForm.step1.whatsappSameAsPhone")}
//                       </Label>
//                     </div>
//                   </div>
//                   <InputWithLabel label={t('insuranceForm.step1.email')} name="c_email" type="email" register={register} error={getError("c_email")} />
//                   <SelectWithLabel label={t('insuranceForm.step1.nationality')} name="c_nationality" control={control} options={nationalityOptions} placeholder={t('insuranceForm.step1.selectNationality')} error={getError("c_nationality")} />
//                   <SelectWithLabel
//                     label={t('insuranceForm.step1.countryOfResidence')} // This was trip_countries.0, should be city_of_residence for form logic, trip_countries for quote logic
//                     name="city_of_residence" // Changed to city_of_residence, quote uses trip_countries[0]
//                     control={control}
//                     options={countryOptions} // Assuming countryOptions can be used for residence
//                     placeholder={t('insuranceForm.step1.selectCountry')}
//                     error={getError("city_of_residence")}
//                   />
//                 </div>
//                 {travellerFields.map((field, index) => {
//                   if (index === 0) return null;

//                   const firstNamePath = `travellers.${index}.first_name` as Path<InsuranceFormValues>;
//                   const lastNamePath = `travellers.${index}.last_name` as Path<InsuranceFormValues>;
//                   const birthdatePath = `travellers.${index}.birthdate` as Path<InsuranceFormValues>;
//                   // const passportNumberPath = `travellers.${index}.passport_number` as Path<InsuranceFormValues>;
//                   // const passportExpiryDatePath = `travellers.${index}.passport_expiry_date` as Path<InsuranceFormValues>;

//                   return (
//                     <div key={field.id} className="mt-6 pt-6 border-t">
//                       <div className="flex justify-between items-center mb-3">
//                         <h3 className="text-lg font-semibold text-[#1A2C50]">
//                           {t("insuranceForm.step1.additionalTraveller").replace("{{index}}", String(index + 1))}
//                         </h3>
//                         <Button type="button" variant="destructive" size="sm" onClick={() => removeTraveller(index)}>
//                           {t("insuranceForm.step1.remove")}
//                         </Button>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <div className="flex items-start gap-2">
//                             <div className="flex-grow">
//                               <InputWithLabel
//                                 label={t("insuranceForm.step1.contactFirstName")}
//                                 name={firstNamePath}
//                                 register={register}
//                                 placeholder={t("insuranceForm.step1.contactFirstName")}
//                                 error={getError(firstNamePath)}
//                               />
//                             </div>
//                             <div className="flex-grow">
//                               <InputWithLabel
//                                 label={t("insuranceForm.step1.contactLastName")}
//                                 name={lastNamePath}
//                                 register={register}
//                                 placeholder={t("insuranceForm.step1.contactLastName")}
//                                 error={getError(lastNamePath)}
//                               />
//                             </div>
//                           </div>
//                         </div>

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
//                 <Button type="button" variant="outline" onClick={() => appendTraveller({
//                   first_name: "",
//                   last_name: "",
//                   birthdate: "",
//                   passport_number: "",
//                   passport_expiry_date: ""
//                 })} className="mt-6">
//                   {t("insuranceForm.step1.addAdditionalTraveller")}
//                 </Button>
//                 {getError("travellers" as Path<InsuranceFormValues>) && typeof getError("travellers" as Path<InsuranceFormValues>)?.message === 'string' &&
//                   <p className="text-sm text-red-500 mt-1">{getError("travellers" as Path<InsuranceFormValues>)?.message}</p>}
//               </>
//             )}
//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step2.title")}</h2>
//                 <div className="mt-6"><SelectWithLabel label={t("insuranceForm.step2.tripPurpose")} name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder={t("insuranceForm.step2.selectTripPurpose")} error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.primaryCities")} name="primary_cities_regions_ukraine" register={register} error={getError("primary_cities_regions_ukraine")} /></div>
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
//                   <div>
//                     <div className="flex items-start gap-2">
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactFirstName")}
//                           name="emergency_contact_first_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactFirstName")}
//                           error={getError("emergency_contact_first_name")}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactLastName")}
//                           name="emergency_contact_last_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactLastName")}
//                           error={getError("emergency_contact_last_name")}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1 mt-1">{t("insuranceForm.step3.contactNumber")}</p>
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
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.zone.amber")}: {watch("amber_zone_days") || 0} days</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.zone.red")}: {watch("red_zone_days") || 0} days</li>
//                   </ul>
//                   <div><strong>{t("insuranceForm.step4.summaryOfCoverage.coverageSelected")}</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.medical")}: {getEmergencyMedicalLabel(watchedValuesForSummary[2]) || "N/A"}</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.pa")}: {getPALabel(watchedValuesForSummary[3]) || "N/A"}</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.transit")}: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
//                   </ul>
//                   <div className="mt-4 pt-3 border-t">
//                     <strong className="text-xl">{t("insuranceForm.step4.summaryOfCoverage.totalQuote")}:</strong>
//                     <span className="text-xl font-bold text-[#00BBD3] ml-2">{renderQuoteDisplay()}</span>
//                   </div>
//                   {renderQuoteWarnings()}
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.insuredDetails.title")}</h3>
//                 {watchedTravellersForSummary && watchedTravellersForSummary.map((traveller, index) => (
//                   <div key={`summary-traveller-${index}`} className="space-y-1 p-4 bg-gray-50 rounded-md border mb-3">
//                     <p className="font-semibold">
//                       {index === 0
//                         ? t("insuranceForm.step4.insuredDetails.primaryTraveller")
//                         : t("insuranceForm.step4.insuredDetails.additionalTraveller").replace("{{index}}", `${index + 1}`)}
//                     </p>
//                     <div><strong>{t("insuranceForm.step4.insuredDetails.name")}:</strong> {formatFullName(traveller.first_name, traveller.last_name)}</div>
//                     <div><strong>{t("insuranceForm.step4.insuredDetails.age")}:</strong> {calculateAge(traveller.birthdate) || "N/A"}</div>
//                     {index === 0 && <div><strong>{t("insuranceForm.step4.insuredDetails.nationality")}:</strong> {getNationalityLabel(watchedValuesForSummary[8]) || "N/A"}</div>}
//                   </div>
//                 ))}

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.tripInformation.title")}:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>{t("insuranceForm.step4.tripInformation.purpose")}:</strong> {getTripPurposeLabel(watchedValuesForSummary[9]) || "N/A"}</div>
//                   <div><strong>{t("insuranceForm.step4.tripInformation.primaryRegions")}:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
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
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.name")}:</strong> {formatFullName(watchedValuesForSummary[11], watchedValuesForSummary[12])}</div>
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.number")}:</strong> {watchedValuesForSummary[13] || "N/A"}</div>
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
//               {(step > 0 && step < steps.length - 1) && <div className="sm:flex-grow hidden sm:block"></div>}
//               {step < steps.length - 1 && (
//                 <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                   {t("insuranceForm.actions.continue")}
//                 </Button>
//               )}
//               {step === steps.length - 1 && (
//                 <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white" disabled={formState.isSubmitting}>
//                   {formState.isSubmitting ? t("insuranceForm.actions.processing") : t("insuranceForm.actions.confirmAndPurchase")}
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
// import { useForm, Controller, FieldError, Path, useFieldArray, get } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   purchaseWithoutLoginSchema,
//   type InsuranceFormValues,
//   fieldsByStep,
//   tripPurposes,
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
// import dayjs from 'dayjs';

// type Integer = number & { __brand: 'integer' };

// interface GenerateQuotePayload {
//     trip_start_date: Date;
//     trip_end_date: Date;
//     trip_country: string; // Changed from String to string
//     travellers_count: Integer;
//     medical_coverage: "0" | "25000" | "50000" | "100000" | "150000" | "250000";
//     pa_coverage: "0" | "25000" | "50000" | "100000" | "150000" | "250000";
//     transit_coverage: boolean; // Changed from Boolean to boolean
//     green_zone_days: Integer;
//     amber_zone_days: Integer;
//     red_zone_days: Integer;
//     black_zone_days: Integer;
// }

// const pricing = {
//     matrix: {
//         "25000": {
//             "greenME": 19.00,
//             "amberME": 23.75,
//             "redME": 0.0,
//             "blackME": 0.0,
//             "greenPA": 12.38,
//             "amberPA": 13.61,
//             "redPA": 0.0,
//             "blackPA": 0.0
//         },
//         "50000": {
//             "greenME": 22.00,
//             "amberME": 27.50,
//             "redME": 30.25,
//             "blackME": 0.0,
//             "greenPA": 24.75,
//             "amberPA": 29.25,
//             "redPA": 31.73,
//             "blackPA": 0.0
//         },
//         "100000": {
//             "greenME": 26.00,
//             "amberME": 32.50,
//             "redME": 35.75,
//             "blackME": 0.0,
//             "greenPA": 49.50,
//             "amberPA": 54.00,
//             "redPA": 58.95,
//             "blackPA": 0.0
//         },
//         "150000": {
//             "greenME": 30.00,
//             "amberME": 37.50,
//             "redME": 40.25,
//             "blackME": 0.0,
//             "greenPA": 74.25,
//             "amberPA": 81.68,
//             "redPA": 89.84,
//             "blackPA": 0.0
//         },
//         "250000": {
//             "greenME": 36.00,
//             "amberME": 45.00,
//             "redME": 49.50,
//             "blackME": 0.0,
//             "greenPA": 123.75,
//             "amberPA": 136.13,
//             "redPA": 149.74,
//             "blackPA": 0.0
//         }
//     },
//     transitCost: 25.00
// };

// // Return type for generateQuote
// interface QuoteResult {
//     ok: boolean;
//     message: string;
//     warnings: string[];
//     data?: {
//         totalAmount: number;
//         medicalCoverAmount: number;
//         paCoverAmount: number;
//         travellersCount: Integer;
//         totalDays: number;
//     };
// }


// function generateQuote(data: GenerateQuotePayload): QuoteResult {
//     const startDate = dayjs(data.trip_start_date).startOf('day');
//     const endDate = dayjs(data.trip_end_date).endOf('day');
//     const totalDays = endDate.diff(startDate, 'day') + 1;
//     // const tripCountry = data.trip_country; // Not used in calculation logic below

//     if (totalDays <= 0) {
//         return {
//             ok: false,
//             message: "Trip end date should be after trip start date.",
//             warnings: []
//         };
//     }

//     if (totalDays !== (data.green_zone_days + data.amber_zone_days + data.red_zone_days + data.black_zone_days)) {
//         return {
//             ok: false,
//             message: "Total trip days should be equal to the sum of green, amber, red and black zone days.",
//             warnings: []
//         };
//     }

//     const medicalCoverage = data.medical_coverage;
//     const paCoverage = data.pa_coverage;

//     if (
//         (medicalCoverage !== "0" && !pricing.matrix[medicalCoverage]) ||
//         (paCoverage !== "0" && !pricing.matrix[paCoverage])
//     ) {
//         return {
//             ok: false,
//             message: "No pricing found for a selected non-zero coverage.",
//             warnings: []
//         };
//     }

//     const medicalPricing = medicalCoverage === "0" ? undefined : pricing.matrix[medicalCoverage];
//     const paPricing = paCoverage === "0" ? undefined : pricing.matrix[paCoverage];

//     let totalAmount = 0;
//     let medicalCoverAmount = 0;
//     let paCoverAmount = 0;
//     const warnings: string[] = []; // Use const

//     if (medicalPricing && parseInt(data.medical_coverage) > 0) {
//         medicalCoverAmount += medicalPricing["greenME"] * data.green_zone_days;
//         medicalCoverAmount += medicalPricing["amberME"] * data.amber_zone_days;
//         medicalCoverAmount += medicalPricing["redME"] * data.red_zone_days;
//         medicalCoverAmount += medicalPricing["blackME"] * data.black_zone_days;

//         if (data.green_zone_days > 0 && medicalPricing["greenME"] <= 0) {
//             warnings.push("Medical coverage for green zone is not available for this coverage amount.");
//         }
//         if (data.amber_zone_days > 0 && medicalPricing["amberME"] <= 0) {
//             warnings.push("Medical coverage for amber zone is not available for this coverage amount.");
//         }
//         if (data.red_zone_days > 0 && medicalPricing["redME"] <= 0) {
//             warnings.push("Medical coverage for red zone is not available for this coverage amount.");
//         }
//         if (data.black_zone_days > 0 && medicalPricing["blackME"] <= 0) {
//             warnings.push("Medical coverage for black zone is not available for this coverage amount.");
//         }
//     }

//     if (paPricing && parseInt(data.pa_coverage) > 0) {
//         paCoverAmount += paPricing["greenPA"] * data.green_zone_days;
//         paCoverAmount += paPricing["amberPA"] * data.amber_zone_days;
//         paCoverAmount += paPricing["redPA"] * data.red_zone_days;
//         paCoverAmount += paPricing["blackPA"] * data.black_zone_days;

//         if (data.green_zone_days > 0 && paPricing["greenPA"] <= 0) {
//             warnings.push("Personal Accident coverage for green zone is not available for this coverage amount.");
//         }
//         if (data.amber_zone_days > 0 && paPricing["amberPA"] <= 0) {
//             warnings.push("Personal Accident coverage for amber zone is not available for this coverage amount.");
//         }
//         if (data.red_zone_days > 0 && paPricing["redPA"] <= 0) {
//             warnings.push("Personal Accident coverage for red zone is not available for this coverage amount.");
//         }
//         if (data.black_zone_days > 0 && paPricing["blackPA"] <= 0) {
//             warnings.push("Personal Accident coverage for black zone is not available for this coverage amount.");
//         }
//     }

//     totalAmount += medicalCoverAmount + paCoverAmount; // add medical and pa coverage

//     if (data.travellers_count > 0) {
//         totalAmount *= data.travellers_count; // multiply by number of travellers
//     }

//     if (totalDays > 0) {
//         totalAmount *= totalDays; // multiply by total days (as per original logic)
//     }

//     if (data.transit_coverage) {
//         totalAmount += pricing.transitCost;
//     }

//     totalAmount = Math.round(totalAmount * 100) / 100; 

//     return {
//         ok: true,
//         message: "Quote generated successfully",
//         warnings,
//         data: {
//             totalAmount,
//             medicalCoverAmount,
//             paCoverAmount,
//             travellersCount: data.travellers_count,
//             totalDays
//         }
//     };
// }


// export default function InsuranceForm() {
//   const { t } = useTranslation();
//   const steps = t("insuranceForm.steps", { returnObjects: true }) as string[];
//   const [step, setStep] = useState(0);
//   const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);
//   const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null); // State for quote result

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
//       c_first_name: "",
//       c_last_name: "",
//       c_birthdate: "",
//       c_passport_number: "",
//       c_passport_expiry_date: "",
//       c_is_whatsapp_same_as_phone: false,
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
//       travellers: [{
//         first_name: "",
//         last_name: "",
//         birthdate: "",
//         passport_number: "",
//         passport_expiry_date: ""
//       }],
//       arrival_in_ukraine: "",
//       departure_from_ukraine: "",
//       primary_cities_regions_ukraine: "",
//       trip_cities: [],
//       trip_purpose: "",
//       stay_name: "",
//       company_name: "",
//       emergency_contact_first_name: "",
//       emergency_contact_last_name: "",
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

//   const cFirstNameValue = watch("c_first_name");
//   const cLastNameValue = watch("c_last_name");
//   const cBirthdateValue = watch("c_birthdate");
//   const cPassportNumberValue = watch("c_passport_number");
//   const cPassportExpiryDateValue = watch("c_passport_expiry_date");


//   useEffect(() => {
//     const currentTravellers = getValues("travellers");
//     if (!currentTravellers || currentTravellers.length === 0) {
//       setValue("travellers", [{
//         first_name: cFirstNameValue || "",
//         last_name: cLastNameValue || "",
//         birthdate: cBirthdateValue || "",
//         passport_number: cPassportNumberValue || "",
//         passport_expiry_date: cPassportExpiryDateValue || "",
//       }], {
//         shouldValidate: false,
//         shouldDirty: false
//       });
//     } else {
//       let changed = false;
//       const newTraveller0 = { ...currentTravellers[0] };

//       if (newTraveller0.first_name !== cFirstNameValue) {
//         newTraveller0.first_name = cFirstNameValue || "";
//         changed = true;
//       }
//       if (newTraveller0.last_name !== cLastNameValue) {
//         newTraveller0.last_name = cLastNameValue || "";
//         changed = true;
//       }
//       if (newTraveller0.birthdate !== cBirthdateValue) {
//         newTraveller0.birthdate = cBirthdateValue || "";
//         changed = true;
//       }
//       if (newTraveller0.passport_number !== cPassportNumberValue) {
//         newTraveller0.passport_number = cPassportNumberValue || "";
//         changed = true;
//       }
//       if (newTraveller0.passport_expiry_date !== cPassportExpiryDateValue) {
//         newTraveller0.passport_expiry_date = cPassportExpiryDateValue || "";
//         changed = true;
//       }

//       if (changed) {
//         const updatedTravellers = [...currentTravellers];
//         updatedTravellers[0] = newTraveller0;
//         setValue("travellers", updatedTravellers, {
//           shouldValidate: step === 1 && (
//             !!formState.dirtyFields.c_first_name ||
//             !!formState.dirtyFields.c_last_name ||
//             !!formState.dirtyFields.c_birthdate ||
//             !!formState.dirtyFields.c_passport_number ||
//             !!formState.dirtyFields.c_passport_expiry_date
//           ),
//           shouldDirty: true
//         });
//       }
//     }
//   }, [
//     cFirstNameValue, cLastNameValue, cBirthdateValue,
//     cPassportNumberValue, cPassportExpiryDateValue,
//     setValue, getValues, step, formState.dirtyFields
//   ]);


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
//   const cIsWhatsAppSameAsPhone = watch("c_is_whatsapp_same_as_phone");

//   useEffect(() => {
//     const fullNumber = `${cPhoneCode || ''}${cPhoneNumber || ''}`;
//     if (getValues("c_phone") !== fullNumber) {
//       setValue("c_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cPhoneCode, cPhoneNumber, setValue, getValues]);

//   useEffect(() => {
//     if (cIsWhatsAppSameAsPhone) {
//       setValue("c_whats_app_code", cPhoneCode || "", { shouldValidate: true, shouldDirty: true });
//       setValue("c_whats_app_number", cPhoneNumber || "", { shouldValidate: true, shouldDirty: true });
//     }
//   }, [cIsWhatsAppSameAsPhone, cPhoneCode, cPhoneNumber, setValue, getValues]);


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

//   const watchedTripCountriesForQuote = watch("trip_countries");
//   const watchedTravellersForQuote = watch("travellers");
//   const watchedMedicalCoverageForQuote = watch("emergency_medical_coverage");
//   const watchedPaCoverageForQuote = watch("personal_accident_coverage_level");
//   const watchedTransitCoverageForQuote = watch("add_transit_coverage");
//   const watchedGreenZoneDaysForQuote = watch("green_zone_days");
//   const watchedAmberZoneDaysForQuote = watch("amber_zone_days");
//   const watchedRedZoneDaysForQuote = watch("red_zone_days");
//   const watchedBlackZoneDaysForQuote = watch("black_zone_days");

//     useEffect(() => {
//     const formValues = getValues();

//     const hasRequiredFieldsForQuote =
//       formValues.trip_start_date &&
//       formValues.trip_end_date &&
//       formValues.trip_countries && formValues.trip_countries.length > 0 && formValues.trip_countries[0] &&
//       formValues.emergency_medical_coverage &&
//       formValues.personal_accident_coverage_level !== undefined &&
//       formValues.travellers && formValues.travellers.length > 0;

//     if (!hasRequiredFieldsForQuote) {
//       setQuoteResult(null);
//       return;
//     }

//     const startDate = dayjs(formValues.trip_start_date + "T00:00:00");
//     const endDate = dayjs(formValues.trip_end_date + "T00:00:00");

//     if (!startDate.isValid() || !endDate.isValid() || endDate.isBefore(startDate)) {
//       setQuoteResult({ ok: false, message: "Invalid trip dates for quote calculation.", warnings: [] });
//       return;
//     }
//     const criticalErrorFields: (Path<InsuranceFormValues>)[] = [
//         "trip_start_date", "trip_end_date",
//         "green_zone_days", "amber_zone_days", "red_zone_days",
//         "trip_countries", "emergency_medical_coverage", "personal_accident_coverage_level"
//     ];
//     const hasCriticalErrors = criticalErrorFields.some(field => get(formState.errors, field)) ||
//                               formState.errors.root?.message?.includes("must equal the Total Travel Days") ||
//                               formState.errors.root?.message?.includes("Please select either Emergency Medical Coverage or Personal Accident");


//     if (hasCriticalErrors) {
//         setQuoteResult({ ok: false, message: "Please correct form errors to see a quote.", warnings: [] });
//         return;
//     }

//     const payload: GenerateQuotePayload = {
//       trip_start_date: startDate.toDate(),
//       trip_end_date: endDate.toDate(),
//       trip_country: formValues.trip_countries[0] as string, // Changed from String to string
//       travellers_count: formValues.travellers.length as Integer,
//       medical_coverage: formValues.emergency_medical_coverage as GenerateQuotePayload['medical_coverage'],
//       pa_coverage: formValues.personal_accident_coverage_level as GenerateQuotePayload['pa_coverage'],
//       transit_coverage: formValues.add_transit_coverage,
//       green_zone_days: Number(formValues.green_zone_days || 0) as Integer,
//       amber_zone_days: Number(formValues.amber_zone_days || 0) as Integer,
//       red_zone_days: Number(formValues.red_zone_days || 0) as Integer,
//       black_zone_days: Number(formValues.black_zone_days || 0) as Integer,
//     };

//     const result = generateQuote(payload);
//     setQuoteResult(result);

//   }, [
//     watchedStartDate,
//     watchedEndDate,
//     watchedTripCountriesForQuote,
//     watchedTravellersForQuote,
//     watchedMedicalCoverageForQuote,
//     watchedPaCoverageForQuote,
//     watchedTransitCoverageForQuote,
//     watchedGreenZoneDaysForQuote,
//     watchedAmberZoneDaysForQuote,
//     watchedRedZoneDaysForQuote,
//     watchedBlackZoneDaysForQuote,
//     getValues,
//     formState.errors
//   ]);


//   const onSubmitForm = (data: InsuranceFormValues) => {
//     const finalTravellers = [...data.travellers];
//     if (finalTravellers.length > 0) {
//       finalTravellers[0] = {
//         ...finalTravellers[0],
//         first_name: getValues("c_first_name") || "",
//         last_name: getValues("c_last_name") || "",
//         birthdate: getValues("c_birthdate") || "",
//         passport_number: getValues("c_passport_number") || "",
//         passport_expiry_date: getValues("c_passport_expiry_date") || "",
//       };
//     } else {
//       finalTravellers.push({
//         first_name: getValues("c_first_name") || "",
//         last_name: getValues("c_last_name") || "",
//         birthdate: getValues("c_birthdate") || "",
//         passport_number: getValues("c_passport_number") || "",
//         passport_expiry_date: getValues("c_passport_expiry_date") || "",
//       });
//     }

//     const finalData = {
//       ...data,
//       travellers: finalTravellers.map(t => ({
//         first_name: t.first_name,
//         last_name: t.last_name,
//         birthdate: t.birthdate,
//         passport_number: t.passport_number,
//         passport_expiry_date: t.passport_expiry_date,
//       })),
//       c_phone: `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`,
//       c_whats_app: getValues("c_is_whatsapp_same_as_phone")
//         ? `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`
//         : `${getValues("c_whats_app_code") || ''}${getValues("c_whats_app_number") || ''}`,
//       emergency_contact_phone: `${getValues("emergency_contact_phone_code") || ''}${getValues("emergency_contact_phone_number") || ''}`,
//       green_zone_days: Number(data.green_zone_days),
//       amber_zone_days: Number(data.amber_zone_days),
//       red_zone_days: Number(data.red_zone_days),
//       black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
//       medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
//       allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
//       current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
//       trip_cities: data.trip_cities ? data.trip_cities.filter(city => city.name && city.name.trim() !== "") : [],
//       c_passport_number: getValues("c_passport_number"),
//       c_passport_expiry_date: getValues("c_passport_expiry_date"),
//       c_is_whatsapp_same_as_phone: getValues("c_is_whatsapp_same_as_phone"),
//     };
//     console.log("Form Data Submitted for Purchase:", finalData);
//     console.log("Calculated Quote at submission:", quoteResult); // Log quote too
//     alert("Confirm & Purchase clicked! Form submitted. Check console.");
//   };

//   const handleNextOrContinue = async () => {
//     const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
//     const partFieldsToValidate: Path<InsuranceFormValues>[] = [];
//     if (step === 1) {
//       partFieldsToValidate.push(
//         "c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number",
//         "c_passport_number", "c_passport_expiry_date"
//       );
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
//             const specificTravellerErrors = travellerErrors[i] as undefined | Record<string, FieldError | undefined>;
//             if (specificTravellerErrors) {
//               if (specificTravellerErrors.first_name) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.first_name` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.last_name) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.last_name` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.birthdate) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.birthdate` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.passport_number) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.passport_number` as Path<InsuranceFormValues>;
//                 break;
//               }
//               if (specificTravellerErrors.passport_expiry_date) {
//                 firstErrorKeyOnCurrentStep = `travellers.${i}.passport_expiry_date` as Path<InsuranceFormValues>;
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
//         alert(formState.errors.root.message); // This alert might be redundant if quoteResult shows error
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
//     "c_first_name", "c_last_name",
//     "c_birthdate", "c_nationality", "trip_purpose", "primary_cities_regions_ukraine",
//     "emergency_contact_first_name", "emergency_contact_last_name",
//     "emergency_contact_phone",
//     "c_passport_number", "c_passport_expiry_date",
//   ] as const;

//   const watchedValuesForSummary = watch(watchedPathsForSummary);
//   const watchedTravellersForSummary = watch("travellers");
//   const watchedTripCitiesForSummary = watch("trip_cities");

//   // const watchedAmberZoneDaysForDisplay = watch("amber_zone_days"); // Already watched by watchedAmberZoneDaysForQuote
//   // const watchedRedZoneDaysForDisplay = watch("red_zone_days"); // Already watched by watchedRedZoneDaysForQuote

//   const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value;
//   const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value;
//   const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value;

//   const formatFullName = (firstName?: string, lastName?: string): string => {
//     const first = firstName || "";
//     const last = lastName || "";
//     if (first && last) return `${first} ${last}`;
//     return first || last || "N/A";
//   };

//   const renderQuoteDisplay = () => {
//     if (!quoteResult) return "$0.00 (Calculating...)";
//     if (!quoteResult.ok) return `$0.00 (${quoteResult.message || "Error"})`;
//     if (quoteResult.data) return `$${quoteResult.data.totalAmount.toFixed(2)}`;
//     return "$0.00 (Unavailable)";
//   };

//   const renderQuoteWarnings = () => {
//     if (quoteResult && quoteResult.ok && quoteResult.warnings && quoteResult.warnings.length > 0) {
//       return (
//         <div className="mt-1 text-xs text-orange-600">
//           <strong>{t("insuranceForm.warnings")}:</strong>
//           <ul className="list-disc list-inside pl-4">
//             {quoteResult.warnings.map((warning, idx) => <li key={idx}>{warning}</li>)}
//           </ul>
//         </div>
//       );
//     }
//     if (quoteResult && !quoteResult.ok && quoteResult.message) {
//          // Only show this if it's a quote-specific error not already handled by main form validation display
//         if (quoteResult.message !== "Please correct form errors to see a quote.") {
//             return (
//                  <div className="mt-1 text-xs text-red-600">
//                     <strong>{t("insuranceForm.quoteError")}:</strong> {quoteResult.message}
//                 </div>
//             );
//         }
//     }
//     return null;
//   };


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
//                   label={t('insuranceForm.step1.countryTravellingTo')}
//                   name="trip_countries.0" // Assuming single country selection for quote logic
//                   control={control}
//                   options={countryOptions}
//                   placeholder={t('insuranceForm.step1.selectCountry')}
//                   error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
//                 />

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
//                   <p className="text-2xl font-bold text-[#00BBD3]">{renderQuoteDisplay()}</p>
//                   {renderQuoteWarnings()}
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
//                   <div>
//                     <div className="flex items-start gap-2">
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactFirstName")}
//                           name="c_first_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactFirstName")}
//                           error={getError("c_first_name") || getError("travellers.0.first_name" as Path<InsuranceFormValues>)}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactLastName")}
//                           name="c_last_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactLastName")}
//                           error={getError("c_last_name") || getError("travellers.0.last_name" as Path<InsuranceFormValues>)}
//                         />
//                       </div>
//                     </div>
//                   </div>

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
//                         <SelectWithLabel
//                           control={control}
//                           name="c_whats_app_code"
//                           label=""
//                           options={countryCodeOptions}
//                           placeholder="Code"
//                           readOnly={cIsWhatsAppSameAsPhone}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label=""
//                           name="c_whats_app_number"
//                           type="tel"
//                           register={register}
//                           placeholder={t('insuranceForm.step1.enterNumber')}
//                           readOnly={cIsWhatsAppSameAsPhone}
//                         />
//                       </div>
//                     </div>
//                     {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
//                   </div>

//                   <div className="md:col-span-2 mt-2">
//                     <div className="flex items-center space-x-2">
//                       <Controller
//                         name="c_is_whatsapp_same_as_phone"
//                         control={control}
//                         render={({ field }) => (
//                           <Checkbox
//                             id="c_is_whatsapp_same_as_phone"
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                           />
//                         )}
//                       />
//                       <Label htmlFor="c_is_whatsapp_same_as_phone">
//                         {t("insuranceForm.step1.whatsappSameAsPhone")}
//                       </Label>
//                     </div>
//                   </div>
//                   <InputWithLabel label={t('insuranceForm.step1.email')} name="c_email" type="email" register={register} error={getError("c_email")} />
//                   <SelectWithLabel label={t('insuranceForm.step1.nationality')} name="c_nationality" control={control} options={nationalityOptions} placeholder={t('insuranceForm.step1.selectNationality')} error={getError("c_nationality")} />
//                   <SelectWithLabel
//                     label={t('insuranceForm.step1.countryOfResidence')} // This was trip_countries.0, should be city_of_residence for form logic, trip_countries for quote logic
//                     name="city_of_residence" // Changed to city_of_residence, quote uses trip_countries[0]
//                     control={control}
//                     options={countryOptions} // Assuming countryOptions can be used for residence
//                     placeholder={t('insuranceForm.step1.selectCountry')}
//                     error={getError("city_of_residence")}
//                   />
//                 </div>
//                 {travellerFields.map((field, index) => {
//                   if (index === 0) return null;

//                   const firstNamePath = `travellers.${index}.first_name` as Path<InsuranceFormValues>;
//                   const lastNamePath = `travellers.${index}.last_name` as Path<InsuranceFormValues>;
//                   const birthdatePath = `travellers.${index}.birthdate` as Path<InsuranceFormValues>;
//                   // const passportNumberPath = `travellers.${index}.passport_number` as Path<InsuranceFormValues>;
//                   // const passportExpiryDatePath = `travellers.${index}.passport_expiry_date` as Path<InsuranceFormValues>;

//                   return (
//                     <div key={field.id} className="mt-6 pt-6 border-t">
//                       <div className="flex justify-between items-center mb-3">
//                         <h3 className="text-lg font-semibold text-[#1A2C50]">
//                           {t("insuranceForm.step1.additionalTraveller").replace("{{index}}", String(index + 1))}
//                         </h3>
//                         <Button type="button" variant="destructive" size="sm" onClick={() => removeTraveller(index)}>
//                           {t("insuranceForm.step1.remove")}
//                         </Button>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <div className="flex items-start gap-2">
//                             <div className="flex-grow">
//                               <InputWithLabel
//                                 label={t("insuranceForm.step1.contactFirstName")}
//                                 name={firstNamePath}
//                                 register={register}
//                                 placeholder={t("insuranceForm.step1.contactFirstName")}
//                                 error={getError(firstNamePath)}
//                               />
//                             </div>
//                             <div className="flex-grow">
//                               <InputWithLabel
//                                 label={t("insuranceForm.step1.contactLastName")}
//                                 name={lastNamePath}
//                                 register={register}
//                                 placeholder={t("insuranceForm.step1.contactLastName")}
//                                 error={getError(lastNamePath)}
//                               />
//                             </div>
//                           </div>
//                         </div>

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
//                 <Button type="button" variant="outline" onClick={() => appendTraveller({
//                   first_name: "",
//                   last_name: "",
//                   birthdate: "",
//                   passport_number: "",
//                   passport_expiry_date: ""
//                 })} className="mt-6">
//                   {t("insuranceForm.step1.addAdditionalTraveller")}
//                 </Button>
//                 {getError("travellers" as Path<InsuranceFormValues>) && typeof getError("travellers" as Path<InsuranceFormValues>)?.message === 'string' &&
//                   <p className="text-sm text-red-500 mt-1">{getError("travellers" as Path<InsuranceFormValues>)?.message}</p>}
//               </>
//             )}
//             {step === 2 && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step2.title")}</h2>
//                 <div className="mt-6"><SelectWithLabel label={t("insuranceForm.step2.tripPurpose")} name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder={t("insuranceForm.step2.selectTripPurpose")} error={getError("trip_purpose")} /></div>
//                 <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.primaryCities")} name="primary_cities_regions_ukraine" register={register} error={getError("primary_cities_regions_ukraine")} /></div>
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
//                   <div>
//                     <div className="flex items-start gap-2">
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactFirstName")}
//                           name="emergency_contact_first_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactFirstName")}
//                           error={getError("emergency_contact_first_name")}
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <InputWithLabel
//                           label={t("insuranceForm.step1.contactLastName")}
//                           name="emergency_contact_last_name"
//                           register={register}
//                           placeholder={t("insuranceForm.step1.contactLastName")}
//                           error={getError("emergency_contact_last_name")}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 mb-1 mt-1">{t("insuranceForm.step3.contactNumber")}</p>
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
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.zone.amber")}: {watch("amber_zone_days") || 0} days</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.zone.red")}: {watch("red_zone_days") || 0} days</li>
//                   </ul>
//                   <div><strong>{t("insuranceForm.step4.summaryOfCoverage.coverageSelected")}</strong></div>
//                   <ul className="list-disc list-inside pl-4">
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.medical")}: {getEmergencyMedicalLabel(watchedValuesForSummary[2]) || "N/A"}</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.pa")}: {getPALabel(watchedValuesForSummary[3]) || "N/A"}</li>
//                     <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.transit")}: {watchedValuesForSummary[4] ? "Yes (250k Add-on)" : "No"}</li>
//                   </ul>
//                   <div className="mt-4 pt-3 border-t">
//                     <strong className="text-xl">{t("insuranceForm.step4.summaryOfCoverage.totalQuote")}:</strong>
//                     <span className="text-xl font-bold text-[#00BBD3] ml-2">{renderQuoteDisplay()}</span>
//                   </div>
//                   {renderQuoteWarnings()}
//                 </div>

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.insuredDetails.title")}</h3>
//                 {watchedTravellersForSummary && watchedTravellersForSummary.map((traveller, index) => (
//                   <div key={`summary-traveller-${index}`} className="space-y-1 p-4 bg-gray-50 rounded-md border mb-3">
//                     <p className="font-semibold">
//                       {index === 0
//                         ? t("insuranceForm.step4.insuredDetails.primaryTraveller")
//                         : t("insuranceForm.step4.insuredDetails.additionalTraveller").replace("{{index}}", `${index + 1}`)}
//                     </p>
//                     <div><strong>{t("insuranceForm.step4.insuredDetails.name")}:</strong> {formatFullName(traveller.first_name, traveller.last_name)}</div>
//                     <div><strong>{t("insuranceForm.step4.insuredDetails.age")}:</strong> {calculateAge(traveller.birthdate) || "N/A"}</div>
//                     {index === 0 && <div><strong>{t("insuranceForm.step4.insuredDetails.nationality")}:</strong> {getNationalityLabel(watchedValuesForSummary[8]) || "N/A"}</div>}
//                   </div>
//                 ))}

//                 <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.tripInformation.title")}:</h3>
//                 <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
//                   <div><strong>{t("insuranceForm.step4.tripInformation.purpose")}:</strong> {getTripPurposeLabel(watchedValuesForSummary[9]) || "N/A"}</div>
//                   <div><strong>{t("insuranceForm.step4.tripInformation.primaryRegions")}:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
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
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.name")}:</strong> {formatFullName(watchedValuesForSummary[11], watchedValuesForSummary[12])}</div>
//                   <div><strong>{t("insuranceForm.step4.emergencyContact.number")}:</strong> {watchedValuesForSummary[13] || "N/A"}</div>
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
//               {(step > 0 && step < steps.length - 1) && <div className="sm:flex-grow hidden sm:block"></div>}
//               {step < steps.length - 1 && (
//                 <Button type="button" onClick={handleNextOrContinue} className="w-full sm:w-auto px-8 py-3 text-base bg-[#1A2C50] hover:bg-[#2c3e6b] text-white">
//                   {t("insuranceForm.actions.continue")}
//                 </Button>
//               )}
//               {step === steps.length - 1 && (
//                 <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white" disabled={formState.isSubmitting}>
//                   {formState.isSubmitting ? t("insuranceForm.actions.processing") : t("insuranceForm.actions.confirmAndPurchase")}
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
  fieldsByStep,
  tripPurposes,
  emergencyMedicalCoverageOptions,
  personalAccidentCoverageOptions,
  nationalityOptions,
  countryOptions,
  countryCodeOptions,
  countryTravellingToOptions,
} from "@/lib/insuranceFormSchema";
import {
  InputWithLabel,
  TextareaWithLabel,
  ControlledTextareaArray,
  SelectWithLabel,
  DatePickerField
} from "./FormFields"; // Assuming FormFields.tsx exports these correctly
import { format as formatDateFn } from "date-fns";
import BirthDateField from "../form/BirthDateField"; // Assuming this path is correct
import { useTranslation } from "@/hooks/useTranslation"; // Assuming this path is correct
import dayjs from 'dayjs';
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

type Integer = number & { __brand: 'integer' };

interface GenerateQuotePayload {
  trip_start_date: Date;
  trip_end_date: Date;
  trip_country: string;
  travellers_count: Integer;
  medical_coverage: "0" | "25000" | "50000" | "100000" | "150000" | "250000";
  pa_coverage: "0" | "25000" | "50000" | "100000" | "150000" | "250000";
  transit_coverage: boolean;
  green_zone_days: Integer;
  amber_zone_days: Integer;
  red_zone_days: Integer;
  black_zone_days: Integer;
}

const pricing = {
  matrix: {
    "25000": {
      "greenME": 19.00,
      "amberME": 23.75,
      "redME": 0.0,
      "blackME": 0.0,
      "greenPA": 12.38,
      "amberPA": 13.61,
      "redPA": 0.0,
      "blackPA": 0.0
    },
    "50000": {
      "greenME": 22.00,
      "amberME": 27.50,
      "redME": 30.25,
      "blackME": 0.0,
      "greenPA": 24.75,
      "amberPA": 29.25,
      "redPA": 31.73,
      "blackPA": 0.0
    },
    "100000": {
      "greenME": 26.00,
      "amberME": 32.50,
      "redME": 35.75,
      "blackME": 0.0,
      "greenPA": 49.50,
      "amberPA": 54.00,
      "redPA": 58.95,
      "blackPA": 0.0
    },
    "150000": {
      "greenME": 30.00,
      "amberME": 37.50,
      "redME": 40.25,
      "blackME": 0.0,
      "greenPA": 74.25,
      "amberPA": 81.68,
      "redPA": 89.84,
      "blackPA": 0.0
    },
    "250000": {
      "greenME": 36.00,
      "amberME": 45.00,
      "redME": 49.50,
      "blackME": 0.0,
      "greenPA": 123.75,
      "amberPA": 136.13,
      "redPA": 149.74,
      "blackPA": 0.0
    }
  },
  transitCost: 25.00
};

interface QuoteResult {
  ok: boolean;
  message: string;
  warnings: string[];
  data?: {
    totalAmount: number;
    medicalCoverAmount: number;
    paCoverAmount: number;
    travellersCount: Integer;
    totalDays: number;
  };
}

function generateQuote(data: GenerateQuotePayload): QuoteResult {
  const startDate = dayjs(data.trip_start_date).startOf('day');
  const endDate = dayjs(data.trip_end_date).endOf('day');
  const totalDays = endDate.diff(startDate, 'day') + 1;

  if (totalDays <= 0) {
    return {
      ok: false,
      message: "Trip end date should be after trip start date.",
      warnings: []
    };
  }

  const sumOfZoneDays = data.green_zone_days + data.amber_zone_days + data.red_zone_days + data.black_zone_days;
  if (totalDays !== sumOfZoneDays) {
    return {
      ok: false,
      message: `Total trip days (${totalDays}) should be equal to the sum of zone days (${sumOfZoneDays}).`,
      warnings: []
    };
  }

  const medicalCoverageLevel = data.medical_coverage;
  const paCoverageLevel = data.pa_coverage;

  if (
    (medicalCoverageLevel !== "0" && !pricing.matrix[medicalCoverageLevel]) ||
    (paCoverageLevel !== "0" && !pricing.matrix[paCoverageLevel])
  ) {
    return {
      ok: false,
      message: "No pricing found for a selected non-zero coverage.",
      warnings: []
    };
  }

  const medicalRates = medicalCoverageLevel === "0" ? undefined : pricing.matrix[medicalCoverageLevel];
  const paRates = paCoverageLevel === "0" ? undefined : pricing.matrix[paCoverageLevel];

  let medicalCoverAmount = 0;
  let paCoverAmount = 0;
  const warnings: string[] = [];

  if (medicalRates && medicalCoverageLevel !== "0") {
    medicalCoverAmount += (medicalRates["greenME"] || 0) * data.green_zone_days;
    medicalCoverAmount += (medicalRates["amberME"] || 0) * data.amber_zone_days;
    medicalCoverAmount += (medicalRates["redME"] || 0) * data.red_zone_days;
    medicalCoverAmount += (medicalRates["blackME"] || 0) * data.black_zone_days;

    if (data.green_zone_days > 0 && (!medicalRates["greenME"] || medicalRates["greenME"] <= 0)) {
      warnings.push("Medical coverage for green zone is not available or has zero cost for this coverage amount.");
    }
    if (data.amber_zone_days > 0 && (!medicalRates["amberME"] || medicalRates["amberME"] <= 0)) {
      warnings.push("Medical coverage for amber zone is not available or has zero cost for this coverage amount.");
    }
    if (data.red_zone_days > 0 && (!medicalRates["redME"] || medicalRates["redME"] <= 0)) {
      warnings.push("Medical coverage for red zone is not available or has zero cost for this coverage amount.");
    }
    if (data.black_zone_days > 0 && (!medicalRates["blackME"] || medicalRates["blackME"] <= 0)) {
      warnings.push("Medical coverage for black zone is not available or has zero cost for this coverage amount.");
    }
  }

  if (paRates && paCoverageLevel !== "0") {
    paCoverAmount += (paRates["greenPA"] || 0) * data.green_zone_days;
    paCoverAmount += (paRates["amberPA"] || 0) * data.amber_zone_days;
    paCoverAmount += (paRates["redPA"] || 0) * data.red_zone_days;
    paCoverAmount += (paRates["blackPA"] || 0) * data.black_zone_days;

    if (data.green_zone_days > 0 && (!paRates["greenPA"] || paRates["greenPA"] <= 0)) {
      warnings.push("Personal Accident coverage for green zone is not available or has zero cost for this coverage amount.");
    }
    if (data.amber_zone_days > 0 && (!paRates["amberPA"] || paRates["amberPA"] <= 0)) {
      warnings.push("Personal Accident coverage for amber zone is not available or has zero cost for this coverage amount.");
    }
    if (data.red_zone_days > 0 && (!paRates["redPA"] || paRates["redPA"] <= 0)) {
      warnings.push("Personal Accident coverage for red zone is not available or has zero cost for this coverage amount.");
    }
    if (data.black_zone_days > 0 && (!paRates["blackPA"] || paRates["blackPA"] <= 0)) {
      warnings.push("Personal Accident coverage for black zone is not available or has zero cost for this coverage amount.");
    }
  }

  let totalAmount = medicalCoverAmount + paCoverAmount;

  if (data.travellers_count > 0) {
    totalAmount *= data.travellers_count;
  }

  if (data.transit_coverage) {
    totalAmount += pricing.transitCost;
  }

  totalAmount = Math.round(totalAmount * 100) / 100;

  return {
    ok: true,
    message: "Quote generated successfully",
    warnings,
    data: {
      totalAmount,
      medicalCoverAmount: Math.round(medicalCoverAmount * 100) / 100,
      paCoverAmount: Math.round(paCoverAmount * 100) / 100,
      travellersCount: data.travellers_count,
      totalDays
    }
  };
}


export default function InsuranceForm() {
  const [showQuote, setShowQuote] = useState(false);
  const { t } = useTranslation();
  const steps = t("insuranceForm.steps", { returnObjects: true }) as string[];
  const [step, setStep] = useState(0);
  const [calculatedTotalRiskZoneDays, setCalculatedTotalRiskZoneDays] = useState<number | null>(null);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

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
      c_passport_number: "",
      c_passport_expiry_date: "",
      c_is_whatsapp_same_as_phone: false,
      c_phone: "",
      c_phone_code: "",
      c_phone_number: "",
      c_whats_app: "",
      c_whats_app_code: "",
      c_whats_app_number: "",
      c_email: "",
      c_nationality: "",
      city_of_residence: "",
      trip_countries: ["UA"],
      travellers: [{
        first_name: "",
        last_name: "",
        birthdate: "",
        passport_number: "",
        passport_expiry_date: ""
      }],
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
  const cPassportNumberValue = watch("c_passport_number");
  const cPassportExpiryDateValue = watch("c_passport_expiry_date");

  useEffect(() => {
    const currentTravellers = getValues("travellers");
    if (!currentTravellers || currentTravellers.length === 0) {
      setValue("travellers", [{
        first_name: cFirstNameValue || "",
        last_name: cLastNameValue || "",
        birthdate: cBirthdateValue || "",
        passport_number: cPassportNumberValue || "",
        passport_expiry_date: cPassportExpiryDateValue || "",
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
      if (newTraveller0.passport_number !== cPassportNumberValue) {
        newTraveller0.passport_number = cPassportNumberValue || "";
        changed = true;
      }
      if (newTraveller0.passport_expiry_date !== cPassportExpiryDateValue) {
        newTraveller0.passport_expiry_date = cPassportExpiryDateValue || "";
        changed = true;
      }

      if (changed) {
        const updatedTravellers = [...currentTravellers];
        updatedTravellers[0] = newTraveller0;
        setValue("travellers", updatedTravellers, {
          shouldValidate: step === 1 && (
            !!formState.dirtyFields.c_first_name ||
            !!formState.dirtyFields.c_last_name ||
            !!formState.dirtyFields.c_birthdate ||
            !!formState.dirtyFields.c_passport_number ||
            !!formState.dirtyFields.c_passport_expiry_date
          ),
          shouldDirty: true
        });
      }
    }
  }, [
    cFirstNameValue, cLastNameValue, cBirthdateValue,
    cPassportNumberValue, cPassportExpiryDateValue,
    setValue, getValues, step, formState.dirtyFields
  ]);

  useEffect(() => {
    if (watchedStartDate && watchedEndDate) {
      const start = dayjs(watchedStartDate + "T00:00:00");
      const end = dayjs(watchedEndDate + "T00:00:00");
      if (start.isValid() && end.isValid() && (end.isSame(start) || end.isAfter(start))) {
        const diffDays = end.diff(start, 'day') + 1;
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

        amber = Math.max(0, Math.floor(amber));
        red = Math.max(0, Math.floor(red));

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
  const cIsWhatsAppSameAsPhone = watch("c_is_whatsapp_same_as_phone");

  useEffect(() => {
    const fullNumber = `${cPhoneCode || ''}${cPhoneNumber || ''}`;
    if (getValues("c_phone") !== fullNumber) {
      setValue("c_phone", fullNumber, { shouldValidate: true, shouldDirty: true });
    }
  }, [cPhoneCode, cPhoneNumber, setValue, getValues]);

  useEffect(() => {
    if (cIsWhatsAppSameAsPhone) {
      setValue("c_whats_app_code", cPhoneCode || "", { shouldValidate: true, shouldDirty: true });
      setValue("c_whats_app_number", cPhoneNumber || "", { shouldValidate: true, shouldDirty: true });
    }
  }, [cIsWhatsAppSameAsPhone, cPhoneCode, cPhoneNumber, setValue]);

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

  const watchedTripCountriesForQuote = watch("trip_countries");
  const watchedTravellersForQuote = watch("travellers");
  const watchedMedicalCoverageForQuote = watch("emergency_medical_coverage");
  const watchedPaCoverageForQuote = watch("personal_accident_coverage_level");
  const watchedTransitCoverageForQuote = watch("add_transit_coverage");
  const watchedGreenZoneDaysForQuote = watch("green_zone_days");
  const watchedAmberZoneDaysForQuote = watch("amber_zone_days");
  const watchedRedZoneDaysForQuote = watch("red_zone_days");
  const watchedBlackZoneDaysForQuote = watch("black_zone_days");

  useEffect(() => {
    const formValues = getValues();

    const hasRequiredFieldsForQuote =
      formValues.trip_start_date &&
      formValues.trip_end_date &&
      formValues.trip_countries && formValues.trip_countries.length > 0 && formValues.trip_countries[0] &&
      formValues.emergency_medical_coverage &&
      formValues.personal_accident_coverage_level !== undefined &&
      formValues.travellers && formValues.travellers.length > 0;

    if (!hasRequiredFieldsForQuote) {
      setQuoteResult(null);
      return;
    }

    const startDate = dayjs(formValues.trip_start_date + "T00:00:00");
    const endDate = dayjs(formValues.trip_end_date + "T00:00:00");

    if (!startDate.isValid() || !endDate.isValid() || endDate.isBefore(startDate)) {
      setQuoteResult({ ok: false, message: "Invalid trip dates for quote calculation.", warnings: [] });
      return;
    }

    const criticalErrorFields: (Path<InsuranceFormValues>)[] = [
      "trip_start_date", "trip_end_date",
      "green_zone_days", "amber_zone_days", "red_zone_days",
      "trip_countries", "emergency_medical_coverage", "personal_accident_coverage_level"
    ];

    const hasVisibleFormErrors = criticalErrorFields.some(field => get(formState.errors, field)) ||
      (formState.errors.root && (
        formState.errors.root.message?.includes("must equal the Total Travel Days") ||
        formState.errors.root.message?.includes("Please select either Emergency Medical Coverage or Personal Accident")
      ));

    if (hasVisibleFormErrors) {
      setQuoteResult({ ok: false, message: "Please correct form errors to see a quote.", warnings: [] });
      return;
    }

    const totalTripDaysCalculated = endDate.diff(startDate, 'day') + 1;
    const sumZoneDaysFromForm = Number(formValues.green_zone_days || 0) +
      Number(formValues.amber_zone_days || 0) +
      Number(formValues.red_zone_days || 0) +
      Number(formValues.black_zone_days || 0);

    if (totalTripDaysCalculated !== sumZoneDaysFromForm) {
      setQuoteResult({
        ok: false,
        message: `Zone days sum (${sumZoneDaysFromForm}) does not match total trip days (${totalTripDaysCalculated}). Please ensure dates and zone days are consistent.`,
        warnings: []
      });
      return;
    }

    const payload: GenerateQuotePayload = {
      trip_start_date: startDate.toDate(),
      trip_end_date: endDate.toDate(),
      trip_country: formValues.trip_countries[0] as string,
      travellers_count: (formValues.travellers?.length > 0 ? formValues.travellers.length : 1) as Integer,
      medical_coverage: formValues.emergency_medical_coverage as GenerateQuotePayload['medical_coverage'],
      pa_coverage: formValues.personal_accident_coverage_level as GenerateQuotePayload['pa_coverage'],
      transit_coverage: formValues.add_transit_coverage,
      green_zone_days: Number(formValues.green_zone_days || 0) as Integer,
      amber_zone_days: Number(formValues.amber_zone_days || 0) as Integer,
      red_zone_days: Number(formValues.red_zone_days || 0) as Integer,
      black_zone_days: Number(formValues.black_zone_days || 0) as Integer,
    };

    const result = generateQuote(payload);
    setQuoteResult(result);

  }, [
    watchedStartDate,
    watchedEndDate,
    watchedTripCountriesForQuote,
    watchedTravellersForQuote,
    watchedMedicalCoverageForQuote,
    watchedPaCoverageForQuote,
    watchedTransitCoverageForQuote,
    watchedGreenZoneDaysForQuote,
    watchedAmberZoneDaysForQuote,
    watchedRedZoneDaysForQuote,
    watchedBlackZoneDaysForQuote,
    getValues,
    formState.errors
  ]);

  const onSubmitForm = (data: InsuranceFormValues) => {
    const finalTravellers = [...data.travellers];
    if (finalTravellers.length > 0) {
      finalTravellers[0] = {
        ...finalTravellers[0],
        first_name: getValues("c_first_name") || "",
        last_name: getValues("c_last_name") || "",
        birthdate: getValues("c_birthdate") || "",
        passport_number: getValues("c_passport_number") || "",
        passport_expiry_date: getValues("c_passport_expiry_date") || "",
      };
    } else {
      finalTravellers.push({
        first_name: getValues("c_first_name") || "",
        last_name: getValues("c_last_name") || "",
        birthdate: getValues("c_birthdate") || "",
        passport_number: getValues("c_passport_number") || "",
        passport_expiry_date: getValues("c_passport_expiry_date") || "",
      });
    }

    const finalData = {
      ...data,
      travellers: finalTravellers.map(t => ({
        first_name: t.first_name,
        last_name: t.last_name,
        birthdate: t.birthdate,
        passport_number: t.passport_number,
        passport_expiry_date: t.passport_expiry_date,
      })),
      c_phone: `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`,
      c_whats_app: getValues("c_is_whatsapp_same_as_phone")
        ? `${getValues("c_phone_code") || ''}${getValues("c_phone_number") || ''}`
        : `${getValues("c_whats_app_code") || ''}${getValues("c_whats_app_number") || ''}`,
      emergency_contact_phone: `${getValues("emergency_contact_phone_code") || ''}${getValues("emergency_contact_phone_number") || ''}`,
      green_zone_days: Number(data.green_zone_days),
      amber_zone_days: Number(data.amber_zone_days),
      red_zone_days: Number(data.red_zone_days),
      black_zone_days: data.black_zone_days ? Number(data.black_zone_days) : 0,
      medical_conditions: data.has_medical_conditions ? data.medical_conditions?.filter(item => item && item.trim() !== "") : [],
      allergies: data.has_allergies ? data.allergies?.filter(item => item && item.trim() !== "") : [],
      current_medications: data.has_current_medications ? data.current_medications?.filter(item => item && item.trim() !== "") : [],
      trip_cities: data.trip_cities ? data.trip_cities.filter(city => city.name && city.name.trim() !== "") : [],
      c_passport_number: getValues("c_passport_number"),
      c_passport_expiry_date: getValues("c_passport_expiry_date"),
      c_is_whatsapp_same_as_phone: getValues("c_is_whatsapp_same_as_phone"),
    };
    console.log("Form Data Submitted for Purchase:", finalData);
    console.log("Calculated Quote at submission:", quoteResult);
    alert(t("insuranceForm.submissionAlert", { returnObjects: true }));
  };

  const handleNextOrContinue = async () => {
    const currentStepFields = fieldsByStep[step] as Array<Path<InsuranceFormValues>>;
    const partFieldsToValidate: Path<InsuranceFormValues>[] = [];
    if (step === 1) {
      partFieldsToValidate.push(
        "c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number",
        "c_passport_number", "c_passport_expiry_date"
      );
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

      if (!firstErrorKeyOnCurrentStep && step === 1 && formState.errors.travellers) {
        const travellerErrors = formState.errors.travellers;
        if (Array.isArray(travellerErrors)) {
          for (let i = 0; i < travellerErrors.length; i++) {
            const specificTravellerErrors = travellerErrors[i] as undefined | Record<string, FieldError | undefined>;
            if (specificTravellerErrors) {
              const fieldsToCheck: (keyof InsuranceFormValues['travellers'][0])[] = ['first_name', 'last_name', 'birthdate', 'passport_number', 'passport_expiry_date'];
              for (const Tfield of fieldsToCheck) {
                if (specificTravellerErrors[Tfield]) {
                  firstErrorKeyOnCurrentStep = `travellers.${i}.${Tfield}` as Path<InsuranceFormValues>;
                  break;
                }
              }
            }
            if (firstErrorKeyOnCurrentStep) break;
          }
        }
      }
      if (!firstErrorKeyOnCurrentStep && step === 2 && formState.errors.trip_cities) {
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
      if (!firstErrorKeyOnCurrentStep && formState.errors.root?.message) {
        const zoneDayElement = document.querySelector(`[name='amber_zone_days']`) || document.querySelector(`[name='red_zone_days']`) || document.querySelector(`[name='green_zone_days']`);
        zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      if (firstErrorKeyOnCurrentStep) {
        const element = document.querySelector(`[name='${firstErrorKeyOnCurrentStep}']`) || document.getElementById(firstErrorKeyOnCurrentStep as string);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    if (step === 0) {
      const values = getValues();
      const startDate = dayjs(values.trip_start_date + "T00:00:00");
      const endDate = dayjs(values.trip_end_date + "T00:00:00");
      if (startDate.isValid() && endDate.isValid() && (endDate.isSame(startDate) || endDate.isAfter(startDate))) {
        const totalTripDays = endDate.diff(startDate, 'day') + 1;
        const sumZoneDays = Number(values.green_zone_days || 0) + Number(values.amber_zone_days || 0) + Number(values.red_zone_days || 0) + Number(values.black_zone_days || 0);
        if (totalTripDays !== sumZoneDays) {
          form.setError("root", { type: "manual", message: `Total Travel Days (${totalTripDays}) must equal the sum of Green, Amber, Red, and Black Zone Days (${sumZoneDays}).` });
          const zoneDayElement = document.querySelector(`[name='amber_zone_days']`) || document.querySelector(`[name='red_zone_days']`);
          zoneDayElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        } else {
          form.clearErrors("root");
        }
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

    if (isNaN(year) || isNaN(month) || isNaN(day)) return "";

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
    "c_passport_number", "c_passport_expiry_date",
  ] as const;

  const watchedValuesForSummary = watch(watchedPathsForSummary);
  const watchedTravellersForSummary = watch("travellers");
  const watchedTripCitiesForSummary = watch("trip_cities");

  const getEmergencyMedicalLabel = (value: string) => emergencyMedicalCoverageOptions.find(opt => opt.value === value)?.label || value || "N/A";
  const getPALabel = (value: string) => personalAccidentCoverageOptions.find(opt => opt.value === value)?.label || value || "N/A";
  const getTripPurposeLabel = (value: string) => tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") })).find(opt => opt.value === value)?.label || value || "N/A";
  const getNationalityLabel = (value: string) => nationalityOptions.find(opt => opt.value === value)?.label || value || "N/A";

  const formatFullName = (firstName?: string, lastName?: string): string => {
    const first = firstName || "";
    const last = lastName || "";
    if (first && last) return `${first} ${last}`;
    return first || last || "N/A";
  };

  const renderQuoteDisplay = () => {
    if (!quoteResult) return "$0.00 ";
    if (!quoteResult.ok) return `$0.00 (${quoteResult.message || "Error"})`;
    if (quoteResult.data) return `$${quoteResult.data.totalAmount.toFixed(2)}`;
    return "$0.00 (Unavailable)";
  };

  const renderQuoteWarnings = () => {
    if (quoteResult && quoteResult.ok && quoteResult.warnings && quoteResult.warnings.length > 0) {
      return (
        <div className="mt-1 text-xs text-orange-600">
          <strong>{t("insuranceForm.warnings")}:</strong>
          <ul className="list-disc list-inside pl-4">
            {quoteResult.warnings.map((warning, idx) => <li key={idx}>{warning}</li>)}
          </ul>
        </div>
      );
    }
    if (quoteResult && !quoteResult.ok && quoteResult.message) {
      if (quoteResult.message !== "Please correct form errors to see a quote.") {
        return (
          <div className="mt-1 text-xs text-red-600">
            <strong>{t("insuranceForm.quoteError")}:</strong> {quoteResult.message}
          </div>
        );
      }
    }
    return null;
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
                  {/* <DatePickerField
                    label={t("insuranceForm.travelStartDate")}
                    name="trip_start_date"
                    control={control}
                    error={getError("trip_start_date")}
                    placeholder={t("insuranceForm.selectStartDate")}
                    maxDate={watchedEndDate ? dayjs(watchedEndDate).toDate() : undefined}
                  /> */}
                  <DatePickerField
  label={t("insuranceForm.travelStartDate")}
  name="trip_start_date"
  control={control}
  error={getError("trip_start_date")}
  placeholder={t("insuranceForm.selectStartDate")}
  minDate={dayjs().add(1, 'day').startOf('day').toDate()} 
  maxDate={watchedEndDate ? dayjs(watchedEndDate).toDate() : undefined}
/>

                  {/* <DatePickerField
                    label={t("insuranceForm.travelEndDate")}
                    name="trip_end_date"
                    control={control}
                    error={getError("trip_end_date")}
                    placeholder={t("insuranceForm.selectEndDate")}
                    minDate={watchedStartDate ? dayjs(watchedStartDate).toDate() : undefined}
                  /> */}
                  <DatePickerField
  label={t("insuranceForm.travelEndDate")}
  name="trip_end_date"
  control={control}
  error={getError("trip_end_date")}
  placeholder={t("insuranceForm.selectEndDate")}
  minDate={
    watchedStartDate
      ? dayjs(watchedStartDate).add(1, "day").startOf("day").toDate()
      : undefined
  }
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

                {/* <SelectWithLabel
                  label={t('insuranceForm.step1.countryTravellingTo')}
                  name="trip_countries.0"
                  control={control}
                  options={countryOptions}
                  placeholder={t('insuranceForm.step1.selectCountry')}
                  error={getError("trip_countries.0" as Path<InsuranceFormValues>) || getError("trip_countries" as Path<InsuranceFormValues>)}
                /> */}
<SelectWithLabel
  label={t('insuranceForm.step1.countryTravellingTo')}
  name="trip_countries.0"
  control={control}
  options={countryTravellingToOptions}
  placeholder={t('insuranceForm.step1.selectCountry')}
  error={
    getError("trip_countries.0" as Path<InsuranceFormValues>) ||
    getError("trip_countries" as Path<InsuranceFormValues>)
  }
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
                  {/* <div className="flex items-center space-x-2">
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
                    <Label htmlFor="add_transit_coverage">{t("insuranceForm.addTransitCover")} <strong>$25</strong></Label>
                  </div> */}
                  <TooltipProvider>
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

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="add_transit_coverage">
                            {t("insuranceForm.addTransitCover")} <strong>$25</strong>
                          </Label>
                        </TooltipTrigger>

                        <TooltipContent side="bottom" align="start" sideOffset={4}>
                          <div className="relative">
                            <div className="bg-muted px-3 py-2 text-sm shadow">
                              {t("insuranceForm.addTransitCoverTooltip")}
                            </div>
                            <div className="absolute top-0 left-2.5 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-muted" />
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>

                {/* <div className="mt-8 p-6 bg-gray-50 rounded-md border">
                  <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">
                    {t("insuranceForm.quoteSummary")}
                  </h3>
                  <p className="text-2xl font-bold text-[#00BBD3]">{renderQuoteDisplay()}</p>
                  {renderQuoteWarnings()}
                  <div className="text-sm mt-2">
                    <p>
                      {t("insuranceForm.medical")}: {getEmergencyMedicalLabel(watch("emergency_medical_coverage"))}
                    </p>
                    <p>
                      {t("insuranceForm.pa")}: {getPALabel(watch("personal_accident_coverage_level"))}
                    </p>
                    <p>
                      {t("insuranceForm.transit")}: {" "}
                      {watch("add_transit_coverage") ? `${t("$")} ${pricing.transitCost.toFixed(2)}` : t("insuranceForm.no")}
                    </p>
                  </div>
                </div> */}


                <Button onClick={() => setShowQuote(true)} className="mt-6 w-full">
                  Get Quote
                </Button>

                {showQuote && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-md border">
                    <h3 className="text-xl font-semibold text-[#1A2C50] mb-2">
                      {t("insuranceForm.quoteSummary")}
                    </h3>
                    <p className="text-2xl font-bold text-[#00BBD3]">{renderQuoteDisplay()}</p>
                    {renderQuoteWarnings()}
                    <div className="text-sm mt-2">
                      <p>
                        {t("insuranceForm.medical")}:{" "}
                        {getEmergencyMedicalLabel(watch("emergency_medical_coverage"))}
                      </p>
                      <p>
                        {t("insuranceForm.pa")}:{" "}
                        {getPALabel(watch("personal_accident_coverage_level"))}
                      </p>
                      <p>
                        {t("insuranceForm.transit")}:{" "}
                        {watch("add_transit_coverage")
                          ? `${t("$")} ${pricing.transitCost.toFixed(2)}`
                          : t("insuranceForm.no")}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t('insuranceForm.step1.yourDetails')}</h2>

                <h3 className="text-lg font-semibold mb-3 text-[#1A2C50]">{t('insuranceForm.step1.primaryTraveller')}</h3>
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
                        <SelectWithLabel control={control} name="c_phone_code" label="" options={countryCodeOptions} placeholder={t("insuranceForm.step3.codePlaceholder")} error={getError("c_phone_code")} />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel label="" name="c_phone_number" type="tel" register={register} placeholder={t('insuranceForm.step1.enterNumber')} error={getError("c_phone_number")} />
                      </div>
                    </div>
                    {getError("c_phone") && <p className="text-sm text-red-500 mt-1">{getError("c_phone")?.message}</p>}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{t('insuranceForm.step1.whatsapp')}</p>
                    <div className="flex items-start gap-2">
                      <div className="w-1/3 shrink-0">
                        <SelectWithLabel
                          control={control}
                          name="c_whats_app_code"
                          label=""
                          options={countryCodeOptions}
                          placeholder={t("insuranceForm.step3.codePlaceholder")}
                          readOnly={cIsWhatsAppSameAsPhone}
                          error={getError("c_whats_app_code")}
                        />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel
                          label=""
                          name="c_whats_app_number"
                          type="tel"
                          register={register}
                          placeholder={t('insuranceForm.step1.enterNumber')}
                          readOnly={cIsWhatsAppSameAsPhone}
                          error={getError("c_whats_app_number")}
                        />
                      </div>
                    </div>
                    {getError("c_whats_app") && <p className="text-sm text-red-500 mt-1">{getError("c_whats_app")?.message}</p>}
                  </div>

                  <div className="md:col-span-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="c_is_whatsapp_same_as_phone"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="c_is_whatsapp_same_as_phone"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="c_is_whatsapp_same_as_phone">
                        {t("insuranceForm.step1.whatsappSameAsPhone")}
                      </Label>
                    </div>
                  </div>
                  <InputWithLabel label={t('insuranceForm.step1.email')} name="c_email" type="email" register={register} error={getError("c_email")} />
                  <SelectWithLabel label={t('insuranceForm.step1.nationality')} name="c_nationality" control={control} options={nationalityOptions} placeholder={t('insuranceForm.step1.selectNationality')} error={getError("c_nationality")} />
                  <SelectWithLabel
                    label={t('insuranceForm.step1.countryOfResidence')}
                    name="city_of_residence"
                    control={control}
                    options={countryOptions}
                    placeholder={t('insuranceForm.step1.selectCountry')}
                    error={getError("city_of_residence")}
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
                          {t(`insuranceForm.step1.additionalTraveller`)}
                        </h3>
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeTraveller(index)}>
                          {t("insuranceForm.step1.remove")}
                        </Button>
                      </div>
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
                <Button type="button" variant="outline" onClick={() => appendTraveller({
                  first_name: "",
                  last_name: "",
                  birthdate: "",
                  passport_number: "",
                  passport_expiry_date: ""
                })} className="mt-6">
                  {t("insuranceForm.step1.addAdditionalTraveller")}
                </Button>
                {getError("travellers" as Path<InsuranceFormValues>) && typeof getError("travellers" as Path<InsuranceFormValues>)?.message === 'string' &&
                  <p className="text-sm text-red-500 mt-1">{getError("travellers" as Path<InsuranceFormValues>)?.message}</p>}
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-[#1A2C50]">{t("insuranceForm.step2.title")}</h2>
                <div className="mt-6"><SelectWithLabel label={t("insuranceForm.step2.tripPurpose")} name="trip_purpose" control={control} options={tripPurposes.map(p => ({ value: p, label: p.charAt(0) + p.slice(1).toLowerCase().replace(/_/g, " ") }))} placeholder={t("insuranceForm.step2.selectTripPurpose")} error={getError("trip_purpose")} /></div>
                <div className="mt-6"><InputWithLabel label={t("insuranceForm.step2.primaryCities")} name="primary_cities_regions_ukraine" register={register} error={getError("primary_cities_regions_ukraine")} /></div>
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
                            label={t(`insuranceForm.step2.cityNameLabel${index + 1}`)}
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
                        <SelectWithLabel control={control} name="emergency_contact_phone_code" label="" options={countryCodeOptions} placeholder={t("insuranceForm.step3.codePlaceholder", { returnObjects: true })} error={getError("emergency_contact_phone_code")} />
                      </div>
                      <div className="flex-grow">
                        <InputWithLabel label="" name="emergency_contact_phone_number" type="tel" register={register} placeholder={t("insuranceForm.step3.numberPlaceholder")} error={getError("emergency_contact_phone_number")} />
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
                  {watch("has_current_medications") && (<ControlledTextareaArray name="current_medications" control={control} label={t("insuranceForm.step3.listMedications", { returnObjects: true })} error={getError("current_medications" as Path<InsuranceFormValues>)} />)}

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
                    <li>{t("insuranceForm.step4.summaryOfCoverage.zone.amber")}: {watch("amber_zone_days") || 0} days</li>
                    <li>{t("insuranceForm.step4.summaryOfCoverage.zone.red")}: {watch("red_zone_days") || 0} days</li>
                    {Number(watch("black_zone_days") || 0) > 0 && <li>{t("insuranceForm.step4.summaryOfCoverage.zone.black", { returnObjects: false })}: {watch("black_zone_days")} days</li>}
                  </ul>
                  <div><strong>{t("insuranceForm.step4.summaryOfCoverage.coverageSelected")}</strong></div>
                  <ul className="list-disc list-inside pl-4">
                    <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.medical")}: {getEmergencyMedicalLabel(watchedValuesForSummary[2])}</li>
                    <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.pa")}: {getPALabel(watchedValuesForSummary[3])}</li>
                    <li>{t("insuranceForm.step4.summaryOfCoverage.coverage.transit")}: {watchedValuesForSummary[4] ? { returnObjects: false } : t("insuranceForm.no")}</li>
                  </ul>
                  <div className="mt-4 pt-3 border-t">
                    <strong className="text-xl">{t("insuranceForm.step4.summaryOfCoverage.totalQuote")}:</strong>
                    <span className="text-xl font-bold text-[#00BBD3] ml-2">{renderQuoteDisplay()}</span>
                  </div>
                  {renderQuoteWarnings()}
                </div>

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.insuredDetails.title")}</h3>
                {watchedTravellersForSummary && watchedTravellersForSummary.map((traveller, index) => (
                  <div key={`summary-traveller-${index}`} className="space-y-1 p-4 bg-gray-50 rounded-md border mb-3">
                    <p className="font-semibold">
                      {index === 0
                        ? t("insuranceForm.step4.insuredDetails.primaryTraveller")
                        : `${t("insuranceForm.step4.insuredDetails.additionalTraveller")} ${index + 1}`}
                    </p>
                    <div><strong>{t("insuranceForm.step4.insuredDetails.name")}:</strong> {formatFullName(traveller.first_name, traveller.last_name)}</div>
                    <div><strong>{t("insuranceForm.step4.insuredDetails.age")}:</strong> {calculateAge(traveller.birthdate) || "N/A"}</div>
                    {index === 0 && <div><strong>{t("insuranceForm.step4.insuredDetails.nationality")}:</strong> {getNationalityLabel(watchedValuesForSummary[8])}</div>}
                  </div>
                ))}

                <h3 className="text-xl font-semibold text-[#1A2C50] mb-3">{t("insuranceForm.step4.tripInformation.title")}:</h3>
                <div className="space-y-1 p-4 bg-gray-50 rounded-md border mb-6">
                  <div><strong>{t("insuranceForm.step4.tripInformation.purpose")}:</strong> {getTripPurposeLabel(watchedValuesForSummary[9])}</div>
                  <div><strong>{t("insuranceForm.step4.tripInformation.primaryRegions")}:</strong> {watchedValuesForSummary[10] || "N/A"}</div>
                  {watchedTripCitiesForSummary && watchedTripCitiesForSummary.filter(city => city.name && city.name.trim() !== "").length > 0 && (
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
                <Button type="button" variant="outline" onClick={() => { alert(t("insuranceForm.actions.modifyChoicesAlert", { returnObjects: true })) }} className="w-full sm:w-auto px-8 py-3 text-base">
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
                  {formState.isSubmitting ? t("insuranceForm.actions.processing") : t("insuranceForm.actions.confirm")}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}