import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { PanelBody, PanelRow, SelectControl, RangeControl, Button, Dashicon, __experimentalUnitControl as UnitControl, TextControl, ToggleControl } from '@wordpress/components';

import { HelpPanel, IconControl, Label, ItemsPanel, BtnGroup, Notice, Badge, HelpTooltip, ColorControl } from '../../../../../../bpl-tools/Components';
import { BDevice } from '../../../../../../bpl-tools/Components/Deprecated';
import { AdvertiseCard, BControlPro, BtnGroupPro, PremiumBadge, PremiumPanel, SelectControlPro } from '../../../../../../bpl-tools/ProControls';
import { placeholderImg } from '../../../../utils/links';
import { layoutOpt, lbType, pxUnit, perUnit, emUnit, ratioOpt, sliderOpt, thumbSizeOpt, loadedEffectOpt, placeholderOpt } from '../../../../utils/options';
import Item from './Item';
import { useEffect } from 'react';
import UploadGallery from '../../UploadGallery';
import { adminUrl } from '../../../../utils/functions';
import CropPositionGrid from '../../../../utils/CropPositionGrid';
import { getLazyLoad, lazyOverrides } from '../../../../utils/responsiveImages';
import LazyConflictNotice from '../../LazyConflictNotice';
import MarketingBanner from '../../MarketingBanner';


// Label with a hover help icon (keeps the Lazy Load panel compact)
const LAZY_TUTORIAL_URL = 'https://www.youtube.com/watch?v=XZCoyDO768M';
const helpLabel = (label, text) => <>{label}<HelpTooltip text={text} /></>;

