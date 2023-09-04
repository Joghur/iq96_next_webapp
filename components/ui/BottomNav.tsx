'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaMapMarkerAlt, FaUserNinja } from 'react-icons/fa';
import { MdChatBubbleOutline, MdPhotoLibrary } from 'react-icons/md';

import NewContentBadge from './NewContentBadge';

const BottomNav = () => {
  const pathname = usePathname();

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
      <div className="z-40">
        <Link
          href="/kort"
          className={`dynamic_text ${
            pathname === '/kort'
              ? 'bottom_nav_link_selected'
              : 'bottom_nav_link_container'
          }`}
        >
          <FaMapMarkerAlt />
          Kort
        </Link>
      </div>
      <div className="relative z-40">
        <Link
          href="/bibliothek"
          className={`dynamic_text ${
            pathname === '/bibliothek'
              ? 'bottom_nav_link_selected'
              : 'bottom_nav_link_container'
          }`}
        >
          <NewContentBadge />
          <MdPhotoLibrary />
          Bibliothek
        </Link>
      </div>
      <div className="z-40">
        <Link
          href="/chat"
          className={`dynamic_text ${
            pathname === '/chat'
              ? 'bottom_nav_link_selected'
              : 'bottom_nav_link_container'
          }`}
        >
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
