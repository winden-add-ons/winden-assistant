<?php

require_once 'TailwindConfigParser.php';

class ScriptLoader
{
    public function enqueueScript()
    {
        if (current_user_can('administrator')) {
            $plugin_base_url = plugin_dir_url(dirname(__FILE__) . '/../../');

            $scripts = array(
                'winden-assistant-script' => 'dist/assistant.min.js',
                'test' => 'test.js'
            );

            foreach ($scripts as $handle => $path) {
                wp_enqueue_script($handle, $plugin_base_url . $path, array(), '1.0', true);
            }

            $styles = array(
                'winden-assistant-style' => 'dist/winden-assistant.css',
            );

            foreach ($styles as $handle => $path) {
                wp_enqueue_style($handle, $plugin_base_url . $path, array(), '1.0', 'all');
            }
        }
    }

    public function getTwConfigFromFile()
    {
        $configPath = plugin_dir_path(__FILE__) . '../data/tailwind.config.js';
        $configContent = file_get_contents($configPath);
        $screens = TailwindConfigParser::parse($configContent);

        if (empty($screens)) {
            echo 'No screen values found or unable to parse the config file.';
            return;
        }

        $jsContent = '<script>';
        $jsContent .= 'var tailwindScreens = [];';

        foreach ($screens as $name => $size) {
            $jsContent .= "tailwindScreens.push({ name: '{$name}', size: '{$size}' });";
        }

        $jsContent .= '</script>';
        echo $jsContent;
    }
}
