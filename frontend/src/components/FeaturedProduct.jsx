const featuredItems = [
  {
    id: 1,
    image: "/assets/girl_with_headphone_image.png",
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: "/assets/girl_with_earphone_image.png",
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: "/assets/boy_with_laptop_image.png",
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center mb-10">
        <p className="text-3xl font-semibold text-gray-900">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2 rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-4">
        {featuredItems.map(({ id, image, title, description }) => (
          <div key={id} className="relative group overflow-hidden rounded-xl">
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover group-hover:brightness-75 transition duration-300"
            />
            <div className="absolute bottom-8 left-8 text-white space-y-2 group-hover:-translate-y-3 transition duration-300">
              <p className="font-semibold text-xl md:text-2xl">{title}</p>
              <p className="text-sm leading-5 max-w-52 text-white/80">{description}</p>
              <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded text-sm font-medium hover:bg-orange-700 transition">
                Buy now <span>↗</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
