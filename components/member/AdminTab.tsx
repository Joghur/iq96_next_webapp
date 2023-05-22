const AdminTab = () => {
  return (
    <>
      <button
        disabled
        onClick={() => {
          console.log('Kopierer');
        }}>
        Kopier gamle kortdata
      </button>
      <button
        disabled
        onClick={() => {
          console.log('Sletter');
        }}>
        Slet gamle kortdata
      </button>
    </>
  );
};

export default AdminTab;
