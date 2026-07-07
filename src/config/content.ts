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
  storyArchive: {
    subtitle: 'STORY ARCHIVE',
    title: '세상의 모든 이야기, 그 가치의 기록',
    description: '실시간으로 수집되고 분류된 시민들의 칭찬과 훈계 사연들을 만나보세요.',
    categories: [
      {
        id: 'best',
        title: 'Best 사연',
        emoji: '🏆',
        colorClass: 'amber',
        stories: [
          { title: '소아암 환우들을 위한 저금통 기부', content: '10년간 한 푼 두 푼 모은 돼지저금통을 소아암 환우들을 위해 기부한 초등학생 이야기. 아이의 따뜻한 마음이 온 동네에 훈훈한 감동을 전했습니다.' },
          { title: '시각장애인 할아버지의 길잡이 고등학생', content: '길을 잃고 횡단보도 앞에서 멈칫하던 시각장애인 할아버지를 안전하게 목적지까지 손잡고 안내해 드린 고등학생의 훈훈한 미담입니다.' },
          { title: '골목길을 청소하는 천사 미화원', content: '매일 새벽 남들보다 일찍 일어나 어두운 골목길을 묵묵히 청소하고, 이웃들에게 따뜻한 아침 인사를 먼저 건네는 환경미화원 아저씨의 이야기입니다.' },
          { title: '폭설 속 무료 컵라면 나눔 주민들', content: '폭설로 인해 고립된 도로 위에서 오도가도 못하는 운전자들을 위해 따뜻한 차와 컵라면을 무료로 나누어주며 이웃 사랑을 실천한 주민들입니다.' },
          { title: '화재 대피 이웃을 구한 청년', content: '새벽에 화재가 발생한 빌라에서 위험을 무릅쓰고 집집마다 벨을 누르며 이웃들을 대피시켜 인명 피해를 막은 용감한 의인 청년의 사연입니다.' }
        ]
      },
      {
        id: 'monthly',
        title: '이달의 사연',
        emoji: '📅',
        colorClass: 'fuchsia',
        stories: [
          { title: '유기견 3마리를 품은 감동의 가족', content: '유기견 보호소에서 안락사 직전이던 아프고 나이 많은 유기견들을 세 마리나 입양해 사랑과 정성으로 치료하고 품어준 따뜻한 가족의 이야기입니다.' },
          { title: '폐지 리어카를 밀어준 배달 라이더', content: '비 내리는 가파른 언덕길에서 폐지를 가득 싣고 힘겨워하시던 할머니를 발견하고, 배달 오토바이를 세워둔 채 리어카를 끝까지 밀어준 라이더 사연입니다.' },
          { title: '급식카드 무상 식사 파스타 매장', content: '아동급식카드를 소지한 아이들에게 카드를 받지 않고 무료로 든든한 한 끼 식사를 대접하며 따뜻한 응원을 건네는 파스타 가게 사장님의 훈훈한 소식입니다.' },
          { title: '아이를 구한 은퇴 소방관의 용기', content: '산책 중 물가에 빠져 허우적대던 어린아이를 발견하자마자 주저 없이 물에 뛰어들어 안전하게 구조해낸 전직 소방관님의 숭고한 용기입니다.' },
          { title: '행인을 살려낸 퇴근길 간호대생', content: '길거리에서 갑자기 쓰러진 50대 행인을 보고 신속하게 심폐소생술(CPR)을 실시하여 골든타임을 지키고 생명을 살려낸 간호대학생의 이야기입니다.' }
        ]
      },
      {
        id: 'daily',
        title: '오늘의 사연',
        emoji: '⏰',
        colorClass: 'cyan',
        stories: [
          { title: '지갑 찾아 2시간을 달려온 택시 기사', content: '택시에 두고 내린 전 재산이 든 지갑을 되돌려주기 위해, 일을 중단하고 왕복 2시간이 넘는 거리를 직접 찾아와 건네주신 양심적이고 정직한 기사님 사연입니다.' },
          { title: '날아간 지폐를 지킨 바람막이 초등생들', content: '폐지 줍던 할머니의 쌈짓돈이 바람에 날아가 흩어지자, 가던 길을 멈추고 온몸으로 바람을 막아 서며 차도로 뛰어들어 돈을 모두 찾아준 착한 학생들입니다.' },
          { title: '어린 형제 간식을 결제해준 청년', content: '편의점에서 동생에게 과자를 사주려다 예산이 부족해 난처해하던 초등학생 형제를 보고, 조용히 대신 결제해주고 도망치듯 자리를 뜬 멋진 청년의 이야기입니다.' },
          { title: '우산 없이 젖던 길동무에게 우산 나눔', content: '갑작스러운 한여름 소나기에 당황하여 비를 맞고 서 있는 낯선 행인에게 본인의 우산을 선뜻 씌워주며 버스 정류장까지 동행해준 따뜻한 시민의 사례입니다.' },
          { title: '길고양이들의 대모, 캣맘 이웃', content: '동네 상가 구석의 길고양이들에게 매일 깨끗한 급수와 사료를 제공하고, 다치거나 아픈 고양이들을 동물병원에 데려가 사비로 치료해주는 헌신적인 이웃입니다.' }
        ]
      },
      {
        id: 'punished',
        title: '혼난 사연',
        emoji: '🚨',
        colorClass: 'rose',
        stories: [
          { title: '도서관 열람실 유튜브 스피커 빌런', content: '모두가 조용히 공부하는 도서관 열람실 안에서 이어폰을 쓰지 않은 채 노트북 스피커로 개인 방송을 크게 틀고 시청하며 지적에도 아랑곳하지 않은 무개념 사연입니다.' },
          { title: '인도 무단 점거 아파트 무개념 주차', content: '어린아이들이 다니는 보도블록 위에 대형 SUV를 걸쳐 주차해두고, 이동을 요청하는 이웃 주민에게 적반하장으로 소리를 지르며 위협을 가한 민폐 차주의 이야기입니다.' },
          { title: '키즈카페 기물 파손 방관 부모', content: '아이가 전시된 비싼 놀이기구들을 발로 차서 부수고 있는데도 사과는커녕 "애들이 놀다 보면 그럴 수 있죠"라며 사장에게 소리를 치고 환불을 요구한 방관적 부모의 사례입니다.' },
          { title: '종업원 반말 투척 및 컵 투척 고객', content: '음식점에 방문해 어린 아르바이트생에게 시종일관 반말과 비하 발언을 쏟아붓고, 주문이 꼬이자 뜨거운 국물이 든 그릇을 바닥에 던지며 난동을 부린 갑질 고객 사연입니다.' },
          { title: '임산부석 가방 적치 양보 거부 승객', content: '만원 지하철 안에서 만삭의 임산부가 다가오자 임산부 배려석에 본인의 명품 가방을 얹어놓고 자는 척하며 양보를 완강히 거부해 승객들의 눈총을 받은 사연입니다.' }
        ]
      }
    ]
  },
  financeDashboard: {
    subtitle: 'PUBLIC FINANCE DASHBOARD',
    title: '실시간 공공 재정 대시보드',
    description: '칭찬연구소의 모든 후원금 유입과 집행 내역은 실시간으로 투명하게 공개됩니다.',
    initialSourced: 150000, // 누적 후원금액
    initialUsed: 100000,    // 누적 사용금액
    usageHistory: [
      {
        id: 'TX-9021',
        date: '2026-07-04',
        category: 'AI 인프라',
        title: 'AI 이미지/영상 생성 파이프라인 API 비용',
        amount: 15000,
        txHash: '0x3f5c8e4db7b9a12'
      },
      {
        id: 'TX-8842',
        date: '2026-07-02',
        category: '사회 기부',
        title: '소아암 어린이 재단 1차 공익 기부금 송금',
        amount: 50000,
        txHash: '0x7e8b2a3cf1d4f3c'
      },
      {
        id: 'TX-8710',
        date: '2026-06-28',
        category: 'AI 인프라',
        title: 'Faceless 숏폼 비디오 생성 GPU 서버 대여',
        amount: 25000,
        txHash: '0x1a2b3c4d5e6f8c9'
      },
      {
        id: 'TX-8604',
        date: '2026-06-25',
        category: '운영비',
        title: '도메인 등록 및 SSL 보안 인증서 갱신',
        amount: 10000,
        txHash: '0x9d8c7b6a5e4d7b6'
      }
    ]
  }
};
