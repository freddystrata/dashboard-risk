import { RiskItem } from '@/types/risk';
import { createRiskItem } from '@/utils/riskCalculations';

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

const sampleRiskData = [
  {
    description: "Data breach due to weak authentication systems",
    probability: 6,
    impact: 8,
    mitigationEffectiveness: 0.3,
    owner: "IT Security Team",
    category: "Cybersecurity",
    status: 'In Progress' as const,
    notes: "Implementing multi-factor authentication",
    comments: "Previous breach cost $50K in downtime. MFA implementation 60% complete."
  },
  {
    description: "Supply chain disruption affecting production",
    probability: 4,
    impact: 7,
    mitigationEffectiveness: 0.5,
    owner: "Operations Manager",
    category: "Operations",
    status: 'Open' as const,
    notes: "Evaluating alternative suppliers",
    comments: "COVID-19 taught us the importance of supplier diversification."
  },
  {
    description: "Key personnel departure without knowledge transfer",
    probability: 3,
    impact: 6,
    mitigationEffectiveness: 0.7,
    owner: "HR Department",
    category: "Human Resources",
    status: 'Mitigated' as const,
    notes: "Documentation and cross-training completed",
    comments: "Lost key developer in 2023. Now have mandatory knowledge sharing sessions."
  },
  {
    description: "Regulatory compliance failure in new jurisdiction",
    probability: 5,
    impact: 9,
    mitigationEffectiveness: 0.2,
    owner: "Legal Team",
    category: "Compliance",
    status: 'Open' as const,
    notes: "Engaging local legal counsel",
    comments: "Regulatory landscape constantly changing. Need dedicated compliance officer."
  },
  {
    description: "Server hardware failure during peak season",
    probability: 2,
    impact: 8,
    mitigationEffectiveness: 0.8,
    owner: "Infrastructure Team",
    category: "Technology",
    status: 'Closed' as const,
    notes: "Redundant systems implemented and tested",
    comments: "Had outage in Q3 2023. Invested in redundancy and backup systems."
  },
  {
    description: "Market downturn affecting customer demand",
    probability: 7,
    impact: 5,
    mitigationEffectiveness: 0.1,
    owner: "Sales Director",
    category: "Market",
    status: 'Open' as const,
    notes: "Monitoring economic indicators",
    comments: "2022 market volatility showed our sensitivity to economic cycles."
  },
  {
    description: "Third-party software license compliance issue",
    probability: 1,
    impact: 3,
    mitigationEffectiveness: 0.9,
    owner: "IT Department",
    category: "Legal",
    status: 'Mitigated' as const,
    notes: "License audit completed and documentation updated",
    comments: "Annual license review now mandatory. Automated tracking implemented."
  }
];

export const SAMPLE_RISKS: RiskItem[] = sampleRiskData.map(data => ({
  id: generateId(),
  ...createRiskItem(data)
}));