<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="lt-ie10 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="lt-ie10 lt-ie9 lt-ie8 ie7"> <![endif]-->
<!--[if IE 8]>         <html class="lt-ie10 lt-ie9 ie8"> <![endif]-->
<!--[if IE 9]>         <html class="lt-ie10 ie9"> <![endif]-->
<!--[if gt IE 9]><!--> <html> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">  
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, initial-scale=1" />
    <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <title><?php wp_title(); ?></title>
    
    <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri();?>/images/favicon.png" />
    <!-- Begin wp_head() -->
    <?php wp_head(); ?>
    <!-- end wp_head() -->
      
  </head>
  <body <?php body_class(); ?>>
  
    <?php wp_nav_menu( array( 'theme_location' => 'header-menu' ) ); ?>