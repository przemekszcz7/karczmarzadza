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
  X,
  ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';

const IMAGES = [
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/494482465_1265600282237658_4910818142172882119_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=2ev1OQcIRMMQ7kNvwGGcZCB&_nc_oc=AdpaiVR2xY0_pyHcXDO8IDj1eOqvN1DrcoXkj0eAeF7xnr_zyMxqM6nS31PiLpae-6w&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=XB-u2Lo_8nBlUyR2zgoobw&_nc_ss=7b2a8&oh=00_Af0aKmrYdvRB2LssJI9rdGU6zlLo_wp6yLw5KRmytphVzA&oe=69F24250",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/494710924_1265600272237659_4759303764915150474_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_ohc=B938HAzUciAQ7kNvwHQdJbv&_nc_oc=AdpHYgFEH8_CTAGAe5-Wspc-BbdCRNIc9cMR-5JgrpMqo2DGbRevBlrhgWr3Bt11Vsk&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=nWo5NUqgDxiEMI6FUCldhg&_nc_ss=7b2a8&oh=00_Af0X0M6nETxkhZXnwd2t1ZWgQNp9iNS9tNKXFyvY2D4kcQ&oe=69F23186",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/493338003_1263417822455904_2762233224847189155_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=C6vvFx1PkS4Q7kNvwFSFyVF&_nc_oc=Adr5-_bUqdGT_-NkCnpNmEFs3twIl45d7g0XNyQuDYwfChAh81AjDWpU20GCnjL29TY&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=Zw5cWnvqDFTXmKiSnXLuoQ&_nc_ss=7b2a8&oh=00_Af2jmptmw5xCEVwXSZFBfm3Ajxnye_-4aV3g3w9ukFsD6A&oe=69F2289F",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/492472445_1263417845789235_7313535496876167545_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=aAAjROuZSJQQ7kNvwFEpcNm&_nc_oc=AdrEET-7leV0ukylKEyURL4B04CEaYadxWXdlow1TNLQPDDdArs6OiO2hCXi1Q9KlDo&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=IfMZjXIo8X5_wHepTbKdxQ&oh=00_Af2ZpuxJxKvze-dRroZh3AtZRc_-qBJkLONSjuqxHoO2Vw&oe=69F2187B",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/493994846_1262536265877393_8563727255817413147_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=HRnvcN0JuyEQ7kNvwH1TFy1&_nc_oc=Ado15Dfu_cfKMitCg1JgKpApqGO7-BOtC0FMO3DOCkup1S8gk-vjzG-EqXZdiAv1Zu8&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=OZhQJhHIYDERdDLBQipBfA&_nc_ss=7b2a8&oh=00_Af2gvsbjLZfdh2wR_ElUUPRvUshv2hdqL_Q3ca4hZd0nsw&oe=69F227DC",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/493729166_1262536212544065_3927221598496048940_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_ohc=7BQ1ANiOSuAQ7kNvwFNp0ew&_nc_oc=AdoJr4VqZ0gn54H6aRpMPQfYXF6M4Y3PRkDr8CRFV6y4XiE2qqe328bbUOjzxBKagI0&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=FKLrXcKsTu5selxigr8mNQ&_nc_ss=7b2a8&oh=00_Af1amA-wK-TPbMbZ4L-ZuNh55UNGlDUYSD-8bgB9TBXUZQ&oe=69F21E12",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/494108294_1262536185877401_3150602816104922614_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=emoTNA-z-coQ7kNvwF2sZa-&_nc_oc=AdpnXL6Qd4dyyLIBCpga0ou7YM-D56bXqdl6__lYa0FacVcBoAHUb5M0Rw18nuBIWsw&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=dwGe7F35DGsj9g5wDz_Ung&_nc_ss=7b2a8&oh=00_Af3rqyaXbNNPXIzRm-uabEqRm7hW6z_b0dynjFjUjDborA&oe=69F229CF",
  "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/492936302_1262536179210735_2661544604999763810_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_ohc=WANQgJccc7cQ7kNvwFivdVb&_nc_oc=AdrDEX0yaQ91gMXHFZsIlzQzmKq1ITnAFUrJrSKr3fpPO1_mBUtLiblSlu_WDHlO6pg&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=ygbHgi9dnCIfbverPJnEJA&_nc_ss=7b2a8&oh=00_Af09HUJmxh70dyhbWRwlk_LPXFDonbDggPxY914EJX5m7w&oe=69F22339",
  "https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/493998012_1262536142544072_7576016324617655876_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=m56JXwKhv-cQ7kNvwFIjbS4&_nc_oc=AdprpSuXDsZ_HfHOkdtFcT5HURiu2YdMGCNBuh3byAggrt0h4NJ0SmvDggARK-mXC2E&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=z7hQuTIQ1-bHBgguTazDow&_nc_ss=7b2a8&oh=00_Af18T4d_XXo5GZHjqJxHGf1b75h1w8A6m-1FhL9fe1WS6A&oe=69F21649",
];

