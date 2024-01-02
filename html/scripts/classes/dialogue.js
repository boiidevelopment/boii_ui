class DialogueManager {
    constructor() {
        this.default_style = { background: '#1f1e1e', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', colour: '#b4b4b4', animation: '1s', vignette_colour: '#000000' };
        this.custom_style = {};
        this.data = null;
        this.load_user_settings();
        $(document).ready(() => {
            $(document).keyup((e) => this.handle_exit(e));
        });
    }

    load_user_settings() {
        const user_style = localStorage.getItem('custom_dialogue_style');
        try {
            if (user_style) {
                this.custom_style = JSON.parse(user_style);
            } else {
                this.custom_style = this.default_style;
            }
        } catch (e) {
            console.error("Error parsing custom dialogue styles:", e);
            this.custom_style = this.default_style;
        }
    }

    handle_exit(e) {
        if (e.key === "Escape" || e.key === "Backspace") {
            this.close();
        }
    }

    close() {
        $('.dialogue_wrapper').empty();
        $.post(`https://${GetParentResourceName()}/close_dialogue`, JSON.stringify({}));
    }

    init(data) {
        this.data = data;
        this.create_container();
        this.build(data);
    }
    
    create_container() {
        $('.dialogue_wrapper').remove();
        const wrapper = $('<div>').addClass('dialogue_wrapper');
        const container = $('<div>').addClass('dialogue_container');
        wrapper.append(container);
        $('body').append(wrapper);
    }
    
    build(data) {
        if (data) {
            const container = $('.dialogue_container').empty();
            const border_style = `${this.custom_style.border_size} ${this.custom_style.border_style} ${this.custom_style.border_colour}` || `${this.default_style.border_size} ${this.default_style.border_style} ${this.default_style.border_colour}`;
            container.css({
                'background-color': this.custom_style.background || this.default_style.background,
                'border': border_style,
                'border-radius': this.custom_style.border_radius || this.default_style.border_radius,
                'color': this.custom_style.colour || this.default_style.colour
            });
            this.build_header(container, data.header);
            this.build_response(container, data.conversation[0]);
            this.build_options(container, data.conversation[0].options);
            const vignette_colour = this.custom_style.vignette_colour || this.default_style.vignette_colour;
            $('#main_container').css({
                'position': 'relative',
            }).append($('<div>').addClass('dialogue_vignette').css({
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'right': 0,
                'bottom': 0,
                'pointer-events': 'none',
                'background': `radial-gradient(circle, transparent, ${vignette_colour})`
            }));
        }
    }

    build_header(container, header_data) {
        const header = $('<div>').addClass('dialogue_header');
        const header_content = $('<div>').addClass('dialogue_header_content');
        if (header_data.image) {
            const header_image = $('<img>').attr('src', header_data.image).addClass('dialogue_header_image');
            header_content.append(header_image);
        }
        if (header_data.message) {
            const header_text = $('<span>').text(header_data.message).addClass('dialogue_header_text');
            header_content.append(header_text);
        }
        header.append(header_content);
        container.append(header);
    }
    
    build_response(container, conversation) {
        container.find('.dialogue_response').remove();
        const response = $('<div>').addClass('dialogue_response').text(conversation.response);
        container.append(response);
    }

    build_dummy(data) {
        const border_style = `${this.custom_style.border_size} ${this.custom_style.border_style} ${this.custom_style.border_colour}` || `${this.default_style.border_size} ${this.default_style.border_style} ${this.default_style.border_colour}`;
        let styles = {
            'background-color': this.custom_style.background || this.default_style.background,
            'border': border_style,
            'border-radius': this.custom_style.border_radius || this.default_style.border_radius,
            'color': this.custom_style.color || this.default_style.color,
            'width': '93%',
            'margin': '2%',
        };
        let html = $('<div>').addClass('dialogue_container').css(styles);
        this.build_header(html, data.header);
        if (data.conversation && data.conversation.length > 0) {
            const first_conv = data.conversation[0];
            this.build_response(html, first_conv);
            this.is_dummy = true;
            this.build_options(html, first_conv.options);
            this.is_dummy = false;
        }
        return html;
    }

    build_options(container, options) {
        container.find('.dialogue_options').remove();
        const option_grid = $('<div>').addClass('dialogue_options');
        options.forEach((option) => {
            const option_div = $('<div>').addClass('dialogue_option').text(option.message);
            if (option.icon) {
                const icon = $('<i>').addClass(option.icon).css('margin-right', '10px');
                option_div.prepend(icon);
            }
            if (!this.is_dummy) {
                option_div.on('click', () => {
                    this.handle_option_select(option);
                });
            }
            option_grid.append(option_div);
        });
        container.append(option_grid);
    }

    handle_option_select(option) {
        if (option.next_id) {
            const next_conv = this.data.conversation.find(conv => conv.id === option.next_id);
            if (next_conv) {
                this.build_response($('.dialogue_container'), next_conv);
                this.build_options($('.dialogue_container'), next_conv.options);
            }
        } else if (option.should_end) {
            this.close();
        }
        if (option.action_type && option.action) {
            $.post(`https://${GetParentResourceName()}/trigger_event`, JSON.stringify({
                action_type: option.action_type,
                action: option.action,
                params: option.params || {}
            }));
        }
    }
}

// DO NOT REMOVE THIS TEST DATA THIS IS USED BY THE SETTINGS UI PAGE TO CREATE THE DUMMY DIALOGUE DISPLAY
const test_dialogue = {
    header: {
        message: 'Quarry Employee',
        icon: 'fa-solid fa-hard-hat',
        image: '/html/assets/images/logo.png',
    },
    conversation: [
        {
            id: 1,
            response: 'Hello, welcome to the quarry. How can I assist you today?',
            options: [
                {
                    icon: 'fa-solid fa-question-circle',
                    message: 'Can you tell me more about what you do here?',
                    next_id: 2,
                    should_end: false
                },
                {
                    icon: 'fa-solid fa-briefcase',
                    message: 'What kind of jobs are available at the quarry?',
                    next_id: 3,
                    should_end: false
                },
                {
                    icon: 'fa-solid fa-shield-alt',
                    message: 'Are there any safety protocols I should be aware of?',
                    next_id: 4,
                    should_end: false
                },
                {
                    icon: 'fa-solid fa-door-open',
                    message: 'Goodbye!',
                    next_id: null,
                    should_end: true,
                    action_type: 'client',
                    action: 'test_event',
                    params: {}
                }
            ]
        },
        {
            id: 2,
            response: 'We primarily focus on extracting minerals and processing them for various uses. It\'s challenging but fulfilling work.',
            options: [
                {
                    icon: 'fa-solid fa-arrow-left',
                    message: 'Back to previous options',
                    next_id: 1,
                    should_end: false
                },
                {
                    icon: 'fa-solid fa-door-open',
                    message: 'Thank you, that\'s all for now.',
                    next_id: null,
                    should_end: true,
                    action_type: 'client',
                    action: 'test_event',
                    params: {}
                }
            ]
        },
        {
            id: 3,
            response: 'There are several roles here, from equipment operators to safety inspectors. We\'re always looking for dedicated workers.',
            options: [
                {
                    icon: 'fa-solid fa-arrow-left',
                    message: 'Back to previous options',
                    next_id: 1,
                    should_end: false
                },
                {
                    icon: 'fa-solid fa-door-open',
                    message: 'Thanks, I\'ll consider applying.',
                    next_id: null,
                    should_end: true,
                    action_type: 'client',
                    action: 'test_event',
                    params: {}
                }
            ]
        },
        {
            id: 4,
            response: 'Safety is our top priority. Everyone is required to wear protective gear, and we have regular training sessions.',
            options: [
                {
                    icon: 'fa-solid fa-arrow-left',
                    message: 'Back to previous options',
                    next_id: 1,
                    should_end: false
                },
                {
                    icon: 'fa-solid fa-door-open',
                    message: 'Good to know. Thanks for the information.',
                    next_id: null,
                    should_end: true,
                    action_type: 'client',
                    action: 'test_event',
                    params: {}
                }
            ]
        },
        {
            id: 5,
            response: 'Please report it to our maintenance team immediately. We need to ensure a safe working environment.',
            options: [
                {
                    icon: 'fa-solid fa-arrow-left',
                    message: 'Back to previous options',
                    next_id: 1,
                    should_end: false
                },
                {
                    icon: 'fa-solid fa-door-open',
                    message: 'I will let them know. Thanks!',
                    next_id: null,
                    should_end: true,
                    action_type: 'client',
                    action: 'test_event',
                    params: {}
                }
            ]
        }
    ]
};

/*
$(document).ready(function() {
    const dialogue_manager = new DialogueManager();
    dialogue_manager.init(test_dialogue);
});
*/
