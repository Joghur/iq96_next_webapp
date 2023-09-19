'use client';

import moment from 'moment';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaHome, FaMapMarkerAlt, FaUserNinja } from 'react-icons/fa';
import { MdChatBubbleOutline, MdPhotoLibrary } from 'react-icons/md';

// eslint-disable-next-line prettier/prettier
import { getLocalStorage, LOCALSTORAGE_PREFIX, setLocalStorage } from '@lib/localStorage';
import { authContext } from '@lib/store/auth-context';

import LoadingSpinner from './LoadingSpinner';
import NewContentBadge from './NewContentBadge';

export const BADGE_NOTIFICATION = `${LOCALSTORAGE_PREFIX}-badgeNotification`;

export type BadgeNotification = {
  badgeString: string;
  date?: Date;
};

export const SavingBadgeStatusToLocalStorage = (notifString: string) => {
  if (!notifString || notifString === '') {
    return;
  }
  setLocalStorage<BadgeNotification>(`${BADGE_NOTIFICATION}_${notifString}`, {
    badgeString: notifString,
    date: new Date(),
  });
};

const cloudBadgeNotifs: BadgeNotification[] = [
  { badgeString: 'kort', date: new Date(1694894239000) },
  { badgeString: 'bib-gal-tour-2023', date: new Date(1694894239000) },
  { badgeString: 'bib-gal-gf-2023', date: new Date(1694894239000) },
  { badgeString: 'bib-gal-st-2023', date: new Date(1694894239000) },
  { badgeString: 'bib-brev-2023', date: new Date(1694894239000) },
  { badgeString: 'chat-gen', date: new Date(1694894239000) },
];

