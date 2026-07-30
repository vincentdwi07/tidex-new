"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { CgInstagram } from "react-icons/cg";
import { sendMessage } from "@/lib/api";

const FooterSection = () => {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nama || !form.email || !form.pesan) return;
    setSubmitting(true);
    setError("");
    try {
      await sendMessage({
        nama: form.nama,
        email: form.email,
        pesan: form.pesan,
      });
      setSent(true);
      setForm({ nama: "", email: "", pesan: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim pesan.");
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
              <Image src={"/logo.webp"} alt={""} width={55} height={55} />
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

            {sent ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-6 text-center">
                <p className="text-green-400 font-medium text-sm">
                  Pesan terkirim!
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Kami akan segera menghubungi Anda.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-xs text-white/50 hover:text-white underline transition-colors"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit}>
                {error && (
                  <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}
                <input
                  type="text"
                  required
                  placeholder="Nama"
                  value={form.nama}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nama: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/50 focus:bg-white/8 transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/50 focus:bg-white/8 transition-colors"
                />
                <textarea
                  required
                  placeholder="Pesan"
                  rows={3}
                  value={form.pesan}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pesan: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/50 focus:bg-white/8 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            )}
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
