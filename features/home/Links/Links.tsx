import EventInfoBadge from "@components/EventInfoBadge";
import { ReactNode } from "react";
import {
  MdOutlineHotel,
  MdOutlineDining,
  MdOutlineLunchDining,
  MdOutlineLocalSee,
  MdWineBar,
  MdOutlineWineBar,
  MdOutlineBusAlert,
  MdOutlineCoffee,
  MdOutlineMuseum,
  MdOutlineMusicNote,
  MdOutlineRestaurant,
  MdOutlineTrain,
  MdOutlineQuestionMark,
} from "react-icons/md";
import { BulletPointLinkTypes } from "../EventBulletPoints";
import Link from "next/link";

export const handleLinks = (
  yearCity: string | undefined,
  type?: BulletPointLinkTypes,
  place?: string,
): ReactNode => {
  switch (type) {
    case "hotel":
      return (
        <Link
          href={`/kort?aar-by=${yearCity}&sted=Vores hotel`}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            <MdOutlineHotel className="mr-1" />
            Hotel
          </EventInfoBadge>
        </Link>
      );

    case "middag":
      return (
        <Link
          href={`/kort?aar-by=${yearCity}&sted=Vores middag`}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            <MdOutlineDining className="mr-1" />
            Middag
          </EventInfoBadge>
        </Link>
      );

    case "frokost":
      return (
        <Link
          href={`/kort?aar-by=${yearCity}&sted=Vores frokost`}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            <MdOutlineLunchDining className="mr-1" />
            Frokost
          </EventInfoBadge>
        </Link>
      );

    case "tour":
      return (
        <Link
          href={`/kort?aar-by=${yearCity}&sted=Guided tour`}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            <MdOutlineLocalSee className="mr-1" />
            Guided tour
          </EventInfoBadge>
        </Link>
      );

    case "gf":
      return (
        <Link
          href={"/kort?aar-by=0-Generalforsamling&sted=Generalforsamling"}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            <MdWineBar className="mr-1" />
            Generalforsamling
          </EventInfoBadge>
        </Link>
      );

    case "bar":
    case "bus":
    case "cafe":
    case "museum":
    case "music":
    case "question":
    case "restaurant":
    case "train":
    case "unknown":
      return (
        <Link
          href={`/kort?aar-by=${yearCity}&sted=${place}`}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            {iconText(type)}
            {place}
          </EventInfoBadge>
        </Link>
      );

    default:
      return yearCity;
  }
};

const iconText = (icon: string) => {
  switch (icon) {
    case "bar":
    case "gf":
      return <MdOutlineWineBar className="mr-1" />;

    case "bus":
      return <MdOutlineBusAlert className="mr-1" />;

    case "cafe":
      return <MdOutlineCoffee className="mr-1" />;

    case "museum":
      return <MdOutlineMuseum className="mr-1" />;

    case "music":
      return <MdOutlineMusicNote className="mr-1" />;

    case "restaurant":
      return <MdOutlineRestaurant className="mr-1" />;

    case "train":
      return <MdOutlineTrain className="mr-1" />;

    default:
      return <MdOutlineQuestionMark className="mr-1" />;
  }
};
