const OldPageButton = () => {
  return (
    <button
      className="dynamic_text btn-outline btn rounded-xl backdrop-blur lg:text-xs"
      onClick={() =>
        (window.location.href = process.env.NEXT_PUBLIC_OLDPAGE_LINK || "")
      }
    >
      Gå til gammel side - {process.env.NEXT_PUBLIC_OLDPAGE}
    </button>
  );
};

export default OldPageButton;
