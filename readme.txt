Save this file to the wp-content folder
change themename at top of gulpfile to the name of the theme you are working with
in functions.php enqueue the minified stylesheet wp_enqueue_style( '*themename*-style-min', get_theme_file_uri() . '/sass/style.min.css');
and comment out the wp_enqueue_style( 'test-style', get_stylesheet_uri(), array(), _S_VERSION );
make sure you cd into the dev-gulp file and run gulp in the terminal to start
