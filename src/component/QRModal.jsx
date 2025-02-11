import { useEffect } from "react";
import QRCode from "react-qr-code";
import PropTypes from "prop-types";

const QRModal = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-2">
          <div className="flex flex-col items-center space-y-4">
            <QRCode value={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

QRModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.string,
};

export default QRModal;
