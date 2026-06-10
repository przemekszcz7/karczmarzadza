import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Star, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCMS } from './useCMS';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { content, getPath } = useCMS();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
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
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 py-3 shadow-sm border-b border-stone-tan' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-4 group">
            <img src={getPath(content.logo)} alt="Logo" className="w-12 h-12 rounded-full border-2 border-wood-accent" />
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold uppercase ${scrolled ? 'text-wood-dark' : 'text-white'}`}>Karczma Rządza</span>
              <span className={`text-[10px] font-sans uppercase tracking-widest italic font-bold ${scrolled ? 'text-wood-accent' : 'text-white/80'}`}>Sala Bankietowa</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={`text-[11px] font-bold uppercase tracking-widest ${scrolled ? 'text-wood-dark' : 'text-white'}`}>{link.name}</a>
            ))}
            <a href="https://www.facebook.com/KarczmaRzadzaRustykalnaSalaBankietowa" target="_blank" rel="noopener noreferrer" className={`px-5 py-2 rounded font-bold uppercase text-xs ${scrolled ? 'bg-[#3b5998] text-white' : 'bg-white text-wood-dark'}`}>Facebook</a>
          </div>
          <button className={`md:hidden p-2 ${scrolled ? 'text-wood-dark' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 z-40 bg-paper pt-24 px-8 md:hidden">
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-4xl font-serif text-wood-dark italic border-b border-stone-tan pb-4" onClick={() => setIsMenuOpen(false)}>{link.name}</a>
              ))}
              <a href="https://www.facebook.com/KarczmaRzadzaRustykalnaSalaBankietowa" className="bg-[#3b5998] text-white text-center py-3 rounded font-bold uppercase text-sm">Facebook</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={getPath(content.hero_image)} className="w-full h-full object-cover" alt="Hero" />
            <div className="absolute inset-0 bg-[#2C1810]/40" />
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-8xl text-white font-serif mb-6 font-bold italic leading-tight">
              {content.hero_title} <br />
              <span className="font-light not-italic text-4xl md:text-6xl block mt-4">{content.hero_subtitle}</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-10 font-sans font-light">{content.hero_description}</p>
            <div className="flex gap-4 justify-center">
              <a href="#kontakt" className="bg-wood-accent text-white px-10 py-4 rounded font-bold uppercase text-xs">Rezerwuj</a>
              <a href="#galeria" className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded font-bold uppercase text-xs">Galeria</a>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-24 bg-paper border-b border-stone-tan">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Lokalizacja", text: "ul. Nad Rzadzą 30, Kraszew Stary" },
              { icon: Phone, title: "Kontakt", text: "+48 504 543 330" },
              { icon: Mail, title: "E-mail", text: "lazurr44@wp.pl" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-12 rounded-xl border border-stone-tan text-center flex flex-col items-center">
                <div className="w-14 h-14 border border-stone-tan rounded-full flex items-center justify-center text-wood-accent mb-6"><item.icon size={24} /></div>
                <h3 className="text-[10px] font-sans uppercase tracking-widest font-bold text-wood-accent mb-2">{item.title}</h3>
                <p className="text-xl font-serif text-wood-dark">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="o-nas" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
              <img src={getPath(content.about_image)} className="w-full h-[450px] object-cover rounded-2xl shadow-2xl" alt="Karczma" onClick={() => setSelectedImage(getPath(content.about_image))} />
              <div className="absolute -bottom-6 -right-6 bg-wood-accent text-white p-8 rounded-lg shadow-xl max-w-[240px]">
                <p className="text-2xl font-serif italic">Idealne miejsce na przyjęcie</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <h2 className="text-5xl font-serif text-wood-dark italic">{content.about_title}</h2>
              <p className="text-dusty-text leading-relaxed text-lg font-sans">{content.about_description}</p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galeria" className="py-24 bg-paper border-y border-stone-tan">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-5xl text-wood-dark font-serif font-bold italic mb-16">Galeria Detali</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {content.gallery_images.map((img, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-lg aspect-square border border-stone-tan bg-white group cursor-zoom-in" onClick={() => setSelectedImage(getPath(img))}>
                  <img src={getPath(img)} alt={`Galeria ${idx + 1}`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="opinie" className="py-24 bg-wood-dark text-paper text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex gap-1 text-wood-accent justify-center mb-8">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} fill="currentColor" size={24} />)}
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic mb-8">"Miejsce z duszą i pasją"</h2>
            <p className="text-xl text-stone-tan/80 italic mb-12">Każde wydarzenie w Karczmie Rządza to dla nas wyjątkowa historia.</p>
          </div>
        </section>

        {/* Contact */}
        <section id="kontakt" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-serif text-wood-dark font-bold italic mb-8">Zapraszamy do Rezerwacji</h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6 pb-6 border-b border-stone-tan">
                  <span className="text-wood-accent"><MapPin size={24} /></span>
                  <p className="text-lg font-serif">ul. Nad Rzadzą 30, Kraszew Stary 05-205</p>
                </div>
                <div className="flex items-center gap-6 pb-6 border-b border-stone-tan">
                  <span className="text-wood-accent"><Phone size={24} /></span>
                  <a href="tel:504543330" className="text-lg font-serif">+48 504 543 330</a>
                </div>
              </div>
            </div>
            <div className="h-[400px] rounded-3xl overflow-hidden border border-stone-tan bg-paper">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.235948943801!2d21.31952327708575!3d52.40232434509176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecb19ef01dd1b%3A0x6335123d5789fcfc!2sKarczma%20Rz%C4%85dza%20-%20Sala%20Bankietowa!5e0!3m2!1spl!2spl!4v1710000000000!5m2!1spl!2spl" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Mapa" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-wood-dark text-stone-tan text-center border-t border-white/5">
        <p className="text-xs uppercase tracking-widest text-white">© {new Date().getFullYear()} Karczma Rządza — Wszystkie prawa zastrzeżone</p>
      </footer>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[100] bg-wood-dark/95 flex items-center justify-center p-4">
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage} alt="Lightbox" className="max-w-full max-h-full object-contain rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
