export const OPTIONS = [
    'a',
    'b',
    'c',
    'd',
    'e',
]

export const TEST_CONTENT = [
    {
        question: 'O que você prefere estudar?',
        alternatives: [
            'Língua Portuguesa ou Filosofia',
            'Matemática, Física ou Química',
            'Educação Física',
            'Artes',
            'Biologia'
        ],
    },
    {
        question: 'Você considera mais fácil aprender:',
        alternatives: [
            'Através da leitura de livros, pesquisas e entrevistas',
            'Através da análise de dados e gráficos',
            'Através da prática',
            'Através de figuras',
            'Através da conversa e da troca de experiências'
        ]
    },
    {
        question: 'Quando realiza trabalho em grupo, você:',
        alternatives: [
            'Se coloca à disposição para fazer a apresentação do trabalho',
            'Fica insatisfeito, pois prefere trabalhar sozinho',
            'Faz questão que todos colaborem e se empenhem ao máximo',
            'Capricha nas ilustrações e na formatação do trabalho',
            'Faz a sua parte e se coloca à disposição para ajudar os demais'
        ]
    },
    {
        question: 'No grupo de amigos você é aquele que:',
        alternatives: [
            'Sempre indica livros, filmes e séries',
            'Dá dicas sobre tecnologia ou realiza consertos em aparelhos eletrônicos',
            'Convida para praticar esportes, dançar, cozinhar, etc.',
            'Sempre insiste para que te acompanhem no cinema ou no museu',
            'Convida para festas e faz questão que estejam sempre reunidos'
        ]
    },
    {
        question: 'Qual dessas opções mais tem a ver com o seu passatempo favorito?',
        alternatives: [
            'Livros e músicas',
            'Jogos online e de tabuleiro',
            'Esportes radicais e dança',
            'Fotografia e pintura',
            'Aprender um novo idioma'
        ]
    },
    {
        question: 'As pessoas que você admira são reconhecidas por:',
        alternatives: [
            'Serem grandes intelectuais',
            'Serem importantes inventores ou cientistas',
            'Terem um talento ou habilidade incomum',
            'Serem extremamente criativas',
            'Prestarem dedicação total ao próximo'
        ]
    },
    {
        question: 'Qual dessas tarefas você se julga capaz de realizar?',
        alternatives: [
            'Escrever um livro com mais de 50 páginas',
            'Resolver uma fórmula matemática muito difícil',
            'Preparar uma festa pra alguém muito importante',
            'Criar um conteúdo em vídeo para ser exibido em rede nacional',
            'Ajudar um desconhecido a solucionar um problema pessoal'
        ]
    },
    {
        question: 'Escolha um tipo de trabalho voluntário:',
        alternatives: [
            'Ajudar na reintegração de refugiados',
            'Participar de ações de desenvolvimento sustentável',
            'Ensinar atividades variadas para crianças e jovens',
            'Promover oficinas de arte em bairros afastados do centro da cidade',
            'Participar de ações de cuidado e proteção à pessoas ou animais'
        ]
    },
    {
        question: 'Para você, a carreira deve:',
        alternatives: [
            'Proporcionar a satisfação pessoal',
            'Possibilitar um bom salário',
            'Ser uma oportunidade para monetizar habilidades',
            'Permitir liberdade para criar e se expressar',
            'Trazer o prestígio da sociedade'
        ]
    },
    {
        question: 'Qual dessas opções mais se aproxima do seu objetivo profissional?',
        alternatives: [
            'Ser uma referência na minha área de trabalho',
            'Ser reconhecido como precursor em algo relacionado à minha profissão',
            'Ser um profissional requisitado e mundialmente conhecido',
            'Ser admirado pela excelência e ganhar prêmios',
            'Meu objetivo é auxiliar pessoas a alcançarem seus próprios objetivos'
        ]
    },
    {
        question: 'O que você considera essencial para atingir o sucesso profissional?',
        alternatives: [
            'Dedicação',
            'Planejamento',
            'Persistência',
            'Inovação',
            'Experiência'
        ]
    },
    {
        question: 'Para solucionar um problema, você:',
        alternatives: [
            'É perspicaz',
            'É estrategista',
            'É impulsivo',
            'É intuitivo',
            'É prudente'
        ]
    },
    {
        question: 'Você se considera uma pessoa…',
        alternatives: [
            'Detalhista',
            'Analítica',
            'Ativa',
            'Criativa',
            'Observadora'
        ]
    },
    {
        question: 'O que você considera inaceitável no dia a dia?',
        alternatives: [
            'Excesso de regras',
            'Imprecisão',
            'Ausência de metas',
            'Rotina',
            'Passar muito tempo sozinho'
        ]
    },
]

