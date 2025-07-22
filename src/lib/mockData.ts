// Mock data for development
export interface CleaningTask {
  id: string
  user_id: string
  title: string
  description: string | null
  category: 'daily' | 'weekly' | 'monthly'
  completed: boolean
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface GroceryItem {
  id: string
  user_id: string
  name: string
  brand: string | null
  quantity: number
  purchased: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
}

// Mock user
export const mockUser: User = {
  id: 'mock-user-123',
  email: 'demo@cleannest.com'
}

// Mock cleaning tasks
export const mockTasks: CleaningTask[] = [
  {
    id: '1',
    user_id: 'mock-user-123',
    title: 'Vacuum living room',
    description: 'Focus on under the couch and around the coffee table',
    category: 'weekly',
    completed: false,
    due_date: '2024-06-26',
    created_at: '2024-06-20T10:00:00Z',
    updated_at: '2024-06-20T10:00:00Z'
  },
  {
    id: '2',
    user_id: 'mock-user-123',
    title: 'Wipe down kitchen counters',
    description: null,
    category: 'daily',
    completed: true,
    due_date: null,
    created_at: '2024-06-20T09:00:00Z',
    updated_at: '2024-06-24T08:00:00Z'
  },
  {
    id: '3',
    user_id: 'mock-user-123',
    title: 'Clean bathroom mirrors',
    description: 'Use glass cleaner for streak-free finish',
    category: 'weekly',
    completed: false,
    due_date: '2024-06-28',
    created_at: '2024-06-19T15:30:00Z',
    updated_at: '2024-06-19T15:30:00Z'
  },
  {
    id: '4',
    user_id: 'mock-user-123',
    title: 'Deep clean refrigerator',
    description: 'Remove all items, clean shelves and drawers',
    category: 'monthly',
    completed: false,
    due_date: '2024-07-01',
    created_at: '2024-06-18T12:00:00Z',
    updated_at: '2024-06-18T12:00:00Z'
  },
  {
    id: '5',
    user_id: 'mock-user-123',
    title: 'Make beds',
    description: null,
    category: 'daily',
    completed: true,
    due_date: null,
    created_at: '2024-06-24T07:00:00Z',
    updated_at: '2024-06-24T07:30:00Z'
  }
]

// Mock grocery items
export const mockGroceryItems: GroceryItem[] = [
  {
    id: '1',
    user_id: 'mock-user-123',
    name: 'All-purpose cleaner',
    brand: 'Lysol',
    quantity: 2,
    purchased: false,
    created_at: '2024-06-20T10:00:00Z',
    updated_at: '2024-06-20T10:00:00Z'
  },
  {
    id: '2',
    user_id: 'mock-user-123',
    name: 'Paper towels',
    brand: 'Bounty',
    quantity: 4,
    purchased: true,
    created_at: '2024-06-19T14:00:00Z',
    updated_at: '2024-06-23T16:00:00Z'
  },
  {
    id: '3',
    user_id: 'mock-user-123',
    name: 'Glass cleaner',
    brand: 'Windex',
    quantity: 1,
    purchased: false,
    created_at: '2024-06-18T11:00:00Z',
    updated_at: '2024-06-18T11:00:00Z'
  },
  {
    id: '4',
    user_id: 'mock-user-123',
    name: 'Toilet bowl cleaner',
    brand: null,
    quantity: 2,
    purchased: false,
    created_at: '2024-06-17T09:00:00Z',
    updated_at: '2024-06-17T09:00:00Z'
  },
  {
    id: '5',
    user_id: 'mock-user-123',
    name: 'Microfiber cloths',
    brand: 'Generic',
    quantity: 6,
    purchased: true,
    created_at: '2024-06-16T13:00:00Z',
    updated_at: '2024-06-22T10:00:00Z'
  }
]
