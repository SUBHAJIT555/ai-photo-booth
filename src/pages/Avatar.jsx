import Logo from "../component/Logo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Label from "../component/Label";
import { cn } from "../utils/cn";
import { getData } from "../utils/localStorageDB";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxios";
import { FaSpinner } from "react-icons/fa";

// Dynamically import all avatars
const maleAvatars = import.meta.glob("../assets/Avatars/male-*.png", {
  eager: true,
});
const femaleAvatars = import.meta.glob("../assets/Avatars/female-*.png", {
  eager: true,
});

function Avatar() {
  const [gender, setGender] = useState("male");
  const [selectedImage, setSelectedImage] = useState(null);
  // const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(false);
  const publicAxios = useAxiosPublic();

  const [maleImages, setMaleImages] = useState([]);
  const [femaleImages, setFemaleImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Convert imported files into an array
    setMaleImages(Object.values(maleAvatars).map((img) => img.default));
    setFemaleImages(Object.values(femaleAvatars).map((img) => img.default));
  }, []);

  // Function to convert image to base64
  const convertToBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  // Handle swap button click
  const handleSwap = async () => {
    try {
      setLoading(true);
      if (selectedImage) {
        const targetBase64 = await convertToBase64(selectedImage);
        // setBase64Image(base64);

        // get the captured image
        const capturedImage = await getData("capturedImage");

        if (!capturedImage) {
          toast.success("Please capture an image first");
          return;
        }

        // Prepare data for submission
        const formData = new FormData();
        formData.append("source", capturedImage); // Captured image (already base64)
        formData.append("target", targetBase64); // Avatar image as base64

        // Send data to backend
        const data = await publicAxios.post("faceswap_handler.php", formData);

        if (data?.data?.result_url) {
          navigate(`/preview?resultUrl=${data.data.result_url}`, {
            state: {
              resultUrl: data.data.result_url,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error swapping images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center flex-col py-10 gap-10">
      <Logo />

      {/* Gender Toggle */}
      <div className="inline-flex items-center gap-2">
        <label className="text-zinc-200 text-md cursor-pointer">Male</label>
        <div className="relative inline-block w-11 h-5">
          <input
            type="checkbox"
            className="peer appearance-none w-11 h-5 bg-zinc-600 rounded-full checked:bg-zinc-600 cursor-pointer transition-colors duration-300"
            checked={gender === "female"}
            onChange={() =>
              setGender((prev) => (prev === "male" ? "female" : "male"))
            }
          />
          <label className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-zinc-600 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-zinc-600 cursor-pointer"></label>
        </div>
        <label className="text-zinc-200 text-md cursor-pointer">Female</label>
      </div>

      {/* Avatar Grid */}
      <div
        className={cn(
          `grid justify-center items-center gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden px-[10vw] w-full`
        )}
      >
        {(gender === "male" ? maleImages : femaleImages).map(
          (avatar, index) => (
            <div
              key={index}
              className={cn(
                "group relative  w-full max-w-[400px] mx-auto bg-red-200 rounded-xl overflow-hidden  cursor-pointer",
                avatar === selectedImage ? "border-2 border-zinc-200" : ""
              )}
              onClick={() => setSelectedImage(avatar)}
            >
              <div className="h-[85%] w-full overflow-hidden rounded-t-xl bg-gray-200">
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <Label />
            </div>
          )
        )}
      </div>

      {/* Swap Button */}

      <button
        onClick={handleSwap}
        disabled={!selectedImage || loading}
        className={cn(
          "capitalize text-zinc-200 tracking-tight font-light py-2 px-5 rounded-full border-2 border-transparent",
          selectedImage || loading
            ? "bg-zinc-700 hover:bg-zinc-900 hover:border-zinc-200"
            : "bg-zinc-500 cursor-not-allowed",
          loading && "opacity-50 cursor-not-allowed"
        )}
      >
        {loading ? (
          <span>
            <FaSpinner className="animate-spin" />
          </span>
        ) : (
          <span>Swap</span>
        )}
      </button>
    </div>
  );
}

export default Avatar;
