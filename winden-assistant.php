<?php
/*
Plugin Name: Winden Assistant
Description: Load specific scripts for admin users on the front end.
Version: 1.0
Author: Your Name
*/


function parse_tailwind_config($content)
{
  $screens = [];

  // Regular expression to match the screens object both directly and inside 'extend'.
  $pattern = '/screens:\s*\{\s*(.*?)\s*\}(,|})/s';

  // Match all instances of 'screens' object.
  if (preg_match_all($pattern, $content, $matches, PREG_SET_ORDER)) {
    foreach ($matches as $match) {
      // Match individual screen sizes within each 'screens' object.
      $screenPattern = '/(\w+):\s*"([^\"]+)"/';

      if (preg_match_all($screenPattern, $match[1], $screenMatches)) {
        foreach ($screenMatches[1] as $index => $name) {
          $screens[$name] = $screenMatches[2][$index];
        }
      }
    }
  }

  return $screens;
}



// get tw config from file
add_action('wp_footer', 'get_tw_config_from_file');
add_action('admin_footer', 'get_tw_config_from_file');

function get_tw_config_from_file()
{
  $configPath = plugin_dir_path(__FILE__) . 'data/tailwind.config.js';

  // Check if the file exists
  if (file_exists($configPath)) {
    $configContent = file_get_contents($configPath);
  } else {
    // File does not exist, load content from database
    $option_name = 'winden_editor';
    $option_value = get_option($option_name);

    if (is_array($option_value) && count($option_value) > 0) {
      $configContent = isset($option_value[1]['content']) ? $option_value[1]['content'] : 'No content available';
    } else {
      echo 'No config content available in the database.';
      return;
    }
  }

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

  $jsContent .= 'console.log("get_tw_config_from_file loaded");';
  $jsContent .= '</script>';

  // Output the JavaScript variable content.
  echo $jsContent;
}





function winden_assistant_enqueue_script()
{
  // Check if the current user is an administrator
  if (current_user_can('administrator')) {
    // Define the base URL for the plugin's scripts and styles
    $plugin_base_url = plugin_dir_url(__FILE__);

    // Array of script names and their paths relative to the plugin base URL
    $scripts = array(
      'winden-assistant-script' => 'dist/assistant.min.js',
      'test' => 'test.js'
    );

    // Iterate over each script and enqueue it
    foreach ($scripts as $handle => $path) {
      wp_enqueue_script($handle, $plugin_base_url . $path, array(), '1.0', true);
    }

    // Array of style names and their paths relative to the plugin base URL
    $styles = array(
      'winden-assistant-style' => 'dist/winden-assistant.css',
      // Add more styles here if needed
    );

    // Iterate over each style and enqueue it
    foreach ($styles as $handle => $path) {
      wp_enqueue_style($handle, $plugin_base_url . $path, array(), '1.0', 'all');
    }
  }
}

add_action('wp_enqueue_scripts', 'winden_assistant_enqueue_script');



// Global variable to store the page hook
global $winden_assistant_page_hook;

// Add the admin menu item
function winden_assistant_add_admin_menu()
{
  global $winden_assistant_page_hook;

  $winden_assistant_page_hook = add_menu_page(
    'Winden Assistant',     // Page title
    'Winden Assistant',     // Menu title
    'manage_options',       // Capability
    'winden-assistant',     // Menu slug
    'winden_assistant_page', // Callback function
    'dashicons-admin-site', // Icon
    6                       // Position
  );

  // Use the registered $page_hook to enqueue your CSS file
  add_action('admin_enqueue_scripts', function ($hook) use ($winden_assistant_page_hook) {
    if ($hook == $winden_assistant_page_hook) {
      // Enqueue CSS file
      wp_enqueue_style('winden-assistant-css', plugins_url('winden-assistant-admin.css', __FILE__));

      // Enqueue JavaScript file
      wp_enqueue_script('text-admin-js', plugins_url('test-admin.js', __FILE__), array('jquery'), null, true);
    }
  });

  // Hook the inline CSS function to the admin head
  add_action("admin_head-$winden_assistant_page_hook", 'winden_assistant_inline_css');
}

add_action('admin_menu', 'winden_assistant_add_admin_menu');

// Function to add inline CSS
function winden_assistant_inline_css()
{
?>
  <style>
    body {
      background-color: #e5e7eb;
    }

    #adminmenumain,
    #wpadminbar {
      display: none !important;
    }

    .winden-assistant {
      width: 100%;
      height: 100% !important;
      padding: 0;
      margin: 0;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000000;
      display: flex;
    }

    #winden-assistant-iframe {
      width: 100%;
      height: 100% !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    .wrap.winden-assistant body {
      border: 50px solid red;
    }
  </style>
<?php
}

// Callback function for the admin page
function winden_assistant_page()
{
  // Get the site URL
  $site_url = site_url();

?>
  <div class="wrap winden-assistant">
    <iframe id="winden-assistant-iframe" src="<?php echo esc_url($site_url); ?>" style="width:100%; height:600px;"></iframe>
    <script>
      window.addEventListener('message', function(event) {
        document.getElementById('winden-assistant-iframe').style.width = event.data;
      });
    </script>
  </div>
<?php
}
