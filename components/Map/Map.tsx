'use client';

import 'leaflet/dist/leaflet.css';
import './leaflet-override.css';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { FaUserNinja, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { MdPhotoLibrary, MdMyLocation } from 'react-icons/md';

import { authContext } from '@lib/store/auth-context';

import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
  Tooltip,
  TileLayer,
  useMap,
} from 'react-leaflet';
import L, { Icon, LatLngExpression } from 'leaflet';
import { useFirestore } from '@lib/hooks/useFirestore';
import SelectComponent from '@components/utility/SelectComponent';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MarkerData {
  id: string;
  location: Coordinate;
  description: string;
  madeBy: string;
  nick: string;
  title: string;
  type: string;
}

const handleDocType = (docType: string, madeBy: string) => {
  switch (madeBy) {
    case 'app':
      return `${docType}_red`;

    default:
      return docType;
  }
};

const FlyToSelector = ({ markers }: { markers: MarkerData[] }) => {
  const map = useMap();
  const [center, setCenter] = useState([
    markers[0].location.latitude,
    markers[0].location.longitude,
  ]);

  const handleSelectChange = (event: string) => {
    const selectedMarker = markers.filter(
      (d: MarkerData) => d.title === event,
    )[0];
    setCenter([
      selectedMarker.location.latitude,
      selectedMarker.location.longitude,
    ]);
  };

  useEffect(() => {
    const latlng = L.latLng(center[0], center[1]);
    map.flyTo(latlng, 18, {
      duration: 2,
    });
  }, [center[0]]);

  const selectValues = markers.map(s => ({
    value: s.title,
    label: s.nick,
    colour: s.madeBy === 'app' ? 'red' : 'black',
  }));

  return (
    <SelectComponent onChange={handleSelectChange} options={selectValues} />
  );
};

function UserMapButton() {
  const map = useMapEvents({
    locationfound: location => {
      map.flyTo(location.latlng, map.getZoom());
    },
  });

  const handleFlyToUserLocation = () => {
    map.locate();
  };

  return (
    <button className="btn" onClick={handleFlyToUserLocation}>
      <MdMyLocation />
    </button>
  );
}

