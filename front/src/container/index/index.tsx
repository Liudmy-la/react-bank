import "./index.css";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from "../../component/page";
import Column from "../../component/column";
import Button from "../../component/button";

interface ChildProps {
	children?: React.ReactNode;
}
  
  export default function Component({children}: ChildProps):React.ReactElement {
	const navigate = useNavigate();

	const handleSignupClick = () => {
		navigate("/signup");
	}
	const handleSigninClick = () => {
		navigate("/signin");
	}

	  return (
		<Page>			
			<Column className="column--grid grid--main">  						
				<div className="hello__block">
					<div className="hello__title">Hello!</div>
					<div className="hello__text">Welcome to the bank app</div>
				</div>
				<Column className="column--12">
					<Button className="button button--primary" onClick={handleSignupClick}>
						Sign Up
					</Button>					
					<Button className="button button--primary button--outline" onClick={handleSigninClick}>
						Sign In
					</Button>
				</Column>
			</Column>				
			<div className="main-image"></div>
			<div className="top-image"></div>
		</Page>
	  )
  } 