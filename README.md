# Axis

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

## Arquitetura e organização

- **Standalone + Domain first**: rotas e componentes são standalone. As features vivem em `src/app/modules`, isolando responsabilidades de domínio (ex.: `auth`, `dashboard`).
- **Cross-cutting**: serviços compartilhados, guards e interceptors ficam em `src/app/core`.
- **Reutilização**: dependências comuns para componentes ficam em `src/app/shared/shared.imports.ts` (substitui um `SharedModule`).
- **Configuração**: variáveis de ambiente (ex.: Firebase) residem em `src/environments`. Os providers globais são registrados em `src/app/app.config.ts`.
- **Rotas**: rotas base em `src/app/app.routes.ts`; cada feature pode expor seu próprio arquivo de rotas (ex.: `modules/auth/auth.routes.ts`) para lazy loading.
- **HTTP**: interceptors de autenticação e de erros estão em `src/app/core/interceptors`. Prefira manter apenas a versão standalone (`HttpInterceptorFn`) para evitar duplicidade.

```
src/
  app/
    core/                 # Auth, guards, interceptors, serviços cross-cutting
    modules/
      auth/               # Fluxos de login/registro (rotas standalone)
      dashboard/          # Módulo/feature protegida
    shared/               # Imports compartilhados para componentes standalone
    app.config.ts         # Providers globais (router, HTTP, Firebase, etc.)
    app.routes.ts         # Rotas raiz e lazy loading
  environments/           # Variáveis de ambiente
```

### Sugestões rápidas de melhoria

- Padronizar todos os arquivos como UTF-8 para evitar caracteres corrompidos nos comentários.
- Remover as versões baseadas em classe dos interceptors (`HttpInterceptorService`/`ErrorInterceptorService`) e manter apenas os `HttpInterceptorFn`.
- Criar um diretório `shared/ui` ou `shared/components` para componentes visuais reutilizáveis conforme forem surgindo.
- Adicionar paths no `tsconfig.json` (`@app/*`, `@core/*`, `@shared/*`) para imports mais limpos.
- Documentar no README onde configurar as credenciais do Firebase em `src/environments`.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
