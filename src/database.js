import Database from 'better-sqlite3';

let db = null;

export function initDB() {
  if (db) return db;

  db = new Database('users.db');
  console.log('Banco de dados conectado.');
  return db;
}

export function createTable() {
  const db = initDB();

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      email           TEXT PRIMARY KEY,
      full_name       TEXT NOT NULL,
      gender          TEXT,
      age             INTEGER,
      country         TEXT,
      city            TEXT,
      phone           TEXT,
      picture         TEXT,
      registered_date TEXT,
      synced_at       TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Tabela users criada ou já existente.');
}

export function saveUser(userData) {
  const db = initDB();

  const existing = db.prepare('SELECT email FROM users WHERE email = ?').get(userData.email);

  const stmt = db.prepare(`
    INSERT INTO users (email, full_name, gender, age, country, city, phone, picture, registered_date)
    VALUES (@email, @fullName, @gender, @age, @country, @city, @phone, @picture, @registered_date)
    ON CONFLICT(email) DO UPDATE SET
      full_name       = excluded.full_name,
      gender          = excluded.gender,
      age             = excluded.age,
      country         = excluded.country,
      city            = excluded.city,
      phone           = excluded.phone,
      picture         = excluded.picture,
      registered_date = excluded.registered_date,
      synced_at       = CURRENT_TIMESTAMP
  `);

  const result = stmt.run(userData);

  return {
    ...result,
    wasUpdated: !!existing   // true = atualizou | false = inseriu novo
  };
}

export default initDB();