const MapPage = () => {
  const { authUser, documentUser, loading } = useContext(authContext);
  const {
    docs: markers,
    loading: markerLoading,
    updatingDoc,
    deletingDoc,
  } = useFirestore<MarkerData>('map', 'type');
  const [userPosition, setUserPosition] = useState<
    LatLngExpression | undefined
  >(undefined);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<MarkerData | undefined>(
    undefined,
  );

  const small = false;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserPosition(
          L.latLng(position.coords.latitude, position.coords.longitude),
        );
      },
      error => console.error(error),
    );
  }, []);

  const router = useRouter();

  if (loading || markerLoading) {
    return (
      <div className="flex flex-col items-center">
        <div className="py-10">
          <p className="">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    router.replace('/');
  }
  const handleOpenEditMarker = (marker: MarkerData) => {
    setShowEdit(true);
    setCurrentMarker(marker);
  };

  const handleOpenDeleteModal = (marker: MarkerData) => {
    setShowDeleteModal(true);
    setCurrentMarker(marker);
  };

  const handleDeleteMarker = () => {
    if (currentMarker?.id) {
      deletingDoc(currentMarker.id);
    }
    setShowDeleteModal(false);
    setCurrentMarker(undefined);
  };

  const handleChangeMarker = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setCurrentMarker(old => {
      if (old) {
        return {
          ...old,
          [id]: value,
        };
      }
    });
  };

  const handleSubmitMarker = () => {
    if (currentMarker?.id) {
      updatingDoc(currentMarker.id, { ...currentMarker });
    }
    setShowEdit(false);
    setCurrentMarker(undefined);
  };

  const canEdit = documentUser?.isSuperAdmin || false;

  return (
    <>
      {userPosition && (
        <div className="relative">
          <MapContainer
            center={userPosition}
            zoom={20}
            style={{ height: `100vh`, width: '100wh', zIndex: 0 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={userPosition}
              icon={
                new Icon({
                  iconUrl: `/images/avatars/${
                    documentUser?.avatar || 'marker-icon'
                  }.png`,
                  iconSize: [25, 25],
                  iconAnchor: [18, 18],
                  popupAnchor: [0, -10],
                })
              }>
              <Tooltip direction="bottom" offset={[0, 20]} opacity={1}>
                {documentUser?.nick}
              </Tooltip>
            </Marker>
            <div className="absolute top-[50vh] right-2 shadow-xl">
              <UserMapButton />
            </div>
            <div className="absolute top-2 right-2 shadow-xl">
              {markers && <FlyToSelector markers={markers} />}
            </div>
            {markers &&
              markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={[
                    marker.location.latitude,
                    marker.location.longitude,
                  ]}
                  icon={
                    new Icon({
                      iconUrl: `/images/markers/${handleDocType(
                        marker.type,
                        marker.madeBy,
                      )}.png`,
                      iconSize: [25, 25],
                      iconAnchor: [18, 18],
                      popupAnchor: [0, -10],
                    })
                  }>
                  {/* <Popup>
                    <div>
                      {!showEdit && (
                        <>
                          <Stack spacing={2}>
                            <DynamicText desktop="h5" mobile="h6">
                              {marker.title}
                            </DynamicText>
                          </Stack>
                          <DynamicText>{marker.description}</DynamicText>
                          <Stack
                            direction="row"
                            spacing={3}
                            justifyContent="flex-end">
                            <EditIcon
                              fontSize="small"
                              onClick={() => handleOpenEditMarker(marker)}
                            />
                            {documentUser?.nick === 'Redacteur' && (
                              <DeleteIcon
                                fontSize="small"
                                onClick={() => handleOpenDeleteModal(marker)}
                              />
                            )}
                          </Stack>
                        </>
                      )}
                      {showEdit && canEdit && currentMarker && (
                        <Typography>
                          <Typography>
                            <Stack spacing={1} sx={{pt: 2}}>
                              <>
                                <Stack>
                                  <BoldText variant="subtitle1">Titel</BoldText>
                                  <TextField
                                    id="title"
                                    type="text"
                                    value={currentMarker?.title}
                                    onChange={handleChangeMarker}
                                    placeholder={
                                      currentMarker?.title || 'Titel'
                                    }
                                    size="small"
                                  />
                                </Stack>
                                <Stack>
                                  <BoldText variant="subtitle1">Nick</BoldText>
                                  <TextField
                                    id="nick"
                                    type="text"
                                    value={currentMarker?.nick}
                                    onChange={handleChangeMarker}
                                    placeholder={currentMarker?.nick || 'Nick'}
                                    size="small"
                                  />
                                </Stack>
                                <Stack>
                                  <BoldText variant="subtitle1">Type</BoldText>
                                  <TextField
                                    id="madeBy"
                                    type="text"
                                    value={currentMarker?.madeBy}
                                    onChange={handleChangeMarker}
                                    placeholder={
                                      currentMarker?.madeBy ||
                                      'Type: app eller user'
                                    }
                                    size="small"
                                  />
                                </Stack>
                                <Stack>
                                  <BoldText variant="subtitle1">
                                    Beskrivelse
                                  </BoldText>
                                  <TextField
                                    id="description"
                                    type="text"
                                    value={currentMarker?.description}
                                    multiline
                                    onChange={handleChangeMarker}
                                    placeholder={
                                      currentMarker?.description ||
                                      'Beskrivelse'
                                    }
                                    size="small"
                                  />
                                </Stack>
                              </>
                            </Stack>
                          </Typography>
                          <Stack direction="row" justifyContent="space-between">
                            <Button
                              variant="outlined"
                              onClick={() => setShowEdit(false)}
                              color={'error'}>
                              Fortryd
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={handleSubmitMarker}>
                              Ændr
                            </Button>
                          </Stack>
                        </Typography>
                      )}
                    </div>
                  </Popup> */}
                  <Tooltip direction="bottom" offset={[0, 20]} opacity={1}>
                    {marker.nick}
                  </Tooltip>
                </Marker>
              ))}
          </MapContainer>
          {/* {showDeleteModal && (
            <>
              <Dialog
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}>
                <DialogTitle>Er du sikker på du vil slette markør?</DialogTitle>
                <DialogContent>
                  <p>Denne handling kan ikke ændres.</p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowDeleteModal(false)}>
                    Fortryd
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDeleteMarker}>
                    Slet
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )} */}
        </div>
      )}
    </>
  );
};

export default MapPage;
