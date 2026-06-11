import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const videojuegos = [
  { id: 1, titulo: "Rust", descripcion: "Juego de supervivencia extrema y mundo abierto." },
  { id: 2, titulo: "EA Sports FC", descripcion: "Simulador de fútbol profesional con modos competitivos." },
  { id: 3, titulo: "Valorant", descripcion: "Shooter táctico en primera persona basado en personajes." },
  { id: 4, titulo: "Counter-Strike 2", descripcion: "Acción táctica pura y juego competitivo por equipos." },
  { id: 5, titulo: "Resident Evil 2 Remake", descripcion: "Survival horror clásico completamente reinventado." }
];

app.get('/api/videojuegos', (req, res) => {
  const q = req.query.q ? req.query.q.toLowerCase() : '';
  if (!q) {
    return res.json(videojuegos);
  }
  const filtrados = videojuegos.filter(item => 
    item.titulo.toLowerCase().includes(q) || 
    item.descripcion.toLowerCase().includes(q)
  );
  res.json(filtrados);
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});