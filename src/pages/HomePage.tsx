import {
  ArrowRight,
  Calculator,
  ChevronRight,
  Cpu,
  FileCheck2,
  MessageSquare,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react';
import { HeroArchitecturalShowcase } from '../components/ArchitecturalVisual';
import { MediaFrame, PRIME_MEDIA } from '../components/MediaFrame';
import { RevealSection, StaggerCard, StaggerGroup } from '../components/MotionPrimitives';
import { AUDIENCE_PROFILES, CORE_PILLARS, SERVICES } from '../data/primeData';
import type { CondoProfileId, PageNavProps } from '../types/navigation';

const SERVICE_ICONS: Record<string, typeof Wallet> = {
  'administrativa-financeira': Wallet,
  'operacional-manutencao': Wrench,
  'fornecedores-contratos': FileCheck2,
  'equipes-colaboradores': Users,
  'tecnologia-inovacao': Cpu,
  'atendimento-moradores': MessageSquare,
};

const PROFILE_THUMBS: Record<CondoProfileId, string> = {
  residencial: PRIME_MEDIA.residential,
  comercial: PRIME_MEDIA.commercial,
  incorporadora: PRIME_MEDIA.development,
  'grande-porte': PRIME_MEDIA.heroCondo,
};

export default function HomePage({ onNavigate }: PageNavProps) {
  return (
    <div>
      {/* Full-Bleed Architectural Hero with Auto-Cycling Insights */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-[#0A1628] text-white">
        {/* Full-Width Background Architectural Image */}
        <MediaFrame
          src={PRIME_MEDIA.heroCondo}
          alt="Torre condominial contemporânea iluminada ao entardecer"
          fallbackTitle="Prime Facilix — Gestão de Condomínios"
          className="pointer-events-none absolute inset-0 h-full w-full"
          imgClassName="scale-[1.02] object-center"
        />

        {/* Calibrated Directional Scrim for High-Contrast Legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060E1B]/95 via-[#0A1628]/82 to-[#0A1628]/58"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060E1B]/92 via-transparent to-[#060E1B]/45"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-14 pb-16 lg:pt-20 lg:pb-20">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Dominant Focal Proposition */}
            <div className="flex flex-col justify-center lg:col-span-6">
              <p className="text-sm font-medium tracking-wide text-blue-300">
                Prime Facilix · Gestão de Condomínios
              </p>
              <h1 className="mt-4 font-[var(--font-display)] text-[clamp(2.25rem,4.1vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-white">
                Mais facilidade para administrar. Mais tranquilidade para viver.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
                Unimos experiência administrativa, organização operacional e inovação digital para simplificar rotinas, otimizar recursos e valorizar o patrimônio do seu condomínio com transparência total.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('economia')}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Simular Economia do Condomínio</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('inovacao')}
                  className="inline-flex min-h-[46px] items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/15 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Conhecer a Inovação</span>
                  <ArrowRight className="h-4 w-4 text-blue-200" />
                </button>
              </div>
            </div>

            {/* Right Auto-Cycling Frosted Glass Insights Panel */}
            <div className="lg:col-span-6">
              <HeroArchitecturalShowcase onNavigate={onNavigate} />
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Context Strip over Scrim */}
          <RevealSection className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: '100% digital',
                label: 'Prestação de contas com notas fiscais e extratos conciliados no portal',
              },
              {
                value: 'Até 20%',
                label: 'Potencial médio de otimização anual em contratos, utilidades e manutenção',
              },
              {
                value: '4 perfis',
                label: 'Residenciais, comerciais, incorporadoras e condomínios de grande porte',
              },
              {
                value: 'Atendimento próximo',
                label: 'Equipe dedicada para apoiar síndicos, conselheiros e moradores',
              },
            ].map((item) => (
              <div key={item.value} className="bg-[#0A1628]/82 p-6">
                <p className="font-mono text-lg font-semibold text-white tabular-nums">
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.label}</p>
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* Architectural Visual Feature Band + 3 Core Pillars */}
      <section className="border-b border-slate-200/80 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <RevealSection className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Editorial Smart Lobby Photograph */}
            <div className="relative min-h-[290px] overflow-hidden rounded-2xl border border-slate-200 lg:col-span-6">
              <MediaFrame
                src={PRIME_MEDIA.smartLobby}
                alt="Lobby arquitetônico contemporâneo com fachada de vidro e iluminação linear"
                fallbackTitle="Arquitetura, organização e bem-estar"
                className="h-full w-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/88 via-[#0A1628]/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="font-[var(--font-display)] text-lg font-semibold leading-snug text-white md:text-xl">
                  “Administrar um condomínio é cuidar de pessoas, patrimônio e qualidade de vida.”
                </p>
                <p className="mt-2 text-xs font-medium text-blue-200">
                  Prime Facilix · Gestão Moderna e Próxima
                </p>
              </div>
            </div>

            {/* Right Pillars Narrative */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-sm font-medium text-[#1546C0]">Propósito e método</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A1628] md:text-4xl">
                  Estrutura sólida, tecnologia clara e proximidade real.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#475569]">
                  Substituímos controles manuais e ruídos de comunicação por fluxos digitais transparentes, acompanhamento preventivo e suporte consultivo ao síndico.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {CORE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.index}
                    className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-4"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EFF4FF] font-mono text-xs font-bold text-[#1546C0] tabular-nums">
                      {pillar.index}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0A1628]">{pillar.title}</h3>
                      <p className="mt-0.5 text-sm text-[#475569]">{pillar.summary}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => onNavigate('quem-somos')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1546C0] transition-colors hover:text-[#0A1628] whitespace-nowrap"
                >
                  <span>Conheça nossa história, valores e compromissos</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Asymmetric Bento Preview of Services with Visual Iconography */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <RevealSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1546C0]">Uma gestão completa</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A1628] md:text-4xl">
              Seis frentes integradas para mais organização, eficiência e valor.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('servicos')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1546C0] transition-colors hover:text-[#0A1628] whitespace-nowrap shrink-0"
          >
            <span>Explorar todos os serviços</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </RevealSection>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
          {SERVICES.map((service, idx) => {
            const spanClass = idx === 0 || idx === 4 ? 'md:col-span-7' : 'md:col-span-5';
            const Icon = SERVICE_ICONS[service.id] ?? ShieldCheck;
            return (
              <StaggerCard key={service.id} className={spanClass}>
                <button
                  type="button"
                  onClick={() => onNavigate('servicos')}
                  className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 text-left transition-all duration-200 hover:border-[#1546C0]/50 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1546C0]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF4FF] text-[#1546C0] transition-colors group-hover:bg-[#1546C0] group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#64748B] tabular-nums">
                        {service.index}. {service.categoryLabel}
                        <ArrowRight className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#1546C0]" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-[#0A1628]">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <p className="text-xs font-medium text-[#047857]">
                      {service.impactMetric}
                    </p>
                  </div>
                </button>
              </StaggerCard>
            );
          })}
        </StaggerGroup>
      </section>

      {/* Audience Visual Cards & Savings Calculator Callout */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <RevealSection className="bg-architectural-grid-dark overflow-hidden rounded-2xl border border-slate-800 bg-[#0A1628] p-8 text-white md:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-sm font-medium text-blue-300">
                Cálculo de economia · Diagnóstico instantâneo
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Quanto o seu condomínio pode economizar com gestão inteligente?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
                Selecione um perfil ao lado ou abra nossa calculadora completa para simular o impacto anual de renegociação de contratos, manutenção preventiva e eficiência de utilidades.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('economia')}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6] whitespace-nowrap"
                >
                  <span>Abrir Calculadora de Economia</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('publico')}
                  className="inline-flex min-h-[46px] items-center gap-1.5 text-sm font-medium text-blue-200 transition-colors hover:text-white whitespace-nowrap"
                >
                  <span>Ver soluções por perfil</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 lg:col-span-6">
              {AUDIENCE_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => onNavigate('economia', { profileId: profile.id })}
                  className="group relative flex h-40 flex-col justify-end overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-left transition-all hover:border-blue-400"
                >
                  <MediaFrame
                    src={PROFILE_THUMBS[profile.id]}
                    alt={profile.title}
                    fallbackTitle={profile.title}
                    className="absolute inset-0 h-full w-full"
                    imgClassName="group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060E1B]/95 via-[#0A1628]/55 to-[#0A1628]/20"
                  />
                  <div className="relative z-10 p-4">
                    <p className="text-sm font-bold text-white">{profile.title}</p>
                    <p className="mt-1 font-mono text-sm font-semibold text-emerald-300 tabular-nums">
                      {profile.typicalSavingsRange} / ano
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
