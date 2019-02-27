## Get Started

```
git clone git@github.com:nitingupta220/node-redis.git
```

### You will need to run the redis-server to use Redis caching. First you need to install the redis-server

```
wget http://download.redis.io/releases/redis-5.0.3.tar.gz
tar xzf redis-5.0.3.tar.gz
cd redis-5.0.3
make
```

### After that run the redis-server. You need to be in the redis folder that you have just extracted

```
src/redis-server --daemonize yes
```

### Then install the required dependencies. Run this command from the main repo. You need to go back to the main folder where you clone the repo

```
npm install
```

### Now run 

```
nodemon index.js
```

### Then head over to 

```
localhost:3001/api/search?query=India
```

### You can change the country name from India to anything

### Verifying Performance/Speed

### Open Chrome Developer Tools > Network > /api/search?query=Nigeria

### Take note of the X-Response-Time fields in the two images below.

### First Request
![alt text](https://process.filestackapi.com/cache=expiry:max/BYiferST52Oene9DrTPh)

### Second Request
![alt text](https://process.filestackapi.com/cache=expiry:max/fag8yREpRYKp7hDQ5RsP)

### The first request took 2739 milliseconds while the second one only took 6 milliseconds, a difference of 2733 milliseconds!