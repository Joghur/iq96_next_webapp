'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import { eventTransitionVariants } from '@lib/animations';
import { DocumentUser, useFirestore } from '@lib/hooks/useFirestore';

const Iq96Tab = () => {
  const { docs: users, loading } = useFirestore<DocumentUser>(
    'users',
    'name',
    'asc',
    26,
  );
  const [showProfile, setShowProfile] = useState('');

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
      <div className="px-10 sm:py-4">
        <p className="flex justify-center bg-slate-100 dynamic_text font-semibold">
          Med-lemmer
        </p>

        <div className="grid grid-cols-1 mt-4 sm:mt-0 sm:grid-cols-2 md:grid-cols-4 gap-4 dynamic_text">
          {sortedIqUsers.map((o, index) => (
            <motion.div
              key={index}
              variants={eventTransitionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.3 + 0.1 }}
              className="m-1 sm:m-4 p-4 ring-2 rounded-xl shadow-xl flex flex-col items-center hover:cursor-pointer"
              onClick={() => setShowProfile(o.name)}>
              <div className="flex flex-col justify-left items-center gap-3 overflow-hidden">
                <Image
                  src={`/images/avatars/${o.avatar}.png`}
                  width={50}
                  height={50}
                  alt={o.avatar}
                  className="w-auto h-auto"
                />
                <span className="font-semibold">{o.name}</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden">
                <p>{o.nick}</p>
                <p>{o.title}</p>
                {showProfile === o.name && (
                  <Fragment>
                    <p>
                      {o.phones?.map((p, index) => (
                        <p key={index}>{p}</p>
                      ))}
                    </p>
                    <p>{o.email}</p>
                  </Fragment>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Iq96Tab;
