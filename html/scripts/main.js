let settings = null;
let notification = null;
let drawtext = null;
let progress = null;
let dialogue = null;

window.addEventListener('message', function (event) {
    let data = event.data;
    if (data.action === 'open_settings') {
        settings = new Settings();
        settings.init();
    } else if (data.action === 'close_settings') {
        if (settings) {
            settings.close();
        }
    } else if (data.action === 'create_notification') {
        if (!notification) {
            notification = new NotificationManager();
        }
        notification.create_notification(data.notification);
    } else if (data.action === 'show_text') {
        drawtext = new DrawTextManager();
        drawtext.show_text(data.drawtext.header, data.drawtext.text, data.drawtext.icon);
    } else if (data.action === 'hide_text') {
        if (drawtext) {
            drawtext.hide_text();
        }
    } else if (data.action === 'progress') {
        progress = new Progressbar();
        progress.create(data.progress.header, data.progress.icon, data.progress.duration);
    } else if (data.action === 'create_menu') {
        context = new ContextManager();
        context.init(data.menu);   
    } else if (data.action === 'close_menu') {
        if (context) {
            context.close();
        }
    } else if (data.action === 'create_dialogue') {
        dialogue = new DialogueManager();
        dialogue.init(data.dialogue);
    }
});

function rgb_to_hex(rgb) {
    if (!rgb) return '#000000';
    let parts = rgb.match(/\d+/g);
    if (!parts || parts.length !== 3) return '#000000';
    let r = parseInt(parts[0], 10),
        g = parseInt(parts[1], 10),
        b = parseInt(parts[2], 10);
    r = r.toString(16).padStart(2, '0');
    g = g.toString(16).padStart(2, '0');
    b = b.toString(16).padStart(2, '0');
    return '#' + r + g + b;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/gm,'');
}