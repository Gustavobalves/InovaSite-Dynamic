import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Cpu,
  FileCheck2,
  Pause,
  Play,
  ShieldCheck,
  Smartphone,
  Wrench,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { CondoProfileId, PageId } from '../types/navigation';
import { MediaFrame, PRIME_MEDIA } from './MediaFrame';
import { ARCHITECTURAL_EASE } from './MotionPrimitives';

const HERO_LENSES: {
  id: string;
  label: string;
  metric: string;
  headline: string;
  detail: string;
  highlights: string[];
  targetPage: PageId;
  actionLabel: string;
}[] = [
  {
    id: 'transparencia',
    label: 'Transparência',
    metric: '100% digital',
    headline: 'Prestação de contas auditável em tempo real',
    detail:
      'Notas fiscais, extratos bancários conciliados e comparativos orçamentários sempre acessíveis no portal para síndicos e conselheiros.',
    highlights: [
      'Pasta digital mensal com todos os comprovantes anexados',
      'Acompanhamento claro de receitas, despesas e fundo de reserva',
    ],
    targetPage: 'inovacao',
    actionLabel: 'Ver plataforma digital',
  },
  {
    id: 'eficiencia',
    label: 'Eficiência',
    metric: 'Até 20%',
    headline: 'Otimização anual em contratos e manutenção',
    detail:
      'Auditoria técnica de fornecedores, compras programadas e manutenção preventiva que reduzem custos emergenciais sem perder qualidade.',
    highlights: [
      'Renegociação recorrente de contratos com mapas comparativos',
      'Monitoramento de água, energia e calendário preventivo',
    ],
    targetPage: 'economia',
    actionLabel: 'Simular economia agora',
  },
  {
    id: 'inovacao',
    label: 'Inovação',
    metric: '5 módulos',
    headline: 'Aplicativo e relatórios gerenciais integrados',
    detail:
      'Ferramentas digitais que simplificam boletos, reservas, comunicados segmentados, solicitações protocoladas e assembleias.',
    highlights: [
      'App dedicado para moradores, conselheiros e síndicos',
      'Relatórios gerenciais visuais para decisões mais seguras',
    ],
    targetPage: 'inovacao',
    actionLabel: 'Explorar inovação',
  },
  {
    id: 'proximidade',
    label: 'Proximidade',
    metric: 'Atendimento ágil',
    headline: 'Tecnologia + Gestão = Tranquilidade',
    detail:
      'Atendimento próximo, consultivo e humanizado: especialistas dedicados ao lado do síndico para cuidar de pessoas e do patrimônio.',
    highlights: [
      'Equipe especializada com processos claros e bem definidos',
      'Comunicação transparente que valoriza a convivência',
    ],
    targetPage: 'quem-somos',
    actionLabel: 'Conhecer nossa equipe',
  },
];

const CYCLE_DURATION_MS = 5000;

interface HeroArchitecturalShowcaseProps {
  onNavigate?: (page: PageId) => void;
}

