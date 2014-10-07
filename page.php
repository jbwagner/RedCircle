<?php get_header(); ?>

    <section id="content">
    
      <div class="container">
      
        <div class="main-content">
            
          <?php if ( have_posts() ): while ( have_posts() ) : the_post(); ?>
            <article>
              <h1 class="page-title"><?php get_field('h1_title') ? the_field('h1_title') : the_title();?> </h1>
              <?php the_content(); ?>
            </article>
          <?php endwhile; // end loop ?>
          <?php endif; ?>
          
        </div><!-- end .main-content -->
        
        <?php get_sidebar(); ?>
        
      </div><!-- end .container -->
              
    </section><!-- end #content -->
          
<?php get_footer(); ?>