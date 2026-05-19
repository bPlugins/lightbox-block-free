import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { BControlPro, PremiumBadge, PremiumPanel } from '../../../../../../bpl-tools/ProControls';
import { ColorControl, Notice } from '../../../../../../bpl-tools/Components';
import { useState } from 'react';
import { BDevice } from '../../../../../../bpl-tools/Components/Deprecated';
import { adminUrl } from '../../../../utils/functions';

const Popup = ({ attributes, setAttributes, updateAttr }) => {
    const { lightboxType, popupOptions, popupIconLeft, popupIconMiddle, popupIconRight, slideShow, options, controls, thumb, popupTheme, items } = attributes;

    const [device, setDevice] = useState('desktop');

    return <>
        {/* Slideshows */}
        {(lightboxType === 'gallery') && <PanelBody title={__("Options", "lightbox")} className="bPlPanelBody" initialOpen={false} >

            <ToggleControl className='mt20' label={__('Mixed All Content', 'lightbox')} checked={popupOptions?.mixAllData} onChange={(val) => { setAttributes({ popupOptions: { ...popupOptions, mixAllData: val } }); }} />

            <Notice status='premium' isIcon={true}>{__('Autoplay, Autostart, Duration, Mousewheel(slide, zoom), and Slide Effect(Defaul, Slide, CrossFade, Classic) are available in the Premium version.', 'b-slider')}</Notice>
        </PanelBody>}

        {/* Pro feature  */}
        {
            (lightboxType === 'gallery' && items.some(item => item.type === "image")) && <PanelBody title={__('Top Bar', 'lightbox')} className="bPlPanelBody" initialOpen={false}>
                <div className="notice">{__('Only the image gallery will work.', 'lightbox')}</div>

                <PanelBody className='bPlPanelBody' title={<> {__('Left', 'b-slider')}<PremiumBadge />
                </>} initialOpen={false}>
                    <PremiumPanel title={__('Count Info', 'b-slider')} description={__('Count info show/hide are available in the Premium version.', 'b-slider')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/lightbox-block/#demos' />
                </PanelBody>

                <PanelBody title={__('Middle ', 'lighltbox')} className="bPlPanelBody" initialOpen={false} >
                    <ToggleControl className='mt10' label={__('Zoom In', 'lightbox')} checked={popupIconMiddle?.zoomIn} onChange={val => updateAttr('popupIconMiddle', 'zoomIn', val)} />

                    <ToggleControl className='mt10' label={__('Zoom Out', 'lightbox')} checked={popupIconMiddle?.zoomOut} onChange={val => updateAttr('popupIconMiddle', 'zoomOut', val)} />

                    <Notice status='premium' isIcon={true}>{__('Toogle zoom level, Rotate, Flip horizontal/vertical, Fullscreen are available in the Premium version.', 'b-slider')}</Notice>
                </PanelBody>

                <PanelBody title={__('Right ', 'lightbox')} className="bPlPanelBody" initialOpen={false}>
                    <ToggleControl className='mt10' label={__('SlideShows', 'lightbox')} checked={popupIconRight?.slideshow} onChange={val => updateAttr('popupIconRight', 'slideshow', val)} />

                    <ToggleControl className='mt10' label={__('Thumbnails', 'lightbox')} checked={popupIconRight?.thumbs} onChange={val => updateAttr('popupIconRight', 'thumbs', val)} />

                    <ToggleControl className='mt10' label={__('Close', 'lightbox')} checked={popupIconRight?.close} onChange={val => updateAttr('popupIconRight', 'close', val)} />

                    <Notice status='premium' isIcon={true}>{__('Facebook Share, Twitter Share, Download are available in the Premium version.', 'b-slider')}</Notice>
                </PanelBody>
            </PanelBody>
        }

        {/* Thumbnails */}
        {(lightboxType === 'gallery' && items.some(item => item.type === "image")) &&

            <PanelBody className='bPlPanelBody' title={<> {__('Thumbnails', 'b-slider')}<PremiumBadge />
            </>} initialOpen={false}>
                <PremiumPanel title={__('Thumbnails', 'b-slider')} description={__('Show/hide thumbnails, thumbnails type(classic, modern) options are available in the Premium version.', 'b-slider')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/lightbox-block/#demos' />
            </PanelBody>}

        {((lightboxType === 'gallery' && items.some(item => item.type === "audio")) || lightboxType === 'audio') &&
            <PanelBody className='bPlPanelBody' title={<> {__('Audio Player', 'b-slider')}<PremiumBadge />
            </>} initialOpen={false}>
                <PremiumPanel title={__('Audio Player', 'b-slider')} description={__('Player1, Player2 and Player3 are available in the Premium version.', 'b-slider')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/lightbox-block/#demos' />
            </PanelBody>
        }

        {/* Player Controls */}
        {((lightboxType === 'gallery' && (items.some(item => item.type === "video") || items.some(item => item.type === "audio"))) || (lightboxType === 'video' || lightboxType === 'audio')) && (() => {
            const hasVideo = lightboxType === 'video' || (lightboxType === 'gallery' && items.some(item => item.type === "video"));
            const PlyrControls = () => <>
                <ToggleControl className='mt10' label={__('Restart', 'lightbox')} checked={controls?.restart} onChange={val => { updateAttr('controls', 'restart', val); }} />
                <ToggleControl className='mt10' label={__('Play', 'lightbox')} checked={controls?.play} onChange={val => { updateAttr('controls', 'play', val); }} />
                <ToggleControl className='mt10' label={__('Rewind', 'lightbox')} checked={controls?.rewind} onChange={val => { updateAttr('controls', 'rewind', val); }} />
                <ToggleControl className='mt10' label={__('Fast-forward', 'lightbox')} checked={controls["fast-forward"]} onChange={val => { updateAttr('controls', 'fast-forward', val); }} />
                <ToggleControl className='mt10' label={__('Progress', 'lightbox')} checked={controls?.progress} onChange={val => { updateAttr('controls', 'progress', val); }} />
            </>;


            return <PanelBody title={__("Player Controls", "lightbox")} className="bPlPanelBody" initialOpen={false}>
                <PlyrControls />
                <Notice status='premium' isIcon={true}>{__('Mute, Settings, Download, Current Time, Duration, Volume, Play large, Airplay and FullScreen are available in the Premium version.', 'b-slider')}</Notice>
            </PanelBody>
        })()}

        <PanelBody title={__("Popup", "lightbox")} className="bPlPanelBody" initialOpen={false}>
            <ColorControl className='mb20' label={__(' Color', 'slider')} value={popupTheme?.color} defaultColor="#000" onChange={val => { updateAttr('popupTheme', 'color', val); }} />
            <Notice status='premium' isIcon={true}>{__('Custom popup style are available in the Premium version.', 'b-slider')}</Notice>
        </PanelBody>
    </>
}
export default Popup;