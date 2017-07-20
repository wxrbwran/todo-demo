import React from 'react';
import moment from 'moment';

class TodoItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showDel: false  // 控制删除 icon 的显示隐藏
		}
	}
	
	render() {
		return (
			<div className="todo-item">
				<span className="item-cont">{ this.props.content }</span>
				<span className="item-time">
					{ moment(this.props.date).format('YYYY/MM/DD') }
				</span>
				<button
					onClick={() => this.props.removeTodoItem(this.props.id)}
					className="del-btn"
				>
					删除
				</button>
			</div>
		)
	}
}

export default TodoItem;