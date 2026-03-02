'use client'

import { Phone, Mail, MapPin, Printer } from "lucide-react";
import Image from "next/image";

const FooterSection = () => (
  <footer id="contact" className="border-border/50 bg-black pt-[150px]">
    <div className="max-w-[1400px] mx-auto section-padding pb-8">
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div>
          <div className="bg-white p-2 px-4 rounded-[80px] inline-block">
            <Image src={"/logo.webp"} alt={""} width={55} height={55}></Image>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mt-5 text-white">
            <strong>PT. Tidex Titan Persada</strong> — Trusted to Commitment. Delivering integrated IT, ICT, and IoT solutions since 1997.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-5 text-red-500">CONTACT US</h4>
          <ul className="space-y-3 text-muted-foreground text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />
              <p className="text-white">Jl. Kebon Jeruk Raya No. 56, Jakarta Barat, DKI Jakarta, Indonesia</p>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-white">(021) 530 4646</p>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-white">info@tidex.co.id</p>
            </li>
            <li className="flex items-center gap-3">
              <Printer className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-white">(021) 530 4747</p>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-5 text-red-500">GET IN TOUCH</h4>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <textarea
              placeholder="Message"
              rows={3}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            <button className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border/50 pt-6 text-center text-white/70 text-xs">
        © 2026 PT. Tidex Titan Persada. All rights reserved.
      </div>
    </div>
  </footer>
);

export default FooterSection;
