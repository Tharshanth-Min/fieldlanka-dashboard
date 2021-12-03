import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { setSurveySearchText } from '../store/surveysSlice';
import Button from '@material-ui/core/Button';

function SurveyHeader() {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	const sText = "";
	const mainTheme = useSelector(selectMainTheme);
	const [searchText, setSearchText] = useState("");

	const handleDownloadAllSurvey =  () => {
		const token = window.localStorage.getItem('fieledlanka_access_token');
		//window.location.href = `http://fieldlanka.titum.org.lk/api/public/api/v1/download-all-surveys?token=${token}`;
		window.location.href = `http://localhost:8000/api/v1/download-all-surveys?token=${token}`;

	}

	return (
		<div className="flex flex-1 w-full items-center justify-between m-4">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						List of surveys : {user.totalSurveys}
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search by pressing the ENTER key"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
								inputProps={{
									'aria-label': 'Search'
								}}
								onKeyPress={ev => {
									if (ev.key === 'Enter') {
										dispatch(setSurveySearchText(ev))
									}
								}}
							/>
							<Icon color="action"
										style={{ cursor : 'pointer'}}
										onClick={(ev) => {
											if(sText.length > 0) {
												dispatch(setSurveySearchText(ev))
											}
											setSearchText("");
										}}
							>cached_icon</Icon>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>

			 <FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					startIcon={<Icon>download</Icon>}
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
					onClick={handleDownloadAllSurvey}
				>
					<span className="hidden sm:flex">Download all surveys</span>
				</Button>
			</FuseAnimate> 
		</div>
	);
}

export default SurveyHeader;
