import ScrollReveal from '../ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#F4EDE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal variant="slide-up" duration={800}>
              <span className="text-sm font-medium text-[#EF8354] uppercase tracking-wide">Why MediCare</span>
              <h2
                className="text-3xl md:text-4xl font-semibold text-[#332B25] mt-2 mb-6"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Healthcare, without the hassle
              </h2>
              <p className="text-[#5C5249] leading-relaxed mb-5">
                At MediCare, we believe that getting care shouldn't feel like work. Our platform connects you to verified specialists without the registration forms, the phone calls, or the waiting.
              </p>
              <p className="text-[#5C5249] leading-relaxed mb-8">
                Pick a doctor, choose a time, and you're done — in a few clicks, from anywhere in the country.
              </p>
            </ScrollReveal>

            <div className="flex gap-4">
              <ScrollReveal className="flex-1" variant="slide-up" delay={200} duration={800}>
                <div className="bg-white p-5 rounded-2xl shadow-[0_8px_24px_-8px_rgba(51,43,37,0.1)] text-center relative overflow-hidden">
                  <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-3 bg-[#F4EDE1]"
                    style={{
                      maskImage: 'radial-gradient(circle at 8px 0, transparent 6px, black 6.5px)',
                      maskSize: '16px 100%',
                      maskRepeat: 'repeat-x',
                    }}
                    aria-hidden="true"
                  ></div>
                  <div className="text-3xl font-semibold text-[#2A6B63] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>50+</div>
                  <div className="text-sm text-[#8A8074] font-medium">Expert doctors</div>
                </div>
              </ScrollReveal>

              <ScrollReveal className="flex-1" variant="slide-up" delay={350} duration={800}>
                <div className="bg-white p-5 rounded-2xl shadow-[0_8px_24px_-8px_rgba(51,43,37,0.1)] text-center relative overflow-hidden">
                  <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-3 bg-[#F4EDE1]"
                    style={{
                      maskImage: 'radial-gradient(circle at 8px 0, transparent 6px, black 6.5px)',
                      maskSize: '16px 100%',
                      maskRepeat: 'repeat-x',
                    }}
                    aria-hidden="true"
                  ></div>
                  <div className="text-3xl font-semibold text-[#2A6B63] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>10k+</div>
                  <div className="text-sm text-[#8A8074] font-medium">Happy patients</div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal variant="slide-left" delay={300} duration={900}>
            <div className="relative">
              <div className="bg-[#2A6B63] rounded-4xl h-96 w-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white/10" aria-hidden="true"></div>
                <div className="absolute bottom-12 right-12 w-24 h-24 rounded-full bg-[#EF8354]/20" aria-hidden="true"></div>
                <div className="text-center text-white/90 flex flex-col items-center gap-3 px-8">
                  <i className="ti ti-stethoscope text-5xl" aria-hidden="true"></i>
                  <p className="text-sm text-white/70 max-w-xs leading-relaxed">
                    A team of verified specialists, ready when you need them
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}