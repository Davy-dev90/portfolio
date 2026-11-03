/* Mockups vetoriais: cada peça desenha um objeto com luz e sombra próprias
   e recebe a marca (cores, fontes, logo). Representações ilustradas, não fotos.
   Cada função devolve { ow, oh, obj, fundo, cheio } e a cena encaixa o objeto. */

const Mock = (() => {
  let n = 0;
  const uid = (p) => `${p}${++n}`;
  const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => { const A = hx(a), B = hx(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
  const claro = (c, t) => mix(c, "#ffffff", t), escuro = (c, t) => mix(c, "#000000", t);
  const esc = Logo.esc;
  const F = (m, k = "secundaria") => m.fontes[k].css.replace(/"/g, "'");
  const sombra = (forma, op = .35, f = "f-sombra") => `<g filter="url(#${f})" opacity="${op}">${forma}</g>`;
  const chao = (cx, cy, rx, ry, op = .5) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#g-chao)" opacity="${op}"/>`;
  function t(x, y, s, o = {}) {
    return `<text x="${x}" y="${y}" font-family="${o.fam}" font-size="${o.fs || 16}" font-weight="${o.peso || 400}" fill="${o.cor || "#000"}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}${o.ls ? ` letter-spacing="${o.ls}"` : ""}${o.estilo ? ` font-style="${o.estilo}"` : ""}${o.estica ? ` font-stretch="${o.estica}"` : ""}${o.op ? ` opacity="${o.op}"` : ""}>${esc(s)}</text>`;
  }
  /* fonte principal da marca com os ajustes dela (largura, itálico) */
  const P = (m, o = {}) => ({ fam: F(m, "principal"), peso: m.fontes.principal.peso, estica: m.fontes.principal.estica, estilo: m.slug === "casa-botanica" ? "italic" : undefined, ...o });
  const S = (m, o = {}) => ({ fam: F(m), ...o });
  /* quebra de linha por número de caracteres */
  function quebra(s, max) {
    const linhas = []; let l = "";
    s.split(" ").forEach((p) => { if ((l + " " + p).trim().length > max && l) { linhas.push(l); l = p; } else l = (l + " " + p).trim(); });
    if (l) linhas.push(l); return linhas;
  }
  const linhas = (x, y, s, max, lh, o) => quebra(s, max).map((l, i) => t(x, y + i * lh, l, o)).join("");
  /* quantos caracteres da fonte principal cabem numa largura (largura média por letra, em em) */
  const LARG = { vertice: .86, pulse: .8, aurea: .66, monarch: .62, nord: .56, "casa-botanica": .5 };
  const cabe = (m, larg, fs) => Math.max(4, Math.floor(larg / (fs * LARG[m.slug])));
  const larga = (m) => m.slug === "vertice" || m.slug === "pulse";
  const cx = (m) => m.tema;

  /* cor do verso dos cartões e superfícies de destaque, por marca */
  const DESTAQUE = {
    vertice: { fundo: "#0E0E0D", logo: "#F1EFEA", c2: "#F1EFEA" },
    aurea: { fundo: "#8C6A55", logo: "#F5EEE4", c2: "#E3CFA6" },
    monarch: { fundo: "#0F0F0F", logo: "#B87333", c2: "#D99A5C" },
    nord: { fundo: "#2D2B28", logo: "#F2F0EB", c2: "#A9785C" },
    pulse: { fundo: "#2F5BFF", logo: "#FFFFFF", c2: "#FFFFFF" },
    "casa-botanica": { fundo: "#5C6338", logo: "#EDE3D0", c2: "#A7AD80" }
  };
  const D = (m) => DESTAQUE[m.slug];
  /* fundo de cena: tom próximo da marca, sem roubar a peça */
  const FUNDO = { vertice: "#BDB8AE", aurea: "#E9DCCB", monarch: "#2A2622", nord: "#DEDAD2", pulse: "#10131D", "casa-botanica": "#D9CCB2" };

  /* padrão com o símbolo repetido */
  function padrao(m, cor, tam = 60, op = 1, rot = 0) {
    const id = uid("pd");
    return { id, def: `<pattern id="${id}" width="${tam * 2}" height="${tam * 2}" patternUnits="userSpaceOnUse" patternTransform="rotate(${rot})"><g opacity="${op}">${Logo.caixa(m, "simbolo", cor, tam * .2, tam * .2, tam * .6, tam * .6)}${Logo.caixa(m, "simbolo", cor, tam * 1.2, tam * 1.2, tam * .6, tam * .6)}</g></pattern>` };
  }

  /* ---------- vestuário ---------- */
  function camiseta(m, o = {}) {
    const cor = o.cor || cx(m).papel, tinta = o.tinta || (hx(cor)[0] > 128 ? cx(m).tinta : (m.slug === "pulse" ? "#FFFFFF" : cx(m).papel));
    const corpo = "M130 24C160 44 280 44 310 24L410 66 380 168 340 152V440Q220 456 100 440V152L60 168 30 66Z";
    const estampa = o.estampa === "frente"
      ? Logo.caixa(m, "palavra", tinta, 120, 170, 200, 80)
      : Logo.caixa(m, "simbolo", tinta, 248, 112, 52, 52, m.slug === "pulse" ? "#2F5BFF" : tinta);
    const obj = chao(220, 452, 230, 26) + sombra(`<path d="${corpo}" transform="translate(8 14)"/>`, .4) +
      `<path d="${corpo}" fill="${cor}"/>` +
      `<path d="M160 30C185 44 255 44 280 30C262 72 178 72 160 30Z" fill="${escuro(cor, .28)}"/>` +
      `<rect x="206" y="36" width="28" height="12" fill="${cx(m).tinta === cor ? cx(m).papel : cx(m).tinta}" opacity=".9"/>` +
      `<path d="M160 30C178 72 262 72 280 30" fill="none" stroke="${escuro(cor, .12)}" stroke-width="9"/>` +
      `<path d="M100 152 128 28M340 152 312 28" stroke="${escuro(cor, .25)}" stroke-width="1.6" opacity=".6"/>` +
      estampa +
      `<path d="${corpo}" fill="url(#g-luz-v)"/>` +
      `<g filter="url(#f-sombra-m)" fill="none" stroke-linecap="round"><path d="M150 210C185 270 160 360 190 430" stroke="#fff" stroke-width="16" opacity=".09"/><path d="M300 190C270 270 300 350 268 432" stroke="#000" stroke-width="18" opacity=".12"/><path d="M90 70 120 140" stroke="#000" stroke-width="12" opacity=".1"/></g>`;
    return { ow: 440, oh: 470, obj, fundo: o.fundo };
  }
  function moletom(m, o = {}) {
    const cor = o.cor || cx(m).tinta, tinta = hx(cor)[0] > 128 ? cx(m).tinta : cx(m).papel;
    const corpo = "M150 70 92 84 36 140 18 420 72 428 92 196 112 186V470Q240 486 368 470V186L388 196 408 428 462 420 444 140 388 84 330 70Z";
    const obj = chao(240, 486, 250, 26) + sombra(`<path d="M${corpo.slice(1)}" transform="translate(8 14)"/>`, .45) +
      `<path d="M160 78C150 6 330 6 320 78 300 110 180 110 160 78Z" fill="${claro(cor, .06)}"/>` +
      `<path d="M${corpo.slice(1)}" fill="${cor}"/>` +
      `<path d="M178 74C190 26 290 26 302 74 280 98 200 98 178 74Z" fill="${escuro(cor, .45)}"/>` +
      `<path d="M160 78C182 108 298 108 320 78" fill="none" stroke="${claro(cor, .1)}" stroke-width="8"/>` +
      `<path d="M214 100 206 176M266 100 274 176" stroke="${cx(m).slug === "vertice" ? "#CFC8BA" : claro(cor, .7)}" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M150 360H330L352 448H128Z" fill="${escuro(cor, .05)}" stroke="${escuro(cor, .35)}" stroke-width="2"/>` +
      `<path d="M20 398 74 406 72 428 18 420ZM406 406 460 398 462 420 408 428ZM112 446Q240 462 368 446V470Q240 486 112 470Z" fill="${escuro(cor, .18)}"/>` +
      Logo.caixa(m, "palavra", tinta, 140, 196, 200, 70) +
      `<path d="M${corpo.slice(1)}" fill="url(#g-luz-v)"/>` +
      `<g filter="url(#f-sombra-m)" fill="none" stroke-linecap="round"><path d="M100 160 70 400" stroke="#fff" stroke-width="16" opacity=".07"/><path d="M300 290C320 340 300 400 320 450" stroke="#000" stroke-width="20" opacity=".16"/></g>`;
    return { ow: 480, oh: 500, obj, fundo: o.fundo };
  }
  function avental(m) {
    const lona = "#1C1B1A", couro = "#7C4A25";
    const corpo = "M150 60H310V170L390 210V610Q230 632 70 610V210L150 170Z";
    const obj = chao(230, 630, 220, 22) + sombra(`<path d="${corpo}" transform="translate(8 14)"/>`, .5) +
      `<path d="M150 64C150 -20 310 -20 310 64" fill="none" stroke="${couro}" stroke-width="16"/>` +
      `<path d="${corpo}" fill="${lona}"/>` +
      `<path d="M70 214 6 250M390 214 454 250" stroke="${couro}" stroke-width="14" stroke-linecap="round"/>` +
      `<rect x="120" y="390" width="220" height="140" fill="${claro(lona, .04)}" stroke="#3a3836" stroke-width="2" stroke-dasharray="6 5"/><path d="M230 390V530" stroke="#3a3836" stroke-width="2" stroke-dasharray="6 5"/>` +
      `<rect x="150" y="64" width="160" height="6" fill="#3a3836"/>` +
      Logo.caixa(m, "simbolo", "#B87333", 195, 210, 70, 70, "#D99A5C") +
      t(230, 320, "MONARCH", P(m, { fs: 30, cor: "#B87333", anchor: "middle", ls: 4 })) +
      `<circle cx="150" cy="70" r="7" fill="url(#g-cobre)"/><circle cx="310" cy="70" r="7" fill="url(#g-cobre)"/>` +
      `<path d="${corpo}" fill="url(#g-luz-h)"/>` +
      `<g filter="url(#f-sombra-m)"><path d="M120 250C140 380 110 500 130 600" stroke="#fff" stroke-width="14" opacity=".05" fill="none"/></g>`;
    return { ow: 460, oh: 640, obj };
  }

  /* ---------- papel e embalagem ---------- */
  function sacolaPapel(m, o = {}) {
    const papel = o.papel || cx(m).papel, lado = escuro(papel, .22), dentro = escuro(papel, .4);
    const tinta = hx(papel)[0] + hx(papel)[1] > 300 ? (m.slug === "casa-botanica" ? "#2E2A1F" : cx(m).tinta) : (m.slug === "monarch" ? "#B87333" : cx(m).papel);
    const alca = o.fita ? `stroke="${cx(m).acento}" stroke-width="9"` : `stroke="${m.slug === "monarch" ? "#B87333" : escuro(papel, .5)}" stroke-width="5" stroke-linecap="round"`;
    const obj = chao(180, 472, 210, 24) + sombra(`<path d="M0 110H260L330 86V446L260 470H0Z" transform="translate(12 10)"/>`, .4) +
      `<path d="M120 88C120 0 262 0 262 88" fill="none" ${alca} opacity=".75"/>` +
      `<path d="M0 110 70 86H330L260 110Z" fill="${dentro}"/>` +
      `<path d="M260 110 330 86V446L260 470Z" fill="${lado}"/><path d="M295 98V458" stroke="#000" opacity=".12"/><path d="M260 470 295 430 330 446" fill="none" stroke="#000" opacity=".1"/>` +
      `<rect x="0" y="110" width="260" height="360" fill="${papel}"/>` +
      Logo.caixa(m, "principal", tinta, 40, 210, 180, 150, m.slug === "aurea" ? "#B99B6B" : tinta) +
      t(130, 446, m.contato.site, S(m, { fs: 11, cor: tinta, anchor: "middle", ls: 2, op: .7 })) +
      `<rect x="0" y="110" width="260" height="360" fill="url(#g-luz-h)"/>` +
      `<path d="M70 110C70 14 190 14 190 110" fill="none" ${alca}/>` +
      `<circle cx="70" cy="122" r="3" fill="${dentro}"/><circle cx="190" cy="122" r="3" fill="${dentro}"/>`;
    return { ow: 340, oh: 480, obj };
  }
  function caixa(m, o = {}) {
    const cor = o.cor || cx(m).fundo, topo = claro(cor, .1), lado = escuro(cor, .3);
    const tinta = o.tinta || (hx(cor)[0] > 128 ? cx(m).tinta : cx(m).papel);
    const x = 40, y = 160, w = 320, h = 210, D = 300, dx = 150, dy = 110;
    const face = `<path d="M${x} ${y}H${x + w}L${x + w + dx} ${y - dy}V${y + h - dy}L${x + w} ${y + h}H${x}Z"/>`;
    const fr = o.dourado ? `<rect x="${x + 16}" y="${y + 16}" width="${w - 32}" height="${h - 32}" fill="none" stroke="url(#g-ouro)" stroke-width="1.5"/>` : "";
    const obj = chao(290, 380, 270, 26, .6) + sombra(face.replace("/>", ` transform="translate(14 14)"/>`), .45) +
      `<path d="M${x} ${y}H${x + w}L${x + w + dx} ${y - dy}H${x + dx}Z" fill="${topo}"/>` +
      `<g transform="matrix(1 0 ${-dx / D} ${dy / D} ${x + dx} ${y - dy})">${Logo.caixa(m, "simbolo", o.dourado ? "url(#g-ouro)" : tinta, w / 2 - 50, D / 2 - 50, 100, 100)}</g>` +
      `<path d="M${x + w} ${y}L${x + w + dx} ${y - dy}V${y + h - dy}L${x + w} ${y + h}Z" fill="${lado}"/>` +
      `<g transform="matrix(${dx / D} ${-dy / D} 0 1 ${x + w} ${y})">${t(D / 2, h / 2 + 5, m.contato.site, S(m, { fs: 14, cor: tinta, anchor: "middle", ls: 3, op: .8 }))}</g>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cor}"/>` + fr +
      Logo.caixa(m, m.slug === "vertice" || m.slug === "pulse" ? "palavra" : "principal", o.dourado ? "url(#g-ouro)" : tinta, x + 60, y + 40, w - 120, h - 80, o.dourado ? "url(#g-ouro)" : (m.slug === "monarch" ? "#D99A5C" : tinta)) +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#g-luz-h)" opacity=".7"/>` +
      `<path d="M${x} ${y}H${x + w}L${x + w + dx} ${y - dy}" fill="none" stroke="#fff" stroke-opacity=".18"/>` +
      (m.slug === "vertice" ? `<path d="M${x} ${y + 26}H${x + w}" stroke="#000" opacity=".35"/>` : "");
    return { ow: 540, oh: 400, obj };
  }
  function cartoes(m) {
    const d = D(m), te = cx(m), W = 350, H = 200;
    const verso = `<rect width="${W}" height="${H}" rx="4" fill="${d.fundo}"/>${Logo.caixa(m, "principal", d.logo, 85, 40, 180, 120, d.c2)}<rect width="${W}" height="${H}" rx="4" fill="url(#g-luz-h)" opacity=".6"/>`;
    const frente = `<rect width="${W}" height="${H}" rx="4" fill="${te.papel}"/>` +
      Logo.caixa(m, "horizontal", te.tinta, 26, 26, 120, 34, m.slug === "monarch" || m.slug === "nord" ? te.acento : (m.slug === "pulse" ? "#2F5BFF" : te.tinta)) +
      t(26, 130, m.contato.pessoa, S(m, { fs: 15, peso: 700, cor: te.tinta })) +
      t(26, 150, m.contato.cargo, S(m, { fs: 11, cor: te.tinta, op: .65 })) +
      t(W - 26, 150, m.contato.site, S(m, { fs: 10.5, cor: te.tinta, anchor: "end", op: .75 })) +
      t(W - 26, 170, m.contato.social, S(m, { fs: 10.5, cor: te.tinta, anchor: "end", op: .75 })) +
      `<rect x="26" y="168" width="22" height="2.5" fill="${te.acento}"/>` +
      `<rect width="${W}" height="${H}" rx="4" fill="url(#g-luz-h)" opacity=".35"/>`;
    const card = (tr, c) => sombra(`<rect width="${W}" height="${H}" rx="4" transform="translate(6 10)"/>`, .45, "f-sombra-m").replace("<g ", `<g transform="${tr}" `) + `<g transform="${tr}">${c}</g>`;
    const obj = card("translate(40 70) rotate(-8 175 100)", verso) + card("translate(250 210) rotate(5 175 100)", frente);
    return { ow: 640, oh: 450, obj };
  }
  function etiqueta(m) {
    const te = cx(m), cor = te.claro ? te.superficie : te.acento, tinta = te.tinta;
    const tag = "M24 0H176L200 24V320H0V24Z";
    const obj = sombra(`<path d="${tag}" transform="translate(70 150) rotate(-7 100 160) translate(6 12)"/>`, .4, "f-sombra-m") +
      `<path d="M170 168C150 90 90 60 20 20" fill="none" stroke="${m.slug === "aurea" ? "#B99B6B" : escuro(cor, .5)}" stroke-width="2.4"/>` +
      `<g transform="translate(70 150) rotate(-7 100 160)"><path d="${tag}" fill="${cor}"/>` +
      `<circle cx="100" cy="28" r="9" fill="${escuro(cor, .55)}"/><circle cx="100" cy="28" r="9" fill="none" stroke="${m.slug === "aurea" ? "url(#g-ouro)" : "#9a9a9a"}" stroke-width="3"/>` +
      Logo.caixa(m, "simbolo", tinta, 60, 70, 80, 80, m.slug === "aurea" ? "#B99B6B" : tinta) +
      t(100, 186, m.nome.toUpperCase(), P(m, { fs: m.slug === "vertice" ? 22 : 20, cor: tinta, anchor: "middle", ls: m.slug === "aurea" ? 6 : 1 })) +
      `<path d="M30 214H170" stroke="${tinta}" opacity=".25"/>` +
      t(30, 240, m.slug === "vertice" ? "TAM. M" : "KIT RITUAL", S(m, { fs: 11, cor: tinta, peso: 700, ls: 1 })) +
      t(30, 258, m.slug === "vertice" ? "100% ALGODÃO" : "Sérum + loção + creme", S(m, { fs: 10, cor: tinta, op: .75 })) +
      t(30, 276, m.slug === "vertice" ? "COD. VTC-0126" : "Feito no Brasil", S(m, { fs: 10, cor: tinta, op: .75 })) +
      `<path d="${tag}" fill="url(#g-luz-v)" opacity=".7"/></g>` +
      /* etiqueta tecida */
      sombra(`<rect x="330" y="300" width="170" height="64" transform="rotate(9 415 332) translate(4 8)"/>`, .35, "f-sombra-m") +
      `<g transform="rotate(9 415 332)"><rect x="330" y="300" width="170" height="64" fill="${te.tinta}"/><rect x="336" y="306" width="158" height="52" fill="none" stroke="${te.papel}" stroke-opacity=".25" stroke-dasharray="2 3"/>` +
      Logo.caixa(m, "palavra", te.papel, 350, 314, 130, 36, m.slug === "aurea" ? "#B99B6B" : te.papel) +
      `<rect x="330" y="300" width="170" height="64" fill="url(#g-luz-v)"/></g>`;
    return { ow: 540, oh: 500, obj };
  }
  function papelaria(m) {
    const te = cx(m), A4 = { w: 420, h: 594 };
    const barras = (x, y, n, w) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * 14}" width="${w * (i % 4 === 3 ? .6 : 1)}" height="4" fill="${te.tinta}" opacity=".16"/>`).join("");
    const folha = `<rect width="${A4.w}" height="${A4.h}" fill="#F7F5F1"/>` + Logo.caixa(m, "horizontal", te.tinta, 36, 40, 150, 40, te.acento) +
      t(A4.w - 36, 56, "São Paulo, 12 de março", S(m, { fs: 9, cor: te.tinta, anchor: "end", op: .6 })) +
      t(36, 140, "Proposta · Casa Ipê", P(m, { fs: 20, cor: te.tinta })) + barras(36, 170, 8, 340) + barras(36, 300, 6, 340) + barras(36, 400, 5, 300) +
      `<path d="M36 540H${A4.w - 36}" stroke="${te.tinta}" opacity=".2"/>` + t(36, 560, `${m.contato.site}   ${m.contato.social}`, S(m, { fs: 8.5, cor: te.tinta, op: .6, ls: 1 })) +
      `<rect x="${A4.w - 46}" y="552" width="10" height="10" fill="${te.acento}"/>`;
    const env = `<rect width="460" height="230" fill="#ECE9E2"/><path d="M0 0 230 130 460 0" fill="none" stroke="#000" opacity=".08"/>` + Logo.caixa(m, "simbolo", te.tinta, 30, 30, 40, 40, te.acento) + barras(280, 140, 3, 140);
    const lapis = `<rect x="0" y="0" width="420" height="16" fill="#2D2B28"/><path d="M420 0 452 8 420 16Z" fill="#E2C9A6"/><path d="M444 6 452 8 444 10Z" fill="#2D2B28"/><rect x="0" y="0" width="420" height="5" fill="#fff" opacity=".12"/>` + t(30, 12, "NÓRD 2B", S(m, { fs: 8, cor: "#C9B48A", ls: 2 }));
    const obj = sombra(`<rect width="${A4.w}" height="${A4.h}" transform="translate(60 40) rotate(-3) translate(8 12)"/>`, .3) + `<g transform="translate(60 40) rotate(-3)">${folha}<rect width="${A4.w}" height="${A4.h}" fill="url(#g-luz-h)" opacity=".25"/></g>` +
      sombra(`<rect width="460" height="230" transform="translate(470 70) rotate(5) translate(8 12)"/>`, .3) + `<g transform="translate(470 70) rotate(5)">${env}<rect width="460" height="230" fill="url(#g-luz-h)" opacity=".3"/></g>` +
      cartoes(m).obj.replace(/^/, `<g transform="translate(470 330) scale(.82)">`) + "</g>" +
      sombra(`<g transform="translate(400 640) rotate(-24)"><rect width="452" height="16"/></g>`, .35, "f-sombra-p") + `<g transform="translate(392 630) rotate(-24)">${lapis}</g>`;
    return { ow: 1000, oh: 720, obj };
  }
  function folder(m) {
    const te = cx(m);
    const capa = (fundo, linha) => `<rect width="360" height="480" fill="${fundo}"/>` +
      `<g stroke="${linha}" stroke-width="1" opacity=".55" fill="none"><rect x="40" y="70" width="280" height="220"/><path d="M40 170H200V290M200 70V130M260 170H320M40 230H120"/><path d="M200 130A40 40 0 0 1 240 170" stroke-dasharray="3 3"/></g>` +
      t(40, 330, "Projetos 2021 — 2026", P(m, { fs: 22, cor: linha })) + Logo.caixa(m, "horizontal", linha, 40, 404, 150, 40, te.acento);
    const obj = chao(330, 590, 300, 24) +
      sombra(`<rect width="360" height="480" transform="translate(290 70) rotate(6) translate(8 12)"/>`, .3) + `<g transform="translate(290 70) rotate(6)">${capa("#2D2B28", "#F2F0EB")}<rect width="360" height="480" fill="url(#g-luz-h)" opacity=".4"/></g>` +
      sombra(`<rect width="360" height="480" transform="translate(60 90) rotate(-4) translate(8 12)"/>`, .35) + `<g transform="translate(60 90) rotate(-4)">${capa("#F7F5F1", "#2D2B28")}<rect width="12" height="480" fill="#000" opacity=".06"/><rect width="360" height="480" fill="url(#g-luz-h)" opacity=".3"/></g>`;
    return { ow: 700, oh: 620, obj };
  }

  /* ---------- cosméticos e produtos ---------- */
  function contaGotas(m, x, y, s = 1, corpo = "#8C6A55", rot = "#F5EEE4") {
    return `<g transform="translate(${x} ${y}) scale(${s})">` + chao(70, 300, 90, 14, .6) +
      `<rect x="48" y="0" width="44" height="80" rx="20" fill="#E8DCCB"/><rect x="48" y="0" width="44" height="80" rx="20" fill="url(#g-cil)"/>` +
      `<rect x="40" y="70" width="60" height="42" rx="4" fill="url(#g-ouro)"/><rect x="40" y="70" width="60" height="42" rx="4" fill="url(#g-cil)" opacity=".6"/>` +
      `<path d="M40 112H100L132 140V286Q132 300 118 300H22Q8 300 8 286V140Z" fill="${corpo}"/>` +
      `<rect x="22" y="170" width="96" height="104" fill="${rot}"/>` + Logo.caixa(m, "simbolo", "#8C6A55", 55, 178, 30, 30, "#B99B6B") +
      t(70, 226, "AURÉA", P(m, { fs: 13, cor: "#3D2E25", anchor: "middle", ls: 3 })) + t(70, 244, "Sérum Aurora", S(m, { fs: 8, cor: "#3D2E25", anchor: "middle" })) + t(70, 260, "30 ml", S(m, { fs: 7, cor: "#3D2E25", anchor: "middle", op: .6 })) +
      `<path d="M40 112H100L132 140V286Q132 300 118 300H22Q8 300 8 286V140Z" fill="url(#g-cil)"/><path d="M20 146V284" stroke="#fff" stroke-width="5" opacity=".28" stroke-linecap="round"/></g>`;
  }
  function frascos(m) {
    const bomba = `<g transform="translate(250 40)">` + chao(80, 470, 100, 14, .6) +
      `<rect x="40" y="0" width="70" height="20" rx="4" fill="#E3D3BF"/><rect x="110" y="4" width="40" height="10" rx="3" fill="#E3D3BF"/><rect x="66" y="20" width="18" height="30" fill="#D4C2AB"/>` +
      `<rect x="44" y="48" width="62" height="44" rx="4" fill="url(#g-ouro)"/><rect x="0" y="90" width="150" height="380" rx="26" fill="#E3D3BF"/>` +
      Logo.caixa(m, "vertical", "#3D2E25", 25, 170, 100, 120, "#B99B6B") + t(75, 340, "Loção Facial", S(m, { fs: 11, cor: "#3D2E25", anchor: "middle", ls: 1 })) + t(75, 358, "Hidratação leve", S(m, { fs: 9, cor: "#3D2E25", anchor: "middle", op: .6 })) +
      `<rect x="0" y="90" width="150" height="380" rx="26" fill="url(#g-cil)"/><rect x="44" y="48" width="62" height="44" fill="url(#g-cil)" opacity=".6"/></g>`;
    const obj = contaGotas(m, 40, 210) + bomba + pote(m, 420, 330, .9).obj;
    return { ow: 660, oh: 530, obj };
  }
  function pote(m, x = 0, y = 0, s = 1) {
    const obj = `<g transform="translate(${x} ${y}) scale(${s})">` + chao(110, 214, 140, 18, .6) +
      `<path d="M10 70H210V196Q210 214 192 214H28Q10 214 10 196Z" fill="#F5EEE4"/>` +
      Logo.caixa(m, "palavra", "#8C6A55", 50, 112, 120, 30) + t(110, 168, "Creme Facial Noturno · 50 g", S(m, { fs: 9, cor: "#3D2E25", anchor: "middle", op: .7 })) +
      `<path d="M10 70H210V196Q210 214 192 214H28Q10 214 10 196Z" fill="url(#g-cil)"/>` +
      `<rect x="0" y="20" width="220" height="56" rx="10" fill="url(#g-ouro)"/><rect x="0" y="20" width="220" height="56" rx="10" fill="url(#g-cil)" opacity=".7"/>` +
      `<ellipse cx="110" cy="22" rx="110" ry="14" fill="#D9C08F"/>${Logo.caixa(m, "simbolo", "#8C6A55", 92, 10, 36, 22)}</g>`;
    return { ow: 260, oh: 260, obj };
  }
  function lata(m, x = 0, y = 0, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})">` + chao(150, 150, 170, 22, .7) +
      `<path d="M10 70V130A140 30 0 0 0 290 130V70Z" fill="#1A1918"/><path d="M10 70V130A140 30 0 0 0 290 130V70Z" fill="url(#g-cil)"/>` +
      `<path d="M10 92A140 30 0 0 0 290 92" fill="none" stroke="#B87333" stroke-width="2"/>` +
      `<ellipse cx="150" cy="70" rx="140" ry="34" fill="url(#g-cobre)"/><ellipse cx="150" cy="70" rx="122" ry="28" fill="none" stroke="#7C4A25" stroke-width="1.5"/>` +
      `<g transform="translate(150 70) scale(1 .27) translate(-150 -70)">${Logo.caixa(m, "simbolo", "#4A2A14", 100, -10, 100, 100)}</g>` +
      t(150, 122, "POMADA MATTE · 100 G", S(m, { fs: 12, cor: "#B87333", anchor: "middle", ls: 2, peso: 600 })) + `</g>`;
  }
  function produtos(m) {
    const oleo = `<g transform="translate(340 20)">` + chao(70, 330, 90, 14, .7) +
      `<rect x="50" y="0" width="40" height="70" rx="16" fill="#111"/><rect x="42" y="64" width="56" height="40" rx="4" fill="url(#g-cobre)"/>` +
      `<path d="M42 104H98L134 140V310Q134 330 114 330H26Q6 330 6 310V140Z" fill="#3A2414"/>` +
      `<rect x="18" y="160" width="104" height="130" fill="#0F0F0F"/>` + Logo.caixa(m, "simbolo", "#B87333", 50, 172, 40, 40, "#D99A5C") +
      t(70, 236, "MONARCH", P(m, { fs: 15, cor: "#F3EEE6", anchor: "middle", ls: 2 })) + t(70, 256, "ÓLEO PARA BARBA", S(m, { fs: 10, cor: "#B87333", anchor: "middle", ls: 1.5, peso: 600 })) + t(70, 274, "CEDRO E TABACO · 30 ML", S(m, { fs: 8, cor: "#F3EEE6", anchor: "middle", op: .6 })) +
      `<path d="M42 104H98L134 140V310Q134 330 114 330H26Q6 330 6 310V140Z" fill="url(#g-cil)"/></g>`;
    const pente = `<g transform="translate(40 330) rotate(-6)">` + sombra(`<rect width="280" height="40" rx="6" transform="translate(4 8)"/>`, .5, "f-sombra-p") +
      `<rect width="280" height="40" rx="6" fill="#7C4A25"/>${Array.from({ length: 34 }, (_, i) => `<rect x="${10 + i * 8}" y="22" width="4" height="${i < 17 ? 18 : 12}" fill="#2a1a0e"/>`).join("")}<rect width="280" height="14" rx="6" fill="#fff" opacity=".1"/></g>`;
    const obj = lata(m, 0, 120) + oleo + pente;
    return { ow: 500, oh: 400, obj };
  }
  function copo(m, x, y, s, cor, tinta, cinta) {
    const corpo = "M10 60H190L172 330Q170 344 156 344H44Q30 344 28 330Z";
    return `<g transform="translate(${x} ${y}) scale(${s})">` + chao(100, 346, 110, 16, .6) +
      `<path d="${corpo}" fill="${cor}"/>` +
      (cinta ? `<path d="M18 150H182L174 260H26Z" fill="#B8916A"/>` + Logo.caixa(m, "simbolo", "#2E2A1F", 76, 168, 48, 48) + t(100, 244, "do pé à xícara", P(m, { fs: 13, cor: "#2E2A1F", anchor: "middle" })) : Logo.caixa(m, "principal", tinta, 40, 130, 120, 150, "#A7AD80")) +
      `<path d="${corpo}" fill="url(#g-cil)"/>` +
      `<rect x="0" y="40" width="200" height="24" rx="8" fill="#F4EEE2"/><path d="M14 40Q20 8 100 6Q180 8 186 40Z" fill="#EAE2D2"/><rect x="0" y="40" width="200" height="24" rx="8" fill="url(#g-cil)" opacity=".7"/><path d="M14 40Q20 8 100 6Q180 8 186 40Z" fill="url(#g-cil)" opacity=".5"/><ellipse cx="128" cy="20" rx="14" ry="5" fill="#cfc6b4"/></g>`;
  }
  function copos(m) {
    const obj = copo(m, 30, 60, 1.18, "#5C6338", "#EDE3D0") + copo(m, 300, 150, .92, "#EDE3D0", "#5C6338", true) +
      `<g transform="translate(520 330)">${chao(70, 116, 90, 12, .6)}<ellipse cx="70" cy="100" rx="70" ry="16" fill="#E9E1D2"/><path d="M14 30H126L116 96Q70 112 24 96Z" fill="#EDE3D0"/><path d="M14 30H126L116 96Q70 112 24 96Z" fill="url(#g-cil)"/><path d="M126 46C150 46 152 80 120 80" fill="none" stroke="#E3D9C6" stroke-width="9"/><ellipse cx="70" cy="30" rx="56" ry="12" fill="#6A4630"/><path d="M58 28C64 20 76 20 82 28C76 34 64 34 58 28Z" fill="#EDE3D0" opacity=".85"/>${Logo.caixa(m, "simbolo", "#5C6338", 54, 50, 32, 32)}</g>`;
    return { ow: 680, oh: 500, obj };
  }
  function pouch(m) {
    const kraft = "#B8916A";
    const forma = "M20 30H300V440Q300 470 270 470H50Q20 470 20 440Z";
    const graos = [[360, 420, 20], [400, 450, -30], [330, 460, 60], [430, 400, 10], [-10, 452, 40], [30, 480, -10]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="14" ry="10" fill="#4a2e1d"/><path d="M-12 0Q0 4 12 0" stroke="#2a1a0f" stroke-width="2" fill="none"/><ellipse rx="14" ry="10" fill="url(#g-luz-v)"/></g>`).join("");
    const obj = chao(170, 474, 200, 22, .6) + sombra(`<path d="${forma}" transform="translate(10 12)"/>`, .4) +
      `<path d="${forma}" fill="${kraft}"/><path d="M20 30H300V52H20Z" fill="${escuro(kraft, .12)}"/><path d="M20 30${Array.from({ length: 28 }, (_, i) => `L${30 + i * 10} ${i % 2 ? 30 : 22}`).join("")}L300 30Z" fill="${kraft}"/>` +
      `<path d="M30 76H290" stroke="#000" opacity=".12"/>` +
      `<rect x="60" y="130" width="200" height="270" rx="100" fill="#EDE3D0"/>` + Logo.caixa(m, "vertical", "#5C6338", 100, 160, 120, 140, "#5C6338") +
      t(160, 336, "Café em grãos", S(m, { fs: 12, cor: "#2E2A1F", anchor: "middle", peso: 700 })) + t(160, 354, "Torra média · 250 g", S(m, { fs: 10, cor: "#2E2A1F", anchor: "middle", op: .7 })) +
      `<circle cx="160" cy="100" r="11" fill="${escuro(kraft, .2)}"/><circle cx="160" cy="100" r="5" fill="${escuro(kraft, .4)}"/>` +
      `<path d="${forma}" fill="url(#g-luz-h)"/><path d="M20 440Q160 420 300 440" fill="none" stroke="#000" opacity=".14"/>` + graos;
    return { ow: 460, oh: 500, obj };
  }
  function potes(m) {
    const sabores = [["Jabuticaba", "#3B1E2B"], ["Laranja", "#C0662A"], ["Figo", "#5A2E3C"]];
    const obj = sabores.map(([s, c], i) => {
      const x = i * 180, y = i === 1 ? 0 : 40;
      return `<g transform="translate(${x} ${y})">` + chao(80, 340, 92, 14, .6) +
        `<rect x="10" y="90" width="140" height="250" rx="22" fill="${c}"/><rect x="10" y="90" width="140" height="250" rx="22" fill="url(#g-cil)"/><path d="M28 110V320" stroke="#fff" stroke-width="7" opacity=".3" stroke-linecap="round"/>` +
        `<rect x="18" y="56" width="124" height="40" rx="6" fill="#6A4630"/>` +
        `<path d="M0 70Q80 30 160 70L150 104Q80 90 10 104Z" fill="#EDE3D0"/><path d="M8 96Q80 84 152 96" stroke="#6A4630" stroke-width="3" fill="none"/>` +
        `<path d="M24 160H136V290H24Z" fill="#EDE3D0"/><path d="M24 160Q80 130 136 160" fill="#EDE3D0"/>` + Logo.caixa(m, "simbolo", "#5C6338", 62, 148, 36, 36) +
        t(80, 214, "Geleia de", S(m, { fs: 10, cor: "#2E2A1F", anchor: "middle" })) + t(80, 236, s, P(m, { fs: 17, cor: "#5C6338", anchor: "middle" })) + t(80, 270, "lote 07 · 240 g", S(m, { fs: 8.5, cor: "#2E2A1F", anchor: "middle", op: .6 })) + `</g>`;
    }).join("");
    return { ow: 520, oh: 400, obj };
  }
  function cardapio(m) {
    const itens = [["Coado da casa", "9"], ["Espresso", "7"], ["Latte de cardamomo", "16"], ["Cold brew com laranja", "15"]];
    const pao = [["Pão de fermentação lenta", "14"], ["Torrada com geleia", "18"], ["Bolo de fubá", "11"]];
    const lista = (arr, y) => arr.map(([n, p], i) => t(40, y + i * 30, n, S(m, { fs: 14, cor: "#2E2A1F" })) + `<path d="M${50 + n.length * 7} ${y + i * 30 - 4}H330" stroke="#2E2A1F" stroke-dasharray="1 4" opacity=".4"/>` + t(380, y + i * 30, p, S(m, { fs: 14, peso: 700, cor: "#2E2A1F", anchor: "end" }))).join("");
    const folha = `<rect width="420" height="600" fill="#F2EADB"/>` + Logo.caixa(m, "vertical", "#5C6338", 150, 30, 120, 130) +
      t(40, 210, "Cafés", P(m, { fs: 24, cor: "#5C6338" })) + lista(itens, 246) + t(40, 390, "Da padaria", P(m, { fs: 24, cor: "#5C6338" })) + lista(pao, 426) +
      `<g opacity=".5">${ramo("#A7AD80", 320, 520, .8, -20)}</g>` + t(40, 570, "Abertos todos os dias, 7h às 19h", S(m, { fs: 10, cor: "#2E2A1F", op: .6 })) + `<rect width="420" height="600" fill="url(#g-luz-h)" opacity=".25"/>`;
    const obj = sombra(`<rect width="420" height="600" transform="translate(40 20) rotate(-4) translate(8 14)"/>`, .45) + `<g transform="translate(40 20) rotate(-4)">${folha}</g>` +
      `<g transform="translate(520 330)">${chao(80, 140, 120, 30, .6)}<circle cx="80" cy="80" r="92" fill="#E9E1D2"/><circle cx="80" cy="80" r="92" fill="url(#g-luz-v)" opacity=".5"/><circle cx="80" cy="80" r="60" fill="#EDE3D0"/><circle cx="80" cy="80" r="48" fill="#6A4630"/><path d="M80 52C96 64 96 80 80 100C64 80 64 64 80 52Z" fill="#EDE3D0" opacity=".85"/><path d="M80 60V96" stroke="#6A4630" stroke-width="2"/></g>`;
    return { ow: 760, oh: 660, obj };
  }

  /* ---------- telas ---------- */
  function celular(conteudo, w = 312, h = 652) {
    const id = uid("cl");
    return sombra(`<rect x="0" y="0" width="${w + 28}" height="${h + 28}" rx="50" transform="translate(10 20)"/>`, .5) +
      `<rect x="0" y="0" width="${w + 28}" height="${h + 28}" rx="50" fill="#0b0b0d"/><rect x="2" y="2" width="${w + 24}" height="${h + 24}" rx="48" fill="none" stroke="#3a3b40" stroke-width="2"/>` +
      `<svg x="14" y="14" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><clipPath id="${id}"><rect width="${w}" height="${h}" rx="38"/></clipPath><g clip-path="url(#${id})">${conteudo}</g></svg>` +
      `<rect x="${(w + 28) / 2 - 46}" y="26" width="92" height="26" rx="13" fill="#000"/>` +
      `<path d="M30 14H${w - 2}" stroke="#fff" opacity=".08"/>`;
  }
  function laptop(conteudo, w = 640, h = 400) {
    return chao(450, 494, 440, 18, .6) +
      `<rect x="110" y="20" width="${w + 40}" height="${h + 40}" rx="18" fill="#17181b"/><rect x="111" y="21" width="${w + 38}" height="${h + 38}" rx="17" fill="none" stroke="#3a3b40"/>` +
      `<svg x="130" y="40" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${conteudo}</svg>` +
      `<path d="M130 40H${130 + w}L${130 + w * .55} ${40 + h}H130Z" fill="#fff" opacity=".035"/>` +
      `<path d="M60 460H840L812 488Q806 494 790 494H110Q94 494 88 488Z" fill="url(#g-aluminio)"/><path d="M370 460H530Q526 470 512 470H388Q374 470 370 460Z" fill="#9a9da3"/>`;
  }
  /* cabeçalho de site comum, com o logo da marca */
  function siteTopo(m, w, mobile) {
    const te = cx(m);
    return `<rect width="${w}" height="${mobile ? 92 : 44}" fill="${te.fundo}"/>` +
      Logo.caixa(m, "horizontal", te.texto, mobile ? 20 : 24, mobile ? 50 : 12, mobile ? 100 : 90, mobile ? 28 : 22, te.acento) +
      (mobile ? `<path d="M${w - 44} 58h22M${w - 44} 66h22M${w - 44} 74h22" stroke="${te.texto}" stroke-width="2"/>` :
        ["Início", "Sobre", "Coleção", "Contato"].map((l, i) => t(w - 280 + i * 66, 27, l, S(m, { fs: 9.5, cor: te.texto, op: .8 }))).join(""));
  }
  /* objeto que aparece no destaque de cada site */
  const HEROI = { vertice: (m) => camiseta(m, { cor: "#F1EFEA", estampa: "frente" }), aurea: (m) => frascos(m), monarch: (m) => produtos(m), nord: (m) => folder(m), pulse: (m) => ({ ow: 400, oh: 260, obj: graficos(m, 400, 260) }), "casa-botanica": (m) => copos(m) };
  function encaixe(p, x, y, w, h) { return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${p.ow} ${p.oh}" preserveAspectRatio="xMidYMid meet" overflow="visible">${p.obj}</svg>`; }
  function telaSite(m, w, h, mobile) {
    const te = cx(m), heroi = HEROI[m.slug](m);
    const titulo = P(m, { cor: te.texto, fs: larga(m) ? (mobile ? 24 : 26) : (mobile ? 30 : 34) });
    if (mobile) return `<rect width="${w}" height="${h}" fill="${te.fundo}"/>` + siteTopo(m, w, true) +
      linhas(20, 150, m.tagline, cabe(m, 272, titulo.fs), 36, titulo) +
      t(20, 250, m.curto.split(":")[0] + ".", S(m, { fs: 11, cor: te.texto, op: .7 })) +
      `<rect x="20" y="272" width="140" height="40" rx="${m.slug === "pulse" ? 20 : 2}" fill="${te.acento}"/>` + t(90, 297, m.story.botao, S(m, { fs: 11, peso: 700, cor: te.claro ? "#fff" : te.tinta, anchor: "middle" })) +
      `<rect x="20" y="336" width="${w - 40}" height="280" fill="${te.superficie}"/>` + encaixe(heroi, 40, 356, w - 80, 240);
    return `<rect width="${w}" height="${h}" fill="${te.fundo}"/>` + siteTopo(m, w, false) +
      linhas(40, 120, m.tagline, cabe(m, 280, titulo.fs), 40, titulo) +
      linhas(40, 230, m.conceito.split(".")[0] + ".", 52, 16, S(m, { fs: 10.5, cor: te.texto, op: .7 })) +
      `<rect x="40" y="290" width="140" height="38" rx="${m.slug === "pulse" ? 19 : 2}" fill="${te.acento}"/>` + t(110, 314, m.story.botao, S(m, { fs: 11, peso: 700, cor: te.claro ? "#fff" : te.tinta, anchor: "middle" })) +
      `<rect x="340" y="64" width="270" height="310" fill="${te.superficie}"/>` + encaixe(heroi, 356, 84, 238, 270);
  }
  function graficos(m, w, h) {
    const pts = [0, 30, 22, 50, 38, 34, 62, 54, 48, 80, 70, 92].map((v, i) => `${(i / 11) * w},${h - 40 - v * (h - 80) / 100}`).join(" ");
    return `<g stroke="#2F5BFF" stroke-opacity=".18">${Array.from({ length: 5 }, (_, i) => `<path d="M0 ${20 + i * (h - 40) / 4}H${w}"/>`).join("")}</g>` +
      `<polyline points="${pts} ${w},${h} 0,${h}" fill="#2F5BFF" opacity=".16"/><polyline points="${pts}" fill="none" stroke="#2F5BFF" stroke-width="4" stroke-linejoin="round"/>` +
      `<circle cx="${w}" cy="${h - 40 - 92 * (h - 80) / 100}" r="8" fill="#fff"/><circle cx="${w}" cy="${h - 40 - 92 * (h - 80) / 100}" r="18" fill="none" stroke="#2F5BFF" stroke-width="2"/>`;
  }
  function telaApp(m, w, h) {
    const te = cx(m);
    if (m.slug === "monarch") {
      const serv = [["Corte clássico", "45 min", "R$ 70"], ["Barba com toalha quente", "30 min", "R$ 55"], ["Corte + barba", "75 min", "R$ 115"]];
      return `<rect width="${w}" height="${h}" fill="#0F0F0F"/>` + Logo.caixa(m, "simbolo", "#B87333", w / 2 - 22, 56, 44, 44, "#D99A5C") +
        t(w / 2, 136, "Agende seu horário", P(m, { fs: 22, cor: "#F3EEE6", anchor: "middle" })) +
        serv.map(([a, b, c], i) => `<rect x="18" y="${166 + i * 74}" width="${w - 36}" height="62" rx="6" fill="${i === 2 ? "#B87333" : "#1E1D1C"}"/>` + t(34, 194 + i * 74, a, S(m, { fs: 14, peso: 600, cor: i === 2 ? "#0F0F0F" : "#F3EEE6" })) + t(34, 214 + i * 74, b, S(m, { fs: 11, cor: i === 2 ? "#0F0F0F" : "#A39C92" })) + t(w - 34, 204 + i * 74, c, S(m, { fs: 16, peso: 600, cor: i === 2 ? "#0F0F0F" : "#B87333", anchor: "end" }))).join("") +
        t(18, 412, "SEXTA, 14 DE MARÇO", S(m, { fs: 11, cor: "#A39C92", ls: 2, peso: 600 })) +
        ["09:00", "10:30", "13:00", "15:30", "17:00", "18:30"].map((h2, i) => `<rect x="${18 + (i % 3) * 94}" y="${428 + Math.floor(i / 3) * 48}" width="86" height="38" rx="4" fill="none" stroke="${i === 3 ? "#B87333" : "#3a3836"}" stroke-width="${i === 3 ? 2 : 1}"/>` + t(61 + (i % 3) * 94, 452 + Math.floor(i / 3) * 48, h2, S(m, { fs: 13, cor: i === 3 ? "#B87333" : "#F3EEE6", anchor: "middle", peso: 600 }))).join("") +
        `<rect x="18" y="${h - 84}" width="${w - 36}" height="52" rx="4" fill="#F3EEE6"/>` + t(w / 2, h - 52, "CONFIRMAR 15:30", S(m, { fs: 14, peso: 600, cor: "#0F0F0F", anchor: "middle", ls: 2 }));
    }
    /* pulse: painel em tempo real */
    return `<rect width="${w}" height="${h}" fill="#07080D"/>` + Logo.caixa(m, "simbolo", "#FFFFFF", 20, 52, 30, 30, "#2F5BFF") + `<circle cx="${w - 34}" cy="67" r="14" fill="#161A26"/>` +
      t(20, 120, "Bom dia, Leo", S(m, { fs: 12, cor: "#8C93A8" })) + t(20, 156, "12.480", P(m, { fs: 34, cor: "#FFFFFF" })) + t(20, 178, "eventos por minuto  +8,2%", S(m, { fs: 10, cor: "#A9BCFF" })) +
      `<rect x="16" y="196" width="${w - 32}" height="170" rx="16" fill="#161A26"/><svg x="30" y="210" width="${w - 60}" height="140" viewBox="0 0 280 140">${graficos(m, 280, 140)}</svg>` +
      [["Latência", "38 ms"], ["Nós ativos", "214"]].map(([a, b], i) => `<rect x="${16 + i * ((w - 40) / 2 + 8)}" y="380" width="${(w - 40) / 2}" height="90" rx="16" fill="${i ? "#2F5BFF" : "#161A26"}"/>` + t(30 + i * ((w - 40) / 2 + 8), 408, a, S(m, { fs: 10, cor: i ? "#fff" : "#8C93A8" })) + t(30 + i * ((w - 40) / 2 + 8), 446, b, P(m, { fs: 22, cor: "#fff" }))).join("") +
      `<rect x="16" y="484" width="${w - 32}" height="110" rx="16" fill="#161A26"/>` + ["api-gateway", "checkout", "auth"].map((s, i) => `<circle cx="36" cy="${514 + i * 30}" r="5" fill="${i === 1 ? "#A9BCFF" : "#2F5BFF"}"/>` + t(50, 518 + i * 30, s, S(m, { fs: 11, cor: "#fff" })) + t(w - 32, 518 + i * 30, ["99,99%", "99,97%", "100%"][i], S(m, { fs: 11, cor: "#8C93A8", anchor: "end" }))).join("") +
      `<rect x="${w / 2 - 60}" y="${h - 14}" width="120" height="4" rx="2" fill="#fff" opacity=".5"/>`;
  }
  function telaSlide(m, w, h) {
    const te = cx(m);
    if (m.slug === "pulse") return `<rect width="${w}" height="${h}" fill="#07080D"/>` + apoioOndas(m, w, h, .5) +
      t(40, 60, "PULSE · DECK 2026", S(m, { fs: 10, cor: "#A9BCFF", ls: 2 })) + linhas(40, 150, "Dados em tempo real para times que decidem rápido.", 22, 40, P(m, { fs: 30, cor: "#fff" })) +
      [["4,2 mi", "eventos/dia"], ["214", "clientes"], ["99,99%", "disponibilidade"]].map(([a, b], i) => t(40 + i * 180, 330, a, P(m, { fs: 26, cor: i === 0 ? "#2F5BFF" : "#fff" })) + t(40 + i * 180, 352, b, S(m, { fs: 10, cor: "#8C93A8" }))).join("") + Logo.caixa(m, "horizontal", "#fff", w - 130, 24, 90, 26, "#2F5BFF");
    return `<rect width="${w}" height="${h}" fill="#F2F0EB"/>` + `<rect x="${w / 2}" y="0" width="${w / 2}" height="${h}" fill="#D8D5CE"/>` + planta(m, w / 2 + 30, 40, w / 2 - 60, h - 80, "#2D2B28") +
      t(40, 70, "03 / Conceito", S(m, { fs: 10, cor: "#8D8A84", ls: 1 })) + linhas(40, 150, "A luz entra primeiro.", 14, 42, P(m, { fs: 36, cor: "#2D2B28" })) +
      linhas(40, 260, "Orientamos a casa para o nascente: sala e cozinha recebem sol pela manhã e ficam frescas à tarde.", 40, 16, S(m, { fs: 10.5, cor: "#2D2B28", op: .75 })) + Logo.caixa(m, "horizontal", "#2D2B28", 40, h - 60, 110, 30, "#A9785C");
  }
  function celularSite(m) { return { ow: 340, oh: 680, obj: celular(telaSite(m, 312, 652, true)) }; }
  function celularApp(m) { return { ow: 340, oh: 680, obj: celular(telaApp(m, 312, 652)) }; }
  function laptopSite(m) { return { ow: 900, oh: 500, obj: laptop(telaSite(m, 640, 400, false)) }; }
  function laptopSlide(m) { return { ow: 900, oh: 500, obj: laptop(telaSlide(m, 640, 400)) }; }
  function cracha(m) {
    const fita = `<g>${Array.from({ length: 2 }, (_, i) => `<path d="M${i ? 330 : 110} 0 ${i ? 250 : 190} 190" stroke="#2F5BFF" stroke-width="34"/>`).join("")}</g>`;
    const obj = fita + `<rect x="196" y="180" width="48" height="40" rx="6" fill="url(#g-aluminio)"/>` + sombra(`<rect x="110" y="210" width="220" height="320" rx="16" transform="translate(6 12)"/>`, .5) +
      `<rect x="110" y="210" width="220" height="320" rx="16" fill="#FFFFFF"/><rect x="200" y="226" width="40" height="8" rx="4" fill="#ddd"/>` +
      `<rect x="110" y="250" width="220" height="110" fill="#07080D"/>` + apoioOndas(m, 220, 110, .6, 110, 250) + Logo.caixa(m, "horizontal", "#fff", 140, 285, 160, 42, "#2F5BFF") +
      t(130, 410, "Leo Tanaka", P(m, { fs: 18, cor: "#07080D" })) + t(130, 432, "Produto", S(m, { fs: 11, cor: "#5a6070" })) +
      `<rect x="130" y="466" width="100" height="30" rx="15" fill="#2F5BFF"/>` + t(180, 486, "PULSE SUMMIT", S(m, { fs: 9, cor: "#fff", anchor: "middle", peso: 700 })) +
      `<rect x="110" y="210" width="220" height="320" rx="16" fill="url(#g-luz-v)" opacity=".5"/>`;
    return { ow: 440, oh: 560, obj };
  }

  /* ---------- arquitetura ---------- */
  function planta(m, x, y, w, h, cor) {
    return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 300 220" preserveAspectRatio="xMidYMid meet"><g fill="none" stroke="${cor}"><path stroke-width="4" d="M10 10H290V210H10ZM130 10V90M130 130V210M10 120H90M200 120H290M200 120V170"/><path stroke-width="1" stroke-dasharray="3 3" d="M130 90A40 40 0 0 1 170 130M90 120A30 30 0 0 0 120 150"/><path stroke-width=".8" opacity=".6" d="M10 0V-4M290 0V-4M10 -2H290"/></g>` +
      `<g font-family="${F(m)}" font-size="9" fill="${cor}" opacity=".7"><text x="40" y="60">SALA 28 m²</text><text x="170" y="60">COZINHA</text><text x="30" y="170">QUARTO</text><text x="220" y="190">BANHO</text><text x="140" y="-8">14,00</text></g>` +
      `<g fill="#A9785C"><rect x="150" y="28" width="60" height="30" opacity=".35"/><circle cx="60" cy="90" r="10" opacity=".35"/></g></svg>`;
  }
  function placa(m) {
    const obj = `<rect width="1200" height="900" fill="#CFCBC3"/><rect width="1200" height="900" filter="url(#f-ruido-g)" opacity=".55"/>` +
      Array.from({ length: 4 }, (_, i) => `<path d="M0 ${220 + i * 220}H1200" stroke="#fff" opacity=".22"/>`).join("") +
      `<rect width="1200" height="900" fill="url(#g-cena)"/>` +
      sombra(`<rect x="330" y="250" width="540" height="330" transform="translate(16 26)"/>`, .5, "f-sombra-g") +
      `<rect x="330" y="250" width="540" height="330" fill="url(#g-latao)"/><rect x="330" y="250" width="540" height="330" filter="url(#f-escovado)" opacity=".35"/>` +
      Logo.caixa(m, "horizontal", "#3a2f22", 390, 330, 420, 120, "#3a2f22") +
      `<path d="M330 250H870" stroke="#fff" opacity=".45"/>` + [[352, 272], [848, 272], [352, 558], [848, 558]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="7" fill="#8d7650"/><circle cx="${a - 2}" cy="${b - 2}" r="3" fill="#e9d9b5"/>`).join("") +
      t(600, 520, "Recepção · 2º andar", S(m, { fs: 18, cor: "#3a2f22", anchor: "middle", ls: 3 }));
    return { ow: 1200, oh: 900, obj, cheio: true };
  }

  /* ---------- fachadas ---------- */
  function fachada(m) {
    let obj = "";
    if (m.slug === "monarch") {
      obj = `<rect width="1200" height="900" fill="#141312"/>` + Array.from({ length: 13 }, (_, i) => `<path d="M${i * 100} 0V780" stroke="#000" stroke-width="3" opacity=".35"/>`).join("") +
        `<rect y="780" width="1200" height="120" fill="#4b4844"/><rect y="780" width="1200" height="8" fill="#2a2826"/>` +
        `<rect x="120" y="90" width="960" height="190" fill="#0c0b0b"/>` + Logo.caixa(m, "simbolo", "url(#g-cobre)", 190, 120, 130, 130) +
        Logo.caixa(m, "palavra", "url(#g-cobre)", 360, 120, 660, 135) +
        [260, 600, 940].map((x) => `<path d="M${x} 90V60Q${x} 40 ${x + 30} 40" fill="none" stroke="#1f1e1d" stroke-width="6"/><path d="M${x + 14} 42H${x + 50}L${x + 40} 30H${x + 24}Z" fill="#1f1e1d"/><ellipse cx="${x + 32}" cy="80" rx="80" ry="30" fill="#ffcc8a" opacity=".12" filter="url(#f-sombra)"/>`).join("") +
        `<rect x="120" y="330" width="600" height="450" fill="#1d1712"/><rect x="120" y="330" width="600" height="450" fill="url(#g-vitrine)"/>` +
        `<g opacity=".55">${[250, 470].map((x) => `<rect x="${x}" y="520" width="90" height="120" rx="8" fill="#0a0806"/><rect x="${x - 10}" y="630" width="110" height="20" rx="6" fill="#0a0806"/><rect x="${x + 40}" y="650" width="10" height="90" fill="#0a0806"/>`).join("")}<rect x="160" y="420" width="520" height="70" fill="#B87333" opacity=".25"/></g>` +
        `<path d="M120 330H720V780H120Z" fill="url(#g-reflexo)"/><rect x="120" y="330" width="600" height="450" fill="none" stroke="#B87333" stroke-width="10"/>` +
        t(420, 720, "CORTE · BARBA · TOALHA QUENTE", S(m, { fs: 20, cor: "#D99A5C", anchor: "middle", ls: 6, peso: 600 })) +
        `<rect x="790" y="330" width="210" height="450" fill="#0c0b0b"/><rect x="810" y="350" width="170" height="410" fill="#1d1712"/><rect x="810" y="350" width="170" height="410" fill="url(#g-reflexo)"/><rect x="950" y="520" width="8" height="90" rx="4" fill="url(#g-cobre)"/>` +
        `<g transform="translate(1040 360)"><rect x="-6" y="-20" width="52" height="20" rx="6" fill="url(#g-cobre)"/><clipPath id="poste"><rect width="40" height="300" rx="10"/></clipPath><g clip-path="url(#poste)"><rect width="40" height="300" fill="#F3EEE6"/>${Array.from({ length: 12 }, (_, i) => `<path d="M-20 ${i * 40 - 40}L60 ${i * 40}V${i * 40 + 16}L-20 ${i * 40 - 24}Z" fill="${i % 2 ? "#B87333" : "#0F0F0F"}"/>`).join("")}<rect width="40" height="300" fill="url(#g-cil)"/></g><rect x="-6" y="300" width="52" height="20" rx="6" fill="url(#g-cobre)"/></g>`;
    } else if (m.slug === "nord") {
      obj = `<rect width="1200" height="900" fill="#EAE7E0"/><rect width="1200" height="900" filter="url(#f-ruido-g)" opacity=".3"/>` +
        `<rect y="800" width="1200" height="100" fill="#B9B5AD"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 110} 800V900" stroke="#9e9a92"/>`).join("")}` +
        `<rect x="80" y="160" width="520" height="640" fill="#9C6F52"/>${Array.from({ length: 26 }, (_, i) => `<rect x="${86 + i * 20}" y="160" width="12" height="640" fill="#8a5f44"/>`).join("")}<rect x="80" y="160" width="520" height="640" fill="url(#g-luz-h)" opacity=".4"/>` +
        `<rect x="680" y="300" width="400" height="500" fill="#2D2B28"/><rect x="692" y="312" width="376" height="488" fill="#3d4246"/><rect x="692" y="312" width="376" height="488" fill="url(#g-reflexo)"/><path d="M880 312V800" stroke="#2D2B28" stroke-width="10"/>` +
        Logo.caixa(m, "horizontal", "#2D2B28", 680, 150, 400, 110, "#A9785C") +
        sombra(`<rect x="616" y="520" width="44" height="60" transform="translate(4 6)"/>`, .4, "f-sombra-p") + `<rect x="616" y="520" width="44" height="60" fill="url(#g-latao)"/>` + Logo.caixa(m, "simbolo", "#3a2f22", 624, 534, 28, 28) +
        `<g transform="translate(1110 640)"><path d="M-20 160H60L50 60H-10Z" fill="#6d6a64"/><path d="M20 60C0 0 -20 -40 -10 -90M20 60C30 0 60 -30 50 -100M20 60C10 10 40 -60 20 -130" stroke="#4a5a3a" stroke-width="5" fill="none"/>${[[-10, -90], [50, -100], [20, -130], [0, -40], [44, -40]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="10" ry="22" fill="#5d6e48" transform="rotate(${a} ${a} ${b})"/>`).join("")}</g>` +
        `<rect width="1200" height="900" fill="url(#g-cena)" opacity=".5"/>`;
    } else {
      /* casa botânica */
      const arco = (x, y, w, h, vidro = true) => `<path d="M${x} ${y + h}V${y + w / 2}A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2}V${y + h}Z" fill="#5C6338"/><path d="M${x + 12} ${y + h}V${y + w / 2}A${w / 2 - 12} ${w / 2 - 12} 0 0 1 ${x + w - 12} ${y + w / 2}V${y + h}Z" fill="${vidro ? "#2b2a22" : "#4a5030"}"/>` + (vidro ? `<path d="M${x + 12} ${y + h}V${y + w / 2}A${w / 2 - 12} ${w / 2 - 12} 0 0 1 ${x + w - 12} ${y + w / 2}V${y + h}Z" fill="url(#g-vitrine-q)"/>` : "");
      obj = `<rect width="1200" height="900" fill="#E9DDC6"/><rect width="1200" height="900" filter="url(#f-ruido-g)" opacity=".35"/>` +
        `<rect y="790" width="1200" height="110" fill="#A08F78"/>${Array.from({ length: 30 }, (_, i) => `<rect x="${(i % 10) * 124 + (Math.floor(i / 10) % 2) * 60}" y="${792 + Math.floor(i / 10) * 36}" width="118" height="32" fill="#b09f87"/>`).join("")}` +
        arco(120, 300, 380, 490) + arco(620, 360, 200, 430, false) + arco(900, 300, 220, 490) +
        `<path d="M110 300H510L540 380H80Z" fill="#5C6338"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${80 + i * 57.5} 380L${110 + i * 50} 300H${135 + i * 50}L${108 + i * 57.5} 380Z" fill="#EDE3D0"/>`).join("")}<path d="M80 380${Array.from({ length: 8 }, (_, i) => `Q${108 + i * 57.5} 404 ${137 + i * 57.5} 380`).join("")}" fill="#5C6338"/>` +
        Logo.caixa(m, "vertical", "#EDE3D0", 230, 470, 160, 200, "#EDE3D0") +
        Logo.caixa(m, "palavra", "#5C6338", 540, 110, 320, 150) +
        `<g transform="translate(965 140)"><path d="M0 0H90" stroke="#2E2A1F" stroke-width="5"/><path d="M20 0V20M70 0V20" stroke="#2E2A1F" stroke-width="2"/><circle cx="45" cy="70" r="52" fill="#5C6338"/>${Logo.caixa(m, "simbolo", "#EDE3D0", 15, 38, 60, 60, "#A7AD80")}</g>` +
        [[60, 700], [540, 720], [1130, 700]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M-40 90H40L30 0H-30Z" fill="#B0643E"/>${ramo("#5C6338", 0, 0, 1.6, -10)}${ramo("#6f7a44", 10, 0, 1.3, 20)}</g>`).join("") +
        `<rect width="1200" height="900" fill="url(#g-cena)" opacity=".4"/>`;
    }
    return { ow: 1200, oh: 900, obj, cheio: true };
  }
  /* ramo botânico desenhado à mão */
  function ramo(cor, x, y, s = 1, rot = 0) {
    const folhas = [[0, -30, -40], [0, -55, 40], [0, -80, -35], [0, -102, 30], [0, -120, 0]].map(([a, b, r], i) => `<path d="M${a} ${b}c-12-4-20-14-20-24 12 2 20 12 20 24z" fill="${cor}" transform="rotate(${r} ${a} ${b})${i % 2 ? " scale(-1 1)" : ""}"/>`).join("");
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0C2-40-4-80 0-124" stroke="${cor}" stroke-width="2.4" fill="none"/>${folhas}</g>`;
  }

  /* ---------- elementos de apoio ---------- */
  function apoioOndas(m, w, h, op = 1, x = 0, y = 0) {
    const id = uid("pt");
    return `<g transform="translate(${x} ${y})" opacity="${op}"><defs><pattern id="${id}" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#A9BCFF" opacity=".35"/></pattern><clipPath id="${id}c"><rect width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#${id}c)"><rect width="${w}" height="${h}" fill="url(#${id})"/>` +
      Array.from({ length: 7 }, (_, i) => `<circle cx="${w * .78}" cy="${h * .5}" r="${30 + i * Math.max(w, h) * .09}" fill="none" stroke="#2F5BFF" stroke-width="${2.4 - i * .25}" opacity="${1 - i * .12}"/>`).join("") + `</g></g>`;
  }
  function apoio(m) {
    const te = cx(m), W = 1200, H = 900;
    let s = "";
    if (m.apoio === "fita") {
      const fita = (y, rot, f, c) => `<g transform="rotate(${rot} 600 450)"><rect x="-300" y="${y}" width="1800" height="110" fill="${f}"/>${t(-300, y + 80, Array(8).fill("VÉRTICE ✕ DO ASFALTO PRA CIMA ✕").join(" "), P(m, { fs: 62, cor: c }))}</g>`;
      s = `<rect width="${W}" height="${H}" fill="#2C2C2A"/><rect width="${W}" height="${H}" filter="url(#f-ruido-g)" opacity=".5"/>` + fita(250, -12, "#F1EFEA", "#0E0E0D") + fita(480, 9, "#0E0E0D", "#F1EFEA") + fita(700, -4, "#CFC8BA", "#0E0E0D");
    } else if (m.apoio === "halo") {
      s = `<rect width="${W}" height="${H}" fill="#F5EEE4"/><circle cx="600" cy="560" r="360" fill="url(#g-halo)"/>` +
        Array.from({ length: 9 }, (_, i) => `<path d="M${600 - 140 - i * 46} 620A${140 + i * 46} ${140 + i * 46} 0 0 1 ${600 + 140 + i * 46} 620" fill="none" stroke="#B99B6B" stroke-width="${i ? 1 : 2}" opacity="${1 - i * .09}"/>`).join("") +
        `<rect x="0" y="618" width="${W}" height="2" fill="#B99B6B"/><rect y="620" width="${W}" height="280" fill="#E3D3BF"/>` + Logo.caixa(m, "simbolo", "#8C6A55", 540, 500, 120, 120, "#B99B6B") +
        t(600, 740, "limpar  ·  tratar  ·  proteger", S(m, { fs: 26, cor: "#8C6A55", anchor: "middle", ls: 8 }));
    } else if (m.apoio === "listras") {
      s = `<rect width="${W}" height="${H}" fill="#0F0F0F"/><g transform="rotate(-35 600 450)">${Array.from({ length: 30 }, (_, i) => `<rect x="${-600 + i * 110}" y="-400" width="40" height="1700" fill="${i % 2 ? "#B87333" : "#F3EEE6"}" opacity="${i % 2 ? .9 : .08}"/>`).join("")}</g>` +
        `<rect x="300" y="200" width="600" height="500" fill="#0F0F0F"/><rect x="320" y="220" width="560" height="460" fill="none" stroke="#B87333" stroke-width="2"/><rect x="332" y="232" width="536" height="436" fill="none" stroke="#B87333" stroke-width=".8"/>` +
        Logo.caixa(m, "principal", "#F3EEE6", 420, 280, 360, 340, "#B87333");
    } else if (m.apoio === "planta") {
      s = `<rect width="${W}" height="${H}" fill="#F2F0EB"/><g stroke="#2D2B28" opacity=".08">${Array.from({ length: 25 }, (_, i) => `<path d="M${i * 50} 0V${H}M0 ${i * 50}H${W}"/>`).join("")}</g>` + planta(m, 140, 140, 920, 640, "#2D2B28") +
        `<g transform="translate(1080 120)">${Logo.caixa(m, "simbolo", "#2D2B28", -40, -40, 80, 80, "#A9785C")}</g>`;
    } else if (m.apoio === "ondas") {
      s = `<rect width="${W}" height="${H}" fill="#07080D"/>` + apoioOndas(m, W, H) + Logo.caixa(m, "simbolo", "#fff", W * .78 - 60, H * .5 - 60, 120, 120, "#2F5BFF") +
        `<svg x="60" y="560" width="560" height="260" viewBox="0 0 560 260">${graficos(m, 560, 260)}</svg>`;
    } else {
      s = `<rect width="${W}" height="${H}" fill="#5C6338"/>` + [[160, 820, 3.6, -14], [380, 900, 4.6, 8], [640, 860, 3.2, -4], [880, 900, 4.8, 12], [1080, 820, 3.4, -18]].map(([x, y, sc, r], i) => ramo(i % 2 ? "#A7AD80" : "#EDE3D0", x, y, sc, r)).join("") +
        `<circle cx="600" cy="300" r="140" fill="#EDE3D0"/>` + Logo.caixa(m, "simbolo", "#5C6338", 520, 210, 160, 160, "#5C6338");
    }
    return { ow: W, oh: H, obj: s, cheio: true };
  }
  function padraoCena(m) {
    const te = cx(m), d = D(m), p = padrao(m, d.logo, 120, m.slug === "vertice" ? 1 : .9, m.slug === "pulse" ? 0 : (m.slug === "vertice" ? -12 : 0));
    return { ow: 1200, oh: 900, cheio: true, obj: `<defs>${p.def}</defs><rect width="1200" height="900" fill="${d.fundo}"/><rect width="1200" height="900" fill="url(#${p.id})"/>` };
  }

  /* ---------- redes sociais (1080 × 1350 e 1080 × 1920) ---------- */
  const OBJETO = { camiseta: (m) => camiseta(m, { cor: "#F1EFEA", estampa: "frente" }), contaGotas: (m) => ({ ow: 160, oh: 320, obj: contaGotas(m, 10, 10) }), lata: (m) => ({ ow: 300, oh: 200, obj: lata(m) }), planta: (m) => ({ ow: 320, oh: 240, obj: planta(m, 10, 10, 300, 220, "#2D2B28") }), graficos: (m) => ({ ow: 400, oh: 260, obj: graficos(m, 400, 260) }), copo: (m) => ({ ow: 220, oh: 380, obj: copo(m, 10, 10, 1, "#5C6338", "#EDE3D0") }) };
  function post(m, i) {
    const te = cx(m), p = m.posts[i], d = D(m), W = 1080, H = 1350;
    const marca = (cor, c2) => Logo.caixa(m, "horizontal", cor, 72, 72, 230, 70, c2);
    const rodape = (cor) => t(72, H - 72, m.contato.social, S(m, { fs: 26, cor, op: .7 })) + t(W - 72, H - 72, `${i + 1}/3`, S(m, { fs: 26, cor, anchor: "end", op: .7 }));
    const titulo = (y, cor, max, fs) => linhas(72, y, p.titulo, max, fs * 1.08, P(m, { fs, cor, ls: m.slug === "vertice" ? -2 : 0 }));
    if (p.tipo === "manchete") {
      const fundo = te.claro ? te.fundo : te.fundo, cor = te.texto;
      const deco = m.slug === "vertice" ? Logo.caixa(m, "simbolo", "#F1EFEA", 560, 500, 600, 600) : m.slug === "pulse" ? apoioOndas(m, W, H, .9) : m.slug === "aurea" ? `<circle cx="760" cy="420" r="300" fill="url(#g-halo)"/>` : m.slug === "monarch" ? `<rect x="40" y="40" width="1000" height="1270" fill="none" stroke="#B87333" stroke-width="3"/>` : m.slug === "nord" ? planta(m, 520, 160, 500, 360, "#2D2B28") : ramo("#A7AD80", 900, 1200, 5, -10);
      return `<rect width="${W}" height="${H}" fill="${fundo}"/>${m.slug === "vertice" ? `<g opacity=".12">${deco}</g>` : deco}` + marca(cor, te.acento) + titulo(680, cor, cabe(m, 936, larga(m) ? 110 : 104), larga(m) ? 110 : 104) + t(72, 1140, p.sub, S(m, { fs: 34, cor: te.acento })) + rodape(cor);
    }
    if (p.tipo === "produto") {
      const ob = OBJETO[p.objeto](m), fundo = te.superficie, cor = te.texto;
      return `<rect width="${W}" height="${H}" fill="${fundo}"/>` + chao(540, 900, 380, 40, .3) + encaixe(ob, 190, 180, 700, 700) + titulo(1060, cor, cabe(m, 936, 80), 80) + t(72, 1140, p.sub, S(m, { fs: 32, cor, op: .7 })) + Logo.caixa(m, "simbolo", cor, W - 152, 72, 80, 80, te.acento) + rodape(cor);
    }
    const pd = padrao(m, d.logo, 150, .25, m.slug === "vertice" ? -12 : 0);
    return `<defs>${pd.def}</defs><rect width="${W}" height="${H}" fill="${d.fundo}"/><rect width="${W}" height="${H}" fill="url(#${pd.id})"/>` +
      `<rect x="72" y="380" width="${W - 144}" height="560" fill="${te.papel}"/>` + linhas(120, 540, p.titulo, cabe(m, 820, larga(m) ? 70 : 84), 92, P(m, { fs: larga(m) ? 70 : 84, cor: te.tinta })) + t(120, 860, p.sub, S(m, { fs: 32, cor: te.tinta, op: .7 })) +
      marca(d.logo, d.c2) + rodape(d.logo);
  }
  function story(m) {
    const te = cx(m), d = D(m), W = 1080, H = 1920, st = m.story;
    const ob = OBJETO[m.posts[1].objeto](m);
    return `<rect width="${W}" height="${H}" fill="${d.fundo}"/>` + (m.slug === "pulse" ? apoioOndas(m, W, H) : "") +
      [0, 1, 2].map((i) => `<rect x="${40 + i * 340}" y="40" width="320" height="6" rx="3" fill="#fff" opacity="${i === 0 ? .95 : .35}"/>`).join("") +
      Logo.caixa(m, "horizontal", d.logo, 60, 90, 260, 80, d.c2) +
      linhas(80, 420, st.titulo, cabe(m, 920, larga(m) ? 96 : 112), 120, P(m, { fs: larga(m) ? 96 : 112, cor: d.logo })) + t(80, 700, st.sub, S(m, { fs: 40, cor: d.logo, op: .8 })) +
      `<rect x="80" y="800" width="${W - 160}" height="760" fill="${te.papel}" rx="${m.slug === "pulse" ? 40 : 0}"/>` + encaixe(ob, 200, 860, W - 400, 640) +
      `<rect x="${W / 2 - 230}" y="1640" width="460" height="110" rx="55" fill="#fff"/>` + t(W / 2, 1708, "↗ " + st.botao, S(m, { fs: 38, peso: 700, cor: "#111", anchor: "middle" }));
  }
  /* feed do Instagram: posts, padrão, cores e aplicações */
  function feed(m) {
    const te = cx(m), d = D(m), w = 312, cel = (w - 4) / 3, alt = cel * 1.25;
    const tiles = [post(m, 0), padraoCena(m).obj, post(m, 1), apoio(m).obj, post(m, 2), `<rect width="1080" height="1350" fill="${te.acento}"/>` + Logo.caixa(m, "simbolo", te.claro ? "#fff" : te.tinta, 340, 475, 400, 400),
      Mock[m.aplicacoes[0].m](m, m.aplicacoes[0].o || {}), `<rect width="1080" height="1350" fill="${te.fundo}"/>` + linhas(80, 600, m.tagline, cabe(m, 920, 120), 130, P(m, { fs: 120, cor: te.texto })), Mock[m.aplicacoes[1].m](m, m.aplicacoes[1].o || {})];
    const grade = tiles.map((tl, i) => {
      const x = (i % 3) * (cel + 2), y = 248 + Math.floor(i / 3) * (alt + 2);
      if (typeof tl === "string") return `<svg x="${x}" y="${y}" width="${cel}" height="${alt}" viewBox="0 0 ${i === 1 || i === 3 ? "1200 900" : "1080 1350"}" preserveAspectRatio="xMidYMid slice">${tl}</svg>`;
      return `<svg x="${x}" y="${y}" width="${cel}" height="${alt}" viewBox="0 0 1080 1350" preserveAspectRatio="xMidYMid slice"><rect width="1080" height="1350" fill="${FUNDO[m.slug]}"/>${encaixe(tl, 90, 200, 900, 950)}</svg>`;
    }).join("");
    const perfil = `<rect width="${w}" height="652" fill="#fff"/>` + t(w / 2, 66, m.contato.social.slice(1), S({ fontes: { secundaria: { css: "system-ui,sans-serif" } } }, { fs: 13, peso: 700, cor: "#111", anchor: "middle" })) +
      `<circle cx="52" cy="122" r="36" fill="${d.fundo}"/>` + Logo.caixa(m, "simbolo", d.logo, 30, 100, 44, 44, d.c2) +
      [["128", "posts"], ["12,4 mil", "seguidores"], ["210", "seguindo"]].map(([a, b], i) => t(140 + i * 66, 120, a, { fam: "system-ui,sans-serif", fs: 13, peso: 700, cor: "#111", anchor: "middle" }) + t(140 + i * 66, 136, b, { fam: "system-ui,sans-serif", fs: 9.5, cor: "#555", anchor: "middle" })).join("") +
      t(18, 184, m.nome, { fam: "system-ui,sans-serif", fs: 11.5, peso: 700, cor: "#111" }) + t(18, 200, m.tagline, { fam: "system-ui,sans-serif", fs: 11, cor: "#333" }) +
      `<rect x="18" y="214" width="${w - 36}" height="24" rx="6" fill="#efefef"/>` + t(w / 2, 230, "Seguir", { fam: "system-ui,sans-serif", fs: 11, peso: 700, cor: "#111", anchor: "middle" }) + grade;
    return { ow: 340, oh: 680, obj: celular(perfil) };
  }

  function storyCel(m) { return { ow: 340, oh: 680, obj: celular(`<svg width="312" height="652" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">${story(m)}</svg>`) }; }

  /* cena: fundo, luz, objeto centralizado e textura */
  function cena(m, peca, W, H) {
    if (peca.cheio) return `<svg width="${W}" height="${H}" viewBox="0 0 ${peca.ow} ${peca.oh}" preserveAspectRatio="xMidYMid slice">${peca.obj}</svg>`;
    const k = Math.min(W * .8 / peca.ow, H * .8 / peca.oh), x = (W - peca.ow * k) / 2, y = (H - peca.oh * k) / 2;
    return `<rect width="${W}" height="${H}" fill="${peca.fundo || FUNDO[m.slug]}"/><rect width="${W}" height="${H}" fill="url(#g-cena)"/>` +
      `<g transform="translate(${x} ${y}) scale(${k})">${peca.obj}</g><rect width="${W}" height="${H}" filter="url(#f-ruido)" opacity=".5"/>`;
  }
  const Mock = { camiseta, moletom, avental, sacolaPapel, caixa, cartoes, etiqueta, papelaria, folder, frascos, pote: (m) => pote(m), produtos, copos, pouch, potes, cardapio, fachada, placa, celularSite, celularApp, laptopSite, laptopSlide, cracha, apoio, padraoCena, feed, post, story, storyCel, cena, ondas: apoioOndas, ramo, telaApp, telaSite, telaSlide, FUNDO, D };
  return Mock;
})();
