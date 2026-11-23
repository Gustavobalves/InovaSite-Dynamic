import type { CondoProfileId, PageId } from '../types/navigation';

export const PORTFOLIO_PDF_PATH = '/assets/aistudio/Portf_lio_Prime_Facilix_7cc63bfe.pdf';

export interface PageMeta {
  id: PageId;
  label: string;
  title: string;
  hash: string;
}

export const PAGE_METADATA: Record<PageId, PageMeta> = {
  inicio: {
    id: 'inicio',
    label: 'Início',
    title: 'Prime Facilix — Gestão de Condomínios',
    hash: '#/inicio',
  },
  'quem-somos': {
    id: 'quem-somos',
    label: 'Quem Somos',
    title: 'Quem Somos | Prime Facilix',
    hash: '#/quem-somos',
  },
  servicos: {
    id: 'servicos',
    label: 'Serviços',
    title: 'Nossos Serviços | Prime Facilix',
    hash: '#/servicos',
  },
  inovacao: {
    id: 'inovacao',
    label: 'Inovação',
    title: 'Inovação & Plataforma Digital | Prime Facilix',
    hash: '#/inovacao',
  },
  publico: {
    id: 'publico',
    label: 'Público',
    title: 'Público que Atendemos | Prime Facilix',
    hash: '#/publico',
  },
  economia: {
    id: 'economia',
    label: 'Economia',
    title: 'Cálculo de Economia | Prime Facilix',
    hash: '#/economia',
  },
  contato: {
    id: 'contato',
    label: 'Contato',
    title: 'Entre em Contato | Prime Facilix',
    hash: '#/contato',
  },
};

export const PRIMARY_NAV_ITEMS: PageId[] = [
  'quem-somos',
  'servicos',
  'inovacao',
  'publico',
  'economia',
];

export const BRAND_CONTACT = {
  phone: '(11) 99999-9999',
  phoneHref: 'tel:+5511999999999',
  email: 'contato@primefacilix.com.br',
  website: 'www.primefacilix.com.br',
  instagram: '@primefacilix',
  tagline: 'Mais facilidade para administrar. Mais tranquilidade para viver.',
  closingStatement: 'Gestão inteligente. Atendimento próximo. Resultados transparentes.',
  closingMotto: 'Juntos por um condomínio melhor.',
};

export const CORE_PILLARS = [
  {
    index: '01',
    title: 'Facilidade',
    summary: 'Processos simples, organizados e eficientes.',
    detail:
      'Fluxos padronizados que eliminam retrabalho na rotina do síndico, centralizando aprovações, prestações de contas e demandas operacionais em um só lugar.',
  },
  {
    index: '02',
    title: 'Tecnologia',
    summary: 'Soluções digitais que aproximam a administração dos moradores.',
    detail:
      'Plataforma digital dedicada com conciliação em tempo real, relatórios gerenciais interativos e canal direto para comunicação sem ruído.',
  },
  {
    index: '03',
    title: 'Excelência',
    summary: 'Acompanhamento contínuo e compromisso com resultados.',
    detail:
      'Indicadores claros de desempenho, revisões periódicas de contratos e foco constante na preservação e valorização do patrimônio.',
  },
];

