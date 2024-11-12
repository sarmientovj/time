// ---------------------------------------------------------------------------------------
// DRAGGABLE ITEMS -----------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
const mainBox    = document.getElementById('main_box');
const helpBox    = document.getElementById('help_box');
const noteBox    = document.getElementById('note_box');
const noteText   = document.getElementById('note_text');
const noteFooter = document.getElementById('note_footer');

let isDown_main = false;
let isDown_help = false;
let isDown_text = false;

mainBox.addEventListener( 'mousedown', 
    function(e) {
        if( e.target.toString() != "[object HTMLInputElement]" ) {
            isDown_main = true;
            offset = [
                mainBox.offsetLeft - e.clientX,
                mainBox.offsetTop - e.clientY
            ];
        }
    },
true);

helpBox.addEventListener( 'mousedown', 
    function(e) {
        isDown_help = true;
        offset = [
            helpBox.offsetLeft - e.clientX,
            helpBox.offsetTop - e.clientY
        ];
    }, 
true);

noteText.addEventListener( 'mousedown', 
    function(e) {
        isDown_text = true;
        offset = [
            noteBox.offsetLeft - e.clientX,
            noteBox.offsetTop - e.clientY
        ];
    }, 
true);

noteFooter.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = noteBox.offsetLeft;
    const startTop = noteBox.offsetTop;

    const onMouseMove = (e) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        noteBox.style.left = startLeft + dx + 'px';
        noteBox.style.top = startTop + dy + 'px';
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

document.addEventListener( 'mouseup', 
    function() {
        isDown_main = false;
        isDown_help = false;
        isDown_text = false;
    }, 
true);

document.addEventListener( 'mousemove',
    function(event) {
        event.preventDefault();
        let box = null;
        if( isDown_main ) box = mainBox;
        if( isDown_help ) box = helpBox;
        if( isDown_text ) box = noteBox;
        // if( isDown_resize ) return;

        if( box != null ){
            mousePosition = {
                x : event.clientX,
                y : event.clientY
            };
            box.style.left = (mousePosition.x + offset[0]) + 'px';
            box.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
    }, 
true);

// ---------------------------------------------------------------------------------------
