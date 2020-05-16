# POS updates notifier

This project is node.js webhook that listens to DockerHub and git repositories updates and posts info about new versions to Telegram chat. It also creates Jira issue with version updates. You can optionally assign this issues to someone responsible for node updates by setting **JIRA_ASSIGNEE** with this person ID in your Jira instance.

### Prerequisites
To get notifications about updates in DockerHub repositories you need to run [Diun](https://github.com/crazy-max/diun).<br>
In example [configuration](https://github.com/crazy-max/diun) we're using **127.0.0.1:8000** as webhook to post repository updates to.<br>
You can run it using Docker:<br>
```$ docker run -d --name diun -e "TZ=Europe/Moscow" -e "LOG_LEVEL=info" -e "LOG_JSON=false" -v "$(pwd)/data:/data" -v "$(pwd)/diun.yml:/diun.yml:ro" --network="host" crazymax/diun:latest```<br>
or by using binary from original repo and setting up linux service.

For releases notifications in git repositories use [rss2hook](rss2hook).
In example [configuration](https://github.com/crazy-max/diun) we have examples of GitHub and Gitlab repositories.<br>
To run rss2hook with this configuration in background
```$ nohup rss2hook -config config.cfg & ```


Also you need to create a telegram bot, which will notify you about updates, and obtain it's token.

### Environment variables
Before running the webhook you need to create a **.env** file in root directory of the project and populate it with following values:
- **BOT_TOKEN** - telegram bot token
- **CHAT_ID** - telegram chat ID where bot will post messages about updates
- **JIRA_TOKEN** - Jira REST API token
- **JIRA_USER** - Jira REST API user
- **JIRA_REST** - Jira REST API url
- **JIRA_ASSIGNEE** - Jira assignee for update tasks
- **JIRA_PROJECT** - Jira project code where issues will be created
- **JIRA_ISSUE** - Jira issue type for update tasks

### Running webhook
After you've set up all prerequisites and .env file you can run the webhook itself
```
$ npm i
$ npm run start
```
It will run a node.js webhook on 8000 port that will listen to DockerHub and git repositories updates and post notifications about them to your telegram chat and jira.<br>
To run it in background you can use screen or [forever](https://github.com/foreversd/forever).# POS updates notifier

This project is node.js webhook that listens to DockerHub and git repositories updates and posts info about new versions to Telegram chat. It also creates Jira issue with version updates. You can optionally assign this issues to someone responsible for node updates by setting **JIRA_ASSIGNEE** with this person ID in your Jira instance.

### Prerequisites
To get notifications about updates in DockerHub repositories you need to run [Diun](https://github.com/crazy-max/diun).<br>
In example [configuration](https://github.com/crazy-max/diun) we're using **127.0.0.1:8000** as webhook to post repository updates to.<br>
You can run it using Docker:<br>
```$ docker run -d --name diun -e "TZ=Europe/Moscow" -e "LOG_LEVEL=info" -e "LOG_JSON=false" -v "$(pwd)/data:/data" -v "$(pwd)/diun.yml:/diun.yml:ro" --network="host" crazymax/diun:latest```<br>
or by using binary from original repo and setting up linux service.

For releases notifications in git repositories use [rss2hook](rss2hook).
In example [configuration](https://github.com/crazy-max/diun) we have examples of GitHub and Gitlab repositories.<br>
To run rss2hook with this configuration in background
```$ nohup rss2hook -config config.cfg & ```


Also you need to create a telegram bot, which will notify you about updates, and obtain it's token.

### Environment variables
Before running the webhook you need to create a **.env** file in root directory of the project and populate it with following values:
- **BOT_TOKEN** - telegram bot token
- **CHAT_ID** - telegram chat ID where bot will post messages about updates
- **JIRA_TOKEN** - Jira REST API token
- **JIRA_USER** - Jira REST API user
- **JIRA_REST** - Jira REST API url
- **JIRA_ASSIGNEE** - Jira assignee for update tasks
- **JIRA_PROJECT** - Jira project code where issues will be created
- **JIRA_ISSUE** - Jira issue type for update tasks

### Running webhook
After you've set up all prerequisites and .env file you can run the webhook itself
```
$ npm i
$ npm run start
```
It will run a node.js webhook on 8000 port that will listen to DockerHub and git repositories updates and post notifications about them to your telegram chat and jira.<br>
To run it in background you can use screen or [forever](https://github.com/foreversd/forever).