const General = ({ attributes, setAttributes, isBtnType, updateAttr }) => {

    const [device, setDevice] = useState('desktop');
    const { lightboxType, items, layout, image, columns, columnGap, rowGap, content, galleryIcon, button, sliderHeight, slider } = attributes
    // Defaults + this block's changed options; only the changed key is saved (keeps Pro's site-wide settings working after an upgrade)
    const lazyLoad = getLazyLoad(attributes.lazyLoad);
    const setLazy = (key, val) => setAttributes({ lazyLoad: { ...lazyOverrides(attributes.lazyLoad), [key]: val } });
    const itemsProps = { attributes, setAttributes, arrKey: 'items' }

    useEffect(() => {

        const fetchImageIds = async () => {

            if (items?.length && !items[0]?.id) {
                // Send via POST to avoid URL length limits and log exposure
                const formData = new FormData();
                formData.append('action', 'bpllb_get_image_id');
                formData.append('nonce', bpllbMediaUrlId?.nonce);
                formData.append('items', JSON.stringify(items));

                await fetch(bpllbMediaUrlId?.ajaxUrl, {
                    method: 'POST',
                    body: formData,
                }).then(res => res.json()).then(data => {
                    setAttributes({ items: data.data });
                });
            }
        }
        fetchImageIds();
    }, []);


    return <>
        <HelpPanel slug="lightbox-block" docsLink="https://bplugins.com/docs/lightbox-block" />

        {/* Select Lightbox Type  */}
        <PanelBody className='bPlPanelBody' title={__('Lightbox', 'lightbox-block')} initialOpen={true}>

            <Label className="mt10 mb10">{__('Gallery Type', 'lightbox-block')}</Label>
            <BtnGroup value={lightboxType} onChange={(val) => { setAttributes({ lightboxType: val }) }} options={lbType} isIcon={true} size='default' />
            <MarketingBanner />

            {/* Check button and 1 gether than  */}
            {'button' == lightboxType && items.length > 1 && <>
                <Button className='removeItem removeAllitem' onClick={() => setAttributes({ items: [items[0]] })}> <Dashicon icon='trash' size={18} />{__('Delete Gallery Data', 'lightbox-block')}</Button>
            </>}
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={isBtnType ? 'Lightbox Item' : 'Lightbox Items'}>
            {isBtnType ?
                <Item {...itemsProps} index={0} /> :
                <ItemsPanel {...itemsProps} newItem={{
                    type: "image",
                    thumbnail: placeholderImg,
                    thumbCaption: "",
                    content: "",
                    contentCaption: "",
                    caption: "",
                    importCaption: false,
                    altText: null,
                    isAudioThumbnails: true,
                    artist: "Morgan Wallen"
                }} ItemSettings={Item} itemLabel='Item' design={'sortable'} />
            }

            {
                lightboxType === 'gallery' &&
                <UploadGallery setAttributes={setAttributes} items={items} />
            }
        </PanelBody>

        {/* lightbox type button than Hide Layout Panel */}
        {
            !isBtnType &&
            <PanelBody title={__('Layout', 'lightbox-block')} className="bPlPanelBody" initialOpen={false} >
                <ToggleControl label={__('Showing the icon', 'lightbox-block')} checked={galleryIcon} onChange={(val) => { setAttributes({ galleryIcon: val }); }} />

                <SelectControl label={__('Layout', 'lightbox-block')} className='mt10' labelPosition="side" value={layout} options={layoutOpt} onChange={(val) => { setAttributes({ layout: val }) }} __nextHasNoMarginBottom />

                {
                    layout !== "slider" && <>
                        {/* column define option  */}
                        <PanelRow className='mt20'>
                            <Label mt='0'>{__('Columns:', 'lightbox-block')}</Label>
                            <BDevice device={device} onChange={val => setDevice(val)} />
                        </PanelRow>
                        <RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />
                    </>
                }

                {/* column Gap  */}
                <UnitControl className='mt20' label={__('Column Gap:', 'lightbox-block')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />
                {
                    layout !== "slider" &&
                    <UnitControl className='mt20' label={__('Row Gap:', 'lightbox-block')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />
                }
                <Notice status='premium' isIcon={true}>{__('Slider Layout are available in the Premium version.', 'lightbox-block')}</Notice>
            </PanelBody>
        }


        {/* Pagination is a Pro feature */}
        {
            !isBtnType && 'slider' !== layout && <PanelBody className='bPlPanelBody' title={<> {__('Pagination', 'lightbox-block')}<PremiumBadge />
            </>} initialOpen={false}>
                <PremiumPanel title={__('Pagination', 'lightbox-block')} description={__('Load More button, Infinite Scroll and Numbered Pages for big galleries, with items per page and a "Showing X of Y" counter, are available in the Premium version.', 'lightbox-block')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/lightbox-block/#demos' />
            </PanelBody>
        }

        {
            layout !== "masonry" && <PanelBody className='bPlPanelBody' title={<> {__('Image Aspect Ratio', 'lightbox-block')}<PremiumBadge />
            </>} initialOpen={false}>
                <PremiumPanel title={__('Ratio', 'lightbox-block')} description={__('Image Aspect Ratio(Landscape, Square, Potrait, Vertical and Horizontal) are available in the Premium version.', 'lightbox-block')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/lightbox-block/#demos' />
            </PanelBody>}

        {/* Lazy load & image loading — every type except button (no thumbnails there) */}
        {
            !isBtnType && <PanelBody className='bPlPanelBody lbbLazyPanel' title={<>{__('Lazy Load', 'lightbox-block')} <Badge className='ml5' /></>} initialOpen={false}>
                <p className='lbbLazyNote'>
                    {__('New to Lazy Load?', 'lightbox-block')}
                    <a className='lbbLazyTutorial' href={LAZY_TUTORIAL_URL} target='_blank' rel='noreferrer'>{__('Watch tutorial', 'lightbox-block')}</a>
                </p>
                {(lazyLoad?.enabled ?? true) && <LazyConflictNotice />}

                <ToggleControl
                    label={helpLabel(__('Lazy Load Images', 'lightbox-block'), __('Load images only when they scroll into view.', 'lightbox-block'))}
                    checked={lazyLoad?.enabled ?? true}
                    onChange={val => setLazy('enabled', val)}
                />

                {(lazyLoad?.enabled ?? true) && <RangeControl
                    className='mt15'
                    label={helpLabel(__('Load Distance (px)', 'lightbox-block'), __('Start loading this many pixels before the image reaches the screen.', 'lightbox-block'))}
                    value={lazyLoad?.distance ?? 200}
                    onChange={val => setLazy('distance', val ?? 200)}
                    min={0}
                    max={1000}
                    step={50}
                    allowReset
                    resetFallbackValue={200}
                    __nextHasNoMarginBottom
                />}

                {(lazyLoad?.enabled ?? true) && <RangeControl
                    className='mt15'
                    label={helpLabel(__('Load Delay (ms)', 'lightbox-block'), __('Wait this long after an image reaches the load distance before loading it. Skips images people scroll past quickly.', 'lightbox-block'))}
                    value={lazyLoad?.delay ?? 0}
                    onChange={val => setLazy('delay', val ?? 0)}
                    min={0}
                    max={2000}
                    step={50}
                    allowReset
                    resetFallbackValue={0}
                    __nextHasNoMarginBottom
                />}

                <SelectControl
                    className='mt15'
                    label={helpLabel(__('Thumbnail Size', 'lightbox-block'), __('Max grid image size. Lightbox still opens the full image.', 'lightbox-block'))}
                    labelPosition='side'
                    value={lazyLoad?.thumbSize || 'large'}
                    options={thumbSizeOpt}
                    onChange={val => setLazy('thumbSize', val)}
                    __nextHasNoMarginBottom
                />

                <SelectControl
                    className='mt15'
                    label={helpLabel(__('WebP', 'lightbox-block'), __('WebP: grid images are converted to WebP (usually 25–40% smaller) in the background by your server; original files are kept. None: always the original JPG/PNG.', 'lightbox-block'))}
                    labelPosition='side'
                    value={lazyLoad?.webp ? 'webp' : 'none'}
                    options={[
                        { label: __('None (original)', 'lightbox-block'), value: 'none' },
                        { label: __('WebP', 'lightbox-block'), value: 'webp' },
                    ]}
                    onChange={val => setLazy('webp', 'webp' === val)}
                    __nextHasNoMarginBottom
                />
                {lazyLoad?.webp && false === window.lbbWebpSupported && <Notice status='warning'>{__('Your server cannot create WebP images (GD/Imagick without WebP), so the original files will be used.', 'lightbox-block')}</Notice>}

                {'masonry' !== layout && <PanelRow className='mt15'>
                    <Label mt='0'>{helpLabel(__('Crop Position', 'lightbox-block'), __('Which part of the image stays visible when it is cropped to the box.', 'lightbox-block'))}</Label>
                    <CropPositionGrid value={lazyLoad?.cropPosition || 'center center'} onChange={val => setLazy('cropPosition', val)} />
                </PanelRow>}

                <SelectControl
                    className='mt15'
                    label={helpLabel(__('Loaded Effect', 'lightbox-block'), __('Animation when an image appears.', 'lightbox-block'))}
                    labelPosition='side'
                    value={lazyLoad?.effect || 'none'}
                    options={loadedEffectOpt}
                    onChange={val => setLazy('effect', val)}
                    __nextHasNoMarginBottom
                />

                <SelectControl
                    className='mt15'
                    label={helpLabel(__('Placeholder', 'lightbox-block'), __('What fills the box before the image arrives.', 'lightbox-block'))}
                    labelPosition='side'
                    value={'blur' === lazyLoad?.placeholder ? 'color' : (lazyLoad?.placeholder || 'none')}
                    options={placeholderOpt.filter(opt => 'blur' !== opt.value)}
                    onChange={val => setLazy('placeholder', val)}
                    __nextHasNoMarginBottom
                />

                {'none' !== (lazyLoad?.placeholder || 'none') && <ColorControl label={__('Placeholder Color', 'lightbox-block')} value={lazyLoad?.placeholderColor} onChange={val => setLazy('placeholderColor', val)} defaultColor='#f0f0f1' />}

                <ToggleControl
                    className='mt15'
                    label={helpLabel(__('Loading Icon', 'lightbox-block'), __('Spinner while the image loads.', 'lightbox-block'))}
                    checked={!!lazyLoad?.loadingIcon}
                    onChange={val => setLazy('loadingIcon', val)}
                />

                <Notice status='premium' isIcon={true}>{__('Site-wide Lazy Load settings (control every gallery from one page), one-click WebP conversion of existing images, Blur placeholder (LQIP), Loading Icon Style (10 loaders + your own uploaded icon), Icon Size and Icon Color are available in the Premium version.', 'lightbox-block')}</Notice>
            </PanelBody>
        }

        {/* lightbox type button than show button settings  */}
        {
            isBtnType && <PanelBody title={__('Button', 'lightbox-block')} className="bPlPanelBody" initialOpen={false} >
                <Label className='mb5'>{__('Text', 'lightbox-block')} </Label>
                <TextControl value={button.text} labelPosition='top' onChange={val => updateAttr('button', 'text', val)} />

                <IconControl className='mt20' value={button.icon} onChange={val => updateAttr('button', 'icon', val)} isSize={false} isColor={false} />
            </PanelBody>
        }

        {
            lightboxType !== 'button' && <PanelBody className='bPlPanelBody' title={<> {__('Gallery', 'lightbox-block')}<PremiumBadge />
            </>} initialOpen={false}>
                <PremiumPanel title={__('Gallery', 'lightbox-block')} description={__('Show Caption, Show Overlay and lightbox Caption are available in the Premium version.', 'lightbox-block')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/lightbox-block/#demos' />
            </PanelBody>}

        <AdvertiseCard planLink={adminUrl()} />
    </>
}
export default General;