import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── FAQ 데이터 ──
// ── FAQ 데이터 ──
const FAQ_ITEMS = [
  {
    category: '서비스 소개',
    emoji: '✨',
    color: 'orange',
    accentClass: 'text-aura-primary',
    badgeBg: 'bg-aura-primary/10 border-aura-primary/20 text-aura-primary',
    questions: [
      {
        q: '칭찬연구소는 어떤 서비스인가요?',
        a: '칭찬연구소는 일상 속 따뜻한 사연들을 AI가 분석하여 칭찬·응원·훈계 포인트를 찾아내고, 사연 주인공과 독자 모두에게 긍정적인 경험을 선물하는 사연 큐레이션 플랫폼입니다. 단순한 콘텐츠 소비를 넘어, 후원·응원·배지 전달 등 다양한 방식으로 참여할 수 있습니다.',
      },
      {
        q: 'AI는 사연을 어떻게 판별하나요?',
        a: '사연 본문을 입력하면 AI가 감정 맥락, 상황의 복잡성, 행동의 의도성 등을 다각도로 분석합니다. 그 결과를 바탕으로 "칭찬" 또는 "훈계" 카테고리로 분류하며, 핵심 칭찬 포인트 문장도 함께 도출합니다. 흑백논리가 아닌 균형 잡힌 시각을 지향합니다.',
      },
      {
        q: '사연을 직접 제출할 수 있나요?',
        a: '네! 회원가입 후 사연 제출 폼을 통해 누구나 일상 속 따뜻한 이야기를 보내주실 수 있습니다. 제출된 사연은 운영팀 검토 후 Best 사연, 이달의 사연, 오늘의 사연 등 각 카테고리에 맞게 게재됩니다.',
      },
    ],
  },
  {
    category: '멤버십 & 결제',
    emoji: '💳',
    color: 'peach',
    accentClass: 'text-aura-primary',
    badgeBg: 'bg-aura-secondary-container/40 border-aura-outline-variant/30 text-aura-on-secondary-container',
    questions: [
      {
        q: '독자, 응원자, 후원하기의 차이가 무엇인가요?',
        a: '📖 독자(9,900원/월)는 매달 사연 큐레이션과 AI 분류 결과를 가장 먼저 받아보는 기본 구독입니다.\n🎉 응원자(29,000원/월)는 사연 주인공에게 칭찬 배지를 직접 전달하고 AI 생성 이미지를 다운로드할 수 있는 활동형 멤버십입니다.\n☕ 후원하기는 금액 제한 없이 원하는 만큼 마음을 전하는 일회성 후원이며, 후원금 전액이 공공 재정 대시보드에 투명하게 공개됩니다.',
      },
      {
        q: '결제는 어떤 방법으로 가능한가요?',
        a: '현재 토스페이먼츠를 통해 국내 카드 결제가 가능합니다. 카드, 계좌이체, 가상계좌, 휴대폰 소액결제 등 다양한 방식을 지원합니다. 해외 결제 수단(PayPal)도 순차적으로 추가될 예정입니다.',
      },
      {
        q: '멤버십은 언제든 해지할 수 있나요?',
        a: '네, 언제든 마이페이지에서 구독을 해지할 수 있습니다. 해지 후에도 결제일까지의 기간은 정상 이용 가능하며, 위약금이나 추가 비용은 전혀 없습니다.',
      },
      {
        q: '자유 후원 금액에 최솟값이 있나요?',
        a: '최소 후원 금액은 1,000원입니다. 금액에 제한은 없으며, 직접 원하는 금액을 입력하거나 제공된 프리셋(3,000원 / 5,000원 / 10,000원 / 30,000원 / 50,000원) 중에서 선택할 수 있습니다.',
      },
    ],
  },
  {
    category: '후원금 사용',
    emoji: '💚',
    color: 'brown',
    accentClass: 'text-aura-secondary',
    badgeBg: 'bg-aura-secondary/15 border-aura-secondary/30 text-aura-secondary',
    questions: [
      {
        q: '후원금은 어디에 사용되나요?',
        a: '후원금은 크게 세 가지 영역에 사용됩니다:\n① AI 인프라 운영비 — 이미지 생성, 사연 분석 API, 서버 비용 등\n② 사회 기부 — 소아암 재단, 지역 사회 취약계층 지원\n③ 서비스 운영비 — 도메인, 개발·운영 인력\n구체적인 사용 내역은 섹션 5(재정 대시보드)에서 실시간으로 확인할 수 있습니다.',
      },
      {
        q: '후원금 사용 내역을 어디서 볼 수 있나요?',
        a: '랜딩페이지의 재정 대시보드(섹션 5)에서 누적 후원금액, 누적 사용금액, 현재 잔액, 사용 내역 카드를 실시간으로 확인하실 수 있습니다. 투명한 운영을 원칙으로 하며, 별도 로그인 없이 누구나 열람 가능합니다.',
      },
    ],
  },
  {
    category: '개인정보 & 계정',
    emoji: '🔒',
    color: 'dark',
    accentClass: 'text-aura-on-surface',
    badgeBg: 'bg-aura-surface-container/60 border-aura-outline-variant/30 text-aura-on-surface',
    questions: [
      {
        q: '회원가입 없이도 이용할 수 있나요?',
        a: '사연 열람, 재정 대시보드 확인, 후기 읽기는 비회원도 자유롭게 이용할 수 있습니다. 다만 후기 작성, 칭찬 배지 전달, 사연 제출, 멤버십 가입은 회원 가입이 필요합니다.',
      },
      {
        q: '후기에 표시되는 이름은 어떻게 설정하나요?',
        a: '구글 소셜 로그인 시 구글 계정의 displayName이 자동으로 사용됩니다. 별도 설정이 없을 경우 이메일 앞부분(@ 이전)이 익명 ID로 표시됩니다. 마이페이지에서 닉네임을 언제든 변경할 수 있습니다.',
      },
      {
        q: '개인정보는 어떻게 보호되나요?',
        a: '개인정보는 Firebase (Google Cloud) 기반의 보안 인프라에 저장되며, 결제 정보는 토스페이먼츠의 PCI-DSS 인증 환경에서 처리됩니다. 칭찬연구소는 결제 카드 정보를 직접 저장하지 않습니다.',
      },
    ],
  },
];

