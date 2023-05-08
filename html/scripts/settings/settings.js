//------------------------------\\
//---\\ BOII | DEVELOPMENT //---\\
//------------------------------\\

/*
    TO DO: 

    refactor.. lot of useless code atm
    
*/

let user_ui_settings
let user_notif_settings
let user_drawtext_settings
let user_progress_settings
let user_keydrop_settings
let user_circle_settings
let user_anagram_settings
let user_codecrack_settings

// defaults
const default_ui_settings = {
    top: 0,
    left: 680
}
const default_notif_settings = {
    top: 0,
    left: 1360,
    float: 'right',
    audio: true
}
const default_drawtext_settings = {
    top: 500,
    left: 0,
    float: 'left',
    audio: true
}
const default_progress_settings = {
    top: 900,
    left: 725,
    audio: true
}
const default_keydrop_settings = {
    top: 0,
    left: 1440,
    audio: true
}
const default_circle_settings = {
    top: 475,
    left: 830,
    audio: true
}
const default_anagram_settings = {
    top: 325,
    left: 750,
    audio: true
}
const default_codecrack_settings = {
    top: 350,
    left: 750
}
$(() => {
    build_settings()
    let selected = null, x_pos = 0, y_pos = 0, x_elem = 0, y_elem = 0
    function drag_element(elem) {
        selected = elem
        x_elem = x_pos - $(selected).offset().left
        y_elem = y_pos - $(selected).offset().top
    } 
    function move_element(e) {
        x_pos = e.pageX;
        y_pos = e.pageY;
        if (selected !== null) {
            let top = y_pos - y_elem;
            let left = x_pos - x_elem;
            left > 0 && left < window.innerWidth - $(selected).outerWidth() && (selected.style.left = left + 'px');
            top > 0 && top < window.innerHeight - $(selected).outerHeight() && (selected.style.top = top + 'px');
        }
    }
    function stop_drag() {
        selected = null
    }
    document.onmousemove = move_element
    document.onmouseup = stop_drag
    function change_float(elem) {
        float_ele = elem
        var currentFloat = float_ele.css('float')
        if (currentFloat === 'right') {
            float_ele.css('float', 'left')
        } else {
            float_ele.css('float', 'right')
        }
    }
    $('.settings-move').on('mousedown', function () {
        let move_ele = document.getElementById('settings-container')
        drag_element(move_ele)
    })
    $('.settings-save').on('click', function () {
        user_ui_settings.top = parseInt($('#settings-container').css('top').replace('px', ''))
        user_ui_settings.left = parseInt($('#settings-container').css('left').replace('px', ''))
        user_notif_settings.top = parseInt($('#notification-dummy-container').css('top').replace('px', ''))
        user_notif_settings.left = parseInt($('#notification-dummy-container').css('left').replace('px', ''))
        user_notif_settings.float = ($('.notification-dummy').css('float'))
        user_drawtext_settings.top = parseInt($('#drawtext-dummy-container').css('top').replace('px', ''))
        user_drawtext_settings.left = parseInt($('#drawtext-dummy-container').css('left').replace('px', ''))
        user_drawtext_settings.float = ($('.drawtext-dummy').css('float'))
        user_progress_settings.top = parseInt($('#progress-dummy-container').css('top').replace('px', ''))
        user_progress_settings.left = parseInt($('#progress-dummy-container').css('left').replace('px', ''))
        user_keydrop_settings.top = parseInt($('#keydrop-dummy-container').css('top').replace('px', ''))
        user_keydrop_settings.left = parseInt($('#keydrop-dummy-container').css('left').replace('px', ''))
        user_circle_settings.top = parseInt($('#skill-circle-dummy-container').css('top').replace('px', ''))
        user_circle_settings.left = parseInt($('#skill-circle-dummy-container').css('left').replace('px', ''))
        user_anagram_settings.top = parseInt($('#anagram-dummy-container').css('top').replace('px', ''))
        user_anagram_settings.left = parseInt($('#anagram-dummy-container').css('left').replace('px', ''))
        user_codecrack_settings.top = parseInt($('#code-crack-dummy-container').css('top').replace('px', ''))
        user_codecrack_settings.left = parseInt($('#code-crack-dummy-container').css('left').replace('px', ''))
        save_ui_settings(user_ui_settings, user_notif_settings, user_drawtext_settings, user_progress_settings, user_keydrop_settings, user_circle_settings, user_anagram_settings, user_codecrack_settings)
        $.post(`https://${GetParentResourceName()}/save_ui_settings`, JSON.stringify({}));
    })
    $('.settings-close').on('mousedown', function () {
        close_settings()
    })
    $('.notification-toggle').on('click', function () {
        let dummy_ele = $('#notification-dummy-container')
        dummy_ele.toggleClass('hidden')
    })
    $('.drawtext-toggle').on('click', function () {
        let dummy_ele = $('#drawtext-dummy-container')
        dummy_ele.toggleClass('hidden')
    })
    $('.progress-toggle').on('click', function () {
        let dummy_ele = $('#progress-dummy-container')
        dummy_ele.toggleClass('hidden')
    })
    $('.keydrop-toggle').on('click', function () {
        let dummy_ele = $('#keydrop-dummy-container')
        dummy_ele.toggleClass('hidden')
    })
    $('.skillcircle-toggle').on('click', function () {
        let dummy_ele = $('#skill-circle-dummy-container')
        dummy_ele.toggleClass('hidden')
    })
    $('.anagram-toggle').on('click', function () {
        let dummy_ele = $('#anagram-dummy-container')
        dummy_ele.toggleClass('hidden')
    })
    $('.codecrack-toggle').on('click', function () {
        let dummy_ele = $('#code-crack-dummy-container')
        dummy_ele.toggleClass('hidden')
    })
    $('.notification-move').on('mousedown', function () {
        let move_ele = document.getElementById('notification-dummy-container')
        drag_element(move_ele)
    })
    $('.notification-float').on('click', function () {
        let float_ele = $('.notification')
        let dummy_ele = $('.notification-dummy')
        $(this).find('i').toggleClass('fa-solid fa-align-right fa-solid fa-align-left')
        change_float(float_ele)
        change_float(dummy_ele)
    })
    $('.drawtext-move').on('mousedown', function () {
        let move_ele = document.getElementById('drawtext-dummy-container')
        drag_element(move_ele)
    })
    $('.drawtext-float').on('click', function () {
        let float_ele = $('.drawtext')
        let dummy_ele = $('.drawtext-dummy')
        $(this).find('i').toggleClass('fa-solid fa-align-right fa-solid fa-align-left')
        change_float(float_ele)
        change_float(dummy_ele)
    })
    $('.progress-move').on('mousedown', function () {
        let move_ele = document.getElementById('progress-dummy-container')
        drag_element(move_ele)
    })
    $('.keydrop-move').on('mousedown', function () {
        let move_ele = document.getElementById('keydrop-dummy-container')
        drag_element(move_ele)
    })
    $('.skill-circle-move').on('mousedown', function () {
        let move_ele = document.getElementById('skill-circle-dummy-container')
        drag_element(move_ele)
    })
    $('.anagram-move').on('mousedown', function () {
        let move_ele = document.getElementById('anagram-dummy-container')
        drag_element(move_ele)
    })
    $('.code-crack-move').on('mousedown', function () {
        let move_ele = document.getElementById('code-crack-dummy-container')
        drag_element(move_ele)
    })
})

