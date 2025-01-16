import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async getUserRepos(username: string, perPage: number): Promise<any> {
    try {
      const response = await this.octokit.rest.repos.listForUser({
        username,
        per_page: perPage,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des dépôts : ${error.message}`);
    }
  }

  // Récupérer le nombre de commits pour un utilisateur par mois (6 derniers mois)
  async getUserCommitsPerMonth(username: string): Promise<any> {
    try {
      const repos = await this.getUserRepos(username, 10); // Récupère jusqu'à 100 dépôts
      const commitsPerMonth = {};
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      for (const repo of repos) {
        const commits = await this.octokit.rest.repos.listCommits({
          owner: username,
          repo: repo.name,
          per_page: 100,
          since: sixMonthsAgo.toISOString(), // Filtrer les commits depuis les 6 derniers mois
        });

        for (const commit of commits.data) {
          const month = new Date(commit.commit.author.date).getMonth() + 1;
          const year = new Date(commit.commit.author.date).getFullYear();
          const key = `${year}-${month}`;

          if (!commitsPerMonth[key]) {
            commitsPerMonth[key] = 0;
          }
          commitsPerMonth[key]++;
        }
      }

      return commitsPerMonth;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des commits : ${error.message}`);
    }
  }

}
