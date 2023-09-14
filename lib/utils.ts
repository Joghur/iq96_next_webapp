import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ContactPhone } from '@components/member/DeveloperTab';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface EvaluatePerson {
  name: string;
  email?: string;
  iqEmail?: string;
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

// TODO fix any
export function compareObjects(obj1: any, obj2: any): string[] {
  if (obj1?.length === 0 || obj2?.length === 0) {
    return [];
  }

  const mismatchedProperties: string[] = [];

  if (obj1?.names?.[0]?.displayName?.trim() !== obj2.name) {
    mismatchedProperties.push('name');
  }

  if (obj1?.emailAddresses?.[0]?.value?.trim() !== obj2.email) {
    mismatchedProperties.push('email');
  }

  if (
    !arraysAreEqual(
      obj1?.phoneNumbers?.map(
        (o: ContactPhone) => `${o.canonicalForm?.trim()}`
      ),
      obj2.phones
    )
  ) {
    mismatchedProperties.push('phones');
  }

  if (
    obj1?.addresses?.[0]?.formattedValue?.replace('DK', '').trim() !==
    obj2.address
  ) {
    mismatchedProperties.push('address');
  }

  if (obj1?.birthdays?.[0].text?.trim() !== obj2.birthday) {
    mismatchedProperties.push('birthday');
  }

  return addNameToArray(obj2.name, mismatchedProperties);
}

// TODO better way to compare phone number arrays
function arraysAreEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1?.length !== arr2?.length) {
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
    // Image label folder has this syntaxc 2023-edinbourgh
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
