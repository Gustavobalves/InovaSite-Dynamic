import { useMemo, useState } from 'react';
import { ArrowRight, Check, Copy, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { ARCHITECTURAL_EASE, RevealSection } from '../components/MotionPrimitives';
import { AUDIENCE_PROFILES } from '../data/primeData';
import type {
  CondoProfileId,
  PageNavProps,
  SavingsSimulationSummary,
} from '../types/navigation';

interface EconomiaPageProps extends PageNavProps {
  initialProfileId?: CondoProfileId;
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const currencyExactFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const LEVER_COLORS: Record<string, string> = {
  contracts: '#1546C0',
  preventive: '#2563EB',
  utilities: '#0EA5E9',
  digital: '#047857',
};

export default function EconomiaPage({
  onNavigate,
  initialProfileId = 'residencial',
}: EconomiaPageProps) {
  const initialProfile =
    AUDIENCE_PROFILES.find((p) => p.id === initialProfileId) ?? AUDIENCE_PROFILES[0];

  const [profileId, setProfileId] = useState<CondoProfileId>(initialProfile.id);
  const [units, setUnits] = useState<number>(initialProfile.defaultUnits);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(
    initialProfile.defaultMonthlyBudget
  );
  const [delinquencyRate, setDelinquencyRate] = useState<number>(
    initialProfile.defaultDelinquency
  );

  const [levers, setLevers] = useState({
    contracts: true,
    preventive: true,
    utilities: true,
    digitalGovernance: true,
  });

  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const activeProfile =
    AUDIENCE_PROFILES.find((p) => p.id === profileId) ?? AUDIENCE_PROFILES[0];

  const handleProfileChange = (nextId: CondoProfileId) => {
    const nextProfile =
      AUDIENCE_PROFILES.find((p) => p.id === nextId) ?? AUDIENCE_PROFILES[0];
    setProfileId(nextId);
    setUnits(nextProfile.defaultUnits);
    setMonthlyBudget(nextProfile.defaultMonthlyBudget);
    setDelinquencyRate(nextProfile.defaultDelinquency);
  };

  const handleReset = () => {
    setUnits(activeProfile.defaultUnits);
    setMonthlyBudget(activeProfile.defaultMonthlyBudget);
    setDelinquencyRate(activeProfile.defaultDelinquency);
    setLevers({
      contracts: true,
      preventive: true,
      utilities: true,
      digitalGovernance: true,
    });
  };

  const calculation = useMemo(() => {
    const scaleBonus = units >= 180 ? 1.08 : units >= 90 ? 1.03 : 1.0;
    const mult = activeProfile.efficiencyMultiplier * scaleBonus;

    const contractsShare = monthlyBudget * 0.48;
    const maintenanceShare = monthlyBudget * 0.19;
    const utilitiesShare = monthlyBudget * 0.21;
    const adminShare = monthlyBudget * 0.12;

    const contractsSaving = levers.contracts
      ? Math.round(contractsShare * Math.min(0.145, 0.105 * mult))
      : 0;

    const preventiveSaving = levers.preventive
      ? Math.round(maintenanceShare * Math.min(0.28, 0.21 * mult))
      : 0;

    const utilitiesSaving = levers.utilities
      ? Math.round(utilitiesShare * Math.min(0.18, 0.135 * mult))
      : 0;

    const delinquencyRecovery = levers.digitalGovernance
      ? Math.round(monthlyBudget * (delinquencyRate / 100) * 0.24)
      : 0;
    const adminDigitalSaving = levers.digitalGovernance
      ? Math.round(adminShare * 0.16) + delinquencyRecovery
      : 0;

    const monthlySavings =
      contractsSaving + preventiveSaving + utilitiesSaving + adminDigitalSaving;
    const annualSavings = monthlySavings * 12;
    const threeYearSavings = monthlySavings * 36;
    const savingsPercent =
      monthlyBudget > 0 ? Math.min(28, (monthlySavings / monthlyBudget) * 100) : 0;
    const perUnitMonthlySavings = units > 0 ? monthlySavings / units : 0;
    const optimizedMonthlyBudget = Math.max(0, monthlyBudget - monthlySavings);

    const breakdown = [
      {
        id: 'contracts',
        label: 'Fornecedores e contratos',
        description: 'Auditoria, cotações comparativas e renegociação recorrente',
        current: Math.round(contractsShare),
        saving: contractsSaving,
        enabled: levers.contracts,
        color: LEVER_COLORS.contracts,
      },
      {
        id: 'preventive',
        label: 'Manutenção preventiva',
        description: 'Redução de emergências corretivas e preservação de ativos',
        current: Math.round(maintenanceShare),
        saving: preventiveSaving,
        enabled: levers.preventive,
        color: LEVER_COLORS.preventive,
      },
      {
        id: 'utilities',
        label: 'Água, energia e recursos',
        description: 'Monitoramento de curvas de consumo e prevenção de desperdícios',
        current: Math.round(utilitiesShare),
        saving: utilitiesSaving,
        enabled: levers.utilities,
        color: LEVER_COLORS.utilities,
      },
      {
        id: 'digital',
        label: 'Gestão digital e inadimplência',
        description: 'Processos sem papel e régua inteligente de recuperação de caixa',
        current: Math.round(adminShare + monthlyBudget * (delinquencyRate / 100)),
        saving: adminDigitalSaving,
        enabled: levers.digitalGovernance,
        color: LEVER_COLORS.digital,
      },
    ];

    const rampFactors = [
      0.45, 0.62, 0.78, 0.88, 0.94, 0.98, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    ];
    let runningTotal = 0;
    const monthlyProjection = rampFactors.map((factor, idx) => {
      const monthSave = Math.round(monthlySavings * factor);
      runningTotal += monthSave;
      return {
        month: `M${idx + 1}`,
        monthSave,
        cumulative: runningTotal,
      };
    });

    // Donut ring segment geometry (circumference = 2 * PI * 44 ≈ 276.46)
    const radius = 44;
    const circumference = 2 * Math.PI * radius;
    let cumulativeOffset = 0;
    const donutSegments = breakdown
      .filter((b) => b.enabled && b.saving > 0 && monthlySavings > 0)
      .map((b) => {
        const share = b.saving / monthlySavings;
        const length = share * circumference;
        const segment = {
          id: b.id,
          label: b.label,
          color: b.color,
          sharePercent: Math.round(share * 100),
          dashArray: `${Math.max(2, length - 2)} ${circumference}`,
          dashOffset: -cumulativeOffset,
        };
        cumulativeOffset += length;
        return segment;
      });

    return {
      monthlySavings,
      annualSavings,
      threeYearSavings,
      savingsPercent,
      perUnitMonthlySavings,
      optimizedMonthlyBudget,
      breakdown,
      monthlyProjection,
      rampAnnualTotal: runningTotal,
      donutSegments,
      donutRadius: radius,
    };
  }, [activeProfile, units, monthlyBudget, delinquencyRate, levers]);

  const buildSummary = (): SavingsSimulationSummary => ({
    profileId: activeProfile.id,
    profileLabel: activeProfile.title,
    units,
    monthlyBudget,
    delinquencyRate,
    monthlySavings: calculation.monthlySavings,
    annualSavings: calculation.annualSavings,
    savingsPercent: Number(calculation.savingsPercent.toFixed(1)),
    perUnitMonthlySavings: Number(calculation.perUnitMonthlySavings.toFixed(2)),
  });

  const handleCopySummary = async () => {
    const summaryText = [
      `Simulação de Economia — Prime Facilix`,
      `Perfil: ${activeProfile.title} (${units} unidades)`,
      `Orçamento mensal atual: ${currencyFormatter.format(monthlyBudget)}`,
      `Inadimplência informada: ${delinquencyRate}%`,
      `Economia mensal estimada: ${currencyFormatter.format(calculation.monthlySavings)} (${calculation.savingsPercent.toFixed(1)}%)`,
      `Economia anual projetada: ${currencyFormatter.format(calculation.annualSavings)}`,
      `Impacto médio por unidade/mês: ${currencyExactFormatter.format(calculation.perUnitMonthlySavings)}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const maxCumulative = Math.max(
    1,
    calculation.monthlyProjection[calculation.monthlyProjection.length - 1]?.cumulative ?? 1
  );

  const inspectedMonth =
    hoveredMonthIndex !== null
      ? calculation.monthlyProjection[hoveredMonthIndex]
      : calculation.monthlyProjection[calculation.monthlyProjection.length - 1];

  return (
    <div>
      {/* Header */}
      <section className="bg-architectural-grid border-b border-slate-200/80 bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-[#1546C0]">
                Cálculo de economia · Simulador financeiro condominial
              </p>
              <h1 className="mt-3 font-[var(--font-display)] text-[clamp(2.15rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-[#0A1628]">
                Calcule o potencial de economia do seu condomínio.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569] md:text-lg">
                Ajuste o perfil, o número de unidades e a despesa mensal atual para visualizar o impacto financeiro da gestão inteligente Prime Facilix em 12 e 36 meses.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:border-slate-300 hover:text-[#0A1628] whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Restaurar valores</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Calculator Workspace */}
      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left Panel: Inputs */}
          <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 lg:col-span-6">
            <div>
              <label className="text-sm font-semibold text-[#0A1628]">
                1. Perfil do condomínio
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {AUDIENCE_PROFILES.map((profile) => {
                  const isSelected = profile.id === profileId;
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => handleProfileChange(profile.id)}
                      className={`min-h-[44px] rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1546C0] ${
                        isSelected
                          ? 'border-[#1546C0] bg-[#EFF4FF] text-[#0A1628]'
                          : 'border-slate-200 bg-white text-[#475569] hover:bg-slate-50 hover:text-[#0A1628]'
                      }`}
                    >
                      {profile.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6 border-t border-slate-100 pt-6">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="calc-units" className="text-sm font-semibold text-[#0A1628]">
                    2. Número de unidades
                  </label>
                  <span className="font-mono text-base font-bold text-[#1546C0] tabular-nums">
                    {units} unidades
                  </span>
                </div>
                <input
                  id="calc-units"
                  type="range"
                  min={12}
                  max={600}
                  step={4}
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="prime-slider mt-3"
                />
                <div className="mt-1.5 flex justify-between font-mono text-xs text-[#64748B] tabular-nums">
                  <span>12</span>
                  <span>300</span>
                  <span>600</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="calc-budget" className="text-sm font-semibold text-[#0A1628]">
                    3. Despesa mensal atual
                  </label>
                  <span className="font-mono text-base font-bold text-[#1546C0] tabular-nums">
                    {currencyFormatter.format(monthlyBudget)}
                  </span>
                </div>
                <input
                  id="calc-budget"
                  type="range"
                  min={15000}
                  max={450000}
                  step={2500}
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="prime-slider mt-3"
                />
                <div className="mt-1.5 flex justify-between font-mono text-xs text-[#64748B] tabular-nums">
                  <span>R$ 15 mil</span>
                  <span>R$ 230 mil</span>
                  <span>R$ 450 mil</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="calc-delinquency" className="text-sm font-semibold text-[#0A1628]">
                    4. Taxa atual de inadimplência
                  </label>
                  <span className="font-mono text-base font-bold text-[#1546C0] tabular-nums">
                    {delinquencyRate}%
                  </span>
                </div>
                <input
                  id="calc-delinquency"
                  type="range"
                  min={0}
                  max={25}
                  step={1}
                  value={delinquencyRate}
                  onChange={(e) => setDelinquencyRate(Number(e.target.value))}
                  className="prime-slider mt-3"
                />
                <div className="mt-1.5 flex justify-between font-mono text-xs text-[#64748B] tabular-nums">
                  <span>0%</span>
                  <span>12%</span>
                  <span>25%</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <p className="text-sm font-semibold text-[#0A1628]">
                5. Frentes de otimização ativadas
              </p>
              <div className="mt-3 space-y-2.5">
                {[
                  {
                    key: 'contracts' as const,
                    title: 'Auditoria e renegociação de contratos',
                    sub: 'Revisão de portaria, limpeza, elevadores e compras programadas',
                  },
                  {
                    key: 'preventive' as const,
                    title: 'Manutenção preventiva digitalizada',
                    sub: 'Cronograma técnico para reduzir reparos emergenciais',
                  },
                  {
                    key: 'utilities' as const,
                    title: 'Eficiência de água e energia',
                    sub: 'Monitoramento mensal de consumo e correção de desvios',
                  },
                  {
                    key: 'digitalGovernance' as const,
                    title: 'Gestão digital e cobrança inteligente',
                    sub: 'Eliminação de papel e recuperação estruturada de inadimplência',
                  },
                ].map((lever) => {
                  const checked = levers[lever.key];
                  return (
                    <label
                      key={lever.key}
                      className={`flex min-h-[54px] cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                        checked
                          ? 'border-[#1546C0]/40 bg-[#EFF4FF]/60'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setLevers((prev) => ({
                            ...prev,
                            [lever.key]: !prev[lever.key],
                          }))
                        }
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1546C0] focus:ring-[#1546C0]"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#0A1628]">{lever.title}</p>
                        <p className="text-xs text-[#475569]">{lever.sub}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Real-time Results, Interactive Donut Chart & 12-Month Visual */}
          <div className="space-y-6 lg:col-span-6">
            {/* Primary Financial Result Card */}
            <div className="bg-architectural-grid-dark rounded-2xl border border-slate-800 bg-[#0A1628] p-7 text-white md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-blue-200">
                <span>Estimativa de economia · {activeProfile.title}</span>
                <span className="font-mono text-emerald-300 tabular-nums">
                  -{calculation.savingsPercent.toFixed(1)}% de eficiência
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm text-slate-300">Economia anual projetada (ritmo pleno)</p>
                <p className="mt-1 font-mono text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-white tabular-nums">
                  {currencyFormatter.format(calculation.annualSavings)}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-slate-400">Economia mensal</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-emerald-300 tabular-nums">
                    {currencyFormatter.format(calculation.monthlySavings)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Alívio por unidade/mês</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-white tabular-nums">
                    {currencyExactFormatter.format(calculation.perUnitMonthlySavings)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Projeção em 3 anos</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-blue-200 tabular-nums">
                    {currencyFormatter.format(calculation.threeYearSavings)}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/75 px-4 py-3.5 text-sm">
                <span className="text-slate-300">Novo orçamento mensal estimado</span>
                <span className="font-mono font-semibold text-white tabular-nums">
                  {currencyFormatter.format(calculation.optimizedMonthlyBudget)} / mês
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate('contato', { simulation: buildSummary() })
                  }
                  className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6] whitespace-nowrap"
                >
                  <span>Solicitar Diagnóstico com Esta Simulação</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-slate-500 hover:bg-slate-800 whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-slate-300" />
                      <span>Copiar resumo</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Visual Composition Ring Chart + Category Breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-[#0A1628]">
                  Composição da economia mensal
                </h2>
                <span className="text-xs text-[#64748B]">Distribuição visual por frente</span>
              </div>

              {/* SVG Donut Chart + Legend */}
              <div className="mt-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
                <div className="flex justify-center sm:col-span-5">
                  <div className="relative h-36 w-36">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle
                        cx="60"
                        cy="60"
                        r={calculation.donutRadius}
                        fill="none"
                        stroke="#F1F5F9"
                        strokeWidth="14"
                      />
                      {calculation.donutSegments.map((seg) => (
                        <circle
                          key={seg.id}
                          cx="60"
                          cy="60"
                          r={calculation.donutRadius}
                          fill="none"
                          stroke={seg.color}
                          strokeWidth="14"
                          strokeDasharray={seg.dashArray}
                          strokeDashoffset={seg.dashOffset}
                          strokeLinecap="butt"
                        />
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-lg font-bold text-[#0A1628] tabular-nums">
                        {calculation.savingsPercent.toFixed(1)}%
                      </span>
                      <span className="text-[11px] text-[#64748B]">eficiência</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:col-span-7">
                  {calculation.breakdown.map((item) => {
                    const sharePct =
                      calculation.monthlySavings > 0
                        ? Math.round((item.saving / calculation.monthlySavings) * 100)
                        : 0;
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between gap-3 ${
                          item.enabled ? '' : 'opacity-40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            style={{ backgroundColor: item.color }}
                            className="h-2.5 w-2.5 shrink-0 rounded-xs"
                          />
                          <span className="text-xs font-medium text-[#0F172A]">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#0A1628] tabular-nums whitespace-nowrap">
                          {item.enabled
                            ? `${currencyFormatter.format(item.saving)} (${sharePct}%)`
                            : 'R$ 0'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
                {calculation.breakdown.map((item) => {
                  const shareOfSaving =
                    calculation.monthlySavings > 0
                      ? Math.max(0, Math.min(1, item.saving / calculation.monthlySavings))
                      : 0;
                  return (
                    <div key={item.id} className={item.enabled ? '' : 'opacity-45'}>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-xs font-medium text-[#475569]">{item.description}</p>
                        <span className="font-mono text-xs font-bold text-[#047857] tabular-nums whitespace-nowrap">
                          {item.enabled
                            ? `+ ${currencyFormatter.format(item.saving)}/mês`
                            : 'Desativado'}
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          initial={false}
                          animate={{ scaleX: item.enabled ? Math.max(0.04, shareOfSaving) : 0 }}
                          transition={{ duration: 0.35, ease: ARCHITECTURAL_EASE }}
                          style={{
                            transformOrigin: 'left center',
                            backgroundColor: item.color,
                          }}
                          className="h-full w-full rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive 12-Month Cumulative Projection Chart */}
            <RevealSection className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-[#0A1628]">
                    Evolução acumulada no 1º ano
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Passe o mouse ou clique em um mês para inspecionar o acumulado
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-bold text-[#1546C0] tabular-nums">
                    {inspectedMonth.month}: {currencyFormatter.format(inspectedMonth.cumulative)}
                  </p>
                  <p className="font-mono text-[11px] text-[#64748B] tabular-nums">
                    +{currencyFormatter.format(inspectedMonth.monthSave)} no mês
                  </p>
                </div>
              </div>

              <div
                className="mt-6 flex h-44 items-end gap-2"
                role="img"
                aria-label="Gráfico de economia acumulada em 12 meses"
              >
                {calculation.monthlyProjection.map((point, idx) => {
                  const ratio = Math.max(0.08, point.cumulative / maxCumulative);
                  const isHighlighted =
                    hoveredMonthIndex === idx ||
                    (hoveredMonthIndex === null && idx === 11);
                  return (
                    <button
                      key={point.month}
                      type="button"
                      onMouseEnter={() => setHoveredMonthIndex(idx)}
                      onFocus={() => setHoveredMonthIndex(idx)}
                      onMouseLeave={() => setHoveredMonthIndex(null)}
                      onClick={() => setHoveredMonthIndex(idx)}
                      className="group flex h-full flex-1 flex-col items-center justify-end gap-2 focus-visible:outline-none"
                    >
                      <div className="relative flex h-full w-full items-end">
                        <motion.div
                          initial={false}
                          animate={{ scaleY: ratio }}
                          transition={{ duration: 0.35, ease: ARCHITECTURAL_EASE }}
                          style={{ transformOrigin: 'bottom center' }}
                          className={`h-full w-full rounded-t-md transition-colors ${
                            isHighlighted
                              ? 'bg-[#1546C0]'
                              : 'bg-[#1546C0]/30 group-hover:bg-[#1546C0]/70'
                          }`}
                        />
                      </div>
                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          isHighlighted ? 'font-bold text-[#0A1628]' : 'text-[#64748B]'
                        }`}
                      >
                        {point.month}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-relaxed text-[#64748B]">
                Nota metodológica: estimativas referenciais baseadas na composição média de despesas condominiais (contratos, manutenção, utilidades e gestão administrativa). Um diagnóstico presencial confirma o potencial exato do seu empreendimento.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  );
}
