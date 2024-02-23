class DrawTextManager {
    constructor() {
        this.default_style = { background: '#1f1e1e', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', text_colour: '#b4b4b4', animation: '2s', box_shadow: '2px 2px 5px #0d0c0c, -2px -2px 5px #2b2a2a' },
        this.custom_style = {};
        this.draw_text_position = { top: '500px', left: '10px' };
        this.draw_text_alignment = 'flex-start';
        this.load_user_settings();
        this.create_draw_text_container();
    }

    load_user_settings() {
        const user_style = localStorage.getItem('custom_draw_text_style');
        const user_position = localStorage.getItem('draw_text_position');
        const user_alignment = localStorage.getItem('draw_text_alignment');
        if (user_style) {
            try {
                this.custom_style = JSON.parse(user_style);
            } catch (e) {
                console.error("Error parsing custom draw text styles:", e);
            }
        } else {
            this.custom_style = this.default_style;
        }
        if (user_position) {
            this.draw_text_position = JSON.parse(user_position);
        }
        if (user_alignment) {
            this.draw_text_alignment = user_alignment === 'left' ? 'flex-start' : user_alignment === 'center' ? 'center' : 'flex-end';
        }
    }

    create_draw_text_container() {
        if ($('.draw_text_container').length === 0) {
            const container = $('<div>').addClass('draw_text_container').css({
                'position': 'fixed',
                'top': this.draw_text_position.top,
                'left': this.draw_text_position.left,
                'align-items': this.draw_text_alignment,
            });
            $('body').append(container);
        } else {
            $('.draw_text_container').css({
                'top': this.draw_text_position.top,
                'left': this.draw_text_position.left,
                'align-items': this.draw_text_alignment
            });
        }
    }

    show_text(header, message, icon = null) {
        const style = this.custom_style
        const draw_text_container = $('.draw_text_container');
        draw_text_container.empty();
        const icon_html = icon ? `<i class="${icon}"></i>` : '';
        const border =  `${style.border_size} ${style.border_style} ${style.border_colour}`;
        const draw_text_html = `
            <div class="draw_text" style="color: ${style.text_colour}; background-color: ${style.background}; border: ${border}; border-radius: ${style.border_radius}; animation: fade ${style.animation}; box-shadow: ${style.box_shadow};">
                <div class="draw_text_header">${icon_html} ${header}</div>
                <div class="draw_text_message">${message}</div>
            </div>
        `;
        draw_text_container.html(draw_text_html);
        draw_text_container.fadeIn(500);
    }

    hide_text() {
        $('.draw_text_container').fadeOut(500, function() {
            $(this).empty();
        });
    }

    update_user_style(new_style) {
        localStorage.setItem('custom_draw_text_style', JSON.stringify(this.custom_style));
        this.apply_style(new_style);
    }

    apply_style(new_style) {
        const draw_text_container = $('.draw_text');
        draw_text_container.css({...new_style});
    }
}

/*
// Example usage
$(document).ready(function() {
    const draw_text_manager = new DrawTextManager();
    draw_text_manager.show_text("Open Garage", "Press E to view your vehicles.", 'fa-solid fa-car' );
});
*/