<?php
/*
Plugin Name: Winden Assistant
Description: Load specific scripts for admin users on the front end.
Version: 1.0
Author: Your Name
*/

require_once 'inc/ScriptLoader.php';
require_once 'inc/AdminMenu.php';

class WindenAssistant
{
  private $scriptLoader;
  private $adminMenu;

  public function __construct()
  {
    $this->scriptLoader = new ScriptLoader();
    $this->adminMenu = new AdminMenu();

    add_action('wp_enqueue_scripts', array($this->scriptLoader, 'enqueueScript'));
    add_action('wp_footer', array($this->scriptLoader, 'getTwConfigFromFile'));
    add_action('admin_menu', array($this->adminMenu, 'addAdminMenu'));
  }
}

// Initialize the plugin
new WindenAssistant();
