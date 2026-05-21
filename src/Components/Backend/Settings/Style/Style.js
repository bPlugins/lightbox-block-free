
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { captionPOpt, imageAnimation, pxUnit, perUnit, btnSopt, btnTypeOpt, aligns, } from '../../../../utils/options';
import { PanelBody, PanelRow, SelectControl, __experimentalUnitControl as UnitControl, __experimentalBoxControl as BoxControl, __experimentalBorderControl as BorderControl, __experimentalNumberControl as NumberControl, RangeControl } from '@wordpress/components';
import { produce } from 'immer';
import { Label, BtnGroup, Typography, ColorsControl, ColorControl, Notice } from '../../../../../../bpl-tools/Components';
import { BControlPro, PremiumBadge, PremiumPanel } from '../../../../../../bpl-tools/ProControls';
import { BDevice } from '../../../../../../bpl-tools/Components/Deprecated';
import { adminUrl } from '../../../../utils/functions';

const Style = ({ attributes, setAttributes, updateAttr, isBtnType }) => {

    const { lightboxType, content, img, caption, imgBorder, overlyColor, playerColor, btnStyle, captionTypo, captionColors, btnWidth, btnHeight, btnType, btnColors, btnAlign, btnTypo, btnHovColors, btnPadding, btnBorder, button, btnSpaceBetween, btnRadius, audio, popupTheme, layout, slider, items } = attributes;
    const { closeIconColors, closeIconHColor } = popupTheme;
    const [device, setDevice] = useState('desktop');

    const { player, typo } = audio;

    return <>  {
        'button' !== lightboxType && <>
            <PanelBody className='bPlPanelBody lbbPanelBody' title={__('Gallery Item', 'lightbox-block')} initialOpen={false}>
                {/* button border  */}
                <Label>{__('Border', 'lightbox-block')}</Label>
                <BorderControl className="mb20" value={imgBorder} onChange={(value) => setAttributes({ imgBorder: value })}
                />

                <Notice status='premium' isIcon={true}>{__('Border Radius, Hover Effect are available in the Premium version.', 'lightbox-block')}</Notice>
            </PanelBody>
        </>
    }
        {((lightboxType === 'gallery' && items.some(item => item.type === "video")) || lightboxType === 'video') &&
            <PanelBody className='bPlPanelBody' title={<> {__('Player', 'lightbox-block')}<PremiumBadge />
            </>} initialOpen={false}>
                <PremiumPanel title={__('Controls Color', 'lightbox-block')} description={__('Player controls are available in the Premium version.', 'lightbox-block')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/lightbox-block/#demos' />
            </PanelBody>}

        {
            isBtnType && <PanelBody className='bPlPanelBody lbbPanelBody' title={__('Button', 'lightbox-block')} initialOpen={true}>
                {/* button width height  */}
                <div className="lbbWHControl">
                    {/* Widht  */}
                    <UnitControl label={__('Width', 'lightbox-block')} className='' value={btnWidth}
                        onChange={(val) => { setAttributes({ btnWidth: val }) }} units={[pxUnit(10), perUnit(100)]} onUnitChange="" isUnitSelectTabbable />
                    {/* Height 	 */}
                    <UnitControl label={__('Height', 'lightbox-block')} className='' value={btnHeight}
                        onChange={(val) => { setAttributes({ btnHeight: val }) }} units={[pxUnit(10), perUnit(100)]} onUnitChange="" isUnitSelectTabbable />
                </div>

                {/* Button Style  */}
                <PanelRow className='mt20 mb20'>
                    <Label mt='0' mb='0'>{__('Style:', 'lightbox-block')}</Label>
                    <BtnGroup value={btnStyle}
                        onChange={val => {

                            if ('fill' === val) {
                                setAttributes({
                                    btnStyle: val,
                                    btnColors: { color: '#4527a4', bg: '#000', styles: `color: #4527a4; background: #000` }
                                })
                            }

                            if ('outline' === val) {
                                setAttributes({
                                    btnStyle: val,
                                    btnBorder: { color: btnColors?.color, style: 'solid', width: '1px' },
                                    btnColors: { color: '#4527a4', bg: '#fff0', styles: `color: #4527a4; background: #fff0` }
                                })
                            }
                        }
                        }
                        options={btnSopt} isIcon={false} />
                </PanelRow>

                <SelectControl label={__('Type', 'lightbox-block')} labelPosition="side" value={btnType} options={btnTypeOpt} onChange={val => {
                    const radius = val === 'circle' ? '50%' : '3px';
                    const pillRadius = val === 'pill' ? '100px' : '3px';
                    const pillTBPadding = val === 'pill' ? '10px' : '8px';
                    const pillLRBPadding = val === 'pill' ? '20px' : '15px';
                    const defaultTBPadding = val === 'default' ? '8px' : '8px';
                    const defaultRBPadding = val === 'default' ? '15px' : '15px';

                    if (val === 'default') {
                        setAttributes({
                            btnType: val,
                            btnWidth: 'auto',
                            btnHeight: 'auto',
                            btnRadius: { "top": radius, "right": radius, "bottom": radius, "left": radius },
                            btnPadding: { "top": defaultTBPadding, "right": defaultRBPadding, "bottom": defaultTBPadding, "left": defaultRBPadding }
                        })
                    }

                    if (val === 'circle') {
                        setAttributes({
                            btnType: val,
                            btnRadius: { "top": radius, "right": radius, "bottom": radius, "left": radius },
                            btnPadding: { "top": pillTBPadding, "right": pillLRBPadding, "bottom": pillTBPadding, "left": pillLRBPadding }
                        })
                    }

                    if (val === 'fullWidth') {
                        setAttributes({
                            btnType: val,
                            btnWidth: '100%',
                            btnHeight: 'auto',
                            btnRadius: { "top": radius, "right": radius, "bottom": radius, "left": radius },
                        })
                    }

                    if (val === 'pill') {
                        setAttributes({
                            btnType: val,
                            btnWidth: 'auto',
                            btnHeight: 'auto',
                            btnRadius: { "top": pillRadius, "right": pillRadius, "bottom": pillRadius, "left": pillRadius },
                            btnPadding: { "top": pillTBPadding, "right": pillLRBPadding, "bottom": pillTBPadding, "left": pillLRBPadding }
                        })
                    }
                }} />

                <PanelRow className='mt20'>
                    <Label mt='0' mb='0'>{__('Align:', 'lightbox-block')}</Label>
                    <BtnGroup value={btnAlign} onChange={val => setAttributes({ btnAlign: val })} options={aligns} isIcon={true} />
                </PanelRow>

                {/* Typography  */}
                <Typography className='' label={__('Typography:', 'lightbox-block')} value={btnTypo} isFamily={false} onChange={val => { setAttributes({ btnTypo: val }) }} defaults={{ fontSize: 18 }} produce={produce} />

                {/* color */}
                <ColorsControl className='' label={__('Colors', 'lightbox-block')} value={btnColors} onChange={val => setAttributes({ btnColors: val })} defaults={{ color: '#4527a4', bg: '#fff' }} />

                {/* Hover color  */}
                <ColorsControl label={__('Hover Colors', 'lightbox-block')} className="mb15" value={btnHovColors} onChange={val => setAttributes({ btnHovColors: val })} defaults={{ color: '#4527a4', bg: '#fff' }} />

                {/* Padding */}
                <BoxControl label={__("Padding", 'lightbox-block')} values={btnPadding} onChange={val => setAttributes({ btnPadding: val })} resetValues={{ top: "8px", right: "15px", bottom: "8px", left: "15px" }} />

                {/* button border  */}
                <Label>{__('Border', 'lightbox-block')}</Label>
                <BorderControl className="mb20" value={btnBorder} onChange={(value) => setAttributes({ btnBorder: value })}
                />

                {/* border radius  */}
                <BoxControl label={__('Border Radius', 'lightbox-block')} values={btnRadius} onChange={val => setAttributes({ btnRadius: val })} resetValues={{
                    top: "3px", right: "3px", bottom: "3px", left: "3px"
                }}
                />

                {/* Icon Space */}
                {button.icon.class &&
                    <UnitControl label={__('Space between icon & text', 'lightbox-block')} className='' value={btnSpaceBetween} onChange={(val) => { setAttributes({ btnSpaceBetween: val }) }}
                        units={[pxUnit(10)]} />
                }
            </PanelBody>
        }




        <PanelBody className='bPlPanelBody lbbPanelBody' title={__('Close Icon', 'lightbox-block')} initialOpen={false}>
            {/* column define option  */}
            <PanelRow className='mt20'>
                <Label mt='0'>{__('Size:', 'lightbox-block')}</Label>
                <BDevice device={device} onChange={val => setDevice(val)} />
            </PanelRow>

            <RangeControl label={__('', 'lightbox-block')} value={popupTheme?.closeIconSize?.[device]}
                onChange={val => {
                    setAttributes({
                        popupTheme: {
                            ...popupTheme,
                            closeIconSize: {
                                ...popupTheme.closeIconSize,
                                [device]: val
                            }
                        }
                    });
                }} min={10} max={100} step={1} beforeIcon='grid-view' />

            {/* color */}
            <ColorsControl className='' label={__('Colors', 'lightbox-block')} value={closeIconColors} onChange={val => updateAttr('popupTheme', 'closeIconColors', val)} />

            <ColorsControl className='' label={__('Hover Colors', 'lightbox-block')} value={closeIconHColor} onChange={val => updateAttr('popupTheme', 'closeIconHColor', val)} />
        </PanelBody>

        {
            layout === "slider" && <PanelBody className='bPlPanelBody lbbPanelBody' title={__('Arrow', 'lightbox-block')} initialOpen={false}>
                <ColorsControl label={__('Colors', 'lightbox-block')} value={slider?.arrowColors} className="mt10" onChange={val => updateAttr('slider', 'arrowColors', val)} />
            </PanelBody>
        }

    </>
}
export default Style;