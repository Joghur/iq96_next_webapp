'use client';

import { useCallback, useEffect, useState } from 'react';
import { IqMemberTable } from './IqMemberTable';
import { getGmailContacts } from './MemberTable';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import { Separator } from '@components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  copyDocumentsToNestedCollection,
  deleteMapMarkers,
  DocumentUser,
  useFirestore,
} from '@lib/hooks/useFirestore';

export interface ContactName {
  displayName?: string;
  familyName?: string;
  givenName?: string;
  displayNameLastFirst?: string;
  unstructuredName?: string;
}

export interface ContactBirthday {
  date?: {
    year?: number;
    month?: number;
    day?: number;
  };
  text?: string;
}

export interface ContactEmail {
  value?: string;
}

export interface ContactPhone {
  value?: string;
  canonicalForm?: string;
}

export interface ContactAddress {
  formattedValue?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
}

export interface Connection {
  names?: ContactName[];
  birthdays?: ContactBirthday[];
  emailAddresses?: ContactEmail[];
  addresses?: ContactAddress[];
  phoneNumbers?: ContactPhone[];
}

const DeveloperTab = () => {
  const [connections, setCon] = useState<Connection[] | undefined>(undefined);

  const {
    docs: users,
    updatingDoc,
    loading,
  } = useFirestore<DocumentUser>('users', 'name', 'asc', 26);

  const handleGmailContacts = useCallback(async () => {
    if (process.env.NEXT_PUBLIC_ENV !== 'production') {
      const res = await getGmailContacts();
      setCon(() => res);
    }
  }, []);

  useEffect(() => {
    handleGmailContacts();
  }, [handleGmailContacts]);

  if (loading) {
    return <LoadingSpinner text={'Henter med-lemmer...'} />;
  }

  if (!users || !connections || connections?.length === 0) {
    return null;
  }

  const sortedConnections = connections
    .filter(
      (o: Connection, index: number) =>
        index < 26 &&
        o?.emailAddresses?.[0]?.value !== process.env.NEXT_PUBLIC_NEWSMAIL
    )
    .sort((a: Connection, b: Connection) => {
      const displayNameA = a?.names?.[0]?.displayName ?? '';
      const displayNameB = b?.names?.[0]?.displayName ?? '';

      return displayNameA.localeCompare(displayNameB);
    });

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
    <div className="table-container touch-action-pan-y overflow-y-scroll transition-transform duration-300">
      <div className="scale-120 px-1 sm:py-4 lg:px-10">
        <p className="dynamic_text flex justify-center bg-slate-100 font-semibold">
          Med-lemmer
        </p>
        <IqMemberTable
          iqUsers={sortedIqUsers}
          connections={sortedConnections}
          updatingDoc={updatingDoc}
          isEditable
          showAll
        />
        {process.env.NEXT_PUBLIC_ENV !== 'production' && (
          <>
            <div>
              <Separator className="my-5 bg-gray-500" />
            </div>
            <p className="dynamic_text flex justify-center bg-slate-100 font-semibold">
              Gmail kontakter
            </p>
            <GmailContacts connections={sortedConnections} />
          </>
        )}
        <div>
          <Separator className="my-5 bg-gray-500" />
        </div>
        <div className="mx-5 flex min-h-screen flex-col gap-3">
          <button
            disabled
            // onClick={() => copyDocument("oldmap", "2023-Edinbourgh", "map")}
            onClick={async () => await copyDocumentsToNestedCollection()}
            className="dynamic_text btn-accent btn inline-block"
          >
            Kopier gamle kort-markører
          </button>
          <button
            disabled
            onClick={deleteMapMarkers}
            className="dynamic_text btn-accent btn inline-block"
          >
            Slet gamle kort-markører
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTab;

interface GmailProps {
  connections: Connection[];
}

const GmailContacts = ({ connections }: GmailProps) => {
  return (
    <Table className="transform-origin-top-left scale-100 transform">
      <TableHeader>
        <TableRow className="text-xs">
          <TableHead className="p-1">#</TableHead>
          <TableHead className="p-1">Med-lem</TableHead>
          <TableHead className="p-1">Email</TableHead>
          <TableHead className="p-1">Telefon</TableHead>
          <TableHead className="p-1">Adresse</TableHead>
          <TableHead className="p-1">Fødselsdag</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {connections.map((person: Connection, index: number) => {
          const memberIndex = index + 1;
          const name = person?.names?.[0]?.displayName?.trim();
          const email = person?.emailAddresses?.[0]?.value?.trim() || '';
          const phones = person?.phoneNumbers?.map(
            (o: ContactPhone) => `${o.canonicalForm?.trim()}\n`
          );
          const address = person?.addresses?.[0]?.formattedValue
            ?.replace('DK', '')
            .trim();
          const birthday = person?.birthdays?.[0].text?.trim() || '';

          return (
            <TableRow key={name} className="text-xs">
              <TableCell className="p-1">{memberIndex}</TableCell>
              <TableCell className="p-1">{name}</TableCell>
              <TableCell className="p-1">{email}</TableCell>
              <TableCell className="p-1">{phones}</TableCell>
              <TableCell className="flex flex-col p-1">{address}</TableCell>
              <TableCell className="p-1">{birthday}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
