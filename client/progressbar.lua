----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

-- Locals
local active = false
local callback
local progress_props = {}

--[[
    FUNCTIONS
]]

-- Function to show progress bar with optional animation and props
local function show_progress(options, cb)
    local player = PlayerPedId()
    if IsEntityDead(player) then return end
    if active then return end
    active = true 
    callback = cb
    if options.animation then
        local anim = options.animation
        RequestAnimDict(anim.dict)
        while not HasAnimDictLoaded(anim.dict) do
            Wait(100)
        end
        TaskPlayAnim(player, anim.dict, anim.anim, anim.blend_in or 8.0, anim.blend_out or -8.0, anim.duration or -1, anim.flags or 0, anim.playback or 1, anim.lock_x or 0, anim.lock_y or 0, anim.lock_z or 0)
    end
    if options.props then
        for _, prop in ipairs(options.props) do
            local hash = GetHashKey(prop.model)
            RequestModel(hash)
            while not HasModelLoaded(hash) do
                Wait(100)
            end
            local prop_obj = CreateObject(hash, GetEntityCoords(player), true, true, false)
            AttachEntityToEntity(prop_obj, player, GetPedBoneIndex(player, prop.bone), prop.coords.x or 0.0, prop.coords.y or 0.0, prop.coords.z or 0.0, prop.rotation.x or 0.0, prop.rotation.y or 0.0, prop.rotation.z or 0.0, true, prop.use_soft or false, prop.collision or false, prop.is_ped or true, prop.rot_order or 1, prop.sync_rot or true)
            progress_props[#progress_props + 1] = prop_obj

        end
    end
    SetNuiFocus(true, false)
    SendNUIMessage({
        action = 'progress',
        progress = {
            header = options.header,
            icon = options.icon,
            duration = options.duration
        }
    })
end

--[[
    CALLBACKS
]]

-- NUI callback to end progress bar
RegisterNUICallback('progressbar_end', function(data)
    active = false
    SetNuiFocus(false, false)
    callback(data.success)
    callback = nil
    ClearPedTasks(PlayerPedId())
    for _, prop_obj in ipairs(progress_props) do
        DeleteObject(prop_obj)
    end
    progress_props = {}
end)

--[[
    EXPORTS
]]

exports('show_progress', show_progress)

--[[
    TEST STUFF
]]

RegisterCommand('test_progressbar', function()
    exports['boii_ui']:show_progress({
        header = 'Trimming Buds..', -- Progressbar header text
        icon = 'fa-solid fa-cannabis', -- Header icon
        duration = 15000, -- Total duration for bar to run in (ms)
        animation = { -- Here you can input optional animation settings to use no animation remove the section
            dict = 'amb@prop_human_parking_meter@female@base', -- Animation dictionary used if animation provided
            anim = 'base_female', -- Animation type used
            flags = 49, -- Animation flags used
            blend_in = 8.0, -- Optional setting this is hard coded in function above
            blend_out = -8.0,  -- Optional setting this is hard coded in function above
            duration = -1,  -- Optional setting this is hard coded in function above
            playback = 1,  -- Optional setting this is hard coded in function above
            lock_x = 0,  -- Optional setting this is hard coded in function above
            lock_y = 0,  -- Optional setting this is hard coded in function above
            lock_z = 0  -- Optional setting this is hard coded in function above
        },
        props = {
            {
                model = 'h4_prop_h4_weed_bud_02b', -- Prop model type to create and attach
                bone = 28422, -- Bone to attach prop to
                coords = vector3(0.09, -0.075, 0.0), -- Coords for the prop placement
                rotation = vector3(-90.0, 0.0, 0.0), -- Rotation of the prop
                soft_pin = false, -- Optional setting this is hard coded in function above
                collision = false, -- Optional setting this is hard coded in function above
                is_ped = true, -- Optional setting this is hard coded in function above
                rot_order = 1, -- Optional setting this is hard coded in function above
                sync_rot = true -- Optional setting this is hard coded in function above
            }
        }
    }, function(success) -- Callback function
        if success then
            print('Progress successful')
        else
            print('Progress cancelled')
        end
    end)
end)
