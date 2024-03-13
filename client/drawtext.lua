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

--- @section Variables

local active = false

--- @section Local functions

--- Shows drawtext on the UI with specified parameters.
-- @param header string: The header of the drawtext.
-- @param text string: The main text content.
-- @param icon string: An optional icon class (e.g., Font Awesome class) to display with the text.

local function show_drawtext(header, text, icon)
    if active then return end
    active = true
    SendNUIMessage({
        action = 'show_text',
        drawtext = {
            header = header,
            text = text,
            icon = icon
        }
    })
end

--- Hides the currently displayed drawtext.
local function hide_drawtext()
    active = false
    SendNUIMessage({
        action = 'hide_text',
    })
end

--- @section Exports

-- Exports to show drawtext.
exports('show_drawtext', show_drawtext)

-- Export to hide drawtext.
exports('hide_drawtext', hide_drawtext)

--- @section Test stuff

--- Command to show drawtext
RegisterCommand('test_drawtext_show', function()
    local header = "Test Header"
    local text = "This is a test message."
    local icon = "fa fa-info-circle"
    exports['boii_ui']:show_drawtext(header, text, icon)
end, false)

--- Command to hide drawtext
RegisterCommand('test_drawtext_hide', function()
    exports['boii_ui']:hide_drawtext()
end, false)
