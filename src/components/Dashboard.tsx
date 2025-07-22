'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useCleaningTasks } from '@/hooks/useCleaningTasks'
import { useGroceryItems } from '@/hooks/useGroceryItems'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'
import GroceryCard from './GroceryCard'
import GroceryForm from './GroceryForm'
import { Plus, LogOut, CheckSquare, ShoppingCart, Home } from 'lucide-react'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<'tasks' | 'grocery'>('tasks')
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showGroceryForm, setShowGroceryForm] = useState(false)
  const [taskFilter, setTaskFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all')

  const {
    tasks,
    loading: tasksLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  } = useCleaningTasks()

  const {
    items,
    loading: itemsLoading,
    addItem,
    updateItem,
    deleteItem,
    togglePurchased,
  } = useGroceryItems()

  const filteredTasks = tasks.filter(task => 
    taskFilter === 'all' || task.category === taskFilter
  )

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const purchasedItems = items.filter(item => item.purchased).length
  const totalItems = items.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Home className="text-blue-600" size={24} />
              <h1 className="text-xl font-semibold text-gray-900">CleanNest</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cleaning Tasks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedTasks}/{totalTasks}
                </p>
                <p className="text-sm text-gray-500">
                  {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% completed
                </p>
              </div>
              <CheckSquare className="text-blue-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shopping List</p>
                <p className="text-2xl font-bold text-gray-900">
                  {purchasedItems}/{totalItems}
                </p>
                <p className="text-sm text-gray-500">
                  {totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0}% purchased
                </p>
              </div>
              <ShoppingCart className="text-green-600" size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'tasks'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cleaning Tasks
          </button>
          <button
            onClick={() => setActiveTab('grocery')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'grocery'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Shopping List
          </button>
        </div>

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setTaskFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    taskFilter === 'all'
                      ? 'bg-blue-200 text-blue-900 font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTaskFilter('daily')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    taskFilter === 'daily'
                      ? 'bg-green-200 text-green-900 font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setTaskFilter('weekly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    taskFilter === 'weekly'
                      ? 'bg-blue-200 text-blue-900 font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTaskFilter('monthly')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    taskFilter === 'monthly'
                      ? 'bg-purple-200 text-purple-900 font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
              </div>
              
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={16} />
                Add Task
              </button>
            </div>

            {tasksLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckSquare className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first cleaning task!</p>
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Your First Task
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Grocery Tab */}
        {activeTab === 'grocery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Cleaning Products</h2>
              <button
                onClick={() => setShowGroceryForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>

            {itemsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
                <p className="text-gray-600 mb-4">Add cleaning products to your shopping list!</p>
                <button
                  onClick={() => setShowGroceryForm(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Your First Item
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {items.map((item) => (
                  <GroceryCard
                    key={item.id}
                    item={item}
                    onTogglePurchased={togglePurchased}
                    onDelete={deleteItem}
                    onUpdate={updateItem}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showTaskForm && (
        <TaskForm
          onSubmit={addTask}
          onClose={() => setShowTaskForm(false)}
        />
      )}

      {showGroceryForm && (
        <GroceryForm
          onSubmit={addItem}
          onClose={() => setShowGroceryForm(false)}
        />
      )}
    </div>
  )
}
