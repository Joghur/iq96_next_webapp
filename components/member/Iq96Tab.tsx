'use client';

import { IqMemberTable } from './ContactsTab';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import { DocumentUser, useFirestore } from '@lib/hooks/useFirestore';

const Iq96Tab = () => {
  const { docs: users, loading } = useFirestore<DocumentUser>(
    'users',
    'name',
    'asc',
    26,
  );

  if (loading) {
    return <LoadingSpinner text={'Henter med-lemmer...'} />;
  }
  if (!users) {
    return null;
  }

  const sortedIqUsers = users
    .filter(
      (o: DocumentUser, index: number) => index < 26 && o?.name !== 'IQ96',
    )
    .sort((a: DocumentUser, b: DocumentUser) => {
      const displayNameA = a?.name ?? '';
      const displayNameB = b?.name ?? '';

      return displayNameA.localeCompare(displayNameB);
    });

  return (
    <div className="table-container overflow-y-scroll touch-action-pan-y transition-transform duration-300">
      <div className="px-1 lg:px-10 scale-120 sm:py-4">
        <p className="flex justify-center bg-slate-100 dynamic_text font-semibold">
          Med-lemmer
        </p>
        <IqMemberTable iqUsers={sortedIqUsers} isEditable={false} />
      </div>
    </div>
  );
};

export default Iq96Tab;
