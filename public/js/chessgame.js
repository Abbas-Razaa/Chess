const socket = io()
const chess = new Chess()
const boardElement = document.querySelector('.chessboard')

let playerRole = null
let draggedPiece = null
let SourceSquare = null

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = ''
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement('div')
            squareElement.classList.add(
                'square',
                (rowindex + squareindex) % 2 === 0 ? 'light' : 'dark'
            )
            squareElement.dataset.row = rowindex
            squareElement.dataset.col = squareindex

            if (square) {
                const pieceElement = document.createElement('div')
                pieceElement.classList.add('piece', square.color === 'w' ? 'white' : 'black')
                pieceElement.innerText = getPieceUnicode(square)
                pieceElement.draggable = playerRole === square.color

                pieceElement.addEventListener('dragstart', (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement
                        SourceSquare = { row: rowindex, col: squareindex }
                        e.dataTransfer.setData('text/plain', '')
                    }
                })
                pieceElement.addEventListener('dragend', () => {
                    draggedPiece = null
                    SourceSquare = null
                })
                square.appendChild(pieceElement)
            }

            squareElement.addEventListener('dragover', function(e) {
                e.preventDefault();
            })
            squareElement.addEventListener('drag', function(e) {
                e.preventDefault();
                if(draggedPiece){
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: squareElement.dataset.col
                    }
                }
                handleMove(SourceSquare, targetSource);
            })
            boardElement.appendChild(squareElement)
        })
    })
}

const handleMove = () => {
    constMove = {
        from: `${String.fromCharCode(97+source.col)}${8-source.row}`,
        to: `${String.fromCharCode(97+target.col)}${8-target.row}`,
        promotion:'q',
    }
 }

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p:"",
        r:"",
        n:"",
        b:"",
        q:"",
        k:"",
        P:"",
        R:"",
        N:"",
        B:"",
        Q:"",
        K:""
    }
    return unicodePieces[piece.type] || "";
}

renderBoard()