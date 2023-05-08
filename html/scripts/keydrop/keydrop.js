//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

/*
    TO DO:

    add styles
    add sounds

*/

// keydrop style 
const keydrop_styles = {

}


// keydrop class
class KeyDrop {
    constructor(score_limit, miss_limit, fall_delay, new_letter_delay) {
        this.score = 0;
        this.score_limit = score_limit;
        this.misses = 0;
        this.miss_limit = miss_limit;
        this.new_letter_delay = new_letter_delay;
        this.fall_delay = fall_delay;
        this.timeout_id = null;
        this.intervalCleared = false;
        this.start_keydrop();
    }

    start_keydrop() {
        this.score = 0;
        this.misses = 0;
        this.intervalCleared = false;
        $('.letter').remove();
        $('#keydrop-container').empty();
        let main_div = document.getElementById('keydrop-container');
        let game_container = create_element('div', 'keydrop-game');
        main_div.append(game_container);

        this.drop_letter();
        this.init_keydrop_presses();
    }

    drop_letter() {
        var letter = String.fromCharCode(65 + Math.floor(Math.random()*26));
        var position = Math.floor(Math.random()*($('.keydrop-game').width()-60)) + 'px';
        var $letter = $('<div class="letter">' + letter + '</div>');
        $letter.css({top: '-80px', left: position});
        $('.keydrop-game').append($letter);
        $letter.animate({top: '49vh'}, this.fall_delay, () => {
            if (!$letter.hasClass('hit')) {
                $letter.addClass('miss');
                this.misses++;
                if (this.misses >= this.miss_limit && !this.intervalCleared) {
                    clearTimeout(this.timeout_id);
                    setTimeout(() => this.keydrop_end(false), this.new_letter_delay);
                    this.intervalCleared = true;
                }
            }
        });
        if (!this.intervalCleared) {
            this.timeout_id = setTimeout(() => this.drop_letter(), this.new_letter_delay);
        }
    }

    init_keydrop_presses() {
        $(document).keyup((event) => {
            var key = String.fromCharCode(event.keyCode);
            var $letter = $('.letter').filter(function() {
                return $(this).text() == key;
            }).first();
            if ($letter.length) {
                $letter.addClass('hit');
                this.score++;
                if (this.score === this.score_limit && !this.intervalCleared) {
                    clearTimeout(this.timeout_id);
                    setTimeout(() => this.keydrop_end(true), this.new_letter_delay);
                    this.intervalCleared = true;
                };
            };
        });
    }    

    keydrop_end(success) {
        clearTimeout(this.timeout_id);
        $('.letter').empty();
        $('.keydrop-game').empty();
        $('#keydrop-container').empty();
        $.post(`https://${GetParentResourceName()}/keydrop_end`, JSON.stringify({'success': success}));
    }
}
