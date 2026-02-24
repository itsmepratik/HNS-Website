import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  CheckCircle,
  Loader2,
  Phone,
  User,
  Car,
  Zap,
  Settings,
  Briefcase,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { api } from "../services/api";
import { QuoteRequest } from "../types";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: "Standard" | "Premium" | "Fleet" | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
}) => {
  const { t, formatNumber } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quoteId, setQuoteId] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle: "",
    notes: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    vehicle: "",
    notes: "",
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Animation
  useGSAP(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        display: "flex",
      });
      gsap.fromTo(
        modalRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" },
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        display: "none",
      });
    }
  }, [isOpen]);

  // Success Animation
  useGSAP(() => {
    if (submitted) {
      gsap.fromTo(
        ".modal-success-icon",
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
      );
      gsap.fromTo(
        ".modal-success-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.3, stagger: 0.1 },
      );
    }
  }, [submitted]);

  if (!isOpen) return null;

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (value.trim().length < 3) error = t("booking.errors.name_short");
        if (!value) error = t("booking.errors.required");
        break;
      case "phone":
        const phoneRegex = /^[\d\s\-\+]{8,}$/;
        if (!phoneRegex.test(value)) error = t("booking.errors.phone_invalid");
        if (!value) error = t("booking.errors.required");
        break;
      case "vehicle":
        if (selectedPackage !== "Fleet") {
          if (value.trim().length < 2)
            error = t("booking.errors.vehicle_short");
          if (!value) error = t("booking.errors.required");
        }
        break;
      case "notes":
        if (selectedPackage === "Fleet") {
          if (value.trim().length < 5) error = "Please provide more details";
          if (!value) error = t("booking.errors.required");
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNameValid = validateField("name", formData.name);
    const isPhoneValid = validateField("phone", formData.phone);
    const isVehicleValid =
      selectedPackage === "Fleet"
        ? true
        : validateField("vehicle", formData.vehicle);
    const isNotesValid =
      selectedPackage === "Fleet"
        ? validateField("notes", formData.notes)
        : true;

    if (isNameValid && isPhoneValid && isVehicleValid && isNotesValid) {
      setLoading(true);

      try {
        const payload: QuoteRequest = {
          name: formData.name,
          phone: formData.phone,
          vehicle:
            selectedPackage === "Fleet" ? "Fleet Service" : formData.vehicle,
          notes: selectedPackage === "Fleet" ? formData.notes : undefined,
          packageType: selectedPackage || "Standard",
          timestamp: new Date().toISOString(),
        };

        const response = await api.quotes.create(payload);

        if (response.success) {
          setQuoteId(response.id);
          setLoading(false);
          setSubmitted(true);
        }
      } catch (error) {
        console.error("Quote submission failed", error);
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: "", phone: "", vehicle: "", notes: "" });
    onClose();
  };

  const getPackageIcon = () => {
    switch (selectedPackage) {
      case "Premium":
        return <Zap className="text-brand-500" size={24} />;
      case "Fleet":
        return <Briefcase className="text-blue-400" size={24} />;
      default:
        return <Settings className="text-white" size={24} />;
    }
  };

  const getPackageColor = () => {
    switch (selectedPackage) {
      case "Premium":
        return "text-brand-500 bg-brand-500/10 border-brand-500/30";
      case "Fleet":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30";
      default:
        return "text-white bg-white/10 border-white/20";
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 hidden"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-[#0f0f0f]">
          <h3 className="text-lg font-bold text-white tracking-wide">
            {t("offer.book_quote")}
          </h3>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="modal-success-icon w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle size={40} />
              </div>
              <h4 className="modal-success-text text-white font-bold text-2xl mb-2">
                {t("booking.success")}
              </h4>
              <p className="modal-success-text text-neutral-400 text-[0.9375rem] max-w-[250px] mb-8">
                {t("booking.success_sub")}
              </p>

              <div className="modal-success-text w-full bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-4 mb-6">
                <p className="text-[0.9375rem] text-emerald-400 font-bold uppercase tracking-wider mb-1">
                  Quote Reference
                </p>
                <p className="text-lg text-white font-mono">#{quoteId}</p>
              </div>

              <Button
                fullWidth
                onClick={handleClose}
                variant="outline"
                className="border-white/10 hover:bg-white/5"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Package Summary */}
              <div
                className={`p-4 rounded-xl border flex items-center gap-4 ${getPackageColor()}`}
              >
                <div className="p-2 bg-black/20 rounded-lg">
                  {getPackageIcon()}
                </div>
                <div>
                  <p className="text-[0.9375rem] font-mono uppercase tracking-wider opacity-80">
                    Selected Package
                  </p>
                  <p className="text-lg font-bold leading-none mt-0.5">
                    {selectedPackage} Service
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <User
                    className={`absolute left-4 top-3.5 w-4 h-4 transition-colors rtl:left-auto rtl:right-4 ${errors.name ? "text-red-500" : "text-neutral-500 group-focus-within:text-brand-500"}`}
                  />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    className={`w-full bg-[#1a1a1a] border rounded-xl pl-11 pr-4 py-3 text-white text-[0.9375rem] outline-none transition-all placeholder:text-neutral-600 rtl:pr-11 rtl:pl-4 focus:bg-[#222] ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50"}`}
                    placeholder={t("booking.name")}
                  />
                  {errors.name && (
                    <div className="absolute right-3 top-3.5 rtl:right-auto rtl:left-3 text-red-500">
                      <AlertCircle size={14} />
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <Phone
                    className={`absolute left-4 top-3.5 w-4 h-4 transition-colors rtl:left-auto rtl:right-4 ${errors.phone ? "text-red-500" : "text-neutral-500 group-focus-within:text-brand-500"}`}
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel"
                    className={`w-full bg-[#1a1a1a] border rounded-xl pl-11 pr-4 py-3 text-white text-[0.9375rem] outline-none transition-all placeholder:text-neutral-600 rtl:pr-11 rtl:pl-4 focus:bg-[#222] ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50"}`}
                    placeholder={t("booking.phone")}
                  />
                  {errors.phone && (
                    <div className="absolute right-3 top-3.5 rtl:right-auto rtl:left-3 text-red-500">
                      <AlertCircle size={14} />
                    </div>
                  )}
                </div>

                {selectedPackage === "Fleet" ? (
                  <div className="relative group">
                    <MessageSquare
                      className={`absolute left-4 top-3.5 w-4 h-4 transition-colors rtl:left-auto rtl:right-4 ${errors.notes ? "text-red-500" : "text-neutral-500 group-focus-within:text-brand-500"}`}
                    />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full bg-[#1a1a1a] border rounded-xl pl-11 pr-4 py-3 text-white text-[0.9375rem] outline-none transition-all placeholder:text-neutral-600 rtl:pr-11 rtl:pl-4 focus:bg-[#222] resize-none ${errors.notes ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50"}`}
                      placeholder="Special requirements / Fleet details..."
                    />
                    {errors.notes && (
                      <div className="absolute right-3 top-3.5 rtl:right-auto rtl:left-3 text-red-500">
                        <AlertCircle size={14} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative group">
                    <Car
                      className={`absolute left-4 top-3.5 w-4 h-4 transition-colors rtl:left-auto rtl:right-4 ${errors.vehicle ? "text-red-500" : "text-neutral-500 group-focus-within:text-brand-500"}`}
                    />
                    <input
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleInputChange}
                      type="text"
                      className={`w-full bg-[#1a1a1a] border rounded-xl pl-11 pr-4 py-3 text-white text-[0.9375rem] outline-none transition-all placeholder:text-neutral-600 rtl:pr-11 rtl:pl-4 focus:bg-[#222] ${errors.vehicle ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50"}`}
                      placeholder={t("booking.vehicle")}
                    />
                    {errors.vehicle && (
                      <div className="absolute right-3 top-3.5 rtl:right-auto rtl:left-3 text-red-500">
                        <AlertCircle size={14} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  disabled={loading}
                  className="py-4 text-base shadow-[0_4px_20px_rgba(213,243,101,0.25)] hover:shadow-[0_4px_30px_rgba(213,243,101,0.4)]"
                >
                  {loading ? (
                    <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                  ) : (
                    t("offer.book_quote")
                  )}
                </Button>
                <p className="text-center text-[0.9375rem] text-neutral-500 mt-3 flex items-center justify-center gap-1.5 font-medium">
                  <User size={12} /> No payment required now
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
