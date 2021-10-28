import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import SurveyConfig from 'app/main/survey/SurveyConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from '../main/Logout/LogoutConfig';

const routeConfigs = [
	SurveyConfig,
	LoginConfig,
	LogoutConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/surveys" />
	}
];

export default routes;
