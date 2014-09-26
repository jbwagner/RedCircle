<?php get_header(); ?>

    <section id="content">
    
      <div class="container">
      
        <div class="main-content">
            
          <?php if ( have_posts() ): while ( have_posts() ) : the_post(); ?>
            <article>
              <h2 class="page-title"><?php the_title();?> </h2>
              <?php the_content(); ?>
            </article>
          <?php endwhile; // end loop ?>
          <?php endif; ?>
          
        </div><!-- end .main-content -->
        
        <?php get_sidebar(); ?>
        
      </div><!-- end .container -->
              
    </section><!-- end #content -->
          
<?php get_footer(); ?>