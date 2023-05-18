import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

// interface Props {
//   value: number;
//   nick?: string;
//   // onChange: (arg0: number) => void;
// }

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom_nav">
      <Link href="/" className="flex flex-col items-center">
        <Image src="/images/icons/home.svg" alt="chat" width={30} height={30} />
        <span className="text-sm">Hjem</span>
      </Link>
      <Link href="/map" className="flex flex-col items-center">
        <Image
          src="/images/icons/map.svg"
          alt="chat"
          width={30}
          height={30}
          className="object-contain text-white"
        />
        Kort
      </Link>
      <Link href="/library" className="flex flex-col items-center">
        <Image
          src="/images/icons/library.svg"
          alt="library"
          width={30}
          height={30}
          className="object-contain"
        />
        Bibliothek
      </Link>
      <Link href="/chat" className="flex flex-col items-center">
        <Image
          src="/images/icons/chat.svg"
          alt="chat"
          width={30}
          height={30}
          className="object-contain"
        />
        Chat
      </Link>
      <Link href="/member" className="flex flex-col items-center">
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

// export default function BottomNav({value}: Props) {
//   return (
//     <>
//       <div>BottomNav</div>
//     </>
// <Box sx={{pb: 7}} ref={ref}>
//   <Paper
//     sx={{position: 'fixed', bottom: 0, left: 0, right: 0}}
//     elevation={3}>
//     <BottomNavigation
//       showLabels
//       value={value}
//       onChange={(_, newValue) => {
//         onChange(newValue);
//       }}>
//       <BottomNavigationAction label="IQ96" icon={<HomeIcon />} />
//       <BottomNavigationAction label="Kort" icon={<MapIcon />} />
//       <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
//       <BottomNavigationAction label={nick} icon={<PersonIcon />} />
//     </BottomNavigation>
//   </Paper>
// </Box>
// );
// }
