import createAuthAction from '../../core/createAuthAction';
import { toLink } from '../Link';
import paths from '../../constants/paths';

export default createAuthAction()(async (context, { id }) => ({
    redirect: toLink({ to: paths.orgDashboardUsers, params: { id } }),
}));
