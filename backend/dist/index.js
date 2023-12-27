"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./db/connection");
const connectDB = async () => {
    await (0, connection_1.connectDataBase)();
    app_1.default.listen(process.env.PORT, () => {
        console.log(`port is running in ${process.env.PORT}`);
    });
};
connectDB();
//# sourceMappingURL=index.js.map