'use client';

import { SelectLabelType } from '@lib/form';
import OneFormItem, { FormItemEventTarget, HoverInfo } from './OneFormItem';
import { ListGroupFormKeys } from './formItems/FormListGroup';

/**
 * Use the FormBuilder type as guide to make forms. Each FormBuilder item in an array
 * represents one type of form shown on page.
 *
 * All items must have a label and a propertyKey. The rest is optional and shown below.
 *
 * - boolean, text and number forms: automatically generated from propertyKey
 * - textarea: showAs: "textarea"
 * - date: showAs: "date"
 * - select: selection (array of SelectLabelType. Also used for mapping)
 * - radio buttons: selection (see select) and showAs: "radiobutton"
 * - list group: showAs: "listgroup", optional listGroupFormKeys (for object keys)
 *               and selection
 * - hover info: hoverInfo: string, string array or
 *                 { hoverText: string | string[], placement: "auto" (default) }
 * - disabled: disabled: boolean, default false
 *
 */
export type FormBuilder<T> = {
  label: string;
  propertyKey: keyof T;
  showAs?: 'textarea' | 'radiobutton' | 'listgroup' | 'date' | undefined;
  selection?: SelectLabelType<unknown, unknown>[];
  selectLabelMapping?: unknown;
  listGroupFormKeys?: ListGroupFormKeys;
  hoverInfo?: HoverInfo;
  disabled?: boolean;
};

type Props<T> = {
  builderArray: FormBuilder<T>[];
  data: T | null;
  asRow?: boolean;
  onChange: (eventTarget: FormItemEventTarget) => void;
};

function ManyFormItems<T>({
  builderArray,
  data,
  asRow = false,
  onChange,
}: Props<T>) {
  if (!data) {
    return null;
  }

  return (
    <div className={asRow ? 'flex flex-row' : undefined}>
      {builderArray.map((builderItem) => (
        <OneFormItem
          key={builderItem.propertyKey.toString()}
          as={builderItem?.showAs === 'textarea' ? 'textarea' : undefined}
          type={
            builderItem?.showAs !== 'textarea' ? builderItem?.showAs : undefined
          }
          label={builderItem.label}
          propertyKey={builderItem.propertyKey.toString()}
          value={data[builderItem.propertyKey] as string}
          selection={builderItem.selection}
          listGroupFormKeys={builderItem.listGroupFormKeys}
          hoverInfo={builderItem.hoverInfo}
          vertical={asRow}
          disabled={builderItem.disabled}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export default ManyFormItems;
