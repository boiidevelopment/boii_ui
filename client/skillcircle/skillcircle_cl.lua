----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

local skill_circle_callback

-- Function to start skill circle
local function skill_circle(type, duration, allow_dead, animation, callback)
    local player = PlayerPedId()
    local allow_dead = allow_dead or false
    skill_circle_callback = callback
    if circle_active then return TriggerEvent('boii_ui:notify', nil, 'Skill circle is already active..', 'error', 5000) end
    if not allow_dead then
        if IsEntityDead(player) then return end
    end
    SetNuiFocus(true, false)
    SendNUIMessage({
        action = 'start_skill_circle',
        circle = {
            type = type,
            duration = duration
        }
    })
    circle_active = true
    if animation ~= nil then
        RequestAnimDict(animation.dict)
        while not HasAnimDictLoaded(animation.dict) do
            Wait(0)
        end
        TaskPlayAnim(player, animation.dict, animation.anim, 3.0, 3.0, -1, animation.flags, 0, false, false, false)
    end
end

-- Nui callback to end game
RegisterNUICallback('circle_end', function(data)
    circle_active = false
    SetNuiFocus(false, false)
    skill_circle_callback(data.success)
end)

-- Skill circle exports
exports('skill_circle', skill_circle)

--<!>-- TEST COMMANDS DELETE THESE --<!>--
RegisterCommand('circletest', function()
    local player = PlayerPedId()
    exports['boii_ui']:skill_circle('default', 25, false, {
        dict = 'anim@amb@board_room@supervising@',
        anim = 'think_01_hi_amy_skater_01',
        flags = 49
    }, function(success)
        if success then
            ClearPedTasks(player)
            print('circle finish')
        else
            ClearPedTasks(player)
            print('circle failed')
        end
    end)
end)

RegisterCommand('circletest2', function()
    local player = PlayerPedId()
    exports['boii_ui']:skill_circle('test', 25, false, {
        dict = 'amb@prop_human_parking_meter@female@base',
        anim = 'base_female',
        flags = 49
    }, function(success)
        if success then
            ClearPedTasks(player)
            print('circle finish')
        else
            ClearPedTasks(player)
            print('circle failed')
        end
    end)
end)

RegisterCommand('circletest3', function()
    local player = PlayerPedId()
    exports['boii_ui']:skill_circle('test2', 25, false, {
        dict = 'anim@amb@business@weed@weed_inspecting_lo_med_hi@',
        anim = 'weed_crouch_checkingleaves_idle_01_inspector',
        flags = 49
    }, function(success)
        if success then
            ClearPedTasks(player)
            print('circle finish')
        else
            ClearPedTasks(player)
            print('circle failed')
        end
    end)
end)