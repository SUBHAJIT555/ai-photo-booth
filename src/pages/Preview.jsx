import Logo from "../component/Logo";

import {
  IoDownloadSharp,
  IoHome,
  IoPrintSharp,
  IoQrCode,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Label from "../component/Label";

function Preview() {
  const { resultUrl } = useLocation()?.state || {};
  //  {
  //   resultUrl:
  //     "https://worker-images-5.ws.pho.to/i2/1280e25733859486057e182c8ae1b9a91ae3a464_result.jpeg?",
  // };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-evenly flex-col">
      <Logo />
      <div className="w-[550px] h-[800px] bg-red-200 relative overflow-hidden rounded-3xl">
        <Label />
        {resultUrl && (
          <div className="w-full h-full">
            <img
              src={resultUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-10 text-zinc-200 text-[3vw]">
        <button className="border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700">
          <IoPrintSharp />
        </button>
        <button className="border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700">
          <IoDownloadSharp />
        </button>
        <button className="border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700">
          <IoQrCode />
        </button>
        <Link to="/home">
          <button className="border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700">
            <IoHome />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Preview;
