<?php
/*
Plugin Name: Winden Assistant
Description: Load specific scripts for admin users on the front end.
Version: 1.0
Author: Your Name
*/


// Load all INC Files 

function load_dp_blocks_inc_files()
{
    $dirPath = __DIR__ . '/inc/';
    $files = scandir($dirPath);
    foreach ($files as $file) {
        $filePath = $dirPath . $file; // Removed the extra '/' since it's already in $dirPath
        if (is_file($filePath) && pathinfo($filePath, PATHINFO_EXTENSION) === 'php') {
            require_once($filePath);
        }
    }
}

add_action('init', 'load_dp_blocks_inc_files');




// get tw config from file
add_action('wp_footer', 'get_tw_config_from_file');

function get_tw_config_from_file()
{
    $configPath = plugin_dir_path(__FILE__) . 'data/tailwind.config.js';
    $configContent = file_get_contents($configPath);

    // Parse the Tailwind config file.
    // Note: You might need to write a custom parser or use an existing library, as this file is in JavaScript format.
    $screens = parse_tailwind_config($configContent);

    if (empty($screens)) {
        echo 'No screen values found or unable to parse the config file.';
        return;
    }

    $jsContent = '<script>';
    $jsContent .= 'var tailwindScreens = [];'; // Define a JavaScript array variable.

    foreach ($screens as $name => $size) {
        // Append the data to the JavaScript variable.
        $jsContent .= "tailwindScreens.push({ name: '{$name}', size: '{$size}' });";
    }

    $jsContent .= '</script>';

    // Output the JavaScript variable content.
    echo $jsContent;
}


// Add the admin menu item
function winden_assistant_add_admin_menu()
{
    add_menu_page(
        'Winden Assistant',     // Page title
        'Winden Assistant',     // Menu title
        'manage_options',       // Capability
        'winden-assistant',     // Menu slug
        'winden_assistant_page', // Callback function
        'dashicons-admin-site', // Icon
        6                       // Position
    );
}

add_action('admin_menu', 'winden_assistant_add_admin_menu');

// Callback function for the admin page
function winden_assistant_page()
{
    // Get the site URL
    $site_url = site_url();

?>
    <div class="wrap">
        <h2>Winden Assistant</h2>
        <iframe src="<?php echo esc_url($site_url); ?>" style="width:100%; height:600px;"></iframe>
    </div>
<?php
}
