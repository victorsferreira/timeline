import * as mongoose from "mongoose";

export class DB {
    constructor(){}
    static connect() {
        return mongoose.connect("mongodb://mongo/timeline");
    }
}