const AdminTab = () => {
  return (
    <div className="px-5">
      <div className="flex flex-col gap-3 min-h-screen">
        <button
          disabled
          onClick={() => {
            console.log('Kopierer');
          }}
          className="btn btn-accent dynamic_text ">
          Kopier gamle men aktuelle kort-markører
        </button>
        <button
          disabled
          onClick={() => {
            console.log('Sletter');
          }}
          className="btn btn-accent dynamic_text ">
          Slet gamle, men aktuelle kort-markører
        </button>
      </div>
    </div>
  );
};

export default AdminTab;
