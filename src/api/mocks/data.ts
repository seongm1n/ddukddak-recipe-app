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

const tteokbokkiIngredients: readonly Ingredient[] = [
  { id: 'ing-201', name: '떡볶이 떡', quantity: '400', unit: 'g', price: 3000 },
  { id: 'ing-202', name: '어묵', quantity: '200', unit: 'g', price: 2500 },
  { id: 'ing-203', name: '고추장', quantity: '3', unit: '큰술', price: 600 },
  { id: 'ing-204', name: '고춧가루', quantity: '1', unit: '큰술', price: 300 },
  { id: 'ing-205', name: '설탕', quantity: '2', unit: '큰술', price: 200 },
  { id: 'ing-206', name: '간장', quantity: '1', unit: '큰술', price: 100 },
  { id: 'ing-207', name: '대파', quantity: '1', unit: '대', price: 800 },
  { id: 'ing-208', name: '삶은 달걀', quantity: '2', unit: '개', price: 700 },
]

const gimbapIngredients: readonly Ingredient[] = [
  { id: 'ing-301', name: '밥', quantity: '3', unit: '공기', price: 1500 },
  { id: 'ing-302', name: '김', quantity: '5', unit: '장', price: 2000 },
  { id: 'ing-303', name: '단무지', quantity: '100', unit: 'g', price: 1000 },
  { id: 'ing-304', name: '시금치', quantity: '100', unit: 'g', price: 1500 },
  { id: 'ing-305', name: '당근', quantity: '1', unit: '개', price: 800 },
  { id: 'ing-306', name: '달걀', quantity: '3', unit: '개', price: 1000 },
  { id: 'ing-307', name: '햄', quantity: '100', unit: 'g', price: 2000 },
  { id: 'ing-308', name: '참기름', quantity: '2', unit: '큰술', price: 600 },
]

const japchaeIngredients: readonly Ingredient[] = [
  { id: 'ing-401', name: '당면', quantity: '200', unit: 'g', price: 2500 },
  { id: 'ing-402', name: '소고기', quantity: '150', unit: 'g', price: 5000 },
  { id: 'ing-403', name: '시금치', quantity: '100', unit: 'g', price: 1500 },
  { id: 'ing-404', name: '당근', quantity: '1', unit: '개', price: 800 },
  { id: 'ing-405', name: '양파', quantity: '1', unit: '개', price: 1000 },
  { id: 'ing-406', name: '표고버섯', quantity: '5', unit: '개', price: 2000 },
  { id: 'ing-407', name: '간장', quantity: '4', unit: '큰술', price: 400 },
  { id: 'ing-408', name: '참기름', quantity: '2', unit: '큰술', price: 600 },
  { id: 'ing-409', name: '설탕', quantity: '2', unit: '큰술', price: 200 },
]

const calculateTotalCost = (ingredients: readonly Ingredient[]): number =>
  ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)

// 실제 유튜브 영상 ID 사용
export const MOCK_RECIPES: readonly Recipe[] = [
  {
    id: 'recipe-001',
    title: '백종원 김치찌개 황금레시피',
    videoUrl: 'https://www.youtube.com/watch?v=vqb3WyZmL_8',
    thumbnailUrl: 'https://img.youtube.com/vi/vqb3WyZmL_8/maxresdefault.jpg',
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
    title: '초간단 떡볶이 레시피',
    videoUrl: 'https://youtube.com/shorts/2RH1zES4RRA',
    thumbnailUrl: 'https://img.youtube.com/vi/2RH1zES4RRA/maxresdefault.jpg',
    channelName: '요리shorts',
    steps: [
      '떡볶이 떡은 물에 10분 정도 불려주세요.',
      '어묵은 먹기 좋은 크기로 잘라주세요.',
      '냄비에 물 400ml를 넣고 고추장, 고춧가루, 설탕, 간장을 넣어 양념장을 만들어주세요.',
      '양념장이 끓으면 떡과 어묵을 넣어주세요.',
      '중불에서 떡이 말랑해질 때까지 저어가며 끓여주세요.',
      '대파와 삶은 달걀을 넣고 한소끔 더 끓이면 완성입니다.',
    ],
    ingredients: tteokbokkiIngredients,
    totalCost: calculateTotalCost(tteokbokkiIngredients),
    servings: 2,
  },
  {
    id: 'recipe-003',
    title: '소풍 도시락 김밥 맛있게 싸는 법',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&h=450&fit=crop',
    channelName: '백종원의 요리비책',
    steps: [
      '밥에 참기름과 소금을 넣어 양념해주세요.',
      '시금치는 데쳐서 참기름, 소금으로 무쳐주세요.',
      '당근은 채 썰어 볶고, 달걀은 지단을 부쳐 채 썰어주세요.',
      '김 위에 밥을 얇게 펴고 재료를 올려주세요.',
      '돌돌 말아서 참기름을 발라주세요.',
      '먹기 좋은 크기로 썰어 완성합니다.',
    ],
    ingredients: gimbapIngredients,
    totalCost: calculateTotalCost(gimbapIngredients),
    servings: 3,
  },
  {
    id: 'recipe-004',
    title: '명절 잡채 황금레시피',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580651214613-f4692d6d138f?w=800&h=450&fit=crop',
    channelName: '백종원의 요리비책',
    steps: [
      '당면을 끓는 물에 7분간 삶아 찬물에 헹궈주세요.',
      '시금치는 데쳐서 참기름으로 무쳐주세요.',
      '당근, 양파는 채 썰어 각각 볶아주세요.',
      '소고기는 간장, 설탕으로 양념해 볶아주세요.',
      '표고버섯도 채 썰어 볶아주세요.',
      '큰 볼에 당면과 모든 재료를 넣고 간장, 참기름, 설탕으로 버무려 완성합니다.',
    ],
    ingredients: japchaeIngredients,
    totalCost: calculateTotalCost(japchaeIngredients),
    servings: 4,
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
