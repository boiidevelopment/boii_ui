//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

const action_menu_styles = {
    // default
    ['default']: {
        mainHeaderBackground: 'rgba(31, 30, 30, 0.8)',
        mainHeaderBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        mainHeaderBorder: '3px solid rgba(0, 0, 0, 0.5)',
        mainHeaderBorderRadius: '10px',
        mainHeaderColor: 'rgba(255, 255, 255, 0.8)',
        mainHeaderFontFamily: 'Roboto',
        mainHeaderImageBorder: undefined,
        mainHeaderImageBorderRadius: undefined,
        mainHeaderImageBoxShadow: undefined,
        mainHeaderFontSize: '1.0rem',
        mainHeaderWeight: 600,
        mainHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionBackground: 'rgba(31, 30, 30, 0.8)',
        optionBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        optionBorder: '3px solid rgba(0, 0, 0, 0.5)',
        optionBorderRadius: '10px',
        optionColor: 'rgba(255, 255, 255, 0.8)',
        optionFontFamily: 'Roboto',
        optionHeaderFontSize: '1.0rem',
        optionMessageFontSize: '1.0rem',
        optionHeaderWeight: 600,
        optionMessageWeight: 100,
        optionImageBorder: undefined,
        optionImageBorderRadius: undefined,
        optionImageBoxShadow: undefined,
        optionHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionHoverBackground: 'rgba(31, 30, 30, 0.8)',
        optionHoverBoxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.5)',
        optionHoverColor: 'rgba(255, 255, 255, 1)',
        buttonBackground: 'rgba(31, 30, 30, 0.8)',
        buttonBorder: '3px solid rgba(0, 0, 0, 0.5)',
        buttonBorderRadius: '15px',
        buttonBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        buttonFontSize: '1.0rem',
        buttonFontFamily: 'Roboto',
        buttonFontWeight: 600,
        buttonColor: 'rgba(255, 255, 255, 0.8)',
        buttonHoverBackground: 'rgba(31, 30, 30, 0.9)',
        buttonHoverBoxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.9)',
        buttonHoverColor: 'rgba(255, 255, 255, 1)'
    },
};

class ActionMenu {
    constructor(action_menu_styles) {
        this.action_menu_styles = action_menu_styles;
    }

    create_menu(type, options) {
        const style = this.action_menu_styles[type] || this.action_menu_styles['default'];
        this.build_menu(style, options);
        $(document).ready(() => {
            $(document).keyup((exit) => this.handle_exit(exit));
        });
    }

    handle_exit(exit) {
        if (exit.keyCode === 27) {
            this.close_menu();
        }
    }

