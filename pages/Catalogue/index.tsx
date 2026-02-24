import React, { useState, useEffect, useRef } from "react";
import { Section } from "../../components/ui/Section";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Filter,
  Star,
  Search,
  Sliders,
  Heart,
  Zap,
  Eye,
  X,
  ArrowUpDown,
  ChevronDown,
  Loader2,
  Tag,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useProducts, useCategories } from "../../hooks/useData";
import { Product } from "../../types";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400";

export const CataloguePage: React.FC = () => {
  const { t } = useLanguage();
  const { data: products, loading } = useProducts();
  const { data: dbCategories } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string>("Lubricants");
  const [activeViscosity, setActiveViscosity] = useState<string>("All");
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(100);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Search State with Debouncing
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const mobileFilterRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("turboLubeSavedProducts");
    if (saved) {
      try {
        setSavedProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved products", e);
      }
    }

    // Click outside handler for search suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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
      const matches = products
        .filter(
          (p) =>
            isMatch(p.name, debouncedSearchQuery) ||
            isMatch(p.brand, debouncedSearchQuery) ||
            isMatch(p.id, debouncedSearchQuery) ||
            isMatch(p.category, debouncedSearchQuery),
        )
        .slice(0, 5);
      setSearchSuggestions(matches);
      setShowSuggestions(true);
      setShowSuggestions(false);
    }
  }, [debouncedSearchQuery, products]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  }, [currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeCategory,
    activeViscosity,
    activeBrand,
    priceRange,
    debouncedSearchQuery,
    sortBy,
  ]);

  // Animation for mobile filter sidebar
  useGSAP(() => {
    if (isMobileFilterOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        display: "block",
      });
      gsap.to(mobileFilterRef.current, {
        x: "0%",
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        display: "none",
      });
      gsap.to(mobileFilterRef.current, {
        x: "-100%",
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isMobileFilterOpen]);

  const toggleSaveProduct = (productId: string) => {
    setSavedProducts((prev) => {
      let newSaved;
      if (prev.includes(productId)) {
        newSaved = prev.filter((id) => id !== productId);
      } else {
        newSaved = [...prev, productId];
      }
      localStorage.setItem("turboLubeSavedProducts", JSON.stringify(newSaved));
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
    const queryWords = q.split(" ");
    const textWords = t.split(" ");

    // Check if every query word appears in the text
    const allWordsMatch = queryWords.every((qw) =>
      textWords.some((tw) => tw.includes(qw)),
    );
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

  const categories = ["All", ...dbCategories];
  const viscosities = [
    "All",
    "0W-20",
    "5W-20",
    "5W-30",
    "5W-40",
    "10W-40",
    "20W-50",
  ];
  // Derive brands dynamically from products
  const brands = [
    "All",
    ...Array.from(new Set(products?.map((p) => p.brand))).sort(),
  ];

  const sortOptions = [
    { value: "featured", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
  ];

  // Use debouncedSearchQuery for filtering instead of immediate searchQuery
  const filteredProducts =
    products?.filter((product) => {
      const catMatch =
        activeCategory === "All" || product.category === activeCategory;
      const viscMatch =
        activeViscosity === "All" ||
        product.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(activeViscosity.toLowerCase().replace(/\s+/g, ""));
      const brandMatch = activeBrand === "All" || product.brand === activeBrand;
      const priceMatch = product.price <= priceRange;
      const searchMatch =
        !debouncedSearchQuery ||
        isMatch(product.name, debouncedSearchQuery) ||
        isMatch(product.brand, debouncedSearchQuery);
      return catMatch && viscMatch && brandMatch && priceMatch && searchMatch;
    }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getPageNumbers = () => {
    const pages = [];
    const showRange = 1; // Number of pages to show around current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always first
        i === totalPages || // Always last
        (i >= currentPage - showRange && i <= currentPage + showRange) // Around current
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - showRange - 1 && i > 1) ||
        (i === currentPage + showRange + 1 && i < totalPages)
      ) {
        pages.push("...");
      }
    }
    return pages.filter((v, i, a) => v !== "..." || a[i - 1] !== "...");
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="text-neutral-500 text-[0.9375rem] font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
          <Filter size={10} /> {t("catalogue.category")}
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className={`group flex items-center justify-between p-3 rounded-lg text-[0.9375rem] cursor-pointer transition-all border ${activeCategory === cat ? "bg-brand-500/10 border-brand-500/50 text-white" : "bg-[#111] border-transparent text-neutral-400 hover:bg-white/5 hover:border-white/10"}`}
            >
              <span
                className={`font-medium transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${activeCategory === cat ? "text-brand-500" : ""}`}
              >
                {cat}
              </span>
              <input
                type="radio"
                name="category"
                className="hidden"
                onChange={() => setActiveCategory(cat)}
              />
              {activeCategory === cat && (
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(213,243,101,0.8)]"></div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="text-neutral-500 text-[0.9375rem] font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
          <Tag size={10} /> Brand
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className={`group flex items-center justify-between p-2.5 rounded-lg text-[0.9375rem] cursor-pointer transition-all border ${activeBrand === brand ? "bg-brand-500/10 border-brand-500/50 text-white" : "bg-transparent border-transparent text-neutral-400 hover:bg-white/5 hover:text-white"}`}
            >
              <span
                className={`transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${activeBrand === brand ? "text-brand-500" : ""}`}
              >
                {brand}
              </span>
              <input
                type="radio"
                name="brand"
                className="hidden"
                onChange={() => setActiveBrand(brand)}
              />
              {activeBrand === brand && (
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Viscosity */}
      <div>
        <h4 className="text-neutral-500 text-[0.9375rem] font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
          <Zap size={10} /> {t("catalogue.viscosity")}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {viscosities.map((visc) => (
            <button
              key={visc}
              onClick={() => {
                setActiveViscosity(visc);
                if (visc !== "All") setActiveCategory("Lubricants");
              }}
              className={`relative px-2 py-2 text-[0.9375rem] font-mono rounded-lg border transition-all overflow-hidden ${activeViscosity === visc ? "bg-brand-500 text-black border-brand-500 font-bold shadow-[0_0_15px_rgba(213,243,101,0.3)]" : "bg-[#111] text-neutral-400 border-white/5 hover:border-white/20 hover:text-white"}`}
            >
              {activeViscosity === visc && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              )}
              <span className="relative z-10">{visc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between text-[0.9375rem] mb-4 items-end">
          <h4 className="text-neutral-500 font-mono uppercase tracking-wider">
            {t("catalogue.price_range")}
          </h4>
          <span className="text-brand-500 font-mono font-bold text-base">
            {priceRange.toFixed(3)}{" "}
            <span className="text-[0.9375rem]">OMR</span>
          </span>
        </div>
        <div className="relative h-2 bg-[#111] rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-brand-500"
            style={{ width: `${(priceRange / 100) * 100}%` }}
          ></div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.5"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full absolute -mt-2 opacity-0 cursor-pointer h-4"
        />
        <div className="flex justify-between text-[0.9375rem] text-neutral-600 font-mono mt-3">
          <span>0.000</span>
          <span>100.000</span>
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
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] hidden"
        onClick={() => setIsMobileFilterOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        ref={mobileFilterRef}
        className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#0a0a0a] z-[70] border-r border-white/10 shadow-2xl transform -translate-x-full overflow-y-auto"
      >
        <div className="p-5 flex justify-between items-center border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
          <h3 className="font-bold uppercase tracking-widest text-[0.9375rem] text-white flex items-center gap-2">
            <Sliders size={16} className="text-brand-500" /> Filters
          </h3>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="text-neutral-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <FilterContent />
          <div className="mt-8 pt-6 border-t border-white/5">
            <Button fullWidth onClick={() => setIsMobileFilterOpen(false)}>
              View {filteredProducts.length} Items
            </Button>
          </div>
        </div>
      </div>

      {/* Updated Z-Index from z-10 to z-30 to ensure search suggestions appear above grid */}
      <Section className="mb-16 relative z-30" noPadding allowOverflow>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <p className="text-[0.9375rem] font-mono text-brand-500 uppercase tracking-[0.2em] font-bold">
                Live Inventory System
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tighter uppercase">
              {t("catalogue.title")}
            </h1>
            <p className="text-neutral-400 max-w-xl text-lg font-light leading-relaxed">
              {t("catalogue.subtitle")}
            </p>
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
                  onFocus={() => {
                    if (debouncedSearchQuery.length > 1)
                      setShowSuggestions(true);
                  }}
                  placeholder="Search Part ID or Name..."
                  className="w-full bg-transparent border-none px-4 py-3 text-[0.9375rem] text-white focus:outline-none focus:ring-0 placeholder:text-neutral-600 font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchSuggestions([]);
                    }}
                    className="mr-3 text-neutral-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Auto-suggestions Dropdown - SOLID STYLE with High Z-Index */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2">
                    <p className="text-[0.9375rem] text-neutral-500 font-mono uppercase tracking-wider px-3 py-2">
                      Suggestions
                    </p>
                    {searchSuggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => selectSuggestion(product)}
                        className="w-full flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg text-left transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-white/10">
                          <img
                            src={product.image || PLACEHOLDER_IMAGE}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.9375rem] text-white font-semibold truncate group-hover:text-brand-500 transition-colors">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-[0.65rem] text-neutral-500 uppercase tracking-wider font-mono px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                              {product.category}
                            </p>
                            <span className="text-[0.65rem] text-brand-500 font-bold">
                              {product.price > 0
                                ? `${product.price.toFixed(3)} OMR`
                                : "Contact for Price"}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Toolbar - Enhanced alignment */}
        <div className="lg:hidden flex gap-3 mb-6 z-10 relative">
          <Button
            variant="secondary"
            className="flex-1 !py-3 !text-[0.9375rem] h-[48px]"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Sliders size={16} className="mr-2" /> Filters
          </Button>
          <div className="relative flex-1">
            <CustomDropdown
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="h-[48px]"
              variant="secondary"
            />
          </div>
        </div>
      </Section>

      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-4 gap-8 relative z-10">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders size={16} className="text-brand-500" />
                  <h3 className="font-bold uppercase tracking-widest text-[0.9375rem] text-white">
                    Refine Spec
                  </h3>
                </div>
                <span className="text-[0.9375rem] font-mono text-neutral-500">
                  {filteredProducts.length} ITEMS
                </span>
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
            <p className="text-[0.9375rem] text-neutral-500 font-mono">
              Showing {sortedProducts.length} results
            </p>
            <div className="flex flex-col items-start gap-1.5 min-w-[200px]">
              <span className="text-[0.8rem] font-mono uppercase tracking-widest text-neutral-500 ml-1">
                Sort by
              </span>
              <div className="w-48">
                <CustomDropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by"
                  className="z-50"
                  variant="secondary"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="animate-spin text-brand-500 w-12 h-12" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {paginatedProducts.map((product) => {
                const isSaved = savedProducts.includes(product.id);
                const isHovered = hoveredProduct === product.id;

                return (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className="group relative bg-[#0a0a0a] rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 border border-white/5 hover:border-brand-500/20 shadow-lg hover:shadow-[0_10px_40px_-5px_rgba(213,243,101,0.05)] flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="aspect-[1/1] sm:aspect-[4/3] w-full relative overflow-hidden bg-white p-3 sm:p-4">
                      <img
                        src={product.image || PLACEHOLDER_IMAGE}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700 ease-out"
                      />

                      {/* Brand Badge */}
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                        <span className="backdrop-blur-md bg-black/70 border border-white/10 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded text-[0.7rem] sm:text-[0.8rem] font-bold text-white uppercase tracking-wider shadow-lg">
                          {product.brand}
                        </span>
                      </div>

                      {/* Quick Actions Overlay - Desktop only or optimized for mobile touch */}
                      <div
                        className={`absolute bottom-3 left-0 right-0 px-3 flex justify-between items-center transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4"}`}
                      >
                        <Button
                          size="sm"
                          onClick={() => setSelectedProduct(product)}
                          className="bg-neutral-950 hover:bg-black border border-white/10 text-white shadow-2xl w-full mr-1.5 !py-1.5 !text-[0.75rem] sm:!text-[0.9375rem]"
                        >
                          <Eye size={12} className="mr-1.5" /> View
                        </Button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveProduct(product.id);
                          }}
                          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-black/60 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white active:scale-95 shrink-0"
                        >
                          <Heart
                            size={14}
                            className={`transition-colors ${isSaved ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-3 sm:p-5 flex flex-col flex-grow relative z-10">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {product.specification && (
                          <span className="text-[0.65rem] sm:text-[0.75rem] font-mono text-brand-500 bg-brand-500/10 px-1.5 py-0.5 rounded border border-brand-500/20 whitespace-nowrap">
                            {product.specification.toUpperCase()}
                          </span>
                        )}
                        {product.viscosity && (
                          <span className="text-[0.65rem] sm:text-[0.75rem] font-mono text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 whitespace-nowrap">
                            {product.viscosity}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-lg font-bold text-white mb-3 leading-tight group-hover:text-brand-500 transition-colors line-clamp-2 h-8 sm:h-12">
                        {product.name}
                      </h3>

                      <div className="mt-auto pt-3 flex items-end justify-between border-t border-white/5">
                        <div>
                          <p className="text-[0.65rem] sm:text-[0.75rem] text-neutral-500 mb-0.5 uppercase tracking-wider font-mono">
                            Price
                          </p>
                          <p className="text-base sm:text-xl font-black text-white tracking-tight flex items-baseline gap-1">
                            {product.price > 0
                              ? product.price.toFixed(3)
                              : "N/A"}
                            <span className="text-[0.65rem] sm:text-[0.75rem] font-medium text-neutral-500">
                              {product.price > 0 ? "OMR" : ""}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2 relative z-20">
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="font-display text-[0.75rem] tracking-widest px-4 h-10"
              >
                PREV
              </Button>

              <div className="flex items-center gap-1 sm:gap-1.5 mx-1 sm:mx-2">
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-display text-[0.75rem] text-neutral-600"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-display text-[0.75rem] sm:text-[0.875rem] transition-all flex items-center justify-center border ${
                        currentPage === page
                          ? "bg-brand-500 border-brand-500 text-black shadow-[0_0_15px_rgba(213,243,101,0.3)]"
                          : "bg-neutral-900 border-white/5 text-neutral-500 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="font-display text-[0.75rem] tracking-widest px-4 h-10"
              >
                NEXT
              </Button>
            </div>
          )}

          {!loading && sortedProducts.length === 0 && (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-neutral-500 border border-dashed border-white/10 rounded-2xl bg-[#0a0a0a]">
              <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
                <Sliders size={32} className="opacity-50" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Matches Found
              </h3>
              <p className="text-[0.9375rem] text-neutral-400 max-w-xs text-center mb-6">
                Adjust your filters to find what you're looking for in our
                inventory.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCategory("All");
                  setActiveViscosity("All");
                  setActiveBrand("All");
                  setPriceRange(100);
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Product Image Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

          <div
            className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col sm:flex-row animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-black transition-colors"
            >
              <X size={24} />
            </button>

            {/* Left side: Image */}
            <div className="sm:w-3/5 p-8 sm:p-12 flex items-center justify-center bg-white">
              <img
                src={selectedProduct.image || PLACEHOLDER_IMAGE}
                alt={selectedProduct.name}
                className="max-w-full max-h-[50vh] sm:max-h-[70vh] object-contain"
              />
            </div>

            {/* Right side: Details */}
            <div className="sm:w-2/5 bg-[#0a0a0a] p-8 sm:p-10 flex flex-col border-t sm:border-t-0 sm:border-l border-white/5">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[0.75rem] font-mono text-brand-500 bg-brand-500/10 px-2 py-1 rounded border border-brand-500/20 uppercase">
                  {selectedProduct.category}
                </span>
                {selectedProduct.brand && (
                  <span className="text-[0.75rem] font-mono text-neutral-400 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase">
                    {selectedProduct.brand}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight uppercase leading-tight">
                {selectedProduct.name}
              </h2>

              {selectedProduct.specification && (
                <div className="mb-6">
                  <p className="text-neutral-500 text-[0.8rem] font-mono uppercase tracking-widest mb-2">
                    Technical Insight
                  </p>
                  <p className="text-neutral-300 text-lg font-light leading-relaxed">
                    {selectedProduct.specification}
                  </p>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-neutral-500 text-[0.8rem] font-mono uppercase tracking-widest mb-1">
                    Price Rating
                  </p>
                  <p className="text-3xl font-black text-white tracking-tighter">
                    {selectedProduct.price > 0
                      ? selectedProduct.price.toFixed(3)
                      : "Contact"}
                    <span className="text-sm font-medium text-neutral-500 ml-2 uppercase">
                      {selectedProduct.price > 0 ? "OMR" : ""}
                    </span>
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setSelectedProduct(null)}
                className="mt-8 py-4 text-base tracking-widest"
                fullWidth
              >
                CLOSE PREVIEW
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
