# Entre páginas

App web em português para acompanhar leituras, criado a partir dos seis livros do PDF fornecido. Sem dependências de execução e sem serviços externos.

## Executar

Com Node.js 18+ e Python 3 instalados:

```sh
cd /workspace/livros
npm start
```

Servidor na porta 3000. Para validar as regras de progresso: `npm test`.

## Dados

Os dados são armazenados no localStorage do navegador, por origem. Não há conta, sincronização entre dispositivos ou servidor de dados. Use **Exportar backup** para baixar um JSON; a restauração pela interface ainda não está implementada. Limpar os dados do navegador remove os registros locais.

A evolução registra alterações de página e status feitas no app. O progresso importado é apenas o ponto de partida, sem datas de leitura inventadas. Totais ausentes no PDF permanecem não informados; os números fornecidos foram preservados. Para marcar como concluído, informe o total e a última página.

## Publicar na Vercel

Envie os arquivos deste projeto para o repositório GitHub e importe-o na Vercel. Use a pasta que contém `package.json` como Root Directory (a raiz se estes arquivos estiverem na raiz do repositório).

O `vercel.json` define o preset sem framework, o comando `npm run build` e a saída `dist`. Não são necessárias variáveis de ambiente, banco de dados ou servidor Python na hospedagem. O build copia apenas os quatro arquivos públicos do app.

Para verificar antes de publicar: `npm test` e `npm run build`.

Os registros locais não migram para o domínio da Vercel. Cada domínio e navegador mantém seus próprios dados; exporte um backup antes de mudar de endereço. A interface ainda não oferece importação desse backup.
