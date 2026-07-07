import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { createReview, getReviews, type Review } from '../lib/firestore';
import { Timestamp } from 'firebase/firestore';

// ── 예제 후기 데이터 (Firestore 후기가 없을 때 표시) ──
const SEED_REVIEWS: Review[] = [
  {
    id: 'seed-1',
    userId: 'seed',
    displayName: 'sunflower_k',
    rating: 5,
    content: '이달의 사연을 읽고 한참을 울었어요. AI가 칭찬 포인트를 정확히 잡아줘서 놀랐고, 사연 주인공에게 배지를 보낼 수 있어서 너무 뿌듯했습니다. 매월 이 서비스를 기다리게 될 것 같아요!',
    createdAt: { toDate: () => new Date('2025-06-20') } as unknown as Timestamp,
  },
  {
    id: 'seed-2',
    userId: 'seed',
    displayName: 'warm_hello_2024',
    rating: 5,
    content: '후원 대시보드가 투명하게 공개되는 점이 정말 인상 깊었습니다. 어디에 얼마가 쓰이는지 바로 확인할 수 있어서 믿고 응원할 수 있어요.',
    createdAt: { toDate: () => new Date('2025-06-15') } as unknown as Timestamp,
  },
  {
    id: 'seed-3',
    userId: 'seed',
    displayName: 'reader_jiyeon',
    rating: 4,
    content: 'AI가 사연을 분류하는 과정이 신기해요. 혼난 사연도 단순 비판이 아니라 따뜻하게 돌아볼 수 있게 해줘서 균형 잡힌 시각을 갖게 됩니다.',
    createdAt: { toDate: () => new Date('2025-06-10') } as unknown as Timestamp,
  },
  {
    id: 'seed-4',
    userId: 'seed',
    displayName: 'minseok_supporter',
    rating: 5,
    content: '응원자 멤버십 가입 후 AI 이미지 다운로드 기능을 써봤는데, 퀄리티가 상당합니다. 사연을 짧은 숏폼 영상으로 만들어주는 기능도 기대됩니다!',
    createdAt: { toDate: () => new Date('2025-06-05') } as unknown as Timestamp,
  },
  {
    id: 'seed-5',
    userId: 'seed',
    displayName: 'grace_0312',
    rating: 4,
    content: '처음엔 단순한 후기 사이트인 줄 알았는데, 사연 아카이브 구조가 굉장히 체계적이네요. Best 사연부터 오늘의 사연까지 분류가 잘 되어 있어 매일 방문하고 싶어집니다.',
    createdAt: { toDate: () => new Date('2025-05-28') } as unknown as Timestamp,
  },
  {
    id: 'seed-6',
    userId: 'seed',
    displayName: 'coffee_angel_77',
    rating: 5,
    content: '"커피 한 잔 선물하기" 방식의 자유 후원이 부담이 없어서 좋아요. 소액이라도 의미 있게 쓰인다는 걸 대시보드로 확인하니 보람차네요. 강력 추천!',
    createdAt: { toDate: () => new Date('2025-05-20') } as unknown as Timestamp,
  },
];

