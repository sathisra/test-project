import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Info } from 'lucide-react'
import { Algorithm, AlgorithmState, AnimationSpeed } from '../types'
import AlgorithmControls from './AlgorithmControls'
import MergeSortVisualizer from './algorithms/MergeSortVisualizer'
import BubbleSortVisualizer from './algorithms/BubbleSortVisualizer'
import BinarySearchVisualizer from './algorithms/BinarySearchVisualizer'

interface AlgorithmVisualizerProps {
  algorithm: Algorithm
  onBack: () => void
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ algorithm, onBack }) => {
  const [algorithmState, setAlgorithmState] = useState<AlgorithmState>({
    steps: [],
    currentStep: 0,
    isPlaying: false,
    isFinished: false,
    speed: 1000 // 1 second default
  })

  console.log('AlgorithmVisualizer rendering for:', algorithm.name, 'Current step:', algorithmState.currentStep)

  const handlePlay = useCallback(() => {
    console.log('Play button clicked')
    setAlgorithmState(prev => ({ ...prev, isPlaying: true }))
  }, [])

  const handlePause = useCallback(() => {
    console.log('Pause button clicked')
    setAlgorithmState(prev => ({ ...prev, isPlaying: false }))
  }, [])

  const handleStep = useCallback(() => {
    console.log('Step button clicked, current step:', algorithmState.currentStep)
    setAlgorithmState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.steps.length - 1),
      isPlaying: false
    }))
  }, [algorithmState.currentStep])

  const handleReset = useCallback(() => {
    console.log('Reset button clicked')
    setAlgorithmState(prev => ({
      ...prev,
      currentStep: 0,
      isPlaying: false,
      isFinished: false
    }))
  }, [])

  const handleSpeedChange = useCallback((speed: AnimationSpeed) => {
    console.log('Speed changed to:', speed)
    const speedMap = { slow: 2000, normal: 1000, fast: 500 }
    setAlgorithmState(prev => ({ ...prev, speed: speedMap[speed] }))
  }, [])

  const renderAlgorithmComponent = () => {
    const commonProps = {
      algorithmState,
      setAlgorithmState,
    }

    switch (algorithm.id) {
      case 'bubble-sort':
        return <BubbleSortVisualizer {...commonProps} />
      case 'merge-sort':
        return <MergeSortVisualizer {...commonProps} />
      case 'binary-search':
        return <BinarySearchVisualizer {...commonProps} />
      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-semibold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-300">
              The {algorithm.name} visualizer is currently under development.
            </p>
          </div>
        )
    }
  }

  const currentSpeedLabel: AnimationSpeed = algorithmState.speed === 2000 ? 'slow' : 
                                          algorithmState.speed === 500 ? 'fast' : 'normal'

  return (
    <div className="space-y-6">
      {/* Algorithm Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Algorithms</span>
        </button>
        
        <div className="text-right">
          <h2 className="text-2xl font-bold text-white">{algorithm.name}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>{algorithm.category}</span>
            <span>•</span>
            <span>{algorithm.difficulty}</span>
          </div>
        </div>
      </motion.div>

      {/* Algorithm Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
      >
        <div className="flex items-start space-x-4">
          <Info className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
          <div className="space-y-3 flex-1">
            <p className="text-gray-300">{algorithm.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Best Case:</span>
                <code className="ml-2 text-green-300 bg-green-900/20 px-2 py-1 rounded">
                  {algorithm.timeComplexity.best}
                </code>
              </div>
              <div>
                <span className="text-gray-400">Average Case:</span>
                <code className="ml-2 text-yellow-300 bg-yellow-900/20 px-2 py-1 rounded">
                  {algorithm.timeComplexity.average}
                </code>
              </div>
              <div>
                <span className="text-gray-400">Space Complexity:</span>
                <code className="ml-2 text-blue-300 bg-blue-900/20 px-2 py-1 rounded">
                  {algorithm.spaceComplexity}
                </code>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AlgorithmControls
          isPlaying={algorithmState.isPlaying}
          canPlay={algorithmState.steps.length > 0 && !algorithmState.isFinished}
          canStep={algorithmState.steps.length > 0 && algorithmState.currentStep < algorithmState.steps.length - 1}
          canReset={algorithmState.currentStep > 0 || algorithmState.isFinished}
          onPlay={handlePlay}
          onPause={handlePause}
          onStep={handleStep}
          onReset={handleReset}
          onSpeedChange={handleSpeedChange}
          currentSpeed={currentSpeedLabel}
        />
      </motion.div>

      {/* Algorithm Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 min-h-[400px]"
      >
        {renderAlgorithmComponent()}
      </motion.div>

      {/* Step Info */}
      {algorithmState.steps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">
              Step {algorithmState.currentStep + 1} of {algorithmState.steps.length}
            </span>
            <span className="text-primary-300">
              {algorithmState.steps[algorithmState.currentStep]?.description || 'Ready to start'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AlgorithmVisualizer