----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

local code_crack_callback

-- Function to start code crack game
local function code_crack(style, difficulty, attempts, callback)
    if code_crack_active then return TriggerEvent('boii_ui:notify', nil, 'Code Crack minigame is already active..', 'error', 5000) end
    code_crack_active = true
    code_crack_callback = callback
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'start_code_crack',
        game = {
            type = style,
            difficulty = difficulty,
            attempts = attempts
        }
    })
end

-- Nui callback to end game
RegisterNuiCallback('code_crack_end', function(data)
    code_crack_active = false
    SetNuiFocus(false, false)
    code_crack_callback(data.success)
end)

-- Code crack exports
exports('code_crack', code_crack)

-- Test command
RegisterCommand('codecracktest', function()
    exports['boii_ui']:code_crack('default', 1, 5, function(success)
        if success then
            print('code crack success')
        else
            print('code crack fail')
        end
    end)
end)