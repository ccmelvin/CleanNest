'use client'

import { useState } from 'react'
import { CleaningTask } from '@/lib/mockData'
import { Check, Edit2, Trash2, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface TaskCardProps {
  task: CleaningTask
  onToggleComplete: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<CleaningTask>) => void
}

export default function TaskCard({ task, onToggleComplete, onDelete, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')

  const categoryColors = {
    daily: 'bg-green-200 text-green-900',
    weekly: 'bg-blue-200 text-blue-900',
    monthly: 'bg-purple-200 text-purple-900',
  }

  const handleSaveEdit = async () => {
    try {
      await onUpdate(task.id, {
        title: editTitle,
        description: editDescription || null,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setIsEditing(false)
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id, !task.completed)}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {task.completed && <Check size={12} />}
          </button>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  rows={2}
                  placeholder="Description..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm text-gray-700 mt-1 ${task.completed ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-blue-600"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
          {task.category}
        </span>
        
        {task.due_date && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} />
            {format(new Date(task.due_date), 'MMM d')}
          </div>
        )}
      </div>
    </div>
  )
}
