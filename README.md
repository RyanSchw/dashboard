# Dashboard

## Running the server
```
cd server/
npm start
```

### Postman fix
Due to [this issue](https://github.com/postmanlabs/postman-app-support/issues/11204#issuecomment-1605502449), run the following to get the IP address for Postman

`ip addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'`
