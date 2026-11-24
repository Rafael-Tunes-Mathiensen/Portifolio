// Conteúdo editorial do portfólio. Datas completas usam AAAA-MM-DD.
const account = 'Rafael-Tunes-Mathiensen';
const github = 'https://github.com/' + account;
export const profile = {
  name: 'Rafael Tunes Mathiensen',
  role: 'Estudante de Análise e Desenvolvimento de Sistemas na Fatec',
  tagline: 'Primeiro, entendo o problema. Depois, escrevo o código.',
  specialties: ['Desenvolvimento de sistemas', 'Modelagem de dados', 'Python e Django'],
  whatsappMessage: 'Olá, Rafael! Vi seu portfólio e gostaria de conversar sobre uma oportunidade.',
  email: 'rafaelmathiensen@gmail.com',
  emailInstitutional: 'rafael.mathiensen@aluno.cps.sp.gov.br',
  whatsapp: '5519996447308',
  github,
  linkedin: 'https://www.linkedin.com/in/rafael-tunes-mathiensen/',
  instagram: 'https://www.instagram.com/rafa.tunes/',
  socialActions: [
    { key: 'whatsapp', name: 'WhatsApp', action: 'Iniciar conversa', icon: 'assets/redes/whatsapp.svg' },
    { key: 'linkedin', name: 'LinkedIn', action: 'Ver perfil profissional', icon: 'assets/redes/linkedin.svg' },
    { key: 'github', name: 'GitHub', action: 'Explorar repositórios', icon: 'assets/tecnologias/github.svg' },
    { key: 'instagram', name: 'Instagram', action: 'Abrir perfil', icon: 'assets/redes/instagram.svg' },
  ],
  photo: 'assets/fotos/rafael.webp',
  bio: 'Gosto de entender o problema antes de programar. Quando estudo uma tecnologia, testo soluções diferentes, anoto o que aprendi e comparo minhas escolhas com as de quem estuda comigo.',
  objective:
    'Procuro uma vaga de estágio ou de jovem aprendiz em desenvolvimento de sistemas. Quero aplicar o que estudo na Fatec e aprender com uma equipe.',
  school: 'Fatec',
  degree: 'Análise e Desenvolvimento de Sistemas',
  schoolDescription:
    'Graduação tecnológica na rede pública de ensino superior de São Paulo, com formação técnica e prática.',
  semester: '', // TODO: confirmar semestre atual.
};

export const skills = {
  declared: [
    'Java',
    'C++',
    'Delphi',
    'Python',
    'HTML5',
    'MySQL',
    'Modelagem de dados',
    'Administração de bancos de dados',
    'GitHub',
    'Photoshop',
  ],
  applied: ['Django', 'PostgreSQL', 'Bootstrap', 'Sass', 'JavaScript', 'Django Channels', 'Redis'],
  // As chaves correspondem aos nomes acima. Itens sem marca própria aparecem como texto.
  logos: {
    Java: 'java', 'C++': 'cplusplus', Delphi: 'delphi', Python: 'python',
    HTML5: 'html5', MySQL: 'mysql', GitHub: 'github', Photoshop: 'photoshop',
    Django: 'django', PostgreSQL: 'postgresql', Bootstrap: 'bootstrap',
    Sass: 'sass', JavaScript: 'javascript', Redis: 'redis',
  },
  // TODO: acrescentar níveis de proficiência quando Rafael os informar.
};

