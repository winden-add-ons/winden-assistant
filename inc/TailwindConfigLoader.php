<?php

class TailwindConfigLoader
{
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
    
    public function getTwConfigFromFile()
    {

        $arrContextOptions = array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
            ),
        );

        $winden_classes = array();
        $upload_dir = wp_upload_dir();
        if (file_exists($upload_dir['basedir'] . '/winden/tasks')) {
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
                echo '<script>var suggestions = '.$winden_classes.';</script>';
            }
        }
    }
}
