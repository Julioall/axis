# Configuração do Firebase no Projeto AXIS

## 📋 Pré-requisitos

- Node.js instalado (versão 16+)
- npm ou yarn instalados
- Projeto criado no Firebase Console (https://console.firebase.google.com)

## 🚀 Passos de Instalação

### 1. Instalar AngularFire

Execute o comando abaixo na raiz do projeto:

```bash
ng add @angular/fire
```

Ou manualmente instale os pacotes:

```bash
npm install firebase @angular/fire
```

### 2. Configurar credenciais do Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto
3. Vá em **Configurações do Projeto** (ícone de engrenagem)
4. Na seção **Seus apps**, clique em **</> (Web)**
5. Copie a configuração do Firebase (você verá algo assim):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234efgh5678",
  measurementId: "G-XXXXXXXXXX"
};
```

### 3. Atualizar arquivo `environment.ts`

Edite o arquivo `/src/environments/environment.ts` e substitua as credenciais:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcd1234efgh5678",
    measurementId: "G-XXXXXXXXXX"
  }
};
```

### 4. Atualizar arquivo `environment.prod.ts`

Faça o mesmo para `/src/environments/environment.prod.ts`

### 5. Configurar `app.module.ts` ou `main.ts`

**Se usando Angular 14+**, adicione ao `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Se usando Angular 19+ (standalone)**, adicione ao `main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module'; // Ajuste conforme necessário
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ]
}).catch(err => console.error(err));
```

### 6. Habilitar Autenticação por E-mail/Senha no Firebase

1. No Firebase Console, vá para **Authentication > Sign-in method**
2. Clique em **Email/Password**
3. Ative **Email/Password**
4. Clique em **Salvar**

## ✅ Verificação

1. Execute o projeto:
```bash
ng serve
```

2. Acesse `http://localhost:4200`
3. Teste o fluxo de login/cadastro

## 🔐 Segurança

- **Nunca commite** as credenciais reais do Firebase no repositório
- Use variáveis de ambiente em produção
- Implemente regras de Firestore/Realtime Database apropriadas

## 📚 Referências

- [AngularFire Documentation](https://github.com/angular/angularfire)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com)

---

**Após seguir estes passos, a autenticação estará totalmente funcional!**
