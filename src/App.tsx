/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Star, 
  ChevronRight, 
  Menu, 
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Default values that show up if the CMS file is still loading
const DEFAULT_CONTENT = {
  logo: "/images/logo.jpg",
  hero_image: "/images/1.jpg",
  hero_title: "Twój Wyjątkowy Dzień",
  hero_subtitle: "W Rustykalnym Stylu",
  hero_description: "Odkryj miejsce, gdzie tradycja spotyka się z elegancją. Zapraszamy do Karczmy Rządza.",
  about_image: "/images/2.jpg",
  about_title: "Tradycja spotyka elegancję...",
  about_description: "Nasza karczma to połączenie sielskiego klimatu z profesjonalną obsługą bankietową. Drewniane wnętrza, regionalna kuchnia i malownicza okolica nad rzeką Rządzą stworzą niezapomnianą atmosferę dla Państwa uroczystości.",
  gallery_images: [
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg"
  ]
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // This state holds the live data from Decap CMS
  const [content, setContent] = useState(DEFAULT_CONTENT);

  // Helper to make sure paths work on both local server and GitHub Pages subfolders
  const getPath = (pathString: string) => {
    if (!pathString) return '';
    const clean = pathString.startsWith('/') ? pathString.slice(1) : pathString;
    const baseUrl = import.meta.env.BASE_URL || '/';
    return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}${clean}`;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Fetch the live CMS file from the public directory
    const baseUrl = import.meta.env.BASE_URL || '/';
    const jsonPath = `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}content/homepage.json`;

    fetch(jsonPath)
      .then((res) => {
        if (!res.ok) throw new Error("CMS JSON file not found or not deployed yet");
        return res.json();
      })
      .then((data) => {
        // Map the JSON structure perfectly to our state
        setContent({
          logo: data.logo || DEFAULT_CONTENT.logo,
          hero_image: data.hero_section?.hero_image || DEFAULT_CONTENT.hero_image,
          hero_title: data.hero_section?.hero_title || DEFAULT_CONTENT.hero_title,
          hero_subtitle: data.hero_section?.hero_subtitle || DEFAULT_CONTENT.hero_subtitle,
          hero_description: data.hero_section?.hero_description || DEFAULT_CONTENT.hero_description,
          about_image: data.about_section?.about_image || DEFAULT_CONTENT.about_image,
          about_title: data.about_section?.about_title || DEFAULT_CONTENT.about_title,
          about_description: data.about_section?.about_description || DEFAULT_CONTENT.about_description,
          gallery_images: data.gallery_section?.gallery_images && Array.isArray(data.gallery_section.gallery_images)
            ? data.gallery_section.gallery_images.map((item: any) => typeof item === 'object' ? item.image : item)
            : DEFAULT_CONTENT.gallery_images
        });
      })
      .catch((err) => console.warn("Falling back to static defaults:", err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O nas', href: '#o-nas' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Opinie', href: '#opinie' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <div className="min-h-screen selection:bg-wood-accent selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-stone-tan' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-4 group">
            <img 
              src={getPath(content.logo)} 
              alt="Logo" 
              className="w-12 h-12 rounded-full border-2 border-wood-accent group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold uppercase tracking-tight leading-none transition-colors ${
                scrolled ? 'text-wood-dark' : 'text-white drop-shadow-md'
              }`}>
                Karczma Rządza
              </span>
              <span className={`text-[10px] font-sans uppercase tracking-[0.2em] italic font-bold mt-1 transition-colors ${
                scrolled ? 'text-wood-accent' : 'text-white/80'
              }`}>
                Rustykalna Sala Bankietowa
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] hover:text-wood-accent transition-colors ${
                  scrolled ? 'text-wood-dark' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://www.facebook.com/KarczmaRzadzaRustykalnaSalaBankietowa" 
              target="_blank" 
              rel="noopener noreferrer
