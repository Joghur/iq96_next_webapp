'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getMembers } from './GetMembers';
import { Separator } from '@components/ui/separator';

const AdminTab = () => {
  const [connections, setCon] = useState<any>(null);

  const first = async () => {
    const res = await getMembers();
    setCon(() => res);
  };

  useEffect(() => {
    first();
  }, []);

  if (!connections || connections?.length === 0) {
    return null;
  }

  return (
    <div className="px-5">
      {connections.map((person: any, index: number) => {
        const address = person?.addresses?.[0];
        return (
          <div key={index}>
            <p>
              {`${person?.names?.[0]?.displayName} - ${person?.emailAddresses?.[0]?.value} - ${address?.streetAddress}
                , ${address?.postalCode} ${address?.city}, ${address?.city} - ${person?.birthdays?.[0].text}`}
            </p>
          </div>
        );
      })}

      <div>
        <Separator className="my-2 bg-gray-500" />
      </div>
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
