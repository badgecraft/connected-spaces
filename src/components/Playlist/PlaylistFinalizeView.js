import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { compose } from 'recompose';
import { graphql } from 'react-apollo/index';
import _get from 'lodash/get';
import { t } from 'ttag';
import Layout from '../Layout';
import Dialog from '../../ui/Modal/ModalDialog';
import withPushRoute from '../_helpers/withLocationChange';
import query from './playlistView.gql';
import paths from '../../constants/paths';
import Button from '../../ui/Button';
import Item from '../../ui/Form/ActivitySearch/ActivityItem';

const Empty = styled('div')({
    height: [
        '400px',
        '90vh',
    ],
});

const List = styled('div')({
    textAlign: 'left',
});

const PlaylistFinalizeView = ({ id, playlist, pushRoute, ...props }) => (
    <Layout {...props}>
        <Dialog
            title={t`You need to finalise the following activities before publishing`}
            onClose={() => pushRoute({ to: paths.activityView, params: { id } })}
        >
            <List>
                {playlist.playlistActivities.filter(item => _get(item, 'project.status') !== 'published').map(item => (
                    <Item
                        key={item.id}
                        id={item.id}
                        item={item}
                        actions={<Button
                            label={t`Finalize`}
                            variant="primary"
                            type="link"
                            size="smaller"
                            target="_blank"
                            to={paths.activityView}
                            params={item}
                        />}
                    />
                ))}
            </List>
            <Button variant="secondary" type="link" to={paths.activityView} params={{ id }} label={t`Finalize later`} />
        </Dialog>
        <Empty />
    </Layout>
);

PlaylistFinalizeView.propTypes = {
    id:        PropTypes.string.isRequired,
    playlist:  PropTypes.shape({}).isRequired,
    pushRoute: PropTypes.func.isRequired,
};

export default compose(
    withPushRoute,
    graphql(query, {
        props: ({ data, ownProps: { playlist } }) => ({
            playlist: _get(data, 'maybeProject.project') || playlist,
        }),
    }),
)(PlaylistFinalizeView);
