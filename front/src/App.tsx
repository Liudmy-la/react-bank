import React, { createContext, useContext } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

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

import { loadSession } from "./util/session";
loadSession();


type ContextType = {
	isLogged: boolean;
	login: (status: boolean) => void;
}

const AuthContext = createContext<ContextType | null>(null);

const PrivateRoute: React.FC<{children: React.ReactNode}> = ({
	children,
}) => {
	const auth = useContext(AuthContext);

	if(!auth) return <Error />

	return auth.isLogged ? <>{children}</> : <WellcomePage/>
};

const Transaction: React.FC = () => {
	
	const {transactionId} = useParams();

	// React.useEffect(() => {
	// 	alert(`Дані щодо Transaction ID: ${transactionId}`);
	// }, [transactionId]);

	return <TransactionPage children transactionId={transactionId} />
}

function App() {
	const [isLogged, login] = React.useState(true);

	return (
		// value={authContextData}
		<AuthContext.Provider 
			value={{isLogged, login}}>
	   
		<BrowserRouter>
			<Routes>
	   
				<Route
					index
					element={
					// <AuthRoute>
						<WellcomePage />
					// </AuthRoute>
					}
				/>
		
				<Route
					path="/signup"
					element={
					// <AuthRoute>
						<SignupPage children/>
					// </AuthRoute>
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
					// <AuthRoute>
						<SigninPage children/>
					// </AuthRoute>
					}
				/>
			
				<Route
					path="/recovery"
					element={
					// <AuthRoute>
						<RecoveryPage children/>
					// </AuthRoute>
					}
				/>
					
				<Route
					path="/recovery-confirm"
					element={
					// <AuthRoute>
						<RecoveryConfirmPage children/>
					// </AuthRoute>
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
					path="/transaction:{{transactionId}}"
					element={
						<PrivateRoute>
							<Transaction />
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
