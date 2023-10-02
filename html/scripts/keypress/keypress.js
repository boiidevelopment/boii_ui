class KeypressGame {
    constructor() {
        this.message = '';
        this.timer = 10;
        this.difficulty = 1;
        this.target_char_index = 0;
        this.target_chars = [];
        this.interval_timer = null;
        this.game_container = $('#keypress-mini-game');
    }

    get_random_char() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    game_result(success) {
        $.post(`https://${GetParentResourceName()}/keypress_end`, JSON.stringify({'success': success}));
        this.reset_game();
    }

    update_display() {
        this.game_container.html(`
            <h3>${this.message}</h3>
            <div class="target-char">${this.target_chars[this.target_char_index]}</div>
            <div class="timer-bar"></div>
        `);
        $('.timer-bar').progressbar({
            value: 100,
        });
    }

    reset_game() {
        clearInterval(this.interval_timer);
        $(document).off('keydown'); 
        this.target_char_index = 0;
        this.game_container.hide();
    }

    start(message, timer, difficulty) {
        this.message = message;
        this.timer = timer;
        this.difficulty = difficulty;
        this.target_chars = Array.from({length: this.difficulty}, () => this.get_random_char());
        this.update_display();
        this.game_container.show();

        const decrement = 100 / (this.timer * 10);

        this.interval_timer = setInterval(() => {
            const value = $('.timer-bar').progressbar('value') || 0;
            if (value <= 0) {
                clearInterval(this.interval_timer);
                $(document).off('keydown');
                this.game_result(false);
            } else {
                $('.timer-bar').progressbar('value', value - decrement);
                if (value <= 25) {
                    $('.timer-bar').removeClass('yellow orange').addClass('red fast-flash');
                } else if (value <= 50) {
                    $('.timer-bar').removeClass('yellow fast-flash').addClass('orange medium-flash');
                } else if (value <= 75) {
                    $('.timer-bar').removeClass('medium-flash').addClass('yellow slow-flash');
                }
            }
        }, 100);

        $(document).on('keydown', (event) => {
            if (event.key.toUpperCase() === this.target_chars[this.target_char_index]) {
                this.target_char_index++;
                if (this.target_char_index === this.target_chars.length) {
                    clearInterval(this.interval_timer);
                    $(document).off('keydown');
                    this.game_result(true);
                } else {
                    this.update_display();
                }
            } /*else {
                clearInterval(this.interval_timer);
                $(document).off('keydown');
                this.game_result(false);
            }*/
        });
    }
}
