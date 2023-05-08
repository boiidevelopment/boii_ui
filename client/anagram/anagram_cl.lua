----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

local anagram_callback

-- Function to start anagram game
local function anagram(style, difficulty, guesses, time, callback)
    if anagram_active then return TriggerEvent('boii_ui:notify', nil, 'Anagram minigame is already active..', 'error', 5000) end
    anagram_active = true
    anagram_callback = callback
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'start_anagram',
        game = {
            type = style,
            difficulty = difficulty,
            guesses = guesses,
            time = time
        }
    })
end

-- Nui callback to end game
RegisterNUICallback('anagram_end', function(data)
    anagram_active = false
    SetNuiFocus(false, false)
    anagram_callback(data.success)
end)

-- Anagram exports
exports('anagram', anagram)

-- Test command
RegisterCommand('anagramtest', function()
    exports['boii_ui']:anagram('default', 1, 5, 30, function(success)
        if success then
            print('anagram success')
        else
            print('anagram fail')
        end
    end)
end)
