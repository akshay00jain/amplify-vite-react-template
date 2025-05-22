import * as Yup from 'yup';
import { yupResolver as YupResolver } from '@hookform/resolvers/yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { LabelsProvider } from '@/context/LabelsContext';
import { LABELS_PATH } from '@/context/constants'

// Load labels synchronously at runtime
let labels: Record<string, string> = {};

try {
    // Fetch labels synchronously if in a Node.js environment
    const response = await fetch(LABELS_PATH, { method: 'GET' });
    if (response.ok) {
        labels = await response.json();
    } else {
        console.error('Failed to fetch labels:', response.statusText);
    }
} catch (error) {
    console.error('Error fetching labels:', error);
}

const phoneNumberRegex = /^$|^(\+?1?[-.\s]?)?(\(?[2-9]\d{2}\)?[-.\s]?)?[2-9]\d{2}[-.\s]?\d{4}$/;

export const basicInfoSchema = Yup.object().shape({
    displayName: Yup.string()
        .required(labels.validation.displayNameRequired)
        .min(5, labels.validation.displayNameMin)
        .max(50, labels.validation.displayNameMax),
    firstName: Yup.string().max(50, labels.validation.firstNameMax),
    lastName: Yup.string().max(50, labels.validation.lastNameMax),
    contactType: Yup.string().required(labels.validation.relationshipTypeRequired),
    gender: Yup.string().required(labels.validation.genderRequired),
    metSource: Yup.string().required(labels.validation.metSourceRequired),
    birthday: Yup.date()
        .nullable()
        .test('is-past-date', labels.validation.birthdayMax, function(value) {
        const now = new Date();
        return !value || value <= now;
    }),
    age: Yup.number()
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .nullable()
        .notRequired()
        .min(18, labels.validation.ageMin)
        .max(100, labels.validation.ageMax)
        .test('is-empty-or-valid-number', labels.validation.ageValid, (value) => {
        return value === null || (value >= 18 && value <= 100);
    })
},
{
    abortEarly: false,
});

