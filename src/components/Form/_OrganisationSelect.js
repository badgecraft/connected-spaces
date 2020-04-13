import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _get from 'lodash/get';
import { compose, withProps } from 'recompose';
import Select, { customStyle } from './_Select';
import { Colors } from '../Constants';

const query = gql`query getOrganisations ($viewerTeam:[String]){
    me {
        id
        organisations(viewerTeam:$viewerTeam) {
            total
            list {
                id
                name
                picture
            }
        }
    }
}`;

const optionStyle = ({
    paddingLeft:        50,
    backgroundRepeat:   'no-repeat',
    backgroundSize:     '30px 30px',
    backgroundPosition: '12px center',
});

// todo interactive load, when end is reached?
export default compose(
    withProps({
        customStyle: error => ({
            ...customStyle(error),
            control:     base => ({
                ...base,
                height:          46,
                borderColor:     error ? Colors.error : Colors.inputBorder,
                backgroundColor: Colors.inputBg,
            }),
            option:      (base, state) => ({
                ...base,
                ...optionStyle,
                display:         'flex',
                alignItems:      'center',
                backgroundImage: `url("${state.data.picture}")`,
                height:          46,
            }),
            singleValue: (base, state) => ({
                ...base,
                ...optionStyle,
                lineHeight:         46,
                backgroundImage:    `url("${state.data.picture}")`,
                backgroundPosition: '0px center',
                paddingLeft:        38,
            }),
        }),
    }),
    graphql(query, {
        props: ({ data: { loading, ...data } }) => ({
            options:   _get(data, 'me.organisations.list', []).map(({ id, name, picture }) => ({
                value: id,
                label: name,
                picture,
            })),
            isLoading: loading,
        }),
    }),
)(Select);
