'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { MdInfo } from 'react-icons/md';
import ThemeToggle from '../ThemeToggle';
import TshirtSelect from '../TshirtSelect';
import { authContext } from '@lib/store/auth-context';
import LoadingSpinner from '@components/LoadingSpinner';
import Tooltip from '@components/Tooltip';
import { Separator } from '@components/ui/separator';
import { Button } from '@components/ui/button';
import SettingsItem from '@components/SettingsItem';

const MemberTab = () => {
  const { logout, authUser, documentUser, loading, updatingDoc } =
    useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  const tshirtTooltipText =
    'Vælg din størrelse. Max for t-shirts er 3XL og for jubilæumstøj 4XL. Vælg derfor din foretrukne og i t-shirt sammenhæng bliver den nedsat til 3XL når der bestilles';

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="py-15 px-5 sm:py-5"
    >
      <div className="flex flex-col gap-2">
        <div className="flex-grow">
          <p className="dynamic_text text-[larger] font-semibold">
            {documentUser?.name}
          </p>
          <p className="dynamic_text">{documentUser?.nick}</p>
          <div className="flex justify-center gap-3">
            <div className="mt-4 flex flex-col items-end">
              <div className="dynamic_text font-semibold">Titel</div>
              <div className="dynamic_text flex items-center gap-1 font-semibold">
                IQ96 email
                <Tooltip text="Email som bestyrelsen skriver til">
                  <MdInfo color={'green'} />
                </Tooltip>
              </div>
              <div className="dynamic_text flex items-center gap-1 font-semibold">
                Login email
                <Tooltip
                  text={`Email brugt til login på denne side eller android app'en. OBS! Det er ikke nødvendigvis den samme som bruges til den gamle side på ${process.env.NEXT_PUBLIC_OLDPAGE_LINK}`}
                >
                  <MdInfo color={'green'} />
                </Tooltip>
              </div>
              <p className="dynamic_text font-semibold">Adresse</p>
              <p className="dynamic_text font-semibold">Telefon</p>
            </div>
            <div className="mt-4 flex flex-col items-start">
              <p className="dynamic_text">{documentUser?.title}</p>
              <p className="dynamic_text">{authUser?.email}</p>
              <p className="dynamic_text">{documentUser?.email}</p>
              <p className="dynamic_text">{documentUser?.address}</p>
              <p className="dynamic_text">
                {documentUser?.phones?.map((o) => o.replace('+45', ''))}
              </p>
            </div>
          </div>

          <p className="dynamic_text mt-4 text-center font-semibold">
            Ændringer? Skriv til Kasseur eller Redacteur!
          </p>
        </div>
        <div>
          <Separator className="my-2 bg-gray-500 sm:my-5" />
        </div>
        <p className="dynamic_text text-[larger] font-semibold sm:mb-5">
          Indstillinger
        </p>
        <div className="flex flex-col gap-5 sm:gap-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            {documentUser?.tshirt && (
              <SettingsItem
                label="T-shirt størrelse"
                tooltipText={tshirtTooltipText}
                tooltipIcon={<MdInfo color="green" />}
              >
                <TshirtSelect
                  documentUser={documentUser}
                  updatingDoc={updatingDoc}
                />
              </SettingsItem>
            )}
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <SettingsItem label="Farve tema">
              <ThemeToggle />
            </SettingsItem>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            logout();
            router.replace('/');
          }}
          className="mt-16"
          variant="destructive"
        >
          Log ud
        </Button>
      </div>
    </motion.div>
  );
};

export default MemberTab;
