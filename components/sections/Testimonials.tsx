export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      business: "S.J. Plumbing Services",
      quote: "Business Sorted helped us generate far more enquiries through our website. Our phones haven't stopped ringing since the new site went live.",
      rating: 5,
    },
    {
      name: "Marcus Thorne",
      business: "Kent Construction Co.",
      quote: "The SEO campaign they built for us completely transformed our business. We're now dominating local search for all our key services.",
      rating: 5,
    },
    {
      name: "Emma Davies",
      business: "Davies & Partners Accounting",
      quote: "Professional, transparent, and incredibly effective. Their digital marketing strategies firmly established us as the most trusted firm in our area.",
      rating: 5,
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's how we've helped other local businesses scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-5 h-5 text-brand drop-shadow-sm group-hover:scale-110 transition-transform duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote Body */}
              <blockquote className="flex-1">
                <p className="text-slate-700 text-lg leading-relaxed italic mb-8">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Author Footer */}
              <div className="mt-auto border-t border-slate-100 pt-6">
                <p className="font-bold text-slate-900 group-hover:text-brand transition-colors">
                  {testimonial.name}
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  {testimonial.business}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
