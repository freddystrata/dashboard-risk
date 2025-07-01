export interface RiskItem {
  id: string;
  description: string;
  probability: number; // 1-9 scale
  impact: number; // 1-9 scale
  score: number; // calculated: probability * impact
  riskLevel: string; // derived from score
  mitigationEffectiveness: number; // 0-1 (0% to 100%)
  residualScore: number; // calculated: score * (1 - mitigationEffectiveness)
  residualRiskLevel: string; // derived from residual score
  owner?: string;
  category?: string;
  status: 'Open' | 'In Progress' | 'Mitigated' | 'Closed';
  completionDate?: string;
  notes?: string;
  comments?: string; // Comments/lessons learned
  createdAt: string;
  updatedAt: string;
}

export interface RiskLevel {
  threshold: number;
  name: string;
  color: string;
  textColor?: string;
}

export interface RiskSummary {
  total: number;
  byLevel: Record<string, number>;
  byStatus: Record<string, number>;
}

export interface ImportResult {
  success: boolean;
  risks: RiskItem[];
  errors: string[];
}