export const tcc = {
  name: 'BidXchange',
  subtitle: 'Plataforma de Leilão Reverso para Instituições de Ensino',
  pitch: 'Leilão reverso para escolas',
  live: 'https://bidxchange.vercel.app/',
  preview: {
    logo: 'assets/bidxchange/marca.webp',
    desktop: 'assets/bidxchange/desktop.webp',
    mobile: 'assets/bidxchange/mobile.webp',
    desktopAlt: 'Página inicial do BidXchange no desktop, com a apresentação da plataforma de cotações.',
    mobileAlt: 'A mesma página do BidXchange na tela de um celular.',
  },
  overview: 'A escola publica o que precisa comprar. Os fornecedores enviam propostas e a equipe compara preços, prazos e condições antes de negociar.',
  summary:
    'Compras que passam por e-mails, ligações e planilhas dificultam comparar ofertas. No BidXchange, a instituição reúne preço, prazo e condições em um só lugar, registra a escolha da equipe e conversa com o fornecedor selecionado.',
  authors: 'Rafael Tunes Mathiensen e Matheus Henrique Vitalino',
  architecture:
    'O Django entrega as páginas no servidor. O app accounts cuida do cadastro e da autenticação. O app bidxchange concentra cotações, propostas, conversas, notificações e auditoria.',
  release: '2.0.0',
  status: 'Oficial',
  license: 'MIT',
  history: 'As versões 1.x preservam o histórico de desenvolvimento.',
  featureCount: null, // TODO: confirmar a contagem de funcionalidades antes de publicar um total.
  // TODO: descrever as contribuições individuais depois de confirmadas pelos autores.
  code: github + '/BidXchange',
  docs: github + '/BidXchange-Documentacao',
  steps: [
    ['Publicar', 'A instituição publica uma cotação com suas necessidades e condições.'],
    ['Propor', 'Fornecedores consultam a oportunidade e enviam ou atualizam suas propostas.'],
    [
      'Comparar',
      'A equipe compara preço, prazo e condições. Uma votação interna pode apoiar a decisão.',
    ],
    ['Negociar', 'A instituição seleciona a proposta e continua a negociação em um chat privado.'],
  ],
  flow: {
    label: 'Demonstração do fluxo',
    scenes: ['Publicação da cotação', 'Envio de propostas', 'Comparação das ofertas', 'Negociação em chat privado'],
    illustration: {
      quote: 'Cotação', proposal: 'Proposta', price: 'Preço', term: 'Prazo', terms: 'Condições',
      vote: 'Votação opcional', chat: 'Chat privado',
    },
  },
  audiences: {
    Instituições: [
      'Gestão de cotações, equipe e permissões',
      'Comparação e seleção de propostas',
      'Fornecedores favoritos, votações internas e avaliações',
    ],
    Fornecedores: [
      'Consulta de oportunidades abertas',
      'Envio e atualização de propostas',
      'Acompanhamento de negociações e resultados',
    ],
    Compartilhado: [
      'Cadastro e autenticação por e-mail',
      'Notificações, histórico e auditoria',
      'Chat privado após a seleção da proposta',
      'Relatórios internos para contas autorizadas',
    ],
  },
  roleHeadlines: {
    Instituições: 'Qual oferta atende à nossa cotação?',
    Fornecedores: 'Em quais cotações posso participar?',
    Compartilhado: 'Onde ficou registrada a negociação?',
  },
  tech: [
    'Python 3.12–3.14',
    'Django 6.1.1',
    'PostgreSQL 18 (local e CI)',
    'HTML',
    'Sass',
    'Bootstrap 5.3.8',
    'JavaScript',
    'Django Channels',
    'Redis (produção)',
    'Vercel',
  ],
  folders: [
    ['Análise', 'Analise'],
    ['Banco', 'Banco'],
    ['Casos de Teste', 'CasosDeTeste'],
    ['Casos de Uso', 'CasosDeUso'],
    ['Monografia', 'Monografia'],
    ['Planejamento', 'Planejamento'],
    ['Requisitos', 'Requisitos'],
    ['Viabilidades', 'Viabilidades'],
  ],
  technical: [
    ['Produto', 'PRODUCT.md'],
    ['Design', 'DESIGN.md'],
    ['Arquitetura', 'docs/ARCHITECTURE.md'],
    ['Banco de dados', 'docs/DATABASE.md'],
    ['Desenvolvimento', 'docs/DEVELOPMENT.md'],
    ['Assistente de cotações (Quote Wizard)', 'docs/QUOTE_WIZARD.md'],
    ['Implantação na Vercel', 'docs/VERCEL_DEPLOY.md'],
    ['Histórico de versões', 'CHANGELOG.md'],
  ],
};

