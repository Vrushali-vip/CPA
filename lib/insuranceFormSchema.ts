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


// import Joi from "joi";
// import { Path } from "react-hook-form";

// export const emergencyMedicalCoverageOptions = [
//     { value: "50000", label: "$50,000" },
//     { value: "100000", label: "$100,000" },
//     { value: "150000", label: "$150,000" },
//     { value: "200000", label: "$200,000" },
//     { value: "250000", label: "$250,000" },
// ];

// export const personalAccidentCoverageOptions = [
//     { value: "0", label: "No PA Coverage" }, // Option for no PA
//     { value: "50000", label: "$50,000" },
//     { value: "100000", label: "$100,000" },
//     { value: "150000", label: "$150,000" },
//     { value: "200000", label: "$200,000" },
//     { value: "250000", label: "$250,000" },
// ];


// // --- Main Schema ---
// export const purchaseWithoutLoginSchema = Joi.object({
//     // Page 1 Fields
//     trip_start_date: Joi.date().required().messages({ "any.required": "Travel Start Date is required.", "date.base": "Travel Start Date must be a valid date." }),
//     trip_end_date: Joi.date().required().greater(Joi.ref('trip_start_date')).messages({
//         "any.required": "Travel End Date is required.",
//         "date.base": "Travel End Date must be a valid date.",
//         "date.greater": "Travel End Date must be after Travel Start Date."
//     }),
//     // total_risk_zone_days: Joi.number().integer().min(0).optional(), // This will be calculated, not a direct form input for validation

//     green_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Green Zone Days is required. Enter 0 if none.", "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
//     amber_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Amber Zone Days is required. Enter 0 if none.", "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
//     red_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Red Zone Days is required. Enter 0 if none.", "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
//     black_zone_days: Joi.number().integer().optional().min(0).default(0),

//     emergency_medical_coverage: Joi.string().required().messages({ "string.empty": "Emergency Medical Coverage is required." }),
//     personal_accident_coverage_level: Joi.string().required().messages({ "string.empty": "PA Coverage Level is required." }), // Can be "0" for no PA
//     add_transit_coverage: Joi.boolean().default(false),

//     // Page 2 Fields
//     c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
//     c_birthdate: Joi.date().required().messages({ "any.required": "Date of Birth is required.", "date.base": "Date of Birth must be a valid date." }),
//     c_phone: Joi.string().required().messages({ "string.empty": "Phone Number is required." }),
//     c_whats_app: Joi.string().optional().allow(""),
//     c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email Address is required.", "string.email": "Email must be a valid email." }),
//     c_nationality: Joi.string().required().messages({ "string.empty": "Nationality is required." }),
//     city_of_residence: Joi.string().required().messages({ "string.empty": "City of Residence is required." }),
//     trip_countries: Joi.array().items(Joi.string().required().messages({"string.empty": "Country Travelling To cannot be empty."})).required().min(1).max(1).messages({
//         "array.base": "Country Travelling To is required.",
//         "array.min": "Country Travelling To is required."
//     }),

//     // Page 3 Fields
//     arrival_in_ukraine: Joi.date().optional().allow(null, ''),
//     departure_from_ukraine: Joi.date().optional().allow(null, '').greater(Joi.ref('arrival_in_ukraine')).messages({
//          "date.greater": "Departure from Ukraine must be after Arrival in Ukraine."
//     }),
//     primary_cities_regions_ukraine: Joi.string().optional().allow(""),
//     trip_purpose: Joi.string().valid(
//         "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//         "EDUCATION", "PERSONAL", "OTHER"
//     ).required().messages({ "any.required": "Purpose of Travel is required.", "any.only": "Invalid Purpose of Travel." }),
//     stay_name: Joi.string().optional().allow(""),
//     company_name: Joi.string().optional().allow(""),

//     // Page 4 Fields
//     emergency_contact_name: Joi.string().required().messages({ "string.empty": "Emergency Contact Name is required." }),
//     emergency_contact_phone: Joi.string().required().messages({ "string.empty": "Emergency Contact Number is required." }),
//     emergency_contact_relation: Joi.string().required().messages({ "string.empty": "Emergency Contact Relationship is required." }),
//     has_medical_conditions: Joi.boolean().default(false),
//     has_allergies: Joi.boolean().default(false),
//     has_current_medications: Joi.boolean().default(false),
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
//     special_assistance: Joi.string().optional().allow(""),

//     // Page 5 Fields
//     affiliate_code: Joi.string().optional().allow(""),
//     consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent to share medical info.", "any.required": "Consent is required." }),

//     // Legacy/Internal fields
//     c_organization: Joi.string().optional().allow(""),
//     trip_cities: Joi.array().items(Joi.object().keys({
//         id: Joi.string().optional().allow(""),
//         name: Joi.string().required(),
//         stay_name: Joi.string().optional().allow(""),
//         zoneType: Joi.string().valid("GREEN", "AMBER", "RED", "BLACK").required()
//     })).optional().min(0),
//     travellers: Joi.array().items(Joi.object().keys({
//         name: Joi.string().required().trim(),
//         birthdate: Joi.date().required(),
//     })).min(1).max(1).default([{ name: "", birthdate: "" }]),
//     is_company_arranged: Joi.boolean().default(false),
// }).custom((value, helpers) => { // Custom validation for sum of zone days
//     const totalCalculatedDays = (new Date(value.trip_end_date).getTime() - new Date(value.trip_start_date).getTime()) / (1000 * 3600 * 24) + 1;
//     if (isNaN(totalCalculatedDays) || totalCalculatedDays < 0) {
//         return value; // Let individual date validations handle this
//     }
//     const sumOfZoneDays = Number(value.green_zone_days || 0) + Number(value.amber_zone_days || 0) + Number(value.red_zone_days || 0);
//     if (sumOfZoneDays !== totalCalculatedDays) {
//         return helpers.error('object.sum', { field: 'zone_days_sum', sumOfZoneDays, totalCalculatedDays });
//     }
//     return value;
// }).messages({
//     'object.sum': 'The sum of Green, Amber, and Red Zone Days ({{#sumOfZoneDays}}) must equal the Total Risk Zone Days ({{#totalCalculatedDays}}). Please adjust.'
// });


// // --- TypeScript Types ---
// export interface TripCity {
//   id?: string;
//   name: string;
//   stay_name?: string;
//   zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
// }

// export interface Traveller {
//   name: string;
//   birthdate: string;
// }

// export type InsuranceFormValues = {
//   // Page 1
//   trip_start_date: string;
//   trip_end_date: string;
//   // total_risk_zone_days?: number; // Calculated, not direct form input
//   green_zone_days: number | string;
//   amber_zone_days: number | string;
//   red_zone_days: number | string;
//   black_zone_days?: number | string;
//   emergency_medical_coverage: string; // Changed from coverage_level
//   personal_accident_coverage_level: string; // New
//   add_transit_coverage: boolean;

//   // Page 2
//   c_name: string;
//   c_birthdate: string;
//   c_phone: string;
//   c_whats_app?: string;
//   c_email: string;
//   c_nationality: string;
//   city_of_residence: string;
//   trip_countries: string[];

//   // Page 3
//   arrival_in_ukraine?: string;
//   departure_from_ukraine?: string;
//   primary_cities_regions_ukraine?: string;
//   trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
//   stay_name?: string;
//   company_name?: string;

//   // Page 4
//   emergency_contact_name: string;
//   emergency_contact_phone: string;
//   emergency_contact_relation: string;
//   has_medical_conditions?: boolean;
//   has_allergies?: boolean;
//   has_current_medications?: boolean;
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
//   trip_cities?: TripCity[];
//   travellers: Traveller[];
//   is_company_arranged?: boolean;
// };

// // --- Stepper Configuration ---
// export const steps = [
//   "Trip & Coverage",
//   "Your Details",
//   "Trip Information",
//   "Medical & Emergency",
//   "Summary & Purchase"
// ];

// // --- Form Data Constants ---
// export const tripPurposes = [
//     "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//     "EDUCATION", "PERSONAL", "OTHER"
// ];

// export const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"];

// // --- Fields per Step for Validation ---
// export const fieldsByStep: Array<Array<Path<InsuranceFormValues>>> = [
//   [
//     "trip_start_date", "trip_end_date",
//     "green_zone_days", "amber_zone_days", "red_zone_days",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage"
//   ],
//   [
//     "c_name", "c_birthdate", "c_phone", "c_whats_app", "c_email",
//     "c_nationality", "city_of_residence", "trip_countries"
//   ],
//   [
//     "arrival_in_ukraine", "departure_from_ukraine", "primary_cities_regions_ukraine",
//     "trip_purpose", "stay_name", "company_name"
//   ],
//   [
//     "emergency_contact_name", "emergency_contact_phone", "emergency_contact_relation",
//     "has_medical_conditions", "has_allergies", "has_current_medications",
//     "medical_conditions", "allergies", "current_medications",
//     "blood_type", "special_assistance"
//   ],
//   [
//     "affiliate_code", "consent"
//   ]
// ];

// export const nationalityOptions = [
//     { value: "US", label: "United States" }, { value: "GB", label: "United Kingdom" },
//     { value: "CA", label: "Canada" }, { value: "DE", label: "Germany" },
//     { value: "FR", label: "France" }, { value: "UA", label: "Ukraine" },
// ];

// export const countryOptions = [
//     { value: "UA", label: "Ukraine" }, { value: "PL", label: "Poland" },
//     { value: "DE", label: "Germany" },
// ];

// import Joi from "joi";
// import { Path } from "react-hook-form";

// export const emergencyMedicalCoverageOptions = [
//     // Make sure first option isn't value="" if it's not meant as a placeholder handled by SelectValue
//     // If a "Select..." option is desired, it should be handled by the placeholder prop of SelectWithLabel
//     { value: "50000", label: "$50,000" },
//     { value: "100000", label: "$100,000" },
//     { value: "150000", label: "$150,000" },
//     { value: "200000", label: "$200,000" },
//     { value: "250000", label: "$250,000" },
// ];

// export const personalAccidentCoverageOptions = [
//     { value: "0", label: "No PA Coverage" },
//     { value: "50000", label: "$50,000" },
//     { value: "100000", label: "$100,000" },
//     { value: "150000", label: "$150,000" },
//     { value: "200000", label: "$200,000" },
//     { value: "250000", label: "$250,000" },
// ];


// // --- Main Schema ---
// export const purchaseWithoutLoginSchema = Joi.object({
//     trip_start_date: Joi.date().iso().required().messages({ "any.required": "Travel Start Date is required.", "date.base": "Travel Start Date must be a valid date." }),
//     trip_end_date: Joi.date().iso().required().greater(Joi.ref('trip_start_date')).messages({
//         "any.required": "Travel End Date is required.",
//         "date.base": "Travel End Date must be a valid date.",
//         "date.greater": "Travel End Date must be after Travel Start Date."
//     }),

//     green_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Green Zone Days is required. Enter 0 if none.", "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
//     amber_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Amber Zone Days is required. Enter 0 if none.", "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
//     red_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Red Zone Days is required. Enter 0 if none.", "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
//     black_zone_days: Joi.number().integer().optional().min(0).default(0),

//     emergency_medical_coverage: Joi.string().required().messages({ "any.required": "Emergency Medical Coverage is required.", "string.empty": "Emergency Medical Coverage is required." }),
//     personal_accident_coverage_level: Joi.string().required().messages({ "any.required": "PA Coverage Level is required.", "string.empty": "PA Coverage Level is required." }),
//     add_transit_coverage: Joi.boolean().default(false),

//     c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
//     c_birthdate: Joi.date().iso().required().messages({ "any.required": "Date of Birth is required.", "date.base": "Date of Birth must be a valid date." }),
//     c_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Phone Number is required.", "string.min": "Phone Number seems too short." }),
//     c_whats_app: Joi.string().optional().allow("").trim().min(5).messages({ "string.min": "WhatsApp Number seems too short (if provided)."}),
//     c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email Address is required.", "string.email": "Email must be a valid email." }),
//     c_nationality: Joi.string().required().messages({ "any.required": "Nationality is required.", "string.empty": "Nationality is required." }), // Updated required message
//     city_of_residence: Joi.string().required().trim().messages({ "string.empty": "City of Residence is required." }),
//     trip_countries: Joi.array().items(Joi.string().required().messages({"any.required": "Country Travelling To is required.","string.empty": "Country Travelling To cannot be empty."})).required().min(1).max(1).messages({
//         "array.base": "Country Travelling To is required.",
//         "array.min": "Country Travelling To is required."
//     }),

