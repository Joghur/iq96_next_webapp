'use client';

import { DocumentUser, useFirestore } from '@lib/hooks/useFirestore';
import { IqDataTable } from './IqDataTable';
import LoadingSpinner from '@components/ui/LoadingSpinner';

const AdminTab = () => {
  const {
    docs: users,
    loading,
    addingDoc,
    deletingDoc,
    updatingDoc,
  } = useFirestore<DocumentUser>('users', 'name', 'asc', 26);

  if (loading) {
    return <LoadingSpinner text={'Henter med-lemmer...'} />;
  }
  if (!users) {
    return null;
  }

  const handleCreateUser = async (user: DocumentUser) => {
    await addingDoc(user);
  };

  const handleUpdateUser = async (user: DocumentUser) => {
    await updatingDoc(user.id, user);
  };

  const handleDeleteUser = async (id: string) => {
    await deletingDoc(id);
  };

  const sortedIqUsers = users
    .filter(
      (o: DocumentUser, index: number) => index < 26 && o?.name !== 'IQ96'
    )
    .sort((a: DocumentUser, b: DocumentUser) => {
      const displayNameA = a?.name ?? '';
      const displayNameB = b?.name ?? '';

      return displayNameA.localeCompare(displayNameB);
    });

  return (
    <div className="overflow-y-scroll">
      <div className="px-1 sm:py-4 lg:px-10">
        <p className="dynamic_text flex justify-center bg-slate-100 font-semibold">
          Med-lemmer
        </p>
        <div className="items-start">
          <IqDataTable
            data={sortedIqUsers}
            onCreate={handleCreateUser}
            onUpdate={handleUpdateUser}
            onDelete={handleDeleteUser}
          />
          {/* <IqMemberTable iqUsers={sortedIqUsers} isEditable={false} showAll /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminTab;
