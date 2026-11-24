# Regras de trabalho do Portifolio

## Estrutura e tecnologias

- O site usa HTML5, CSS3 e JavaScript ES Modules. Deve funcionar diretamente no GitHub Pages, a partir da raiz de `main`, sem Node em produção, empacotador, framework ou etapa de compilação.
- `index.html` contém a estrutura inicial e os fallbacks. `js/data.js` concentra o conteúdo editável, incluindo as respostas do terminal. `js/sections.js` renderiza as seções dinâmicas, e `js/main.js` coordena a inicialização. Mantenha interações específicas nos módulos correspondentes, como `AboutTerminal.js` e `HeroScene.js`.
- Use `css/style.css` para estilos globais e `css/sections.css` para componentes das seções. Reutilize variáveis CSS e classes existentes. Para componentes novos, siga a nomenclatura BEM.
- Reutilize as dependências existentes. GSAP, ScrollTrigger e Lenis são carregados com versões fixas. Three.js r170 está em `js/vendor/three/`. Uma dependência nova ou atualização de versão exige escopo aprovado.
- Use caminhos relativos e respeite a grafia e as maiúsculas dos arquivos. O site é servido sob `/Portifolio/`. Preserve `.nojekyll`. Guarde mídias em `assets/` e registre a origem e a licença de recursos de terceiros.

## Como modificar e validar

1. Leia o código e os dados da área afetada antes de editar. Ajuste o menor conjunto de arquivos que resolve o pedido. Preserve conteúdo, comportamento e alterações locais fora do escopo.
2. Edite textos e fatos em `js/data.js` quando a seção for dinâmica. Se houver fallback estático em `index.html`, mantenha-o em sincronia. Registre dados incertos como TODO, sem inventar informações.
3. Mantenha a navegação por teclado, foco visível e contraste. Respeite `prefers-reduced-motion`. Confira layouts desktop e mobile e, em interações, preserve o comportamento esperado por toque e teclado.
4. Sirva o projeto por HTTP conforme o README. Confira a área alterada no navegador e, ao mexer em caminhos ou publicação, teste também sob o prefixo `/Portifolio/`. Rode `node --check` nos módulos JS modificados quando Node estiver disponível. Para mudanças na bancada 3D, use o teste em `tests/hero.cjs` com Playwright quando disponível.
5. Antes do commit, revise `git diff --check`, o diff e os arquivos preparados. Registre na entrega o que foi validado e qualquer verificação pendente. Mantenha credenciais, arquivos temporários e dados privados fora do repositório.

## Branches, commits e GitHub

- Use o remoto pessoal `Rafael-Tunes-Mathiensen/Portifolio`. Confira o remoto e a conta autenticada antes de publicar. Use a identidade pessoal para os commits deste projeto.
- Parta de `origin/main` atualizado para cada mudança e crie uma branch `<tipo>/rafael/<assunto>`. Escreva o assunto em português, em minúsculas, sem acentos e separado por hífens. Exemplos `fix/rafael/painel-mentorias` e `docs/rafael/harness-do-projeto`.
- Use Conventional Commits em português no infinitivo, no formato `tipo(escopo opcional): verbo no infinitivo + descrição objetiva`. Use `feat` para funcionalidades, `fix` para correções, `docs` para documentação, `refactor` para reorganização, `test` para testes e `chore` para manutenção. Exemplos `feat: adicionar nova aba de certificados` e `fix(mentorias): corrigir rolagem do painel`.
- Faça commits com escopo coerente. Envie a branch com `git push -u origin <branch>`. Quando abrir um PR, use `main` como destino e descreva o que mudou, as verificações feitas e as pendências. Mantenha o título no mesmo padrão dos commits.
- A publicação é feita pelo GitHub Pages a partir de `main`. Integre mudanças em `main` somente quando autorizado. Após integração, confira o status do deploy, a página publicada e os recursos afetados.
