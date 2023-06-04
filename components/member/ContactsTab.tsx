'use client';

import { useCallback, useEffect, useState } from 'react';
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
import { DocumentUser, useFirestore } from '@lib/hooks/useFirestore';
import { compareObjects } from '@lib/utils';

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

const ContactsTab = () => {
  const [connections, setCon] = useState<Connection[] | undefined>(undefined);

  const {
    docs: users,
    updatingDoc,
    loading,
  } = useFirestore<DocumentUser>('users', 'name', 'asc', 26);

  const handleGmailContacts = useCallback(async () => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
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
        o?.emailAddresses?.[0]?.value !== process.env.NEXT_PUBLIC_NEWSMAIL,
    )
    .sort((a: Connection, b: Connection) => {
      const displayNameA = a?.names?.[0]?.displayName ?? '';
      const displayNameB = b?.names?.[0]?.displayName ?? '';

      return displayNameA.localeCompare(displayNameB);
    });

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
        <IqMemberTable
          iqUsers={sortedIqUsers}
          connections={sortedConnections}
          updatingDoc={updatingDoc}
          isEditable
          showAll
        />
        <div>
          <Separator className="my-5 bg-gray-500" />
        </div>
        <p className="flex justify-center bg-slate-100 dynamic_text font-semibold">
          Gmail kontakter
        </p>
        <GmailContacts connections={sortedConnections} />
        <div>
          <Separator className="my-5 bg-gray-500" />
        </div>
        <div className="flex flex-col gap-3 min-h-screen mx-5">
          <button
            disabled
            onClick={() => {
              console.log('Kopierer');
            }}
            className="btn btn-accent dynamic_text inline-block">
            Kopier gamle men aktuelle kort-markører
          </button>
          <button
            disabled
            onClick={() => {
              console.log('Sletter');
            }}
            className="btn btn-accent dynamic_text inline-block">
            Slet gamle, men aktuelle kort-markører
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactsTab;

interface GmailProps {
  connections: Connection[];
}

const GmailContacts = ({ connections }: GmailProps) => {
  return (
    <Table className="transform-origin-top-left transform scale-100">
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
            (o: ContactPhone) => `${o.canonicalForm?.trim()}\n`,
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
              <TableCell className="p-1 flex flex-col">{address}</TableCell>
              <TableCell className="p-1">{birthday}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

interface FirebaseProps {
  iqUsers?: DocumentUser[];
  connections?: Connection[];
  updatingDoc?: (id: string, document: DocumentUser) => Promise<void>;
  isEditable?: boolean;
  showAll?: boolean;
}

export const IqMemberTable = ({
  iqUsers,
  connections,
  updatingDoc,
  isEditable = false,
  showAll = false,
}: FirebaseProps) => {
  if (!iqUsers) {
    return null;
  }

  const evaluateArrays = iqUsers.map((docUser: DocumentUser) =>
    compareObjects(
      connections?.find(
        contact => contact?.names?.[0]?.displayName?.trim() === docUser.name,
      ),
      docUser,
    ),
  );

  const handleClick = async (person: DocumentUser, contact?: Connection) => {
    if (!contact || !updatingDoc) {
      return null;
    }
    await updatingDoc(person.id, {
      id: person?.id || '',
      isAdmin: person?.isAdmin || false,
      isBoard: person?.isBoard || false,
      isSuperAdmin: person?.isSuperAdmin || false,
      nick: person?.nick || '',
      title: person?.title || '',
      uid: person?.uid || '',
      avatar: person.avatar || '',
      tshirt: person.tshirt || '',
      name: contact?.names?.[0]?.displayName?.trim() || '',
      email: contact?.emailAddresses?.[0]?.value?.trim() || '',
      phones:
        contact?.phoneNumbers?.map(
          (o: ContactPhone) => `${o.canonicalForm?.trim()}`,
        ) || [],
      address:
        contact?.addresses?.[0]?.formattedValue?.replace('DK', '').trim() || '',
    });
  };

  return (
    <Table className="transform-origin-top-left transform scale-100 px-1">
      <TableHeader>
        <TableRow className="text-xs">
          <TableHead className="p-1">#</TableHead>
          <TableHead className="p-1">Med-lem</TableHead>
          <TableHead className="p-1">IQ-navn</TableHead>
          <TableHead className="p-1">Titel</TableHead>
          <TableHead className="p-1">Email</TableHead>
          <TableHead className="p-1">Telefon</TableHead>
          {showAll && <TableHead className="p-1">Adresse</TableHead>}
          {showAll && <TableHead className="p-1">T-Shirt</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {iqUsers &&
          iqUsers.map((person: DocumentUser, index: number) => {
            const diffArray = evaluateArrays.filter(
              arr => arr && arr.includes(person.name),
            )[0];
            const memberIndex = index + 1;
            const name = person?.name?.trim();
            const isNameDiff = Boolean(
              connections && diffArray?.includes('name'),
            );
            const email = person?.email || '';
            const isEmailDiff = Boolean(
              connections && diffArray?.includes('email'),
            );
            const phones = person?.phones?.map((o: string) => `${o?.trim()}`);
            const isPhonesDiff = Boolean(
              connections && diffArray?.includes('phones'),
            );
            const address = person?.address?.replace('DK', '').trim();
            const isAddressDiff = Boolean(
              connections && diffArray?.includes('address'),
            );

            return (
              <TableRow
                key={name}
                onClick={() =>
                  handleClick(
                    person,
                    connections?.find(
                      contact =>
                        contact?.names?.[0]?.displayName?.trim() ===
                        person.name,
                    ),
                  )
                }
                className={`text-xs hover:${
                  isEditable ? 'cursor-pointer' : 'cursor-text'
                }`}>
                <TableCell className="p-1">{memberIndex}</TableCell>
                <TableCell
                  className={`${
                    isNameDiff ? 'text-white bg-red-500' : ''
                  } p-1`}>
                  {name}
                </TableCell>
                <TableCell className="p-1">{person.nick}</TableCell>
                <TableCell className="p-1">{person.title}</TableCell>
                <TableCell
                  className={`${
                    isEmailDiff ? 'text-white bg-red-500' : ''
                  } p-1`}>
                  {email}
                </TableCell>
                <TableCell
                  className={`${
                    isPhonesDiff ? 'text-white bg-red-500' : ''
                  } p-1`}>
                  {phones?.join(' / ')}
                </TableCell>
                {showAll && (
                  <TableCell
                    className={`${
                      isAddressDiff ? 'text-white bg-red-500' : ''
                    } p-1`}>
                    {address}
                  </TableCell>
                )}
                {showAll && (
                  <TableCell className="p-1 text-center">
                    {person.tshirt}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
