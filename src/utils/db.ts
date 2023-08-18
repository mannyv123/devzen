import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("No db connection uri provided");
}

let dbConnection: mongoose.Connection | null = null;

const connectToDb = async () => {
    if (dbConnection) {
        console.log("Existing connection to database");
        return dbConnection;
    }

    try {
        //Connect to the database
        const connection = await mongoose.connect(MONGODB_URI);

        dbConnection = connection.connection;
        console.log("Connected to the database");
        return dbConnection;
    } catch (err) {
        console.log(err);
        throw new Error(`Error connecting to the database: ${err}`);
    }
};

const disconnectFromDb = async () => {
    if (dbConnection) {
        await dbConnection.close();
        dbConnection = null;
    }
};

export { connectToDb, disconnectFromDb };
