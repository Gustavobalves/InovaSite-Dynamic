import { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  FileCheck2,
  MessageSquare,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { MediaFrame, PRIME_MEDIA } from '../components/MediaFrame';
import { ARCHITECTURAL_EASE, RevealSection } from '../components/MotionPrimitives';
import { SERVICES } from '../data/primeData';
import type { PageNavProps } from '../types/navigation';

type CategoryFilter = 'todos' | 'gestao' | 'operacao' | 'inovacao';

const FILTER_OPTIONS: { id: CategoryFilter; label: string }[] = [
  { id: 'todos', label: 'Todos os Serviços' },
  { id: 'gestao', label: 'Gestão e Finanças' },
  { id: 'operacao', label: 'Operação e Patrimônio' },
  { id: 'inovacao', label: 'Inovação Digital' },
];

const SERVICE_ICONS: Record<string, typeof Wallet> = {
  'administrativa-financeira': Wallet,
  'operacional-manutencao': Wrench,
  'fornecedores-contratos': FileCheck2,
  'equipes-colaboradores': Users,
  'tecnologia-inovacao': Cpu,
  'atendimento-moradores': MessageSquare,
};

const ONBOARDING_STEPS = [
  {
    step: '01',
    title: 'Diagnóstico completo',
    detail:
      'Auditoria inicial de contratos vigentes, pastas financeiras, laudos obrigatórios e demandas críticas das áreas comuns.',
  },
  {
    step: '02',
    title: 'Implantação digital sem atrito',
    detail:
      'Migração estruturada de cadastros, abertura da plataforma Prime Facilix para síndicos e moradores e calendário preventivo.',
  },
  {
    step: '03',
    title: 'Otimização e renegociação',
    detail:
      'Revisão estratégica de fornecedores, compras programadas e acompanhamento mensal de utilidades para gerar economia real.',
  },
  {
    step: '04',
    title: 'Governança contínua',
    detail:
      'Relatórios gerenciais mensais, prestação de contas transparente e suporte próximo para assembleias e tomadas de decisão.',
  },
];

export default function ServicosPage({ onNavigate }: PageNavProps) {
  const [filter, setFilter] = useState<CategoryFilter>('todos');
  const [expandedId, setExpandedId] = useState<string>(SERVICES[0].id);

  const visibleServices =
    filter === 'todos' ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <div>
      {/* Split Architectural Header */}
      <section className="bg-architectural-grid border-b border-slate-200/80 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <p className="text-sm font-medium text-[#1546C0]">02. Nossos serviços</p>
                <h1 className="mt-3 font-[var(--font-display)] text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#0A1628]">
                  Uma gestão completa para o seu condomínio.
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-[#475569]">
                  Mais organização, mais eficiência e mais valor para o seu patrimônio. Filtre por frente de atuação e explore em detalhe cada entrega incluída na nossa gestão.
                </p>
              </div>

              {/* Interactive Filter Controls */}
              <div className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 sm:inline-flex">
                {FILTER_OPTIONS.map((opt) => {
                  const isSelected = filter === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setFilter(opt.id);
                        const nextList =
                          opt.id === 'todos'
                            ? SERVICES
                            : SERVICES.filter((s) => s.category === opt.id);
                        if (nextList.length > 0 && !nextList.some((s) => s.id === expandedId)) {
                          setExpandedId(nextList[0].id);
                        }
                      }}
                      className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1546C0] ${
                        isSelected
                          ? 'bg-[#1546C0] text-white'
                          : 'text-[#475569] hover:bg-slate-50 hover:text-[#0A1628]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-slate-200 lg:col-span-5">
              <MediaFrame
                src={PRIME_MEDIA.development}
                alt="Empreendimento contemporâneo com praça e fachada de vidro"
                fallbackTitle="Gestão completa de ponta a ponta"
                className="h-full w-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/88 via-[#0A1628]/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-[var(--font-display)] text-base font-semibold text-white">
                  Mais organização. Mais eficiência. Mais valor para o seu condomínio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Filtered Service Cards with Icon Emblems */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service) => {
              const isExpanded = expandedId === service.id;
              const Icon = SERVICE_ICONS[service.id] ?? ShieldCheck;
              return (
                <motion.article
                  layout
                  key={service.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: ARCHITECTURAL_EASE }}
                  className={`flex flex-col justify-between rounded-2xl border bg-white p-7 transition-colors ${
                    isExpanded ? 'border-[#1546C0]/55 shadow-xs' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                            isExpanded
                              ? 'bg-[#1546C0] text-white'
                              : 'bg-[#EFF4FF] text-[#1546C0]'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#475569] tabular-nums">
                          {service.index}. {service.categoryLabel}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId((prev) => (prev === service.id ? '' : service.id))
                        }
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1546C0] transition-colors hover:text-[#0A1628] whitespace-nowrap"
                      >
                        <span>{isExpanded ? 'Recolher' : 'Ver entregas'}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#0A1628]">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-[#0F172A]">
                      {service.shortDescription}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                      {service.fullDescription}
                    </p>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2, ease: ARCHITECTURAL_EASE }}
                          className="mt-6 border-t border-slate-100 pt-5"
                        >
                          <p className="text-xs font-semibold text-[#0A1628]">
                            Principais entregas desta frente
                          </p>
                          <ul className="mt-3 space-y-2.5">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-[#334155]"
                              >
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1546C0]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs">
                    <span className="font-medium text-[#047857]">{service.impactMetric}</span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4-Step Connected Transition Timeline */}
      <section className="border-t border-slate-200/80 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <RevealSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[#1546C0]">Transição estruturada</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A1628]">
                Como assumimos e modernizamos a gestão do seu condomínio.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('economia')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1546C0] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] whitespace-nowrap shrink-0"
            >
              <span>Calcular Economia Estimada</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </RevealSection>

          <RevealSection className="relative mt-12">
            {/* Horizontal Architectural Connector Line on Desktop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-7 right-12 left-12 hidden h-px bg-slate-200 lg:block"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {ONBOARDING_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6"
                >
                  <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#1546C0] font-mono text-xs font-bold text-white tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[#0A1628]">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">{item.detail}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
