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
                $arrContextOptions = array(
                    "ssl" => array(
                        "verify_peer" => false,
                        "verify_peer_name" => false,
                    ),
                );

                $winden_classes = array();
                $upload_dir = wp_upload_dir();
                $last_modified_file = $this->find_last_modified_file($upload_dir['basedir'] . '/winden/tasks');
                if($last_modified_file != null){
                    if (file_exists($last_modified_file)) {
                        $winden_classes = json_decode(file_get_contents($last_modified_file, false, stream_context_create($arrContextOptions)));
                        if ($winden_classes == null || empty($winden_classes)) {
                            $winden_classes = array();
                        }
                    } else {
                        $winden_classes = array();
                    }
                    $winden_classes = json_encode($winden_classes);
                    wp_localize_script('winden-assistant-script', 'assistant_suggestions', array(
                        'winden_classes' => $winden_classes,
                    ));
                }
            }
        });

        add_action("admin_head-{$this->pageHook}", array($this, 'inlineCss'));
    }

    public function find_last_modified_file(string $dir): ?string {
        if (!is_dir($dir)) throw new \ValueError('Expecting a valid directory!');

        $latest = null;
        $latestTime = 0;
        foreach (scandir($dir) as $path) if (!in_array($path, ['.', '..'], true)) {
            $filename = $dir . DIRECTORY_SEPARATOR . $path;

            if (is_dir($filename)) {
                $directoryLastModifiedFile = $this->find_last_modified_file($filename);

                if (null === $directoryLastModifiedFile) {
                    continue;
                } else {
                    $filename = $directoryLastModifiedFile;
                }
            }
            if(strpos($filename, '.json') === false) continue;
            $lastModified = filemtime($filename);
            if ($lastModified > $latestTime) {
                $latestTime = $lastModified;
                $latest = $filename;
            }
        }

        return $latest;
    }

    public function inlineCss()
    {
        echo '<style>
            body { background-color: #e5e7eb; }
            body { background-color: rgb(30, 30, 30); }
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
