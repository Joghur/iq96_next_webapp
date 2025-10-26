'use client';

import { SetStateAction, useState } from 'react';
// Fjernet React-Bootstrap imports
// import { ListGroup } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';

import styles from './FormListGroup.module.css';
import { SelectLabelType } from '@lib/form';
import { isArray, isStringArray } from '@components/ui/array';
import { isObject, isStringInteger } from '@components/ui/typing';
import { Button } from '@components/ui/button';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import FormSelect from './FormSelect';
import Modal from '@components/Modal';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type ListGroupFormKeys = { label: string; type: 'text' | 'number' }[];

export type ListGroupObject = { [x: string]: string };

type Props = {
  label: string;
  value: string | number | object | undefined;
  onChange: (arg0: string[] | ListGroupObject) => void;
  listGroupFormKeys?: ListGroupFormKeys;
  selection?: SelectLabelType<string, string>[];
  disabled: boolean;
};

const isIndexInRange = (
  value: string | number | object | undefined,
  selectedListGroupItemIndex: number | undefined
) => {
  if (
    !value ||
    selectedListGroupItemIndex === undefined ||
    selectedListGroupItemIndex < 0
  )
    return false;

  if (isArray(value)) {
    return selectedListGroupItemIndex < value.length;
  }
  if (isObject(value)) {
    return selectedListGroupItemIndex < Object.keys(value).length;
  }
  return false;
};

const handleListgroupIs = (
  value: string | number | object | undefined,
  selection?: SelectLabelType<string, string>[]
) => {
  if (selection) {
    return 'select' as const;
  }
  if (isArray(value)) {
    return 'array' as const;
  }
  if (isObject(value)) {
    return 'object' as const;
  }
  return undefined;
};

/**
 * Shows a list group with a modal for adding and removing items
 * Can be a string array, object with string keys and values
 * or a select box
 */
