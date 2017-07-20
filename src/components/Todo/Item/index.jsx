import React from 'react';
import moment from 'moment';
import { api } from '../../../utils/api';

class TodoItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      isEdit: false,
      content: props.content,
		}
	}
	toggleEdit = () => {
	  this.setState({
	    isEdit: !this.state.isEdit,
    });
  }
  handleInput = (value) => {
    this.setState({
      content: value,
    });
  }
  // 编辑
  editTodoItem = (id, content) => {
    api.post(`/edit/${id}`, {
      content: content,
    })
      .then(res => {
        console.log('编辑成功');
        this.props.fetchAllTodos();
        this.toggleEdit();
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
	  const { isEdit } = this.state;
    const { id, content } = this.props;
    const show = (
      <div className="todo-item">
        <span className="item-cont">{ content }</span>
        <span className="item-time">
					{ moment(this.props.date).format('YYYY/MM/DD') }
				</span>
        <div>
          <button
            onClick={this.toggleEdit}
            className="del-btn"
          >
            编辑
          </button>
          <button
            onClick={() => this.props.removeTodoItem(id)}
            className="del-btn"
          >
            删除
          </button>
        </div>
      </div>
    );
    const edit = (
      <div className="todo-item">
        <input className="item-cont"
          value={ this.state.content }
          onChange={(e) => this.handleInput(e.target.value)}
        />
        <div>
          <button
            onClick={() =>
              this.editTodoItem(id, this.state.content)}
            className="del-btn"
          >
            保存
          </button>
          <button
            onClick={this.toggleEdit}
            className="del-btn"
          >
            取消
          </button>
        </div>
      </div>
    )
		return isEdit ? edit: show;
	}
}

export default TodoItem;