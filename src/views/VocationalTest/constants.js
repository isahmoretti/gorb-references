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
            'Biblioteconomia',
            'Filosofia',
            'Ciências Sociais',
            'História',
            'Geografia',
            'Letras',
            'Jornalismo',
            'Relações Públicas',
            'Rádio, Tv e Internet',
        ]
    },
    b: {
        name: 'O RACIONAL',
        description: 'Tem bom raciocínio lógico e boa percepção de causa e efeito. Diante de situações atípicas, tende a agir de maneira analítica e estratégica. Você preza pela precisão, característica essencial para desempenhar atividades que exigem a entrega de resultados pontuais.',
        phrase: 'Quem não sabe o que busca, não identifica o que acha.',
        author: 'Immanuel Kant',
        courses: [
            'Administração',
            'Análise de Sistemas',
            'Astronomia',
            'Biomedicina',
            'Ciência da Computação',
            'Ciências Atuariais',
            'Contabilidade',
            'Economia',
            'Estatística',
            'Engenharia Civil',
            'Engenharia de Produção',
            'Engenharia Química',
            'Engenharia de Software',
            'Marketing',
            'Matemática Industrial',
        ],
    },
    c: {
        name: 'O PRÁTICO',
        description: 'É ágil na maneira de pensar e agir. Desenvolve habilidades manuais ou corporais com facilidade, já que tende a aprender muito mais através da experiência física e da ação do que por meio da teoria.',
        phrase: 'Nossa maior fraqueza está em desistir. O caminho mais certo de vencer é tentar mais uma vez.',
        author: 'Thomas Edison',
        courses: [
            'Artes Cênicas',
            'Agronomia',
            'Dança',
            'Educação Física',
            'Estética',
            'Gastronomia',
            'Piloto de Avião',
            'Piloto de Drones',
            'Zootecnia',
        ],
    },
    d: {
        name: 'O CRIATIVO',
        description: 'É observador e aprecia tudo o que é inovador. Consegue expressar muito bem as próprias emoções e não tem dificuldade para colocar ideias em prática. Tem facilidade para criar e projetar.',
        phrase: 'Todo o nosso conhecimento tem sua origem em nossas percepções',
        author: 'Leonardo da Vinci',
        courses: [
            'Arquitetura e Urbanismo',
            'Artes Visuais',
            'Cinema',
            'Desenho Industrial',
            'Design de Games',
            'Design Gráfico',
            'Moda',
            'Multimídia',
            'Museologia',
            'Artes Plásticas',
        ],
    },
    e: {
        name: 'O SOCIÁVEL',
        description: 'Compreende a importância das relações humanas e aprecia o trabalho em equipe. Empático, consegue interpretar as necessidade dos outros com facilidade. Tem um interesse natural por áreas que exigem habilidade em lidar com pessoas.',
        phrase: 'Cada pessoa deve trabalhar pelo seu aperfeiçoamento e, ao mesmo tempo, participar da responsabilidade coletiva por toda a humanidade.',
        author: 'Marie Curie',
        courses: [
            'Direito',
            'Publicidade e Propaganda',
            'Recursos Humanos',
            'Relações Internacionais',
            'Psicologia',
            'Medicina',
            'Enfermagem',
            'Fonoaudiologia',
            'Odontologia',
            'Terapia Ocupacional',
        ],
    },
}