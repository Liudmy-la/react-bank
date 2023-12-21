import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import WellcomePage from "./container/index";
import SignupPage from "./container/signup";
import SigninPage from "./container/signin";
import RecoveryPage from "./container/recovery";
import RecoveryConfirmPage from "./container/recovery-confirm";
import SignupConfirmPage from "./container/signup-confirm";
import SettingsPage from "./container/settings";
import SendPage from "./container/send";
import ReceivePage from "./container/receive";
import NotificationsPage from "./container/notification";
import TransactionPage from "./container/transaction";
import BalancePage from "./container/balance";
import Error from "./container/error";

const AuthContext = createContext<boolean | null>(null);

const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) => {	
	const isLogged = useContext(AuthContext)
	return isLogged ? <>{children}</> : <WellcomePage/>
};

const AuthRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
	const isLogged = useContext(AuthContext)
	return isLogged ? <BalancePage/> : <>{children}</> 
};

function App() {
	const [isLogged, setIsLogged] = useState<boolean | null>(null);

	useEffect(() => {
		const hasActiveSession = window.localStorage.length > 0;
		setIsLogged(hasActiveSession);
	  }, []);

	return (
		<AuthContext.Provider value={isLogged}>
	   
		<BrowserRouter>
			<Routes>
	   
				<Route
					index
					element={
					<AuthRoute>
						<WellcomePage />
					</AuthRoute>
					}
				/>
		
				<Route
					path="/signup"
					element={
					<AuthRoute>
						<SignupPage children/>
					</AuthRoute>
					}
				/>
		
				<Route
					path="/signup-confirm"
					element={
						<PrivateRoute>
							<SignupConfirmPage children/>
						</PrivateRoute>
					}
				/>
		
				<Route
					path="/signin"
					element={
					<AuthRoute>
						<SigninPage children/>
					</AuthRoute>
					}
				/>
			
				<Route
					path="/recovery"
					element={
					<AuthRoute>
						<RecoveryPage children/>
					</AuthRoute>
					}
				/>
					
				<Route
					path="/recovery-confirm"
					element={
					<AuthRoute>
						<RecoveryConfirmPage children/>
					</AuthRoute>
					}
				/>
	   	   
				<Route
					path="/balance"
					element={
						<PrivateRoute>
							<BalancePage children/>
						</PrivateRoute>
					}
				/>
			
				<Route
					path="/notifications"
					element={
						<PrivateRoute>
							<NotificationsPage children/>
						</PrivateRoute>
					}
				/>
	   	   
				<Route
					path="/settings"
					element={
						<PrivateRoute>
							<SettingsPage children/>
						</PrivateRoute>
					}
				/>
	   	   
				<Route
					path="/receive"
					element={
						<PrivateRoute>
							<ReceivePage children/>
						</PrivateRoute>
					}
				/>
	   	   
				<Route
					path="/send"
					element={
						<PrivateRoute>
							<SendPage children/>
						</PrivateRoute>
					}
				/>
	   	   
				<Route
					path="/transaction/*"
					element={
						<PrivateRoute>
							<TransactionPage children id={5}/>
						</PrivateRoute>
					}
				/>
	   	   
	   			<Route path="*" Component={Error} />

			</Routes>
		</BrowserRouter>
		</AuthContext.Provider>	   
	);	   
}

export default App;
