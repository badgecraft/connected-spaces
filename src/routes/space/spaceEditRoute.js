import createAuthAction from '../../core/createAuthAction';
import { toLink } from '../../ui/Link';
import { paths } from '../../components/Constants';

export default createAuthAction()((context, { id }) => ({
    redirect: toLink({ to: paths.orgDashboardSettings, params: { id } }),
}));
