import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 시뮬레이션용 데이터
// 1. 무료 등급: 준비된 정적 이미지 노출
const FREE_IMAGES = {
  GOOD: '/praise.png',
  NO_GOOD: '/scold.png'
};

// 2. 베이직 등급: 사연 맞춤형 이미지 생성 시뮬레이션 (키워드를 분석해 그럴싸하게 다른 느낌의 3D 생성형 이미지를 연출)
const BASIC_AI_IMAGES = {
  GOOD: [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60', // 디지털 칭찬/감사 느낌
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60', // 협동과 웃음
    'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&auto=format&fit=crop&q=60'  // 따뜻한 격려
  ],
  NO_GOOD: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60', // 진중한 생각과 오피스
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=60', // 어두운 배경에 빛, 깊은 생각
    'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&auto=format&fit=crop&q=60'  // 차분하게 문제를 분석하는 분위기
  ]
};

// 3. 프로 / 익스프레스 등급: 사연 맞춤형 영상 생성 시뮬레이션
const EXPRESS_AI_VIDEOS = {
  GOOD: '/my-video-1.mp4',  // 화사하고 긍정적인 첫 화면 영상 재활용 또는 맞춤 동영상 연출
  NO_GOOD: '/my-video-2.mp4' // 진중하고 깊은 조언 느낌의 시네마틱 텍스트 영상 재활용
};

