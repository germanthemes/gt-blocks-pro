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
	[ 'gt-blocks-pro/image', {} ],
	[ 'gt-blocks-pro/heading', {
		placeholder: __( 'Project', 'gt-blocks-pro' ),
	} ],
	[ 'core/paragraph', {
		placeholder: __( 'Write project description...', 'gt-blocks-pro' ),
	} ],
];

/**
 * Block Edit Component
 */
class PortfolioEdit extends Component {
	render() {
		return (
			<GridEdit
				template={ TEMPLATE }
				{ ...this.props }
			/>
		);
	}
}

export default PortfolioEdit;
