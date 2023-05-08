----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

local keydrop_callback

-- Function to start keydrop game
local function keydrop(score_limit, miss_limit, fall_delay, new_letter_delay, callback)
    if keydrop_active then return TriggerEvent('boii_ui:notify', nil, 'Keydrop minigame is already active..', 'error', 5000) end
    keydrop_active = true
    keydrop_callback = callback
    failed = false
    SetNuiFocus(true, false)
    SendNUIMessage({
        action = 'start_keydrop',
        game = {
            score_limit = score_limit,
            miss_limit = miss_limit,
            fall_delay = fall_delay,
            new_letter_delay = new_letter_delay
        }
    })
end

-- Nui callback to end game
RegisterNuiCallback('keydrop_end', function(data)
    keydrop_active = false
    SetNuiFocus(false, false)
    keydrop_callback(data.success)
end)

-- Keydrop exports
exports('keydrop', keydrop)

-- Test command
RegisterCommand('keydroptest', function()
    exports['boii_ui']:keydrop(3, 3, 3000, 2000, function(success)
        if success then
            print('keydrop success')
        else
            print('keydrop failed')
        end
    end)
end)