const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-t border-gray-200 text-gray-500">
        <div className="w-full md:w-2/5">
          <img src="/assets/logo.svg" alt="SmartCart" className="w-28 md:w-32 mb-4" />
          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            SmartCart is your one-stop shop for premium electronics, gadgets, and accessories — delivered fast to your doorstep.
          </p>
          <div className="flex gap-4 mt-5">
            {["facebook_icon", "instagram_icon", "twitter_icon"].map((icon) => (
              <a key={icon} href="#" className="hover:opacity-70 transition">
                <img src={`/assets/${icon}.svg`} alt={icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="w-1/2 md:w-1/5">
          <h2 className="font-semibold text-gray-800 mb-5 text-sm uppercase tracking-wider">Company</h2>
          <ul className="text-sm space-y-2.5">
            {["Home", "About Us", "Contact Us", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-orange-600 hover:underline transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 md:w-1/5">
          <h2 className="font-semibold text-gray-800 mb-5 text-sm uppercase tracking-wider">Get in Touch</h2>
          <div className="text-sm space-y-2.5 text-gray-400">
            <p>+91 98765 43210</p>
            <p>support@smartcart.in</p>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs text-gray-400 border-t border-gray-100">
        Copyright 2025 © SmartCart. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
