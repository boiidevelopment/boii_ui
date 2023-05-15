//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

let notify
let draw_text
let progress
let keydrop
let anagram
let skill_circle
let code_crack
let chip_hack

window.addEventListener('message', function (event) {
    let data = event.data
    if (data.action === 'open_settings') {
        open_settings()
    } else if (data.action === 'close_settings') {
        close_settings()
    } else if (data.action === 'send_notification') {
        notify = new NotificationManager(notif_styles);
        notify.create_notification(data.notification.header, data.notification.text, data.notification.type, data.notification.duration);
    } else if (data.action === 'open_drawtext') {
        draw_text = new DrawText(data.drawtext.header, data.drawtext.text, data.drawtext.type)
        draw_text.display()
    } else if (data.action === 'close_drawtext') {
        draw_text = new DrawText()
        draw_text.close()
    } else if (data.action === 'start_progressbar') {
        progress = new ProgressBar()
        progress.create_progressbar(data.bar.text, data.bar.style, data.bar.duration)
    } else if (data.action === 'cancel_progressbar') {
        progress.progressbar_end(false)
    } else if (data.action === 'start_skill_circle') {
        skill_circle = new SkillCircle()
        skill_circle.create_skill_circle(data.circle.type, data.circle.duration)
    } else if (data.action === 'start_keydrop') {
        keydrop = new KeyDrop(data.game.score_limit, data.game.miss_limit, data.game.fall_delay, data.game.new_letter_delay)
    } else if (data.action === 'start_anagram') {
        anagram = new Anagram()
        anagram.build_anagram_game(data.game.type, data.game.difficulty, data.game.guesses, data.game.time)
    } else if (data.action === 'start_code_crack') {
        code_crack = new CodeCrack()
        code_crack.start_game(data.game.type, data.game.difficulty, data.game.attempts)
    } else if (data.action === 'start_chiphack') {
        chip_hack = new ChipHack();
        chip_hack.init(data.game.chips, data.game.timer);
    } else if (data.action === 'create_menu') {
        context_menu = new ContextMenu(context_styles);
        let menu_data = data.menu;
        menu_data.menu_options.forEach((option) => {
            option.callback = (action_type, action, params, should_close) => {
                $.post(`https://${GetParentResourceName()}/trigger_event`, JSON.stringify({ action_type, action, params, should_close }));
            };
        });
        context_menu.create_menu(data.type, menu_data);
    } else if (data.action === 'close_menu') {
        context_menu.close_menu();
    }
})

function create_element(element, class_name, inner_html) {
    let new_ele = document.createElement(element)
    class_name && new_ele.classList.add(class_name)
    inner_html && (new_ele.innerHTML = inner_html)
    return new_ele
}
