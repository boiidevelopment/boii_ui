----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

local function disable_controls(player, controls)
    if controls.disable_mouse then
        DisableControlAction(0, 1, true) 
        DisableControlAction(0, 2, true)
        DisableControlAction(0, 106, true)
    end
    if controls.disable_move then
        DisableControlAction(0, 30, true)
        DisableControlAction(0, 31, true)
        DisableControlAction(0, 36, true)
        DisableControlAction(0, 21, true)
    end
    if controls.disable_car_move then
        DisableControlAction(0, 63, true) 
        DisableControlAction(0, 64, true)
        DisableControlAction(0, 71, true)
        DisableControlAction(0, 72, true)
        DisableControlAction(0, 75, true)
    end
    if controls.disable_combat then
        DisablePlayerFiring(PlayerId(), true)
        DisableControlAction(0, 24, true)
        DisableControlAction(0, 25, true)
        DisableControlAction(1, 37, true)
        DisableControlAction(0, 47, true)
        DisableControlAction(0, 58, true)
        DisableControlAction(0, 140, true)
        DisableControlAction(0, 141, true)
        DisableControlAction(0, 142, true)
        DisableControlAction(0, 143, true)
        DisableControlAction(0, 263, true)
        DisableControlAction(0, 264, true)
        DisableControlAction(0, 257, true)
    end
end

local progressbar_callback

local function cancel_progressbar()
    SendNUIMessage({
        action = 'cancel_progressbar'
    })
end

local function progress(text, style, duration, allow_dead, controls, animation, callback)
    local player = PlayerPedId()
    local allow_dead = allow_dead or false
    local controls = controls or {disable_mouse = false, disable_move = false, disable_car_move = false, disable_combat = false}
    progressbar_callback = callback
    if progress_active then return TriggerEvent('boii_ui:notify', nil, 'Progressbar is already active..', 'error', 5000) end
    if not allow_dead then
        if IsEntityDead(player) then return end
    end
    SendNUIMessage({
        action = 'start_progressbar',
        bar = {
            text = text,
            style = style,
            duration = duration
        }
    })
    CreateThread(function()
        while progress_active do
            Wait(0)
            if IsControlJustReleased(0, 177 --[[backspace]]) then
                progress_active = false
                cancel_progressbar()
                break
            end
        end
    end)
    progress_active = true
    disable_controls(player, controls)
    if animation ~= nil then
        RequestAnimDict(animation.dict)
        while not HasAnimDictLoaded(animation.dict) do
            Wait(0)
        end
        TaskPlayAnim(player, animation.dict, animation.anim, 3.0, 3.0, -1, animation.flags, 0, false, false, false)
    end
end


RegisterNUICallback('progressbar_end', function(data)
    progress_active = false 
    progressbar_callback(data.success)
end)

exports('progress', progress)

RegisterCommand('progresstest', function()
    local player = PlayerPedId()
    exports['boii_ui']:progress('Progressbar Test..', 'default', 60, false, {
        disable_mouse = false, 
        disable_move = false,
        disable_car_move = false,
        disable_combat = false
    }, {
        dict = 'anim@amb@board_room@supervising@',
        anim = 'think_01_hi_amy_skater_01',
        flags = 49
    }, function(finish)
        if finish then
            ClearPedTasks(player)
            print('bar finish')
        else
            ClearPedTasks(player)
            print('bar cancelled')
        end
    end)
end)

RegisterCommand('progresstest2', function()
    local player = PlayerPedId()
    exports['boii_ui']:progress('Doing Cop Things..', 'lspd', 60, false, {
        disable_mouse = false, 
        disable_move = false,
        disable_car_move = false,
        disable_combat = false
    }, {
        dict = 'anim@amb@nightclub@peds@',
        anim = 'rcmme_amanda1_stand_loop_cop',
        flags = 9
    }, function(finish)
        if finish then
            ClearPedTasks(player)
            print('bar finish')
        else
            ClearPedTasks(player)
            print('bar cancelled')
        end
    end)
end)

RegisterCommand('progresstest3', function()
    local player = PlayerPedId()
    exports['boii_ui']:progress('Doing EMS Things..', 'ems', 60, false, {
        disable_mouse = false, 
        disable_move = false,
        disable_car_move = false,
        disable_combat = false
    }, {
        dict = 'amb@medic@standing@tendtodead@base',
        anim = 'base',
        flags = 9
    }, function(finish)
        if finish then
            ClearPedTasks(player)
            print('bar finish')
        else
            ClearPedTasks(player)
            print('bar cancelled')
        end
    end)
end)

RegisterCommand('progresstest4', function()
    local player = PlayerPedId()
    exports['boii_ui']:progress('Doing Mechanic Things..', 'mechanic', 60, false, {
        disable_mouse = false, 
        disable_move = false,
        disable_car_move = false,
        disable_combat = false
    }, {
        dict = 'mp_car_bomb',
        anim = 'car_bomb_mechanic',
        flags = 16
    }, function(finish)
        if finish then
            ClearPedTasks(player)
            print('bar finish')
        else
            ClearPedTasks(player)
            print('bar cancelled')
        end
    end)
end)