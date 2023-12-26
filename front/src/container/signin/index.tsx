import "./index.css";

import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";

import { saveSession } from "../../util/session";
import {FIELD_ERROR} from '../../util/form';

interface ChildProps {
	children: React.ReactNode;
}

interface State {
	email: string;
	password: string;
	messageE: string;
	messageP: string;
	showPassword: boolean;
  }
  
  interface Action {
	type: string;
	payload?: any;
  }
  
  const initialState: State = {
	email: '',
	password: '',
	messageE: '',
	messageP: '',
	showPassword: false,
  };
  
  const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_EMAIL':
			return { ...state, email: action.payload };
		case 'SET_PASSWORD':
			return { ...state, password: action.payload };
		case 'SET_MESSAGE_E':
			return { ...state, messageE: action.payload };
		case 'SET_MESSAGE_P':
			return { ...state, messageP: action.payload };
		case 'TOGGLE_PASSWORD_VISIBILITY':
			return { ...state, showPassword: !state.showPassword };
		default:
			return state;
	}
  };
  
  const validate = (value: string) => {
	if (String(value).length < 1) {
	  return FIELD_ERROR.IS_EMPTY;
	}
  };
  
  
export default function Component({children}: ChildProps):React.ReactElement {
	// const [email, setEmail] = useState<string>('')	
	// const [password, setPassword] = useState<string>('');
	// const [messageE, setMessageE] = useState<string>('');
	// const [messageP, setMessageP] = useState<string>('');
	// const [showPassword, setShowPassword] = useState<boolean>(false);

	// const validate = (value: string) => {
	// 	if (String(value).length < 1) {
	// 		return FIELD_ERROR.IS_EMPTY
	// 	}
	// }

	const [state, dispatch] = useReducer(reducer, initialState);
	
	// const handleMailInput = (e: any) => { 
	// 	if (!!validate(e.target.value)) {
	// 		e.target.message = setMessageE(validate(e.target.value) || '')
	// 		e.target.style.borderColor ='rgb(217, 43, 73)'
	// 	}

	// 	setEmail(e.target.value)
	// }

	// const handlePassInput = (e:any) => {
	// 	if (!!validate(e.target.value)) {
	// 		e.target.message = setMessageP(validate(e.target.value) || '')
	// 		e.target.style.borderColor ='rgb(217, 43, 73)'
	// 	}

	// 	setPassword(e.target.value)
	// }

	const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value);
		// e.target.message = errorMessage;
		// e.target.style.borderColor = errorMessage ? 'rgb(217, 43, 73)' : '';
		dispatch({ type: 'SET_EMAIL', payload: e.target.value });
		dispatch({ type: 'SET_MESSAGE_E', payload: errorMessage });
	  };
	
	  const handlePassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value);
		// e.target.message = errorMessage;
		// e.target.style.borderColor = errorMessage ? 'rgb(217, 43, 73)' : '';
		dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
		dispatch({ type: 'SET_MESSAGE_P', payload: errorMessage });
	  };
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { email, password } = state;

		const convertData = () => {
			return JSON.stringify({email, password, getInfo:window.navigator.userAgent})
		}

		try {
			const res = await fetch('http://localhost:4000/signin', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: convertData(),
				});
				
			const data = await res.json()
			if (!res.ok && data.field === 'email') {
				// setMessageE(data.message); 
				dispatch({ type: 'SET_MESSAGE_E', payload: data.message });
				return;
			} else if (!res.ok && data.field === 'password') {
				// setMessageP(data.message); 
				dispatch({ type: 'SET_MESSAGE_P', payload: data.message });
				return;
			} else if (res.ok) {
				saveSession(data.session);
				window.location.assign("/balance");
			}
		
			
		} catch(err: any) {
				console.error(err.message)
		}
	}
	const handlePassVisibility = () => {
		dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' });
	};

	  return (
		<Page>			
			<Column className="column--20">  						
				<Heading  backTo="/"  title="Sign in" comment="Select login method"></Heading>

				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						<Input
							onInput={handleMailInput}
						 	label="Email"
							message={state.messageE}
							placeholder="Enter Your Email"
							type="email" 
							value={state.email}
							style={{ borderColor: state.messageE ? 'rgb(217, 43, 73)' : '' }} 
						></Input>
						<Input
							onInput={handlePassInput}
							label="Password"
							message={state.messageP}
							placeholder="Enter Your Password"
							type="password" 
							value={state.password}
							style={{ borderColor: state.messageP ? 'rgb(217, 43, 73)' : '' }} 
							showPassword={state.showPassword}
							onPassVisibility={handlePassVisibility}
						></Input>

						<div className="">
							Forgot your password?
							<Link to="/recovery"> Restore</Link>
						</div>
						<Button
							type="submit"
							className="button button--primary"
						>
							Continue
						</Button>
					</Column>
				</form>
			
			</Column>
		</Page>
	  )
  }