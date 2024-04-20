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

class ActionMenu {
    constructor() {
        this.menu_stack = [];
        this.current_menu = [];
        this.is_menu_active = false;
        this.create_menu_container();
    }

    create_menu_container() {
        this.menu_container = $('<div>').addClass('action_menu_container');
        $('#main_container').append(this.menu_container);
    }

    create_menu(actions) {
        this.menu_stack.push(actions);
        this.current_menu = actions;
        this.render_menu(actions);
        this.is_menu_active = true;
    }

    render_menu(actions) {
        this.menu_container.empty();
        let menu_left = $('<div>').addClass('actions left');
        let menu_right = $('<div>').addClass('actions right');
        let center_button = $('<div>').addClass('center_button').html('<i class="fa fa-rotate-left"></i>');
        center_button.on('click', () => this.handle_center_button_click());

        actions.forEach((action, index) => {
            let action_html = $('<div>').addClass('action').data('id', action.label);
            let colour = action.colour || '#b4b4b4';
            let label_html = `<span class="label" style="border: 2px solid ${colour}; color: ${colour};">${action.label}</span>`;
            let icon_html = `<span class="icon" style="border: 2px solid ${colour}; color: ${colour};"><i class="${action.icon}"></i></span>`;
            action_html.on('click', () => this.handle_action_click(action));
            if (index % 2 === 0) {
                action_html.html(`<div class="label_container">${icon_html}${label_html}</div>`);
                menu_right.append(action_html);
            } else {
                action_html.html(`<div class="label_container">${label_html}${icon_html}</div>`);
                menu_left.append(action_html);
            }
        });
        this.adjust_action_positions(menu_left, menu_right);
        this.menu_container.append(menu_left, center_button, menu_right);
    }
    
    adjust_action_positions(menu_left, menu_right) {
        let count_left = menu_left.children().length;
        let count_right = menu_right.children().length;
        menu_left.children().first().css('transform', '');
        menu_left.children().last().css('transform', '');
        menu_right.children().first().css('transform', '');
        menu_right.children().last().css('transform', '');
        if (count_left > 2 || count_right > 2) {
            menu_left.children().first().css('transform', count_left > 2 ? 'translateX(10%)' : '');
            menu_left.children().last().css('transform', count_left > 2 ? 'translateX(10%)' : '');
            menu_right.children().first().css('transform', count_right > 2 ? 'translateX(-10%)' : '');
            menu_right.children().last().css('transform', count_right > 2 ? 'translateX(-10%)' : '');
        }
    }

    handle_action_click(action) {
        if (action.submenu) {
            this.create_menu(action.submenu);
        } else {
            $.post(`https://${GetParentResourceName()}/trigger_event`, JSON.stringify({
                action_type: action.action_type,
                action: action.action,
                params: action.params
            }));
            if (this.menu_stack.length === 1) {
                this.is_menu_active = false;
                this.close();
            }
        }
    }

    handle_center_button_click() {
        if (this.menu_stack.length > 1) {
            this.menu_stack.pop();
            this.render_menu(this.menu_stack[this.menu_stack.length - 1]);
        } else {
            this.close();
        }
    }

    close() {
        this.menu_container.empty();
        this.is_menu_active = false;
        $.post(`https://${GetParentResourceName()}/close_action_menu`, JSON.stringify({}));
    }
}

/*
$(document).ready(function() {
    const test_menu = [
        {
            label: "Level 1",
            icon: "fa-solid fa-sitemap",
            colour: 'red',
            submenu: [
                {
                    label: "Level 2",
                    icon: "fa-solid fa-operations",
                    colour: 'orange',
                    submenu: [
                        {
                            label: "Level 3",
                            icon: "fa-solid fa-truck-moving",
                            colour: 'yellow',
                            submenu: [
                                {
                                    label: "Level 4",
                                    icon: "fa-solid fa-boxes",
                                    colour: 'green',
                                    submenu: [
                                        {
                                            label: "Level 5",
                                            icon: "fa-solid fa-map-marked-alt",
                                            colour: 'blue',
                                            submenu: [
                                                {
                                                    label: "Confirm",
                                                    icon: "fa-solid fa-check-circle",
                                                    colour: 'purple',
                                                    action_type: "client_event",
                                                    action: 'boii_target:cl:confirm_delivery',
                                                    params: { delivery_id: 1234 }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            label: "Quick Access",
            icon: "fa-solid fa-toolbox",
            action_type: "client_event",
            action: 'boii_target:cl:open_toolbox',
            params: {}
        }
    ];

    const test_action_menu = new ActionMenu();
    test_action_menu.create_menu(test_menu);
});
*/
