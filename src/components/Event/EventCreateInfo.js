import { withProps } from 'recompose';
import { t } from 'ttag';
import InfoCard from '../../ui/Form/InfoCard';
import shield from '../PlaylistCreate/shield.svg';
import speaker from '../PlaylistCreate/speaker.svg';
import chalice from '../PlaylistCreate/chalice.svg';
import image from './createInfo.png';

export default withProps({
    title:       t`Publish your activity`,
    description: t`Create and publish activities to reach your target audiences. An activity can be an event, internship or volunteering placement, a project or a course or even a digital experience. Your team will have tools to promote your activity and issue digital Open Badges to certify learning and achievements.`,
    image,
    items:       [
        {
            icon:        shield,
            title:       t`Make offers visible`,
            description: t`Published activities will become visible on the map and searchable by learners.`,
        },
        {
            icon:        speaker,
            title:       t`Reach target audiences`,
            description: t`Specific filters and sorting tools helps people to find opportunities that match their needs and interests.`,
        },
        {
            icon:        chalice,
            title:       t`Certify learning & achievements`,
            description: t`People who will join activities can earn digital badges. Badges can show their engagement, skills or achievements.`,
        },
    ],
})(InfoCard);
