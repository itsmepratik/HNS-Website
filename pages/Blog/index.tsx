import React, { useState, useRef } from 'react';
import { Section } from '../../components/ui/Section';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../../components/ui/Button';
import { Search, Clock, Calendar, ArrowRight, Tag, ChevronRight, User, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useBlogPosts } from '../../hooks/useData';

export const BlogPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const { data: posts, loading } = useBlogPosts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Ensure category names match mock data exactly
  const categories = ['All', 'Tech', 'Maintenance', 'Industry', 'Tips'];

  const filteredPosts = posts?.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const featuredPost = posts?.find(p => p.featured);
  
  // Layout Stability Fix: Always show featured hero to prevent layout jumping
  const showFeaturedHero = !!featuredPost;
  
  const displayPosts = filteredPosts.filter(p => {
    // If the post is currently displayed in the hero section, exclude it from grid
    if (showFeaturedHero && p.id === featuredPost?.id) return false;
    return true;
  });

  // Initial Load Animation
  useGSAP(() => {
    if (!loading && posts && posts.length > 0) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.from(".blog-header", { y: 30, opacity: 0, duration: 0.8 })
        .from(".blog-featured", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".blog-controls", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
        
      tl.from(".blog-card", { 
        y: 30, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.1,
        clearProps: "all"
      }, "-=0.4");
    }
  }, { scope: containerRef, dependencies: [loading] });

  // Filter Transition Animation
  useGSAP(() => {
    if (!loading && gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" }
      );
    }
  }, { dependencies: [activeCategory, searchQuery, loading] });

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-[#050505] flex items-center justify-center">
         <Loader2 className="animate-spin w-12 h-12 text-brand-500" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-12 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-brand-950/20 to-[#050505] z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"></div>

      <Section className="relative z-10">
        
        {/* Header */}
        <div className="blog-header text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-500 text-xs font-mono uppercase tracking-widest mb-6">
             <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
             HNS Engineering Log
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">{t('blog.title')}</h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">{t('blog.subtitle')}</p>
        </div>

        {/* Featured Post - Always Visible for Stability */}
        {featuredPost && showFeaturedHero && (
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
                           <span className="px-3 py-1 bg-brand-500 text-black text-xs font-bold uppercase rounded-full">{t('blog.featured')}</span>
                           <span className="text-neutral-400 text-sm flex items-center gap-2">
                             <Clock size={14} /> {featuredPost.readTime} {t('blog.read_time')}
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
                              <div className="text-sm">
                                 <p className="text-white font-bold">{featuredPost.author}</p>
                                 <p className="text-neutral-500">{featuredPost.date}</p>
                              </div>
                           </div>
                           
                           <Button className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                              <ArrowRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                           </Button>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Controls - Sticky */}
        <div className="blog-controls flex flex-col md:flex-row justify-between items-center gap-6 mb-12 sticky top-24 z-30 bg-[#050505]/95 backdrop-blur-xl p-4 rounded-2xl border border-white/5 shadow-2xl">
           <div className="flex flex-wrap justify-center gap-2">
              {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
                 >
                    {t(`blog.categories.${cat.toLowerCase()}`) || cat}
                 </button>
              ))}
           </div>
           
           <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4 rtl:left-auto rtl:right-3" />
              <input 
                 type="text" 
                 placeholder={t('blog.search_placeholder')}
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-[#111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500/50 transition-colors rtl:pl-4 rtl:pr-10"
              />
           </div>
        </div>

        {/* Post Grid with Increased Min-Height to Fix Footer Jump and overflow-anchor:none */}
        <div 
           ref={gridRef} 
           className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[120vh] content-start"
           style={{ overflowAnchor: 'none' }} 
        >
           {displayPosts.map(post => (
              <div key={post.id} className="blog-card group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-brand-500/30 hover:shadow-[0_0_30px_-10px_rgba(213,243,101,0.15)] transition-all duration-300">
                 <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute top-4 left-4 z-10">
                       <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase rounded tracking-wider flex items-center gap-1.5">
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
                    <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4 font-mono">
                       <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                       <span className="w-1 h-1 bg-neutral-700 rounded-full"></span>
                       <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-brand-500 transition-colors">
                       {post.title}
                    </h3>
                    
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                       {post.excerpt}
                    </p>
                    
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                       <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{post.author}</span>
                       <button className="text-brand-500 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">
                          {t('blog.read_more')} <ChevronRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
                       </button>
                    </div>
                 </div>
              </div>
           ))}
        </div>
        
        {displayPosts.length === 0 && (
           <div className="absolute top-[400px] left-0 right-0 text-center py-20 border border-dashed border-white/10 rounded-2xl max-w-2xl mx-auto">
              <p className="text-neutral-500 text-lg">No articles found matching your criteria.</p>
              <Button variant="tertiary" onClick={() => {setActiveCategory('All'); setSearchQuery('');}} className="mt-4">
                 Clear Filters
              </Button>
           </div>
        )}

      </Section>
    </div>
  );
};