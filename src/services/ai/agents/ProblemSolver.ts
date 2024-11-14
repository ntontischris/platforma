import { aiService } from '../../aiService';

export class ProblemSolver {
  async solveProblem(problem: string, subject: string) {
    return aiService.post('/ai/solve/problem', { problem, subject });
  }

  async explainSolution(solution: any) {
    return aiService.post('/ai/solve/explain', { solution });
  }

  async generateSimilarProblems(problem: string, difficulty: string) {
    return aiService.post('/ai/solve/similar', { problem, difficulty });
  }

  async provideHints(problem: string, progress: number) {
    return aiService.post('/ai/solve/hints', { problem, progress });
  }
}