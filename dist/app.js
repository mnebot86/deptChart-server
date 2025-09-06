"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const morgan_1 = __importDefault(require("morgan"));
const pino_http_1 = __importDefault(require("pino-http"));
const logger_1 = require("./utils/logger");
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const express_2 = require("@clerk/express");
const routes_1 = __importDefault(require("./routes"));
// import routes from './routes';
const notFoundHandler_1 = require("./middlewares/notFoundHandler");
const errorHandler_1 = require("./middlewares/errorHandler");
// ---- Env ----
const PORT = Number(process.env.PORT || 4000);
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dept_chart';
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: (_origin, callback) => callback(null, true),
        credentials: true,
    },
});
exports.io = io;
logger_1.logger.info({ module: 'socket' }, 'Socket.IO initialized');
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: '1mb' }));
app.use((0, express_2.clerkMiddleware)());
app.use((0, express_rate_limit_1.default)({ windowMs: 60_000, max: 300 }));
app.use((0, morgan_1.default)(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use((0, pino_http_1.default)({ logger: logger_1.logger }));
// ---- Socket.IO ----
io.on('connection', (socket) => {
    logger_1.logger.info({ id: socket.id }, '[socket] connected');
    socket.on('message', (data) => {
        logger_1.logger.debug({ id: socket.id, data }, '[socket] message');
        socket.emit('message', data);
    });
    socket.on('disconnect', (reason) => {
        logger_1.logger.info({ id: socket.id, reason }, '[socket] disconnected');
    });
});
// ---- Routes ----
app.get('/api/v1/health', (_req, res) => {
    res.json({ ok: true, env: NODE_ENV, mongo: mongoose_1.default.connection.readyState });
});
app.use('/api/v1', routes_1.default);
app.use(notFoundHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
const startServer = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        logger_1.logger.info('[server] Connected to MongoDB');
        server.listen(PORT, () => {
            logger_1.logger.info({ port: PORT }, '[server] Listening');
        });
    }
    catch (error) {
        logger_1.logger.error({ err: error }, '[server] Startup error');
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=app.js.map