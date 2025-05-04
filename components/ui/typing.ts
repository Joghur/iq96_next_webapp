import { HoverObject } from '@features/ui/form/OneFormItem';
import { isArray } from './array';

/**
 * Convert a value to a specific type depending on
 * the corresponding object property type.
 */
export const getTypedValue = (
  value: string | string[] | number | number[] | { [x: string]: string },
  property: unknown
) => {
  if (
    typeof property !== 'number' ||
    Array.isArray(value) ||
    typeof value === 'object'
  ) {
    return value;
  }

  if (typeof value === 'number') {
    return value;
  }

  if (value.includes('.')) {
    return parseFloat(value);
  } else {
    return parseInt(value, 10)!;
  }
};

export const hasId = (obj: unknown): obj is { id: unknown } => {
  return !!obj && typeof obj === 'object' && 'id' in obj;
};

export const hasName = (obj: unknown): obj is { name: unknown } => {
  return !!obj && typeof obj === 'object' && 'name' in obj;
};

export function hasErrorResponse(obj: unknown): boolean {
  return (
    !!obj && typeof obj === 'object' && 'status' in obj && 'statusText' in obj
  );
}

export type ErrorResponse = {
  status: string;
  statusText: string;
};

export function isErrorResponse(obj: unknown): obj is ErrorResponse {
  return (
    !!obj && typeof obj === 'object' && 'status' in obj && 'statusText' in obj
  );
}

export const isObject = (value: unknown): value is object => {
  return !Array.isArray(value) && typeof value === 'object';
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};
export const isStringInteger = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const isHoverObject = (obj: unknown): obj is HoverObject => {
  return !!(
    obj &&
    typeof obj === 'object' &&
    !isArray(obj) &&
    'hoverText' in obj
  );
};

export const parseNumeric = (value: string) => {
  if (value.includes('.')) {
    return parseFloat(value);
  } else {
    return parseInt(value, 10)!;
  }
};

export const extractInteger = (value: string | number) => {
  if (typeof value === 'number') return value;

  const regex = /\d+/;
  const parse = regex.exec(value);
  if (parse === null) return -1;
  return parseNumeric(parse[0]);
};

export const createIdAndNameString = (id: number | string, name: string) => {
  return `${id} (${name})`;
};
