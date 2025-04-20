'use client';

import { ChangeEvent } from 'react';

import FormCheckBox from '@/components/ui/form/formItems/FormCheckBox';
import FormControl from '@/components/ui/form/formItems/FormControl';
import FormListGroup, {
  ListGroupFormKeys,
} from '@/components/ui/form/formItems/FormListGroup';
import FormRadioButtonGroup from '@/components/ui/form/formItems/FormRadioButtonGroup';
import FormSelect from '@/components/ui/form/formItems/FormSelect';

import styles from './OneFormItem.module.css';
import { SelectLabelType } from '../../../lib/form';
import { isArray } from '../array';
import { isHoverObject } from '../typing';
import Tooltip from '../Tooltip';
import ErrorMessage, {
  ErrorMessageType,
} from '@components/errors/ErrorMessage';
import { epochToDate } from '../../../lib/date';

export type SelectObject = { [x: string]: string | number };

export type FormItemEventTarget = {
  id: string;
  value: string | string[] | number | number[] | boolean | SelectObject;
};

export type HoverObject = {
  hoverText: string | string[];
  placement: 'left' | 'right' | 'bottom' | 'top' | 'auto';
};

export type HoverInfo = string | string[] | HoverObject;

export type FormAs = 'input' | 'textarea';
export type FormType = 'radiobutton' | 'listgroup' | 'date';
export type ShowItem =
  | 'checkbox'
  | 'date'
  | 'listgroup'
  | 'number'
  | 'radiobutton'
  | 'select'
  | 'string';

/**
 * Select which form items to show
 * It tries to determine this based on - in order:
 * - type of value
 * - a selection and the variable type
 * - the variable type
 * - undefined are treated as strings for the time being
 */
const formItemHub = (
  value: string | number | boolean | object | undefined,
  selection?: SelectLabelType<any, any>[],
  type?: FormType
): ShowItem | ErrorMessageType => {
  if (!selection) {
    //TODO get real type of property from Type when undefined value from API
    if (value === undefined || value === null) {
      return 'string';
    }

    switch (typeof value) {
      case 'string':
        return 'string';

      case 'number':
        if (type === 'date') {
          return 'date';
        }
        return 'number';

      case 'boolean':
        return 'checkbox';
    }
  }

  if (selection && type !== 'listgroup') {
    switch (type) {
      case 'radiobutton':
        return 'radiobutton';

      default:
        return 'select';
    }
  }

  if (type === 'listgroup') {
    return 'listgroup';
  }

  return 'Kan ikke vælge formtype';
};

type Props<T> = {
  label: string;
  propertyKey: keyof T;
  value: string | number | object | boolean | undefined;
  onChange: (eventTarget: FormItemEventTarget) => void;
  as?: FormAs;
  type?: FormType;
  selection?: SelectLabelType<unknown, unknown>[];
  listGroupFormKeys?: ListGroupFormKeys;
  hoverInfo?: HoverInfo;
  vertical?: boolean;
  disabled?: boolean;
};

function OneFormItem<T extends Record<string, any>>({
  label,
  value,
  propertyKey,
  onChange,
  as = 'input',
  type,
  selection,
  listGroupFormKeys,
  hoverInfo,
  vertical = false,
  disabled = false,
}: Props<T>) {
  const handleSelectChange = (value: string | number) => {
    onChange({
      id: propertyKey.toString(),
      value: value,
    });
  };

  const handleRadioChange = (id: string, value: string) => {
    onChange({
      id: id,
      value: value || '',
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    onChange({
      id: propertyKey.toString(),
      value: checked,
    });
  };

  const handleControlChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    onChange({ id: propertyKey.toString(), value: value });
  };

  const handleListGroupChange = (
    listGroupItems: string[] | { [x: string]: string }
  ) => {
    onChange({
      id: propertyKey.toString(),
      value: isArray(listGroupItems)
        ? [...listGroupItems]
        : { ...listGroupItems },
    });
  };

  const showFormItemAs: ShowItem | ErrorMessageType = formItemHub(
    value,
    selection,
    type
  );

  const hoverPlacement = isHoverObject(hoverInfo)
    ? hoverInfo.placement
    : 'left';
  const hoverText = isHoverObject(hoverInfo) ? hoverInfo.hoverText : hoverInfo;

  return (
    <Tooltip text={hoverText} position={hoverPlacement}>
      <div className={vertical ? styles.fieldColumn : styles.fieldRow}>
        <div className={vertical ? styles.fieldNameVertical : styles.fieldName}>
          {label}
        </div>
        <span
          className={
            vertical
              ? styles.fieldControlWrapperVertical
              : styles.fieldControlWrapper
          }
        >
          <>
            {showFormItemAs === undefined && <></>}
            {showFormItemAs === 'checkbox' && (
              <FormCheckBox
                propertyKey={propertyKey.toString()}
                isChecked={value as boolean}
                disabled={disabled}
                onChange={handleCheckboxChange}
              />
            )}
            {showFormItemAs === 'date' && (
              <FormControl
                value={epochToDate(value as number)}
                propertyKey={propertyKey.toString()}
                as={as}
                type="date"
                disabled={disabled}
                onChange={handleControlChange}
              />
            )}
            {showFormItemAs === 'listgroup' && (
              <FormListGroup
                label={label}
                value={value as object}
                listGroupFormKeys={listGroupFormKeys}
                selection={selection as SelectLabelType<any, any>[]}
                disabled={disabled}
                onChange={handleListGroupChange}
              />
            )}
            {showFormItemAs === 'number' && (
              <FormControl
                value={value as number}
                propertyKey={propertyKey.toString()}
                as={as}
                type="number"
                disabled={disabled}
                onChange={handleControlChange}
              />
            )}
            {showFormItemAs === 'radiobutton' && (
              <FormRadioButtonGroup
                selection={selection}
                propertyKey={propertyKey.toString()}
                checked={value?.toString()}
                disabled={disabled}
                onChange={handleRadioChange}
              />
            )}
            {showFormItemAs === 'select' && (
              <FormSelect
                label={label}
                value={value?.toString()}
                selection={selection as SelectLabelType<any, any>[]}
                disabled={disabled}
                onChange={handleSelectChange}
              />
            )}
            {showFormItemAs === 'string' && (
              <FormControl
                value={value?.toString() || ''}
                propertyKey={propertyKey.toString()}
                type="text"
                as={as}
                disabled={disabled}
                onChange={handleControlChange}
              />
            )}
            {showFormItemAs === 'Kan ikke vælge formtype' &&
              ErrorMessage({ message: showFormItemAs })}
          </>
        </span>
      </div>
    </Tooltip>
  );
}

export default OneFormItem;