export interface ServiceItem {
  id: string;
  index: string;
  category: 'gestao' | 'operacao' | 'inovacao';
  categoryLabel: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  impactMetric: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'administrativa-financeira',
    index: '01',
    category: 'gestao',
    categoryLabel: 'Gestão e Finanças',
    title: 'Administrativa e financeira',
    shortDescription: 'Controle, transparência e segurança na gestão dos recursos.',
    fullDescription:
      'Previsão orçamentária rigorosa, contas a pagar e receber com conciliação automatizada, pastas digitais auditáveis em tempo real e apoio jurídico-administrativo para assembleias e convenções.',
    deliverables: [
      'Previsão orçamentária anual e acompanhamento mensal de desvios',
      'Prestação de contas digital com notas fiscais e comprovantes anexados',
      'Gestão estratégica de inadimplência com régua de cobrança humanizada',
      'Assessoria completa para convocações, atas e assembleias digitais ou híbridas',
    ],
    impactMetric: '100% de rastreabilidade contábil em pasta digital mensal',
  },
  {
    id: 'operacional-manutencao',
    index: '02',
    category: 'operacao',
    categoryLabel: 'Operação e Patrimônio',
    title: 'Operacional e manutenção',
    shortDescription: 'Preservação do patrimônio e bom funcionamento das instalações.',
    fullDescription:
      'Calendário digital de manutenção preventiva para elevadores, bombas, geradores, sistemas de incêndio e áreas comuns, reduzindo paradas inesperadas e custos com emergências corretivas.',
    deliverables: [
      'Plano anual de manutenção preventiva com alertas automáticos de vencimento',
      'Controle rigoroso de laudos obrigatórios (AVCB, SPDA, dedetização e limpeza de reservatórios)',
      'Acompanhamento técnico de obras e reformas com checklist fotográfico',
      'Vistorias periódicas de infraestrutura para valorização patrimonial',
    ],
    impactMetric: 'Redução média de até 35% em chamados corretivos emergenciais',
  },
  {
    id: 'fornecedores-contratos',
    index: '03',
    category: 'gestao',
    categoryLabel: 'Gestão e Finanças',
    title: 'Fornecedores e contratos',
    shortDescription: 'Qualidade, segurança e melhor utilização dos recursos.',
    fullDescription:
      'Homologação técnica de parceiros, cotações comparativas auditáveis e revisão periódica de contratos recorrentes para assegurar o melhor custo-benefício e compliance trabalhista.',
    deliverables: [
      'Auditoria e renegociação contínua de contratos de portaria, limpeza e manutenção',
      'Mapa comparativo de no mínimo 3 cotações para compras e obras',
      'Verificação mensal de certidões negativas e obrigações previdenciárias',
      'Avaliação de SLA de fornecedores com indicadores de entrega',
    ],
    impactMetric: 'Economia recorrente de 8% a 14% na revisão anual de contratos',
  },
  {
    id: 'equipes-colaboradores',
    index: '04',
    category: 'operacao',
    categoryLabel: 'Operação e Patrimônio',
    title: 'Equipes e colaboradores',
    shortDescription: 'Organização, produtividade e colaboração.',
    fullDescription:
      'Gestão de escalas, treinamentos periódicos de atendimento e segurança, controle de ponto e acompanhamento de rotinas para manter a equipe alinhada aos padrões do condomínio.',
    deliverables: [
      'Planejamento de escalas, férias e cobertura sem horas extras imprevistas',
      'Rotinas operacionais padronizadas para zeladoria, portaria e limpeza',
      'Treinamentos de hospitalidade, controle de acesso e procedimentos de emergência',
      'Conformidade trabalhista, folha de pagamento e controle de EPIs',
    ],
    impactMetric: 'Rotinas padronizadas com controle diário de execução',
  },
  {
    id: 'tecnologia-inovacao',
    index: '05',
    category: 'inovacao',
    categoryLabel: 'Inovação Digital',
    title: 'Tecnologia e inovação',
    shortDescription: 'Ferramentas digitais para mais agilidade e transparência.',
    fullDescription:
      'Ecossistema digital integrado para síndicos, conselheiros e moradores com acesso via aplicativo e web, automação de rotinas financeiras, reservas inteligentes e painéis gerenciais claros.',
    deliverables: [
      'Aplicativo Prime Facilix com módulos Financeiro, Comunicados, Solicitações e Documentos',
      'Dashboards gerenciais para decisões seguras do síndico e conselho fiscal',
      'Assembleias digitais, enquetes rápidas e autorização de acesso por QR Code',
      'Automação de boletos, segunda via instantânea e notificações inteligentes',
    ],
    impactMetric: 'Respostas operacionais até 3x mais rápidas pelo canal digital',
  },
  {
    id: 'atendimento-moradores',
    index: '06',
    category: 'inovacao',
    categoryLabel: 'Inovação Digital',
    title: 'Atendimento aos moradores',
    shortDescription: 'Canais organizados e comunicação clara.',
    fullDescription:
      'Relacionamento próximo, ágil e humanizado com canais estruturados de atendimento, protocolo transparente de chamados e comunicados segmentados que reduzem ruídos na convivência.',
    deliverables: [
      'Central de atendimento multicanal com acompanhamento de protocolo em tempo real',
      'Comunicados claros e segmentados por torre, bloco ou perfil de morador',
      'Gestão simplificada de reservas de espaços comuns e mudanças',
      'Mediação construtiva de ocorrências baseada no regimento interno',
    ],
    impactMetric: 'Comunicação transparente com histórico acessível a cada condômino',
  },
];

