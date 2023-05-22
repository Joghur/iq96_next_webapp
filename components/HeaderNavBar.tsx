import Image from 'next/image';
import Link from 'next/link';

const HeaderNavbar: React.FC = () => {
  return (
    <header className="header_nav bg-cover bg-blur backdrop-blur-sm rounded-xl">
      <nav className="container gap-2 px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex gap-2 md:gap-5">
          <Image
            src="/images/logo/iqlogo_180.png"
            alt="logo"
            width={100}
            height={100}
            className="object-contain hidden sm:flex"
          />
          <Image
            src="/images/logo/iqlogo_180.png"
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

// const HeaderNav = () => {
//   return (
//     <Navbar fluid={true} rounded={true}>
//       <div className="">
//         <Link href="/" className="flex gap-2 md:gap-5">
//           <Image
//             src="/images/logo/iqlogo_96.png"
//             alt="logo"
//             width={30}
//             height={30}
//             className="object-contain"
//           />
//           <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
//             IQ96
//           </span>
//         </Link>
//       </div>
//     </Navbar>

// <nav className="flex-between w-full mb-16 pt-3">

//   {/* Desktop Navigation */}
//   <div className="sm:flex hidden">
//     {true ? (
//       <div className="flex gap-3 md:gap-5">
//         <button type="button" onClick={() => {}}>
//           Log ud
//         </button>

//         <Link href="/profile">
//           <Image
//             src="/images/avatars/erik.png"
//             width={37}
//             height={37}
//             className="rounded-full"
//             alt="profile"
//           />
//         </Link>
//       </div>
//     ) : (
//       <>
//         {/* {providers &&
//           Object.values(providers).map(provider => (
//             <button
//               type="button"
//               key={provider.name}
//               onClick={() => {
//                 signIn(provider.id);
//               }}
//               className="black_btn">
//               Sign in
//             </button>
//           ))} */}
//       </>
//     )}
//   </div>

//   {/* Mobile Navigation */}
//   <div className="sm:hidden flex relative">
//     {true ? (
//       <div className="flex">
//         <Image
//           src="/images/avatars/erik.png"
//           width={37}
//           height={37}
//           className="rounded-full"
//           alt="profile"
//           onClick={() => setToggleDropdown(!toggleDropdown)}
//         />

//         {toggleDropdown && (
//           <div className="dropdown">
//             <Link
//               href="/profile"
//               className="dropdown_link"
//               onClick={() => setToggleDropdown(false)}>
//               Min profile Profile
//             </Link>
//             <button
//               type="button"
//               onClick={() => {
//                 setToggleDropdown(false);
//                 // signOut();
//               }}
//               className="mt-5 w-full black_btn">
//               Sign Out
//             </button>
//           </div>
//         )}
//       </div>
//     ) : (
//       <>
//         {/* {providers &&
//           Object.values(providers).map(provider => (
//             <button
//               type="button"
//               key={provider.name}
//               onClick={() => {
//                 signIn(provider.id);
//               }}
//               className="black_btn">
//               Sign in
//             </button>
//           ))} */}
//       </>
//     )}
//   </div>
// </nav>
//   );
// };

// export default HeaderNav;
