import React from 'react';
import { t, jt } from 'ttag';
import styled from '@emotion/styled';
import FileUpload from '../Uploader/FileUploader';
import { font24A2, font16A6 } from '../uiFonts';
import Link from '../Link/ULink';

const IMPORT_USERS_EXAMPLE_FILE = '/api/v1/examples/import-users.xls';

const H1 = styled('h1')({
    ...font24A2,
    color:        '#4A4A4A',
    marginTop:    32,
    marginBottom: 24,
});

const Text = styled('div')({
    ...font16A6,
});

const UserInviteFormUpload = (props) => {
    const exampleFile = (<Link key="l" href={IMPORT_USERS_EXAMPLE_FILE}>{t`example file`}</Link>);
    return (
        <div>
            <H1>{t`Add users from spreadsheet file`}</H1>
            <Text>
                {jt`Download ${exampleFile}, add people you want to invite and upload`}
            </Text>

            <FileUpload bucket="content" {...props} />
        </div>
    );
};

UserInviteFormUpload.displayName = 'UserInviteFormUpload';

export default UserInviteFormUpload;
