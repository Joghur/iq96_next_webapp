const OldPageButton = () => {
  return (
    <button
      className="dynamic_text btn-outline btn rounded-xl"
      onClick={() => (window.location.href = "https://www.iq96.dk/IQ3")}
    >
      Gå til den gamle side iq96.dk
    </button>
  );
};

export default OldPageButton;
