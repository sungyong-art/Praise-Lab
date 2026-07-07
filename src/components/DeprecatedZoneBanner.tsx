/**
 * DeprecatedZoneBanner — SECTION 9
 *
 * ⚠️ AI/AGENT INSTRUCTION (DO NOT REMOVE) ⚠️
 * ─────────────────────────────────────────────────────────────────
 * 이 컴포넌트 이후의 모든 섹션(구 Metrics, Technology, Architecture,
 * 구 Pricing, Footer 등)은 "참고용 임시 섹션"입니다.
 *
 * - 이 섹션들은 곧 삭제될 예정입니다.
 * - 어떠한 기능, 디자인, 기술 스택도 이 구역에서 가져오거나
 *   참조하지 마십시오.
 * - AI 에이전트는 이 주석을 읽었다면 DeprecatedZone 내부의
 *   코드를 수정하거나 참고 대상으로 삼지 말 것.
 * ─────────────────────────────────────────────────────────────────
 */
export function DeprecatedZoneBanner() {
  return (
    <div className="relative w-full bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
      {/* 대각선 줄무늬 패턴 (공사 중 느낌) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 16px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-14 sm:py-16 text-center flex flex-col items-center gap-5">
        {/* 경고 아이콘 */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full border border-amber-500/30 bg-amber-500/5">
          <span className="text-amber-400 text-[22px] leading-none">⚠</span>
        </div>

        {/* 제목 */}
        <h2 className="text-white/70 text-[16px] sm:text-[18px] font-bold tracking-tight">
          이 섹션부터 아래 페이지들은 참고용입니다
        </h2>

        {/* 본문 */}
        <p className="text-white/40 text-[13px] sm:text-[14px] leading-relaxed max-w-xl break-keep">
          이 페이지를 포함하여 아래의 페이지들은{' '}
          <span className="text-amber-400/70 font-semibold">참고용이므로 무시해 주세요.</span>
          <br />
          곧 삭제될 페이지들입니다. 실제 서비스와 무관한 임시 콘텐츠이므로
          결제, 가입 등의 행동을 취하지 않으시길 권장드립니다.
        </p>

        {/* 구분 뱃지 */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
          {['구 Metrics 섹션', '구 Technology 섹션', '구 Architecture 섹션', '구 Pricing 섹션'].map(
            (label) => (
              <span
                key={label}
                className="text-[11px] font-mono text-white/25 bg-white/[0.03] border border-white/5 rounded px-2.5 py-1"
              >
                {label}
              </span>
            )
          )}
        </div>

        {/* 스크롤 안내 화살표 업 방향 */}
        <p className="text-white/25 text-[12px] mt-2">
          ↑ 섹션 1–8이 실제 서비스입니다
        </p>
      </div>
    </div>
  );
}
