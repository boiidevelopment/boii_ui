/*
     ____   ____ _____ _____   _   _____  ________      ________ _      ____  _____  __  __ ______ _   _ _______ 
    |  _ \ / __ \_   _|_   _| | | |  __ \|  ____\ \    / /  ____| |    / __ \|  __ \|  \/  |  ____| \ | |__   __|
    | |_) | |  | || |   | |   | | | |  | | |__   \ \  / /| |__  | |   | |  | | |__) | \  / | |__  |  \| |  | |   
    |  _ <| |  | || |   | |   | | | |  | |  __|   \ \/ / |  __| | |   | |  | |  ___/| |\/| |  __| | . ` |  | |   
    | |_) | |__| || |_ _| |_  | | | |__| | |____   \  /  | |____| |___| |__| | |    | |  | | |____| |\  |  | |   
    |____/ \____/_____|_____| | | |_____/|______|   \/   |______|______\____/|_|    |_|  |_|______|_| \_|  |_|   
                              | |                                                                                
                              |_|               UI ELEMENTS
*/

class ContextManager {
    constructor() {
        this.default_style = { background: '#1f1e1e', border_size: '0px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', text_colour: '#b4b4b4', animation: '1s', box_shadow: '3px 5px 5px #0d0c0c, -4px -5px 6px #4dcbc2' };
        this.custom_style = {};
        this.data = null;
        this.position = { top: '150px', left: '1040px' };
        this.load_user_settings();
        $(document).ready(() => {
            $(document).keyup((e) => this.handle_exit(e));
        });
    }

