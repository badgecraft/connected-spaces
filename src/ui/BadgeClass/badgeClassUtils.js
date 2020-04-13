import { t, ngettext, msgid } from 'ttag';

export const toStatusText = (task) => {
    switch (task && task.status) {
        case 'finished':
            return t`Task finished`;
        case 'waitForApprove':
            return t`Waiting for task approve`;
        case 'waitForEvidence':
            return t`Waiting for evidence`;
        case 'waitForFix':
            return t`Waiting for evidence fix`;
        default:
            return null;
    }
};

export const toApprovedByText = ({ criterion: { checkType, checkTypeCount: count, task }, badgeClass, variant }) => {
    if (!badgeClass) {
        return null;
    }
    if (!badgeClass.evidenceRequired) {
        return t`Issued by activity staff or QR code scan`;
    }

    const checkedBy = ((task && task.status === 'finished') || variant === 'userBadge')
        ? t`Checked by`
        : t`Will be checked by`;

    switch (checkType) {
        case 'self':
            return t`${checkedBy}: Only upload required`;
        case 'members':
            if (count === 1) {
                return t`${checkedBy}: One project member`;
            }
            return ngettext(
                msgid`${checkedBy}: ${count} project member`,
                `${checkedBy}: ${count} project members`,
                count,
            );
        case 'managers':
            if (count === 1) {
                return t`${checkedBy}: One project manager`
            }
            return ngettext(
                msgid`${checkedBy}: ${count} project manager`,
                `${checkedBy}: ${count} roject managers`,
                count,
            );
        case 'circle':
            if (count === 1) {
                return t`${checkedBy}: One member within your team`;
            }
            return ngettext(
                msgid`${checkedBy}: ${count} member within your team`,
                `${checkedBy}: ${count} members within your team`,
                count,
            );
        case 'circleAdmins':
            if (count === 1) {
                return t`${checkedBy}: One manager within your team`;
            }
            return ngettext(
                msgid`${checkedBy}: ${count} manager within your team`,
                `${checkedBy}: ${count} managers within your team`,
                count,
            );
        default:
            return null;
    }
};

export const toSubmitText = ({ checkType }) => {
    switch (checkType) {
        case 'members':
        case 'managers':
        case 'circle':
        case 'circleAdmins':
            return t`Request approve`;
        default:
            return t`Save evidence`;
    }
};

export const viewPolicyOptions = [
    { value: 'anyone', label: t`View policy - available for anyone` },
    { value: 'authorizedUsers', label: t`View policy - visible to authorized users` },
    { value: 'organisationUsers', label: t`View policy - visible for organisation users` },
    { value: 'projectUsers', label: t`View policy - visible to project users` },
    { value: 'none', label: t`View policy - visible to no one (except owner)` },
];
