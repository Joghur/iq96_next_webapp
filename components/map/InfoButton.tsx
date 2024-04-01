import { useState } from 'react';
import {
  MdAdd,
  MdInfo,
  MdLocationCity,
  MdMyLocation,
  MdWarning,
} from 'react-icons/md';
import { Separator } from '@/components/ui/separator';
import Modal from '@components/ui/Modal';
import { DocumentUser } from '@lib/hooks/useFirestore';

interface Props {
  documentUser: DocumentUser;
}

const InfoButton = ({ documentUser }: Props) => {
  const [open, setOpen] = useState(false);

  const toogleAddModal = async () => {
    setOpen((old) => !old);
  };

  return (
    <>
      <button
        className="btn rounded-full bg-white text-black shadow-xl ring-2 hover:bg-violet6"
        onClick={toogleAddModal}
      >
        <MdInfo fontSize="large" />
      </button>
      {open && (
        <InfoModal
          open={open}
          onClose={() => setOpen(() => false)}
          documentUser={documentUser}
        />
      )}
    </>
  );
};

export default InfoButton;

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  documentUser: DocumentUser;
}

const InfoModal = ({ open, onClose, documentUser }: InfoModalProps) => {
  return (
    <Modal open={open}>
      <div className="dynamic_text flex justify-between gap-2">
        <h3 className="text-lg font-bold">Sådan bruges kortet</h3>
        <button
          onClick={onClose}
          color={'error'}
          className="modal-button btn-error btn-outline btn-sm btn"
        >
          Luk
        </button>
      </div>
      <div className="dynamic_text pt-15 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p>For at lave en ny markør:</p>
            <ul className="ml-4 list-disc">
              <li>Vælg den rigtige by i top dropdown menu</li>
              <li>Zoom ind på det pågældende område</li>
              <li>
                <span className="font-semibold">Dobbelt klik</span> på stedet
              </li>
              <li>
                Tryk på den <span className="font-semibold">tomme markør</span>,
                derefter <span className="font-semibold">blyant</span>
              </li>
              <li>Indtast nogle få informationer.</li>
              <li>
                Tryk på <span className="font-semibold">Ændr</span> for at gemme
              </li>
            </ul>
            <p className="font-semibold">ELLER</p>
            <p className="flex">
              Brug{' '}
              <span className="flex-shrink-0">
                <MdAdd fontSize="large" />
              </span>
              knappen. Se info nedenunder
            </p>
          </div>
          <div>
            <Separator className="my-2 bg-gray-500 sm:my-5" />
          </div>
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <MdInfo fontSize="large" />
            </div>
            <p>Denne info</p>
          </div>
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <MdMyLocation fontSize="large" />
            </div>
            <p>
              Flyver til din lokation.{' '}
              <span className="font-semibold">OBS!</span> Kræver lokations
              tilladelse!
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <MdAdd fontSize="large" />
            </div>
            <p>
              Opretter en tom markør på din position.{' '}
              <span className="font-semibold">OBS!</span> Kræver lokations
              tilladelse!
            </p>
          </div>
          {documentUser.isSuperAdmin && (
            <div className="flex gap-2">
              <div className="flex-shrink-0">
                <MdLocationCity fontSize="large" />
              </div>
              <p>Opretter en ny by i databasen</p>
            </div>
          )}
          <div>
            <Separator className="my-2 bg-gray-500 sm:my-5" />
          </div>
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <MdWarning fontSize="large" />
            </div>
            <p>
              <span className="font-semibold">OBS!</span> Hvis du er på
              Android+Firefox er det muligt at du ikke bliver spurgt om din
              position: Tryk på lås-ikon til venstre for adresse-feltet. Udfor
              position tryk på{' '}
              <i>
                <b>Blokeret</b>
              </i>
              , så den skifter til{' '}
              <i>
                <b>Tilladt</b>
              </i>
              . Nu kan du se hvor du er henne på kortet.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
