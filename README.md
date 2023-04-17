# Bem-vindos ao Busca Livre - Back-End

## Contexto

Projeto full stack desenvolvido no processo seletivo da empresa [Lexart Labs](https://lexartlabs.com/).

A proposta foi desenvolver um web scraping de produtos dos sites do Mercado Livre e Buscapé. 

**Regras de negócio**
- Através de um menu suspenso, o usuário pode escolher entre as categorias: celular, geladeira e tv.
- Através de um menu suspenso, o usuário pode escolher entre os sites: Mercado Livre e Buscapé.
- Deverá ter uma entrada de texto livre para buscar por outros produtos. 
- A pesquisa deve trazer uma lista de produtos com foto, descrição, categoria, preço e site.
- O resultado da busca por categoria deverá ser armazenado em um banco de dados.

---

## Instalando as dependências

**Pré-requisitos para rodar o projeto**:

  - NPM


**Como instalar**

  - Faça o clone do projeto com os comandos abaixo:
  
      - `git clone git@github.com:caroline-boaventura/WebScraping-BackEnd.git`
      
      - cd `WebScraping-BackEnd`
      
      - Instale as dependências:
      
          - `npm install`
      
      - Renomear o arquivo `.env.exemple` para `.env`
      
      - Execute o projeto:
      
        - `npm start`

[Repositório Front-End](https://github.com/caroline-boaventura/-WebScraping-FrontEnd/tree/develop)

---

## Modo de utilização

A API possui uma rota:

  - `/search`[`POST`] => Retorna a lista de produtos pesquisados

---

## Modo de desenvolvimento
**Tecnologias utilizadas**
  - NodeJS com express
  - Mongoose
  - Cors
  - Puppeteer

---

## Próximos passos
- Melhorar web scraping do site Buscapé, pois o mesmo às vezes redireciona para páginas externas. 
- Desenvolver testes.

---

## Contatos
### Caroline Boaventura
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" height=20px>      https://www.linkedin.com/in/caroline-boaventura/
<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" height=20px>      https://github.com/caroline-boaventura
<img src="https://logospng.org/download/gmail/logo-gmail-512.png" height=20px>      caroline.boaventura08@gmail.com