import mongoose from 'mongoose';
const { Schema } = mongoose;

const newsSchema = new Schema({
    title: String,
    author: String,
    content: String,
    tags: [String]
});

const News = mongoose.model('News',newsSchema);