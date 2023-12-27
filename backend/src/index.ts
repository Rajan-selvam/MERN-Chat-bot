import app from "./app";
import { connectDataBase } from "./db/connection";

const connectDB = async () => {
      await connectDataBase();
      app.listen(process.env.PORT, () => {
        console.log(`port is running in ${process.env.PORT}`);
      });
};

connectDB()