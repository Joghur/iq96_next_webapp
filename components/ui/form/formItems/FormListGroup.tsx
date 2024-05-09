import { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import {
  DangerButton,
  RemoveButton,
  AddButton,
  PrimaryButton,
} from "@/components/ui/buttons/Buttons";
import FormSelect from "@/components/ui/form/formItems/FormSelect";
import { isArray, isStringArray } from "@/utils/array";
import { SelectLabelType } from "@/utils/form";
import { isObject, isStringInteger } from "@/utils/typing";

import styles from "./FormListGroup.module.css";

export type ListGroupFormKeys = { label: string; type: "text" | "number" }[];

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
  selectedListGroupItemIndex: number | undefined,
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
  selection?: SelectLabelType<string, string>[],
) => {
  if (selection) {
    return "select";
  }
  if (isArray(value)) {
    return "array";
  }
  if (isObject(value)) {
    return "object";
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

  const [newItemText, setNewItemText] = useState("");
  const [newItemObjectKey, setNewItemTextObjectKey] = useState("");
  const [newItemObjectValue, setNewItemTextObjectValue] = useState("");

  const listgroupIs: "array" | "object" | "select" | undefined =
    handleListgroupIs(value, selection);

  const handleListGroupChange = (actionType: "add" | "remove") => {
    switch (actionType) {
      case "add":
        switch (listgroupIs) {
          case "array":
          case "select":
            if (isArray(value)) {
              onChange([...(value as string[]), newItemText]);
            }
            break;

          case "object":
            onChange({
              ...(value as object),
              [newItemObjectKey]: newItemObjectValue,
            });
            break;

          default:
            throw Error("Should not reach this");
        }
        handleCloseModal();
        setNewItemText("");
        setNewItemTextObjectKey("");
        setNewItemTextObjectValue("");
        break;

      case "remove":
        const indexInRange = isIndexInRange(value, selectedListGroupItemIndex);

        if (indexInRange) {
          if (
            (listgroupIs === "array" || listgroupIs === "select") &&
            isStringArray(value)
          ) {
            const newItems = [...value];
            if (selectedListGroupItemIndex != undefined) {
              newItems.splice(selectedListGroupItemIndex, 1);
            }
            onChange(newItems);
          }
          if (listgroupIs === "object") {
            const newItems = { ...(value as object) };
            // @ts-ignore
            delete newItems[Object.keys(value)[selectedListGroupItemIndex]];
            onChange(newItems);
          }
        }
        break;

      default:
        throw Error("Should not reach this");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormControlInputChange = (value: string) => {
    const shouldBeNumeric =
      listGroupFormKeys &&
      // @ts-ignore
      listGroupFormKeys[0].type === "number";

    //TODO DataIO gui V1 RawrepoHarveser (and probably more) has an errormessage saying that entered value
    //is not a numeric. This triggers for all kinds of numeric values, so there may be some work in deciphering that flow
    if (shouldBeNumeric) {
      if (!isStringInteger(value) && value !== "") return;
    }
    setNewItemTextObjectKey(value);
  };
  const handleFormSelectInputChange = (value: string) => {
    setNewItemText(value);
  };

  return (
    <>
      <ListGroup
        data-cy={`${label}-form-listgroup`}
        className={styles.listGroup}
      >
        <ListGroup.Item className={styles.listGroupItem} disabled={disabled}>
          <div>
            {!value && <span className={styles.listGroupItemContainer} />}
            {listgroupIs === "array" &&
              isStringArray(value) &&
              value.map((valueString: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectedListGroupItemIndex(() => index)}
                  className={`${styles.listGroupItemContainer} ${
                    selectedListGroupItemIndex === index
                      ? styles.listGroupItemActive
                      : ""
                  }`}
                >
                  {valueString}
                </div>
              ))}
            {listgroupIs === "object" &&
              isObject(value) &&
              Object.entries(value).map(
                ([key, value]: [string, string], index: number) => (
                  <div
                    key={index}
                    onClick={() => setSelectedListGroupItemIndex(() => index)}
                    className={`${styles.listGroupItemContainer} ${
                      selectedListGroupItemIndex === index
                        ? styles.listGroupItemActive
                        : ""
                    }`}
                  >
                    {key} - {value}
                  </div>
                ),
              )}
            {listgroupIs === "select" &&
              isArray(value) &&
              value.map((valueItem: unknown, index: number) => {
                if (
                  typeof valueItem === "string" ||
                  typeof valueItem === "string"
                )
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedListGroupItemIndex(() => index)}
                      className={`${styles.listGroupItemContainer} ${
                        selectedListGroupItemIndex === index
                          ? styles.listGroupItemActive
                          : ""
                      }`}
                    >
                      {valueItem.toString()}
                    </div>
                  );
              })}
          </div>
        </ListGroup.Item>
        <div className={styles.listGroupButtonContainer}>
          <AddButton
            onClick={handleShowModal}
            disabled={disabled}
            data-cy={`${label}-plus-button`}
          />
          <div className={styles.divider} />
          <RemoveButton
            onClick={() => handleListGroupChange("remove")}
            disabled={(isArray(value) && value.length === 0) || disabled}
            data-cy={`${label}-minus-button`}
          />
        </div>
      </ListGroup>
      <Modal show={showModal} onHide={handleCloseModal} data-cy="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{`${listgroupIs === "array" || listgroupIs === "object" ? "Indtast" : "Vælg"} ${label}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listgroupIs === "array" && (
            <Form.Control
              type="text"
              placeholder="Indtast"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              data-cy="modal-single-form-control-input"
            />
          )}
          {listgroupIs === "object" &&
            listGroupFormKeys &&
            listGroupFormKeys.length > 0 && (
              <div>
                {listGroupFormKeys[0] && (
                  <div>
                    <Form.Control
                      type="text"
                      placeholder={listGroupFormKeys[0].label}
                      value={newItemObjectKey}
                      onChange={(e) =>
                        handleFormControlInputChange(e.target.value)
                      }
                      data-cy={`modal-first-form-control-input`}
                    />
                  </div>
                )}
                {listGroupFormKeys[1] && (
                  <div className={styles.listGroupBottomFormControl}>
                    <Form.Control
                      type="text"
                      placeholder={listGroupFormKeys[1].label}
                      value={newItemObjectValue}
                      onChange={(e) =>
                        setNewItemTextObjectValue(e.target.value)
                      }
                      data-cy={`modal-second-form-control-input`}
                    />
                  </div>
                )}
              </div>
            )}
          {listgroupIs === "select" && (
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
          <PrimaryButton
            onClick={() => handleListGroupChange("add")}
            data-cy={"ok-button"}
          >
            OK
          </PrimaryButton>
          <DangerButton onClick={handleCloseModal} data-cy={"fortryd-button"}>
            Fortryd
          </DangerButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormListGroup;
