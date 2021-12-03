import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';


const rows = [
	{
		id: 'uniqueId',
		align: 'left',
		disablePadding: false,
		label: 'Unique Id',
		sort: true
	},
	{
		id: 'created_at',
		align: 'left',
		disablePadding: false,
		label: 'Created at',
		sort: true
	},
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'dis',
		align: 'left',
		disablePadding: false,
		label: 'DIS',
		sort: true
	},
	{
		id: 'ds',
		align: 'left',
		disablePadding: false,
		label: 'DS',
		sort: true
	},
	{
		id: 'gn',
		align: 'left',
		disablePadding: false,
		label: 'GN',
		sort: true
	},
	{
		id: 'languege',
		align: 'left',
		disablePadding: false,
		label: 'Lang',
		sort: true
	},
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function SurveyTableHead(props) {
	const classes = useStyles(props);
	const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);
	const { selectSurveysById} = props;

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openSelectedProductsMenu(event) {
		setSelectedProductsMenu(event.currentTarget);
	}

	function closeSelectedProductsMenu() {
		setSelectedProductsMenu(null);
	}

	const handleDownloadSurvey =  () => {
		const token = window.localStorage.getItem('fieledlanka_access_token');

		//window.location.href = `http://fieldlanka.titum.org.lk/api/public/api/v1/download-surveys?surveys=${selectSurveysById}&token=${token}`;
		window.location.href = `http://localhost:8000/api/v1/download-surveys?surveys=${selectSurveysById}&token=${token}`;

	}

	return (
		<TableHead>
			<TableRow className="h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					<Checkbox
						indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
						checked={props.numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>
					{props.numSelected > 0 && (
						<div
							className={clsx(
								'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1',
								classes.actionsButtonWrapper
							)}
						>
							<IconButton
								aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
								aria-haspopup="true"
								onClick={openSelectedProductsMenu}
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id="selectedProductsMenu"
								anchorEl={selectedProductsMenu}
								open={Boolean(selectedProductsMenu)}
								onClose={closeSelectedProductsMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											handleDownloadSurvey();
											closeSelectedProductsMenu();
										}}
									>
										<ListItemIcon className="min-w-40">
											<Icon>download</Icon>
										</ListItemIcon>
										<ListItemText primary="Download Excel file" />
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
					)}
				</TableCell>
				{rows.map(row => {
					return (
						<TableCell
							className="p-4 md:p-16"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default SurveyTableHead;
