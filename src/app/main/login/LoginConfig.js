import React from 'react';
import { authRoles } from 'app/auth';
const Login = React.lazy(() => import('./Login'));

const LoginConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/',
			component: Login
		}
	]
};

export default LoginConfig;
