$(function(){

const $ringImages = $('.ring-images');
const $filterCheckboxes = $('input[type="checkbox"]');
const url = window.location.href;    

$.ajax({
  type: 'GET',
  url: 'https://quiet-reef-23667.herokuapp.com/rings',
  success: function(rings) {
    $.each(rings, function(i, ring){
      $ringImages.append(`
      <li class="ring-image" data-id="${ring.title}" data-category="${ring.gender} ${ring.material} ${ring.stoneType}">
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

$filterCheckboxes.on('change', function() {
  const selectedFilters = {};
  $filterCheckboxes.filter(':checked').each(function() {
    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }
    selectedFilters[this.name].push(this.value);
  });

  let $filteredResults = $('.ring-image');
    $.each(selectedFilters, function(i, filterValues) {
      $filteredResults = $filteredResults.filter(function() {
        let matched = false,
          currentFilterValues = $(this).data('category').split(' ');
        $.each(currentFilterValues, function(i, currentFilterValue) {
          if ($.inArray(currentFilterValue, filterValues) !== -1) {
            matched = true;
            // return false;
          }
        });
        return matched;
      });
    });
    console.log($filteredResults)
    $('.ring-image').hide().filter($filteredResults).show();
  });
})

//post user
// $('#add-user').on('click', function() {
//   console.log('clicked')
//   const user = {
//       name: $name.val()
//   };
//   $.ajax({
//     url: "https://reqres.in/api/users",
//     type: "POST",
//     data: user,
//     success: function(newUser){
//       $users.append(`<li>${newUser.name}</li>`)
//     },
//     error: function() {
//       alert('error saving order')
//     }
//   });
// });

//get single user
// $('#users').on('click', '#user-checkbox', function(user) {
//   if("input:focus"){
//     $.each(users.data, function(i, user){
//       $.ajax({
//         type: 'GET',
//         url: `https://reqres.in/api/users/${user.id}`,
//         success: function(users){
//           $.each(users.data, function(i, user){
//             $userAvatar.append(`<img src=${user.avatar} alt=${user.first_name}>`)
//           })
//         }
//       })

//     })
//   }
// });  



// $('.user-checkbox').change(function(){
//   const id = $(this).data('id');
//   let selectedArray = [];
//   const selectedUser = users[0].data.filter(function(user){
//     return user.id === id;
//   })
//   const element = $userAvatars.find(`img[data-id=${selectedUser[0].id}]`);
//   console.log(element)
//   if($(this).is(':checked')){
//     $('.avatar').not(element).addClass('hidden')
//     $email.html(selectedUser[0].email)
//   } else {
//     $('.avatar').removeClass('hidden')
//     $email.html('')
//   }
// })



// users.forEach(function(user){
//   user.data.map(function(u, i){
//     $users.append(`
//       <li>
//       <label>
//       <input type="checkbox" data-id=${u.id} class="user-checkbox">
//       ${u.first_name}
//       </label>
//       </li>`)
//     $userAvatars.append(`<img data-category=0
//      alt=${u.first_name} class="avatar" src=${u.avatar}></img>`)
//   })
// });

// $('.user-checkbox').change(function(){
//   const id = $(this).data('id');
//   let selectedArray = [];
//   const selectedUser = users[0].data.filter(function(user){
//     return user.id === id;
//   })
//   const element = $userAvatars.find(`img[data-id=${selectedUser[0].id}]`);
//   selectedArray.push(element);
//   let selectedId = $userAvatars.filter()
//   if($(this).is(':checked')){
//     $('.avatar').not(element).addClass('hidden')
//     $email.html(selectedUser[0].email)
//   } else {
//     $('.avatar').removeClass('hidden')
//     $email.html('')
//   }