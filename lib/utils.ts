import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Connection, ContactPhone } from '@components/member/DeveloperTab';
import { DocumentUser } from './hooks/useFirestore';
import { convertMonthNumberToName } from './dates';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface EvaluatePerson {
  name: string;
  email?: string;
  phones: string[];
  address: string;
  birthday: string;
}

const addNameToArray = (textValue: string, list: string[]): string[] => {
  if (list[0] !== textValue) {
    return [textValue, ...list];
  }
  return list;
};

export function compareObjects(
  contact: Connection | undefined,
  docUser: DocumentUser
): string[] {
  if (!contact || !docUser) {
    return [];
  }

  const mismatchedProperties: string[] = [];

  if (contact?.names?.[0]?.displayName?.trim() !== docUser.name) {
    mismatchedProperties.push('name');
  }

  if (contact?.nicknames?.[0]?.value?.trim() !== docUser.nick) {
    mismatchedProperties.push('nick');
  }

  if (contact?.emailAddresses?.[0]?.value?.trim() !== docUser.email) {
    mismatchedProperties.push('email');
  }

  if (
    !arraysAreEqual(
      contact?.phoneNumbers?.map(
        (o: ContactPhone) => `${o.canonicalForm?.trim()}`
      ),
      docUser.phones
    )
  ) {
    mismatchedProperties.push('phones');
  }

  if (
    contact?.addresses?.[0]?.formattedValue?.replace('DK', '').trim() !==
    docUser.address
  ) {
    mismatchedProperties.push('address');
  }

  const birthdate = contact?.birthdays?.[0].date;
  const birthday =
    `${birthdate?.day}. ${convertMonthNumberToName(birthdate?.month)} ${birthdate?.year}` ||
    '';

  if (birthday.trim() !== docUser.birthday) {
    mismatchedProperties.push('birthday');
  }

  if (contact?.organizations?.[0].title?.trim() !== docUser.title) {
    mismatchedProperties.push('title');
  }

  return addNameToArray(docUser.name, mismatchedProperties);
}

// TODO better way to compare phone number arrays
function arraysAreEqual(
  arr1: string[] | undefined,
  arr2: string[] | undefined
): boolean {
  if (!arr1 || !arr2 || arr1?.length !== arr2?.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

// TODO fix any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compareNick(a: any, b: any) {
  if (a.nick < b.nick) {
    return -1;
  }
  if (a.nick > b.nick) {
    return 1;
  }
  return 0;
}

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 *
 * @param label Prettify labels
 * 2023-edinbourgh -> 2023 - Edinbourgh
 */
export const prettyImageFolderLabel = (label: string) => {
  if (label.includes('-')) {
    // Image label folder has this syntax 2023-edinbourgh
    const labelParts = label.split('-');
    return `${labelParts[0]} - ${capitalizeFirstLetter(labelParts[1])}`;
  }
  return label;
};

/**
 * Not all labels will be pulled from params and they're in english. So this wil be a short translater
 * as this will never change
 */
export const convertLabels = (label: string) => {
  switch (label) {
    case 'gf':
      return 'Generalforsamling';

    case 'events':
      return 'Stævner';

    default:
      return 'Tour';
  }
};

/**
 * Converting one instance of urlsafe to normal text
 */
export const convertFromUrlSafe = (label: string) => {
  const newLabel = label;
  return decodeURIComponent(newLabel);
};

interface SortConfig<T> {
  property: keyof T;
  order: 'asc' | 'desc';
}

export function sortObjectArray<T>(arr: T[], config: SortConfig<T>): T[] {
  return arr.slice().sort((a, b) => {
    const valueA = a[config.property];
    const valueB = b[config.property];

    if (config.order === 'desc') {
      if (valueA > valueB) return -1;
      if (valueA < valueB) return 1;
    } else {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
    }

    return 0;
  });
}

export const isHorizontal = () => {
  const isHorizontal = window.innerWidth > window.innerHeight;

  return isHorizontal;
};
