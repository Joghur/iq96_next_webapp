'use client';

import FixedBottomNavigation from '@components/BottomMenu';
import Header from '@components/Header';
import {useDocumentUser} from '@utils/hooks/useFirestore';
import 'leaflet/dist/leaflet.css';
import {useState} from 'react';

export default function Home() {
  const [authUser, documentUser, loading] = useDocumentUser();
  const [value, setValue] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <main>
      <Header banner="sdjfhk" nick="gl" />
      Hej
      <FixedBottomNavigation value={0} nick="gl" onChange={setValue} />
    </main>
  );
}
