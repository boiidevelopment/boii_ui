//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

/*
    TO DO:

    fix colours for correct number wrong location
*/

// code crack styles
const codecrack_styles = {
    ['default']: {
        correctColour: 'rgba(77, 203, 194, 0.8)',
        wrongPositionColour: 'rgba(254, 221, 0, 1.0)',
        successAudio: 'assets/audio/swift.ogg',
        failAudio: 'assets/audio/eyes.ogg',
        errorAudio: 'assets/audio/elegant.ogg'
    }
}

// code crack class
class CodeCrack {
    constructor(type = "default", difficulty = 1, attempts = 5) {
        this.difficulty = difficulty;
        this.max_attempts = attempts;
        this.code_length = 3 + this.difficulty;
        this.code = null;
        this.attempts_left = this.max_attempts;
        this.guess_history = [];
        this.style = codecrack_styles[type] || codecrack_styles.default;
        this.onGuessButtonClick = () => {
            this.guess();
        };
    }

    start_game(style, difficulty, attempts) {
        this.style = codecrack_styles[style] || codecrack_styles.default;
        this.difficulty = difficulty;
        this.max_attempts = attempts;
        this.code_length = 3 + this.difficulty;
        this.code = this.generate_code(this.code_length);
        this.attempts_left = this.max_attempts;
        this.guess_history = [];
        document.getElementById("codecrack-submit").addEventListener("click", this.onGuessButtonClick);
        document.getElementById("codecrack-game-container").style.display = "block";
        document.getElementById("code-length").innerHTML = this.code_length;
        this.display_guess_history();
    }
    
  
    generate_code(length) {
        let code = "";
        for (let i = 0; i < length; i++) {
            code += Math.floor(Math.random() * 10);
        }
        //console.log(code);
        return code;
    }
  
    check_guess(guess) {
        let correct_digits = 0;
        let correct_positions = 0;
        let code_digits = Array.from(this.code);
        let guess_digits = Array.from(guess);
        for (let i = 0; i < code_digits.length; i++) {
            if (code_digits[i] === guess_digits[i]) {
                correct_positions++;
                code_digits[i] = null;
                guess_digits[i] = null;
            }
        }
        for (let i = 0; i < guess_digits.length; i++) {
            if (guess_digits[i] !== null) {
                let index = code_digits.indexOf(guess_digits[i]);
                if (index !== -1) {
                    correct_digits++;
                    code_digits[index] = null;
                }
            }
        }
        return {correct_digits, correct_positions};
    }
      
    guess() {
        let guess_input = document.getElementById("codecrack-guess-input");
        let guess_value = guess_input.value;
        guess_input.value = "";
        let result = this.check_guess(guess_value);
        let correct_digits = result.correct_digits;
        let correct_positions = result.correct_positions;
        this.guess_history.unshift({ guess: guess_value, correct_digits, correct_positions });
        this.display_guess_history();
        this.attempts_left--;
        document.getElementById("remaining-attempts").innerHTML = this.attempts_left;
        if (correct_positions === this.code_length) {
            this.end_codecrack(true);
        } else if (this.attempts_left === 0) {
            this.end_codecrack(false);
        }
    }
  
    display_guess_history() {
        let guess_history_container = document.getElementById("guess-history");
        guess_history_container.innerHTML = "";
        this.guess_history.forEach(({ guess, correct_digits, correct_positions }) => {
        let guess_element = document.createElement("p");
        let code_digit_used = Array(this.code.length).fill(false);
        let guess_digit_used = Array(guess.length).fill(false);
        for (let j = 0; j < guess.length; j++) {
            if (guess[j] === this.code[j]) {
              correct_positions--;
              code_digit_used[j] = true;
              guess_digit_used[j] = true;
            }
        }
        for (let j = 0; j < guess.length; j++) {
            if (!guess_digit_used[j]) {
                for (let k = 0; k < this.code.length; k++) {
                    if (!code_digit_used[k] && guess[j] === this.code[k]) {
                        correct_digits--;
                        code_digit_used[k] = true;
                        guess_digit_used[j] = true;
                        break;
                    }
                }
            }
        }
        for (let j = 0; j < guess.length; j++) {
            let digit_element = document.createElement("span");
            digit_element.innerHTML = guess[j];
            if (guess_digit_used[j]) {
                if (guess[j] === this.code[j]) {
                    digit_element.style.backgroundColor = this.style.correctColour;
                } else {
                    digit_element.style.backgroundColor = this.style.wrongPositionColour;
                }
            }
            guess_element.appendChild(digit_element);
        }
            guess_history_container.appendChild(guess_element);
        });
    }
      
    end_codecrack(success) {
        this.attempts_left = this.max_attempts;
        this.guess_history = [];
        document.getElementById("remaining-attempts").innerHTML = this.attempts_left;
        this.display_guess_history();
        document.getElementById("codecrack-submit").removeEventListener("click", this.onGuessButtonClick);
        $.post(`https://${GetParentResourceName()}/code_crack_end`, JSON.stringify({'success': success}));
        document.getElementById("codecrack-game-container").style.display = "none";
    }
}
  
