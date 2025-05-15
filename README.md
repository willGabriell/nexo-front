# Nexo Flashcards

Sistema de flashcards desenvolvido em Angular para auxiliar nos estudos e memorização de conteúdos.

## Funcionalidades
- Cadastro e autenticação de usuários
- Criação, edição e exclusão de flashcards
- Organização de flashcards por categorias
- Dashboard com visão geral

## Instalação
1. Instale a Angular CLI globalmente (caso ainda não tenha):
   ```sh
   npm install -g @angular/cli
   ```
2. Clone o repositório:
   ```sh
   git clone https://github.com/willGabriell/nexo-front
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

## Como executar
Para iniciar o servidor de desenvolvimento:
```sh
ng serve
```
Acesse o sistema em `http://localhost:4200`.

## Estrutura de Pastas
- `src/app/auth` — Autenticação (login e registro)
- `src/app/core` — Serviços, guards e interceptors
- `src/app/pages` — Páginas principais (dashboard, lista de flashcards)
- `src/app/shared` — Componentes compartilhados (navbar)

---

> Projeto desenvolvido para fins de estudo.
