name = window.prompt('Enter your username')
if (name ==''){
  window.alert('Enter a name to enter the server.')
  while (true){
    name = window.prompt('Enter your username')
    if (name==''){
      window.alert('Enter a name to enter the server.')
    }
    else{
      break
    }
  }
}
var socket = io.connect( 'http://' + document.domain + ':' + location.port )
// broadcast a message
socket.on( 'connect', function() {
  socket.emit( 'my event', {
    data: 'User Connected'
  } )
  var form = $( 'form' ).on( 'submit', function( e ) {
    e.preventDefault()
    let user_name = name
    let user_input = $( 'input.message' ).val()
    socket.emit( 'my event', {
      user_name : user_name,
      message : user_input
    } )
    // empty the input field
    $( 'input.message' ).val( '' ).focus()
  } )
} )

// capture message
socket.on( 'my response', function( msg ) {
  console.log( msg )
  if( typeof msg.user_name !== 'undefined' ) {
    $( 'h1' ).remove()
    $( 'div.message_holder' ).append( '<div class="msg_bbl"><p>'+'<span style="font-weight:bold">'+msg.user_name+'</span>'+':  '+'<span align="center">'+msg.message+'</span>'+'</p> '+'</div>' )
  }
} )