export default function handler(req, res) {
  if (req.method === "POST") {
    const event = req.body;

    // Contoh: cek pembayaran Midtrans
    if (event.transaction_status === "settlement") {
      // Kirim notif ke pembeli/pusat bot via Fonnte
      fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          "Authorization": process.env.FONNTE_TOKEN
        },
        body: JSON.stringify({
          target: event.order_id,
          message: "🔔 Pembayaran sudah diterima!\nOrder ID: " + event.order_id
        })
      });
    }

    return res.status(200).json({ message: "OK" });
  }

  res.status(405).json({ message: "Method Not Allowed" });
          }
