//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

const context_styles = {
    // default
    ['default']: {
        mainHeaderBackground: 'rgba(31, 30, 30, 0.8)',
        mainHeaderBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        mainHeaderBorder: '1px solid rgba(77, 203, 194, 0.8)',
        mainHeaderBorderRadius: '15px',
        mainHeaderColor: 'rgba(255, 255, 255, 0.8)',
        mainHeaderFontFamily: 'Aldrich',
        mainHeaderImageBorder: '2px solid rgba(77, 203, 194, 0.8)',
        mainHeaderImageBorderRadius: '15px',
        mainHeaderImageBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        mainHeaderFontSize: '1.0rem',
        mainHeaderWeight: 600,
        mainHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionBackground: 'rgba(31, 30, 30, 0.8)',
        optionBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        optionBorder: '1px solid rgba(77, 203, 194, 0.8)',
        optionBorderRadius: '15px',
        optionColor: 'rgba(255, 255, 255, 0.8)',
        optionFontFamily: 'Aldrich',
        optionHeaderFontSize: '1.0rem',
        optionMessageFontSize: '1.0rem',
        optionHeaderWeight: 600,
        optionMessageWeight: 100,
        optionImageBorder: '2px solid rgba(77, 203, 194, 0.8)',
        optionImageBorderRadius: '15px',
        optionImageBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        optionHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionHoverBackground: 'rgba(31, 30, 30, 0.8)',
        optionHoverBoxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1)',
        optionHoverColor: 'rgba(255, 255, 255, 1)',
        buttonBackground: 'rgba(31, 30, 30, 0.8)',
        buttonBorder: '1px solid rgba(77, 203, 194, 1.0)',
        buttonBorderRadius: '15px',
        buttonBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        buttonFontSize: '1.0rem',
        buttonFontFamily: 'Aldrich',
        buttonFontWeight: 600,
        buttonColor: 'rgba(255, 255, 255, 0.8)',
        buttonHoverBackground: 'rgba(31, 30, 30, 0.8)',
        buttonHoverBoxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1)',
        buttonHoverColor: 'rgba(255, 255, 255, 1)'
    },

    // lspd example
    ['lspd']: {
        mainHeaderBackground: 'rgba(31, 30, 30, 0.8)',
        mainHeaderBoxShadow: '0px 0px 4px 0px rgba(19, 93, 216, 0.8)',
        mainHeaderBorder: '1px solid rgba(19, 93, 216, 0.8)',
        mainHeaderBorderRadius: '15px',
        mainHeaderColor: 'rgba(255, 255, 255, 0.8)',
        mainHeaderFontFamily: 'Orbitron',
        mainHeaderImageBorder: '2px solid rgba(19, 93, 216, 0.8)',
        mainHeaderImageBorderRadius: '50%',
        mainHeaderImageBoxShadow: '0px 0px 4px 0px rgba(19, 93, 216, 0.8)',
        mainHeaderFontSize: '1.0rem',
        mainHeaderWeight: 600,
        mainHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionBackground: 'rgba(31, 30, 30, 0.8)',
        optionBoxShadow: '0px 0px 4px 0px rgba(19, 93, 216, 0.8)',
        optionBorder: '1px solid rgba(19, 93, 216, 0.8)',
        optionBorderRadius: '15px',
        optionColor: 'rgba(255, 255, 255, 0.8)',
        optionFontFamily: 'Orbitron',
        optionHeaderFontSize: '1.0rem',
        optionMessageFontSize: '1.0rem',
        optionHeaderWeight: 600,
        optionMessageWeight: 100,
        optionImageBorder: '2px solid rgba(19, 93, 216, 0.8)',
        optionImageBorderRadius: '50%',
        optionImageBoxShadow: '0px 0px 4px 0px rgba(19, 93, 216, 0.8)',
        optionHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionHoverBackground: 'rgba(31, 30, 30, 0.8)',
        optionHoverBoxShadow: '0px 0px 5px 0px rgba(19, 93, 216, 1)',
        optionHoverColor: 'rgba(255, 255, 255, 1)',
        buttonBackground: 'rgba(31, 30, 30, 0.8)',
        buttonBorder: '1px solid rgba(19, 93, 216, 1.0)',
        buttonBorderRadius: '15px',
        buttonBoxShadow: '0px 0px 4px 0px rgba(19, 93, 216, 0.8)',
        buttonFontSize: '1.0rem',
        buttonFontFamily: 'Orbitron',
        buttonFontWeight: 600,
        buttonColor: 'rgba(255, 255, 255, 0.8)',
        buttonHoverBackground: 'rgba(31, 30, 30, 0.8)',
        buttonHoverBoxShadow: '0px 0px 5px 0px rgba(19, 93, 216, 1)',
        buttonHoverColor: 'rgba(255, 255, 255, 1)'
    },
};

