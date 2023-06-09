import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ContactPhone } from "@components/member/Contacts";

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
    mismatchedProperties.push("name");
  }

  if (obj1?.emailAddresses?.[0]?.value?.trim() !== obj2.email) {
    mismatchedProperties.push("email");
  }

  if (
    !arraysAreEqual(
      obj1?.phoneNumbers?.map(
        (o: ContactPhone) => `${o.canonicalForm?.trim()}`
      ),
      obj2.phones
    )
  ) {
    mismatchedProperties.push("phones");
  }

  if (
    obj1?.addresses?.[0]?.formattedValue?.replace("DK", "").trim() !==
    obj2.address
  ) {
    mismatchedProperties.push("address");
  }

  if (obj1?.birthdays?.[0].text?.trim() !== obj2.birthday) {
    mismatchedProperties.push("birthday");
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
