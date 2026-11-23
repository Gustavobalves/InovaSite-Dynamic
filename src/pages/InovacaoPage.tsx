import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  HeartHandshake,
  Laptop,
  Minus,
  Users,
  Workflow,
} from 'lucide-react';
import { AppShowcaseMockup } from '../components/AppShowcaseMockup';
import { InnovationArchitectureDiagram } from '../components/ArchitecturalVisual';
import { MediaFrame, PRIME_MEDIA } from '../components/MediaFrame';
import { RevealSection, StaggerCard, StaggerGroup } from '../components/MotionPrimitives';
import { DIFFERENTIALS, INNOVATION_COMPARISON } from '../data/primeData';
import type { PageNavProps } from '../types/navigation';

const DIFFERENTIAL_ICONS = [Laptop, Users, Workflow, BarChart3, HeartHandshake];

export default function InovacaoPage({ onNavigate }: PageNavProps) {
  const [comparisonFocus, setComparisonFocus] = useState<'ambos' | 'prime'>('ambos');

  return (
    <div>
      {/* Editorial Innovation Header with Smart Atrium Visual */}
      <section className="bg-architectural-grid border-b border-slate-200/80 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-sm font-medium text-[#1546C0]">
                03. Diferenciais & Inovação Condominial
              </p>
              <h1 className="mt-3 font-[var(--font-display)] text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#0A1628]">
                Inovação prática que aproxima pessoas e traz clareza a cada decisão.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#475569]">
                Na Prime Facilix, tecnologia é ferramenta concreta para eliminar burocracia, auditar contas em tempo real, antecipar manutenções e dar autonomia real a síndicos, conselheiros e moradores.
              </p>
            </div>

            <div className="relative min-h-[250px] overflow-hidden rounded-2xl border border-slate-200 lg:col-span-5">
              <MediaFrame
                src={PRIME_MEDIA.smartLobby}
                alt="Ambiente condominial inteligente e moderno"
                fallbackTitle="Tecnologia + Gestão = Tranquilidade"
                className="h-full w-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060E1B]/92 via-[#0A1628]/35 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-[var(--font-display)] text-lg font-bold text-white">
                  Tecnologia + Gestão = Tranquilidade
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-blue-100">
                  Plataforma digital integrada a uma equipe consultiva dedicada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Connected Ecosystem Architecture Diagram */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-8 lg:pt-20">
        <RevealSection className="mb-10 max-w-2xl">
          <p className="text-sm font-medium text-[#1546C0]">Ecossistema conectado</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0A1628]">
            Como nossa inteligência digital conecta finanças, manutenção e moradores.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#475569]">
            Explore os quatro núcleos integrados da operação Prime Facilix clicando nos módulos do diagrama abaixo.
          </p>
        </RevealSection>

        <RevealSection>
          <InnovationArchitectureDiagram />
        </RevealSection>
      </section>

      {/* Interactive Prime Facilix Digital Platform Walkthrough */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <RevealSection className="mb-10 max-w-2xl">
          <p className="text-sm font-medium text-[#1546C0]">Plataforma digital Prime Facilix</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0A1628]">
            Navegue pelos módulos do aplicativo para síndicos e moradores.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#475569]">
            Clique nas abas para visualizar gráficos financeiros, comunicados com taxa de leitura, solicitações protocoladas e documentos oficiais.
          </p>
        </RevealSection>

        <RevealSection>
          <AppShowcaseMockup />
        </RevealSection>
      </section>

      {/* 5 Core Differentials with Visual Emblems */}
      <section className="border-y border-slate-200/80 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <RevealSection className="max-w-2xl">
            <p className="text-sm font-medium text-[#1546C0]">O que nos torna a melhor escolha</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0A1628]">
              Cinco diferenciais que sustentam uma gestão moderna.
            </h2>
          </RevealSection>

          <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
            {DIFFERENTIALS.map((item, idx) => {
              const span = idx < 2 ? 'md:col-span-3' : 'md:col-span-2';
              const Icon = DIFFERENTIAL_ICONS[idx] ?? Laptop;
              return (
                <StaggerCard
                  key={item.index}
                  className={`${span} rounded-2xl border border-slate-200 bg-[#F8FAFC] p-7 transition-colors hover:border-[#1546C0]/40`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1546C0] ring-1 ring-slate-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#1546C0] tabular-nums">
                      {item.index}.
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#0A1628]">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[#1546C0]">{item.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                    {item.description}
                  </p>
                </StaggerCard>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Interactive Comparison: Traditional vs Prime Facilix Innovation */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <RevealSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1546C0]">Evolução operacional</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0A1628]">
              Modelo tradicional versus gestão inovadora Prime Facilix.
            </h2>
          </div>
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setComparisonFocus('ambos')}
              className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                comparisonFocus === 'ambos'
                  ? 'bg-[#0A1628] text-white'
                  : 'text-[#475569] hover:text-[#0A1628]'
              }`}
            >
              Comparativo lado a lado
            </button>
            <button
              type="button"
              onClick={() => setComparisonFocus('prime')}
              className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                comparisonFocus === 'prime'
                  ? 'bg-[#1546C0] text-white'
                  : 'text-[#475569] hover:text-[#0A1628]'
              }`}
            >
              Foco Prime Facilix
            </button>
          </div>
        </RevealSection>

        <RevealSection className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="divide-y divide-slate-200">
            {INNOVATION_COMPARISON.map((row) => (
              <div
                key={row.dimension}
                className="grid grid-cols-1 gap-4 p-6 md:grid-cols-12 md:items-start"
              >
                <div className="md:col-span-3">
                  <h3 className="text-base font-bold text-[#0A1628]">{row.dimension}</h3>
                </div>

                {comparisonFocus === 'ambos' && (
                  <div className="md:col-span-4">
                    <p className="text-xs font-medium text-[#64748B]">Gestão convencional</p>
                    <p className="mt-1.5 flex items-start gap-2 text-sm leading-relaxed text-[#475569]">
                      <Minus className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>{row.traditional}</span>
                    </p>
                  </div>
                )}

                <div className={comparisonFocus === 'ambos' ? 'md:col-span-5' : 'md:col-span-9'}>
                  <p className="text-xs font-semibold text-[#1546C0]">Com a Prime Facilix</p>
                  <p className="mt-1.5 flex items-start gap-2 text-sm leading-relaxed text-[#0F172A]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#047857]" />
                    <span>{row.prime}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-blue-200/80 bg-[#EFF4FF] p-8 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-bold text-[#0A1628]">
              Veja quanto essa modernização representa em economia real.
            </h3>
            <p className="mt-1.5 text-sm text-[#475569]">
              Use nossa calculadora interativa para estimar o impacto anual no orçamento do seu condomínio.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('economia')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1546C0] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] whitespace-nowrap shrink-0"
          >
            <span>Ir para Cálculo de Economia</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </RevealSection>
      </section>
    </div>
  );
}
