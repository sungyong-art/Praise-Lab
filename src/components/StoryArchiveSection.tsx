import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../config/content';

// 테마 매핑 설정
const THEME_MAP: Record<string, {
  accentColor: string;
  glowColor: string;
  bgGlow: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
}> = {
  amber: {
    accentColor: 'text-aura-primary',
    glowColor: 'shadow-[0_8px_30px_rgba(152,70,35,0.03)] hover:shadow-[0_12px_40px_rgba(152,70,35,0.08)]',
    bgGlow: 'from-aura-primary/30 via-aura-primary/5 to-transparent',
    badgeBg: 'bg-aura-primary/10 border-aura-primary/20',
    badgeText: 'text-aura-primary',
    borderColor: 'group-hover:border-aura-primary/30',
  },
  fuchsia: {
    accentColor: 'text-roseGold-500',
    glowColor: 'shadow-[0_8px_30px_rgba(152,70,35,0.03)] hover:shadow-[0_12px_40px_rgba(152,70,35,0.08)]',
    bgGlow: 'from-roseGold-500/30 via-roseGold-500/5 to-transparent',
    badgeBg: 'bg-roseGold-500/10 border-roseGold-500/20',
    badgeText: 'text-roseGold-500',
    borderColor: 'group-hover:border-roseGold-500/30',
  },
  cyan: {
    accentColor: 'text-warmAmber-500',
    glowColor: 'shadow-[0_8px_30px_rgba(152,70,35,0.03)] hover:shadow-[0_12px_40px_rgba(152,70,35,0.08)]',
    bgGlow: 'from-warmAmber-500/30 via-warmAmber-500/5 to-transparent',
    badgeBg: 'bg-warmAmber-500/10 border-warmAmber-500/20',
    badgeText: 'text-warmAmber-500',
    borderColor: 'group-hover:border-warmAmber-500/30',
  },
  rose: {
    accentColor: 'text-aura-secondary',
    glowColor: 'shadow-[0_8px_30px_rgba(152,70,35,0.03)] hover:shadow-[0_12px_40px_rgba(152,70,35,0.08)]',
    bgGlow: 'from-aura-secondary/30 via-aura-secondary/5 to-transparent',
    badgeBg: 'bg-aura-secondary/15 border-aura-secondary/30',
    badgeText: 'text-aura-secondary',
    borderColor: 'group-hover:border-aura-secondary/30',
  },
};

export function StoryArchiveSection() {
  const { storyArchive } = SITE_CONFIG;

  if (!storyArchive) return null;

  return (
    <section className="relative bg-aura-surface py-24 sm:py-32 px-4 sm:px-6 overflow-hidden border-b border-aura-outline-variant/30">
      {/* 백그라운드 장식용 네온 원형 글로우 */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-aura-primary-container/6 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-aura-secondary-container/6 blur-[140px] pointer-events-none" />
      
      {/* 도트 그리드 장식 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* 상단 헤더 */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            className="text-[12px] sm:text-[13px] tracking-[0.25em] text-aura-primary font-bold uppercase mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {storyArchive.subtitle}
          </motion.p>
          <motion.h2
            className="text-aura-on-surface text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-none mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {storyArchive.title}
          </motion.h2>
          <motion.p
            className="text-aura-on-surface-variant text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {storyArchive.description}
          </motion.p>
        </div>

        {/* 4열 그리드 아카이브 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {storyArchive.categories.map((category, catIdx) => {
            const theme = THEME_MAP[category.colorClass] || THEME_MAP.cyan;
            return (
              <CategoryCard key={category.id} category={category} theme={theme} index={catIdx} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface Story {
  title: string;
  content: string;
}

interface Category {
  id: string;
  title: string;
  emoji: string;
  colorClass: string;
  stories: Story[];
}

interface Theme {
  accentColor: string;
  glowColor: string;
  bgGlow: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
}

function CategoryCard({ category, theme, index: cardIndex }: { category: Category; theme: Theme; index: number }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStory = category.stories[activeIndex] || category.stories[0];

  return (
    <motion.div
      className={`group relative bg-aura-surface border border-aura-outline-variant/30 transition-all duration-500 rounded-[28px] overflow-hidden flex flex-col ${theme.glowColor}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: cardIndex * 0.15 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* 상단 그라데이션 라인 */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${theme.bgGlow}`} />

      <div className="p-5 sm:p-6 flex flex-col min-h-[580px]">
        {/* 카테고리 헤더 */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-aura-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="text-xl select-none">{category.emoji}</span>
            <h3 className="text-[16px] sm:text-[17px] font-bold text-aura-on-surface">
              {category.title}
            </h3>
          </div>
          <span className={`text-[10px] font-bold tracking-[0.05em] px-2.5 py-1 rounded-full border uppercase ${theme.badgeBg} ${theme.badgeText}`}>
            {category.id}
          </span>
        </div>

        {/* 1. 활성화된 사연 메인 뷰 (플레이스홀더 영역) */}
        <div className="flex-1 flex flex-col bg-aura-surface-low/80 border border-aura-outline-variant/40 rounded-2xl p-4 mb-6 relative overflow-hidden shadow-inner">
          {/* 은은한 네온 글로우 백그라운드 효과 */}
          <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-current ${theme.accentColor} opacity-5 blur-2xl pointer-events-none`} />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* 말따옴표 장식 */}
              <span className={`text-3xl font-serif leading-none select-none block -mb-2 opacity-35 ${theme.accentColor}`}>“</span>
              <h4 className="text-[14px] font-bold text-aura-on-surface mb-2 leading-snug break-keep">
                {activeStory.title}
              </h4>
              <p className="text-[12.5px] text-aura-on-surface-variant leading-relaxed font-normal break-all whitespace-pre-line">
                {activeStory.content}
              </p>
            </div>
            <div className="flex justify-end items-center mt-4 pt-3 border-t border-aura-outline-variant/30">
              <span className="text-[10px] text-aura-on-surface-variant/40 tracking-wider">
                ACTIVE CASE #{activeIndex + 1}
              </span>
            </div>
          </div>
        </div>

        {/* 2. 아코디언 선택 영역 */}
        <div className="flex flex-col gap-2">
          <p className="text-[10.5px] text-aura-on-surface-variant/60 tracking-wider font-semibold uppercase mb-1 px-1">
            사례 목록
          </p>
          <div className="space-y-1.5">
            {category.stories.map((story, storyIdx) => {
              const isActive = activeIndex === storyIdx;
              return (
                <div
                  key={story.title}
                  className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'border-aura-outline bg-aura-surface-low shadow-sm'
                      : 'border-aura-outline-variant/20 bg-transparent hover:bg-aura-surface-container/20'
                  }`}
                >
                  {/* 아코디언 헤더 버튼 */}
                  <button
                    onClick={() => setActiveIndex(storyIdx)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors duration-200 border-none bg-transparent cursor-pointer ${
                      isActive ? 'text-aura-primary font-bold' : 'text-aura-on-surface-variant'
                    }`}
                  >
                    <span className="text-[12px] truncate max-w-[200px] sm:max-w-[240px]">
                      {story.title}
                    </span>
                    <span className="text-[10px] opacity-40 shrink-0 ml-2">
                      {isActive ? '●' : '○'}
                    </span>
                  </button>

                  {/* 아코디언 바디 */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-3 pb-3 pt-1 border-t border-white/5">
                          <p className="text-[11px] text-white/45 leading-relaxed break-all font-light whitespace-pre-line">
                            {story.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
