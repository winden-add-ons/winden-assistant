<?php

/**
 * Plugin Name: Winden Assistant
 * Plugin URI:  https://dplugins.com/
 * Description: Plugin crafted for dPlugins instalations and debuging
 * Author: DPlugins
 * Author URI: https://dplugins.com/
 * Version: 0.1.1
 */

require_once 'inc/AdminMenu.php';
require_once 'inc/TailwindConfigLoader.php'; // Ensure this file is included
require_once 'inc/tailwindScreens.php'; // Ensure this file is included

class WindenAssistant
{
  private $adminMenu;
  private $tailwindConfigLoader;

  public function __construct()
  {
    $this->adminMenu = new AdminMenu();
    $this->tailwindConfigLoader = new TailwindConfigLoader();

    add_action('wp_footer', array($this->tailwindConfigLoader, 'getTwConfigFromFile'));
    add_action('admin_footer', array($this->tailwindConfigLoader, 'getTwConfigFromFile'));
    add_action('admin_menu', array($this->adminMenu, 'addAdminMenu'));
  }
}

new TailwindScreensInjector();
// Initialize the plugin
new WindenAssistant();


// // Fetch the option value
// $winden_editor_option = get_option('winden_editor');

// // Check if the option exists
// if (false !== $winden_editor_option) {
//   // Print the option value
//   echo '<pre>';
//   print_r($winden_editor_option);
//   echo '</pre>';
// } else {
//   echo 'Option not found or has no value.';
// }


// =================================================================
// =================================================================


