//------------------------------\\Body
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

const progress_styles = {
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
        barBackground: 'rgba(77, 203, 194, 0.5)',
        barRadius: '15px',
        animation: 'fade 1s',
        audio: 'assets/audio/hollow.ogg',
    },
    ['test']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(197, 70, 68, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(197, 70, 68, 1.0)',
        headerIcon: '<i class="fa-solid fa-bell"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        barBackground: 'rgba(197, 70, 68, 0.5)',
        barRadius: '15px',
        animation: 'fade 1s',
        audio: 'assets/audio/pretty.ogg',
    },

    ['lspd']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(46, 103, 248, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(46, 103, 248, 1.0)',
        headerIcon: '<i class="fa-solid fa-shield-halved"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        barBackground: 'rgba(46, 103, 248, 0.5)',
        barRadius: '15px',
        animation: 'fade 1s',
        audio: 'assets/audio/when.ogg',
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
        barBackground: 'rgba(225, 6, 0, 0.5)',
        barRadius: '15px',
        animation: 'fade 1s',
        audio: 'assets/audio/eyes.ogg',
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
        barBackground: 'rgba(104,71,141, 0.5)',
        barRadius: '15px',
        animation: 'fade 1s',
        audio: 'assets/audio/swift.ogg',
    },
}

class ProgressBar {
    constructor(progress_styles) {
        this.progress_styles = progress_styles;
        this.timeout = null;
    }

    create_progressbar(header, type, duration) {
        this.build_progressbar(header, progress_styles[type], duration);
    }

    build_progressbar(header, style, timer) {
        let main_div = document.getElementById('progress-container');
        let progress_container = create_element('div', 'progress-main');
        let progress_body = create_element('div', 'progress-body');
        let progress_bar = create_element('div', 'progressbar', '<span class="progress"><div class="bar-percentage">0</div></span>');

        if (style === undefined) {
            style = progress_styles['default'];
        }

        if (header !== undefined) {
            let progress_header = create_element('div', 'progress-header', style && style.headerIcon ? `${style.headerIcon}${header}` : header);
            progress_body.append(progress_header);
            progress_header.style.fontWeight = style.headerWeight;
            progress_header.style.textShadow = style.headerShadow;
        }

        progress_container.append(progress_body);

        progress_container.style.background = style.background;
        progress_container.style.boxShadow = style.boxShadow;
        progress_container.style.border = style.border;
        progress_container.style.borderRadius = style.borderRadius;
        progress_container.style.color = style.color;
        progress_container.style.fontFamily = style.fontFamily;
        progress_container.style.animation = style.animation;

        progress_bar.style.background = style.barBackground;
        progress_bar.style.borderRadius = style.barRadius;
        progress_container.append(progress_bar);

        let progress_audio;
        if (style.audio !== undefined) {
            progress_audio = new Audio(style.audio);
        }
        setTimeout(function () {
            progress_audio && progress_audio.play();
        }, 50);
        main_div.insertBefore(progress_container, main_div.firstChild);
        this.start_progressbar(0, 100, timer);
    }

    start_progressbar(bar_start, bar_end, timer) {
        let progress = $('.progressbar .progress');
        let duration = timer;
        let bar_percentage_element = $('.bar-percentage');
        let bar_percentage = 0;
        bar_percentage_element.text(bar_percentage + '%');
        progress.css({'width': bar_percentage + '%'});
        const update_progress = () => {
            bar_percentage++;
            if (bar_percentage >= bar_start && bar_percentage <= bar_end) {
                bar_percentage_element.text(bar_percentage + '%');
                progress.css({'width': bar_percentage + '%'});
                this.timeout = setTimeout(update_progress, duration); // Assign the timeout
            } else if (bar_percentage >= bar_end) {
                this.progressbar_end(true);
            }
        };
        update_progress();
    }

    progressbar_end(success) {
        clearTimeout(this.timeout); // Clear the timeout
        $('.progress .bar-percentage').text('0');
        $('.progressbar .progress').empty();
        $('#progress-container').empty();
        $.post(`https://${GetParentResourceName()}/progressbar_end`, JSON.stringify({ 'success': success }));
    }
}
