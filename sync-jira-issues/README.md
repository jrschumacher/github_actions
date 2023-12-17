# Sync Jira Issues with Github Issues

This action syncs a Jira issue with a Github issue. It is intended to be used to enable developers to work in Github
while the rest of an organization uses Jira. It is not intended to be a two way sync or maintain a perfect copy of the
the issues in both systems.

## Goals

1. Github issues are the source of truth for developers
2. New Jira issues will be created in Github with a label

## Flows

The general idea is to support the minimal Github flow into the Jira flow. Jira has 3 distinct states for an issue listed
as a `statusCategory`. These are:

- To Do
- In Progress
- Done

The Github flow is:

- Open
- Closed
  - Completed
  - Not Planned

Since there is no direct mapping between the two, the action will support a mapping of the Github states to the Jira
states. This will allow the action to be used in a workflow to move an issue from one state to another.

### Jira Transitions

Jira uses Transitions to move issues between states. Additionally, transitions can require a variety of properties to
be set. This action will not fully support this in the beginning.

It will be possible to hard code the values for a transition. This will allow the action to be used in a workflow to
move an issue from one state to another.

## Action Items

General

- [x] Create a top-level comment block in Github to link to the Jira issue
- [ ] Include a code block in the Github issue with the Jira JSON data
  - This is to allow developers to monitor the state of the Jira issue without having to go to Jira

Github --> Jira

- [ ] Create jira issue when github issue is created
- [ ] Enable config mapping of jira transition state
- [ ] Transition jira issue when github issue is updated

Jira --> Github

- [ ] Create github issue when jira issue is created
- [ ] Update github issue when jira issue is updated
- [ ] Close github issue when jira issue has a statusCategory of "Done"
- [ ] Update comment code block when jira issue is updated

### Under Consideration

- Add a comment to the Github issue when the Jira issue is commented on
- Add a comment to the Jira issue when the Github issue is commented on
- Sync with Github project board state
  - This will enable G
