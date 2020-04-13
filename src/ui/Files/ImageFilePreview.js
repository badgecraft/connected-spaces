import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Link from '../Link';

const FileLink = styled(Link)(({ file }) => ({
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    width:          '100%',
    height:         '100%',
    background:     `${file.dominantColor || '#666666'} url("${file.publicPath}") center center/cover no-repeat`,
}));

FileLink.propTypes = {
    file: PropTypes.shape({
        dominantColor: PropTypes.string.isRequired,
        publicPath:    PropTypes.string.isRequired,
    }).isRequired,
};

export default FileLink;
