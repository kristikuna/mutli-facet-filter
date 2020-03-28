$(function () {
  const $ringImages = $('.ring-images');
  const $filterCheckboxes = $('input[type="checkbox"]');
  const $filterLinks = $('.ring-price');
  const selectedFilters = {};
  const dataFilters = {}
  const urlParams = new URLSearchParams(window.location.search);
  const urlParamsString = urlParams.toString();
  console.log($filterCheckboxes)



  // filter(':checked')
  $.ajax({
    type: 'GET',
    url: 'https://quiet-reef-23667.herokuapp.com/rings',
    data: urlParamsString,
    success: function (rings) {
      var input = document.querySelectorAll('input');
      $.each(rings, function (i, ring) {

        urlParams.forEach(function (value, name) {
          input.forEach(function (item) {
            if (item.value === value) {
              item.setAttribute('checked', true);

            }

          })

        })

        $ringImages.append(`
        <li class="ring-image" data-id="${ring.title}" data-category="${ring.gender} ${ring.material} ${ring.stoneType}">
          <img src=${ring.img}>
          ${ring.title}
        </li>
        `)
      })
      updateCheckboxes();
    },
    error: function () {
      console.log('error loading images')
    }
  });


  $($filterCheckboxes, $filterLinks).on('change', function (e) {
    updateCheckboxes()

  })

  function updateCheckboxes() {
    $filterCheckboxes.filter(':checked').each(function () {
      if (!selectedFilters.hasOwnProperty(this.name)) {
        selectedFilters[this.name] = [];
      }
      selectedFilters[this.name].push(this.value);

      dataFilters[this.name] = this.value;
      console.log('dataFilters', dataFilters)
      // getNewItems(dataFilters)
    });

  }
  // 



  function getNewItems(dataFilters) {
    // if (dataFilters[])

    $.ajax({
      type: 'GET',
      url: `https://quiet-reef-23667.herokuapp.com/rings?`,
      data: dataFilters,
      success: function () {
        let url = this.url;
        let newUrl = url.substring(url.lastIndexOf("?"));
        window.location.search = newUrl
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

          // for(let [key, value] of Object.entries(dataFilters)){
          //   let refinementCategory = key;
          //   let refinementValue = value;
          //   window.history.pushState({refinementCategory}, ' ', `${refinementCategory}=${refinementValue}`)
          // }
// $(function(){

// const $ringImages = $('.ring-images');
// const $filterCheckboxes = $('input[type="checkbox"]'); 

//   $.ajax({
//     type: 'GET',
//     url: 'https://quiet-reef-23667.herokuapp.com/rings',
//     success: function(rings) {
//       $.each(rings, function(i, ring){
//         $ringImages.append(`
//         <li class="ring-image" data-id="${ring.title}" data-category="${ring.gender} ${ring.material} ${ring.stoneType}">
//           <img src=${ring.img}>
//           ${ring.title}
//         </li>
//         `) 
//       })
//     },
//     error: function(){
//       console.log('error loading images')
//     }
//   });

//   $filterCheckboxes.on('change', function() {
//     const selectedFilters = {};
//     const dataFilters = {}
//     if($filterCheckboxes.is(':checked')){
//       $filterCheckboxes.filter(':checked').each(function() {
//         if (!selectedFilters.hasOwnProperty(this.name)) {
//           selectedFilters[this.name] = [];
//         }
//         selectedFilters[this.name].push(this.value);
//         dataFilters[this.name] = this.value; 

//         $.ajax({
//           type: 'GET',
//           data: dataFilters,
//           url: `https://quiet-reef-23667.herokuapp.com/rings?`,
//           success: function(rings) {
//             let $filteredResults = $('.ring-image');
//             for(let [key, value] of Object.entries(dataFilters)){
//               let refinementCategory = key;
//               let refinementValue = value;
//               console.log(dataFilters)
//               $.each(dataFilters, function(i){
//                 window.history.pushState({refinementCategory}, ' ', `${refinementCategory}=${refinementValue}`, )
//                 console.log(`History.state before pushState: ${history.state}`)
//               })
//             }

//             $.each(selectedFilters, function(i, filterValues) {
//               $filteredResults = $filteredResults.filter(function() {
//                 let matched = false,
//                   currentFilterValues = $(this).data('category').split(' ');
//                 $.each(currentFilterValues, function(i, currentFilterValue) {
//                   if ($.inArray(currentFilterValue, filterValues) !== -1) {
//                     matched = true;
//                   }
//                 });
//                 return matched;
//               });
//             });
//             $('.ring-image').hide().filter($filteredResults).show();
//           },
//           error: function(){
//             console.log('error loading images')
//           }
//         });
//     });
//     //end of if checked
//    } else {

//    }
//   })
// })