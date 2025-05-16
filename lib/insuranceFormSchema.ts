// // 

// import Joi from "joi";
// import { Path } from "react-hook-form"; // Import Path

// // --- Enums / Constants for new fields ---
// export const कवरेजस्तरOptions = [ // coverage_level_options
//     { value: "50000", label: "$50,000" },
//     { value: "100000", label: "$100,000" },
//     { value: "250000", label: "$250,000" },
// ];

// // --- Main Schema ---
// export const purchaseWithoutLoginSchema = Joi.object({
//     // Page 1 Fields (Existing + New)
//     trip_start_date: Joi.date().required().messages({ "any.required": "Travel Start Date is required.", "date.base": "Travel Start Date must be a valid date." }),
//     trip_end_date: Joi.date().required().greater(Joi.ref('trip_start_date')).messages({
//         "any.required": "Travel End Date is required.",
//         "date.base": "Travel End Date must be a valid date.",
//         "date.greater": "Travel End Date must be after Travel Start Date."
//     }),
//     green_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
//     amber_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
//     red_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
//     black_zone_days: Joi.number().integer().optional().min(0).default(0).messages({ "number.min": "Black zone days must be at least 0." }), // Kept for reference

//     coverage_level: Joi.string().required().messages({ "string.empty": "Coverage Level is required." }),
//     add_transit_coverage: Joi.boolean().default(false),
//     add_personal_accident_coverage: Joi.boolean().default(false),

//     // Page 2 Fields (Mostly Existing)
//     c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
//     c_birthdate: Joi.date().required().messages({ "any.required": "Date of Birth is required.", "date.base": "Date of Birth must be a valid date." }),
//     c_phone: Joi.string().required().messages({ "string.empty": "Phone Number is required." }),
//     c_whats_app: Joi.string().optional().allow(""), // Made optional as per spec
//     c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email Address is required.", "string.email": "Email must be a valid email." }),
//     c_nationality: Joi.string().required().messages({ "string.empty": "Nationality is required." }),
//     // Renaming c_address to city_of_residence to match spec, assuming c_address was effectively city
//     city_of_residence: Joi.string().required().messages({ "string.empty": "City of Residence is required." }), // New field, or maps from c_address
//     trip_countries: Joi.array().items(Joi.string().required().messages({"string.empty": "Country Travelling To cannot be empty."})).required().min(1).max(1).messages({ // Max 1 for "Country Travelling To"
//         "array.base": "Country Travelling To is required.",
//         "array.min": "Country Travelling To is required."
//     }),

//     // Page 3 Fields (New + Existing)
//     arrival_in_ukraine: Joi.date().optional().allow(null, ''), // Assuming Ukraine specific, optional for now
//     departure_from_ukraine: Joi.date().optional().allow(null, '').greater(Joi.ref('arrival_in_ukraine')).messages({
//          "date.greater": "Departure from Ukraine must be after Arrival in Ukraine."
//     }),
//     primary_cities_regions_ukraine: Joi.string().optional().allow(""), // New field
//     trip_purpose: Joi.string().valid(
//         "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//         "EDUCATION", "PERSONAL", "OTHER"
//     ).required().messages({ "any.required": "Purpose of Travel is required.", "any.only": "Invalid Purpose of Travel." }),
//     stay_name: Joi.string().optional().allow(""), // Hotel/Accommodation Name
//     company_name: Joi.string().optional().allow(""), // Company Arranging Travel - removed conditional logic as is_company_arranged checkbox is gone

//     // Page 4 Fields (Existing)
//     emergency_contact_name: Joi.string().required().messages({ "string.empty": "Emergency Contact Name is required." }),
//     emergency_contact_phone: Joi.string().required().messages({ "string.empty": "Emergency Contact Number is required." }),
//     emergency_contact_relation: Joi.string().required().messages({ "string.empty": "Emergency Contact Relationship is required." }),

//     // Optional Medical Info Checkboxes (these control visibility of text areas in UI, not directly in schema as required complex data)
//     // The actual data fields are below
//     has_medical_conditions: Joi.boolean().default(false),
//     has_allergies: Joi.boolean().default(false),
//     has_current_medications: Joi.boolean().default(false),

