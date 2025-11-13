# Plano de Desenvolvimento (Roadmap) para o Sistema de Gestão de Turmas (SGT)

## 1. Objetivo do Projeto

O objetivo deste projeto é desenvolver um **Sistema de Gestão de Turmas (SGT)**, uma aplicação web centralizada, para substituir o atual fluxo de trabalho manual do tutor, que se baseia em planilhas (.xls, .xlsx) e documentos (.pdf). A solução visa otimizar o tempo do tutor, melhorar o acompanhamento dos alunos e garantir a padronização e qualidade das atividades de tutoria, conforme as diretrizes institucionais.

## 2. Metodologia

Adotaremos uma **Metodologia de Desenvolvimento Ágil**, utilizando **Ciclos de Entrega (Sprints)**. Esta abordagem permitirá entregas incrementais de valor, começando pela fundação do sistema e evoluindo para funcionalidades complexas, garantindo feedback contínuo e alinhamento com as necessidades operacionais do tutor.

## 3. Estrutura de Dados (Entidades)

A seguir, estão listadas as principais entidades de dados identificadas a partir da análise dos documentos, que servirão como base para a modelagem do banco de dados:

- **Tutor/Usuário:** Dados de autenticação e perfil. (Necessário para Login/Autenticação)
- **Turma:** Identificação da turma, período, curso. (Base para todas as operações)
- **Aluno:** Cadastro, status (ativo, pendente, desistente), informações de contato (para resgate).
- **Unidade Curricular (UC)/Módulo:** Estrutura do curso, cronograma, datas de início/fim.
- **Atividade/SAP (Situação de Aprendizagem):** Tipo de atividade, prazo de entrega, status de correção, nota.
- **Web Aula:** Título, data/hora agendada, link de gravação, status de postagem.
- **Mensagem/Comunicação:** Tipo (e-mail, chat, fórum, mensagem semanal), destinatário, conteúdo, status de resposta (prazo de 48h úteis).
- **TODO/Tarefa:** Lista de tarefas diárias/semanais (Corrigir, Responder, Planejar, Ligar para aluno).
- **Nota/Avaliação:** Registro de notas de atividades, momentos presenciais e recuperações (paralela e final).
- **Relatório:** Dados agregados para geração de relatórios (ex: Relatório de Notas, Desempenho).

### 3.1. Diagrama de Entidade-Relacionamento (DER)

Para garantir a modelagem correta do banco de dados (Firestore ou similar), o Diagrama de Entidade-Relacionamento (DER) a seguir ilustra as conexões entre as entidades principais:

