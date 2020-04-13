import { withProps } from 'recompose';
import Icon from './_Icon';
import facebook from './svg/facebook.svg';
import twitter from './svg/twitter.svg';
import google from './svg/google.svg';
import linkedIn from './svg/linkedIn.svg';

export default Icon;

export const FacebookIcon = withProps({ image: facebook })(Icon);
export const TwitterIcon = withProps({ image: twitter })(Icon);
export const GoogleIcon = withProps({ image: google })(Icon);
export const LinkedInIcon = withProps({ image: linkedIn })(Icon);
