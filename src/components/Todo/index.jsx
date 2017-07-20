import React, { Component } from 'react'
import { api } from '../../utils/api';
import List from './List'
import './index.css';

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
			showTooltip: false,
      content: '',
      loading: false,
		}
	}
	
	componentDidMount () {
    this.fetchAllTodos();
  }
	
	// 获取
  fetchAllTodos = () => {
    api.get('/all')
		.then(res => {
			console.log(res);
      this.setState({
        todoList: res.data,
        count: res.count,
      });
		}).catch(err => {
		  console.log(err);
    })
  }
  handleInput = (e) => {
    this.setState({
      content: e.target.value,
    });
  }
	// 添加
  addTodoItem = (e) => {
    e.preventDefault();
    const { loading } = this.state;
    this.setState({
      loading: true,
    });
    if (!loading) {
      api.post('/add', {
        content: this.state.content,
      })
        .then(res => {
          console.log('添加成功');
          this.setState({
            content: '',
            loading: false,
          });
          this.fetchAllTodos();
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      alert('您保存的太快了!');
    }
  }

	// 删除
  removeTodoItem = (id) => {
    api.post(`/del/${id}`)
    .then(res => {
      console.log('删除成功');
      this.fetchAllTodos();
    }).catch(err => {
      console.log(err);
    })
  }
	
  render() {
    const { todoList, content } = this.state;
    return (
      <div className="container">
      <h2 className="header">待办事项</h2>
      <form
        onSubmit={(e) => this.addTodoItem(e)}
        className="todo-form"
        ref="todo-form">
        <input
          onChange={this.handleInput}
          type="text"
          placeholder="请输入..."
          value={content}
          className="todo-content" />
        { this.state.showTooltip &&
          <span className="tooltip">请输入待办事项!</span>
        }
      </form>
      <List
        todoList={todoList}
        removeTodoItem={this.removeTodoItem}
      />
      </div>
    )
  }
}

export default Todo;
