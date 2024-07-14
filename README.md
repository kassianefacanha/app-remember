
# APP Remember Me

A ideia é criar um sistema que facilite a vida de pessoas e familiares de pessoas com Alzheimer.

## Funcionalidades da primeira versão:

- Diário.
- Linha do Tempo.
- Reconhecimento facial para pessoas próximas.
- Mapa para pessoas conseguirem se localizar.
- Shopping para especificar ferramentas do mercado atual para cuidar de pessoas com Alzheimer.
- Calendário com a rotina da pessoa que pode ser auxiliada pela família, mas ajuda a pessoa com Alzheimer a manter a rotina.
- Médicos especialistas no Brasil.
- Chat de IA para ajudar a usar o próprio APP.
- Jogos de memória.

### Funcionalidades da segunda versão:

- Chat para contato com médicos e app para médicos.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v12 ou superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) ou [npm](https://www.npmjs.com/get-npm)

## Instalação

Siga estas etapas para configurar o projeto em seu ambiente local.

### 1. Clone o Repositório

```sh
git clone https://github.com/kassianefacanha/app-remember
cd app-remember
```

### 2. Instale as Dependências do Frontend

Navegue até o diretório do frontend e utilize o Yarn ou npm para instalar as dependências do projeto.

Com Yarn:
```sh
yarn install
```

Com npm:
```sh
npm install
```

### 3. Instale as Dependências do React Navigation

Certifique-se de instalar as dependências necessárias para o React Navigation:

```sh
expo install @react-navigation/native
expo install react-native-screens react-native-safe-area-context
expo install @react-navigation/stack
```

### 4. Instale as Dependências do Backend

Navegue até o diretório do backend e instale as dependências:

```sh
cd backend
yarn install
```

ou

```sh
npm install
```

## Executando o Projeto

### 1. Inicie o Servidor de Desenvolvimento do Backend

Navegue até o diretório do backend e inicie o servidor:

Com Yarn:
```sh
yarn start
```

Com npm:
```sh
npm start
```

### 2. Inicie o Servidor de Desenvolvimento do Frontend

Navegue de volta para o diretório raiz e inicie o servidor de desenvolvimento do Expo:

Com Yarn:
```sh
yarn start
```

Com npm:
```sh
npm start
```

### 3. Abra o Projeto no Expo Go

- **Android:** Escaneie o código QR com o aplicativo [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) ou use um emulador Android.
- **iOS:** Escaneie o código QR com o aplicativo [Expo Go](https://apps.apple.com/app/expo-go/id982107779) ou use um emulador iOS.

## Estrutura de Pastas

Uma visão geral da estrutura de pastas do projeto:

```
app-remember/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── .gitignore
│ ├── package-lock.json
│ ├── package.json
│ └── server.js
├── frontend/
│ └── src/
│ ├── assets/
│ ├── components/
│ │ ├── atoms/
│ │ ├── molecules/
│ │ ├── organisms/
│ │ ├── pages/
│ │ └── templates/
│ ├── App.js
│ ├── index.js
│ ├── .gitignore
│ ├── App.js
│ ├── app.json
│ ├── babel.config.js
│ ├── package-lock.json
│ ├── package.json
└── README.md
```

## Configuração Adicional

### Links Úteis

- [Documentação do React Native](https://reactnative.dev/docs/getting-started)
- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do React Navigation](https://reactnavigation.org/docs/getting-started)
- [Documentação do Node.js](https://nodejs.org/en/docs/)

### Problemas Comuns

- **Problema:** Erro `Unable to resolve module ...`
  - **Solução:** Tente limpar o cache do Metro Bundler: `npm start -- --reset-cache`

- **Problema:** Erro `Network response timed out`
  - **Solução:** Verifique sua conexão de internet ou tente reiniciar o Expo.

## Contribuição

Se você deseja contribuir com o projeto, por favor, siga estas etapas:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça suas modificações e commite suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Envie para a branch original (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
```

Este README atualizado agora inclui instruções detalhadas para instalação e execução tanto do frontend quanto do backend, além de manter a estrutura clara e organizada para novos desenvolvedores.