import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { Button, TextControl } from '@wordpress/components'
import { uploadIcon } from '../../utils/icons';
import { useState } from 'react';
import { placeholderImg } from '../../utils/links';
import { __ } from '@wordpress/i18n';

const SingleMediaUpload = ({ attributes, setAttributes }) => {
    const { lightboxType, items } = attributes;
    const [mediaUrl, setMediaUrl] = useState();

    const mediaType = lightboxType === "audio" ? "audio" : lightboxType === "video" ? "video" : lightboxType === "content" ? "content" : lightboxType === "youtube" ? "youtube" : lightboxType === "iframe" ? "iframe" : lightboxType === "html" ? "html" : "pdf";

    // Handle "Apply" for manual URL entry
    const handleApply = () => {
        if (!mediaUrl) return;

        const newItem = { type: mediaType, id: null, content: mediaUrl, artist: "Morgan Wallen", isAudioThumbnails: true, thumbnail: placeholderImg, altText: null, thumbCaption: "", contentCaption: "", caption: "", importCaption: false };

        setAttributes({ items: [...items, newItem] });
    };

    // upload Image 
    const handleMeidaSelect = ({ id, url, alt, title, caption }) => {
        const newItem = { type: mediaType, id, content: url, title, caption, thumbnail: placeholderImg, artist: "Morgan Wallen", isAudioThumbnails: true, altText: alt, importCaption: false, thumbCaption: "" };

        const addItem = [...items, newItem];
        setAttributes({ items: addItem });
    };

    return <>
        {/* Appley button  */}
        {(mediaType === "audio" || mediaType === "video" || mediaType === "pdf" || mediaType === "youtube" || mediaType === "iframe") &&
            <div className="textInput">
                <TextControl value={mediaUrl} onChange={value => setMediaUrl(value)} placeholder={"Enter Url"} />
                <Button onClick={handleApply}>{__('Apply', 'lightbox')}</Button>
            </div>
        }

        {/* Upload Media Gallery */}
        {(mediaType === "audio" || mediaType === "video" || mediaType === "pdf") &&
            <MediaUploadCheck>
                <MediaUpload
                    allowedTypes={mediaType}
                    onSelect={handleMeidaSelect}
                    render={({ open }) => <Button className='button button-primary' onClick={open}>
                        {uploadIcon}{`Upload ${mediaType}`}</Button>}
                />
            </MediaUploadCheck>}
    </>
}
export default SingleMediaUpload