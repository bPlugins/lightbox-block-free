import { registerBlockType } from '@wordpress/blocks';

import { icons } from './utils/icons';
import metadata from './block.json';

import './editor.scss';
import Edit from './Components/Backend/Edit';

registerBlockType(metadata, {
	icon: icons.lightbox,
	edit: Edit,
	save: () => null
});