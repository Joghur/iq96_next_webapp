"use client";

import { Icon } from "leaflet";
import { ChangeEvent, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Tooltip as MapToolip, Marker, Popup } from "react-leaflet";
import { MarkerData } from "./Map";
import { DocumentUser } from "@lib/hooks/useFirestore";

export type MarkerType =
  | "bar"
  | "bus"
  | "cafe"
  | "hotel"
  | "museum"
  | "music"
  | "question"
  | "restaurant"
  | "sightseeing"
  | "tour"
  | "train"
  | "unknown";

const handleDocType = (docType: MarkerType, madeBy: string) => {
  switch (madeBy) {
    case "app":
      return `${docType}_red`;

    case "user":
      return `${docType}`;

    default:
      return "unknown";
  }
};

interface Props {
  index: number;
  marker: MarkerData;
  documentUser: DocumentUser;
  canEdit: boolean;
  updatingDoc: (id: string, document: MarkerData) => Promise<void>;
  deletingDoc: (id: string) => Promise<void>;
}

const MoiMarkers = ({
  index,
  marker,
  documentUser,
  canEdit,
  updatingDoc,
  deletingDoc,
}: Props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<MarkerData | undefined>(
    undefined
  );

  const handleOpenEditMarker = (marker: MarkerData) => {
    setShowEdit(true);
    setCurrentMarker(marker);
  };

  const handleOpenDeleteModal = (marker: MarkerData) => {
    setShowDelete(true);
    setCurrentMarker(marker);
  };

  const handleDeleteMarker = () => {
    if (currentMarker?.id) {
      deletingDoc(currentMarker.id);
    }
    setShowDelete(false);
    setCurrentMarker(undefined);
  };

  const handleSubmitMarker = () => {
    if (currentMarker?.id) {
      updatingDoc(currentMarker.id, { ...currentMarker });
    }
    setShowEdit(false);
    setCurrentMarker(undefined);
  };

  const handleChangeMarker = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;

    setCurrentMarker((old) => {
      if (old) {
        return {
          ...old,
          [id]: value,
        };
      }
    });
  };

  return (
    <div key={`first${index}`} className="ring-3">
      <Marker
        position={[marker.location.latitude, marker.location.longitude]}
        icon={
          new Icon({
            iconUrl: `/images/markers/${handleDocType(
              marker.type as MarkerType,
              marker.madeBy
            )}.png`,
            shadowUrl: `/images/markers/marker-shadow.png`,
            iconSize: [25, 35],
            iconAnchor: [18, 27],
            shadowSize: [25, 35],
            shadowAnchor: [14, 26],
            popupAnchor: [0, -10],
          })
        }
      >
        <Popup
          closeOnClick={false} // Do not remove
          closeOnEscapeKey={true} // Do not remove
          closeButton={true}
          className="z-1000"
        >
          <div>
            {!showEdit && !showDelete && (
              <div>
                <p className="dynamic_text">{marker.title}</p>
                <p className="dynamic_text">{marker.description}</p>
                <div className="stack_row items-center justify-center gap-3">
                  {documentUser?.nick === "Redacteur" && (
                    <button
                      onClick={() => handleOpenDeleteModal(marker)}
                      className="btn-error btn-xs btn"
                    >
                      <MdDelete />
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenEditMarker(marker)}
                    className="btn-warning btn-sm btn"
                  >
                    <MdEdit />
                  </button>
                </div>
              </div>
            )}
            {showDelete && canEdit && currentMarker && (
              <div>
                <p className="text-lg">Er du sikker på du vil slette markør?</p>
                <p>Denne handling kan ikke ændres.</p>
                <div className="stack_row justify-between">
                  <button
                    onClick={() => setShowDelete(false)}
                    className="btn-error btn-outline btn-sm btn"
                  >
                    Fortryd
                  </button>
                  <button
                    onClick={handleDeleteMarker}
                    className="btn-success btn-sm btn"
                  >
                    Slet
                  </button>
                </div>
              </div>
            )}
            {showEdit && canEdit && currentMarker && (
              <div>
                <div className="pt-5">
                  <label
                    htmlFor="password"
                    className="dynamic_text green_gradient mb-2 block font-medium"
                  >
                    Titel
                  </label>
                  <textarea
                    id="title"
                    value={currentMarker?.title}
                    onChange={handleChangeMarker}
                    placeholder={currentMarker?.title || "Titel"}
                    className="dynamic_text textarea-bordered textarea"
                  />
                </div>
                <div className="pt-5">
                  <label
                    htmlFor="password"
                    className="dynamic_text green_gradient mb-2 block font-medium"
                  >
                    Nick
                  </label>
                  <textarea
                    id="nick"
                    value={currentMarker?.nick}
                    onChange={handleChangeMarker}
                    placeholder={currentMarker?.title || "Nick"}
                    className="dynamic_text textarea-bordered textarea"
                  />
                </div>
                <div className="pt-5">
                  <label
                    htmlFor="password"
                    className="dynamic_text green_gradient mb-2 block font-medium"
                  >
                    Type
                  </label>
                  <textarea
                    id="madeBy"
                    value={currentMarker?.madeBy}
                    onChange={handleChangeMarker}
                    placeholder={
                      currentMarker?.madeBy || "Type: app eller user"
                    }
                    className="dynamic_text textarea-bordered textarea"
                  />
                </div>
                <div className="pt-5">
                  <label
                    htmlFor="password"
                    className="dynamic_text green_gradient mb-2 block font-medium"
                  >
                    Beskrivelse
                  </label>
                  <textarea
                    id="description"
                    value={currentMarker?.description}
                    onChange={handleChangeMarker}
                    placeholder={currentMarker?.description || "Beskrivelse"}
                    className="dynamic_text textarea-bordered textarea"
                  />
                </div>
                <div className="stack_row justify-between pt-5">
                  <button
                    onClick={() => setShowEdit(false)}
                    color={"error"}
                    className="btn-error btn-outline btn-sm btn"
                  >
                    Fortryd
                  </button>
                  <button
                    onClick={handleSubmitMarker}
                    className="btn-info btn-sm btn"
                  >
                    Ændr
                  </button>
                </div>
              </div>
            )}
          </div>
        </Popup>
        <MapToolip direction="bottom" offset={[0, 20]} opacity={1}>
          {marker.nick}
        </MapToolip>
      </Marker>
    </div>
  );
};

export default MoiMarkers;
