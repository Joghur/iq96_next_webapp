import { Button } from '@components/ui/button';
import Modal from '@node_modules/react-bootstrap/esm/Modal';
import { ChangeEvent, useState } from 'react';
import { MdLocationCity } from 'react-icons/md';

export interface MapCityType {
  city: string;
  year: string;
}

const initialCity = {
  city: '',
  year: '',
};

interface Props {
  selectedCity: MapCityType;
  addingCities: (document: MapCityType) => Promise<void>;
}

const AddCityButton = ({ selectedCity, addingCities }: Props) => {
  const [open, setOpen] = useState(false);

  const toogleAddModal = async () => {
    setOpen((old) => !old);
  };

  return (
    <>
      <Button
        className="z-50 rounded-full bg-white text-black shadow-xl ring-2 hover:bg-violet6"
        onClick={toogleAddModal}
      >
        <MdLocationCity fontSize="large" />
      </Button>
      <NewCityForm
        mapCity={selectedCity}
        open={open}
        onClose={() => setOpen(() => false)}
        addingCities={addingCities}
      />
    </>
  );
};

export default AddCityButton;

interface NewCityFormProps {
  mapCity?: MapCityType;
  open: boolean;
  onClose: () => void;
  addingCities: (document: MapCityType) => Promise<void>;
}

const NewCityForm = ({
  mapCity,
  open,
  onClose,
  addingCities,
}: NewCityFormProps) => {
  const [changedCity, setChangingCity] = useState<MapCityType>(
    mapCity || initialCity
  );

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event) {
      const { id, value } = event.target;

      setChangingCity((oldCity) => ({
        ...oldCity,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    await addingCities({ city: changedCity.city, year: changedCity.year });
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
            value={changedCity.year}
            onChange={handleChange}
            placeholder={changedCity?.year || 'År'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="text"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Tour by
          </label>
          <textarea
            id="city"
            value={changedCity.city}
            onChange={handleChange}
            placeholder={changedCity?.city || 'Bynavn'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="flex justify-between pt-5">
          <Button onClick={onClose} variant="destructive">
            Fortryd
          </Button>
          <Button onClick={handleSubmit} variant="default">
            Opret
          </Button>
        </div>
      </div>
    </Modal>
  );
};
