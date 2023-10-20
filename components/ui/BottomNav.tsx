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

  const menuItems = [
    {
      label: 'Hjem',
      href: '/',
      icon: <FaHome />,
    },
    {
      label: 'Kort',
      href: '/kort',
      badge: newContentMap,
      icon: <FaMapMarkerAlt />,
      notification: newContentMap.length > 0 && <NewContentBadge text="nyt" />,
    },
    {
      label: 'Bibliothek',
      href: '/bibliothek',
      badge: newContentLib,
      icon: <MdPhotoLibrary />,
      notification: newContentLib.length > 0 && <NewContentBadge text="nyt" />,
    },
    {
      label: 'Chat',
      href: '/chat',
      badge: newContentChat,
      icon: <MdChatBubbleOutline />,
      notification: newContentChat.length > 0 && <NewContentBadge text="nyt" />,
    },
    {
      label: 'IQ96',
      href: '/iq96',
      icon: <FaUserNinja />,
    },
  ];

  return (
    <nav className="bottom_nav overflow-hidden">
      {menuItems.map((item, index) => (
        <div key={index} className="relative z-40">
          <Link
            href={{
              pathname: item.href,
              query: { badge: JSON.stringify(item.badge) },
            }}
            className={`dynamic_text ${
              pathname === item.href
                ? 'bottom_nav_link_selected'
                : 'bottom_nav_link_container'
            }`}
          >
            {item?.notification && item.notification}
            {item.icon}
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;
