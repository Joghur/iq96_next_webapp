import React from 'react';
import {copyMapMarkers, deleteMapMarkers} from '../../utils/hooks/useFirestore';

const AdminTab = () => {
  return (
    <>
      <button disabled onClick={() => {}}>
        Kopier gamle kortdata
      </button>
      <button disabled onClick={() => {}}>
        Slet gamle kortdata
      </button>
    </>
  );
};

export default AdminTab;
