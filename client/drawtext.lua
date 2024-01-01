----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

-- Locals
local active = false

--[[
    FUNCTIONS
]]

-- Function to show drawtext
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

-- Function to hide drawtext
local function hide_drawtext()
    active = false
    SendNUIMessage({
        action = 'hide_text',
    })
end

--[[
    EXPORTS
]]

exports('show_drawtext', show_drawtext)
exports('hide_drawtext', hide_drawtext)

--[[
    TEST STUFF
]]

RegisterCommand('test_drawtext_show', function()
    local header = "Test Header"
    local text = "This is a test message."
    local icon = "fa fa-info-circle"
    exports['boii_ui']:show_drawtext(header, text, icon)
end, false)

RegisterCommand('test_drawtext_hide', function()
    exports['boii_ui']:hide_drawtext()
end, false)
