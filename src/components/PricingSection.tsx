import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import TossCheckoutButton from './payment/TossCheckoutButton';
import PayPalCheckoutButton from './payment/PayPalCheckoutButton';
import { PAYPAL_CONFIG, type PayPalProduct } from '../lib/paypal';

// ── 플랜 데이터 ──
const PLANS = [
  {
    id: 'reader',
    tier: '① 독자',
    tierEn: 'Reader',
    emoji: '📖',
    price: 9900,
    priceDisplay: '9,900원',
    label: '매월',
    tagline: '따뜻한 사연을 읽고 공감하는 첫 걸음',
    description: '매달 업로드되는 Best/이달의 사연을 가장 먼저 읽고, 칭찬연구소의 소식을 받아보세요.',
    highlights: ['매월 Best 사연 이메일 큐레이션', '사연 댓글 및 공감 반응', 'AI 칭찬 분류 결과 열람', '뉴스레터 우선 수신'],
    accent: 'cyan',
    accentClass: 'text-cyan-400',
    borderHover: 'hover:border-cyan-500/30',
    glowTop: 'from-cyan-500/40 via-cyan-500/10 to-transparent',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    btnBg: 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400',
    tossProductIndex: 0,
  },
  {
    id: 'supporter',
    tier: '② 응원자',
    tierEn: 'Supporter',
    emoji: '🎉',
    price: 29000,
    priceDisplay: '29,000원',
    label: '매월',
    tagline: '사연 주인공에게 박수를 보내는 응원자',
    description: '사연에 직접 응원 메시지와 칭찬 배지를 남기고, AI가 생성한 사연 이미지를 다운로드 받으세요.',
    highlights: ['독자 플랜 혜택 전체 포함', '사연 주인공에게 칭찬 배지 전달', 'AI 생성 사연 이미지 다운로드', '월간 후원금 집행 내역 우선 열람', '응원자 전용 커뮤니티 채널 입장'],
    accent: 'fuchsia',
    accentClass: 'text-fuchsia-400',
    borderHover: 'hover:border-fuchsia-500/30',
    glowTop: 'from-fuchsia-500/40 via-fuchsia-500/10 to-transparent',
    badgeBg: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400',
    btnBg: 'bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border-fuchsia-500/20 hover:border-fuchsia-500/40 text-fuchsia-400',
    featured: true,
    tossProductIndex: 1,
  },
  {
    id: 'angel',
    tier: '③ 후원하기',
    tierEn: 'Angel Donor',
    emoji: '☕',
    price: null, // 자유 금액
    priceDisplay: '자유롭게',
    label: '일회성',
    tagline: '커피 한 잔으로 전하는 선한 영향력',
    description: '금액 제한 없이 원하는 만큼 마음을 전해주세요. 후원금 전액은 공공 재정 대시보드에 투명하게 공개됩니다.',
    highlights: ['금액 직접 입력 (최소 1,000원)', '후원금 실시간 대시보드 반영', '후원자 명예 리스트 등재', '사회 기부 및 인프라 운영에 투명하게 사용', '토닥토닥 감사 이메일 발송'],
    accent: 'amber',
    accentClass: 'text-amber-400',
    borderHover: 'hover:border-amber-500/30',
    glowTop: 'from-amber-500/40 via-amber-500/10 to-transparent',
    badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    btnBg: 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20 hover:border-amber-500/40 text-amber-400',
    tossProductIndex: 2,
  },
] as const;

