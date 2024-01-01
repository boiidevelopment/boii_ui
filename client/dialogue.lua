----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

-- Locals
local active = false
local script_cam

--[[
    FUNCTIONS
]]

-- Function to create and setup camera
local function create_cam(pos, rot, fov)
    local cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, fov or GetGameplayCamFov(), false, 0)
    SetCamCoord(cam, pos.x, pos.y, pos.z)
    SetCamRot(cam, rot.x, rot.y, rot.z, 2)
    return cam
end

-- Function to reset camera back to player
local function reset_cam()
    RenderScriptCams(false, false)
    DestroyCam(script_cam)
    script_cam = nil
end

-- Function to set player's view and face them towards a point
local function set_view(npc, coords)
    if not coords then return end
    local npc_pos = GetEntityCoords(npc) + (GetEntityForwardVector(npc) * 1.5) + vector3(0, 0, 0.65)
    local npc_rot = GetEntityRotation(npc, 2)
    npc_rot = vector3(npc_rot.x, npc_rot.y, npc_rot.z + 180.0)
    local temp_cam = create_cam(GetGameplayCamCoord(), GetGameplayCamRot(2))
    script_cam = create_cam(npc_pos, npc_rot)
    SetCamActive(temp_cam, true)
    RenderScriptCams(true, false, 1, true, true)
    SetCamActiveWithInterp(script_cam, temp_cam, 1500, true, true)
    DestroyCam(temp_cam)
    local player_ped = PlayerPedId()
    local player_coords = GetEntityCoords(player_ped)
    local dx = coords.x - player_coords.x
    local dy = coords.y - player_coords.y
    local heading = GetHeadingFromVector_2d(dx, dy)
    TaskTurnPedToFaceCoord(player_ped, coords.x, coords.y, coords.z, -1)
    SetEntityHeading(player_ped, heading)
end

-- Function to open dialogue
local function open_dialogue(dialogue, npc, coords)
    if active then return end
    active = true
    SetNuiFocus(true, true)
    set_view(npc, coords)
    SendNUIMessage({
        action = 'create_dialogue',
        dialogue = dialogue
    })
end

--[[
    CALLBACKS
]]

-- Callback to close menu
RegisterNUICallback('close_dialogue', function()
    SetNuiFocus(false, false)
    active = false
    reset_cam()
    ClearPedTasks(PlayerPedId())
end)

--[[
    EXPORTS
]]

-- Dialogue menu exports
exports('dialogue', open_dialogue)

--[[
    TESTING
]]

local test_dialogue = {
    header = {
        message = 'Quarry Employee', -- Dialogue header text
        icon = 'fa-solid fa-hard-hat', -- Header icon
        image = '/html/assets/images/logo.png', -- Header Image
    },
    conversation = {
        {
            id = 1, -- This is the ID of the conversation option this is used to navigate through conversation options
            response = 'Hello, welcome to the quarry. How can I assist you today?', -- This is the NPC response message displayed to players
            options = {
                {
                    icon = 'fa-solid fa-question-circle', -- Player response option icon
                    message = 'Can you tell me more about what you do here?', -- Player response option message
                    next_id = 2, -- Next conversation ID to move to when clicking option
                    should_end = false -- Toggles if clicking on the option should end the conversation
                },
                {
                    icon = 'fa-solid fa-briefcase',
                    message = 'What kind of jobs are available at the quarry?',
                    next_id = 3,
                    should_end = false
                },
                {
                    icon = 'fa-solid fa-shield-alt',
                    message = 'Are there any safety protocols I should be aware of?',
                    next_id = 4,
                    should_end = false
                },
                {
                    icon = 'fa-solid fa-door-open',
                    message = 'Goodbye!',
                    next_id = nil, -- Next ID is nil since we are using should_end = true below
                    should_end = true, -- Since this is true clicking this option will end the conversation and run the action below if provided
                    action_type = 'client', -- Type of action to trigger: options; 'client', 'server'
                    action = 'testevent', -- Action to perform
                    params = {} -- Parameters for the action
                }
            }
        },
        {
            id = 2,
            response = 'We primarily focus on extracting minerals and processing them for various uses. It\'s challenging but fulfilling work.',
            options = {
                {
                    icon = 'fa-solid fa-arrow-left',
                    message = 'Back to previous options',
                    next_id = 1,
                    should_end = false
                },
                {
                    icon = 'fa-solid fa-door-open',
                    message = 'Thank you, that\'s all for now.',
                    next_id = nil,
                    should_end = true,
                    action_type = 'client',
                    action = 'testevent',
                    params = {}
                }
            }
        },
        {
            id = 3,
            response = 'There are several roles here, from equipment operators to safety inspectors. We\'re always looking for dedicated workers.',
            options = {
                {
                    icon = 'fa-solid fa-arrow-left',
                    message = 'Back to previous options',
                    next_id = 1,
                    should_end = false
                },
                {
                    icon = 'fa-solid fa-door-open',
                    message = 'Thanks, I\'ll consider applying.',
                    next_id = nil,
                    should_end = true,
                    action_type = 'client',
                    action = 'testevent',
                    params = {}
                }
            }
        },
        {
            id = 4,
            response = 'Safety is our top priority. Everyone is required to wear protective gear, and we have regular training sessions.',
            options = {
                {
                    icon = 'fa-solid fa-arrow-left',
                    message = 'Back to previous options',
                    next_id = 1,
                    should_end = false
                },
                {
                    icon = 'fa-solid fa-door-open',
                    message = 'Good to know. Thanks for the information.',
                    next_id = nil,
                    should_end = true,
                    action_type = 'client',
                    action = 'testevent',
                    params = {}
                }
            }
        },
        {
            id = 5,
            response = 'Please report it to our maintenance team immediately. We need to ensure a safe working environment.',
            options = {
                {
                    icon = 'fa-solid fa-arrow-left',
                    message = 'Back to previous options',
                    next_id = 1,
                    should_end = false
                },
                {
                    icon = 'fa-solid fa-door-open',
                    message = 'I will let them know. Thanks!',
                    next_id = nil,
                    should_end = true,
                    action_type = 'client',
                    action = 'testevent',
                    params = {}
                }
            }
        }
    }
}

-- Copied in from boii_utils for testing purposes this can be removed
local function get_closest_ped(coords, max_distance)
    local peds = GetGamePool('CPed')
    local closest_ped, closest_coords
    max_distance = max_distance or 2.0
    for i = 1, #peds do
        local ped = peds[i]
        if not IsPedAPlayer(ped) then
            local ped_coords = GetEntityCoords(ped)
            local distance = #(coords - ped_coords)
            if distance < max_distance then
                max_distance = distance
                closest_ped = ped
                closest_coords = ped_coords
            end
        end
    end
    return closest_ped, closest_coords
end

-- Test command with NPC interaction
RegisterCommand('testdialogue', function()
    local ped, coords = get_closest_ped(vector3(224.13, -1393.95, 30.59), 5.0)
    exports['boii_ui']:dialogue(test_dialogue, ped, coords)
end)
