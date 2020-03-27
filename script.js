$(function(){
  const $ringImages = $('.ring-images');
  const $filterCheckboxes = $('input[type="checkbox"]'); 
  const selectedFilters = {};
  const dataFilters = {}

  $.ajax({
    type: 'GET',
    url: 'https://quiet-reef-23667.herokuapp.com/rings',
    success: function(rings) {
      $.each(rings, function(i, ring){
        $ringImages.append(`
        <li class="ring-image" data-id="${ring.title}" data-category="${ring.gender} ${ring.material} ${ring.stone}">
          <img src=${ring.img}>
          ${ring.title}
        </li>
        `) 
      })
    },
    error: function(){
      console.log('error loading images')
    }
  });


  $filterCheckboxes.on('change', function(e) {
    $filterCheckboxes.filter(':checked').each(function() {
      if (!selectedFilters.hasOwnProperty(this.name)) {
        selectedFilters[this.name] = [];
      }
      selectedFilters[this.name].push(this.value);
      dataFilters[this.name] = this.value; 
      
    });
    $.ajax({
      type: 'GET',
      url: `https://quiet-reef-23667.herokuapp.com/rings?`,
      data: dataFilters,
      success: function() {
        let $filteredResults = $('.ring-image');
        $.each(selectedFilters, function(i, filterValues) {
          $filteredResults = $filteredResults.filter(function() {
            let matched = false,
              currentFilterValues = $(this).data('category').split(' ');
            $.each(currentFilterValues, function(i, currentFilterValue) {
              if ($.inArray(currentFilterValue, filterValues) !== -1) {
                matched = true;
              }
            });
            return matched;
          });
        });
        $('.ring-image').hide().filter($filteredResults).show();
      },
      error: function(){
        console.log('error loading images')
      }
    });
  });
})