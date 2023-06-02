'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { getMembers } from './MemberTable';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@components/ui/separator';
import { DocumentUser } from '@lib/hooks/useFirestore';

interface Name {
  displayName?: string;
  familyName?: string;
  givenName?: string;
  displayNameLastFirst?: string;
  unstructuredName?: string;
}

interface Birthday {
  date?: {
    year?: number;
    month?: number;
    day?: number;
  };
  text?: string;
}

interface Email {
  value?: string;
}

interface Phone {
  value?: string;
  canonicalForm?: string;
}

interface Address {
  formattedValue?: string;
}

export interface Connection {
  names?: Name[];
  birthdays?: Birthday[];
  emailAddresses?: Email[];
  addresses?: Address[];
  phoneNumbers?: Phone[];
}

interface Props {
  documentUser: DocumentUser;
}

const AdminTab = ({ documentUser }: Props) => {
  const [connections, setCon] = useState<Connection[] | undefined>(undefined);

  const handleGetMembers = useCallback(async () => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      const res = await getMembers();
      setCon(() => res);
    }
  }, []);

  useEffect(() => {
    handleGetMembers();
  }, [handleGetMembers]);

  if (!connections || connections?.length === 0) {
    return null;
  }

  const sortedConnections = connections
    .filter(
      (o: Connection) =>
        o?.emailAddresses?.[0]?.value !== process.env.NEXT_PUBLIC_NEWSMAIL,
    )
    .sort((a: Connection, b: Connection) => {
      const displayNameA = a?.names?.[0]?.displayName ?? '';
      const displayNameB = b?.names?.[0]?.displayName ?? '';

      return displayNameA.localeCompare(displayNameB);
    });

  return (
    <div className="table-container overflow-y-scroll touch-action-pan-y transition-transform duration-300">
      {documentUser.nick === 'Redacteur' && (
        <>
          <div className="px-1 lg:px-10 scale-120 sm:py-4">
            <p className="flex justify-center bg-slate-100 dynamic_text font-semibold">
              IQ96 med-lemmer
            </p>
            <Table className="transform-origin-top-left transform scale-100">
              <TableHeader>
                <TableRow className="text-xs">
                  <TableCell className="p-1">#</TableCell>
                  <TableHead className="p-1">Med-lem</TableHead>
                  <TableHead className="p-1">Øgenavn</TableHead>
                  <TableHead className="p-1">Position</TableHead>
                  <TableHead className="p-1">Email</TableHead>
                  <TableHead className="p-1">Telefon</TableHead>
                  <TableHead className="p-1">Adresse</TableHead>
                  <TableHead className="p-1">Fødselsdag</TableHead>
                  <TableHead className="p-1">T-Shirt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedConnections.map((person: Connection, index: number) => {
                  const memberIndex = index + 1;
                  const name = person?.names?.[0]?.displayName;
                  const email = person?.emailAddresses?.[0]?.value;
                  const phone = person?.phoneNumbers?.map(
                    (o: Phone) => `${o.canonicalForm}  `,
                  );
                  const address = person?.addresses?.[0]?.formattedValue;
                  const birthday = person?.birthdays?.[0].text;

                  if (email === 'nyheder@iq96.dk') {
                    return;
                  }
                  return (
                    <TableRow key={name} className="text-xs">
                      <TableCell className="p-1">{memberIndex}</TableCell>
                      <TableCell className="p-1">{name}</TableCell>
                      <TableCell className="p-1"></TableCell>
                      <TableCell className="p-1"></TableCell>
                      <TableCell className="p-1">{email}</TableCell>
                      <TableCell className="p-1">{phone}</TableCell>
                      <TableCell className="p-1">{address}</TableCell>
                      <TableCell className="p-1">{birthday}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div>
            <Separator className="my-2 bg-gray-500" />
          </div>
        </>
      )}
      <div className="flex flex-col gap-3 min-h-screen">
        <button
          disabled
          onClick={() => {
            console.log('Kopierer');
          }}
          className="btn btn-accent dynamic_text inline-block">
          Kopier gamle men aktuelle kort-markører
        </button>
        <motion.button
          initial={{ opacity: 0.6 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          disabled
          onClick={() => {
            console.log('Sletter');
          }}
          className="btn btn-accent dynamic_text inline-block">
          Slet gamle, men aktuelle kort-markører
        </motion.button>
      </div>
    </div>
  );
};

export default AdminTab;
