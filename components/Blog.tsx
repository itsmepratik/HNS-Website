import React, { useState, useRef } from "react";
import { Section } from "./ui/Section";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/Button";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Tag,
  ChevronRight,
  User,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Synthetic vs Conventional: The Molecular Difference",
    excerpt:
      "Why modern engines require molecular uniformity that nature simply cannot provide. A deep dive into PAO vs Mineral base stocks.",
    category: "Tech",
    author: "Mohammed Rifat",
    date: "Oct 12, 2023",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Why Your Check Engine Light Is Actually a Good Thing",
    excerpt:
      "That annoying orange light is your car trying to save you thousands. Here is how to interpret its distress signals.",
    category: "Maintenance",
    author: "Head Technician",
    date: "Oct 08, 2023",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "The Future of EV Maintenance in Oman",
    excerpt:
      "Electric vehicles have fewer moving parts, but their maintenance needs are more critical than ever. What you need to know about EV fluids.",
    category: "Industry",
    author: "Mohammed Ashiq",
    date: "Sep 25, 2023",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "5 Signs Your Transmission Fluid Needs Attention",
    excerpt:
      "Slipping gears? Delayed engagement? Don’t wait for a rebuild. Learn the early warning signs of transmission fluid breakdown.",
    category: "Tips",
    author: "Service Team",
    date: "Sep 15, 2023",
    readTime: "3 min",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Desert Driving: Protecting Your Air Intake",
    excerpt:
      "Oman's fine dust is an engine killer. How high-performance filtration can extend your engine life by years.",
    category: "Maintenance",
    author: "Mohammed Rifat",
    date: "Aug 30, 2023",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Understanding Viscosity Grades: 5W-30 vs 10W-40",
    excerpt:
      "What do the numbers actually mean? We demystify the SAE grading system and help you choose the right flow for your climate.",
    category: "Tech",
    author: "HNS Labs",
    date: "Aug 12, 2023",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1533230408800-47867198d89e?q=80&w=800&auto=format&fit=crop",
  },
];

export const Blog: React.FC = () => {
  const { t, dir } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Tech", "Maintenance", "Industry", "Tips"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".blog-header", { y: 30, opacity: 0, duration: 0.8 })
        .from(".blog-featured", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".blog-controls", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          ".blog-card",
          { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-24 pb-12 bg-[#050505] relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-brand-950/20 to-[#050505] z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"></div>

      <Section className="relative z-10">
        {/* Header */}
        <div className="blog-header text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-500 text-[0.9375rem] font-display uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            HNS Engineering Log
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {t("blog.title")}
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === "All" && !searchQuery && (
          <div className="blog-featured mb-20">
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-brand-500/30 transition-all duration-500">
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-7 relative h-[400px] md:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-brand-500/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 md:hidden pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 bg-brand-500 text-black text-[0.9375rem] font-bold uppercase rounded-full">
                        {t("blog.featured")}
                      </span>
                      <span className="text-neutral-400 text-[0.9375rem] flex items-center gap-2">
                        <Clock size={14} /> {featuredPost.readTime}{" "}
                        {t("blog.read_time")}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-brand-500 transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-neutral-400 mb-8 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white border border-white/10">
                          <User size={16} />
                        </div>
                        <div className="text-[0.9375rem]">
                          <p className="text-white font-bold">
                            {featuredPost.author}
                          </p>
                          <p className="text-neutral-500">
                            {featuredPost.date}
                          </p>
                        </div>
                      </div>

                      <Button className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                        <ArrowRight
                          size={20}
                          className={dir === "rtl" ? "rotate-180" : ""}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="blog-controls flex flex-col md:flex-row justify-between items-center gap-6 mb-12 sticky top-24 z-20 bg-[#050505]/80 backdrop-blur-xl p-4 rounded-2xl border border-white/5">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[0.9375rem] font-medium transition-all ${activeCategory === cat ? "bg-white text-black" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
              >
                {t(`blog.categories.${cat.toLowerCase()}`) || cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4 rtl:left-auto rtl:right-3" />
            <input
              type="text"
              placeholder={t("blog.search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[0.9375rem] text-white focus:outline-none focus:border-brand-500/50 transition-colors rtl:pl-4 rtl:pr-10"
            />
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <div
              key={post.id}
              className="blog-card group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-brand-500/30 hover:shadow-[0_0_30px_-10px_rgba(213,243,101,0.15)] transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[0.9375rem] font-bold uppercase rounded tracking-wider flex items-center gap-1.5">
                    <Tag size={10} className="text-brand-500" /> {post.category}
                  </span>
                </div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[0.9375rem] text-neutral-500 mb-4 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span className="w-1 h-1 bg-neutral-700 rounded-full"></span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-brand-500 transition-colors">
                  {post.title}
                </h3>

                <p className="text-neutral-400 text-[0.9375rem] leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-[0.9375rem] font-bold text-neutral-500 uppercase tracking-widest">
                    {post.author}
                  </span>
                  <button className="text-brand-500 text-[0.9375rem] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">
                    {t("blog.read_more")}{" "}
                    <ChevronRight
                      size={16}
                      className={dir === "rtl" ? "rotate-180" : ""}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {regularPosts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <p className="text-neutral-500 text-lg">
              No articles found matching your criteria.
            </p>
            <Button
              variant="tertiary"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Section>
    </div>
  );
};
