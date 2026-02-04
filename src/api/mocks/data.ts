import type { FeedItem, Ingredient, Recipe, User } from '@/types'

export const MOCK_USER: User = {
  id: 'user-001',
  email: 'jimin.park@example.com',
  name: '박지민',
  avatarUrl: 'https://i.pravatar.cc/150?u=jimin',
  provider: 'google',
  createdAt: '2025-12-01T09:00:00Z',
}

export const MOCK_AUTHORS: readonly User[] = [
  {
    id: 'user-002',
    email: 'soojin.lee@example.com',
    name: '이수진',
    avatarUrl: 'https://i.pravatar.cc/150?u=soojin',
    provider: 'apple',
    createdAt: '2025-11-15T14:30:00Z',
  },
  {
    id: 'user-003',
    email: 'minho.kim@example.com',
    name: '김민호',
    avatarUrl: 'https://i.pravatar.cc/150?u=minho',
    provider: 'google',
    createdAt: '2025-10-20T08:00:00Z',
  },
  {
    id: 'user-004',
    email: 'yuna.choi@example.com',
    name: '최유나',
    avatarUrl: 'https://i.pravatar.cc/150?u=yuna',
    provider: 'google',
    createdAt: '2025-09-05T11:00:00Z',
  },
]

const kimchiJjigaeIngredients: readonly Ingredient[] = [
  { id: 'ing-101', name: '묵은지 김치', quantity: '300', unit: 'g', price: 4000 },
  { id: 'ing-102', name: '돼지고기 앞다리살', quantity: '300', unit: 'g', price: 6000 },
  { id: 'ing-103', name: '두부', quantity: '1', unit: '모', price: 1500 },
  { id: 'ing-104', name: '대파', quantity: '1', unit: '대', price: 800 },
  { id: 'ing-105', name: '고춧가루', quantity: '1', unit: '큰술', price: 500, note: '매운맛 조절 가능' },
  { id: 'ing-106', name: '다진 마늘', quantity: '1', unit: '큰술', price: 300 },
  { id: 'ing-107', name: '국간장', quantity: '1', unit: '큰술', price: 200 },
  { id: 'ing-108', name: '참기름', quantity: '1', unit: '작은술', price: 300 },
]

const doenjangJjigaeIngredients: readonly Ingredient[] = [
  { id: 'ing-201', name: '된장', quantity: '2', unit: '큰술', price: 600 },
  { id: 'ing-202', name: '두부', quantity: '1', unit: '모', price: 1500 },
  { id: 'ing-203', name: '호박', quantity: '0.5', unit: '개', price: 1000 },
  { id: 'ing-204', name: '양파', quantity: '0.5', unit: '개', price: 500 },
  { id: 'ing-205', name: '청양고추', quantity: '2', unit: '개', price: 400 },
  { id: 'ing-206', name: '대파', quantity: '1', unit: '대', price: 800 },
  { id: 'ing-207', name: '감자', quantity: '1', unit: '개', price: 600 },
  { id: 'ing-208', name: '멸치 육수', quantity: '500', unit: 'ml', price: 1200, note: '멸치+다시마' },
]

const bulgogiIngredients: readonly Ingredient[] = [
  { id: 'ing-301', name: '소고기 불고기용', quantity: '500', unit: 'g', price: 15000 },
  { id: 'ing-302', name: '배', quantity: '0.25', unit: '개', price: 1000, note: '갈아서 양념에 사용' },
  { id: 'ing-303', name: '간장', quantity: '4', unit: '큰술', price: 400 },
  { id: 'ing-304', name: '설탕', quantity: '2', unit: '큰술', price: 200 },
  { id: 'ing-305', name: '다진 마늘', quantity: '1', unit: '큰술', price: 300 },
  { id: 'ing-306', name: '참기름', quantity: '2', unit: '큰술', price: 600 },
  { id: 'ing-307', name: '양파', quantity: '1', unit: '개', price: 1000 },
  { id: 'ing-308', name: '대파', quantity: '1', unit: '대', price: 800 },
  { id: 'ing-309', name: '후추', quantity: '0.5', unit: '작은술', price: 100 },
]

const bibimbapIngredients: readonly Ingredient[] = [
  { id: 'ing-401', name: '밥', quantity: '2', unit: '공기', price: 1000 },
  { id: 'ing-402', name: '소고기 다짐육', quantity: '150', unit: 'g', price: 5000 },
  { id: 'ing-403', name: '시금치', quantity: '100', unit: 'g', price: 1500 },
  { id: 'ing-404', name: '콩나물', quantity: '100', unit: 'g', price: 800 },
  { id: 'ing-405', name: '당근', quantity: '0.5', unit: '개', price: 500 },
  { id: 'ing-406', name: '호박', quantity: '0.5', unit: '개', price: 1000 },
  { id: 'ing-407', name: '달걀', quantity: '2', unit: '개', price: 700 },
  { id: 'ing-408', name: '고추장', quantity: '2', unit: '큰술', price: 500 },
  { id: 'ing-409', name: '참기름', quantity: '1', unit: '큰술', price: 300 },
]

const calculateTotalCost = (ingredients: readonly Ingredient[]): number =>
  ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)