function build_settings() {
    if (user_ui_settings == null) {
        localStorage.setItem('user_settings_ui', JSON.stringify(default_ui_settings))
        user_ui_settings = default_ui_settings
    }
    if (user_notif_settings == null) {
        localStorage.setItem('user_settings_notif', JSON.stringify(default_notif_settings))
        user_notif_settings = default_notif_settings
    }
    if (user_drawtext_settings == null) {
        localStorage.setItem('user_settings_drawtext', JSON.stringify(default_drawtext_settings))
        user_drawtext_settings = default_drawtext_settings
    }
    if (user_progress_settings == null) {
        localStorage.setItem('user_settings_progress', JSON.stringify(default_progress_settings))
        user_progress_settings = default_progress_settings
    }
    if (user_keydrop_settings == null) {
        localStorage.setItem('user_settings_keydrop', JSON.stringify(default_keydrop_settings))
        user_keydrop_settings = default_keydrop_settings
    }
    if (user_circle_settings == null) {
        localStorage.setItem('user_settings_circle', JSON.stringify(default_circle_settings))
        user_circle_settings = default_circle_settings
    }
    if (user_anagram_settings == null) {
        localStorage.setItem('user_settings_anagram', JSON.stringify(default_anagram_settings))
        user_anagram_settings = default_anagram_settings
    }
    if (user_codecrack_settings == null) {
        localStorage.setItem('user_settings_codecrack', JSON.stringify(default_codecrack_settings))
        user_codecrack_settings = default_codecrack_settings
    }
    user_ui_settings = JSON.parse(localStorage.getItem('user_settings_ui'))
    user_notif_settings = JSON.parse(localStorage.getItem('user_settings_notif'))
    user_drawtext_settings = JSON.parse(localStorage.getItem('user_settings_drawtext'))
    user_progress_settings = JSON.parse(localStorage.getItem('user_settings_progress'))
    user_keydrop_settings = JSON.parse(localStorage.getItem('user_settings_keydrop'))
    user_circle_settings = JSON.parse(localStorage.getItem('user_settings_circle'))
    user_anagram_settings = JSON.parse(localStorage.getItem('user_settings_anagram'))
    user_codecrack_settings = JSON.parse(localStorage.getItem('user_settings_codecrack'))
    $('#settings-container').css({
      top: user_ui_settings.top,
      left: user_ui_settings.left,
    })
    $('#notification-container').css({
        top: user_notif_settings.top,
        left: user_notif_settings.left
    })
    $('#notification-dummy-container').css({
        top: user_notif_settings.top,
        left: user_notif_settings.left
    })
    $('.notification').css({
        float: user_notif_settings.float
    })
    $('.notification-dummy').css({
        float: user_notif_settings.float
    })
    $('#drawtext-container').css({
        top: user_drawtext_settings.top,
        left: user_drawtext_settings.left
    })
    $('.drawtext').css({
        float: user_drawtext_settings.float
    })
    $('#drawtext-dummy-container').css({
        top: user_drawtext_settings.top,
        left: user_drawtext_settings.left
    })
    $('.drawtext-dummy').css({
        float: user_drawtext_settings.float
    })
    $('#progress-container').css({
        top: user_progress_settings.top,
        left: user_progress_settings.left
    })
    $('#progress-dummy-container').css({
        top: user_progress_settings.top,
        left: user_progress_settings.left
    })
    $('#keydrop-container').css({
        top: user_keydrop_settings.top,
        left: user_keydrop_settings.left
    })
    $('#keydrop-dummy-container').css({
        top: user_keydrop_settings.top,
        left: user_keydrop_settings.left
    })
    $('#skill-circle-container').css({
        top: user_circle_settings.top,
        left: user_circle_settings.left
    })
    $('#skill-circle-dummy-container').css({
        top: user_circle_settings.top,
        left: user_circle_settings.left
    })
    $('.anagram-container').css({
        top: user_anagram_settings.top,
        left: user_anagram_settings.left
    })
    $('#anagram-dummy-container').css({
        top: user_anagram_settings.top,
        left: user_anagram_settings.left
    })
    $('.codecrack-container').css({
        top: user_codecrack_settings.top,
        left: user_codecrack_settings.left
    })
    $('#code-crack-dummy-container').css({
        top: user_codecrack_settings.top,
        left: user_codecrack_settings.left
    })
    save_ui_settings(user_ui_settings, user_notif_settings, user_drawtext_settings, user_progress_settings, user_keydrop_settings, user_circle_settings, user_anagram_settings, user_codecrack_settings)
}

