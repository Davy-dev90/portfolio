/* Identidade visual: galeria das seis marcas e estudo de caso de cada uma.
   Rotas por hash: #/ é a galeria, #/vertice abre o caso da VÉRTICE. */

(() => {
  const app = document.getElementById("app");
  const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ASSINATURA = "assets/logo-davstudio.png";
  const WHATS = "https://wa.me/5583981788413?text=";
  const esc = Logo.esc;

  /* luminância simples para decidir a cor da assinatura */
  const escuroDe = (hex) => { const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)); return (r * 299 + g * 587 + b * 114) / 1000 < 140; };

  /* figura com a assinatura dav studio no canto */
  function figura(svg, W, H, legenda, fundo, cls = "") {
    const tom = escuroDe(fundo) ? "" : " assinatura--escura";
    return `<figure class="peca revela ${cls}"><div class="peca__quadro"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(legenda)}" preserveAspectRatio="xMidYMid slice">${svg}</svg>` +
      `<img class="assinatura${tom}" src="${ASSINATURA}" alt="" width="777" height="284" loading="lazy" decoding="async"></div>` +
      (legenda ? `<figcaption>${esc(legenda)}</figcaption>` : "") + `</figure>`;
  }
  const cena = (m, nome, o, W, H) => Mock.cena(m, Mock[nome](m, o || {}), W, H);
  /* mockups fotográficos: foto real com a marca aplicada (identidade/fotos.js) */
  const fotos = (m) => (typeof FOTOS !== "undefined" && FOTOS[m.slug]) || [];
  /* duas colunas equilibradas: cada foto entra na coluna mais curta */
  const colunas = (lista) => {
    const c = [[], []], alt = [0, 0];
    lista.forEach((f) => { const k = alt[0] <= alt[1] ? 0 : 1; c[k].push(f); alt[k] += f.h / f.w + .08; });
    return c;
  };
  const fotoFig = (f) => `<figure class="peca peca--foto revela"><div class="peca__quadro"><img src="${f.src}" width="${f.w}" height="${f.h}" alt="${esc(f.legenda)}" loading="lazy" decoding="async">` +
    `<img class="assinatura${f.escuro ? "" : " assinatura--escura"}" src="${ASSINATURA}" alt="" width="777" height="284" loading="lazy"></div><figcaption>${esc(f.legenda)}</figcaption></figure>`;
  /* cor de fundo que cada peça mostra, para a assinatura */
  function fundoDa(m, nome) {
    if (nome === "fachada") return m.slug === "monarch" ? "#111111" : "#E9DDC6";
    if (nome === "placa") return "#CFCBC3";
    if (nome === "apoio") return { vertice: "#2C2C2A", aurea: "#E3D3BF", monarch: "#0F0F0F", nord: "#F2F0EB", pulse: "#07080D", "casa-botanica": "#5C6338" }[m.slug];
    if (nome === "padraoCena") return Mock.D(m).fundo;
    return Mock.FUNDO[m.slug];
  }

  /* capa de cada marca: a primeira impressão, com direção de arte própria */
  function capa(m, W = 1600, H = 1100) {
    const cxw = W / 2, cyh = H / 2;
    switch (m.slug) {
      case "vertice": return `<rect width="${W}" height="${H}" fill="#0E0E0D"/><rect width="${W}" height="${H}" filter="url(#f-ruido-g)" opacity=".35"/>` +
        Logo.caixa(m, "simbolo", "#1E1E1C", W * .42, -H * .08, W * .7, H * 1.1) + Logo.caixa(m, "palavra", "#F1EFEA", W * .08, H * .58, W * .7, H * .22) +
        `<rect x="${W * .08}" y="${H * .84}" width="${W * .1}" height="8" fill="#CFC8BA"/>`;
      case "aurea": return `<rect width="${W}" height="${H}" fill="#F5EEE4"/><circle cx="${cxw}" cy="${cyh + 40}" r="${H * .46}" fill="url(#g-halo)"/>` +
        Array.from({ length: 5 }, (_, i) => `<circle cx="${cxw}" cy="${cyh}" r="${H * .26 + i * 46}" fill="none" stroke="#B99B6B" stroke-width="1" opacity="${.6 - i * .1}"/>`).join("") +
        Logo.caixa(m, "vertical", "#3D2E25", cxw - W * .17, cyh - H * .22, W * .34, H * .44, "#B99B6B");
      case "monarch": return `<rect width="${W}" height="${H}" fill="#0F0F0F"/><rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="#B87333" stroke-width="3"/><rect x="56" y="56" width="${W - 112}" height="${H - 112}" fill="none" stroke="#B87333" stroke-width="1" opacity=".6"/>` +
        Logo.caixa(m, "vertical", "url(#g-cobre)", cxw - W * .2, cyh - H * .3, W * .4, H * .6, "#D99A5C");
      case "nord": return `<rect width="${W}" height="${H}" fill="#F2F0EB"/><g stroke="#2D2B28" opacity=".07">${Array.from({ length: 40 }, (_, i) => `<path d="M${i * 50} 0V${H}M0 ${i * 50}H${W}"/>`).join("")}</g>` +
        `<rect x="${W * .62}" y="0" width="${W * .38}" height="${H}" fill="#D8D5CE"/>` + Logo.caixa(m, "horizontal", "#2D2B28", W * .08, cyh - H * .1, W * .48, H * .2, "#A9785C") +
        `<path d="M${W * .62} ${H * .7}H${W}" stroke="#A9785C" stroke-width="3"/>`;
      case "pulse": return `<rect width="${W}" height="${H}" fill="#07080D"/>` + Mock.ondas(m, W, H) +
        `<rect x="0" y="0" width="${W * .66}" height="${H}" fill="#07080D" opacity=".55"/>` + Logo.caixa(m, "horizontal", "#FFFFFF", W * .08, cyh - H * .12, W * .5, H * .24, "#2F5BFF");
      default: return `<rect width="${W}" height="${H}" fill="#5C6338"/>` +
        [[.12, 1.02, 4, -14], [.3, 1.08, 5.2, 8], [.7, 1.06, 5, -6], [.9, 1.02, 4.2, 14]].map(([x, y, s, r], k) => Mock.ramo(k % 2 ? "#A7AD80" : "#EDE3D0", W * x, H * y, s * H / 900, r)).join("") +
        `<path d="M${cxw - H * .27} ${H}V${cyh - H * .08}A${H * .27} ${H * .27} 0 0 1 ${cxw + H * .27} ${cyh - H * .08}V${H}Z" fill="#EDE3D0"/>` + Logo.caixa(m, "vertical", "#5C6338", cxw - H * .19, cyh - H * .24, H * .38, H * .5, "#5C6338");
    }
  }

  /* ---------- galeria ---------- */
  function galeria() {
    const cards = MARCAS.map((m, i) => {
      const larga = i % 4 === 0 || i % 4 === 3;
      const W = larga ? 1600 : 1000, H = larga ? 1100 : 1250, ap = m.aplicacoes[0];
      return `<li class="iv-card ${larga ? "iv-card--larga" : "iv-card--alta"}" style="--c-acento:${m.tema.acento}">
        <a href="#/${m.slug}" class="iv-card__link" aria-label="Abrir o projeto ${esc(m.nome)}, ${esc(m.segmento)}">
          <div class="iv-card__capa" style="view-transition-name:capa-${m.slug}">
            <svg class="iv-card__a${larga ? " so-largo" : ""}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${capa(m, W, H)}</svg>
            ${larga ? `<svg class="iv-card__a so-alto" viewBox="0 0 1000 1250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${capa(m, 1000, 1250)}</svg>` : ""}
            ${fotos(m).length ? `<img class="iv-card__b" src="${fotos(m)[0].src}" alt="" loading="lazy" decoding="async">` : `<svg class="iv-card__b" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${cena(m, ap.m, ap.o, W, H)}</svg>`}
            <span class="iv-selo">PROJETO CONCEITUAL</span>
            <img class="assinatura${escuroDe(m.tema.fundo) ? "" : " assinatura--escura"}" src="${ASSINATURA}" alt="" width="777" height="284" loading="lazy">
          </div>
          <div class="iv-card__info">
            <span class="iv-card__logo" aria-hidden="true">${Logo.svg(m, "simbolo", "currentColor")}</span>
            <div><h2 class="iv-card__nome">${esc(m.nome)}</h2><p class="iv-card__seg">${esc(m.segmento)}</p></div>
            <span class="iv-card__seta" aria-hidden="true">↗</span>
            <p class="iv-card__desc">${esc(m.curto)}</p>
          </div>
        </a></li>`;
    }).join("");
    return `<div class="iv-galeria-pagina">
      <section class="iv-abre">
        <p class="iv-sobre">BRANDING &amp; VISUAL IDENTITY — DAVSTUDIO®</p>
        <h1 class="iv-titulo"><span class="l"><span>IDENTIDADES QUE</span></span><span class="l"><span>CONSTROEM</span></span><span class="l"><span><em>MARCAS.</em></span></span></h1>
        <div class="iv-abre__txt">
          <p class="iv-desc">Transformamos ideias em identidades visuais únicas. Cada detalhe é pensado para transmitir personalidade, criar conexão e fortalecer marcas.</p>
          <p class="iv-nota">Aqui estão seis projetos conceituais desenvolvidos pela dav studio. As marcas são fictícias e foram criadas para mostrar o processo completo: conceito, logotipo, sistema visual, aplicações e redes sociais. Escolha uma para ver o estudo de caso.</p>
        </div>
        <ul class="iv-indice" aria-label="Ir direto para uma marca">${MARCAS.map((m) => `<li><a href="#/${m.slug}" title="${esc(m.nome)}"><span aria-hidden="true">${Logo.svg(m, "simbolo", "currentColor")}</span><span class="sr">${esc(m.nome)}</span></a></li>`).join("")}</ul>
      </section>
      <section class="iv-galeria" aria-label="Projetos de identidade visual"><ul class="iv-grade">${cards}</ul></section>
    </div>`;
  }

  /* ---------- estudo de caso ---------- */
  function caso(m, i) {
    const te = m.tema, d = Mock.D(m), total = MARCAS.length;
    const ant = MARCAS[(i - 1 + total) % total], prox = MARCAS[(i + 1) % total];
    const h2 = (t2, sub) => `<header class="cs-cab revela"><h2>${t2}</h2>${sub ? `<p>${sub}</p>` : ""}</header>`;
    const fundoLogo = te.fundo, outro = te.claro ? d.fundo : te.papel;
    const tile = (svg, W, H, rot, fundo, cls = "") => `<figure class="cs-tile revela ${cls}" style="background:${fundo};color:${escuroDe(fundo) ? "#fff" : "#111"}"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(rot)}">${svg}</svg><figcaption>${esc(rot)}</figcaption></figure>`;
    const enc = (m2, tipo, cor, W, H, pad, c2) => Logo.caixa(m2, tipo, cor, pad, pad, W - pad * 2, H - pad * 2, c2);
    /* área de proteção: a altura do símbolo dividida em quatro */
    const protecao = (() => {
      const o = Logo.montar(m, m.principal, te.texto, te.acento), x = o.h / 4, W = o.w + x * 4, H = o.h + x * 4;
      return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Área de proteção do logotipo"><rect x="${x}" y="${x}" width="${W - x * 2}" height="${H - x * 2}" fill="none" stroke="${te.acento}" stroke-dasharray="6 6" stroke-width="2"/><rect width="${W}" height="${H}" fill="none" stroke="${te.texto}" stroke-opacity=".15"/>` +
        `<svg x="${x * 2}" y="${x * 2}" width="${o.w}" height="${o.h}" viewBox="0 0 ${o.w} ${o.h}">${o.svg}</svg>` +
        [[x, x], [W - x * 2, x], [x, H - x * 2], [W - x * 2, H - x * 2]].map(([a, b]) => `<rect x="${a}" y="${b}" width="${x}" height="${x}" fill="${te.acento}" opacity=".18"/><text x="${a + x / 2}" y="${b + x / 2 + 8}" text-anchor="middle" font-family="General Sans,sans-serif" font-size="${x * .4}" fill="${te.texto}">x</text>`).join("") + `</svg>`;
    })();
    const sistema = [
      tile(enc(m, "horizontal", te.texto, 1000, 560, 120, te.acento), 1000, 560, "Versão horizontal", te.superficie),
      tile(enc(m, "vertical", te.texto, 1000, 560, 90, te.acento), 1000, 560, "Versão vertical", te.superficie),
      tile(enc(m, "simbolo", d.logo, 1000, 560, 130, d.c2), 1000, 560, "Símbolo isolado", d.fundo),
      tile(enc(m, "principal", "#111111", 1000, 560, 110), 1000, 560, "Monocromático positivo", "#FFFFFF"),
      tile(enc(m, "principal", "#FFFFFF", 1000, 560, 110), 1000, 560, "Monocromático negativo", "#111111"),
      `<figure class="cs-tile revela" style="background:${te.superficie}">${protecao}<figcaption>Área de proteção: x = ¼ da altura do logotipo</figcaption></figure>`
    ].join("");
    const paleta = m.cores.map((c) => { const [r, g, b] = [1, 3, 5].map((k) => parseInt(c.hex.slice(k, k + 2), 16)); return `<li class="cs-cor revela" style="--cor:${c.hex};color:${escuroDe(c.hex) ? "#fff" : "#111"}"><span class="cs-cor__nome">${esc(c.nome)}</span><span class="cs-cor__hex">${c.hex}</span><span class="cs-cor__dados">RGB ${r} ${g} ${b}<br>${esc(c.uso)}</span></li>`; }).join("");
    const fonte = (f, papel) => `<article class="cs-fonte revela"><p class="cs-fonte__papel">${papel}</p><p class="cs-fonte__aa" style="font-family:${f.css};font-weight:${f.peso};${f.estica ? `font-stretch:${f.estica};` : ""}${m.slug === "casa-botanica" && papel === "Principal" ? "font-style:italic;" : ""}">Aa</p>
      <h3>${esc(f.familia)}</h3><p class="cs-fonte__nota">${esc(f.nota)}</p><p class="cs-fonte__abc" style="font-family:${f.css};${f.estica ? `font-stretch:${f.estica};` : ""}">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 ÁÉÕÇ &amp;?!</p><p class="cs-fonte__uso">${esc(f.uso)}</p></article>`;
    /* se sobrar uma peça meia-largura, a última ocupa a linha inteira e a grade não fica com buraco */
    const meias = m.aplicacoes.filter((a) => a.tam !== "a");
    const apl = m.aplicacoes.map((a) => { const larga = a.tam === "a" || (meias.length % 2 === 1 && a === meias[meias.length - 1]), W = larga ? 1600 : 1200, H = 1000; return figura(cena(m, a.m, a.o, W, H), W, H, a.legenda, a.m === "fachada" || a.m === "placa" ? fundoDa(m, a.m) : Mock.FUNDO[m.slug], larga ? "peca--larga" : ""); }).join("");
    const dig = m.digital.map((a) => { const tel = a.m.startsWith("celular"), W = tel ? 800 : 1500, H = 1000; return figura(cena(m, a.m, {}, W, H), W, H, a.legenda, Mock.FUNDO[m.slug], tel ? "peca--tel" : "peca--note"); }).join("");
    const posts = [0, 1, 2].map((k) => figura(Mock.post(m, k), 1080, 1350, `Post ${k + 1}: ${m.posts[k].titulo}`, k === 2 ? d.fundo : (k === 1 ? te.superficie : te.fundo), "peca--post")).join("");
    const feedFig = figura(cena(m, "feed", {}, 900, 1000), 900, 1000, "Composição do feed no perfil", Mock.FUNDO[m.slug], "peca--tel");
    const storyFig = figura(cena(m, "storyCel", {}, 900, 1000), 900, 1000, `Story: ${m.story.titulo}`, Mock.FUNDO[m.slug], "peca--tel");
    const encerra = te.claro ? d.fundo : te.acento;

    /* fonte de leitura do texto do conceito: o lado mais calmo de cada marca */
    const leitura = { vertice: ["'Space Mono',monospace", 400], aurea: ["'Bodoni Moda',serif", 500], monarch: ["'Playfair Display',serif", 400], nord: ["'Outfit',sans-serif", 300], pulse: ["'Unbounded',sans-serif", 400], "casa-botanica": ["'Fraunces',serif", 400] }[m.slug];
    return `<article class="caso" style="--c-fl:${leitura[0]};--c-fl-peso:${leitura[1]};--c-fundo:${te.fundo};--c-texto:${te.texto};--c-acento:${te.acento};--c-suave:${te.suave};--c-sup:${te.superficie};--c-fp:${m.fontes.principal.css};--c-fs:${m.fontes.secundaria.css};--c-peso:${m.fontes.principal.peso};--c-estica:${m.fontes.principal.estica || "100%"};--c-estilo:${m.slug === "casa-botanica" ? "italic" : "normal"}" data-tom="${te.claro ? "claro" : "escuro"}" aria-labelledby="cs-nome">
      <nav class="cs-barra" aria-label="Navegação entre projetos">
        <a class="botao botao--linha botao--p" href="#/"><span class="seta seta--esq">←</span> Galeria</a>
        <span class="cs-barra__nome">${esc(m.nome)} <small>${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</small></span>
        <span class="cs-barra__setas"><a class="cs-seta" href="#/${ant.slug}" aria-label="Projeto anterior: ${esc(ant.nome)}">←</a><a class="cs-seta" href="#/${prox.slug}" aria-label="Próximo projeto: ${esc(prox.nome)}">→</a></span>
      </nav>

      <section class="cs-capa">
        <div class="cs-capa__img" style="view-transition-name:capa-${m.slug}">
          <svg class="so-largo" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Capa do projeto ${esc(m.nome)}">${capa(m, 1600, 1000)}</svg>
          <svg class="so-alto" viewBox="0 0 900 1100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${capa(m, 900, 1100)}</svg>
          <img class="assinatura${escuroDe(te.fundo) ? "" : " assinatura--escura"}" src="${ASSINATURA}" alt="" width="777" height="284">
        </div>
        <div class="cs-capa__txt">
          <span class="iv-selo iv-selo--solto">PROJETO CONCEITUAL</span>
          <h1 id="cs-nome" class="cs-nome">${esc(m.nome)}</h1>
          <p class="cs-seg">${esc(m.segmento)} · ${m.ano}</p>
        </div>
      </section>

      <section class="cs-sec cs-conceito">
        ${h2("Conceito")}
        <div class="cs-conceito__txt revela"><p class="cs-lead">${esc(m.conceito)}</p>
          <ul class="cs-tags" aria-label="Personalidade">${m.personalidade.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          <dl class="cs-ficha"><div><dt>Segmento</dt><dd>${esc(m.segmento)}</dd></div><div><dt>Entrega</dt><dd>Identidade completa</dd></div><div><dt>Tipo</dt><dd>Projeto conceitual</dd></div><div><dt>Estúdio</dt><dd>dav studio</dd></div></dl>
        </div>
      </section>

      <section class="cs-sec">
        ${h2("Logotipo principal", esc(m.simboloTexto))}
        <figure class="cs-logo revela" style="background:${fundoLogo}"><svg viewBox="0 0 1600 760" role="img" aria-label="Logotipo principal da ${esc(m.nome)}">${Logo.caixa(m, "principal", te.texto, 380, 150, 840, 460, te.acento)}</svg>
          <img class="assinatura${escuroDe(fundoLogo) ? "" : " assinatura--escura"}" src="${ASSINATURA}" alt="" width="777" height="284" loading="lazy"></figure>
        <figure class="cs-logo cs-logo--inv revela" style="background:${outro}"><svg viewBox="0 0 1600 560" role="img" aria-label="Logotipo sobre a cor de destaque">${Logo.caixa(m, "principal", te.claro ? d.logo : te.tinta, 480, 110, 640, 340, te.claro ? d.c2 : te.tinta)}</svg></figure>
      </section>

      <section class="cs-sec">${h2("Sistema de identidade", "As versões do logotipo e como usar cada uma.")}<div class="cs-sistema">${sistema}</div></section>

      <section class="cs-sec">${h2("Paleta de cores")}<ul class="cs-paleta">${paleta}</ul>
        <div class="cs-proporcao revela" aria-label="Proporção de uso das cores">${m.cores.map((c, k) => `<span style="background:${c.hex};flex:${[50, 22, 14, 8, 6][k]}"></span>`).join("")}</div><p class="cs-nota">Proporção de uso recomendada nas peças.</p></section>

      <section class="cs-sec">${h2("Tipografia")}<div class="cs-fontes">${fonte(m.fontes.principal, "Principal")}${fonte(m.fontes.secundaria, "Secundária")}</div></section>

      <section class="cs-sec">${h2("Elementos gráficos", "Padrão com o símbolo e o grafismo de apoio que dão ritmo às peças.")}
        <div class="cs-duo">${figura(cena(m, "padraoCena", {}, 1200, 900), 1200, 900, "Padrão com o símbolo", d.fundo)}${figura(cena(m, "apoio", {}, 1200, 900), 1200, 900, "Grafismo de apoio", fundoDa(m, "apoio"))}</div></section>

      <section class="cs-sec">${h2("Aplicações", "A marca no mundo real: aplicada em fotos de objetos de verdade e em peças desenhadas para o dia a dia do negócio.")}
        ${fotos(m).length ? `<div class="cs-fotos">${colunas(fotos(m)).map((c) => `<div>${c.map(fotoFig).join("")}</div>`).join("")}</div><p class="cs-credito">Fotos-base de banco de imagens (Unsplash). Aplicação da marca: dav studio.</p><h3 class="cs-sub revela">Peças ilustradas</h3>` : ""}
        <div class="cs-bento">${apl}</div></section>

      <section class="cs-sec">${h2("Aplicações digitais")}<div class="cs-digital">${dig}</div></section>

      <section class="cs-sec">${h2("Redes sociais", "Posts, feed e story com o mesmo vocabulário visual.")}
        <div class="cs-posts" tabindex="0" aria-label="Exemplos de posts">${posts}</div>
        <div class="cs-duo cs-duo--tel">${feedFig}${storyFig}</div></section>

      <section class="cs-fim" style="background:${encerra};color:${escuroDe(encerra) ? "#fff" : "#111"}">
        <div class="cs-fim__logo revela" aria-hidden="true">${Logo.svg(m, "simbolo", "currentColor")}</div>
        <p class="cs-fim__frase revela">${esc(m.tagline)}</p>
        <p class="cs-fim__nota revela">Projeto conceitual da dav studio. A marca, os nomes, os contatos e as aplicações são fictícios e servem para mostrar como uma identidade completa funciona.</p>
        <div class="cs-fim__acoes revela"><a class="botao botao--cheio" href="${WHATS + encodeURIComponent(`Olá Davy! Vi o projeto ${m.nome} no seu portfólio e quero uma identidade visual para a minha marca.`)}" target="_blank" rel="noopener">Quero uma identidade assim <span class="seta">→</span></a><a class="botao botao--linha" href="#/">Voltar à galeria</a></div>
      </section>

      <nav class="cs-proximos" aria-label="Outros projetos">
        ${[["Anterior", ant], ["Próximo", prox]].map(([r, o]) => `<a class="cs-prox" href="#/${o.slug}"><span class="cs-prox__capa"><svg viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${capa(o, 1600, 700)}</svg></span><span class="cs-prox__txt"><small>${r}</small><b>${esc(o.nome)}</b><span>${esc(o.segmento)}</span></span></a>`).join("")}
      </nav>
    </article>`;
  }
  /* ---------- rotas e animações ---------- */
  let ultimo = null, revelador = null;
  function rota() {
    const slug = location.hash.replace(/^#\/?/, "");
    const i = MARCAS.findIndex((m) => m.slug === slug);
    return i >= 0 ? i : -1;
  }
  function montar() {
    const i = rota();
    app.innerHTML = i >= 0 ? caso(MARCAS[i], i) : galeria();
    document.title = i >= 0 ? `${MARCAS[i].nome} · Identidade visual · dav studio` : "Identidade visual · dav studio";
    if (i >= 0) scrollTo(0, 0);
    else if (ultimo) { const c = app.querySelector(`a[href="#/${ultimo}"]`); if (c) c.scrollIntoView({ block: "center" }); else scrollTo(0, 0); }
    ultimo = i >= 0 ? MARCAS[i].slug : ultimo;
    revelar(); inclinar(); prepararBotoes();
    if (i >= 0) { const n = document.getElementById("cs-nome"); n.setAttribute("tabindex", "-1"); n.focus({ preventScroll: true }); }
  }
  function trocar() {
    if (!document.startViewTransition || calmo) return montar();
    document.startViewTransition(montar);
  }
  addEventListener("hashchange", trocar);

  function revelar() {
    if (revelador) revelador.disconnect();
    const alvos = app.querySelectorAll(".revela, .iv-card");
    if (calmo || !("IntersectionObserver" in window)) return alvos.forEach((e) => e.classList.add("visivel"));
    revelador = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visivel"); revelador.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    alvos.forEach((e) => revelador.observe(e));
  }
  /* profundidade: o card inclina de leve seguindo o mouse */
  function inclinar() {
    if (calmo || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    app.querySelectorAll(".iv-card__capa").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.setProperty("--rx", (-y * 4).toFixed(2) + "deg"); c.style.setProperty("--ry", (x * 5).toFixed(2) + "deg");
      });
      c.addEventListener("pointerleave", () => { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
    });
  }
  /* teclado: setas trocam de projeto dentro de um caso */
  addEventListener("keydown", (e) => {
    const i = rota(); if (i < 0 || e.target.closest("input, textarea")) return;
    if (e.key === "ArrowRight" && e.altKey === false && e.shiftKey) location.hash = `#/${MARCAS[(i + 1) % MARCAS.length].slug}`;
    if (e.key === "ArrowLeft" && e.shiftKey) location.hash = `#/${MARCAS[(i - 1 + MARCAS.length) % MARCAS.length].slug}`;
    if (e.key === "Escape") location.hash = "#/";
  });

  /* botões de vidro iguais aos do portfólio: seta que escorrega e onda no clique */
  function prepararBotoes() {
    app.querySelectorAll(".botao").forEach((b) => {
      if (b.dataset.pronto) return; b.dataset.pronto = "1";
      b.querySelectorAll(".seta").forEach((s) => { if (!s.querySelector("b")) s.innerHTML = `<b>${s.textContent}</b>`; });
    });
  }
  document.addEventListener("pointermove", (e) => {
    const b = e.target.closest && e.target.closest(".botao"); if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--gx", (e.clientX - r.left) + "px"); b.style.setProperty("--gy", (e.clientY - r.top) + "px");
  }, { passive: true });
  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest && e.target.closest(".botao"); if (!b || calmo) return;
    const r = b.getBoundingClientRect(), o = document.createElement("span");
    o.className = "onda-agua"; o.style.left = (e.clientX - r.left) + "px"; o.style.top = (e.clientY - r.top) + "px";
    b.appendChild(o); o.addEventListener("animationend", () => o.remove());
  });

  /* fontes das marcas carregadas antes de desenhar evita salto nos logotipos */
  const pronto = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
  pronto.then(() => { montar(); document.body.classList.add("pronto"); });
})();
