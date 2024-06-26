import Link from 'next/link';

const HeaderNavbar: React.FC = () => {
  return (
    // <nav className="header_nav max-w-4xl bg-opacity-30 backdrop-filter backdrop-blur-sm justify-between">
    <nav className="header_nav">
      <Link href="/">
        {/* <Image
          src="/images/logo/iqlogo_512.png"
          alt="logo"
          width="100"
          height="100"
          className="hidden object-contain p-1 sm:flex"
        /> */}
        <img
          src="/images/logo/iqlogo_512.png"
          width={100}
          height={100}
          alt="Her skulle være et sejt IQ billede"
          className="hidden object-contain p-1 sm:flex"
        />
        {/* <Image
          src="/images/logo/iqlogo_512.png"
          alt="logo"
          width={37}
          height={37}
          className="flex object-contain sm:hidden"
        /> */}
        <img
          src="/images/logo/iqlogo_512.png"
          width="37"
          height="37"
          alt="Her skulle være et sejt IQ billede"
          className="flex object-contain sm:hidden"
        />
      </Link>
      {/* {title && <HeaderTitle title={title} />} */}
    </nav>
  );
};

export default HeaderNavbar;
