<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit181380d2287536179be01384079c9387
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit181380d2287536179be01384079c9387::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit181380d2287536179be01384079c9387::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
