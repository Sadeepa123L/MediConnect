const specialties = [
  { name: 'Cardiology', icon: 'ti ti-heart' },
  { name: 'Pediatrics', icon: 'ti ti-baby-carriage' },
  { name: 'Dermatology', icon: 'ti ti-droplet' },
  { name: 'Neurology', icon: 'ti ti-brain' },
  { name: 'Orthopedics', icon: 'ti ti-bone' },
  { name: 'General Medicine', icon: 'ti ti-stethoscope' },
];

const steps = [
  {
    number: '01',
    title: 'Search',
    description: 'Find a doctor by name or specialty in seconds.',
  },
  {
    number: '02',
    title: 'Pick a time',
    description: 'Choose a date and slot that works for you.',
  },
  {
    number: '03',
    title: 'Confirmed',
    description: 'Get your appointment number — no account needed.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[#FBF6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-medium text-[#EF8354] uppercase tracking-wide">What we offer</span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-[#332B25] mt-2 mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Care across every specialty
          </h2>
          <p className="text-[#5C5249] leading-relaxed">
            From routine check-ups to specialist consultations, find the right doctor and book a time that fits your day.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {specialties.map((item) => (
            <div
              key={item.name}
              className="relative bg-white rounded-2xl p-5 text-center shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)] hover:shadow-[0_12px_28px_-8px_rgba(51,43,37,0.14)] hover:-translate-y-1 transition-all"
            >
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-3 bg-[#FBF6EF]"
                style={{
                  maskImage: 'radial-gradient(circle at 8px 0, transparent 6px, black 6.5px)',
                  maskSize: '16px 100%',
                  maskRepeat: 'repeat-x',
                }}
                aria-hidden="true"
              ></div>
              <div className="w-12 h-12 rounded-full bg-[#A8C4B0]/30 flex items-center justify-center mx-auto mb-3">
                <i className={`${item.icon} text-2xl text-[#2A6B63]`} aria-hidden="true"></i>
              </div>
              <p className="text-sm font-medium text-[#332B25]">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#2A6B63] rounded-4xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-white/5" aria-hidden="true"></div>
          <div className="absolute bottom-6 left-12 w-16 h-16 rounded-full bg-[#EF8354]/15" aria-hidden="true"></div>

          <h3
            className="text-2xl md:text-3xl font-semibold text-white text-center mb-10 relative"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Booking in three simple steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center relative">
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 left-[calc(50%+32px)] right-[calc(-50%+32px)] h-px bg-white/20"
                    aria-hidden="true"
                  ></div>
                )}
                <div className="w-12 h-12 rounded-full bg-[#EF8354] text-white flex items-center justify-center text-sm font-semibold mx-auto mb-4 relative z-10">
                  {step.number}
                </div>
                <h4 className="text-lg font-medium text-white mb-2">{step.title}</h4>
                <p className="text-sm text-white/70 max-w-xs mx-auto leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}