export const DIFFERENTIALS = [
  {
    index: '01',
    title: 'Plataforma digital',
    subtitle: 'Para síndicos e moradores.',
    description:
      'Acesso unificado a boletos, balancetes em tempo real, reservas de áreas comuns, comunicados oficiais e biblioteca completa de documentos do condomínio.',
  },
  {
    index: '02',
    title: 'Equipe especializada',
    subtitle: 'Experiente e dedicada.',
    description:
      'Profissionais com domínio administrativo, financeiro, operacional e jurídico-condominial prontos para atuar preventivamente nas rotinas do empreendimento.',
  },
  {
    index: '03',
    title: 'Processos claros',
    subtitle: 'Padronizados e bem definidos.',
    description:
      'Cada rotina conta com responsáveis, prazos e registros auditáveis, eliminando improvisos e garantindo continuidade administrativa.',
  },
  {
    index: '04',
    title: 'Relatórios gerenciais',
    subtitle: 'Para decisões mais seguras.',
    description:
      'Painéis visuais com comparativo orçado versus realizado, curvas de consumo de água e energia, inadimplência e cronograma de manutenção.',
  },
  {
    index: '05',
    title: 'Atendimento próximo',
    subtitle: 'Ágil e humanizado.',
    description:
      'Tecnologia sem distanciamento: especialistas acessíveis para apoiar o síndico em cada decisão e acolher as demandas dos moradores com clareza.',
  },
];

export const VALUES_LIST = [
  {
    index: '01',
    title: 'Transparência e ética',
    description: 'Contas abertas, processos rastreáveis e conduta íntegra em cada contratação e prestação de contas.',
  },
  {
    index: '02',
    title: 'Comprometimento com resultados',
    description: 'Metas claras de eficiência financeira, preservação patrimonial e redução de desperdícios.',
  },
  {
    index: '03',
    title: 'Inovação e melhoria contínua',
    description: 'Adoção constante de ferramentas digitais e métodos modernos que simplificam o dia a dia condominial.',
  },
  {
    index: '04',
    title: 'Respeito às pessoas',
    description: 'Escuta ativa, cordialidade e valorização de moradores, colaboradores, síndicos e conselheiros.',
  },
  {
    index: '05',
    title: 'Organização e responsabilidade',
    description: 'Planejamento preventivo, cumprimento rigoroso de prazos legais e zelo pelo patrimônio coletivo.',
  },
  {
    index: '06',
    title: 'Atendimento próximo e humanizado',
    description: 'Relacionamento consultivo e acessível, porque administrar um condomínio é cuidar de pessoas.',
  },
];

export const COMMITMENTS = [
  {
    title: 'Gestão eficiente e transparente',
    detail: 'Visibilidade total sobre cada receita, despesa, contrato e aprovação do conselho.',
  },
  {
    title: 'Valorização do seu patrimônio',
    detail: 'Manutenção preventiva estruturada e governança sólida que elevam o valor de mercado do imóvel.',
  },
  {
    title: 'Bem-estar dos moradores',
    detail: 'Áreas comuns sempre operacionais, convivência harmoniosa e atendimento rápido às solicitações.',
  },
  {
    title: 'Relacionamento próximo e confiável',
    detail: 'Parceria ativa com síndicos e conselheiros para decisões tranquilas e embasadas em dados.',
  },
];

export interface AudienceProfile {
  id: CondoProfileId;
  title: string;
  subtitle: string;
  summary: string;
  idealFor: string;
  challengesSolved: string[];
  recommendedModules: string[];
  typicalSavingsRange: string;
  defaultUnits: number;
  defaultMonthlyBudget: number;
  defaultDelinquency: number;
  efficiencyMultiplier: number;
}

