fx_version 'cerulean'
game 'gta5'
name 'appearance'

shared_script '@core/imports.lua'

server_script './server/server.js'
client_script './client/client.js'

files {
  'web/index.html',
  'web/assets/*.js',
  'locales/*.json',
  'peds.json',
  'tattoos.json'
}

ui_page 'web/index.html'

dependencies {
  'core'
}
