import styled from '@emotion/styled';
import { compose, branch, renderComponent, withHandlers, withStateHandlers, withProps } from 'recompose';
import Link, { toLink } from '../../Link';
import { skipProps } from '../../uiUtils';
import ExternalLinkOpener from '../../ExternalLinkOpener/ExternalLinkOpener';

const boldStyle = {
    fontWeight: 'bold'
};

const SLink = styled(Link)({
    ...boldStyle,
    textDecoration: 'underline',
});

const JustLink = skipProps('viewPerm', 'site', 'setExternalLink', 'externalLink')(SLink);

const SStrong = skipProps('viewPerm', 'to', 'params', 'site', 'setExternalLink', 'externalLink')(
    styled('strong')(boldStyle),
);

const ExternalLink = compose(
    withStateHandlers({ externalLink: null }, { setExternalLink: () => externalLink => ({ externalLink }) }),
    withHandlers({
        onClick:  ({ to, params, site, setExternalLink }) => evt => {
            setExternalLink(toLink({ to, params, baseURL: site.siteUrl }));
            evt.preventDefault();
        },
        onCancel: ({ setExternalLink }) => () => setExternalLink(null),
    }),
    withProps(({ to, params, site }) => ({
        href: toLink({ to, params, baseURL: site.siteUrl }),
    })),
    branch(({ externalLink }) => externalLink, renderComponent(ExternalLinkOpener)),
)(JustLink);

export default compose(
    branch(({ viewPerm, site }) => site && viewPerm, renderComponent(ExternalLink)),
    branch(({ viewPerm }) => viewPerm, renderComponent(JustLink)),
)(SStrong);
