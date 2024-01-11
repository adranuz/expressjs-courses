import { GithubIssuePayload } from "../../interfaces/github-issue.interface";
import { GithubStarPayload } from "../../interfaces/github-star.interface";

export class GitHubService {
  constructor(){}

  // un evento relacionado a estrella
  onStar = (payload: GithubStarPayload): string => {
    let message = 'holo';
    const { starred_at, action, repository, sender } = payload;

    if(starred_at){
      message = `User ${sender.login} ${action} star on ${repository.name}`;
    } else {
      message = `User ${sender.login} ${action} star on ${repository.name}`;
    }
    return message;
  }

  // un evento relacionado a issue
  onIssue = (payload: GithubIssuePayload): string  => {
    let message = 'holo';
    const { action, issue } = payload;
    console.log(action)
    if(action === 'opened'){
      message = `An issue was opened with this title: ${issue.title}`;
    }
    if(action === 'closed'){
      message = `An issue was closed with this title: ${issue.title}`;
    }
    if(action === 'edited'){
      message = `An issue was edited with this title: ${issue.title}`;
    }
    if(action === 'deleted'){
      message = `An issue was deleted with this title: ${issue.title}`;
    }
    if(action === 'reopened'){
      message = `An issue was reopened with this title: ${issue.title}`;
    }

    return message;
  }
}