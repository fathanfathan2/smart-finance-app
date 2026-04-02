import { pool, testConnection } from './database.js';

const createTables = async () => {
  await testConnection();

  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      photo_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS consultants (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      specialization VARCHAR(100) NOT NULL,
      bio TEXT,
      photo_url VARCHAR(255),
      rate INT NOT NULL,
      experience_years INT DEFAULT 0,
      rating DECIMAL(2,1) DEFAULT 0.0,
      total_reviews INT DEFAULT 0,
      is_available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS financial_health_checks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      monthly_income BIGINT NOT NULL,
      monthly_expenses BIGINT NOT NULL,
      monthly_debt_payment BIGINT NOT NULL,
      total_debt BIGINT DEFAULT 0,
      emergency_fund BIGINT DEFAULT 0,
      debt_to_income_ratio DECIMAL(5,2),
      expense_to_income_ratio DECIMAL(5,2),
      emergency_fund_months DECIMAL(4,1),
      status ENUM('Sehat', 'Rawan', 'Kritis') NOT NULL,
      score INT NOT NULL,
      recommendation TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      consultant_id INT NOT NULL,
      health_check_id INT,
      booking_date DATE NOT NULL,
      booking_time TIME NOT NULL,
      duration_minutes INT DEFAULT 60,
      consultation_method ENUM('chat', 'video_meeting') DEFAULT 'chat',
      topic TEXT,
      status ENUM('pending', 'booked', 'completed', 'cancelled') DEFAULT 'pending',
      total_fee INT,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (consultant_id) REFERENCES consultants(id) ON DELETE CASCADE,
      FOREIGN KEY (health_check_id) REFERENCES financial_health_checks(id) ON DELETE SET NULL
    )`,
  ];

  try {
    for (const query of queries) {
      await pool.query(query);
    }
    console.log('All tables created successfully');
    console.log('Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
};

createTables();
