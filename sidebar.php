<aside id="main-sidebar">

<?php if (is_front_page()) {
  if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Homepage Widgets") ) :
  endif;
} else {
  if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Inner Widgets") ) :
  endif;
} ?>

</aside>