import React, {Component} from 'react';
import Gravatar from 'react-gravatar'
import moment from 'moment';
export default class CommentList extends Component {
	constructor() {
		super();
		this.state = {
			filteredArr: [],
			displayFilteredArr: false,
			displayPopover: ''
		}
		;
		this.arrToRender = this.arrToRender.bind(this);
	}

	filterComments(e) {
		const tempArray = this.props.originalArr.filter((comment, i) => {
			return (
				comment.msg.includes(e.target.value)
			)
		});

		(e.target.value !== '') ?
			this.setState({displayFilteredArr: true})
			:
			this.setState({displayFilteredArr: false});

		this.setState({filteredArr: [...tempArray]})
	}

	commentClicked(id){
		this.setState({displayPopover : id})
	}
	closeComment(){
		this.setState({displayPopover: ''})
	}

	arrToRender(arr) {
		return arr.map((comment) => {
			return (
				<li key={comment._id}>
					<Gravatar email={comment.email} size={50} default="monsterid"
					onClick={()=>this.commentClicked(comment._id)}/>
					<div className="div">
						<p className='email'>{comment.email}</p>
						<p className='content'>{comment.msg}</p>
					</div>
					{this.state.displayPopover === comment._id &&
					<div className="more-info">
						<div className="more-info-content">
							<p>{comment.email}</p>
							<p>{moment(comment.date).format("MMMM Do YY, h:mm a")}</p>
						</div>
						<svg onClick={()=> this.closeComment()}
							width={12}
						     height={12} aria-hidden="true" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="#686868" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
					</div>}
				</li>
			)
		})
	}

	render() {
		const {filteredArr, displayFilteredArr} = this.state;
		const {originalArr} = this.props;
		return (
			<div className='main-comment-list-wrapper'>
				<div className='comment-wrapper'>
					<input onChange={(e) => this.filterComments(e)} type='text' placeholder='Filter'/>
					<ul className='comment-list'>
						{displayFilteredArr ?
							(this.arrToRender(filteredArr))
							:
							(this.arrToRender(originalArr))
						}
					</ul>
				</div>
			</div>
		)
	}
}
