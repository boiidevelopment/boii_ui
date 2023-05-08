//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

// notfication styles
const notif_styles = {
    // default style
    ['default']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(77, 203, 194, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        headerIcon: '<i class="fa-solid fa-bell"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: '/html/assets/images/logo.png',
        imageBorder: '1px solid rgba(77, 203, 194, 1.0)',
        imageBorderRadius: '15px',
        imageBoxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        animation: 'fade 2s',
        audio: 'assets/audio/eyes.ogg',
    },

    // main
    ['primary']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(46, 103, 248, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(46, 103, 248, 1.0)',
        headerIcon: undefined,
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: '<i class="fa-solid fa-circle-info"></i>',
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: undefined,
        imageBorder: undefined,
        imageBorderRadius: undefined,
        imageBoxShadow: undefined,
        animation: 'fade 2s',
        audio: 'assets/audio/eyes.ogg',
    },
    ['success']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(68, 214, 44, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(68, 214, 44, 1.0)',
        headerIcon: undefined,
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: '<i class="fa-solid fa-circle-check"></i>',
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: undefined,
        imageBorder: undefined,
        imageBorderRadius: undefined,
        imageBoxShadow: undefined,
        animation: 'fade 2s',
        audio: 'assets/audio/swift.ogg',
    },
    ['error']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(197, 70, 68, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(197, 70, 68, 1.0)',
        headerIcon: undefined,
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: '<i class="fa-solid fa-circle-exclamation"></i>',
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: undefined,
        imageBorder: undefined,
        imageBorderRadius: undefined,
        imageBoxShadow: undefined,
        animation: 'fade 2s',
        audio: 'assets/audio/pretty.ogg',
    },

    // tests
    ['lspd']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(19, 93, 216, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(19, 93, 216, 1.0)',
        headerIcon: '<i class="fa-solid fa-shield-halved"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: '/html/assets/images/lspd.png',
        imageBorder: '1px solid rgba(19, 93, 216, 1.0)',
        imageBorderRadius: '50%',
        imageBoxShadow: '0px 0px 5px 0px rgba(19, 93, 216, 1.0)',
        animation: 'fade 2s',
        audio: 'assets/audio/clearly.ogg',
    },
    ['ems']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(225, 6, 0, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(225, 6, 0, 1.0)',
        headerIcon: '<i class="fa-solid fa-user-doctor"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: '/html/assets/images/ems.png',
        imageBorder: '1px solid rgba(225, 6, 0, 1.0)',
        imageBorderRadius: '50%',
        imageBoxShadow: '0px 0px 5px 0px rgba(225, 6, 0, 1.0)',
        animation: 'fade 2s',
        audio: 'assets/audio/swift.ogg',
    },
    ['mechanic']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(104,71,141, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(104,71,141, 1.0)',
        headerIcon: '<i class="fa-solid fa-screwdriver-wrench"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: '/html/assets/images/lscustoms.png',
        imageBorder: '1px solid rgba(104,71,141, 1.0)',
        imageBorderRadius: '50%',
        imageBoxShadow: '0px 0px 5px 0px rgba(104,71,141, 1.0)',
        animation: 'fade 2s',
        audio: 'assets/audio/swift.ogg',
    },

    ['test2']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(77, 203, 194, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        headerIcon: '<i class="fa-solid fa-bell"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: undefined,
        imageBorder: undefined,
        imageBorderRadius: undefined,
        imageBoxShadow: undefined,
        animation: 'bounce 2s',
        audio: 'assets/audio/arpeggio.ogg',
    },
    ['test3']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(77, 203, 194, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        headerIcon: undefined,
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: undefined,
        imageBorder: undefined,
        imageBorderRadius: undefined,
        imageBoxShadow: undefined,
        animation: 'pulse 2s',
        audio: 'assets/audio/beep.ogg',
    },
    ['test4']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(77, 203, 194, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        headerIcon: undefined,
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: '<i class="fa-solid fa-bell"></i>',
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: undefined,
        imageBorder: undefined,
        imageBorderRadius: undefined,
        imageBoxShadow: undefined,
        animation: 'swing 2s',
        audio: 'assets/audio/graceful.ogg',
    },
    ['test5']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(77, 203, 194, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        headerIcon: undefined,
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: undefined,
        imageBorder: undefined,
        imageBorderRadius: undefined,
        imageBoxShadow: undefined,
        animation: 'rubberband 1s',
        audio: 'assets/audio/hollow.ogg',
    },
    ['test6']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(77, 203, 194, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        headerIcon: undefined,
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: undefined,
        imageBorder: undefined,
        imageBorderRadius: undefined,
        imageBoxShadow: undefined,
        animation: 'fade 2s',
        audio: undefined,
    },
}

// notifications class
class NotificationManager {
    constructor(notif_styles) {
        this.notif_styles = notif_styles;
    }

    create_notification(header, text, type, duration) {
        this.build_notification(header, text, this.notif_styles[type], duration);
    }

    build_notification(header, text, style, timer) {
        let main_div = document.getElementById('notification-container');
        let notif_container = create_element('div', 'notification');
        let notif_body = create_element('div', 'notification-body');

        if (style === undefined) {
            style === this.notif_styles['default'];
        }
        if (header !== undefined) {
            let notif_header = create_element('div', 'notification-header', style && style.headerIcon ? `${style.headerIcon}${header}` : header);
            notif_body.append(notif_header);
            notif_header.style.fontWeight = style.headerWeight;
            notif_header.style.textShadow = style.headerShadow;
        }
        if (text !== undefined) {
            let notif_message = create_element('div', 'notification-message', style && style.messageIcon ? `${style.messageIcon + text}` : text);
            notif_body.append(notif_message);
            notif_message.style.fontWeight = style.messageWeight;
        }
        notif_container.append(notif_body);
        notif_container.style.background = style.background;
        notif_container.style.boxShadow = style.boxShadow;
        notif_container.style.border = style.border;
        notif_container.style.borderRadius = style.borderRadius;
        notif_container.style.color = style.color;
        notif_container.style.fontFamily = style.fontFamily;
        notif_container.style.animation = style.animation;
        notif_container.style.float = user_notif_settings.float;

        if (style.image !== undefined) {
            let notif_image = create_element('div', 'notification-image');
            notif_image.style.backgroundImage = "url(" + style.image + ")";
            notif_image.style.border = style.border;
            notif_image.style.borderRadius = style.imageBorderRadius;
            notif_image.style.boxShadow = style.imageBoxShadow;
            notif_container.insertBefore(notif_image, notif_container.firstChild);
        }

        let notif_audio;
        if (style.audio !== undefined) {
            notif_audio = new Audio(style.audio);
        }
        setTimeout(function () {
            notif_audio && notif_audio.play();
        }, 50);
        main_div.insertBefore(notif_container, main_div.firstChild);

        let duration = timer;
        if (timer !== undefined) {
            duration === 3500;
        }
        setTimeout(function () {
            notif_container.remove();
        }, duration);
    }
}