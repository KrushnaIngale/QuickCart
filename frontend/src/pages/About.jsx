const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center">
        <h1 className="text-5xl font-black text-slate-800">About SmartCart</h1>

        <p className="text-slate-500 mt-5 max-w-3xl mx-auto leading-relaxed">
          SmartCart is a modern ecommerce platform built to deliver premium
          shopping experience with fast delivery, secure payments, and
          high-quality products.
        </p>
      </div>

      {/* SECTION */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="bg-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold">Our Mission</h2>

          <p className="text-slate-500 mt-4 leading-relaxed">
            To make online shopping simple, secure, and enjoyable for everyone.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold">Fast Delivery</h2>

          <p className="text-slate-500 mt-4 leading-relaxed">
            We ensure quick shipping and real-time order tracking experience.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold">Premium Quality</h2>

          <p className="text-slate-500 mt-4 leading-relaxed">
            Every product is carefully selected for quality and performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
