import { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  User,
  Wallet,
  Wrench,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { ARCHITECTURAL_EASE } from './MotionPrimitives';

type AppModuleId = 'financeiro' | 'comunicados' | 'solicitacoes' | 'documentos' | 'perfil';

const APP_MODULES: { id: AppModuleId; label: string; hint: string; icon: typeof Wallet }[] = [
  { id: 'financeiro', label: 'Financeiro', hint: 'Balancete e conciliação', icon: Wallet },
  { id: 'comunicados', label: 'Comunicados', hint: 'Avisos com leitura', icon: Bell },
  { id: 'solicitacoes', label: 'Solicitações', hint: 'Chamados e reservas', icon: Wrench },
  { id: 'documentos', label: 'Documentos', hint: 'Atas e laudos 24h', icon: FileText },
  { id: 'perfil', label: 'Perfil', hint: 'Unidade e acessos', icon: User },
];

const BUDGET_SERIES = [
  { month: 'Jun', planned: 82, actual: 79 },
  { month: 'Jul', planned: 82, actual: 77 },
  { month: 'Ago', planned: 84, actual: 76 },
  { month: 'Set', planned: 84, actual: 75 },
  { month: 'Out', planned: 85, actual: 74 },
  { month: 'Nov', planned: 85, actual: 72 },
];

const TICKETS = [
  {
    protocol: 'Protocolo #4821',
    title: 'Substituição de sensor de presença — Garagem G2',
    stage: 'Concluído · Vistoria validada pela zeladoria',
    done: true,
    progress: 100,
  },
  {
    protocol: 'Protocolo #4834',
    title: 'Reserva do Espaço Gourmet — Unidade 1104',
    stage: 'Confirmado · Checklist digital enviado ao morador',
    done: true,
    progress: 100,
  },
  {
    protocol: 'Protocolo #4842',
    title: 'Revisão de fechadura eletromagnética — Portaria pedestres',
    stage: 'Em execução · Técnico credenciado agendado para hoje às 14h',
    done: false,
    progress: 65,
  },
];

export function AppShowcaseMockup() {
  const [activeModule, setActiveModule] = useState<AppModuleId>('financeiro');
  const [ticketFilter, setTicketFilter] = useState<'todos' | 'andamento' | 'concluidos'>('todos');

  const filteredTickets = TICKETS.filter((t) => {
    if (ticketFilter === 'andamento') return !t.done;
    if (ticketFilter === 'concluidos') return t.done;
    return true;
  });

  return (
    <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
      {/* Left Interactive Device Frame Menu */}
      <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-5">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <BrandLogo compact />
            <span className="text-xs font-medium text-[#475569]">App & Portal Web</span>
          </div>

          <p className="mt-4 text-xs text-[#475569]">
            Selecione um módulo para explorar a experiência real de síndicos e moradores:
          </p>

          <div className="mt-4 space-y-2" role="tablist" aria-label="Módulos do aplicativo Prime Facilix">
            {APP_MODULES.map((mod) => {
              const Icon = mod.icon;
              const isSelected = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveModule(mod.id)}
                  className={`flex min-h-[54px] w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1546C0] ${
                    isSelected
                      ? 'border-[#1546C0] bg-[#EFF4FF] text-[#0A1628]'
                      : 'border-slate-200/80 bg-white text-[#334155] hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                        isSelected
                          ? 'bg-[#1546C0] text-white'
                          : 'bg-slate-100 text-[#1546C0]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{mod.label}</span>
                      <span className="block text-xs text-[#64748B]">{mod.hint}</span>
                    </span>
                  </span>
                  <span className="text-xs font-medium text-[#1546C0]">
                    {isSelected ? 'Ativo' : 'Abrir'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-relaxed text-[#475569]">
          Disponível para síndicos, conselheiros e condôminos com permissões personalizadas por perfil de acesso.
        </p>
      </div>

      {/* Right Interactive Dynamic Module Preview with Embedded Visualizations */}
      <div className="bg-architectural-grid-dark flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0A1628] p-6 text-white lg:col-span-7 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: ARCHITECTURAL_EASE }}
            className="flex h-full flex-col justify-between"
          >
            {activeModule === 'financeiro' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <p className="text-xs text-blue-300">Módulo Financeiro · Transparência em tempo real</p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      Painel Orçamentário & Prestação de Contas
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-slate-300 tabular-nums">
                    Competência 11/2026
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/75 p-4">
                    <p className="text-xs text-slate-400">Saldo em conta</p>
                    <p className="mt-1.5 font-mono text-lg font-semibold text-white tabular-nums">
                      R$ 148.920
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/75 p-4">
                    <p className="text-xs text-slate-400">Execução do orçamento</p>
                    <p className="mt-1.5 font-mono text-lg font-semibold text-emerald-300 tabular-nums">
                      -15,2% abaixo
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/75 p-4">
                    <p className="text-xs text-slate-400">Fundo de reserva</p>
                    <p className="mt-1.5 font-mono text-lg font-semibold text-blue-300 tabular-nums">
                      R$ 86.400
                    </p>
                  </div>
                </div>

                {/* Visual Comparative Chart: Orçado vs Realizado */}
                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/65 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-medium text-slate-200">
                      Orçado vs. Realizado (mil R$)
                    </span>
                    <span className="text-slate-400">
                      Barra clara: Orçado · Azul: Realizado
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-6 gap-3">
                    {BUDGET_SERIES.map((item) => (
                      <div key={item.month} className="flex flex-col items-center gap-2">
                        <div className="flex h-24 w-full items-end justify-center gap-1.5">
                          <div
                            style={{ height: `${item.planned}%` }}
                            className="w-3 rounded-t bg-slate-600/70"
                            title={`Orçado: R$ ${item.planned} mil`}
                          />
                          <div
                            style={{ height: `${item.actual}%` }}
                            className="w-3 rounded-t bg-[#3B82F6]"
                            title={`Realizado: R$ ${item.actual} mil`}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    { item: 'Manutenção preventiva de elevadores (Torre A/B)', value: 'R$ 4.280,00', status: 'Conciliado · NF anexada' },
                    { item: 'Renegociação contrato de limpeza e conservação', value: 'R$ 16.900,00', status: 'Economia de 11% aplicada' },
                  ].map((row) => (
                    <div
                      key={row.item}
                      className="flex flex-col justify-between gap-2 rounded-xl border border-slate-800/90 bg-slate-900/45 px-4 py-3 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-100">{row.item}</p>
                        <p className="text-xs text-slate-400">{row.status}</p>
                      </div>
                      <span className="font-mono text-sm font-medium text-white tabular-nums whitespace-nowrap">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'comunicados' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <p className="text-xs text-blue-300">Módulo Comunicados · Informação sem ruído</p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      Avisos Segmentados & Confirmação de Leitura
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-emerald-300 tabular-nums">
                    94% leitura em 24h
                  </span>
                </div>

                <div className="mt-6 space-y-3.5">
                  {[
                    {
                      date: '20 Nov · Geral',
                      readRate: 96,
                      title: 'Limpeza semestral dos reservatórios de água',
                      body: 'Execução programada para sábado das 08h às 13h sem interrupção do abastecimento principal.',
                    },
                    {
                      date: '16 Nov · Conselho e Moradores',
                      readRate: 91,
                      title: 'Prestação de contas de outubro publicada',
                      body: 'Todos os comprovantes, extratos conciliados e comparativos orçamentários estão disponíveis no portal.',
                    },
                    {
                      date: '11 Nov · Torre B',
                      readRate: 95,
                      title: 'Manutenção preventiva concluída no elevador social',
                      body: 'Vistoria mensal finalizada com laudo aprovado e disponibilidade integral reestabelecida.',
                    },
                  ].map((notice) => (
                    <div
                      key={notice.title}
                      className="rounded-xl border border-slate-800 bg-slate-900/65 p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-blue-300">{notice.date}</p>
                        <span className="font-mono text-xs text-slate-300 tabular-nums">
                          {notice.readRate}% lido
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-white">{notice.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{notice.body}</p>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                          style={{ width: `${notice.readRate}%` }}
                          className="h-full rounded-full bg-[#3B82F6]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'solicitacoes' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <p className="text-xs text-blue-300">Módulo Solicitações · Atendimento protocolado</p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      Chamados com Prazo, Histórico e Acompanhamento
                    </h3>
                  </div>
                  <div className="inline-flex rounded-lg border border-slate-700 bg-slate-900 p-0.5 text-xs">
                    {(
                      [
                        { id: 'todos', label: 'Todos' },
                        { id: 'andamento', label: 'Em aberto' },
                        { id: 'concluidos', label: 'Concluídos' },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setTicketFilter(f.id)}
                        className={`rounded-md px-2.5 py-1 font-medium transition-colors whitespace-nowrap ${
                          ticketFilter === f.id
                            ? 'bg-[#2563EB] text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3.5">
                  {filteredTickets.map((ticket) => (
                    <div
                      key={ticket.protocol}
                      className="rounded-xl border border-slate-800 bg-slate-900/65 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs text-blue-300 tabular-nums">
                          {ticket.protocol}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                          <CheckCircle2
                            className={`h-3.5 w-3.5 ${
                              ticket.done ? 'text-emerald-400' : 'text-blue-300'
                            }`}
                          />
                          {ticket.done ? 'Finalizado' : 'Em andamento'}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm font-semibold text-white">{ticket.title}</p>
                      <p className="mt-1 text-xs text-slate-300">{ticket.stage}</p>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                          style={{ width: `${ticket.progress}%` }}
                          className={`h-full rounded-full ${
                            ticket.done ? 'bg-emerald-400' : 'bg-[#3B82F6]'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'documentos' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <p className="text-xs text-blue-300">Módulo Documentos · Acervo digital organizado</p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      Atas, Convenção, Regimento e Laudos Técnicos
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-slate-300">Acesso 24h</span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { name: 'Ata da Assembleia Geral Ordinária 2026', meta: 'PDF · 1,4 MB · Registrada' },
                    { name: 'Regimento Interno e Convenção Consolidada', meta: 'PDF · 2,8 MB · Atualizada' },
                    { name: 'Certificado AVCB e Laudo SPDA Vigentes', meta: 'PDF · 980 KB · Validade 2028' },
                    { name: 'Apólice de Seguro Predial Obrigatório', meta: 'PDF · 1,1 MB · Vigente' },
                  ].map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/65 px-4 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <FileCheck2 className="h-5 w-5 shrink-0 text-blue-300" />
                        <div>
                          <p className="text-sm font-medium text-white">{doc.name}</p>
                          <p className="text-xs text-slate-400">{doc.meta}</p>
                        </div>
                      </div>
                      <Download className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'perfil' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <p className="text-xs text-blue-300">Módulo Perfil · Autonomia e segurança</p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      Gestão da Unidade, Visitantes e Notificações
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-slate-300">LGPD Compliant</span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/65 p-4">
                    <p className="text-xs text-slate-400">Cadastro da unidade</p>
                    <p className="mt-1.5 text-sm font-semibold text-white">
                      Torre Norte · Apto 1104
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      Moradores, veículos, pets e contatos de emergência atualizados em um toque.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/65 p-4">
                    <p className="text-xs text-slate-400">Autorização digital</p>
                    <p className="mt-1.5 text-sm font-semibold text-white">
                      Pré-cadastro de prestadores
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      Liberação por janela de horário com registro automático na portaria.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/65 p-4 sm:col-span-2">
                    <p className="text-xs text-slate-400">Preferências de comunicação</p>
                    <p className="mt-1.5 text-sm font-semibold text-white">
                      Boletos digitais, avisos de encomendas e convocação de assembleias
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      Cada condômino escolhe receber alertas por aplicativo ou e-mail com total privacidade.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs text-slate-400">
              <span>Interface demonstrativa da Plataforma Prime Facilix</span>
              <span className="text-blue-300">Dados ilustrativos para demonstração</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
