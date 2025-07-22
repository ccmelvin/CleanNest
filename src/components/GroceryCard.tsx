'use client'

import { useState } from 'react'
import { GroceryItem } from '@/lib/mockData'
import { Check, Edit2, Trash2, ShoppingCart } from 'lucide-react'

interface GroceryCardProps {
  item: GroceryItem
  onTogglePurchased: (id: string, purchased: boolean) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<GroceryItem>) => void
}

export default function GroceryCard({ item, onTogglePurchased, onDelete, onUpdate }: GroceryCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(item.name)
  const [editBrand, setEditBrand] = useState(item.brand || '')
  const [editQuantity, setEditQuantity] = useState(item.quantity)

  const handleSaveEdit = async () => {
    try {
      await onUpdate(item.id, {
        name: editName,
        brand: editBrand || null,
        quantity: editQuantity,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditName(item.name)
    setEditBrand(item.brand || '')
    setEditQuantity(item.quantity)
    setIsEditing(false)
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 ${item.purchased ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => onTogglePurchased(item.id, !item.purchased)}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
              item.purchased
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {item.purchased && <Check size={12} />}
          </button>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Product name"
                />
                <input
                  type="text"
                  value={editBrand}
                  onChange={(e) => setEditBrand(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Brand (optional)"
                />
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  min="1"
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
                <h3 className={`font-medium text-gray-900 ${item.purchased ? 'line-through' : ''}`}>
                  {item.name}
                </h3>
                {item.brand && (
                  <p className={`text-sm text-gray-700 ${item.purchased ? 'line-through' : ''}`}>
                    {item.brand}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-700 font-medium">Qty: {item.quantity}</span>
                  {item.purchased && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600">
                      <ShoppingCart size={12} />
                      Purchased
                    </span>
                  )}
                </div>
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
              onClick={() => onDelete(item.id)}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
