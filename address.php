<?php while (have_rows('address', 'options')) : the_row();
  $address_query = str_replace(' ', '+', get_sub_field('street')) . '+' . str_replace(' ', '+', get_sub_field('city')) . '+' . str_replace(' ', '+', get_sub_field('state')) . '+' . get_sub_field('zip'); ?>
  <address><a href="http://maps.google.com/maps?q=<?php echo $address_query;?>" target="_blank">
    <span class="street"><?php the_sub_field('street');?></span><br />
    <span class="street-2"><?php the_sub_field('street_2'); ?></span><br />
    <span class="city"><?php the_sub_field('city');?></span>, <span class="state"><?php the_sub_field('state');?></span> <span class="zip"><?php the_sub_field('zip');?></span>
  </a></address>
<?php endwhile; // have rows ?>