/**
 * Created by wuxiaoran on 2017/7/20.
 */
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  date: {
    type: Number,
    default: Date.now(),
  },
  content: {
    type: String,
    required: true,
  }
},{
  collect: 'todos',
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
