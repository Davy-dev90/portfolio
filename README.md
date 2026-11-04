# Davy · Portfólio

Site pessoal do Davy: sites, artes para Instagram e identidades visuais feitos com inteligência artificial.

É uma página só, em HTML, CSS e JavaScript, sem instalar nada. Para ver, abra o `index.html` no navegador.

## Arquivos

- `index.html`: o site inteiro.
- `assets/`: a foto do Davy, a marca d'água "Made by Davy", a foto do microfone, a imagem de compartilhamento (`og-image.jpg`) e o aviso de cookies.
- `assets/fontes/`: as fontes Zodiak e General Sans (Fontshare) hospedadas no próprio site.
- `assets/projetos/miniaturas/`: versões leves (WebP) das imagens originais, usadas nas listas.
- `vercel.json`: cabeçalhos de segurança e de cache.

## Onde editar

Tudo fica no `index.html`:

- **Projetos:** a lista `PROJETOS`. Cada linha tem título, categoria, objetivo, funcionalidades e tecnologias. Projeto fictício leva `status:"Demonstrativo"`.
- **Depoimentos:** a lista `DEPOIMENTOS`. A seção só aparece quando houver um depoimento real nela.
- **Serviços, sobre e processo:** direto no HTML de cada seção.
- **Orçamento:** os botões "Solicitar orçamento" abrem o WhatsApp com a mensagem pronta.
- `identidade-visual.html`: a seção de identidade visual, com seis marcas conceituais (abre pelo item "Identidade visual" da lista de projetos).
- `identidade/marcas.js`: os dados de cada marca (conceito, cores, fontes, logotipo, posts). Para mudar um texto ou uma cor, é aqui.
- `identidade/mockups.js`: os mockups desenhados em código (camiseta, sacola, fachada, frascos, celular...).
- `identidade/app.js` e `identidade/estilo.css`: a galeria, os estudos de caso e as animações.
- `identidade/fotos.js` e `assets/identidade/`: os mockups fotográficos (fotos reais com cada marca aplicada em perspectiva).

## Créditos

Foto do microfone: Claus Grünstäudl, CC0, via Wikimedia Commons.

Fotos-base dos mockups de identidade visual: Unsplash (licença Unsplash, uso comercial livre). A aplicação das marcas sobre as fotos é da dav studio.