![Diagrama de Entidade-Relacionamento (DER) do SGT](https://private-us-east-1.manuscdn.com/sessionFile/GNxzw4RJx72es0eDIBi4jA/sandbox/1bM1W3rECJNUb3RFGDzKlJ-images_1763044682824_na1fn_L2hvbWUvdWJ1bnR1L2Rlcl9zZ3Q.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvR054enc0Ukp4NzJlczBlRElCaTRqQS9zYW5kYm94LzFiTTFXM3JFQ0pOVWIzUkZHRHpLbEotaW1hZ2VzXzE3NjMwNDQ2ODI4MjRfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyUmxjbDl6WjNRLnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=deDSGivQMTiyLcaeg2JIj13IQ1ZzARcc9KOP5q9GGIeQqf50NijK1uJ5XkXBiaVHO4MKCKuMqCtxCtKCU4PxqvJYMwVUEA3kMtBvZIj7nUEnIabd6nHfKk~oLT-z08xnCV27XZBqVdg3pdXAEjBDN9WWQ5IvD2~tXnxJyJm9YCsh7KUWWqOi~ryMniR1pBLMiZryXxDSBejt2yfxHdoNchAEKMJFonbKyAyhkF0~kmwbteZsE4Cwjer~j~Wqi8VFA-BGmbIwzgJ7Q5ovCX81C6ZnhQGJSjhLqw~cGjLfsTThnXwhdpH6yI7Yx0htOPmSiHUIr5gh7zdJ7IeEk4U27A__)

## 4. Ciclos de Entrega (Roadmap)

**Princípio Guia: O Painel do Tutor (Ciclo 5) como Foco Central**

Conforme o feedback, o **Painel do Tutor** (originalmente no Ciclo 5) é o objetivo principal do projeto, pois unifica o fluxo de trabalho diário. Portanto, todas as funcionalidades desenvolvidas nos Ciclos 2, 3 e 4 serão projetadas para **alimentar diretamente** esse painel, garantindo que a experiência do usuário final seja priorizada desde o início.

### Ciclo 1: Fundação, Estrutura e Comunicação Básica (Ciclo 1)

**Objetivo:** Estabelecer a base do sistema, autenticação do tutor e o módulo inicial de comunicação e gerenciamento de turmas.

**Funcionalidades Principais:**
  - Módulo de Autenticação (Login/Logout) para o Tutor.
  - Cadastro e Gerenciamento Básico de Turmas e Alunos (Importação inicial de dados).
  - Validação da Sala Virtual (Checklist) - Substitui a verificação manual de estrutura (Guia de Trabalho).
  - Módulo de Comunicação: Envio de mensagens (e-mail/AVA) para alunos e unidades.
  - Registro de Status de Aluno (Inscrito, Pendente, Desistente) - Substitui a verificação manual (Guia de Trabalho).

**Requisitos e Insights Importantes:**
  > Foco na base do sistema. O Guia de Trabalho exige a 'Verificação de estrutura e funcionalidades da sala virtual' e 'Verificar o status dos alunos inscritos' antes do início da UC. O SGT deve automatizar esse checklist e o registro de status.

### Ciclo 2: Gestão de Atividades, Correção e Notas (Ciclo 2)

**Objetivo:** Digitalizar o processo de correção de atividades, lançamento de notas e gestão de web aulas, que consomem a maior parte do tempo diário do tutor.

**Funcionalidades Principais:**
  - Módulo de Atividades/SAP: Cadastro de atividades com prazos de entrega e recuperação.
  - Painel de Correção: Lista priorizada de atividades a corrigir (diariamente, observando prioridades de entregas - Guia de Trabalho). **(Alimenta o widget "Pendências de Correção" do Painel do Tutor)**
  - Lançamento de Notas: Interface para registro de notas de SAP e Momentos Presenciais (prazo de 48h úteis - Guia de Trabalho).
  - Módulo de Feedback: Ferramenta para aplicar modelos de feedback personalizado (p.76 do Guia do Tutor).
  - Gestão de Web Aulas: Agendamento, registro de links de gravação e status de postagem (24h úteis - Guia de Trabalho). **(Alimenta o widget "Agenda do Dia/Semana" do Painel do Tutor)**

**Requisitos e Insights Importantes:**
  > Este ciclo digitaliza a principal tarefa diária do tutor: 'Corrigir atividades' e 'Lançar notas'. O sistema deve garantir que o feedback seja 'personalizado e humanizado' e que os prazos de 48h para lançamento de notas sejam respeitados.

### Ciclo 3: Monitoramento, Comunicação Avançada e Resgate (Ciclo 3)

**Objetivo:** Implementar a lógica de monitoramento de desempenho e o fluxo de recuperação paralela, garantindo que o tutor possa agir rapidamente sobre as pendências dos alunos.

**Funcionalidades Principais:**
  - Monitoramento de Entregas: Visão clara de alunos com pendências de entrega de atividades. **(Alimenta o widget "Alerta de Pendências" do Painel do Tutor)**
  - Módulo de Resgate (Recuperação Paralela): Ferramenta para gerar e enviar mensagens de contato (e-mail/AVA) para alunos pendentes (imediatamente após a correção - Guia de Trabalho).
  - Registro de Contato: Log de todas as tentativas de contato (ligação, mensagem) com o aluno. **(Alimenta o widget "Lista de Tarefas (TODO)" do Painel do Tutor)**
  - Gestão de Mensagens Semanais: Ferramenta para criar e agendar o envio de mensagens de início e fim de semana (semanalmente - Guia de Trabalho).

**Requisitos e Insights Importantes:**
  > Focado na 'Atividade de monitoramento para resgate do aluno' (Recuperação Paralela). O sistema deve identificar automaticamente os alunos com pendências e facilitar o contato imediato, substituindo a verificação diária manual.

### Ciclo 4: Planejamento e Integração com o Presencial (Ciclo 4)

**Objetivo:** Digitalizar o fluxo de trabalho de planejamento, alinhamento com professores presenciais e preparação de dados para reuniões com as Unidades.

**Funcionalidades Principais:**
  - Gestão de Alinhamentos: Cadastro e acompanhamento de reuniões de alinhamento (quinzenal, professor presencial - Plano de Trabalho). **(Alimenta o widget "Agenda do Dia/Semana" do Painel do Tutor)**
  - Módulo de Planejamento: Ferramenta para auxiliar na 'Preparação de material didático do conteúdo da UC' e 'Estudar material para momento web' (Guia de Trabalho).
  - Preparação de Dados para Reunião: Geração de relatórios de desempenho para 'Preparar conteúdo para reunião com Unidades do presencial' (quinzenal - Guia de Trabalho).
  - Gestão de Documentos: Repositório para planos de aula, atas de alinhamento e materiais do MP (Momentos Presenciais).

**Requisitos e Insights Importantes:**
  > Este ciclo foca nas tarefas de planejamento e interação com a equipe presencial, que consomem a '4ª hora' do Plano de Trabalho. O sistema deve consolidar as informações necessárias para essas reuniões, como o 'Levantar desempenho dos alunos'.

### Ciclo 5: Painel de Controle e Otimização do Fluxo Diário (Ciclo 5)

**Objetivo:** Criar o Painel do Tutor, uma interface centralizada que organiza e prioriza as tarefas diárias e semanais, substituindo a necessidade de consultar o Plano de Trabalho em planilha.

**Funcionalidades Principais:**
  - Painel do Tutor (Dashboard): Visão centralizada e priorizada das tarefas diárias e semanais (Substitui o Plano de Trabalho_03.10.24.xlsx).
  - Lista de Tarefas (TODO): 'Responder e-mails', 'Responder chat', 'Corrigir SAP', 'Ligar para aluno' com status e contagem regressiva (48h úteis).
  - Agenda do Dia/Semana: Exibição de Web Aulas agendadas, Reuniões e Prazos de Atividades.
  - Alerta de Pendências: Notificações sobre alunos em risco de desistência ou com atividades pendentes.

**Requisitos e Insights Importantes:**
  > Este é o ciclo de otimização. Ele integra as funcionalidades construídas nos ciclos anteriores, garantindo que o tutor tenha uma visão 360º do seu fluxo de trabalho, otimizando o tempo gasto na '1ª hora' e '2ª e 3ª hora' do Plano de Trabalho.

### Ciclo 6: Encerramento, Relatórios e Análise de Desempenho (Ciclo 6)

**Objetivo:** Finalizar o ciclo da Unidade Curricular, gerenciar a recuperação final e fornecer ao tutor e à coordenação relatórios de desempenho e notas para análise e Conselho de Classe.

**Funcionalidades Principais:**
  - Módulo de Recuperação Final: Gestão do período de recuperação final e encerramento (em até 1 semana após o término da UC - Guia de Trabalho).
  - Geração de Relatório de Notas: Exportação de dados tratados em formato Excel para a coordenação (1º dia após o fechamento da recuperação - Guia de Trabalho).
  - Relatório de Desempenho da Turma: Análise de notas, engajamento e taxa de resgate.
  - Suporte ao Conselho de Classe: Geração de dados e relatórios para a participação do tutor no conselho.

**Requisitos e Insights Importantes:**
  > Focado nas ações de 'Final da Unidade Curricular' e 'Final de Módulo'. O sistema deve garantir a geração do 'Relatório de notas em Excel' e fornecer dados para análise de desempenho e participação no Conselho de Classe.
