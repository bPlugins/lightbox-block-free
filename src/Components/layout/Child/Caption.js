import { sanitizeGridCaption } from '../../../utils/functions';

const Caption = ({ showContent, caption, captionPosition }) => {
    return (showContent.caption && caption) && <div className={`caption ${captionPosition?.position}`}>
        <p><span dangerouslySetInnerHTML={{ __html: sanitizeGridCaption(caption) }} /></p>
    </div>
}
export default Caption;