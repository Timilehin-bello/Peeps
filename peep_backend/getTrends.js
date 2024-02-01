// Get the list of words to remove stop words from - 
// These list of words or array of words is returned from the dummyData file.

/*
Process:
 - Sort posts by number of comments in descending order
 - Remove all stopwords
 - Check for hashtags
 - Return the posts with the most common words
*/

const createPostCSV = require('./dummyData')
const { removeStopwords } = require('stopword')
const { postTexts } = createPostCSV('./sentimentdataset.csv');

class TrendingAlgorithm {
    trendingPostsList = [];

    constructor() {
        // Remove all stopwords
        const nonStopWordList = removeStopwords(postTexts);
        // Return the number of
        this.trendingPostsList.push(this.mostCommonWords(nonStopWordList));
    }

    alltrendingPosts() {
        return this.trendingPostsList;
    }

    removeStopWords(wordsList) {
        const allWordsList = [];
        for (eachPostText of wordsList) {
            // const oldString = 'a really Interesting string with some words'.split(' ')
            const oldString = eachPostText.split(' ')
            const newStringList = removeStopwords(oldString, [])
            allWordsList.push([...newStringList]);
        }
        return allWordsList;
    }

    mostCommonWords(words, n = 10) {
        // Count occurrences of each word
        const wordCounts = words.reduce((acc, word) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
        }, {});

        // Sort words by their counts in descending order
        const sortedWords = Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, n)
            .map(entry => [entry[0], entry[1]]);

        // Return the most common words with their counts
        return sortedWords;
    }

    // Example usage:
    // const words = ["apple", "banana", "apple", "orange", "banana", "apple"];
    // const mostCommon = mostCommonWords(words, 6);
    // console.log(mostCommon);
}

new TrendingAlgorithm().alltrendingPosts();