export function StoryEvaluatorSimulator() {
  const [story, setStory] = useState('');
  const [membership, setMembership] = useState<'free' | 'basic' | 'express'>('free');
  
  // 평가 상태
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<'GOOD' | 'NO_GOOD' | null>(null);
  
  // 생성 결과 리소스 주소
  const [generatedMediaUrl, setGeneratedMediaUrl] = useState<string | null>(null);
  const [generatedKeyword, setGeneratedKeyword] = useState<string>('');

  // 사연 판별 및 미디어 생성 시뮬레이터 함수
  const handleEvaluate = () => {
    if (!story.trim()) {
      alert('평가할 사연을 먼저 입력해 주세요.');
      return;
    }

    setIsEvaluating(true);
    setEvaluationResult(null);
    setGeneratedMediaUrl(null);

    // 1.5초 후 AI 분석 판별이 완료된 것처럼 모사
    setTimeout(() => {
      // 키워드를 분석하여 긍정적인 키워드가 있으면 GOOD, 없거나 부정적 단어가 많으면 NO_GOOD
      const positiveKeywords = ['칭찬', '감사', '도와', '기쁨', '행복', '착한', '잘한', '고마워', '고맙', '사랑', '좋은'];
      const textHasPositive = positiveKeywords.some(kw => story.includes(kw));
      
      const result = textHasPositive ? 'GOOD' : 'NO_GOOD';
      setEvaluationResult(result);

      // 회원권 등급별 결과 처리
      if (membership === 'free') {
        // 1) 무료: 미리 만들어둔 Static 이미지 연출
        setGeneratedMediaUrl(FREE_IMAGES[result]);
        setGeneratedKeyword('기본 탑재 프리셋 이미지 제공');
      } else if (membership === 'basic') {
        // 2) 베이직: 사연의 글자 수나 해시값을 조합하여 3가지 추천 AI 일러스트 중 하나를 랜덤으로 생성한 척 서빙
        const randomIdx = Math.floor((story.length + (result === 'GOOD' ? 7 : 3)) % 3);
        const selectedImg = BASIC_AI_IMAGES[result][randomIdx];
        setGeneratedMediaUrl(selectedImg);
        setGeneratedKeyword(result === 'GOOD' ? '💡 사연 맞춤형 칭찬 3D 아트웍 생성 완료' : '⚠️ 사연 맞춤형 훈계 일러스트 생성 완료');
      } else {
        // 3) 익스프레스 (유료 비디오): 사연 맞춤형 영상 매핑
        setGeneratedMediaUrl(EXPRESS_AI_VIDEOS[result]);
        setGeneratedKeyword(result === 'GOOD' ? '🎬 시네마틱 칭찬 숏폼 비디오 생성 완료 (1080p)' : '🎬 시네마틱 훈계 교훈 비디오 생성 완료 (1080p)');
      }

      setIsEvaluating(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* ── 왼쪽: 사연 작성 및 옵션 설정 영역 (5/12 크기) ── */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-aura-outline-variant/30 rounded-2xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(152,70,35,0.02)]">
        <div>
          {/* 회원 등급 선택 탭 */}
          <div className="mb-6">
            <span className="text-[12px] text-aura-on-surface-variant font-bold tracking-wider block mb-3 uppercase">
              membership tier
            </span>
            <div className="grid grid-cols-3 gap-2 bg-[#F5F0EA] p-1 rounded-lg border border-aura-outline-variant/50">
              {[
                { key: 'free', label: '무료 회원', sub: '기본 이미지' },
                { key: 'basic', label: '베이직', sub: '사연 반영 이미지' },
                { key: 'express', label: '익스프레스', sub: '사연 반영 영상' }
              ].map(tier => (
                <button
                  key={tier.key}
                  onClick={() => {
                    setMembership(tier.key as any);
                    // 옵션을 변경하면 기존 결과 리셋하여 다시 테스트하게 유도
                    setEvaluationResult(null);
                    setGeneratedMediaUrl(null);
                  }}
                  className={`py-2.5 px-2 rounded-md transition-all border-none cursor-pointer text-center flex flex-col items-center justify-center ${
                    membership === tier.key
                      ? 'bg-gradient-to-r from-aura-primary-container to-aura-secondary-container text-aura-on-primary-container font-bold shadow-sm scale-[1.02]'
                      : 'bg-transparent text-aura-on-surface-variant/60 hover:text-aura-on-surface hover:bg-aura-surface-container/30'
                  }`}
                >
                  <span className="text-[13px]">{tier.label}</span>
                  <span className="text-[10px] opacity-70 mt-0.5">{tier.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 사연 입력 칸 */}
          <div className="mb-6">
            <label className="text-[12px] text-aura-on-surface-variant font-bold tracking-wider block mb-3 uppercase">
              Write Story
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="여기에 평가할 사연을 자유롭게 입력해 주세요. (예: 어제 아파트 복도에서 이웃의 짐을 대신 들어주었습니다.)"
              rows={6}
              className="w-full bg-[#F5F0EA] border border-aura-outline-variant/60 rounded-xl p-4 text-aura-on-surface text-[14px] leading-relaxed placeholder-aura-on-surface-variant/30 focus:outline-none focus:border-aura-primary/80 resize-none transition-colors shadow-inner"
            />
            <div className="flex justify-between items-center mt-2 text-[12px] text-aura-on-surface-variant/50">
              <span>* 긍정적인 단어가 들어가면 칭찬으로 판별됩니다.</span>
              <span>{story.length} 자 입력됨</span>
            </div>
          </div>
        </div>

        {/* 판별 버튼 */}
        <button
          onClick={handleEvaluate}
          disabled={isEvaluating}
          className={`w-full py-4 rounded-full text-[15px] font-bold tracking-wide flex items-center justify-center gap-2 border-none transition-all cursor-pointer shadow-md ${
            isEvaluating
              ? 'bg-aura-surface-container text-aura-on-surface-variant/40 cursor-wait'
              : 'bg-gradient-to-r from-aura-primary to-aura-primary-container text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {isEvaluating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-aura-primary" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>스토리 AI 분석 및 가치 판별 중...</span>
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7 h2v2z"/>
              </svg>
              <span>AI 판별 파이프라인 가동</span>
            </>
          )}
        </button>
      </div>

      {/* ── 오른쪽: 판별 결과 모니터 및 결과 미디어 영역 (7/12 크기) ── */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-aura-outline-variant/30 rounded-2xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(152,70,35,0.02)] relative overflow-hidden">
        {/* 가치 평가 모니터 데코레이터 */}
        <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] text-aura-primary tracking-widest font-mono uppercase bg-aura-surface-low px-3 py-1.5 rounded-full border border-aura-outline">
          <span className="w-1.5 h-1.5 rounded-full bg-aura-primary animate-pulse" />
          SYSTEM LIVE
        </div>

        <div className="flex-1 flex flex-col justify-center items-center py-6 min-h-[320px]">
          <AnimatePresence mode="wait">
            {!evaluationResult && !isEvaluating && (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center p-8 max-w-sm"
              >
                <div className="w-16 h-16 rounded-full bg-aura-surface-low flex items-center justify-center mb-6 mx-auto border border-aura-outline text-aura-primary">
                  ⚡
                </div>
                <h4 className="text-aura-on-surface text-base font-bold mb-2">실시간 판별 결과창</h4>
                <p className="text-aura-on-surface-variant text-[13px] leading-relaxed">
                  왼쪽 창에서 사연을 작성하고 회원 등급을 선택한 뒤 **AI 판별 파이프라인 가동** 버튼을 눌러주세요.
                </p>
              </motion.div>
            )}

            {isEvaluating && (
              <motion.div
                key="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-8"
              >
                <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  {/* 회전하는 이펙트 링 */}
                  <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-aura-primary animate-spin" />
                  <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-aura-primary-container animate-spin [animation-duration:1.5s]" />
                  <span className="text-[20px]">🔮</span>
                </div>
                <h4 className="text-aura-primary text-sm font-bold tracking-wider uppercase animate-pulse">
                  AI DECISION MAKING
                </h4>
                <p className="text-aura-on-surface-variant text-[12px] mt-2">문맥 파싱 및 요금제 렌더러 호출 중...</p>
              </motion.div>
            )}

            {evaluationResult && !isEvaluating && (
              <motion.div
                key="result-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full flex flex-col items-center"
              >
                {/* 1) 판별 배지 */}
                <div className="mb-6 flex items-center gap-3">
                  <div className={`px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider ${
                    evaluationResult === 'GOOD'
                      ? 'bg-aura-primary/10 text-aura-primary border border-aura-primary/20'
                      : 'bg-aura-secondary/15 text-aura-secondary border border-aura-secondary/20'
                  }`}>
                    {evaluationResult === 'GOOD' ? '👏 칭찬합시다 (GOOD)' : '⚠️ 혼내줍시다 (NO GOOD)'}
                  </div>
                  <div className="px-3 py-1 rounded bg-aura-surface-container border border-aura-outline-variant/60 text-aura-on-surface-variant text-[11px] font-mono">
                    {membership.toUpperCase()} MEMBER
                  </div>
                </div>

                {/* 2) 렌더링된 메인 미디어 프레임 */}
                <div className="relative w-full max-w-lg aspect-video rounded-xl overflow-hidden bg-aura-surface-low border border-aura-outline-variant/40 shadow-2xl">
                  {generatedMediaUrl && (
                    membership === 'express' ? (
                      // 동영상 출력 (익스프레스 회원 전용)
                      <video
                        key={generatedMediaUrl}
                        src={generatedMediaUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // 이미지 출력 (무료 및 베이직 회원용)
                      <img
                        src={generatedMediaUrl}
                        alt="Generated AI result"
                        className="w-full h-full object-cover animate-fade-in"
                      />
                    )
                  )}
                  {/* 동영상 식별용 라벨 */}
                  {membership === 'express' && (
                    <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm border border-white/10 text-[10px] text-white/80 px-2 py-1 rounded font-mono uppercase tracking-widest">
                      VIDEO ENGINE ACTIVE
                    </span>
                  )}
                </div>

                {/* 3) 기술적 매핑 정보 표기 */}
                <div className="mt-6 w-full max-w-lg text-center bg-aura-surface-low/85 border border-aura-outline-variant/35 p-4 rounded-xl shadow-inner">
                  <div className="text-[12px] text-aura-primary uppercase tracking-widest font-mono font-bold">
                    output report
                  </div>
                  <div className="text-aura-on-surface text-[14px] font-bold mt-1">
                    {generatedKeyword}
                  </div>
                  <p className="text-aura-on-surface-variant text-[12px] mt-1.5 leading-relaxed">
                    {membership === 'free' && '무료 회원은 미리 구축된 기본 매핑 이미지만 노출됩니다. 사연을 더 깊게 투영한 전용 일러스트와 숏폼 무비를 만들고 싶다면 베이직/익스프레스 멤버십을 구매해 주세요.'}
                    {membership === 'basic' && '베이직 회원은 문맥을 완벽히 흡수한 3D 생성형 AI 이미지가 독점 제작되어 라이브러리에 누적 보관됩니다.'}
                    {membership === 'express' && '익스프레스 회원은 숏폼 미디어 파이프라인으로 즉시 송출할 수 있는 시네마틱 무비가 최종 랜더링됩니다.'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
