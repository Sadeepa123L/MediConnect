
export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About MediCare</h2>
            <div className="w-16 h-1 bg-[#185FA5] mb-6 rounded-full"></div>
            <p className="text-gray-600 leading-relaxed mb-6">
              At MediCare, we believe that access to healthcare should be simple, fast, and accessible to everyone. Our platform bridges the gap between expert medical professionals and patients needing immediate care.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Without the hassle of complex registrations, we prioritize your health by allowing you to book appointments with verified specialists across the country in just a few clicks.
            </p>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-1 text-center">
                <div className="text-3xl font-bold text-[#185FA5] mb-1">50+</div>
                <div className="text-sm text-gray-500 font-medium">Expert Doctors</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-1 text-center">
                <div className="text-3xl font-bold text-[#185FA5] mb-1">10k+</div>
                <div className="text-sm text-gray-500 font-medium">Happy Patients</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-2xl h-96 w-full flex items-center justify-center border border-gray-300">
            <div className="text-gray-400 flex flex-col items-center gap-2">
              <i className="ti ti-photo text-4xl"></i>
              <span>Hospital/Doctor Image Here</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}