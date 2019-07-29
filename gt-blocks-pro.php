<?php
/*
Plugin Name: GT Blocks Pro
Plugin URI: https://germanthemes.de/en/blocks/
Description: Mit unseren flexiblen und innovativen Blocks für den neuen WordPress Editor erstellst du komplexe Layouts für deine Business-Website in wenigen Minuten.
Author: GermanThemes
Author URI: https://germanthemes.de/
Version: 1.0
Text Domain: gt-blocks-pro
Domain Path: /languages/
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

GT Blocks Pro
Copyright(C) 2019, germanthemes.de - support@germanthemes.de
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main GT_Blocks_Pro Class
 *
 * @package GT Blocks Pro
 */
class GT_Blocks_Pro {

	/**
	 * Call all Functions to setup the Plugin
	 *
	 * @uses GT_Blocks_Pro::constants() Setup the constants needed
	 * @uses GT_Blocks_Pro::includes() Include the required files
	 * @uses GT_Blocks_Pro::setup_actions() Setup the hooks and actions
	 * @return void
	 */
	static function setup() {

		// Setup Constants.
		self::constants();

		// Setup Translation.
		add_action( 'init', array( __CLASS__, 'translation' ) );

		// Include Files.
		self::includes();

		// Setup Action Hooks.
		self::setup_actions();
	}

