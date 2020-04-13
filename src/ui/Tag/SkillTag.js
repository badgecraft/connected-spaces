import PropTypes from 'prop-types';
import { branch, compose, renderNothing, getContext } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SkillTagView from './SkillTagView';

const tagQuery = gql`query tagQuery($id:ID!, $lang:String) {
    skill(id:$id, lang:$lang) {
        id
        name
        type
    }
}`;

const SkillTag = compose(
    getContext({ lang: PropTypes.string.isRequired }),
    graphql(tagQuery, { props: ({ data: { skill } }) => ({ ...skill }) }),
    branch(({ id }) => !id, renderNothing),
)(SkillTagView);

SkillTag.propTypes = {
    id: PropTypes.string.isRequired,
};

SkillTag.displayName = 'SkillTag';

export default SkillTag;

