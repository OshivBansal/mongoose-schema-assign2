const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true, minlength: 5 },
  commentedAt: { type: Date, default: Date.now }
});

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true, minlength: 5 },
  content: { type: String, required: true, minlength: 50 },
  author: { type: String, required: true },
  tags: [{ type: String }],
  category: { type: String, default: 'General' },
  likes: [{ type: String }],
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

BlogPostSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
