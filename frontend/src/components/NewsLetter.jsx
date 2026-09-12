const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      <h1 className="md:text-4xl text-2xl font-semibold text-gray-900">
        Subscribe now &amp; get 20% off
      </h1>
      <p className="text-gray-500 text-sm md:text-base pb-6 max-w-md">
        Join thousands of smart shoppers. Get exclusive deals and updates right in your inbox.
      </p>
      <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-600 text-sm focus:border-orange-400 transition"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none font-medium hover:bg-orange-700 transition text-sm">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
