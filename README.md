# Interactive Algorithm Visualizer 🎯

A modern, interactive educational platform that teaches algorithms through visual animations and step-by-step explanations. Built with React, TypeScript, and beautiful animations powered by Framer Motion.

![Algorithm Visualizer](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-~5.0.0-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.17-green) ![Vite](https://img.shields.io/badge/Vite-4.4.0-purple)

## ✨ Features

### 🎮 Interactive Controls
- ▶️ **Play/Pause** - Control animation playback  
- ⏭️ **Step Forward** - Move through algorithm steps manually
- 🔄 **Reset** - Start over with fresh data
- ⚡ **Speed Control** - Adjust animation speed (Slow/Normal/Fast)

### 📊 Currently Implemented Algorithms

#### 🔢 Sorting Algorithms
- **Bubble Sort** - Visual comparison and swapping of adjacent elements
  - Time Complexity: O(n²) average/worst, O(n) best
  - Space Complexity: O(1)

#### 🔍 Searching Algorithms  
- **Binary Search** - Efficient search in sorted arrays with pointer visualization
  - Time Complexity: O(log n)
  - Space Complexity: O(1)

### 🎨 Beautiful UI/UX
- **Modern Design** - Dark theme with gradient backgrounds
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - CSS transitions and Framer Motion
- **Visual Feedback** - Color-coded states (comparing, swapping, sorted, etc.)
- **Interactive Input** - Custom array input and random generation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interactive_algorithm_visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 🎯 How to Use

1. **Select an Algorithm** - Choose from the algorithm cards on the main page
2. **Customize Input** - Enter your own array or generate random data
3. **Set Target** (for search algorithms) - Choose what to search for
4. **Start Visualization** - Click "Start Sort" or "Search"
5. **Control Playback** - Use play/pause, step-by-step, or adjust speed
6. **Watch & Learn** - Follow the step descriptions and visual animations

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth transitions
- **State Management**: React Query for server state, React hooks for local state
- **Icons**: Lucide React for beautiful icons

## 📁 Project Structure

```
src/
├── components/
│   ├── algorithms/           # Algorithm-specific visualizers
│   │   ├── BubbleSortVisualizer.tsx
│   │   └── BinarySearchVisualizer.tsx
│   ├── AlgorithmControls.tsx # Play/pause/step controls
│   ├── AlgorithmSelector.tsx # Algorithm selection grid
│   ├── AlgorithmVisualizer.tsx # Main visualization container
│   └── Header.tsx           # App header
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Main app component
├── index.css              # Global styles and animations
└── main.tsx               # App entry point
```

## 🎨 Visual States & Color Coding

### Sorting Algorithms
- 🔵 **Blue** - Unsorted elements
- 🟡 **Yellow** - Elements being compared (with pulse animation)
- 🔴 **Red** - Elements being swapped (with bounce animation)  
- 🟢 **Green** - Sorted elements in final position

### Search Algorithms
- 🔵 **Blue** - Elements within search range
- ⚫ **Gray** - Elements outside search range (faded)
- 🟡 **Yellow** - Middle element being examined
- 🟢 **Green** - Target found
- **L/R/M** - Left, Right, Mid pointer indicators

## 🔮 Planned Features

### 📚 Additional Algorithms
- **Sorting**: Merge Sort, Quick Sort, Heap Sort, Selection Sort, Insertion Sort
- **Graph Algorithms**: BFS, DFS, Dijkstra's Algorithm, A* Pathfinding
- **Dynamic Programming**: Fibonacci, Knapsack Problem, Longest Common Subsequence
- **Greedy Algorithms**: Activity Selection, Huffman Coding
- **Backtracking**: N-Queens, Sudoku Solver

### 🎯 Enhanced Features
- **Algorithm Comparison** - Side-by-side performance analysis
- **Complexity Visualization** - Real-time time/space complexity display
- **Code View** - Show actual algorithm implementation
- **Educational Mode** - Detailed explanations and quizzes
- **Save/Share** - Export visualizations or share configurations
- **Mobile Optimization** - Enhanced touch interactions

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add New Algorithms**
   - Create new visualizer components in `src/components/algorithms/`
   - Follow the existing patterns for step generation and visualization
   - Add algorithm metadata to the main algorithms array

2. **Improve UI/UX**
   - Enhance animations and transitions
   - Add new interactive features
   - Improve mobile responsiveness

3. **Bug Fixes & Performance**
   - Report issues or submit fixes
   - Optimize animation performance
   - Add error handling

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Add console logs for debugging
- Test on multiple screen sizes
- Maintain accessibility standards

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern React patterns and TypeScript for type safety
- UI components inspired by shadcn/ui design system
- Animations powered by Framer Motion
- Icons provided by Lucide React
- Color scheme optimized for accessibility

---

**Happy Learning! 🎓**

Experience algorithms like never before with interactive visualizations that make complex concepts simple and engaging.

*Generated with [Memex](https://memex.tech)*
