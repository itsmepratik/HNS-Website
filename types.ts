import React from "react";

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  carModel: string;
}

export interface PriceTier {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  features: string[];
  recommended: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  viscosity?: string;
  specification?: string;
  image: string;
  rating: number;
  reviews: number;
}

// Database Request Types
export interface BookingRequest {
  name: string;
  phone: string;
  vehicle: string;
  serviceType: "premium" | "standard";
  preferredDate: string;
  timestamp: string;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  vehicle: string;
  notes?: string;
  packageType: "Standard" | "Premium" | "Fleet";
  timestamp: string;
}