	/**
	 * Setup plugin constants
	 *
	 * @return void
	 */
	static function constants() {

		// Define Version Number.
		define( 'GT_BLOCKS_PRO_VERSION', '1.0' );

		// Plugin Folder Path.
		define( 'GT_BLOCKS_PRO_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

		// Plugin Folder URL.
		define( 'GT_BLOCKS_PRO_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

		// Plugin Root File.
		define( 'GT_BLOCKS_PRO_PLUGIN_FILE', __FILE__ );

		// Define Product ID.
		define( 'GT_BLOCKS_PRO_PRODUCT_ID', 338 );

		// Define Update API URL.
		define( 'GT_BLOCKS_PRO_STORE_API_URL', 'https://germanthemes.de' );
	}

	/**
	 * Load Translation File
	 *
	 * @return void
	 */
	static function translation() {
		load_plugin_textdomain( 'gt-blocks-pro', false, dirname( plugin_basename( GT_BLOCKS_PRO_PLUGIN_FILE ) ) . '/languages/php/' );
	}

	/**
	 * Include required files
	 *
	 * @return void
	 */
	static function includes() {

		// Include Plugin Updater.
		require_once GT_BLOCKS_PRO_PLUGIN_DIR . '/includes/class-gt-blocks-pro-plugin-updater.php';

		// Include Plugin Settings.
		require_once GT_BLOCKS_PRO_PLUGIN_DIR . '/includes/class-gt-blocks-pro-settings.php';
		require_once GT_BLOCKS_PRO_PLUGIN_DIR . '/includes/class-gt-blocks-pro-settings-page.php';
	}

	/**
	 * Setup Action Hooks
	 *
	 * @see https://codex.wordpress.org/Function_Reference/add_action WordPress Codex
	 * @return void
	 */
	static function setup_actions() {

		// Enqueue Block Styles.
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueue_block_scripts' ) );

		// Enqueue Block Scripts and Styles for Gutenberg Editor.
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueue_block_editor_scripts' ) );

		// Add custom image sizes.
		add_action( 'after_setup_theme', array( __CLASS__, 'add_image_sizes' ) );

		// Add block category.
		add_filter( 'block_categories', array( __CLASS__, 'block_categories' ), 10, 2 );

		// Add License Key admin notice.
		add_action( 'admin_notices', array( __CLASS__, 'license_key_admin_notice' ) );

		// Add plugin updater.
		add_action( 'admin_init', array( __CLASS__, 'plugin_updater' ), 0 );
	}

	/**
	 * Enqueue Block Styles
	 *
	 * Used in Frontend and Backend
	 *
	 * @return void
	 */
	static function enqueue_block_scripts() {
		wp_enqueue_style( 'gt-blocks-pro', GT_BLOCKS_PRO_PLUGIN_URL . 'assets/css/gt-blocks-pro.css', array(), GT_BLOCKS_PRO_VERSION );
	}

	/**
	 * Enqueue Scripts and Styles for Blocks
	 *
	 * Used in Backend in Gutenberg Editor only
	 *
	 * @return void
	 */
	static function enqueue_block_editor_scripts() {
		// Enqueue GT Blocks Pro in Gutenberg.
		wp_enqueue_script( 'gt-blocks-pro-editor', GT_BLOCKS_PRO_PLUGIN_URL . 'assets/js/gt-blocks-pro-editor.js', array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-components',
			'wp-editor',
			'lodash',
		), GT_BLOCKS_PRO_VERSION );

		// Transfer Data from PHP to GT Blocks Pro Redux Store.
		wp_add_inline_script( 'gt-blocks-pro-editor', self::get_dispatch_data(), 'after' );

		// Load javascript translation files.
		wp_set_script_translations( 'gt-blocks-pro-editor', 'gt-blocks-pro', GT_BLOCKS_PRO_PLUGIN_DIR . 'languages/js' );

		// Enqueue Editor Stylesheet for GT Blocks Pro.
		wp_enqueue_style( 'gt-blocks-pro-editor', GT_BLOCKS_PRO_PLUGIN_URL . 'assets/css/gt-blocks-pro-editor.css', array( 'wp-edit-blocks', 'gt-blocks-pro' ), GT_BLOCKS_PRO_VERSION );
	}

	/**
	 * Generate Code to dispatch data from PHP to Redux store.
	 *
	 * @return $script Data Dispatch code.
	 */
	static function get_dispatch_data() {
		$script = '';

		// Add Plugin URL.
		$script .= sprintf( 'wp.data.dispatch( "gt-blocks-pro-store" ).setPluginURL( %s );', wp_json_encode( GT_BLOCKS_PRO_PLUGIN_URL ) );

		return $script;
	}

	/**
	 * Define custom image sizes
	 *
	 * @return void
	 */
	static function add_image_sizes() {
		// Get Plugin Settings.
		$instance = GT_Blocks_Pro_Settings::instance();
		$options  = $instance->get_all();

		if ( true === $options['image_sizes']['square'] ) {
			add_image_size( 'GT-square-640-x-640', 640, 640, true );
		}

		if ( true === $options['image_sizes']['rectangular'] ) {
			add_image_size( 'GT-rectangular-640-x-480', 640, 480, true );
		}

		if ( true === $options['image_sizes']['landscape'] ) {
			add_image_size( 'GT-landscape-640-x-360', 640, 360, true );
		}

		if ( true === $options['image_sizes']['portrait'] ) {
			add_image_size( 'GT-portrait-480-x-640', 480, 640, true );
		}
	}

	/**
	 * Define custom image sizes
	 *
	 * @return void
	 */
	static function block_categories( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'gt-blocks-pro',
					'title' => __( 'GT Blocks Pro', 'gt-blocks-pro' ),
				),
			)
		);
	}

	/**
	 * Add license key admin notice
	 *
	 * @return void
	 */
	static function license_key_admin_notice() {
		global $pagenow;

		// Display only on Plugins and Updates page.
		if ( ! ( 'plugins.php' == $pagenow or 'update-core.php' == $pagenow ) ) {
			return;
		}

		// Get Settings.
		$options = GT_Blocks_Pro_Settings::instance();

		if ( 'valid' !== $options->get( 'license_status' ) ) :
			?>

			<div class="updated">
				<p>
					<?php
					printf( __( 'Please activate your license key for GT Blocks Pro in order to receive updates and support. <a href="%s">Activate License</a>', 'gt-blocks-pro' ),
						admin_url( 'options-general.php?page=gt-blocks-pro' )
					);
					?>
				</p>
			</div>

			<?php
		endif;
	}

	/**
	 * Plugin Updater
	 *
	 * @return void
	 */
	static function plugin_updater() {

		if ( ! is_admin() ) :
			return;
		endif;

		$options = GT_Blocks_Pro_Settings::instance();

		if ( 'valid' === $options->get( 'license_status' ) ) :

			// setup the updater
			$tzss_updater = new GT_Blocks_Pro_Plugin_Updater( GT_BLOCKS_PRO_STORE_API_URL, __FILE__, array(
				'version' => GT_BLOCKS_PRO_VERSION,
				'license' => trim( $options->get( 'license_key' ) ),
				'item_id' => GT_BLOCKS_PRO_PRODUCT_ID,
			) );

		endif;
	}
}

// Run Plugin.
GT_Blocks_Pro::setup();
