<?php

/**
 * Plugin Name: Winden Assistant
 * Plugin URI:  https://dplugins.com/
 * Description: Plugin crafted for dPlugins instalations and debuging
 * Author: DPlugins
 * Author URI: https://dplugins.com/
 * Version: 1.0.0
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

// get prefixes from the winden or set defaults
new TailwindScreensInjector();
// Initialize the plugin
new WindenAssistant();


