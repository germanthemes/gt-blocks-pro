/**
 * External dependencies
 */
import classnames from 'classnames';
import memoize from 'memize';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	Component,
	Fragment,
} = wp.element;

const {
	InnerBlocks,
} = wp.editor;

const {
	BaseControl,
	Button,
	Dashicon,
	PanelBody,
	SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import { default as BackgroundEdit } from '../../components/background-section/edit';

// Define blocks for hero content.
const TEMPLATE = [
	[ 'gt-blocks-pro/heading', {
		placeholder: __( 'Write Hero Heading...', 'gt-blocks-pro' ),
		customFontSize: 36,
	} ],
	[ 'core/paragraph', {
		placeholder: __( 'Write Hero text...', 'gt-blocks-pro' ),
	} ],
	[ 'gt-blocks-pro/multiple-buttons', {
		customClass: 'gt-buttons-wrapper',
		buttons: 2,
		gtRemoveMarginBottom: true,
	} ],
];

/**
 * Returns the layouts configuration for a given number of items.
 *
 * @param {number} number Number of items.
 *
 * @return {Object[]} Items layout configuration.
 */
const getTemplate = memoize( ( heroImage ) => {
	const content = [ 'gt-blocks-pro/content', {
		template: TEMPLATE,
		gtRemoveMarginBottom: true,
	} ];

	const image = [ 'gt-blocks-pro/image', { gtRemoveMarginBottom: true } ];

	if ( heroImage ) {
		return [ content, image ];
	}

	return [ content ];
} );

/**
 * Block Edit Component
 */
class HeroImageEdit extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			heroLayout,
			heroWidth,
			heroImage,
		} = attributes;

		const heroClasses = classnames( 'gt-hero-section', {
			[ `gt-hero-layout-${ heroLayout }` ]: heroLayout,
			[ `gt-hero-content-width-${ heroWidth }` ]: 50 !== heroWidth,
			'gt-has-hero-image': heroImage,
		} );

		const contentSettings = <Fragment>
			<PanelBody title={ __( 'Content Settings', 'gt-blocks-pro' ) } initialOpen={ false } className="gt-panel-content-settings gt-panel-hero-settings gt-panel">
				<BaseControl id="gt-image-block" label={ __( 'Image Block', 'gt-blocks-pro' ) }>
					<Button
						isLarge
						className="gt-image-block-button"
						onClick={ () => setAttributes( { heroImage: ! heroImage } ) }
					>
						<Dashicon icon={ heroImage ? 'trash' : 'insert' } />
						{ heroImage ? __( 'Remove Block', 'gt-blocks-pro' ) : __( 'Add Block', 'gt-blocks-pro' ) }
					</Button>
				</BaseControl>

				<SelectControl
					label={ __( 'Content Position', 'gt-blocks-pro' ) }
					value={ heroLayout }
					onChange={ ( newLayout ) => setAttributes( { heroLayout: newLayout } ) }
					options={ [
						{ value: 'left', label: __( 'Left', 'gt-blocks-pro' ) },
						{ value: 'right', label: __( 'Right', 'gt-blocks-pro' ) },
					] }
				/>

				<SelectControl
					label={ __( 'Content Width', 'gt-blocks-pro' ) }
					value={ heroWidth }
					onChange={ ( newWidth ) => setAttributes( { heroWidth: newWidth } ) }
					options={ [
						{ value: '30', label: __( '30%', 'gt-blocks-pro' ) },
						{ value: '40', label: __( '40%', 'gt-blocks-pro' ) },
						{ value: '50', label: __( '50%', 'gt-blocks-pro' ) },
						{ value: '60', label: __( '60%', 'gt-blocks-pro' ) },
						{ value: '70', label: __( '70%', 'gt-blocks-pro' ) },
					] }
				/>

			</PanelBody>
		</Fragment>;

		return (
			<Fragment>

				<BackgroundEdit
					contentSettings={ contentSettings }
					{ ...this.props }
				>

					<div className={ heroClasses }>

						<InnerBlocks
							allowedBlocks={ [ 'gt-blocks-pro/image', 'gt-blocks-pro/content' ] }
							template={ getTemplate( heroImage ) }
							templateLock="all"
						/>

					</div>

				</BackgroundEdit>

			</Fragment>
		);
	}
}

export default HeroImageEdit;
