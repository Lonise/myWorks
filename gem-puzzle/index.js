function createCellsWrapper() {
    const body = document.querySelector('body');
    const wrapper = document.createElement('div');

    wrapper.classList.add('wrapper');
    body.appendChild(wrapper);
}

function createAudio() {
    const audioEl = document.createElement("audio");

    audioEl.setAttribute("id", "soundMove");
    audioEl.setAttribute("src", "sound/soundMove.mp3");
    document.querySelector('body').appendChild(audioEl);
}

function createHeaderElement(classOfElement, elementInnerHtml, isMenu = false) {
    const headerElement = document.createElement('div');

    headerElement.classList.add(`header__${classOfElement}`,'header__item');
    headerElement.innerHTML = `${elementInnerHtml}`;
    
    if (isMenu) {
        headerElement.addEventListener('click', toggleBurgerMenu);
    }
    document.querySelector('.header').appendChild(headerElement);
}

function createHeader() {
    const header = document.createElement('header');

    header.classList.add('header');
    document.querySelector('.wrapper').appendChild(header);
    createHeaderElement('time', 'Time: 00 : 00');
    createHeaderElement('moves', 'Moves: 000');
    createHeaderElement('menu', 'Menu', true);

    const hamburgerLine = document.createElement('span');
    hamburgerLine.style.transform = 'rotate(270deg)';
    document.querySelector('.header__menu').appendChild(hamburgerLine);
}

let minutes = 0;
let seconds = 0;

function stopwatch()  {
    let outputMinutes = '';
    let outputSeconds = '';

    seconds++;
    
    if(seconds === 60) {
        seconds = 0;
        minutes++
    }

    outputSeconds = (seconds < 10) ? `0${seconds}` : seconds;
    outputMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    document.querySelector('.header__time')
    .innerHTML = `Time: ${outputMinutes} : ${outputSeconds}`;

    if (!burgerMenuVisible){
        setTimeout(stopwatch, 1000);
    } else {
        clearTimeout();
    }
};

let moves = 0;

function incrementMovesCounter() {
    moves ++
    let movesOutput = '00';
    if (moves < 10) {
        movesOutput += moves
    } else if (moves < 100) {
        movesOutput = '0'
        movesOutput += moves
    }
    else {
        movesOutput = moves
    }

    const counter = document.querySelector('.header__moves')
    counter.innerHTML = `Moves: ${movesOutput}`;
}



function createBurgerMenu() {
    const burgerMenuBackdrop = document.createElement('div');
    burgerMenuBackdrop.classList.add('hamburger-backdrop', 'hamburger-visible');
    document.querySelector('.header').appendChild(burgerMenuBackdrop);

    function createElementBurgerMenu(classOfElement, isCloseElement) {

        const burgerElement = document.createElement('div');

        if (classOfElement === 'hamburger_item')  {
            burgerElement.classList.add(`${classOfElement}`,'item-visible');
            document.querySelector('.hamburger').appendChild(burgerElement);
            return burgerElement;
        } else {
            burgerElement.classList.add(`${classOfElement}`);
            document.querySelector('.hamburger-backdrop').appendChild(burgerElement);
    
            if (isCloseElement) burgerElement.addEventListener('click', toggleBurgerMenu);
        }
    };

    createElementBurgerMenu('hamburger');
    createElementBurgerMenu('closeHamburgerMenu', true);

    const numberOfMenuItems = 6;

    for (let menuItemPosition = 0; menuItemPosition < numberOfMenuItems; menuItemPosition++) {

        const menuItem = createElementBurgerMenu('hamburger_item');

        function createMenuItem(menuItemAttribute, menuItemName) {
            menuItem.innerHTML = menuItemName;
            menuItem.setAttribute('id',`${menuItemAttribute}`);
        };

        switch(menuItemPosition) {
            case 0 :
                createMenuItem('newGame', 'New game')
            break;
            case 1 :
                createMenuItem('saveGame', 'Save game')
            break;
            case 2 :
                createMenuItem('savedGames', 'Saved game')
            break;
            case 3 :
                createMenuItem('bestScores', 'Best scores')
            break;
            case 4 :
                createMenuItem('setting', 'Setting')
            break;
            case 5 :
                createMenuItem('rules', 'Rules')
            break;
        }
    }
    document.querySelectorAll('.hamburger_item').forEach(item => {
        item.addEventListener('click', () =>{
           
            const element = item.attributes.id.value;
            togglePopup(element);       
        })
    });
};

