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

import Joi from "joi";
import { Path } from "react-hook-form";

export const emergencyMedicalCoverageOptions = [
    { value: "50000", label: "$50,000" },
    { value: "100000", label: "$100,000" },
    { value: "150000", label: "$150,000" },
    { value: "200000", label: "$200,000" },
    { value: "250000", label: "$250,000" },
];

export const personalAccidentCoverageOptions = [
    { value: "0", label: "No PA Coverage" },
    { value: "50000", label: "$50,000" },
    { value: "100000", label: "$100,000" },
    { value: "150000", label: "$150,000" },
    { value: "200000", label: "$200,000" },
    { value: "250000", label: "$250,000" },
];


// --- Main Schema ---
export const purchaseWithoutLoginSchema = Joi.object({
    trip_start_date: Joi.date()
  .required()
  .messages({
    "any.required": "Travel Start Date is required.",
    "date.base": "Enter valid date.",
  }),

trip_end_date: Joi.date()
  .required()
  .greater(Joi.ref("trip_start_date"))
  .messages({
    "any.required": "Travel End Date is required.",
    "date.base": "Enter valid date.",
    "date.greater": "Travel End Date must be after Travel Start Date.",
  }),

    
    green_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Green Zone Days is required. Enter 0 if none.", "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
    amber_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Amber Zone Days is required. Enter 0 if none.", "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
    red_zone_days: Joi.number().integer().required().min(0).messages({ "any.required": "Red Zone Days is required. Enter 0 if none.", "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
    black_zone_days: Joi.number().integer().optional().min(0).default(0),

    emergency_medical_coverage: Joi.string().required().messages({ "any.required": "Emergency Medical Coverage is required.", "string.empty": "Emergency Medical Coverage is required." }),
    personal_accident_coverage_level: Joi.string().required().messages({ "any.required": "PA Coverage Level is required.", "string.empty": "PA Coverage Level is required." }),
    add_transit_coverage: Joi.boolean().default(false),

    c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
    c_birthdate: Joi.date().required().messages({ "any.required": "Date of Birth is required.", "date.base": "Date of Birth must be a valid date." }),
    c_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Phone Number is required.", "string.min": "Phone Number seems too short." }),
    c_whats_app: Joi.string().optional().allow("").trim().min(5).messages({ "string.min": "WhatsApp Number seems too short (if provided)."}),
    c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email Address is required.", "string.email": "Email must be a valid email." }),
    c_nationality: Joi.string().required().messages({ "any.required": "Nationality is required.", "string.empty": "Nationality is required." }),
    city_of_residence: Joi.string().required().trim().messages({ "string.empty": "City of Residence is required." }),
    trip_countries: Joi.array().items(Joi.string().required().messages({"any.required": "Country Travelling To is required.","string.empty": "Country Travelling To cannot be empty."})).required().min(1).max(1).messages({ 
        "array.base": "Country Travelling To is required.",
        "array.min": "Country Travelling To is required."
    }),
    
    travellers: Joi.array().items(Joi.object().keys({
        name: Joi.string().required().trim().messages({ "string.empty": "Traveller Name is required." }),
        birthdate: Joi.date().iso().required().messages({ "any.required": "Traveller Date of Birth is required.", "date.base": "Traveller Date of Birth must be valid." }),
    })).min(1).messages({ "array.min": "At least one traveller is required."}), 

    arrival_in_ukraine: Joi.date().iso().optional().allow(null, ''),
    departure_from_ukraine: Joi.date().iso().optional().allow(null, '').greater(Joi.ref('arrival_in_ukraine')).messages({
         "date.greater": "Departure from Ukraine must be after Arrival in Ukraine."
    }),
    primary_cities_regions_ukraine: Joi.string().optional().allow(""),
    
    trip_cities: Joi.array().items(Joi.object().keys({
        id: Joi.string().optional().allow(""), 
        name: Joi.string().required().trim().messages({ "string.empty": "City Name is required."}),
        stay_name: Joi.string().optional().allow(""), 
        zoneType: Joi.string().valid("GREEN", "AMBER", "RED", "BLACK").required().messages({"any.required": "Zone type for city is required."}) // Defaulted in UI
    })).optional().min(0),

    trip_purpose: Joi.string().valid(
        "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
        "EDUCATION", "PERSONAL", "OTHER"
    ).required().messages({ "any.required": "Purpose of Travel is required.", "any.only": "Invalid Purpose of Travel." }),
    stay_name: Joi.string().optional().allow(""),
    company_name: Joi.string().optional().allow(""),

    emergency_contact_name: Joi.string().required().trim().messages({ "string.empty": "Emergency Contact Name is required." }),
    emergency_contact_phone: Joi.string().required().trim().min(5).messages({ "string.empty": "Emergency Contact Number is required.", "string.min": "Emergency Contact Number seems too short." }),
    emergency_contact_relation: Joi.string().required().trim().messages({ "string.empty": "Emergency Contact Relationship is required." }),
    has_medical_conditions: Joi.boolean().default(false),
    has_allergies: Joi.boolean().default(false),
    has_current_medications: Joi.boolean().default(false),
    medical_conditions: Joi.when('has_medical_conditions', {
        is: true,
        then: Joi.array().items(Joi.string().trim().allow('')).min(1).required().messages({ "array.min": "Please list pre-existing medical conditions.", "any.required": "Please list pre-existing medical conditions."}),
        otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
    }),
    allergies: Joi.when('has_allergies', {
        is: true,
        then: Joi.array().items(Joi.string().trim().allow('')).min(1).required().messages({ "array.min": "Please list allergies.", "any.required": "Please list allergies."}),
        otherwise: Joi.array().items(Joi.string().trim().allow('')).optional().default([])
    }),
    current_medications: Joi.when('has_current_medications', {
        is: true,
        then: Joi.array().items(Joi.string().trim().allow('')).min(1).required().messages({ "array.min": "Please list current medications.", "any.required": "Please list current medications."}),
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

}).custom((value, helpers) => {
    if (!value.trip_start_date || !value.trip_end_date) return value;
    const startDate = new Date(value.trip_start_date);
    const endDate = new Date(value.trip_end_date);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
        return value; 
    }
    const totalCalculatedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;
    
    const sumOfZoneDays = Number(value.green_zone_days || 0) + Number(value.amber_zone_days || 0) + Number(value.red_zone_days || 0);
    if (sumOfZoneDays !== totalCalculatedDays) {
        return helpers.error('object.sum', { field: 'zone_days_sum', sumOfZoneDays, totalCalculatedDays });
    }
    return value;
}).messages({
    'object.sum': 'The sum of Green, Amber, and Red Zone Days ({{#sumOfZoneDays}}) must equal the Total Travel Days ({{#totalCalculatedDays}}). Please adjust.'
});


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
  trip_start_date: string;
  trip_end_date: string;
  green_zone_days: number | string;
  amber_zone_days: number | string;
  red_zone_days: number | string;
  black_zone_days?: number | string;
  emergency_medical_coverage: string;
  personal_accident_coverage_level: string;
  add_transit_coverage: boolean;

  c_name: string; 
  c_birthdate: string; 
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

export const steps = [
  "Trip & Coverage",
  "Your Details",
  "Trip Information",
  "Medical & Emergency",
  "Summary & Purchase"
];

export const tripPurposes = [
    "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
    "EDUCATION", "PERSONAL", "OTHER"
];

export const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"];

export const fieldsByStep: Array<Array<Path<InsuranceFormValues>>> = [
  [
    "trip_start_date", "trip_end_date",
    "green_zone_days", "amber_zone_days", "red_zone_days",
    "emergency_medical_coverage", "personal_accident_coverage_level", "add_transit_coverage"
  ],
  [
    "c_name", "c_birthdate", "c_phone", "c_whats_app", "c_email",
    "c_nationality", "city_of_residence", "trip_countries",
    "travellers" 
  ],
  [
    "primary_cities_regions_ukraine",
    "trip_purpose", "stay_name", "company_name",
    "trip_cities" 
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
