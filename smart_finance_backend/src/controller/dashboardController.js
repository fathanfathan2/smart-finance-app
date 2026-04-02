import { pool } from '../config/database.js';

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const [lastHealthCheck] = await pool.query(
      `SELECT id, monthly_income, monthly_expenses, monthly_debt_payment,
              debt_to_income_ratio, expense_to_income_ratio, emergency_fund_months,
              status, score, created_at
       FROM financial_health_checks
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId],
    );

    const [activeBookings] = await pool.query(
      `SELECT b.id, b.booking_date, b.booking_time, b.consultation_method, b.status,
              c.name as consultant_name, c.photo_url, c.specialization
       FROM bookings b
       JOIN consultants c ON b.consultant_id = c.id
       WHERE b.user_id = ? AND b.status = 'booked' AND b.booking_date >= CURDATE()
       ORDER BY b.booking_date ASC, b.booking_time ASC
       LIMIT 3`,
      [userId],
    );

    const [[{ total_checks }]] = await pool.query(
      'SELECT COUNT(*) as total_checks FROM financial_health_checks WHERE user_id = ?',
      [userId],
    );

    const tips = generateDailyTip(lastHealthCheck[0]?.status);

    return res.status(200).json({
      status: 'success',
      data: {
        last_health_check: lastHealthCheck[0] || null,
        active_bookings: activeBookings,
        total_health_checks: total_checks,
        daily_tip: tips,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return res
      .status(500)
      .json({ status: 'error', message: 'Terjadi kesalahan server.' });
  }
};

const generateDailyTip = (status) => {
  const tips = {
    Sehat: [
      'Pertahankan kondisi keuangan Anda. Pertimbangkan untuk mulai berinvestasi di reksa dana.',
      'Keuangan Anda sehat. Tingkatkan dana darurat hingga 6 bulan pengeluaran.',
      'Coba alokasikan 20% penghasilan untuk investasi jangka panjang.',
    ],
    Rawan: [
      'Usahakan cicilan tidak lebih dari 30% dari penghasilan Anda.',
      'Kurangi pengeluaran tidak esensial dan fokus lunasi utang tertinggi terlebih dahulu.',
      'Coba metode budgeting 50/30/20: 50% kebutuhan, 30% keinginan, 20% tabungan.',
    ],
    Kritis: [
      'Kondisi kritis. Segera konsultasikan keuangan Anda dengan ahli.',
      'Hindari menambah utang baru dalam kondisi ini. Fokus pada restrukturisasi.',
      'Cari sumber penghasilan tambahan untuk membantu menutup cicilan.',
    ],
  };

  const statusTips = tips[status] || tips['Rawan'];
  const randomIndex = Math.floor(Math.random() * statusTips.length);
  return statusTips[randomIndex];
};

export { getDashboard };
