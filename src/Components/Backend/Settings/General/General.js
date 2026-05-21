import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { PanelBody, PanelRow, SelectControl, RangeControl, Button, Dashicon, __experimentalUnitControl as UnitControl, TextControl, ToggleControl } from '@wordpress/components';

import { HelpPanel, IconControl, Label, ItemsPanel, BtnGroup, Notice } from '../../../../../../bpl-tools/Components';
import { BDevice } from '../../../../../../bpl-tools/Components/Deprecated';
import { AdvertiseCard, BControlPro, BtnGroupPro, PremiumBadge, PremiumPanel, SelectControlPro } from '../../../../../../bpl-tools/ProControls';
import { placeholderImg } from '../../../../utils/links';
import { layoutOpt, lbType, pxUnit, perUnit, emUnit, ratioOpt, sliderOpt } from '../../../../utils/options';
import Item from './Item';
import { useEffect } from 'react';
import UploadGallery from '../../UploadGallery';
import { adminUrl } from '../../../../utils/functions';
import MarketingBanner from '../../MarketingBanner';


const General = ({ attributes, setAttributes, isBtnType, updateAttr }) => {

    const [device, setDevice] = useState('desktop');
    const { lightboxType, items, layout, image, columns, columnGap, rowGap, content, galleryIcon, button, sliderHeight, slider } = attributes
    const itemsProps = { attributes, setAttributes, arrKey: 'items' }

    useEffect(() => {

        const fetchImageIds = async () => {
            const itemsCJson = encodeURIComponent(JSON.stringify(items));

            if (items?.length && !items[0]?.id) {
                // goto php 
                await fetch(`${bpllbMediaUrlId?.ajaxUrl}?action=bpllb_get_image_id&items=${itemsCJson}&nonce=${bpllbMediaUrlId?.nonce}`).then(res => res.json()).then(data => {
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


        {
            layout !== "masonry" && <PanelBody className='bPlPanelBody' title={<> {__('Image Aspect Ratio', 'lightbox-block')}<PremiumBadge />
            </>} initialOpen={false}>
                <PremiumPanel title={__('Ratio', 'lightbox-block')} description={__('Image Aspect Ratio(Landscape, Square, Potrait, Vertical and Horizontal) are available in the Premium version.', 'lightbox-block')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/lightbox-block/#demos' />
            </PanelBody>}

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