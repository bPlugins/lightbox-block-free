import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { produce } from 'immer';

import { Label, InlineMediaUpload, InlineDetailMediaUpload, CustomCodeEditor, Notice } from '../../../../../../bpl-tools/Components';
import { SelectControlPro } from '../../../../../../bpl-tools/ProControls';
import { contentType } from '../../../../utils/options';
import { checkType, checkUrlImage, isAudioVideoOrYouTube, isHtml, isPdf, isWebsite } from '../../../../utils/functions';
import { useEffect } from 'react';

const Item = ({ attributes, setAttributes, arrKey, index, setActiveIndex = false }) => {
    const { lightboxType } = attributes;
    const items = attributes[arrKey];
    const { type, thumbnail, thumbCaption, content, contentCaption, caption, importCaption, altText, isAudioThumbnails } = items[index];

    const updateItem = (type, index, val, childType = false) => {
        const newItem = produce(items, draft => {
            if (childType) {
                draft[index][type][childType] = val;
            } else {
                draft[index][type] = val;
            }
        });
        setAttributes({ items: newItem });
        setActiveIndex && setActiveIndex(index);
    }

    useEffect(() => {

        if (type === 'image' || lightboxType === 'gallery') {
            const newItems = produce(items, draft => {
                if (!draft[index]['content'] || draft[index]['content'] === '') {
                    draft[index]['content'] = draft[index]['thumbnail'];
                }
            });
            setAttributes({ items: newItems });
        }

        if (type !== 'image' || lightboxType !== 'gallery') {

            const newItems = produce(items, draft => {
                if ((draft[index]['content'])) {
                    // && draft[index]['thumbnail'] === "https://bblockswp.com/wp-content/demo/img/green-hill.jpg"
                    if (draft[index]['content'] && checkUrlImage(draft[index]['content'])) {
                        draft[index]['thumbnail'] = draft[index]['content'];
                        draft[index]['content'] = '';
                    }
                }
            });
            setAttributes({ items: newItems });
        }

    }, [lightboxType, type])

    // useEffect(() => {

    //     if (lightboxType === "audio" || lightboxType === "video" || lightboxType === "youtube") {
    //         const updatedItems = items.map((item) => {
    //             const isMedia = isAudioVideoOrYouTube(item?.content);

    //             const isThumbnail = item?.thumbnail;

    //             const setContent = item?.content;
    //             const isThumbnail2 = item?.thumbnail;
    //             const setThumbnail = isThumbnail === "https://bblockswp.com/wp-content/demo/img/green-hill.jpg" ? setContent : isThumbnail2;

    //             if (!isMedia) {
    //                 return {
    //                     ...item, thumbnail: setThumbnail, content: ''
    //                 }
    //             }
    //             return item;
    //         })
    //         setAttributes({ items: updatedItems });
    //     }
    //     else if (lightboxType === "pdf") {
    //         const updatedItems = items.map((item) => {
    //             const isMedia = isPdf(item?.content);

    //             const isThumbnail = item?.thumbnail;

    //             const setContent = item?.content;
    //             const isThumbnail2 = item?.thumbnail;
    //             const setThumbnail = isThumbnail === "https://bblockswp.com/wp-content/demo/img/green-hill.jpg" ? setContent : isThumbnail2;

    //             if (!isMedia) {
    //                 return { ...item, thumbnail: setThumbnail, content: '' }
    //             }
    //             return item;
    //         })
    //         setAttributes({ items: updatedItems });
    //     }
    //     else if (lightboxType === "iframe") {
    //         const updatedItems = items.map((item) => {
    //             const isMedia = isWebsite(item?.content);

    //             const isThumbnail = item?.thumbnail;

    //             const setContent = item?.content;
    //             const isThumbnail2 = item?.thumbnail;
    //             const setThumbnail = isThumbnail === "https://bblockswp.com/wp-content/demo/img/green-hill.jpg" ? setContent : isThumbnail2;

    //             if (!isMedia) {
    //                 return { ...item, thumbnail: setThumbnail, content: '' }
    //             }
    //             return item;
    //         })
    //         setAttributes({ items: updatedItems });
    //     } else if (lightboxType === "html") {
    //         const updatedItems = items.map((item) => {
    //             const isMedia = isHtml(item?.content);

    //             const isThumbnail = item?.thumbnail;
    //             const setContent = item?.content;
    //             const isThumbnail2 = item?.thumbnail;
    //             const setThumbnail = isThumbnail === "https://bblockswp.com/wp-content/demo/img/green-hill.jpg" ? setContent : isThumbnail2;

    //             if (!isMedia) {
    //                 return { ...item, thumbnail: setThumbnail, content: '' }
    //             }
    //             return item;
    //         })
    //         setAttributes({ items: updatedItems });
    //     }

    //     else if (lightboxType === "gallery") {
    //         const updateItems = items?.map((item) => {
    //             if (item?.content === '') {
    //                 return { ...item, content: item?.thumbnail }
    //             } else {
    //                 return { ...item }
    //             }
    //         })
    //         setAttributes({ items: updateItems });
    //     }
    // }, [lightboxType]);

    useEffect(() => {
        const validateContent = (item, checkFn) => {
            const isMedia = checkFn(item?.content);
            const defaultThumbnail = "https://bblockswp.com/wp-content/demo/img/green-hill.jpg";
            const setThumbnail = item?.thumbnail === defaultThumbnail ? item?.content : item?.thumbnail;

            if (!isMedia) {
                return { ...item, thumbnail: setThumbnail, content: '' };
            }
            return item;
        };

        const updateItems = () => {
            switch (lightboxType) {
                case "audio":
                case "video":
                case "youtube":
                    return items.map((item) => validateContent(item, isAudioVideoOrYouTube));

                case "pdf":
                    return items.map((item) => validateContent(item, isPdf));

                case "iframe":
                    return items.map((item) => validateContent(item, isWebsite));

                case "html":
                    return items.map((item) => validateContent(item, isHtml));

                case "gallery":
                    return items.map((item) =>
                        item?.content === '' ? { ...item, content: item?.thumbnail } : item
                    );

                default:
                    return null;
            }
        };

        // setAttributes({ items: updateItems() });
        const updatedItems = updateItems();
        if (updatedItems) {
            setAttributes({ items: updatedItems });
        }
    }, [lightboxType]);


    return <>
        {
            (lightboxType === "gallery" || lightboxType === "button") && <> <SelectControl label={__('Content Type', 'lightbox-block')} labelPosition="side" value={type} options={contentType} onChange={val => {
                const newItems = produce(items, draft => {
                    draft[index]['type'] = val;
                    // draft[index]['content'] = 'content' === val ? '<!-- wp:paragraph --><!-- /wp:paragraph -->' : val === 'image' ? items[index]['thumbnail'] : '';
                    if (val === 'content') {
                        draft[index]['content'] = '<!-- wp:paragraph --><!-- /wp:paragraph -->';
                    } else if (val === 'image') {
                        draft[index]['content'] = items[index]['thumbnail'];
                    } else if (val === "audio" || val === "video" || val === "youtube") {
                        draft[index]['content'] = items[index]['content'];
                    } else {
                        draft[index]['content'] = "";
                    }
                });
                setAttributes({ items: newItems });
            }} __nextHasNoMarginBottom />
                <Notice status='premium' isIcon={true}>{__('Pdf, Iframe, YouTube and HTML content type are available in the Premium version.', 'lightbox-block')}</Notice>
            </>
        }

        {/* Check than add thumbnail or button  */}
        {!('image' === type && 'gallery' === lightboxType) ?
            <>
                <Label>{__('Thumbnail:', 'lightbox-block')}</Label>

                <InlineDetailMediaUpload value={{ url: thumbnail, caption: thumbCaption }} types={['image']} onChange={val => {
                    const newItem = produce(items, draft => {
                        draft[index]['thumbnail'] = val.url;
                        if (type === 'image') {
                            draft[index]['content'] = val.url;
                        }
                        draft[index]['thumbCaption'] = val.caption || val.alt || val.title;
                        draft[index]['altText'] = val.alt;
                        draft[index]['id'] = val.id;
                    });
                    setAttributes({ items: newItem });
                    setActiveIndex && setActiveIndex(index);
                }} placeholder={__('Enter Image URL', 'lightbox-block')} />

                <TextControl label={__("Thumbnail Alt", 'lightbox-block')} labelPosition={__('top', 'lightbox-block')} value={altText} placeholder={__('Enter Image Alt Text', 'lightbox-block')} onChange={val => updateItem('altText', index, val)} />
            </> :
            <>
                <Label>{__('Image:', 'lightbox-block')}</Label>

                <InlineDetailMediaUpload value={{ url: content || thumbnail, caption: contentCaption }} types={['image']} onChange={val => {
                    const newItem = produce(items, draft => {
                        draft[index]['content'] = val.url;
                        draft[index]['contentCaption'] = val.caption || val.alt || val.title;
                        draft[index]['altText'] = val.alt;
                        draft[index]['id'] = val.id;
                    });
                    setAttributes({ items: newItem });
                    setActiveIndex && setActiveIndex(index);
                }} placeholder={__('Enter Image URL', 'lightbox-block')} />

                <TextControl className='mb10 mt10' label={__("Image Alt", 'lightbox-block')} labelPosition={__('top', 'lightbox-block')} value={altText} placeholder={__('Enter Image Alt Text', 'lightbox-block')} onChange={val => updateItem('altText', index, val)} />
            </>}

        {/* Audio  */}
        {checkType(lightboxType, type, 'audio') && <>
            <ToggleControl className='mt10' label={__('Popup Thumbnails show', 'lightbox-block')} checked={isAudioThumbnails} onChange={(val) => { updateItem('isAudioThumbnails', index, val) }} />

            <Label className="mt10">{__('Audio:', 'lightbox-block')}</Label>
            <InlineMediaUpload value={content} types={['audio']} onChange={val => updateItem('content', index, val)} placeholder={__('Enter Audio URL', 'lightbox-block')} />
        </>}

        {/* Video  */}
        {checkType(lightboxType, type, 'video') && <>
            <Label>{__('Video:', 'lightbox-block')}</Label>
            <InlineMediaUpload value={content} types={['video']} onChange={val => updateItem('content', index, val)} placeholder={__('Enter Video URL', 'lightbox-block')} />
        </>}

        {checkType(lightboxType, type, 'youtube') && <>
            <Label>{__('YouTube Video Url:', 'lightbox-block')}</Label>
            <TextControl value={content} onChange={val => updateItem('content', index, val)} placeholder={__('Enter YouTube Video Url', 'lightbox-block')} />
        </>}

        {/* pdf  */}
        {checkType(lightboxType, type, 'pdf') && <>
            <Label>{__('Pdf:', 'lightbox-block')}</Label>
            <InlineMediaUpload value={content} types={['pdf']} onChange={val => updateItem('content', index, val)} placeholder={__('Enter Pdf URL', 'lightbox-block')} />
        </>}

        {checkType(lightboxType, type, 'iframe') && <>
            <Label>{__('Iframe:', 'lightbox-block')}</Label>
            <TextControl value={content} onChange={val => updateItem('content', index, val)} placeholder={__('Iframe Map URL', 'lightbox-block')} />
            <span>{__('Note:Use only src', 'lightbox-block')}</span>
        </>}

        {checkType(lightboxType, type, 'html') && <>
            <Label>{__('HTML:', 'lightbox-block')}</Label>
            <CustomCodeEditor value={content} onChange={val => updateItem('content', index, val)} />
        </>}

        {/* caption area  */}
        <ToggleControl className='mt10' __nextHasNoMarginBottom label={__('Import Caption From Media', 'lightbox-block')} checked={importCaption} onChange={(val) => { updateItem('importCaption', index, val) }} />

        <Label className='mt10'>{__('Caption', 'lightbox-block')}</Label>
        <TextControl className="mt10" value={importCaption ? (type == 'image' ? contentCaption : thumbCaption) : caption} onChange={val => updateItem('caption', index, val)} />
    </>
}
export default Item;