import JiraApi from 'jira-client';

let jiraClient;
let githubClient;

// Update Jira ticket

// Create a Jira ticket
async function createJiraTicket({ context, config }) {
  const issue = context.payload.issue
  console.log('Creating Jira ticket...', issue);
  const data = await jiraClient.addNewIssue({
    fields: {
      project: {
        key: 'TEST',
      },
      issuetype: {
        id: '10009',
      },
      summary: issue.title,
      description: {
        content: [
          {
            content: [
              {
                text: issue.body || '',
                type: 'text',
              },
            ],
            type: 'paragraph',
          },
        ],
        type: 'doc',
        version: 1,
      },
    },
  });
  console.log(`Jira ticket created: ${data.key}`);

  // add a comment to the issue linking to the Jira ticket
  await githubClient.addComment(`Linked to Jira issue [${data.key}](https://${config.jiraHost}/browse/${data.key})`);
}

export default async function main(args) {
  const { context, github, config } = args;
  // create partial appication that set
  githubClient = {
    github,
    addComment: async (body) => {
      if (!context.issue) {
        throw new Error('context.issue is undefined');
      }
      // add comment to this github issue
      await github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body
      })
    }
  }

  jiraClient = new JiraApi({
    protocol: 'https',
    host: config.jiraHost,
    username: config.jiraUsername,
    password: config.jiraPassword,
    apiVersion: '3',
    strictSSL: true,
  });

  // if the action is triggered by an issue
  if (context.eventName !== 'issues') {
    console.log(`Unhandled event: ${context.eventName}`);
  }

  try {
    switch (context.payload.action) {
      // create a Jira ticket
      case 'opened':
        await createJiraTicket(args);
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