export const MOCK_RECIPES: readonly Recipe[] = [
  {
    id: 'recipe-001',
    title: '집밥 김치찌개 - 묵은지로 깊은 맛내기',
    videoUrl: 'https://www.youtube.com/watch?v=T8-rEhKmFBo',
    thumbnailUrl: 'https://img.youtube.com/vi/T8-rEhKmFBo/maxresdefault.jpg',
    channelName: '백종원의 요리비책',
    steps: [
      '묵은지 김치를 한입 크기로 잘라주세요.',
      '돼지고기 앞다리살을 먹기 좋은 크기로 썰어주세요.',
      '냄비에 참기름을 두르고 돼지고기를 볶다가 김치를 넣고 함께 볶아주세요.',
      '물 500ml를 붓고 고춧가루, 다진 마늘, 국간장을 넣어 끓여주세요.',
      '끓기 시작하면 중불로 줄이고 15분간 더 끓여주세요.',
      '두부를 넣고 대파를 송송 썰어 올린 후 3분 더 끓이면 완성입니다.',
    ],
    ingredients: kimchiJjigaeIngredients,
    totalCost: calculateTotalCost(kimchiJjigaeIngredients),
    servings: 2,
  },
  {
    id: 'recipe-002',
    title: '구수한 된장찌개 끓이는 법',
    videoUrl: 'https://www.youtube.com/watch?v=qWbHSOplcvY',
    thumbnailUrl: 'https://img.youtube.com/vi/qWbHSOplcvY/maxresdefault.jpg',
    channelName: '만개의레시피',
    steps: [
      '멸치와 다시마로 육수를 우려내 준비해주세요.',
      '감자와 호박, 양파를 먹기 좋게 깍둑썰기 해주세요.',
      '육수에 된장을 풀고 감자를 먼저 넣어 끓여주세요.',
      '감자가 반쯤 익으면 호박, 양파, 청양고추를 넣어주세요.',
      '두부를 넣고 대파를 올려 한소끔 더 끓이면 완성입니다.',
    ],
    ingredients: doenjangJjigaeIngredients,
    totalCost: calculateTotalCost(doenjangJjigaeIngredients),
    servings: 2,
  },
  {
    id: 'recipe-003',
    title: '달콤 간장 불고기 황금레시피',
    videoUrl: 'https://www.youtube.com/watch?v=EkQaC_FzMFo',
    thumbnailUrl: 'https://img.youtube.com/vi/EkQaC_FzMFo/maxresdefault.jpg',
    channelName: '요리하는 남자',
    steps: [
      '배를 갈아서 간장, 설탕, 다진 마늘, 참기름, 후추와 섞어 양념장을 만들어주세요.',
      '소고기를 양념장에 넣고 30분 이상 재워주세요.',
      '양파는 채 썰고, 대파는 어슷 썰어 준비해주세요.',
      '팬에 기름을 두르고 센 불에서 양파를 먼저 볶아주세요.',
      '재운 소고기를 넣고 센 불에서 빠르게 볶아주세요.',
      '대파를 올리고 참기름을 한 바퀴 둘러 마무리합니다.',
    ],
    ingredients: bulgogiIngredients,
    totalCost: calculateTotalCost(bulgogiIngredients),
    servings: 3,
  },
  {
    id: 'recipe-004',
    title: '영양만점 전주 비빔밥 만들기',
    videoUrl: 'https://www.youtube.com/watch?v=6_RrDBJfKcc',
    thumbnailUrl: 'https://img.youtube.com/vi/6_RrDBJfKcc/maxresdefault.jpg',
    channelName: '백종원의 요리비책',
    steps: [
      '시금치, 콩나물은 각각 끓는 물에 데쳐 참기름과 소금으로 무쳐주세요.',
      '당근과 호박은 채 썰어 팬에 볶아주세요.',
      '소고기 다짐육은 간장, 설탕, 다진 마늘로 양념해 볶아주세요.',
      '달걀은 프라이로 준비해주세요 (반숙 권장).',
      '뜨거운 밥 위에 나물과 고기를 올리고 달걀프라이를 얹어주세요.',
      '고추장과 참기름을 넣고 잘 비벼 드세요.',
    ],
    ingredients: bibimbapIngredients,
    totalCost: calculateTotalCost(bibimbapIngredients),
    servings: 2,
  },
]

export const MOCK_FEED_ITEMS: readonly FeedItem[] = [
  {
    id: 'feed-001',
    recipe: MOCK_RECIPES[0],
    author: MOCK_USER,
    likes: 128,
    createdAt: '2026-01-28T18:30:00Z',
  },
  {
    id: 'feed-002',
    recipe: MOCK_RECIPES[1],
    author: MOCK_AUTHORS[0],
    likes: 95,
    createdAt: '2026-01-30T12:00:00Z',
  },
  {
    id: 'feed-003',
    recipe: MOCK_RECIPES[2],
    author: MOCK_AUTHORS[1],
    likes: 256,
    createdAt: '2026-02-01T09:15:00Z',
  },
  {
    id: 'feed-004',
    recipe: MOCK_RECIPES[3],
    author: MOCK_AUTHORS[2],
    likes: 74,
    createdAt: '2026-02-03T20:45:00Z',
  },
]
