import { Link } from "react-router-dom";
import Logo from "../component/Logo";

function SubmitOrRetake() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-evenly flex-col">
      <Logo />
      <div className="captureArea w-1/2 h-1/2 bg-zinc-700 rounded-2xl"></div>

      <div className="flex items-center justify-center gap-6">
        <Link to="/capture">
          <button className="capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-2 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200">
            reatake
          </button>
        </Link>
        <Link to="/avatar">
          <button className="capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-2 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200">
            submit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SubmitOrRetake;
