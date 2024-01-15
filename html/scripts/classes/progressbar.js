class Progressbar {
    constructor() {
        this.default_style = { background: '#1f1e1e', bar_background: '#ffffff', bar_fill: '#4dcbc2', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', text_colour: '#b4b4b4', animation: '1s' };
        this.custom_style = {};
        this.progress_container_position = { top: '900px', left: '690px' };
        this.load_user_settings();
        this.create_progress_container();
    }

    load_user_settings() {
        const user_style = localStorage.getItem('custom_progress_style');
        const user_position = localStorage.getItem('progress_container_position');
        if (user_style) {
            try {
                this.custom_style = JSON.parse(user_style);
            } catch (e) {
                console.error("Error parsing custom progress styles:", e);
            }
        } else {
            this.custom_style = this.default_style;
        }
        if (user_position) {
            this.progress_container_position = JSON.parse(user_position);
        }
    }

    create_progress_container() {
        if ($('.progress_container').length === 0) {
            const container = $('<div>').addClass('progress_container').css({
                'position': 'fixed',
                'top': this.progress_container_position.top,
                'left': this.progress_container_position.left,
            });
            $('body').append(container);
        } else {
            $('.progress_container').css({
                'top': this.progress_container_position.top,
                'left': this.progress_container_position.left,
            });
        }
    }

    create(header, icon, duration) {
        const progress_container = $('.progress_container');
        const style = this.custom_style;
        const border_style = `${style.border_size} ${style.border_style} ${style.border_colour}`;
        const progress_html = `
            <div class="progress_bar" style="color: ${style.text_colour}; background-color: ${style.background}; border: ${border_style}; border-radius: ${style.border_radius}; animation: fade ${style.animation};">
                <div class="progress_bar_header"><i class="${icon}"></i> ${header}</div>
                <div class="progress_bar_body" style="background-color: ${style.bar_background}; border-radius: ${style.border_radius}">
                    <div class="progress_bar_fill" style="width: 0%; background-color: ${style.bar_fill}; transition: width ${duration}ms linear; border-radius: ${style.border_radius}"></div>
                </div>
            </div>
        `;
        progress_container.html(progress_html);
        progress_container.fadeIn(500);
        const cancelKeys = ['Escape', 'Esc', 'Backspace'];
        const cancelListener = (event) => {
            if (cancelKeys.includes(event.key)) {
                $('.progress_bar_header').html('<i class="fa-solid fa-times"></i> Canceled');
                $('.progress_bar_fill').css('background-color', 'red');
                setTimeout(() => {
                    this.hide_progress();
                }, 250);
                $(document).off('keydown', cancelListener);
                clearTimeout(progress_fill_timer);
                this.progress_end(false);
            }
        };
        $(document).on('keydown', cancelListener);
        let progress_fill_timer = setTimeout(() => {
            $('.progress_bar_fill').css('width', '100%');
        }, 100);
        setTimeout(() => {
            this.progress_end(true);
            $('.progress_bar_header').html('<i class="fa-solid fa-check"></i> Success');
            setTimeout(() => {
                this.hide_progress();
            }, 1000);
            $(document).off('keydown', cancelListener);
        }, duration);
    }

    progress_end(success) {
        $.post(`https://${GetParentResourceName()}/progressbar_end`, JSON.stringify({ success: success }));
    }

    hide_progress() {
        $('.progress_container').fadeOut(500, function() {
            $(this).empty();
        });
    }
}

/*
// Uncomment this to live preview edit
$(document).ready(function() {
    const progress_class = new Progressbar();
    progress_class.create("Downloading documents..", 'fa-solid fa-download', 3000); // Duration in milliseconds (3 seconds)
});
*/
