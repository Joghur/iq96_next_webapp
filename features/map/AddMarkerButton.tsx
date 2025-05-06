import L from 'leaflet';
import { ChangeEvent, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { useFirestore } from '@lib/hooks/useFirestore';

import { MarkerData } from './Map';
import { Modal } from '@node_modules/react-bootstrap/esm';
import { Button } from '@components/ui/button';
import { NotificationDbType } from '@components/BottomNav';

const initialMarker: MarkerData = {
  id: '',
  location: {
    latitude: 0,
    longitude: 0,
  },
  description: 'Et hotel',
  madeBy: 'app',
  nick: 'Hotel',
  title: 'test',
  type: 'hotel',
};

interface Props {
  addingMarker: (document: MarkerData) => Promise<void>;
  userPosition: L.LatLngExpression;
}

const AddMarkerButton = ({ addingMarker, userPosition }: Props) => {
  const [open, setOpen] = useState(false);

  const toogleAddModal = async () => {
    console.log('Addbutton');
    setOpen((old) => !old);
  };

  return (
    <>
      <Button
        className="z-50 rounded-full bg-white text-black shadow-xl ring-2 hover:bg-violet6 "
        onClick={toogleAddModal}
      >
        <MdAdd fontSize="large" />
      </Button>
      <NewMarkerForm
        open={open}
        onClose={() => setOpen(() => false)}
        addingMarker={addingMarker}
        userPosition={userPosition}
      />
    </>
  );
};

export default AddMarkerButton;

interface NewMarkerFormProps {
  open: boolean;
  onClose: () => void;
  addingMarker: (document: MarkerData) => Promise<void>;
  userPosition: L.LatLngExpression;
}

export const NewMarkerForm = ({
  open,
  onClose,
  addingMarker,
  userPosition,
}: NewMarkerFormProps) => {
  const [changedMarker, setChangingMarker] =
    useState<MarkerData>(initialMarker);

  const { addingDoc: addingMapBadge } = useFirestore<NotificationDbType>(
    'notification',
    'updatedAt'
  );

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event) {
      const { id, value } = event.target;

      setChangingMarker((oldMarker) => ({
        ...oldMarker,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const latLng = L.latLng(userPosition);
    await addingMarker({
      location: { latitude: latLng.lat, longitude: latLng.lng },
      description: changedMarker.description,
      madeBy: changedMarker.madeBy,
      nick: changedMarker.nick,
      title: changedMarker.title,
      type: changedMarker.type,
    });

    await addingMapBadge(
      {
        updatedAt: new Date(),
      },
      'kort'
    );
    onClose();
  };

  return (
    <Modal open={open}>
      <h3 className="text-lg font-bold">Opret ny Tour by</h3>
      <div>
        <div className="pt-5">
          <label
            htmlFor="text"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Årstal
          </label>
          <textarea
            id="year"
            value={changedMarker.description}
            onChange={handleChange}
            placeholder={changedMarker?.description || 'Beskrivelse'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="flex justify-between pt-5">
          <button
            onClick={onClose}
            color={'error'}
            className="btn-error btn-outline btn-sm btn"
          >
            Fortryd
          </button>
          <button onClick={handleSubmit} className="btn-info btn-sm btn">
            Opret
          </button>
        </div>
      </div>
    </Modal>
  );
};
