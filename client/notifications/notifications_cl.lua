----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

-- Function to send notifications
local function notify(header, text, type, duration)
    SendNUIMessage({
      action = 'send_notification',
      notification = {
            header = header,
            text = text,
            type = type,
            duration = duration
        }
    })
end

-- Event to send notifications
RegisterNetEvent('boii_ui:notify', function(header, text, type, duration)
    notify(header, text, type, duration)
end)

-- Notifcation exports
exports('notify', notify)

--<!>-- TEST COMMANDS --<!>-- 
RegisterCommand('notifytest1', function()
    notify('TEST NOTIFICATION', 'This is a test notification with all available customisation options currently active. Available options; background, border, border radius, color, font family, box shadow, header icon, header weight, header text shadow, message icon, message weight, message text shadow, image, image border, image border radius, image box shadow, and set custom audio sounds.', 'default', 5000)
end)

RegisterCommand('notifytest2', function()
    notify('TEST NOTIFICATION', 'This is a notification without an image.', 'test2', 5000)
end)

RegisterCommand('notifytest3', function()
    notify('TEST NOTIFICATION', 'This is a notification without image/header icon.', 'test3', 5000)
end)

RegisterCommand('notifytest4', function()
    notify(nil, 'This is a notification with a message icon.', 'test4', 5000)
end)

RegisterCommand('notifytest5', function()
    notify(nil, 'This is a notification without an image/header/icons.', 'test5', 5000)
end)

RegisterCommand('notifytest6', function()
    notify(nil, 'This is a notification without audio.', 'test6', 5000)
end)

RegisterCommand('notifyprimary', function()
    notify(nil, 'This is a example primary notification.', 'primary', 5000)
end)

RegisterCommand('notifysuccess', function()
    notify(nil, 'This is a example success notification.', 'success', 5000)
end)

RegisterCommand('notifyerror', function()
    notify(nil, 'This is a example error notification.', 'error', 5000)
end)

RegisterCommand('notifylspd', function()
    notify('LSPD TEST', 'This is a example lspd notification.', 'lspd', 5000)
end)

RegisterCommand('notifyems', function()
    notify('EMS TEST', 'This is a example ems notification.', 'ems', 5000)
end)

RegisterCommand('notifymech', function()
    notify('MECHANIC TEST', 'This is a example mechanic notification.', 'mechanic', 5000)
end)