const FormListGroup = ({
  label,
  value,
  selection,
  disabled,
  onChange,
  listGroupFormKeys,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedListGroupItemIndex, setSelectedListGroupItemIndex] = useState<
    number | undefined
  >(undefined);

  const [newItemText, setNewItemText] = useState('');
  const [newItemObjectKey, setNewItemTextObjectKey] = useState('');
  const [newItemObjectValue, setNewItemTextObjectValue] = useState('');

  const listgroupIs: 'array' | 'object' | 'select' | undefined =
    handleListgroupIs(value, selection);

  const handleListGroupChange = (actionType: 'add' | 'remove') => {
    const indexInRange = isIndexInRange(value, selectedListGroupItemIndex);

    switch (actionType) {
      case 'add':
        switch (listgroupIs) {
          case 'array':
          case 'select':
            if (isArray(value)) {
              onChange([...(value as string[]), newItemText]);
            }
            break;

          case 'object':
            onChange({
              ...(value as object),
              [newItemObjectKey]: newItemObjectValue,
            });
            break;

          default:
            throw Error('Should not reach this');
        }
        handleCloseModal();
        setNewItemText('');
        setNewItemTextObjectKey('');
        setNewItemTextObjectValue('');
        break;

      case 'remove':
        if (indexInRange) {
          if (
            (listgroupIs === 'array' || listgroupIs === 'select') &&
            isStringArray(value)
          ) {
            const newItems = [...value];
            if (selectedListGroupItemIndex != undefined) {
              newItems.splice(selectedListGroupItemIndex, 1);
            }
            onChange(newItems);
          }
          if (listgroupIs === 'object') {
            const newItems: Record<string, string> = {
              ...(value as object),
            } as any;
            const keyToDelete =
              Object.keys(newItems)[selectedListGroupItemIndex!];
            delete newItems[keyToDelete];
            onChange(newItems);
          }
        }
        break;

      default:
        throw Error('Should not reach this');
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormControlInputChange = (v: string) => {
    const shouldBeNumeric =
      listGroupFormKeys && listGroupFormKeys[0].type === 'number';

    if (shouldBeNumeric) {
      if (!isStringInteger(v) && v !== '') return;
    }
    setNewItemTextObjectKey(v);
  };
  const handleFormSelectInputChange = (v: string) => {
    setNewItemText(v);
  };

  return (
    <>
      {/* Erstatning for <ListGroup> */}
      <div className={styles.listGroup}>
        <div
          className={cn(
            styles.listGroupItem,
            disabled && 'opacity-60 pointer-events-none'
          )}
        >
          <div>
            {!value && <span className={styles.listGroupItemContainer} />}

            {listgroupIs === 'array' &&
              isStringArray(value) &&
              value.map((valueString: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectedListGroupItemIndex(() => index)}
                  className={cn(
                    styles.listGroupItemContainer,
                    selectedListGroupItemIndex === index
                      ? styles.listGroupItemActive
                      : ''
                  )}
                >
                  {valueString}
                </div>
              ))}

            {listgroupIs === 'object' &&
              isObject(value) &&
              Object.entries(value as Record<string, string>).map(
                ([k, v], index: number) => (
                  <div
                    key={index}
                    onClick={() => setSelectedListGroupItemIndex(() => index)}
                    className={cn(
                      styles.listGroupItemContainer,
                      selectedListGroupItemIndex === index
                        ? styles.listGroupItemActive
                        : ''
                    )}
                  >
                    {k} - {v}
                  </div>
                )
              )}

            {listgroupIs === 'select' &&
              isArray(value) &&
              (value as unknown[]).map((valueItem, index: number) => {
                if (typeof valueItem === 'string') {
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedListGroupItemIndex(() => index)}
                      className={cn(
                        styles.listGroupItemContainer,
                        selectedListGroupItemIndex === index
                          ? styles.listGroupItemActive
                          : ''
                      )}
                    >
                      {valueItem.toString()}
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>

        <div className={styles.listGroupButtonContainer}>
          <Button onClick={handleShowModal} disabled={disabled}>
            <PlusIcon className="text-4xl" />
          </Button>
          <div className={styles.divider} />
          <Button
            variant="destructive"
            onClick={() => handleListGroupChange('remove')}
            disabled={
              (isArray(value) && (value as any[]).length === 0) || disabled
            }
          >
            <TrashIcon />
          </Button>
        </div>
      </div>

      {/* Modal = din shadcn-wrapper (kompatibel med <Modal.Header/Title/Body/Footer>) */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`${listgroupIs === 'array' || listgroupIs === 'object' ? 'Indtast' : 'Vælg'} ${label}`}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {listgroupIs === 'array' && (
            <Input
              type="text"
              placeholder="Indtast"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
            />
          )}

          {listgroupIs === 'object' &&
            listGroupFormKeys &&
            listGroupFormKeys.length > 0 && (
              <div>
                {listGroupFormKeys[0] && (
                  <div>
                    <Input
                      type="text"
                      placeholder={listGroupFormKeys[0].label}
                      value={newItemObjectKey}
                      onChange={(e) =>
                        handleFormControlInputChange(e.target.value)
                      }
                    />
                  </div>
                )}
                {listGroupFormKeys[1] && (
                  <div className={styles.listGroupBottomFormControl}>
                    <Input
                      type="text"
                      placeholder={listGroupFormKeys[1].label}
                      value={newItemObjectValue}
                      onChange={(e) =>
                        setNewItemTextObjectValue(e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            )}

          {listgroupIs === 'select' && (
            <FormSelect
              label="listgroup-select"
              selection={selection as SelectLabelType<string, string>[]}
              disabled={disabled}
              onChange={(eventValue: string) =>
                handleFormSelectInputChange(eventValue)
              }
            />
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => handleListGroupChange('add')}>OK</Button>
          <Button variant="destructive" onClick={handleCloseModal}>
            Fortryd
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormListGroup;

// import { SetStateAction, useState } from 'react';
// import { ListGroup } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';

// import styles from './FormListGroup.module.css';
// import { SelectLabelType } from '@lib/form';
// import { isArray, isStringArray } from '@components/ui/array';
// import { isObject, isStringInteger } from '@components/ui/typing';
// import { Button } from '@components/ui/button';
// import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
// import FormSelect from './FormSelect';
// import Modal from '@components/Modal';

// export type ListGroupFormKeys = { label: string; type: 'text' | 'number' }[];

// export type ListGroupObject = { [x: string]: string };

// type Props = {
//   label: string;
//   value: string | number | object | undefined;
//   onChange: (arg0: string[] | ListGroupObject) => void;
//   listGroupFormKeys?: ListGroupFormKeys;
//   selection?: SelectLabelType<string, string>[];
//   disabled: boolean;
// };

// const isIndexInRange = (
//   value: string | number | object | undefined,
//   selectedListGroupItemIndex: number | undefined
// ) => {
//   if (
//     !value ||
//     selectedListGroupItemIndex === undefined ||
//     selectedListGroupItemIndex < 0
//   )
//     return false;

//   if (isArray(value)) {
//     return selectedListGroupItemIndex < value.length;
//   }
//   if (isObject(value)) {
//     return selectedListGroupItemIndex < Object.keys(value).length;
//   }
//   return false;
// };

// const handleListgroupIs = (
//   value: string | number | object | undefined,
//   selection?: SelectLabelType<string, string>[]
// ) => {
//   if (selection) {
//     return 'select';
//   }
//   if (isArray(value)) {
//     return 'array';
//   }
//   if (isObject(value)) {
//     return 'object';
//   }
//   return undefined;
// };
// /**
//  * Shows a list group with a modal for adding and removing items
//  * Can be a string array, object with string keys and values
//  * or a select box
//  */
// const FormListGroup = ({
//   label,
//   value,
//   selection,
//   disabled,
//   onChange,
//   listGroupFormKeys,
// }: Props) => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedListGroupItemIndex, setSelectedListGroupItemIndex] = useState<
//     number | undefined
//   >(undefined);

//   const [newItemText, setNewItemText] = useState('');
//   const [newItemObjectKey, setNewItemTextObjectKey] = useState('');
//   const [newItemObjectValue, setNewItemTextObjectValue] = useState('');

//   const listgroupIs: 'array' | 'object' | 'select' | undefined =
//     handleListgroupIs(value, selection);

//   const handleListGroupChange = (actionType: 'add' | 'remove') => {
//     const indexInRange = isIndexInRange(value, selectedListGroupItemIndex);

//     switch (actionType) {
//       case 'add':
//         switch (listgroupIs) {
//           case 'array':
//           case 'select':
//             if (isArray(value)) {
//               onChange([...(value as string[]), newItemText]);
//             }
//             break;

//           case 'object':
//             onChange({
//               ...(value as object),
//               [newItemObjectKey]: newItemObjectValue,
//             });
//             break;

//           default:
//             throw Error('Should not reach this');
//         }
//         handleCloseModal();
//         setNewItemText('');
//         setNewItemTextObjectKey('');
//         setNewItemTextObjectValue('');
//         break;

//       case 'remove':
//         if (indexInRange) {
//           if (
//             (listgroupIs === 'array' || listgroupIs === 'select') &&
//             isStringArray(value)
//           ) {
//             const newItems = [...value];
//             if (selectedListGroupItemIndex != undefined) {
//               newItems.splice(selectedListGroupItemIndex, 1);
//             }
//             onChange(newItems);
//           }
//           if (listgroupIs === 'object') {
//             const newItems = { ...(value as object) };
//             // @ts-expect-error:kfjkd
//             delete newItems[Object.keys(value)[selectedListGroupItemIndex]];
//             onChange(newItems);
//           }
//         }
//         break;

//       default:
//         throw Error('Should not reach this');
//     }
//   };

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const handleFormControlInputChange = (value: string) => {
//     const shouldBeNumeric =
//       listGroupFormKeys && listGroupFormKeys[0].type === 'number';

//     if (shouldBeNumeric) {
//       if (!isStringInteger(value) && value !== '') return;
//     }
//     setNewItemTextObjectKey(value);
//   };
//   const handleFormSelectInputChange = (value: string) => {
//     setNewItemText(value);
//   };

//   return (
//     <>
//       <ListGroup className={styles.listGroup}>
//         <ListGroup.Item className={styles.listGroupItem} disabled={disabled}>
//           <div>
//             {!value && <span className={styles.listGroupItemContainer} />}
//             {listgroupIs === 'array' &&
//               isStringArray(value) &&
//               value.map((valueString: string, index: number) => (
//                 <div
//                   key={index}
//                   onClick={() => setSelectedListGroupItemIndex(() => index)}
//                   className={`${styles.listGroupItemContainer} ${
//                     selectedListGroupItemIndex === index
//                       ? styles.listGroupItemActive
//                       : ''
//                   }`}
//                 >
//                   {valueString}
//                 </div>
//               ))}
//             {listgroupIs === 'object' &&
//               isObject(value) &&
//               Object.entries(value).map(
//                 ([key, value]: [string, string], index: number) => (
//                   <div
//                     key={index}
//                     onClick={() => setSelectedListGroupItemIndex(() => index)}
//                     className={`${styles.listGroupItemContainer} ${
//                       selectedListGroupItemIndex === index
//                         ? styles.listGroupItemActive
//                         : ''
//                     }`}
//                   >
//                     {key} - {value}
//                   </div>
//                 )
//               )}
//             {listgroupIs === 'select' &&
//               isArray(value) &&
//               value.map((valueItem: unknown, index: number) => {
//                 if (
//                   typeof valueItem === 'string' ||
//                   typeof valueItem === 'string'
//                 )
//                   return (
//                     <div
//                       key={index}
//                       onClick={() => setSelectedListGroupItemIndex(() => index)}
//                       className={`${styles.listGroupItemContainer} ${
//                         selectedListGroupItemIndex === index
//                           ? styles.listGroupItemActive
//                           : ''
//                       }`}
//                     >
//                       {valueItem.toString()}
//                     </div>
//                   );
//               })}
//           </div>
//         </ListGroup.Item>
//         <div className={styles.listGroupButtonContainer}>
//           <Button onClick={handleShowModal} disabled={disabled}>
//             <PlusIcon className="text-4xl" />
//           </Button>
//           <div className={styles.divider} />
//           <Button
//             variant="destructive"
//             onClick={() => handleListGroupChange('remove')}
//             disabled={(isArray(value) && value.length === 0) || disabled}
//           >
//             <TrashIcon />
//           </Button>
//         </div>
//       </ListGroup>
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>{`${listgroupIs === 'array' || listgroupIs === 'object' ? 'Indtast' : 'Vælg'} ${label}`}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {listgroupIs === 'array' && (
//             <Form.Control
//               type="text"
//               placeholder="Indtast"
//               value={newItemText}
//               onChange={(e: { target: { value: SetStateAction<string> } }) =>
//                 setNewItemText(e.target.value)
//               }
//             />
//           )}
//           {listgroupIs === 'object' &&
//             listGroupFormKeys &&
//             listGroupFormKeys.length > 0 && (
//               <div>
//                 {listGroupFormKeys[0] && (
//                   <div>
//                     <Form.Control
//                       type="text"
//                       placeholder={listGroupFormKeys[0].label}
//                       value={newItemObjectKey}
//                       onChange={(e: { target: { value: string } }) =>
//                         handleFormControlInputChange(e.target.value)
//                       }
//                     />
//                   </div>
//                 )}
//                 {listGroupFormKeys[1] && (
//                   <div className={styles.listGroupBottomFormControl}>
//                     <Form.Control
//                       type="text"
//                       placeholder={listGroupFormKeys[1].label}
//                       value={newItemObjectValue}
//                       onChange={(e: {
//                         target: { value: SetStateAction<string> };
//                       }) => setNewItemTextObjectValue(e.target.value)}
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           {listgroupIs === 'select' && (
//             <FormSelect
//               label="listgroup-select"
//               selection={selection as SelectLabelType<string, string>[]}
//               disabled={disabled}
//               onChange={(eventValue: string) =>
//                 handleFormSelectInputChange(eventValue)
//               }
//             />
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={() => handleListGroupChange('add')}>OK</Button>
//           <Button variant="destructive" onClick={handleCloseModal}>
//             Fortryd
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default FormListGroup;
