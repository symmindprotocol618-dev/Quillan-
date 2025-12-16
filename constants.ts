import { RepositoryMetadata, ArchitecturalGoal, SystemMetric, PerformanceData } from './types';

export const REPO_METADATA: RepositoryMetadata = {
  repo_name: "Quillan-v4.2-repo",
  owner: "symmindprotocol618-dev",
  forked_from: "ieeex1/Quillan-v4.2-repo",
  version: "v4.2",
  license: "MIT License",
  stars: 1,
  forks: 0,
  pull_requests_open: 0,
  project_board_count: 1,
  current_branch: "main"
};

export const PROJECT_DESCRIPTION = "Attempt at A.G.I. Strive to enhance it through iterative processes, continuously refining and optimizing each version to achieve better outcomes over time.";

export const ARCHITECTURAL_GOALS: ArchitecturalGoal[] = [
  {
    id: "goal_1",
    component: "Meta-Learning Core",
    focus: "Reduce catastrophic forgetting during task transfer."
  },
  {
    id: "goal_2",
    component: "Reasoning Engine",
    focus: "Improve long-horizon planning accuracy."
  },
  {
    id: "goal_3",
    component: "Global Memory Fabric",
    focus: "Enhance retrieval speed and context-sensitivity."
  },
  {
    id: "goal_4",
    component: "Perception Modules",
    focus: "Increase efficiency of multimodal data integration."
  }
];

// Mock data for visualizations
export const SYSTEM_METRICS: SystemMetric[] = [
  { name: 'Meta-Learning', value: 85, fullMark: 100 },
  { name: 'Reasoning', value: 72, fullMark: 100 },
  { name: 'Memory', value: 90, fullMark: 100 },
  { name: 'Perception', value: 65, fullMark: 100 },
  { name: 'Stability', value: 95, fullMark: 100 },
];

export const PERFORMANCE_HISTORY: PerformanceData[] = [
  { epoch: 1, accuracy: 45, loss: 0.8, retrievalSpeed: 200 },
  { epoch: 2, accuracy: 55, loss: 0.65, retrievalSpeed: 180 },
  { epoch: 3, accuracy: 62, loss: 0.5, retrievalSpeed: 150 },
  { epoch: 4, accuracy: 78, loss: 0.3, retrievalSpeed: 120 },
  { epoch: 5, accuracy: 85, loss: 0.2, retrievalSpeed: 95 },
  { epoch: 6, accuracy: 88, loss: 0.15, retrievalSpeed: 45 },
];