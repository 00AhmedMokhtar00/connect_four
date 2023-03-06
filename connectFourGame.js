var emptySlotColor = 'rgb(128, 128, 128)'

var player1 = prompt("Player One: Enter Your Name , you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var tableRows = $('table tr');

// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function reportWin(rowNum,colNum) {
    var winner = ""
    if(returnColor(rowNum, colNum) == player1Color){
        winner = player1
    } else{
        winner = player2
    }

    console.log("Congrats " + winner + ", you are the winner!!");
    console.log("You won starting at this (row, col) => (" + rowNum + ', ' + colNum + ')');
}
// Change the color of a button
function changeColor(rowIndex,colIndex,color) {
    return tableRows.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color)
}
// Report Back to current color of a button
function returnColor(rowIndex,colIndex) {
    return tableRows.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}
// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
    var colorReport = emptySlotColor; // just initializing the colorReport variable
    for (var row = 5; row >= 0; row--) {
      colorReport = returnColor(row,colIndex);
      if (colorReport === emptySlotColor) {
        return row // return the row of the slot that should be colored
      }
    }
  }
  
  // Check to see if 4 inputs are the same color
  function colorMatchCheck(one,two,three,four){
    return (one !== undefined && one !== emptySlotColor && one===two && one===three && one===four);
  }

// Check for Horizontal Wins
function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 4; col++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
          console.log('horizental win accompleshed!');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
}

// Check for Vertical Wins
function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 3; row++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
          console.log('Vertical win accompleshed!');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }

// Check for Diagonal Wins
function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
      for (var row = 0; row < 7; row++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
          console.log('diagnal win accompleshed!');
          reportWin(row,col);
          return true;
        }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
          console.log('diagnal win accompleshed!');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
}

// Game End
function gameEnd(winningPlayer) {
    $('h2').fadeOut('fast');
    $('#turn').fadeOut('fast');
    $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
}
  
  // Start with Player One
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

// Start with Player One
$('#turn').text(player1 + ": it is your turn, please pick a column to drop your blue chip.");


    $('.board button').on('click',function() {
        if(!game_on) return;
    // Recognize what column was chosen
    var col = $(this).closest("td").index();

    // Get back bottom available row to change
    var bottomAvail = checkBottom(col);

    // Drop the chip in that column at the bottomAvail Row
    changeColor(bottomAvail,col,currentColor);

    // Check for a win or a tie.
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        game_on = false
        gameEnd(currentName);
    }

    // If no win or tie, continue to next player
    currentPlayer = currentPlayer * -1 ;

    // Re-Check who the current Player is.
    if (currentPlayer === 1) {
        currentName = player1;
        $('#turn').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
        currentColor = player1Color;
    }else {
        currentName = player2
        $('#turn').text(currentName+": it is your turn, please pick a column to drop your red chip.");
        currentColor = player2Color;
    }

    })



// Helper function to help you understand Rows and Columns From A Table
// http://stackoverflow.com/questions/788225/table-row-and-column-number-in-jquery
//
// $('.board button').on('click',function(){
//   // This is the Column Number (starts at zero):
//   console.log('This is the Column:');
//   console.log($(this).closest("td").index());
//   // This is the Row Number:
//   console.log("This is the Row:");
//   console.log($(this).closest("tr").index());
//   console.log('\n');
//   // This is a way to grab a particular cell (replace):
//   // $('table').eq(rowIndex).find('td').eq(colIndex)
// });

// // Change color on click
// $('.board button').on('click',function() {
//   if($(this).css('background-color') === 'rgb(51, 51, 51)'){
//     $(this).css('background-color','rgb(86, 151, 255)');
//   }else if ($(this).css('background-color') === 'rgb(86, 151, 255)'){
//     $(this).css('background-color','rgb(237, 45, 73)');
//   }else{
//     $(this).css('background-color','rgb(51, 51, 51)');
//   }
// });
