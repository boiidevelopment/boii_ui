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

--- @section Local functions

--- Sends a notification.
-- @param options table: The options for the notification.
local function notify(options)
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

--- @section Events

--- Event to send notifications
-- @param options table: The options for the notification.
RegisterNetEvent('boii_ui:notify', function(options)
    notify(options)
end)

--- @section Exports

--- Export to send a notification.
exports('notify', notify)

--- @section Test stuff

--- Notification types
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

--- Sends one of each notification type in a sequence.
local function send_notification_sequence()
    for _, notification in ipairs(notification_types) do
        notify(notification)
        Wait(1000)
    end
end

--- Command to test notifications.
RegisterCommand("test_notifications", function()
    CreateThread(send_notification_sequence)
end, false)