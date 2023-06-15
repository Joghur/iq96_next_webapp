import { useState } from "react";
import { MdAdd, MdInfo, MdLocationCity, MdMyLocation } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import Modal from "@components/ui/Modal";
import { DocumentUser } from "@lib/hooks/useFirestore";

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
        <div className="">
          <InfoModal
            open={open}
            onClose={() => setOpen(() => false)}
            documentUser={documentUser}
          />
        </div>
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
      <div className="max-h-[60vh]">
        <div className="dynamic_text flex justify-between gap-2">
          <h3 className="text-lg font-bold">Sådan bruges kortet</h3>
          <button
            onClick={onClose}
            color={"error"}
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
                <li>
                  Vælg den rigtige by i den første dropdown menu oppe i toppen.
                </li>
                <li>Zoom ind på det pågældende område.</li>
                <li>Dobbelt klik på stedet</li>
                <li>
                  Tryk på den tomme markør der dukker op, og derefter på blyant
                  tegnet.
                </li>
                <li>Indtast nogle få informationer.</li>
                <li>Tryk på ændr for at gemme.</li>
              </ul>
              <p className="font-semibold">ELLER</p>
              <p className="flex">
                Brug plus{" "}
                <span className="flex-shrink-0">
                  <MdAdd fontSize="large" />
                </span>
                knappen for at benytte din lokation. Se info nedenunder
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
                Flyver til din lokation.{" "}
                <span className="font-semibold">OBS!</span> Du skal have givet
                tilladelse til at din lokation benyttes.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex-shrink-0">
                <MdAdd fontSize="large" />
              </div>
              <p>
                Opretter en markør på din position. Husk at ændre markørens
                tekst bagefter. Ellers vil den bare fremstå som en anonum
                markør.
                <span className="font-semibold">OBS!</span> Du skal have givet
                tilladelse til at din lokation benyttes.
              </p>
            </div>
            {documentUser.isSuperAdmin && (
              <div className="flex gap-2">
                <div className="flex-shrink-0">
                  <MdLocationCity fontSize="large" />
                </div>
                <p>
                  Opretter en ny by i databasen.{" "}
                  <span className="font-semibold">OBS!</span> Genopfrisk siden
                  før den dukker op i dropdown menuen
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
