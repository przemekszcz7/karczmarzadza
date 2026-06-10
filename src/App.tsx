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

// Default Fallbacks matching your original rustic content configuration
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
  const [content, setContent] = useState(DEFAULT_CONTENT);

  // Dynamic Runtime Asset Resolution mapping to Vite or Subdirectories
  const getPath = (pathString: string) => {
    const clean = pathString.startsWith('/') ? pathString.slice(1) : pathString;
    const baseUrl = import.meta.env.BASE_URL || '/';
    return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}${clean}`;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Fetch dynamic JSON written by Decap CMS at runtime
    fetch(`${import.meta.env.BASE_URL || '/'}content/homepage.json`)
      .then((res) => {
        if (!res.ok) throw new Error("No dynamic content configuration JSON found");
        return res.json();
      })
      .then((data) => {
        setContent({
          logo: data.logo || DEFAULT_CONTENT.logo,
          hero_image: data.hero_image || DEFAULT_CONTENT.hero_image,
          hero_title: data.hero_title || DEFAULT_CONTENT.hero_title,
          hero_subtitle: data.hero_subtitle || DEFAULT_CONTENT.hero_subtitle,
          hero_description: data.hero_description || DEFAULT_CONTENT.hero_description,
          about_image: data.about_image || DEFAULT_CONTENT.about_image,
          about_title: data.about_title || DEFAULT_CONTENT.about_title,
          about_description: data.about_description || DEFAULT_CONTENT.about_description,
          gallery_images: Array.isArray(data.gallery_images) ? data.gallery_images : DEFAULT_CONTENT.gallery_images
        });
      })
      .catch((err) => console.log("Using static content defaults:", err));

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
              rel="noopener noreferrer"
              className={`px-5 py-2 rounded shadow-sm font-bold uppercase tracking-tighter text-xs transition-all hover:bg-opacity-90 ${
                scrolled ? 'bg-[#3b5998] text-white' : 'bg-white text-wood-dark'
              }`}
            >
              Facebook
            </a>
          </div>

          <button 
            className={`md:hidden p-2 transition-colors ${
              scrolled ? 'text-wood-dark' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-paper pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-serif text-wood-dark italic border-b border-stone-tan pb-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 mt-4">
                <a 
                  href="https://www.facebook.com/KarczmaRzadzaRustykalnaSalaBankietowa" 
                  className="bg-[#3b5998] text-white px-6 py-3 rounded font-bold uppercase tracking-widest text-sm"
                >
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={getPath(content.hero_image)} 
              className="w-full h-full object-cover scale-105 animate-subtle-zoom" 
              alt="Hero Theme"
            />
            <div className="absolute inset-0 bg-[#2C1810]/40" />
          </div>
          
          <motion.div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-8xl text-white font-serif mb-6 drop-shadow-2xl font-bold italic leading-tight">
              {content.hero_title} <br /> 
              <span className="font-light not-italic text-4xl md:text-6xl block mt-4 tracking-tight">{content.hero_subtitle}</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-10 font-sans font-light tracking-wide">
              {content.hero_description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#kontakt" className="bg-wood-accent text-white px-10 py-4 rounded shadow-xl font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all">
                Rezerwuj Termin
              </a>
              <a href="#galeria" className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                Zobacz Galerię
              </a>
            </div>
          </motion.div>
        </section>

        {/* Info Cards */}
        <section className="py-24 bg-paper border-b border-stone-tan overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Lokalizacja", text: "ul. Nad Rzadzą 30, Kraszew Stary" },
              { icon: Phone, title: "Kontakt", text: "+48 504 543 330" },
              { icon: Mail, title: "E-mail", text: "lazurr44@wp.pl" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-12 rounded-xl border border-stone-tan elegant-shadow text-center flex flex-col items-center">
                <div className="w-14 h-14 border border-stone-tan rounded-full flex items-center justify-center text-wood-accent mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-wood-accent mb-2">{item.title}</h3>
                <p className="text-xl font-serif text-wood-dark">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="o-nas" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
              <img 
                src={getPath(content.about_image)} 
                className="w-full h-[450px] object-cover rounded-2xl shadow-2xl cursor-zoom-in" 
                alt="Karczma"
                onClick={() => setSelectedImage(getPath(content.about_image))}
              />
              <div className="absolute -bottom-6 -right-6 bg-wood-accent text-white p-8 rounded-lg shadow-xl max-w-[240px]">
                <p className="text-[10px] uppercase tracking-widest opacity-80 mb-2 font-bold">Zapraszamy</p>
                <p className="text-2xl leading-tight font-serif italic">Idealne miejsce na Twoje przyjęcie</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <h2 className="text-5xl font-serif text-wood-dark italic">{content.about_title}</h2>
              <p className="text-dusty-text leading-relaxed text-lg font-sans opacity-90">
                {content.about_description}
              </p>
              <div className="pt-4">
                <a href="https://www.facebook.com/KarczmaRzadzaRustykalnaSalaBankietowa/reviews" className="border-2 border-wood-accent text-wood-accent font-bold px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-wood-accent hover:text-white transition-all inline-block shadow-lg">
                  Zobacz Opinie Naszych Gości
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galeria" className="py-24 bg-paper border-y border-stone-tan">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-wood-accent mb-4 block">Inspiracje</span>
              <h2 className="text-5xl md:text-6xl text-wood-dark font-serif font-bold italic">Galeria Detali</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {content.gallery_images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-lg aspect-square border border-stone-tan bg-white shadow-sm group cursor-zoom-in"
                  onClick={() => setSelectedImage(getPath(img))}
                >
                  <img 
                    src={getPath(img)} 
                    alt={`Galeria ${idx + 1}`} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-wood-dark/0 group-hover:bg-wood-dark/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="opinie" className="py-24 bg-wood-dark text-paper wood-texture relative z-10 border-b border-stone-tan/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex gap-1 text-wood-accent justify-center mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} fill="currentColor" size={24} />
              ))}
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic mb-8">"Miejsce z duszą i pasją"</h2>
            <p className="text-xl text-stone-tan/80 leading-relaxed font-light italic mb-12">
              Każde wydarzenie w Karczmie Rządza to dla nas nowa historia. Jesteśmy wdzięczni za zaufanie, którym nas obdarzacie, pozwalając nam być częścią Waszych najważniejszych chwil.
            </p>
            <a href="https://www.facebook.com/KarczmaRzadzaRustykalnaSalaBankietowa/reviews" target="_blank" rel="noopener noreferrer" className="bg-paper text-wood-dark px-10 py-5 rounded shadow-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all inline-block">
              Pełna Lista Opinii na FB
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="kontakt" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-wood-accent mb-4 block">Kontakt</span>
              <h2 className="text-5xl font-serif text-wood-dark font-bold italic mb-8">Zapraszamy do Rezerwacji</h2>
              
              <div className="space-y-8 pt-8">
                <div className="flex items-center gap-6 pb-6 border-b border-stone-tan">
                  <span className="text-wood-accent"><MapPin size={24} /></span>
                  <p className="text-lg font-serif">ul. Nad Rzadzą 30, Kraszew Stary 05-205</p>
                </div>
                <div className="flex items-center gap-6 pb-6 border-b border-stone-tan">
                  <span className="text-wood-accent"><Phone size={24} /></span>
                  <a href="tel:504543330" className="text-lg font-serif hover:text-wood-accent transition-colors">+48 504 543 330</a>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-wood-accent"><Mail size={24} /></span>
                  <a href="mailto:lazurr44@wp.pl" className="text-lg font-serif hover:text-wood-accent transition-colors">lazurr44@wp.pl</a>
                </div>
              </div>
            </div>

            <div className="h-[550px] rounded-3xl overflow-hidden border border-stone-tan elegant-shadow bg-paper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.3473893437836!2d21.268668612876176!3d52.40037997191343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471edb5ab30aaabf%3A0xc6f41acb80b1c224!2sKARCZMA%20RZ%C4%84DZA!5e0!3m2!1spl!2spl!4v1777096628733!5m2!1spl!2spl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                title="Mapa dojazdu"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-wood-dark text-stone-tan wood-texture">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
          <div className="flex items-center gap-3">
            <img src={getPath(content.logo)} alt="Logo" className="w-8 h-8 rounded-full border border-stone-tan/30" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Karczma Rzadza</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] font-medium text-center opacity-60">
            © {new Date().getFullYear()} Karczma Rządza — Wszystkie prawa zastrzeżone
          </div>
          <div className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold">
            Projektowana Dla Wyjątkowych Chwil
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-wood-dark/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-6 right-6 text-white hover:text-wood-accent transition-colors z-[110] p-2"
            >
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage}
              alt="Powiększone zdjęcie"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}
