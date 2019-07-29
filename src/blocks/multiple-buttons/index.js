/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	InnerBlocks,
} = wp.editor;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';

/**
 * Register block
 */
registerBlockType(
	'gt-blocks-pro/multiple-buttons',
	{
		title: __( 'GT Multiple Buttons', 'gt-blocks-pro' ),

		description: __( 'Insert multiple buttons.', 'gt-blocks-pro' ),

		category: 'gt-blocks-pro',

		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 304H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32zm0-192H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" /></svg>,

		attributes: {
			customClass: {
				type: 'string',
			},
			buttons: {
				type: 'number',
				default: 2,
			},
			buttonAttributes: {
				type: 'array',
			},
			alignment: {
				type: 'string',
			},
		},

		edit,

		save( { attributes } ) {
			const {
				customClass,
				alignment,
			} = attributes;

			const blockClasses = classnames( {
				[ `${ customClass }` ]: customClass,
				[ `gt-align-${ alignment }` ]: 'center' === alignment || 'right' === alignment,
			} );

			return (
				<div className={ blockClasses ? blockClasses : undefined }>

					<InnerBlocks.Content />

				</div>
			);
		},
	},
);
