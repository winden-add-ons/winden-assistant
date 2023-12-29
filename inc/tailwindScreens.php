<?php


class TailwindScreensInjector
{

    private $tailwindScreens = [];

    public function __construct()
    {
        add_action('init', array($this, 'init'));
    }

    public function init()
    {
        $this->tailwindScreens = $this->fetchTailwindScreens();
        $this->injectScripts();
    }

    private function fetchTailwindScreens()
    {
        $winden_editor_option = get_option('winden_editor');
        $screens = [];

        if (false !== $winden_editor_option) {
            foreach ($winden_editor_option as $item) {
                if ($item['name'] === 'tailwind.config.js') {
                    preg_match_all("/'(\w+)':\s*'(\d+px)'/", $item['content'], $matches, PREG_SET_ORDER);

                    foreach ($matches as $match) {
                        $screens[] = [
                            'name' => $match[1],
                            'size' => $match[2]
                        ];
                    }
                }
            }
        }

        return $screens;
    }

    private function injectScripts()
    {
        $printScript = function () {
            $screensJson = json_encode($this->tailwindScreens);
            echo "<script type='text/javascript'>
                    var tailwindScreens = $screensJson;
                    console.log(tailwindScreens);
                  </script>";
        };

        add_action('wp_head', $printScript);
        add_action('admin_head', $printScript);
    }
}


