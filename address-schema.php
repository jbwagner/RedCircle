<?php while (have_rows('address', 'options')) : the_row();
  $address_query = str_replace(' ', '+', get_sub_field('street')) . '+' . str_replace(' ', '+', get_sub_field('city')) . '+' . str_replace(' ', '+', get_sub_field('state')) . '+' . get_sub_field('zip'); ?>
  <address itemprop="address"><a href="http://maps.google.com/maps?q=<?php echo $address_query;?>" target="_blank">
    <span class="street" itemprop="streetAddress"><?php the_sub_field('street');?></span><br/>
    <span class="city" itemprop="addressLocality"><?php the_sub_field('city');?></span>, <span class="state" itemprop="addressRegion"><?php the_sub_field('state');?></span> <span class="zip" itemprop="postalCode"><?php the_sub_field('zip');?></span>
  </a></address>
<?php endwhile; // have rows ?>