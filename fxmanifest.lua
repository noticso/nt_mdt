fx_version 'adamant'

game 'gta5'
author 'noticso'
version '1.00'
description 'Tablet'
lua54 'yes'
shared_script '@es_extended/imports.lua'
client_scripts { 'client.lua'}
server_scripts {'server.lua', '@oxmysql/lib/MySQL.lua'}
ui_page 'nui/index.html'

files {
    'nui/*.html',
    'nui/js/*.js',
    'nui/css/*.css',
    'nui/img/*',
    'nui/fonts/*',
}
