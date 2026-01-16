import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scissors, Calendar, Instagram, Facebook, MapPin, Phone, 
  Sparkles, Star, ArrowRight, Menu, X, Mail, CheckCircle, Clock
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={cn("relative py-20 px-6 md:px-12 lg:px-24 overflow-hidden", className)}>
    {children}
  </section>
);

const GlassCard = ({ children, className, hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) => (
  <motion.div 
    whileHover={hover ? { y: -10, boxShadow: "0 25px 50px -12px rgba(217, 70, 239, 0.15)" } : {}}
    className={cn(
      "glass-panel rounded-3xl p-8 transition-all duration-300",
      className
    )}
  >
    {children}
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', service: 'cut', date: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('loading');
    try {
      const { error } = await supabase.from('app_b55f6_appointments').insert([
        { 
          name: bookingForm.name, 
          email: bookingForm.email, 
          service: bookingForm.service,
          booking_date: new Date(bookingForm.date).toISOString()
        }
      ]);
      if (error) throw error;
      setBookingStatus('success');
      setTimeout(() => setBookingStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setBookingStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white overflow-x-hidden selection:bg-fuchsia-500">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-fuchsia-500" />
            <span className="text-2xl font-display font-bold tracking-tighter">CHROMA</span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center font-medium text-sm text-slate-300">
            <a href="#services" className="hover:text-fuchsia-400 transition-colors">Services</a>
            <a href="#gallery" className="hover:text-fuchsia-400 transition-colors">Gallery</a>
            <a href="#about" className="hover:text-fuchsia-400 transition-colors">About</a>
            <a 
              href="#book" 
              className="px-6 py-2 rounded-full bg-fuchsia-500 text-white font-bold hover:bg-fuchsia-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(217,70,239,0.5)]"
            >
              Book Now
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-display font-bold">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#book" onClick={() => setIsMenuOpen(false)} className="text-fuchsia-500">Book Appointment</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 text-xs font-bold tracking-wider mb-6">
              <Sparkles className="w-3 h-3" />
              AWARD WINNING SALON
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold leading-[0.9] tracking-tight mb-8">
              YOUR STYLE <br />
              <span className="text-gradient">REDEFINED.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-md leading-relaxed">
              Experience the intersection of high fashion and precise craftsmanship. Where every cut is a statement and every color is a masterpiece.
            </p>
            <div className="flex gap-4">
              <a href="#book" className="px-8 py-4 bg-fuchsia-600 rounded-full font-bold text-lg hover:bg-fuchsia-500 transition-all hover:scale-105 shadow-[0_0_40px_rgba(217,70,239,0.3)] flex items-center gap-2">
                Book Appointment <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <div className="relative h-[600px] hidden md:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
               {/* Main Hero Image */}
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1974&auto=format&fit=crop" 
                  alt="Fashion Model" 
                  className="w-full h-full object-cover filter brightness-75 hover:scale-110 transition-transform duration-[2s]"
                />
                {/* Floating Glass Card */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute bottom-8 left-8 glass-panel p-4 rounded-2xl flex items-center gap-4 max-w-xs"
                >
                  <div className="w-12 h-12 rounded-full bg-fuchsia-500 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <p className="font-bold">Top Rated</p>
                    <p className="text-xs text-slate-300">5.0 Stars on Google Reviews</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES BENTO GRID */}
      <Section id="services">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Services</h2>
          <p className="text-slate-400">Precision, Artistry, and Care.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
          {/* Large Card */}
          <GlassCard className="md:col-span-2 md:row-span-2 relative group overflow-hidden flex flex-col justify-end">
            <img 
              src="https://images.unsplash.com/photo-1620331317329-dd1096ebf480?q=80&w=1000&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-3xl font-display font-bold mb-2">Signature Cuts</h3>
              <p className="text-slate-300">From classic fades to avant-garde sculpting. Tailored to your face shape.</p>
              <span className="inline-block mt-4 text-fuchsia-400 font-bold">Starting at $50</span>
            </div>
          </GlassCard>

          {/* Tall Card */}
          <GlassCard className="md:col-span-1 md:row-span-2 relative group overflow-hidden">
             <div className="absolute inset-0 bg-fuchsia-900/20 group-hover:bg-fuchsia-900/40 transition-colors" />
             <Sparkles className="w-10 h-10 text-fuchsia-500 mb-6" />
             <h3 className="text-2xl font-display font-bold mb-4">Color & Balayage</h3>
             <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Vivid transformations using premium organic dyes. 
                We specialize in correcting and creative coloring.
             </p>
             <ul className="space-y-2 text-sm text-slate-300">
               <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-fuchsia-500"/> Full Color</li>
               <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-fuchsia-500"/> Highlights</li>
               <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-fuchsia-500"/> Color Correction</li>
             </ul>
          </GlassCard>

          {/* Standard Cards */}
          <GlassCard className="flex flex-col justify-between group">
            <div className="p-3 bg-white/5 rounded-xl w-fit group-hover:bg-fuchsia-500 transition-colors">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Styling</h4>
              <p className="text-sm text-slate-400 mt-2">Blowouts, Updos & Event Styling</p>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between group">
            <div className="p-3 bg-white/5 rounded-xl w-fit group-hover:bg-fuchsia-500 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Treatments</h4>
              <p className="text-sm text-slate-400 mt-2">Keratin, Scalp Detox & Hydration</p>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* BOOKING SECTION */}
      <Section id="book" className="bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-display font-bold mb-4">Book Your Session</h2>
                <p className="text-slate-400 mb-8">Ready to transform? Select a date and let us handle the rest.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-fuchsia-500" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Downtown Studio</p>
                      <p className="text-sm">123 Fashion Ave, NY</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-fuchsia-500" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Contact Us</p>
                      <p className="text-sm">+1 (555) 000-1234</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-fuchsia-500" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Opening Hours</p>
                      <p className="text-sm">Tue - Sat: 10am - 8pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-fuchsia-500 transition-all"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Service</label>
                    <select 
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-fuchsia-500 transition-all text-slate-300"
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                    >
                      <option value="cut">Haircut</option>
                      <option value="color">Color</option>
                      <option value="style">Styling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-300">Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-fuchsia-500 transition-all text-slate-300"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  disabled={bookingStatus === 'loading'}
                  className="w-full bg-fuchsia-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-fuchsia-500 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bookingStatus === 'loading' ? 'Confirming...' : 
                   bookingStatus === 'success' ? 'Booked Successfully!' : 
                   'Confirm Appointment'}
                </button>
                {bookingStatus === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Try again.</p>}
              </form>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-slate-950 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/10 to-transparent pointer-events-none" />
         <div className="relative z-10">
            <h2 className="text-9xl font-display font-black text-white/5 tracking-tighter select-none">CHROMA</h2>
            <div className="flex justify-center gap-6 -mt-12">
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-fuchsia-500 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-fuchsia-500 hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-fuchsia-500 hover:text-white transition-all"><Mail className="w-5 h-5" /></a>
            </div>
            <p className="text-slate-500 text-sm mt-8">© 2024 CHROMA Salon. Designed for the bold.</p>
         </div>
      </footer>
    </div>
  );
}
