import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Code, Zap } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-black/20 backdrop-blur-sm border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Activity className="w-8 h-8 text-primary-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse-glow"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Algorithm Visualizer
              </h1>
              <p className="text-sm text-gray-300">Interactive Learning Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-primary-400" />
              <span>Learn by Doing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-accent-400" />
              <span>Visual Animations</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header