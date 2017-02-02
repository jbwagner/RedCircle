<?php

// Clean up the <head>
function removeHeadLinks() {
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
}
add_action('init', 'removeHeadLinks');
remove_action('wp_head', 'wp_generator');

// Declare sidebar widget zone
if (function_exists('register_sidebar')) {
  register_sidebar(array(
    'name' => 'Homepage Widgets',
    'id'   => 'homepage-widgets',
    'description'   => 'These are widgets for the homepage.',
    'before_widget' => '<div id="%1$s" class="widget %2$s">',
    'after_widget'  => '</div>',
    'before_title'  => '<h3>',
    'after_title'   => '</h3>'
  ));
}
// Declare sidebar widget zone
if (function_exists('register_sidebar')) {
  register_sidebar(array(
    'name' => 'Inner Page Widgets',
    'id'   => 'inner-widgets',
    'description'   => 'These are widgets for the inner pages.',
    'before_widget' => '<div id="%1$s" class="widget %2$s">',
    'after_widget'  => '</div>',
    'before_title'  => '<h3>',
    'after_title'   => '</h3>'
  ));
}


// Register nav menus
if ( function_exists( 'register_nav_menus' ) ) {
  register_nav_menus(
    array(
      'header-menu' => 'Header Menu',
      'footer-menu' => 'Footer Menu'
    )
  );
}

// Custom Login Screen
// Change logo style
function custom_login() {
  echo '<link rel="stylesheet" type="text/css" href="'.get_bloginfo('template_directory').'/css/custom-login.css" />';
}
add_action('login_head', 'custom_login');
// Change logo url
function change_wp_login_url() {
  return get_site_url();
}
add_filter('login_headerurl', 'change_wp_login_url');
// Change logo title
function change_wp_login_title() {
  return 'Powered by ' . get_option('blogname');
}
add_filter('login_headertitle', 'change_wp_login_title');

// Add support for Featured Images
if ( function_exists( 'add_theme_support' ) ) {
  add_theme_support( 'post-thumbnails' );
  set_post_thumbnail_size( 250, 250, true ); // default Post Thumbnail dimensions (cropped)
}

// Excerpt length
function custom_excerpt_length( $length ) {
  return 22;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

// Enqueue Styles & Scripts
if(!is_admin()) {
  function load_styles_and_scripts() {

    wp_register_script( 'modernizr', get_template_directory_uri() . '/js/vendor/modernizr-2.8.3.min.js', false );
    wp_register_script( 'owl', get_template_directory_uri() . '/js/vendor/owl-carousel-2/owl.carousel.min.js', array('jquery'), '1.0', false );
    wp_register_script( 'main', get_template_directory_uri() . '/js/main.min.js', array('jquery'), '1.0', false );

    wp_enqueue_script( 'modernizr' );
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'owl' );
    wp_enqueue_script( 'main' );

    wp_enqueue_style('owlcss', get_template_directory_uri() . '/js/vendor/owl-carousel-2/assets/owl.carousel.css', false );
    wp_enqueue_style('gfont', 'http://fonts.googleapis.com/css?family=Raleway:400,600,700,900', false );
    wp_enqueue_style('mainstyle', get_template_directory_uri() . '/style.css', false, '1.0', 'screen');

  }
  add_action( 'wp_enqueue_scripts', 'load_styles_and_scripts' );
}

// Set up the phone number strings for the template
function do_phone() {
  global $phone;
  global $clean_phone;
  $phone = get_field('phone', 'options');
  $clean_phone = preg_replace('/[^0-9]/','',$phone); // Strip out any non-numeric characters to use in the phone link
}
add_action('wp_head', 'do_phone');

// Adds the [phone] shortcode to display the ACF phone the same everywhere
function phone_shortcode() {
  global $phone;
  global $clean_phone;
  ob_start();
  ?>
  <span><a href="tel:<?php echo $clean_phone;?>"><?php echo $phone;?></a></span>
  <?php
  return ob_get_clean();
}
add_shortcode('phone', 'phone_shortcode');

// Adds the [address] shortcode to display the ACF address the same everywhere
function address_shortcode() {
  ob_start();
  get_template_part('address');
  return ob_get_clean();
}
add_shortcode('address', 'address_shortcode');