    handle_exit(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    close(keep_focus) {
        $.post(`https://${GetParentResourceName()}/close_menu`, JSON.stringify({ keep_focus: keep_focus }));
        $('.context_container').remove();
    }

    init(data) {
        this.create_menu_container();
        this.build_menu(data);
    }

    load_user_settings() {
        const user_style = localStorage.getItem('custom_context_style');
        const position = localStorage.getItem('context_container_position');
        try {
            if (user_style) {
                this.custom_style = JSON.parse(user_style);
            } else {
                this.custom_style = this.default_style;
            }
            if (position) {
                this.position = JSON.parse(position);
            }
        } catch (e) {
            console.error("Error parsing custom context styles:", e);
        }
    }

    create_menu_container() {
        if ($('.context_container').length === 0) {
            const container = $('<div>').addClass('context_container').css({
                position: 'fixed',
                top: this.position.top,
                left: this.position.left,
                'align-items': this.alignment,
                'z-index': 1000
            });
            $('body').append(container);
        } else {
            $('.context_container').css({
                top: this.position.top,
                left: this.position.left,
                'align-items': this.alignment
            });
        }
    }

    build_menu(data) {
        if (data) {
            const styles = {
                'background-color': this.custom_style.background || this.default_style.background,
                'border': `${this.custom_style.border_size || this.default_style.border_size} ${this.custom_style.border_style || this.default_style.border_style} ${this.custom_style.border_colour || this.default_style.border_colour}`,
                'border-radius': this.custom_style.border_radius || this.default_style.border_radius,
                'color': this.custom_style.text_colour || this.default_style.text_colour,
                'box-shadow': this.custom_style.box_shadow || this.default_style.box_shadow
            };
            const context_menu = $('<div>').addClass('context_menu').css(styles);
            this.build_header(context_menu, data.header);
            this.build_options(context_menu, data.options);
            $('.context_container').html(context_menu);
        }
    }
    

    build_header(context_menu, header_data) {
        if (header_data) {
            const header = $('<div>').addClass('menu_header').css('color', `${this.custom_style.text_colour}`);
            if (header_data.image) {
                const header_image = $('<div>').addClass('menu_header_image').css('background-image', 'url(' + header_data.image + ')');
                header.append(header_image);
            }
            if (header_data.icon) {
                const header_icon = $('<i>').addClass(header_data.icon).css('margin-right', '10px');
                header.append(header_icon);
            }
            const header_text = $('<div>').addClass('menu_header_message');
            if (header_data.text) {
                header_text.text(header_data.text);
            }
            header.append(header_text);
            const header_message = $('<div>').addClass('menu_option_message');
            if (header_data.message) {
                if (Array.isArray(header_data.message)) {
                    header_data.message.forEach(line => {
                        const message_line = $('<div>').text(line);
                        header_message.append(message_line);
                    });
                } else {
                    const single_line_message = $('<div>').text(header_data.message);
                    header_message.append(single_line_message);
                }
            }
            header_text.append(header_message);
    
            context_menu.append(header);
        }
    }
    
    build_options(context_menu, options) {
        if (options) {
            const options_list = $('<ul>').addClass('menu_options');
            options.forEach((option) => {
                const option_item = $('<li>').addClass('menu_option');
                this.build_option(option_item, option);
                options_list.append(option_item);
            });
            context_menu.append(options_list);
        }
    }

    build_option(option_item, option) {
        option_item.css('color', this.custom_style.text_colour || this.default_style.text_colour);
        switch (option.type) {
            case 'regular': this.build_regular_option(option_item, option); break;
            case 'drop': this.build_dropdown_option(option_item, option); break;
            case 'input': this.build_input_option(option_item, option); break;
            case 'list': this.build_list_selector_option(option_item, option); break;
            case 'colour': this.build_colour_picker_option(option_item, option); break;
            case 'checklist': this.build_checklist_option(option_item, option); break;
            case 'slider': this.build_slider_option(option_item, option); break;
            case 'toggle': this.build_toggle_switch_option(option_item, option); break;
            default: break;
        }
    }

    build_regular_option(option_item, option, ignore = false) {
        const is_disabled = option.disabled || false;
        const is_non_interactable = option.interactable === false;
        const option_content = $('<div>').addClass('menu_option_content');
        if (option.header) {
            const option_header = $('<div>').addClass('menu_option_header').text(option.header);
            option_content.append(option_header);
            if (option.icon) {
                const option_icon = $('<i>').addClass(option.icon).css('margin-right', '10px');
                option_header.prepend(option_icon);
            }
            if (option.image) {
                const option_image = $('<div>').addClass('menu_option_image').css('background-image', 'url(' + option.image + ')');
                option_header.prepend(option_image);
            }
        }
        if (option.message) {
            const option_message = $('<div>').addClass('menu_option_message');
            if (Array.isArray(option.message)) {
                option.message.forEach(line => {
                    const line_div = $('<div>').text(line);
                    option_message.append(line_div);
                });
            } else {
                option_message.text(option.message);
            }
            option_content.append(option_message);
        }
        option_item.append(option_content);
        if (is_disabled) {
            option_item.addClass('disabled');
        } else if (is_non_interactable) {
            option_item.addClass('none_interact');
        } else if (!ignore && option.action_type && option.action) {
            option_item.children('.menu_option_content').on('click', (e) => {
                e.stopPropagation();
                this.trigger_event(option.action_type, option.action, option.params);
                if (option.should_close) {
                    this.close();
                }
            });
        }
    }
    
    build_dropdown_option(option_item, option) {
        this.build_regular_option(option_item, option, true);
        const submenu_list = $('<ul>').addClass('submenu').css('display', 'none');
        option.submenu.forEach(sub_option => {
            const submenu_item = $('<li>').addClass('submenu_option');
            this.build_regular_option(submenu_item, sub_option, true);
            if (!option_item.hasClass('disabled') && sub_option.action_type && sub_option.action) {
                submenu_item.children('.menu_option_content').on('click', (e) => {
                    e.stopPropagation();
                    this.trigger_event(sub_option.action_type, sub_option.action, sub_option.params);
                    if (sub_option.should_close) {
                        this.close();
                    }
                });
            }
            submenu_list.append(submenu_item);
        });
        option_item.append(submenu_list);
        option_item.children('.menu_option_content').on('click', function(e) {
            if (!$(this).parent().hasClass('disabled')) {
                e.stopPropagation();
                let is_sub_visible = submenu_list.is(':visible');
                $('.submenu').hide();
                submenu_list.css('display', is_sub_visible ? 'none' : 'block');
                $(this).parent().toggleClass('dropdown_wrapper', !is_sub_visible);
            }
        });
        
    }
    
    build_input_option(option_item, option) {
        const input_wrapper = $('<div>').addClass('input_wrapper');
        if (option.header) {
            const option_header = $('<div>').addClass('menu_option_header').text(option.header);
            input_wrapper.append(option_header);
            if (option.icon) {
                const option_icon = $('<i>').addClass(option.icon).css('margin-right', '10px');
                option_header.prepend(option_icon);
            }
            if (option.image) {
                const option_image = $('<div>').addClass('menu_option_image').css('background-image', 'url(' + option.image + ')');
                option_header.prepend(option_image);
            }
        }
        if (option.message) {
            const option_message = $('<div>').addClass('menu_option_message');
            if (Array.isArray(option.message)) {
                option.message.forEach(line => {
                    const line_div = $('<div>').text(line);
                    option_message.append(line_div);
                });
            } else {
                option_message.text(option.message);
            }
            input_wrapper.append(option_message);
        }
        if (option.fields) {
            if (option.fields.id) {
                const player_id_input = $('<input>').attr({type: 'text', placeholder: 'Player ID'}).addClass('player_id_input');
                input_wrapper.append(player_id_input);
            }
            if (option.fields.number) {
                const number_input = $('<input>').attr({type: 'number', placeholder: 'Enter number'}).addClass('main_input');
                input_wrapper.append(number_input);
            }
            if (option.fields.text) {
                const text_input = $('<input>').attr({type: 'text', placeholder: 'Enter text'}).addClass('main_input');
                input_wrapper.append(text_input);
            }
        }
        if (option.button) {
            const button = $('<button>').addClass('submit_button');
            if (option.button.icon) {
                const icon = $('<i>').addClass(option.button.icon);
                button.append(icon);
                if (option.button.text) {
                    icon.css('margin-right', '5px');
                }
            }
            if (option.button.text) {
                button.append(option.button.text);
            }
            if (!option_item.hasClass('disabled')) {
                button.on('click', () => {
                    const values = {};
                    input_wrapper.find('input').each(function() {
                        values[this.type] = $(this).val();
                    });
                    if (option.button.action_type && option.button.action) {
                        option.button.params.values = values;
                        this.trigger_event(option.button.action_type, option.button.action, option.button.params);
                    }
                });
            }
            input_wrapper.append(button);
        }
        option_item.addClass('input_menu_option');
        option_item.append(input_wrapper);
    }

    build_list_selector_option(option_item, option) {
        const content_wrapper = $('<div>').addClass('list_content_wrapper');
        const submit_button = $('<button>').addClass('submit_button');
        if (option.header) {
            const option_header = $('<div>').addClass('menu_option_header').text(option.header);
            content_wrapper.append(option_header);
            if (option.icon) {
                const option_icon = $('<i>').addClass(option.icon).css('margin-right', '10px');
                option_header.prepend(option_icon);
            }
            if (option.image) {
                const option_image = $('<div>').addClass('menu_option_image').css('background-image', 'url(' + option.image + ')');
                option_header.prepend(option_image);
            }
        }
        if (option.message) {
            const option_message = $('<div>').addClass('menu_option_message').text(option.message);
            content_wrapper.append(option_message);
        }
        const selector_wrapper = $('<div>').addClass('list_selector_wrapper');
        const chevron_left = $('<i>').addClass('chevron left fas fa-chevron-left');
        const chevron_right = $('<i>').addClass('chevron right fas fa-chevron-right');
        const value_display = $('<span>').addClass('value_display').text(option.options[0]);
        chevron_left.on('click', () => {
            const index = option.options.indexOf(value_display.text());
            const prev_index = (index - 1 + option.options.length) % option.options.length;
            value_display.text(option.options[prev_index]);
        });
        chevron_right.on('click', () => {
            const index = option.options.indexOf(value_display.text());
            const next_index = (index + 1) % option.options.length;
            value_display.text(option.options[next_index]);
        });
        selector_wrapper.append(chevron_left, value_display, chevron_right);
        if (option.button) {
            if (option.button.icon) {
                const icon = $('<i>').addClass(option.button.icon);
                submit_button.append(icon);
                if (option.button.text) {
                    icon.css('margin-right', '5px');
                }
            }
            if (option.button.text) {
                submit_button.append(option.button.text);
            }
            if (!option_item.hasClass('disabled')) {
                submit_button.on('click', () => {
                    const selectedValue = value_display.text();
                    if (option.button.action_type && option.button.action) {
                        this.trigger_event(option.button.action_type, option.button.action, { selectedValue });
                    }
                });
            }
        }
        const main_wrapper = $('<div>').addClass('list_main_wrapper').css('flex-direction', 'column');
        main_wrapper.append(content_wrapper, selector_wrapper, submit_button);
        option_item.append(main_wrapper);
    }
    
    build_colour_picker_option(option_item, option) {
        const content_wrapper = $('<div>').addClass('color_content_wrapper');
        const submit_button = $('<button>').addClass('submit_button');
        if (option.header) {
            const option_header = $('<div>').addClass('menu_option_header').text(option.header);
            content_wrapper.append(option_header);
            if (option.icon) {
                const option_icon = $('<i>').addClass(option.icon).css('margin-right', '10px');
                option_header.prepend(option_icon);
            }
            if (option.image) {
                const option_image = $('<div>').addClass('menu_option_image').css('background-image', 'url(' + option.image + ')');
                option_header.prepend(option_image);
            }
        }
        if (option.message) {
            const option_message = $('<div>').addClass('menu_option_message').text(option.message);
            content_wrapper.append(option_message);
        }
        const picker_wrapper = $('<div>').addClass('color_picker_wrapper');
        const color_input = $('<input>').attr({type: 'color', value: '#ffffff'}).addClass('color_input');
        picker_wrapper.append(color_input);
        if (option.button) {
            if (option.button.icon) {
                const icon = $('<i>').addClass(option.button.icon);
                submit_button.append(icon);
                if (option.button.text) {
                    icon.css('margin-right', '5px');
                }
            }
            if (option.button.text) {
                submit_button.append(option.button.text);
            }
            if (!option_item.hasClass('disabled')) {
                submit_button.on('click', () => {
                    const selected_colour = color_input.val();
                    if (option.button.action_type && option.button.action) {
                        this.trigger_event(option.button.action_type, option.button.action, { selected_colour });
                    }
                });
            }
        }
        const main_wrapper = $('<div>').addClass('color_main_wrapper').css('flex-direction', 'column');
        main_wrapper.append(content_wrapper, picker_wrapper, submit_button);
        option_item.append(main_wrapper);
    }
    
    build_checklist_option(option_item, option) {
        const wrapper = $('<div>').addClass('checklist_wrapper');
        if (option.header) {
            const option_header = $('<div>').addClass('menu_option_header').text(option.header);
            wrapper.append(option_header);
            if (option.icon) {
                const option_icon = $('<i>').addClass(option.icon).css('margin-right', '10px');
                option_header.prepend(option_icon);
            }
            if (option.image) {
                const option_image = $('<div>').addClass('menu_option_image').css('background-image', 'url(' + option.image + ')');
                option_header.prepend(option_image);
            }
        }
        if (option.message) {
            const message = $('<div>').addClass('menu_option_message').text(option.message);
            wrapper.append(message);
        }
        const checklist = $('<ul>').addClass('checklist');
        option.items.forEach(item => {
            const list_item = $('<li>').addClass('option_container').attr('data-value', item.value);
            const checkbox_icon = $('<i>').addClass('far fa-check-square checkmark');
            list_item.on('click', function() {
                $(this).toggleClass('selected');
                checkbox_icon.toggleClass('fas far');
            });
    
            const label = $('<span>').addClass('option_label').text(item.label);
            list_item.append(checkbox_icon).append(label);
            checklist.append(list_item);
        });
        wrapper.append(checklist);
        if (option.button) {
            const submit_button = $('<button>').addClass('submit_button');
            if (option.button.icon) {
                const icon = $('<i>').addClass(option.button.icon);
                submit_button.append(icon);
                if (option.button.text) {
                    icon.css('margin-right', '5px');
                }
            }
            if (option.button.text) {
                submit_button.append(option.button.text);
            }
            if (!option_item.hasClass('disabled')) {
                submit_button.on('click', () => {
                    const selected_items = checklist.find('.selected').map(function() {
                        return $(this).data('value');
                    }).get();
                    if (option.button.action_type && option.button.action) {
                        this.trigger_event(option.button.action_type, option.button.action, { selected_items });
                    }
                });
            }
            wrapper.append(submit_button);
        }
        option_item.append(wrapper);
    }
    
    build_slider_option(option_item, option) {
        const wrapper = $('<div>').addClass('slider_wrapper');
        if (option.header) {
            const option_header = $('<div>').addClass('menu_option_header').text(option.header);
            wrapper.append(option_header);
            if (option.icon) {
                const option_icon = $('<i>').addClass(option.icon).css('margin-right', '10px');
                option_header.prepend(option_icon);
            }
            if (option.image) {
                const option_image = $('<div>').addClass('menu_option_image').css('background-image', 'url(' + option.image + ')');
                option_header.prepend(option_image);
            }
        }
        if (option.message) {
            const message = $('<div>').addClass('menu_option_message').text(option.message);
            wrapper.append(message);
        }
        option.sliders.forEach(slider => {
            const slider_container = $('<div>').addClass('slider_container');
            const label_min = $('<span>').addClass('slider_label min').text(slider.min || 0);
            const label_max = $('<span>').addClass('slider_label max').text(slider.max || 100);
            const slider_input = $('<input>').attr({
                type: 'range',
                min: slider.min || 0,
                max: slider.max || 100,
                value: slider.default || 50
            }).addClass('slider_input');

            const slider_value = $('<span>').addClass('slider_value').text(slider.default || 50);

            slider_input.on('input change', function() {
                slider_value.text($(this).val());
            });

            const slider_value_container = $('<div>').addClass('slider_value_container').append(slider_value);

            slider_container.append(label_min, slider_input, label_max);
            wrapper.append(slider_container);
            wrapper.append(slider_value_container);
        });
        if (option.button) {
            const submit_button = $('<button>').addClass('submit_button');
            if (option.button.icon) {
                const icon = $('<i>').addClass(option.button.icon);
                submit_button.append(icon);
                if (option.button.text) {
                    icon.css('margin-right', '5px');
                }
            }
            if (option.button.text) {
                submit_button.append(option.button.text);
            }
            if (!option_item.hasClass('disabled')) {
                submit_button.on('click', () => {
                    const slider_values = wrapper.find('.slider_input').map(function() {
                        return $(this).val();
                    }).get();
                    if (option.button.action_type && option.button.action) {
                        this.trigger_event(option.button.action_type, option.button.action, { slider_values });
                    }
                });
            }
            wrapper.append(submit_button);
        }
        option_item.append(wrapper);
    }
    
    build_toggle_switch_option(option_item, option) {
        const wrapper = $('<div>').addClass('toggle_switch_wrapper');
        if (option.header) {
            const option_header = $('<div>').addClass('menu_option_header').text(option.header);
            wrapper.append(option_header);
            if (option.icon) {
                const option_icon = $('<i>').addClass(option.icon).css('margin-right', '10px');
                option_header.prepend(option_icon);
            }
            if (option.image) {
                const option_image = $('<div>').addClass('menu_option_image').css('background-image', 'url(' + option.image + ')');
                option_header.prepend(option_image);
            }
        }
        if (option.message) {
            const message = $('<div>').addClass('menu_option_message').text(option.message);
            wrapper.append(message);
        }
        option.toggles.forEach(toggle => {
            const toggle_container = $('<div>').addClass('toggle_container');
            if (toggle.label) {
                const label = $('<div>').addClass('toggle_label').text(toggle.label);
                toggle_container.append(label);
            }
            const switch_label = $('<label>').addClass('switch');
            const switch_input = $('<input>').attr({ type: 'checkbox', checked: toggle.checked || false });
            const slider_span = $('<span>').addClass('slider round');
            switch_label.append(switch_input, slider_span);
            toggle_container.append(switch_label);
            if (!option_item.hasClass('disabled')) {
                switch_input.on('change', () => {
                    const is_checked = switch_input.is(':checked');
                    if (toggle.action_type && toggle.action) {
                        this.trigger_event(toggle.action_type, toggle.action, { is_checked, ...toggle.params });
                    }
                });
            }
            wrapper.append(toggle_container);
        });
        option_item.append(wrapper);
    }
    
    trigger_event(action_type, action, params) {
        $.post(`https://${GetParentResourceName()}/trigger_event`, JSON.stringify({
            action_type: action_type,
            action: action,
            params: params
        }));
    }
    
    build_dummy(data) {
        const border_style = `${this.custom_style.border_size} ${this.custom_style.border_style} ${this.custom_style.border_colour}` || `${this.default_style.border_size} ${this.default_style.border_style} ${this.default_style.border_colour}`;
        const styles = {
            'background-color': this.custom_style.background || this.default_style.background,
            'border': border_style,
            'border-radius': this.custom_style.border_radius || this.default_style.border_radius,
            'color': this.custom_style.colour || this.default_style.colour,
            'box-shadow': this.custom_style.box_shadow || this.default_style.box_shadow
        };
        let context_html = $('<div>').addClass('context_menu').css(styles);
        this.build_header(context_html, data.header);
        if (data.options) {
            const options_list = $('<ul>').addClass('menu_options');
            data.options.forEach((option) => {
                const option_item = $('<li>').addClass('menu_option disabled');
                this.build_option(option_item, option);
                options_list.append(option_item);
            });
            context_html.append(options_list);
        }
        return context_html;
    }
}

// DO NOT REMOVE THIS TEST DATA THIS IS USED BY THE SETTINGS UI PAGE TO CREATE THE DUMMY MENU
const test_menu = {
    header: {
        text: 'Example Header',
        message: ['test', 'test2'],
        icon: 'fa-solid fa-bell',
        image: '/html/assets/images/logo.png',
    },
    options: [
        {
            type: 'regular',
            header: 'Example Menu Item',
            icon: 'fa-solid fa-car',
            image: '/html/assets/images/water.png',
            message: 'This is an example standard menu item',
            action_type: 'client_event',
            action: 'testevent',
            params: {},
            should_close: true,
        },
        {
            type: 'drop',
            header: 'Example Drop Down Item',
            icon: 'fa-solid fa-car',
            image: '/html/assets/images/burger.png',
            message: 'This is an example drop down menu item',
            submenu: [
                {
                    header: 'Example Sub Header',
                    message: 'This is an example sub menu item',
                    action_type: 'client_event',
                    action: 'testevent',
                    params: {},
                },
                {
                    header: 'Example Sub Header 2',
                    message: 'This is an example sub menu item 2',
                    action_type: 'client_event',
                    action: 'testevent',
                    params: {},
                }
            ]   
        },
        {
            type: 'input',
            input_type: 'number',
            header: 'Example Input Item',
            icon: 'fa-solid fa-house',
            message: 'This is an example input menu item',
            fields: {
                id: true,
                number: false,
                text: true
            },
            button: {
                text: 'Submit',
                icon: 'fa-solid fa-plus',
                action_type: 'client_event',
                action: 'boii_ui:cl:input_test_event',
                params: {}
            },
        },
        {
            type: 'list',
            header: 'Example List Selector',
            icon: 'fa-solid fa-house',
            message: 'This is an example input menu item',
            options: ['Option 1', 'Option 2', 'Option 3'],
            button: {
                text: 'Submit',
                icon: 'fa-solid fa-plus',
                action_type: 'client_event',
                action: 'boii_ui:cl:input_test_event',
                params: {}
            },
        },
        {
            type: 'colour',
            header: 'Example Colour Picker',
            icon: 'fa-solid fa-car',
            message: 'This is an example colour picker',
            params: {},
            button: {
                text: 'Submit',
                icon: 'fa-solid fa-plus',
                action_type: 'client_event',
                action: 'confirmColor',
                params: {}
            },
        },
        {
            type: 'checklist',
            header: 'Example Checklist',
            icon: 'fa-solid fa-car',
            message: 'This is an example checklist',
            items: [
                { id: 'item1', value: 'item1', label: 'Example Item 1' },
                { id: 'item2', value: 'item2', label: 'Example Item 2' },
            ],
            button: {
                text: 'Submit',
                icon: 'fa-solid fa-plus',
                action_type: 'client_event',
                action: 'confirmColor',
                params: {}
            },
        },
        {
            type: 'slider',
            header: 'Example Sliders',
            icon: 'fa-solid fa-car',
            message: 'This is an example slider item',
            sliders: [
                { min: 0, max: 100, default: 50 },
                { min: 0, max: 200, default: 100 }
            ],
            button: {
                text: 'Submit',
                icon: 'fa-solid fa-plus',
                action_type: 'client_event',
                action: 'confirmColor',
                params: {}
            },
        },
        {
            type: 'toggle',
            header: 'Example Toggle Switches',
            icon: 'fa-solid fa-car',
            message: 'This is an example toggle switch item',
            toggles: [
                { 
                    label: 'Toggle 1',
                    checked: true,
                    action_type: 'client_event',
                    action: 'toggleEvent1',
                    params: {}
                },
                { 
                    label: 'Toggle 2',
                    checked: false,
                    action_type: 'client_event',
                    action: 'toggleEvent2',
                    params: {}
                }
            ]
        }
    ]
};

/*
$(document).ready(function() {
    const context_menu = new ContextManager();
    context_menu.init(test_menu);
});
*/
