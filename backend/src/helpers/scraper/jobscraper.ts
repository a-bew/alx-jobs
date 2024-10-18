// import fetch from 'node-fetch';  // Import fetch if using Node.js
import * as cheerio from 'cheerio';  // Correct cheerio import
import { launchBrowser } from './browser';

export type Company = 'netlify' | 'adyen' | 'vercel' | 'microsoft';
type Job = {
    key: Company,
    jobsPage: string,
    jobPathPrefix: string
}

export type JobObj = {
    text: string,
    href: string
}

const CAREER_PATHS: Job[] = [
    {
        key: 'netlify',
        jobsPage: 'https://www.netlify.com/careers/#perfect-job',
        jobPathPrefix: 'https://www.netlify.com'
    },
    {
        key: 'adyen',
        jobsPage: 'https://careers.adyen.com/vacancies',
        jobPathPrefix: 'https://careers.adyen.com'
    },
    {
        key: 'vercel',
        jobsPage: 'https://vercel.com/careers',
        jobPathPrefix: '/jobs/'
    },
    {
        key: 'microsoft',
        jobsPage: 'https://jobs.careers.microsoft.com/global/en/search',
        jobPathPrefix: 'https://jobs.careers.microsoft.com'
    }
]

const getMicrosoftJobs = async (jobsPage: string, jobPathPrefix: string)=>{

    let jobs: JobObj[] = [];

    await launchBrowser(jobsPage, async (page) => {
        const  inputSelector = "input[aria-label='Search by job title, ID, or keyword']";
        await page.waitForSelector(inputSelector);
        await page.type(inputSelector, "Software Engineer");

        const findJobsButtonSelector  = "button[aria-label='Find jobs']"
        await page.click(findJobsButtonSelector)

        const jobsSelector = "div[aria-label^='Job item']";
        await page.waitForSelector(jobsSelector);

         jobs = await page.evaluate((jobsSelector: any, jobPathPrefix: any) => {
            return Array.from(document.querySelectorAll(jobsSelector), element => {
                const jobId = element.ariaLabel?.replace('Job Item ', '');
                const jobTitle = element.querySelector('h2')

                return {
                    text: jobTitle?.textContent ?? '',
                    href: jobPathPrefix + jobId
                }
            })
        }, jobsSelector, jobPathPrefix)
    })
}

export async function getJobs() {
    const jobsObj: { [key: string]: JobObj[] } = {
        netlify: [],
        adyen: [],
        vercel: [],
        microsoft: []
    };

    // Dynamically import node-fetch as an ESM
    // const fetch = (await import('node-fetch')).default;

    for (const careerPath of CAREER_PATHS) {
        const { key, jobsPage } = careerPath;

        let jobsSelector: string | undefined;
        switch (key) {
            case 'netlify':
                jobsSelector = 'th.careers-results-title a';
                break;
            case 'adyen':
                jobsSelector = 'a.vacancies-list-item__link';
                break;
            case 'vercel':
                jobsSelector = 'a[href^="/careers/"]';
                break;
                // Add more cases for other companies
            default:
                break;
        }

        if (jobsSelector) {
            try {
                const response = await fetch(jobsPage);
                const responseText = await response.text();

                const $ = cheerio.load(responseText);
                
                if ($) {
                    const jobs = $(jobsSelector);

                    jobs.each((index: any, element: any) => {
                        const href = $(element).attr('href') ?? '';
                        const text = $(element).text().trim();

                        jobsObj[key].push({
                            text,
                            href
                        });
                    });
                }
            } catch (error) {
                console.error(`Error fetching jobs for ${key}:`, error);
            }
        }

        if (key === 'microsoft') {
            // await getMicrosoftJobs(jobsPage, careerPath.jobPathPrefix)
        }

    }

    return jobsObj;
}

