import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import SurveysTableHeader from './SurveysTableHeader';
import surveyService from '../../services/surveyService';
import { useDispatch } from "react-redux";
import { setTotSurveys } from "../../auth/store/userSlice";

function SurveysTable() {
	const dispatch = useDispatch();
	const searchText = "";
	const [meta, setMeta] = useState(0);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		fetchConsigneeForms();

	}, [page, rowsPerPage, searchText]);

	const fetchConsigneeForms = async () => {
		setLoading(true);
		await surveyService.getAll(rowsPerPage, page, searchText)
			.then((res) => {
				setData(res.data);
				setMeta(res.meta)
				dispatch(setTotSurveys(res.meta.total))
				setLoading(false);
			})
	};

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.name));
			return;
		}
		setSelected([]);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
		setLoading(true)
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
		setLoading(true)
	}

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" size="small" aria-labelledby="tableTitle">
					<SurveysTableHeader
						numSelected={selected.length}
						selectSurveysById={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.name) {
										case 'name': {
											return o.name;
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						).map(n => {
							const isSelected = selected.indexOf(n.name) !== -1;
							return (
								<TableRow
									className="cursor-pointer"
									hover
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={n.id}
									selected={isSelected}
								>
									<TableCell className="w-40 md:w-64 text-center" padding="none">
										<Checkbox
											checked={isSelected}
											onClick={event => event.stopPropagation()}
											onChange={event => handleCheck(event, n.name)}
										/>
									</TableCell>

									<TableCell className="p-4 md:p-10" component="th" scope="row">
										{n.unique_id}
									</TableCell>

									<TableCell className="p-4 md:p-10" component="th" scope="row">
										{n.created_at}
									</TableCell>

									<TableCell className="p-4 md:p-10" component="th" scope="row">
										{n.name.substring(0, n.name.length - 5)}
									</TableCell>

									<TableCell className="p-4 md:p-10" component="th" scope="row">
										{n.dis}
									</TableCell>

									<TableCell className="p-4 md:p-10" component="th" scope="row">
										{n.ds}
									</TableCell>

									<TableCell className="p-4 md:p-10" component="th" scope="row">
										{n.gn}
									</TableCell>

									<TableCell className="p-4 md:p-10" component="th" scope="row">
										{n.language.toUpperCase()}
									</TableCell>

								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				rowsPerPageOptions={[2, 5, 10, 25]}
				count={meta.total}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(SurveysTable);
