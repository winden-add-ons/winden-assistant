<?php

require_once 'inc/ScriptLoader.php';
require_once 'inc/AdminMenu.php';
require_once 'inc/TailwindConfigLoader.php'; // Ensure this file is included

class WindenAssistant
{
    private $scriptLoader;
    private $adminMenu;
    private $tailwindConfigLoader;

    public function __construct()
    {
        $this->scriptLoader = new ScriptLoader();
        $this->adminMenu = new AdminMenu();
        $this->tailwindConfigLoader = new TailwindConfigLoader();

        add_action('wp_enqueue_scripts', array($this->scriptLoader, 'enqueueScript'));
        add_action('wp_footer', array($this->tailwindConfigLoader, 'getTwConfigFromFile'));
        add_action('admin_footer', array($this->tailwindConfigLoader, 'getTwConfigFromFile'));
        add_action('admin_menu', array($this->adminMenu, 'addAdminMenu'));
    }
}

// Initialize the plugin
new WindenAssistant();