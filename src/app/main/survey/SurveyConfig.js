import React from 'react';
import { authRoles } from '../../auth';

const SurveyConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,
    routes  : [
        {
            path     : '/surveys',
            component: React.lazy(() => import('./Surveys'))
        }
    ]
};

export default SurveyConfig;

