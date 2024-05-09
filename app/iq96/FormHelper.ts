import { FormBuilder } from "@/components/ui/form/ManyFormItems";
import { SubmitterFormDataResolved } from "@/mappers/submitters.mapper";

import { selectPriorityOptionMapping } from "../flowbindere/flowBinderFormBuilder";

export const selectPriorityMapping = [
  {
    label: "Brug Flowbinder prioritet",
    type: "undefined",
  },
  ...selectPriorityOptionMapping,
];

export const basicSubmitterFormBuilder: FormBuilder<SubmitterFormDataResolved>[] =
  [
    { label: "Submitternummer", propertyKey: "number" },
    { label: "Submitternavn", propertyKey: "name" },
    { label: "Beskrivelse", propertyKey: "description", showAs: "textarea" },
    {
      label: "Prioritet",
      propertyKey: "priority",
      selection: selectPriorityMapping,
    },
    { label: "Disable submitter", propertyKey: "enabled" },
  ];
