/**
 * WordPress dependencies
 */
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { Button, Dashicon, PanelBody } = wp.components;
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;

/**
 * Internal dependencies
 */
import {
	getSiblings,
	getParentBlock,
	synchronizeButtons,
	synchronizeColumns,
	synchronizeHeadings,
	synchronizeIcons,
	synchronizeImages,
	synchronizeParagraphs,
} from './functions';
import './editor.scss';

// Define supported blocks.
const supportedBlocks = [
	'gt-blocks-pro/button',
	'gt-blocks-pro/column',
	'gt-blocks-pro/heading',
	'gt-blocks-pro/icon',
	'gt-blocks-pro/image',
	'core/paragraph',
];

// Define parent blocks.
const parentBlocks = [
	'gt-blocks-pro/column',
	'gt-blocks-pro/columns',
	'gt-blocks-pro/features',
	'gt-blocks-pro/portfolio',
	'gt-blocks-pro/grid-layout',
	'gt-blocks-pro/multiple-buttons',
];

const synchronizeStyling = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( ! supportedBlocks.includes( props.name ) ) {
			return <BlockEdit { ...props } />;
		}

		// Get Parent Block.
		const parentBlock = getParentBlock( props.clientId );

		// Return early if block has no parent.
		if ( ! parentBlock || ! parentBlocks.includes( parentBlock.name ) ) {
			return <BlockEdit { ...props } />;
		}

		// Retrieve sibling blocks.
		const siblings = getSiblings( props.name, parentBlock );

		// Return early if block has no siblings.
		if ( siblings.length < 2 ) {
			return <BlockEdit { ...props } />;
		}

		// Synchronize Styling function.
		const synchronizeAttributes = () => {
			switch ( props.name ) {
				case 'gt-blocks-pro/button': {
					synchronizeButtons( siblings, props.attributes );
					break;
				}
				case 'gt-blocks-pro/column': {
					synchronizeColumns( siblings, props.attributes );
					break;
				}
				case 'gt-blocks-pro/heading': {
					synchronizeHeadings( siblings, props.attributes );
					break;
				}
				case 'gt-blocks-pro/icon': {
					synchronizeIcons( siblings, props.attributes );
					break;
				}
				case 'gt-blocks-pro/image': {
					synchronizeImages( siblings, props.attributes );
					break;
				}
				case 'core/paragraph': {
					synchronizeParagraphs( siblings, props.attributes );
					break;
				}
			}
		};

		// Synchronize Styling Description Text.
		const synchronizeDescriptionText = () => {
			switch ( props.name ) {
				case 'gt-blocks-pro/button': {
					return __( 'Copy button settings and colors of this block and apply them to all sibling blocks.', 'gt-blocks-pro' );
				}
				case 'gt-blocks-pro/column': {
					return __( 'Copy colors of this block and apply them to all sibling blocks.', 'gt-blocks-pro' );
				}
				case 'gt-blocks-pro/heading': {
					return __( 'Copy heading settings and colors of this block and apply them to all sibling blocks.', 'gt-blocks-pro' );
				}
				case 'gt-blocks-pro/icon': {
					return __( 'Copy icon settings and colors of this block and apply them to all sibling blocks.', 'gt-blocks-pro' );
				}
				case 'gt-blocks-pro/image': {
					return __( 'Copy image size and URL settings of this block and apply them to all sibling blocks.', 'gt-blocks-pro' );
				}
				case 'core/paragraph': {
					return __( 'Copy text settings and colors of this block and apply them to all sibling blocks.', 'gt-blocks-pro' );
				}
			}
		};

		return (
			<Fragment>
				<BlockEdit { ...props } />

				<InspectorControls>

					<PanelBody title={ __( 'Synchronize Styling', 'gt-blocks-pro' ) } initialOpen={ false } className="gt-panel-synchronize-styling gt-panel">

						<p id="gt-synchronize-styling__help" className="components-base-control__help">
							{ synchronizeDescriptionText() }
						</p>

						<Button
							key="synchronize-buttons"
							isLarge
							onClick={ synchronizeAttributes }
						>
							<Dashicon icon="controls-repeat" />
							{ __( 'Synchronize Styling', 'gt-blocks-pro' ) }
						</Button>

					</PanelBody>

				</InspectorControls>
			</Fragment>
		);
	};
}, 'synchronizeStyling' );
addFilter( 'editor.BlockEdit', 'gt-blocks-pro/plugins/synchronize-styling', synchronizeStyling );

