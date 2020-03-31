$(function () {
  const $ringImages = $('.ring-images');
  const $filterCheckboxes = $('input[type="checkbox"]');
  const $filterLinks = $('.ring-price');
  let selectedFilters = {};
  const urlParams = new URLSearchParams(window.location.search);
  const urlParamsString = urlParams.toString();

  var checkboxInputs = document.querySelectorAll('input');
  urlParams.forEach(function (value, name) {
    checkboxInputs.forEach(function (item) {
      if (item.value === value) {
        item.setAttribute('checked', true);
      }
    })
  })

  $.ajax({
    type: 'GET',
    url: 'https://quiet-reef-23667.herokuapp.com/rings',
    data: urlParamsString,
    success: function (rings) {
      $.each(rings, function (i, ring) {
        $ringImages.append(`
        <li class="ring-image" data-id="${ring.title}" data-category="${ring.gender} ${ring.material} ${ring.stone} ${ring.price}">
          <img src=${ring.img}>
          ${ring.title}
        </li>
        `)
      })
    },
    error: function () {
      console.log('error loading images')
    }
  });

  $($filterCheckboxes, $filterLinks).on('change', function (e) {
    selectedFilters = {};
    $filterCheckboxes.filter(':checked').each(function (index, checkValue) {
      if (!selectedFilters.hasOwnProperty(this.name)) {
        selectedFilters[this.name] = [];
      }
      selectedFilters[this.name].push(checkValue.value);
    })
    getNewItems(selectedFilters)
  });

  function getNewItems(dataFilters) {
    let data = dataFilters

    $.ajax({
      type: 'GET',
      url: `https://quiet-reef-23667.herokuapp.com/rings?`,
      data: data,
      success: function () {
        let url = this.url;
        let newUrl = url.substring(url.lastIndexOf("?"));
        window.location.hash = newUrl
        window.history.pushState({}, null, newUrl)
        let $filteredResults = $('.ring-image');
        $.each(selectedFilters, function (i, filterValues) {
          $filteredResults = $filteredResults.filter(function () {
            let matched = false,
              currentFilterValues = $(this).data('category').split(' ');
            $.each(currentFilterValues, function (i, currentFilterValue) {
              if ($.inArray(currentFilterValue, filterValues) !== -1) {
                matched = true;
              }
            });
            return matched;
          });
        });
        $('.ring-image').hide().filter($filteredResults).show();
      },
      error: function () {
        console.log('error loading images')
      }
    });
  }
})

