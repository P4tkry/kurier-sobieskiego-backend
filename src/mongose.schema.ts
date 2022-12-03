import mongoose from 'mongoose';
const { Schema } = mongoose;

const articlesSchema = new Schema({
    title: String,
    author: String,
    content: String,
    thumbnail: String,
    description: String,
    draft: {type: Boolean, default: true},
    tags: [String]
});

const usersSchema = new Schema({
    username: String,
    password: {type: String, required: false},
});

export const Articles = mongoose.model('Articles',articlesSchema);
export const Users = mongoose.model('Users',usersSchema);