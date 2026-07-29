"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import infra from "@/public/services/service-infra.jpg";
import ict from "@/public/services/service-ict.jpg";
import it from "@/public/services/service-it.jpg";
import iot from "@/public/services/service-iot.jpg";
import Image from "next/image";

const categories = [
  "All",
  "Company",
  "Technology",
  "Partnership",
  "Insights",
  "Events",
];

const featured = {
  category: "Company",
  date: "May 12, 2026",
  read: "8 min read",
  title: "Tidex Unveils Next-Generation IoT Backbone for Indonesian Enterprise",
  excerpt:
    "A new modular infrastructure platform engineered to bridge legacy ICT environments with real-time, sensor-rich operations across logistics, manufacturing, and smart facilities.",
  image: iot,
};

const secondary = [
  {
    category: "Technology",
    date: "May 03, 2026",
    title: "Inside the Architecture Powering Tidex Edge Networks",
    image: infra,
  },
  {
    category: "Partnership",
    date: "Apr 24, 2026",
    title: "Strategic Alliance Expands ICT Reach Across Southeast Asia",
    image: ict,
  },
];

const articles = [
  {
    category: "Insights",
    date: "Apr 18, 2026",
    read: "6 min",
    title: "Why Sovereign Cloud Is Quietly Reshaping Indonesia's IT Map",
    excerpt:
      "Inside the shift from generic hyperscale to nationally-grounded compute fabrics.",
    image: it,
  },
  {
    category: "Events",
    date: "Apr 09, 2026",
    read: "4 min",
    title: "Tidex Hosts Annual Titan Forum 2026 in Jakarta",
    excerpt:
      "Three days of engineering deep-dives, partner showcases, and product previews.",
    image: iot,
  },
  {
    category: "Technology",
    date: "Mar 28, 2026",
    read: "7 min",
    title: "Designing Resilient Networks for High-Density Operations",
    excerpt:
      "Lessons from deploying mission-critical infrastructure in extreme environments.",
    image: infra,
  },
  {
    category: "Company",
    date: "Mar 14, 2026",
    read: "5 min",
    title: "Tidex Earns ISO 27001 Recertification for Information Security",
    excerpt:
      "Reaffirming our commitment to enterprise-grade trust and operational rigor.",
    image: ict,
  },
];

const briefs = [
  { date: "May 09", title: "Tidex named in regional Top 50 ICT enablers list" },
  {
    date: "Apr 30",
    title: "New R&D lab opens in Bandung focused on industrial IoT",
  },
  {
    date: "Apr 15",
    title: "Tidex joins national digital infrastructure consortium",
  },
  {
    date: "Apr 02",
    title: "Q1 2026: record growth in managed network deployments",
  },
];

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center text-[10px] tracking-[0.25em] uppercase text-primary/90 border border-primary/30 rounded-full px-3 py-1 bg-primary/5 backdrop-blur">
    {children}
  </span>
);

const News = () => (
  <div className="bg-black min-h-screen overflow-x-hidden">
    {/* HERO */}
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-display text-xs tracking-[0.4em] uppercase">
            Newsroom
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mt-4 max-w-5xl">
            Signals from <span className="glow-text">inside</span> Tidex.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            Announcements, engineering notes, and field reports from across our
            IT, ICT, and IoT operations.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="mt-12 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`shrink-0 text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all ${
                i === 0
                  ? "bg-foreground text-background border-foreground"
                  : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURED + SECONDARY */}
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 pb-20">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Featured */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40"
        >
          <div className="relative h-[460px] md:h-[560px] overflow-hidden">
            <Image
              src={featured.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div className="absolute top-5 right-5">
              <div className="w-11 h-11 rounded-full bg-background/60 backdrop-blur border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <Tag>{featured.category}</Tag>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {featured.date}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {featured.read}
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight max-w-3xl">
                {featured.title}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl text-sm md:text-base leading-relaxed">
                {featured.excerpt}
              </p>
            </div>
          </div>
        </motion.article>

        {/* Secondary stack */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {secondary.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex-1 min-h-55 overflow-hidden rounded-2xl border border-border/60 bg-card/40"
            >
              <Image
                src={s.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Tag>{s.category}</Tag>
                  <span className="text-xs text-muted-foreground">
                    {s.date}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* EDITORIAL GRID + BRIEFS */}
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 pb-24">
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Articles */}
        <div className="lg:col-span-8">
          <div className="flex items-end justify-between mb-10 border-b border-border/60 pb-5">
            <div>
              <span className="text-primary font-display text-xs tracking-[0.3em] uppercase">
                Latest
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1">
                Editorial & insights
              </h3>
            </div>
            <a
              href="#"
              className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              View all {">"}
            </a>
          </div>

          <div className="space-y-8">
            {articles.map((a, i) => (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group grid md:grid-cols-12 gap-6 items-center pb-8 border-b border-border/40 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="md:col-span-5">
                  <div className="relative overflow-hidden rounded-xl border border-border/60 aspect-[4/3]">
                    <Image
                      src={a.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <Tag>{a.category}</Tag>
                    <span className="text-xs text-muted-foreground">
                      {a.date}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      · {a.read}
                    </span>
                  </div>
                  <h4 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {a.title}
                  </h4>
                  <p className="text-muted-foreground mt-3 text-sm md:text-base leading-relaxed">
                    {a.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-foreground/80 group-hover:text-primary transition-colors">
                    Read story <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 self-start">
          <div className="glass-card p-6">
            <span className="text-primary font-display text-xs tracking-[0.3em] uppercase">
              In Brief
            </span>
            <h4 className="font-display text-xl font-bold text-foreground mt-1 mb-5">
              Quick updates
            </h4>
            <ul className="space-y-5">
              {briefs.map((b) => (
                <li
                  key={b.title}
                  className="group flex gap-4 pb-5 border-b border-border/40 last:border-0 last:pb-0"
                >
                  <div className="font-display text-xs text-primary tracking-widest pt-0.5 w-12 shrink-0">
                    {b.date}
                  </div>
                  <p className="text-sm text-foreground/90 leading-snug group-hover:text-primary transition-colors cursor-pointer">
                    {b.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primary/30 p-7 bg-gradient-to-br from-primary/10 via-card/50 to-accent/10">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />
            <div className="relative">
              <span className="text-primary font-display text-xs tracking-[0.3em] uppercase">
                Subscribe
              </span>
              <h4 className="font-display text-2xl font-bold text-foreground mt-2 leading-tight">
                Get Tidex signals in your inbox.
              </h4>
              <p className="text-muted-foreground text-sm mt-2">
                A monthly digest. No noise.
              </p>
              <form
                className="mt-5 flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 bg-background/60 border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button className="bg-foreground text-background rounded-full px-4 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
);

export default News;