const LOGO = "https://scontent-waw2-2.xx.fbcdn.net/v/t39.30808-6/458318429_1068413095289712_2435864125055337775_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=dqazfIlQ6VgQ7kNvwGsbRhY&_nc_oc=AdrAvj4r54yaSpPT4ZwZUwZndQXk1xPeQCRGpm_CtXgdIjNXwAE4616LDi6ySJT-Yn4&_nc_zt=23&_nc_ht=scontent-waw2-2.xx&_nc_gid=yQb6eEhxOqJtFWUG8QwbcA&_nc_ss=7b2a8&oh=00_Af3UvIXKwQppfk9R2niePFcZy5bmkUyX2B1G88HU10k1iA&oe=69F210C0";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O nas', href: '#o-nas' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Nasze Sale', href: '#sale' },
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
              src={LOGO} 
              alt="Logo Karczma Rządza" 
              className={`w-12 h-12 rounded-full border-2 border-wood-accent group-hover:scale-105 transition-transform`}
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

          {/* Desktop Nav */}
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

          {/* Mobile Menu Toggle */}
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
              src={IMAGES[0]} 
              className="w-full h-full object-cover scale-105 animate-subtle-zoom" 
              alt="Rustykalna sala bankietowa"
            />
            <div className="absolute inset-0 bg-[#2C1810]/40" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center px-6"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-5xl md:text-8xl text-white font-serif mb-6 drop-shadow-2xl font-bold italic leading-tight"
            >
              Twój Wyjątkowy Dzień <br /> 
              <span className="font-light not-italic text-4xl md:text-6xl block mt-4 tracking-tight">W Rustykalnym Stylu</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-10 font-sans font-light tracking-wide"
            >
              Odkryj miejsce, gdzie tradycja spotyka się z elegancją. <br className="hidden md:block" /> Zapraszamy do Karczmy Rządza.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href="#kontakt" 
                className="bg-wood-accent text-white px-10 py-4 rounded shadow-xl font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95"
              >
                Rezerwuj Termin
              </a>
              <a 
                href="#galeria" 
                className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
              >
                Zobacz Galerię
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <div className="w-1 h-12 bg-white/30 rounded-full flex justify-center">
              <div className="w-1 h-4 bg-white rounded-full mt-2" />
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
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -50 : idx === 2 ? 50 : 0, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-xl border border-stone-tan elegant-shadow text-center flex flex-col items-center group transition-all"
              >
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-14 h-14 border border-stone-tan rounded-full flex items-center justify-center text-wood-accent mb-6"
                >
                  <item.icon size={24} />
                </motion.div>
                <h3 className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-wood-accent mb-2">{item.title}</h3>
                <p className="text-xl font-serif text-wood-dark">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section - Design Motif */}
        <section id="o-nas" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: -60 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "circOut" }}
              className="w-full md:w-1/2 relative"
            >
              <img 
                src={IMAGES[1]} 
                className="w-full h-[450px] object-cover rounded-2xl shadow-2xl cursor-zoom-in group" 
                alt="Wnętrze Karczmy"
                onClick={() => setSelectedImage(IMAGES[1])}
              />
              <motion.div 
                initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-wood-accent text-white p-8 rounded-lg shadow-xl max-w-[240px]"
              >
                <p className="text-[10px] uppercase tracking-widest opacity-80 mb-2 font-bold">Zapraszamy</p>
                <p className="text-2xl leading-tight font-serif italic">Idealne miejsce na Twoje przyjęcie</p>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full md:w-1/2 space-y-8"
            >
              <h2 className="text-5xl font-serif text-wood-dark italic">Tradycja spotyka elegancję...</h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-dusty-text leading-relaxed text-lg font-sans opacity-90"
              >
                Nasza karczma to połączenie sielskiego klimatu z profesjonalną obsługą bankietową. 
                Drewniane wnętrza, regionalna kuchnia i malownicza okolica nad rzeką Rządzą stworzą 
                niezapomnianą atmosferę dla Państwa uroczystości.
              </motion.p>
              <div className="pt-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.facebook.com/KarczmaRzadzaRustykalnaSalaBankietowa/reviews/?id=100063630937455&sk=reviews" 
                  className="border-2 border-wood-accent text-wood-accent font-bold px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-wood-accent hover:text-white transition-all inline-block shadow-lg hover:shadow-wood-accent/20"
                >
                  Zobacz Opinie Naszych Gości
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galeria" className="py-24 bg-paper border-y border-stone-tan">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-wood-accent mb-4 block">Inspiracje</span>
              <h2 className="text-5xl md:text-6xl text-wood-dark font-serif font-bold italic">Galeria Detali</h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {IMAGES.slice(2, 6).map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="relative overflow-hidden rounded-lg aspect-square border border-stone-tan bg-white shadow-sm group cursor-zoom-in"
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ y: -8 }}
                >
                  <img 
                    src={img} 
                    alt={`Galeria ${idx + 1}`} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-wood-dark/0 group-hover:bg-wood-dark/10 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Call to Action */}
        <section id="opinie" className="py-24 bg-wood-dark text-paper wood-texture relative z-10 border-b border-stone-tan/20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <div className="flex gap-1 text-wood-accent justify-center mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, rotate: -45 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 + s * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Star fill="currentColor" size={24} />
                </motion.div>
              ))}
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic mb-8">"Miejsce z duszą i pasją"</h2>
            <p className="text-xl text-stone-tan/80 leading-relaxed font-light italic mb-12">
              Każde wydarzenie w Karczmie Rządza to dla nas nowa historia. Jesteśmy wdzięczni za zaufanie, którym nas obdarzacie, pozwalając nam być częścią Waszych najważniejszych chwil.
            </p>
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              href="https://www.facebook.com/KarczmaRzadzaRustykalnaSalaBankietowa/reviews/?id=100063630937455&sk=reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-paper text-wood-dark px-10 py-5 rounded shadow-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all inline-block"
            >
              Pełna Lista Opinii na FB
            </motion.a>
          </motion.div>
        </section>

        {/* Contact & Map Section */}
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

              <div className="mt-16 bg-paper p-8 rounded-2xl border border-stone-tan">
                <p className="text-sm italic text-dusty-text mb-6">"Chętnie odpowiemy na wszystkie Państwa pytania i pomożemy zaplanować idealne wydarzenie."</p>
                <a 
                  href="https://www.facebook.com/KarczmaRzadzaRustykalnaSalaBankietowa" 
                  className="flex items-center gap-3 text-wood-dark font-bold uppercase tracking-wider text-xs hover:text-wood-accent transition-all"
                >
                  <Facebook size={20} /> Obserwuj nas na Facebooku
                </a>
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

      {/* Footer Bar */}
      <footer className="py-12 bg-wood-dark text-stone-tan wood-texture">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Logo" className="w-8 h-8 rounded-full border border-stone-tan/30" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Karczma Rzadza</span>
          </div>
          
          <div className="text-[10px] uppercase tracking-[0.3em] font-medium text-center opacity-60">
            © {new Date().getFullYear()} Karczma Rządza — Wszystkie prawa zastrzeżone
          </div>

          <div className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold">
            Projektowana Dla Wyjątkowych Chwil • Kraszew Stary
          </div>
        </div>
      </footer>

      {/* Lightbox / Zoom Modal */}
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

      {/* Floating Action Button for Mobile */}
      <a 
        href="tel:504543330" 
        className="md:hidden fixed bottom-6 right-6 z-50 bg-wood-accent text-white p-4 rounded-full shadow-2xl shadow-wood-accent/40 hover:scale-110 active:scale-95 transition-transform"
      >
        <Phone size={24} />
      </a>
      
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
