/* Identidades visuais: seis marcas fictícias, projetos conceituais da dav studio.
   Cada símbolo é desenhado só com formas (sem fonte), numa caixa de 100 × 100.
   Os nomes usam texto SVG com a fonte da própria marca. */

const MARCAS = [
  {
    slug: "vertice", nome: "VÉRTICE", segmento: "Moda urbana / Streetwear", ano: "2026",
    curto: "Streetwear de atitude: um V vazado como estêncil de spray, preto, branco e concreto.",
    conceito: "Vértice é o ponto onde duas linhas se encontram e mudam de direção. A marca nasce na rua e veste quem não segue tendência: cria a própria. A identidade é crua como um muro pintado à noite, com tipografia larga, cortes secos e nenhum enfeite.",
    personalidade: ["Atitude", "Autenticidade", "Coletivo", "Sem filtro"],
    tagline: "Do asfalto pra cima.",
    simboloTexto: "Um V em estêncil: dois traços que se encontram sem se tocar. A fresta no vértice é o espaço de cada um dentro do coletivo, e o corte lembra o molde vazado usado no grafite.",
    cores: [
      { nome: "Preto Asfalto", hex: "#0E0E0D", uso: "Fundo e tipografia" },
      { nome: "Branco Cru", hex: "#F1EFEA", uso: "Contraste e tecido" },
      { nome: "Concreto", hex: "#8A8780", uso: "Apoio e textos" },
      { nome: "Areia", hex: "#CFC8BA", uso: "Embalagem e etiquetas" },
      { nome: "Grafite", hex: "#2C2C2A", uso: "Superfícies" }
    ],
    fontes: {
      principal: { familia: "Archivo", css: "'Archivo',sans-serif", peso: 900, estica: "125%", nota: "Archivo Expanded Black", uso: "Logotipo, títulos e estampas" },
      secundaria: { familia: "Space Mono", css: "'Space Mono',monospace", peso: 400, nota: "Space Mono Regular e Bold", uso: "Etiquetas, códigos de peça e legendas" }
    },
    tema: { fundo: "#0E0E0D", texto: "#F1EFEA", acento: "#CFC8BA", suave: "#8A8780", papel: "#F1EFEA", tinta: "#0E0E0D", superficie: "#1A1A19", claro: false },
    simbolo: (c) => `<path fill="${c}" d="M5 9h27l17 38v44zM95 9H68L51 47v44z"/>`,
    palavra: { h: 100, linhas: [{ txt: "VÉRTICE", fam: "'Archivo',sans-serif", peso: 900, estica: "125%", fs: 100, base: 92, ls: -1, w: 574 }] },
    horizontal: { altura: .66, vao: 24 }, principal: "horizontal",
    apoio: "fita",
    posts: [
      { tipo: "manchete", titulo: "DO ASFALTO PRA CIMA.", sub: "Drop 01 · disponível sexta" },
      { tipo: "produto", objeto: "camiseta", titulo: "TEE ESTÊNCIL", sub: "100% algodão · 240 g" },
      { tipo: "padrao", titulo: "COLETIVO VÉRTICE", sub: "Cada fresta é uma voz." }
    ],
    story: { titulo: "DROP 01", sub: "Sexta, 19h. Só online.", botao: "Ver o drop" },
    contato: { site: "vertice.wear", social: "@vertice.wear", pessoa: "Rafa Moreira", cargo: "Direção criativa" },
    aplicacoes: [
      { m: "camiseta", legenda: "Camiseta com estampa de peito", tam: "g", o: { cor: "#F1EFEA", estampa: "peito" } },
      { m: "moletom", legenda: "Moletom com capuz, estampa frontal larga", tam: "a", o: { cor: "#0E0E0D", estampa: "frente" } },
      { m: "etiqueta", legenda: "Tag de papel cartão e etiqueta tecida", tam: "m" },
      { m: "caixa", legenda: "Caixa de envio para o e-commerce", tam: "m", o: { cor: "#0E0E0D" } },
      { m: "sacolaPapel", legenda: "Sacola de papel kraft", tam: "m", o: { papel: "#CFC8BA" } },
      { m: "cartoes", legenda: "Cartões de visita", tam: "g" }
    ],
    digital: [{ m: "celularSite", legenda: "Loja mobile" }, { m: "laptopSite", legenda: "Página do drop" }]
  },
  {
    slug: "aurea", nome: "AURÉA", segmento: "Cosméticos e skincare", ano: "2026",
    curto: "Skincare de luz suave: um sol nascendo no horizonte, creme, bege e dourado discreto.",
    conceito: "Aura e áurea: a luz que a pele ganha quando é bem cuidada, e a proporção que guia o que é bonito. Auréa fala baixo, usa poucas palavras e muito espaço. O ritual da manhã virou símbolo, e o dourado aparece só onde a luz bateria.",
    personalidade: ["Cuidado", "Elegância", "Serenidade", "Transparência"],
    tagline: "Cuidado que se vê na luz.",
    simboloTexto: "Um sol que nasce sobre a linha do horizonte, dentro de um halo fino. É o primeiro minuto do dia, quando o ritual de cuidado começa.",
    cores: [
      { nome: "Creme", hex: "#F5EEE4", uso: "Fundo principal" },
      { nome: "Bege", hex: "#E3D3BF", uso: "Embalagens e superfícies" },
      { nome: "Marrom Suave", hex: "#8C6A55", uso: "Textos e frascos" },
      { nome: "Dourado Discreto", hex: "#B99B6B", uso: "Detalhes e hot stamping" },
      { nome: "Cacau", hex: "#3D2E25", uso: "Contraste" }
    ],
    fontes: {
      principal: { familia: "Bodoni Moda", css: "'Bodoni Moda',serif", peso: 500, nota: "Bodoni Moda Medium e Italic", uso: "Logotipo, títulos e nomes de produto" },
      secundaria: { familia: "Jost", css: "'Jost',sans-serif", peso: 400, nota: "Jost Light e Regular", uso: "Textos, ativos e instruções de uso" }
    },
    tema: { fundo: "#F5EEE4", texto: "#3D2E25", acento: "#B99B6B", suave: "#8C6A55", papel: "#F5EEE4", tinta: "#3D2E25", superficie: "#EDE2D3", claro: true },
    simbolo: (c, c2 = c) => `<path fill="none" stroke="${c2}" stroke-width="2.4" d="M8 62a42 42 0 0 1 84 0"/><path fill="${c}" d="M24 62a26 26 0 0 1 52 0z"/><rect fill="${c}" x="4" y="67" width="92" height="3"/><rect fill="${c2}" x="30" y="75" width="40" height="1.6"/>`,
    palavra: { h: 100, linhas: [{ txt: "AURÉA", fam: "'Bodoni Moda',serif", peso: 500, fs: 100, base: 90, ls: 18, w: 432 }] },
    vertical: { largura: 300, vao: 18 }, principal: "vertical",
    apoio: "halo",
    posts: [
      { tipo: "manchete", titulo: "Pele com luz própria.", sub: "Sérum Vitamina C 15%" },
      { tipo: "produto", objeto: "contaGotas", titulo: "Sérum Aurora", sub: "30 ml · uso diário" },
      { tipo: "padrao", titulo: "Seu ritual em 3 passos", sub: "Limpar · tratar · proteger" }
    ],
    story: { titulo: "O ritual da manhã", sub: "Três minutos, todos os dias.", botao: "Conhecer o kit" },
    contato: { site: "aurea.care", social: "@aurea.care", pessoa: "Helena Duarte", cargo: "Atendimento" },
    aplicacoes: [
      { m: "frascos", legenda: "Linha de frascos: sérum, loção e creme", tam: "a" },
      { m: "caixa", legenda: "Cartucho do sérum com hot stamping dourado", tam: "m", o: { cor: "#E3D3BF", tinta: "#8C6A55", dourado: true } },
      { m: "sacolaPapel", legenda: "Sacola com alça de fita", tam: "m", o: { papel: "#F5EEE4", fita: true } },
      { m: "cartoes", legenda: "Cartões de visita em papel algodão", tam: "g" },
      { m: "pote", legenda: "Pote de creme facial", tam: "m" },
      { m: "etiqueta", legenda: "Tag de presente para o kit", tam: "m" }
    ],
    digital: [{ m: "celularSite", legenda: "Loja mobile" }, { m: "laptopSite", legenda: "Página do sérum" }]
  },
  {
    slug: "monarch", nome: "MONARCH", segmento: "Barbearia premium", ano: "2026",
    curto: "Barbearia de tradição: uma coroa que é também um M, preto, marfim e cobre.",
    conceito: "Toda cadeira é um trono. Monarch junta o ritual clássico da navalha e da toalha quente com o acabamento de um estúdio contemporâneo. A marca é segura de si, tem serifa de cartaz antigo e o brilho quente do cobre das ferramentas.",
    personalidade: ["Tradição", "Confiança", "Precisão", "Hospitalidade"],
    tagline: "Corte de rei, desde a primeira vez.",
    simboloTexto: "Um M que sobe em três pontas e vira coroa. A base reta lembra o fio da navalha, e as três pedras são o corte, a barba e o cuidado.",
    cores: [
      { nome: "Ônix", hex: "#0F0F0F", uso: "Fundo e fachada" },
      { nome: "Marfim", hex: "#F3EEE6", uso: "Tipografia e papel" },
      { nome: "Cobre", hex: "#B87333", uso: "Símbolo e detalhes" },
      { nome: "Cobre Queimado", hex: "#7C4A25", uso: "Sombras e couro" },
      { nome: "Carvão", hex: "#262626", uso: "Superfícies" }
    ],
    fontes: {
      principal: { familia: "Playfair Display", css: "'Playfair Display',serif", peso: 800, nota: "Playfair Display ExtraBold", uso: "Logotipo e títulos" },
      secundaria: { familia: "Barlow Condensed", css: "'Barlow Condensed',sans-serif", peso: 600, nota: "Barlow Condensed Medium e SemiBold", uso: "Serviços, preços e sinalização" }
    },
    tema: { fundo: "#0F0F0F", texto: "#F3EEE6", acento: "#B87333", suave: "#A39C92", papel: "#F3EEE6", tinta: "#0F0F0F", superficie: "#1B1A19", claro: false },
    simbolo: (c, c2 = c) => `<path fill="${c}" d="M12 82V30l19 22 19-30 19 30 19-22v52H72V58L50 84 28 58v24z"/><rect fill="${c}" x="8" y="88" width="84" height="5"/><circle fill="${c2}" cx="12" cy="22" r="5"/><circle fill="${c2}" cx="50" cy="12" r="5.5"/><circle fill="${c2}" cx="88" cy="22" r="5"/>`,
    palavra: { h: 136, linhas: [
      { txt: "MONARCH", fam: "'Playfair Display',serif", peso: 800, fs: 100, base: 82, ls: 3, w: 552 },
      { txt: "BARBEARIA CLÁSSICA", fam: "'Barlow Condensed',sans-serif", peso: 600, fs: 30, base: 128, ls: 12, w: 426, cor2: true }
    ] },
    vertical: { largura: 320, vao: 22 }, principal: "vertical",
    apoio: "listras",
    posts: [
      { tipo: "manchete", titulo: "Toda cadeira é um trono.", sub: "Agende pelo link da bio" },
      { tipo: "produto", objeto: "lata", titulo: "Pomada Matte", sub: "Fixação forte · 100 g" },
      { tipo: "padrao", titulo: "Corte + barba", sub: "Toalha quente e navalha" }
    ],
    story: { titulo: "Sexta tem horário", sub: "Restam 3 cadeiras para hoje.", botao: "Agendar agora" },
    contato: { site: "monarch.barber", social: "@monarch.barber", pessoa: "Caio Ventura", cargo: "Barbeiro mestre" },
    aplicacoes: [
      { m: "fachada", legenda: "Fachada com letreiro em cobre", tam: "a" },
      { m: "cartoes", legenda: "Cartões de visita com verso em cobre", tam: "g" },
      { m: "avental", legenda: "Avental de lona para a equipe", tam: "m" },
      { m: "produtos", legenda: "Pomada e óleo para barba", tam: "m" },
      { m: "caixa", legenda: "Caixa do kit de presente", tam: "m", o: { cor: "#0F0F0F", tinta: "#B87333" } },
      { m: "sacolaPapel", legenda: "Sacola preta com alça de cordão", tam: "m", o: { papel: "#151515" } }
    ],
    digital: [{ m: "celularApp", legenda: "Agendamento no celular" }, { m: "laptopSite", legenda: "Site com serviços e preços" }]
  },
  {
    slug: "nord", nome: "NÓRD", segmento: "Arquitetura e interiores", ano: "2026",
    curto: "Arquitetura com direção: uma planta baixa que aponta para o norte, off-white, cinza e terra.",
    conceito: "Nórd vem de norte, a referência fixa que orienta todo projeto. O escritório acredita em menos excesso e mais intenção: luz natural, materiais honestos e espaços que funcionam. A identidade é desenhada como uma prancha técnica, com linhas finas, muito ar e um único tom de terra.",
    personalidade: ["Precisão", "Calma", "Funcionalidade", "Atemporal"],
    tagline: "Espaços com direção.",
    simboloTexto: "Um N traçado dentro de um quadrado, como uma parede numa planta baixa, com a seta do norte acima. É a bússola do escritório: todo projeto começa por onde entra a luz.",
    cores: [
      { nome: "Off-white", hex: "#F2F0EB", uso: "Fundo e papelaria" },
      { nome: "Névoa", hex: "#D8D5CE", uso: "Superfícies" },
      { nome: "Cinza Pedra", hex: "#8D8A84", uso: "Textos de apoio" },
      { nome: "Terracota", hex: "#A9785C", uso: "Único acento" },
      { nome: "Grafite", hex: "#2D2B28", uso: "Tipografia e linhas" }
    ],
    fontes: {
      principal: { familia: "Outfit", css: "'Outfit',sans-serif", peso: 300, nota: "Outfit Light e Regular", uso: "Logotipo, títulos e sinalização" },
      secundaria: { familia: "IBM Plex Mono", css: "'IBM Plex Mono',monospace", peso: 400, nota: "IBM Plex Mono Regular", uso: "Cotas, legendas técnicas e dados de projeto" }
    },
    tema: { fundo: "#F2F0EB", texto: "#2D2B28", acento: "#A9785C", suave: "#8D8A84", papel: "#F2F0EB", tinta: "#2D2B28", superficie: "#E7E4DD", claro: true },
    simbolo: (c, c2 = c) => `<rect x="14" y="20" width="72" height="72" fill="none" stroke="${c}" stroke-width="3"/><path fill="none" stroke="${c}" stroke-width="3" d="M32 76V36l36 40V36"/><path fill="${c2}" d="M50 2l7 12H43z"/>`,
    palavra: { h: 100, linhas: [{ txt: "NÓRD", fam: "'Outfit',sans-serif", peso: 300, fs: 100, base: 90, ls: 30, w: 376 }] },
    horizontal: { altura: .5, vao: 30, descritor: "arquitetura e interiores" }, principal: "horizontal",
    apoio: "planta",
    posts: [
      { tipo: "manchete", titulo: "Menos excesso. Mais intenção.", sub: "Casa Ipê · 2026" },
      { tipo: "produto", objeto: "planta", titulo: "Planta baixa", sub: "Residência de 140 m²" },
      { tipo: "padrao", titulo: "A luz entra primeiro.", sub: "Princípio 01 do escritório" }
    ],
    story: { titulo: "Casa Ipê", sub: "Antes e depois da reforma.", botao: "Ver o projeto" },
    contato: { site: "nord.arq", social: "@nord.arq", pessoa: "Marina Leal", cargo: "Arquiteta e sócia" },
    aplicacoes: [
      { m: "papelaria", legenda: "Papel timbrado, envelope e cartão", tam: "a" },
      { m: "fachada", legenda: "Fachada do escritório", tam: "g" },
      { m: "placa", legenda: "Placa de identificação em latão escovado", tam: "m" },
      { m: "cartoes", legenda: "Cartões de visita", tam: "m" },
      { m: "folder", legenda: "Caderno institucional de projetos", tam: "m" },
      { m: "laptopSlide", legenda: "Apresentação para clientes", tam: "g" }
    ],
    digital: [{ m: "celularSite", legenda: "Portfólio mobile" }, { m: "laptopSite", legenda: "Site institucional" }]
  },
  {
    slug: "pulse", nome: "PULSE", segmento: "Tecnologia e inovação", ano: "2026",
    curto: "Tecnologia em movimento: um P que emite sinal, preto, branco e azul elétrico.",
    conceito: "Toda conexão começa com um sinal. Pulse é uma plataforma que transforma dados em decisões em tempo real. A identidade se comporta como uma interface: tipografia larga e geométrica, grade de pontos, ondas que se propagam e um azul elétrico que marca tudo o que está vivo.",
    personalidade: ["Movimento", "Conectividade", "Clareza", "Ousadia"],
    tagline: "Conecte o próximo movimento.",
    simboloTexto: "A letra P vira uma antena: a haste é a base, o bojo é o núcleo, e as ondas que saem dele são o sinal se propagando. O símbolo funciona como ícone de aplicativo e como animação.",
    cores: [
      { nome: "Void", hex: "#07080D", uso: "Fundo e interface" },
      { nome: "Branco", hex: "#FFFFFF", uso: "Texto e contraste" },
      { nome: "Azul Elétrico", hex: "#2F5BFF", uso: "Ação e sinal" },
      { nome: "Azul Gelo", hex: "#A9BCFF", uso: "Dados e apoio" },
      { nome: "Painel", hex: "#161A26", uso: "Cartões de interface" }
    ],
    fontes: {
      principal: { familia: "Unbounded", css: "'Unbounded',sans-serif", peso: 700, nota: "Unbounded Bold e Regular", uso: "Logotipo, títulos e números" },
      secundaria: { familia: "JetBrains Mono", css: "'JetBrains Mono',monospace", peso: 400, nota: "JetBrains Mono Regular", uso: "Dados, códigos e microtextos de interface" }
    },
    tema: { fundo: "#07080D", texto: "#FFFFFF", acento: "#2F5BFF", suave: "#8C93A8", papel: "#FFFFFF", tinta: "#07080D", superficie: "#161A26", claro: false },
    simbolo: (c, c2 = c) => `<path fill="${c}" d="M14 12h22a26 26 0 0 1 0 52H30v24H14zm16 16v20h6a10 10 0 0 0 0-20z"/><path fill="none" stroke="${c2}" stroke-width="6" stroke-linecap="round" d="M65.1 13.6A38 38 0 0 1 65.1 62.4M78.6 8.2A52 52 0 0 1 78.6 67.8"/>`,
    palavra: { h: 100, linhas: [{ txt: "pulse", fam: "'Unbounded',sans-serif", peso: 700, fs: 100, base: 76, ls: -2, w: 331 }] },
    horizontal: { altura: .78, vao: 22 }, principal: "horizontal",
    apoio: "ondas",
    posts: [
      { tipo: "manchete", titulo: "Dados em tempo real.", sub: "Decisões no mesmo segundo." },
      { tipo: "produto", objeto: "graficos", titulo: "+38% de agilidade", sub: "Média dos times no 1º trimestre" },
      { tipo: "padrao", titulo: "Pulse 2.0 chegou", sub: "Novo painel, mesmo sinal." }
    ],
    story: { titulo: "Pulse 2.0", sub: "Teste grátis por 14 dias.", botao: "Criar conta" },
    contato: { site: "pulse.tech", social: "@pulse.tech", pessoa: "Leo Tanaka", cargo: "Produto" },
    aplicacoes: [
      { m: "celularApp", legenda: "Aplicativo: painel em tempo real", tam: "a" },
      { m: "cartoes", legenda: "Cartões de visita com verso azul elétrico", tam: "g" },
      { m: "camiseta", legenda: "Camiseta da equipe", tam: "m", o: { cor: "#07080D", estampa: "peito" } },
      { m: "laptopSlide", legenda: "Apresentação para investidores", tam: "g" },
      { m: "cracha", legenda: "Crachá de evento", tam: "m" }
    ],
    digital: [{ m: "laptopSite", legenda: "Painel web" }, { m: "celularSite", legenda: "Site mobile" }]
  },
  {
    slug: "casa-botanica", nome: "Casa Botânica", segmento: "Cafeteria e produtos artesanais", ano: "2026",
    curto: "Café de jardim: uma porta em arco com um ramo que cresce, oliva, linho e café.",
    conceito: "Uma casa de portas abertas para o jardim. Casa Botânica serve café de origem, pão de fermentação lenta e vende geleias e grãos feitos à mão. A identidade tem a curva de uma porta antiga, uma serifa macia como letra de caderno e ilustrações de folhas que mudam a cada estação.",
    personalidade: ["Acolhimento", "Artesanal", "Natureza", "Cuidado"],
    tagline: "Do pé à xícara.",
    simboloTexto: "Uma porta em arco, a entrada da casa, com um ramo crescendo lá dentro. É o convite para entrar e o lembrete de que tudo ali nasceu da terra.",
    cores: [
      { nome: "Verde Oliva", hex: "#5C6338", uso: "Cor principal" },
      { nome: "Linho", hex: "#EDE3D0", uso: "Fundo e papel" },
      { nome: "Marrom Café", hex: "#6A4630", uso: "Textos e embalagens" },
      { nome: "Sálvia", hex: "#A7AD80", uso: "Ilustrações" },
      { nome: "Torra", hex: "#2E2A1F", uso: "Contraste" }
    ],
    fontes: {
      principal: { familia: "Fraunces", css: "'Fraunces',serif", peso: 600, nota: "Fraunces SemiBold Italic e Regular", uso: "Logotipo, títulos e cardápio" },
      secundaria: { familia: "Karla", css: "'Karla',sans-serif", peso: 400, nota: "Karla Regular e Bold", uso: "Textos, preços e etiquetas" }
    },
    tema: { fundo: "#EDE3D0", texto: "#2E2A1F", acento: "#5C6338", suave: "#6A4630", papel: "#EDE3D0", tinta: "#2E2A1F", superficie: "#E3D7BF", claro: true },
    simbolo: (c, c2 = c) => `<path fill="none" stroke="${c}" stroke-width="3.4" d="M22 94V44a28 28 0 0 1 56 0v50"/><path fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round" d="M50 92c0-18-2-30 3-48"/><path fill="${c2}" d="M50 76c-9-1-15-8-16-15 8 0 15 6 16 15zM51 62c8-2 14-9 14-16-8 1-13 7-14 16zM52 46c-6-5-7-13-3-20 5 5 6 13 3 20z"/><path fill="${c}" d="M14 92h72v3H14z"/>`,
    palavra: { h: 176, linhas: [
      { txt: "Casa", fam: "'Fraunces',serif", peso: 600, estilo: "italic", fs: 96, base: 76, ls: 0, w: 217 },
      { txt: "Botânica", fam: "'Fraunces',serif", peso: 600, estilo: "italic", fs: 96, base: 164, ls: 0, w: 400 }
    ] },
    vertical: { largura: 250, vao: 16 }, principal: "vertical",
    apoio: "ramos",
    posts: [
      { tipo: "manchete", titulo: "Café coado, pão de fermentação lenta.", sub: "Aberto todos os dias, 7h às 19h" },
      { tipo: "produto", objeto: "copo", titulo: "Latte de cardamomo", sub: "Só nesta estação" },
      { tipo: "padrao", titulo: "Do pé à xícara.", sub: "Grãos de pequenos produtores" }
    ],
    story: { titulo: "Chegou a geleia de jabuticaba", sub: "Feita aqui, em pequenos lotes.", botao: "Reservar um pote" },
    contato: { site: "casabotanica.cafe", social: "@casabotanica.cafe", pessoa: "Ana Flor", cargo: "Fundadora" },
    aplicacoes: [
      { m: "copos", legenda: "Copos para viagem com cinta", tam: "a" },
      { m: "pouch", legenda: "Embalagem de café em grãos", tam: "m" },
      { m: "sacolaPapel", legenda: "Sacola kraft com carimbo", tam: "m", o: { papel: "#C9A77C" } },
      { m: "cardapio", legenda: "Cardápio impresso", tam: "g" },
      { m: "potes", legenda: "Etiquetas para geleias", tam: "m" },
      { m: "fachada", legenda: "Fachada com toldo", tam: "g" }
    ],
    digital: [{ m: "celularSite", legenda: "Cardápio digital" }, { m: "laptopSite", legenda: "Site da cafeteria" }]
  }
];

