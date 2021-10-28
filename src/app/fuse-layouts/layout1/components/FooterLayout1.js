import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';

function FooterLayout1(props) {
	const footerTheme = useSelector(selectFooterTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className="relative z-10"
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.paper}}
				elevation={2}

			>
				<Toolbar  className="min-h-48 md:min-h-40 px-8 sm:px-12 py-0 flex items-center overflow-x-auto">
					<Typography variant="body2" color="textSecondary" align="center">
						{'Copyright © '}
						<Link rel="noopener" color="inherit" href="http://titum.lk" target="_blank">
							Titum Pvt Ltd
						</Link>{' '}
						{new Date().getFullYear()}
					</Typography>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout1);
