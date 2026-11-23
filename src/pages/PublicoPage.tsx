import { useState } from 'react';
import { ArrowRight, Calculator, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ProfileBlueprintGraphic } from '../components/ArchitecturalVisual';
import { MediaFrame, PRIME_MEDIA } from '../components/MediaFrame';
import { ARCHITECTURAL_EASE, RevealSection } from '../components/MotionPrimitives';
import { AUDIENCE_PROFILES } from '../data/primeData';
import type { CondoProfileId, PageNavProps } from '../types/navigation';

const CARD_THUMBS: Record<CondoProfileId, string> = {
  residencial: PRIME_MEDIA.residential,
  comercial: PRIME_MEDIA.commercial,
  incorporadora: PRIME_MEDIA.development,
  'grande-porte': PRIME_MEDIA.heroCondo,
};

export default function PublicoPage({ onNavigate }: PageNavProps) {
  const [selectedId, setSelectedId] = useState<CondoProfileId>('residencial');

  const activeProfile =
    AUDIENCE_PROFILES.find((p) => p.id === selectedId) ?? AUDIENCE_PROFILES[0];

  return (
    <div>
      {/* Header with Photographic Profile Selector Cards */}
      <section className="bg-architectural-grid border-b border-slate-200/80 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#1546C0]">05. Público que atendemos</p>
            <h1 className="mt-3 font-[var(--font-display)] text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#0A1628]">
              Soluções sob medida para diferentes perfis de condomínios.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#475569]">
              Cada condomínio tem suas particularidades. Por isso, estruturamos equipes, rotinas e ferramentas digitais personalizadas para cada realidade.
            </p>
          </div>

          {/* Interactive Photographic Selector Cards */}
          <div
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            role="tablist"
            aria-label="Perfis de condomínios atendidos"
          >
            {AUDIENCE_PROFILES.map((profile, index) => {
              const isSelected = profile.id === selectedId;
              return (
                <button
                  key={profile.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(profile.id)}
                  className={`group relative flex h-44 flex-col justify-end overflow-hidden rounded-2xl border text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1546C0] ${
                    isSelected
                      ? 'border-[#1546C0] ring-2 ring-[#1546C0]/30'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <MediaFrame
                    src={CARD_THUMBS[profile.id]}
                    alt={profile.title}
                    fallbackTitle={profile.title}
                    className="absolute inset-0 h-full w-full"
                    imgClassName="group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-opacity ${
                      isSelected
                        ? 'bg-gradient-to-t from-[#0A1628]/95 via-[#1546C0]/40 to-[#0A1628]/15'
                        : 'bg-gradient-to-t from-[#060E1B]/92 via-[#0A1628]/45 to-transparent'
                    }`}
                  />
                  <div className="relative z-10 p-4">
                    <span className="font-mono text-xs font-semibold text-blue-200 tabular-nums">
                      0{index + 1}. {isSelected ? '· Selecionado' : ''}
                    </span>
                    <p className="mt-1 text-base font-bold text-white">{profile.title}</p>
                    <p className="mt-0.5 text-xs text-slate-200">{profile.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Selected Profile Deep-Dive */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProfile.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: ARCHITECTURAL_EASE }}
            className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12"
          >
            {/* Left High-Resolution Photo & Executive Overview */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 lg:col-span-5">
              <div>
                <ProfileBlueprintGraphic
                  profileId={activeProfile.id}
                  heightClass="h-60"
                />

                <p className="mt-6 text-xs font-medium text-[#1546C0]">
                  {activeProfile.idealFor}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#0A1628]">
                  {activeProfile.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  {activeProfile.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs text-[#475569]">Faixa típica de economia anual</span>
                  <span className="font-mono text-lg font-bold text-[#047857] tabular-nums">
                    {activeProfile.typicalSavingsRange}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate('economia', { profileId: activeProfile.id })
                  }
                  className="mt-5 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[#1546C0] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] whitespace-nowrap"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Simular economia para {activeProfile.title}</span>
                </button>
              </div>
            </div>

            {/* Right Challenges Solved + Tailored Modules */}
            <div className="flex flex-col justify-between gap-6 lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-7">
                <h3 className="text-lg font-bold text-[#0A1628]">
                  Como atuamos na prática neste perfil
                </h3>
                <ul className="mt-5 space-y-4">
                  {activeProfile.challengesSolved.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#334155]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1546C0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7">
                <h3 className="text-lg font-bold text-[#0A1628]">
                  Módulos e entregas recomendados
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {activeProfile.recommendedModules.map((mod, idx) => (
                    <div
                      key={mod}
                      className="rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-4"
                    >
                      <span className="font-mono text-xs font-semibold text-[#1546C0] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <p className="mt-1.5 text-sm font-medium text-[#0A1628]">{mod}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Complete Overview Strip */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <RevealSection className="bg-architectural-grid-dark flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-800 bg-[#0A1628] p-8 text-white md:flex-row md:items-center md:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Seu condomínio tem demandas específicas ou estrutura mista?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Montamos uma proposta sob medida considerando número de torres, equipe própria ou terceirizada, fluxo de caixa e prioridades do conselho.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contato')}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6] whitespace-nowrap shrink-0"
          >
            <span>Solicitar Proposta Personalizada</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </RevealSection>
      </section>
    </div>
  );
}
