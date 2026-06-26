@echo off

start cmd /k "set "VITE_WEATHER_KEY=8375f24662c5d10d4f8424844265fb15" && npm run dev"
start cmd /k "cd /d server && npm run server"