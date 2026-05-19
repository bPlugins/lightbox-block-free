import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { uploadIcon } from '../../utils/icons';

const UploadGallery = ({ setAttributes, items }) => {

    return <div className="createGalleryItemsPanel addItem">
        <MediaUploadCheck>

            <MediaUpload allowedTypes={["image"]} multiple="add" gallery={true} value={items?.filter(item => item.id).map(item => item?.id)} onSelect={media => {
                // Build a lookup of existing items by id to preserve saved metadata
                const existingItemsMap = new Map(items.filter(i => i && i.id).map(i => [i.id, i]));

                // Use media's order as authoritative — handles re-arrange, removal, and addition
                const newItems = media.filter(m => m && m.id).map(m =>
                    existingItemsMap.has(m.id)
                        ? existingItemsMap.get(m.id)
                        : { id: m.id, content: m.url, alt: m.alt, title: m.title, caption: m.caption, altText: m.alt, artist: '', type: 'image', thumbnail: m.url, isAudioThumbnails: true }
                );

                setAttributes({ items: newItems });
            }} render={({ open }) => (
                <Button onClick={open} variant="primary" className='components-button is-primary'>
                    {uploadIcon} {__('Upload Images', 'lightbox')}
                </Button>
            )} />
        </MediaUploadCheck>
    </div>
}
export default UploadGallery;