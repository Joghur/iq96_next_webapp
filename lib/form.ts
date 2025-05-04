'use client';

import { Dispatch, SetStateAction } from 'react';

import { FormItemEventTarget } from '@features/ui/form/OneFormItem';
import { getTypedValue } from '../features/ui/typing';

/**
 * Helper type for select content and mapping.
 */
export type SelectLabelType<T, K> = { label: T; type: K };

/**
 * Generic function for handling form changes.
 * Will update useState variables when input controls are changed.
 * Is dependant on the id of the input control.
 */
export const formHandleOnChange = <T>(
  eventTarget: FormItemEventTarget,
  state: T,
  setState: Dispatch<SetStateAction<T>>
) => {
  const { id, value } = eventTarget;
  const keys = id.split('.');
  if (keys.length === 1) {
    setState((prevState) => ({
      ...prevState,
      // @ts-expect-error: lKDFJKL
      [id]: getTypedValue(value, state[id]),
    }));
  } else {
    //TODO - refactor to use this --Error type
    console.log('formHandleOnChange-----else-');
  }
};

export const getLabelOrType = (
  typeOrLabel: string,
  flow: 'toType' | 'toLabel',
  selectMapping: any
): string => {
  if (!selectMapping) return '';

  if (flow === 'toType') {
    const matchingType = selectMapping.find(
      (typeObj: { label: string }) => typeObj.label === typeOrLabel
    );

    return matchingType ? matchingType.type : '';
  } else {
    const matchingType = selectMapping.find(
      (typeObj: { type: string }) => typeObj.type === typeOrLabel
    );

    return matchingType ? matchingType.label : '';
  }
};

/**
 *  Helper function for calculating height of textarea.
 */
export const calculateHeight = (value: string) => {
  const lineHeight = 1.4;
  const lines = value.split('\n');
  const longestLineLength = Math.max(...lines.map((line) => line.length));
  const minHeight = 1.4;
  const dynamicHeight = (lines.length + 1) * lineHeight + minHeight;

  return `${Math.max(
    dynamicHeight,
    (longestLineLength / 50) * lineHeight + minHeight
  )}rem`;
};
export const createSelectionOption = (
  label: string,
  type?: string
): SelectLabelType<string, string> => ({
  label: label,
  type: type ? type : label,
});
