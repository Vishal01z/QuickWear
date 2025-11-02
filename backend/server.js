import express from 'express';
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/auth', authRoutes);

// Serve HTML files
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/routes/auth/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/routes/auth/signup.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));