const BottomNav = () => {
  const pathname = usePathname();
  const { authUser, loading } = useContext(authContext);
  const [newContentMap, setNewContentMap] = useState<string[]>([]);
  const [newContentLib, setNewContentLib] = useState<string[]>([]);
  const [newContentChat, setNewContentChat] = useState<string[]>([]);

  const handleBadgeNotifications = useCallback(() => {
    cloudBadgeNotifs?.map((cloudBadgeNotif) => {
      // Compare cloud status with localstorage
      // Turn on badge if local date value is older than cloud
      const lastSeen = getLocalStorage<BadgeNotification>(
        `${BADGE_NOTIFICATION}_${cloudBadgeNotif.badgeString}`
      );

      const showBadge = lastSeen?.date
        ? moment(cloudBadgeNotif.date).isAfter(new Date(lastSeen.date))
        : true;

      if (showBadge) {
        if (cloudBadgeNotif.badgeString.includes('kort')) {
          setNewContentMap((old) => [...old, cloudBadgeNotif.badgeString]);
        }
        if (cloudBadgeNotif.badgeString.includes('bib')) {
          setNewContentLib((old) => [...old, cloudBadgeNotif.badgeString]);
        }
        if (cloudBadgeNotif.badgeString.includes('chat')) {
          setNewContentChat((old) => [...old, cloudBadgeNotif.badgeString]);
        }
      }
    });
  }, []);

  useEffect(() => {
    handleBadgeNotifications();
  }, [handleBadgeNotifications]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    return null;
  }

  return (
    <nav className="bottom_nav overflow-hidden">
      <div className="z-40">
        <Link
          href="/"
          className={`dynamic_text ${
            pathname === '/'
              ? 'bottom_nav_link_selected'
              : 'bottom_nav_link_container'
          }`}
        >
          <FaHome />
          Hjem
        </Link>
      </div>
      <div className="relative z-40">
        <Link
          href={{
            pathname: '/kort',
            query: { badge: JSON.stringify(newContentMap) },
          }}
          className={`dynamic_text ${
            pathname === '/kort'
              ? 'bottom_nav_link_selected'
              : 'bottom_nav_link_container'
          }`}
        >
          {newContentMap && <NewContentBadge />}
          <FaMapMarkerAlt />
          Kort
        </Link>
      </div>
      <div className="relative z-40">
        <Link
          href={{
            pathname: '/bibliothek',
            query: { badge: JSON.stringify(newContentLib) },
          }}
          className={`dynamic_text ${
            pathname === '/bibliothek'
              ? 'bottom_nav_link_selected'
              : 'bottom_nav_link_container'
          }`}
        >
          {newContentLib && <NewContentBadge />}
          <MdPhotoLibrary />
          Bibliothek
        </Link>
      </div>
      <div className="relative z-40">
        <Link
          href={{
            pathname: '/chat',
            query: { badge: JSON.stringify(newContentChat) },
          }}
          className={`dynamic_text ${
            pathname === '/chat'
              ? 'bottom_nav_link_selected'
              : 'bottom_nav_link_container'
          }`}
        >
          {newContentChat && <NewContentBadge />}
          <MdChatBubbleOutline />
          Chat
        </Link>
      </div>
      <div className="z-40">
        <Link
          href="/iq96"
          className={`dynamic_text ${
            pathname === '/iq96'
              ? 'bottom_nav_link_selected'
              : 'bottom_nav_link_container'
          }`}
        >
          <FaUserNinja />
          IQ96
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;

// const badgestring1Obj: BadgeNotification = {
//   navBar: 'bib',
//   library: 'brev',
//   year: 2023,
// };
// const badgestring1Str = makeBadgeNotifString(badgestring1Obj);
// const badgestring1Obj2 = createBadgeFromString(badgestring1Str);
// console.log('badgestring1Obj', badgestring1Obj);
// console.log('badgestring1Str', badgestring1Str);
// console.log('badgestring1Obj2', badgestring1Obj2);

// const badgestring1bObj: BadgeNotification = {
//   navBar: 'bib',
//   library: 'gal',
//   gallery: 'gf',
//   year: 2023,
// };
// const badgestring1bStr = makeBadgeNotifString(badgestring1bObj);
// const badgestring1bObj2 = createBadgeFromString(badgestring1bStr);
// console.log('badgestring1bObj', badgestring1bObj);
// console.log('badgestring1bStr', badgestring1bStr);
// console.log('badgestring1bObj2', badgestring1bObj2);

// const badgestring1cObj: BadgeNotification = {
//   navBar: 'bib',
//   library: 'gal',
//   gallery: 'st',
//   year: 2023,
// };
// const badgestring1cStr = makeBadgeNotifString(badgestring1cObj);
// const badgestring1cObj2 = createBadgeFromString(badgestring1cStr);
// console.log('badgestring1cObj', badgestring1cObj);
// console.log('badgestring1cStr', badgestring1cStr);
// console.log('badgestring1cObj2', badgestring1cObj2);

// const badgestring1dObj: BadgeNotification = {
//   navBar: 'bib',
//   library: 'gal',
//   gallery: 'tour',
//   year: 2023,
// };
// const badgestring1dStr = makeBadgeNotifString(badgestring1dObj);
// const badgestring1dObj2 = createBadgeFromString(badgestring1dStr);
// console.log('badgestring1dObj', badgestring1dObj);
// console.log('badgestring1dStr', badgestring1dStr);
// console.log('badgestring1dObj2', badgestring1dObj2);

// const badgestring2Obj: BadgeNotification = {
//   navBar: 'chat',
//   chat: 'gen',
// };
// const badgestring2Str = makeBadgeNotifString(badgestring2Obj);
// const badgestring2Obj2 = createBadgeFromString(badgestring2Str);
// console.log('badgestring2Obj', badgestring2Obj);
// console.log('badgestring2Str', badgestring2Str);
// console.log('badgestring2Obj2', badgestring2Obj2);

// const badgestring3Obj: BadgeNotification = {
//   navBar: 'kort',
// };
// const badgestring3Str = makeBadgeNotifString(badgestring3Obj);
// const badgestring3Obj2 = createBadgeFromString(badgestring3Str);
// console.log('badgestring3Obj', badgestring3Obj);
// console.log('badgestring3Str', badgestring3Str);
// console.log('badgestring3Obj2', badgestring3Obj2);

// type BadgeNotification = {
//   navBar: BadgeNotificationNavBar;
//   library?: BadgeNotificationLibrary;
//   gallery?: BadgeNotificationGallery;
//   chat?: BadgeNotificationChat;
//   year?: number;
//   date?: Date;
// };

// const makeBadgeNotifString = (badgeNotification: BadgeNotification) => {
//   // kort
//   // bib-gal-tour-(1997-2023)
//   // bib-gal-gf-(1997-2023)
//   // bib-gal-st-(1997-2023)
//   // bib-gal-st-(1997-2023)
//   // bib-bre-(1997-2023)
//   // chat-gen

//   const parts: string[] = [badgeNotification.navBar];

//   if (badgeNotification.library) {
//     parts.push(badgeNotification.library);
//   }

//   if (badgeNotification.gallery) {
//     parts.push(badgeNotification.gallery);
//   }

//   if (badgeNotification.chat) {
//     parts.push(badgeNotification.chat);
//   }

//   if (badgeNotification.year) {
//     parts.push(badgeNotification.year.toString());
//   }

//   const badgeString = parts.join('-');
//   return badgeString;
// };

// const createBadgeFromString = (
//   inputString: string
// ): BadgeNotification | null => {
//   const parts = inputString.split('-');

//   if (parts.length < 1) {
//     return null;
//   }

//   const badge: BadgeNotification = {
//     navBar: parts[0] as BadgeNotificationNavBar,
//   };

//   switch (badge.navBar) {
//     case 'kort':
//       break;

//     case 'bib':
//       if (parts.length < 3) {
//         // Ensure that there are at least three parts (navBar, library, gallery)
//         return null;
//       }
//       badge.library = parts[1] as BadgeNotificationLibrary;
//       switch (badge.library) {
//         case 'gal':
//           badge.gallery = parts[2] as BadgeNotificationGallery;
//           badge.year = Number(parts[3]);
//           break;

//         default:
//           badge.year = Number(parts[2]);
//       }

//       break;

//     case 'chat':
//       badge.chat = parts[1] as BadgeNotificationChat;
//       break;

//     default:
//       return null; // Invalid navBar value
//   }

//   return badge;
// };

// type BadgeNotificationNavBar = 'kort' | 'bib' | 'chat';
// type BadgeNotificationLibrary = 'gal' | 'brev';
// type BadgeNotificationGallery = 'tour' | 'gf' | 'st';
// type BadgeNotificationChat = 'gen';