//     arrival_in_ukraine: Joi.date().iso().optional().allow(null, ''),
//     departure_from_ukraine: Joi.date().iso().optional().allow(null, '').greater(Joi.ref('arrival_in_ukraine')).messages({
//          "date.greater": "Departure from Ukraine must be after Arrival in Ukraine."
//     }),
//     primary_cities_regions_ukraine: Joi.string().optional().allow(""),
//     trip_purpose: Joi.string().valid(
//         "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//         "EDUCATION", "PERSONAL", "OTHER"
//     ).required().messages({ "any.required": "Purpose of Travel is required.", "any.only": "Invalid Purpose of Travel." }),
//     stay_name: Joi.string().optional().allow(""),
//     company_name: Joi.string().optional().allow(""),

//     emergency_contact_name: Joi.string().required().trim().messages({ "string.empty": "Emergency Contact Name is required." }),
//     emergency_contact_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Emergency Contact Number is required.", "string.min": "Emergency Contact Number seems too short." }),
//     emergency_contact_relation: Joi.string().required().trim().messages({ "string.empty": "Emergency Contact Relationship is required." }),
//     has_medical_conditions: Joi.boolean().default(false),
//     has_allergies: Joi.boolean().default(false),
//     has_current_medications: Joi.boolean().default(false),
//     medical_conditions: Joi.when('has_medical_conditions', {
//         is: true,
//         then: Joi.array().items(Joi.string().trim().allow('')).min(1).required().messages({ "array.min": "Please list pre-existing medical conditions.", "any.required": "Please list pre-existing medical conditions."}),
//         otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//     }),
//     allergies: Joi.when('has_allergies', {
//         is: true,
//         then: Joi.array().items(Joi.string().trim().allow('')).min(1).required().messages({ "array.min": "Please list allergies.", "any.required": "Please list allergies."}),
//         otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//     }),
//     current_medications: Joi.when('has_current_medications', {
//         is: true,
//         then: Joi.array().items(Joi.string().trim().allow('')).min(1).required().messages({ "array.min": "Please list current medications.", "any.required": "Please list current medications."}),
//         otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//     }),
//     blood_type: Joi.string().optional().allow(""),
//     special_assistance: Joi.string().optional().allow(""),

//     affiliate_code: Joi.string().optional().allow(""),
//     consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent to share medical info.", "any.required": "Consent is required." }),

//     c_organization: Joi.string().optional().allow(""),
//     trip_cities: Joi.array().items(Joi.object().keys({
//         id: Joi.string().optional().allow(""),
//         name: Joi.string().required(),
//         stay_name: Joi.string().optional().allow(""),
//         zoneType: Joi.string().valid("GREEN", "AMBER", "RED", "BLACK").required()
//     })).optional().min(0),
//     travellers: Joi.array().items(Joi.object().keys({
//         name: Joi.string().required().trim(),
//         birthdate: Joi.date().iso().required(),
//     })).min(1).max(1).default([{ name: "", birthdate: "" }]),
//     is_company_arranged: Joi.boolean().default(false),

//     c_phone_code: Joi.string().optional().allow(""),
//     c_phone_number: Joi.string().optional().allow(""),
//     c_whats_app_code: Joi.string().optional().allow(""),
//     c_whats_app_number: Joi.string().optional().allow(""),
//     emergency_contact_phone_code: Joi.string().optional().allow(""),
//     emergency_contact_phone_number: Joi.string().optional().allow(""),

// }).custom((value, helpers) => {
//     if (!value.trip_start_date || !value.trip_end_date) return value;
//     const startDate = new Date(value.trip_start_date);
//     const endDate = new Date(value.trip_end_date);
//     if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
//         return value; 
//     }
//     const totalCalculatedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

//     const sumOfZoneDays = Number(value.green_zone_days || 0) + Number(value.amber_zone_days || 0) + Number(value.red_zone_days || 0);
//     if (sumOfZoneDays !== totalCalculatedDays) {
//         return helpers.error('object.sum', { field: 'zone_days_sum', sumOfZoneDays, totalCalculatedDays });
//     }
//     return value;
// }).messages({
//     'object.sum': 'The sum of Green, Amber, and Red Zone Days ({{#sumOfZoneDays}}) must equal the Total Travel Days ({{#totalCalculatedDays}}). Please adjust.'
// });


// // --- TypeScript Types ---
// export interface TripCity {
//   id?: string;
//   name: string;
//   stay_name?: string;
//   zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
// }

// export interface Traveller {
//   name: string;
//   birthdate: string; 
// }

// export type InsuranceFormValues = {
//   trip_start_date: string;
//   trip_end_date: string;
//   green_zone_days: number | string;
//   amber_zone_days: number | string;
//   red_zone_days: number | string;
//   black_zone_days?: number | string;
//   emergency_medical_coverage: string;
//   personal_accident_coverage_level: string;
//   add_transit_coverage: boolean;

//   c_name: string;
//   c_birthdate: string;
//   c_phone: string;
//   c_whats_app?: string;
//   c_email: string;
//   c_nationality: string;
//   city_of_residence: string;
//   trip_countries: string[];

//   arrival_in_ukraine?: string;
//   departure_from_ukraine?: string;
//   primary_cities_regions_ukraine?: string;
//   trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
//   stay_name?: string;
//   company_name?: string;

//   emergency_contact_name: string;
//   emergency_contact_phone: string;
//   emergency_contact_relation: string;
//   has_medical_conditions?: boolean;
//   has_allergies?: boolean;
//   has_current_medications?: boolean;
//   medical_conditions?: string[];
//   allergies?: string[];
//   current_medications?: string[];
//   blood_type?: string;
//   special_assistance?: string;

//   affiliate_code?: string;
//   consent: boolean | undefined;

//   c_organization?: string;
//   trip_cities?: TripCity[];
//   travellers: Traveller[];
//   is_company_arranged?: boolean;

//   c_phone_code?: string;
//   c_phone_number?: string;
//   c_whats_app_code?: string;
//   c_whats_app_number?: string;
//   emergency_contact_phone_code?: string;
//   emergency_contact_phone_number?: string;
// };

// // --- Stepper Configuration ---
// export const steps = [
//   "Trip & Coverage",
//   "Your Details",
//   "Trip Information",
//   "Medical & Emergency",
//   "Summary & Purchase"
// ];

// // --- Form Data Constants ---
// export const tripPurposes = [
//     // Ensure no { value: "", label: "Select..." } here if it's purely for selection
//     "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//     "EDUCATION", "PERSONAL", "OTHER"
// ];

// export const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"];

// export const fieldsByStep: Array<Array<Path<InsuranceFormValues>>> = [
//   [
//     "trip_start_date", "trip_end_date",
//     "green_zone_days", "amber_zone_days", "red_zone_days",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage"
//   ],
//   [
//     "c_name", "c_birthdate", "c_phone", "c_whats_app", "c_email",
//     "c_nationality", "city_of_residence", "trip_countries"
//   ],
//   [
//     "primary_cities_regions_ukraine",
//     "trip_purpose", "stay_name", "company_name"
//   ],
//   [
//     "emergency_contact_name", "emergency_contact_phone", "emergency_contact_relation",
//     "has_medical_conditions", "has_allergies", "has_current_medications",
//     "medical_conditions", "allergies", "current_medications",
//     "blood_type", "special_assistance"
//   ],
//   [
//     "affiliate_code", "consent"
//   ]
// ];

// export const nationalityOptions = [
//     // { value: "", label: "Select Nationality" }, // REMOVED - handled by placeholder
//     { value: "US", label: "United States" }, { value: "GB", label: "United Kingdom" },
//     { value: "CA", label: "Canada" }, { value: "DE", label: "Germany" },
//     { value: "FR", label: "France" }, { value: "UA", label: "Ukraine" },
// ];

// export const countryOptions = [
//     // { value: "", label: "Select Country" }, // REMOVED - handled by placeholder
//     { value: "UA", label: "Ukraine" }, { value: "PL", label: "Poland" },
//     { value: "DE", label: "Germany" },
// ];

// import Joi from "joi";
// import { Path } from "react-hook-form";

// export const emergencyMedicalCoverageOptions = [
//     { value: "50000", label: "$50,000" },
//     { value: "100000", label: "$100,000" },
//     { value: "150000", label: "$150,000" },
//     { value: "200000", label: "$200,000" },
//     { value: "250000", label: "$250,000" },
// ];

// export const personalAccidentCoverageOptions = [
//     { value: "0", label: "No PA Coverage" },
//     { value: "50000", label: "$50,000" },
//     { value: "100000", label: "$100,000" },
//     { value: "150000", label: "$150,000" },
//     { value: "200000", label: "$200,000" },
//     { value: "250000", label: "$250,000" },
// ];


// // --- Main Schema ---
// export const purchaseWithoutLoginSchema = Joi.object({
//     trip_start_date: Joi.date()
//   .required()
//   .messages({
//     "any.required": "Travel Start Date is required.",
//     "date.base": "Enter valid date.",
//   }),

// trip_end_date: Joi.date()
//   .required()
//   .greater(Joi.ref("trip_start_date"))
//   .messages({
//     "any.required": "Travel End Date is required.",
//     "date.base": "Enter valid date.",
//     "date.greater": "Travel End Date must be after Travel Start Date.",
//   }),


//     green_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Green Zone Days is required. Enter 0 if none.", "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
//     amber_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Amber Zone Days is required. Enter 0 if none.", "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
//     red_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Red Zone Days is required. Enter 0 if none.", "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
//     black_zone_days: Joi.number().integer().optional().min(0).default(0),

//     emergency_medical_coverage: Joi.string().required().messages({ "any.required": "Emergency Medical Coverage is required.", "string.empty": "Emergency Medical Coverage is required." }),
//     personal_accident_coverage_level: Joi.string().required().messages({ "any.required": "PA Coverage Level is required.", "string.empty": "PA Coverage Level is required." }),
//     add_transit_coverage: Joi.boolean().default(false),

//     c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
//     c_birthdate: Joi.date().required().messages({ "any.required": "Date of Birth is required.", "date.base": "Date of Birth must be a valid date." }),
//     c_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Phone Number is required.", "string.min": "Phone Number seems too short." }),
//     c_whats_app: Joi.string().optional().allow("").trim().min(5).messages({ "string.min": "WhatsApp Number seems too short (if provided)."}),
//     c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email Address is required.", "string.email": "Email must be a valid email." }),
//     c_nationality: Joi.string().required().messages({ "any.required": "Nationality is required.", "string.empty": "Nationality is required." }),
//     city_of_residence: Joi.string().required().trim().messages({ "string.empty": "City of Residence is required." }),
//     trip_countries: Joi.array().items(Joi.string().required().messages({"any.required": "Country Travelling To is required.","string.empty": "Country Travelling To cannot be empty."})).required().min(1).max(1).messages({ 
//         "array.base": "Country Travelling To is required.",
//         "array.min": "Country Travelling To is required."
//     }),

//     travellers: Joi.array().items(Joi.object().keys({
//         name: Joi.string().required().trim().messages({ "string.empty": "Traveller Name is required." }),
//         birthdate: Joi.date().iso().required().messages({ "any.required": "Traveller Date of Birth is required.", "date.base": "Traveller Date of Birth must be valid." }),
//     })).min(1).messages({ "array.min": "At least one traveller is required."}), 

//     arrival_in_ukraine: Joi.date().iso().optional().allow(null, ''),
//     departure_from_ukraine: Joi.date().iso().optional().allow(null, '').greater(Joi.ref('arrival_in_ukraine')).messages({
//          "date.greater": "Departure from Ukraine must be after Arrival in Ukraine."
//     }),
//     primary_cities_regions_ukraine: Joi.string().optional().allow(""),

