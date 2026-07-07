import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ScrambleIn } from './components/ScrambleText';
import { ConnectAILabLogo } from './components/ConnectAILabLogo';
import { SITE_CONFIG } from './config/content';
import { StoryEvaluatorSimulator } from './components/StoryEvaluatorSimulator';
import { StoryArchiveSection } from './components/StoryArchiveSection';
import { FinanceDashboardSection } from './components/FinanceDashboardSection';
import { ReviewSection } from './components/ReviewSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);



  useEffect(() => {
    // 600ms 후 진입 상태 활성화
    const timer = setTimeout(() => {
      setEntranceComplete(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  /* ── Section 2 scroll-driven 3D text ── */
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });
  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const textOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const transform3D = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  /* ── Destructure config for readability ── */
  const { hero, cinematic, footer } = SITE_CONFIG;

  return (
    <div>
      <Navbar entranceComplete={entranceComplete} />

      {/* ════════════════ SECTION 1: HERO ════════════════ */}
      <section className="relative h-screen h-[100dvh] flex flex-col overflow-hidden bg-gradient-to-b from-[#2B1B17] via-[#19100E] to-[#120B0A]">
        {/* 장식용 네온 원형 글로우 */}
        <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-warmAmber-500/[0.06] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-roseGold-500/[0.06] blur-[150px] pointer-events-none" />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.03,
          }}
        />

        {/* Watermark text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ paddingTop: 50 }}
        >
          <span
            className="uppercase select-none"
            style={{
              fontFamily: '"Anton SC", sans-serif',
              fontSize: 'clamp(120px, 30vw, 521px)',
              letterSpacing: '-4px',
              opacity: 0.08,
              background:
                'radial-gradient(circle, rgba(224,168,153,0.12) 0%, rgba(224,168,153,0) 70%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              lineHeight: 1,
            }}
          >
            {hero.watermark}
          </span>
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-20 flex flex-col flex-1 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex-1" />

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* Left column */}
            <div className="flex flex-col gap-4">
              <h1
                className="text-warmAmber-400 font-extrabold leading-[1.05] tracking-[-0.03em]"
                style={{ 
                   fontSize: 'clamp(36px, 8vw, 84px)',
                   textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 8px 16px rgba(0,0,0,0.8), 0 0 20px rgba(217,138,41,0.25)'
                }}
              >
                <ScrambleIn text={hero.titleLeft[0]} delay={200} triggered={entranceComplete} />
                <br />
                <span className="font-semibold text-white/95 block mt-1" style={{ fontSize: '0.65em', textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 6px 12px rgba(0,0,0,0.8)' }}>
                  <ScrambleIn text={hero.titleLeft[1]} delay={500} triggered={entranceComplete} />
                </span>
              </h1>

              <motion.p
                className="max-w-md text-[13px] sm:text-[15px] text-white/95 leading-relaxed font-normal bg-black/40 backdrop-blur-[4px] p-4 rounded-xl border border-white/10"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                }}
                initial={{ opacity: 0, y: 25 }}
                animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  ease: [0.215, 0.61, 0.355, 1.0],
                  delay: 0.2,
                }}
              >
                {hero.description}
              </motion.p>
            </div>

            {/* Right heading */}
            <h1
              className="text-roseGold-400 font-extrabold leading-[1.05] tracking-[-0.03em] text-left md:text-right"
              style={{ 
                fontSize: 'clamp(36px, 8vw, 84px)',
                textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 8px 16px rgba(0,0,0,0.8), 0 0 20px rgba(224,168,153,0.25)'
              }}
            >
              <ScrambleIn text={hero.titleRight[0]} delay={700} triggered={entranceComplete} />
              <br />
              <span className="font-semibold text-white/95 block mt-1" style={{ fontSize: '0.65em', textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 6px 12px rgba(0,0,0,0.8)' }}>
                <ScrambleIn text={hero.titleRight[1]} delay={1000} triggered={entranceComplete} />
              </span>
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ════════════════ SECTION 2: CINEMATIC TEXT ════════════════ */}
      <section
        ref={section2Ref}
        className="relative h-screen h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0B0807]"
      >
        {/* 장식용 네온 원형 글로우 */}
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-roseGold-500/[0.04] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-warmAmber-500/[0.04] blur-[140px] pointer-events-none" />
        {/* Top gradient overlay */}
        <div
          className="absolute top-0 left-0 right-0 z-10"
          style={{
            height: 180,
            background: 'linear-gradient(to bottom, #1A110E, transparent)',
          }}
        />

        {/* 3D text content */}
        <div className="relative z-20 max-w-5xl mx-auto" style={{ perspective: 400 }}>
          <motion.p
            className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center"
            style={{
              transform: transform3D,
              opacity: textOpacity,
            }}
          >
            {cinematic.text}
          </motion.p>
        </div>
      </section>

      {/* ════════════════ SECTION 3: STORY JUDGEMENT & MEMBERSHIP SIMULATOR ════════════════ */}
      <section className="relative min-h-screen bg-[#1A110E] py-24 px-6 flex flex-col justify-center items-center overflow-hidden border-t border-b border-white/5">
        {/* 장식용 은은한 글로우 라이팅 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-roseGold-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-warmAmber-500/5 blur-[120px] pointer-events-none" />

        <div className="relative z-20 max-w-6xl w-full mx-auto">
          {/* 타이틀 헤더 */}
          <div className="text-center mb-16">
            <h2 className="text-[14px] tracking-[0.2em] text-roseGold-400 font-semibold uppercase mb-4">
              AI REALTIME GENERATION PIPELINE
            </h2>
            <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-6">
              사연 AI 가치 판별 & 이미지/영상 자동화
            </h3>
            <p className="text-white/55 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              사연을 입력하면 AI가 내용을 판별하여 칭찬 또는 훈계 결과를 도출합니다. <br />
              <strong className="text-white">회원 등급</strong>에 따라 실시간 반영되는 이미지와 시네마틱 숏폼 영상 제작을 시뮬레이션해 보세요.
            </p>
          </div>

          {/* 3단 시뮬레이터 카드 컴포넌트 */}
          <StoryEvaluatorSimulator />
        </div>
      </section>

      {/* ════════════════ SECTION 4: STORY ARCHIVE ════════════════ */}
      <StoryArchiveSection />

      {/* ════════════════ SECTION 5: FINANCE DASHBOARD ════════════════ */}
      <FinanceDashboardSection />

      {/* ════════════════ SECTION 6: USER REVIEWS ════════════════ */}
      <ReviewSection />

      {/* ════════════════ SECTION 7: PRICING / SUPPORT ════════════════ */}
      <PricingSection />

      {/* ════════════════ SECTION 8: FAQ ════════════════ */}
      <FAQSection />

      {/* ════════════════ SECTION 9: FOOTER ════════════════ */}
      <footer className="bg-[#120B0A] overflow-hidden border-t border-white/5">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          {/* Left: Brand Identity Block with Warm Glow */}
          <div className="md:w-1/2 h-[200px] md:h-auto relative bg-gradient-to-br from-[#1E1310] to-[#120B0A] flex items-center justify-center overflow-hidden border-r border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-roseGold-500/[0.04] blur-[100px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-60 h-60 rounded-full bg-warmAmber-500/[0.03] blur-[80px] pointer-events-none" />
            <span
              className="text-[48px] sm:text-[64px] font-extrabold uppercase select-none tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-roseGold-400/20 via-warmAmber-400/10 to-transparent"
              style={{ fontFamily: '"Anton SC", sans-serif' }}
            >
              PRAISE LAB
            </span>
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <ConnectAILabLogo size={18} className="text-white/70" />
                <span className="text-[15px] font-medium text-white/70 tracking-tight">
                  {SITE_CONFIG.brandName}
                </span>
              </div>
              <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
                {footer.tagline}
              </p>
            </div>

            <p className="text-white/25 text-[12px] mt-12">
              {SITE_CONFIG.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