export const projects = [
  {
    name: 'TrackBox',
    repo: 'TrackBox',
    url: github + '/TrackBox',
    language: 'PHP',
    subject: 'Coleção musical',
    art: 'vinyl',
    description:
      'Catálogo de CDs, LPs e box sets. Cada disco tem espaço para registrar a gravadora, o ano, os extras e o estado de conservação.',
  },
  {
    name: 'Warden’s Call',
    repo: 'Wardens-Call',
    url: github + '/Wardens-Call',
    language: 'Python',
    subject: 'RPG tático',
    art: 'sword',
    description:
      'RPG por turnos em Python e Rich. Até três pessoas jogam no mesmo terminal, escolhem classes, enfrentam monstros e criam equipamentos.',
  },
];
export const githubAccount = account;

// A participação pessoal em cada encontro da programação ainda precisa ser confirmada.
// count indica se o registro pode entrar nos indicadores, evitando dupla contagem.
export const events = [
  {
    category: 'Mentoria',
    org: 'Dev&Co',
    title: 'Da software house ao primeiro layout',
    date: 'Ciclo de 10 encontros',
    count: true,
    body: 'Alunos de DS e Administração simularam empresas, dividiram funções e prepararam entrevistas, requisitos e relatórios. O ciclo incluiu Git Flow (20/05/2025), uma dinâmica ágil e um desafio no Figma.',
  },
  {
    category: 'Mentoria',
    org: 'TEBE',
    title: 'Sensores, dados e manutenção preditiva',
    date: 'Ciclo de 3 encontros',
    count: true,
    body: 'Um sensor no ar-condicionado mostrou como os dados chegam à plataforma da TEBE. A empresa apresentou suas APIs e propôs um projeto em dupla com Node.js.',
  },
  {
    category: 'Palestra',
    org: '',
    title: 'O mercado para quem está começando',
    date: '21/05',
    count: true,
    body: 'A palestra discutiu como as mudanças no mercado afetam quem procura o primeiro emprego e por que saber se comunicar, colaborar e se adaptar faz diferença.',
  },
  {
    category: 'Monitoria',
    org: '',
    title: 'Metodologias ágeis na prática',
    date: '28/05',
    count: false,
    body: 'O grupo praticou como explicar requisitos e dividir tarefas dentro do tempo disponível.',
  },
  {
    category: 'Visita',
    org: 'IBM · Fundação Iochpe',
    title: 'Por dentro das profissões de tecnologia',
    date: '',
    count: true,
    body: 'Com o apoio da Fundação Iochpe, a turma visitou a IBM para conhecer o espaço, as operações e quem trabalha lá.',
  },
  {
    category: 'Mentoria',
    org: 'Fundação Iochpe · Formare',
    title: 'Habilidades emocionais',
    date: '04/09',
    count: false,
    body: 'A atividade em trio propunha mediar conflitos e retomar a conversa depois de uma interrupção.',
  },
];
// TODO: confirmar ano/local/palestrante da palestra; datas de TEBE (04/09 e 18/09).
// TODO: confirmar participação no Formare e nos encontros da Dev&Co; conferir duplicidade da dinâmica de 28/05.
// TODO: visita à IBM — fonte registra 22/09/2024 no cabeçalho e 22 de novembro no relato.
export const gallery = [
  ['palco', 'Auditório com três convidados no palco e um slide sobre o início da carreira.'],
  ['visita', 'Turma reunida para uma foto de grupo diante de um letreiro da IBM.'],
  ['laboratorio', 'Estudantes acompanham uma apresentação no laboratório de informática.'],
  ['encontro', 'Grupo de estudantes reunido em uma sala com uma apresentação projetada.'],
  ['plateia', 'Estudantes sentados lado a lado na plateia de um auditório.'],
  ['slide', 'Apresentação no palco com uma projeção histórica ao fundo.'],
].map(([file, alt]) => ({ src: 'assets/fotos/' + file + '.webp', alt }));