//     trip_cities: Joi.array().items(Joi.object().keys({
//         id: Joi.string().optional().allow(""), 
//         name: Joi.string().required().trim().messages({ "string.empty": "City Name is required."}),
//         stay_name: Joi.string().optional().allow(""), 
//         zoneType: Joi.string().valid("GREEN", "AMBER", "RED", "BLACK").required().messages({"any.required": "Zone type for city is required."}) // Defaulted in UI
//     })).optional().min(0),

//     trip_purpose: Joi.string().valid(
//         "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//         "EDUCATION", "PERSONAL", "OTHER"
//     ).required().messages({ "any.required": "Purpose of Travel is required.", "any.only": "Invalid Purpose of Travel." }),
//     stay_name: Joi.string().optional().allow(""),
//     company_name: Joi.string().optional().allow(""),

//     emergency_contact_name: Joi.string().required().trim().messages({ "string.empty": "Emergency Contact Name is required." }),
//     emergency_contact_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Emergency Contact Number is required.", "string.min": "Emergency Contact Number seems too short." }),
//     emergency_contact_relation: Joi.string().required().trim().messages({ "string.empty": "Emergency Contact Relationship is required." }),
//     has_medical_conditions: Joi.boolean().default(false),
//     has_allergies: Joi.boolean().default(false),
//     has_current_medications: Joi.boolean().default(false),
//     medical_conditions: Joi.when('has_medical_conditions', {
//         is: true,
//         then: Joi.array().items(Joi.string().trim().allow('')).min(1).required().messages({ "array.min": "Please list pre-existing medical conditions.", "any.required": "Please list pre-existing medical conditions."}),
//         otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//     }),
//     allergies: Joi.when('has_allergies', {
//         is: true,
//         then: Joi.array().items(Joi.string().trim().allow('')).min(1).required().messages({ "array.min": "Please list allergies.", "any.required": "Please list allergies."}),
//         otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//     }),
//     current_medications: Joi.when('has_current_medications', {
//         is: true,
//         then: Joi.array().items(Joi.string().trim().allow('')).min(1).required().messages({ "array.min": "Please list current medications.", "any.required": "Please list current medications."}),
//         otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//     }),
//     blood_type: Joi.string().optional().allow(""),
//     special_assistance: Joi.string().optional().allow(""),

//     affiliate_code: Joi.string().optional().allow(""),
//     consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent to share medical info.", "any.required": "Consent is required." }),

//     c_organization: Joi.string().optional().allow(""),
//     is_company_arranged: Joi.boolean().default(false),

//     c_phone_code: Joi.string().optional().allow(""),
//     c_phone_number: Joi.string().optional().allow(""),
//     c_whats_app_code: Joi.string().optional().allow(""),
//     c_whats_app_number: Joi.string().optional().allow(""),
//     emergency_contact_phone_code: Joi.string().optional().allow(""),
//     emergency_contact_phone_number: Joi.string().optional().allow(""),

// }).custom((value, helpers) => {
//     if (!value.trip_start_date || !value.trip_end_date) return value;
//     const startDate = new Date(value.trip_start_date);
//     const endDate = new Date(value.trip_end_date);
//     if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
//         return value; 
//     }
//     const totalCalculatedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

//     const sumOfZoneDays = Number(value.green_zone_days || 0) + Number(value.amber_zone_days || 0) + Number(value.red_zone_days || 0);
//     if (sumOfZoneDays !== totalCalculatedDays) {
//         return helpers.error('object.sum', { field: 'zone_days_sum', sumOfZoneDays, totalCalculatedDays });
//     }
//     return value;
// }).messages({
//     'object.sum': 'The sum of Green, Amber, and Red Zone Days ({{#sumOfZoneDays}}) must equal the Total Travel Days ({{#totalCalculatedDays}}). Please adjust.'
// });


// export interface TripCity {
//   id?: string;
//   name: string;
//   stay_name?: string;
//   zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
// }

// export interface Traveller {
//   name: string;
//   birthdate: string; 
// }

// export type InsuranceFormValues = {
//   trip_start_date: string;
//   trip_end_date: string;
//   green_zone_days: number | string;
//   amber_zone_days: number | string;
//   red_zone_days: number | string;
//   black_zone_days?: number | string;
//   emergency_medical_coverage: string;
//   personal_accident_coverage_level: string;
//   add_transit_coverage: boolean;

//   c_name: string; 
//   c_birthdate: string; 
//   c_phone: string;
//   c_whats_app?: string;
//   c_email: string;
//   c_nationality: string;
//   city_of_residence: string;
//   trip_countries: string[];
//   travellers: Traveller[]; 

//   arrival_in_ukraine?: string;
//   departure_from_ukraine?: string;
//   primary_cities_regions_ukraine?: string;
//   trip_cities?: TripCity[]; 
//   trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
//   stay_name?: string;
//   company_name?: string;

//   emergency_contact_name: string;
//   emergency_contact_phone: string;
//   emergency_contact_relation: string;
//   has_medical_conditions?: boolean;
//   has_allergies?: boolean;
//   has_current_medications?: boolean;
//   medical_conditions?: string[];
//   allergies?: string[];
//   current_medications?: string[];
//   blood_type?: string;
//   special_assistance?: string;

//   affiliate_code?: string;
//   consent: boolean | undefined;

//   c_organization?: string;
//   is_company_arranged?: boolean;

//   c_phone_code?: string;
//   c_phone_number?: string;
//   c_whats_app_code?: string;
//   c_whats_app_number?: string;
//   emergency_contact_phone_code?: string;
//   emergency_contact_phone_number?: string;
// };

// export const steps = [
//   "Trip & Coverage",
//   "Your Details",
//   "Trip Information",
//   "Medical & Emergency",
//   "Summary & Purchase"
// ];

// export const tripPurposes = [
//     "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//     "EDUCATION", "PERSONAL", "OTHER"
// ];

// export const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"];

// export const fieldsByStep: Array<Array<Path<InsuranceFormValues>>> = [
//   [
//     "trip_start_date", "trip_end_date",
//     "green_zone_days", "amber_zone_days", "red_zone_days",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage"
//   ],
//   [
//     "c_name", "c_birthdate", "c_phone", "c_whats_app", "c_email",
//     "c_nationality", "city_of_residence", "trip_countries",
//     "travellers" 
//   ],
//   [
//     "primary_cities_regions_ukraine",
//     "trip_purpose", "stay_name", "company_name",
//     "trip_cities" 
//   ],
//   [
//     "emergency_contact_name", "emergency_contact_phone", "emergency_contact_relation",
//     "has_medical_conditions", "has_allergies", "has_current_medications",
//     "medical_conditions", "allergies", "current_medications",
//     "blood_type", "special_assistance"
//   ],
//   [
//     "affiliate_code", "consent"
//   ]
// ];




// import Joi from "joi";


// const namePartSchema = Joi.string().trim().required().messages({
//   "string.empty": "This field is required.",
//   "any.required": "This field is required."
// });

// export interface TripCity {
//   id?: string;
//   name: string;
//   zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
// }

// export interface Traveller {
//   first_name: string;
//   last_name: string;
//   birthdate: string;
//   passport_number?: string;
//   passport_expiry_date?: string;
// }

// export type InsuranceFormValues = {
//   trip_start_date: string;
//   trip_end_date: string;
//   green_zone_days: number | string;
//   amber_zone_days: number | string;
//   red_zone_days: number | string;
//   black_zone_days?: number | string;
//   emergency_medical_coverage: string;
//   personal_accident_coverage_level: string;
//   add_transit_coverage: boolean;

//   c_first_name: string;
//   c_last_name: string;
//   c_birthdate: string;
//   c_passport_number?: string;
//   c_passport_expiry_date?: string;
//   c_is_whatsapp_same_as_phone?: boolean;
//   c_phone: string;
//   c_whats_app?: string;
//   c_email: string;
//   c_nationality: string;
//   city_of_residence: string;
//   trip_countries: string[];
//   travellers: Traveller[];

//   arrival_in_ukraine?: string;
//   departure_from_ukraine?: string;
//   primary_cities_regions_ukraine?: string;
//   trip_cities?: TripCity[];
//   trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
//   stay_name?: string;
//   company_name?: string;

//   emergency_contact_first_name: string;
//   emergency_contact_last_name: string;
//   emergency_contact_phone: string;
//   emergency_contact_relation: string;
//   has_medical_conditions?: boolean;
//   has_allergies?: boolean;
//   has_current_medications?: boolean;
//   medical_conditions?: string[];
//   allergies?: string[];
//   current_medications?: string[];
//   blood_type?: string;
//   special_assistance?: string;

//   affiliate_code?: string;
//   consent: boolean | undefined;

//   c_organization?: string;
//   is_company_arranged?: boolean;

//   c_phone_code?: string;
//   c_phone_number?: string;
//   c_whats_app_code?: string;
//   c_whats_app_number?: string;
//   emergency_contact_phone_code?: string;
//   emergency_contact_phone_number?: string;
// };

// const travellerJoiSchema = Joi.object().keys({
//     first_name: namePartSchema.messages({ "string.empty": "Traveller First Name is required.", "any.required": "Traveller First Name is required." }),
//     last_name: namePartSchema.messages({ "string.empty": "Traveller Last Name is required.", "any.required": "Traveller Last Name is required." }),
//     birthdate: Joi.string().required()
//       .regex(/^\d{4}-\d{2}-\d{2}$/).messages({
//         "any.required": "Traveller Date of Birth is required.",
//         "string.empty": "Traveller Date of Birth is required.",
//         "string.pattern.base": "Traveller Date of Birth must be in YYYY-MM-DD format."
//       }),
//     passport_number: Joi.string().trim().allow('').optional().label("Passport Number"),
//     passport_expiry_date: Joi.string().allow('').optional()
//       .regex(/^\d{4}-\d{2}-\d{2}$/).messages({
//         "string.pattern.base": "Passport Expiry Date must be in YYYY-MM-DD format."
//       })
//       .custom((value, helpers) => {
//         if (value) {
//           const expiryDate = new Date(value + "T00:00:00");
//           const today = new Date();
//           today.setHours(0,0,0,0);
//           if (expiryDate < today) {
//             return helpers.error("date.future", { limit: "today" });
//           }
//         }
//         return value;
//       }, 'Future date validation')
//       .messages({
//          "date.future": "Passport Expiry Date must be in the future."
//       })
//       .label("Passport Expiry Date"),
//   });

// export const purchaseWithoutLoginSchema = Joi.object<InsuranceFormValues>({
//   trip_start_date: Joi.string()
//     .required()
//     .messages({
//       "any.required": "Travel Start Date is required.",
//       "string.empty": "Travel Start Date is required.",
//     }),

//   trip_end_date: Joi.string()
//     .required()
//     .custom((value, helpers) => {
//       const { trip_start_date } = helpers.state.ancestors[0];
//       if (trip_start_date && value) {
//         const startDate = new Date(trip_start_date + "T00:00:00");
//         const endDate = new Date(value + "T00:00:00");
//         if (endDate < startDate) {
//           return helpers.error("date.greater");
//         }
//       }
//       return value;
//     })
//     .messages({
//       "any.required": "Travel End Date is required.",
//       "string.empty": "Travel End Date is required.",
//       "date.greater": "Travel End Date must be after Travel Start Date.",
//     }),

//   green_zone_days: Joi.number().integer().min(0).required().messages({ "any.required": "Green Zone Days is required. Enter 0 if none.", "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
//   amber_zone_days: Joi.number().integer().min(0).required().messages({ "any.required": "Amber Zone Days is required. Enter 0 if none.", "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
//   red_zone_days: Joi.number().integer().min(0).required().messages({ "any.required": "Red Zone Days is required. Enter 0 if none.", "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
//   black_zone_days: Joi.number().integer().min(0).optional().default(0),

//   emergency_medical_coverage: Joi.string().allow("").optional(),
//   personal_accident_coverage_level: Joi.string().allow("").optional(),

//   add_transit_coverage: Joi.boolean().default(false),

