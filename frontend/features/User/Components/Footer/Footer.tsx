"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { CgInstagram } from "react-icons/cg";
import { sendMessage } from "@/lib/api";
import { userToast } from "@/features/User/Components/UserToast";

const FooterSection = () => {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nama || !form.email || !form.pesan) return;
    setSubmitting(true);
    try {
      await sendMessage({
        nama: form.nama,
        email: form.email,
        pesan: form.pesan,
      });
      setForm({ nama: "", email: "", pesan: "" });
      userToast.success("Message sent!", "We will contact you shortly.");
    } catch {
      userToast.error("Gagal mengirim pesan", "Silakan coba lagi nanti.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer id="contact" className="border-border/50 bg-black pt-[150px]">
      <div className="max-w-[1400px] mx-auto section-padding pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="bg-white p-2 px-4 rounded-[80px] inline-block">
              <Image src="/logo.webp" alt="" width={55} height={55} />
            </div>
            <p className="text-sm leading-relaxed mt-5 text-white">
              <strong>PT. Tidex Titan Persada</strong> — Trusted to Commitment.
              Delivering integrated IT, ICT, and IoT solutions since 1997.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">
              CONTACT US
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />
                <p className="text-white">
                  Jl. Wonorejo Permai Utara Raya Blok BB, No. 577, Nirwana
                  Eksekutif Surabaya, Jawa Timur, Indonesia
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-white">031-8782446</p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-white">info@tidex.co.id</p>
              </li>
              <li className="flex items-center gap-3">
                <CgInstagram className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-white">@tidex.surabaya</p>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">
              GET IN TOUCH
            </h4>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                required
                placeholder="Nama"
                value={form.nama}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nama: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/50 transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/50 transition-colors"
              />
              <textarea
                required
                placeholder="Pesan"
                rows={3}
                value={form.pesan}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pesan: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-white/50 text-xs">
          © 2026 PT. Tidex Titan Persada. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
