const http = require('http')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const port = 8000
const botToken = process.env.BOT_TOKEN
const jiraUser = process.env.JIRA_USER
const jiraToken = process.env.JIRA_TOKEN
const chat = process.env.CHAT_ID
const telegram = `https://api.telegram.org/bot${botToken}/sendMessage`
const jira = process.env.JIRA_REST
const defaultUpdateAssignee = process.env.JIRA_ASSIGNEE
const jiraProjectKey = process.env.JIRA_PROJECT
const jiraIssueType = process.env.JIRA_ISSUE

const createJiraIssue = (title, body) => {
  let payload =  {
    fields: {
       summary: title,
       issuetype: {
           id: jiraIssueType
       },
       project: {
           key: jiraProjectKey
       },
       //remove this to not set assignee at issue creation
       assignee : {
           accountId: defaultUpdateAssignee
       },
       description: {
        type: 'doc',
        version: 1,
        content: [{
          type: 'paragraph',
          content: [{
            text: body,
            type: 'text'
          }]
        }]
      }
    }
  }

  axios({
    url: jira,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    auth : {
      username: jiraUser,
      password: jiraToken
    },
    data: payload
  })
  .then(response => console.log(response.data))
  .catch(error => console.error(error))
}

const sendToTelegram = (payload) => {
  axios({
    url: telegram,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: payload
  })
  .then(response => console.log(response.data))
  .catch(error => console.error(error))
}

const requestHandler = (req, res) => {
  let data = []
  req.on('data', chunk => {
    data.push(chunk)
  })
  req.on('end', () => {
    let body = {}
    try {
      body = JSON.parse(data)
    }
    catch (e) {
      res.end()
    }
    console.log(body)
    
    if ('image' in body) {
      let payload = {
        chat_id: chat,
        text: `Update in image ${body.image}\nStatus:${body.status}`,
        disable_notification: true
      }
      sendToTelegram(payload)
      createJiraIssue(`DockerHub update`, payload.text)
    }
    else if ('guid' in body) {
      let payload = {
        chat_id: chat,
        text: `New release ${body.title} in repository \n${body.link}`,
        disable_notification: true
      }
      sendToTelegram(payload)
      createJiraIssue(`Repository release`, payload.text)
    }
    res.end()
  })
}

const server = http.createServer(requestHandler)
server.listen(port, (err) => {
  if (err) {
    return console.log('Error', err)
  }
})