// 별점 컴포넌트 (읽기 전용 또는 인터랙티브)
function StarRating({
  rating,
  interactive = false,
  onRate,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (n: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= (interactive ? hovered || rating : rating);
        return (
          <button
            key={n}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && onRate?.(n)}
            onMouseEnter={() => interactive && setHovered(n)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={`text-[18px] sm:text-[20px] leading-none transition-all duration-150 ${
              interactive
                ? 'cursor-pointer hover:scale-110'
                : 'cursor-default'
            } ${filled ? 'text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]' : 'text-white/20'}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

// 작성 폼 컴포넌트
function ReviewForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('로그인 후 후기를 작성할 수 있습니다.');
      return;
    }
    if (rating === 0) {
      setError('별점을 선택해 주세요.');
      return;
    }
    if (content.trim().length < 5) {
      setError('5자 이상 내용을 입력해 주세요.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const id = `review_${user.uid}_${Date.now()}`;
      const displayName =
        user.displayName ||
        user.email?.split('@')[0] ||
        `user_${user.uid.slice(0, 6)}`;

      await createReview({
        id,
        userId: user.uid,
        displayName,
        rating,
        content: content.trim(),
      });
      setRating(0);
      setContent('');
      onSubmitted();
    } catch (err) {
      console.error('[Review] Failed to save:', err);
      setError('저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white border border-aura-outline-variant/30 rounded-2xl p-6 text-center shadow-[0_8px_30px_rgba(152,70,35,0.02)]">
        <p className="text-aura-on-surface-variant text-[12.5px]">
          후기를 작성하려면 <span className="text-aura-primary font-semibold">로그인</span>이 필요합니다.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-aura-outline-variant/40 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-[0_8px_30px_rgba(152,70,35,0.02)]"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-aura-primary/40 via-aura-primary/10 to-transparent" />
      <h3 className="text-aura-on-surface text-[15px] font-bold">✍️ 후기 작성하기</h3>

      {/* 별점 선택 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-aura-on-surface-variant text-[12px] tracking-wider uppercase font-semibold">
          별점 선택
        </label>
        <StarRating rating={rating} interactive onRate={setRating} />
      </div>

      {/* 내용 입력 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-aura-on-surface-variant text-[12px] tracking-wider uppercase font-semibold">
          내용
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          maxLength={400}
          placeholder="서비스 경험을 자유롭게 남겨주세요..."
          className="bg-[#F5F0EA] border border-aura-outline-variant/60 rounded-xl px-4 py-3 text-aura-on-surface text-[13.5px] placeholder-aura-on-surface-variant/30 resize-none focus:outline-none focus:border-aura-primary/80 transition-colors leading-relaxed shadow-inner"
        />
        <span className="text-aura-on-surface-variant/50 text-[11px] text-right">{content.length}/400</span>
      </div>

      {error && (
        <p className="text-rose-600 text-[12.5px] bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-[44px] rounded-full bg-gradient-to-b from-aura-primary to-aura-primary-container text-white font-bold text-[13.5px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-none shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      >
        {loading ? (
          <span className="animate-pulse">저장 중...</span>
        ) : (
          '후기 등록하기'
        )}
      </button>
    </form>
  );
}

// 후기 카드
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const createdAt = review.createdAt
    ? (review.createdAt as any).toDate?.()?.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) ?? '날짜 없음'
    : '날짜 없음';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative bg-white/80 hover:bg-white border border-aura-outline-variant/30 hover:border-aura-outline rounded-2xl p-5 flex flex-col gap-3 transition-all duration-400 overflow-hidden shadow-[0_8px_30px_rgba(152,70,35,0.02)]"
    >
      {/* 카드 상단 라이팅 */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-aura-primary/30 via-aura-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 헤더: 아이디 + 날짜 */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-aura-primary-container/20 border border-aura-outline-variant/20 flex items-center justify-center text-[11px] font-bold text-aura-on-primary-container uppercase">
            {review.displayName?.charAt(0) ?? 'U'}
          </div>
          <span className="text-aura-on-surface text-[13px] font-bold">
            {review.displayName}
          </span>
        </div>
        <span className="text-aura-on-surface-variant/40 text-[10.5px] whitespace-nowrap">{createdAt}</span>
      </div>

      {/* 별점 */}
      <StarRating rating={review.rating} />

      {/* 후기 내용 */}
      <p className="text-aura-on-surface-variant text-[13.0px] leading-relaxed break-keep">
        {review.content}
      </p>
    </motion.div>
  );
}

// 메인 섹션 컴포넌트
export function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getReviews();
      // 실제 데이터 없으면 예제 데이터 표시
      setReviews(data.length > 0 ? data : SEED_REVIEWS);
    } catch (err) {
      console.error('[Reviews] Fetch error:', err);
      setReviews(SEED_REVIEWS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // 전체 평균 별점
  const avgRating =
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
      : 0;

  return (
    <section className="relative bg-aura-surface py-24 sm:py-32 px-4 sm:px-6 overflow-hidden border-b border-aura-outline-variant/30">
      {/* 배경 글로우 */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-aura-primary-container/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/5 w-[400px] h-[400px] rounded-full bg-aura-secondary-container/6 blur-[120px] pointer-events-none" />
      {/* 도트 그리드 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-20 max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.p
            className="text-[12px] sm:text-[13px] tracking-[0.25em] text-aura-primary font-bold uppercase mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            USER REVIEWS
          </motion.p>
          <motion.h2
            className="text-aura-on-surface text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-none mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            실 사용자 후기
          </motion.h2>

          {/* 요약 별점 통계 */}
          {reviews.length > 0 && (
            <motion.div
              className="flex items-center justify-center gap-3 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-aura-primary text-[22px] font-bold">{avgRating}</span>
              <span className="text-aura-on-surface-variant/60 text-[13px]">/ 5 · {reviews.length}건 후기</span>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
          {/* 왼쪽: 후기 그리드 */}
          <div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[140px] rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] border border-white/5 rounded-2xl text-center">
                <p className="text-white/35 text-[14px]">아직 후기가 없습니다.</p>
                <p className="text-white/25 text-[12.5px] mt-1">첫 번째 후기를 남겨보세요!</p>
              </div>
            ) : (
              <AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reviews.map((r, i) => (
                    <ReviewCard key={r.id} review={r} index={i} />
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>

          {/* 오른쪽: 작성 폼 */}
          <div className="lg:sticky lg:top-8">
            <ReviewForm onSubmitted={fetchReviews} />
          </div>
        </div>
      </div>
    </section>
  );
}
