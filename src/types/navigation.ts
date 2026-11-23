export type PageId =
  | 'inicio'
  | 'quem-somos'
  | 'servicos'
  | 'inovacao'
  | 'publico'
  | 'economia'
  | 'contato';

export type CondoProfileId =
  | 'residencial'
  | 'comercial'
  | 'grande-porte'
  | 'incorporadora';

export interface SavingsSimulationSummary {
  profileId: CondoProfileId;
  profileLabel: string;
  units: number;
  monthlyBudget: number;
  delinquencyRate: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercent: number;
  perUnitMonthlySavings: number;
}

export interface PageNavProps {
  onNavigate: (page: PageId, options?: { profileId?: CondoProfileId; simulation?: SavingsSimulationSummary }) => void;
}
