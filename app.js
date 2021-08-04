document.addEventListener('DOMContentLoaded', () => {

    const boardDisplay = document.querySelector('.board');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    let squares = [];
    const width = 4;
    let score = 0;



    //create board

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.innerHTML = 0;
            boardDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    createBoard();

    //generate 2 or 4 at a random location

    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            let r = Math.random(1);
            squares[randomNumber].innerHTML = r > 0.5 ? 2 : 4;
            //checkForGameOver();
        }
        else generate();
    }

    //swipe right or move right

    function moveRight() {
        for (let i = 0; i < squares.length; i++) {
            if (i % 4 === 0) {
                let firstElement = squares[i].innerHTML;
                let secondElement = squares[i + 1].innerHTML;
                let thirdElement = squares[i + 2].innerHTML;
                let fourthElement = squares[i + 3].innerHTML;

                let row = [parseInt(firstElement), parseInt(secondElement), parseInt(thirdElement), parseInt(fourthElement)];
                let filterRow = row.filter(num => num);

                let remaining = row.length - filterRow.length;
                let zeroes = Array(remaining).fill(0);

                let newArray = zeroes.concat(filterRow);

                squares[i].innerHTML = newArray[0];
                squares[i + 1].innerHTML = newArray[1];
                squares[i + 2].innerHTML = newArray[2];
                squares[i + 3].innerHTML = newArray[3];

            }
        }
    }


    //swipe left or move left


    function moveLeft() {
        for (let i = 0; i < squares.length; i++) {
            if (i % 4 === 0) {
                let firstElement = squares[i].innerHTML;
                let secondElement = squares[i + 1].innerHTML;
                let thirdElement = squares[i + 2].innerHTML;
                let fourthElement = squares[i + 3].innerHTML;

                let row = [parseInt(firstElement), parseInt(secondElement), parseInt(thirdElement), parseInt(fourthElement)];
                let filterRow = row.filter(num => num);

                let remaining = row.length - filterRow.length;
                let zeroes = Array(remaining).fill(0);

                let newArray = filterRow.concat(zeroes);

                squares[i].innerHTML = newArray[0];
                squares[i + 1].innerHTML = newArray[1];
                squares[i + 2].innerHTML = newArray[2];
                squares[i + 3].innerHTML = newArray[3];

            }
        }
    }


    //move up

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let firstElement = squares[i].innerHTML;
            let secondElement = squares[i + width].innerHTML;
            let thirdElement = squares[i + (width * 2)].innerHTML;
            let fourthElement = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(firstElement), parseInt(secondElement), parseInt(thirdElement), parseInt(fourthElement)];

            let filteredColumn = column.filter(num => num)
            let remaining = 4 - filteredColumn.length
            let zeroes = Array(remaining).fill(0)
            let newColumn = filteredColumn.concat(zeroes)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    //move down

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let firstElement = squares[i].innerHTML;
            let secondElement = squares[i + width].innerHTML;
            let thirdElement = squares[i + (width * 2)].innerHTML;
            let fourthElement = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(firstElement), parseInt(secondElement), parseInt(thirdElement), parseInt(fourthElement)];

            let filteredColumn = column.filter(num => num);
            let remaining = 4 - filteredColumn.length;
            let zeroes = Array(remaining).fill(0);
            let newColumn = zeroes.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];
        }
    }





    //combine row values
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;

                score += combinedTotal;
                scoreDisplay.innerHTML = score;


                //scoreNotchanged




            }
        }
        checkforWin();
    }

    //combine column value

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;

                score += combinedTotal;
                scoreDisplay.innerHTML = score;


            }
        }
        checkforWin();
    }


    //assign keycodes

    function control(e) {
        if (e.keyCode == 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }

    document.addEventListener('keyup', control)


    //how keyright works

    function keyRight() {
        let currentState = [];
        let nextState = [];
        let isEqual = true;

        for (let i = 0; i < squares.length; i++) {
            currentState[i] = parseInt(squares[i].innerHTML);
        }

        moveRight();
        combineRow();
        moveRight();

        for (let i = 0; i < squares.length; i++) {
            nextState[i] = parseInt(squares[i].innerHTML);
        }

        for (let i = 0; i < squares.length; i++) {
            if (currentState[i] !== nextState[i]) {
                isEqual = false;
            }
        }

        if (!isEqual) {
            generate();
        }else{
            checkForGameOver();
        }
    }



    //how keyleft works

    function keyLeft() {
        let currentState = [];
        let nextState = [];
        let isEqual = true;

        for (let i = 0; i < squares.length; i++) {
            currentState[i] = parseInt(squares[i].innerHTML);
        }
        moveLeft();
        combineRow();
        moveLeft();

        for (let i = 0; i < squares.length; i++) {
            nextState[i] = parseInt(squares[i].innerHTML);
        }

        for (let i = 0; i < squares.length; i++) {
            if (currentState[i] !== nextState[i]) {
                isEqual = false;
            }
        }

        if (!isEqual) {
            generate();
        }else{
            checkForGameOver();
        }
    }



    //how keyup works

    function keyUp() {

        let currentState = [];
        let nextState = [];
        let isEqual = true;

        for (let i = 0; i < squares.length; i++) {
            currentState[i] = parseInt(squares[i].innerHTML);
        }

        moveUp();
        combineColumn();
        moveUp();

        for (let i = 0; i < squares.length; i++) {
            nextState[i] = parseInt(squares[i].innerHTML);
        }

        for (let i = 0; i < squares.length; i++) {
            if (currentState[i] !== nextState[i]) {
                isEqual = false;
            }
        }

        if (!isEqual) {
            generate();
        }else{
            checkForGameOver();
        }
    }


    //how keydown works

    function keyDown() {
        let currentState = [];
        let nextState = [];
        let isEqual = true;

        for (let i = 0; i < squares.length; i++) {
            currentState[i] = parseInt(squares[i].innerHTML);
        }

        moveDown();
        combineColumn();
        moveDown();

        for (let i = 0; i < squares.length; i++) {
            nextState[i] = parseInt(squares[i].innerHTML);
        }

        for (let i = 0; i < squares.length; i++) {
            if (currentState[i] !== nextState[i]) {
                isEqual = false;
            }
        }

        if (!isEqual) {
            generate();
        }else{
            checkForGameOver();
        }
    }




    //check for win i.e. one of square is 2048 in board

    function checkforWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You WIN';
                document.removeEventListener('keyup', control);
            }
        }
    }

    //check if there are no zeros on the board to lose

    function checkForGameOver() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You LOSE';
            document.removeEventListener('keyup', control);
        }
    }

});