//     // Optional Medical Info Data (Existing)
//     medical_conditions: Joi.when('has_medical_conditions', {
//         is: true,
//         then: Joi.array().items(Joi.string().trim().allow('')).min(1).messages({ "array.min": "Please list pre-existing medical conditions."}),
//         otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//     }),
//     allergies: Joi.when('has_allergies', {
//         is: true,
//         then: Joi.array().items(Joi.string().trim().allow('')).min(1).messages({ "array.min": "Please list allergies."}),
//         otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//     }),
//     current_medications: Joi.when('has_current_medications', {
//         is: true,
//         then: Joi.array().items(Joi.string().trim().allow('')).min(1).messages({ "array.min": "Please list current medications."}),
//         otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//     }),
//     blood_type: Joi.string().optional().allow(""),
//     special_assistance: Joi.string().optional().allow(""), // Special Assistance Requirements

//     // Page 5 Fields
//     affiliate_code: Joi.string().optional().allow(""),
//     consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent to share medical info.", "any.required": "Consent is required." }),

//     // Fields from original schema not explicitly in new spec, but kept for now or re-evaluated
//     c_organization: Joi.string().optional().allow(""), // Was on old page 1
//     trip_cities: Joi.array().items(Joi.object().keys({ // Was for detailed city/zone breakdown
//         id: Joi.string().optional().allow(""),
//         name: Joi.string().required(),
//         stay_name: Joi.string().optional().allow(""),
//         zoneType: Joi.string().valid("GREEN", "AMBER", "RED", "BLACK").required()
//     })).optional().min(0), // Making this optional as the new spec is simpler for cities/regions
//     travellers: Joi.array().items(Joi.object().keys({ // Assuming only one insured person for now based on "Your Details"
//         name: Joi.string().required().trim(),
//         birthdate: Joi.date().required(),
//     })).min(1).max(1).default([{ name: "", birthdate: "" }]), // Defaulting to one traveller, matching "Your Details"
//     is_company_arranged: Joi.boolean().default(false), // Kept, tied to company_name
// });

// // --- TypeScript Types ---
// export interface TripCity { // Kept for potential future use or if trip_cities is still used internally
//   id?: string;
//   name: string;
//   stay_name?: string;
//   zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
// }

// export interface Traveller { // Still relevant for the single insured person
//   name: string;
//   birthdate: string;
// }

// export type InsuranceFormValues = {
//   // Page 1
//   trip_start_date: string;
//   trip_end_date: string;
//   green_zone_days: number | string;
//   amber_zone_days: number | string;
//   red_zone_days: number | string;
//   black_zone_days?: number | string;
//   coverage_level: string;
//   add_transit_coverage: boolean;
//   add_personal_accident_coverage: boolean;

//   // Page 2
//   c_name: string;
//   c_birthdate: string;
//   c_phone: string;
//   c_whats_app?: string;
//   c_email: string;
//   c_nationality: string;
//   city_of_residence: string; // Replaces/maps from c_address
//   trip_countries: string[]; // For "Country Travelling To"

//   // Page 3
//   arrival_in_ukraine?: string;
//   departure_from_ukraine?: string;
//   primary_cities_regions_ukraine?: string;
//   trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
//   stay_name?: string; // Hotel/Accommodation
//   company_name?: string; // Company Arranging Travel

//   // Page 4
//   emergency_contact_name: string;
//   emergency_contact_phone: string;
//   emergency_contact_relation: string;
//   has_medical_conditions?: boolean; // Checkbox state
//   has_allergies?: boolean; // Checkbox state
//   has_current_medications?: boolean; // Checkbox state
//   medical_conditions?: string[];
//   allergies?: string[];
//   current_medications?: string[];
//   blood_type?: string;
//   special_assistance?: string;

//   // Page 5
//   affiliate_code?: string;
//   consent: boolean | undefined;

//   // Legacy/Internal fields
//   c_organization?: string;
//   trip_cities?: TripCity[]; // May not be directly edited in UI now
//   travellers: Traveller[]; // Should effectively be one traveller based on new UI
//   is_company_arranged?: boolean; // Linked to company_name
//   c_address?: string; // Keep for schema if needed, UI uses city_of_residence
// };

