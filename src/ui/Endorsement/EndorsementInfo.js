import { withProps } from 'recompose';
import { t } from 'ttag';
import image from './createInfo.png';
// import shield from './shield.svg';
// import speaker from './speaker.svg';
// import chalice from './chalice.svg';
import InfoCard from '../Form/InfoCard';

export default withProps({
    title:       t`What is an endorsement?`,
    // eslint-disable-next-line
    description: t`Endorsement is an act of giving public approval and support for a badge, an activity or an organiser. It shows trust, gives visibility and creates new opportunities.`,
    image,
    items:       [
        // {
        //     icon:        shield,
        //     title:       t`todo title1`,
        //     description: t`todo description`,
        // },
        // {
        //     icon:        speaker,
        //     title:       t`todo title2`,
        //     description: t`todo description`,
        // },
        // {
        //     icon:        chalice,
        //     title:       t`todo title3`,
        //     description: t`todo description`,
        // },
    ],
})(InfoCard);
