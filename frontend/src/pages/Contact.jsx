const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center">
        <h1 className="text-5xl font-black">Contact Us</h1>

        <p className="text-slate-500 mt-5">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
        {/* FORM */}

        <div className="bg-white p-10 rounded-3xl shadow-sm">
          <h2 className="text-3xl font-bold mb-8">Send Message</h2>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-slate-300 rounded-xl px-5 py-4 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border border-slate-300 rounded-xl px-5 py-4 outline-none"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              className="border border-slate-300 rounded-xl px-5 py-4 outline-none resize-none"
            />

            <button className="bg-black hover:bg-slate-800 text-white py-4 rounded-xl transition">
              Send Message
            </button>
          </div>
        </div>

        {/* INFO */}

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold">Get In Touch</h2>

          <p className="text-slate-500 mt-5 leading-relaxed">
            Reach out to us for support, collaborations, or business inquiries.
          </p>

          <div className="mt-10 space-y-5">
            <div>
              <h3 className="font-bold">Email</h3>

              <p className="text-slate-500">support@smartcart.com</p>
            </div>

            <div>
              <h3 className="font-bold">Phone</h3>

              <p className="text-slate-500">+91 9876543210</p>
            </div>

            <div>
              <h3 className="font-bold">Location</h3>

              <p className="text-slate-500">Nashik, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
