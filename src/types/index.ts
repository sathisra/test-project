export interface AlgorithmStep {
  id: number;
  description: string;
  data: any;
  highlights?: number[];
  pointers?: { [key: string]: number };
  comparisons?: number[];
  swaps?: [number, number];
}

export interface AlgorithmState {
  steps: AlgorithmStep[];
  currentStep: number;
  isPlaying: boolean;
  isFinished: boolean;
  speed: number; // milliseconds between steps
}

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export type AlgorithmCategory = 
  | 'Sorting' 
  | 'Searching' 
  | 'Graph' 
  | 'Dynamic Programming' 
  | 'Greedy' 
  | 'Divide & Conquer' 
  | 'Backtracking';

export interface SortingStep extends AlgorithmStep {
  data: {
    array: number[];
    comparing?: [number, number];
    swapping?: [number, number];
    sorted?: number[];
    splitting?: {
      left: { indices: number[]; values: number[] };
      right: { indices: number[]; values: number[] };
    };
    merging?: {
      left: { indices: number[]; values: number[] };
      right: { indices: number[]; values: number[] };
    };
  };
}

export interface SearchStep extends AlgorithmStep {
  data: {
    array: number[];
    target: number;
    left?: number;
    right?: number;
    mid?: number;
    found?: boolean;
    currentIndex?: number;
  };
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface GraphStep extends AlgorithmStep {
  data: {
    nodes: GraphNode[];
    edges: GraphEdge[];
    currentNode?: string;
    visitedNodes: string[];
    queue?: string[];
    stack?: string[];
    path?: string[];
  };
}

export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export interface ControlsProps {
  isPlaying: boolean;
  canPlay: boolean;
  canStep: boolean;
  canReset: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (speed: AnimationSpeed) => void;
  currentSpeed: AnimationSpeed;
}