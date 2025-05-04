type Props = {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmationPopup: React.FC<Props> = ({
  message,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="bg-white rounded shadow-lg p-6 m-4 max-w-md">
        <div className="mb-4">{message}</div>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
          >
            Fortryd
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
