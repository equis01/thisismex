document.addEventListener('DOMContentLoaded', function() {
  var current = null;
  
  document.querySelector('#submit').addEventListener('click', function(e) {
  e.preventDefault();
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  // Hacer una solicitud POST al script de Google Apps Script
  var url = 'https://script.google.com/macros/s/AKfycbxOlTBr5B57ehzwa0c3Ju2j98LnOv8XjXuo-HX5imTl3QSZzHSMhzqPUDm6duQGHF8/exec';
  var formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  fetch(url, {
  method: 'POST',
  body: formData
  })
  .then(response => response.text())
  .then(result => {
  if (result !== 'null') {
  // Redirigir a la URL obtenida del servidor
  window.location.href = result;
  } else {
  alert('Nombre de usuario o contraseña incorrectos');
  }
  })
  .catch(error => {
  console.error('Error:', error);
  });
  });
  
  document.querySelector('#username').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
  targets: 'path',
  strokeDashoffset: {
  value: 0,
  duration: 700,
  easing: 'easeOutQuart'
  },
  strokeDasharray: {
  value: '240 1386',
  duration: 700,
  easing: 'easeOutQuart'
  }
  });
  });
  
  document.querySelector('#password').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
  targets: 'path',
  strokeDashoffset: {
  value: -336,
  duration: 700,
  easing: 'easeOutQuart'
  },
  strokeDasharray: {
  value: '240 1386',
  duration: 700,
  easing: 'easeOutQuart'
  }
  });
  });
  
  document.querySelector('#submit').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
  targets: 'path',
  strokeDashoffset: {
  value: -730,
  duration: 700,
  easing: 'easeOutQuart'
  },
  strokeDasharray: {
  value: '530 1386',
  duration: 700,
  easing: 'easeOutQuart'
  }
  });
  });
  });
