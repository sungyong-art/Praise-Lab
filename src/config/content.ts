// ============================================================
// Site Content Configuration — 텍스트/데이터 관리
// ============================================================
// 사이트에 표시되는 모든 텍스트를 여기서 수정할 수 있습니다.
// ============================================================

export const SITE_CONFIG = {
  // 브랜드
  brandName: '칭찬연구소 (Praise Lab)',
  copyright: '© 2026 Praise Lab. All rights reserved.',

  // 히어로 섹션
  hero: {
    titleLeft: ['칭찬합시다', "Let's a praise"],
    titleRight: ['혼내줍시다', "Let's teach them a lesson"],
    watermark: 'CONNECT',
    description:
      'AI 기반의 사연 평가 및 투명한 수익 환원 인프라. Connect AI와 Firebase가 협업하여 회원들의 사연을 Good 또는 No Good으로 분류합니다. 모든 사례는 문맥을 반영한 맞춤형 이미지 생성을 트리거합니다. 검증된 데이터는 페이스리스 미디어 자동화 파이프라인으로 지속적으로 송출됩니다. 누적된 후원금액은 실시간 공공 재정 대시보드로 필터링되어 공개됩니다.',
  },

  // 시네마틱 텍스트 섹션
  cinematic: {
    text: '세상의 따뜻한 이야기들을 모아 올바르게 가치를 부여하는 곳. 우리의 작은 칭찬과 조언은 인공지능 기술을 통해 세상에 하나뿐인 이미지와 미디어로 새롭게 피어납니다. 보이지 않던 진심들이 모여 만드는 변화를 실시간으로 투명하게 공개되는 공공 재정 인프라를 통해 직접 눈으로 확인해 보세요.',
  },

  // 성능 지표 섹션
  metrics: {
    subtitle: 'Performance Metrics',
    items: [
      { value: '2.4ms', label: 'Synaptic Latency' },
      { value: '99.7%', label: 'Signal Accuracy' },
      { value: '140B', label: 'Neural Parameters' },
    ],
  },

  // 기술 섹션
  technology: {
    title: ['Adaptive', 'Intelligence'],
    description:
      'The system learns your neural baseline within 72 hours. From there, every cognitive state is mapped, predicted, and optimized in real time.',
    features: [
      {
        title: 'Cortical Mapping',
        desc: 'Real-time spatial reconstruction of active neural regions.',
      },
      {
        title: 'Signal Isolation',
        desc: 'Separates cognitive intent from biological noise.',
      },
      {
        title: 'State Prediction',
        desc: 'Anticipates cognitive transitions before they occur.',
      },
      {
        title: 'Loop Feedback',
        desc: 'Closed-loop adjustment based on outcome correlation.',
      },
    ],
  },

  // 아키텍처 섹션
  architecture: {
    subtitle: 'Architecture',
    heading: 'Three layers. Zero friction.',
    description:
      'Sensor layer captures raw bioelectric signals. Processing layer isolates intent. Interface layer delivers structured output to any connected system.',
    layers: [
      { num: 1, name: 'Capture' },
      { num: 2, name: 'Process' },
      { num: 3, name: 'Interface' },
    ],
  },

  // 푸터
  footer: {
    tagline:
      'The next evolution of human-machine interaction. Built for those who refuse to be limited by biology alone.',
  },

  // 네비게이션
  nav: {
    links: [
      { label: 'About', scrollMultiplier: 1 },
      { label: 'Metrics', scrollMultiplier: 2 },
    ],
    downloadLabel: 'Download',
  },
};
