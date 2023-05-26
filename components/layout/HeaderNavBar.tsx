import Image from 'next/image';
import Link from 'next/link';

const HeaderNavbar: React.FC = () => {
  return (
    <header className="header_nav bg-cover bg-blur backdrop-blur-sm rounded-xl">
      <nav className="container gap-2 px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex gap-2 md:gap-5">
          <Image
            src="/images/logo/iqlogo_512.png"
            alt="logo"
            width={100}
            height={100}
            className="object-contain hidden sm:flex"
          />
          <Image
            src="/images/logo/iqlogo_512.png"
            alt="logo"
            width={37}
            height={37}
            className="object-contain flex sm:hidden"
          />
          <span className="logo_text pt-5">IQ96</span>
        </Link>
      </nav>
    </header>
  );
};

export default HeaderNavbar;
