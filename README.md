# loginmycv

> Provide secured access to your CV online

![homepage](static/images/homepage.jpg)

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

Visit http://localhost:3000

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node api/seeder -d

# Import all data
node api/seeder -i
```

In case of error during seeding, try deleting MongoDB indexes.

## Jelastic Deployment

![jelastic_config_topology](static/images/infomaniak_jelastic_config_topology.jpg)
![jelastic_config_server_variables](static/images/infomaniak_jelastic_config_server_variables.jpg)
![jelastic_config](static/images/infomaniak_jelastic_external_disk_config.jpg)
![jelastic_token_access](static/images/infomaniak_jelastic_token_access.jpg)
![jelastic_config_rockmongo_system_users](static/images/infomaniak_jelastic_rockmongo_system_users.jpg)
![jelastic_config_rockmongo_system_roles](static/images/infomaniak_jelastic_rockmongo_system_roles.jpg)

Set the main application executable file as environment variable
```
APP_FILE=server.js
PROCESS_MANAGER=pm2
HOST=0.0.0.0
```

## CI/CD GitHub Actions Secrets

![github_secrets](static/images/github_secrets.jpg)


## General observations for developers
### Protected pages

req.user parameter is available backend if and only if auth middleware is called on router object.

### Server logs
```
pm2 logs --lines 100
```