export const RESULT_CONTENT = {
    a: {
        name: 'O COMUNICATIVO',
        description: 'Tem facilidade com a comunicação oral e escrita. A afinidade com a leitura faz de você uma pessoa investigativa, que valoriza o conhecimento teórico e o compartilhamento de ideias.',
        phrase: 'As grandes conquistas da humanidade foram obtidas conversando, e as grandes falhas pela falta de diálogo.',
        author: 'Stephen Hawking',
        courses: [
            { name: 'Biblioteconomia', imageName: 'biblioteconomia', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-biblioteconomia.png' },
            { name: 'Filosofia', imageName: 'filosofia', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-filosofia.png' },
            { name: 'Ciências Sociais', imageName: 'cienciasSociais', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-ciencias-sociais.png' },
            { name: 'História', imageName: 'historia', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-historia.png' },
            { name: 'Geografia', imageName: 'geografia', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-geografia.png' },
            { name: 'Letras', imageName: 'letras', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-letras.png' },
            { name: 'Jornalismo', imageName: 'jornalismo', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-jornalismo.png' },
            { name: 'Pedagogia', imageName: 'pedagogia', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-pedagogia.png' },
            { name: 'Relações Públicas', imageName: 'relacoesPublicas', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-relacoes-publicas.png' },
            { name: 'Rádio, Tv e Internet', imageName: 'radioTvInternet', imgPath: 'Comunicativo/Desktop-resultado-comunicativo-radio-tv-internet.png' },
        ]
    },
    b: {
        name: 'O RACIONAL',
        description: 'Tem bom raciocínio lógico e boa percepção de causa e efeito. Diante de situações atípicas, tende a agir de maneira analítica e estratégica. Você preza pela precisão, característica essencial para desempenhar atividades que exigem a entrega de resultados pontuais.',
        phrase: 'Quem não sabe o que busca, não identifica o que acha.',
        author: 'Immanuel Kant',
        courses: [
            { name: 'Administração', imageName: 'administracao', imgPath: 'Racional/Desktop-resultado-racional-administracao.png' },
            { name: 'Análise de Sistemas', imageName: 'analiseDeSistemas', imgPath: 'Racional/Desktop-resultado-racional-analise-de-sistemas.png' },
            { name: 'Astronomia', imageName: 'astronomia', imgPath: 'Racional/Desktop-resultado-racional-astronomia.png' },
            { name: 'Biomedicina', imageName: 'biomedicina', imgPath: 'Racional/Desktop-resultado-racional-biomedicina.png' },
            { name: 'Ciência da Computação', imageName: 'cienciaDaComputacao', imgPath: 'Racional/Desktop-resultado-racional-ciencia-da-computacao.png' },
            { name: 'Ciências Atuariais', imageName: 'cienciasAtuariais', imgPath: 'Racional/Desktop-resultado-racional-ciencias-atuariais.png' },
            { name: 'Contabilidade', imageName: 'contabilidade', imgPath: 'Racional/Desktop-resultado-racional-contabilidade.png' },
            { name: 'Economia', imageName: 'economia', imgPath: 'Racional/Desktop-resultado-racional-economia.png' },
            { name: 'Estatística', imageName: 'estatistica', imgPath: 'Racional/Desktop-resultado-racional-estatistica.png' },
            { name: 'Engenharia Civil', imageName: 'engenhariaCivil', imgPath: 'Racional/Desktop-resultado-racional-engenharia-civil.png' },
            { name: 'Engenharia de Produção', imageName: 'engenhariaDeProducao', imgPath: 'Racional/Desktop-resultado-racional-engenharia-de-producao.png' },
            // { name: 'Engenharia Química', imgPath: '' },
            { name: 'Engenharia de Software', imageName: 'engenhariaDeSoftware', imgPath: 'Racional/Desktop-resultado-racional-engenharia-de-software.png' },
            { name: 'Marketing', imageName: 'marketing', imgPath: 'Racional/Desktop-resultado-racional-marketing.png' },
            { name: 'Matemática Industrial', imageName: 'matematicaIndustrial', imgPath: 'Racional/Desktop-resultado-racional-matematica-industrial.png' },
        ],
    },
    c: {
        name: 'O PRÁTICO',
        description: 'É ágil na maneira de pensar e agir. Desenvolve habilidades manuais ou corporais com facilidade, já que tende a aprender muito mais através da experiência física e da ação do que por meio da teoria.',
        phrase: 'Nossa maior fraqueza está em desistir. O caminho mais certo de vencer é tentar mais uma vez.',
        author: 'Thomas Edison',
        courses: [
            { name: 'Artes Cênicas', imageName: 'artesCenicas', imgPath: 'Pratico/Desktop-resultado-pratico-artes-cenicas.png' },
            { name: 'Agronomia', imageName: 'agronomia', imgPath: 'Pratico/Desktop-resultado-pratico-agronomia.png' },
            { name: 'Dança', imageName: 'danca', imgPath: 'Pratico/Desktop-resultado-pratico-danca.png' },
            { name: 'Educação Física', imageName: 'educacaoFisica', imgPath: 'Pratico/Desktop-resultado-pratico-educacao-fisica.png' },
            { name: 'Estética', imageName: 'estetica', imgPath: 'Pratico/Desktop-resultado-pratico-estetica.png' },
            { name: 'Gastronomia', imageName: 'gastronomia', imgPath: 'Pratico/Desktop-resultado-pratico-gastronomia.png' },
            { name: 'Piloto de Avião', imageName: 'pilotoDeAviao', imgPath: 'Pratico/Desktop-resultado-pratico-piloto-de-aviao.png' },
            { name: 'Piloto de Drones', imageName: 'pilotoDeDrones', imgPath: 'Pratico/Desktop-resultado-pratico-piloto-de-de-drones.png' },
            { name: 'Zootecnia', imageName: 'zootecnia', imgPath: 'Pratico/Desktop-resultado-pratico-zootecnia.png' },
        ],
    },
    d: {
        name: 'O CRIATIVO',
        description: 'É observador e aprecia tudo o que é inovador. Consegue expressar muito bem as próprias emoções e não tem dificuldade para colocar ideias em prática. Tem facilidade para criar e projetar.',
        phrase: 'Todo o nosso conhecimento tem sua origem em nossas percepções',
        author: 'Leonardo da Vinci',
        courses: [
            { name: 'Arquitetura e Urbanismo', imageName: 'arquitetura', imgPath: 'Criativo/Desktop-resultado-criativo-arquitetura.png' },
            { name: 'Artes Visuais', imageName: 'artesVisuais', imgPath: 'Criativo/Desktop-resultado-criativo-artes-visuais.png' },
            { name: 'Cinema', imageName: 'cinema', imgPath: 'Criativo/Desktop-resultado-criativo-cinema.png' },
            { name: 'Desenho Industrial', imageName: 'desenhoIndustrial', imgPath: 'Criativo/Desktop-resultado-criativo-desenho-industrial.png' },
            { name: 'Design de Games', imageName: 'designDeGames', imgPath: 'Criativo/Desktop-resultado-criativo-design-de-games.png' },
            { name: 'Design Gráfico', imageName: 'designGrafico', imgPath: 'Criativo/Desktop-resultado-criativo-design-grafico.png' },
            { name: 'Moda', imageName: 'moda', imgPath: 'Criativo/Desktop-resultado-criativo-moda.png' },
            { name: 'Multimídia', imageName: 'multimidia', imgPath: 'Criativo/Desktop-resultado-criativo-multimidia.png' },
            // { name: 'Museologia', imgPath: '' },
            { name: 'Artes Plásticas', imageName: 'artesPlasticas', imgPath: 'Criativo/Desktop-resultado-criativo-artes-plasticas.png' },
        ],
    },
    e: {
        name: 'O SOCIÁVEL',
        description: 'Compreende a importância das relações humanas e aprecia o trabalho em equipe. Empático, consegue interpretar as necessidade dos outros com facilidade. Tem um interesse natural por áreas que exigem habilidade em lidar com pessoas.',
        phrase: 'Cada pessoa deve trabalhar pelo seu aperfeiçoamento e, ao mesmo tempo, participar da responsabilidade coletiva por toda a humanidade.',
        author: 'Marie Curie',
        courses: [
            { name: 'Direito', imageName: 'direito', imgPath: 'Sociavel/Desktop-resultado-sociavel-direito.png' },
            { name: 'Publicidade e Propaganda', imageName: 'publicidade', imgPath: 'Sociavel/Desktop-resultado-sociavel-publicidade.png' },
            { name: 'Recursos Humanos', imageName: 'recursosHumanos', imgPath: 'Sociavel/Desktop-resultado-sociavel-recursos-humanos.png' },
            { name: 'Relações Internacionais', imageName: 'relacoesInternacionais', imgPath: 'Sociavel/Desktop-resultado-sociavel-relacoes-internacionais.png' },
            { name: 'Psicologia', imageName: 'psicologia', imgPath: 'Sociavel/Desktop-resultado-sociavel-psicologia.png' },
            { name: 'Medicina', imageName: 'medicina', imgPath: 'Sociavel/Desktop-resultado-sociavel-medicina.png' },
            { name: 'Enfermagem', imageName: 'enfermagem', imgPath: 'Sociavel/Desktop-resultado-sociavel-enfermagem.png' },
            { name: 'Fonoaudiologia', imageName: 'fonoaudiologia', imgPath: 'Sociavel/Desktop-resultado-sociavel-fonoaudiologia.png' },
            { name: 'Odontologia', imageName: 'odontologia', imgPath: 'Sociavel/Desktop-resultado-sociavel-odontologia.png' },
            { name: 'Terapia Ocupacional', imageName: 'terapiaOcupacional', imgPath: 'Sociavel/Desktop-resultado-sociavel-terapia-ocupacional.png' },
        ],
    },
}