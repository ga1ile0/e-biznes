#!/bin/sh

echo "window.RUNTIME_CONFIG = { REACT_APP_API_URL: '${REACT_APP_API_URL}' };" > /usr/share/nginx/html/config.js

exec "$@"