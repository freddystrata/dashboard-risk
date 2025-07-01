import { RiskItem, RiskLevel, RiskSummary } from '@/types/risk';

export const RISK_LEVELS: RiskLevel[] = [
  { threshold: 1, name: "LOWEST", color: "bg-green-200", textColor: "text-green-800" },
  { threshold: 2, name: "VERY LOW", color: "bg-green-300", textColor: "text-green-800" },
  { threshold: 3, name: "LOW", color: "bg-yellow-300", textColor: "text-yellow-800" },
  { threshold: 4, name: "MEDIUM LOW", color: "bg-orange-300", textColor: "text-orange-800" },
  { threshold: 6, name: "MEDIUM HIGH", color: "bg-orange-500", textColor: "text-orange-100" },
  { threshold: 9, name: "HIGHEST", color: "bg-red-600", textColor: "text-red-100" },
];

/**
 * Calculate risk score (Probability × Impact)
 */
export function calculateRiskScore(probability: number, impact: number): number {
  return probability * impact;
}

/**
 * Determine risk level based on score
 */
export function getRiskLevel(score: number): RiskLevel {
  // Find the highest threshold that the score meets or exceeds
  // Sort from highest to lowest threshold and find first match
  const sortedLevels = [...RISK_LEVELS].sort((a, b) => b.threshold - a.threshold);
  const level = sortedLevels.find(level => score >= level.threshold);
  
  // Default to lowest level if score is below all thresholds
  return level || RISK_LEVELS.find(l => l.threshold === 1) || RISK_LEVELS[0];
}

/**
 * Calculate residual risk score after mitigation
 */
export function calculateResidualScore(score: number, mitigationEffectiveness: number): number {
  return score * (1 - mitigationEffectiveness);
}

/**
 * Calculate all risk scores and levels for a risk item
 */
export function calculateRiskMetrics(
  probability: number, 
  impact: number, 
  mitigationEffectiveness: number = 0
): {
  score: number;
  riskLevel: string;
  residualScore: number;
  residualRiskLevel: string;
} {
  const score = calculateRiskScore(probability, impact);
  const riskLevel = getRiskLevel(score);
  const residualScore = calculateResidualScore(score, mitigationEffectiveness);
  const residualRiskLevel = getRiskLevel(residualScore);

  return {
    score,
    riskLevel: riskLevel.name,
    residualScore,
    residualRiskLevel: residualRiskLevel.name,
  };
}

/**
 * Generate a summary of risks by level and status
 */
export function generateRiskSummary(risks: RiskItem[]): RiskSummary {
  const byLevel: Record<string, number> = {};
  const byStatus: Record<string, number> = {};

  // Initialize counters
  RISK_LEVELS.forEach(level => {
    byLevel[level.name] = 0;
  });

  risks.forEach(risk => {
    // Count by risk level
    byLevel[risk.riskLevel] = (byLevel[risk.riskLevel] || 0) + 1;
    
    // Count by status
    byStatus[risk.status] = (byStatus[risk.status] || 0) + 1;
  });

  return {
    total: risks.length,
    byLevel,
    byStatus,
  };
}

/**
 * Validate risk probability and impact values
 */
export function validateRiskValues(probability: number, impact: number): string[] {
  const errors: string[] = [];

  if (probability < 1 || probability > 9) {
    errors.push('Probability must be between 1 and 9');
  }

  if (impact < 1 || impact > 9) {
    errors.push('Impact must be between 1 and 9');
  }

  return errors;
}

/**
 * Validate mitigation effectiveness
 */
export function validateMitigationEffectiveness(effectiveness: number): string[] {
  const errors: string[] = [];

  if (effectiveness < 0 || effectiveness > 1) {
    errors.push('Mitigation effectiveness must be between 0 and 1 (0% to 100%)');
  }

  return errors;
}

/**
 * Create a new risk item with calculated metrics
 */
export function createRiskItem(data: {
  description: string;
  probability: number;
  impact: number;
  mitigationEffectiveness?: number;
  owner?: string;
  category?: string;
  status?: 'Open' | 'In Progress' | 'Mitigated' | 'Closed';
  notes?: string;
}): Omit<RiskItem, 'id'> {
  const metrics = calculateRiskMetrics(
    data.probability, 
    data.impact, 
    data.mitigationEffectiveness || 0
  );

  const now = new Date().toISOString();

  return {
    description: data.description,
    probability: data.probability,
    impact: data.impact,
    mitigationEffectiveness: data.mitigationEffectiveness || 0,
    owner: data.owner,
    category: data.category,
    status: data.status || 'Open',
    notes: data.notes,
    createdAt: now,
    updatedAt: now,
    ...metrics,
  };
}