export function HeroArchitecturalShowcase({ onNavigate }: HeroArchitecturalShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeLensIndex, setActiveLensIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const shouldCycle = !prefersReducedMotion && !isPaused && !isHovered;

  useEffect(() => {
    if (!shouldCycle) return;
    const timer = window.setInterval(() => {
      setActiveLensIndex((prev) => (prev + 1) % HERO_LENSES.length);
    }, CYCLE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [shouldCycle]);

  const currentLens = HERO_LENSES[activeLensIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#0A1628]/78 p-6 text-white shadow-2xl backdrop-blur-md md:p-7"
    >
      {/* Top Interactive Pillar Tabs + Pause/Play Control */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label="Pilares da gestão Prime Facilix"
        >
          {HERO_LENSES.map((lens, idx) => {
            const isSelected = idx === activeLensIndex;
            return (
              <button
                key={lens.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveLensIndex(idx)}
                className={`relative min-h-[36px] overflow-hidden rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isSelected
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white/5 text-slate-200 hover:bg-white/15 hover:text-white'
                }`}
              >
                {lens.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs text-blue-200 tabular-nums">
            0{activeLensIndex + 1} / 0{HERO_LENSES.length}
          </span>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Retomar rotação automática' : 'Pausar rotação automática'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Smooth Animated Progress Bar for Active Slide */}
      <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
        {shouldCycle ? (
          <motion.div
            key={`${currentLens.id}-progress`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: CYCLE_DURATION_MS / 1000, ease: 'linear' }}
            style={{ transformOrigin: 'left center' }}
            className="h-full w-full bg-[#60A5FA]"
          />
        ) : (
          <div className="h-full w-full bg-[#60A5FA]/60" />
        )}
      </div>

      {/* Cycling Content Stage */}
      <div className="my-6 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLens.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xs font-semibold text-blue-300">
                Prime Facilix · {currentLens.label}
              </p>
              <span className="font-mono text-xl font-bold text-white tabular-nums">
                {currentLens.metric}
              </span>
            </div>

            <h2 className="mt-3 font-[var(--font-display)] text-2xl font-bold leading-snug tracking-tight text-white">
              {currentLens.headline}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              {currentLens.detail}
            </p>

            <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
              {currentLens.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-100">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Quick Action & Slide Step Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
        <div className="flex items-center gap-1.5">
          {HERO_LENSES.map((lens, idx) => (
            <button
              key={lens.id}
              type="button"
              onClick={() => setActiveLensIndex(idx)}
              aria-label={`Mostrar ${lens.label}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                idx === activeLensIndex ? 'w-7 bg-[#60A5FA]' : 'w-2.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate(currentLens.targetPage)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 transition-colors hover:text-white whitespace-nowrap"
          >
            <span>{currentLens.actionLabel}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

const PROFILE_PHOTO_MAP: Record<
  CondoProfileId,
  { src: string; alt: string; caption: string }
> = {
  residencial: {
    src: PRIME_MEDIA.residential,
    alt: 'Condomínio residencial contemporâneo com áreas verdes e espelho d água',
    caption: 'Conforto, segurança e harmonia para famílias',
  },
  comercial: {
    src: PRIME_MEDIA.commercial,
    alt: 'Torre comercial espelhada moderna em centro empresarial',
    caption: 'Continuidade operacional e eficiência predial',
  },
  incorporadora: {
    src: PRIME_MEDIA.development,
    alt: 'Empreendimento imobiliário recém-entregue com praça integrada',
    caption: 'Implantação estruturada e valorização do lançamento',
  },
  'grande-porte': {
    src: PRIME_MEDIA.heroCondo,
    alt: 'Complexo condominial de grande porte iluminado ao entardecer',
    caption: 'Governança escalável para demandas complexas',
  },
};

export function ProfileBlueprintGraphic({
  profileId,
  heightClass = 'h-56',
}: {
  profileId: CondoProfileId;
  heightClass?: string;
}) {
  const media = PROFILE_PHOTO_MAP[profileId];

  return (
    <div
      className={`group relative ${heightClass} w-full overflow-hidden rounded-xl border border-slate-200 bg-[#0A1628]`}
    >
      <MediaFrame
        src={media.src}
        alt={media.alt}
        fallbackTitle={media.caption}
        className="h-full w-full"
        imgClassName="group-hover:scale-[1.03]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-[#0A1628]/20 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-xs font-medium text-blue-100">{media.caption}</p>
      </div>
    </div>
  );
}

const ECOSYSTEM_NODES = [
  {
    id: 'financeiro',
    title: 'Conciliação & BI Financeiro',
    short: 'Financeiro',
    icon: BarChart3,
    x: 18,
    y: 22,
    metric: 'Extrato + NF em tempo real',
    summary:
      'Integração bancária automatizada com categorização inteligente de despesas, controle de fundo de reserva e comparativo orçado versus realizado.',
  },
  {
    id: 'app',
    title: 'Aplicativo do Morador e Síndico',
    short: 'App Digital',
    icon: Smartphone,
    x: 82,
    y: 22,
    metric: '5 módulos integrados',
    summary:
      'Segunda via instantânea, reservas de espaços, comunicados segmentados, documentos oficiais e acompanhamento de chamados no celular.',
  },
  {
    id: 'manutencao',
    title: 'Manutenção Preventiva Digital',
    short: 'Preventiva',
    icon: Wrench,
    x: 18,
    y: 78,
    metric: 'Até -35% em corretivas',
    summary:
      'Calendário automatizado de inspeções, controle de vencimento de AVCB, SPDA, elevadores e bombas com checklists fotográficos.',
  },
  {
    id: 'contratos',
    title: 'Auditoria de Fornecedores',
    short: 'Contratos',
    icon: FileCheck2,
    x: 82,
    y: 78,
    metric: '8% a 14% de economia',
    summary:
      'Mapas comparativos digitais com cotações homologadas, conferência de certidões trabalhistas e revisões programadas de contratos.',
  },
] as const;

/**
 * Interactive visual ecosystem architecture showing how Prime Facilix connects
 * digital intelligence to physical condominium management.
 */
export function InnovationArchitectureDiagram() {
  const [selectedId, setSelectedId] = useState<(typeof ECOSYSTEM_NODES)[number]['id']>('financeiro');
  const activeNode =
    ECOSYSTEM_NODES.find((n) => n.id === selectedId) ?? ECOSYSTEM_NODES[0];
  const ActiveIcon = activeNode.icon;

  return (
    <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
      {/* Interactive Visual Network Canvas */}
      <div className="bg-architectural-grid-dark relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#0A1628] p-6 text-white lg:col-span-7">
        <div className="relative z-10 flex items-center justify-between gap-4">
          <p className="text-xs font-medium text-blue-200">
            Arquitetura conectada · Clique em um módulo
          </p>
          <span className="font-mono text-xs text-slate-400">4 núcleos sincronizados</span>
        </div>

        {/* SVG Hub-and-Spoke Connection Diagram */}
        <div className="relative my-4 h-[230px] w-full">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {/* Outer architectural rings */}
            <ellipse
              cx="50"
              cy="50"
              rx="34"
              ry="34"
              stroke="#1E3A8A"
              strokeWidth="0.45"
              strokeDasharray="2 2"
              fill="none"
            />
            {ECOSYSTEM_NODES.map((node) => {
              const isSelected = node.id === selectedId;
              return (
                <line
                  key={node.id}
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  stroke={isSelected ? '#60A5FA' : '#334155'}
                  strokeWidth={isSelected ? '1.1' : '0.6'}
                />
              );
            })}
          </svg>

          {/* Center Core Hub */}
          <div className="absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border border-blue-400/50 bg-[#1546C0] text-center shadow-lg">
            <Cpu className="h-6 w-6 text-white" />
            <span className="mt-1.5 text-[11px] font-bold leading-tight text-white">
              Núcleo
              <br />
              Prime Facilix
            </span>
          </div>

          {/* 4 Interactive Peripheral Nodes */}
          {ECOSYSTEM_NODES.map((node) => {
            const Icon = node.icon;
            const isSelected = node.id === selectedId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedId(node.id)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isSelected
                    ? 'scale-105 border-blue-300 bg-white text-[#0A1628] shadow-md'
                    : 'border-slate-700 bg-slate-900/90 text-slate-200 hover:border-blue-400/60 hover:text-white'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    isSelected ? 'text-[#1546C0]' : 'text-blue-300'
                  }`}
                />
                <span>{node.short}</span>
              </button>
            );
          })}
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-blue-300" />
            Integração completa entre gestão e operação predial
          </span>
          <span className="inline-flex items-center gap-1.5 text-blue-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Dados auditáveis
          </span>
        </div>
      </div>

      {/* Right Active Node Detail Card */}
      <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 lg:col-span-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: ARCHITECTURAL_EASE }}
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF4FF] text-[#1546C0]">
              <ActiveIcon className="h-6 w-6" />
            </div>
            <p className="mt-5 font-mono text-xs font-semibold text-[#047857] tabular-nums">
              {activeNode.metric}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#0A1628]">
              {activeNode.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#475569]">
              {activeNode.summary}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 grid grid-cols-2 gap-2 border-t border-slate-100 pt-5">
          {ECOSYSTEM_NODES.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedId(node.id)}
              className={`rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                node.id === selectedId
                  ? 'bg-[#EFF4FF] text-[#1546C0]'
                  : 'text-[#475569] hover:bg-slate-50 hover:text-[#0A1628]'
              }`}
            >
              {node.short}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
