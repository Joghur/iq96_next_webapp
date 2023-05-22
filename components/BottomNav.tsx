'use client';

import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';

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
        <Image src="/images/icons/home.svg" alt="home" width={30} height={30} />
        <span className="text-sm">Hjem</span>
      </Link>
      <Link
        href="/map"
        className={`${
          pathname === '/map'
            ? 'bottom_nav_link_selected'
            : 'bottom_nav_link_container'
        }`}>
        <Image
          src="/images/icons/map.svg"
          alt="map"
          width={30}
          height={30}
          className="object-contain text-white"
        />
        Kort
      </Link>
      <Link
        href="/library"
        className={`${
          pathname === '/library'
            ? 'bottom_nav_link_selected'
            : 'bottom_nav_link_container'
        }`}>
        <Image
          src="/images/icons/library.svg"
          alt="library"
          width={30}
          height={30}
          className="object-contain"
        />
        Bibliothek
      </Link>
      <Link
        href="/chat"
        className={`${
          pathname === '/chat'
            ? 'bottom_nav_link_selected'
            : 'bottom_nav_link_container'
        }`}>
        <Image
          src="/images/icons/chat.svg"
          alt="chat"
          width={30}
          height={30}
          className="object-contain"
        />
        Chat
      </Link>
      <Link
        href="/member"
        className={`${
          pathname === '/member'
            ? 'bottom_nav_link_selected'
            : 'bottom_nav_link_container'
        }`}>
        <Image
          src="/images/logo/iqlogo_48.png"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        IQ96
      </Link>
    </nav>
  );
};

export default BottomNav;
