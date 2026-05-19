import { sanitizeHTML } from '../../../../../bpl-tools/utils/common';

const Caption = ({ showContent, caption, captionPosition }) => {
    return (showContent.caption && caption) && <div className={`caption ${captionPosition?.position}`}>
        <p>{sanitizeHTML(caption)}</p>
    </div>
}
export default Caption;