let activePopup;

function togglePopup(element) {
    if (typeof element === 'string') {
        if (element === 'saveGame') return;
        if (element === 'newGame') {
            startNewGame();
            return;
        }
        
        activePopup = element;
        document.querySelector('.popup-wrapper').style.display = 'block';
        document.querySelector(`.${element + '-popup'}`).style.display = 'block';
    } else {
        document.querySelector('.popup-wrapper').style.display = 'none';
        document.querySelector(`.${activePopup + '-popup'}`).style.display = 'none';
    }
}

let fieldSize = 4;
let containerCellWidth;

function selectFieldSize(selected = 4) {
    const containerCell = document.querySelector('.cell-container');

    containerCellWidth = window.getComputedStyle(containerCell).width;
    containerCellWidth = containerCellWidth.substr(0, containerCellWidth.length-2)
    containerCellWidth = containerCellWidth - 1;

    if (selected !== 4){ 
        fieldSize = Number(selected.target.value)
    }

    cellSize = (containerCellWidth/fieldSize).toFixed(1);
}

let cellBackgroundImageURL;

function selectImage(selected) {
    cellBackgroundImageURL = undefined;

    if (selected.target.value === '0') return;

    cellBackgroundImageURL = `
        url(https://raw.githubusercontent.com
        /irinainina/image-data/master/box
        /${selected.target.value}.jpg)
    `;
    
}

let cells = [];
let empty = {};
let cellSize = 157.5;  

function startNewGame() {
    cells = [];
    empty = {};
    minutes = 0;
    seconds = -1;
    moves = -1;
    createCellContainer();
    incrementMovesCounter();
    stopwatch();
    dragAndDrop();
}

function createPopups() {

    function createPopupPath(pathClass, parent, isClose, popupPathInnerHTML) {
        const popupPath = document.createElement('div');
        popupPath.classList.add(`${pathClass}`);
        parent.appendChild(popupPath);

        if (isClose) {
            popupPath.addEventListener('click', togglePopup);
        }
        if (popupPathInnerHTML) {
            popupPath.innerHTML = `${popupPathInnerHTML}`;
        }

        return popupPath;
    }

    const popupWrapper = createPopupPath('popup-wrapper', document.querySelector('.wrapper'));
    const popup = createPopupPath('popup', popupWrapper);

    createPopupPath('popup-backdrop', popupWrapper, true);
    createPopupPath('closePopup', popup, true, '+');

    const numberAllPopups = 6;

    for (let currentPopupContent = 0; currentPopupContent < numberAllPopups; currentPopupContent++) {
        const popupContent = createPopupPath('popup-content', popup)

        switch (currentPopupContent) {

            case 0:
                popupContent.innerHTML = `<h2>Saved games</h2>`
                popupContent.classList.add('savedGames-popup');
                popupContent.style.display = 'none';
                break;

            case 1:
                popupContent.innerHTML = `
                <h2>Best scores</h2>
                <div class = "best-scores">
                    <div class = "score">Date</div>
                    <div class = "score">Time</div>
                    <div class = "score">Moves</div>
                    <div class = "score">Field size</div>
                </div>
                `
                popupContent.classList.add('bestScores-popup');
                popupContent.style.display = 'none';
                break;

            case 2:
                popupContent.innerHTML = `
                <h2>Setting</h2>
                <div class ='setting'>
                    <label class="select-label">Field size: </label>
                    <select class="select-box">
                        <option class="select-option" value="3">3x3</option>
                        <option class="select-option" value="4" selected="">4x4</option>
                        <option class="select-option" value="5">5x5</option>
                        <option class="select-option" value="6">6x6</option>
                        <option class="select-option" value="7">7x7</option>
                        <option class="select-option" value="8">8x8</option>
                    </select>
                    <button class ='sound'>
                        <i class="material-icons">volume_off</i>
                    </button>
                    <div class = "select-image">
                        <label class="select-label">Image: </label>
                        <select class="image-box">
                            <option class="select-option" value="0" selected="">none</option>
                            <option class="select-option" value="1">1</option>
                            <option class="select-option" value="2">2</option>
                            <option class="select-option" value="3">3</option>
                            <option class="select-option" value="4">4</option>
                            <option class="select-option" value="5">5</option>
                        </select>
                    </div>
                </div>`
                popupContent.classList.add('setting-popup');
                popupContent.style.display = 'none';
                document.querySelector('.select-box').addEventListener('change', (selected) => {
                    selectFieldSize(selected)
                });
                document.querySelector('.image-box').addEventListener('change', (selected) => {
                    selectImage(selected)
                });
                break;

            case 3:
                popupContent.innerHTML = `
                <h2>Rules of <br> 
                Gem Puzzle</h2>
                <p>
                The object of the puzzle is to place the tiles in 
                order by making sliding moves that use the  empty space. 
                You can't save your game and load it later. 
                You can use menu button for pause. 
                Also you can on sound, and choose game field size and 
                background image for cells in Settings. 
                After choosing you need push on New game. 
                </p>
                `
                popupContent.classList.add('rules-popup');
                popupContent.style.display = 'none';
                break;

            case 4:
                popupContent.innerHTML = `
                <h2>Congratulations,<br> you win!</h2>
                <p class = 'time'>
                </p>
                <p class = 'moves'>
                </p>
                <p class = 'field'>
                </p>
                `;
                popupContent.classList.add('finish-popup');
                popupContent.style.display = 'none';
                break;
        }
    }  
}

