class Game {
    constructor() {
        this.dragObj = {};
        document.addEventListener('mousedown', this.onMouseDown.bind(this));
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
        this.dragObj.elem.parentNode.appendChild(this.dragObj.elem);

        this.dragObj.downX = e.pageX;
        this.dragObj.downY = e.pageY;

        this.moveAt(e);

        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    onMouseMove(e) {
        this.moveAt(e);
    }

    onMouseUp(e) {
        if (!this.dragObj.elem) return;

        this.dragObj.elem.parentNode.hidden = true;

        let dropElem = document.elementFromPoint(e.clientX, e.clientY);

        this.dragObj.elem.parentNode.hidden = false;

        if (!dropElem.classList.contains('droppable')) {
            this.dragObj.elem.style.left = this.dragObj.downX - this.dragObj.shiftX + 'px';
            this.dragObj.elem.style.top = this.dragObj.downY - this.dragObj.shiftY + 'px';
            this.dragObj = {};
        } else {
            this.dragObj.elem.style.position = "";
            this.dragObj.elem.classList.remove('draggable');
            dropElem.appendChild(this.dragObj.elem);
            this.appendElement(this.dragObj.elem);
            this.dragObj = {};
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

    getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

let game = new Game();