import React, { FunctionComponent, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import "./sass/app.scss";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useAuthProvider } from "./components/auth/AuthenticationProvider";

type AppProps = {};

const App: FunctionComponent<AppProps> = () => {
	const { authenticated } = useAuthProvider();

	return (
		<div className='root'>
			<Router>
				<Switch>
					<PrivateRoute
						authenticated={authenticated}
						path='/'
						exact
						component={HomePage}
					/>
					<Route
						path='/login'
						exact
						component={authenticated ? () => <Redirect to='/' /> : LoginPage}
					/>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
