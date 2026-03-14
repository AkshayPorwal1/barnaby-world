import React, { useState, useEffect } from 'react';
import {
  Youtube,
  Instagram,
  Cloud,
  Heart,
  Music,
  Star,
  Navigation,
  Info,
  BookOpen,
  Camera,
  Facebook,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// Character Data with Individual Portrait Images
const characters = [
  {
    name: "Barnaby",
    species: "Pygmy Hippo",
    role: "The Optimist",
    color: "bg-[#F3E8FF]", // Softer Purple
    accent: "text-purple-600",
    description: "Joyful, resilient, and unsinkable. He laughs when he falls and loves his yellow boots!",
    image: "Barnaby.png",
    quirk: "Squeaks when he sits!"
  },
  {
    name: "Tula",
    species: "Turtle",
    role: "The Anchor",
    color: "bg-[#E0FDFB]", // Softer Teal
    accent: "text-teal-600",
    description: "Cautious and observant. She loves counting colorful pebbles and feels safest near Barnaby.",
    image: "Tula.png",
    quirk: "Hides in her shell when it's loud."
  },
  {
    name: "Otis",
    species: "Owl",
    role: "The Mentor",
    color: "bg-[#FFF7ED]", // Softer Orange
    accent: "text-orange-600",
    description: "Sleepy and wise. He's always cleaning his red glasses and sometimes falls asleep mid-hoot.",
    image: "Otis.png",
    quirk: "Cleans his red glasses constantly."
  },
  {
    name: "Wilbur",
    species: "Wombat",
    role: "The Energy",
    color: "bg-[#EFF6FF]", // Softer Blue
    accent: "text-blue-600",
    description: "Fast-moving and messy! His teal overalls are always stuffed with sticks and rocks.",
    image: "Wilbur.png",
    quirk: "Always has full cheeks!"
  },
  {
    name: "Gemma",
    species: "Baby Giraffe",
    role: "The Helper",
    color: "bg-[#FEFCE8]", // Softer Yellow
    accent: "text-yellow-700",
    description: "The big sister of the group. She uses her long neck to help her friends reach high places.",
    image: "Gemma.png",
    quirk: "Wears purple leg warmers."
  },
  {
    name: "Pip",
    species: "Hedgehog",
    role: "The Explorer",
    color: "bg-[#FFF7ED]", // Softer Peach
    accent: "text-orange-700",
    description: "Brave and curious. His orange backpack is bigger than he is!",
    image: "Pip.png",
    quirk: "Curls into a soft ball when surprised."
  },
  {
    name: "Daisy",
    species: "Lamb",
    role: "The Sweetheart",
    color: "bg-[#FDF2F8]", // Softer Pink
    accent: "text-pink-600",
    description: "Graceful and kind. She loves picking flowers and making crowns for her friends.",
    image: "Daisy.png",
    quirk: "Hums while she works."
  }
];

// Custom Social Icons
const PinterestIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
  </svg>
);

const ThreadsIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M14.28 12.15c0 1.25-.45 2.21-1.33 2.21-.45 0-.85-.21-1.07-.61l-.03-.06-.05.06c-.22.4-.62.61-1.07.61-.88 0-1.33-.96-1.33-2.21 0-1.25.45-2.21 1.33-2.21.45 0 .85.21 1.07.61l.03.06.05-.06c.22-.4.62-.61 1.07-.61.88 0 1.33.96 1.33 2.21zm4.84 0c0 4.13-3.04 7.46-6.79 7.46-3.75 0-6.79-3.33-6.79-7.46 0-4.13 3.04-7.46 6.79-7.46 1.7 0 3.25.68 4.41 1.78l-1.33 1.33c-.83-.78-1.92-1.26-3.08-1.26-2.58 0-4.66 2.47-4.66 5.61s2.08 5.61 4.66 5.61c2.14 0 3.93-1.7 4.45-4h-2.12c-.52 2.3-2.31 4-4.45 4-2.58 0-4.66-2.47-4.66-5.61s2.08-5.61 4.66-5.61c1.16 0 2.25.48 3.08 1.26l1.33-1.33C17.43 5.37 15.88 4.69 14.18 4.69c-3.75 0-6.79 3.33-6.79 7.46 0 4.13 3.04 7.46 6.79 7.46 3.75 0 6.79-3.33 6.79-7.46 0-.32-.02-.63-.06-.94l2-.2c.03.38.06.76.06 1.14z" />
  </svg>
);

const TikTokIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.15-1.17-.46-.26-.87-.57-1.24-.93V15a7.45 7.45 0 0 1-6.47 7.37 7.56 7.56 0 0 1-7.3-4.17 7.5 7.5 0 0 1 .42-7.75 7.5 7.5 0 0 1 7.17-3.44v4.03a3.47 3.47 0 0 0-3.48 3.51 3.48 3.48 0 1 0 5.4 2.8V0h3.5z" />
  </svg>
);

const XIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" />
  </svg>
);

const SocialIcon = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 bg-white/90 hover:bg-white rounded-[2rem] transition-all hover:scale-110 shadow-sm text-pink-400 hover:text-pink-600 flex items-center justify-center border border-pink-50"
    aria-label={label}
  >
    {icon}
  </a>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const navItems = [
    { id: 'home', label: 'Welcome', icon: Heart },
    { id: 'characters', label: 'Friends', icon: Star },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'story', label: 'Stories', icon: BookOpen },
  ];

  const socialLinks = [
    { href: "https://www.youtube.com/@BarnabyWorld", icon: <Youtube size={24} />, label: "YouTube" },
    { href: "https://www.instagram.com/barnaby_world_offical/", icon: <Instagram size={24} />, label: "Instagram" },
    { href: "https://x.com/BarnabyWorld", icon: <XIcon size={24} />, label: "X (Twitter)" },
    { href: "https://in.pinterest.com/barnabyworld/", icon: <PinterestIcon />, label: "Pinterest" },
    { href: "https://www.threads.com/@barnaby_world_offical", icon: <ThreadsIcon />, label: "Threads" },
    { href: "https://www.facebook.com/profile.php?id=61584156643870", icon: <Facebook size={24} />, label: "Facebook" },
    { href: "https://www.tiktok.com/@barnaby_world_official", icon: <TikTokIcon />, label: "TikTok" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-stone-700 selection:bg-pink-100 overflow-x-hidden font-body">

      {/* Font & Style Injections */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Quicksand:wght@400;500;600;700&display=swap');
          
          :root {
            font-family: 'Quicksand', sans-serif;
          }

          .font-heading {
            font-family: 'Fredoka', sans-serif;
          }

          .font-body {
            font-family: 'Quicksand', sans-serif;
          }

          h1, h2, h3, h4 {
            font-family: 'Fredoka', sans-serif;
          }

          .text-soft-shadow {
            text-shadow: 2px 2px 4px rgba(0,0,0,0.03);
          }

          .rounded-jungle {
            border-radius: 3rem;
          }

          .rounded-jungle-lg {
            border-radius: 4.5rem;
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          @keyframes earWiggle {
            0% { transform: rotate(0deg) scale(1); }
            10% { transform: rotate(-8deg) scale(1.05); }
            20% { transform: rotate(8deg) scale(1.05); }
            30% { transform: rotate(-6deg) scale(1.05); }
            40% { transform: rotate(6deg) scale(1.05); }
            50% { transform: rotate(0deg) scale(1.1); }
            100% { transform: rotate(0deg) scale(1); }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .group:hover .ear-wiggle {
            animation: earWiggle 0.8s ease-in-out forwards;
          }

          /* Branding Gradient Text */
          .brand-gradient {
            background: linear-gradient(135deg, #A855F7 0%, #D946EF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <Cloud size={120} className="absolute top-20 left-10 text-blue-100 opacity-40 animate-float" style={{ animationDelay: '0s' }} />
        <Cloud size={100} className="absolute top-60 right-20 text-pink-100 opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-50 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>
      </div>

      {/* Floating Pill Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 pointer-events-none transition-all duration-300">
        <nav className="max-w-5xl mx-auto bg-white/80 backdrop-blur-2xl border-4 border-white shadow-[0_20px_40px_-15px_rgba(236,72,153,0.15)] rounded-[2.5rem] pointer-events-auto transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.25)]">
          <div className="pl-4 pr-3 py-2 flex justify-between items-center">
            
            {/* Circular Breakout Logo */}
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center group focus:outline-none -my-8 md:-my-10"
            >
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full overflow-hidden border-4 border-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] relative z-20 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3 flex items-center justify-center">
                  <img 
                    src="icon.png" 
                    alt="Barnaby's World" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-2xl scale-50 group-hover:scale-110 transition-transform duration-500 z-10"></div>
              </div>
            </button>

            {/* Desktop Pill Links */}
            <div className="hidden md:flex items-center bg-stone-50/80 p-1.5 rounded-full border border-stone-100/80">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 font-heading rounded-full overflow-hidden group ${
                    activeTab === item.id 
                    ? 'text-pink-600 shadow-sm' 
                    : 'text-stone-400 hover:text-pink-500 hover:bg-white/60'
                  }`}
                >
                  <span className="relative z-10">
                    {item.label}
                  </span>
                  {activeTab === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 z-0 border border-white"></div>
                  )}
                </button>
              ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.youtube.com/@BarnabyWorld" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-bold text-xs uppercase tracking-widest font-heading transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(216,70,239,0.4)] hover:-translate-y-0.5 active:scale-95 border-[3px] border-white group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <Youtube size={18} className="relative z-10" />
                <span className="relative z-10">JOIN TROOP</span>
              </a>
              <button
                className="md:hidden p-3 text-pink-500 bg-pink-50 hover:bg-pink-100 rounded-2xl transition-colors focus:outline-none focus:ring-4 focus:ring-pink-100 border-2 border-white shadow-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <Navigation size={22} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </nav>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-32 left-4 right-4 bg-white/95 backdrop-blur-2xl border-4 border-white shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden transition-all duration-500 origin-top pointer-events-auto ${isMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
          <div className="p-4 flex flex-col gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center justify-between px-6 py-4 rounded-xl font-heading font-bold uppercase tracking-widest text-sm transition-colors ${
                  activeTab === item.id
                  ? 'bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border border-white shadow-sm'
                  : 'text-stone-500 hover:bg-stone-50 hover:text-pink-500 border border-transparent'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <ChevronRight size={18} className="text-pink-400" />}
              </button>
            ))}
            <a 
              href="https://www.youtube.com/@BarnabyWorld" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-4 px-6 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-bold text-xs uppercase tracking-widest font-heading shadow-lg shadow-pink-200/50 active:scale-95 transition-transform border-[3px] border-white"
            >
              <Youtube size={20} />
              JOIN TROOP
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pt-40 pb-12 min-h-screen">

        {activeTab === 'home' && (
          <section className="space-y-32">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-16 pt-10">
              <div className="flex-1 space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-yellow-100/80 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-widest font-heading border border-yellow-200">
                  <Sparkles size={16} /> Exploring the Jolly Jungle
                </div>
                <h1 className="text-6xl md:text-8xl font-bold text-stone-800 leading-[0.9] text-soft-shadow">
                  Welcome to the <br />
                  <span className="text-purple-400">Jolly Jungle</span>
                </h1>
                <p className="text-xl md:text-2xl text-stone-500 max-w-xl leading-relaxed font-medium">
                  A place of low stimulation and high warmth. Where every problem is solved with listening and a gentle wiggle of the ears.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                  <button
                    onClick={() => setActiveTab('characters')}
                    className="px-12 py-6 bg-pink-400 text-white font-bold text-xl rounded-jungle hover:bg-pink-500 transition-all shadow-2xl shadow-pink-200 hover:-translate-y-2 flex items-center gap-4 font-heading active:scale-95"
                  >
                    Meet the Troop <ChevronRight size={24} />
                  </button>
                  <button
                    onClick={() => setActiveTab('story')}
                    className="px-12 py-6 bg-white text-stone-700 font-bold text-xl rounded-jungle border-4 border-stone-50 hover:bg-stone-50 transition-all hover:-translate-y-2 shadow-sm font-heading active:scale-95"
                  >
                    Read a Story
                  </button>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="relative z-10 rounded-jungle-lg overflow-hidden border-[16px] border-white shadow-2xl transition-all duration-1000">
                  <img
                    src="01.png"
                    alt="Barnaby and Daisy"
                    className="w-full h-auto object-cover transform scale-100 hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-100 rounded-full blur-[60px] opacity-60 -z-10"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-100 rounded-full blur-[60px] opacity-60 -z-10"></div>
              </div>
            </div>

            {/* Social Hub */}
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="font-heading font-bold text-sm uppercase tracking-[0.4em] text-stone-300">Official Channels</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {socialLinks.map((link, idx) => (
                  <SocialIcon key={idx} {...link} />
                ))}
              </div>
            </div>

            {/* Highlight Cards */}
            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-16 bg-teal-50 rounded-jungle-lg space-y-8 flex flex-col justify-center border-4 border-white shadow-xl shadow-teal-50/50">
                <h3 className="text-4xl font-bold text-teal-700 italic font-heading">Our World Rules</h3>
                <p className="text-teal-900/60 leading-relaxed text-xl font-medium italic">"Gentle optimism. No sarcasm, no loud sudden noises, just high warmth and soft, tactile textures."</p>
                <div className="flex gap-4">
                  <div className="px-5 py-2 bg-teal-100 text-teal-600 rounded-full text-xs font-bold font-heading">LOW STIM</div>
                  <div className="px-5 py-2 bg-teal-100 text-teal-600 rounded-full text-xs font-bold font-heading">HIGH WARMTH</div>
                </div>
              </div>
              <div className="rounded-jungle-lg overflow-hidden border-8 border-white shadow-2xl h-[400px]">
                <img src="03.png" alt="Pond scene" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'characters' && (
          <section className="space-y-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <h2 className="text-6xl font-bold text-stone-800 tracking-tight font-heading">The Jolly Troop</h2>
              <p className="text-stone-500 text-xl leading-relaxed font-medium">Every friend in the Jungle has a unique story and a special way of helping others.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-36 pt-24 mt-12">
              {characters.map((char, index) => (
                <div key={index} className={`relative p-10 pt-0 rounded-jungle-lg ${char.color} border-4 border-white shadow-xl shadow-stone-200/40 transition-all hover:-translate-y-4 group ${index === characters.length - 1 ? 'md:col-span-2 md:w-[calc(50%-1.5rem)] md:justify-self-center lg:col-span-1 lg:w-full lg:justify-self-stretch lg:col-start-2' : ''}`}>
                  {/* Portrait */}
                  <div className="w-64 h-64 mx-auto -mt-32 bg-white rounded-full border-8 border-white shadow-2xl overflow-hidden relative z-10 transition-transform group-hover:scale-110 duration-500">
                    <img src={char.image} alt={char.name} className="w-full h-full object-cover object-top" />
                  </div>

                  <div className="mt-10 text-center space-y-6">
                    <div>
                      <h3 className="text-4xl font-bold text-stone-800 font-heading">{char.name}</h3>
                      <div className={`text-xs font-bold uppercase tracking-[0.3em] ${char.accent} font-heading mt-1`}>{char.role}</div>
                    </div>

                    <p className="text-stone-700/80 leading-relaxed text-base font-medium min-h-[100px]">
                      {char.description}
                    </p>

                    <div className="pt-6 border-t border-white/50">
                      <div className="flex items-center justify-center gap-3 text-xs font-bold italic text-stone-500 uppercase tracking-widest font-heading">
                        <Sparkles size={16} className={char.accent} />
                        Quirk: {char.quirk}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'gallery' && (
          <section className="space-y-20 animate-in slide-in-from-bottom duration-700">
            <div className="text-center space-y-6">
              <h2 className="text-6xl font-bold text-stone-800 tracking-tight font-heading">Jungle Gallery</h2>
              <p className="text-stone-500 text-xl font-medium">Captured moments of simple, quiet joy.</p>
            </div>

            <div className="columns-1 md:columns-2 gap-12 space-y-12">
              <div className="break-inside-avoid rounded-jungle-lg overflow-hidden border-[12px] border-white shadow-2xl hover:rotate-1 transition-all duration-500">
                <img src="03.png" alt="Pond" className="w-full" />
              </div>
              <div className="break-inside-avoid rounded-jungle-lg overflow-hidden border-[12px] border-white shadow-2xl hover:-rotate-1 transition-all duration-500">
                <img src="02.png" alt="Playtime" className="w-full" />
              </div>
              <div className="break-inside-avoid rounded-jungle-lg overflow-hidden border-[12px] border-white shadow-2xl hover:rotate-1 transition-all duration-500">
                <img src="01.png" alt="Meadow" className="w-full" />
              </div>
              <div className="break-inside-avoid p-16 bg-purple-50 rounded-jungle-lg border-4 border-white shadow-2xl space-y-8 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg text-purple-400">
                  <Music size={40} />
                </div>
                <h4 className="text-3xl font-bold text-purple-700 font-heading tracking-tight">Listen to the Squelch!</h4>
                <p className="text-purple-900/50 font-semibold text-lg italic">"Have you heard Barnaby's boots today? They make the happiest sound in the world when he steps in morning dew."</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'story' && (
          <section className="max-w-4xl mx-auto space-y-20 animate-in fade-in duration-700">
            <div className="text-center space-y-6">
              <h2 className="text-6xl font-bold text-stone-800 tracking-tight font-heading">The Story Spot</h2>
              <p className="text-stone-500 text-xl font-medium">Gentle tales shared around the snack tree.</p>
            </div>

            <article className="bg-white p-16 md:p-24 rounded-jungle-lg shadow-2xl shadow-purple-200/20 border border-stone-100 space-y-16 relative">
              <header className="text-center space-y-8">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-orange-100/50 text-orange-600 rounded-full text-xs font-bold tracking-widest uppercase font-heading border border-orange-200/30">
                  Narrative Spotlight
                </div>
                <h3 className="text-5xl md:text-7xl font-bold text-stone-800 font-heading leading-tight tracking-tight">"The Stuck Balloon"</h3>
              </header>

              <div className="space-y-12 text-xl leading-relaxed text-stone-600 font-medium">
                <div className="flex gap-8 items-start">
                  <div className="shrink-0 w-24 h-24 bg-white rounded-full border-4 border-purple-100 overflow-hidden shadow-md mt-1">
                    <img src="Barnaby.png" alt="B" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="pt-2">
                    <span className="font-heading font-bold text-purple-400 text-sm uppercase tracking-widest block mb-2">Barnaby</span>
                    <p className="text-2xl text-stone-800 font-semibold">"Oh no! My balloon flew away. It is too high for my boots to bounce."</p>
                  </div>
                </div>

                <div className="flex gap-8 items-start">
                  <div className="shrink-0 w-24 h-24 bg-white rounded-full border-4 border-teal-100 overflow-hidden shadow-md mt-1">
                    <img src="Tula.png" alt="T" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="pt-2">
                    <span className="font-heading font-bold text-teal-400 text-sm uppercase tracking-widest block mb-2">Tula</span>
                    <p className="italic text-stone-400 font-medium text-lg mb-2">(Whispering from inside her shell)</p>
                    <p className="text-2xl text-stone-800 font-semibold">"It is very high. Maybe we should just wave goodbye to it?"</p>
                  </div>
                </div>

                <div className="py-12 border-y border-stone-50 text-center">
                  <p className="text-3xl font-bold text-stone-300 italic font-heading tracking-widest uppercase">The friends look up...</p>
                </div>

                <div className="flex gap-8 items-start">
                  <div className="shrink-0 w-24 h-24 bg-white rounded-full border-4 border-yellow-100 overflow-hidden shadow-md mt-1">
                    <img src="Gemma.png" alt="G" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="pt-2">
                    <span className="font-heading font-bold text-yellow-600 text-sm uppercase tracking-widest block mb-2">Gemma</span>
                    <p className="text-2xl text-stone-800 font-semibold">"I am tall! But... my knees are knobby today."</p>
                  </div>
                </div>

                <div className="bg-green-50/50 p-12 rounded-jungle text-center space-y-6 border-4 border-white shadow-xl shadow-green-100/30">
                  <div className="flex justify-center gap-4 text-4xl">🎈✨</div>
                  <p className="text-3xl font-bold text-green-700 font-heading">Gemma nudges the balloon with her nose. It floats down!</p>
                  <p className="text-6xl font-black text-green-400 font-heading tracking-tighter uppercase">Hooray!</p>
                </div>

                <div className="text-center pt-10">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full border-4 border-purple-200 overflow-hidden shadow-lg animate-float">
                    <img src="Barnaby.png" alt="Barnaby" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-4xl font-bold text-purple-400 italic font-heading tracking-tight leading-tight">
                    "Squish squash! <br />
                    Teamwork tastes yummy!"
                  </p>
                </div>
              </div>
            </article>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white mt-40 pt-24 pb-16 px-6 border-t border-stone-100 relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-16">

          <div className="flex flex-col items-center gap-6">
            <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-purple-50 shadow-xl">
              <img src="Barnaby.png" alt="Logo" className="w-full h-full object-cover object-top" />
            </div>
            <div className="text-center">
              <h2 className="font-heading font-bold text-3xl text-stone-800 tracking-tight">Barnaby's World</h2>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-[0.5em] mt-2">Jolly Jungle Studios</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-16 text-stone-400 text-sm font-bold uppercase tracking-[0.2em] font-heading">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className="hover:text-pink-400 transition-all hover:tracking-[0.3em]">
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, idx) => (
              <a key={idx} href={link.href} target="_blank" className="p-4 bg-stone-50 text-stone-400 rounded-3xl hover:bg-pink-50 hover:text-pink-400 transition-all shadow-sm">
                {link.icon}
              </a>
            ))}
          </div>

          <div className="pt-16 border-t border-stone-50 w-full text-center">
            <p className="text-stone-300 text-[11px] font-bold uppercase tracking-[0.5em] font-heading leading-loose">
              Low Stimulation • High Warmth <br />
              Made with Love in the Jolly Jungle
            </p>
          </div>
        </div>
      </footer>

      {/* Signature Button (Squelch!) */}
      <div className="fixed bottom-10 left-10 z-50">
        <button
          onClick={() => {
            alert("Squelch-squelch! (Barnaby's boots sound extra soft today!)");
          }}
          className="w-24 h-24 bg-[#FCD34D] rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(252,211,77,0.3)] hover:scale-110 active:scale-95 transition-all group border-4 border-white overflow-hidden"
          title="Press for a Squelch!"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <Music className="text-white group-hover:rotate-12 transition-transform relative z-10" size={32} />
        </button>
      </div>
    </div>
  );
}