import PropTypes from 'prop-types';
import { compose, withHandlers, getContext } from 'recompose';
import { graphql } from 'react-apollo';
import { t } from 'ttag';
import toID from 'to-id';
import _get from 'lodash/get';
import removeMutation from './competenceReviewRequestRemove.gql';
import { runAfterConfirm } from '../uiUtils';
import { createQrImage } from '../Qr/Qr';
import { toLink } from '../Link';
import paths from '../../constants/paths';

export default compose(
    getContext({ baseURL: PropTypes.string.isRequired }),
    graphql(removeMutation, { name: 'runRemove' }),
    withHandlers({
        onRemove:     ({ id, runRemove }) => () => runAfterConfirm({
            question: t`Are you sure you want to remove it?`,
            func:     () => runRemove({ variables: { id }, refetchQueries: ['projectCompetenceReviewRequests'] }),
        }),
        onDownloadQr: ({ id, item, baseURL }) => () => {
            const url = toLink({
                baseURL,
                to:     paths.competenceReviewRequestView,
                params: { id },
            });
            const base64Image = createQrImage({ url });

            const link = document.createElement('a');
            link.href = base64Image;
            link.download = `QR-code-${toID(_get(item, 'project.name', ''))}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    }),
);