class ContextMenu {
    constructor(context_styles) {
        this.context_styles = context_styles;
    }

    create_menu(type, options) {
        const style = this.context_styles[type] || this.context_styles['default'];
        this.build_menu(style, options);
    }

    build_menu(style, options) {
        let main_div = document.getElementById('context-menu-container');
        main_div.innerHTML = '';
        let menu_header_div = create_element('div', 'menu-header');
        let menu_options_div = create_element('div', 'menu-options');
        if (options.main_header !== undefined) {
            let menu_header_body = create_element('div', 'menu-header-body');
            if (options.main_header.image !== undefined) {
                let menu_header_image = create_element('div', 'menu-header-image');
                menu_header_image.style.backgroundImage = "url(" + options.main_header.image + ")";
                menu_header_image.style.border = style.mainHeaderImageBorder;
                menu_header_image.style.borderRadius = style.mainHeaderImageBorderRadius;
                menu_header_image.style.boxShadow = style.mainHeaderImageBoxShadow;
                menu_header_body.insertBefore(menu_header_image, menu_header_body.firstChild);
            }
            if (options.main_header.text !== undefined) {
                let menu_header_text = create_element('div', 'menu-header-text', options && options.main_header.icon ? `${options.main_header.icon}${options.main_header.text}` : options.main_header.text);
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
            let menu_option = create_element('div', 'menu-option');
            let menu_option_body = create_element('div', 'menu-option-body');
            if (option.disabled) {
                menu_option.classList.add('disabled');
            }
            if (option.image !== undefined) {
                let menu_option_image = create_element('div', 'menu-option-image');
                menu_option_image.style.backgroundImage = "url(" + option.image + ")";
                menu_option_image.style.border = style.optionImageBorder;
                menu_option_image.style.borderRadius = style.optionImageBorderRadius;
                menu_option_image.style.boxShadow = style.optionImageBoxShadow;
                menu_option.appendChild(menu_option_image);
            }
            if (option.header !== undefined) {
                let menu_option_header = create_element('div', 'menu-option-header', option.header_icon ? `${option.header_icon}${option.header}` : option.header);
                menu_option_body.append(menu_option_header);
                menu_option_header.style.fontWeight = style.optionHeaderWeight;
                menu_option_header.style.fontSize = style.optionHeaderFontSize;
                menu_option_header.style.textShadow = style.optionHeaderShadow;
            }
            if (option.message !== undefined) {
                let option_message = create_element('div', 'menu-option-message', option.message_icon ? `${option.message_icon}${option.message}` : option.message);
                menu_option_body.append(option_message);
                option_message.style.fontWeight = style.optionMessageWeight;
                option_message.style.fontSize = style.optionMessageFontSize;
            }
            menu_option.appendChild(menu_option_body);
            menu_option.addEventListener('click', () => {
                if (!option.disabled && typeof option.callback === 'function') {
                    option.callback(option.action_type, option.action, option.params, option.should_close);
                }
            });
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
            menu_options_div.appendChild(menu_option);
        });
        main_div.appendChild(menu_header_div);
        main_div.appendChild(menu_options_div);
        if (options.menu_buttons) {
            let menu_buttons_div = create_element('div', 'menu-buttons');
            if (options.menu_buttons.close && options.menu_buttons.close.use) {
                let close_button = create_element('button', 'menu-btn', options.menu_buttons.close.text);
                close_button.style.background = style.buttonBackground;
                close_button.style.border = style.buttonBorder;
                close_button.style.borderRadius = style.buttonBorderRadius;
                close_button.style.boxShadow = style.buttonBoxShadow;
                close_button.style.fontFamily = style.buttonFontFamily;
                close_button.style.fontWeight = style.buttonFontWeight;
                close_button.style.fontSize = style.buttonFontSize;
                close_button.style.color = style.buttonColor;
                close_button.addEventListener('click', () => {
                    const { action_type, action, params, should_close } = options.menu_buttons.close;
                    $.post(`https://${GetParentResourceName()}/trigger_event`, JSON.stringify({ action_type, action, params, should_close }));
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
                menu_buttons_div.appendChild(close_button);
            }
            main_div.appendChild(menu_buttons_div);
        }
    }

    close_menu() {
        let main_div = document.getElementById('context-menu-container');
        main_div.innerHTML = '';
    }
}
