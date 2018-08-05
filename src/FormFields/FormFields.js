import React, {Component} from 'react';
import axios from 'axios';
import CommentList from "../CommentList/CommentList";

export default class FormFields extends Component {
	constructor() {
		super();
		this.state = {
			dataArr: [],
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.cleanErrors = this.cleanErrors.bind(this);
	}

	componentDidMount() {
		axios.get('http://localhost:3000').then(response => {
			this.setState({dataArr: [...this.state.dataArr,...response.data]})
		});
	}
	validateInputFields(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email) ;
	}
	handleSubmit(e) {
		let email = this.emailName.value;
		let msg = this.msgContent.value;
		let date = new Date();
		if (this.validateInputFields(email) && email !== '' && msg !== '') {
			axios.post('http://localhost:3000/addComment',
				{email: this.emailName.value,
					msg: this.msgContent.value,
					date: date})
				.then(response => {
					this.setState({
						dataArr:
							[...this.state.dataArr, {...response.data.ops[0]}]
					});
				});
			this.emailName.style.border = '1px solid  #cfcfd9';
			this.msgContent.style.border = '1px solid  #cfcfd9';
			this.emailName.value = '';
			this.msgContent.value = '';
		}else {
			email === '' || !(this.validateInputFields(email))?
				this.emailName.style.border = '1px solid #ff4b4b82': null;
			msg === ''? this.msgContent.style.border = '1px solid #ff4b4b82': null;

		}
		e.preventDefault();
	}
	cleanErrors(){
		this.emailName.style.border = '1px solid  #cfcfd9';
		this.msgContent.style.border = '1px solid  #cfcfd9';
	}

	render() {
		const {dataArr} = this.state;
		return (
			<div className='main-form-field-wrapper'>
				<form onSubmit={this.handleSubmit} className='form-wrapper'>
					<input ref={val => this.emailName = val}
					       type='text'
					       placeholder='Email'
							onChange={this.cleanErrors}/>
					<textarea ref={msg => this.msgContent = msg}
					          cols='30'
					          rows='5'
					          placeholder='Message' onChange={this.cleanErrors}/>
					<button>submit</button>
				</form>
				<CommentList originalArr={dataArr}/>
			</div>
		)
	}
}
