import { MapPin, Phone, Clock } from "lucide-react";

export default function MapSection() {
  return (
    <section id="location" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Find Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4 font-heading">
            Visit Our Institute
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Conveniently located in Govandi, Mumbai — easy to reach by train and bus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Info column */}
          <div className="space-y-4">
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Address</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    AI Computer Institute,
                    <br />
                    Govandi, Mumbai,
                    <br />
                    Maharashtra — 400088
                  </p>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 text-green-600 p-3 rounded-xl flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-slate-900 mb-2">Timings</h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-slate-500">
                      <span>Mon – Sat</span>
                      <span className="font-semibold text-slate-700">8:00 AM – 8:00 PM</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Sunday</span>
                      <span className="font-semibold text-slate-700">9:00 AM – 2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 text-orange-500 p-3 rounded-xl flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Call Us</h4>
                  <a
                    href="tel:+919876543210"
                    className="text-blue-600 hover:underline text-sm font-semibold"
                  >
                    +91 98765 43210
                  </a>
                  <p className="text-slate-400 text-xs mt-0.5">Available during institute hours</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://maps.app.goo.gl/H1TfHx7BSdhrHTYY8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <MapPin size={17} /> Get Directions on Google Maps
            </a>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              src="https://maps.google.com/maps?q=AI+Computer+Institute+Govandi+Mumbai&z=16&output=embed"
              width="100%"
              height="480"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AI Computer Institute — Govandi, Mumbai"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
