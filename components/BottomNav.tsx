'use client';

import 'leaflet/dist/leaflet.css';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUserNinja, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { MdPhotoLibrary, MdChatBubbleOutline } from 'react-icons/md';

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="bottom_nav overflow-hidden">
      <Link
        href="/"
        className={`${
          pathname === '/'
            ? 'bottom_nav_link_selected'
            : 'bottom_nav_link_container'
        }`}>
        <FaHome />
        Hjem
      </Link>
      <Link
        href="/map"
        className={`${
          pathname === '/map'
            ? 'bottom_nav_link_selected'
            : 'bottom_nav_link_container'
        }`}>
        <FaMapMarkerAlt />
        Kort
      </Link>
      <Link
        href="/library"
        className={`${
          pathname === '/library'
            ? 'bottom_nav_link_selected'
            : 'bottom_nav_link_container'
        }`}>
        <MdPhotoLibrary />
        Bibliothek
      </Link>
      <Link
        href="/chat"
        className={`${
          pathname === '/chat'
            ? 'bottom_nav_link_selected'
            : 'bottom_nav_link_container'
        }`}>
        <MdChatBubbleOutline />
        Chat
      </Link>
      <Link
        href="/iq96"
        className={`${
          pathname === '/iq96'
            ? 'bottom_nav_link_selected'
            : 'bottom_nav_link_container'
        }`}>
        <FaUserNinja />
        IQ96
      </Link>
    </nav>
  );
};

export default BottomNav;
