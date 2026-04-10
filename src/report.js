import fs from 'fs';

export function generateReport(stats) {
  const detalhes = stats.details.length > 0 
    ? stats.details.join('\n')
    : 'Nenhum detalhe registrado.';

  const report = `
========================================
       RELATÓRIO DE SINCRONIZAÇÃO RH
========================================
Data: ${new Date().toLocaleString('pt-BR')}

Resumo:
---------------------------------------
Total de registros recebidos: ${stats.total}
Usuários maiores de 18 anos:  ${stats.adults}
Registros adicionados:        ${stats.added}
Registros atualizados:        ${stats.updated}
Registros ignorados:          ${stats.ignored}
Erros:                        ${stats.errors}

Detalhes:
${detalhes}

========================================
  `.trim();

  fs.writeFileSync('relatorio-sincronizacao.txt', report);
  console.log('Relatório gerado: relatorio-sincronizacao.txt');
}