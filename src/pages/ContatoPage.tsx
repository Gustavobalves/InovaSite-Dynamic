import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Globe,
  Instagram,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import { MediaFrame, PRIME_MEDIA } from '../components/MediaFrame';
import { RevealSection } from '../components/MotionPrimitives';
import { AUDIENCE_PROFILES, BRAND_CONTACT, PORTFOLIO_PDF_PATH } from '../data/primeData';
import type {
  CondoProfileId,
  PageNavProps,
  SavingsSimulationSummary,
} from '../types/navigation';

interface ContatoPageProps extends PageNavProps {
  simulation?: SavingsSimulationSummary | null;
  onClearSimulation?: () => void;
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

export default function ContatoPage({
  simulation,
  onClearSimulation,
}: ContatoPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [condoName, setCondoName] = useState('');
  const [profile, setProfile] = useState<CondoProfileId>(
    simulation?.profileId ?? 'residencial'
  );
  const [units, setUnits] = useState(
    simulation ? String(simulation.units) : ''
  );
  const [message, setMessage] = useState(
    simulation
      ? `Gostaria de receber um diagnóstico detalhado com base na simulação de economia anual estimada em ${currencyFormatter.format(
          simulation.annualSavings
        )} (${simulation.savingsPercent}% sobre orçamento de ${currencyFormatter.format(
          simulation.monthlyBudget
        )}/mês).`
      : ''
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 3) {
      nextErrors.name = 'Informe seu nome completo.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Informe um endereço de e-mail válido.';
    }
    if (phone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Informe um telefone ou WhatsApp com DDD.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Descreva brevemente a necessidade do seu condomínio.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-architectural-grid border-b border-slate-200/80 bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#1546C0]">Entre em contato</p>
            <h1 className="mt-3 font-[var(--font-display)] text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#0A1628]">
              Juntos por um condomínio melhor.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#475569]">
              Gestão inteligente, atendimento próximo e resultados transparentes. Solicite uma proposta personalizada ou agende uma apresentação da plataforma Prime Facilix para o seu conselho.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Workspace */}
      <section className="mx-auto max-w-6xl px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 lg:col-span-7">
            {simulation && (
              <div className="mb-6 rounded-xl border border-blue-200 bg-[#EFF4FF] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#1546C0]">
                      Simulação anexada ao pedido
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#0A1628] tabular-nums">
                      {simulation.profileLabel} · {simulation.units} unidades · Economia projetada de{' '}
                      <strong>{currencyFormatter.format(simulation.annualSavings)}/ano</strong>
                    </p>
                  </div>
                  {onClearSimulation && (
                    <button
                      type="button"
                      onClick={onClearSimulation}
                      aria-label="Remover simulação anexada"
                      className="rounded-md p-1 text-[#475569] hover:bg-white hover:text-[#0A1628]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-[#047857]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-[#0A1628]">
                  Solicitação recebida com sucesso
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#475569]">
                  Obrigado, <strong>{name}</strong>. Nossa equipe especializada analisará os dados enviados para <strong>{condoName || 'o seu condomínio'}</strong> e retornará pelo e-mail <strong>{email}</strong> ou telefone informado.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setCondoName('');
                    setMessage('');
                  }}
                  className="mt-7 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-[#0A1628] transition-colors hover:bg-slate-50"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h2 className="text-xl font-bold text-[#0A1628]">
                  Solicitar proposta ou diagnóstico
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-[#0A1628]"
                    >
                      Nome completo *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#1546C0] focus:outline-none focus:ring-2 focus:ring-[#1546C0]/20"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-[#0A1628]"
                    >
                      E-mail *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@condominio.com.br"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#1546C0] focus:outline-none focus:ring-2 focus:ring-[#1546C0]/20"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-[#0A1628]"
                    >
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#1546C0] focus:outline-none focus:ring-2 focus:ring-[#1546C0]/20"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-condo"
                      className="block text-sm font-medium text-[#0A1628]"
                    >
                      Nome do condomínio
                    </label>
                    <input
                      id="contact-condo"
                      type="text"
                      value={condoName}
                      onChange={(e) => setCondoName(e.target.value)}
                      placeholder="Ex.: Residencial Parque Central"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#1546C0] focus:outline-none focus:ring-2 focus:ring-[#1546C0]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-profile"
                      className="block text-sm font-medium text-[#0A1628]"
                    >
                      Perfil do empreendimento
                    </label>
                    <select
                      id="contact-profile"
                      value={profile}
                      onChange={(e) => setProfile(e.target.value as CondoProfileId)}
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#1546C0] focus:outline-none focus:ring-2 focus:ring-[#1546C0]/20"
                    >
                      {AUDIENCE_PROFILES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-units"
                      className="block text-sm font-medium text-[#0A1628]"
                    >
                      Quantidade aproximada de unidades
                    </label>
                    <input
                      id="contact-units"
                      type="number"
                      min={1}
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      placeholder="Ex.: 96"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 tabular-nums focus:border-[#1546C0] focus:outline-none focus:ring-2 focus:ring-[#1546C0]/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-[#0A1628]"
                  >
                    Como podemos ajudar? *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Conte sobre o momento atual do condomínio, principais desafios ou dúvidas sobre nossa plataforma."
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#1546C0] focus:outline-none focus:ring-2 focus:ring-[#1546C0]/20"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#1546C0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1546C0]"
                >
                  Enviar solicitação de proposta
                </button>
              </form>
            )}
          </div>

          {/* Right Official Channels & Portfolio Document */}
          <div className="space-y-6 lg:col-span-5">
            <RevealSection className="bg-architectural-grid-dark rounded-2xl border border-slate-800 bg-[#0A1628] p-7 text-white">
              <h2 className="text-xl font-bold text-white">Canais oficiais</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Atendimento próximo, ágil e humanizado para síndicos, conselheiros e incorporadoras.
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-center gap-3.5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                    <Phone className="h-4 w-4 text-blue-300" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">Telefone e WhatsApp</p>
                    <a
                      href={BRAND_CONTACT.phoneHref}
                      className="font-mono font-medium text-white hover:text-blue-200 tabular-nums"
                    >
                      {BRAND_CONTACT.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3.5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                    <Mail className="h-4 w-4 text-blue-300" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">E-mail institucional</p>
                    <a
                      href={`mailto:${BRAND_CONTACT.email}`}
                      className="font-medium text-white hover:text-blue-200"
                    >
                      {BRAND_CONTACT.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3.5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                    <Globe className="h-4 w-4 text-blue-300" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">Portal</p>
                    <p className="font-medium text-white">{BRAND_CONTACT.website}</p>
                  </div>
                </li>

                <li className="flex items-center gap-3.5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
                    <Instagram className="h-4 w-4 text-blue-300" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">Instagram</p>
                    <p className="font-medium text-white">{BRAND_CONTACT.instagram}</p>
                  </div>
                </li>
              </ul>
            </RevealSection>

            {/* Official PDF Portfolio Access with Architectural Visual Cover */}
            <RevealSection className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative h-36 w-full">
                <MediaFrame
                  src={PRIME_MEDIA.commercial}
                  alt="Torre moderna representando o portfólio institucional Prime Facilix"
                  fallbackTitle="Portfólio Institucional Prime Facilix"
                  className="h-full w-full"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-[#0A1628]/30 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-medium text-blue-200">Apresentação oficial em PDF</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3.5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF4FF] text-[#1546C0]">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#0A1628]">
                      Portfólio Institucional Prime Facilix
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                      Compartilhe a apresentação completa em PDF com o conselho fiscal e na próxima assembleia do seu condomínio.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={PORTFOLIO_PDF_PATH}
                        download="Portfolio-Prime-Facilix.pdf"
                        className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg bg-[#0A1628] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1546C0] whitespace-nowrap"
                      >
                        <span>Baixar Portfólio PDF</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <a
                        href={PORTFOLIO_PDF_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-[#0A1628] transition-colors hover:bg-slate-50 whitespace-nowrap"
                      >
                        <span>Visualizar PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  );
}
