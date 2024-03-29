'use client';

import { Icon } from 'leaflet';
import { ChangeEvent, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Marker, Popup, Tooltip as MapToolip } from 'react-leaflet';

import { NotificationDbType } from '@components/ui/BottomNav';
import Select from '@components/ui/Select';
import { DocumentUser, useFirestore } from '@lib/hooks/useFirestore';

import { MarkerData } from './Map';

const markerTypes = [
  'bar',
  'bus',
  'cafe',
  'hotel',
  'museum',
  'music',
  'question',
  'restaurant',
  'sightseeing',
  'tour',
  'train',
  'unknown',
] as const;

export type MarkerType = (typeof markerTypes)[number];

const madeBys = ['app', 'user'] as const;

type MadeByType = (typeof madeBys)[number];

const handleDocType = (docType: MarkerType, madeBy: MadeByType) => {
  switch (madeBy) {
    case 'app':
      return `${docType}_red`;

    case 'user':
      return `${docType}`;

    default:
      return 'unknown';
  }
};

interface Props {
  index: number;
  marker: MarkerData;
  documentUser: DocumentUser;
  updatingDoc: (id: string, document: MarkerData) => Promise<void>;
  deletingDoc: (id: string) => Promise<void>;
}

const MoiMarkers = ({
  index,
  marker,
  documentUser,
  updatingDoc,
  deletingDoc,
}: Props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<MarkerData | undefined>(
    undefined
  );

  const { addingDoc: addingMapBadge } = useFirestore<NotificationDbType>(
    'notification',
    'updatedAt'
  );

  const handleOpenEditMarker = (marker: MarkerData) => {
    setShowEdit(() => true);
    setCurrentMarker(() => marker);
  };

  const handleOpenDeleteModal = (marker: MarkerData) => {
    setShowDelete(() => true);
    setCurrentMarker(() => marker);
  };

  const handleDeleteMarker = async () => {
    if (currentMarker?.id) {
      await deletingDoc(currentMarker.id);
    }
    setShowDelete(false);
    setCurrentMarker(undefined);
  };

  const handleSubmitMarker = async () => {
    if (currentMarker?.id) {
      await updatingDoc(currentMarker.id, {
        ...currentMarker,
        madeBy: !documentUser.isSuperAdmin ? 'user' : currentMarker.madeBy,
      });
    }

    await addingMapBadge(
      {
        updatedAt: new Date(),
      },
      'kort'
    );
    setShowEdit(() => false);
    setCurrentMarker(() => undefined);
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

  const handleChangeMadeBy = (event: MadeByType) => {
    setCurrentMarker((old) => {
      if (old) {
        return {
          ...old,
          madeBy: event,
        };
      }
    });
  };

  const handleChangeType = (event: MarkerType) => {
    setCurrentMarker((old) => {
      if (old) {
        return {
          ...old,
          type: event,
        };
      }
    });
  };

  const canEdit = true;
  const canDelete =
    documentUser.isAdmin || documentUser.isBoard || documentUser.isSuperAdmin;

  return (
    <div key={`first${index}`} className="ring-3">
      <Marker
        position={[marker.location.latitude, marker.location.longitude]}
        icon={
          new Icon({
            iconUrl: `/images/markers/${handleDocType(
              marker.type as MarkerType,
              marker.madeBy as MadeByType
            )}.png`,
            shadowUrl: '/images/markers/marker-shadow.png',
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
          className="z-30"
        >
          <div>
            {!showEdit && !showDelete && (
              <div>
                <p className="dynamic_text">{marker.title}</p>
                <p className="dynamic_text">{marker.description}</p>
                <div className="flex items-center justify-center gap-3">
                  {canDelete && (
                    <button
                      onClick={() => handleOpenDeleteModal(marker)}
                      className="btn-error btn-xs btn"
                    >
                      <MdDelete />
                    </button>
                  )}
                  {canEdit &&
                    (documentUser.isSuperAdmin || marker.madeBy !== 'app') && (
                      <button
                        onClick={() => handleOpenEditMarker(marker)}
                        className="btn-warning btn-sm btn"
                      >
                        <MdEdit />
                      </button>
                    )}
                </div>
              </div>
            )}
            {showDelete && canDelete && currentMarker && (
              <div>
                <p className="text-lg">Er du sikker på du vil slette markør?</p>
                <p>Denne handling kan ikke ændres.</p>
                <div className="flex justify-between">
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
                    Lang Titel
                  </label>
                  <textarea
                    id="title"
                    value={currentMarker?.title}
                    onChange={handleChangeMarker}
                    placeholder={currentMarker?.title || 'Lang Titel'}
                    className="dynamic_text textarea-bordered textarea bg-white"
                  />
                </div>
                <div className="pt-5">
                  <label
                    htmlFor="password"
                    className="dynamic_text green_gradient mb-2 block font-medium"
                  >
                    Kort Titel
                  </label>
                  <textarea
                    id="nick"
                    value={currentMarker?.nick}
                    onChange={handleChangeMarker}
                    placeholder={currentMarker?.title || 'Kort Titel'}
                    className="dynamic_text textarea-bordered textarea bg-white"
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
                    placeholder={currentMarker?.description || 'Beskrivelse'}
                    className="dynamic_text textarea-bordered textarea bg-white"
                  />
                </div>
                {documentUser.isSuperAdmin && (
                  <div className="pt-5">
                    <label
                      htmlFor="password"
                      className="dynamic_text green_gradient mb-2 block font-medium"
                    >
                      Lavet af
                    </label>
                    <Select
                      value={currentMarker?.madeBy}
                      placeholder={currentMarker?.madeBy}
                      onChange={(e) => handleChangeMadeBy(e as MadeByType)}
                      groups={[{ groupItems: madeBys }]}
                    />
                  </div>
                )}
                <div className="pt-5">
                  <label
                    htmlFor="password"
                    className="dynamic_text green_gradient mb-2 block font-medium"
                  >
                    Type
                  </label>
                  <Select
                    value={currentMarker?.type}
                    placeholder={currentMarker?.type}
                    onChange={(e) => handleChangeType(e as MarkerType)}
                    groups={[{ groupItems: markerTypes }]}
                  />
                </div>
                <div className="flex justify-between pt-5">
                  <button
                    onClick={() => setShowEdit(false)}
                    color={'error'}
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
