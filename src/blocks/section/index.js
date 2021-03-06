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
import edit from './edit';
import { default as backgroundAttributes } from '../../components/background-section/attributes';
import { default as BackgroundSection } from '../../components/background-section';

/**
 * Register block
 */
registerBlockType(
	'gt-blocks-pro/section',
	{
		title: __( 'GT Section', 'gt-blocks-pro' ),

		description: __( 'Add a section block, then use whatever content blocks you’d like.', 'gt-blocks-pro' ),

		category: 'gt-blocks-pro',

		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z" /></svg>,

		keywords: [
			__( 'GT Blocks Pro', 'gt-blocks-pro' ),
			__( 'Container', 'gt-blocks-pro' ),
			__( 'Wrap', 'gt-blocks-pro' ),
		],

		attributes: { ...backgroundAttributes },

		getEditWrapperProps( attributes ) {
			const { blockAlignment } = attributes;
			if ( 'wide' === blockAlignment || 'full' === blockAlignment ) {
				return { 'data-align': blockAlignment };
			}
		},

		edit,

		save( props ) {
			return (
				<BackgroundSection { ...props }>
					<InnerBlocks.Content />
				</BackgroundSection>
			);
		},
	},
);
