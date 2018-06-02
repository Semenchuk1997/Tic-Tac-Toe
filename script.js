class Game {
    constructor() {
        this.dragObj = {};
        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    onMouseDown(e) {
        if (e.which !== 1) return;

        this.dragObj.elem = e.target.closest('.draggable');

        if (!this.dragObj.elem) return;

        let coords = this.getCoords(this.dragObj.elem);

        this.dragObj.shiftX = e.pageX - coords.left;
        this.dragObj.shiftY = e.pageY - coords.top;

        this.dragObj.elem.style.position = 'absolute';
        this.dragObj.elem.style.zIndex = 1000;

        this.dragObj.downX = e.pageX;
        this.dragObj.downY = e.pageY;
    }

    onMouseMove(e) {
        this.moveAt(e);
    }

    onMouseUp(e) {
        if (!this.dragObj.elem) return;

        this.dragObj.elem.parentNode.hidden = true;

        let dropElem = document.elementFromPoint(e.clientX, e.clientY);

        this.dragObj.elem.parentNode.hidden = false;

        if (dropElem === null || dropElem === undefined) return;

        if (!dropElem.classList.contains('droppable')) {
            this.dragObj.elem.style.left = this.dragObj.downX - this.dragObj.shiftX + 'px';
            this.dragObj.elem.style.top = this.dragObj.downY - this.dragObj.shiftY + 'px';
            this.dragObj = {};
        } else if (dropElem.children[0] === undefined || dropElem.children[0] === null) {
            this.dragObj.elem.style.position = "";
            this.dragObj.elem.classList.remove('draggable');
            dropElem.appendChild(this.dragObj.elem);
            this.appendElement(this.dragObj.elem);
            this.dragObj = {};
            this.checkField();
        }
    }

    moveAt(e) {
        if (this.dragObj.elem) {
            this.dragObj.elem.style.left = e.pageX - this.dragObj.shiftX + 'px';
            this.dragObj.elem.style.top = e.pageY - this.dragObj.shiftY + 'px';
        }
    }

    appendElement(elem) {
        let newElem = document.createElement('i');

        if (elem.classList.contains('playerX')) {
            newElem.classList.add('playerO', 'draggable', 'far', 'fa-circle');
        } else if (elem.classList.contains('playerO')) {
            newElem.classList.add('playerX', 'draggable', 'fas', 'fa-times');
        }

        document.getElementsByClassName('player')[0].appendChild(newElem);
    }

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

    getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

let game = new Game();