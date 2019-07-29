/**
 * External dependencies
 */
import classnames from 'classnames';
const { getComputedStyle } = window;

/**
 * WordPress dependencies
 */
const {
	Component,
	Fragment,
} = wp.element;

const {
	__,
} = wp.i18n;

const { compose, withInstanceId } = wp.compose;
const { withSelect } = wp.data;

const {
	BlockAlignmentToolbar,
	BlockControls,
	ContrastChecker,
	MediaUpload,
	Inserter,
	InspectorControls,
	PanelColorSettings,
	withColors,
} = wp.editor;

const {
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	withFallbackStyles,
} = wp.components;

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Block Edit Component
 */
class BackgroundEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
	}

	componentDidUpdate() {
		const {
			attributes,
			setAttributes,
			wideControlsEnabled,
		} = this.props;

		// Set block alignment to default if theme does not support wide and full width blocks.
		if ( ! wideControlsEnabled && 'default' !== attributes.blockAlignment ) {
			setAttributes( { blockAlignment: 'default' } );
		}
	}

	onSelectImage( img ) {
		this.props.setAttributes( {
			backgroundImageId: img.id,
			backgroundImageUrl: img.url,
		} );
	}

	onRemoveImage() {
		this.props.setAttributes( {
			backgroundImageId: undefined,
			backgroundImageUrl: undefined,
		} );
	}

	render() {
		const {
			attributes,
			children,
			clientId,
			showInserter,
			backgroundColor,
			setBackgroundColor,
			fallbackBackgroundColor,
			textColor,
			setTextColor,
			fallbackTextColor,
			setAttributes,
			instanceId,
			className,
			wideControlsEnabled,
		} = this.props;

		const {
			blockAlignment,
			contentWidth,
			paddingTop,
			paddingBottom,
			backgroundImageId,
			backgroundImageUrl,
			imageOpacity,
			backgroundPosition,
			fixedBackground,
		} = attributes;

		const blockId = `gt-container-block-${ instanceId }`;

		const blockClasses = classnames( className, 'gt-background-section', {
			[ `gt-${ paddingTop }-top-padding` ]: 'none' !== paddingTop,
			[ `gt-${ paddingBottom }-bottom-padding` ]: 'none' !== paddingBottom,
			'has-text-color': textColor.color,
			[ textColor.class ]: textColor.class,
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
			'gt-has-background-image': backgroundImageId,
			'gt-fixed-background': fixedBackground,
		} );

		const blockStyles = {
			backgroundColor: backgroundColor.class ? undefined : backgroundColor.color,
			color: textColor.class ? undefined : textColor.color,
			backgroundImage: backgroundImageId ? `url(${ backgroundImageUrl })` : undefined,
			backgroundPosition: 'center center' !== backgroundPosition ? backgroundPosition : undefined,
		};

		const overlayClasses = classnames( 'gt-background-overlay', {
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
		} );

		const overlayStyles = {
			backgroundColor: backgroundColor.color ? backgroundColor.color : '#ffffff',
			opacity: ( 100 - imageOpacity ) / 100,
		};

		const contentClasses = classnames( 'gt-section-content', {
			[ `gt-${ contentWidth }-width` ]: 'default' !== blockAlignment,
		} );

		const dataBackgroundImage = backgroundImageId ? backgroundImageUrl : undefined;

		return (
			<Fragment>

				<BlockControls>

					{ wideControlsEnabled && (
						<BlockAlignmentToolbar
							value={ blockAlignment }
							onChange={ ( newAlign ) => setAttributes( { blockAlignment: newAlign ? newAlign : 'default' } ) }
							controls={ [ 'wide', 'full' ] }
						/>
					) }

				</BlockControls>

				<InspectorControls>

					<PanelBody title={ __( 'Section Settings', 'gt-blocks-pro' ) } initialOpen={ true } className="gt-section-settings-panel gt-panel">

						{ ( wideControlsEnabled && ( 'full' === blockAlignment || 'wide' === blockAlignment ) ) && (

							<SelectControl
								label={ __( 'Content Width', 'gt-blocks-pro' ) }
								value={ contentWidth }
								onChange={ ( newWidth ) => setAttributes( { contentWidth: newWidth } ) }
								options={ [
									{ value: 'narrow', label: __( 'Narrow width', 'gt-blocks-pro' ) },
									{ value: 'default', label: __( 'Default width', 'gt-blocks-pro' ) },
									{ value: 'wide', label: __( 'Wide width', 'gt-blocks-pro' ) },
									{ value: 'full', label: __( 'Full width', 'gt-blocks-pro' ) },
								] }
							/>

						) }

						<SelectControl
							label={ __( 'Padding Top', 'gt-blocks-pro' ) }
							value={ paddingTop }
							onChange={ ( newPadding ) => setAttributes( { paddingTop: newPadding } ) }
							options={ [
								{ value: 'none', label: __( 'None', 'gt-blocks-pro' ) },
								{ value: 'small', label: __( 'Small', 'gt-blocks-pro' ) },
								{ value: 'normal', label: __( 'Normal', 'gt-blocks-pro' ) },
								{ value: 'medium', label: __( 'Medium', 'gt-blocks-pro' ) },
								{ value: 'large', label: __( 'Large', 'gt-blocks-pro' ) },
								{ value: 'extra-large', label: __( 'Extra Large', 'gt-blocks-pro' ) },
							] }
						/>

						<SelectControl
							label={ __( 'Padding Bottom', 'gt-blocks-pro' ) }
							value={ paddingBottom }
							onChange={ ( newPadding ) => setAttributes( { paddingBottom: newPadding } ) }
							options={ [
								{ value: 'none', label: __( 'None', 'gt-blocks-pro' ) },
								{ value: 'small', label: __( 'Small', 'gt-blocks-pro' ) },
								{ value: 'normal', label: __( 'Normal', 'gt-blocks-pro' ) },
								{ value: 'medium', label: __( 'Medium', 'gt-blocks-pro' ) },
								{ value: 'large', label: __( 'Large', 'gt-blocks-pro' ) },
								{ value: 'extra-large', label: __( 'Extra Large', 'gt-blocks-pro' ) },
							] }
						/>

					</PanelBody>

					{ this.props.contentSettings ? this.props.contentSettings : null }

					<PanelColorSettings
						title={ __( 'Color Settings', 'gt-blocks-pro' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background Color', 'gt-blocks-pro' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color', 'gt-blocks-pro' ),
							},
						] }
					>

						<ContrastChecker
							{ ...{
								textColor: textColor.color,
								backgroundColor: backgroundColor.color,
								fallbackTextColor,
								fallbackBackgroundColor,
							} }
						/>
					</PanelColorSettings>

					<PanelBody title={ __( 'Background Image', 'gt-blocks-pro' ) } initialOpen={ false } className="gt-background-image-panel gt-panel">

						<div className="gt-background-image">

							{ ! backgroundImageId ? (

								<MediaUpload
									title={ __( 'Set background image', 'gt-blocks-pro' ) }
									onSelect={ this.onSelectImage }
									type="image"
									render={ ( { open } ) => (
										<Button onClick={ open } className="gt-set-image">
											{ __( 'Set background image', 'gt-blocks-pro' ) }
										</Button>
									) }
								/>

							) : (

								<Fragment>

									<MediaUpload
										title={ __( 'Set background image', 'gt-blocks-pro' ) }
										onSelect={ this.onSelectImage }
										type="image"
										value={ backgroundImageId }
										render={ ( { open } ) => (
											<Button onClick={ open } className="gt-image-button">
												<img
													src={ backgroundImageUrl }
													alt={ __( 'Background image', 'gt-blocks-pro' ) }
												/>
											</Button>
										) }
									/>

									<div className="gt-image-controls">

										<MediaUpload
											title={ __( 'Set background image', 'gt-blocks-pro' ) }
											onSelect={ this.onSelectImage }
											type="image"
											value={ backgroundImageId }
											render={ ( { open } ) => (
												<Button onClick={ open } isDefault isLarge className="gt-replace-image">
													{ __( 'Replace image', 'gt-blocks-pro' ) }
												</Button>
											) }
										/>

										<Button onClick={ this.onRemoveImage } isLink isDestructive>
											{ __( 'Remove image', 'gt-blocks-pro' ) }
										</Button>

									</div>

								</Fragment>

							) }

						</div>

						{ backgroundImageId && (

							<Fragment>

								<RangeControl
									label={ __( 'Image Opacity', 'gt-blocks-pro' ) }
									value={ imageOpacity }
									onChange={ ( newOpacity ) => setAttributes( { imageOpacity: newOpacity } ) }
									min={ 0 }
									max={ 100 }
								/>

								<SelectControl
									label={ __( 'Background Position', 'gt-blocks-pro' ) }
									value={ backgroundPosition }
									onChange={ ( newPosition ) => setAttributes( { backgroundPosition: newPosition } ) }
									options={ [
										{ value: 'left top', label: __( 'Left Top', 'gt-blocks-pro' ) },
										{ value: 'left center', label: __( 'Left Center', 'gt-blocks-pro' ) },
										{ value: 'left bottom', label: __( 'Left Bottom', 'gt-blocks-pro' ) },
										{ value: 'center top', label: __( 'Center Top', 'gt-blocks-pro' ) },
										{ value: 'center center', label: __( 'Center Center', 'gt-blocks-pro' ) },
										{ value: 'center bottom', label: __( 'Center Bottom', 'gt-blocks-pro' ) },
										{ value: 'right top', label: __( 'Right Top', 'gt-blocks-pro' ) },
										{ value: 'right center', label: __( 'Right Center', 'gt-blocks-pro' ) },
										{ value: 'right bottom', label: __( 'Right Bottom', 'gt-blocks-pro' ) },
									] }
								/>

								<ToggleControl
									label={ __( 'Fixed Background', 'gt-blocks-pro' ) }
									checked={ !! fixedBackground }
									onChange={ () => setAttributes( { fixedBackground: ! fixedBackground } ) }
								/>

							</Fragment>

						) }

					</PanelBody>

				</InspectorControls>

				<div id={ blockId } className={ blockClasses } style={ blockStyles } data-background-image={ dataBackgroundImage }>

					{ backgroundImageId && (
						<div className={ overlayClasses } style={ overlayStyles }></div>
					) }

					<div className={ contentClasses }>

						{ children }

						{ showInserter && (
							<Inserter rootClientId={ clientId } isAppender />
						) }

					</div>

				</div>

			</Fragment>
		);
	}
}

export default compose(
	withInstanceId,
	withSelect(
		( select ) => ( {
			wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
		} )
	),
	withColors( 'backgroundColor', { textColor: 'color' } ),
	withFallbackStyles( ( node, ownProps ) => {
		const { textColor, backgroundColor } = ownProps.attributes;
		const editableNode = node.querySelector( '[contenteditable="true"]' );
		//verify if editableNode is available, before using getComputedStyle.
		const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
		return {
			fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
			fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		};
	} ),
)( BackgroundEdit );
