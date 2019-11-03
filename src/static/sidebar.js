import Alert from 'react-s-alert';

import {NotificationBuilder, AlertTypes} from '../notifications/Notification'

import {
    mdiLoading,
    mdiAlert,
    mdiClipboardFlow
} from '@mdi/js';

export const sidebarElements = [{
        title: 'Main Page',
        icon: mdiLoading,
        description: '1',
        onClick: (props) => props.history.push('/')
    },
    {
        title: 'Flowcharts',
        icon: mdiClipboardFlow,
        description: '1',
        onClick: (props) => props.history.push('/flowcharts')
    },
    {
        title: 'Alert',
        icon: mdiAlert,
        description: 'Alert',
        onClick: () => {
            const builder = new NotificationBuilder()

            builder.setType(AlertTypes.SUCCESS).build().show("HEJ!")
        }
    }
];