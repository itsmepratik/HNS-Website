/**
 * Utility to preload an image and cache it in the browser
 * @param src The source URL of the image
 * @returns A promise that resolves when the image is loaded
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = (err) => reject(err);
  });
};

/**
 * Utility to preload multiple images
 * @param srcs Array of source URLs
 * @returns A promise that resolves when all images are loaded
 */
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage));
};

import { useEffect } from "react";

/**
 * Hook to preload images on component mount
 * @param srcs Array of source URLs to preload
 */
export const usePreloadImages = (srcs: string[]) => {
  useEffect(() => {
    preloadImages(srcs).catch((err) => {
      console.warn("Failed to preload images:", err);
    });
  }, [srcs]);
};
