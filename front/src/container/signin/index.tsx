import "./index.css";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Page from "../../component/page";
import Heading from "../../component/heading";
import Column from "../../component/column";
import Button from "../../component/button";
import Input from "../../component/input";

interface ChildProps {
	children: React.ReactNode;
}
  
export default function Component({children}: ChildProps):React.ReactElement {
	const [email, setEmail] = useState('')	
	const [password, setPassword] = useState('')
	
	const handleMailInput = (e: any) => setEmail(e.target.value)
	const handlePassInput = (e:any) => setPassword(e.target.value)
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = {email, password};
		const convertData = JSON.stringify(data);

				fetch('http://localhost:4000/signin', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: convertData,
				})
				.then((res) => res.json())
				.catch((err) => console.error(err.message))
		}

	  return (
		<Page>			
			<Column className="column--20">  						
				<Heading  backTo="/"  title="Sign in" comment="Select login method"></Heading>

				<form method="POST" onSubmit={handleSubmit}>
					<Column className="column--20"> 
						<Input
							onInput={handleMailInput}
						 	label="Email"
							message=""
							placeholder="Enter Your Email"
							type="email" 
							value={email}
						></Input>
						<Input
							onInput={handlePassInput}
							label="Password"
							className="appear"
							message=""
							placeholder="Enter Your Password"
							type="password" 
							value={password}
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