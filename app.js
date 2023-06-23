document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".block");
    var clearButton = document.getElementById("clearButton");
    var textField = document.getElementById("player");
    var player1Turn = true;

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            if (this.innerHTML === "") {
                if (player1Turn) {
                    this.innerHTML = "X";
                    this.style.color = "red";
                    textField.innerHTML = "O's Turn";
                } else {
                    this.innerHTML = "O";
                    this.style.color = "blue";
                    textField.innerHTML = "X's Turn";
                }
                player1Turn = !player1Turn;
                checkWin();
            }
        });
    });

    clearButton.addEventListener("click", function() {
        resetGame();
    });

    function checkWin() {
        var winningPositions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (var i = 0; i < winningPositions.length; i++) {
            var pos = winningPositions[i];
            var buttonText = buttons[pos[0]].innerHTML;
            if (buttonText !== "" && buttonText === buttons[pos[1]].innerHTML && buttonText === buttons[pos[2]].innerHTML) {
                buttons[pos[0]].style.backgroundColor = "green";
                buttons[pos[1]].style.backgroundColor = "green";
                buttons[pos[2]].style.backgroundColor = "green";
                disableButtons();
                textField.innerHTML = buttonText + " wins";
                return;
            }
        }

        var isBoardFull = true;
        buttons.forEach(function(button) {
            if (button.innerHTML === "") {
                isBoardFull = false;
                return;
            }
        });

        if (isBoardFull) {
            disableButtons();
            textField.innerHTML = "Berabere";
        }
    }

    function disableButtons() {
        buttons.forEach(function(button) {
            button.removeEventListener("click", function() {});
        });
    }

    function resetGame() {
        buttons.forEach(function(button) {
            button.innerHTML = "";
            button.style.backgroundColor = "";
            button.addEventListener("click", function() {});
        });

        player1Turn = true;
        textField.innerHTML = "X's Turn";
    }
});
