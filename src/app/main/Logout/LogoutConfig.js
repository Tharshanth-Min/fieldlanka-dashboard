import React from 'react';
import { authRoles } from '../../auth';

const LogoutConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,
    routes  : [
        {
            path     : '/logout',
            component: React.lazy(() => import('./Logout'))
        }
    ]
};

export default LogoutConfig;