/* ---------- desenho dos logotipos ---------- */
const Logo = (() => {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  function palavra(m, cor, cor2 = cor) {
    const p = m.palavra, w = Math.max(...p.linhas.map((l) => l.w));
    const linhas = p.linhas.map((l) => `<text x="${w / 2}" y="${l.base}" text-anchor="middle" fill="${l.cor2 ? cor2 : cor}" font-family="${l.fam.replace(/"/g, "'")}" font-weight="${l.peso}" font-size="${l.fs}"${l.estica ? ` font-stretch="${l.estica}"` : ""}${l.estilo ? ` font-style="${l.estilo}"` : ""} letter-spacing="${l.ls}" textLength="${l.w}" lengthAdjust="spacing">${esc(l.txt)}</text>`).join("");
    return { w, h: p.h, svg: linhas };
  }
  const aninha = (o, x, y, w, h) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${o.w} ${o.h}" overflow="visible">${o.svg}</svg>`;
  /* tipo: simbolo | palavra | horizontal | vertical | principal */
  function montar(m, tipo, cor, cor2 = cor) {
    if (tipo === "principal") tipo = m.principal;
    const sim = { w: 100, h: 100, svg: m.simbolo(cor, cor2) };
    if (tipo === "simbolo") return sim;
    const pal = palavra(m, cor, cor2);
    if (tipo === "palavra") return pal;
    if (tipo === "horizontal") {
      const cfg = m.horizontal || { altura: .62, vao: 24 };
      const ph = 100 * cfg.altura, pw = pal.w * ph / pal.h;
      let svg = sim.svg + aninha(pal, 100 + cfg.vao, (100 - ph) / 2 - (cfg.descritor ? 10 : 0), pw, ph);
      if (cfg.descritor) svg += `<text x="${100 + cfg.vao + 4}" y="${(100 + ph) / 2 + 12}" fill="${cor}" font-family="${m.fontes.secundaria.css.replace(/"/g, "'")}" font-size="14" letter-spacing="4">${esc(cfg.descritor.toUpperCase())}</text>`;
      /* o descritor em caixa alta pode ser mais largo que o nome */
      const dw = cfg.descritor ? cfg.descritor.length * 12.8 : 0;
      return { w: 100 + cfg.vao + Math.max(pw, dw), h: 100, svg };
    }
    /* vertical */
    const cfg = m.vertical || { largura: 300, vao: 20 };
    const W = Math.max(cfg.largura, 100), ph = pal.h * cfg.largura / pal.w;
    const svg = aninha(sim, (W - 100) / 2, 0, 100, 100) + aninha(pal, (W - cfg.largura) / 2, 100 + cfg.vao, cfg.largura, ph);
    return { w: W, h: 100 + cfg.vao + ph, svg };
  }
  /* devolve um <svg> pronto; attrs entra direto na tag (x, y, width, class...) */
  function svg(m, tipo, cor, attrs = "", cor2) {
    const o = montar(m, tipo, cor, cor2);
    return `<svg viewBox="0 0 ${o.w} ${o.h}" ${attrs} overflow="visible">${o.svg}</svg>`;
  }
  /* encaixa o logo dentro de uma caixa, centralizado */
  function caixa(m, tipo, cor, x, y, w, h, cor2) {
    const o = montar(m, tipo, cor, cor2);
    return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${o.w} ${o.h}" preserveAspectRatio="xMidYMid meet" overflow="visible">${o.svg}</svg>`;
  }
  return { montar, svg, caixa, esc };
})();
