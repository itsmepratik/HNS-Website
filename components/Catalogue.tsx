import React, { useState } from 'react';
import { Section } from './ui/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { Filter, Star, Search, Sliders, ChevronRight } from 'lucide-react';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Castrol EDGE 5W-30', brand: 'Castrol', price: 12.500, category: 'Oil', viscosity: '5W-30', image: 'https://images.unsplash.com/photo-1632832569501-7132a49257d0?q=80&w=400&auto=format&fit=crop', rating: 4.8, reviews: 124 },
  { id: '2', name: 'Mobil 1 Extended Performance', brand: 'Mobil 1', price: 14.200, category: 'Oil', viscosity: '0W-20', image: 'https://images.unsplash.com/photo-1626126605232-1b072834b6e5?q=80&w=400&auto=format&fit=crop', rating: 4.9, reviews: 89 },
  { id: '3', name: 'Shell Helix Ultra', brand: 'Shell', price: 11.000, category: 'Oil', viscosity: '5W-40', image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=400&auto=format&fit=crop', rating: 4.7, reviews: 210 },
  { id: '4', name: 'Bosch Premium Oil Filter', brand: 'Bosch', price: 3.500, category: 'Filter', image: 'https://m.media-amazon.com/images/I/71p0eK7+XRL._AC_SL1500_.jpg', rating: 4.6, reviews: 56 },
  { id: '5', name: 'K&N Performance Air Filter', brand: 'K&N', price: 18.500, category: 'Filter', image: 'https://m.media-amazon.com/images/I/71uKcdX-dVL._AC_SL1500_.jpg', rating: 4.9, reviews: 42 },
  { id: '6', name: 'Liqui Moly Ceratec', brand: 'Liqui Moly', price: 9.800, category: 'Additive', image: 'https://m.media-amazon.com/images/I/61kRk-Q9-dL._AC_SL1000_.jpg', rating: 4.9, reviews: 315 },
  { id: '7', name: 'Valvoline Advanced', brand: 'Valvoline', price: 10.200, category: 'Oil', viscosity: '5W-20', image: 'https://images.unsplash.com/photo-1550966871-3ed3c67e6790?q=80&w=400&auto=format&fit=crop', rating: 4.5, reviews: 78 },
  { id: '8', name: 'Royal Purple HPS', brand: 'Royal Purple', price: 15.000, category: 'Oil', viscosity: '10W-40', image: 'https://images.unsplash.com/photo-1606517723933-2866b1d440da?q=80&w=400&auto=format&fit=crop', rating: 4.8, reviews: 65 },
];

