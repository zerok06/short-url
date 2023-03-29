import mongoose from "mongoose";


const MONGODB_URI = process.env.DATABASE_URI

if (!MONGODB_URI) {
    console.error('Porfavor defina la variable de entorno DATABASE_URI en el archivo de ".env"')
}



const dbConnect = async () => mongoose.connect(MONGODB_URI)


export default dbConnect