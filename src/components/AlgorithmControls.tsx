import React from 'react'
import { Play, Pause, SkipForward, RotateCcw, Gauge } from 'lucide-react'
import { ControlsProps } from '../types'

const AlgorithmControls: React.FC<ControlsProps> = ({
  isPlaying,
  canPlay,
  canStep,
  canReset,
  onPlay,
  onPause,
  onStep,
  onReset,
  onSpeedChange,
  currentSpeed,
}) => {
  console.log('AlgorithmControls rendering - isPlaying:', isPlaying, 'canPlay:', canPlay)

  return (
    <div className="flex items-center justify-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
      {/* Play/Pause Button */}
      <button
        onClick={isPlaying ? onPause : onPlay}
        disabled={!canPlay && !isPlaying}
        className={`
          flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200
          ${isPlaying || canPlay
            ? 'bg-primary-500 hover:bg-primary-400 text-white shadow-lg hover:scale-105'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }
        `}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </button>

      {/* Step Button */}
      <button
        onClick={onStep}
        disabled={!canStep}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
          ${canStep
            ? 'bg-accent-500 hover:bg-accent-400 text-white shadow-md hover:scale-105'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }
        `}
        title="Step Forward"
      >
        <SkipForward className="w-4 h-4" />
      </button>

      {/* Reset Button */}
      <button
        onClick={onReset}
        disabled={!canReset}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
          ${canReset
            ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-md hover:scale-105'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }
        `}
        title="Reset"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      {/* Speed Control */}
      <div className="flex items-center space-x-2 ml-6 pl-6 border-l border-white/20">
        <Gauge className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-400">Speed:</span>
        <div className="flex items-center space-x-1">
          {(['slow', 'normal', 'fast'] as const).map((speed) => (
            <button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              className={`
                px-3 py-1 rounded-md text-xs font-medium transition-all duration-200
                ${currentSpeed === speed
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }
              `}
            >
              {speed.charAt(0).toUpperCase() + speed.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlgorithmControls