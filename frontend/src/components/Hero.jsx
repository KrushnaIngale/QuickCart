const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-3xl p-16 flex flex-col md:flex-row items-center justify-between">
      <div className="max-w-xl">
        <p className="uppercase tracking-[5px] text-slate-300 mb-5">
          Smart Shopping Experience
        </p>

        <h1 className="text-6xl font-bold leading-tight">
          Discover Premium Products Online
        </h1>

        <p className="mt-6 text-lg text-slate-300 leading-relaxed">
          Explore trending collections with seamless shopping and fast checkout
          experience.
        </p>

        <button className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-slate-200 transition">
          Shop Now
        </button>
      </div>

      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        alt=""
        className="w-[450px] rounded-3xl mt-10 md:mt-0 shadow-2xl"
      />
    </section>
  );
};

export default Hero;