function set_ui_positions() {
    $('#settings-container').css('top', user_ui_settings.top + 'px');
    $('#settings-container').css('left', user_ui_settings.left + 'px');
    $('#notification-container').css('top', user_notif_settings.top + 'px');
    $('#notification-container').css('left', user_notif_settings.left + 'px');
    $('.notification').css('float', user_notif_settings.float);
    $('.notification-dummy').css('float', user_notif_settings.float);
    $('#notification-dummy-container').css('top', user_notif_settings.top + 'px');
    $('#notification-dummy-container').css('left', user_notif_settings.left + 'px');
    $('#drawtext-container').css('top', user_drawtext_settings.top + 'px');
    $('#drawtext-container').css('left', user_drawtext_settings.left + 'px');
    $('.drawtext').css('float', user_drawtext_settings.float);
    $('#drawtext-dummy-container').css('top', user_drawtext_settings.top + 'px');
    $('#drawtext-dummy-container').css('left', user_drawtext_settings.left + 'px');
    $('.drawtext-dummy').css('float', user_drawtext_settings.float);
    $('#progress-container').css('top', user_progress_settings.top + 'px');
    $('#progress-container').css('left', user_progress_settings.left + 'px');
    $('#progress-dummy-container').css('top', user_progress_settings.top + 'px');
    $('#progress-dummy-container').css('left', user_progress_settings.left + 'px');
    $('#keydrop-container').css('top', user_keydrop_settings.top + 'px');
    $('#keydrop-container').css('left', user_keydrop_settings.left + 'px');
    $('#keydrop-dummy-container').css('top', user_keydrop_settings.top + 'px');
    $('#keydrop-dummy-container').css('left', user_keydrop_settings.left + 'px');
    $('#skill-circle-container').css('top', user_circle_settings.top + 'px');
    $('#skill-circle-container').css('left', user_circle_settings.left + 'px');
    $('#skill-circle-dummy-container').css('top', user_circle_settings.top + 'px');
    $('#skill-circle-dummy-container').css('left', user_circle_settings.left + 'px');
    $('.anagram-container').css('top', user_anagram_settings.top + 'px');
    $('.anagram-container').css('left', user_anagram_settings.left + 'px');
    $('#anagram-dummy-container').css('top', user_anagram_settings.top + 'px');
    $('#anagram-dummy-container').css('left', user_anagram_settings.left + 'px');
    $('.codecrack-container').css('top', user_codecrack_settings.top + 'px');
    $('.codecrack-container').css('left', user_codecrack_settings.left + 'px');
    $('#code-crack-dummy-container').css('top', user_codecrack_settings.top + 'px');
    $('#code-crack-dummy-container').css('left', user_codecrack_settings.left + 'px');
}
  
