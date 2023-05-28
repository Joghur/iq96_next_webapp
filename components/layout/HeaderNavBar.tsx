import Image from 'next/image';
import Link from 'next/link';

const HeaderNavbar: React.FC = () => {
  return (
    // <nav className="header_nav max-w-4xl bg-opacity-30 backdrop-filter backdrop-blur-sm justify-between">
    <nav className="header_nav">
      <Link href="/">
        <Image
          src="/images/logo/iqlogo_512.png"
          alt="logo"
          width={100}
          height={100}
          className="object-contain hidden sm:flex p-1"
        />
        <Image
          src="/images/logo/iqlogo_512.png"
          alt="logo"
          width={37}
          height={37}
          className="object-contain flex sm:hidden"
        />
      </Link>
      {/* {title && <HeaderTitle title={title} />} */}
    </nav>
  );
};

export default HeaderNavbar;
