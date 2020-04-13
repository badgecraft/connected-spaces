import { compose, branch, renderComponent } from 'recompose';
import BadgeIssuedNotification from './BadgeIssuedNotification';
import BadgeIssuedOnDepsNotification from './BadgeIssuedOnDepsNotification';
import BadgeIssueRequestNotification from './BadgeIssueRequestNotification';
import CertificateIssuedNotification from './CertificateIssuedNotification';
import EvidenceCheckedNotification from './EvidenceCheckedNotification';
import OrganisationInviteNotification from './OrganisationInviteNotification';
import ProjectInviteNotification from './ProjectInviteNotification';
import ReadyToStartMissionNotification from './ReadyToStartMissionNotification';
import EndorsementRequestNotification from './EndorsementRequestNotification';
import EndorsementHandledNotification from './EndorsementHandledNotification';

const is = type => ({ item }) => item && type === item.__typename;

export default compose(
    branch(is('BadgeIssuedNotification'), renderComponent(BadgeIssuedNotification)),
    branch(is('BadgeIssuedOnDepsNotification'), renderComponent(BadgeIssuedOnDepsNotification)),
    branch(is('BadgeIssueRequestNotification'), renderComponent(BadgeIssueRequestNotification)),
    branch(is('CertificateIssuedNotification'), renderComponent(CertificateIssuedNotification)),
    branch(is('EvidenceCheckedNotification'), renderComponent(EvidenceCheckedNotification)),
    branch(is('OrganisationInviteNotification'), renderComponent(OrganisationInviteNotification)),
    branch(is('ProjectInviteNotification'), renderComponent(ProjectInviteNotification)),
    branch(is('ReadyToStartMissionNotification'), renderComponent(ReadyToStartMissionNotification)),
    branch(is('EndorsementRequestNotification'), renderComponent(EndorsementRequestNotification)),
    branch(is('EndorsementHandledNotification'), renderComponent(EndorsementHandledNotification)),
)(() => null);
