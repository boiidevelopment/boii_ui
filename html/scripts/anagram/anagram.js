//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

// anagram styles
const anagram_styles = {
    ['default']: {
        successAudio: 'assets/audio/swift.ogg',
        failAudio: 'assets/audio/eyes.ogg',
        errorAudio: 'assets/audio/elegant.ogg'
    }
}

// anagram class
class Anagram {
    constructor(type = "default", difficulty = 1, guesses = 5, time = 10) {
        this.easy_words = ['rear', 'bulb', 'sale', 'mist', 'lazy'];
        this.intermediate_words = ['short', 'proof', 'tribe', 'cross', 'grant'];
        this.hard_words = ['sector', 'qualify', 'merchant', 'agenda', 'sphere'];
        this.expert_words = ['aquarium', 'variable', 'feminine', 'crackpot', 'suppress'];
        this.style = anagram_styles[type] || anagram_styles.default;
        this.max_guesses = guesses;
        this.difficulty = difficulty;
        this.last_word = '';
        this.shuffled_word = '';
        this.original_word = '';
        this.time_remaining = time;
        this.interval = null;
        this.guesses = 0;
        this.previous_guesses = [];
        this.anagram_fail_audio = undefined;
        this.anagram_success_audio = undefined;
        this.anagram_error_audio = undefined;

        this.boundSubmitGuess = this.submit_guess.bind(this);

    }

    get_unique_word(word_list) {
        let new_word;
        let new_word_set = new Set(word_list);
        new_word_set.delete(this.last_word);
        const unique_words = Array.from(new_word_set);
        new_word = unique_words[Math.floor(Math.random() * unique_words.length)];
        return new_word;
    }   

    build_anagram_game(style, difficulty, guesses, time) {
        let game_ele = $('.anagram-container')
        game_ele.toggleClass('hidden')
        if (difficulty === 1) {
            this.original_word = this.get_unique_word(this.easy_words);
        } else if (difficulty === 2) {
            this.original_word = this.get_unique_word(this.intermediate_words);
        } else if (difficulty === 3) {
            this.original_word = this.get_unique_word(this.hard_words);
        } else if (difficulty === 4) {
            this.original_word = this.get_unique_word(this.expert_words);
        }
        if (style === undefined) {
            style === anagram_styles['default']
        }
        if (style.successAudio !== undefined) {
            this.anagram_success_audio = new Audio(style.successAudio)
        }
        if (style.failAudio !== undefined) {
            this.anagram_fail_audio = new Audio(style.failAudio)
        }
        if (style.errorAudio !== undefined) {
            this.anagram_error_audio = new Audio(style.errorAudio)
        }
        this.max_guesses = guesses;
        this.time_remaining = time;
        this.shuffled_word = this.shuffle_word(this.original_word);
        document.getElementById('anagram').textContent = this.shuffled_word;
        this.update_remaining_guesses();
        this.previous_guesses = [];

        if (this.interval !== null) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(this.update_anagram_timer.bind(this), 1000);
        this.attach_submit_event();
    }

    attach_submit_event() {
        const form = document.getElementById('guess-form');
        form.removeEventListener('submit', this.boundSubmitGuess);
        form.addEventListener('submit', this.boundSubmitGuess);
    }    
    
    shuffle_word(word) {
        let shuffled = word.split('');
        let original = word.split('');
        let count = 0;
        do {
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            count++;
        } while (shuffled.join('') === original.join('') && count < 100);
        return shuffled.join('');
    }

    
    update_anagram_timer() {
        this.time_remaining--;
        document.getElementById('time-remaining').textContent = this.time_remaining;
        if (this.time_remaining === 0) {
            clearInterval(this.interval);
            this.show_message('Ran out of time!', 'red');
            this.disable_input();
            setTimeout(() => this.anagram_end(false), 2000);
        }
    }

    update_remaining_guesses() {
        document.getElementById('remaining-guesses').textContent = `Remaining Guesses: ${this.max_guesses - this.guesses}`;
    }
    
    disable_input() {
        document.getElementById('guess-input').disabled = true;
    }
    
    show_message(msg, color) {
        const message = document.getElementById('message');
        message.textContent = msg;
        message.style.color = color;
    }
    
    submit_guess(e) {
        e.preventDefault();
        const guess = e.target.elements['guess-input'].value.trim().toLowerCase();
        const form = document.getElementById('guess-form');
        console.log("Guess submitted: ", guess);
        if (!guess) {
            this.show_message('Please enter a guess!', 'red');
            setTimeout(() => {
                this.anagram_error_audio && this.anagram_error_audio.play()
            }, 50)
            return;
        }
        console.log("Guess after trimming: ", guess);
        if (guess === this.original_word) {
            clearInterval(this.interval);
            form.removeEventListener('submit', this.boundSubmitGuess);
            this.show_message(`Correct!`, 'green');
            setTimeout(() => this.anagram_end(true), 2000);
        } else {
            this.guesses++;
            this.previous_guesses.push(guess);
            this.update_previous_guesses();
            this.update_remaining_guesses();
            if (this.guesses < this.max_guesses) {
                this.show_message(`Incorrect!`, 'red');
                setTimeout(() => {
                    this.anagram_error_audio && this.anagram_error_audio.play()
                }, 50)
            } else {
                clearInterval(this.interval);
                this.show_message('Ran out of guesses!', 'red');
                setTimeout(() => this.anagram_end(false), 2000);
            }
        }
    }
    
    update_previous_guesses() {
        const previous_guess_list = document.getElementById('previous-guesses');
        previous_guess_list.innerHTML = '';
        this.previous_guesses.forEach(guess => {
            const li = document.createElement('li');
            li.textContent = guess;
            previous_guess_list.appendChild(li);
        });
    }
    
    anagram_end(success) {
        setTimeout(() => {
            if (success) {
                this.anagram_success_audio && this.anagram_success_audio.play();
            } else {
                this.anagram_fail_audio && this.anagram_fail_audio.play();
            }
        }, 50);
        let game_ele = $('.anagram-container');
        game_ele.toggleClass('hidden');
        $.post(`https://${GetParentResourceName()}/anagram_end`, JSON.stringify({'success': success}));
        this.reset();
    }

    reset() {
        this.show_message('', 'black');
        const form = document.getElementById('guess-form');
        form.removeEventListener('submit', this.boundSubmitGuess);
        form.reset();
        document.getElementById('guess-input').disabled = false;
        document.getElementById('guess-input').placeholder = 'Enter your guess';
        const previous_guess_list = document.getElementById('previous-guesses');
        previous_guess_list.innerHTML = '';
        this.previous_guesses = [];
        this.last_word = this.original_word;
        this.original_word = '';
        this.shuffled_word = '';
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        this.guesses = 0;
    }
}    
