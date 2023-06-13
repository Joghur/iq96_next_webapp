import { ChangeEvent, useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "@components/ui/Modal";

export interface MapCityType {
  city: string;
  year: string;
}

const initialCity = {
  city: "",
  year: "",
};

interface Props {
  selectedCity: MapCityType;
  addingCities: (document: MapCityType) => Promise<void>;
}

const AddButton = ({ selectedCity, addingCities }: Props) => {
  const [open, setOpen] = useState(false);

  const toogleAddModal = async () => {
    console.log("Addbutton");
    setOpen((old) => !old);
  };

  return (
    <>
      <button
        className="z-1000 btn rounded-full shadow-xl ring-2"
        onClick={toogleAddModal}
      >
        <MdAdd fontSize="large" />
      </button>
      <NewCityForm
        mapCity={selectedCity}
        open={open}
        onClose={() => setOpen(() => false)}
        addingCities={addingCities}
      />
    </>
  );
};

export default AddButton;

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
            placeholder={changedCity?.year || "År"}
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
            placeholder={changedCity?.city || "Bynavn"}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="stack_row justify-between pt-5">
          <button
            onClick={onClose}
            color={"error"}
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
