"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';
mongoose_1.default.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to MongoDB');
    // Your server setup and route handling
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/', bookRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to redux book store');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
