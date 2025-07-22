'use client'

import { useState, useEffect } from 'react'
import { GroceryItem, mockGroceryItems } from '@/lib/mockData'
import { useAuth } from '@/contexts/AuthContext'

export function useGroceryItems() {
  const [items, setItems] = useState<GroceryItem[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Simulate loading delay
      setTimeout(() => {
        setItems(mockGroceryItems)
        setLoading(false)
      }, 500)
    } else {
      setItems([])
      setLoading(false)
    }
  }, [user])

  const addItem = async (item: {
    name: string
    brand?: string
    quantity?: number
  }) => {
    if (!user) return

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const newItem: GroceryItem = {
      id: 'item-' + Date.now(),
      user_id: user.id,
      name: item.name,
      brand: item.brand || null,
      quantity: item.quantity || 1,
      purchased: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setItems([newItem, ...items])
  }

  const updateItem = async (id: string, updates: Partial<GroceryItem>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))

    setItems(items.map(item => 
      item.id === id 
        ? { ...item, ...updates, updated_at: new Date().toISOString() }
        : item
    ))
  }

  const deleteItem = async (id: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))

    setItems(items.filter(item => item.id !== id))
  }

  const togglePurchased = async (id: string, purchased: boolean) => {
    await updateItem(id, { purchased })
  }

  const refetch = async () => {
    setLoading(true)
    // Simulate refetch delay
    setTimeout(() => {
      setItems([...mockGroceryItems])
      setLoading(false)
    }, 500)
  }

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    togglePurchased,
    refetch
  }
}
