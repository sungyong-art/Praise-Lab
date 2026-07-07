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
    <section className="relative bg-aura-surface py-24 sm:py-32 px-4 sm:px-6 overflow-hidden border-b border-aura-outline-variant/30">
      {/* 도트 그리드 장식 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-20 max-w-6xl w-full mx-auto">
        {/* 상단 헤더 */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            className="text-[12px] sm:text-[13px] tracking-[0.25em] text-aura-primary font-bold uppercase mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {financeDashboard.subtitle}
          </motion.p>
          <motion.h2
            className="text-aura-on-surface text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-none mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {financeDashboard.title}
          </motion.h2>
          <motion.p
            className="text-aura-on-surface-variant text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
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
            className="relative bg-white border border-aura-outline-variant/30 hover:border-aura-outline transition-all duration-500 rounded-2xl p-6 sm:p-8 flex flex-col shadow-[0_10px_35px_rgba(152,70,35,0.02)] group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-aura-primary/40 via-aura-primary/10 to-transparent" />
            <span className="text-aura-on-surface-variant/70 text-[11px] tracking-[0.15em] uppercase mb-4 block font-bold">
              TOTAL SOURCED
            </span>
            <div className="text-aura-on-surface font-serif font-bold tracking-tight leading-none text-[32px] sm:text-[36px] mb-2 group-hover:text-aura-primary transition-colors">
              <CountUpText value={totalSourced} />
            </div>
            <p className="text-aura-on-surface-variant text-[12.5px] leading-relaxed font-normal">
              칭찬연구소에 모금된 총 누적 후원액입니다. (구독금은 50%만 산정)
            </p>
          </motion.div>

          {/* 누적 사용금액 카드 */}
          <motion.div
            className="relative bg-white border border-aura-outline-variant/30 hover:border-aura-outline transition-all duration-500 rounded-2xl p-6 sm:p-8 flex flex-col shadow-[0_10px_35px_rgba(152,70,35,0.02)] group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-aura-secondary-container/40 via-aura-secondary-container/10 to-transparent" />
            <span className="text-aura-on-surface-variant/70 text-[11px] tracking-[0.15em] uppercase mb-4 block font-bold">
              TOTAL DISBURSED
            </span>
            <div className="text-aura-on-surface font-serif font-bold tracking-tight leading-none text-[32px] sm:text-[36px] mb-2 group-hover:text-aura-secondary transition-colors">
              <CountUpText value={totalUsed} />
            </div>
            <p className="text-aura-on-surface-variant text-[12.5px] leading-relaxed font-normal">
              AI 비디오/이미지 생성 인프라 구축 및 공익 기부 등에 사용된 총 금액입니다.
            </p>
          </motion.div>

          {/* 현 후원금액 (가용 잔액) 카드 */}
          <motion.div
            className="relative bg-white border border-aura-outline-variant/30 hover:border-aura-outline transition-all duration-500 rounded-2xl p-6 sm:p-8 flex flex-col shadow-[0_10px_35px_rgba(152,70,35,0.02)] group overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-aura-primary/50 via-aura-primary-container/20 to-transparent" />
            <span className="text-aura-primary text-[11px] tracking-[0.15em] uppercase mb-4 block font-bold">
              CURRENT BALANCE
            </span>
            <div className="text-aura-primary font-serif font-bold tracking-tight leading-none text-[32px] sm:text-[36px] mb-2">
              <CountUpText value={currentBalance} />
            </div>
            <p className="text-aura-on-surface-variant/80 text-[12.5px] leading-relaxed font-normal">
              누적 후원금액에서 사용금액을 제한 실시간 가용 잔액(현 후원금액)입니다.
            </p>
          </motion.div>
        </div>

        {/* 3. 사용내역 타임라인/카드형 리스트 및 카테고리 필터 */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-aura-outline-variant/30">
            <h3 className="text-aura-on-surface font-bold text-[17px] sm:text-[18px]">
              📋 집행 사용 내역 상세 원장
            </h3>
            
            {/* 카테고리 필터 탭 */}
            <div className="flex flex-wrap gap-1.5 bg-[#F5F0EA] p-1 border border-aura-outline-variant/60 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-[12.5px] transition-all duration-300 border-none cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-aura-primary shadow-sm font-bold'
                      : 'text-aura-on-surface-variant/60 hover:text-aura-on-surface hover:bg-white/30'
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
                  className="bg-white border border-aura-outline-variant/30 hover:border-aura-outline p-5 rounded-xl flex justify-between items-center transition-all duration-300 relative group overflow-hidden shadow-sm"
                >
                  {/* 카드 내부 포인트 장식 */}
                  <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-aura-primary/30 to-transparent group-hover:from-aura-primary/75 transition-colors" />

                  <div className="flex flex-col gap-1.5 pl-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11.5px] text-aura-on-surface-variant/70 font-bold">
                        {item.date}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        item.category === 'AI 인프라'
                          ? 'bg-aura-primary/10 text-aura-primary border border-aura-primary/15'
                          : item.category === '사회 기부'
                          ? 'bg-aura-secondary/15 text-aura-secondary border border-aura-secondary/15'
                          : 'bg-aura-surface-container text-aura-on-surface border border-aura-outline-variant/40'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-aura-on-surface text-[13.5px] sm:text-[14px] font-bold break-keep">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-aura-on-surface-variant/40 tracking-wider">
                      TX: {item.txHash}
                    </span>
                  </div>

                  <div className="text-right flex flex-col justify-center">
                    <span className="text-[10px] text-aura-on-surface-variant/60 tracking-[0.05em] uppercase font-bold">
                      Amount
                    </span>
                    <span className="text-aura-on-surface text-[16px] sm:text-[18px] font-bold group-hover:text-aura-primary transition-colors">
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
