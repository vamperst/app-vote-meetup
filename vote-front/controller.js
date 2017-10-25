// url: "https://dcy4caf27c.execute-api.us-east-1.amazonaws.com/meetup/vote",

// $(document).ready(function(){
$('#red-button').click(function(){
  $.ajax({
    type: "POST",
    crossDomain: true,
    url: "https://4rlp7zhtl6.execute-api.us-east-1.amazonaws.com/prod/vote",
    data: '{"Body": "RED"}',
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
      console.log(responseData);
      console.log(textStatus);
       swal("Obrigado pela Votação!", "Você escolheu vermelho!", "success");
     },
     error: function (responseData, textStatus, errorThrown) {
      console.log(responseData);
      console.log(textStatus);
      swal("Obrigado pela Votação!", "Você escolheu vermelho!", "success");
      //alert('POST failed.');
     }
  });
});

$('#green-button').click(function(){
  $.ajax({
    type: "POST",
    crossDomain: true,
    url: "https://4rlp7zhtl6.execute-api.us-east-1.amazonaws.com/prod/vote",
    data: '{"Body": "GREEN"}',
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
      console.log(responseData);
      console.log(textStatus);
      swal("Obrigado pela Votação!", "Você escolheu verde!", "success");
     },
     error: function (responseData, textStatus, errorThrown) {
      console.log(responseData);
      console.log(textStatus);
      swal("Obrigado pela Votação!", "Você escolheu verde!", "success");
      //alert('POST failed.');
     }
   });
});

$('#blue-button').click(function(){
  $.ajax({
    type: "POST",
    crossDomain: true,
    url: "https://4rlp7zhtl6.execute-api.us-east-1.amazonaws.com/prod/vote",
    data: '{"Body": "BLUE"}',
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
      console.log(responseData);
      console.log(textStatus);
      swal("Obrigado pela Votação!", "Você escolheu azul!", "success");
     },
     error: function (responseData, textStatus, errorThrown) {
       console.log(responseData);
       console.log(textStatus);
       swal("Obrigado pela Votação!", "Você escolheu azul!", "success");
       //alert('POST failed.');
     }
  });
});
