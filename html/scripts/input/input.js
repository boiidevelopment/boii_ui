//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

const input_styles = {
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
        optionImageBorder: '3px solid rgba(0, 0, 0, 0.5)',
        optionImageBorderRadius: '10px',
        optionImageBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        optionHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionHoverBackground: 'rgba(31, 30, 30, 0.8)',
        optionHoverBoxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.5)',
        optionHoverColor: 'rgba(255, 255, 255, 1)',
        buttonBackground: 'rgba(31, 30, 30, 0.8)',
        buttonBorder: '3px solid rgba(0, 0, 0, 0.5)',
        buttonBorderRadius: '10px',
        buttonBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        buttonFontSize: '1.0rem',
        buttonFontFamily: 'Roboto',
        buttonFontWeight: 600,
        buttonColor: 'rgba(255, 255, 255, 0.8)',
        buttonHoverBackground: 'rgba(31, 30, 30, 0.9)',
        buttonHoverBoxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.9)',
        buttonHoverColor: 'rgba(255, 255, 255, 1)'
    },

    // lspd example
    ['lspd']: {
        mainHeaderBackground: 'rgba(31, 30, 30, 0.8)',
        mainHeaderBoxShadow: '0px 0px 4px 0px rgba(19, 93, 216, 0.8)',
        mainHeaderBorder: '1px solid rgba(19, 93, 216, 0.8)',
        mainHeaderBorderRadius: '10px',
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
        optionBorderRadius: '10px',
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
        buttonBorderRadius: '10px',
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

class Input {
    constructor(input_styles) {
        this.input_styles = input_styles;
    }

    create_input(type, options) {
        const style = this.input_styles[type] || this.input_styles['default'];
        this.build_input(style, options);
        $(document).ready(() => {
            $(document).keyup((exit) => this.handle_exit(exit));
        });
    }

    handle_exit(exit) {
        if (exit.keyCode === 27) {
            this.close_input();
        }
    }

    build_input(style, options) {
        let main_div = document.getElementById('input-container');
        main_div.innerHTML = '';
        let input_header_div = create_element('div', 'input-header');
        let input_options_div = create_element('div', 'input-options');
        if (options.main_header !== undefined) {
            let input_header_body = create_element('div', 'input-header-body');
            if (options.main_header.image !== undefined) {
                let input_header_image = create_element('div', 'input-header-image');
                input_header_image.style.backgroundImage = "url(" + options.main_header.image + ")";
                input_header_image.style.border = style.mainHeaderImageBorder;
                input_header_image.style.borderRadius = style.mainHeaderImageBorderRadius;
                input_header_image.style.boxShadow = style.mainHeaderImageBoxShadow;
                input_header_body.insertBefore(input_header_image, input_header_body.firstChild);
            }
            if (options.main_header.text !== undefined) {
                let input_header_text = create_element('div', 'input-header-text', options && options.main_header.icon ? `${options.main_header.icon}${options.main_header.text}` : options.main_header.text);
                input_header_body.append(input_header_text);
                input_header_text.style.fontWeight = style.mainHeaderWeight;
                input_header_text.style.textShadow = style.mainHeaderShadow;
            }
            input_header_div.style.background = style.mainHeaderBackground;
            input_header_div.style.boxShadow = style.mainHeaderBoxShadow;
            input_header_div.style.border = style.mainHeaderBorder;
            input_header_div.style.borderRadius = style.mainHeaderBorderRadius;
            input_header_div.style.color = style.mainHeaderColor;
            input_header_div.style.fontFamily = style.mainHeaderFontFamily;
            input_header_div.style.fontSize = style.mainHeaderFontSize;
            input_header_div.appendChild(input_header_body);
        }
        let input_option = create_element('div', 'input-option');
        let input_option_body = create_element('div', 'input-option-body');
        let input_element_value, input_element_id;
        if (options.input_fields && options.input_fields.id) {
            input_element_id = create_element('input', 'input-option-input');
            input_element_id.type = 'number';
            input_element_id.placeholder = 'Enter ID...';  
            input_option_body.appendChild(input_element_id);
        }
        if (options.input_fields && options.input_fields.value) {
            input_element_value = create_element('input', 'input-option-input');
            input_element_value.type = 'number';
            input_element_value.placeholder = 'Enter value...';  
            input_option_body.appendChild(input_element_value);
        }
        input_option.appendChild(input_option_body);
        input_option.style.background = style.optionBackground;
        input_option.style.boxShadow = style.optionBoxShadow;
        input_option.style.border = style.optionBorder;
        input_option.style.borderRadius = style.optionBorderRadius;
        input_option.style.color = style.optionColor;
        input_option.style.fontFamily = style.optionFontFamily;
        input_options_div.appendChild(input_option);
        main_div.appendChild(input_header_div);
        main_div.appendChild(input_options_div);
        let input_buttons_div = create_element('div', 'input-buttons');
        let input_button = create_element('button', 'input-btn', options.input_button.text);    
        input_button.style.background = style.buttonBackground;
        input_button.style.border = style.buttonBorder;
        input_button.style.borderRadius = style.buttonBorderRadius;
        input_button.style.boxShadow = style.buttonBoxShadow;
        input_button.style.fontFamily = style.buttonFontFamily;
        input_button.style.fontWeight = style.buttonFontWeight;
        input_button.style.fontSize = style.buttonFontSize;
        input_button.style.color = style.buttonColor;
        const { action_type, action, params, should_close } = options.input_button;

        input_button.addEventListener('click', () => {
            const dataToSend = { action_type, action, params, should_close }; // line 180
            if (input_element_value && input_element_value.value.trim() !== "") {
                dataToSend.value = input_element_value.value;
            }
            if (input_element_id && input_element_id.value.trim() !== "") {
                dataToSend.id = input_element_id.value;
            }
            if (Object.keys(dataToSend).length > 4) {
                $.post(`https://${GetParentResourceName()}/submit_input`, JSON.stringify(dataToSend));
                this.close_input();
            } else {
                this.close_input();
                return;
            }
        });

        input_button.addEventListener('mouseover', () => {
            input_button.style.background = style.buttonHoverBackground;
            input_button.style.boxShadow = style.buttonHoverBoxShadow;
            input_button.style.color = style.buttonHoverColor;
        });
        input_button.addEventListener('mouseout', () => {
            input_button.style.background = style.buttonBackground;
            input_button.style.boxShadow = style.buttonBoxShadow;
            input_button.style.color = style.buttonColor;
        });
        input_buttons_div.appendChild(input_button);
        main_div.appendChild(input_buttons_div);
    }

    close_input() {
        let main_div = document.getElementById('input-container');
        main_div.innerHTML = '';
        $.post(`https://${GetParentResourceName()}/close_input`, JSON.stringify({}));
    }
}

/*
const input_data = {
    main_header: {
        text: 'Example Header',
        image: '/html/assets/images/lspd.png',
        icon: '<i class="fa-solid fa-bell"></i>',
    },
    input_fields: {
        id: true,
        value: true,
    },
    input_button: {
        use: true,
        text: 'Submit',
        action_type: 'client_event',
        action: 'boii_ui:cl:input_test_event',
        params: {},
        should_close: true,
    }
};

const testInput = new Input(input_styles);
testInput.create_input('default', input_data);
*/