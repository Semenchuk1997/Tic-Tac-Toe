class Game {
    constructor() {
        this.dragObj = {};
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        document.addEventListener('mousedown', this.onMouseDown, false);
    }

    /**
     *
     * @param {event*} e
     * handle function of mousedown event
     * set primary properties of parameters
     */
    onMouseDown(e) {
        if (e.which !== 1) return;

        if (this.dragObj.elem) return;

        this.dragObj.elem = e.target.closest('.draggable');

        if (!this.dragObj.elem) return;

        let coords = this.getCoords(this.dragObj.elem);

        this.dragObj.elem.style.position = 'absolute';
        this.dragObj.elem.style.zIndex = 1000;
        this.dragObj.elem.style.marginLeft = '0';

        this.dragObj.downX = e.pageX;
        this.dragObj.downY = e.pageY;

        this.dragObj.shiftX = this.dragObj.downX - coords.left;
        this.dragObj.shiftY = this.dragObj.downY - coords.top;

        document.addEventListener('mousemove', this.onMouseMove, false);
        document.addEventListener('mouseup', this.onMouseUp, false);
    }

    /**
     *
     * @param {event} e
     * change coodrinats of draggable element
     */
    onMouseMove(e) {
        if (!this.dragObj.elem) return;

        this.dragObj.elem.style.left = e.pageX - this.dragObj.shiftX + 'px';
        this.dragObj.elem.style.top = e.pageY - this.dragObj.shiftY + 'px';
    }

    /**
     *
     * @param {event} e
     *
     */
    onMouseUp(e) {
        if (!this.dragObj.elem) return;

        //hidden and then show draggable element for catch droppable element
        this.dragObj.elem.parentNode.hidden = true;

        let dropElem = document.elementFromPoint(e.clientX, e.clientY);

        this.dragObj.elem.parentNode.hidden = false;

        //in case when drag element out of page;
        if (dropElem === null) return null;

        //if event mouseup wasnt on the droppable elements then drag element return to previous position
        if (!dropElem.classList.contains('droppable')) {
            this.dragObj.elem.style.left = this.dragObj.downX - this.dragObj.shiftX + 'px';
            this.dragObj.elem.style.top = this.dragObj.downY - this.dragObj.shiftY + 'px';
        } else if (dropElem.children[0] === undefined) { // in case when drag element is over of droppable lement and he is empty
            this.dragObj.elem.style.position = "";
            this.dragObj.elem.classList.remove('draggable');
            dropElem.appendChild(this.dragObj.elem);
            this.appendElement(this.dragObj.elem);
            this.checkField();
        }

        this.dragObj = {};
        document.removeEventListener('mousemove', this.onMouseMove, false);
        document.removeEventListener('mouseup', this.onMouseUp, false);
    }

    /**
     *
     * @param {draggable element} elem
     *  order of X/O
     */
    appendElement(elem) {
        let newElem = document.createElement('i');

        if (elem.classList.contains('playerX')) {
            newElem.classList.add('playerO', 'draggable', 'far', 'fa-circle');
        } else if (elem.classList.contains('playerO')) {
            newElem.classList.add('playerX', 'draggable', 'fas', 'fa-times');
        }

        document.getElementsByClassName('player')[0].appendChild(newElem);
    }

    /**
     * main logic of tic tac toe game
     */
    checkField() {
        let td = document.getElementsByTagName('td'),
            grid = [],
            win = false;

        for (let i = 0; i < td.length; i++) {
            if (td[i].children[0] === undefined) {
                grid[i] = null;
                continue;
            } else {
                if (td[i].children[0].classList.contains('playerX')) {
                    grid[i] = 'X';
                    continue;
                }
                if (td[i].children[0].classList.contains('playerO')) {
                    grid[i] = "O";
                    continue;
                }
            }
        }

        if (grid[0] === grid[1] && grid[0] === grid[2] && grid[0] !== null) {
            alert(`WIN ${grid[0]}`);
            win = true;
            window.location.reload(false);
        }
        if (grid[3] === grid[4] && grid[3] === grid[5] && grid[3] !== null) {
            alert(`WIN ${grid[3]}`);
            win = true;
            window.location.reload(false);
        }
        if (grid[6] === grid[7] && grid[6] === grid[8] && grid[6] !== null) {
            alert(`WIN ${grid[6]}`);
            win = true;
            window.location.reload(false);
        }
        if (grid[0] === grid[3] && grid[0] === grid[6] && grid[0] !== null) {
            alert(`WIN ${grid[0]}`);
            win = true;
            window.location.reload(false);
        }
        if (grid[1] === grid[4] && grid[1] === grid[7] && grid[1] !== null) {
            alert(`WIN ${grid[1]}`);
            win = true;
            window.location.reload(false);
        }
        if (grid[2] === grid[5] && grid[2] === grid[8] && grid[2] !== null) {
            alert(`WIN ${grid[2]}`);
            win = true;
            window.location.reload(false);
        }
        if (grid[0] === grid[4] && grid[0] === grid[8] && grid[0] !== null) {
            alert(`WIN ${grid[0]}`);
            win = true;
            window.location.reload(false);
        }
        if (grid[2] === grid[4] && grid[2] === grid[6] && grid[2] !== null) {
            alert(`WIN ${grid[2]}`);
            win = true;
            window.location.reload(false);
        }

        if (grid.indexOf(null) === -1 && !win) {
            alert('nobody win');
            window.location.reload(false);
        }
    }

    /**
     *
     * @param {drag element} elem
     * return get coordinats of drag element in start of dragging event
     */
    getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

let game = new Game();