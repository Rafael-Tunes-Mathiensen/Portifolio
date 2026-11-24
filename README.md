# Rafael Tunes Mathiensen · Portfólio

Portfólio pessoal em português de um estudante de Análise e Desenvolvimento de Sistemas da Fatec. O destaque é o BidXchange, TCC sobre o processo de compras de instituições de ensino. A página também reúne projetos, registros de atividades, certificados e contatos.

## Rodar localmente

Na pasta que contém `index.html`, inicie um servidor estático com Python 3.

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Abra [o portfólio local](http://127.0.0.1:8000/). No Windows, também é possível usar `py -m http.server 8000 --bind 127.0.0.1`. Para encerrar, pressione `Ctrl+C`. O servidor entrega os módulos JavaScript por HTTP. O site não exige compilação ou instalação de pacotes.

## Editar o portfólio

Na seção de contato, os rótulos e ícones dos quatro canais vêm de `profile.socialActions` em `js/data.js`. Cada chave corresponde ao endereço no mesmo perfil. O WhatsApp usa o número e a mensagem predefinida. Os símbolos de WhatsApp, LinkedIn e Instagram são do [Simple Icons v11.15.0](https://github.com/simple-icons/simple-icons/tree/11.15.0), distribuído sob CC0. O GitHub reutiliza o símbolo do Devicon já utilizado em Skills.

A capa do case BidXchange usa a marca enviada pelos autores e duas capturas da página inicial pública, uma em desktop e outra em celular. Atualize o endereço em `tcc.live` e as imagens de `tcc.preview` no `js/data.js` quando a interface mudar. As quatro cenas logo abaixo ilustram o fluxo de compra; os textos de cada etapa também ficam no cadastro do TCC.

A bancada do hero é construída com primitivas em `js/HeroScene.js` e usa a cópia local do Three.js r170 em `js/vendor/three/`. Os atalhos das cinco peças também estão disponíveis pelo teclado. Sem WebGL, a página exibe `assets/hero.webp`. O botão de pausa na legenda controla as animações da bancada e os efeitos existentes no portfólio.

1. Abra `js/data.js` e localize o texto, contato ou lista que deseja atualizar. Para adicionar um item, copie um registro da mesma lista e edite os campos. Preserve o formato das datas dos certificados para manter a ordenação.
2. Salve fotos em `assets/fotos/` e certificados em `assets/certificados/`. Prefira nomes em minúsculas. No cadastro, aponte para um caminho relativo, como `assets/fotos/visita.webp`. Respeite maiúsculas e minúsculas, pois o GitHub Pages as diferencia.
3. Para certificados, use o sufixo `-mini.webp` na miniatura e deixe a versão maior para a leitura ampliada. Vincule o PDF original e a validação da instituição quando disponíveis. Os PDFs de React e Networking Basics estão incluídos.
4. Revise o resultado no servidor local. Teste o registro nos filtros, navegue com o teclado e confira os links. Caso altere a identidade do site, revise também título, descrição, dados estruturados e metadados de compartilhamento em `index.html`.

Na seção Skills, edite `skills.declared` para os conhecimentos gerais e `skills.applied` para as tecnologias aplicadas no BidXchange. Para exibir um símbolo, salve o SVG em `assets/tecnologias/` e associe o nome da tecnologia ao nome do arquivo sem extensão em `skills.logos`. Itens sem símbolo aparecem como texto. [Créditos e licença dos ícones](assets/tecnologias/CREDITOS.md)

As fotos documentam o conjunto de atividades. O álbum preserva o enquadramento de cada imagem e permite trocar de foto pelas miniaturas, pelas setas do teclado ou deslizando sobre o palco. Descreva em cada texto alternativo a cena retratada. Os filtros atuam sobre a timeline, e cada encontro pode ser publicado mesmo que ainda não haja fotografia.

Procure por `TODO` nos arquivos para localizar dados que dependem de confirmação. Entre eles estão o semestre da Fatec, as contribuições individuais no TCC, a data da visita à IBM e a participação nos encontros. O repositório do código do BidXchange exige acesso prévio, e a documentação acadêmica é pública.

## Publicar no GitHub Pages

1. Envie para a branch `main` todos os arquivos do site, incluindo `.nojekyll`, com `index.html` na raiz do repositório.
2. Abra **Settings → Pages** no repositório. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha **main** e a pasta **/(root)**. Clique em **Save**.
4. Quando o deploy terminar, abra **Visit site**. O endereço de um repositório de projeto segue o formato `https://USUARIO.github.io/REPOSITORIO/`. Verifique uma foto, um certificado e a navegação até o BidXchange nesse endereço.

Cada envio posterior à branch selecionada atualiza o site. O andamento fica na aba **Actions**. [Documentação do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Cinco melhorias futuras

1. Acrescentar ao BidXchange um relato de uma decisão técnica de Rafael, com o problema, a solução e o resultado observado.
2. Gravar uma demonstração curta e legendada de uma cotação com dados fictícios, da publicação até a negociação.
3. Incluir um currículo em PDF com a formação e a disponibilidade atualizadas.
4. Oferecer uma versão em inglês para recrutadores que trabalhem com equipes internacionais.
5. Publicar um relato jogável ou em vídeo de Warden’s Call que mostre uma rodada do combate em turnos.
