import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Shuffle } from 'lucide-react'
import { AlgorithmState, SortingStep } from '../../types'

interface MergeSortVisualizerProps {
  algorithmState: AlgorithmState
  setAlgorithmState: React.Dispatch<React.SetStateAction<AlgorithmState>>
}

const MergeSortVisualizer: React.FC<MergeSortVisualizerProps> = ({
  algorithmState,
  setAlgorithmState,
}) => {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90])
  const [inputValue, setInputValue] = useState<string>('64,34,25,12,22,11,90')

  const generateSteps = useCallback((arr: number[]): SortingStep[] => {
    const steps: SortingStep[] = []
    const workingArray = [...arr]

    steps.push({
      id: 0,
      description: 'Starting Merge Sort. The array will be recursively divided.',
      data: { array: [...workingArray] }
    })

    mergeSort(workingArray, 0, steps)

    steps.push({
      id: steps.length,
      description: 'Merge Sort completed!',
      data: {
        array: [...workingArray],
        sorted: Array.from({ length: workingArray.length }, (_, idx) => idx)
      }
    })

    return steps
  }, [])

  const mergeSort = (arr: number[], start: number, steps: SortingStep[]): void => {
    if (arr.length <= 1) {
      return
    }

    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)

    steps.push({
      id: steps.length,
      description: `Splitting array into [${left}] and [${right}]`,
      data: {
        array: [...arr],
        splitting: {
          left: {
            indices: Array.from({ length: left.length }, (_, i) => start + i),
            values: [...left]
          },
          right: {
            indices: Array.from({ length: right.length }, (_, i) => start + mid + i),
            values: [...right]
          }
        }
      }
    })

    mergeSort(left, start, steps)
    mergeSort(right, start + mid, steps)

    merge(arr, left, right, start, steps)
  }

  const merge = (
    arr: number[],
    left: number[],
    right: number[],
    start: number,
    steps: SortingStep[]
  ): void => {
    let i = 0
    let j = 0
    let k = 0

    steps.push({
      id: steps.length,
      description: `Merging [${left}] and [${right}]`,
      data: {
        array: [...arr],
        merging: {
          left: {
            indices: Array.from({ length: left.length }, (_, i) => start + i),
            values: [...left]
          },
          right: {
            indices: Array.from({ length: right.length }, (_, i) => start + left.length + i),
            values: [...right]
          }
        }
      }
    })

    while (i < left.length && j < right.length) {
      steps.push({
        id: steps.length,
        description: `Comparing ${left[i]} and ${right[j]}`,
        data: {
          array: [...arr],
          comparing: [start + k, start + left.length + j] as [number, number]
        }
      })
      if (left[i] <= right[j]) {
        arr[k] = left[i]
        i++
      } else {
        arr[k] = right[j]
        j++
      }
      steps.push({
        id: steps.length,
        description: `Placing ${arr[k]} into the merged array`,
        data: {
          array: [...arr],
          sorted: [start + k]
        }
      })
      k++
    }

    while (i < left.length) {
      arr[k] = left[i]
      steps.push({
        id: steps.length,
        description: `Placing remaining element ${arr[k]} from left array`,
        data: {
          array: [...arr],
          sorted: [start + k]
        }
      })
      i++
      k++
    }

    while (j < right.length) {
      arr[k] = right[j]
      steps.push({
        id: steps.length,
        description: `Placing remaining element ${arr[k]} from right array`,
        data: {
          array: [...arr],
          sorted: [start + k]
        }
      })
      j++
      k++
    }
  }

  const handleArrayInput = (value: string) => {
    setInputValue(value)
    try {
      const newArray = value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
      if (newArray.length > 0 && newArray.length <= 10) {
        setArray(newArray)
      }
    } catch (error) {
      console.error('Invalid array input:', error)
    }
  }

  const generateRandomArray = () => {
    const size = 6 + Math.floor(Math.random() * 3)
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setInputValue(newArray.join(','))
  }

  const startVisualization = () => {
    const steps = generateSteps(array)
    setAlgorithmState(prev => ({
      ...prev,
      steps,
      currentStep: 0,
      isFinished: false
    }))
  }

  useEffect(() => {
    if (!algorithmState.isPlaying || algorithmState.steps.length === 0) return

    const timer = setTimeout(() => {
      setAlgorithmState(prev => {
        const nextStep = prev.currentStep + 1
        if (nextStep >= prev.steps.length) {
          return { ...prev, isPlaying: false, isFinished: true }
        }
        return { ...prev, currentStep: nextStep }
      })
    }, algorithmState.speed)

    return () => clearTimeout(timer)
  }, [algorithmState.isPlaying, algorithmState.currentStep, algorithmState.speed, setAlgorithmState])

  const currentStep = algorithmState.steps[algorithmState.currentStep] as SortingStep | undefined
  const displayArray = currentStep?.data.array || array
  const comparing = currentStep?.data.comparing
  const sorted = currentStep?.data.sorted || []
  const splitting = currentStep?.data.splitting
  const merging = currentStep?.data.merging

  const getElementStyle = (index: number) => {
    if (sorted.includes(index)) return 'bg-green-500 border-green-400'
    if (comparing?.includes(index)) return 'bg-yellow-500 border-yellow-400'
    if (merging?.left.indices.includes(index) || merging?.right.indices.includes(index)) return 'bg-purple-500 border-purple-400'
    if (splitting?.left.indices.includes(index) || splitting?.right.indices.includes(index)) return 'bg-orange-500 border-orange-400'
    return 'bg-blue-500 border-blue-400'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-64">
          <label className="block text-sm text-gray-300 mb-2">
            Array (comma-separated numbers, max 10 elements):
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleArrayInput(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
            placeholder="64,34,25,12,22,11,90"
          />
        </div>
        <button
          onClick={generateRandomArray}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md"
        >
          <Shuffle className="w-4 h-4" />
          <span>Random</span>
        </button>
        <button
          onClick={startVisualization}
          disabled={algorithmState.isPlaying}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-500 disabled:bg-gray-600 text-white rounded-md"
        >
          Start Sort
        </button>
      </div>

      <div className="flex items-end justify-center space-x-2 min-h-80">
        {displayArray.map((value, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col items-center justify-end p-2 rounded-md border-2 ${getElementStyle(index)}`}
            style={{ height: `${Math.max(40, (value / 100) * 200)}px` }}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white font-semibold text-sm">{value}</span>
            <span className="text-xs text-white/80 mt-1">{index}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded border border-blue-400"></div>
          <span className="text-gray-300">Unsorted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded border border-orange-400"></div>
          <span className="text-gray-300">Splitting</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded border border-purple-400"></div>
          <span className="text-gray-300">Merging</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded border border-yellow-400"></div>
          <span className="text-gray-300">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded border border-green-400"></div>
          <span className="text-gray-300">Sorted</span>
        </div>
      </div>
    </div>
  )
}

export default MergeSortVisualizer