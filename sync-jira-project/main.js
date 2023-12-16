import JiraApi from 'jira-client';

// Update Jira ticket

// Create a Jira ticket
async function createJiraTicket(issue) {
  console.log('Creating Jira ticket...', issue);
  const data = await jiraClient.addNewIssue({
    fields: {
      project: {
        key: 'TEST'
      },
      summary: issue.title,
      description: issue.body,
      issuetype: {
        name: 'Story'
      }
    }
  })
  console.log(`Jira ticket created: ${data.key}`);
}


export default async function main({ config, context, core, github }) {
  jiraClient = new JiraApi({
    protocol: 'https',
    host: config.jiraHost,
    username: config.jiraUsername,
    password: config.jiraPassword,
    apiVersion: '3',
    strictSSL: true
  });

  // if the action is triggered by an issue
  if (context.eventName !== 'issues') {
    console.log(`Unhandled event: ${context.eventName}`);
  }

  try {
    switch (context.payload.action) {
      // create a Jira ticket
      case 'opened':
        await createJiraTicket(context.payload.issue);
        break;
      // create a Jira ticket
      case 'reopened':
        break;
      // update the Jira ticket
      case 'edited':
        break;
      // update the Jira ticket
      case 'closed':
        break;
      default:
        console.error(`Unhandled action: ${context.payload.action}`);
        break;
    }
  } catch (err) {
    console.error(err);
  }
}