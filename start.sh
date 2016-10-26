#!/bin/bash
cd /mnt
echo $RUN_ENV

NODE_ENV=production node server.bundle.js 60010 $RUN_ENV

# bundle NODE_ENV=production npm run build
# run NODE_ENV=production node server.bundle.js 60010 stage

# NODE_ENV=production npm run build && node server.bundle.js 60666 stage