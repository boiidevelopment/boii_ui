//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

// skill circle styles
const circle_styles = {
    // default style
    ['default']: {
        barColour: 'rgba(77, 203, 194, 0.5)',
        backgroundColour: 'rgba(31, 30, 30, 0.8)',
        successBackgroundColour: 'rgba(77, 203, 194, 0.8)',
        fontColour: 'rgba(77, 203, 194, 1.0)',
        shadowColour: 'rgba(31, 30, 30, 0.8)',
        shadowBlur: 3,
        barFont: '6.5rem Aldrich',
        successAudio: 'assets/audio/swift.ogg',
        failAudio: 'assets/audio/eyes.ogg',
    },

    // test styles -- delete these
    ['test']: {
        barColour: 'red',
        backgroundColour: 'black',
        successBackgroundColour: 'green',
        fontColour: 'yellow',
        shadowColour: 'black',
        shadowBlur: 3,
        barFont: '6.5rem Roboto',
        successAudio: 'assets/audio/when.ogg',
        failAudio: 'assets/audio/elegant.ogg',
    },
    ['test2']: {
        barColour: 'blue',
        backgroundColour: 'black',
        successBackgroundColour: 'yellow',
        fontColour: 'red',
        shadowColour: 'black',
        shadowBlur: 3,
        barFont: '6.5rem Aldrich',
        successAudio: 'assets/audio/pretty.ogg',
        failAudio: 'assets/audio/hollow.ogg',
    },
}

// skill circle class
class SkillCircle {
    constructor() {
        this.valid_circle_keys = ['1', '2', '3', '4'];
        this.circle_width = 0;
        this.circle_height = 0;
        this.key_pressed = '';
        this.degrees = 0;
        this.new_degrees = 0;
        this.circle_start = 0;
        this.circle_end = 0;
        this.circle_anim = null;
        this.circle_success_audio = undefined;
        this.circle_fail_audio = undefined;
        this.timer = 0;
        this.bar_colour = '';
        this.bar_font = '';
        this.font_colour = '';
        this.background_colour = '';
        this.success_bg_colour = '';
        this.shadow_colour = '';
        this.shadow_blur = '';
        this.circle_active = false;
    }

    create_skill_circle(type, duration) {
        this.circle_active = true;
        this.build_skill_circle(circle_styles[type], duration)
    }

    build_skill_circle(style, timer) {
        this.skill_circle_canvas = document.getElementById('circle-canvas');
        this.circle_width = this.skill_circle_canvas.width;
        this.circle_height = this.skill_circle_canvas.height;
        this.circle = this.skill_circle_canvas.getContext('2d');
        if (style === undefined) {
            style = circle_styles['default'];
        }
        if (style.successAudio !== undefined) {
            this.circle_success_audio = new Audio(style.successAudio);
        }
        if (style.failAudio !== undefined) {
            this.circle_fail_audio = new Audio(style.failAudio);
        }
        this.bar_colour = style.barColour;
        this.bar_font = style.barFont;
        this.font_colour = style.fontColour;
        this.background_colour = style.backgroundColour;
        this.success_bg_colour = style.successBackgroundColour;
        this.shadow_colour = style.shadowColour;
        this.shadow_blur = style.shadowBlur;
        this.draw_skill_circle(timer);
        this.init_circle_keypress();
    }
    
