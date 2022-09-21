import mongoose from 'mongoose';
const { Schema } = mongoose;

const articlesSchema = new Schema({
    title: String,
    author: String,
    content: String,
    thumbnail: String,
    tags: [String]
});

const usersSchema = new Schema({
    username: String,
    password: String,
});

export const Articles = mongoose.model('Articles',articlesSchema);
export const Users = mongoose.model('Users',usersSchema);