----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

fx_version 'cerulean'
game {'gta5', 'rdr3'}

author 'boiidevelopment'

description 'BOII | Development - Utility: UI Elements'

version '0.1.3'

lua54 'yes'

ui_page 'html/index.html'

files {
    'html/**/*',
}

client_scripts {
    'client/main.lua',
    'client/contextmenu.lua',
    'client/drawtext.lua',
    'client/notifications.lua',
    'client/progressbar.lua',
    'client/dialogue.lua'
}

escrow_ignore {
    'client/*',
}
