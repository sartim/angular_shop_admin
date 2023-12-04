#!/bin/sh

cat << EOF > src/app/config/api.js
const apiUrl = "${API_URL}";

export default apiUrl;
EOF
