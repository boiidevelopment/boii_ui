----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

local chip_hack_callback

-- Function to start chip hack game
local function chip_hack(chips, timer, callback)
    if chip_hack_active then return TriggerEvent('boii_ui:notify', nil, 'Chip hack minigame is already active..', 'error', 5000) end
    chiphack_active = true
    chip_hack_callback = callback
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'start_chiphack',
        game = {
            chips = chips,
            timer = timer
        }
    })
end

-- Nui callback to end game
RegisterNUICallback('chiphack_end', function(data)
    SetNuiFocus(false, false)
    chiphack_active = false
    chip_hack_callback(data.success)
end)

-- Chiphack exports
exports('chip_hack', chip_hack)

-- Test command
RegisterCommand('chiphacktest', function()
    exports['boii_ui']:chip_hack(3, 60, function(success)
        if success then
            print('chip hack success')
        else
            print('chip hack fail')
        end
    end)
end)