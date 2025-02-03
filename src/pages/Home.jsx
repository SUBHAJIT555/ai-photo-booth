import { MdCamera } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../component/Logo";

function Home() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-evenly flex-col">
      <Logo />
      <div className="text-zinc-100 text-[8vw] flex justify-center items-center">
        <MdCamera />
      </div>
      <div className="flex items-center justify-center">
        <Link to="/instruction">
          <button className="capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-3 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200">
            click here to start
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
