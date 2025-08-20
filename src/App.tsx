import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import AlgorithmSelector from './components/AlgorithmSelector'
import AlgorithmVisualizer from './components/AlgorithmVisualizer'
import { Algorithm } from './types'

const algorithms: Algorithm[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy'
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    description: 'A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy'
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    description: 'An efficient, stable sorting algorithm that uses a divide-and-conquer approach to sort arrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium'
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'Graph',
    description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    difficulty: 'Medium'
  }
]

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null)

  console.log('App rendering, selectedAlgorithm:', selectedAlgorithm)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container-custom section-padding">
        {!selectedAlgorithm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Choose an Algorithm to Visualize
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Select from our collection of interactive algorithm visualizations to understand how they work step by step.
              </p>
            </div>
            
            <AlgorithmSelector 
              algorithms={algorithms} 
              onSelectAlgorithm={setSelectedAlgorithm}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AlgorithmVisualizer 
              algorithm={selectedAlgorithm}
              onBack={() => setSelectedAlgorithm(null)}
            />
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default App