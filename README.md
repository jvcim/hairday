# Hairday

Hairday is a web application for scheduling haircuts. It includes a small JSON API powered by `json-server` and a webpack based front-end build.

## Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your machine.

## Setup

Install dependencies:

```bash
npm install
```

### Start the JSON server

Runs `json-server` to provide the mock API used by the application.

```bash
npm run server
```

### Launch the development server

Starts `webpack-dev-server` for local development with hot reload.

```bash
npm run dev
```

### Build for production

Bundle the application with webpack.

```bash
npm run build
```

The production files will be generated in the `dist` folder.