//   c_first_name: namePartSchema.messages({ "string.empty": "First Name is required.", "any.required": "First Name is required." }),
//   c_last_name: namePartSchema.messages({ "string.empty": "Last Name is required.", "any.required": "Last Name is required." }),

//   c_birthdate: Joi.string().required()
//     .regex(/^\d{4}-\d{2}-\d{2}$/).messages({
//       "any.required": "Date of Birth is required.",
//       "string.empty": "Date of Birth is required.",
//       "string.pattern.base": "Date of Birth must be in YYYY-MM-DD format."
//     }),
//   c_passport_number: Joi.string().trim().allow('').optional().label("Primary Traveller Passport Number"),
//   c_passport_expiry_date: Joi.string().allow('').optional()
//     .regex(/^\d{4}-\d{2}-\d{2}$/).messages({
//         "string.pattern.base": "Primary Traveller Passport Expiry Date must be in YYYY-MM-DD format."
//     })
//     .custom((value, helpers) => {
//         if (value) {
//           const expiryDate = new Date(value + "T00:00:00");
//           const today = new Date();
//           today.setHours(0,0,0,0);
//           if (expiryDate < today) {
//             return helpers.error("date.future", { limit: "today" });
//           }
//         }
//         return value;
//       }, 'Future date validation')
//     .messages({
//        "date.future": "Primary Traveller Passport Expiry Date must be in the future."
//     })
//     .label("Primary Traveller Passport Expiry Date"),
//   c_is_whatsapp_same_as_phone: Joi.boolean().optional(),
//   c_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Phone Number is required.", "string.min": "Phone Number seems too short." }),
//   c_whats_app: Joi.string().optional().allow("").trim().min(5).messages({ "string.min": "WhatsApp Number seems too short (if provided)." }),
//   c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email Address is required.", "string.email": "Email must be a valid email." }),
//   c_nationality: Joi.string().required().messages({ "any.required": "Nationality is required.", "string.empty": "Nationality is required." }),
//   city_of_residence: Joi.string().required().trim().messages({ "string.empty": "City of Residence is required." }),

//   trip_countries: Joi.array().items(Joi.string().required().messages({ "any.required": "Country Travelling To is required.", "string.empty": "Country Travelling To cannot be empty." })).min(1).max(1).required().messages({
//     "array.base": "Country Travelling To is required.",
//     "array.min": "Please select one Country Travelling To.",
//     "array.max": "Please select only one Country Travelling To."
//   }),

//   travellers: Joi.array().items(travellerJoiSchema).min(1).required().messages({ "array.min": "At least one traveller is required." }),

//   arrival_in_ukraine: Joi.string().isoDate().optional().allow(null, ''),
//   departure_from_ukraine: Joi.string().isoDate().optional().allow(null, '')
//     .custom((value, helpers) => {
//       const { arrival_in_ukraine } = helpers.state.ancestors[0];
//       if (arrival_in_ukraine && value) {
//         if (new Date(value) < new Date(arrival_in_ukraine)) {
//           return helpers.error("date.greater");
//         }
//       }
//       return value;
//     })
//     .messages({
//       "date.greater": "Departure from Ukraine must be after Arrival in Ukraine."
//     }),
//   primary_cities_regions_ukraine: Joi.string().optional().allow(""),

//   trip_cities: Joi.array().items(Joi.object().keys({
//     id: Joi.string().optional().allow(""),
//     name: Joi.string().required().trim().messages({ "string.empty": "City Name is required." }),
//     zoneType: Joi.string().valid("GREEN", "AMBER", "RED", "BLACK").required().messages({ "any.required": "Zone type for city is required." })
//   })).optional().min(0),

//   trip_purpose: Joi.string().valid(
//     "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//     "EDUCATION", "PERSONAL", "OTHER"
//   ).required().messages({ "any.required": "Purpose of Travel is required.", "any.only": "Invalid Purpose of Travel." }),
//   stay_name: Joi.string().optional().allow(""),
//   company_name: Joi.string().optional().allow(""),

//   emergency_contact_first_name: namePartSchema.messages({ "string.empty": "Emergency Contact First Name is required.", "any.required": "Emergency Contact First Name is required."  }),
//   emergency_contact_last_name: namePartSchema.messages({ "string.empty": "Emergency Contact Last Name is required.", "any.required": "Emergency Contact Last Name is required."  }),
//   emergency_contact_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Emergency Contact Number is required.", "string.min": "Emergency Contact Number seems too short." }),
//   emergency_contact_relation: Joi.string().required().trim().messages({ "string.empty": "Emergency Contact Relationship is required." }),
//   has_medical_conditions: Joi.boolean().default(false),
//   has_allergies: Joi.boolean().default(false),
//   has_current_medications: Joi.boolean().default(false),

//   medical_conditions: Joi.when('has_medical_conditions', {
//     is: true,
//     then: Joi.array().items(Joi.string().trim().min(1).messages({ "string.min": "Condition cannot be empty" })).min(1).required().messages({ "array.min": "Please list at least one pre-existing medical condition or uncheck the box.", "any.required": "Please list pre-existing medical conditions." }),
//     otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//   }),
//   allergies: Joi.when('has_allergies', {
//     is: true,
//     then: Joi.array().items(Joi.string().trim().min(1).messages({ "string.min": "Allergy cannot be empty" })).min(1).required().messages({ "array.min": "Please list at least one allergy or uncheck the box.", "any.required": "Please list allergies." }),
//     otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//   }),
//   current_medications: Joi.when('has_current_medications', {
//     is: true,
//     then: Joi.array().items(Joi.string().trim().min(1).messages({ "string.min": "Medication cannot be empty" })).min(1).required().messages({ "array.min": "Please list at least one current medication or uncheck the box.", "any.required": "Please list current medications." }),
//     otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
//   }),

//   blood_type: Joi.string().optional().allow(""),
//   special_assistance: Joi.string().optional().allow(""),

//   affiliate_code: Joi.string().optional().allow(""),
//   consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent to share medical info.", "any.required": "Consent is required." }),

//   c_organization: Joi.string().optional().allow(""),
//   is_company_arranged: Joi.boolean().default(false),

//   c_phone_code: Joi.string().optional().allow(""),
//   c_phone_number: Joi.string().optional().allow(""),
//   c_whats_app_code: Joi.string().optional().allow(""),
//   c_whats_app_number: Joi.string().optional().allow(""),
//   emergency_contact_phone_code: Joi.string().optional().allow(""),
//   emergency_contact_phone_number: Joi.string().optional().allow(""),

// })
//   .custom((value, helpers) => {
//     if (!value.trip_start_date || !value.trip_end_date) return value;
//     const startDateParts = value.trip_start_date.split('-');
//     const endDateParts = value.trip_end_date.split('-');
//     if (startDateParts.length !== 3 || endDateParts.length !== 3) return value;

//     const startDate = new Date(value.trip_start_date + "T00:00:00");
//     const endDate = new Date(value.trip_end_date + "T00:00:00");

//     if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
//       return value;
//     }
//     const totalCalculatedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

//     const sumOfZoneDays = Number(value.green_zone_days || 0) + Number(value.amber_zone_days || 0) + Number(value.red_zone_days || 0);
//     if (sumOfZoneDays !== totalCalculatedDays) {
//       return helpers.error('object.sum', { field: 'zone_days_sum', sumOfZoneDays, totalCalculatedDays });
//     }
//     return value;
//   }, 'zoneDaysSumValidation')
//   .custom((values, helpers) => {
//     const { emergency_medical_coverage, personal_accident_coverage_level } = values;
//     const isEmergencyMedicalSelected = emergency_medical_coverage && emergency_medical_coverage !== "";
//     const isPaSelected = personal_accident_coverage_level && personal_accident_coverage_level !== "" && personal_accident_coverage_level !== "0";

//     if (!isEmergencyMedicalSelected && !isPaSelected) {
//       return helpers.error('custom.coverageOr', { message: 'Please select either Emergency Medical Coverage or Personal Accident (PA) Coverage, or both.' });
//     }
//     return values;
//   }, 'coverageOrValidation')
//   .messages({
//     'object.sum': 'The sum of Green, Amber, and Red Zone Days ({{#sumOfZoneDays}}) must equal the Total Travel Days ({{#totalCalculatedDays}}). Please adjust.',
//     'custom.coverageOr': '{{#message}}'
//   });

// export const fieldsByStep: Array<Array<keyof InsuranceFormValues>> = [
//   [
//     "trip_start_date", "trip_end_date",
//     "green_zone_days", "amber_zone_days", "red_zone_days", "black_zone_days",
//     "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
//     "trip_countries"
//   ],
//   [
//     "c_first_name", "c_last_name",
//     "c_birthdate",
//     "c_passport_number", "c_passport_expiry_date",
//     "c_phone", "c_whats_app", "c_email",
//     "c_nationality", "city_of_residence",
//     "travellers",
//     "c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number",
//     "c_is_whatsapp_same_as_phone",
//   ],
//   [
//     "arrival_in_ukraine", "departure_from_ukraine",
//     "primary_cities_regions_ukraine",
//     "trip_purpose", "stay_name", "company_name",
//     "trip_cities"
//   ],
//   [
//     "emergency_contact_first_name", "emergency_contact_last_name",
//     "emergency_contact_phone", "emergency_contact_relation",
//     "has_medical_conditions", "has_allergies", "has_current_medications",
//     "medical_conditions", "allergies", "current_medications",
//     "blood_type", "special_assistance",
//     "emergency_contact_phone_code", "emergency_contact_phone_number"
//   ],
//   [
//     "affiliate_code", "consent", "c_organization", "is_company_arranged"
//   ]
// ];

// export const tripPurposes = [
//   "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
//   "EDUCATION", "PERSONAL", "OTHER"
// ];




import Joi from "joi";


const namePartSchema = Joi.string().trim().required().messages({
  "string.empty": "This field is required.",
  "any.required": "This field is required."
});

export interface TripCity {
  id?: string;
  name: string;
  zoneType: "GREEN" | "AMBER" | "RED" | "BLACK";
}

export interface Traveller {
  first_name: string;
  last_name: string;
  birthdate: string;
  passport_number?: string;
  passport_expiry_date?: string;
}

export type InsuranceFormValues = {
  trip_start_date: string;
  trip_end_date: string;
  green_zone_days: number | string;
  amber_zone_days: number | string;
  red_zone_days: number | string;
  black_zone_days?: number | string;
  emergency_medical_coverage: string;
  personal_accident_coverage_level: string;
  add_transit_coverage: boolean;

  c_first_name: string;
  c_last_name: string;
  c_birthdate: string;
  c_passport_number?: string;
  c_passport_expiry_date?: string;
  c_is_whatsapp_same_as_phone?: boolean;
  c_phone: string;
  c_whats_app?: string;
  c_email: string;
  c_nationality: string;
  city_of_residence: string;
  trip_countries: string[];
  travellers: Traveller[];

  arrival_in_ukraine?: string;
  departure_from_ukraine?: string;
  primary_cities_regions_ukraine?: string;
  trip_cities?: TripCity[];
  trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
  stay_name?: string;
  company_name?: string;

  emergency_contact_first_name: string;
  emergency_contact_last_name: string;
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

  affiliate_code?: string;
  consent: boolean | undefined;

  c_organization?: string;
  is_company_arranged?: boolean;

  c_phone_code?: string;
  c_phone_number?: string;
  c_whats_app_code?: string;
  c_whats_app_number?: string;
  emergency_contact_phone_code?: string;
  emergency_contact_phone_number?: string;
};