let burgerMenuVisible = true;

function toggleBurgerMenu() {
    document.querySelector('.closeHamburgerMenu').style.pointerEvents='none';
    document.querySelector('.header__menu').style.pointerEvents='none';
    
    burgerMenuVisible = !burgerMenuVisible;
    
    if (burgerMenuVisible) {
        document.querySelector(".header__item > span").style.transform = 'rotate(270deg)';
        document.querySelector('.hamburger-backdrop').classList.add('hamburger-visible');

        document.querySelectorAll('.hamburger_item').forEach(item => {
            item.classList.add('item-visible');
        }) 

    } else {
        document.querySelector(".header__item > span").style.transform = 'rotate(0deg)';
        document.querySelector('.hamburger-backdrop').classList.remove('hamburger-visible');
       
        document.querySelectorAll('.hamburger_item').forEach(item => {
            item.classList.remove('item-visible');
        })
        setTimeout(stopwatch, 1000); 
    }

    setTimeout(()=>{
        document.querySelector('.closeHamburgerMenu').style.pointerEvents='auto';
        document.querySelector('.header__menu').style.pointerEvents='auto';
    }, 1000);
}

function moveCell(index) {
    const movingCell = cells[index];
    const emptyCell = document.querySelector('.empty');
    const leftDifferenceCells = Math.abs(empty.left - movingCell.left);
    const topDifferenceCells = Math.abs(empty.top - movingCell.top);

    if (leftDifferenceCells + topDifferenceCells > 1) {
        return;
    }

    if (soundOnClick) {
        document.getElementById('soundMove').currentTime = 0;
        document.getElementById('soundMove').play();
    }

    movingCell.element.style.left =`${empty.left*cellSize}px`;
    movingCell.element.style.top = `${empty.top*cellSize}px`;

    const emptyLeft = empty.left; 
    const emptyTop = empty.top;

    empty.left = movingCell.left;
    empty.top = movingCell.top;

    movingCell.left = emptyLeft;
    movingCell.top = emptyTop;

    cells[index].left = emptyLeft;
    cells[index].top = emptyTop;
    
    emptyCell.style.left = `${empty.left*cellSize}px`;
    emptyCell.style.top = `${empty.top*cellSize}px`

    incrementMovesCounter();

    const isWin = cells.every(movingCell => {
       return movingCell.value === movingCell.top * fieldSize + movingCell.left +1;
    });

    if (isWin) {
        toggleBurgerMenu()
        document.querySelector('.time').innerHTML = document.querySelector('.header__time').innerHTML;
        document.querySelector('.moves').innerHTML = document.querySelector('.header__moves').innerHTML;
        document.querySelector('.field').innerHTML = `Field size: ${fieldSize} x ${fieldSize}`;
        togglePopup('finish');
    };
}
 
