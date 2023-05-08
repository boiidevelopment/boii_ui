//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\


/*
    TO DO:

    add styles
    add sounds

*/

// chip hack styles
const chip_styles = {

}

class ChipHack {
    constructor() {
        this.shadow = document.querySelector('.shadow');
        this.counter_inc = document.getElementById('chip');
        this.cur_count = document.getElementById('current-count');
        this.progress_bar = document.querySelector('.chip-progress');
        this.game_area = document.getElementById('chip-game-area');
        this.counter = 0;
        this.chips_needed = null;
        this.time_left = null;
    }

    init(chips, timer) {
        this.chips_needed = chips;
        this.time_left = timer;
        $('#chip-hack-start-container').removeClass('hidden');
        const change_progress = (progress) => {
            this.progress_bar.style.width = `${progress}%`;
            if (progress >= 90) {
                setTimeout(() => this.start_game(this.chips_needed, this.time_left), 1000);
            }
        };
        setTimeout(() => change_progress(15), 1000);
        setTimeout(() => change_progress(32), 2000);
        setTimeout(() => change_progress(65), 4600);
        setTimeout(() => change_progress(78), 5266);
        setTimeout(() => change_progress(90), 8000);
        $(document).ready(() => {
            $(document).keyup((exit) => this.handle_exit(exit));
        });
    }
    
    handle_exit(exit) {
        if (exit.keyCode === 27) {
            this.chiphack_end(false);
        }
    }

    randomize_chip_location() {
        var w = this.game_area.offsetWidth || this.game_area.style.width;
        var h = this.game_area.offsetHeight || this.game_area.style.height;
        this.counter_inc.style.top = `${Math.round(Math.random() * h)}px`;
        this.counter_inc.style.left = `${Math.round(Math.random() * w)}px`;
    }

    handle_mouse_move(e) {
        let x = e.clientX - (document.documentElement.clientWidth * 1.5);
        let y = e.clientY - (document.documentElement.clientHeight * 1.5);
        this.shadow.style.transform = `translate(${x}px, ${y}px)`;
    }

    handle_chip_click() {
        $('#chip').click(() => {
            this.randomize_chip_location();
            this.add_counter();
        });
    }

    start_game() {
        $('#chip-hack-start-container').addClass('hidden');
        $('#chip-hack-game-container').removeClass('hidden');
        this.randomize_chip_location();
        document.addEventListener('mousemove', (e) => this.handle_mouse_move(e));
        this.handle_chip_click();
        this.start_countdown();
    }

    start_countdown() {
        var html_result = `<h2>CHIPS FOUND ${this.counter}/${this.chips_needed}</h2>`;
        $('#chip-info-container').html(html_result);
        const countdown = setInterval(() => {
            if (this.time_left === 0) {
                if (this.counter <= this.chips_needed) {
                    clearInterval(countdown);
                    setTimeout(() => this.chiphack_end(false), 1000);
                }
            } else {
                document.getElementById("chip-hack-count").innerHTML = `<h2>${this.time_left} s REMAINING</h2>`;
            }
            this.time_left -= 1;
        }, 1000);
    }

    add_counter() {
        this.counter++;
        this.cur_count.innerHTML = this.counter;
        var html_result = `<h2>CHIPS FOUND ${this.counter}/${this.chips_needed}</h2>`;
        $('#chip-info-container').html(html_result);
        if (this.counter === this.chips_needed) {
            $('#chip-hack-game-container').addClass('hidden');
            clearInterval(this.countdown);
            this.chiphack_end(true);
        }
    }

    chiphack_end(success) {
        $('#chip-hack-start-container').addClass('hidden');
        $('#chip-hack-game-container').addClass('hidden');
        $.post(`https://${GetParentResourceName()}/chiphack_end`, JSON.stringify({ 'success': success }));
    }
}