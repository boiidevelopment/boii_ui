----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

--[[
    FUNCTIONS
]]

-- Function to send notifications
local function notify(type, header, message, duration)
    SendNUIMessage({
        action = 'create_notification',
        notification = {
            type = options.type,
            header = options.header,
            message = options.message,
            duration = options.duration
        }
    })
end

--[[
    EVENTS
]]

-- Event to send notifications
RegisterNetEvent('boii_ui:notify', function(options)
    notify(options)
end)

--[[
    EXPORTS
]]
exports('notify', notify)

--[[
    TEST STUFF
]]
local notification_types = {
    { type = 'system', header = 'System Alert', message = 'This is a system alert notification.', duration = 10000 },
    { type = 'staff', header = 'Staff Message', message = 'This is a staff message.', duration = 10000 },
    { type = 'general', header = 'General', message = 'This is a general notification.', duration = 10000 },
    { type = 'warning', header = 'Warning', message = 'This is a warning notification.', duration = 10000 },
    { type = 'error', header = 'Error', message = 'This is an error notification.', duration = 10000 },
    { type = 'success', header = 'Success', message = 'This is a success notification.', duration = 10000 },
    { type = 'information', header = 'Information', message = 'This is an information notification.', duration = 10000 },
    { type = 'police', header = 'Police Alert', message = 'This is a police notification.', duration = 10000 },
    { type = 'ems', header = 'EMS Alert', message = 'This is an EMS notification.', duration = 10000 }
}

local function send_notification_sequence()
    for _, notification in ipairs(notification_types) do
        notify(notification)
        Wait(1000)
    end
end

RegisterCommand("test_notifications", function()
    CreateThread(send_notification_sequence)
end, false)
