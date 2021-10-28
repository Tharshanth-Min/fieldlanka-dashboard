import authService from "../services/auth-service";
import React, { Component } from "react";
import { connect } from "react-redux";
import {setUserData, logoutUser } from './store/userSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import TitumSplashScreen from "@fuse/core/FuseSplashScreen";

class Auth extends Component {
	state = {
		waitAuthCheck: true,
	};

	componentDidMount() {
		return Promise.all([this.authCustomerCheck()]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	authCustomerCheck = () =>
		new Promise((resolve) => {
			authService.on("onAutoLogin", () => {
				this.props.showMessage({ message: 'Logged In' });

				authService
					.signInWithUser()
					.then((res) => {
						const user = {
							role: [res.role],
							from: "Field Lanka",
							data : {
								displayName: res.user,
							}
						};

						this.props.setUserData(user);
						resolve();
						this.props.showMessage({ message: `Logged in as ${res.role}` });
					})
					.catch((error) => {
						this.props.showMessage({ message: error.message });
						resolve();
					});
			});

			authService.on("onAutoLogout", (message) => {
				if (message) {
					this.props.showMessage({ message });
				}

				this.props.logout();

				resolve();
			});

			authService.on("onNoAccessToken", () => {
				resolve();
			});

			authService.init();

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? (
			<TitumSplashScreen />
		) : (
			<>{this.props.children}</>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: logoutUser,
			setUserData,
			showMessage,
			hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);