// // --- Stepper Configuration ---
// export const steps = [
//   "Trip & Coverage", // Page 1: Trip Details + Quote
//   "Your Details",    // Page 2: Insured Details
//   "Trip Information",// Page 3: Trip Details (Ukraine specific)
//   "Medical & Emergency", // Page 4: Medical & Emergency Contact
//   "Summary & Purchase" // Page 5: Final Summary + Purchase
// ];

// // --- Form Data Constants ---
// export const tripPurposes = [ // Kept from original, matches new spec
//     "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//     "EDUCATION", "PERSONAL", "OTHER"
// ];

// export const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"]; // Kept for reference or if trip_cities is used

// // --- Fields per Step for Validation ---
// export const fieldsByStep: Array<Array<Path<InsuranceFormValues>>> = [
//   // Page 1: Trip & Coverage
//   [
//     "trip_start_date", "trip_end_date",
//     "green_zone_days", "amber_zone_days", "red_zone_days", // black_zone_days is for reference
//     "coverage_level", "add_transit_coverage", "add_personal_accident_coverage"
//   ],
//   // Page 2: Your Details
//   [
//     "c_name", "c_birthdate", "c_phone", "c_whats_app", "c_email",
//     "c_nationality", "city_of_residence", "trip_countries"
//   ],
//   // Page 3: Trip Information
//   [
//     "arrival_in_ukraine", "departure_from_ukraine", "primary_cities_regions_ukraine",
//     "trip_purpose", "stay_name", "company_name"
//   ],
//   // Page 4: Medical & Emergency Contact
//   [
//     "emergency_contact_name", "emergency_contact_phone", "emergency_contact_relation",
//     "has_medical_conditions", "has_allergies", "has_current_medications", // Checkboxes
//     "medical_conditions", "allergies", "current_medications", // Conditional text areas
//     "blood_type", "special_assistance"
//   ],
//   // Page 5: Summary & Purchase
//   [
//     "affiliate_code", "consent"
//   ]
// ];

// // --- Dropdown Options ---
// // (nationalityOptions and countryOptions would ideally come from a data source or larger list)
// export const nationalityOptions = [
//     { value: "US", label: "United States" },
//     { value: "GB", label: "United Kingdom" },
//     { value: "CA", label: "Canada" },
//     { value: "DE", label: "Germany" },
//     { value: "FR", label: "France" },
//     { value: "UA", label: "Ukraine" },
//     // Add more common nationalities
// ];

// export const countryOptions = [ // For "Country Travelling To"
//     { value: "UA", label: "Ukraine" }, // Primary focus of the new spec
//     { value: "PL", label: "Poland" },
//     { value: "DE", label: "Germany" },
//     // Add other relevant countries
// ];


import Joi from "joi";
import { Path } from "react-hook-form";

// --- Enums / Constants for new fields ---
export const emergencyMedicalCoverageOptions = [
    { value: "50000", label: "$50,000" },
    { value: "100000", label: "$100,000" },
    { value: "150000", label: "$150,000" },
    { value: "200000", label: "$200,000" },
    { value: "250000", label: "$250,000" },
];

export const personalAccidentCoverageOptions = [
    { value: "0", label: "No PA Coverage" }, // Option for no PA
    { value: "50000", label: "$50,000" },
    { value: "100000", label: "$100,000" },
    { value: "150000", label: "$150,000" },
    { value: "200000", label: "$200,000" },
    { value: "250000", label: "$250,000" },
];


