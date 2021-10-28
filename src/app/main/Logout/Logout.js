import React, { useEffect } from "react";
import {logoutUser } from '../../auth/store/userSlice';
import TitumLoading from "@fuse/core/FuseLoading";

import { useDispatch } from "react-redux";

const Index = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logoutUser());
	});

	return <TitumLoading />;
};

export default Index;
