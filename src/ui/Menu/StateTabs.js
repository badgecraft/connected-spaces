import { compose, withProps, withStateHandlers } from 'recompose';
import Tabs from './Tabs';

export default compose(
    withStateHandlers(({ items }) => ({
        activeIndex: items.findIndex(item => item.active) || 0,
    }), {
        setActiveIndex: () => activeIndex => ({ activeIndex }),
    }),
    withProps(({ items, activeIndex, setActiveIndex }) => ({
        items: items.map((item, index) => ({
            ...item,
            active:  index === activeIndex,
            onClick: (evt) => {
                evt.preventDefault();
                setActiveIndex(index);
            },
        }))
    })),
)(Tabs);
