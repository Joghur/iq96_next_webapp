const OldPageButton = () => {
  return (
    <button
      // className="dynamic_text btn-outline btn z-50 rounded-xl backdrop-blur lg:text-xs"
      className="dynamic_text px-4 py-2 backdrop-blur  border border-slate-200 rounded-md hover:bg-red-500 hover:text-white transition"
      onClick={() =>
        (window.location.href = process.env.NEXT_PUBLIC_OLDPAGE_LINK || '')
      }
    >
      Gammel side
    </button>
  );
};

export default OldPageButton;
