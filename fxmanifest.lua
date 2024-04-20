--[[
     ____   ____ _____ _____   _   _____  ________      ________ _      ____  _____  __  __ ______ _   _ _______ 
    |  _ \ / __ \_   _|_   _| | | |  __ \|  ____\ \    / /  ____| |    / __ \|  __ \|  \/  |  ____| \ | |__   __|
    | |_) | |  | || |   | |   | | | |  | | |__   \ \  / /| |__  | |   | |  | | |__) | \  / | |__  |  \| |  | |   
    |  _ <| |  | || |   | |   | | | |  | |  __|   \ \/ / |  __| | |   | |  | |  ___/| |\/| |  __| | . ` |  | |   
    | |_) | |__| || |_ _| |_  | | | |__| | |____   \  /  | |____| |___| |__| | |    | |  | | |____| |\  |  | |   
    |____/ \____/_____|_____| | | |_____/|______|   \/   |______|______\____/|_|    |_|  |_|______|_| \_|  |_|   
                              | |                                                                                
                              |_|               UI ELEMENTS
]]

fx_version 'cerulean'
game {'gta5', 'rdr3'}

name 'boii_ui'
version '1.1.0'
description 'BOII | Development - Utility: UI Elements'
author 'boiidevelopment'
repository 'https://github.com/boiidevelopment/boii_ui'
lua54 'yes'

ui_page 'html/index.html'

files {
    'html/**/**/*',
}

client_scripts {
    'client/main.lua',
    'client/contextmenu.lua',
    'client/drawtext.lua',
    'client/notifications.lua',
    'client/progressbar.lua',
    'client/dialogue.lua',
    'client/actionmenu.lua'
}

server_script 'server/version.lua'

escrow_ignore {
    'client/*',
    'server/*'
}
