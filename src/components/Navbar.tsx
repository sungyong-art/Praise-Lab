import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectAILabLogo } from './ConnectAILabLogo';
import { SquashHamburger } from './SquashHamburger';
import { ScrambleText } from './ScrambleText';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { SITE_CONFIG } from '../config/content';


interface NavbarProps {
  entranceComplete: boolean;
}

export function Navbar({ entranceComplete }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [metricsHovered, setMetricsHovered] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, signOut } = useAuth();

  const scrollTo = (y: number) => {
    window.scrollTo({ top: y, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ===== DESKTOP ===== */}
        <div className="hidden sm:flex items-center justify-between w-full">
          {/* Left group */}
          <div className="flex items-center gap-2">
            {/* Logo pill */}
            <motion.div
              className={`h-12 px-5 bg-aura-surface-container/60 backdrop-blur-md border border-aura-outline-variant/30 rounded-full flex items-center gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(152,70,35,0.04)] ${
                menuOpen ? 'hidden md:flex' : 'flex'
              }`}
              whileHover={{ scale: 1.02, backgroundColor: '#fce3da' }}
              whileTap={{ scale: 0.98 }}
            >
              <ConnectAILabLogo size={18} className="text-aura-primary" />
              <span className="text-[16px] font-semibold tracking-tight text-aura-on-surface">
                {SITE_CONFIG.brandName}
              </span>
            </motion.div>

            {/* Expanding menu pill */}
            <motion.div
              className="h-12 rounded-full bg-aura-surface-container/60 backdrop-blur-md border border-aura-outline-variant/30 flex items-center overflow-hidden shadow-[0_4px_20px_rgba(152,70,35,0.04)]"
              animate={{ width: menuOpen ? 290 : 48 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              {/* Hamburger button */}
              <motion.button
                className="flex items-center justify-center shrink-0 cursor-pointer border-none"
                style={{
                  width: menuOpen ? 36 : 48,
                  height: menuOpen ? 36 : 48,
                  borderRadius: 9999,
                  backgroundColor: menuOpen ? '#f6ddd5' : 'transparent',
                  marginLeft: menuOpen ? 6 : 0,
                }}
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ backgroundColor: menuOpen ? '#fce3da' : '#f6ddd5' }}
              >
                <SquashHamburger isOpen={menuOpen} />
              </motion.button>

              {/* Nav links */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="flex items-center gap-6 ml-4 whitespace-nowrap"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25 }}
                  >
                    <button
                      className="text-[15px] font-medium text-aura-on-surface/80 hover:text-aura-primary transition-colors cursor-pointer bg-transparent border-none"
                      onMouseEnter={() => setAboutHovered(true)}
                      onMouseLeave={() => setAboutHovered(false)}
                      onClick={() => scrollTo(window.innerHeight)}
                    >
                      <ScrambleText text="About" isHovered={aboutHovered} />
                    </button>
                    <button
                      className="text-[15px] font-medium text-aura-on-surface/80 hover:text-aura-primary transition-colors cursor-pointer bg-transparent border-none"
                      onMouseEnter={() => setMetricsHovered(true)}
                      onMouseLeave={() => setMetricsHovered(false)}
                      onClick={() => scrollTo(window.innerHeight * 2)}
                    >
                      <ScrambleText text="Metrics" isHovered={metricsHovered} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-2">
            {/* Sign In / User button */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="h-12 px-5 bg-aura-surface-container/60 backdrop-blur-md border border-aura-outline-variant/30 rounded-full flex items-center gap-3 shadow-[0_4px_20px_rgba(152,70,35,0.04)]">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-aura-primary/10 flex items-center justify-center text-aura-primary text-[12px] font-bold">
                      {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                    </div>
                  )}
                  <span className="text-[14px] text-aura-on-surface/90 font-medium max-w-[120px] truncate">
                    {user.displayName || user.email?.split('@')[0] || 'User'}
                  </span>
                  <button
                    onClick={signOut}
                    className="text-[12px] text-aura-on-surface/50 hover:text-aura-primary transition-colors cursor-pointer bg-transparent border-none ml-1 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <motion.button
                className="h-12 px-5 bg-aura-surface-container/60 backdrop-blur-md border border-aura-outline-variant/30 rounded-full flex items-center gap-2 cursor-pointer text-aura-on-surface/95 text-[15px] font-semibold hover:bg-aura-surface-high/70 transition-colors shadow-[0_4px_20px_rgba(152,70,35,0.04)]"
                whileTap={{ scale: 0.97 }}
                onClick={() => setAuthOpen(true)}
              >
                Sign In
              </motion.button>
            )}

            {/* Download button */}
            <motion.button
              className="h-12 px-6 bg-gradient-to-b from-aura-primary-container to-aura-secondary-container text-white rounded-full flex items-center gap-2.5 cursor-pointer border-none shadow-[0_6px_20px_rgba(152,70,35,0.15)] font-bold text-[15px]"
              whileHover={{ y: -2, scale: 1.02, boxShadow: '0 8px 24px rgba(152,70,35,0.2)' }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => setDownloadHovered(true)}
              onMouseLeave={() => setDownloadHovered(false)}
            >
              <i className="bi bi-tools text-white text-[16px]" />
              <span className="text-white">
                <ScrambleText text="공사중" isHovered={downloadHovered} />
              </span>
            </motion.button>
          </div>
        </div>

        {/* ===== MOBILE ===== */}
        <div className="flex sm:hidden items-center justify-between w-full">
          {/* Left group */}
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            {/* Logo pill (collapses when menu open) */}
            <motion.div
              className="h-9 px-3 bg-aura-surface-container/60 backdrop-blur-md border border-aura-outline-variant/30 rounded-full flex items-center gap-2 overflow-hidden shrink-0"
              animate={{ width: menuOpen ? 0 : 'auto', opacity: menuOpen ? 0 : 1, paddingLeft: menuOpen ? 0 : 12, paddingRight: menuOpen ? 0 : 12 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <ConnectAILabLogo size={14} className="text-aura-primary shrink-0" />
              <span className="text-[13px] font-bold tracking-tight text-aura-on-surface whitespace-nowrap">
                {SITE_CONFIG.brandName}
              </span>
            </motion.div>

            {/* Expanding menu capsule */}
            <motion.div
              className="h-9 rounded-full bg-aura-surface-container/60 backdrop-blur-md border border-aura-outline-variant/30 flex items-center overflow-hidden"
              animate={{ width: menuOpen ? '100%' : 44 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              {/* Hamburger Toggle */}
              <button
                className="w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer border-none bg-transparent rounded-full"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <SquashHamburger isOpen={menuOpen} isMobile />
              </button>

              {/* Menu items */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="flex items-center gap-4 ml-2 whitespace-nowrap overflow-x-auto no-scrollbar pr-4"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <button
                      className="text-[13px] font-semibold text-aura-on-surface/85 hover:text-aura-primary transition-colors cursor-pointer bg-transparent border-none"
                      onClick={() => scrollTo(window.innerHeight)}
                    >
                      About
                    </button>
                    <button
                      className="text-[13px] font-semibold text-aura-on-surface/85 hover:text-aura-primary transition-colors cursor-pointer bg-transparent border-none"
                      onClick={() => scrollTo(window.innerHeight * 2)}
                    >
                      Metrics
                    </button>

                    {/* Mobile user action inside capsule */}
                    {user ? (
                      <div className="flex items-center gap-2">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full object-cover" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-aura-primary/10 flex items-center justify-center text-aura-primary text-[10px] font-bold">
                            {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                          </div>
                        )}
                        <span className="text-[12px] text-aura-on-surface/90 font-medium truncate max-w-[80px]">
                          {user.displayName || user.email?.split('@')[0]}
                        </span>
                        <button
                          onClick={signOut}
                          className="text-[11px] text-aura-on-surface/50 hover:text-aura-primary cursor-pointer bg-transparent border-none font-bold"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-[13px] font-semibold text-aura-on-surface/85 hover:text-aura-primary cursor-pointer bg-transparent border-none"
                        onClick={() => setAuthOpen(true)}
                      >
                        Sign In
                      </button>
                    )}

                    {/* Download button inside capsule */}
                    <motion.button
                      className="h-7 px-3 bg-gradient-to-r from-aura-primary-container to-aura-secondary-container text-white rounded-full flex items-center gap-1.5 cursor-pointer border-none shrink-0"
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="bi bi-tools text-white text-[11px]" />
                      <span className="text-white text-[11px] font-bold">공사중</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
