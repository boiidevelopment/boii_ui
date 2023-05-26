----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

--<!>-- SERVER PRINT --<!>--
AddEventHandler('onResourceStart', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
      return
    end
    print('^5--<^3!^5>-- ^7BOII ^5| ^7DEVELOPMENT ^5--<^3!^5>-- ^7UTILITY: UI ELEMENTS V0.0.4 ^5--<^3!^5>--^7')
end)
--<!>-- SERVER PRINT --<!>--

-- Server-side event to print "server event option clicked"
RegisterServerEvent('boii_ui:sv:menu_test_event')
AddEventHandler('boii_ui:sv:menu_test_event', function()
    TriggerClientEvent('boii_ui:notify', source, nil, 'server event triggered', 'success', 3500)
end)