// 자유 금액 입력 컴포넌트
function FreeDonationInput({ onAmountChange }: { onAmountChange: (v: number) => void }) {
  const PRESETS = [3000, 5000, 10000, 30000, 50000];
  const [selected, setSelected] = useState(10000);
  const [custom, setCustom] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const handlePreset = (v: number) => {
    setSelected(v);
    setUseCustom(false);
    setCustom('');
    onAmountChange(v);
  };

  const handleCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setCustom(raw);
    setUseCustom(true);
    onAmountChange(Number(raw) || 0);
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-white/45 text-[12px] tracking-wider uppercase">후원 금액 선택</p>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => handlePreset(v)}
            className={`px-3 py-1.5 rounded-lg text-[12.5px] font-semibold border transition-all duration-200 ${
              !useCustom && selected === v
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                : 'bg-white/[0.02] border-white/8 text-white/55 hover:text-white/85 hover:border-white/15'
            }`}
          >
            {v.toLocaleString()}원
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-black/40 border border-white/8 rounded-xl px-4 py-2.5">
        <input
          type="text"
          inputMode="numeric"
          placeholder="직접 입력 (예: 15,000)"
          value={custom}
          onChange={handleCustom}
          onFocus={() => setUseCustom(true)}
          className="flex-1 bg-transparent text-white/85 text-[13.5px] placeholder-white/25 focus:outline-none"
        />
        <span className="text-white/45 text-[13px]">원</span>
      </div>
    </div>
  );
}

