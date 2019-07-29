<?php
/**
 * GT Blocks Pro Settings Page
 *
 * @package GT Blocks Pro
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * GT Blocks Pro Settings Page Class
 */
class GT_Blocks_Pro_Settings_Page {
	/**
	 * Setup the Settings Page class
	 *
	 * @return void
	 */
	static function setup() {

		// Add settings page to WordPress.
		add_action( 'admin_menu', array( __CLASS__, 'add_settings_page' ) );

		// Enqueue Settings CSS.
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'settings_page_css' ) );
	}

	/**
	 * Add Settings Page to Admin menu
	 *
	 * @return void
	 */
	static function add_settings_page() {
		add_options_page(
			esc_html__( 'GT Blocks Pro', 'gt-blocks-pro' ),
			esc_html__( 'GT Blocks Pro', 'gt-blocks-pro' ),
			'manage_options',
			'gt-blocks-pro',
			array( __CLASS__, 'display_settings_page' )
		);
	}

	/**
	 * Display settings page
	 *
	 * @return void
	 */
	static function display_settings_page() {
		ob_start();
		?>

		<div id="gt-blocks-pro-settings" class="gt-blocks-pro-settings wrap">

			<h1><?php esc_html_e( 'GT Blocks Pro', 'gt-blocks-pro' ); ?></h1>

			<form class="gt-blocks-pro-settings-form" method="post" action="options.php">
				<?php
					settings_fields( 'gt_blocks_pro_settings' );
					do_settings_sections( 'gt_blocks_pro_settings' );
					submit_button();
				?>
			</form>

		</div>

		<?php
		echo ob_get_clean();
	}

	/**
	 * Enqueues CSS for Settings page
	 *
	 * @param String $hook Slug of settings page.
	 * @return void
	 */
	static function settings_page_css( $hook ) {

		// Load styles and scripts only on theme info page.
		if ( 'settings_page_gt-blocks-pro' != $hook ) {
			return;
		}

		// Embed theme info css style.
		wp_enqueue_style( 'gt-blocks-pro-settings', GT_BLOCKS_PRO_PLUGIN_URL . 'assets/css/settings.css', array(), GT_BLOCKS_PRO_VERSION );
	}
}

// Run Settings Page Class.
GT_Blocks_Pro_Settings_Page::setup();
