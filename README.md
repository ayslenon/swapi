# Para reproduzir este projeto você vai precisar do node.js e do react

## Versões dos pacotes utilizados
- Node.js v14.18.1
- axios v0.27.2 (yarn add axios)
- react v18.2.0 (create react-aoo --template typescript)
- react-router-dom v6.3.0 (yarn add react-router-dom)
- react-toastify v9.0.8 (yarn add react-toastify)
- mui/material v5.10.3 (yarn add @mui/material @emotion/react @emotion/styled)

## Após clonar o repositório, usando apenas o comando yarn todas as dependencias serão baixadas

## Depois de tudo configurado, com yarn start o projeto sera aberto em http://localhost:3000

## Este projeto consome a SWAPI, ou API de Star Wars
### Está API retorna informações sobre personagens, naves e até planetas do universo de Star Wars, vamos consumir algumas dessas informações para exibir em uma aplicação visual

## Detalhes de implementação
- temos uma fake JWT que simula login de usuários
- temos 3 usuários fakes autorizados a logar
-- durante a aplicação rodando podemos adicionar mais usuários no context, mas ao fechar e abrir de novo teremos os mesmo 3 usuráios sempre
-- após logar, a sessão é salva no localstorage até vocês deslogar
- é permitido, além de login, logout e cadastro, fazer também a alteração da senha de um usuário já existente
- para listagem dos personangens, naves, veiculos, planetas, espécies e filmes todos os usuários podem acessar a páginação e explorar algumas informações de cada elemento
-- para informações mais detalhadas sobre personagens e naves é necessário estar logado na aplicação, depois de logar o usuário pode acessar estas duas áreas restritas
-- após algumas interações específicas com o usuários são mostrados toasts para guiá-lo em uma próxima ação
