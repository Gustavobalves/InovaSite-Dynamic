import {
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Cpu,
  HeartHandshake,
  Lightbulb,
  Scale,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { MediaFrame, PRIME_MEDIA } from '../components/MediaFrame';
import { RevealSection, StaggerCard, StaggerGroup } from '../components/MotionPrimitives';
import { COMMITMENTS, CORE_PILLARS, VALUES_LIST } from '../data/primeData';
import type { PageNavProps } from '../types/navigation';

const PILLAR_ICONS = [Compass, Cpu, Award];
const VALUE_ICONS = [
  ShieldCheck,
  Target,
  Lightbulb,
  Users,
  Scale,
  HeartHandshake,
];

export default function QuemSomosPage({ onNavigate }: PageNavProps) {
  return (
    <div>
      {/* Editorial Header + Architectural Atrium Hero */}
      <section className="bg-architectural-grid border-b border-slate-200/80 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#1546C0]">01. Quem somos</p>
            <h1 className="mt-3 font-[var(--font-display)] text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#0A1628]">
              Transformamos a administração condominial com gestão moderna e próxima das pessoas.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#475569]">
              A Prime Facilix Gestão de Condomínios nasceu com o propósito de elevar o padrão da administração predial. Unimos experiência administrativa, organização operacional e tecnologia para simplificar rotinas, otimizar recursos e proporcionar mais tranquilidade a síndicos, conselheiros e moradores.
            </p>
          </div>

          {/* Cinematic Full-Width Architectural Banner with Quote */}
          <RevealSection className="relative mt-12 h-[320px] overflow-hidden rounded-2xl border border-slate-200 md:h-[380px]">
            <MediaFrame
              src={PRIME_MEDIA.smartLobby}
              alt="Átrio moderno e luminoso de condomínio contemporâneo"
              fallbackTitle="Prime Facilix — Propósito e Presença"
              className="h-full w-full"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060E1B]/92 via-[#0A1628]/45 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
              <blockquote className="max-w-3xl font-[var(--font-display)] text-xl font-semibold leading-snug text-white md:text-2xl">
                “Acreditamos que administrar um condomínio vai muito além de cuidar de contas. É cuidar de pessoas, patrimônio e qualidade de vida.”
              </blockquote>
              <p className="mt-3 text-sm font-medium text-blue-200">
                Prime Facilix · Princípio Fundador
              </p>
            </div>
          </RevealSection>

          {/* 3 Strategic Pillars with Visual Icon Emblems */}
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CORE_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx] ?? Compass;
              return (
                <StaggerCard
                  key={pillar.index}
                  className="rounded-2xl border border-slate-200 bg-white p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF4FF] text-[#1546C0]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#64748B] tabular-nums">
                      Pilar {pillar.index}
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-[#0A1628]">{pillar.title}</h2>
                  <p className="mt-2 text-sm font-medium text-[#0F172A]">{pillar.summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">{pillar.detail}</p>
                </StaggerCard>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <RevealSection className="max-w-2xl">
          <p className="text-sm font-medium text-[#1546C0]">04. Nossos valores</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A1628] md:text-4xl">
            Princípios que guiam o nosso trabalho todos os dias.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569]">
            Mais do que administrar, queremos facilitar. Mais do que organizar, queremos transformar a relação entre síndicos, conselho fiscal, colaboradores e moradores.
          </p>
        </RevealSection>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {VALUES_LIST.map((val, idx) => {
            const Icon = VALUE_ICONS[idx] ?? ShieldCheck;
            return (
              <StaggerCard
                key={val.index}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition-colors hover:border-[#1546C0]/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#1546C0] ring-1 ring-slate-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#1546C0] tabular-nums">
                    {val.index}.
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0A1628]">{val.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  {val.description}
                </p>
              </StaggerCard>
            );
          })}
        </StaggerGroup>
      </section>

      {/* Nosso Compromisso with Split Architectural Photography */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <RevealSection className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0A1628] text-white">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            {/* Left Photographic Column */}
            <div className="relative min-h-[280px] lg:col-span-5">
              <MediaFrame
                src={PRIME_MEDIA.residential}
                alt="Condomínio residencial moderno com áreas verdes e espelho d água"
                fallbackTitle="Seu condomínio em boas mãos"
                className="h-full w-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/35 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0A1628]/30 lg:to-[#0A1628]"
              />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-xs font-medium text-blue-200">06. Nosso compromisso</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Seu condomínio em boas mãos.
                </h2>
              </div>
            </div>

            {/* Right Commitments Grid */}
            <div className="bg-architectural-grid-dark flex flex-col justify-between p-8 md:p-10 lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {COMMITMENTS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-300" />
                    <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-800 pt-6">
                <button
                  type="button"
                  onClick={() => onNavigate('servicos')}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6] whitespace-nowrap"
                >
                  <span>Explorar Serviços</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contato')}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-slate-500 hover:bg-slate-800 whitespace-nowrap"
                >
                  <span>Agendar Conversa</span>
                </button>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
