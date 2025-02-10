const Label = (props) => {
  // <div className="w-full h-1/5 bg-blue-800 absolute bottom-0 flex justify-between items-center px-2">
  return (
    <div className="h-[25%] p-4 flex   bg-blue-800 justify-between items-center text-zinc-200">
      <div>
        <h1 className="text-xs md:text-sm lg:text-base font-bold text-zinc-200">
          CODECOBBLE
        </h1>
      </div>

      <div className="flex flex-col justify-center item-center  text-zinc-200 font-thin leading-none px-2">
        <p className="text-xs md:text-sm lg:text-base font-bold">
          Ai-PhotoBooth
        </p>
        <p className="text-xs md:text-sm lg:text-base font-light">
          Created by: <br /> CodeCobble
        </p>
      </div>
    </div>
  );
};

export default Label;
