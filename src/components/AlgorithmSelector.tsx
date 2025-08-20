import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Zap, Target, ArrowRight } from 'lucide-react'
import { Algorithm, AlgorithmCategory } from '../types'

interface AlgorithmSelectorProps {
  algorithms: Algorithm[]
  onSelectAlgorithm: (algorithm: Algorithm) => void
}

const categoryColors: Record<AlgorithmCategory, string> = {
  'Sorting': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  'Searching': 'bg-green-500/20 text-green-300 border-green-400/30',
  'Graph': 'bg-purple-500/20 text-purple-300 border-purple-400/30',
  'Dynamic Programming': 'bg-orange-500/20 text-orange-300 border-orange-400/30',
  'Greedy': 'bg-pink-500/20 text-pink-300 border-pink-400/30',
  'Divide & Conquer': 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
  'Backtracking': 'bg-red-500/20 text-red-300 border-red-400/30',
}

const difficultyColors = {
  'Easy': 'bg-green-500/20 text-green-300',
  'Medium': 'bg-yellow-500/20 text-yellow-300',
  'Hard': 'bg-red-500/20 text-red-300',
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ algorithms, onSelectAlgorithm }) => {
  const groupedAlgorithms = algorithms.reduce((acc, algorithm) => {
    if (!acc[algorithm.category]) {
      acc[algorithm.category] = []
    }
    acc[algorithm.category].push(algorithm)
    return acc
  }, {} as Record<AlgorithmCategory, Algorithm[]>)

  console.log('AlgorithmSelector rendering with', algorithms.length, 'algorithms')

  return (
    <div className="space-y-8">
      {Object.entries(groupedAlgorithms).map(([category, categoryAlgorithms], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-semibold text-white flex items-center space-x-2">
            <span>{category}</span>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[category as AlgorithmCategory]}`}>
              {categoryAlgorithms.length} algorithm{categoryAlgorithms.length > 1 ? 's' : ''}
            </div>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryAlgorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => {
                  console.log('Algorithm selected:', algorithm.name)
                  onSelectAlgorithm(algorithm)
                }}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xl font-semibold text-white group-hover:text-primary-300 transition-colors">
                      {algorithm.name}
                    </h4>
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${difficultyColors[algorithm.difficulty]}`}>
                      {algorithm.difficulty}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {algorithm.description}
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-primary-400" />
                      <span className="text-gray-300">Time:</span>
                      <code className="text-primary-300 bg-primary-900/20 px-2 py-1 rounded text-xs">
                        {algorithm.timeComplexity.average}
                      </code>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Zap className="w-4 h-4 text-accent-400" />
                      <span className="text-gray-300">Space:</span>
                      <code className="text-accent-300 bg-accent-900/20 px-2 py-1 rounded text-xs">
                        {algorithm.spaceComplexity}
                      </code>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[algorithm.category]}`}>
                      {algorithm.category}
                    </div>
                    
                    <div className="flex items-center space-x-1 text-primary-400 group-hover:text-primary-300 transition-colors">
                      <Target className="w-4 h-4" />
                      <span className="text-sm font-medium">Visualize</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default AlgorithmSelector