----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

local keypress_callback

-- Function to start code crack game
local function keypress(message, timer, difficulty, callback)
    if keypress_active then return TriggerEvent('boii_ui:notify', nil, 'Keypress minigame is already active..', 'error', 5000) end
    keypress_active = true
    keypress_callback = callback
    SetNuiFocus(true, false)
    SendNUIMessage({
        action = 'start_keypress',
        game = {
           message = message,
           timer = timer,
           difficulty = difficulty
        }
    })
end

-- Nui callback to end game
RegisterNuiCallback('keypress_end', function(data)
    keypress_active = false
    SetNuiFocus(false, false)
    keypress_callback(data.success)
end)

-- Code crack exports
exports('keypress', keypress)

-- Test command
RegisterCommand('keypresstest', function()
    exports['boii_ui']:keypress('Press the keys in time to get back up!', 10, 2, function(success)
        if success then
            TriggerEvent('boii_ui:notify', nil, 'Keypress minigame completed successfully!', 'success', 3500)
        else
            TriggerEvent('boii_ui:notify', nil, 'Keypress minigame failed..', 'error', 3500)
        end
    end)
end)