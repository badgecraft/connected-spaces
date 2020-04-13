import createAuthAction from '../../core/createAuthAction';
import { arrayFromQuery } from '../../core/utils';
import { searchQueryForRequest } from '../Event/eventUtils';
import paths from '../../constants/paths';

// todo deprecated, remove after 2020.02.01
export default createAuthAction({ auth: 'optional' })(async (context) => {
    const searchQuery = {
        categories: arrayFromQuery('category', context.query),
        skills:     arrayFromQuery('skill', context.query),
        inputValue: context.query.q || '',
        contexts:   ['playlist'],
    };

    return {
        redirect: `${paths.opportunities}?${searchQueryForRequest(searchQuery)}`,
    };
});
