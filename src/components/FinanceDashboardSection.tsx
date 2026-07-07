import { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { SITE_CONFIG } from '../config/content';

// 카운트업 애니메이션 텍스트 컴포넌트
function CountUpText({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString()}원</span>;
}

export function FinanceDashboardSection() {
  const { financeDashboard } = SITE_CONFIG;
  const [selectedCategory, setSelectedCategory] = useState('전체');

  if (!financeDashboard) return null;

  // 요구사항에 명시된 기본 금액 수치 (고정)
  const totalSourced = 150000;   // 누적 후원금액
  const totalUsed = 100000;      // 누적 사용금액
  const currentBalance = 50000;   // 현 후원금액 (누적 - 사용)

  const categories = ['전체', 'AI 인프라', '사회 기부', '운영비'];

  // 카테고리별 필터링
  const filteredHistory = financeDashboard.usageHistory.filter((item) => {
    if (selectedCategory === '전체') return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 px-4 sm:px-6">
      {/* 뒷배경 딥 코코아 그레이디언트 적용 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0807] to-[#120B0A] z-10" />
      
      {/* 도트 그리드 장식 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-20 max-w-6xl w-full mx-auto">
        {/* 상단 헤더 */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            className="text-[12px] sm:text-[13px] tracking-[0.25em] text-roseGold-400 font-semibold uppercase mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {financeDashboard.subtitle}
          </motion.p>
          <motion.h2
            className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {financeDashboard.title}
          </motion.h2>
          <motion.p
            className="text-white/50 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {financeDashboard.description}
          </motion.p>
        </div>

        {/* 2. 3대 핵심 재정 메트릭 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {/* 누적 후원금액 카드 */}
          <motion.div
            className="relative bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-roseGold-400/40 transition-colors duration-500 rounded-2xl p-6 sm:p-8 flex flex-col shadow-2xl group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-roseGold-400/40 via-roseGold-400/10 to-transparent" />
            <span className="text-white/40 text-[11px] tracking-[0.15em] uppercase mb-4 block font-medium">
              TOTAL SOURCED
            </span>
            <div className="text-white font-light tracking-tight leading-none text-[36px] sm:text-[42px] mb-2 group-hover:text-roseGold-300 transition-colors">
              <CountUpText value={totalSourced} />
            </div>
            <p className="text-white/45 text-[12.5px] leading-relaxed">
              칭찬연구소에 모금된 총 누적 후원액입니다. (구독금은 50%만 산정)
            </p>
          </motion.div>

          {/* 누적 사용금액 카드 */}
          <motion.div
            className="relative bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-warmAmber-500/40 transition-colors duration-500 rounded-2xl p-6 sm:p-8 flex flex-col shadow-2xl group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-warmAmber-500/40 via-warmAmber-500/10 to-transparent" />
            <span className="text-white/40 text-[11px] tracking-[0.15em] uppercase mb-4 block font-medium">
              TOTAL DISBURSED
            </span>
            <div className="text-white font-light tracking-tight leading-none text-[36px] sm:text-[42px] mb-2 group-hover:text-warmAmber-400 transition-colors">
              <CountUpText value={totalUsed} />
            </div>
            <p className="text-white/45 text-[12.5px] leading-relaxed">
              AI 비디오/이미지 생성 인프라 구축 및 공익 기부 등에 사용된 총 금액입니다.
            </p>
          </motion.div>

          {/* 현 후원금액 (가용 잔액) 카드 */}
          <motion.div
            className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/15 hover:border-warmAmber-400/50 transition-colors duration-500 rounded-2xl p-6 sm:p-8 flex flex-col shadow-2xl group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-warmAmber-400/50 via-roseGold-400/20 to-transparent" />
            <span className="text-warmAmber-400 text-[11px] tracking-[0.15em] uppercase mb-4 block font-semibold">
              CURRENT BALANCE
            </span>
            <div className="text-warmAmber-400 font-extrabold tracking-tight leading-none text-[36px] sm:text-[42px] mb-2 drop-shadow-[0_0_12px_rgba(217,138,41,0.3)]">
              <CountUpText value={currentBalance} />
            </div>
            <p className="text-white/50 text-[12.5px] leading-relaxed">
              누적 후원금액에서 사용금액을 제한 실시간 가용 잔액(현 후원금액)입니다.
            </p>
          </motion.div>
        </div>

        {/* 3. 사용내역 타임라인/카드형 리스트 및 카테고리 필터 */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/5">
            <h3 className="text-white font-semibold text-[17px] sm:text-[18px]">
              📋 집행 사용 내역 상세 원장
            </h3>
            
            {/* 카테고리 필터 탭 */}
            <div className="flex flex-wrap gap-1.5 bg-black/40 p-1 border border-white/5 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-[12.5px] font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-white/10 text-white shadow-md'
                      : 'text-white/45 hover:text-white/80 hover:bg-white/[0.02]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 사용내역 카드 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredHistory.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-5 rounded-xl flex justify-between items-center transition-all duration-300 relative group overflow-hidden"
                >
                  {/* 카드 내부 포인트 장식 */}
                  <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-roseGold-400/20 to-transparent group-hover:from-roseGold-400/50 transition-colors" />

                  <div className="flex flex-col gap-1.5 pl-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11.5px] text-white/35 font-semibold">
                        {item.date}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        item.category === 'AI 인프라'
                          ? 'bg-warmAmber-500/10 text-warmAmber-400 border border-warmAmber-500/15'
                          : item.category === '사회 기부'
                          ? 'bg-roseGold-500/10 text-roseGold-400 border border-roseGold-500/15'
                          : 'bg-stone-500/10 text-stone-400 border border-stone-500/15'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-white text-[13.5px] sm:text-[14px] font-semibold break-keep">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-white/20 tracking-wider">
                      TX: {item.txHash}
                    </span>
                  </div>

                  <div className="text-right flex flex-col justify-center">
                    <span className="text-[10px] text-white/30 tracking-[0.05em] uppercase font-medium">
                      Amount
                    </span>
                    <span className="text-white text-[16px] sm:text-[18px] font-extrabold group-hover:text-roseGold-300 transition-colors">
                      -{item.amount.toLocaleString()}원
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