const travellerJoiSchema = Joi.object().keys({
    first_name: namePartSchema.messages({ "string.empty": "Traveller First Name is required.", "any.required": "Traveller First Name is required." }),
    last_name: namePartSchema.messages({ "string.empty": "Traveller Last Name is required.", "any.required": "Traveller Last Name is required." }),
    birthdate: Joi.string().required()
      .regex(/^\d{4}-\d{2}-\d{2}$/).messages({
        "any.required": "Traveller Date of Birth is required.",
        "string.empty": "Traveller Date of Birth is required.",
        "string.pattern.base": "Traveller Date of Birth must be in YYYY-MM-DD format."
      }),
    passport_number: Joi.string().trim().allow('').optional().label("Passport Number"),
    passport_expiry_date: Joi.string().allow('').optional()
      .regex(/^\d{4}-\d{2}-\d{2}$/).messages({
        "string.pattern.base": "Passport Expiry Date must be in YYYY-MM-DD format."
      })
      .custom((value, helpers) => {
        if (value) {
          const expiryDate = new Date(value + "T00:00:00");
          const today = new Date();
          today.setHours(0,0,0,0);
          if (expiryDate < today) {
            return helpers.error("date.future", { limit: "today" });
          }
        }
        return value;
      }, 'Future date validation')
      .messages({
         "date.future": "Passport Expiry Date must be in the future."
      })
      .label("Passport Expiry Date"),
  });