export const AUDIENCE_PROFILES: AudienceProfile[] = [
  {
    id: 'residencial',
    title: 'Residenciais',
    subtitle: 'Mais conforto e segurança para os moradores.',
    summary:
      'Gestão desenhada para proporcionar tranquilidade às famílias, equilibrando taxa condominial justa, áreas de lazer impecáveis e comunicação sem ruídos.',
    idealFor: 'Edifícios residenciais e condomínios de 24 a 180 unidades',
    challengesSolved: [
      'Controle rigoroso de custos fixos para evitar reajustes surpresa na cota condominial',
      'Agilidade na comunicação com moradores e reservas de salão, churrasqueira e espaços comuns',
      'Manutenção preventiva de elevadores, piscina, academia e sistemas de segurança',
    ],
    recommendedModules: [
      'App Prime Facilix para moradores',
      'Pasta digital de prestação de contas',
      'Calendário de manutenção preventiva',
      'Régua inteligente de inadimplência',
    ],
    typicalSavingsRange: '11% a 16%',
    defaultUnits: 84,
    defaultMonthlyBudget: 78000,
    defaultDelinquency: 7,
    efficiencyMultiplier: 1.0,
  },
  {
    id: 'comercial',
    title: 'Comerciais',
    subtitle: 'Ambientes mais eficientes e produtivos.',
    summary:
      'Administração focada em disponibilidade operacional, controle de acesso de visitantes e prestadores, governança corporativa e otimização de utilidades.',
    idealFor: 'Torres corporativas, centros empresariais e edifícios mistos',
    challengesSolved: [
      'Gestão estratégica de consumo elétrico, climatização central e contratos de facilities',
      'Previsibilidade orçamentária com relatórios gerenciais voltados a proprietários e locatários',
      'Controle ágil de credenciamento, normas técnicas e conformidade de segurança',
    ],
    recommendedModules: [
      'Auditoria contínua de contratos e facilities',
      'Monitoramento de utilidades e demanda contratada',
      'Portal do condômino corporativo e emissão automatizada',
      'SLA rigoroso de manutenção predial',
    ],
    typicalSavingsRange: '13% a 19%',
    defaultUnits: 120,
    defaultMonthlyBudget: 145000,
    defaultDelinquency: 5,
    efficiencyMultiplier: 1.12,
  },
  {
    id: 'incorporadora',
    title: 'Incorporadoras',
    subtitle: 'Valorização e suporte na gestão.',
    summary:
      'Parceria desde o pré-lançamento até a implantação condominial, estruturando previsões orçamentárias realistas, convenção, primeira assembleia e operação impecável na entrega das chaves.',
    idealFor: 'Lançamentos residenciais, comerciais e multiuso em fase de implantação',
    challengesSolved: [
      'Elaboração precisa de previsão orçamentária pré-entrega com taxa condominial competitiva',
      'Planejamento de implantação, compra de enxoval, homologação de fornecedores e treinamento inicial',
      'Transição assistida da construtora para o condomínio preservando garantias e reputação da marca',
    ],
    recommendedModules: [
      'Estudo orçamentário de viabilidade condominial',
      'Gestão completa de Assembleia de Instalação (AGI)',
      'Implantação digital desde o primeiro dia de operação',
      'Manual digital de manutenção e controle de garantias',
    ],
    typicalSavingsRange: '12% a 18%',
    defaultUnits: 160,
    defaultMonthlyBudget: 110000,
    defaultDelinquency: 4,
    efficiencyMultiplier: 1.08,
  },
  {
    id: 'grande-porte',
    title: 'Condomínios de grande porte',
    subtitle: 'Gestão especializada para grandes demandas.',
    summary:
      'Estrutura dedicada para condomínios-clube, complexos multi-torres e loteamentos fechados com alto volume de contratos, colaboradores próprios ou terceirizados e demandas simultâneas.',
    idealFor: 'Condomínios-clube e complexos acima de 200 unidades',
    challengesSolved: [
      'Governança sobre dezenas de contratos simultâneos com auditoria de compras em escala',
      'Gestão de grandes equipes operacionais, escalas e controles de produtividade por setor',
      'Atendimento de alto volume com triagem digital, SLAs transparentes e BI para o conselho',
    ],
    recommendedModules: [
      'Central de compras e renegociação em escala',
      'BI financeiro e operacional por centro de custo',
      'Gestão integrada de equipes e terceiros',
      'Atendimento estruturado com protocolo digital',
    ],
    typicalSavingsRange: '14% a 21%',
    defaultUnits: 320,
    defaultMonthlyBudget: 260000,
    defaultDelinquency: 9,
    efficiencyMultiplier: 1.18,
  },
];

export const INNOVATION_COMPARISON = [
  {
    dimension: 'Prestação de contas',
    traditional: 'Pastas físicas mensais entregues com atraso e difícil conferência de notas.',
    prime: 'Pasta digital em tempo real com comprovantes anexados, filtros por categoria e conciliação bancária automatizada.',
  },
  {
    dimension: 'Manutenção predial',
    traditional: 'Atuação reativa apenas quando equipamentos quebram, gerando custos emergenciais.',
    prime: 'Plano preventivo digital com alertas de laudos, vistorias registradas e redução de paradas críticas.',
  },
  {
    dimension: 'Contratos e compras',
    traditional: 'Renovações automáticas sem revisão de mercado ou comparativos claros.',
    prime: 'Auditoria contínua de fornecedores, mapas comparativos digitais e negociação orientada por dados.',
  },
  {
    dimension: 'Comunicação e atendimento',
    traditional: 'Mensagens dispersas em grupos informais, telefone congestionado e falta de protocolo.',
    prime: 'Aplicativo dedicado com solicitações protocoladas, comunicados segmentados e histórico transparente.',
  },
  {
    dimension: 'Apoio ao síndico e conselho',
    traditional: 'Planilhas estáticas que dificultam enxergar tendências de gasto e inadimplência.',
    prime: 'Relatórios gerenciais interativos com indicadores claros para decisões rápidas e seguras.',
  },
];
