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
require_once 'inc/WindenAutocomplete.php'; // Ensure this file is included
require_once 'inc/TailwindScreens.php'; // Ensure this file is included

class WindenAssistant
{
  private $adminMenu;
  private $WindenAutocompleteLoad;

  public function __construct()
  {
    $this->adminMenu = new AdminMenu();
    $this->WindenAutocompleteLoad = new WindenAutocompleteLoad();

    add_action('wp_footer', array($this->WindenAutocompleteLoad, 'suggestions'));
    add_action('admin_footer', array($this->WindenAutocompleteLoad, 'suggestions'));
    add_action('admin_menu', array($this->adminMenu, 'addAdminMenu'));
  }
}

new TailwindScreensInjector();  // get prefixes from the winden or set defaults
new WindenAutocompleteLoad();   // Initialize Autocomplete
new WindenAssistant();          // Initialize the plugin


