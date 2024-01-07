class Settings {
    constructor() {
        this.settings = {
            dark_mode: false,
            languages: ['de', 'en', 'es', 'fr', 'hi', 'it', 'ja', 'nl', 'pl', 'pt', 'zh'],
            language: 'en',
            notification: notification_styles,
            notifications_enabled: true,
            notification_dummy: 'system',
            notification_alignment: 'left',
            notification_container_position: { top: '10px', left: '1585px' },
            draw_text: { background: '#1f1e1e', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', colour: '#b4b4b4', animation: '1s' },
            draw_text_alignment: 'left',
            draw_text_container_position: { top: '500px', left: '10px' },
            progress_container_position: { top: '850px', left: '540px' },
            progress: { background: '#1f1e1e', bar_background: '#ffffff', bar_fill: '#4dcbc2', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', colour: '#b4b4b4', animation: '1s' },
            context_container_position: { top: '150px', left: '1040px' },
            context: { background: '#1f1e1e', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', colour: '#b4b4b4', animation: '1s' },
            dialogue: { background: '#1f1e1e', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', colour: '#b4b4b4', animation: '1s', vignette_colour: '#000000' }
        };

        this.app_translations = { current: {} };

        $(document).ready(() => {
            $(document).keyup((e) => this.handle_exit(e));
        });
    }

    handle_exit(e) {
        if (e.key === "Escape" || e.key === "Backspace") {
            this.close();
        }
    }

    close() {
        $('#main_container').empty();
        $.post(`https://${GetParentResourceName()}/close_settings`, JSON.stringify({}));
    }

    load_translations(language, callback) {
        $.getJSON(`/html/scripts/json/languages/${language}.json`, (translations) => {
            this.app_translations.current = this.flatten_translations(translations);
            this.apply_translations();
            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    flatten_translations(translations) {
        let flattened = {};
        for (let category in translations) {
            if (translations.hasOwnProperty(category)) {
                Object.assign(flattened, translations[category][0]);
            }
        }
        return flattened;
    }
    
    apply_translations() {
        const translations = this.app_translations.current;
        $('[data-translate]').each(function() {
            const key = $(this).data('translate');
            $(this).text(translations[key] || $(this).text());
        });
    }

    load_settings() {
        Object.keys(this.settings).forEach(setting => {
            const local_storage_value = localStorage.getItem(setting);
            if (local_storage_value !== null) {
                try {
                    this.settings[setting] = JSON.parse(local_storage_value) || local_storage_value;
                } catch (e) {
                    this.settings[setting] = local_storage_value;
                }
            }
            const custom_style_key = `custom_${setting}_style`;
            const user_custom_style = localStorage.getItem(custom_style_key);
            if (user_custom_style) {
                try {
                    this.settings[setting] = JSON.parse(user_custom_style);
                } catch (e) {
                    console.error(`Error parsing custom style for ${setting}:`, e);
                }
            }
        });
    }
    
    update_setting(setting_key, value) {
        this.settings[setting_key] = value;
        localStorage.setItem(setting_key, (typeof value === 'object') ? JSON.stringify(value) : value);
        if (setting_key === 'dark_mode') {
            this.apply_theme(value ? 'dark_theme' : 'light_theme');
        } else if (setting_key === 'notification_dummy') {
            this.update_preview_notification(value);
        }
    }

    apply_theme(theme) {
        $('body').removeClass('light_theme dark_theme').addClass(theme);
    }

    apply_positions() {
        this.apply_container_position('.notification_container', this.settings.notification_container_position, this.settings.notification_alignment);
        this.apply_container_position('.draw_text_container', this.settings.draw_text_container_position, this.settings.draw_text_alignment);
        this.apply_container_position('.progress_container', this.settings.progress_container_position);
        this.apply_container_position('.context_container', this.settings.context_container_position);
    }

    get_alignment_value(alignment) {
        switch (alignment) {
            case 'left': return 'flex-start';
            case 'center': return 'center';
            case 'right': return 'flex-end';
            default: return 'flex-start';
        }
    }

    apply_container_position(selector, position, alignment = null) {
        let container = $(selector);
        if (container.length === 0) {
            container = $('<div>').addClass(selector.substring(1));
            $('#main_container').append(container);
        }
        let css_properties = { 'top': position.top, 'left': position.left };
        if (alignment) {
            css_properties['align-items'] = this.get_alignment_value(alignment);
        }
        container.css(css_properties);
    }

    build_ui() {
        const dark_mode_checked = this.settings.dark_mode ? 'checked' : '';
        let language_options = this.settings.languages.map(code => `<option value="${code}" ${this.settings.language === code ? 'selected' : ''}>${code.toUpperCase()}</option>`).join('');
        const content = `
            <div class="tablet_container">
                <div class="volume_buttons">
                    <div class="volume_btn"></div>
                    <div class="volume_btn"></div>
                </div>
                <div class="power_btn"></div>
                <div class="front_cam"></div>
                <div class="tablet_screen">
                    <div class="settings_app">
                        <div class="settings_sidebar">
                            <div class="sidebar_header"><h3 data-translate="settings">Settings</h3></div>
                            <div class="menu_container">
                                <div class="menu_group">
                                    <div class="menu_item disabled">
                                        <i class="fas fa-moon icon icon_dark_mode"></i>
                                        <span class="menu_label">
                                            <span data-translate="dark_mode">Dark Mode</span>
                                            <label class="toggle_switch">
                                                <input type="checkbox" id="dark_mode_toggle" ${dark_mode_checked}>
                                                <span class="toggle_slider round"></span>
                                            </label>
                                        </span>
                                    </div>
                                    <div class="menu_item disabled">
                                        <i class="fas fa-language icon icon_language"></i>
                                        <span class="menu_label">
                                            <span data-translate="language">Language</span>
                                            <select id="language_select" class="style_selector">
                                                ${language_options}
                                            </select>
                                        </span>
                                    </div>
                                </div>
                                <div class="menu_group">
                                    <div class="menu_item" data-type="context">
                                        <i class="fas fa-table-columns icon icon_context"></i>
                                        <span class="menu_label" data-translate="context">Context Menu</span>
                                    </div>
                                    <div class="menu_item" data-type="dialogue">
                                        <i class="fas fa-comment icon icon_dialogue"></i>
                                        <span class="menu_label" data-translate="dialogue">Dialogue</span>
                                    </div>
                                    <div class="menu_item" data-type="draw_text">
                                        <i class="fas fa-font icon icon_draw_text"></i>
                                        <span class="menu_label" data-translate="draw_text">Draw Text</span>
                                    </div>
                                    <div class="menu_item" data-type="notifications">
                                        <i class="fas fa-check icon icon_notifications"></i>
                                        <span class="menu_label" data-translate="notifications">Notifications</span>
                                    </div>
                                    <div class="menu_item" data-type="progressbar">
                                        <i class="fas fa-bars-progress icon icon_progressbar"></i>
                                        <span class="menu_label" data-translate="progressbar">Progress Bar</span>
                                    </div>
                                </div>
                                <div class="menu_group">
                                    <div class="menu_item" data-type="close">
                                        <i class="fas fa-power-off icon icon_close"></i>
                                        <span class="menu_label" data-translate="close">Close</span>
                                    </div>
                                </div>
                                <div class="menu_group">
                                    <div class="menu_item" data-type="erase_reset">
                                        <i class="fas fa-trash-can icon icon_erase_reset"></i>
                                        <span class="menu_label" data-translate="erase_reset">Erase & Reset</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="settings_content">
                            <div class="content_header"><h3></h3></div>
                            <!-- Additional content can be added here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('#main_container').html(content);
        this.build_menu_listeners();
    }

    build_menu_listeners() {
        $(document).on('click', '.menu_item', (e) => {
            if ($(e.currentTarget).hasClass('disabled')) {
                return;
            }
            $('.menu_item').removeClass('active');
            $(e.currentTarget).addClass('active');
            let settings_section = $(e.currentTarget).data('type');
            $('.content_header h3').text($(e.currentTarget).find('.menu_label').text().trim());
            switch(settings_section) {
                case 'notifications' : this.generate_notifications_settings(); break;
                case 'draw_text' : this.generate_draw_text_settings(); break;
                case 'progressbar' : this.generate_progress_settings(); break;
                case 'context' : this.generate_context_settings(); break;
                case 'dialogue' : this.generate_dialogue_settings(); break;
                case 'close' : this.close(); break;
                case 'erase_reset' : this.erase_and_reset_settings(); break;
                default : break;
            }
            this.load_translations(this.settings.language, () => {
                this.apply_settings_to_ui();
            });
        });
    }

    apply_settings_to_ui() {
        $('#settings_enable_notifications_toggle').prop('checked', this.settings.notifications_enabled);
        $(`input[name="notification_dummy"][data-value="${this.settings.notification_dummy}"]`).prop('checked', true);
    }

    attach_event_listeners() {
        $('#dark_mode_toggle').on('change', (e) => {
            this.update_setting('dark_mode', e.target.checked);
        });

        $('#language_select').on('change', (e) => {
            const selected = e.target.value;
            this.update_setting('language', selected);
            this.load_translations(selected);
        });
    }

    init() {
        this.load_settings();
        this.apply_positions();
        this.apply_theme(this.settings.dark_mode ? 'dark_theme' : 'light_theme');
        this.build_ui();
        this.attach_event_listeners();
        this.load_translations(this.settings.language, () => {
            this.apply_settings_to_ui();
        });
    }

    clear_settings() {
        const settings_keys = [
            'dark_mode', 'language', 'notifications_enabled', 'notification_dummy',
            'notification_alignment', 'notification_container_position', 'draw_text_alignment',
            'draw_text_container_position', 'progress_container_position', 'context_container_position',
            'custom_notification_style', 'custom_draw_text_style',
            'custom_progress_style', 'custom_context_style', 'custom_dialogue_style'
        ];
        settings_keys.forEach(key => localStorage.removeItem(key));
        this.reset_to_defaults();
    }
    
    reset_to_defaults() {
        this.settings = {
            dark_mode: false,
            languages: ['de', 'en', 'es', 'fr', 'hi', 'it', 'ja', 'nl', 'pl', 'pt', 'zh'],
            language: 'en',
            notification: notification_styles,
            notifications_enabled: true,
            notification_dummy: 'system',
            notification_alignment: 'left',
            notification_container_position: { top: '10px', left: '1585px' },
            draw_text: { background: '#1f1e1e', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', colour: '#b4b4b4', animation: '1s' },
            draw_text_alignment: 'left',
            draw_text_container_position: { top: '500px', left: '10px' },
            progress_container_position: { top: '850px', left: '540px' },
            progress: { background: '#1f1e1e', bar_background: '#ffffff', bar_fill: '#4dcbc2', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', colour: '#b4b4b4', animation: '1s' },
            context_container_position: { top: '150px', left: '1040px' },
            context: { background: '#1f1e1e', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', colour: '#b4b4b4', animation: '1s' },
            dialogue: { background: '#1f1e1e', border_size: '3px', border_style: 'solid', border_colour: '#b4b4b4', border_radius: '15px', colour: '#b4b4b4', animation: '1s' }
        };
        this.init();
    }

    erase_and_reset_settings() {
        const content = `
            <div class="content_header"><h3 data-translate="erase_reset">Erase & Reset</h3></div>
            <div class="confirmation_container">
                <div class="content_group">
                    ${this.create_settings_button("erase", "confirm_reset", "fa-solid fa-plus", false)}
                </div>
                <div class="confirmation_message" data-translate="confirmation_message">
                    Clicking the button above will erase any customised styles you have created and everything will be reset back to default. Please be aware this action is permanent, staff cannot reverse this for you.
                </div>
            </div>
        `;
        $('.settings_content').html(content);
        $(document).on('click', '#confirm_reset', () => {
            this.clear_settings();
        });
    }

    create_toggle(label, id, checked, hidden = false, name) {
        const hidden_class = hidden ? 'hidden' : '';
        const ele_name = name || ''
        return `
            <div class="content_item ${hidden_class}">
                <span class="menu_label">
                    <span data-translate="${label}">${label}</span>
                    <label class="toggle_switch">
                        <input type="checkbox" id="${id}" name="${ele_name}" data-value="${label}" ${checked ? 'checked' : ''}>
                        <span class="toggle_slider round"></span>
                    </label>
                </span>
            </div>
        `;
    }

    create_color_picker(label, id, color, hidden = false) {
        const hidden_class = hidden ? 'hidden' : '';
        return `
            <div class="content_item ${hidden_class}">
                <span class="menu_label">
                    <span data-translate="${label}">${label}</span>
                    <div class="colour_picker_wrapper">
                        <div class="colour_display" id="${id}_display" style="background-color: ${color};"></div>
                        <input type="color" id="${id}" class="colour_input" value="${color}">
                    </div>
                </span>
            </div>
        `;
    }

    create_number_input(label, id, value, min, max, step, hidden = false) {
        const hidden_class = hidden ? 'hidden' : '';
        return `
            <div class="content_item ${hidden_class}">
                <span class="menu_label">
                    <span data-translate="${label}">${label}</span>
                    <input type="number" id="${id}" value="${value}" min="${min}" max="${max}" step="${step}">
                </span>
            </div>
        `;
    }

    create_settings_button(label, id, icon, hidden = false) {
        const hidden_class = hidden ? 'hidden' : '';
        return `
            <div class="content_item ${hidden_class}">
                <span class="menu_label">
                    <span data-translate="${label}">${label}</span>
                    <button class="settings_button" id="${id}"><i class="${icon}"></i></button>
                </span>
            </div>
        `;
    }

    create_drop_down(label) {
        return `
            <div class="content_item">
                <span class="menu_label hidden_children">
                    <span data-translate="${label}">${label}</span>
                    <label>
                        <i class="fa-solid fa-chevron-right settings_chevron"></i>
                    </label>
                </span>
            </div>
        `;
    }

    create_border_style_dropdown(label, id, current_style, hidden = false) {
        const hidden_class = hidden ? 'hidden' : '';
        return `
            <div class="content_item ${hidden_class}">
                <span class="menu_label">
                    <span data-translate="${label}">${label}</span>
                    <select id="${id}" class="style_selector">
                        <option value="solid" ${current_style === 'solid' ? 'selected' : ''}>Solid</option>
                        <option value="dotted" ${current_style === 'dotted' ? 'selected' : ''}>Dotted</option>
                        <option value="dashed" ${current_style === 'dashed' ? 'selected' : ''}>Dashed</option>
                        <option value="double" ${current_style === 'double' ? 'selected' : ''}>Double</option>
                        <option value="groove" ${current_style === 'groove' ? 'selected' : ''}>Groove</option>
                        <option value="ridge" ${current_style === 'ridge' ? 'selected' : ''}>Ridge</option>
                        <option value="inset" ${current_style === 'inset' ? 'selected' : ''}>Inset</option>
                        <option value="outset" ${current_style === 'outset' ? 'selected' : ''}>Outset</option>
                        <option value="none" ${current_style === 'none' ? 'selected' : ''}>None</option>
                        <option value="hidden" ${current_style === 'hidden' ? 'selected' : ''}>Hidden</option>
                    </select>
                </span>
            </div>
        `;
    }

    init_chevrons() {
        $('.settings_chevron').on('click', function() {
            $(this).closest('.content_item').nextAll().toggleClass('hidden');
            $(this).toggleClass('fa-chevron-right fa-chevron-down');
        });
    }
    
    hide_dummy(container_selector) {
        $(container_selector).css('background-color', 'transparent').empty();
    }
    
    apply_customizations(options, settings) {
        if (options && options.class) {
            let selector = `.${options.class}`;
            let style_data = this.settings[options.class];
            if (options.type) {
                selector += `.${options.type}`;
                style_data = style_data[options.type].style;
            }
            $(selector).each(function() {
                if (settings.background) {
                    $(this).css('background-color', settings.background);
                }
                if (settings.text_colour) {
                    $(this).css('color', settings.text_colour);
                }
                if (settings.border_size && settings.border_style && settings.border_colour) {
                    $(this).css('border', `${settings.border_size} ${settings.border_style} ${settings.border_colour}`);
                }
                if (settings.border_radius) {
                    $(this).css('border-radius', settings.border_radius);
                }
                if (settings.animation_duration) {
                    $(this).css('animation', `fade ${settings.animation_duration}`);
                }
            });
            Object.assign(style_data, settings);
            if (options.local_data) {
                if (options.class === 'notification') {
                    this.update_setting('custom_notification_style', JSON.stringify(options.local_data), true);
                } else if (options.class === 'draw_text') {
                    this.update_setting('custom_draw_text_style', JSON.stringify(options.local_data), true);
                } else if (options.class === 'dialogue') {
                    this.update_setting('custom_dialogue_style', JSON.stringify(options.local_data), true);
                } else if (options.class === 'progress') {
                    this.update_setting('custom_progress_style', JSON.stringify(options.local_data), true);
                } else if (options.class === 'context') {
                    this.update_setting('custom_context_style', JSON.stringify(options.local_data), true);
                }
            }
        }
    }
    
    attach_settings_listeners() {
        $(document).on('click', '#save_context_customization', () => {
            const border_size = $('#border_size_input').val() + 'px';
            const border_style = $('#border_style_input').val();
            const border_colour = $('#border_colour_input').val();
            const border_radius = $('#border_radius_input').val() + 'px';
            const bg_colour = $('#background_colour_input').val();
            const text_colour = $('#text_colour_input').val();
            const anim_duration = $('#animation_duration_input').val() + 's';
            this.apply_customizations({
                class: 'context',
                local_data: this.settings.context
            }, {
                background: bg_colour,
                text_colour: text_colour,
                border_size: border_size,
                border_style: border_style,
                border_colour: border_colour,
                border_radius: border_radius,
                animation_duration: anim_duration
            });
            this.update_preview_context();
        });

        $(document).on('click', '#reset_context_customization', () => { this.reset_context_customization() });

        $(document).on('click', '#save_dialogue_customization', () => {
            const border_size = $('#border_size_input').val() + 'px';
            const border_style = $('#border_style_input').val();
            const border_colour = $('#border_colour_input').val();
            const border_radius = $('#border_radius_input').val() + 'px';
            const bg_colour = $('#background_colour_input').val();
            const text_colour = $('#text_colour_input').val();
            const vignette_colour = $('#vignette_colour_input').val();
            const anim_duration = $('#animation_duration_input').val() + 's';
            this.apply_customizations({
                class: 'dialogue',
                local_data: this.settings.dialogue
            }, {
                background: bg_colour,
                text_colour: text_colour,
                border_size: border_size,
                border_style: border_style,
                border_colour: border_colour,
                border_radius: border_radius,
                animation_duration: anim_duration,
                vignette_colour: vignette_colour
            });
            this.update_preview_dialogue();
        });

        $(document).on('click', '#reset_dialogue_customization', () => { this.reset_dialogue_customization() });

        $(document).on('change', '#settings_enable_notifications_toggle', (e) => {
            this.update_setting('notifications_enabled', e.target.checked);
        });

        $(document).on('change', 'input[name="notification_dummy"]', (e) => {
            let type = $(e.currentTarget).data('value');
            this.settings.notification_dummy = type;
            this.update_setting('notification_dummy', type);
            this.update_preview_notification(type);
            $('input[name="notification_dummy"]').not(e.currentTarget).prop('checked', false);
        });

        $(document).on('change', 'input[name="notification_alignment"]', (e) => {
            let alignment = $(e.currentTarget).data('value');
            this.settings.notification_alignment = alignment;
            this.update_setting('notification_alignment', alignment);
            this.apply_container_position('.notification_container', this.settings.notification_container_position, alignment);
            $('input[name="notification_alignment"]').not(e.currentTarget).prop('checked', false);
        });
        
        $(document).on('click', '#save_notification_customization', () => {
            const border_size = $('#border_size_input').val() + 'px';
            const border_style = $('#border_style_input').val();
            const border_colour = $('#border_colour_input').val();
            const border_radius = $('#border_radius_input').val() + 'px';
            const bg_colour = $('#background_colour_input').val();
            const text_colour = $('#text_colour_input').val();
            const anim_duration = $('#animation_duration_input').val() + 's';
            this.apply_customizations({
                class: 'notification',
                type: this.settings.notification_dummy,
                local_data: this.settings.notification
            }, {
                background: bg_colour,
                text_colour: text_colour,
                border_size: border_size,
                border_style: border_style,
                border_colour: border_colour,
                border_radius: border_radius,
                animation_duration: anim_duration
            });
            this.update_preview_notification(this.settings.notification_dummy);
        });
        
        $(document).on('click', '#reset_notification_customization', () => { this.reset_notification_customization(this.notification_dummy) });

        $(document).on('click', 'input[name="draw_text_alignment"]', (e) => {
            $('input[name="draw_text_alignment"]').prop('checked', false);
            $(e.currentTarget).prop('checked', true);
            let type = $(e.currentTarget).data('value');
            this.draw_text_alignment = type;
            this.update_setting('draw_text_alignment', type);
            this.show_dummy_draw_text();
        });
        
        
        $(document).on('click', '#save_draw_text_customization', () => {
            const border_size = $('#border_size_input').val() + 'px';
            const border_style = $('#border_style_input').val();
            const border_colour = $('#border_colour_input').val();
            const border_radius = $('#border_radius_input').val() + 'px';
            const bg_colour = $('#background_colour_input').val();
            const text_colour = $('#text_colour_input').val();
            const anim_duration = $('#animation_duration_input').val() + 's';
            this.apply_customizations({
                class: 'draw_text',
                local_data: this.settings.draw_text
            }, {
                background: bg_colour,
                text_colour: text_colour,
                border_size: border_size,
                border_style: border_style,
                border_colour: border_colour,
                border_radius: border_radius,
                animation_duration: anim_duration
            });
            this.update_preview_draw_text();
        });

        $(document).on('click', '#reset_draw_text_customization', () => { this.reset_draw_text_customization() });

        $(document).on('click', '#save_progress_customization', () => {
            const border_size = $('#border_size_input').val() + 'px';
            const border_style = $('#border_style_input').val();
            const border_colour = $('#border_colour_input').val();
            const border_radius = $('#border_radius_input').val() + 'px';
            const bg_colour = $('#background_colour_input').val();
            const text_colour = $('#text_colour_input').val();
            const anim_duration = $('#animation_duration_input').val() + 's';
            const bar_bg_colour = $('#bar_bg_colour_input').val();
            const bar_fill_colour = $('#bar_fill_colour_input').val();
            this.apply_customizations({
                class: 'progress',
                local_data: this.settings.progress
            }, {
                background: bg_colour,
                text_colour: text_colour,
                bar_background: bar_bg_colour,
                bar_fill: bar_fill_colour,
                border_size: border_size,
                border_style: border_style,
                border_colour: border_colour,
                border_radius: border_radius,
                animation_duration: anim_duration
            });
            this.update_preview_progress();
        });

        $(document).on('click', '#reset_progress_customization', () => { this.reset_progress_customization() });
    }

    update_preview_context() {
        const context_menu = new ContextManager();
        const context = context_menu.build_dummy(test_menu);
        $('.context_preview').html(context);
    }

    toggle_context_movement() {
        const is_movable = $('.context_container').hasClass('movable');
        if (is_movable) {
            $('.context_container').removeClass('movable').draggable('destroy');
            this.hide_dummy('.context_container');
        } else {
            this.show_dummy_context();
            $('.context_container').addClass('movable').draggable({
                stop: (event, ui) => {
                    const position = { top: ui.position.top, left: ui.position.left };
                    this.update_setting('context_container_position', JSON.stringify(position));
                }
            });
        }
    }

    show_dummy_context() {
        let context_container = $('.context_container');
        if (context_container.length === 0) {
            context_container = $('<div>').addClass('context_container');
            $('#main_container').append(context_container);
        }
        context_container.css({
            'background-color': 'rgba(0, 0, 0, 0.2)',
            'position': 'fixed',
            'top': this.settings.context_container_position.top,
            'left': this.settings.context_container_position.left,
            'cursor': 'grab',
            'padding': '10px'
        });
        const context_menu = new ContextManager();
        const context_html = context_menu.build_dummy(test_menu);
        const style = this.settings.context;
        const border =  `${style.border_size} ${style.border_style} ${style.border_colour}`;
        context_container.html(context_html);
        context_container.find('.context_menu').css({
            'background-color': style.background,
            'border': border,
            'border-radius': style.border_radius,
            'color': style.colour,
            'animation': 'fade '+ style.animation,
        });
        context_container.find('input, button, .menu_option').addClass('disabled').prop('disabled', true);
        context_container.draggable({
            stop: (event, ui) => {
                const position = { top: ui.position.top + 'px', left: ui.position.left + 'px' };
                this.update_setting('context_position', JSON.stringify(position));
            }
        }).addClass('movable');
    }

    generate_context_settings() {
        const current_style = this.settings.context;
        const border_size_val = current_style.border ? parseInt(current_style.border) : 3;
        const border_rad_val = current_style.border_radius ? parseInt(current_style.border_radius) : 5;
        const anim_duration_val = current_style.animation ? parseFloat(current_style.animation.match(/(\d+(\.\d+)?)/)[0]) : 2;
        const bg_colour = current_style.background || '#000000';
        const text_colour = current_style.colour || '#000000';
        const border_colour = current_style.border_colour || '#000000';
        const border_match = current_style.border ? current_style.border.match(/(solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden)/) : null;
        const border_style = border_match ? border_match[0] : 'solid';
        const content = `
            <div class="content_header"><h3 data-translate="context">Context Menu</h3></div>
            <span class="group_label" data-translate="dummy">Dummy</span>
            <div class="content_group dummy_context">
                <div class="context_preview"></div>
            </div>
            <span class="group_label"  data-translate="positioning">Positioning</span>
            <div class="content_group">
                ${this.create_settings_button("toggle_movement", "move_context_customization", "fa-solid fa-plus", false)}
            </div>
            <span class="group_label" data-translate="edit">Edit</span>
            <div class="content_group">
                ${this.create_drop_down("customise")}
                ${this.create_color_picker("background_colour", "background_colour_input", bg_colour, true)}
                ${this.create_color_picker("text_colour", "text_colour_input", text_colour, true)}
                ${this.create_number_input("border_size", "border_size_input", border_size_val, 1, 10, 1, true)}
                ${this.create_border_style_dropdown("border_style", "border_style_input", border_style, true)}
                ${this.create_color_picker("border_colour", "border_colour_input", border_colour, true)}
                ${this.create_number_input("border_radius", "border_radius_input", border_rad_val, 0, 20, 1, true)}
                ${this.create_number_input("animation_duration", "animation_duration_input", anim_duration_val, 1, 10, 0.5, true)}
                ${this.create_settings_button("save", "save_context_customization", "fa-solid fa-plus", true)}
                ${this.create_settings_button("reset", "reset_context_customization", "fa-solid fa-plus", true)}
            </div>
        `;
        $('.settings_content').html(content);
        this.init_chevrons();
        this.apply_translations();
        this.update_preview_context();
        this.attach_settings_listeners();
        $('.colour_display').on('click', function() { $(this).next('.colour_input').click() });
        $('.colour_input').on('change', function() {
            const new_colour = $(this).val();
            $(this).prev('.colour_display').css('background-color', new_colour);
        });
        $('#move_context_customization').on('click', () => { this.toggle_context_movement() });
    }

    update_preview_dialogue() {
        const dialogue_class = new DialogueManager();
        const dialogue = dialogue_class.build_dummy(test_dialogue);
        $('.dialogue_preview').html(dialogue);
    }

    generate_dialogue_settings() {
        const current_style = this.settings.dialogue;
        const border_size_val = current_style.border ? parseInt(current_style.border) : 3;
        const border_rad_val = current_style.border_radius ? parseInt(current_style.border_radius) : 5;
        const anim_duration_val = current_style.animation ? parseFloat(current_style.animation.match(/(\d+(\.\d+)?)/)[0]) : 2;
        const vignette_colour = current_style.vignette_colour || '#000000';
        const bg_colour = current_style.background || '#000000';
        const text_colour = current_style.colour || '#000000';
        const border_colour = current_style.border_colour || '#000000';
        const border_match = current_style.border ? current_style.border.match(/(solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden)/) : null;
        const border_style = border_match ? border_match[0] : 'solid';
        const content = `
            <div class="content_header"><h3 data-translate="dialogue">Dialogue</h3></div>
            <span class="group_label" data-translate="dummy">Dummy</span>
            <div class="content_group dummy_dialogue">
                <div class="dialogue_preview"></div>
            </div>
            <span class="group_label" data-translate="edit">Edit</span>
            <div class="content_group">
                ${this.create_drop_down("customise")}
                ${this.create_color_picker("vignette_colour", "vignette_colour_input", vignette_colour, true)}
                ${this.create_color_picker("background_colour", "background_colour_input", bg_colour, true)}
                ${this.create_color_picker("text_colour", "text_colour_input", text_colour, true)}
                ${this.create_number_input("border_size", "border_size_input", border_size_val, 1, 10, 1, true)}
                ${this.create_border_style_dropdown("border_style", "border_style_input", border_style, true)}
                ${this.create_color_picker("border_colour", "border_colour_input", border_colour, true)}
                ${this.create_number_input("border_radius", "border_radius_input", border_rad_val, 0, 20, 1, true)}
                ${this.create_number_input("animation_duration", "animation_duration_input", anim_duration_val, 1, 10, 0.5, true)}
                ${this.create_settings_button("save", "save_dialogue_customization", "fa-solid fa-plus", true)}
                ${this.create_settings_button("reset", "reset_dialogue_customization", "fa-solid fa-plus", true)}
            </div>
        `;
        $('.settings_content').html(content);
        this.init_chevrons();
        this.apply_translations();
        this.update_preview_dialogue();
        this.attach_settings_listeners();
        $('.colour_display').on('click', function() { $(this).next('.colour_input').click() });
        $('.colour_input').on('change', function() {
            const new_colour = $(this).val();
            $(this).prev('.colour_display').css('background-color', new_colour);
        });
    }

    update_preview_draw_text() {
        const style = this.settings.draw_text;
        const icon = 'fa-solid fa-car';
        const header_text = 'Open Garage';
        const body_text = 'Press E to view your stored vehicles.';
        const border =  `${style.border_size} ${style.border_style} ${style.border_colour}`;
        const draw_text_html = `
            <div class="draw_text" style="background-color: ${style.background}; border: ${border}; color: ${style.colour}; animation: ${style.animation};">
                <div class="draw_text_header" style="color: ${style.colour};"><i class="${icon}"></i> ${header_text}</div>
                <div class="draw_text_body" style="color: ${style.colour};">${body_text}</div>
            </div>
        `;
        $('.draw_text_preview').html(draw_text_html);
    }

    toggle_draw_text_movement() {
        const is_movable = $('.draw_text_container').hasClass('movable');
        if (is_movable) {
            $('.draw_text_container').removeClass('movable').draggable('destroy');
            this.hide_dummy('.draw_text_container');
        } else {
            this.show_dummy_draw_text();
            $('.draw_text_container').addClass('movable').draggable({
                stop: (event, ui) => {
                    const position = { top: ui.position.top, left: ui.position.left };
                    this.update_setting('draw_text_container_position', JSON.stringify(position));
                }
            });
        }
    }

    show_dummy_draw_text() {
        let draw_text_container = $('.draw_text_container');
        if (draw_text_container.length === 0) {
            draw_text_container = $('<div>').addClass('draw_text_container');
            $('#main_container').append(draw_text_container);
        }
        let alignment;
        switch (this.notification_alignment) {
            case 'left': alignment = 'flex-start'; break;
            case 'center': alignment = 'center'; break;
            case 'right': alignment = 'flex-end'; break;
            default: alignment = 'flex-start'; break;
        }
        draw_text_container.css({
            'background-color': 'rgba(0, 0, 0, 0.2)',
            'position': 'fixed',
            'top': this.settings.draw_text_container_position.top,
            'left': this.settings.draw_text_container_position.left,
            'align-items': alignment,
            'cursor': 'grab',
            'padding': '10px'
        });
        const style = this.settings.draw_text
        const border =  `${style.border_size} ${style.border_style} ${style.border_colour}`;
        const draw_text_html = `
            <div class="draw_text" style="background-color: ${style.background}; border: ${border}; color: ${style.colour}; animation: ${style.animation};">
                <div class="draw_text_header" style="color: ${style.colour};"><i class="fa-solid fa-car"></i> Open Garage</div>
                <div class="draw_text_body" style="color: ${style.colour};">Press E to view your stored vehicles.</div>
            </div>
        `;
        draw_text_container.html(draw_text_html);
    }

    generate_draw_text_settings() {
        const current_style = this.settings.draw_text
        const border_size_val = current_style.border ? parseInt(current_style.border) : 3;
        const border_rad_val = current_style.border_radius ? parseInt(current_style.border_radius) : 5;
        const anim_duration_val = current_style.animation ? parseFloat(current_style.animation.match(/(\d+(\.\d+)?)/)[0]) : 2;
        const bg_colour = current_style.background || '#000000';
        const text_colour = current_style.colour || '#000000';
        const border_colour = current_style.border_colour || '#000000';
        const border_match = current_style.border ? current_style.border.match(/(solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden)/) : null;
        const border_style = border_match ? border_match[0] : 'solid';
        const content = `
            <div class="content_header"><h3 data-translate="draw_text">Text UI</h3></div>
            <span class="group_label" data-translate="dummy">Dummy</span>
            <div class="content_group dummy_draw_text">
                <div class="draw_text_preview"></div>
            </div>
            <span class="group_label"  data-translate="positioning">Positioning</span>
            <div class="content_group">
                ${this.create_settings_button("toggle_movement", "move_draw_text_customization", "fa-solid fa-plus", false)}
                ${this.create_drop_down("adjust_alignment")}
                ${this.create_toggle("left", "alignment_left", this.settings.draw_text_alignment === 'left', true, "draw_text_alignment")}
                ${this.create_toggle("center", "alignment_center", this.settings.draw_text_alignment === 'center', true, "draw_text_alignment")}
                ${this.create_toggle("right", "alignment_right", this.settings.draw_text_alignment === 'right', true, "draw_text_alignment")}
            </div>
            <span class="group_label" data-translate="edit">Edit</span>
            <div class="content_group">
                ${this.create_drop_down("customise")}
                ${this.create_color_picker("background_colour", "background_colour_input", bg_colour, true)}
                ${this.create_color_picker("text_colour", "text_colour_input", text_colour, true)}
                ${this.create_number_input("border_size", "border_size_input", border_size_val, 1, 10, 1, true)}
                ${this.create_border_style_dropdown("border_style", "border_style_input", border_style, true)}
                ${this.create_color_picker("border_colour", "border_colour_input", border_colour, true)}
                ${this.create_number_input("border_radius", "border_radius_input", border_rad_val, 0, 20, 1, true)}
                ${this.create_number_input("animation_duration", "animation_duration_input", anim_duration_val, 1, 10, 0.5, true)}
                ${this.create_settings_button("save", "save_draw_text_customization", "fa-solid fa-plus", true)}
                ${this.create_settings_button("reset", "reset_draw_text_customization", "fa-solid fa-plus", true)}
            </div>
        `;
        $('.settings_content').html(content);
        this.init_chevrons();
        this.apply_translations();
        this.update_preview_draw_text();
        this.attach_settings_listeners();
        $('input[name="draw_text_alignment"]').prop('checked', false);
        $(`input[name="draw_text_alignment"][data-value="${this.settings.draw_text_alignment}"]`).prop('checked', true);
        $('.colour_display').on('click', function() { $(this).next('.colour_input').click() });
        $('.colour_input').on('change', function() {
            const new_colour = $(this).val();
            $(this).prev('.colour_display').css('background-color', new_colour);
        });
        $('#move_draw_text_customization').on('click', () => { this.toggle_draw_text_movement() });
    }

    toggle_notification_movement() {
        const is_movable = $('.notification_container').hasClass('movable');
        if (is_movable) {
            $('.notification_container').removeClass('movable').draggable('destroy');
            this.hide_dummy('.notification_container');
        } else {
            this.show_dummy_notification();
            $('.notification_container').addClass('movable').draggable({
                stop: (event, ui) => {
                    const position = { top: ui.position.top, left: ui.position.left };
                    this.update_setting('notification_position', JSON.stringify(position));
                }
            });
        }
    }

    show_dummy_notification() {
        let notif_container = $('.notification_container');
        if (notif_container.length === 0) {
            notif_container = $('<div>').addClass('notification_container');
            $('#main_container').append(notif_container);
        }
        let alignment;
        switch (this.notification_alignment) {
            case 'left': alignment = 'flex-start'; break;
            case 'center': alignment = 'center'; break;
            case 'right': alignment = 'flex-end'; break;
            default: alignment = 'flex-start'; break;
        }
        notif_container.css({
            'background-color': 'rgba(0, 0, 0, 0.2)',
            'position': 'fixed',
            'top': this.settings.notification_container_position.top,
            'left': this.settings.notification_container_position.left,
            'align-items': alignment,
            'cursor': 'grab'
        });
        const style = this.settings.notification['system'].style;
        const icon = this.settings.notification['system'].icon;
        const header_text = this.settings.notification['system'].header_text;
        const body_text = this.settings.notification['system'].message;
        const notification_html = `
            <div class="notification" style="background-color: ${style.background}; border: ${style.border}; color: ${style.colour}; animation: ${style.animation};">
                <div class="notification_header" style="color: ${style.colour};"><i class="${icon}"></i> ${header_text}</div>
                <div class="notification_body" style="color: ${style.colour};">${body_text}</div>
            </div>
        `;
        notif_container.html(notification_html);
    }

    update_preview_notification(type) {
        const style = this.settings.notification[type].style;
        const icon = this.settings.notification[type].icon;
        const header_text = this.settings.notification[type].header_text;
        const message = this.settings.notification[type].message;
        const border =  `${style.border_size} ${style.border_style} ${style.border_colour}`;
        const notification_html = `
            <div class="notification" style="background-color: ${style.background}; border: ${border}; color: ${style.colour}; animation: ${style.animation};">
                <div class="notification_header" style="color: ${style.colour};"><i class="${icon}"></i> ${header_text}</div>
                <div class="notification_body" style="color: ${style.colour};">${message}</div>
            </div>
        `;
        $('.notification_preview').html(notification_html);
    }

    generate_notifications_settings() {
        const current_style = this.settings.notification[this.settings.notification_dummy].style;
        const border_size_val = current_style.border ? parseInt(current_style.border) : 3;
        const border_rad_val = current_style.border_radius ? parseInt(current_style.border_radius) : 5;
        const anim_duration_val = current_style.animation ? parseFloat(current_style.animation.match(/(\d+(\.\d+)?)/)[0]) : 2;
        const bg_colour = current_style.background || '#000000';
        const text_colour = current_style.colour || '#000000';
        const border_colour = current_style.border_colour || '#000000';
        const border_match = current_style.border ? current_style.border.match(/(solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden)/) : null;
        const border_style = border_match ? border_match[0] : 'solid';
        const content = `
            <div class="content_header"><h3 data-translate="notifications">Notifications</h3></div>
            <div class="content_group">
                ${this.create_toggle("enable", "settings_enable_notifications_toggle", this.notifications_enabled)}
            </div>
            <span class="group_label" data-translate="dummy">Dummy</span>
            <div class="content_group dummy_notification">
                <div class="notification_preview"></div>
            </div>
            <span class="group_label"  data-translate="positioning">Positioning</span>
            <div class="content_group">
                ${this.create_settings_button("toggle_movement", "move_notification_customization", "fa-solid fa-plus", false)}
                ${this.create_drop_down("adjust_alignment")}
                ${this.create_toggle("left", "alignment_left", this.settings.notification_alignment === 'left', true, "notification_alignment")}
                ${this.create_toggle("center", "alignment_center", this.settings.notification_alignment === 'center', true, "notification_alignment")}
                ${this.create_toggle("right", "alignment_right", this.settings.notification_alignment === 'right', true, "notification_alignment")}
            </div>
            <span class="group_label"  data-translate="types">Types</span>
            <div class="content_group">
                ${this.create_drop_down("change_dummy")}
                ${this.create_toggle("system", "dummy_system", this.settings.notification_dummy === 'system', true, "notification_dummy")}
                ${this.create_toggle("staff", "dummy_staff", this.settings.notification_dummy === 'staff', true, "notification_dummy")}
                ${this.create_toggle("general", "dummy_general", this.settings.notification_dummy === 'general', true, "notification_dummy")}
                ${this.create_toggle("warning", "dummy_warning", this.settings.notification_dummy === 'warning', true, "notification_dummy")}
                ${this.create_toggle("information", "dummy_information", this.settings.notification_dummy === 'information', true, "notification_dummy")}
                ${this.create_toggle("success", "dummy_success", this.settings.notification_dummy === 'success', true, "notification_dummy")}
                ${this.create_toggle("error", "dummy_error", this.settings.notification_dummy === 'error', true, "notification_dummy")}
                ${this.create_toggle("police", "dummy_police", this.settings.notification_dummy === 'police', true, "notification_dummy")}
                ${this.create_toggle("ems", "dummy_ems", this.settings.notification_dummy === 'ems', true, "notification_dummy")}
            </div>
            <span class="group_label" data-translate="edit">Edit</span>
            <div class="content_group">
                ${this.create_drop_down("customise")}
                ${this.create_color_picker("background_colour", "background_colour_input", bg_colour, true)}
                ${this.create_color_picker("text_colour", "text_colour_input", text_colour, true)}
                ${this.create_number_input("border_size", "border_size_input", border_size_val, 1, 10, 1, true)}
                ${this.create_border_style_dropdown("border_style", "border_style_input", border_style, true)}
                ${this.create_color_picker("border_colour", "border_colour_input", border_colour, true)}
                ${this.create_number_input("border_radius", "border_radius_input", border_rad_val, 0, 20, 1, true)}
                ${this.create_number_input("animation_duration", "animation_duration_input", anim_duration_val, 1, 10, 0.5, true)}
                ${this.create_settings_button("save", "save_notification_customization", "fa-solid fa-plus", true)}
                ${this.create_settings_button("reset", "reset_notification_customization", "fa-solid fa-plus", true)}
            </div>
        `;
        $('.settings_content').html(content);
        this.init_chevrons();
        this.apply_translations();
        this.update_preview_notification(this.settings.notification_dummy);
        this.apply_settings_to_ui();
        this.attach_settings_listeners();
        $('input[name="notification_dummy"]').prop('checked', false);
        $(`input[name="notification_dummy"][data-value="${this.settings.notification_dummy}"]`).prop('checked', true);
        $('input[name="notification_alignment"]').prop('checked', false);
        $(`input[name="notification_alignment"][data-value="${this.settings.notification_alignment}"]`).prop('checked', true);
        $('.colour_display').on('click', function() { $(this).next('.colour_input').click() });
        $('.colour_input').on('change', function() {
            const new_colour = $(this).val();
            $(this).prev('.colour_display').css('background-color', new_colour);
        });
        $('#move_notification_customization').on('click', () => { this.toggle_notification_movement() });
    }

    update_preview_progress() {
        const style = this.settings.progress;
        const icon = 'fa-solid fa-download';
        const header = 'Downloading documents..';
        const border = `${style.border_size} ${style.border_style} ${style.border_colour}`;
        const progress_html = `
            <div class="progress_bar" style="color: ${style.colour}; background-color: ${style.background}; border: ${border}; border-radius: ${style.border_radius}; animation: fade ${style.animation};">
                <div class="progress_bar_header"><i class="${icon}"></i> ${header}</div>
                <div class="progress_bar_body" style="background-color: ${style.bar_background}; border-radius: ${style.border_radius}">
                    <div class="progress_bar_fill" style="width: 70%; background-color: ${style.bar_fill}; border-radius: ${style.border_radius}"></div>
                </div>
            </div>
        `;
        $('.progress_preview').html(progress_html);
    }

    show_dummy_progress() {
        let progress_container = $('.progress_container');
        if (progress_container.length === 0) {
            progress_container = $('<div>').addClass('progress_container');
            $('#main_container').append(progress_container);
        }
        progress_container.css({
            'background-color': 'rgba(0, 0, 0, 0.2)',
            'position': 'fixed',
            'top': this.settings.progress_container_position.top,
            'left': this.settings.progress_container_position.left,
            'cursor': 'grab',
            'padding': '10px'
        });
        const style = this.settings.progress;
        const border =  `${style.border_size} ${style.border_style} ${style.border_colour}`;
        const icon = 'fa-solid fa-download';
        const header = 'Downloading documents..';
        const progress_html = `
            <div class="progress_bar" style="color: ${style.colour}; background-color: ${style.background}; border: ${border}; border-radius: ${style.border_radius}; animation: fade ${style.animation};">
                <div class="progress_bar_header"><i class="${icon}"></i> ${header}</div>
                <div class="progress_bar_body" style="background-color: ${style.bar_background}; border-radius: ${style.border_radius}">
                    <div class="progress_bar_fill" style="width: 70%; background-color: ${style.bar_fill}; border-radius: ${style.border_radius}"></div>
                </div>
            </div>
        `;
        progress_container.html(progress_html);
    }

    toggle_progress_movement() {
        const is_movable = $('.progress_container').hasClass('movable');
        if (is_movable) {
            $('.progress_container').removeClass('movable').draggable('destroy');
            this.hide_dummy('.progress_container');
        } else {
            this.show_dummy_progress();
            $('.progress_container').addClass('movable').draggable({
                stop: (event, ui) => {
                    const position = { top: ui.position.top, left: ui.position.left };
                    this.update_setting('progress_container_position', JSON.stringify(position));
                }
            });
        }
    }

    generate_progress_settings() {
        const current_style = this.settings.progress;
        const border_size_val = current_style.border ? parseInt(current_style.border) : 3;
        const border_rad_val = current_style.border_radius ? parseInt(current_style.border_radius) : 5;
        const anim_duration_val = current_style.animation ? parseFloat(current_style.animation.match(/(\d+(\.\d+)?)/)[0]) : 2;
        const bg_colour = current_style.background || '#000000';
        const text_colour = current_style.colour || '#000000';
        const bar_bg_colour = current_style.bar_background || '#000000';
        const bar_fill_colour = current_style.bar_fill || '#000000';
        const border_colour = current_style.border_colour || '#000000';
        const border_match = current_style.border ? current_style.border.match(/(solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden)/) : null;
        const border_style = border_match ? border_match[0] : 'solid';  
        const content = `
            <div class="content_header"><h3 data-translate="progress_bar">Progress Bar</h3></div>
            <span class="group_label" data-translate="dummy">Dummy</span>
            <div class="content_group dummy_progress">
                <div class="progress_preview"></div>
            </div>
            <span class="group_label"  data-translate="positioning">Positioning</span>
            <div class="content_group">
                ${this.create_settings_button("toggle_movement", "move_progress_customization", "fa-solid fa-plus", false)}
            </div>
            <span class="group_label" data-translate="edit">Edit</span>
            <div class="content_group">
                ${this.create_drop_down("customise")}
                ${this.create_color_picker("background_colour", "background_colour_input", bg_colour, true)}
                ${this.create_color_picker("text_colour", "text_colour_input", text_colour, true)}
                ${this.create_color_picker("bar_bg_colour", "bar_bg_colour_input", bar_bg_colour, true)}
                ${this.create_color_picker("bar_fill_colour", "bar_fill_colour_input", bar_fill_colour, true)}
                ${this.create_number_input("border_size", "border_size_input", border_size_val, 1, 10, 1, true)}
                ${this.create_border_style_dropdown("border_style", "border_style_input", border_style, true)}
                ${this.create_color_picker("border_colour", "border_colour_input", border_colour, true)}
                ${this.create_number_input("border_radius", "border_radius_input", border_rad_val, 0, 20, 1, true)}
                ${this.create_number_input("animation_duration", "animation_duration_input", anim_duration_val, 1, 10, 0.5, true)}
                ${this.create_settings_button("save", "save_progress_customization", "fa-solid fa-plus", true)}
                ${this.create_settings_button("reset", "reset_progress_customization", "fa-solid fa-plus", true)}
            </div>
        `;
        $('.settings_content').html(content);
        this.init_chevrons();
        this.apply_translations();
        this.update_preview_progress();
        this.attach_settings_listeners();
        $('.colour_display').on('click', function() { $(this).next('.colour_input').click() });
        $('.colour_input').on('change', function() {
            const new_colour = $(this).val();
            $(this).prev('.colour_display').css('background-color', new_colour);
        });
        $('#move_progress_customization').on('click', () => { this.toggle_progress_movement() });
    }

}

/*
// Uncomment this to live preview edit
$(document).ready(function() {
    const settings_class = new Settings();
    settings_class.init();
});
*/
