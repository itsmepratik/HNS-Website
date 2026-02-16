import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../../components/ui/Section';
import { useLanguage } from '../../contexts/LanguageContext';
import { Filter, Star, Search, Sliders, Heart, Zap, Eye, X, ArrowUpDown, ChevronDown, Loader2, Tag } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CustomDropdown } from '../../components/ui/CustomDropdown';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useProducts } from '../../hooks/useData';
import { Product } from '../../types';

export const CataloguePage: React.FC = () => {
  const { t } = useLanguage();
  const { data: products, loading } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeViscosity, setActiveViscosity] = useState<string>('All');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(30);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Search State with Debouncing
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const mobileFilterRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('turboLubeSavedProducts');
    if (saved) {
      try {
        setSavedProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved products", e);
      }
    }
    
    // Click outside handler for search suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  // Debounce Effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Update suggestions based on debounced query
  useEffect(() => {
    if (debouncedSearchQuery.length > 1 && products) {
      const matches = products.filter(p => 
        isMatch(p.name, debouncedSearchQuery) || 
        isMatch(p.brand, debouncedSearchQuery) || 
        isMatch(p.id, debouncedSearchQuery) ||
        isMatch(p.category, debouncedSearchQuery)
      ).slice(0, 5);
      setSearchSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedSearchQuery, products]);

  // Animation for mobile filter sidebar
  useGSAP(() => {
    if (isMobileFilterOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.to(mobileFilterRef.current, { x: '0%', duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none' });
      gsap.to(mobileFilterRef.current, { x: '-100%', duration: 0.3, ease: 'power3.in' });
    }
  }, [isMobileFilterOpen]);

  const toggleSaveProduct = (productId: string) => {
    setSavedProducts(prev => {
      let newSaved;
      if (prev.includes(productId)) {
        newSaved = prev.filter(id => id !== productId);
      } else {
        newSaved = [...prev, productId];
      }
      localStorage.setItem('turboLubeSavedProducts', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  // Improved Matching Logic (Fuzzy-ish)
  const isMatch = (text: string, query: string) => {
    if (!text || !query) return false;
    const t = text.toLowerCase();
    const q = query.toLowerCase();
    
    // Direct match
    if (t.includes(q)) return true;
    
    // Word splitting match (e.g. "Mobil 1" matches "mobil")
    const queryWords = q.split(' ');
    const textWords = t.split(' ');
    
    // Check if every query word appears in the text
    const allWordsMatch = queryWords.every(qw => textWords.some(tw => tw.includes(qw)));
    if (allWordsMatch) return true;

    // Simple fuzzy check for missed characters (allow 1 missed char for words > 4 length)
    // E.g. "cstrol" (missing a) matches "castrol"
    if (q.length > 3) {
      let matchCount = 0;
      let qIdx = 0;
      for (let i = 0; i < t.length && qIdx < q.length; i++) {
        if (t[i] === q[qIdx]) {
          matchCount++;
          qIdx++;
        }
      }
      // If we matched at least 80% of the characters in order
      if (matchCount / q.length > 0.8) return true;
    }

    return false;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    // Suggestions are now handled by the debounce effect
  };

  const selectSuggestion = (product: Product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
  };

  const categories = ['All', 'Oil', 'Filter', 'Additive'];
  const viscosities = ['All', '0W-20', '5W-20', '5W-30', '5W-40', '10W-40'];
  // Derive brands dynamically from products
  const brands = ['All', ...Array.from(new Set(products?.map(p => p.brand))).sort()];
  
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' }
  ];

  // Use debouncedSearchQuery for filtering instead of immediate searchQuery
  const filteredProducts = products?.filter(product => {
    const catMatch = activeCategory === 'All' || product.category === activeCategory;
    const viscMatch = activeViscosity === 'All' || !product.viscosity || product.viscosity === activeViscosity;
    const brandMatch = activeBrand === 'All' || product.brand === activeBrand;
    const priceMatch = product.price <= priceRange;
    const searchMatch = !debouncedSearchQuery || isMatch(product.name, debouncedSearchQuery) || isMatch(product.brand, debouncedSearchQuery);
    return catMatch && viscMatch && brandMatch && priceMatch && searchMatch;
  }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
           <Filter size={10} /> {t('catalogue.category')}
        </h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className={`group flex items-center justify-between p-3 rounded-lg text-sm cursor-pointer transition-all border ${activeCategory === cat ? 'bg-brand-500/10 border-brand-500/50 text-white' : 'bg-[#111] border-transparent text-neutral-400 hover:bg-white/5 hover:border-white/10'}`}>
              <span className={`font-medium transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${activeCategory === cat ? 'text-brand-500' : ''}`}>{cat}</span>
              <input type="radio" name="category" className="hidden" onChange={() => setActiveCategory(cat)} />
              {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(213,243,101,0.8)]"></div>}
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
           <Tag size={10} /> Brand
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
          {brands.map(brand => (
            <label key={brand} className={`group flex items-center justify-between p-2.5 rounded-lg text-xs cursor-pointer transition-all border ${activeBrand === brand ? 'bg-brand-500/10 border-brand-500/50 text-white' : 'bg-transparent border-transparent text-neutral-400 hover:bg-white/5 hover:text-white'}`}>
              <span className={`transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${activeBrand === brand ? 'text-brand-500' : ''}`}>{brand}</span>
              <input type="radio" name="brand" className="hidden" onChange={() => setActiveBrand(brand)} />
              {activeBrand === brand && <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>}
            </label>
          ))}
        </div>
      </div>

      {/* Viscosity */}
      <div>
        <h4 className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
           <Zap size={10} /> {t('catalogue.viscosity')}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {viscosities.map(visc => (
            <button
              key={visc}
              onClick={() => setActiveViscosity(visc)}
              className={`relative px-2 py-2 text-xs font-mono rounded-lg border transition-all overflow-hidden ${activeViscosity === visc ? 'bg-brand-500 text-black border-brand-500 font-bold shadow-[0_0_15px_rgba(213,243,101,0.3)]' : 'bg-[#111] text-neutral-400 border-white/5 hover:border-white/20 hover:text-white'}`}
            >
              {activeViscosity === visc && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
              <span className="relative z-10">{visc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between text-xs mb-4 items-end">
           <h4 className="text-neutral-500 font-mono uppercase tracking-wider">{t('catalogue.price_range')}</h4>
           <span className="text-brand-500 font-mono font-bold text-base">{priceRange.toFixed(3)} <span className="text-[10px]">OMR</span></span>
        </div>
        <div className="relative h-2 bg-[#111] rounded-full overflow-hidden">
           <div className="absolute top-0 left-0 h-full bg-brand-500" style={{ width: `${(priceRange / 30) * 100}%` }}></div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="30" 
          step="0.5"
          value={priceRange} 
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full absolute -mt-2 opacity-0 cursor-pointer h-4" 
        />
        <div className="flex justify-between text-[10px] text-neutral-600 font-mono mt-3">
           <span>0.000</span>
           <span>30.000</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#030303] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(213,243,101,0.05),transparent_40%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03),transparent_40%)] pointer-events-none"></div>

      {/* Mobile Sidebar Overlay */}
      <div ref={overlayRef} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] hidden" onClick={() => setIsMobileFilterOpen(false)}></div>
      
      {/* Mobile Sidebar */}
      <div ref={mobileFilterRef} className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#0a0a0a] z-[70] border-r border-white/10 shadow-2xl transform -translate-x-full overflow-y-auto">
         <div className="p-5 flex justify-between items-center border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
            <h3 className="font-bold uppercase tracking-widest text-sm text-white flex items-center gap-2">
               <Sliders size={16} className="text-brand-500" /> Filters
            </h3>
            <button onClick={() => setIsMobileFilterOpen(false)} className="text-neutral-400 hover:text-white">
               <X size={24} />
            </button>
         </div>
         <div className="p-6">
            <FilterContent />
            <div className="mt-8 pt-6 border-t border-white/5">
               <Button fullWidth onClick={() => setIsMobileFilterOpen(false)}>View {filteredProducts.length} Items</Button>
            </div>
         </div>
      </div>

      {/* Updated Z-Index from z-10 to z-30 to ensure search suggestions appear above grid */}
      <Section className="mb-16 relative z-30" noPadding>
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5 mb-8">
            <div>
               <div className="flex items-center gap-2 mb-3">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                 </span>
                 <p className="text-[10px] font-mono text-brand-500 uppercase tracking-[0.2em] font-bold">Live Inventory System</p>
               </div>
               <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tighter uppercase">{t('catalogue.title')}</h1>
               <p className="text-neutral-400 max-w-xl text-lg font-light leading-relaxed">{t('catalogue.subtitle')}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-20">
               {/* Enhanced Search Bar */}
               <div ref={searchRef} className="relative group w-full md:w-80">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500/20 to-white/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                  <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden group-focus-within:border-brand-500/50 transition-colors">
                     <Search className="ml-4 text-neutral-500 w-4 h-4 rtl:ml-0 rtl:mr-4 group-focus-within:text-brand-500 transition-colors" />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => { if(debouncedSearchQuery.length > 1) setShowSuggestions(true); }}
                        placeholder="Search Part ID or Name..." 
                        className="w-full bg-transparent border-none px-4 py-3 text-sm text-white focus:ring-0 placeholder:text-neutral-600 font-mono" 
                     />
                     {searchQuery && (
                       <button onClick={() => { setSearchQuery(''); setSearchSuggestions([]); }} className="mr-3 text-neutral-500 hover:text-white">
                         <X size={14} />
                       </button>
                     )}
                  </div>

                  {/* Auto-suggestions Dropdown - SOLID STYLE with High Z-Index */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                     <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                        <div className="p-2">
                           <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider px-3 py-2">Suggestions</p>
                           {searchSuggestions.map(product => (
                              <button 
                                 key={product.id}
                                 onClick={() => selectSuggestion(product)}
                                 className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg text-left transition-colors group"
                              >
                                 <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover opacity-70 group-hover:opacity-100" />
                                 <div className="min-w-0">
                                    <p className="text-sm text-white font-medium truncate group-hover:text-brand-500 transition-colors">{product.name}</p>
                                    <p className="text-[10px] text-neutral-500 uppercase">{product.category}</p>
                                 </div>
                              </button>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
         
         {/* Mobile Toolbar */}
         <div className="lg:hidden flex gap-4 mb-6 z-10 relative">
            <Button variant="secondary" className="flex-1" onClick={() => setIsMobileFilterOpen(true)}>
               <Sliders size={16} className="mr-2" /> Filters
            </Button>
            <div className="relative flex-1">
               <CustomDropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by"
               />
            </div>
         </div>
      </Section>

      <div className="container mx-auto px-4 grid lg:grid-cols-4 gap-8 relative z-10">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 space-y-6">
             <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                 <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Sliders size={16} className="text-brand-500" />
                      <h3 className="font-bold uppercase tracking-widest text-xs text-white">Refine Spec</h3>
                   </div>
                   <span className="text-[10px] font-mono text-neutral-500">{filteredProducts.length} ITEMS</span>
                 </div>

                 <div className="p-6">
                    <FilterContent />
                 </div>
             </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {/* Desktop Sort Bar */}
          <div className="hidden lg:flex justify-between items-center mb-6 z-20 relative">
             <p className="text-sm text-neutral-500 font-mono">
               Showing {sortedProducts.length} results
             </p>
             <div className="flex items-center gap-3">
               <span className="text-sm text-neutral-400">Sort by:</span>
               <div className="w-48">
                  <CustomDropdown 
                     options={sortOptions}
                     value={sortBy}
                     onChange={setSortBy}
                     placeholder="Sort by"
                     className="z-50"
                  />
               </div>
             </div>
          </div>

          {loading ? (
             <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin text-brand-500 w-12 h-12" />
             </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
            {sortedProducts.map(product => {
               const isSaved = savedProducts.includes(product.id);
               const isHovered = hoveredProduct === product.id;
               
               return (
               <div 
                  key={product.id} 
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-brand-500/30 shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(213,243,101,0.1)] flex flex-col"
               >
                  {/* Hover Glow Border */}
                  <div className="absolute inset-0 border-2 border-brand-500/0 group-hover:border-brand-500/20 rounded-2xl transition-all duration-500 pointer-events-none"></div>

                  {/* Image Area */}
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#050505]">
                    {/* Tech Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="backdrop-blur-md bg-black/70 border border-white/10 px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                        {product.brand}
                      </span>
                    </div>

                    {/* Quick Actions Overlay */}
                    <div className={`absolute bottom-4 left-0 right-0 px-4 flex justify-between items-center transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 lg:flex hidden'} ${isHovered ? '' : 'lg:hidden flex translate-y-0 opacity-100'}`}>
                       <Button size="sm" className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md w-full mr-2">
                          <Eye size={14} className="mr-2" /> Quick View
                       </Button>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           toggleSaveProduct(product.id);
                         }}
                         className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/60 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white active:scale-95 shrink-0"
                       >
                         <Heart size={16} className={`transition-colors ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                       </button>
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow relative z-10">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex gap-2">
                          {product.category === 'Oil' && <span className="text-[10px] font-mono text-brand-500 bg-brand-500/10 px-1.5 py-0.5 rounded border border-brand-500/20">SYNTHETIC</span>}
                          {product.viscosity && (
                             <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{product.viscosity}</span>
                          )}
                       </div>
                       <div className="flex items-center gap-1">
                          <Star size={12} className="fill-brand-500 text-brand-500" />
                          <span className="text-xs font-bold text-white">{product.rating}</span>
                       </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-brand-500 transition-colors line-clamp-2">{product.name}</h3>
                    
                    <div className="mt-auto pt-6 flex items-end justify-between border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-neutral-500 mb-1 uppercase tracking-wider font-mono">Price</p>
                        <p className="text-2xl font-black text-white tracking-tight flex items-baseline gap-1">
                           {product.price.toFixed(3)} <span className="text-sm font-medium text-neutral-500">OMR</span>
                        </p>
                      </div>
                    </div>
                  </div>
               </div>
            );
          })}
          </div>
          )}
          
          {!loading && sortedProducts.length === 0 && (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-neutral-500 border border-dashed border-white/10 rounded-2xl bg-[#0a0a0a]">
               <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
                  <Sliders size={32} className="opacity-50" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">No Matches Found</h3>
               <p className="text-sm text-neutral-400 max-w-xs text-center mb-6">Adjust your filters to find what you're looking for in our inventory.</p>
               <Button variant="outline" onClick={() => {setActiveCategory('All'); setActiveViscosity('All'); setActiveBrand('All'); setPriceRange(30); setSearchQuery('');}}>
                  Reset All Filters
               </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};