'use client';

import moment from 'moment';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaHome, FaMapMarkerAlt, FaUserNinja } from 'react-icons/fa';
import { MdChatBubbleOutline, MdPhotoLibrary } from 'react-icons/md';

import { useFirestore } from '@lib/hooks/useFirestore';
// eslint-disable-next-line prettier/prettier
import {
  getLocalStorage,
  LOCALSTORAGE_PREFIX,
  setLocalStorage,
} from '@lib/localStorage';
import { authContext } from '@lib/store/auth-context';

import LoadingSpinner from './LoadingSpinner';
import NewContentBadge from './NewContentBadge';

export const BADGE_NOTIFICATION = `${LOCALSTORAGE_PREFIX}-badgeNotification`;

export type BadgeNotification = {
  badgeString: string;
  date?: Date;
};

// TODO: fix any Mixup between docs return type and updating types
export interface NotificationDbType {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedAt: any;
}

export const SavingBadgeStatusToLocalStorage = (notifString: string) => {
  if (!notifString || notifString === '') {
    return;
  }
  setLocalStorage<BadgeNotification>(`${BADGE_NOTIFICATION}_${notifString}`, {
    badgeString: notifString,
    date: new Date(),
  });
};

const BottomNav = () => {
  const pathname = usePathname();
  const { authUser, loading } = useContext(authContext);
  const [newContentMap, setNewContentMap] = useState<string[]>([]);
  const [newContentLib, setNewContentLib] = useState<string[]>([]);
  const [newContentChat, setNewContentChat] = useState<string[]>([]);

  const { docs: badges } = useFirestore<NotificationDbType>(
    'notification',
    'updatedAt'
  );

  const handleBadgeNotifications = useCallback(() => {
    if (badges) {
      badges.map((cloudBadgeNotif) => {
        // Compare cloud status with localstorage
        // Turn on badge if local date value is older than cloud
        const lastSeen = getLocalStorage<BadgeNotification>(
          `${BADGE_NOTIFICATION}_${cloudBadgeNotif.id}`
        );

        const showBadge = lastSeen?.date
          ? moment(cloudBadgeNotif.updatedAt.seconds * 1000).isAfter(
              new Date(lastSeen.date)
            )
          : true;

        if (showBadge) {
          if ((cloudBadgeNotif.id || '').includes('kort')) {
            setNewContentMap((old) => [...old, cloudBadgeNotif.id || '']);
          }
          if ((cloudBadgeNotif.id || '').includes('bib')) {
            setNewContentLib((old) => [...old, cloudBadgeNotif.id || '']);
          }
          if ((cloudBadgeNotif.id || '').includes('chat')) {
            setNewContentChat((old) => [...old, cloudBadgeNotif.id || '']);
          }
        }
      });
    }
  }, [badges]);

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
          {newContentMap.length > 0 && <NewContentBadge text="nyt" />}
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
          {newContentLib.length > 0 && <NewContentBadge text="nyt" />}
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
          {newContentChat.length > 0 && <NewContentBadge text="nyt" />}
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
