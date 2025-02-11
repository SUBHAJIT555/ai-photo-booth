const Label = () => {
  // <div className="w-full h-1/5 bg-blue-800 absolute bottom-0 flex justify-between items-center px-2">

  return (
    <div className="h-[15%] w-full bg-gray-800 p-4 flex items-center justify-between text-white">
      {/* Left Text */}
      <div className="flex-1 truncate">
        <h1 className="text-xs md:text-sm  font-bold text-zinc-200">
          CODECOBBLE
        </h1>
        {/* <h3 className="text-sm font-bold truncate">Image Title</h3>
        <p className="text-xs text-gray-400 truncate">Category/Type</p> */}
      </div>

      {/* Right Text */}
      <div className="text-right ml-2">
        <p className="text-xs md:text-sm  font-bold">Ai-PhotoBooth</p>
        <p className="text-xs md:text-sm  font-light">Created by: CodeCobble</p>
      </div>
    </div>
  );
};

export default Label;
