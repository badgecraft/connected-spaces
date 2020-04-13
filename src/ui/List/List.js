import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'ttag';
import styled from '@emotion/styled';
import { Flex } from '@rebass/emotion';
import Spinner from '../Spinner/LineSpinner';
import Button from '../Button';

const Root = styled('div')(({ minHeight }) => ({
    ...(minHeight && { minHeight }),
}));

const Items = styled(Flex)({});

const Next = styled('div')({
    textAlign: 'right',
    minHeight: 30,
});

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { minHeight: null };
    }

    updateMinHeight = ({ height }) => {
        const { minHeight } = this.state;
        const newMinHeight = Math.min(height, window.innerHeight);
        if (!minHeight || minHeight !== newMinHeight) {
            this.setState({ minHeight: newMinHeight });
        }
    };

    render = () => {
        const { minHeight } = this.state;
        const {
            list = [],
            renderItem,
            loading,
            hasNext,
            loadNext,
            limit,
            total,
            offset,
            renderEmpty,
            renderNotEmpty,
            renderItems,
        } = this.props;
        const next = Math.min(total - offset - limit, limit);
        return (
            <Root
                ref={ref => ref && this.updateMinHeight(ref.getBoundingClientRect())}
                minHeight={minHeight}
            >
                {!loading && total === 0
                    ? renderEmpty({ total, loading })
                    : renderNotEmpty({ total, loading })}
                {renderItems(list.filter(item => item).map(renderItem))}
                <Spinner enabled={loading} />
                <Next>
                    {hasNext && !loading && <Button
                        type="button"
                        label={t`Load ${next} more`}
                        variant="secondary"
                        size="smaller"
                        onClick={() => loadNext()}
                    />}
                </Next>
            </Root>
        );
    };
}

List.propTypes = {
    loading:        PropTypes.bool.isRequired,
    list:           PropTypes.arrayOf(PropTypes.shape()).isRequired,
    renderItem:     PropTypes.func.isRequired,
    renderEmpty:    PropTypes.func,
    renderNotEmpty: PropTypes.func,
    renderItems:    PropTypes.func,
    hasNext:        PropTypes.bool.isRequired,
    loadNext:       PropTypes.func.isRequired,
    limit:          PropTypes.number.isRequired,
    total:          PropTypes.number.isRequired,
    offset:         PropTypes.number.isRequired,
};

List.defaultProps = {
    renderEmpty:    () => null,
    renderNotEmpty: () => null,
    renderItems:    (content) => (<Items flexWrap="wrap">{content}</Items>)
};

export default List;
