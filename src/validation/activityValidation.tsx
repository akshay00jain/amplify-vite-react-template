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

export function basicActivitySchema(labels) {
    return Yup.object().shape({
        activityName: Yup.string()
            .required(labels.validation.activityNameRequired),

        activityTypeId: Yup.string()
            .required(labels.validation.activityTypeRequired),

        dateTime: Yup.date()
            .required(labels.validation.dateTimeRequired),

        location: Yup.string()
            .nullable(),

        cost: Yup.number()
            .min(0, labels.validation.costMin)
            .nullable(),

        starRating: Yup.number()
            .min(1, labels.validation.starRatingMin)
            .max(5, labels.validation.starRatingMax)
            .nullable(),

        followUp: Yup.boolean(),

        isPrivate: Yup.boolean(),

        birthControl: Yup.string()
            .nullable(),

        positions: Yup.array()
            .nullable(),

        howWasIt: Yup.string()
            .nullable(),

        activityTags: Yup.array()
            .nullable(),

        spotifyPlaylistId: Yup.string()
            .nullable(),

        photoUrls: Yup.array()
            .nullable(),

        videoUrl: Yup.string()
            .nullable(),
    });
}

export function whenWhereSchema(labels) {
    return Yup.object().shape({
        address1: Yup.string() // not required
            .nullable(),
        address2: Yup.string() // not required
            .nullable(),
        city: Yup.string() // not required
            .nullable(),
        state: Yup.string() // not required
            .nullable(),
        zip: Yup.string() // not required
            .nullable(),
        country: Yup.string() // not required
            .nullable(),
    });
}
           
export function whoWhatSchema(labels) {
    return Yup.object().shape({
        cost: Yup.number()
            .min(0, labels.validation.costMin)
            .nullable(),
    });
}
 
export function gallerySchema(labels) {
    return Yup.object().shape({
        photoUrls: Yup.array()
            .nullable(),
        videoUrl: Yup.string()
            .nullable(),
    });
}

export function lastTabSchema(labels) {
    return Yup.object().shape({
        starRating: Yup.number()
            .min(1, labels.validation.starRatingMin)
            .max(5, labels.validation.starRatingMax)
            .nullable(),
        howWasIt: Yup.string()
            .nullable(),
    });
}