// --- Main Schema ---
export const purchaseWithoutLoginSchema = Joi.object({
    // Page 1 Fields
    trip_start_date: Joi.date().required().messages({ "any.required": "Travel Start Date is required.", "date.base": "Travel Start Date must be a valid date." }),
    trip_end_date: Joi.date().required().greater(Joi.ref('trip_start_date')).messages({
        "any.required": "Travel End Date is required.",
        "date.base": "Travel End Date must be a valid date.",
        "date.greater": "Travel End Date must be after Travel Start Date."
    }),
    // total_risk_zone_days: Joi.number().integer().min(0).optional(), // This will be calculated, not a direct form input for validation

    green_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Green Zone Days is required. Enter 0 if none.", "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
    amber_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Amber Zone Days is required. Enter 0 if none.", "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
    red_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Red Zone Days is required. Enter 0 if none.", "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
    black_zone_days: Joi.number().integer().optional().min(0).default(0),

    emergency_medical_coverage: Joi.string().required().messages({ "string.empty": "Emergency Medical Coverage is required." }),
    personal_accident_coverage_level: Joi.string().required().messages({ "string.empty": "PA Coverage Level is required." }), // Can be "0" for no PA
    add_transit_coverage: Joi.boolean().default(false),

    // Page 2 Fields
    c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
    c_birthdate: Joi.date().required().messages({ "any.required": "Date of Birth is required.", "date.base": "Date of Birth must be a valid date." }),
    c_phone: Joi.string().required().messages({ "string.empty": "Phone Number is required." }),
    c_whats_app: Joi.string().optional().allow(""),
    c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email Address is required.", "string.email": "Email must be a valid email." }),
    c_nationality: Joi.string().required().messages({ "string.empty": "Nationality is required." }),
    city_of_residence: Joi.string().required().messages({ "string.empty": "City of Residence is required." }),
    trip_countries: Joi.array().items(Joi.string().required().messages({"string.empty": "Country Travelling To cannot be empty."})).required().min(1).max(1).messages({
        "array.base": "Country Travelling To is required.",
        "array.min": "Country Travelling To is required."
    }),

    // Page 3 Fields
    arrival_in_ukraine: Joi.date().optional().allow(null, ''),
    departure_from_ukraine: Joi.date().optional().allow(null, '').greater(Joi.ref('arrival_in_ukraine')).messages({
         "date.greater": "Departure from Ukraine must be after Arrival in Ukraine."
    }),
    primary_cities_regions_ukraine: Joi.string().optional().allow(""),
    trip_purpose: Joi.string().valid(
        "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
        "EDUCATION", "PERSONAL", "OTHER"
    ).required().messages({ "any.required": "Purpose of Travel is required.", "any.only": "Invalid Purpose of Travel." }),
    stay_name: Joi.string().optional().allow(""),
    company_name: Joi.string().optional().allow(""),

    // Page 4 Fields
    emergency_contact_name: Joi.string().required().messages({ "string.empty": "Emergency Contact Name is required." }),
    emergency_contact_phone: Joi.string().required().messages({ "string.empty": "Emergency Contact Number is required." }),
    emergency_contact_relation: Joi.string().required().messages({ "string.empty": "Emergency Contact Relationship is required." }),
    has_medical_conditions: Joi.boolean().default(false),
    has_allergies: Joi.boolean().default(false),
    has_current_medications: Joi.boolean().default(false),
    medical_conditions: Joi.when('has_medical_conditions', {
        is: true,
        then: Joi.array().items(Joi.string().trim().allow('')).min(1).messages({ "array.min": "Please list pre-existing medical conditions."}),
        otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
    }),
    allergies: Joi.when('has_allergies', {
        is: true,
        then: Joi.array().items(Joi.string().trim().allow('')).min(1).messages({ "array.min": "Please list allergies."}),
        otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
    }),
    current_medications: Joi.when('has_current_medications', {
        is: true,
        then: Joi.array().items(Joi.string().trim().allow('')).min(1).messages({ "array.min": "Please list current medications."}),
        otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
    }),
    blood_type: Joi.string().optional().allow(""),
    special_assistance: Joi.string().optional().allow(""),

    // Page 5 Fields
    affiliate_code: Joi.string().optional().allow(""),
    consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent to share medical info.", "any.required": "Consent is required." }),

    // Legacy/Internal fields
    c_organization: Joi.string().optional().allow(""),
    trip_cities: Joi.array().items(Joi.object().keys({
        id: Joi.string().optional().allow(""),
        name: Joi.string().required(),
        stay_name: Joi.string().optional().allow(""),
        zoneType: Joi.string().valid("GREEN", "AMBER", "RED", "BLACK").required()
    })).optional().min(0),
    travellers: Joi.array().items(Joi.object().keys({
        name: Joi.string().required().trim(),
        birthdate: Joi.date().required(),
    })).min(1).max(1).default([{ name: "", birthdate: "" }]),
    is_company_arranged: Joi.boolean().default(false),
}).custom((value, helpers) => { // Custom validation for sum of zone days
    const totalCalculatedDays = (new Date(value.trip_end_date).getTime() - new Date(value.trip_start_date).getTime()) / (1000 * 3600 * 24) + 1;
    if (isNaN(totalCalculatedDays) || totalCalculatedDays < 0) {
        return value; // Let individual date validations handle this
    }
    const sumOfZoneDays = Number(value.green_zone_days || 0) + Number(value.amber_zone_days || 0) + Number(value.red_zone_days || 0);
    if (sumOfZoneDays !== totalCalculatedDays) {
        return helpers.error('object.sum', { field: 'zone_days_sum', sumOfZoneDays, totalCalculatedDays });
    }
    return value;
}).messages({
    'object.sum': 'The sum of Green, Amber, and Red Zone Days ({{#sumOfZoneDays}}) must equal the Total Risk Zone Days ({{#totalCalculatedDays}}). Please adjust.'
});


