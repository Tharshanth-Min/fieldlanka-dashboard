import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../../store';
import SurveysHeader from './SurveysHeader';
import SurveysTable from './SurveysTable';
import FusePageSimple from '../../../@fuse/core/FusePageSimple';

function Surveys() {
	return (
		<FusePageSimple
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-100 sm:min-h-100'
			}}
			header={<SurveysHeader />}
			content={<SurveysTable />}
			innerScroll
		/>
	);
}

export default withReducer('fieldlanka', reducer)(Surveys);
