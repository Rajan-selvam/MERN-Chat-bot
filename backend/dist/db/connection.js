"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disConnectDatabase = exports.connectDataBase = void 0;
const mongoose_1 = require("mongoose");
const connectDataBase = async () => {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URL).then(data => {
            console.log(`MongoDB connected with server: ${data.connection.host} at port ${data.connection.port}`);
        });
    }
    catch (error) {
        console.error(error);
        throw new Error('Something Went Wrong at server When Connecting MongoDB');
    }
};
exports.connectDataBase = connectDataBase;
const disConnectDatabase = async () => {
    try {
        await (0, mongoose_1.disconnect)();
    }
    catch (error) {
        console.error(error);
        throw new Error('Something Went Wrong at Server when Disconnecting MongoDB');
    }
};
exports.disConnectDatabase = disConnectDatabase;
//# sourceMappingURL=connection.js.map