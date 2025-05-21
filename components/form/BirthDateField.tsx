// "use client";

// import { useController } from "react-hook-form";
// import { useEffect, useState } from "react";
// import ShadcnDatePicker from "../shadcn-date-picker";

// type Props = {
//   control: any;
//   getError: (field: string) => { message?: string } | undefined;
//   watch: any;
// };

// function calculateAge(date: string | Date): number {
//   const birthDate = new Date(date);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// }

// const BirthDateField = ({ control, getError, watch }: Props) => {
//   const {
//     field: { value, onChange },
//   } = useController({
//     name: "c_birthdate",
//     control,
//   });

//   const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());

//   useEffect(() => {
//     onChange(selectedDate);
//   }, [selectedDate, onChange]);

//   return (
//     <div>
//       <label className="block text-sm font-medium mt-1">
//         Date of Birth
//       </label>
//       <ShadcnDatePicker
//         startYear={1930}
//         endYear={new Date().getFullYear()}
//         selected={selectedDate}
//         onSelect={setSelectedDate}
//       />
//       {getError("c_birthdate") || getError("travellers.0.birthdate") ? (
//         <p className="text-sm text-red-500 mt-1">
//           {getError("c_birthdate")?.message ||
//             getError("travellers.0.birthdate")?.message}
//         </p>
//       ) : null}
//       {watch("c_birthdate") && (
//         <p className="text-sm text-gray-600 mt-1">
//           Age: {calculateAge(watch("c_birthdate"))}
//         </p>
//       )}
//     </div>
//   );
// };

// export default BirthDateField;

// "use client";

// import { useController } from "react-hook-form";
// import { useEffect, useState } from "react";
// import ShadcnDatePicker from "../shadcn-date-picker";

// type Props = {
//   name: string;
//   control: any;
//   getError: (field: string) => { message?: string } | undefined;
//   watch: any;
// };

// function calculateAge(date: string | Date): number {
//   const birthDate = new Date(date);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// }

// const BirthDateField = ({ name, control, getError, watch }: Props) => {
//   const {
//     field: { value, onChange },
//   } = useController({
//     name,
//     control,
//   });

//   const [selectedDate, setSelectedDate] = useState<Date>(
//     value ? new Date(value) : new Date()
//   );

//   useEffect(() => {
//     if (selectedDate) {
//       onChange(selectedDate);
//     }
//   }, [selectedDate, onChange]);

//   const error = getError(name);
//   const watchedDate = watch(name);

//   return (
//     <div className="w-full">
//       <label className="block text-sm font-medium mt-1">Date of Birth</label>
//       <ShadcnDatePicker
//         startYear={1930}
//         endYear={new Date().getFullYear()}
//         selected={selectedDate}
//         onSelect={setSelectedDate}
//       />
//       {error && (
//         <p className="text-sm text-red-500 mt-1">{error?.message}</p>
//       )}
//       {watchedDate && (
//         <p className="text-sm text-gray-600 mt-1">
//           Age: {calculateAge(watchedDate)}
//         </p>
//       )}
//     </div>
//   );
// };

// export default BirthDateField;

"use client";

import { useController, Control, FieldValues, Path, UseFormWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import ShadcnDatePicker from "../shadcn-date-picker"; 
import { Label } from "@/components/ui/label"; 

const parseDateStringForPicker = (dateString: string | undefined | null): Date | undefined => {
  if (!dateString) return undefined;
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const day = parseInt(parts[2], 10);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
       const date = new Date(year, month, day);
       if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
        return date;
       }
    }
  }
  return undefined; 
};

const formatDateToStringForRHF = (date: Date | undefined | null): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

type BirthDateFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  getError: (field: Path<TFieldValues>) => { message?: string } | undefined;
  watch: UseFormWatch<TFieldValues>;
  label?: string;
};

function calculateAgeFromYYYYMMDD(birthdateString: string): string {
  if (!birthdateString) return "";
  const birthDate = parseDateStringForPicker(birthdateString);
  if (!birthDate) return "";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age.toString() : "";
}

const BirthDateField = <TFieldValues extends FieldValues>({
  name,
  control,
  getError,
  watch,
  label = "Date of Birth",
}: BirthDateFieldProps<TFieldValues>) => {
  const {
    field: { value: rhfValue, onChange: rhfOnChange, onBlur: rhfOnBlur },
    fieldState: { error: rhfError }
  } = useController({
    name,
    control,
  });

  
  const [pickerDate, setPickerDate] = useState<Date>(() => {
    const parsedDate = parseDateStringForPicker(rhfValue as string);
    return parsedDate || new Date(); 
  });

  useEffect(() => {
    const newParsedRhfDate = parseDateStringForPicker(rhfValue as string);
    const targetPickerDate = newParsedRhfDate || new Date();

    if (formatDateToStringForRHF(targetPickerDate) !== formatDateToStringForRHF(pickerDate)) {
      setPickerDate(targetPickerDate);
    }
  }, [rhfValue, pickerDate]); 

  const handleDateSelect = (selectedDateFromPicker: Date | undefined) => {
    if (selectedDateFromPicker) {
      setPickerDate(selectedDateFromPicker);
      rhfOnChange(formatDateToStringForRHF(selectedDateFromPicker));
    } else {
      setPickerDate(new Date()); 
      rhfOnChange("");
    }
    rhfOnBlur(); 
  };

  const displayError = getError(name) || (rhfError ? { message: rhfError.message } : undefined);
  const watchedRHFDateString = watch(name) as string;

  return (
    <div className="w-full">
      <Label htmlFor={name} className="block text-sm font-medium mb-1">{label}</Label>
      <ShadcnDatePicker
        startYear={1930}
        endYear={new Date().getFullYear()}
        selected={pickerDate} 
        onSelect={handleDateSelect}
      />
      {displayError && (
        <p className="text-sm text-red-500 mt-1">{displayError?.message}</p>
      )}
      {watchedRHFDateString && calculateAgeFromYYYYMMDD(watchedRHFDateString) && ( 
        <p className="text-sm text-gray-600 mt-1">
          Age: {calculateAgeFromYYYYMMDD(watchedRHFDateString)}
        </p>
      )}
    </div>
  );
};

export default BirthDateField;
