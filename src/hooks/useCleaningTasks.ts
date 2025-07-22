'use client'

import { useState, useEffect } from 'react'
import { CleaningTask, mockTasks } from '@/lib/mockData'
import { useAuth } from '@/contexts/AuthContext'

export function useCleaningTasks() {
  const [tasks, setTasks] = useState<CleaningTask[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Simulate loading delay
      setTimeout(() => {
        setTasks(mockTasks)
        setLoading(false)
      }, 500)
    } else {
      setTasks([])
      setLoading(false)
    }
  }, [user])

  const addTask = async (task: {
    title: string
    description?: string
    category: 'daily' | 'weekly' | 'monthly'
    due_date?: string
  }) => {
    if (!user) return

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const newTask: CleaningTask = {
      id: 'task-' + Date.now(),
      user_id: user.id,
      title: task.title,
      description: task.description || null,
      category: task.category,
      completed: false,
      due_date: task.due_date || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setTasks([newTask, ...tasks])
  }

  const updateTask = async (id: string, updates: Partial<CleaningTask>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))

    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, ...updates, updated_at: new Date().toISOString() }
        : task
    ))
  }

  const deleteTask = async (id: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))

    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleComplete = async (id: string, completed: boolean) => {
    await updateTask(id, { completed })
  }

  const refetch = async () => {
    setLoading(true)
    // Simulate refetch delay
    setTimeout(() => {
      setTasks([...mockTasks])
      setLoading(false)
    }, 500)
  }

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refetch
  }
}