function save_ui_settings(user_ui_settings, user_notif_settings, user_drawtext_settings, user_progress_settings, user_keydrop_settings, user_circle_settings, user_anagram_settings, user_codecrack_settings) {
    localStorage.setItem('user_settings_ui', JSON.stringify(user_ui_settings))
    localStorage.setItem('user_settings_notif', JSON.stringify(user_notif_settings))
    localStorage.setItem('user_settings_drawtext', JSON.stringify(user_drawtext_settings))
    localStorage.setItem('user_settings_progress', JSON.stringify(user_progress_settings))
    localStorage.setItem('user_settings_keydrop', JSON.stringify(user_keydrop_settings))
    localStorage.setItem('user_settings_circle', JSON.stringify(user_circle_settings))
    localStorage.setItem('user_settings_anagram', JSON.stringify(user_anagram_settings))
    localStorage.setItem('user_settings_codecrack', JSON.stringify(user_codecrack_settings))
    set_ui_positions()
    $.post(`https://${GetParentResourceName()}/saved_settings`, JSON.stringify({}));
}  

function open_settings() {
    $('#settings-container').removeClass('hidden')
    $('#settings-container').css({'background': 'rgba(0, 0, 0, 0.1'})
}

function close_settings() {
    $('#settings-container').addClass('hidden')
    $('#settings-container').css({'background': 'rgba(0, 0, 0, 0'})
    $('#notification-dummy-container').addClass('hidden')
    $('#drawtext-dummy-container').addClass('hidden')
    $('#progress-dummy-container').addClass('hidden')
    $('#keydrop-dummy-container').addClass('hidden')
    $('#skill-circle-dummy-container').addClass('hidden')
    $('#anagram-dummy-container').addClass('hidden')
    $('#code-crack-dummy-container').addClass('hidden')
    set_ui_positions()
    $.post(`https://${GetParentResourceName()}/close_settings`, JSON.stringify({}));
}