export const Catalogue: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeViscosity, setActiveViscosity] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(30);

  const categories = ['All', 'Oil', 'Filter', 'Additive'];
  const viscosities = ['All', '0W-20', '5W-20', '5W-30', '5W-40', '10W-40'];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const catMatch = activeCategory === 'All' || product.category === activeCategory;
    const viscMatch = activeViscosity === 'All' || !product.viscosity || product.viscosity === activeViscosity;
    const priceMatch = product.price <= priceRange;
    return catMatch && viscMatch && priceMatch;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#050505] relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-neutral-900/50 to-transparent pointer-events-none" />
      
      <Section className="mb-8 relative z-10">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div>
               <div className="flex items-center gap-2 mb-2">
                 <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                 <p className="text-xs font-mono text-brand-500 uppercase tracking-widest">Live Inventory</p>
               </div>
               <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{t('catalogue.title')}</h1>
               <p className="text-neutral-400 max-w-xl">{t('catalogue.subtitle')}</p>
            </div>
            <div className="flex gap-3">
               <div className="relative group">
                  <Search className="absolute left-3 top-3 text-neutral-500 w-4 h-4 rtl:left-auto rtl:right-3 group-focus-within:text-brand-500 transition-colors" />
                  <input type="text" placeholder="Search Part ID or Name..." className="bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white w-full md:w-80 focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 outline-none transition-all placeholder:text-neutral-600 rtl:pl-4 rtl:pr-10 backdrop-blur-sm" />
               </div>
            </div>
         </div>
      </Section>

      <div className="container mx-auto px-4 grid lg:grid-cols-4 gap-8 relative z-10">
        
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-1 rounded-xl bg-neutral-900/50 backdrop-blur-xl border-white/5">
             <div className="p-5 border-b border-white/5 flex items-center gap-2">
               <Filter size={14} className="text-brand-500" />
               <h3 className="font-bold uppercase tracking-widest text-xs text-white">{t('catalogue.filters')}</h3>
             </div>

             <div className="p-5 space-y-8">
               {/* Categories */}
               <div>
                 <h4 className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider mb-4">{t('catalogue.category')}</h4>
                 <div className="space-y-1">
                   {categories.map(cat => (
                     <label key={cat} className={`flex items-center justify-between p-2 rounded-lg text-sm cursor-pointer transition-all ${activeCategory === cat ? 'bg-white/10 text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}>
                       <span>{cat}</span>
                       <input type="radio" name="category" className="hidden" onChange={() => setActiveCategory(cat)} />
                       {activeCategory === cat && <ChevronRight size={14} className="text-brand-500" />}
                     </label>
                   ))}
                 </div>
               </div>

               {/* Viscosity */}
               <div>
                 <h4 className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider mb-4">{t('catalogue.viscosity')}</h4>
                 <div className="grid grid-cols-2 gap-2">
                   {viscosities.map(visc => (
                     <button
                       key={visc}
                       onClick={() => setActiveViscosity(visc)}
                       className={`px-2 py-1.5 text-xs font-mono rounded border transition-all ${activeViscosity === visc ? 'bg-brand-500 text-black border-brand-500 font-bold' : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200'}`}
                     >
                       {visc}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Price Range */}
               <div>
                 <div className="flex justify-between text-xs mb-4">
                    <h4 className="text-neutral-500 font-mono uppercase tracking-wider">{t('catalogue.price_range')}</h4>
                    <span className="text-brand-500 font-mono font-bold">{priceRange.toFixed(3)} OMR</span>
                 </div>
                 <input 
                   type="range" 
                   min="0" 
                   max="30" 
                   step="0.5"
                   value={priceRange} 
                   onChange={(e) => setPriceRange(Number(e.target.value))}
                   className="w-full accent-brand-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer" 
                 />
                 <div className="flex justify-between text-[10px] text-neutral-600 font-mono mt-2">
                    <span>0.000</span>
                    <span>30.000</span>
                 </div>
               </div>
             </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProducts.map(product => (
               <div key={product.id} className="group relative bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(213,243,101,0.05)] hover:-translate-y-1">
                  
                  {/* Image Area */}
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-neutral-950">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-3 right-3 backdrop-blur-md bg-black/60 border border-white/10 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                      {product.brand}
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-5 relative">
                    <div className="flex gap-2 mb-3">
                       <span className="px-2 py-0.5 rounded border border-white/10 text-[10px] text-neutral-400 font-mono uppercase tracking-wider bg-white/5">{product.category}</span>
                       {product.viscosity && (
                          <span className="px-2 py-0.5 rounded border border-brand-500/20 text-[10px] text-brand-400 font-mono uppercase tracking-wider bg-brand-500/5">{product.viscosity}</span>
                       )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-brand-500 transition-colors line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-6">
                      <div className="flex text-brand-500">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={10} className={i < Math.floor(product.rating) ? "fill-brand-500" : "fill-neutral-800 text-neutral-800"} />
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-500 ml-2 font-mono">{product.reviews} reviews</span>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-neutral-500 mb-0.5 uppercase tracking-wider">Unit Price</p>
                        <p className="text-2xl font-bold text-white font-mono tracking-tight">{product.price.toFixed(3)} <span className="text-sm text-brand-500">OMR</span></p>
                      </div>
                    </div>
                  </div>
               </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="h-96 flex flex-col items-center justify-center text-neutral-500 border border-dashed border-white/10 rounded-xl bg-neutral-900/20">
               <Sliders size={48} className="mb-6 opacity-30" />
               <p className="text-lg font-medium text-neutral-400">No products match your filters.</p>
               <button onClick={() => {setActiveCategory('All'); setActiveViscosity('All'); setPriceRange(30);}} className="mt-4 text-brand-500 hover:underline text-sm">Reset Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};