function createCellContainer() {
    let cellContainer = document.querySelector('.cell-container');

    if (cellContainer) {
        cellContainer.remove();
    }

    cellContainer = document.createElement('div');
    cellContainer.classList.add('cell-container');
    document.querySelector('.wrapper').appendChild(cellContainer);

    selectFieldSize();

    let numbers = [...Array(fieldSize * fieldSize).keys()];                                                    
    numbers = numbers.map(x => x + 1);
    numbers = numbers.sort(() => Math.random() - 0.5);

    function setCellParams ( cellLeft, cellTop, cellWithHeight, cellValue, cellClassEmpty = false) {
        const currentCell = document.createElement('div');
        currentCell.classList.add('cell');
        currentCell.setAttribute('id', `${cellValue}` );
        currentCell.style.left = `${cellLeft*cellSize}px`;
        currentCell.style.top = `${cellTop*cellSize}px`;
        currentCell.style.width = `${cellWithHeight}`;
        currentCell.style.height =  `${cellWithHeight}`;
        let cellObject = {};

        if (cellClassEmpty) {
            currentCell.classList.add('empty')
            cellObject = empty;
        } else {
            currentCell.setAttribute('draggable', 'true');
            currentCell.innerHTML = cellValue;
        }

        cellObject.left = cellLeft;   
        cellObject.top = cellTop;
        cellObject.element = currentCell;
        cellObject.value = cellValue;
        cells.push(cellObject);
        cellContainer.appendChild(currentCell);
        return currentCell;
    }

    for (let cellCounter  = 0; cellCounter  < (fieldSize * fieldSize); cellCounter++) {
        const value = numbers[cellCounter];
        const left = cellCounter  % fieldSize;
        const top = (cellCounter  - left) / fieldSize;     
        
        if (value === fieldSize * fieldSize) {
            setCellParams ( left, top, `${cellSize-5}px`, value, true);
            continue;
        }

        const cell = setCellParams( left, top, `${cellSize-5}px`, value);
        let finalLeft = (value-1) % fieldSize;
        let finalTop = ((value-1) - finalLeft) / fieldSize;

        cell.style.backgroundPositionX = `${containerCellWidth - finalLeft*cellSize}px`;
        cell.style.backgroundPositionY = `${containerCellWidth - finalTop*cellSize}px`;
        cell.style.backgroundSize = `${containerCellWidth}px`;
       
        cellContainer.appendChild(cell);

        if (cellBackgroundImageURL && cellBackgroundImageURL !== 0) {
            cell.style.backgroundImage = cellBackgroundImageURL;
            cell.style.color = 'rgba(0, 0, 0, 0.5)';
        };

        cell.addEventListener('click', () => {
            moveCell(cellCounter)
        })
    };
}

const dragAndDrop = () => {
    const draggableCell = document.querySelectorAll('.cell');
    const droppableCell = document.querySelector('.empty');
    let currentDragDrop;

    const dragStart = function() {
        setTimeout(() =>{
            currentDragDrop = this;
            this.classList.add('hide')
        }, 0);
    }
    const dragEnd = function() {
        this.classList.remove('hide');
    }
    const dragOver = function(evt) {
        evt.preventDefault();
    }
    const dragEnter = function() {
        this.classList.add('hovered');
    }
    const dragLeave = function() {
        this.classList.remove('hovered');
    }
    const dragDrop = function() {
        const index = cells.findIndex(item => item.value === Number(currentDragDrop.innerHTML));
        moveCell(index);
        this.classList.remove('hovered');
    }

    droppableCell.addEventListener('dragover', dragOver);
    droppableCell.addEventListener('dragleave', dragLeave);
    droppableCell.addEventListener('dragenter', dragEnter);
    droppableCell.addEventListener('drop', dragDrop);

    draggableCell.forEach((cell) =>{
        cell.addEventListener('dragstart', dragStart);
        cell.addEventListener('dragend', dragEnd);
    })
}

let soundOnClick = false;

function sound() {
    soundOnClick = !soundOnClick;

    if (soundOnClick) {
        document.querySelector('.material-icons').innerHTML = 'volume_up';
    } else {
        document.querySelector('.material-icons').textContent = 'volume_off';
    }
}
createAudio();
createCellsWrapper();
createHeader();
createBurgerMenu();
createPopups();
document.querySelector('.sound').addEventListener('click', sound);
startNewGame();
