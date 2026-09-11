/** biome-ignore-all lint/suspicious/noExplicitAny: <TODO> */
import { type ClassValue, clsx } from "clsx";
import type { Activity, Event } from "schemas/event";
import { twMerge } from "tailwind-merge";
import { handleType } from "./convert";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 *
 * @param label Prettify labels
 * 2023-edinbourgh -> 2023 - Edinbourgh
 */
export const prettyImageFolderLabel = (label: string) => {
  if (label.includes("-")) {
    // Image label folder has this syntax 2023-edinbourgh
    const labelParts = label.split("-");
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
    case "gf":
      return "Generalforsamling";

    case "events":
      return "Stævner";

    default:
      return "Tour";
  }
};

/**
 * Convert type to label string
 */
export const handleTypeLabel = (event: Event) => {
  switch (event.type) {
    case "tour":
      return `${handleType(event?.type)} de ${event.city}`;

    case "other":
      return `${event.otherTypeLabel ?? handleType(event.type)}`;

    default:
      return handleType(event.type);
  }
};

/**
 * Help with uploadbutton HREFs
 */
export const handleUploadButtonHref = (previousEvent: Event) => {
  if (!previousEvent) return "mangler begivenhed";
  if (!previousEvent.type) return "mangler begivenhedstype";
  if (!previousEvent.year) return "mangler begivenhedsårstal";

  switch (previousEvent.type) {
    case "tour":
      if (!previousEvent.city) return "mangler begivenheds by";
      return `/bibliothek/galleri/tour/${previousEvent.year}-${previousEvent.city.toLocaleLowerCase()}`;

    case "gf":
      return `/bibliothek/galleri/gf/${previousEvent.year}`;

    case "oel":
      return `/bibliothek/galleri/events/${previousEvent.year}-øl`;

    case "golf":
      return `/bibliothek/galleri/events/${previousEvent.year}-frisbee`;

    case "other":
      if (!previousEvent.otherTypeLabel) {
        return "mangler alternativt begivenhedsnavn";
      }
      const urlSafeReadableString = toUrlSafeReadableString(
        `${previousEvent.year}-${previousEvent.otherTypeLabel}`,
      );
      return `/bibliothek/galleri/other/${urlSafeReadableString}`;

    default:
      const _exhaustive: never = previousEvent.type;
      return _exhaustive;
  }
};

const CHAR_MAP: Record<string, string> = {
  æ: "ae",
  ø: "oe",
  å: "aa",
  ä: "ae",
  ö: "oe",
  ü: "ue",
  ß: "ss",
};

export function toUrlSafeReadableString(
  input: string | undefined,
  maxLength = 80,
): string {
  if (!input) return "";

  const slug = input
    .toLowerCase()
    .replace(/[æøåäöüß]/g, (c) => CHAR_MAP[c] ?? c)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength)
    .replace(/-+$/, "");

  return slug;
}

/**
 * Converting one instance of urlsafe to normal text
 */
export const convertFromUrlSafe = (label: string) => {
  const newLabel = label;
  return decodeURIComponent(newLabel);
};

interface SortConfig<T> {
  property: keyof T;
  order: "asc" | "desc";
}

export function sortObjectArray<T>(arr: T[], config: SortConfig<T>): T[] {
  return arr.slice().sort((a, b) => {
    const valueA = a[config.property];
    const valueB = b[config.property];

    if (config.order === "desc") {
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

export const confirmAction = async (message: string): Promise<boolean> => {
  return window.confirm(message);
};

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

export type ActivitiesByDate = {
  dateString: string;
  entries: Omit<Activity, "dateString">[];
};

export function groupActivitiesByDate(
  activities: Activity[] | undefined,
): ActivitiesByDate[] | undefined {
  if (!activities || activities.length === 0) {
    return undefined;
  }
  const grouped = activities.reduce<
    Record<string, Omit<Activity, "dateString">[]>
  >((acc, activity) => {
    const { dateString, ...rest } = activity;
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(rest);
    return acc;
  }, {});

  Object.keys(grouped).forEach((dateString) => {
    grouped[dateString].sort((a, b) => a.time.localeCompare(b.time));
  });

  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([dateString, entries]) => ({
      dateString,
      entries,
    }));
}

export function sortActivities(activities: Activity[]): Activity[] {
  return [...activities].sort((a, b) => {
    // Sorter først efter dateString
    const dateComparison = a.dateString.localeCompare(b.dateString);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    // Hvis dateString er ens, sorter efter time
    return a.time.localeCompare(b.time);
  });
}