// 플랜 카드
function PlanCard({ plan, index, user }: {
  plan: typeof PLANS[number];
  index: number;
  user: any;
}) {
  const [donationAmount, setDonationAmount] = useState(10000);

  const tossProduct = {
    id: plan.id === 'angel'
      ? `praise-angel-kr-${donationAmount}`
      : `praise-${plan.id}-kr`,
    name: plan.id === 'angel'
      ? `후원하기 — 선한 영향력 나누기`
      : plan.tierEn === 'Reader'
      ? '독자 (Reader) 멤버십'
      : '응원자 (Supporter) 멤버십',
    price: plan.id === 'angel' ? donationAmount : (plan.price as number),
    currency: 'KRW' as const,
  };

  // PayPal 상품 정보 빌드 (USD)
  let paypalPrice = '0.00';
  if (plan.id === 'reader') {
    paypalPrice = '9.99';
  } else if (plan.id === 'supporter') {
    paypalPrice = '29.99';
  } else if (plan.id === 'angel') {
    const usdAmount = donationAmount / 1300;
    paypalPrice = Math.max(1.0, usdAmount).toFixed(2);
  }

  const payPalProduct: PayPalProduct = {
    id: plan.id === 'angel'
      ? `praise-angel-us-${donationAmount}`
      : `praise-${plan.id}-us`,
    name: plan.id === 'angel'
      ? `Sponsorship - Angel Donor`
      : plan.tierEn === 'Reader'
      ? 'Reader Membership'
      : 'Supporter Membership',
    description: plan.tagline,
    price: paypalPrice,
    currency: 'USD',
  };

  return (
    <motion.div
      className={`group relative bg-white/[0.02] backdrop-blur-xl border border-white/5 ${plan.borderHover} transition-all duration-500 rounded-2xl overflow-hidden flex flex-col ${
        (plan as any).featured ? 'md:scale-[1.03] md:z-10 border-fuchsia-500/25 shadow-[0_0_50px_rgba(217,70,239,0.05)]' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* 상단 그라데이션 라인 */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${plan.glowTop}`} />

      {/* 인기 배지 */}
      {(plan as any).featured && (
        <div className="absolute top-4 right-4">
          <span className="bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6 sm:p-7 flex flex-col gap-5 flex-1">
        {/* 헤더 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{plan.emoji}</span>
            <span className={`text-[11px] font-bold tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full border ${plan.badgeBg}`}>
              {plan.tier}
            </span>
          </div>
          <h3 className={`text-[20px] font-extrabold ${plan.accentClass}`}>{plan.tierEn}</h3>
          <p className="text-white/55 text-[13px] leading-snug">{plan.tagline}</p>
        </div>

        {/* 가격 */}
        <div className="flex items-baseline gap-2 border-b border-white/5 pb-5">
          {plan.price === null ? (
            <span className={`text-[36px] font-extrabold ${plan.accentClass}`}>자유롭게</span>
          ) : (
            <>
              <span className="text-white text-[36px] font-extrabold tracking-tight">
                {plan.priceDisplay}
              </span>
              <span className="text-white/35 text-[13px]">/ {plan.label}</span>
            </>
          )}
        </div>

        {/* 설명 */}
        <p className="text-white/50 text-[13px] leading-relaxed">{plan.description}</p>

        {/* 자유 금액 입력 (후원하기 전용) */}
        {plan.id === 'angel' && (
          <FreeDonationInput onAmountChange={setDonationAmount} />
        )}

        {/* 혜택 목록 */}
        <ul className="flex flex-col gap-2.5 flex-1">
          {plan.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-white/60 text-[12.5px]">
              <span className={`mt-0.5 text-[14px] flex-shrink-0 ${plan.accentClass}`}>✓</span>
              {h}
            </li>
          ))}
        </ul>

        {/* 결제 버튼 영역 */}
        <div className="flex flex-col gap-3 pt-2">
          {/* Toss 결제 */}
          <TossCheckoutButton
            product={tossProduct}
            customerEmail={user?.email ?? undefined}
            customerName={user?.displayName ?? undefined}
            onError={(err) => console.error('Toss error:', err)}
          />

          {/* PayPal 결제 */}
          <div className="mt-1">
            <PayPalCheckoutButton
              product={payPalProduct}
              onSuccess={(details) => {
                alert(`PayPal 결제 완료! 💚 ${payPalProduct.name} ($${payPalProduct.price}) 후원에 감사드립니다.`);
                console.log('PayPal success details:', details);
              }}
              onError={(err) => console.error('PayPal error:', err)}
            />
          </div>

          {/* 마음 전하기 버튼 (로그인 시 별도 안내) */}
          {!user && (
            <p className="text-white/30 text-[11.5px] text-center">
              비로그인 상태로도 결제 가능합니다.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── 메인 섹션 ──
export function PricingSection() {
  const { user } = useAuth();

  const paypalOptions = {
    clientId: PAYPAL_CONFIG.clientId,
    currency: PAYPAL_CONFIG.currency,
    intent: PAYPAL_CONFIG.intent,
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <section className="relative bg-[#010103] py-24 sm:py-32 px-4 sm:px-6 overflow-hidden border-b border-white/5">
        {/* 배경 글로우 */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-fuchsia-500/5 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-20 max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-16 sm:mb-20">
            <motion.p
              className="text-[12px] sm:text-[13px] tracking-[0.25em] text-fuchsia-400 font-semibold uppercase mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              MEMBERSHIP & SUPPORT
            </motion.p>
            <motion.h2
              className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              마음을 전하는 방법을 선택하세요
            </motion.h2>
            <motion.p
              className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              따뜻한 사연들이 세상에 닿을 수 있도록, 독자·응원자·후원자로 함께해 주세요.
              <br className="hidden sm:block" />
              여러분의 작은 응원이 AI를 통해 더 큰 따뜻함으로 피어납니다.
            </motion.p>
          </div>

          {/* 플랜 카드 3열 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PLANS.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={i}
                user={user}
              />
            ))}
          </div>

          {/* 하단 투명성 안내 */}
          <motion.div
            className="mt-16 text-center border-t border-white/5 pt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-white/35 text-[13px] leading-relaxed max-w-xl mx-auto">
              💚 모든 결제금액은{' '}
              <span className="text-white/60 font-semibold">실시간 공공 재정 대시보드</span>에 투명하게 공개됩니다.
              <br />
              결제 수단은 <strong className="text-white/55">토스페이먼츠</strong>와 <strong className="text-white/55">페이팔</strong>이 사용됩니다. 언제든 해지 가능합니다.
            </p>
          </motion.div>
        </div>
      </section>
    </PayPalScriptProvider>
  );
}

