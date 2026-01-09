import cron from 'node-cron';
import runScraper from './scraper/scraper';

// Run every day at midnight (0 0 * * *)
const startCronJobs = () => {
    console.log('Initializing Cron Jobs...');

    cron.schedule('0 0 * * *', async () => {
        console.log('Running Daily Scholarship Scraper...');
        try {
            await runScraper();
            console.log('Daily Scrape Complete.');
        } catch (error) {
            console.error('Error in daily scrape:', error);
        }
    });
};

export default startCronJobs;
