----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

-- Function to show drawtext
local function show_drawtext(header, text, style) 
    SendNUIMessage({
        action = 'open_drawtext',
        drawtext = {
            header = header,
            text = text,
            type = style,
        }
    })
end

-- Function to hide drawtext
local function hide_drawtext()
    SendNUIMessage({
        action = 'close_drawtext',
    })
end

-- Drawtext exports
exports('show_drawtext', show_drawtext)
exports('hide_drawtext', hide_drawtext)

RegisterCommand('drawtexttest1', function()
    exports['boii_ui']:show_drawtext('TEST DRAWTEXT', 'Test drawtext.', 'default')
end)

RegisterCommand('drawtexttest2', function()
    exports['boii_ui']:show_drawtext('LSPD TEST', 'Test lspd drawtext.', 'lspd')
end)

RegisterCommand('drawtexttest3', function()
    exports['boii_ui']:show_drawtext('EMS TEST', 'Test ems drawtext.', 'ems')
end)

RegisterCommand('drawtexttest4', function()
    exports['boii_ui']:show_drawtext('MECHANIC TEST', 'Test mechanic drawtext.', 'mechanic')
end)

RegisterCommand('hidedrawtext', function()
    exports['boii_ui']:hide_drawtext()
end)