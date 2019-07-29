/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

/**
 * Internal dependencies
 */
import { default as GridEdit } from '../../components/grid-container/edit';

// Define blocks for each column.
const TEMPLATE = [
	[ 'gt-blocks-pro/icon', {} ],
	[ 'gt-blocks-pro/heading', {
		placeholder: __( 'Feature', 'gt-blocks-pro' ),
	} ],
	[ 'core/paragraph', {
		placeholder: __( 'Write feature description...', 'gt-blocks-pro' ),
	} ],
];

/**
 * Block Edit Component
 */
class FeaturesEdit extends Component {
	render() {
		return (
			<GridEdit
				template={ TEMPLATE }
				{ ...this.props }
			/>
		);
	}
}

export default FeaturesEdit;