    get_random_int = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    init_skill_circle() {
        this.circle.clearRect(0, 0, this.circle_width, this.circle_height);
        this.circle.beginPath();
        this.circle.shadowColor = this.shadow_colour;
        this.circle.shadowBlur = this.shadow_blur;
        this.circle.strokeStyle = this.background_colour;
        this.circle.lineWidth = 20;
        this.circle.arc(this.circle_width / 2, this.circle_height / 2, 80, 0, Math.PI * 2, false);
        this.circle.stroke();
        this.circle.beginPath();
        this.circle.strokeStyle = this.success_bg_colour;
        this.circle.lineWidth = 20;
        this.circle.arc(this.circle_width / 2, this.circle_height / 2, 80, this.circle_start - 90 * Math.PI / 180, this.circle_end - 90 * Math.PI / 180, false);
        this.circle.stroke();
        const radians = this.degrees * Math.PI / 180;
        this.circle.beginPath();
        this.circle.strokeStyle = this.bar_colour;
        this.circle.lineWidth = 20;
        this.circle.arc(this.circle_width / 2, this.circle_height / 2, 80, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
        this.circle.stroke();
        this.circle.fillStyle = this.font_colour;
        this.circle.font = this.bar_font;
        const text_width = this.circle.measureText(this.key_pressed).width;
        this.circle.fillText(this.key_pressed, this.circle_width / 2 - text_width / 2, this.circle_height / 2 + 35);
    }

    animate_circle() {
        if (this.degrees >= this.new_degrees && this.degrees !== this.new_degrees) {
            this.skill_circle_end(false);
            return;
        }
        this.degrees += 2;
        if (this.degrees > this.new_degrees) {
            this.degrees = this.new_degrees;
        }
        this.init_skill_circle();
        if (this.degrees === this.new_degrees) {
            this.skill_circle_end(false);
            return;
        }
    }

    draw_skill_circle(timer) {
        if (this.circle_anim) clearInterval(this.circle_anim);
        this.circle_start = this.get_random_int(20, 40) / 10;
        this.circle_end = this.get_random_int(5, 10) / 10;
        this.circle_end = this.circle_start + this.circle_end;
        this.degrees = 0;
        this.new_degrees = 360;
        this.key_pressed = this.valid_circle_keys[Math.floor(Math.random() * this.valid_circle_keys.length)];
        this.circle_anim = setInterval(() => this.animate_circle(), timer);
        this.skill_circle_canvas.style.display = 'block';
        this.circle.clearRect(0, 0, this.circle_width, this.circle_height);
        this.circle.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.circle.lineWidth = 20;
        this.circle.beginPath();
        this.circle.arc(this.circle_width / 2, this.circle_height / 2, 80, 0, Math.PI * 2);
        this.circle.stroke();
        this.circle.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.circle.beginPath();
        this.circle.arc(this.circle_width / 2, this.circle_height / 2, 80, this.circle_start * Math.PI - 0.5 * Math.PI, this.circle_end * Math.PI - 0.5 * Math.PI);
        this.circle.stroke();
        this.circle.strokeStyle = 'rgba(0, 0, 0, 0)';
        this.circle.beginPath();
        this.circle.arc(this.circle_width / 2, this.circle_height / 2, 80, -0.5 * Math.PI, (this.degrees - 90) * Math.PI / 180 - 0.5 * Math.PI, false);
        this.circle.stroke();
        this.circle.fillStyle = 'rgba(0, 0, 0, 0)';
        this.circle.font = this.bar_font;
        this.circle.fillText(this.key_pressed, this.circle_width / 2 - this.circle.measureText(this.key_pressed).width / 2, this.circle_height / 2 + 35);
    }

    skill_circle_end(success) {
        this.circle_active = false;
        if (success) {
            setTimeout(() => {
                this.circle_success_audio && this.circle_success_audio.play();
            }, 50);
        } else {
            setTimeout(() => {
                this.circle_fail_audio && this.circle_fail_audio.play();
            }, 50);
        }
        clearInterval(this.circle_anim);
        $.post(`https://${GetParentResourceName()}/circle_end`, JSON.stringify({ 'success': success }));
        document.getElementById('circle-canvas').style.display = 'none';
    }

    handle_circle_keypress(ev) {
        if (!this.circle_active) {
            return;
        }
        const key_pressed = ev.key;
        const degrees_start = (180 / Math.PI) * this.circle_start;
        const degrees_end = (180 / Math.PI) * this.circle_end;
        if (!this.valid_circle_keys.includes(key_pressed)) {
            if (key_pressed === this.key_pressed) {
                this.skill_circle_end(true);
                return;
            } else {
                this.skill_circle_end(false);
                return;
            }
        }
        if (this.degrees < degrees_start || this.degrees > degrees_end) {
            this.skill_circle_end(false);
            return;
        }
        this.skill_circle_end(true);
    }

    init_circle_keypress() {
        $(document).on('keydown', this.handle_circle_keypress.bind(this));
    }
}
