import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        const mongoUrl = process.env.MONGODB_URL!
        await mongoose.connect(mongoUrl)
        console.log('Mongodb connection successfull')
    } catch (error) {
        console.error("Error in connecting Db", error)
        process.exit(1)
    }
}

export default connectDB