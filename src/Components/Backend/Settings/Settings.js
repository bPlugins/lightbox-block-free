
import { useEffect, useState } from '@wordpress/element';
import { produce } from 'immer';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

// Settings Components
import { generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Popup from './General/Popup';
import Style from './Style/Style';

const Settings = ({ attributes, setAttributes, id }) => {
	const { lightboxType, button, btnType, items } = attributes;

	// button Update
	const updateAttr = (attr, type, val) => {
		const newAttr = produce(attributes[attr], draft => {
			draft[type] = val;
		});
		setAttributes({ [attr]: newAttr });
	}

	useEffect(() => {
		if (btnType === 'circle') {
			const ele = document.querySelector(`#${id} .lbbLightBox a`);
			setAttributes({ btnWidth: "auto", btnHeight: ele?.offsetWidth + "px" });

			if (ele.offsetWidth > 300) {
				setTimeout(() => {
					setAttributes({ btnWidth: "auto", btnHeight: ele?.offsetWidth + "px" });
				}, 10);
			}
		}
	}, [btnType, button]);

	const isBtnType = 'button' === lightboxType;
	const globalProps = { attributes, setAttributes, updateAttr };


	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel lbbTabPanel' activeClass='activeTab' tabs={generalStyleTabs}>{tab => <>
				{'general' === tab.name && <General {...globalProps} isBtnType={isBtnType} />}

				{'popup' === tab.name && <Popup {...globalProps} />}

				{'style' === tab.name && <Style {...globalProps} isBtnType={isBtnType} />}
			</>}</TabPanel>
		</InspectorControls>
	</>;
};
export default Settings;