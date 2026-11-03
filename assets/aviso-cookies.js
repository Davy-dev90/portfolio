/* aviso de cookies: some no "Ok" e não volta para quem já clicou */
(() => {
  const CHAVE = "aviso-cookies-ok";
  try { if (localStorage.getItem(CHAVE)) return; } catch {}

  const estilo = document.createElement("style");
  estilo.textContent = `
.aviso-cookies{position:fixed;left:24px;bottom:max(24px,env(safe-area-inset-bottom));z-index:50;display:flex;align-items:center;gap:18px;max-width:calc(100vw - 48px);padding:10px 10px 10px 22px;border-radius:999px;font-size:14px;line-height:1.35;color:var(--osso);background:rgb(6 19 30/.86);-webkit-backdrop-filter:blur(12px) saturate(1.3);backdrop-filter:blur(12px) saturate(1.3);box-shadow:inset 0 1px 1px rgba(255,255,255,.2),inset 0 0 0 1px rgba(235,241,245,.18),0 14px 30px -12px rgba(0,0,0,.75);opacity:0;transform:translateY(16px);transition:opacity .6s var(--saida),transform .6s var(--saida)}
.aviso-cookies.mostrar{opacity:1;transform:none}
.aviso-cookies .botao{flex:none;padding:9px 20px;font-size:14px}
@media (max-width:760px){.aviso-cookies{left:10px;right:76px;bottom:max(16px,env(safe-area-inset-bottom));gap:12px;max-width:none;padding:10px 10px 10px 16px;border-radius:18px;font-size:13px}}
@media (prefers-reduced-motion:reduce){.aviso-cookies{transition:none}}`;
  document.head.append(estilo);

  const aviso = document.createElement("div");
  aviso.className = "aviso-cookies";
  aviso.setAttribute("role", "status");
  aviso.innerHTML = `<span>Uso cookies para entender as visitas do site.</span><button class="botao botao--cheio" type="button">Ok</button>`;
  aviso.querySelector("button").onclick = () => {
    try { localStorage.setItem(CHAVE, "1"); } catch {}
    aviso.remove();
  };
  document.body.append(aviso);
  setTimeout(() => aviso.classList.add("mostrar"), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2200);
})();
