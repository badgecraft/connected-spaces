export default ({ onCopied }) => evt => {
    const { target } = evt;
    if (!target) {
        return false;
    }

    const len = (target.value || '').length;
    if (typeof target.setSelectionRange === 'function') {
        target.setSelectionRange(0, target.value.length);
    } else {
        target.selectionStart = 0; // eslint-disable-line no-param-reassign
        target.selectionEnd = len; // eslint-disable-line no-param-reassign
    }
    target.focus();

    if (typeof document.execCommand === 'function') {
        document.execCommand('copy');
        onCopied();
    }
    return false;
};