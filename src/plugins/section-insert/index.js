/**
 * WordPress dependencies
 */
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { Button, Dashicon, PanelBody } = wp.components;
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { dispatch, select } = wp.data;
const {
	cloneBlock,
	createBlock,
} = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';

// Define supported blocks.
const supportedBlocks = [
	'gt-blocks-pro/columns',
	'gt-blocks-pro/portfolio',
	'gt-blocks-pro/features',
	'gt-blocks-pro/grid-layout',
];

const insertIntoSection = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Return early if block does not support insertIntoSection plugin.
		if ( ! supportedBlocks.includes( props.name ) ) {
			return <BlockEdit { ...props } />;
		}

		// Get Block functions.
		const {
			getBlocksByClientId,
			getBlockRootClientId,
		} = select( 'core/editor' );

		const {
			replaceBlocks,
		} = dispatch( 'core/editor' );

		// Get current block.
		const { clientId } = props;

		// Get parent block.
		const rootClientId = getBlockRootClientId( clientId );

		// Return if block is already a child block.
		if ( rootClientId ) {
			return <BlockEdit { ...props } />;
		}

		// Wrap with Section function.
		const createSection = () => {
			// Get current block.
			const block = getBlocksByClientId( clientId )[ 0 ];

			// Clone block and wrap into section block.
			const clonedBlock = cloneBlock( block );
			const sectionBlock = createBlock( 'gt-blocks-pro/section', {}, [ clonedBlock ] );

			// Replace block.
			replaceBlocks( clientId, sectionBlock );
		};

		return (
			<Fragment>
				<BlockEdit { ...props } />

				<InspectorControls>

					<PanelBody title={ __( 'Section Settings', 'gt-blocks-pro' ) } initialOpen={ false } className="gt-panel-section-insert gt-panel">

						<p id="gt-synchronize-styling__help" className="components-base-control__help">
							{ __( 'Insert this block into a section block.', 'gt-blocks-pro' ) }
						</p>

						<Button
							key="add-section"
							isLarge
							onClick={ createSection }
						>
							<Dashicon icon="migrate" />
							{ __( 'Insert into GT Section', 'gt-blocks-pro' ) }
						</Button>

					</PanelBody>

				</InspectorControls>
			</Fragment>
		);
	};
}, 'insertIntoSection' );
addFilter( 'editor.BlockEdit', 'gt-blocks-pro/plugins/section-insert', insertIntoSection );
