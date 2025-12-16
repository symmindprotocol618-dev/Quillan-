export interface RepositoryMetadata {
  repo_name: string;
  owner: string;
  forked_from: string;
  version: string;
  license: string;
  stars: number;
  forks: number;
  pull_requests_open: number;
  project_board_count: number;
  current_branch: string;
}

export interface ArchitecturalGoal {
  id: string;
  component: string;
  focus: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export type ViewState = 'dashboard' | 'chat' | 'memory' | 'settings';

export interface SystemMetric {
  name: string;
  value: number;
  fullMark: number;
}

export interface PerformanceData {
  epoch: number;
  accuracy: number;
  loss: number;
  retrievalSpeed: number;
}