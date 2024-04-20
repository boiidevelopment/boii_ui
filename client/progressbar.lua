--[[
     ____   ____ _____ _____   _   _____  ________      ________ _      ____  _____  __  __ ______ _   _ _______ 
    |  _ \ / __ \_   _|_   _| | | |  __ \|  ____\ \    / /  ____| |    / __ \|  __ \|  \/  |  ____| \ | |__   __|
    | |_) | |  | || |   | |   | | | |  | | |__   \ \  / /| |__  | |   | |  | | |__) | \  / | |__  |  \| |  | |   
    |  _ <| |  | || |   | |   | | | |  | |  __|   \ \/ / |  __| | |   | |  | |  ___/| |\/| |  __| | . ` |  | |   
    | |_) | |__| || |_ _| |_  | | | |__| | |____   \  /  | |____| |___| |__| | |    | |  | | |____| |\  |  | |   
    |____/ \____/_____|_____| | | |_____/|______|   \/   |______|______\____/|_|    |_|  |_|______|_| \_|  |_|   
                              | |                                                                                
                              |_|               UI ELEMENTS
]]

--- @section Variables

local active = false
local callback

--- @section Tables

local progress_props = {}

local controls = {
    mouse = { 1, 2, 106 },
    movement = { 30, 31, 36, 21, 75 },
    car_movement = { 63, 64, 71, 72 },
    combat = { 24, 25, 37, 47, 58, 140, 141, 142, 143, 263, 264, 257 }
}

--- @section Local functions

--- Disables controls specified under controls table.
-- @param data table: Controls table.
local function disable_controls(data)
    CreateThread(function()
        while active do
            for disable_type, is_enabled in pairs(data) do
                if is_enabled and controls[disable_type] then
                    for _, control in ipairs(controls[disable_type]) do
                        DisableControlAction(0, control, true)
                    end
                end
            end
            if data.combat then
                DisablePlayerFiring(PlayerId(), true)
            end
            Wait(0)
        end
    end)
end

--- Shows the progressbar with given options and callback result.
-- @param options table: The options to use on the progress bar. 
-- @param cb function: Callback function to run on bar completion / cancel.
local function show_progress(options, cb)
    local player = PlayerPedId()
    if IsEntityDead(player) then return end
    if active then return end
    active = true 
    callback = cb
    if options.disabled_controls then
        disable_controls(options.disabled_controls)
    end
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

--- @section NUI Callbacks

--- Ends the progress bar and callback the success result.
-- @param data table: Data received from progressbar indicating success status.
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

--- @section Exports

--- Shows the progress bar.
exports('show_progress', show_progress)

--- @section Test stuff

--- Creates a test progressbar.
RegisterCommand('test_progressbar', function()
    exports.boii_ui:show_progress({
        header = 'Trimming Buds..', -- Progressbar header text
        icon = 'fa-solid fa-cannabis', -- Header icon
        duration = 15000, -- Total duration for bar to run in (ms)
        disable_controls = { -- COntrol disables added in for ease of use with bridging qb-progressbar along with providing that extra familiarity.
            mouse = false, -- Disables mouse controls
            movement = false, -- Movement controls
            car_movement = false, -- In vehicle movement controls
            combat = false -- Disables firing
        },
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
