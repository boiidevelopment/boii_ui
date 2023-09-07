----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

-- Input example
local input_data = {
    main_header = { -- Main menu header
        text = 'Example Header', -- Header text
        image = '/html/assets/images/lspd.png', -- Image to display on header. Remove this to use no image
        icon = '<i class="fa-solid fa-bell"></i>' -- Icon to display next to header text. Remove this to use no icon
    },
    input_fields = {
        id = true,
        value = true,
    },
    input_button = {
        text = 'Submit', -- Submit 
        action_type = 'client_event', -- Type to trigger on click this can be removed. Actions: 'client_event', 'server_event'
        action = 'boii_ui:cl:input_test_event', -- Name of event to trigger
        params = {}, -- Event params
        should_close = true, -- Toggle whether event should close the input ui
    },
}

-- Function to open input
local function open_input(style, input)
    if not input then return print('No data provided') end
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'open_input',
        type = style,
        input = input
    })
end

-- Callback to submit input
RegisterNUICallback('submit_input', function(data)
    local id = data.id or nil
    local value = data.value or nil
    if data.action_type == 'server_event' then
        TriggerServerEvent(data.action, data.params, id, value)
    elseif data.action_type == 'client_event' then
        TriggerEvent(data.action, data.params, id, value)
    end
    if data.should_close then
        SetNuiFocus(false, false)
    end
    TriggerEvent('boii_ui:notify', 'INPUT TEST', 'Input submitted. ID: ' .. id .. ' Value: ' .. data.value, 'success', 3000)
end)

-- Callback to close input
RegisterNUICallback('close_input', function()
    SetNuiFocus(false, false)
end)

-- Exports
exports('open_input', open_input)

-- Testing
RegisterCommand('testinput', function()
    SetNuiFocus(true, true)
    exports['boii_ui']:open_input('default', input_data)
end)