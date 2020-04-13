import { compose, branch, renderComponent } from 'recompose';
import PropTypes from 'prop-types';
import HtmlButton from './HtmlButton';
import Link from './LinkButton';
import Label from './LabelButton';

const isType = name => ({ type }) => type === name;

const Button = compose(
    branch(isType('link'), renderComponent(Link)),
    branch(isType('menuLink'), renderComponent(Link)),
    branch(isType('label'), renderComponent(Label)),
)(HtmlButton);

Button.propTypes = {
    type:     PropTypes.oneOf(['button', 'submit', 'link', 'menuLink', 'label']),
    label:    PropTypes.node.isRequired,
    variant:  PropTypes.oneOf([
        'default',
        'primary',
        'secondary',
        'transparent',
        'importantLink',
        'become',
        'customColor',
        'icon',
        'link',
    ]).isRequired,
    disabled: PropTypes.bool,
    size:     PropTypes.oneOf(['large', 'larger', 'normal', 'smaller', 'small']),
};

Button.defaultProps = {
    disabled: false,
    size:     'normal',
};

export default Button;
