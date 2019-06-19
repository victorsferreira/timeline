import * as mongoose from "mongoose";

const schema = {
    identifier: { type: String, index: { unique: true } },
    secret: String,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    updatedAt: Date,
};

export const EventSchema = new mongoose.Schema(schema, { collection: "event" });