// ── 단일 FAQ 아이템 (아코디언) ──
function FaqItem({
  q,
  a,
  accentClass,
  isOpen,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  accentClass: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-aura-outline bg-aura-surface-low shadow-sm'
          : 'border-aura-outline-variant/30 bg-white/70 hover:border-aura-outline-variant hover:bg-white'
      }`}
    >
      {/* 질문 버튼 */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left border-none bg-transparent cursor-pointer"
      >
        <span className="text-aura-on-surface text-[14.5px] font-bold leading-snug">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 text-[18px] leading-none mt-0.5 font-light ${
            isOpen ? accentClass : 'text-aura-on-surface/40'
          }`}
        >
          +
        </motion.span>
      </button>

      {/* 답변 (아코디언) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="border-t border-aura-outline-variant/35 pt-4">
                {a.split('\n').map((line, i) => (
                  <p
                    key={i}
                    className="text-aura-on-surface-variant text-[13.5px] leading-relaxed break-keep mb-1.5 last:mb-0"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── 카테고리 카드 ──
function CategoryCard({
  item,
  cardIndex,
}: {
  item: (typeof FAQ_ITEMS)[number];
  cardIndex: number;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <motion.div
      className="relative bg-white/90 border border-aura-outline-variant/40 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(152,70,35,0.03)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: cardIndex * 0.1 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* 카드 상단 라이팅 */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-aura-primary opacity-60"
      />

      {/* 카테고리 헤더 */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-aura-outline-variant/30 bg-aura-surface-container/20">
        <span className="text-[22px]">{item.emoji}</span>
        <div>
          <span className={`text-[11px] font-bold tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full border ${item.badgeBg}`}>
            {item.category}
          </span>
        </div>
      </div>

      {/* FAQ 목록 */}
      <div className="p-4 flex flex-col gap-2">
        {item.questions.map((qa, i) => (
          <FaqItem
            key={i}
            q={qa.q}
            a={qa.a}
            accentClass={item.accentClass}
            isOpen={openIdx === i}
            onToggle={() => toggle(i)}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── 메인 섹션 ──
export function FAQSection() {
  return (
    <section className="relative bg-aura-surface py-24 sm:py-32 px-4 sm:px-6 overflow-hidden border-b border-aura-outline-variant/30">
      {/* 배경 글로우 */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-aura-primary-container/6 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-aura-secondary-container/6 blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-20 max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            className="text-[12px] sm:text-[13px] tracking-[0.25em] text-aura-primary font-semibold uppercase mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            FAQ
          </motion.p>
          <motion.h2
            className="text-aura-on-surface text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-none mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            자주 묻는 질문
          </motion.h2>
          <motion.p
            className="text-aura-on-surface-variant text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            궁금한 점이 있으신가요? 자주 받는 질문들을 모아두었습니다.
            <br className="hidden sm:block" />
            해결되지 않는 부분은 운영팀에 직접 문의해 주세요.
          </motion.p>
        </div>

        {/* 카드 그리드: 2열 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {FAQ_ITEMS.map((item, i) => (
            <CategoryCard key={item.category} item={item} cardIndex={i} />
          ))}
        </div>

        {/* 하단 문의 CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-aura-on-surface-variant/70 text-[13.5px] mb-4">
            원하는 답변을 찾지 못하셨나요?
          </p>
          <a
            href="mailto:hello@praiselap.com"
            className="inline-flex items-center gap-2 bg-aura-surface-container/40 hover:bg-aura-surface-container border border-aura-outline-variant text-aura-on-surface-variant hover:text-aura-on-surface rounded-full px-6 py-3 text-[13.5px] font-semibold transition-all duration-300 shadow-sm"
          >
            <span>✉️</span>
            <span>운영팀에 문의하기</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
