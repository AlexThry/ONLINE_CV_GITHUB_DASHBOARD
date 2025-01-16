import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { Logger } from '@nestjs/common';
import * as NodeCache from 'node-cache';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config'; 


@Injectable()
export class GithubService {
  private octokit: Octokit;
  private readonly logger = new Logger(GithubService.name);
  private cache = new NodeCache({ stdTTL: 604800 });
  

  constructor(private configService: ConfigService) {

    this.logger.debug('token', configService.get("GITHUB_TOKEN"))
    this.octokit = new Octokit({
      auth: configService.get("GITHUB_TOKEN"),
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

  async getUserCommitsPerMonth(username: string): Promise<any> {
    try {
      const repos = await this.getUserRepos(username, 10);
      const commitsPerMonth = {};
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      for (const repo of repos) {
        const commits = await this.octokit.rest.repos.listCommits({
          owner: username,
          repo: repo.name,
          per_page: 100,
          since: sixMonthsAgo.toISOString(),
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

  async getTopLanguages(username: string): Promise<any> {
    const cacheKey = `topLanguages_${username}`;
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const repos = await this.getUserRepos(username, 100);
      const languageCount = {};
      let totalBytes = 0;

      for (const repo of repos) {
        const response = await this.octokit.rest.repos.listLanguages({
          owner: username,
          repo: repo.name,
        });

        for (const [language, count] of Object.entries(response.data)) {
          if (!languageCount[language]) {
            languageCount[language] = 0;
          }
          languageCount[language] += count;
          totalBytes += count;
        }
      }

      const sortedLanguages = Object.entries(languageCount).sort((a, b) => Number(b[1]) - Number(a[1]));
      const topLanguages = sortedLanguages.slice(0, 4).map(([language, count]) => ({
        language,
        percentage: ((count as number) / totalBytes * 100).toFixed(2) + '%'
      }));

      this.cache.set(cacheKey, topLanguages);

      return topLanguages;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des langages : ${error.message}`);
    }
  }

}
