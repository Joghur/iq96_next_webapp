import { cn } from "@lib/utils";
import type { Event } from "schemas/event";
import { handleLinks } from "./Links/Links";

type Props = { pointsString: string; event: Event };

const EventBulletPoints = ({ pointsString, event }: Props) => {
  if (pointsString === "") {
    return null;
  }

  const points = pointsString.split("--");

  const yearCity = `${event.year}-${event.city}`;

  // Notes. For the time being event.hotelLocation is holding year-city (f.ex. 2024-tallinn)
  // Which is the only information needed for going to the right map part
  return (
    <div>
      {points.map((point: string, index) => {
        if (point.includes("<link:hotel>")) {
          const parts = point.split("<link:hotel>");
          return (
            <div key={index} className="ml-4">
              <li>
                {`${parts[0]} `}
                {handleLinks(yearCity, "hotel")}
                {` ${parts.length > 1 && parts[1]}`}
              </li>
            </div>
          );
        }
        if (point.includes("<link:middag>")) {
          const parts = point.split("<link:middag>");
          console.log("parts", parts);
          return (
            <div key={index} className="ml-4">
              <li>
                {`${parts[0]} `}
                {handleLinks(yearCity, "middag")}
                {` ${parts.length > 1 && parts[1]}`}
              </li>
            </div>
          );
        }
        if (point.includes("<link:frokost>")) {
          const parts = point.split("<link:frokost>");
          return (
            <div key={index} className="ml-4">
              <li>
                {`${parts[0]} `}
                {handleLinks(yearCity, "frokost")}
                {` ${parts.length > 1 && parts[1]}`}
              </li>
            </div>
          );
        }
        if (point.includes("<link:tour>")) {
          const parts = point.split("<link:tour>");
          return (
            <div key={index} className="ml-4">
              <li>
                {`${parts[0]} `}
                {handleLinks(yearCity, "tour")}
                {` ${parts.length > 1 && parts[1]}`}
              </li>
            </div>
          );
        }
        if (point.includes("<link:gf>")) {
          const parts = point.split("<link:gf>");
          return (
            <div key={index} className="ml-4">
              <li>
                {`${parts[0]} `}
                {handleLinks("0-Generalforsamling", "gf")}
                {` ${parts.length > 1 && parts[1]}`}
              </li>
            </div>
          );
        }

        const regexPattern = /([^<]*)<link:extra:([^:]+):([^>]+)>([^>]*)/;
        const match = new RegExp(regexPattern).exec(point);
        if (match) {
          const firstText = match[1];
          const markerNick = match[2];
          const markerType = match[3];
          const lastText = match[4];
          return (
            <div key={index} className="ml-4">
              <li>
                {firstText}
                {handleLinks(
                  yearCity,
                  markerType as BulletPointLinkTypes,
                  markerNick,
                )}
                {lastText && lastText}
              </li>
            </div>
          );
        }

        const haveNoBullet = point.includes("<no-bullet>");
        const haveSeparatingSpace = point.includes("<space>");
        const isBold = point.includes("<b>");
        const isItalic = point.includes("<i>");
        const removedStylingKeywords = point
          .replace("<no-bullet>", "")
          .replace("<space>", "")
          .replace("<b>", "")
          .replace("<i>", "");
        return (
          <div key={index} className="ml-4">
            <li
              className={cn(
                haveNoBullet ? "list-none" : "",
                isBold ? "font-bold" : "",
                isItalic ? "italic" : "",
                haveSeparatingSpace ? "invisible" : "",
              )}
            >
              {handleLinks(removedStylingKeywords.trim())}
            </li>
          </div>
        );
      })}
    </div>
  );
};

export default EventBulletPoints;

const bulletPointLinkTypes = [
  "string",
  "hotel",
  "frokost",
  "middag",
  "tour",
  "bar",
  "bus",
  "restaurant",
  "cafe",
  "museum",
  "music",
  "question",
  "train",
  "gf",
  "unknown",
] as const;

export type BulletPointLinkTypes = (typeof bulletPointLinkTypes)[number];