export const purchaseWithoutLoginSchema = Joi.object<InsuranceFormValues>({
  trip_start_date: Joi.string()
    .required()
    .messages({
      "any.required": "Travel Start Date is required.",
      "string.empty": "Travel Start Date is required.",
    }),

  trip_end_date: Joi.string()
    .required()
    .custom((value, helpers) => {
      const { trip_start_date } = helpers.state.ancestors[0];
      if (trip_start_date && value) {
        const startDate = new Date(trip_start_date + "T00:00:00");
        const endDate = new Date(value + "T00:00:00");
        if (endDate < startDate) {
          return helpers.error("date.greater");
        }
      }
      return value;
    })
    .messages({
      "any.required": "Travel End Date is required.",
      "string.empty": "Travel End Date is required.",
      "date.greater": "Travel End Date must be after Travel Start Date.",
    }),

  green_zone_days: Joi.number().integer().min(0).required().messages({ "any.required": "Green Zone Days is required. Enter 0 if none.", "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
  amber_zone_days: Joi.number().integer().min(0).required().messages({ "any.required": "Amber Zone Days is required. Enter 0 if none.", "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
  red_zone_days: Joi.number().integer().min(0).required().messages({ "any.required": "Red Zone Days is required. Enter 0 if none.", "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
  black_zone_days: Joi.number().integer().min(0).optional().default(0),

  emergency_medical_coverage: Joi.string().allow("").optional(),
  personal_accident_coverage_level: Joi.string().allow("").optional(),

  add_transit_coverage: Joi.boolean().default(false),

  c_first_name: namePartSchema.messages({ "string.empty": "First Name is required.", "any.required": "First Name is required." }),
  c_last_name: namePartSchema.messages({ "string.empty": "Last Name is required.", "any.required": "Last Name is required." }),

  c_birthdate: Joi.string().required()
    .regex(/^\d{4}-\d{2}-\d{2}$/).messages({
      "any.required": "Date of Birth is required.",
      "string.empty": "Date of Birth is required.",
      "string.pattern.base": "Date of Birth must be in YYYY-MM-DD format."
    }),
  c_passport_number: Joi.string().trim().allow('').optional().label("Primary Traveller Passport Number"),
  c_passport_expiry_date: Joi.string().allow('').optional()
    .regex(/^\d{4}-\d{2}-\d{2}$/).messages({
        "string.pattern.base": "Primary Traveller Passport Expiry Date must be in YYYY-MM-DD format."
    })
    .custom((value, helpers) => {
        if (value) {
          const expiryDate = new Date(value + "T00:00:00");
          const today = new Date();
          today.setHours(0,0,0,0);
          if (expiryDate < today) {
            return helpers.error("date.future", { limit: "today" });
          }
        }
        return value;
      }, 'Future date validation')
    .messages({
       "date.future": "Primary Traveller Passport Expiry Date must be in the future."
    })
    .label("Primary Traveller Passport Expiry Date"),
  c_is_whatsapp_same_as_phone: Joi.boolean().optional(),
  c_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Phone Number is required.", "string.min": "Phone Number seems too short." }),
  c_whats_app: Joi.string().optional().allow("").trim().min(5).messages({ "string.min": "WhatsApp Number seems too short (if provided)." }),
  c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email Address is required.", "string.email": "Email must be a valid email." }),
  c_nationality: Joi.string().required().messages({ "any.required": "Nationality is required.", "string.empty": "Nationality is required." }),
  city_of_residence: Joi.string().required().trim().messages({ "string.empty": "City of Residence is required." }),

  trip_countries: Joi.array().items(Joi.string().required().messages({ "any.required": "Country Travelling To is required.", "string.empty": "Country Travelling To cannot be empty." })).min(1).max(1).required().messages({
    "array.base": "Country Travelling To is required.",
    "array.min": "Please select one Country Travelling To.",
    "array.max": "Please select only one Country Travelling To."
  }),

  travellers: Joi.array().items(travellerJoiSchema).min(1).required().messages({ "array.min": "At least one traveller is required." }),

  arrival_in_ukraine: Joi.string().isoDate().optional().allow(null, ''),
  departure_from_ukraine: Joi.string().isoDate().optional().allow(null, '')
    .custom((value, helpers) => {
      const { arrival_in_ukraine } = helpers.state.ancestors[0];
      if (arrival_in_ukraine && value) {
        if (new Date(value) < new Date(arrival_in_ukraine)) {
          return helpers.error("date.greater");
        }
      }
      return value;
    })
    .messages({
      "date.greater": "Departure from Ukraine must be after Arrival in Ukraine."
    }),
  primary_cities_regions_ukraine: Joi.string().optional().allow(""),

  trip_cities: Joi.array().items(Joi.object().keys({
    id: Joi.string().optional().allow(""),
    name: Joi.string().required().trim().messages({ "string.empty": "City Name is required." }),
    zoneType: Joi.string().valid("GREEN", "AMBER", "RED", "BLACK").required().messages({ "any.required": "Zone type for city is required." })
  })).optional().min(0),

  trip_purpose: Joi.string().valid(
    "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
    "EDUCATION", "PERSONAL", "OTHER"
  ).required().messages({ "any.required": "Purpose of Travel is required.", "any.only": "Invalid Purpose of Travel." }),
  stay_name: Joi.string().optional().allow(""),
  company_name: Joi.string().optional().allow(""),

  emergency_contact_first_name: namePartSchema.messages({ "string.empty": "Emergency Contact First Name is required.", "any.required": "Emergency Contact First Name is required."  }),
  emergency_contact_last_name: namePartSchema.messages({ "string.empty": "Emergency Contact Last Name is required.", "any.required": "Emergency Contact Last Name is required."  }),
  emergency_contact_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Emergency Contact Number is required.", "string.min": "Emergency Contact Number seems too short." }),
  emergency_contact_relation: Joi.string().required().trim().messages({ "string.empty": "Emergency Contact Relationship is required." }),
  has_medical_conditions: Joi.boolean().default(false),
  has_allergies: Joi.boolean().default(false),
  has_current_medications: Joi.boolean().default(false),

  medical_conditions: Joi.when('has_medical_conditions', {
    is: true,
    then: Joi.array().items(Joi.string().trim().min(1).messages({ "string.min": "Condition cannot be empty" })).min(1).required().messages({ "array.min": "Please list at least one pre-existing medical condition or uncheck the box.", "any.required": "Please list pre-existing medical conditions." }),
    otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
  }),
  allergies: Joi.when('has_allergies', {
    is: true,
    then: Joi.array().items(Joi.string().trim().min(1).messages({ "string.min": "Allergy cannot be empty" })).min(1).required().messages({ "array.min": "Please list at least one allergy or uncheck the box.", "any.required": "Please list allergies." }),
    otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
  }),
  current_medications: Joi.when('has_current_medications', {
    is: true,
    then: Joi.array().items(Joi.string().trim().min(1).messages({ "string.min": "Medication cannot be empty" })).min(1).required().messages({ "array.min": "Please list at least one current medication or uncheck the box.", "any.required": "Please list current medications." }),
    otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
  }),

  blood_type: Joi.string().optional().allow(""),
  special_assistance: Joi.string().optional().allow(""),

  affiliate_code: Joi.string().optional().allow(""),
  consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent to share medical info.", "any.required": "Consent is required." }),

  c_organization: Joi.string().optional().allow(""),
  is_company_arranged: Joi.boolean().default(false),

  c_phone_code: Joi.string().optional().allow(""),
  c_phone_number: Joi.string().optional().allow(""),
  c_whats_app_code: Joi.string().optional().allow(""),
  c_whats_app_number: Joi.string().optional().allow(""),
  emergency_contact_phone_code: Joi.string().optional().allow(""),
  emergency_contact_phone_number: Joi.string().optional().allow(""),

})
  .custom((value, helpers) => {
    if (!value.trip_start_date || !value.trip_end_date) return value;
    const startDateParts = value.trip_start_date.split('-');
    const endDateParts = value.trip_end_date.split('-');
    if (startDateParts.length !== 3 || endDateParts.length !== 3) return value;

    const startDate = new Date(value.trip_start_date + "T00:00:00");
    const endDate = new Date(value.trip_end_date + "T00:00:00");

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
      return value;
    }
    const totalCalculatedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

    const sumOfZoneDays = Number(value.green_zone_days || 0) + Number(value.amber_zone_days || 0) + Number(value.red_zone_days || 0);
    if (sumOfZoneDays !== totalCalculatedDays) {
      return helpers.error('object.sum', { field: 'zone_days_sum', sumOfZoneDays, totalCalculatedDays });
    }
    return value;
  }, 'zoneDaysSumValidation')
  .custom((values, helpers) => {
    const { emergency_medical_coverage, personal_accident_coverage_level } = values;
    const isEmergencyMedicalSelected = emergency_medical_coverage && emergency_medical_coverage !== "";
    const isPaSelected = personal_accident_coverage_level && personal_accident_coverage_level !== "" && personal_accident_coverage_level !== "0";

    if (!isEmergencyMedicalSelected && !isPaSelected) {
      return helpers.error('custom.coverageOr', { message: 'Please select either Emergency Medical Coverage or Personal Accident (PA) Coverage, or both.' });
    }
    return values;
  }, 'coverageOrValidation')
  .messages({
    'object.sum': 'The sum of Green, Amber, and Red Zone Days ({{#sumOfZoneDays}}) must equal the Total Travel Days ({{#totalCalculatedDays}}). Please adjust.',
    'custom.coverageOr': '{{#message}}'
  });

export const fieldsByStep: Array<Array<keyof InsuranceFormValues>> = [
  [
    "trip_start_date", "trip_end_date",
    "green_zone_days", "amber_zone_days", "red_zone_days", "black_zone_days",
    "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage",
    "trip_countries"
  ],
  [
    "c_first_name", "c_last_name",
    "c_birthdate",
    "c_passport_number", "c_passport_expiry_date",
    "c_phone", "c_whats_app", "c_email",
    "c_nationality", "city_of_residence",
    "travellers",
    "c_phone_code", "c_phone_number", "c_whats_app_code", "c_whats_app_number",
    "c_is_whatsapp_same_as_phone",
  ],
  [
    "arrival_in_ukraine", "departure_from_ukraine",
    "primary_cities_regions_ukraine",
    "trip_purpose", "stay_name", "company_name",
    "trip_cities"
  ],
  [
    "emergency_contact_first_name", "emergency_contact_last_name",
    "emergency_contact_phone", "emergency_contact_relation",
    "has_medical_conditions", "has_allergies", "has_current_medications",
    "medical_conditions", "allergies", "current_medications",
    "blood_type", "special_assistance",
    "emergency_contact_phone_code", "emergency_contact_phone_number"
  ],
  [
    "affiliate_code", "consent", "c_organization", "is_company_arranged"
  ]
];

export const tripPurposes = [
  "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
  "EDUCATION", "PERSONAL", "OTHER"
];

export const emergencyMedicalCoverageOptions = [
  { value: "0", label: "No Medical Coverage" },
  { value: "25000", label: "$25,000" },
  { value: "50000", label: "$50,000" },
  { value: "100000", label: "$100,000" },
  { value: "150000", label: "$150,000" },
  { value: "250000", label: "$250,000" },
];

export const personalAccidentCoverageOptions = [
  { value: "0", label: "Select PA Coverage" }, 
  { value: "25000", label: "$25,000" },
  { value: "50000", label: "$50,000" },
  { value: "100000", label: "$100,000" },
  { value: "150000", label: "$150,000" },
  { value: "250000", label: "$250,000" },
];


export const countryCodeOptions = [
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+7", label: "🇷🇺 +7" },
  { value: "+20", label: "🇪🇬 +20" },
  { value: "+27", label: "🇿🇦 +27" },
  { value: "+30", label: "🇬🇷 +30" },
  { value: "+31", label: "🇳🇱 +31" },
  { value: "+32", label: "🇧🇪 +32" },
  { value: "+33", label: "🇫🇷 +33" },
  { value: "+34", label: "🇪🇸 +34" },
  { value: "+36", label: "🇭🇺 +36" },
  { value: "+39", label: "🇮🇹 +39" },
  { value: "+40", label: "🇷🇴 +40" },
  { value: "+41", label: "🇨🇭 +41" },
  { value: "+43", label: "🇦🇹 +43" },
  { value: "+44", label: "🇬🇧 +44" },
  { value: "+45", label: "🇩🇰 +45" },
  { value: "+46", label: "🇸🇪 +46" },
  { value: "+47", label: "🇳🇴 +47" },
  { value: "+48", label: "🇵🇱 +48" },
  { value: "+49", label: "🇩🇪 +49" },
  { value: "+51", label: "🇵🇪 +51" },
  { value: "+52", label: "🇲🇽 +52" },
  { value: "+53", label: "🇨🇺 +53" },
  { value: "+54", label: "🇦🇷 +54" },
  { value: "+55", label: "🇧🇷 +55" },
  { value: "+56", label: "🇨🇱 +56" },
  { value: "+57", label: "🇨🇴 +57" },
  { value: "+58", label: "🇻🇪 +58" },
  { value: "+60", label: "🇲🇾 +60" },
  { value: "+61", label: "🇦🇺 +61" },
  { value: "+62", label: "🇮🇩 +62" },
  { value: "+63", label: "🇵🇭 +63" },
  { value: "+64", label: "🇳🇿 +64" },
  { value: "+65", label: "🇸🇬 +65" },
  { value: "+66", label: "🇹🇭 +66" },
  { value: "+81", label: "🇯🇵 +81" },
  { value: "+82", label: "🇰🇷 +82" },
  { value: "+84", label: "🇻🇳 +84" },
  { value: "+86", label: "🇨🇳 +86" },
  { value: "+90", label: "🇹🇷 +90" },
  { value: "+91", label: "🇮🇳 +91" },
  { value: "+92", label: "🇵🇰 +92" },
  { value: "+93", label: "🇦🇫 +93" },
  { value: "+94", label: "🇱🇰 +94" },
  { value: "+95", label: "🇲🇲 +95" },
  { value: "+98", label: "🇮🇷 +98" },
  { value: "+211", label: "🇸🇸 +211" },
  { value: "+212", label: "🇲🇦 +212" },
  { value: "+213", label: "🇩🇿 +213" },
  { value: "+216", label: "🇹🇳 +216" },
  { value: "+218", label: "🇱🇾 +218" },
  { value: "+220", label: "🇬🇲 +220" },
  { value: "+221", label: "🇸🇳 +221" },
  { value: "+222", label: "🇲🇷 +222" },
  { value: "+223", label: "🇲🇱 +223" },
  { value: "+224", label: "🇬🇳 +224" },
  { value: "+225", label: "🇨🇮 +225" },
  { value: "+226", label: "🇧🇫 +226" },
  { value: "+227", label: "🇳🇪 +227" },
  { value: "+228", label: "🇹🇬 +228" },
  { value: "+229", label: "🇧🇯 +229" },
  { value: "+230", label: "🇲🇺 +230" },
  { value: "+231", label: "🇱🇷 +231" },
  { value: "+232", label: "🇸🇱 +232" },
  { value: "+233", label: "🇬🇭 +233" },
  { value: "+234", label: "🇳🇬 +234" },
  { value: "+235", label: "🇹🇩 +235" },
  { value: "+236", label: "🇨🇫 +236" },
  { value: "+237", label: "🇨🇲 +237" },
  { value: "+238", label: "🇨🇻 +238" },
  { value: "+239", label: "🇸🇹 +239" },
  { value: "+240", label: "🇬🇶 +240" },
  { value: "+241", label: "🇬🇦 +241" },
  { value: "+242", label: "🇨🇬 +242" },
  { value: "+243", label: "🇨🇩 +243" },
  { value: "+244", label: "🇦🇴 +244" },
  { value: "+245", label: "🇬🇼 +245" },
  { value: "+246", label: "🇮🇴 +246" },
  { value: "+248", label: "🇸🇨 +248" },
  { value: "+249", label: "🇸🇩 +249" },
  { value: "+250", label: "🇷🇼 +250" },
  { value: "+251", label: "🇪🇹 +251" },
  { value: "+252", label: "🇸🇴 +252" },
  { value: "+253", label: "🇩🇯 +253" },
  { value: "+254", label: "🇰🇪 +254" },
  { value: "+255", label: "🇹🇿 +255" },
  { value: "+256", label: "🇺🇬 +256" },
  { value: "+257", label: "🇧🇮 +257" },
  { value: "+258", label: "🇲🇿 +258" },
  { value: "+260", label: "🇿🇲 +260" },
  { value: "+261", label: "🇲🇬 +261" },
  { value: "+262", label: "🇷🇪 +262" },
  { value: "+263", label: "🇿🇼 +263" },
  { value: "+264", label: "🇳🇦 +264" },
  { value: "+265", label: "🇲🇼 +265" },
  { value: "+266", label: "🇱🇸 +266" },
  { value: "+267", label: "🇧🇼 +267" },
  { value: "+268", label: "🇸🇿 +268" },
  { value: "+269", label: "🇰🇲 +269" },
  { value: "+290", label: "🇸🇭 +290" },
  { value: "+291", label: "🇪🇷 +291" },
  { value: "+297", label: "🇦🇼 +297" },
  { value: "+298", label: "🇫🇴 +298" },
  { value: "+299", label: "🇬🇱 +299" },
  { value: "+350", label: "🇬🇮 +350" },
  { value: "+351", label: "🇵🇹 +351" },
  { value: "+352", label: "🇱🇺 +352" },
  { value: "+353", label: "🇮🇪 +353" },
  { value: "+354", label: "🇮🇸 +354" },
  { value: "+355", label: "🇦🇱 +355" },
  { value: "+356", label: "🇲🇹 +356" },
  { value: "+357", label: "🇨🇾 +357" },
  { value: "+358", label: "🇫🇮 +358" },
  { value: "+359", label: "🇧🇬 +359" },
  { value: "+370", label: "🇱🇹 +370" },
  { value: "+371", label: "🇱🇻 +371" },
  { value: "+372", label: "🇪🇪 +372" },
  { value: "+373", label: "🇲🇩 +373" },
  { value: "+374", label: "🇦🇲 +374" },
  { value: "+375", label: "🇧🇾 +375" },
  { value: "+376", label: "🇦🇩 +376" },
  { value: "+377", label: "🇲🇨 +377" },
  { value: "+378", label: "🇸🇲 +378" },
  { value: "+379", label: "🇻🇦 +379" },
  { value: "+380", label: "🇺🇦 +380" },
  { value: "+381", label: "🇷🇸 +381" },
  { value: "+382", label: "🇲🇪 +382" },
  { value: "+383", label: "🇽🇰 +383" },
  { value: "+385", label: "🇭🇷 +385" },
  { value: "+386", label: "🇸🇮 +386" },
  { value: "+387", label: "🇧🇦 +387" },
  { value: "+389", label: "🇲🇰 +389" },
  { value: "+420", label: "🇨🇿 +420" },
  { value: "+421", label: "🇸🇰 +421" },
  { value: "+423", label: "🇱🇮 +423" },
  { value: "+502", label: "🇬🇹 +502" },
  { value: "+503", label: "🇸🇻 +503" },
  { value: "+504", label: "🇭🇳 +504" },
  { value: "+505", label: "🇳🇮 +505" },
  { value: "+506", label: "🇨🇷 +506" },
  { value: "+507", label: "🇵🇦 +507" },
  { value: "+508", label: "🇵🇲 +508" },
  { value: "+509", label: "🇭🇹 +509" },
  { value: "+590", label: "🇬🇵 +590" },
  { value: "+591", label: "🇧🇴 +591" },
  { value: "+592", label: "🇬🇾 +592" },
  { value: "+593", label: "🇪🇨 +593" },
  { value: "+594", label: "🇬🇫 +594" },
  { value: "+595", label: "🇵🇾 +595" },
  { value: "+596", label: "🇲🇶 +596" },
  { value: "+597", label: "🇸🇷 +597" },
  { value: "+598", label: "🇺🇾 +598" },
  { value: "+599", label: "🇨🇼 +599" },
  { value: "+670", label: "🇹🇱 +670" },
  { value: "+672", label: "🇦🇨 +672" },
  { value: "+673", label: "🇧🇳 +673" },
  { value: "+674", label: "🇳🇷 +674" },
  { value: "+675", label: "🇵🇬 +675" },
  { value: "+676", label: "🇹🇴 +676" },
  { value: "+677", label: "🇸🇧 +677" },
  { value: "+678", label: "🇻🇺 +678" },
  { value: "+679", label: "🇫🇯 +679" },
  { value: "+680", label: "🇵🇼 +680" },
  { value: "+681", label: "🇻🇨 +681" },
  { value: "+682", label: "🇼🇸 +682" },
  { value: "+683", label: "🇰🇮 +683" },
  { value: "+685", label: "🇹🇻 +685" },
  { value: "+686", label: "🇳🇺 +686" },
  { value: "+687", label: "🇳🇨 +687" },
  { value: "+688", label: "🇹🇰 +688" },
  { value: "+689", label: "🇵🇫 +689" },
  { value: "+690", label: "🇹🇰 +690" },
  { value: "+691", label: "🇫🇲 +691" },
  { value: "+692", label: "🇲🇭 +692" },
  { value: "+850", label: "🇰🇵 +850" },
  { value: "+852", label: "🇭🇰 +852" },
  { value: "+853", label: "🇲🇴 +853" },
  { value: "+855", label: "🇰🇭 +855" },
  { value: "+856", label: "🇱🇦 +856" },
  { value: "+870", label: "🇩🇬 +870" },
  { value: "+880", label: "🇧🇩 +880" },
  { value: "+886", label: "🇹🇼 +886" },
  { value: "+960", label: "🇲🇻 +960" },
  { value: "+961", label: "🇱🇧 +961" },
  { value: "+962", label: "🇯🇴 +962" },
  { value: "+963", label: "🇸🇾 +963" },
  { value: "+964", label: "🇮🇶 +964" },
  { value: "+965", label: "🇰🇼 +965" },
  { value: "+966", label: "🇸🇦 +966" },
  { value: "+967", label: "🇾🇪 +967" },
  { value: "+968", label: "🇴🇲 +968" },
  { value: "+970", label: "🇵🇸 +970" },
  { value: "+971", label: "🇦🇪 +971" },
  { value: "+972", label: "🇮🇱 +972" },
  { value: "+973", label: "🇧🇭 +973" },
  { value: "+974", label: "🇶🇦 +974" },
  { value: "+975", label: "🇧🇹 +975" },
  { value: "+976", label: "🇲🇳 +976" },
  { value: "+977", label: "🇳🇵 +977" },
  { value: "+992", label: "🇹🇯 +992" },
  { value: "+993", label: "🇹🇲 +993" },
  { value: "+994", label: "🇦🇿 +994" },
  { value: "+995", label: "🇬🇪 +995" },
  { value: "+996", label: "🇰🇬 +996" },
  { value: "+998", label: "🇺🇿 +998" },
];

export const nationalityOptions = [
  { value: "AF", label: "Afghan" },
  { value: "AL", label: "Albanian" },
  { value: "DZ", label: "Algerian" },
  { value: "AO", label: "Angolan" },
  { value: "AR", label: "Argentine" },
  { value: "AM", label: "Armenian" },
  { value: "AU", label: "Australian" },
  { value: "AT", label: "Austrian" },
  { value: "BD", label: "Bangladeshi" },
  { value: "BE", label: "Belgian" },
  { value: "BT", label: "Bhutanese" },
  { value: "BO", label: "Bolivian" },
  { value: "BR", label: "Brazilian" },
  { value: "BG", label: "Bulgarian" },
  { value: "KH", label: "Cambodian" },
  { value: "CM", label: "Cameroonian" },
  { value: "CA", label: "Canadian" },
  { value: "CL", label: "Chilean" },
  { value: "CN", label: "Chinese" },
  { value: "CO", label: "Colombian" },
  { value: "CR", label: "Costa Rican" },
  { value: "HR", label: "Croatian" },
  { value: "CU", label: "Cuban" },
  { value: "CZ", label: "Czech" },
  { value: "DK", label: "Danish" },
  { value: "EG", label: "Egyptian" },
  { value: "EE", label: "Estonian" },
  { value: "ET", label: "Ethiopian" },
  { value: "FI", label: "Finnish" },
  { value: "FR", label: "French" },
  { value: "GE", label: "Georgian" },
  { value: "DE", label: "German" },
  { value: "GH", label: "Ghanaian" },
  { value: "GR", label: "Greek" },
  { value: "GT", label: "Guatemalan" },
  { value: "HT", label: "Haitian" },
  { value: "HN", label: "Honduran" },
  { value: "HU", label: "Hungarian" },
  { value: "IS", label: "Icelandic" },
  { value: "IN", label: "Indian" },
  { value: "ID", label: "Indonesian" },
  { value: "IR", label: "Iranian" },
  { value: "IQ", label: "Iraqi" },
  { value: "IE", label: "Irish" },
  { value: "IL", label: "Israeli" },
  { value: "IT", label: "Italian" },
  { value: "JP", label: "Japanese" },
  { value: "JO", label: "Jordanian" },
  { value: "KZ", label: "Kazakh" },
  { value: "KE", label: "Kenyan" },
  { value: "KR", label: "South Korean" },
  { value: "KW", label: "Kuwaiti" },
  { value: "LA", label: "Lao" },
  { value: "LV", label: "Latvian" },
  { value: "LB", label: "Lebanese" },
  { value: "LY", label: "Libyan" },
  { value: "LT", label: "Lithuanian" },
  { value: "LU", label: "Luxembourgish" },
  { value: "MG", label: "Malagasy" },
  { value: "MY", label: "Malaysian" },
  { value: "MV", label: "Maldivian" },
  { value: "ML", label: "Malian" },
  { value: "MT", label: "Maltese" },
  { value: "MX", label: "Mexican" },
  { value: "MN", label: "Mongolian" },
  { value: "MA", label: "Moroccan" },
  { value: "MM", label: "Burmese" },
  { value: "NP", label: "Nepali" },
  { value: "NL", label: "Dutch" },
  { value: "NZ", label: "New Zealander" },
  { value: "NI", label: "Nicaraguan" },
  { value: "NE", label: "Nigerien" },
  { value: "NG", label: "Nigerian" },
  { value: "NO", label: "Norwegian" },
  { value: "OM", label: "Omani" },
  { value: "PK", label: "Pakistani" },
  { value: "PA", label: "Panamanian" },
  { value: "PY", label: "Paraguayan" },
  { value: "PE", label: "Peruvian" },
  { value: "PH", label: "Filipino" },
  { value: "PL", label: "Polish" },
  { value: "PT", label: "Portuguese" },
  { value: "QA", label: "Qatari" },
  { value: "RO", label: "Romanian" },
  { value: "RU", label: "Russian" },
  { value: "SA", label: "Saudi" },
  { value: "RS", label: "Serbian" },
  { value: "SG", label: "Singaporean" },
  { value: "SK", label: "Slovak" },
  { value: "SI", label: "Slovenian" },
  { value: "ZA", label: "South African" },
  { value: "ES", label: "Spanish" },
  { value: "LK", label: "Sri Lankan" },
  { value: "SE", label: "Swedish" },
  { value: "CH", label: "Swiss" },
  { value: "SY", label: "Syrian" },
  { value: "TW", label: "Taiwanese" },
  { value: "TZ", label: "Tanzanian" },
  { value: "TH", label: "Thai" },
  { value: "TR", label: "Turkish" },
  { value: "UG", label: "Ugandan" },
  { value: "UA", label: "Ukrainian" },
  { value: "AE", label: "Emirati" },
  { value: "GB", label: "British" },
  { value: "US", label: "American" },
  { value: "UY", label: "Uruguayan" },
  { value: "UZ", label: "Uzbek" },
  { value: "VE", label: "Venezuelan" },
  { value: "VN", label: "Vietnamese" },
  { value: "YE", label: "Yemeni" },
  { value: "ZM", label: "Zambian" },
  { value: "ZW", label: "Zimbabwean" }
];

export const countryOptions = [
  { value: "AF", label: "Afghanistan" },
  { value: "AL", label: "Albania" },
  { value: "DZ", label: "Algeria" },
  { value: "AD", label: "Andorra" },
  { value: "AO", label: "Angola" },
  { value: "AG", label: "Antigua and Barbuda" },
  { value: "AR", label: "Argentina" },
  { value: "AM", label: "Armenia" },
  { value: "AU", label: "Australia" },
  { value: "AT", label: "Austria" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "BS", label: "Bahamas" },
  { value: "BH", label: "Bahrain" },
  { value: "BD", label: "Bangladesh" },
  { value: "BB", label: "Barbados" },
  { value: "BY", label: "Belarus" },
  { value: "BE", label: "Belgium" },
  { value: "BZ", label: "Belize" },
  { value: "BJ", label: "Benin" },
  { value: "BT", label: "Bhutan" },
  { value: "BO", label: "Bolivia" },
  { value: "BA", label: "Bosnia and Herzegovina" },
  { value: "BW", label: "Botswana" },
  { value: "BR", label: "Brazil" },
  { value: "BN", label: "Brunei" },
  { value: "BG", label: "Bulgaria" },
  { value: "BF", label: "Burkina Faso" },
  { value: "BI", label: "Burundi" },
  { value: "CV", label: "Cabo Verde" },
  { value: "KH", label: "Cambodia" },
  { value: "CM", label: "Cameroon" },
  { value: "CA", label: "Canada" },
  { value: "CF", label: "Central African Republic" },
  { value: "TD", label: "Chad" },
  { value: "CL", label: "Chile" },
  { value: "CN", label: "China" },
  { value: "CO", label: "Colombia" },
  { value: "KM", label: "Comoros" },
  { value: "CD", label: "Congo (DRC)" },
  { value: "CG", label: "Congo (Republic)" },
  { value: "CR", label: "Costa Rica" },
  { value: "HR", label: "Croatia" },
  { value: "CU", label: "Cuba" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czech Republic" },
  { value: "DK", label: "Denmark" },
  { value: "DJ", label: "Djibouti" },
  { value: "DM", label: "Dominica" },
  { value: "DO", label: "Dominican Republic" },
  { value: "EC", label: "Ecuador" },
  { value: "EG", label: "Egypt" },
  { value: "SV", label: "El Salvador" },
  { value: "GQ", label: "Equatorial Guinea" },
  { value: "ER", label: "Eritrea" },
  { value: "EE", label: "Estonia" },
  { value: "SZ", label: "Eswatini" },
  { value: "ET", label: "Ethiopia" },
  { value: "FJ", label: "Fiji" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "GA", label: "Gabon" },
  { value: "GM", label: "Gambia" },
  { value: "GE", label: "Georgia" },
  { value: "DE", label: "Germany" },
  { value: "GH", label: "Ghana" },
  { value: "GR", label: "Greece" },
  { value: "GD", label: "Grenada" },
  { value: "GT", label: "Guatemala" },
  { value: "GN", label: "Guinea" },
  { value: "GW", label: "Guinea-Bissau" },
  { value: "GY", label: "Guyana" },
  { value: "HT", label: "Haiti" },
  { value: "HN", label: "Honduras" },
  { value: "HU", label: "Hungary" },
  { value: "IS", label: "Iceland" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Iraq" },
  { value: "IE", label: "Ireland" },
  { value: "IL", label: "Israel" },
  { value: "IT", label: "Italy" },
  { value: "JM", label: "Jamaica" },
  { value: "JP", label: "Japan" },
  { value: "JO", label: "Jordan" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "KE", label: "Kenya" },
  { value: "KI", label: "Kiribati" },
  { value: "KP", label: "North Korea" },
  { value: "KR", label: "South Korea" },
  { value: "KW", label: "Kuwait" },
  { value: "KG", label: "Kyrgyzstan" },
  { value: "LA", label: "Laos" },
  { value: "LV", label: "Latvia" },
  { value: "LB", label: "Lebanon" },
  { value: "LS", label: "Lesotho" },
  { value: "LR", label: "Liberia" },
  { value: "LY", label: "Libya" },
  { value: "LI", label: "Liechtenstein" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "MG", label: "Madagascar" },
  { value: "MW", label: "Malawi" },
  { value: "MY", label: "Malaysia" },
  { value: "MV", label: "Maldives" },
  { value: "ML", label: "Mali" },
  { value: "MT", label: "Malta" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MR", label: "Mauritania" },
  { value: "MU", label: "Mauritius" },
  { value: "MX", label: "Mexico" },
  { value: "FM", label: "Micronesia" },
  { value: "MD", label: "Moldova" },
  { value: "MC", label: "Monaco" },
  { value: "MN", label: "Mongolia" },
  { value: "ME", label: "Montenegro" },
  { value: "MA", label: "Morocco" },
  { value: "MZ", label: "Mozambique" },
  { value: "MM", label: "Myanmar" },
  { value: "NA", label: "Namibia" },
  { value: "NR", label: "Nauru" },
  { value: "NP", label: "Nepal" },
  { value: "NL", label: "Netherlands" },
  { value: "NZ", label: "New Zealand" },
  { value: "NI", label: "Nicaragua" },
  { value: "NE", label: "Niger" },
  { value: "NG", label: "Nigeria" },
  { value: "MK", label: "North Macedonia" },
  { value: "NO", label: "Norway" },
  { value: "OM", label: "Oman" },
  { value: "PK", label: "Pakistan" },
  { value: "PW", label: "Palau" },
  { value: "PA", label: "Panama" },
  { value: "PG", label: "Papua New Guinea" },
  { value: "PY", label: "Paraguay" },
  { value: "PE", label: "Peru" },
  { value: "PH", label: "Philippines" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "QA", label: "Qatar" },
  { value: "RO", label: "Romania" },
  { value: "RU", label: "Russia" },
  { value: "RW", label: "Rwanda" },
  { value: "KN", label: "Saint Kitts and Nevis" },
  { value: "LC", label: "Saint Lucia" },
  { value: "VC", label: "Saint Vincent and the Grenadines" },
  { value: "WS", label: "Samoa" },
  { value: "SM", label: "San Marino" },
  { value: "ST", label: "Sao Tome and Principe" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "SN", label: "Senegal" },
  { value: "RS", label: "Serbia" },
  { value: "SC", label: "Seychelles" },
  { value: "SL", label: "Sierra Leone" },
  { value: "SG", label: "Singapore" },
  { value: "SK", label: "Slovakia" },
  { value: "SI", label: "Slovenia" },
  { value: "SB", label: "Solomon Islands" },
  { value: "SO", label: "Somalia" },
  { value: "ZA", label: "South Africa" },
  { value: "SS", label: "South Sudan" },
  { value: "ES", label: "Spain" },
  { value: "LK", label: "Sri Lanka" },
  { value: "SD", label: "Sudan" },
  { value: "SR", label: "Suriname" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "SY", label: "Syria" },
  { value: "TJ", label: "Tajikistan" },
  { value: "TZ", label: "Tanzania" },
  { value: "TH", label: "Thailand" },
  { value: "TL", label: "Timor-Leste" },
  { value: "TG", label: "Togo" },
  { value: "TO", label: "Tonga" },
  { value: "TT", label: "Trinidad and Tobago" },
  { value: "TN", label: "Tunisia" },
  { value: "TR", label: "Turkey" },
  { value: "TM", label: "Turkmenistan" },
  { value: "TV", label: "Tuvalu" },
  { value: "UG", label: "Uganda" },
  { value: "UA", label: "Ukraine" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "UY", label: "Uruguay" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "VU", label: "Vanuatu" },
  { value: "VE", label: "Venezuela" },
  { value: "VN", label: "Vietnam" },
  { value: "YE", label: "Yemen" },
  { value: "ZM", label: "Zambia" },
  { value: "ZW", label: "Zimbabwe" }
];


export const countryTravellingToOptions = [
{ value: "AF", label: "Afghanistan" , disabled: true},
  { value: "AL", label: "Albania", disabled: true },
  { value: "DZ", label: "Algeria", disabled: true },
  { value: "AD", label: "Andorra", disabled: true },
  { value: "AO", label: "Angola", disabled: true },
  { value: "AQ", label: "Antarctica", disabled: true },
  { value: "AG", label: "Antigua and Barbuda", disabled: true },
  { value: "AR", label: "Argentina", disabled: true },
  { value: "AR", label: "Argentina" , disabled: true },
  { value: "AM", label: "Armenia", disabled: true },
  { value: "AU", label: "Australia", disabled: true },
  { value: "AT", label: "Austria", disabled: true },
  { value: "AZ", label: "Azerbaijan", disabled: true },
  { value: "BS", label: "Bahamas", disabled: true },
  { value: "BH", label: "Bahrain", disabled: true },
  { value: "BD", label: "Bangladesh" , disabled: true  },
  { value: "BB", label: "Barbados", disabled: true  },
  { value: "BY", label: "Belarus" , disabled: true },
  { value: "BE", label: "Belgium" , disabled: true },
  { value: "BZ", label: "Belize" , disabled: true },
  { value: "BJ", label: "Benin", disabled: true  },
  { value: "BT", label: "Bhutan" , disabled: true },
  { value: "BO", label: "Bolivia" , disabled: true },
  { value: "BA", label: "Bosnia and Herzegovina" , disabled: true },
  { value: "BW", label: "Botswana" , disabled: true },
  { value: "BR", label: "Brazil", disabled: true  },
  { value: "BN", label: "Brunei" , disabled: true },
  { value: "BG", label: "Bulgaria" , disabled: true },
  { value: "BF", label: "Burkina Faso", disabled: true  },
  { value: "BI", label: "Burundi" , disabled: true },
  { value: "CV", label: "Cabo Verde" , disabled: true },
  { value: "KH", label: "Cambodia" , disabled: true },
  { value: "CM", label: "Cameroon" , disabled: true },
  { value: "CA", label: "Canada" , disabled: true},
  { value: "CF", label: "Central African Republic" , disabled: true},
  { value: "TD", label: "Chad" , disabled: true},
  { value: "CL", label: "Chile" , disabled: true},
  { value: "CN", label: "China" , disabled: true},
  { value: "CO", label: "Colombia" , disabled: true},
  { value: "KM", label: "Comoros" , disabled: true},
  { value: "CD", label: "Congo (DRC)" , disabled: true},
  { value: "CG", label: "Congo (Republic)" , disabled: true},
  { value: "CR", label: "Costa Rica" , disabled: true},
  { value: "HR", label: "Croatia" , disabled: true},
  { value: "CU", label: "Cuba" , disabled: true},
  { value: "CY", label: "Cyprus" , disabled: true},
  { value: "CZ", label: "Czech Republic" , disabled: true},
  { value: "DK", label: "Denmark" , disabled: true},
  { value: "DJ", label: "Djibouti" , disabled: true},
  { value: "DM", label: "Dominica" , disabled: true},
  { value: "DO", label: "Dominican Republic" , disabled: true},
  { value: "EC", label: "Ecuador" , disabled: true},
  { value: "EG", label: "Egypt" , disabled: true},
  { value: "SV", label: "El Salvador" , disabled: true},
  { value: "GQ", label: "Equatorial Guinea" , disabled: true},
  { value: "ER", label: "Eritrea" , disabled: true},
  { value: "EE", label: "Estonia" , disabled: true},
  { value: "SZ", label: "Eswatini" , disabled: true},
  { value: "ET", label: "Ethiopia" , disabled: true},
  { value: "FJ", label: "Fiji" , disabled: true},
  { value: "FI", label: "Finland" , disabled: true},
  { value: "FR", label: "France" , disabled: true},
  { value: "GA", label: "Gabon" , disabled: true},
  { value: "GM", label: "Gambia" , disabled: true},
  { value: "GE", label: "Georgia" , disabled: true},
  { value: "DE", label: "Germany" , disabled: true},
  { value: "GH", label: "Ghana" , disabled: true},
  { value: "GR", label: "Greece" , disabled: true},
  { value: "GD", label: "Grenada" , disabled: true},
  { value: "GT", label: "Guatemala" , disabled: true},
  { value: "GN", label: "Guinea" , disabled: true},
  { value: "GW", label: "Guinea-Bissau" , disabled: true},
  { value: "GY", label: "Guyana", disabled: true },
  { value: "HT", label: "Haiti", disabled: true },
  { value: "HN", label: "Honduras", disabled: true },
  { value: "HU", label: "Hungary", disabled: true },
  { value: "IS", label: "Iceland", disabled: true },
  { value: "IN", label: "India", disabled: true },
  { value: "ID", label: "Indonesia", disabled: true },
  { value: "IR", label: "Iran", disabled: true },
  { value: "IQ", label: "Iraq", disabled: true },
  { value: "IE", label: "Ireland", disabled: true },
  { value: "IL", label: "Israel", disabled: true },
  { value: "IT", label: "Italy", disabled: true },
  { value: "JM", label: "Jamaica", disabled: true },
  { value: "JP", label: "Japan", disabled: true },
  { value: "JO", label: "Jordan", disabled: true },
  { value: "KZ", label: "Kazakhstan", disabled: true },
  { value: "KE", label: "Kenya", disabled: true },
  { value: "KI", label: "Kiribati", disabled: true },
  { value: "KP", label: "North Korea", disabled: true },
  { value: "KR", label: "South Korea", disabled: true },
  { value: "KW", label: "Kuwait", disabled: true },
  { value: "KG", label: "Kyrgyzstan", disabled: true },
  { value: "LA", label: "Laos", disabled: true },
  { value: "LV", label: "Latvia", disabled: true },
  { value: "LB", label: "Lebanon", disabled: true },
  { value: "LS", label: "Lesotho", disabled: true },
  { value: "LR", label: "Liberia", disabled: true },
  { value: "LY", label: "Libya", disabled: true },
  { value: "LI", label: "Liechtenstein", disabled: true },
  { value: "LT", label: "Lithuania", disabled: true },
  { value: "LU", label: "Luxembourg", disabled: true },
  { value: "MG", label: "Madagascar", disabled: true },
  { value: "MW", label: "Malawi", disabled: true },
  { value: "MY", label: "Malaysia", disabled: true },
  { value: "MV", label: "Maldives", disabled: true },
  { value: "ML", label: "Mali", disabled: true },
  { value: "MT", label: "Malta", disabled: true },
  { value: "MH", label: "Marshall Islands", disabled: true },
  { value: "MR", label: "Mauritania", disabled: true },
  { value: "MU", label: "Mauritius", disabled: true },
  { value: "MX", label: "Mexico", disabled: true },
  { value: "FM", label: "Micronesia", disabled: true },
  { value: "MD", label: "Moldova", disabled: true },
  { value: "MC", label: "Monaco", disabled: true },
  { value: "MN", label: "Mongolia", disabled: true },
  { value: "ME", label: "Montenegro", disabled: true },
  { value: "MA", label: "Morocco", disabled: true },
  { value: "MZ", label: "Mozambique", disabled: true },
  { value: "MM", label: "Myanmar", disabled: true },
  { value: "NA", label: "Namibia", disabled: true },
  { value: "NR", label: "Nauru", disabled: true },
  { value: "NP", label: "Nepal", disabled: true },
  { value: "NL", label: "Netherlands", disabled: true },
  { value: "NZ", label: "New Zealand", disabled: true },
  { value: "NI", label: "Nicaragua", disabled: true },
  { value: "NE", label: "Niger", disabled: true },
  { value: "NG", label: "Nigeria", disabled: true },
  { value: "MK", label: "North Macedonia", disabled: true },
  { value: "NO", label: "Norway", disabled: true },
  { value: "OM", label: "Oman", disabled: true },
  { value: "PK", label: "Pakistan", disabled: true },
  { value: "PW", label: "Palau", disabled: true },
  { value: "PA", label: "Panama", disabled: true },
  { value: "PG", label: "Papua New Guinea", disabled: true },
  { value: "PY", label: "Paraguay", disabled: true },
  { value: "PE", label: "Peru", disabled: true },
  { value: "PH", label: "Philippines", disabled: true },
  { value: "PL", label: "Poland", disabled: true },
  { value: "PT", label: "Portugal", disabled: true },
  { value: "QA", label: "Qatar", disabled: true },
  { value: "RO", label: "Romania", disabled: true },
  { value: "RU", label: "Russia", disabled: true },
  { value: "RW", label: "Rwanda", disabled: true },
  { value: "KN", label: "Saint Kitts and Nevis", disabled: true },
  { value: "LC", label: "Saint Lucia", disabled: true },
  { value: "VC", label: "Saint Vincent and the Grenadines", disabled: true },
  { value: "WS", label: "Samoa", disabled: true },
  { value: "SM", label: "San Marino", disabled: true },
  { value: "ST", label: "Sao Tome and Principe", disabled: true },
  { value: "SA", label: "Saudi Arabia", disabled: true },
  { value: "SN", label: "Senegal", disabled: true },
  { value: "RS", label: "Serbia", disabled: true },
  { value: "SC", label: "Seychelles", disabled: true },
  { value: "SL", label: "Sierra Leone", disabled: true },
  { value: "SG", label: "Singapore", disabled: true },
  { value: "SK", label: "Slovakia", disabled: true },
  { value: "SI", label: "Slovenia", disabled: true },
  { value: "SB", label: "Solomon Islands", disabled: true },
  { value: "SO", label: "Somalia", disabled: true },
  { value: "ZA", label: "South Africa", disabled: true },
  { value: "SS", label: "South Sudan", disabled: true },
  { value: "ES", label: "Spain", disabled: true },
  { value: "LK", label: "Sri Lanka", disabled: true },
  { value: "SD", label: "Sudan", disabled: true },
  { value: "SR", label: "Suriname", disabled: true },
  { value: "SE", label: "Sweden", disabled: true },
  { value: "CH", label: "Switzerland", disabled: true },
  { value: "SY", label: "Syria", disabled: true },
  { value: "TJ", label: "Tajikistan", disabled: true },
  { value: "TZ", label: "Tanzania", disabled: true },
  { value: "TH", label: "Thailand", disabled: true },
  { value: "TL", label: "Timor-Leste", disabled: true },
  { value: "TG", label: "Togo", disabled: true },
  { value: "TO", label: "Tonga", disabled: true },
  { value: "TT", label: "Trinidad and Tobago", disabled: true },
  { value: "TN", label: "Tunisia", disabled: true },
  { value: "TR", label: "Turkey", disabled: true },
  { value: "TM", label: "Turkmenistan", disabled: true },
  { value: "TV", label: "Tuvalu", disabled: true },
  { value: "UG", label: "Uganda", disabled: true },
  { value: "UA", label: "Ukraine" },
  { value: "AE", label: "United Arab Emirates", disabled: true },
  { value: "GB", label: "United Kingdom", disabled: true },
  { value: "US", label: "United States", disabled: true },
  { value: "UY", label: "Uruguay", disabled: true },
  { value: "UZ", label: "Uzbekistan", disabled: true },
  { value: "VU", label: "Vanuatu", disabled: true },
  { value: "VE", label: "Venezuela", disabled: true },
  { value: "VN", label: "Vietnam", disabled: true },
  { value: "YE", label: "Yemen", disabled: true },
  { value: "ZM", label: "Zambia", disabled: true },
  { value: "ZW", label: "Zimbabwe", disabled: true }
];

