# radioNode

This application is built with angular 1.5, it comsumes a radio API from shoutCast.

User can select ranked stations, playing live stream radio with customized media player.

## how to start
clone the repository down to local machine

###1, start the express server

```bash
cd radioNode
# Install dependencies
npm install

# start the server and watch server files
npm run dev

# Applciation url: http://localhost:3000
```

###2, compile the angular application
open a new terminal window, stay in the project directory
```bash
cd app

#install all the dependencies
bower install

#before you do any modification to start application
gulp && gulp watch
```