export const certificates = [
  {
    id: 'cisco',
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    category: 'Redes',
    date: '2026-11-17',
    hours: null,
    pdf: true,
    verify: 'https://www.credly.com/badges/231c2a27-c868-46d8-8501-9db7e41e702b',
  },
  {
    id: 'python',
    title: 'Jornada Python',
    issuer: 'Hashtag Treinamentos',
    category: 'Python',
    date: '2026-03-05',
    hours: 8,
  },
  {
    id: 'poo',
    title: 'Fundamentos de Orientação a Objetos',
    issuer: 'PUCRS · TIC em Trilhas',
    category: 'Programação/POO',
    date: '2025-11-23',
    hours: 24,
    city: 'Porto Alegre',
  },
  {
    id: 'react',
    title: 'Introdução a React.js',
    issuer: 'Venturus · TIC em Trilhas',
    category: 'Frontend',
    date: '2025-04-09',
    hours: 30,
    city: 'Campinas',
    pdf: true,
    verify:
      'https://ticemtrilhas.org.br/certificate-validation?code=93aa0e56-6c3c-4df8-a82e-c479a29620b6',
  },
].map((cert) => ({
  ...cert,
  preview: 'assets/certificados/' + cert.id + '-mini.webp',
  image: 'assets/certificados/' + cert.id + '.webp',
  original: cert.pdf ? 'assets/certificados/' + cert.id + '.pdf' : '',
}));
// TODO: URLs de validação de POO e Python, se disponíveis. O original da Cisco preserva o QR.
export const hobbies = [
  ['Jogos', 'game'],
  ['Animes', 'anime'],
  ['Desenhar', 'pen'],
  ['Desenvolvimento de jogos', 'code'],
  ['Academia', 'weight'],
  ['Leitura', 'book'],
  ['Esportes', 'ball'],
  ['Séries e filmes', 'film'],
];

const contactLines = [
  [profile.email, 'mailto:' + profile.email],
  [profile.emailInstitutional, 'mailto:' + profile.emailInstitutional],
  ...profile.socialActions.map(({ key, name }) => [
    name,
    key === 'whatsapp'
      ? 'https://wa.me/' + profile.whatsapp + '?text=' + encodeURIComponent(profile.whatsappMessage)
      : profile[key],
  ]),
];

export const comandos = {
  help: { description: 'Lista os comandos disponíveis.' },
  sobre: {
    description: 'Quem sou e de onde venho.',
    lines: [
      profile.name + ' · Araras',
      'Nasci em Araras, porém vivi até os 8 anos na chácara da minha família, em Cascalho.',
      'Tenho uma irmã quatro anos mais velha e dois cachorros, Cacau e Tigrão.',
      'Sou curioso e gosto de aprender coisas novas.',
      profile.bio,
    ],
  },
  objetivo: { description: 'Que oportunidade estou buscando.', lines: [profile.objective] },
  formacao: {
    description: 'Minha trajetória nos estudos.',
    lines: [
      'Estudei no INSA até o 5º ano e no Anglo até o 9º ano.',
      // TODO: preencher a etapa de ingresso mencionada como "no primeiro".
      profile.degree + ' na ' + profile.school + '.',
      profile.schoolDescription,
      'Semestre atual a confirmar.', // TODO: preencher quando confirmado.
    ],
  },
  experiencias: {
    description: 'Trabalhos, projetos e vivências.',
    lines: [
      '• Recreador de festas freelancer por um ano.',
      '• Estágio de um ano na Soma Soluções, com desenvolvimento em Delphi.',
      ['• TCC BidXchange', '#bidxchange'],
      ['• Mentorias, palestras e visitas técnicas', '#mentorias'],
    ],
  },
  skills: {
    description: 'Tecnologias e ferramentas que uso.',
    lines: [
      'Back-end · Python, Django.',
      'Frontend · HTML5, JavaScript, Bootstrap.',
      'Dados · MySQL, PostgreSQL, modelagem e administração de bancos',
      'Também uso · Delphi, Java, C++, Git/GitHub e Photoshop',
    ],
  },
  hobbies: { description: 'O que faço fora do código.', lines: [hobbies.map(([name]) => name).join(', ') + '.'] },
  clear: { description: 'Limpa a tela.' },
  'sudo contratar rafael': {
    hidden: true,
    lines: ['Permissão concedida. A próxima etapa é marcar uma conversa.', ...contactLines],
  },
};
