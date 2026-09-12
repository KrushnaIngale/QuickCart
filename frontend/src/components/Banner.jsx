const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
      <img
        src="/assets/jbl_soundbox_image.png"
        alt="JBL Soundbox"
        className="max-w-56 object-contain"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-3 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px] text-gray-900">
          Level Up Your Gaming Experience
        </h2>
        <p className="max-w-[340px] font-medium text-gray-500 text-sm">
          From immersive sound to precise controls — everything you need to win
        </p>
        <button className="group flex items-center gap-2 px-12 py-2.5 bg-orange-600 rounded text-white hover:bg-orange-700 transition text-sm font-medium">
          Buy now
          <span className="group-hover:translate-x-1 transition inline-block">→</span>
        </button>
      </div>
      <img
        src="/assets/md_controller_image.png"
        alt="Controller"
        className="hidden md:block max-w-80 object-contain"
      />
      <img
        src="/assets/sm_controller_image.png"
        alt="Controller"
        className="md:hidden max-w-40 object-contain"
      />
    </div>
  );
};

export default Banner;
