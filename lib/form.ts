"use client";

import type { FormItemEventTarget } from "@components/form/OneFormItem";
import type { Dispatch, SetStateAction } from "react";

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
	setState: Dispatch<SetStateAction<T>>,
) => {
	const { id, value } = eventTarget;
	const keys = id.split(".");
	if (keys.length === 1) {
		setState((prevState) => ({
			...prevState,
			// @ts-expect-error: lKDFJKL
			[id]: getTypedValue(value, state[id]),
		}));
	} else {
		//TODO - refactor to use this --Error type
		console.log("formHandleOnChange-----else-");
	}
};

export const getLabelOrType = (
	typeOrLabel: string,
	flow: "toType" | "toLabel",
	selectMapping: any,
): string => {
	if (!selectMapping) return "";

	if (flow === "toType") {
		const matchingType = selectMapping.find(
			(typeObj: { label: string }) => typeObj.label === typeOrLabel,
		);

		return matchingType ? matchingType.type : "";
	} else {
		const matchingType = selectMapping.find(
			(typeObj: { type: string }) => typeObj.type === typeOrLabel,
		);

		return matchingType ? matchingType.label : "";
	}
};

/**
 * Dynamisk højdeberegning til <Textarea> (bruges af FormControl)
 *
 * Justerer højde efter antal linjer i value.
 * Fungerer også, hvis teksten indeholder linjeskift eller er tom.
 */
export const calculateHeight = (value: string): string => {
	const minRows = 2;
	const maxRows = 12;

	const lines = value.split("\n").length;

	// Brug line-height ca. 1.5em og tilføj lidt padding
	const lineHeight = 1.5 * 16; // = 24px
	const padding = 16; // 8px top + 8px bottom

	const totalRows = Math.min(Math.max(lines, minRows), maxRows);
	const height = totalRows * lineHeight + padding;

	return `${height}px`;
};

export const createSelectionOption = (
	label: string,
	type?: string,
): SelectLabelType<string, string> => ({
	label: label,
	type: type ? type : label,
});
