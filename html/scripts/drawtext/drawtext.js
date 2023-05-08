//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

// drawtext styles
const drawtext_styles = {
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
        audio: 'assets/audio/when.ogg',
    },

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
        animation: 'bounce 2s',
        audio: 'assets/audio/beep.ogg',
    },
    ['ems']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(225, 6, 0, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(225, 6, 0, 1.0)',
        headerIcon: '<i class="fa-solid fa-notes-medical"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: '/html/assets/images/ems.png',
        imageBorder: '1px solid rgba(225, 6, 0, 1.0)',
        imageBorderRadius: '50%',
        imageBoxShadow: '0px 0px 5px 0px rgba(225, 6, 0, 1.0)',
        animation: 'pulse 2s',
        audio: 'assets/audio/beep.ogg',
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
        audio: 'assets/audio/beep.ogg',
    },

}

// drawtext class
class DrawText {
    constructor(header, text, type) {
        this.header = header;
        this.text = text;
        this.type = type;
    }

    build(style) {
        let main_div = document.getElementById('drawtext-container')
        let drawtext_container = create_element('div', 'drawtext')
        let drawtext_body = create_element('div', 'drawtext-body')
        if (style === undefined) {
            style = drawtext_styles['default']
        }
        if (this.header !== undefined) {
            let drawtext_header = create_element('div','drawtext-header', style && style.headerIcon ? `${style.headerIcon}${this.header}` : this.header)
            drawtext_body.append(drawtext_header)
            drawtext_header.style.fontWeight = style.headerWeight
            drawtext_header.style.textShadow = style.headerShadow
        }
        if (this.text !== undefined) {
            let drawtext_message = create_element('div','drawtext-message', style && style.messageIcon ? `${style.messageIcon}${this.text}` : this.text)
            drawtext_body.append(drawtext_message)
            drawtext_message.style.fontWeight = style.messageWeight
        }
        drawtext_container.append(drawtext_body)
        drawtext_container.style.background = style.background
        drawtext_container.style.boxShadow = style.boxShadow
        drawtext_container.style.border = style.border
        drawtext_container.style.borderRadius = style.borderRadius
        drawtext_container.style.color = style.color
        drawtext_container.style.fontFamily = style.fontFamily
        drawtext_container.style.animation = style.animation
        drawtext_container.style.float = user_drawtext_settings.float;
        if (style.image !== undefined) {
            let drawtext_image = create_element('div', 'drawtext-image')
            drawtext_image.style.backgroundImage = "url("+style.image+")"
            drawtext_image.style.border = style.border
            drawtext_image.style.borderRadius = style.imageBorderRadius
            drawtext_image.style.boxShadow = style.imageBoxShadow
            drawtext_container.insertBefore(drawtext_image, drawtext_container.firstChild)
        }
        let drawtext_audio
        if (style.audio !== undefined) {
            drawtext_audio = new Audio(style.audio)
        }
        setTimeout(function () {
            drawtext_audio && drawtext_audio.play()
        }, 50)
        main_div.insertBefore(drawtext_container, main_div.firstChild)
    }

    display() {
        this.build(drawtext_styles[this.type]);
    }

    close() {
        $('#drawtext-container').empty();
    }
}