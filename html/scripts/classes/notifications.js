//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

const notification_styles = {
    system: {
        icon: 'fa fa-info-circle',
        header_text: 'System Alert',
        message: 'This is a system alert notification.',
        style: {
            background: '#1f1e1e',
            border_size: '3px',
            border_style: 'solid',
            border_colour: '#2a0800',
            border_radius: '15px',
            text_colour: '#b4b4b4',
            animation: '1s',
        }
    },
    staff: {
        icon: 'fa fa-user-secret',
        header_text: 'Staff Message',
        message: 'This is a staff message.',
        style: {
            background: '#1f1e1e',
            border_size: '3px',
            border_style: 'solid',
            border_colour: '#4dcbc2',
            border_radius: '15px',
            text_colour: '#b4b4b4',
            animation: '1s',
        }
    },
    general: {
        icon: 'fa fa-bullhorn',
        header_text: 'General',
        message: 'This is a general notification.',
        style: {
            background: '#1f1e1e',
            border_size: '3px',
            border_style: 'solid',
            border_colour: '#b4b4b4',
            border_radius: '15px',
            text_colour: '#b4b4b4',
            animation: '1s',
        }
    },
    warning: {
        icon: 'fa fa-exclamation-triangle',
        header_text: 'Warning',
        message: 'This is a warning notification.',
        style: {
            background: '#1f1e1e',
            border_size: '3px',
            border_style: 'solid',
            border_colour: '#ffa500',
            border_radius: '15px',
            text_colour: '#b4b4b4',
            animation: '1s',
        }
    },
    error: {
        icon: 'fa fa-times-circle',
        header_text: 'Error',
        message: 'This is an error notification.',
        style: {
            background: '#1f1e1e',
            border_size: '3px',
            border_style: 'solid',
            border_colour: '#ff0000',
            border_radius: '15px',
            text_colour: '#b4b4b4',
            animation: '1s',
        }
    },
    success: {
        icon: 'fa fa-check-circle',
        header_text: 'Success',
        message: 'This is a success notification.',
        style: {
            background: '#1f1e1e',
            border_size: '3px',
            border_style: 'solid',
            border_colour: '#00ff00',
            border_radius: '15px',
            text_colour: '#b4b4b4',
            animation: '1s',
        }
    },
    information: {
        icon: 'fa fa-info-circle',
        header_text: 'Information',
        message: 'This is an information notification.',
        style: {
            background: '#1f1e1e',
            border_size: '3px',
            border_style: 'solid',
            border_colour: '#800080',
            border_radius: '15px',
            text_colour: '#b4b4b4',
            animation: '1s',
        }
    },
    police: {
        icon: 'fa fa-shield-halved',
        header_text: 'Police Alert',
        message: 'This is a police notification.',
        style: {
            background: '#1f1e1e',
            border_size: '3px',
            border_style: 'solid',
            border_colour: '#0000ff',
            border_radius: '15px',
            text_colour: '#b4b4b4',
            animation: '1s',
        }
    },
    ems: {
        icon: 'fa fa-ambulance',
        header_text: 'EMS Alert',
        message: 'This is an EMS notification.',
        style: {
            background: '#1f1e1e',
            border_size: '3px',
            border_style: 'solid',
            border_colour: '#ffb6c1',
            border_radius: '15px',
            text_colour: '#b4b4b4',
            animation: '1s',
        }
    },
};

class NotificationManager {
    constructor() {
        this.styles = notification_styles;
        this.notifications_enabled = true;
        this.custom_styles = {};
        this.position = { top: '10px', left: '10px' };
        this.alignment = 'flex-start';
        this.load_user_settings();
        this.create_notification_container();
    }

    load_user_settings() {
        this.notifications_enabled = localStorage.getItem('notifications_enabled') !== 'false';
        const user_styles = localStorage.getItem('custom_notification_style');
        const user_position = localStorage.getItem('notification_container_position');
        const user_alignment = localStorage.getItem('notification_alignment');
        if (user_styles) {
            try {
                this.custom_styles = JSON.parse(user_styles);
            } catch (e) {
                console.error("Error parsing custom notification styles:", e);
            }
        } else {
            this.custom_styles = this.styles;
        }
        if (user_position) {
            this.position = JSON.parse(user_position);
        }
        if (user_alignment) {
            this.alignment = user_alignment === 'left' ? 'flex-start' : user_alignment === 'center' ? 'center' : 'flex-end';
        }
    }

    create_notification_container() {
        if ($('.notification_container').length === 0) {
            const container = $('<div>').addClass('notification_container').css({
                'position': 'fixed',
                'top': this.position.top,
                'left': this.position.left,
                'align-items': this.alignment,
                'z-index': 2000
            });
            $('body').append(container);
        } else {
            $('.notification_container').css({
                'top': this.position.top,
                'left': this.position.left,
                'align-items': this.alignment,
                'z-index': 2000
            });
        }
    }

    create_notification(data) {
        let type = data.type || 'general';
        let header = data.header || 'No header was provided';
        let message = data.message || 'No message was provided';
        let duration = data.duration || 3500;
        if (!this.notifications_enabled) {
            console.log("Notifications are disabled.");
            return;
        }
        const style = this.custom_styles[type] ? this.custom_styles[type].style : this.styles[type].style;
        const icon = this.styles[type] ? this.styles[type].icon : '';
        this.build_notification(header, message, style, icon, duration);
    }

    build_notification(header, message, style, icon, duration) {
        let notification_container = $('.notification_container');
        const border =  `${style.border_size} ${style.border_style} ${style.border_colour}`;
        const notification_style = {
            'border-radius': style.border_radius,
            'border': border,
            'color': style.text_colour,
            'background': style.background,
            'animation': 'fade '+ style.animation
        };
        const notification_div = $('<div>').addClass('notification').css(notification_style);
        if (icon) {
            const icon_div = $('<i>').addClass(icon);
            const header_div = $('<div>').addClass('notification_header').append(icon_div, header);
            notification_div.append(header_div);
        } else {
            const header_div = $('<div>').addClass('notification_header').text(header);
            notification_div.append(header_div);
        }
        const message_div = $('<div>').addClass('notification_message').text(message);
        notification_div.append(message_div);
        notification_container.append(notification_div);
        setTimeout(() => {
            notification_div.fadeOut(500, function() {
                $(this).remove();
            });
        }, duration);
    }
    
    show_all_notifications() {
        let delay = 0;
        const delay_inc = 1000;
        for (const [type, details] of Object.entries(this.styles)) {
            setTimeout(() => {
                this.create_notification(type, details.header_text, details.message, 15000);
            }, delay);
            delay += delay_inc;
        }
    }
}

/*
$(document).ready(function() {
    const notif_manager = new NotificationManager();
    notif_manager.create_notification('success', 'Test', 'test test test', 120000);
    //notif_manager.show_all_notifications();
});
*/
