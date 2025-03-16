// /api/booking.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process booking data from req.body (for demo, simply return a success message)
    res.status(200).json({ message: 'Booking received successfully!' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
