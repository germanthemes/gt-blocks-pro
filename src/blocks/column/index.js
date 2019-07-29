/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';
import { default as contentContainerAttributes } from '../../components/content-container/attributes';
import { default as ContentContainer } from '../../components/content-container';

/**
 * Register block
 */
registerBlockType(
	'gt-blocks-pro/column',
	{
		title: __( 'GT Column', 'gt-blocks-pro' ),

		description: __( 'A single column within a grid block.', 'gt-blocks-pro' ),

		category: 'gt-blocks-pro',

		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 32H32C12.5 32-2.4 49.2.3 68.5l56 356.5c4.5 31.5 31.5 54.9 63.4 54.9h273c31.8 0 58.9-23.4 63.4-54.9l55.6-356.5C514.4 49.2 499.5 32 480 32zm-37.4 64l-30 192h-313L69.4 96h373.2z"></path></svg>,

		parent: [ 'gt-blocks-pro/features', 'gt-blocks-pro/grid-layout', 'gt-blocks-pro/portfolio' ],

		attributes: {
			contentClass: {
				type: 'string',
				default: 'gt-column',
			},
			...contentContainerAttributes,
		},

		supports: {
			inserter: false,
		},

		edit,

		save( props ) {
			return (
				<div>
					<ContentContainer { ...props }>
						<InnerBlocks.Content />
					</ContentContainer>
				</div>
			);
		},
	},
);
