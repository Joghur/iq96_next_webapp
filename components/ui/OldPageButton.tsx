const OldPageButton = () => {
  return (
    <button
      className="dynamic_text btn-outline btn rounded-xl"
      onClick={() =>
        (window.location.href = process.env.NEXT_PUBLIC_OLDPAGE_LINK || "")
      }
    >
      Gå til den gamle side - {process.env.NEXT_PUBLIC_OLDPAGE}
    </button>
  );
};

export default OldPageButton;
