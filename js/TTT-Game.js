$(document).ready(function() {
    
    var $startGame = $('#startGame');
    var $playground = $('#playground');
    var $gameInfo = $('#gameInfo');
    var cells;

    function gameArray() {
        var gameArray = ['','','','','','','','',''];
        return gameArray;
    }

    function checking(a, b, c) {
        if((cells[a] == cells[b] && cells[b] == cells[c] ) && cells[a] != '' && cells[b] != '' ) {
            $gameInfo.html('GAME OVER');
            $gameInfo.append($('<p>').text(`${cells[a]} - wins`));
            $('td').off();

            $( `td[id='cell_${a}']`).css({
                backgroundColor: 'beige',
                color: 'green',
                fontSize: '20px',
                fontWeight: 'bold'
            });
            $( `td[id='cell_${b}']`).css({
                backgroundColor: 'beige',
                color: 'green',
                fontSize: '20px',
                fontWeight: 'bold'
            });
            $( `td[id='cell_${c}']`).css({
                backgroundColor: 'beige',
                color: 'green',
                fontSize: '20px',
                fontWeight: 'bold'
            });
        }
    }
    
    function analizingGame(movesCount) {
        if(movesCount.length > 4) {
            checking(0, 1, 2);
            checking(3, 4, 5);
            checking(6, 7, 8);
            checking(0, 3, 6);
            checking(1, 4, 7);
            checking(2, 5, 8);
            checking(0, 4, 8);
            checking(2, 4, 6);
        }
        if(movesCount.length == 9 && $gameInfo.html() == '') {
            $gameInfo.html('GAME OVER');
            $gameInfo.append($('<p>').text('No clear winner, try again'));
            $('td').off();
        }
    }

    function refresh() {
        var $table = $('<table>');
        var $tr;
        var currentMove;
        var movesCount = [];
        
        $.each(cells, function(i) {
            if(i % 3 === 0) {
                $tr = $('<tr>');
            }
            var $td = $('<td>').html(cells[i]);
            $td.attr('id', 'cell_' + i);
            $td.click(function() {
                if(movesCount.indexOf( $(this).attr('id').slice(-1)) === -1 ) {
                    movesCount.push($(this).attr('id').slice(-1));
                    currentMove = (movesCount.length % 2) ? 'X' : 'O';
                    $(this).text(currentMove);
                    cells[$(this).attr('id').slice(-1)] = currentMove;
                    analizingGame(movesCount);
                }
            });
            $table.append($tr.append($td));
        });
        $playground.append($table);
    }

    $startGame.click(function() {
        $playground.empty();
        $('p').empty();
        cells = gameArray();
        refresh();
    });   
}); 
