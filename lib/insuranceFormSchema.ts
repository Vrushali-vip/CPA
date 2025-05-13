import Joi from "joi";

export const purchaseWithoutLoginSchema = Joi.object({
    c_name: Joi.string().required().trim().messages({ "string.empty": "Full Name is required." }),
    c_email: Joi.string().email({ tlds: { allow: false } }).required().trim().messages({ "string.empty": "Email is required.", "string.email": "Email must be a valid email." }),
    c_phone: Joi.string().required().messages({ "string.empty": "Phone is required." }),
    c_whats_app: Joi.string().required().messages({ "string.empty": "WhatsApp is required." }),
    c_birthdate: Joi.date().required().messages({ "any.required": "Birthdate is required.", "date.base": "Birthdate must be a valid date." }),
    c_address: Joi.string().required().messages({ "string.empty": "Address is required." }),
    c_country: Joi.string().required().messages({ "string.empty": "Residence Country is required." }),
    c_nationality: Joi.string().required().messages({ "string.empty": "Nationality is required." }),
    c_organization: Joi.string().optional().allow(""),
    trip_start_date: Joi.date().required().messages({ "any.required": "Trip Start Date is required.", "date.base": "Trip Start Date must be a valid date." }),
    trip_end_date: Joi.date().required().greater(Joi.ref('trip_start_date')).messages({
        "any.required": "Trip End Date is required.",
        "date.base": "Trip End Date must be a valid date.",
        "date.greater": "Trip End Date must be after Trip Start Date."
    }),
    stay_name: Joi.string().optional().allow(""),
    is_company_arranged: Joi.boolean().default(false),
    company_name: Joi.alternatives().conditional('is_company_arranged', {
        is: true,
        then: Joi.string().required().trim().messages({ "string.empty": "Company Name is required when trip is company arranged." }),
        otherwise: Joi.string().optional().allow("")
    }),
    trip_countries: Joi.array().items(Joi.string().required().messages({"string.empty": "Trip country cannot be empty."})).required().min(1).max(1).messages({
        "array.base": "Trip country is required.",
        "array.min": "At least one trip country is required.",
        "array.max": "Only one trip country can be specified here."
    }),
    trip_cities: Joi.array().items(Joi.object().keys({
        id: Joi.string().optional().allow(""),
        name: Joi.string().required().messages({ "string.empty": "City name is required." }),
        stay_name: Joi.string().optional().allow(""),
        zoneType: Joi.string().valid(
            "GREEN", "AMBER", "RED", "BLACK"
        ).required().messages({ "any.required": "Zone type is required.", "any.only": "Invalid zone type."})
    })).required().min(1).messages({ "array.min": "At least one trip city is required.", "array.base": "Trip cities are required." }),
    trip_purpose: Joi.string().valid(
        "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
        "EDUCATION", "PERSONAL", "OTHER"
    ).required().messages({ "any.required": "Trip purpose is required.", "any.only": "Invalid trip purpose." }),
    emergency_contact_name: Joi.string().required().messages({ "string.empty": "Emergency contact name is required." }),
    emergency_contact_phone: Joi.string().required().messages({ "string.empty": "Emergency contact phone is required." }),
    emergency_contact_relation: Joi.string().required().messages({ "string.empty": "Emergency contact relation is required." }),
    consent: Joi.boolean().valid(true).required().messages({ "any.only": "You must give consent.", "any.required": "Consent is required." }),
    travellers: Joi.array().items(Joi.object().keys({
        name: Joi.string().required().trim().messages({ "string.empty": "Traveller name is required." }),
        birthdate: Joi.date().required().messages({ "any.required": "Traveller birthdate is required.", "date.base": "Birthdate must be valid." }),
    })).required().min(1).messages({ "array.min": "At least one traveller is required.", "array.base": "Travellers are required." }),
    medical_conditions: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
    current_medications: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
    allergies: Joi.array().items(Joi.string().trim().allow('')).optional().default([]),
    blood_type: Joi.string().optional().allow(""),
    special_assistance: Joi.string().optional().allow(""),
    green_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Green zone days is required.", "number.min": "Green zone days must be at least 0." }),
    amber_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Amber zone days is required.", "number.min": "Amber zone days must be at least 0." }),
    red_zone_days: Joi.number().integer().required().min(0).messages({ "number.base": "Red zone days is required.", "number.min": "Red zone days must be at least 0." }),
    black_zone_days: Joi.number().integer().optional().min(0).default(0).messages({ "number.min": "Black zone days must be at least 0." })
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
  c_name: string;
  c_email: string;
  c_phone: string;
  c_whats_app: string;
  c_birthdate: string;
  c_address: string;
  c_country: string;
  c_nationality: string;
  c_organization?: string;
  trip_start_date: string;
  trip_end_date: string;
  stay_name?: string;
  is_company_arranged: boolean;
  company_name?: string;
  trip_countries: string[];
  trip_cities: TripCity[];
  trip_purpose: "BUSINESS" | "HUMANITARIAN_WORK" | "JOURNALISM" | "MEDICAL" | "EDUCATION" | "PERSONAL" | "OTHER" | "";
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relation: string;
  consent: boolean | undefined;
  travellers: Traveller[];
  medical_conditions?: string[];
  current_medications?: string[];
  allergies?: string[];
  blood_type?: string;
  special_assistance?: string;
  green_zone_days: number | string;
  amber_zone_days: number | string;
  red_zone_days: number | string;
  black_zone_days?: number | string;
};

export const steps = [
  "Personal Info & Travellers",
  "Trip Details",
  "Emergency Contact",
  "Medical Info",
  "Risk Zones & Consent",
];

export const tripPurposes = [
    "BUSINESS", "HUMANITARIAN_WORK", "JOURNALISM", "MEDICAL",
    "EDUCATION", "PERSONAL", "OTHER"
];

export const zoneTypes = ["GREEN", "AMBER", "RED", "BLACK"];

export const fieldsByStep: string[][] = [
  [
    'c_name', 'c_email', 'c_phone', 'c_whats_app', 'c_birthdate', 'c_address',
    'c_country', 'c_nationality', 'c_organization',
    'travellers'
  ],
  [
    'trip_start_date', 'trip_end_date',
    'trip_countries',
    'trip_purpose', 'stay_name', 'is_company_arranged', 'company_name',
    'trip_cities'
  ],
  [
    'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relation'
  ],
  [
    'medical_conditions', 'current_medications', 'allergies',
    'special_assistance', 'blood_type'
  ],
  [
    'green_zone_days', 'amber_zone_days', 'red_zone_days',
    'black_zone_days', 'consent'
  ]
];