import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../../store';
import surveyService from "../../services/surveyService";
import FuseLoading from "../../../@fuse/core/FuseLoading";

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	}
}));

function Surveys(props) {
	const user = useSelector(({ auth }) => auth.user);
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [data, setData] = useState(0);
	const [loading, setLoading] = useState(true);

	const [selectedProject, setSelectedProject] = useState({
		id: 1,
		menuEl: null
	});

	useEffect(() => {
		fetchConsigneeForms();

	}, []);


	const fetchConsigneeForms = async () => {
		setLoading(true);
		await surveyService.getAll()
			.then((res) => {
				setData(res.surveys);
				setLoading(false);
			})
	};

	function handleOpenProjectMenu(event) {
		setSelectedProject({
			id: selectedProject.id,
			menuEl: event.currentTarget
		});
	}

	if(loading) {
		return <FuseLoading/>
	}

	return (
		<FusePageSimple
			classes={{
				header: 'min-h-160 h-160',
				toolbar: 'min-h-48 h-48',
				rightSidebar: 'w-288',
				content: classes.content
			}}
			header={
				<div className="flex flex-col justify-between flex-1 px-24 pt-24">
					<div className="flex justify-between items-start">
						<Typography className="py-0 sm:py-24 text-24 md:text-32" variant="h4">
							Welcome back, {user.data.displayName}
						</Typography>
						<Hidden lgUp>
							<IconButton
								onClick={ev => pageLayout.current.toggleRightSidebar()}
								aria-label="open left sidebar"
								color="inherit"
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>
					</div>
					<div className="flex items-end">
						<div className="flex items-center">
							<IconButton
								className={clsx(classes.projectMenuButton, 'h-40 w-40 p-0')}
								aria-owns={selectedProject.menuEl ? 'project-menu' : undefined}
								aria-haspopup="true"
								onClick={handleOpenProjectMenu}
							>
								<Icon>backup_table</Icon>
							</IconButton>

							<div className={clsx(classes.selectedProject, 'flex items-center h-40 px-16 text-16')}>
								Total surveys : {data}
							</div>
						</div>
					</div>
				</div>
			}

			ref={pageLayout}
		/>
	);
}

export default withReducer('fieldlanka', reducer)(Surveys);
