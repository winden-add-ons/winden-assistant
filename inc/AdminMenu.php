<?php

class AdminMenu
{
    private $pageHook;

    public function addAdminMenu()
    {
        $this->pageHook = add_menu_page(
            'Winden Assistant',
            'Winden Assistant',
            'manage_options',
            'winden-assistant',
            array($this, 'adminPage'),
            'dashicons-admin-site',
            6
        );

        add_action('admin_enqueue_scripts', function ($hook) {
            if ($hook == $this->pageHook) {
                wp_enqueue_style('winden-assistant-css', plugins_url('../dist/winden-assistant.css', __FILE__));
                wp_enqueue_script('winden-assistant-script', plugins_url('../dist/assistant.min.js', __FILE__), array('jquery'), null, true);
                wp_enqueue_script('text-admin-js', plugins_url('../test-admin.js', __FILE__), array('jquery'), null, true);
            }
        });

        add_action("admin_head-{$this->pageHook}", array($this, 'inlineCss'));
    }

    public function inlineCss()
    {
        echo '<style>
            body { background-color: #e5e7eb; }
            body { background-color: black; }
            #adminmenumain, #wpadminbar, #wpfooter { display: none !important; }
            #winden-assistant-iframe { width: 100%; height: 100% !important; margin-left: auto !important; margin-right: auto !important; }
            .winden-assistant { width: 100%; height: 100% !important; padding: 0; margin: 0; position: fixed; top: 0; left: 0; z-index: 10; display: flex; }
            .wrap.winden-assistant body { border: 50px solid red; }

        </style>';
    }

    public function adminPage()
    {
        $site_url = site_url();
        echo '<div class="wrap winden-assistant">
            <iframe id="winden-assistant-iframe" src="' . esc_url($site_url) . '" style="width:100%; height:600px;"></iframe>
            <script>
                window.addEventListener("message", function(event) {
                    document.getElementById("winden-assistant-iframe").style.width = event.data;
                });
            </script>
        </div>';
    }
}
