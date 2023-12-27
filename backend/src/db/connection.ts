import { connect, disconnect } from "mongoose";
  
export const connectDataBase =  async () => {
    
    try {        
        await connect(process.env.MONGODB_URL).then(data => {
            console.log(`MongoDB connected with server: ${data.connection.host} at port ${data.connection.port}`);
        })

    } catch (error: any) {
        console.error(error)    
        throw new Error('Something Went Wrong at server When Connecting MongoDB')
    }
};

export const disConnectDatabase = async () => {
    try {
        await disconnect()
    } catch (error) {
        console.error(error);
        throw new Error('Something Went Wrong at Server when Disconnecting MongoDB')
    }
}
