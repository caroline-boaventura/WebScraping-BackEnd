require('dotenv').config();
const mongoose = require('mongoose');


const connectDatabase = async () => {
    try {
        const connectionString = process.env.CONNECTION_STRING;

        await mongoose
            .connect(connectionString)
        
        console.log("MongoDB Atlas Connected")
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDatabase;