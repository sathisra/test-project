import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, Shuffle } from 'lucide-react'
import { AlgorithmState, SearchStep } from '../../types'

interface BinarySearchVisualizerProps {
  algorithmState: AlgorithmState
  setAlgorithmState: React.Dispatch<React.SetStateAction<AlgorithmState>>
}

const BinarySearchVisualizer: React.FC<BinarySearchVisualizerProps> = ({
  algorithmState,
  setAlgorithmState,
}) => {
  const [array, setArray] = useState<number[]>([1, 3, 5, 7, 9, 11, 13, 15, 17, 19])
  const [target, setTarget] = useState<number>(7)
  const [inputValue, setInputValue] = useState<string>('1,3,5,7,9,11,13,15,17,19')

  console.log('BinarySearchVisualizer rendering, array:', array, 'target:', target)

  const generateSteps = useCallback((arr: number[], targetValue: number): SearchStep[] => {
    console.log('Generating binary search steps for:', arr, 'target:', targetValue)
    const steps: SearchStep[] = []
    
    steps.push({
      id: 0,
      description: `Starting Binary Search for target value ${targetValue} in sorted array`,
      data: { array: [...arr], target: targetValue }
    })

    let left = 0
    let right = arr.length - 1
    let found = false

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      
      steps.push({
        id: steps.length,
        description: `Setting pointers: left=${left}, right=${right}, calculating mid=${mid}`,
        data: { 
          array: [...arr], 
          target: targetValue,
          left, 
          right, 
          mid 
        }
      })

      steps.push({
        id: steps.length,
        description: `Comparing target ${targetValue} with middle element ${arr[mid]} at index ${mid}`,
        data: { 
          array: [...arr], 
          target: targetValue,
          left, 
          right, 
          mid 
        }
      })

      if (arr[mid] === targetValue) {
        steps.push({
          id: steps.length,
          description: `Found! Target ${targetValue} found at index ${mid}`,
          data: { 
            array: [...arr], 
            target: targetValue,
            left, 
            right, 
            mid,
            found: true 
          }
        })
        found = true
        break
      } else if (arr[mid] < targetValue) {
        steps.push({
          id: steps.length,
          description: `${arr[mid]} < ${targetValue}, target is in the right half. Moving left pointer to ${mid + 1}`,
          data: { 
            array: [...arr], 
            target: targetValue,
            left, 
            right, 
            mid 
          }
        })
        left = mid + 1
      } else {
        steps.push({
          id: steps.length,
          description: `${arr[mid]} > ${targetValue}, target is in the left half. Moving right pointer to ${mid - 1}`,
          data: { 
            array: [...arr], 
            target: targetValue,
            left, 
            right, 
            mid 
          }
        })
        right = mid - 1
      }
    }

    if (!found) {
      steps.push({
        id: steps.length,
        description: `Target ${targetValue} not found in the array. left > right, search space exhausted.`,
        data: { 
          array: [...arr], 
          target: targetValue,
          found: false 
        }
      })
    }

    console.log('Generated', steps.length, 'steps')
    return steps
  }, [])

  const handleArrayInput = (value: string) => {
    setInputValue(value)
    try {
      const newArray = value.split(',')
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n))
        .sort((a, b) => a - b) // Keep sorted for binary search
      
      if (newArray.length > 0 && newArray.length <= 15) {
        console.log('Setting new sorted array:', newArray)
        setArray(newArray)
      }
    } catch (error) {
      console.error('Invalid array input:', error)
    }
  }

  const generateRandomArray = () => {
    const size = 8 + Math.floor(Math.random() * 5) // 8-12 elements
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 1)
      .sort((a, b) => a - b) // Keep sorted for binary search
    
    console.log('Generated random sorted array:', newArray)
    setArray(newArray)
    setInputValue(newArray.join(','))
    
    // Set a random target from the array or nearby
    const randomTarget = Math.random() > 0.7 
      ? Math.floor(Math.random() * 60) + 1 // Random number that might not be in array
      : newArray[Math.floor(Math.random() * newArray.length)] // Number from array
    setTarget(randomTarget)
  }

  const startVisualization = () => {
    console.log('Starting binary search visualization')
    const steps = generateSteps(array, target)
    setAlgorithmState(prev => ({
      ...prev,
      steps,
      currentStep: 0,
      isFinished: false
    }))
  }

  // Auto-play functionality
  useEffect(() => {
    if (!algorithmState.isPlaying || algorithmState.steps.length === 0) return

    const timer = setTimeout(() => {
      setAlgorithmState(prev => {
        const nextStep = prev.currentStep + 1
        if (nextStep >= prev.steps.length) {
          console.log('Algorithm finished')
          return { ...prev, isPlaying: false, isFinished: true }
        }
        console.log('Auto-stepping to step', nextStep)
        return { ...prev, currentStep: nextStep }
      })
    }, algorithmState.speed)

    return () => clearTimeout(timer)
  }, [algorithmState.isPlaying, algorithmState.currentStep, algorithmState.speed, setAlgorithmState])

  const currentStep = algorithmState.steps[algorithmState.currentStep] as SearchStep | undefined
  const displayArray = currentStep?.data.array || array
  const left = currentStep?.data.left
  const right = currentStep?.data.right
  const mid = currentStep?.data.mid
  const found = currentStep?.data.found

  const getElementStyle = (index: number, value: number) => {
    if (found && index === mid) return 'bg-green-500 border-green-400 scale-110'
    if (index === mid) return 'bg-yellow-500 border-yellow-400 animate-pulse'
    if (left !== undefined && right !== undefined && (index < left || index > right)) {
      return 'bg-gray-600 border-gray-500 opacity-50' // Outside search range
    }
    if (value === target) return 'bg-purple-500 border-purple-400'
    return 'bg-blue-500 border-blue-400'
  }

  const getPointerLabel = (index: number) => {
    const labels = []
    if (index === left) labels.push('L')
    if (index === right) labels.push('R') 
    if (index === mid) labels.push('M')
    return labels.join(',')
  }

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Sorted Array (comma-separated numbers, max 15 elements):
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleArrayInput(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="1,3,5,7,9,11,13,15,17,19"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Target Value:</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="7"
            />
            <button
              onClick={generateRandomArray}
              className="flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors"
              title="Generate Random Array"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={startVisualization}
              disabled={algorithmState.isPlaying}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:bg-gray-600 text-white rounded-md transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="flex flex-wrap items-center justify-center gap-2 min-h-32">
        {displayArray.map((value, index) => (
          <motion.div
            key={`${index}-${value}`}
            className={`
              relative flex flex-col items-center justify-center w-16 h-16 rounded-md border-2 transition-all duration-500
              ${getElementStyle(index, value)}
            `}
            animate={{
              scale: index === mid ? 1.1 : 1,
              y: index === mid ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white font-semibold text-sm">{value}</span>
            <span className="text-xs text-white/80">{index}</span>
            {getPointerLabel(index) && (
              <div className="absolute -bottom-6 text-xs font-bold text-yellow-300">
                {getPointerLabel(index)}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Search Info */}
      <div className="text-center space-y-2">
        <div className="text-lg">
          <span className="text-gray-300">Searching for: </span>
          <span className="text-purple-300 font-bold text-xl">{target}</span>
        </div>
        {currentStep && (
          <div className="text-sm text-gray-400">
            {left !== undefined && right !== undefined && (
              <>Search range: [{left}, {right}] | </>
            )}
            {mid !== undefined && (
              <>Mid: {mid} (value: {displayArray[mid]}) | </>
            )}
            {found !== undefined && (
              <span className={found ? 'text-green-400' : 'text-red-400'}>
                {found ? '✓ Found' : '✗ Not Found'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded border border-blue-400"></div>
          <span className="text-gray-300">In Range</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600 rounded border border-gray-500"></div>
          <span className="text-gray-300">Out of Range</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded border border-yellow-400"></div>
          <span className="text-gray-300">Mid (M)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded border border-green-400"></div>
          <span className="text-gray-300">Found</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-300 font-bold">L</span>
          <span className="text-gray-300">Left Pointer</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-300 font-bold">R</span>
          <span className="text-gray-300">Right Pointer</span>
        </div>
      </div>
    </div>
  )
}

export default BinarySearchVisualizer