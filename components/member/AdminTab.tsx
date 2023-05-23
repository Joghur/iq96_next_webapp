const AdminTab = () => {
  return (
    <div className="flex flex-col gap-3 min-h-screen">
      <button
        disabled
        onClick={() => {
          console.log('Kopierer');
        }}
        className="btn">
        Kopier gamle men aktuelle kort-markører
      </button>
      <button
        disabled
        onClick={() => {
          console.log('Sletter');
        }}
        className="btn">
        Slet gamle, men aktuelle kort-markører
      </button>
    </div>
  );
};

export default AdminTab;
