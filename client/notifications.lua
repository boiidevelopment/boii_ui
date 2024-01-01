----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

--[[
    FUNCTIONS
]]

-- Function to send notifications
local function notify(type, header, message, duration)
    SendNUIMessage({
      action = 'notify',
      notification = {
            type = type,
            header = header,
            message = message,
            duration = duration
        }
    })
end

--[[
    EVENTS
]]

-- Event to send notifications
RegisterNetEvent('boii_ui:notify', function(type, header, message, duration)
    notify(type, header, message, duration)
end)

--[[
    EXPORTS
]]
exports('notify', notify)

--[[
    TEST STUFF
]]
local notification_types = {
    { type = 'system', header = 'System Alert', message = 'This is a system alert notification.' },
    { type = 'staff', header = 'Staff Message', message = 'This is a staff message.' },
    { type = 'general', header = 'General', message = 'This is a general notification.' },
    { type = 'warning', header = 'Warning', message = 'This is a warning notification.' },
    { type = 'error', header = 'Error', message = 'This is an error notification.' },
    { type = 'success', header = 'Success', message = 'This is a success notification.' },
    { type = 'information', header = 'Information', message = 'This is an information notification.' },
    { type = 'police', header = 'Police Alert', message = 'This is a police notification.' },
    { type = 'ems', header = 'EMS Alert', message = 'This is an EMS notification.' }
}

local function send_notification_sequence()
    for _, notification in ipairs(notification_types) do
        notify(notification.type, notification.header, notification.message, 15000)
        Wait(1000)
    end
end

RegisterCommand("test_notifications", function()
    CreateThread(send_notification_sequence)
end, false)