import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Shuffle } from 'lucide-react'
import { AlgorithmState, SortingStep } from '../../types'

interface BubbleSortVisualizerProps {
  algorithmState: AlgorithmState
  setAlgorithmState: React.Dispatch<React.SetStateAction<AlgorithmState>>
}

const BubbleSortVisualizer: React.FC<BubbleSortVisualizerProps> = ({
  algorithmState,
  setAlgorithmState,
}) => {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90])
  const [inputValue, setInputValue] = useState<string>('64,34,25,12,22,11,90')

  console.log('BubbleSortVisualizer rendering, array:', array)

  const generateSteps = useCallback((arr: number[]): SortingStep[] => {
    console.log('Generating bubble sort steps for:', arr)
    const steps: SortingStep[] = []
    const workingArray = [...arr]
    
    steps.push({
      id: 0,
      description: 'Starting Bubble Sort - we will compare adjacent elements and swap them if they are in wrong order',
      data: { array: [...workingArray] }
    })

    for (let i = 0; i < workingArray.length - 1; i++) {
      for (let j = 0; j < workingArray.length - i - 1; j++) {
        // Show comparison
        steps.push({
          id: steps.length,
          description: `Comparing elements at positions ${j} and ${j + 1}: ${workingArray[j]} and ${workingArray[j + 1]}`,
          data: {
            array: [...workingArray],
            comparing: [j, j + 1] as [number, number]
          }
        })

        // Check if swap is needed
        if (workingArray[j] > workingArray[j + 1]) {
          const leftValue = workingArray[j]
          const rightValue = workingArray[j + 1]
          
          // Show pre-swap state with highlighting
          steps.push({
            id: steps.length,
            description: `${leftValue} > ${rightValue}, need to swap! Lifting ${leftValue} over ${rightValue}...`,
            data: {
              array: [...workingArray],
              swapping: [j, j + 1] as [number, number]
            }
          })

          // Perform swap
          workingArray[j] = rightValue
          workingArray[j + 1] = leftValue

          // Show mid-swap animation state (elements in motion)
          steps.push({
            id: steps.length,
            description: `🎯 ${leftValue} is moving over ${rightValue} like a chess piece! Watch the arcing movement...`,
            data: {
              array: [...workingArray],
              swapping: [j, j + 1] as [number, number]
            }
          })

          // Show result after swap
          steps.push({
            id: steps.length,
            description: `✓ Perfect! ${rightValue} and ${leftValue} have swapped positions using chess-like movement`,
            data: {
              array: [...workingArray]
            }
          })
        } else {
          steps.push({
            id: steps.length,
            description: `${workingArray[j]} ≤ ${workingArray[j + 1]}, already in correct order - no movement needed`,
            data: {
              array: [...workingArray]
            }
          })
        }
      }
      
      // Mark the last element of this pass as sorted
      steps.push({
        id: steps.length,
        description: `Pass ${i + 1} completed. Element ${workingArray[workingArray.length - 1 - i]} is now in its final position`,
        data: {
          array: [...workingArray],
          sorted: Array.from({ length: i + 1 }, (_, idx) => workingArray.length - 1 - idx)
        }
      })
    }

    steps.push({
      id: steps.length,
      description: 'Bubble Sort completed! All elements are now in ascending order.',
      data: {
        array: [...workingArray],
        sorted: Array.from({ length: workingArray.length }, (_, idx) => idx)
      }
    })

    console.log('Generated', steps.length, 'steps')
    return steps
  }, [])

  const handleArrayInput = (value: string) => {
    setInputValue(value)
    try {
      const newArray = value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
      if (newArray.length > 0 && newArray.length <= 10) {
        console.log('Setting new array:', newArray)
        setArray(newArray)
      }
    } catch (error) {
      console.error('Invalid array input:', error)
    }
  }

  const generateRandomArray = () => {
    const size = 6 + Math.floor(Math.random() * 3) // 6-8 elements
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
    console.log('Generated random array:', newArray)
    setArray(newArray)
    setInputValue(newArray.join(','))
  }

  const startVisualization = () => {
    console.log('Starting bubble sort visualization')
    const steps = generateSteps(array)
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

  const currentStep = algorithmState.steps[algorithmState.currentStep] as SortingStep | undefined
  const displayArray = currentStep?.data.array || array
  const comparing = currentStep?.data.comparing
  const swapping = currentStep?.data.swapping
  const sorted = currentStep?.data.sorted || []

  const getElementStyle = (index: number) => {
    if (sorted.includes(index)) return 'bg-green-500 border-green-400 shadow-lg shadow-green-500/30'
    if (comparing?.includes(index)) return 'bg-yellow-500 border-yellow-400 array-element comparing'
    if (swapping?.includes(index)) return 'bg-red-500 border-red-400 array-element swapping'
    return 'bg-blue-500 border-blue-400 hover:bg-blue-400 transition-colors duration-200'
  }

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-64">
          <label className="block text-sm text-gray-300 mb-2">
            Array (comma-separated numbers, max 10 elements):
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleArrayInput(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="64,34,25,12,22,11,90"
          />
        </div>
        <button
          onClick={generateRandomArray}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          <span>Random</span>
        </button>
        <button
          onClick={startVisualization}
          disabled={algorithmState.isPlaying}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-500 disabled:bg-gray-600 text-white rounded-md transition-colors"
        >
          Start Sort
        </button>
      </div>

      {/* Array Visualization */}
      <div className="flex items-end justify-center space-x-2 min-h-80">
        {displayArray.map((value, index) => {
          // Determine which element should go "over" the other during swap
          const isSwappingLeft = swapping?.[0] === index
          const isSwappingRight = swapping?.[1] === index
          const isSwapping = isSwappingLeft || isSwappingRight
          
          // The larger element goes over the smaller one (like picking up the bigger chess piece)
          const shouldGoHigh = isSwapping && swapping && 
            ((isSwappingLeft && displayArray[swapping[0]] > displayArray[swapping[1]]) ||
             (isSwappingRight && displayArray[swapping[1]] > displayArray[swapping[0]]))

          return (
            <motion.div
              key={`element-${value}`}
              className={`
                relative flex flex-col items-center justify-end p-2 rounded-md border-2 transition-all duration-500
                ${getElementStyle(index)}
              `}
              style={{ 
                height: `${Math.max(40, (value / Math.max(...displayArray)) * 200)}px`,
                zIndex: shouldGoHigh ? 10 : isSwapping ? 5 : 1 // Higher z-index for the element going over
              }}
              layout
              animate={{
                scale: isSwapping ? 1.1 : comparing?.includes(index) ? 1.05 : 1,
                y: shouldGoHigh ? -60 : isSwapping ? -10 : comparing?.includes(index) ? -5 : 0,
                rotate: shouldGoHigh ? [0, -8, 8, -5, 0] : isSwapping ? [0, 3, -3, 0] : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
                duration: isSwapping ? 1.2 : 0.4,
                layout: {
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                  duration: 1.0
                }
              }}
            >
              <span className="text-white font-semibold text-sm">{value}</span>
              <span className="text-xs text-white/80 mt-1">{index}</span>
              
              {/* Add a subtle shadow when element is high up */}
              {shouldGoHigh && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm"
                  animate={{
                    scaleX: [0.5, 1.5, 0.5],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 1.2, repeat: 0 }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded border border-blue-400"></div>
          <span className="text-gray-300">Unsorted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded border border-yellow-400"></div>
          <span className="text-gray-300">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded border border-red-400"></div>
          <span className="text-gray-300">Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded border border-green-400"></div>
          <span className="text-gray-300">Sorted</span>
        </div>
      </div>
    </div>
  )
}

export default BubbleSortVisualizer