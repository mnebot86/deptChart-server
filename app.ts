import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import pinoHttp from 'pino-http';
import { logger } from './utils/logger';
import mongoose from 'mongoose';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

// import routes from './routes';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';

// ---- Env ----
const PORT = Number(process.env.PORT || 4000);
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dept_chart';

const app = express();

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: (_origin, callback) => callback(null, true),
    credentials: true,
  },
});

logger.info({ module: 'socket' }, 'Socket.IO initialized');

app.use(helmet());
app.use(cors());

app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 60_000, max: 300 }));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(pinoHttp({ logger }));

// ---- Socket.IO ----
io.on('connection', (socket) => {
  logger.info({ id: socket.id }, '[socket] connected');

  socket.on('message', (data) => {
    logger.debug({ id: socket.id, data }, '[socket] message');
    socket.emit('message', data);
  });

  socket.on('disconnect', (reason) => {
    logger.info({ id: socket.id, reason }, '[socket] disconnected');
  });
});

// ---- Routes ----
app.get('/api/v1/health', (_req, res) => {
  res.json({ ok: true, env: NODE_ENV, mongo: mongoose.connection.readyState });
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('[server] Connected to MongoDB');
    server.listen(PORT, () => {
      logger.info({ port: PORT }, '[server] Listening');
    });
  } catch (error) {
    logger.error({ err: error }, '[server] Startup error');
    process.exit(1);
  }
}

startServer();

export default app;
export { io };
