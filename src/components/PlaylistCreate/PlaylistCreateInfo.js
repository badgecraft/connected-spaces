import { t } from 'ttag';
import { withProps } from 'recompose';
import shield from './shield.svg';
import speaker from './speaker.svg';
import chalice from './chalice.svg';
import InfoCard from '../../ui/Form/InfoCard';
import image from './create.png';

export default withProps({
    title:       t`Create your playlist`,
    description: t`Organise your activities into thematic learning pathways. You can select several activities and combine them into a free-flow or strict sequence experience to complete.`,
    image,
    items:       [
        {
            icon:        shield,
            title:       t`Combine local and digital opportunities`,
            description: t`Several activities can combine opportunities online and offline to offer best experiences to learners.`,
        },
        {
            icon:        speaker,
            title:       t`Connect learning into pathways`,
            description: t`Organisers can decide the logic and sequence of activities, connect diverse and rich opportunities.`,
        },
        {
            icon:        chalice,
            title:       t`Engage learners into game-like experience`,
            description: t`Step-by-step experiences tend to engage better. The progress is visible and experience is immersive.`,
        }
    ],
})(InfoCard);
