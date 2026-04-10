import axios from 'axios';
import { createTable, saveUser } from './database.js';
import { generateReport } from './report.js';
import {
  fetchUsers,
  filterAdults,
  mapUser
} from './service.js';

async function main() {
  console.log('Iniciando sincronização de usuários RH...\n');

  createTable();

  let stats = {
    total: 0,
    adults: 0,
    added: 0,
    updated: 0,
    ignored: 0,
    errors: 0,
    details: []
  };

  try {
    // 1. Busca os usuários
    const users = await fetchUsers();
    stats.total = users.length;

    // 2. Filtra maiores de 18
    const adultUsers = filterAdults(users);
    stats.adults = adultUsers.length;
    stats.ignored = stats.total - stats.adults;

    // 3. Processa cada usuário
    for (const user of adultUsers) {
      const userData = mapUser(user);

      try {
        const result = saveUser(userData);

        if (result.wasUpdated) {
          stats.updated++;
          stats.details.push(`Atualizado: ${userData.fullName}`);
        } else {
          stats.added++;
          stats.details.push(`Adicionado: ${userData.fullName}`);
        }
      } catch (err) {
        stats.errors++;
        stats.details.push(`Erro ao salvar ${userData.fullName}: ${err.message}`);
      }
    }

    generateReport(stats);

    console.log('\nSincronização concluída com sucesso!');
    console.log(`Adicionados: ${stats.added} | Atualizados: ${stats.updated} | Ignorados: ${stats.ignored}`);

  } catch (error) {
    console.error('Erro na execução:', error.message);
  }
}

main();