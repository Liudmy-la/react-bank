import "./index.css";

import React from 'react';
import { Link } from 'react-router-dom';

import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";
import Infofield from "../../component/info-field";

import {
	Form,
	REG_EXP_EMAIL,
	REG_EXP_PASSWORD,
} from '../../util/form';
  
import { saveSession } from '../../util/session';
  
class SignupForm extends Form {
	FIELD_NAME = {
	  EMAIL: 'email',
	  PASSWORD: 'password',
	};

	FIELD_ERROR = {
		IS_EMPTY: 'Enter a value in the field.',
		IS_BIG: 'Value is too long. Remove excess',
		EMAIL: 'Enter a valid email address.',
		PASSWORD:
		  'Password must be at least 8 characters long, including at least 1 digit, lowercase, and uppercase letter.',
	};

	validate = (name: string, value: string) => {
		if (String(value).length < 1) {
			return this.FIELD_ERROR.IS_EMPTY
		}
	
		if (String(value).length > 20) {
		  return this.FIELD_ERROR.IS_BIG
		}
	
		if (name === this.FIELD_NAME.EMAIL) {
			if (!REG_EXP_EMAIL.test(String(value)))
				return this.FIELD_ERROR.EMAIL
		}
	
		if (name === this.FIELD_NAME.PASSWORD) {
			if (!REG_EXP_PASSWORD.test(String(value)))
				return this.FIELD_ERROR.PASSWORD
		}
	};

	submit = async () => {
		if (this.disabled === true) {
			this.validateAll()
		} else {
			this.setAlert('progress', 'Завантаження ...')
	
			try {
				const res = await fetch('/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: this.convertData(),
				})
	
				const data = await res.json()
	
				if (res.ok) {
					this.setAlert('success', data.message)
			
					saveSession(data.session)
			
					window.location.assign("/signup-confirm")
				} else {
					this.setAlert('error', data.message)
				}
			} catch (error) {
				this.setAlert('error', (error as Error).message)
			}
		}
	};

	convertData = () => {
		return JSON.stringify({
		  [this.FIELD_NAME.EMAIL]:
			(this.value as any)[this.FIELD_NAME.EMAIL],
	
		  [this.FIELD_NAME.PASSWORD]:
		  (this.value as any)[this.FIELD_NAME.PASSWORD],
		})
	  }
	
};

const signupForm = new SignupForm();

interface ChildProps {
	children: React.ReactNode;
	onClick?: () => void;
	type?: any;
};
  
export default function Component({children}: ChildProps):React.ReactElement {

	  return (
		<Page>			
			<Column className="column--20">  						
				<Heading  backTo="/" title="Sign up" comment="Choose a registration method"></Heading>

				<form>
					<Column className="column--20"> 
						<Input action={signupForm.change} label="Email" type="email" placeholder="Enter Your Email" message = ""></Input>
						<Input action={signupForm.change} label="Password" className="disappear" message = "" placeholder="Enter Your Password"></Input>

						<div>
							Already have an account? 
							<Link to="/signin"> Sign In</Link>
						</div>
						<Button onClick={() => { console.log('Button clicked'); signupForm.submit()}} type="button" className="button button--primary" >Continue</Button>

						<Infofield className="infofield field--warn disabled">A user with the same name is already exist</Infofield>
					</Column>
				</form>
			</Column>
		</Page>
	  )
  }