    build_menu(style, options) {
        let main_div = document.getElementById('action_menu_container');
        main_div.innerHTML = '';
        let menu_header_div = create_element('div', 'action-menu-header');
        let menu_options_div = create_element('div', 'action-menu-options');
        if (options.main_header !== undefined) {
            let menu_header_body = create_element('div', 'action-menu-header-body');
            if (options.main_header.image !== undefined) {
                let menu_header_image = create_element('div', 'action-menu-header-image');
                menu_header_image.style.backgroundImage = "url(" + options.main_header.image + ")";
                menu_header_image.style.border = style.mainHeaderImageBorder;
                menu_header_image.style.borderRadius = style.mainHeaderImageBorderRadius;
                menu_header_image.style.boxShadow = style.mainHeaderImageBoxShadow;
                menu_header_body.insertBefore(menu_header_image, menu_header_body.firstChild);
            }
            if (options.main_header.text !== undefined) {
                let menu_header_text = create_element('div', 'action-menu-header-text', options && options.main_header.icon ? `${options.main_header.icon}${options.main_header.text}` : options.main_header.text);
                menu_header_body.append(menu_header_text);
                menu_header_text.style.fontWeight = style.mainHeaderWeight;
                menu_header_text.style.textShadow = style.mainHeaderShadow;
            }
            menu_header_div.style.background = style.mainHeaderBackground;
            menu_header_div.style.boxShadow = style.mainHeaderBoxShadow;
            menu_header_div.style.border = style.mainHeaderBorder;
            menu_header_div.style.borderRadius = style.mainHeaderBorderRadius;
            menu_header_div.style.color = style.mainHeaderColor;
            menu_header_div.style.fontFamily = style.mainHeaderFontFamily;
            menu_header_div.style.fontSize = style.mainHeaderFontSize;
            menu_header_div.appendChild(menu_header_body);
        }

        options.menu_options.forEach((option) => {
            let menu_option = create_element('div', 'action-menu-option');
            let menu_option_body = create_element('div', 'action-menu-option-body');
            if (option.disabled) {
                menu_option.classList.add('disabled');
            }
            if (option.image !== undefined) {
                let menu_option_image = create_element('div', 'action-menu-option-image');
                menu_option_image.style.backgroundImage = "url(" + option.image + ")";
                menu_option_image.style.border = style.optionImageBorder;
                menu_option_image.style.borderRadius = style.optionImageBorderRadius;
                menu_option_image.style.boxShadow = style.optionImageBoxShadow;
                menu_option.appendChild(menu_option_image);
            }
            if (option.header !== undefined) {
                let menu_option_header = create_element('div', 'action-menu-option-header', option.header_icon ? `${option.header_icon}${option.header}` : option.header);
                menu_option_body.append(menu_option_header);
                menu_option_header.style.fontWeight = style.optionHeaderWeight;
                menu_option_header.style.fontSize = style.optionHeaderFontSize;
                menu_option_header.style.textShadow = style.optionHeaderShadow;
            }
            if (option.message !== undefined) {
                let option_message = create_element('div', 'action-menu-option-message', option.message_icon ? `${option.message_icon}${option.message}` : option.message);
                menu_option_body.append(option_message);
                option_message.style.fontWeight = style.optionMessageWeight;
                option_message.style.fontSize = style.optionMessageFontSize;
            }
            menu_option.appendChild(menu_option_body);
            menu_option.addEventListener('mouseover', () => {
                menu_option.style.background = style.optionHoverBackground;
                menu_option.style.boxShadow = style.optionHoverBoxShadow;
                menu_option.style.color = style.optionHoverColor;
            });
            menu_option.addEventListener('mouseout', () => {
                menu_option.style.background = style.optionBackground;
                menu_option.style.boxShadow = style.optionBoxShadow;
                menu_option.style.color = style.optionColor;
            });
            menu_option.style.background = style.optionBackground;
            menu_option.style.boxShadow = style.optionBoxShadow;
            menu_option.style.border = style.optionBorder;
            menu_option.style.borderRadius = style.optionBorderRadius;
            menu_option.style.color = style.optionColor;
            menu_option.style.fontFamily = style.optionFontFamily;
            if (option.submenu && option.submenu.length > 0) {
                let submenu_div = create_element('div', 'action-menu-submenu');
                submenu_div.style.display = 'none';
                option.submenu.forEach((submenu_option) => {
                    let submenu_item = create_element('div', 'action-menu-submenu-item', submenu_option.header);
                    submenu_item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        console.log('clicked a submenu option');
                        if (typeof submenu_option.callback === 'function') {
                            submenu_option.callback(submenu_option.action_type, submenu_option.action, submenu_option.params, submenu_option.should_close);
                        }
                    });
                    submenu_div.appendChild(submenu_item);
                });
                menu_option_body.appendChild(submenu_div);
                menu_option.addEventListener('click', () => {
                    submenu_div.style.display = submenu_div.style.display === 'none' ? 'block' : 'none';
                    console.log('clicked a menu option')
                });
            }
            menu_options_div.appendChild(menu_option);
        });
        main_div.appendChild(menu_header_div);
        main_div.appendChild(menu_options_div);
        let menu_button_div = create_element('div', 'action-menu-buttons');
        let close_button = create_element('button', 'action-menu-btn', options.menu_button.text);
        close_button.style.background = style.buttonBackground;
        close_button.style.border = style.buttonBorder;
        close_button.style.borderRadius = style.buttonBorderRadius;
        close_button.style.boxShadow = style.buttonBoxShadow;
        close_button.style.fontFamily = style.buttonFontFamily;
        close_button.style.fontWeight = style.buttonFontWeight;
        close_button.style.fontSize = style.buttonFontSize;
        close_button.style.color = style.buttonColor;
        close_button.addEventListener('click', () => {
            const { action_type, action, params, should_close } = options.menu_button;
            $.post(`https://${GetParentResourceName()}/trigger_action_event`, JSON.stringify({ action_type, action, params, should_close }));
        });
        close_button.addEventListener('mouseover', () => {
            close_button.style.background = style.buttonHoverBackground;
            close_button.style.boxShadow = style.buttonHoverBoxShadow;
            close_button.style.color = style.buttonHoverColor;
        });
        close_button.addEventListener('mouseout', () => {
            close_button.style.background = style.buttonBackground;
            close_button.style.boxShadow = style.buttonBoxShadow;
            close_button.style.color = style.buttonColor;
        });
        menu_button_div.appendChild(close_button);
        main_div.appendChild(menu_button_div);
    }

    close_menu() {
        let main_div = document.getElementById('action_menu_container');
        main_div.innerHTML = '';
        $.post(`https://${GetParentResourceName()}/close_action_menu`, JSON.stringify({}));
    }
}

/*
const action_menu_options = [
    {
        header: 'Vehicle Options',
        header_icon: '<i class="fa-solid fa-car"></i>',
        message: 'View vehicle actions.',
        params: {},
        should_close: false,
        submenu: [
            {
                header: 'Open Garage',
                action_type: 'client_event',
                action: 'boii_ui:cl:submenu_test_event',
                params: {},
                should_close: false
            },
            {
                header: 'Store Vehicle',
                action_type: 'client_event',
                action: 'boii_ui:cl:submenu_test_event',
                params: {},
                should_close: true
            },
            {
                header: 'Check VIN',
                action_type: 'client_event',
                action: 'boii_ui:cl:submenu_test_event',
                params: {},
                should_close: true
            }
        ]
    },
    {
        header: 'Payment Options',
        header_icon: '<i class="fa-solid fa-bank"></i>',
        message: 'View payment actions.',
        params: {},
        should_close: false,
        submenu: [
            {
                header: 'Check Payment Time',
                action_type: 'client_event',
                action: 'boii_ui:cl:submenu_test_event',
                params: {},
                should_close: false
            },
            {
                header: 'Pay Invoice',
                action_type: 'client_event',
                action: 'boii_ui:cl:submenu_test_event',
                params: {},
                should_close: true
            },
        ]
    },
];

const action_menu_data = {
    main_header: {
        text: 'Action Menu',
        icon: '<i class="fa-solid fa-cog"></i>'
    },
    menu_options: action_menu_options,
    menu_buttons: {
        close: {
            use: true,
            text: 'Exit',
            action_type: 'client_event',
            action: 'boii_ui:cl:menu_test_event',
            params: {},
            should_close: true
        }
    }
};

const act_menu = new ActionMenu(action_menu_styles);
act_menu.create_menu('default', action_menu_data);
*/
