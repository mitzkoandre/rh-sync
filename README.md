# RH Sync

## Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Para executar
```bash
npm run start
```

## O que faz

- Consome API RandomUser
- Filtra usuarios maiores de 18 anos
- Salva em SQLite
- Atualiza registros existentes (verifica email)
- Gera relatório em relatorio-sincronizacao.txt