// --- TypeScript Types ---
export interface TripCity {
  id?: string;
  name: string;
  stay_name?: string;
  zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
}

export interface Traveller {
  name: string;
  birthdate: string;
}

export type InsuranceFormValues = {
  // Page 1
  trip_start_date: string;
  trip_end_date: string;
  // total_risk_zone_days?: number; // Calculated, not direct form input
  green_zone_days: number | string;
  amber_zone_days: number | string;
  red_zone_days: number | string;
  black_zone_days?: number | string;
  emergency_medical_coverage: string; // Changed from coverage_level
  personal_accident_coverage_level: string; // New
  add_transit_coverage: boolean;

  // Page 2
  c_name: string;
  c_birthdate: string;
  c_phone: string;
  c_whats_app?: string;
  c_email: string;
  c_nationality: string;
  city_of_residence: string;
  trip_countries: string[];

  // Page 3
  arrival_in_ukraine?: string;
  departure_from_ukraine?: string;
  primary_cities_regions_ukraine?: string;
  trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
  stay_name?: string;
  company_name?: string;

  // Page 4
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relation: string;
  has_medical_conditions?: boolean;
  has_allergies?: boolean;
  has_current_medications?: boolean;
  medical_conditions?: string[];
  allergies?: string[];
  current_medications?: string[];
  blood_type?: string;
  special_assistance?: string;

  // Page 5
  affiliate_code?: string;
  consent: boolean | undefined;

  // Legacy/Internal fields
  c_organization?: string;
  trip_cities?: TripCity[];
  travellers: Traveller[];
  is_company_arranged?: boolean;
};

// --- Stepper Configuration ---
export const steps = [
  "Trip & Coverage",
  "Your Details",
  "Trip Information",
  "Medical & Emergency",
  "Summary & Purchase"
];

// --- Form Data Constants ---
export const tripPurposes = [
    "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
    "EDUCATION", "PERSONAL", "OTHER"
];

export const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"];

// --- Fields per Step for Validation ---
export const fieldsByStep: Array<Array<Path<InsuranceFormValues>>> = [
  [
    "trip_start_date", "trip_end_date",
    "green_zone_days", "amber_zone_days", "red_zone_days",
    "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage"
  ],
  [
    "c_name", "c_birthdate", "c_phone", "c_whats_app", "c_email",
    "c_nationality", "city_of_residence", "trip_countries"
  ],
  [
    "arrival_in_ukraine", "departure_from_ukraine", "primary_cities_regions_ukraine",
    "trip_purpose", "stay_name", "company_name"
  ],
  [
    "emergency_contact_name", "emergency_contact_phone", "emergency_contact_relation",
    "has_medical_conditions", "has_allergies", "has_current_medications",
    "medical_conditions", "allergies", "current_medications",
    "blood_type", "special_assistance"
  ],
  [
    "affiliate_code", "consent"
  ]
];

export const nationalityOptions = [
    { value: "US", label: "United States" }, { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" }, { value: "DE", label: "Germany" },
    { value: "FR", label: "France" }, { value: "UA", label: "Ukraine" },
];

export const countryOptions = [
    { value: "UA", label: "Ukraine" }, { value: "PL", label: "Poland" },
    { value: "DE", label: "Germany" },
];